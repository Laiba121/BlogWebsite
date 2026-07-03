import React, { useState } from "react";
import {
  Bell,
  MapPin,
  Phone,
  Mail,
  Headphones,
  ChevronDown,
  ArrowRight,
  Navigation,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* =========================================================
   1. HEADER
   ========================================================= */
// function Header() {
//   const navItems = ["Directory", "Categories", "Editorial", "FAQs"];

//   return (
//     <header className="bg-white border-b border-gray-200">
//       <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
//         <div className="flex items-center gap-10">
//           <span className="text-xl font-bold text-[#1B3B6F] tracking-tight">
//             PharmaContext
//           </span>
//           <nav className="hidden md:flex items-center gap-6">
//             {navItems.map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
//               >
//                 {item}
//               </a>
//             ))}
//           </nav>
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             type="button"
//             aria-label="Notifications"
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <Bell size={18} />
//           </button>
//           <button
//             type="button"
//             className="bg-[#1B3B6F] hover:bg-[#15305c] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

/* =========================================================
   2. HERO
   ========================================================= */
function Hero() {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Get in Touch</h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">
          Our medical advisory team and customer support are available to
          assist with inquiries regarding pharmacological data, clinical
          partnerships, and system access.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   3. CONTACT FORM
   ========================================================= */
function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General Medical Inquiry",
    message: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-[#1B3B6F]/30 focus:border-[#1B3B6F] transition-colors";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Send a Message
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name">
            <input
              type="text"
              placeholder="Dr. Jane Smith"
              value={form.name}
              onChange={handleChange("name")}
              className={inputClasses}
            />
          </FormField>

          <FormField label="Email Address">
            <input
              type="email"
              placeholder="jane.smith@medicalcenter.org"
              value={form.email}
              onChange={handleChange("email")}
              className={inputClasses}
            />
          </FormField>
        </div>

        <FormField label="Subject">
          <div className="relative">
            <select
              value={form.subject}
              onChange={handleChange("subject")}
              className={`${inputClasses} appearance-none pr-9 cursor-pointer`}
            >
              <option>General Medical Inquiry</option>
              <option>Clinical Partnership</option>
              <option>System Access</option>
              <option>Technical Support</option>
              <option>Other</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </FormField>

        <FormField label="Message">
          <textarea
            rows={5}
            placeholder="Please describe your inquiry in detail..."
            value={form.message}
            onChange={handleChange("message")}
            className={`${inputClasses} resize-none`}
          />
        </FormField>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#1B3B6F] hover:bg-[#15305c] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
          >
            Send Message
            <ArrowRight size={15} />
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   4. CONTACT INFO SIDEBAR CARD
   ========================================================= */
function ContactInfoItem({ icon, iconBg, iconColor, title, lines }) {
  return (
    <div className="flex gap-3 px-5 py-4">
      <div
        className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <span style={{ color: iconColor }}>{icon}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        {lines.map((line, i) => (
          <p key={i} className="text-xs text-gray-500 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function ContactInfoCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex">
      <div className="w-1 bg-[#1B3B6F]" />
      <div className="flex-1 divide-y divide-gray-100">
        <ContactInfoItem
          icon={<MapPin size={16} />}
          iconBg="#E7EEF8"
          iconColor="#1B3B6F"
          title="Headquarters"
          lines={[
            "1200 Innovation Way",
            "Suite 400, Medical District",
            "Cambridge, MA 02139",
          ]}
        />
        <ContactInfoItem
          icon={<Phone size={16} />}
          iconBg="#E3F8FA"
          iconColor="#0EA5B7"
          title="Direct Contact"
          lines={["Support: +1 (800) 555-0192", "Admin: +1 (617) 555-0843"]}
        />
        <ContactInfoItem
          icon={<Mail size={16} />}
          iconBg="#FDEDE2"
          iconColor="#E96E2D"
          title="Electronic Mail"
          lines={["inquiry@pharmacontext.com", "tech-support@pharmacontext.com"]}
        />
      </div>
    </div>
  );
}

/* =========================================================
   5. MAP CARD
   ========================================================= */
function MapCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div
        className="relative h-36 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #3a4a5c 0%, #1f2733 55%, #11161d 100%)",
        }}
      >
        <div className="flex items-center gap-1.5 bg-white/95 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow">
          <MapPin size={13} className="text-[#1B3B6F]" />
          Locate on Map
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs text-gray-400">
          GPS: 42.3601&deg; N, 71.0589&deg; W
        </span>
        <a
          href="#"
          className="flex items-center gap-1 text-xs font-medium text-[#1B3B6F] hover:underline"
        >
          <Navigation size={12} />
          Get Directions
        </a>
      </div>
    </div>
  );
}

/* =========================================================
   6. URGENT HELP CARD
   ========================================================= */
function UrgentHelpCard() {
  return (
    <div className="bg-gray-900 rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-white">Need Urgent Help?</p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-[200px]">
          Our 24/7 Clinical support line is open for institutional members.
        </p>
      </div>
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
        <Headphones size={18} className="text-white" />
      </div>
    </div>
  );
}

/* =========================================================
   7. FOOTER
   ========================================================= */
// function Footer() {
//   const links = ["Privacy Policy", "Terms of Service", "Contact Us", "Medical Disclaimer"];

//   return (
//     <footer className="bg-gray-50 border-t border-gray-200">
//       <div className="max-w-6xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
//         <div className="text-center md:text-left">
//           <p className="text-sm font-bold text-[#1B3B6F]">PharmaContext</p>
//           <p className="text-xs text-gray-400">
//             &copy; 2024 PharmaContext Medical Information. All rights reserved.
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center justify-center gap-4">
//           {links.map((link) => (
//             <a
//               key={link}
//               href="#"
//               className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
//             >
//               {link}
//             </a>
//           ))}
//         </div>
//       </div>
//     </footer>
//   );
// }


export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="flex flex-col gap-6">
            <ContactInfoCard />
            <MapCard />
            <UrgentHelpCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
