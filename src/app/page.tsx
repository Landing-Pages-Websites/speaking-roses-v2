"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { useTracking } from "@/hooks/useTracking";

const BOOK_CALL_URL = "https://partnership.speakingroses.com/book-call";
const SITE_KEY = "sk_mo06cibl_0o7i2f0t7lxf";
const GTM_ID = "GTM-TTDNNJDM";
const SITE_ID = "8c4333c3-cd49-480a-8934-3914aec3901b";

const BRAND_VIDEO_URL = "https://storage.googleapis.com/msgsndr/ioeX0AohKO7FTyLYF9kf/media/69025f3b074008a75d3aa1de.mp4";
const PRODUCT_VIDEO_URL = "https://storage.googleapis.com/msgsndr/WbJSzu9tJKeleGsNQ6dR/media/68252c05a1908e31dfd47a74.mp4";

const productFeatures = [
  { title: "100% Real Preserved Roses", body: "Real roses, preserved to last for years." },
  { title: "Printed on the Petal", body: "Names, logos, photos, and messages printed directly on real roses." },
  { title: "Luxury Packaging", body: "Acrylic boxes and signature round boxes designed to be kept and displayed." },
  { title: "Built for Many Markets", body: "Perfect for corporate, funeral, retail, wedding, fundraising, and e-commerce channels." },
];

const proofPoints = [
  ["$334B+", "The global personalization market — and it's still growing. Speaking Roses is positioned at its center."],
  ["500+", "Media outlets, award shows, and publications — Forbes, Inc., Grammys, Oscars, The Ellen Show, and more."],
  ["20+ years", "Perfecting the proprietary petal-printing process. This technology is patented. No one else does what we do."],
  ["$1,500+", "Minimum investment to start as a Speaking Roses distributor and earn the right to represent the brand in your market."],
];

const testimonials = [
  {
    quote: "I own three stores, and one thing is clear — people are looking for something different. Speaking Roses helps me deliver that 'wow' factor. The product moves fast, and their team makes handling custom requests incredibly easy.",
    name: "Josh Neil",
    title: "Distributor, New York",
  },
  {
    quote: "As a licensee, I get to combine creativity and entrepreneurship every day. Printing messages on real roses allows me to help people express emotions in ways they never could before. The product is unique, the margins are great, the market is wide open, and it's more than just a business — it's meaningful work.",
    name: "Scott Tucker",
    title: "Official Licensee",
  },
];

const paths = [
  {
    title: "Distributor",
    sub: "Starting opportunities from $1,500",
    body: "Represent Speaking Roses products in your market without handling production. Ideal for entrepreneurs, gift sellers, funeral industry contacts, corporate gift reps, and local market builders.",
  },
  {
    title: "Licensee",
    sub: "For qualified partners only",
    body: "For qualified partners who want access to training, systems, equipment, and the ability to produce personalized roses in an approved market.",
  },
  {
    title: "Strategic Partnership",
    sub: "Regional, industry, or national opportunities",
    body: "For qualified partners, Speaking Roses offers exclusive partnership opportunities by zip code, city, state, country, industry, or market channel. Selective — based on market fit, capacity, and the ability to represent the product at a high level.",
  },
];

const markets = [
  { title: "Weddings & Events", body: "Personalized roses for proposals, centerpieces, thank-you gifts, and memorable keepsakes." },
  { title: "Funeral Homes", body: "Offer families a unique way to honor and remember loved ones with personalized roses." },
  { title: "Corporate Gifts", body: "Strengthen relationships with branded roses for clients, employees, and special recognition." },
  { title: "Retail & Gift Shops", body: "A high-margin luxury gift that stands out and drives repeat customer visits." },
  { title: "Fundraising", body: "A meaningful product that helps organizations raise more with emotional impact." },
  { title: "Souvenir Shops", body: "Premium keepsakes for tourists looking for something unique and personal to take home." },
  { title: "Promotional Companies", body: "Add meaningful personalization to campaigns, events, and brand activations." },
  { title: "E-commerce & Social Selling", body: "Perfect for online sellers and influencers who create emotional, shareable moments." },
];

