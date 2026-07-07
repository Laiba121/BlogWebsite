import mongoose from 'mongoose'

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'PharmaContext Medical Information' },
  tagline: { type: String, default: 'Authoritative Pharmaceutical Database for Professionals' },
  supportEmail: { type: String, default: 'support@pharmacontext.com' },
  supportPhone: { type: String, default: '+1 (555) 019-2400' },
  facebook: { type: String, default: 'https://facebook.com/pharmacontext' },
  linkedin: { type: String, default: 'https://linkedin.com/company/pharmacontext' },
  metaTitle: { type: String, default: 'PharmaContext Medical Information' },
  metaDescription: { type: String, default: 'Trusted pharmaceutical information for professionals.' },
  smtpHost: { type: String, default: 'smtp.pharmacontext.com' },
  smtpEmail: { type: String, default: 'notifications@pharmacontext.com' },
  logoUrl: { type: String, default: '' },
  faviconUrl: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('SiteSettings', siteSettingsSchema)
