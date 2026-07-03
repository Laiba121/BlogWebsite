// ─────────────────────────────────────────────────────────────
//  src/data/searchData.js
//  Mock search results data for PharmaContext Search Page
// ─────────────────────────────────────────────────────────────

export const searchResults = [
  {
    id: 1,
    status: "APPROVED",
    statusColor: "green",
    name: "Paracetamol 500mg Tablet",
    description: "Analgesic & Antipyretic",
    tags: ["Adult Dosage", "Over-the-counter"],
    availability: "High Availability",
    availabilityColor: "green",
    slug: "paracetamol-500mg-tablet",
    icon: "💊",
  },
  {
    id: 2,
    status: "APPROVED",
    statusColor: "green",
    name: "Panadol Advance",
    description: "Optizorb Formulation",
    tags: ["Fast Acting", "Paracetamol base"],
    availability: "In Stock",
    availabilityColor: "green",
    slug: "panadol-advance",
    icon: "🧪",
  },
  {
    id: 3,
    status: "RESTRICTED",
    statusColor: "orange",
    name: "Paracetamol IV 10mg/ml",
    description: "Hospital Use Only",
    tags: ["Prescription Required", "Clinical Setting"],
    availability: "Monitor Dosage",
    availabilityColor: "orange",
    slug: "paracetamol-iv-10mg",
    icon: "💉",
  },
  {
    id: 4,
    status: "APPROVED",
    statusColor: "green",
    name: "Calpol Infant Suspension",
    description: "Strawberry Flavour",
    tags: ["Paediatric", "Sugar-free"],
    availability: "Widely Available",
    availabilityColor: "green",
    slug: "calpol-infant-suspension",
    icon: "🍓",
  },
  {
    id: 5,
    status: "APPROVED",
    statusColor: "green",
    name: "Paracetamol/Caffeine",
    description: "Combined Therapy",
    tags: ["Extra Strength", "Pain Relief"],
    availability: "In Stock",
    availabilityColor: "green",
    slug: "paracetamol-caffeine",
    icon: "⚡",
  },
  {
    id: 6,
    status: "APPROVED",
    statusColor: "green",
    name: "Effervescent Paracetamol",
    description: "Soluble Tablets",
    tags: ["Fast Absorption", "Gentle"],
    availability: "High Availability",
    availabilityColor: "green",
    slug: "effervescent-paracetamol",
    icon: "💧",
  },
];

export const filterTabs = ["All Results", "Tablets", "Syrup", "IV Infusion"];

export const sortOptions = ["Relevance", "Name A-Z", "Name Z-A", "Newest"];