const processPoints = [
  { label: "South American Grown" },
  { label: "Diamond-Grade Preservation" },
  { label: "Printed & Packaged in the USA" },
  { label: "Shipped Worldwide" },
];

const faqs = [
  {
    q: "Who is Speaking Roses looking for?",
    a: "We are selective. This is not an open sign-up program. We are looking for serious, committed distributors, licensees, and exclusive partners who are ready to lead their market and represent the brand correctly. Capacity is limited and every applicant is evaluated individually.",
  },
  {
    q: "What does it mean to earn the right to represent?",
    a: "It means you gain the right to immediately sell Speaking Roses products, access approved product lines, and represent the brand in your area. You can market and resell to local businesses such as funeral homes, hotels, restaurants, flower shops, gift stores, and strategic partners, and in some cases pursue larger regional or national opportunities.",
  },
  {
    q: "Do I need to produce the roses myself?",
    a: "No. For the Distributor path, you do not need to purchase inventory or produce the roses yourself. You generate the sales, we handle the production, and you earn the commission. Licensees can explore local production rights, equipment, training, and support.",
  },
  {
    q: "What is the minimum investment?",
    a: "The minimum investment to begin as a Distributor is $1,500 in liquid funds or available credit. Licensee and Exclusive Partnership programs require higher minimums depending on the territory and scope.",
  },
  {
    q: "Can I own exclusive rights in an area?",
    a: "Yes. Depending on the opportunity and availability, partners may qualify for exclusive rights tied to a zip code, local market, region, industry segment, or even a country. Availability is limited and based on strategic fit.",
  },
  {
    q: "Can I upgrade later?",
    a: "Possibly, if space is still available. Because openings are limited, an upgrade is not guaranteed. If higher-level territories or programs are already filled, you may be locked into the path you entered under.",
  },
  {
    q: "What happens after I apply?",
    a: "Qualified applicants may be invited to schedule a Zoom call with the Speaking Roses team. We will review your background, goals, and territory interests, and if a match is confirmed, we will share next steps.",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  liquidFunds: string;
  timeline: string;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  liquidFunds: "",
  timeline: "",
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`}>
      {children}
    </div>
  );
}

function RoseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2v20M5 9c4 0 7-3 7-7 0 4 3 7 7 7-4 0-7 3-7 7 0-4-3-7-7-7Z" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="gold-rule my-3">
      <RoseIcon className="h-4 w-4 shrink-0 text-gold" />
    </div>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose/10 text-rose">{children}</div>;
}

type ApplyFormProps = {
  form: FormState;
  setField: (key: keyof FormState, value: string) => void;
  formatPhone: (value: string) => string;
  validatePhone: (value: string) => string;
  phoneError: string;
  setPhoneError: (value: string) => void;
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  error: string;
  submitted: boolean;
  isQualified: boolean;
  compact?: boolean;
  showTitle?: boolean;
};

function ApplyForm({ form, setField, formatPhone, validatePhone, phoneError, setPhoneError, handleSubmit, isSubmitting, error, submitted, isQualified, compact = false, showTitle = false }: ApplyFormProps) {
  return (
    <div className={`rounded-2xl bg-white shadow-2xl ${compact ? "p-4 md:p-5" : "p-7 md:p-8"}`}>
      {showTitle && (
        <div className="mb-5 text-center">
          <h3 className="font-display text-2xl text-plum md:text-3xl">Tell us about you</h3>
          <GoldDivider />
        </div>
      )}
      {submitted && !isQualified ? (
        <div className="rounded-2xl bg-petal p-8 text-center">
          <h3 className="font-display text-3xl text-plum">Thanks for applying.</h3>
          <p className="mt-4 text-ink/70">Your information has been received. The Speaking Roses team will be in touch if your market and timing are a fit.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`grid ${compact ? "gap-2" : "gap-2.5"}`}>
          <div className={`grid sm:grid-cols-2 ${compact ? "gap-2.5" : "gap-3.5"}`}>
            <input name="firstName" required placeholder="First Name" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} className="field" />
            <input name="lastName" required placeholder="Last Name" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} className="field" />
          </div>
          <input name="email" required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setField("email", e.target.value)} className="field" />
          <input name="phone" required type="tel" inputMode="numeric" placeholder="Phone Number" value={form.phone} onChange={(e) => { const next = formatPhone(e.target.value); setField("phone", next); setPhoneError(validatePhone(next)); }} className="field" />
          {phoneError && <p className="text-sm font-semibold text-red-700">{phoneError}</p>}
          <select name="liquidFunds" required aria-label="Liquid funds available" value={form.liquidFunds} onChange={(e) => setField("liquidFunds", e.target.value)} className="field">
            <option value="">When would you like to start?</option>
            <option value="under-1500">&lt;$1,500</option>
            <option value="1500-5000">$1,500–$5,000</option>
            <option value="5000-10000">$5,000–$10,000</option>
            <option value="10000-plus">$10,000+</option>
          </select>
          <select name="timeline" required aria-label="Timeline to start" value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className="field">
            <option value="">Select timeline</option>
            <option value="immediately">Immediately</option>
            <option value="1-3-months">Over the next 1–3 months</option>
            <option value="3-6-months">3–6 months</option>
            <option value="6-plus-months">6+ months</option>
          </select>
          <p className={`${compact ? "text-[0.6875rem] leading-4" : "text-xs leading-5"} text-ink/50`}>By submitting, you agree to receive calls and SMS messages from Speaking Roses related to this partnership opportunity. Message and data rates may apply. Reply STOP to opt out.</p>
          {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
          <button type="submit" disabled={isSubmitting} className={`w-full rounded-full bg-rose px-7 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-plum disabled:opacity-60 ${compact ? "py-3" : "py-4"}`}>
            {isSubmitting ? "Submitting…" : "Apply to Check Market Availability →"}
          </button>
          <p className="text-center text-xs text-ink/40">🔒 Your information is secure and will never be shared.</p>
        </form>
      )}
    </div>
  );
}

function CTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <a href="#apply" className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] shadow-xl transition hover:-translate-y-0.5 ${dark ? "bg-white text-plum hover:bg-blush" : "bg-rose text-white hover:bg-plum"}`}>
        Apply to Check Market Availability
        <span aria-hidden>→</span>
      </a>
      <p className={`text-xs font-semibold tracking-wide ${dark ? "text-white/50" : "text-ink/40"}`}>Limited partner openings available</p>
    </div>
  );
}

