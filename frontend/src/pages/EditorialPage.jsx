import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import PhaseCard from "../components/PhaseCard";
import CommitmentStats from "../components/CommitmentStats";

// ─── Icons ───────────────────────────────────────────────────────────────────

const ResearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const FactCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ReviewIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const PublishIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

// ─── Phase data ───────────────────────────────────────────────────────────────

const phases = [
  {
    phase: "PHASE 01",
    title: "Evidentiary Research",
    description:
      "Our editorial team identifies clinical developments from peer-reviewed journals, FDA/EMA updates, and global health advisories. We prioritise high-impact pharmacological data and emerging drug therapies that require immediate professional interpretation.",
    icon: <ResearchIcon />,
    accentColor: "bg-blue-100",
    iconColor: "text-blue-600",
    tags: ["PubMed Cross-Ref", "Clinicaltrials.gov", "Primary sources"],
    checks: [],
    reviewer: null,
    badge: null,
  },
  {
    phase: "PHASE 02",
    title: "Rigorous Fact-Checking",
    description:
      "Documentation is subjected to a triple-verification process. Every dosage recommendation, contraindication, and chemical mechanism is checked against the original manufacturer's documentation and secondary pharmacological databases.",
    icon: <FactCheckIcon />,
    accentColor: "bg-amber-100",
    iconColor: "text-amber-600",
    tags: [],
    checks: [
      "Conflict of interest disclosure for all contributors.",
      "Verification of statistical significance in clinical data.",
    ],
    reviewer: null,
    badge: null,
  },
  {
    phase: "PHASE 03",
    title: "Board-Certified Medical Review",
    description:
      "Content is reviewed by our Medical Advisory Board, consisting of licensed pharmacists and specialist physicians. They ensure clinical nuance is maintained and that the information is presented with appropriate cautionary guidance for healthcare providers.",
    icon: <ReviewIcon />,
    accentColor: "bg-purple-100",
    iconColor: "text-purple-600",
    tags: [],
    checks: [],
    reviewer: { name: "Dr. Sarah Chen, PharmD", role: "Chief Medical Reviewer" },
    badge: null,
  },
 {
  phase: "PHASE 04",
  title: "Final Publication & Monitoring",
  description:
    'Once approved, the article is published with a "Medical Review" seal and a timestamp. Our system monitors post-publication feedback and new clinical updates, triggering an immediate re-review process if new data emerges.',
  icon: <PublishIcon />,
  accentColor: "bg-green-100",
  iconColor: "text-green-600",
  tags: [],
  checks: [],
  reviewer: null,
  badge: "Continuous Review Protocol Active",
},
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
     <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Editorial Policy" },
            ]}
          />

          {/* Header badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Clinical Standards Excellence
          </span>

          {/* Hero heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
            Editorial Integrity in
            <br />
            <span className="text-blue-600">Pharmacology</span>
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xl mb-10">
            PharmaContext maintains the highest standards of accuracy and impartiality. Every article follows a rigorous, multi-stage clinical verification process before reaching our readers.
          </p>

          {/* Phase Cards */}
          <div className="space-y-5">
            {phases.map((phase) => (
              <PhaseCard key={phase.phase} {...phase} />
            ))}
          </div>

          {/* Commitment Stats Block */}
          <CommitmentStats />
        </div>
      </main>

      <Footer />
    </div>
  );
}
