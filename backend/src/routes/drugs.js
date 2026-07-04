import express from "express"
import axios from "axios"
import Drug from "../models/Drug.js"
import Safety from "../models/Safety.js"

const router = express.Router()

// Escape user input for safe regex building
const escapeRegExp = (string = '') => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const DAILYMED_API = "https://dailymed.nlm.nih.gov/dailymed/services/v2"
const OPENFDA_API = "https://api.fda.gov"

const normalizeOpenFda = (openfda = {}) => ({
  productNdc: openfda.product_ndc || [],
  genericName: openfda.generic_name || [],
  brandName: openfda.brand_name || [],
  manufacturerName: openfda.manufacturer_name || [],
  route: openfda.route || [],
  dosageForm: openfda.dosage_form || [],
  rxcui: openfda.rxcui || [],
  splId: openfda.spl_id || [],
  splSetId: openfda.spl_set_id || []
})

// Get all drugs
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const drugs = await Drug.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ publishedDate: -1 })

    const total = await Drug.countDocuments()

    res.json({
      success: true,
      drugs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a manual medicine entry
router.post("/", async (req, res) => {
  try {
    const {
      title,
      setId,
      splVersion,
      publishedDate,
      genericName,
      brandName,
      manufacturer,
      dosage,
      purpose,
      warnings,
      ingredients,
      category,
      shortDescription
    } = req.body

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' })
    }

    const normalizedSetId = setId?.trim() || `manual-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    // Check for existing medicines by setId first
    const existsBySet = await Drug.findOne({ setId: normalizedSetId })
    if (existsBySet) {
      return res.status(400).json({ success: false, message: 'A medicine with that identifier already exists.' })
    }

    // Also check for duplicates by title / brand / generic name to avoid creating duplicates
    const dupQueries = []
    if (title && title.trim()) {
      const t = escapeRegExp(title.trim())
      dupQueries.push({ title: { $regex: t, $options: 'i' } })
    }
    if (brandName && brandName.trim()) {
      const b = escapeRegExp(brandName.trim())
      dupQueries.push({ brandName: { $regex: b, $options: 'i' } })
    }
    if (genericName && genericName.trim()) {
      const g = escapeRegExp(genericName.trim())
      dupQueries.push({ genericName: { $regex: g, $options: 'i' } })
    }

    if (dupQueries.length > 0) {
      const found = await Drug.findOne({ $or: dupQueries })
      if (found) {
        return res.status(400).json({ success: false, message: 'Medicine already exists in the database.', match: found })
      }
    }

    const drug = await Drug.create({
      setId: normalizedSetId,
      title: title.trim(),
      splVersion: splVersion ? Number(splVersion) : undefined,
      publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
      genericName: genericName ? [genericName.trim()] : [],
      brandName: brandName ? [brandName.trim()] : [],
      manufacturer: manufacturer?.trim() || undefined,
      dosage: dosage?.trim() || undefined,
      purpose: purpose?.trim() || undefined,
      warnings: warnings?.trim() || undefined,
      ingredients: Array.isArray(ingredients)
        ? ingredients.map((item) => item.trim()).filter(Boolean)
        : typeof ingredients === 'string'
        ? ingredients.split(',').map((item) => item.trim()).filter(Boolean)
        : [],
      category: category?.trim() || undefined,
      shortDescription: shortDescription?.trim() || undefined,
      hasFullDetails: true,
      lastUpdated: new Date()
    })

    res.json({ success: true, drug })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get import status
router.get("/status", async (req, res) => {
  try {
    const total = await Drug.countDocuments()
    const withDetails = await Drug.countDocuments({ hasFullDetails: true })

    res.json({
      success: true,
      totalDrugs: total,
      withFullDetails: withDetails,
      importedPercentage: total > 0 ? Math.round((withDetails / total) * 100) : 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Import OpenFDA label metadata and merge with DailyMed drugs
router.post("/import-openfda-label", async (req, res) => {
  try {
    const { limit = 100 } = req.body
    const drugs = await Drug.find({
      $or: [
        { splSetId: { $exists: false } },
        { splSetId: { $size: 0 } }
      ]
    }).limit(limit).select('setId')

    if (!drugs.length) {
      return res.json({
        success: true,
        updatedCount: 0,
        notFoundCount: 0,
        totalChecked: 0,
        message: 'No DailyMed drugs found without OpenFDA metadata.'
      })
    }

    let updatedCount = 0
    let notFoundCount = 0
    const notFound = []

    for (const drug of drugs) {
      const setId = drug.setId
      const url = `${OPENFDA_API}/drug/label.json?search=${encodeURIComponent(`openfda.spl_set_id:"${setId}"`)}&limit=1`

      let item = null
      try {
        const response = await axios.get(url)
        item = response.data?.results?.[0]
      } catch (error) {
        if (error.response?.status === 404) {
          notFoundCount++
          notFound.push({ setId, reason: 'OpenFDA label not found' })
          continue
        }
        notFoundCount++
        notFound.push({ setId, reason: `OpenFDA request failed: ${error.message}` })
        continue
      }

      if (!item || !item.openfda) {
        notFoundCount++
        notFound.push({ setId, reason: 'OpenFDA label missing openfda data' })
        continue
      }

      const updateData = {
        ...normalizeOpenFda(item.openfda),
        lastUpdated: new Date()
      }

      await Drug.findOneAndUpdate(
        { setId },
        updateData,
        { returnDocument: 'after' }
      )
      updatedCount++

      await new Promise(resolve => setTimeout(resolve, 200))
    }

    res.json({
      success: true,
      updatedCount,
      notFoundCount,
      totalChecked: drugs.length,
      notFound: notFound.slice(0, 20)
    })
  } catch (error) {
    console.error('OpenFDA label import error:', error.message || error)
    res.status(500).json({ error: error.message || 'Failed to import OpenFDA label metadata' })
  }
})

// Import OpenFDA safety data and store per SPL set ID
router.post("/import-openfda-safety", async (req, res) => {
  try {
    const { limit = 100, skip = 0 } = req.body
    const recallUrl = `${OPENFDA_API}/drug/enforcement.json?limit=${limit}&skip=${skip}`
    const eventUrl = `${OPENFDA_API}/drug/event.json?limit=${limit}&skip=${skip}`

    const [recallResponse, eventResponse] = await Promise.all([
      axios.get(recallUrl),
      axios.get(eventUrl)
    ])

    const recalls = recallResponse.data?.results || []
    const events = eventResponse.data?.results || []

    const recallUpdates = []
    for (const recall of recalls) {
      const setIds = recall.openfda?.spl_set_id || []
      const setId = setIds[0]
      if (!setId) continue
      recallUpdates.push({ setId, recall })
    }

    const eventUpdates = []
    for (const event of events) {
      const drugs = Array.isArray(event.patient?.drug) ? event.patient.drug : []
      const setId = drugs.find((drug) => Array.isArray(drug.openfda?.spl_set_id))?.openfda.spl_set_id?.[0]
      if (!setId) continue
      eventUpdates.push({ setId, event })
    }

    const writeResults = []
    for (const update of recallUpdates) {
      const record = await Safety.findOneAndUpdate(
        { setId: update.setId },
        {
          $push: { recalls: update.recall },
          lastUpdated: new Date()
        },
        { upsert: true, returnDocument: 'after' }
      )
      writeResults.push(record)
    }

    for (const update of eventUpdates) {
      const record = await Safety.findOneAndUpdate(
        { setId: update.setId },
        {
          $push: { adverseEvents: update.event },
          lastUpdated: new Date()
        },
        { upsert: true, returnDocument: 'after' }
      )
      writeResults.push(record)
    }

    res.json({
      success: true,
      recallRecords: recallUpdates.length,
      eventRecords: eventUpdates.length,
      totalSafetyDocuments: writeResults.length
    })
  } catch (error) {
    console.error('OpenFDA safety import error:', error.message || error)
    res.status(500).json({ error: error.message || 'Failed to import OpenFDA safety data' })
  }
})

// Import drugs from DailyMed (first page)
router.post("/import-first-page", async (req, res) => {
  try {
    const response = await axios.get(`${DAILYMED_API}/spls.json`)
    const data = response.data

    let imported = 0
    let skipped = 0

    for (const drug of data.data) {
      const exists = await Drug.findOne({ setId: drug.setid })
      
      if (!exists) {
        await Drug.create({
          setId: drug.setid,
          title: drug.title,
          splVersion: drug.spl_version,
          publishedDate: new Date(drug.published_date)
        })
        imported++
      } else {
        skipped++
      }
    }

    res.json({
      success: true,
      imported,
      skipped,
      message: `Imported ${imported} drugs, ${skipped} already exist`
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Import all drugs from DailyMed (paginated)
router.post("/import-all", async (req, res) => {
  try {
    const { startPage = 1, endPage = 5 } = req.body // Default first 5 pages

    let totalImported = 0
    let totalSkipped = 0
    const errors = []

    for (let page = startPage; page <= endPage; page++) {
      try {
        const response = await axios.get(
          `${DAILYMED_API}/spls.json?page=${page}&pagesize=100`
        )
        const data = response.data

        if (!data.data || data.data.length === 0) break

        for (const drug of data.data) {
          const exists = await Drug.findOne({ setId: drug.setid })
          
          if (!exists) {
            await Drug.create({
              setId: drug.setid,
              title: drug.title,
              splVersion: drug.spl_version,
              publishedDate: new Date(drug.published_date)
            })
            totalImported++
          } else {
            totalSkipped++
          }
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (pageError) {
        errors.push({ page, error: pageError.message })
      }
    }

    res.json({
      success: true,
      totalImported,
      totalSkipped,
      pagesProcessed: endPage - startPage + 1,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Import full details for a specific drug
router.post("/import-details/:setId", async (req, res) => {
  try {
    const { setId } = req.params

    const response = await axios.get(
      `${DAILYMED_API}/spls.json?setid=${encodeURIComponent(setId)}`
    )
    const data = response.data?.data?.[0]

    if (!data) {
      return res.status(404).json({ error: `No detail found for setId ${setId}` })
    }

    const updateData = {
      hasFullDetails: true,
      lastUpdated: new Date()
    }

    if (Array.isArray(data.inactive_ingredients)) {
      updateData.ingredients = data.inactive_ingredients
        .map((ing) => (typeof ing === 'string' ? ing : ing?.name || ''))
        .filter(Boolean)
    } else if (typeof data.inactive_ingredients === 'string') {
      updateData.ingredients = [data.inactive_ingredients]
    }

    if (Array.isArray(data.dosages) && data.dosages[0]) {
      const dosage = data.dosages[0]
      updateData.dosage = dosage.description || dosage.form || ''
    }

    if (data.warnings) {
      updateData.warnings = typeof data.warnings === 'string'
        ? data.warnings
        : JSON.stringify(data.warnings)
    }

    if (data.purpose) {
      updateData.purpose = typeof data.purpose === 'string'
        ? data.purpose
        : JSON.stringify(data.purpose)
    }

    if (data.manufacturer) {
      updateData.manufacturer = typeof data.manufacturer === 'string'
        ? data.manufacturer
        : data.manufacturer?.name || JSON.stringify(data.manufacturer)
    }

    const updated = await Drug.findOneAndUpdate(
      { setId },
      updateData,
      { returnDocument: 'after' }
    )

    res.json({
      success: true,
      drug: updated
    })
  } catch (error) {
    console.error('Import detail error:', error.message || error)
    res.status(500).json({ error: error.message || 'Failed to fetch drug details' })
  }
})

// Import OpenFDA label metadata for a single drug by DailyMed setId
router.post("/import-openfda-label/:setId", async (req, res) => {
  try {
    const { setId } = req.params
    const response = await axios.get(
      `${OPENFDA_API}/drug/label.json?search=${encodeURIComponent(`openfda.spl_set_id:"${setId}"`)}&limit=1`
    )
    const item = response.data?.results?.[0]

    if (!item) {
      return res.status(404).json({ error: `No OpenFDA label found for setId ${setId}` })
    }

    const openfda = item.openfda || {}
    const updateData = {
      ...normalizeOpenFda(openfda),
      lastUpdated: new Date()
    }

    const updated = await Drug.findOneAndUpdate(
      { setId },
      updateData,
      { returnDocument: 'after' }
    )

    if (!updated) {
      return res.status(404).json({ error: `DailyMed drug not found for setId ${setId}` })
    }

    res.json({ success: true, drug: updated, openfda })
  } catch (error) {
    console.error('OpenFDA single label import error:', error.message || error)
    res.status(500).json({ error: error.message || 'Failed to import OpenFDA metadata' })
  }
})

// Import details for multiple drugs
router.post("/import-all-details", async (req, res) => {
  try {
    const { limit = 100 } = req.body

    // Get drugs without full details
    const drugs = await Drug.find({ hasFullDetails: false }).limit(limit)

    if (drugs.length === 0) {
      return res.json({
        success: true,
        processed: 0,
        failed: 0,
        message: 'No pending drugs require details import.'
      })
    }

    let processed = 0
    let failed = 0
    const errors = []

    for (const drug of drugs) {
      try {
        const response = await axios.get(
          `${DAILYMED_API}/spls.json?setid=${encodeURIComponent(drug.setId)}`
        )
        const data = response.data?.data?.[0]

        if (!data) {
          throw new Error('DailyMed returned no data for setId ' + drug.setId)
        }

        const updateData = {
          hasFullDetails: true,
          lastUpdated: new Date()
        }

        if (Array.isArray(data.inactive_ingredients)) {
          updateData.ingredients = data.inactive_ingredients
            .map((ing) => (typeof ing === 'string' ? ing : ing?.name || ''))
            .filter(Boolean)
            .slice(0, 20) // Limit to 20
        } else if (typeof data.inactive_ingredients === 'string') {
          updateData.ingredients = [data.inactive_ingredients]
        }

        if (Array.isArray(data.dosages) && data.dosages[0]) {
          updateData.dosage = data.dosages[0].description || data.dosages[0].form || ''
        }

        if (data.warnings) {
          updateData.warnings = typeof data.warnings === 'string'
            ? data.warnings.substring(0, 500)
            : JSON.stringify(data.warnings).substring(0, 500)
        }

        if (data.purpose) {
          updateData.purpose = typeof data.purpose === 'string'
            ? data.purpose
            : JSON.stringify(data.purpose)
        }

        if (data.manufacturer) {
          updateData.manufacturer = typeof data.manufacturer === 'string'
            ? data.manufacturer
            : data.manufacturer?.name || JSON.stringify(data.manufacturer)
        }

        await Drug.findByIdAndUpdate(drug._id, updateData)
        processed++

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300))
      } catch (error) {
        failed++
        errors.push({ setId: drug.setId, error: error.message })
      }
    }

    res.json({
      success: true,
      processed,
      failed,
      message: `Processed ${processed} drugs, ${failed} failed`,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a drug by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Drug.findByIdAndDelete(id)

    if (!deleted) return res.status(404).json({ success: false, message: "Drug not found" })

    res.json({ success: true, message: "Drug deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Refresh full details for a drug by ID using DailyMed
router.post("/:id/refresh-details", async (req, res) => {
  try {
    const { id } = req.params
    const drug = await Drug.findById(id)
    if (!drug) return res.status(404).json({ success: false, message: "Drug not found" })

    const response = await axios.get(
      `${DAILYMED_API}/spls.json?setid=${encodeURIComponent(drug.setId)}`
    )
    const data = response.data?.data?.[0]

    if (!data) {
      return res.status(404).json({ error: `No detail found for setId ${drug.setId}` })
    }

    const updateData = {
      hasFullDetails: true,
      lastUpdated: new Date()
    }

    if (Array.isArray(data.inactive_ingredients)) {
      updateData.ingredients = data.inactive_ingredients
        .map((ing) => (typeof ing === 'string' ? ing : ing?.name || ''))
        .filter(Boolean)
    } else if (typeof data.inactive_ingredients === 'string') {
      updateData.ingredients = [data.inactive_ingredients]
    }

    if (Array.isArray(data.dosages) && data.dosages[0]) {
      const dosage = data.dosages[0]
      updateData.dosage = dosage.description || dosage.form || ''
    }

    if (data.warnings) {
      updateData.warnings = typeof data.warnings === 'string'
        ? data.warnings
        : JSON.stringify(data.warnings)
    }

    if (data.purpose) {
      updateData.purpose = typeof data.purpose === 'string'
        ? data.purpose
        : JSON.stringify(data.purpose)
    }

    if (data.manufacturer) {
      updateData.manufacturer = typeof data.manufacturer === 'string'
        ? data.manufacturer
        : data.manufacturer?.name || JSON.stringify(data.manufacturer)
    }

    const updated = await Drug.findByIdAndUpdate(id, updateData, { returnDocument: 'after' })

    res.json({ success: true, drug: updated })
  } catch (error) {
    console.error('Refresh detail error:', error.message || error)
    res.status(500).json({ error: error.message || 'Failed to refresh drug details' })
  }
})

// Search drugs (supports title/brand/generic AND direct setId lookup)
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query
    const q = (query || '').toString().trim()
    const qEscaped = escapeRegExp(q)

    const drugs = await Drug.find({
      $or: [
        // direct setId match
        { setId: q },

        // regex title/brand/generic match (case-insensitive)
        ...(q ? [
          { title: { $regex: qEscaped, $options: "i" } },
          { brandName: { $regex: qEscaped, $options: "i" } },
          { genericName: { $regex: qEscaped, $options: "i" } }
        ] : [])
      ]
    }).limit(50)

    res.json({
      success: true,
      drugs
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