export default function Home() {
  useTracking({ siteKey: SITE_KEY, gtmId: GTM_ID, siteId: SITE_ID });
  const { submit } = useMegaLeadForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(initialForm);
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setField = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const validatePhone = (value: string) => {
    const d = value.replace(/\D/g, "");
    if (d.length !== 10) return "Enter a 10-digit US phone number.";
    if (!/^[2-9]/.test(d) || !/^[2-9]/.test(d.slice(3))) return "Area code and exchange must start with 2-9.";
    if (["211", "311", "411", "511", "611", "711", "811", "911"].includes(d.slice(0, 3))) return "N11 service codes are not valid area codes.";
    if (["800", "888", "877", "866", "855", "844", "833", "822", "900"].includes(d.slice(0, 3))) return "Please use a direct business or mobile number.";
    if (d.slice(3, 6) === "555") return "Please use a real phone number.";
    if (/^(\d)\1{9}$/.test(d) || d === "1234567890" || d === "9876543210") return "Please use a real phone number.";
    return "";
  };

  const isQualified = form.liquidFunds !== "under-1500" && form.timeline !== "6-plus-months";

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pError = validatePhone(form.phone);
    setPhoneError(pError);
    if (pError) return;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailValid) { setError("Enter a valid email address."); return; }
    setIsSubmitting(true);
    setError("");
    try {
      await submit({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        liquidFunds: form.liquidFunds,
        timeline: form.timeline,
        qualified: isQualified ? "yes" : "no",
        smsConsent: "By submitting, applicant agrees to receive calls and SMS messages from Speaking Roses related to the partnership opportunity. Message and data rates may apply. Reply STOP to opt out.",
      });
      setSubmitted(true);
      if (isQualified) window.location.href = BOOK_CALL_URL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="scroll-progress" />

      {/* ── NAV ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/65 to-transparent">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" aria-label="Speaking Roses home">
            <Image src="/logo.svg" alt="Speaking Roses" width={300} height={78} className="h-12 w-auto md:h-14 brightness-0 invert" priority />
          </a>
          <a href="#apply" className="rounded-full bg-rose px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow transition hover:bg-white hover:text-plum">
            Apply Now
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative isolate min-h-screen overflow-hidden lg:min-h-[760px]">
        <Image src="/hero-hq.jpg" alt="" fill className="object-cover object-center" priority quality={100} sizes="100vw" />
        {/* layered overlays for depth */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />

        {/* DESKTOP: headline left, form right */}
        <div className="relative z-10 mx-auto hidden min-h-screen max-w-[1500px] items-center justify-between px-8 pb-6 pt-24 lg:flex lg:min-h-[700px] xl:min-h-screen">

          {/* Left: headline card */}
          <div className="w-[420px] max-w-[38%]">
            <Reveal>
              <div className="rounded-2xl border border-white/15 bg-black/50 px-7 py-6 shadow-2xl backdrop-blur-md">
                <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-blush">
                  Bring Personalized Roses to Your Market
                </p>
                <h1 className="font-display">
                  <span className="block text-[2.75rem] font-bold leading-[1.08] text-blush">Real Roses.</span>
                  <span className="block text-[2.75rem] font-bold leading-[1.08] text-white">Real Emotion.</span>
                  <span className="block text-[2.75rem] font-bold leading-[1.08] text-white">Real Opportunity.</span>
                </h1>
                <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-4">
                  <RoseIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-semibold text-white">100% Real Roses, Preserved for a Lifetime</p>
                    <p className="mt-1 text-xs leading-5 text-white/65">Distributor, licensee &amp; strategic partner spots now open. <span className="font-semibold text-gold">Limited availability.</span></p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form card */}
          <div className="w-[420px] max-w-[38%]">
            <Reveal>
              <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Form header */}
                <div className="bg-white px-5 pt-5 pb-1 text-center">
                  <h2 className="font-display text-[1.25rem] font-semibold text-plum">Check Market Availability</h2>
                  <GoldDivider />
                </div>
                <div className="px-5 pb-5">
                  <ApplyForm
                    form={form} setField={setField} formatPhone={formatPhone}
                    validatePhone={validatePhone} phoneError={phoneError}
                    setPhoneError={setPhoneError} handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting} error={error} submitted={submitted}
                    isQualified={isQualified} compact
                  />
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="mt-3 rounded-xl border border-blush/20 bg-plum/85 px-4 py-2 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-widest text-blush">Limited partner openings available</p>
                <p className="mt-0.5 text-xs text-white/65"><span className="text-blush">Apply today</span> — spots in your market may already be claimed.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* MOBILE: stacked layout */}
        <div className="relative z-10 flex min-h-screen flex-col justify-between px-4 pb-8 pt-24 lg:hidden">
          <Reveal>
            <div className="rounded-2xl border border-white/15 bg-black/55 px-5 py-4 shadow-2xl backdrop-blur-md">
              <p className="mb-2 text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-blush">Bring Personalized Roses to Your Market</p>
              <h1 className="font-display">
                <span className="block text-4xl font-bold leading-tight text-blush">Real Roses.</span>
                <span className="block text-4xl font-bold leading-tight text-white">Real Emotion.</span>
                <span className="block text-4xl font-bold leading-tight text-white">Real Opportunity.</span>
              </h1>
            </div>
          </Reveal>
          <div className="mt-4 flex flex-col gap-3">
            <Reveal>
              <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
                <div className="px-5 pt-5 pb-2 text-center">
                  <h2 className="font-display text-xl font-semibold text-plum">Check Market Availability</h2>
                  <GoldDivider />
                </div>
                <div className="px-5 pb-5">
                  <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} compact />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRODUCT ── */}
      <section id="product" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">The Product</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A Product That Turns Real Roses Into Keepsakes.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Represent a patented product that prints names, logos, photos, and messages directly on real preserved roses — creating emotional gifts for corporate, funeral, retail, wedding, fundraising, and e-commerce markets.
            </p>
          </Reveal>

          {/* Proof badges */}
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { label: "Patented Petal Printing", icon: "🛡️" },
              { label: "20+ Years of Proof", icon: "⭐" },
              { label: "Featured in 500+ Media Outlets", icon: "📰" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 rounded-xl border border-blush/60 bg-petal px-5 py-3 shadow-sm">
                <span className="text-lg">{badge.icon}</span>
                <span className="text-sm font-semibold text-plum">{badge.label}</span>
              </div>
            ))}
          </Reveal>

          {/* Product gallery */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {["/rose-1.webp", "/rose-2.webp", "/rose-3.webp"].map((src, index) => (
              <Reveal key={src} className="overflow-hidden rounded-2xl shadow-lg">
                <Image src={src} alt={`Speaking Roses personalized preserved rose ${index + 1}`} width={720} height={720} className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105" />
              </Reveal>
            ))}
          </div>

          {/* Product feature cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productFeatures.map((f) => (
              <Reveal key={f.title} className="rounded-2xl border border-blush/50 bg-petal p-6 shadow-sm">
                <Icon>
                  <RoseIcon />
                </Icon>
                <h3 className="font-bold text-plum">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{f.body}</p>
              </Reveal>
            ))}
          </div>

          <CTA />
        </div>
      </section>

      {/* ── MARKET OPPORTUNITY ── */}
      <section id="markets" className="relative py-24 overflow-hidden">
        <Image src="/rose-2.webp" alt="" fill className="object-cover object-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-petal/92" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">The Market Opportunity</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A Global Market Built on Emotion. Endless Opportunities for Our Partners.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Speaking Roses fits into multiple industries where personalization, emotion, and gifting drive purchasing decisions. One product. Multiple possibilities.
            </p>
          </Reveal>

          {/* Markets grid + video */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="grid gap-4 sm:grid-cols-2">
              {markets.map((m) => (
                <Reveal key={m.title} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-blush/40">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose/25 bg-rose/10 text-rose">
                    <RoseIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-plum">{m.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-ink/70">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Video card */}
            <Reveal className="flex flex-col">
              <div className="relative overflow-hidden rounded-2xl bg-plum shadow-2xl flex-1">
                <div className="absolute inset-0 bg-gradient-to-b from-plum/40 to-plum/10 z-10 pointer-events-none" />
                <video
                  src={BRAND_VIDEO_URL}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                  poster="/rose-product.webp"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute top-0 inset-x-0 z-20 p-5 pointer-events-none">
                  <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-gold">See the Possibilities</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white leading-tight">Watch the Market Opportunity Video</h3>
                  <div className="gold-rule mt-2 justify-start">
                    <span className="text-[0.6875rem] font-semibold text-white/60 ml-0">Discover how Speaking Roses creates meaningful impact across industries and around the world.</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Positioning strip */}
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {["High-Emotion Purchase Categories", "Built for Multiple Sales Channels", "Premium Keepsake Positioning"].map((tag) => (
              <span key={tag} className="rounded-full bg-plum px-5 py-2 text-sm font-bold text-blush shadow-sm">
                {tag}
              </span>
            ))}
          </Reveal>

          <Reveal className="mt-8 rounded-2xl bg-plum p-8 text-center text-white shadow-xl">
            <p className="font-display text-2xl text-white md:text-3xl">This is more than a product.</p>
            <p className="mt-2 font-display text-2xl text-blush md:text-3xl">This is a business opportunity with global potential.</p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <a href="#apply" className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-white hover:text-plum">
                Apply to Check Market Availability <span>→</span>
              </a>
              <p className="text-xs font-semibold tracking-wide text-white/50">Select partner openings available</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOLLYWOOD APPROVED ── */}
      <section id="press" className="bg-plum py-24 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blush">As Seen On / Featured In</p>
            <h2 className="font-display text-5xl text-white md:text-6xl">Hollywood<br /><span className="text-gold">Approved.</span></h2>
            <p className="mt-4 font-display text-xl text-blush">Featured in 500+ outlets. Grammys. Oscars. The Ellen Show.</p>
            <p className="mt-5 text-base leading-8 text-white/70">
              Speaking Roses has been on some of the world&apos;s most recognized stages — from top business publications to Hollywood award shows. Featured at the Grammys, the Oscars, The Ellen Show, partnerships with Disney, and validated by Forbes, the Wall Street Journal, Good Morning America, CNN, Inc. Magazine, and 500+ media outlets worldwide.
            </p>
          </Reveal>

          {/* Quote box */}
          <Reveal className="mx-auto mt-10 max-w-2xl rounded-2xl border border-blush/25 bg-white/5 p-8 text-center">
            <p className="text-3xl text-gold/60">&ldquo;</p>
            <p className="font-display text-xl text-white">This is not a startup product.</p>
            <p className="mt-2 font-display text-xl text-blush">This is a brand with two decades of proof, global media recognition, and staying power.</p>
          </Reveal>

          {/* Media logo strip */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {[
              { src: "/logo-forbes.svg",          alt: "Forbes",               bg: "bg-white" },
              { src: "/logo-wsj.svg",             alt: "Wall Street Journal",  bg: "bg-white" },
              { src: "/logo-oscars-4x.png",       alt: "Oscars",               bg: "bg-white" },
              { src: "/logo-grammys.svg",         alt: "Grammys",              bg: "bg-white" },
              { src: "/logo-ellen-4x.png",        alt: "The Ellen Show",       bg: "bg-black" },
              { src: "/logo-fox.svg",             alt: "Fox News",             bg: "bg-white" },
              { src: "/logo-cnn.svg",             alt: "CNN",                  bg: "bg-white" },
              { src: "/logo-gma.svg",             alt: "Good Morning America", bg: "bg-white" },
              { src: "/logo-inc.svg",             alt: "Inc. Magazine",        bg: "bg-white" },
              { src: "/logo-e-entertainment.png", alt: "E! Entertainment",     bg: "bg-white" },
            ].map((logo) => (
              <div key={logo.alt} className={`flex h-14 w-36 items-center justify-center rounded-xl px-4 shadow-sm ${logo.bg}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} className="h-7 w-auto max-w-[120px] object-contain" />
              </div>
            ))}
          </Reveal>

          {/* Recognition strip */}
          <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
            {["National TV", "Business Press", "Entertainment Media", "Lifestyle Coverage", "Global Recognition", "High-Visibility Events"].map((tag) => (
              <span key={tag} className="rounded-full border border-blush/25 px-4 py-2 text-xs font-semibold tracking-wide text-blush">
                {tag}
              </span>
            ))}
          </Reveal>
          <CTA dark />
        </div>
      </section>

      {/* ── PROOF STATS ── */}
      <section id="proof" className="bg-rose py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-white/60">The opportunity in numbers</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Built on two decades of proof.</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(([title, label]) => (
              <Reveal key={title} className="rounded-2xl border border-white/20 bg-white/10 p-7 backdrop-blur-sm">
                <div className="font-display text-5xl font-bold text-white">{title}</div>
                <p className="mt-3 text-sm leading-6 text-white/75">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA dark />
      </section>

      {/* ── OUR ROSE PROCESS ── */}
      <section id="story" className="bg-petal py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">Our Rose Process</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Raised in South America.<br /><span className="text-rose">Perfected Like a Diamond.</span></h2>
            <p className="mt-2 text-base font-medium text-ink/55">From the mountains to meticulous preservation, printing, and luxury packaging.</p>
            <p className="mt-6 text-base leading-8 text-ink/70">
              Our roses are raised in the majestic mountains of South America. Once fully mature, they are cut and guided through a two-week-plus diamond-grade preservation process. Each rose is individually perfected to look, feel, and smell real while lasting for years.
            </p>
            <p className="mt-4 text-base leading-8 text-ink/70">
              Every rose is treated like a diamond. We check on each one daily, carefully protecting its beauty and quality through every stage of the process.
            </p>
            <p className="mt-4 text-base leading-8 text-ink/70">
              Once the roses arrive in the United States, they are meticulously printed, packaged, and prepared by our team using a precise, hands-on process. From there, each finished product is placed in luxurious packaging and delivered to distributors across the United States.
            </p>
            <p className="mt-5 text-base font-semibold text-rose">
              We are not beginners bringing a random product to market. We are a proven brand built on process, quality, and presentation.
            </p>

            {/* Process points */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {processPoints.map((p) => (
                <div key={p.label} className="flex items-center gap-3 rounded-xl border border-blush/50 bg-white px-4 py-3 shadow-sm">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-rose" />
                  <span className="text-sm font-semibold text-plum">{p.label}</span>
                </div>
              ))}
            </div>
            <CTA />
          </Reveal>

          {/* Process video */}
          <Reveal className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-blush/20">
            <div className="bg-plum px-5 py-4">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-gold">Watch the Process</p>
              <h3 className="mt-1 font-display text-xl text-white">See How Our Roses Are Grown, Preserved &amp; Prepared</h3>
              <p className="mt-1 text-sm text-white/55">A behind-the-scenes look at sourcing, preservation, printing, and packaging.</p>
            </div>
            <video src={PRODUCT_VIDEO_URL} controls playsInline className="h-auto w-full" poster="/rose-1.webp">
              Your browser does not support the video tag.
            </video>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNER PATHS ── */}
      <section id="opportunity" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <RoseIcon className="h-5 w-5" />
              </div>
            </div>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Choose the Partner Path That Fits Your Market</h2>
            <p className="mt-6 text-lg leading-8 text-ink/70">
              Speaking Roses offers different entry points depending on your goals, market, experience, and ability to grow. Start as a distributor, explore licensed production, or discuss a strategic partnership.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {paths.map((path, i) => (
              <Reveal key={path.title} className="relative rounded-2xl bg-white p-8 shadow-xl ring-1 ring-blush/40">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/30 bg-petal text-rose">
                  {i === 0 && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M16 11c0-2.21-1.79-4-4-4S8 8.79 8 11m0 0c0 2.21 1.79 4 4 4m-4-4H3m13 0h5M5 19h14" />
                    </svg>
                  )}
                  {i === 1 && <RoseIcon className="h-6 w-6" />}
                  {i === 2 && (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-display text-2xl text-plum">{path.title}</h3>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-rose/25 bg-rose/8 px-3 py-0.5">
                  <span className="text-[0.6875rem] font-bold uppercase tracking-wide text-rose">{path.sub}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink/70">{path.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 rounded-2xl bg-petal border border-blush/50 p-8 text-center shadow-sm">
            <RoseIcon className="mx-auto mb-3 h-6 w-6 text-rose" />
            <p className="text-xl font-semibold text-plum">Not sure which path fits you?</p>
            <p className="mt-1 text-ink/65">Apply and we&apos;ll review your market.</p>
            <CTA />
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="bg-plum py-24 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blush">From our partners</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">What partners are saying.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <p className="font-display text-4xl text-blush/50 leading-none">&ldquo;</p>
                <p className="mt-2 text-base leading-8 text-white/80">{t.quote}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-blush/60">{t.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA dark />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">How It Works</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Apply, Review, and Launch Your Market.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/70">
              Our process is designed to keep things selective, simple, and strategic. We review each application individually and guide qualified partners toward the right path for their market.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Apply", "Submit your information, market, and timeline so our team can review your interest."],
              ["2", "Review", "We evaluate fit, readiness, and market availability to determine the best partner path."],
              ["3", "Strategy Call", "Qualified applicants are invited to a Zoom call to discuss products, market opportunities, and next steps."],
              ["4", "Launch", "Move forward with the distributor, licensee, or strategic partner option that fits your goals."],
            ].map(([num, title, body]) => (
              <Reveal key={num} className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-blush/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10">
                  <span className="font-display text-xl font-bold text-gold">{num}</span>
                </div>
                <div className="my-3 h-px w-8 bg-gold/30" />
                <h3 className="text-lg font-bold text-plum">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink/65">{body}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-petal py-24">
        <div className="mx-auto max-w-7xl gap-12 px-5 lg:grid lg:grid-cols-[1fr_2fr]">
          <Reveal className="mb-10 lg:mb-0">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-rose">Questions</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Before You Apply</h2>
            <p className="mt-4 text-lg leading-8 text-ink/70">Answers to the questions serious partners ask most.</p>
            <p className="mt-4 text-sm leading-7 text-ink/65">
              Speaking Roses is selective. This is not an open sign-up program. We are looking for committed distributors, licensees, and exclusive partners who want to represent the brand correctly and grow their market.
            </p>
            <div className="mt-6 rounded-xl border border-rose/20 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <RoseIcon className="mt-0.5 h-5 w-5 shrink-0 text-rose" />
                <div>
                  <p className="font-semibold text-plum">What matters most</p>
                  <p className="mt-1 text-sm text-ink/65">Commitment, market fit, available funds, and the ability to represent the brand the right way.</p>
                </div>
              </div>
            </div>
            <CTA />
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} className="rounded-2xl border border-blush/40 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/10 text-sm font-bold text-rose">{i + 1}</span>
                  <div>
                    <h3 className="text-base font-bold text-plum">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/70">{faq.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section id="apply" className="relative bg-petal py-24 overflow-hidden">
        <Image src="/rose-1.webp" alt="" fill className="object-cover object-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-petal/90" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal>
            <div className="flex justify-center lg:justify-start mb-5">
              <Image src="/logo.svg" alt="Speaking Roses" width={200} height={52} className="h-10 w-auto" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rose">Apply to Check Availability</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Apply to<br /><span className="text-rose">Check Availability</span></h2>
            <p className="mt-2 font-display text-lg text-ink/55">See if your market is open.</p>

            {/* Trust icons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: "🌍", label: "Shipped Worldwide" },
                { icon: "💎", label: "Premium Quality" },
                { icon: "✅", label: "Trusted Worldwide" },
              ].map((tp) => (
                <div key={tp.label} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose/25 bg-rose/10 text-xl">
                    {tp.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-plum">{tp.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-ink/65">
              Spots are limited. We evaluate every applicant individually.{" "}
              <span className="font-semibold text-rose">Partners with $1,500+ in liquid funds and a timeline</span>{" "}
              within six months are redirected to book a call with the team. All leads are captured — the team may follow up for future openings.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-rose/20 bg-white p-4 shadow-sm">
              <RoseIcon className="h-8 w-8 shrink-0 text-rose" />
              <div>
                <p className="text-sm font-bold text-rose">Limited spots available</p>
                <p className="text-xs text-ink/55 uppercase tracking-widest font-semibold">High demand. Limited access.</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} showTitle />
          </Reveal>
        </div>
      </section>

      <footer className="bg-plum px-5 py-8 text-center text-sm text-white/50">© 2026 Speaking Roses. Privacy Policy | Terms</footer>

      {showFloat && (
        <a href="#apply" className="fixed bottom-5 right-5 z-50 rounded-full bg-rose px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-2xl transition hover:-translate-y-1 md:bottom-7 md:right-7">
          Apply Now →
        </a>
      )}
    </main>
  );
}
