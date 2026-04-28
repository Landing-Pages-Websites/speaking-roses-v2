"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { useTracking } from "@/hooks/useTracking";

const BOOK_CALL_URL = "https://partnership.speakingroses.com/book-call";
const SITE_KEY = "sk_mo06cibl_0o7i2f0t7lxf";
const GTM_ID = "GTM-TTDNNJDM";
const SITE_ID = "8c4333c3-cd49-480a-8934-3914aec3901b";

// Videos from the Speaking Roses reference page
const BRAND_VIDEO_URL = "https://storage.googleapis.com/msgsndr/ioeX0AohKO7FTyLYF9kf/media/69025f3b074008a75d3aa1de.mp4";
const PRODUCT_VIDEO_URL = "https://storage.googleapis.com/msgsndr/WbJSzu9tJKeleGsNQ6dR/media/68252c05a1908e31dfd47a74.mp4";

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
    body: "Dive into the world of distribution without the production hustle. Earn the right to represent Speaking Roses in your market and bring this unique product to customers, companies, gift shops, weddings, fundraising campaigns, and local or national accounts. This is your opportunity to build a meaningful distribution business around a product that creates emotion, personalization, and unforgettable experiences.",
  },
  {
    title: "Licensee",
    body: "Access our patented technology, equipment, training, and support to produce and sell personalized flowers locally. Secure exclusive rights to your territory — city, region, or even country-level.",
  },
  {
    title: "Exclusive Partnerships",
    body: "For qualified partners, Speaking Roses offers the ability to explore exclusive partnership opportunities by zip code, city, state, country, industry, or market channel. As we expand worldwide, we are looking for serious strategic partners who can help bring Speaking Roses products into new regions, industries, and national accounts. These opportunities are selective and based on market fit, capacity, and the ability to represent the product at a high level.",
  },
];

const markets = [
  "Weddings and events",
  "Gift shops and retail",
  "Funeral homes",
  "Corporate gifts",
  "Fundraising groups",
  "Souvenir shops",
  "Promotional companies",
  "E-commerce and social selling",
];

const faqs = [
  {
    q: "Who is Speaking Roses looking for?",
    a: "We are selective. This is not an open sign-up program. We are looking for serious, committed distributors, licensees, and exclusive partners who are ready to lead their market and represent the brand correctly. Capacity is limited and every applicant is evaluated individually.",
  },
  {
    q: "What does it mean to 'earn the right to represent'?",
    a: "When someone joins the program, they are not just buying products. They are gaining access to the right to represent the brand, receive samples, access products, and potentially grow into larger opportunities — including production programs, exclusive territories, specific industries, regions, or even country-level opportunities in the future.",
  },
  {
    q: "Do I need to produce the roses myself?",
    a: "Not for the distributor path. Distributors purchase products at wholesale and resell locally. Licensees can explore production rights, equipment, training, and support to produce locally with exclusive territorial rights.",
  },
  {
    q: "What is the minimum investment?",
    a: "The minimum investment to start as a Distributor is $1,500 in liquid funds or credit. Licensee and Exclusive Partnership programs have higher minimums depending on scope and territory.",
  },
  {
    q: "What happens after I apply?",
    a: "Qualified applicants — those with $1,500+ in liquid funds and a timeline within six months — are redirected to schedule a Zoom call with the Speaking Roses team. All leads are captured and the team may follow up for future market openings.",
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
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  error: string;
  submitted: boolean;
  isQualified: boolean;
  compact?: boolean;
};

function ApplyForm({ form, setField, formatPhone, validatePhone, phoneError, setPhoneError, handleSubmit, isSubmitting, error, submitted, isQualified, compact = false }: ApplyFormProps) {
  return (
    <div className={`rounded-[2rem] bg-white p-6 text-ink shadow-2xl ${compact ? "md:p-7" : "md:p-8"}`}>
      {submitted && !isQualified ? (
        <div className="rounded-3xl bg-petal p-8 text-center">
          <h3 className="font-display text-4xl text-plum">Thanks for applying.</h3>
          <p className="mt-4 text-ink/72">Your information has been received. The Speaking Roses team will be in touch if your market and timing are a fit.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="firstName" required placeholder="First Name" value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} className="field" />
            <input name="lastName" required placeholder="Last Name" value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} className="field" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="email" required type="email" placeholder="Email" value={form.email} onChange={(e) => setField("email", e.target.value)} className="field" />
            <input name="phone" required type="tel" inputMode="numeric" placeholder="Phone" value={form.phone} onChange={(e) => { const next = formatPhone(e.target.value); setField("phone", next); setPhoneError(validatePhone(next)); }} className="field" />
          </div>
          {phoneError && <p className="text-sm font-semibold text-red-700">{phoneError}</p>}
          <label className="grid gap-2 text-sm font-semibold text-plum">
            <span>To start as a Distributor you need $1,500+ in liquid funds or credit. Which best fits you?</span>
            <select name="liquidFunds" required value={form.liquidFunds} onChange={(e) => setField("liquidFunds", e.target.value)} className="field">
              <option value="">Select liquid funds</option>
              <option value="under-1500">&lt;$1,500</option>
              <option value="1500-5000">$1,500–$5,000</option>
              <option value="5000-10000">$5,000–$10,000</option>
              <option value="10000-plus">$10,000+</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-plum">
            <span>How soon would you like to start?</span>
            <select name="timeline" required value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className="field">
              <option value="">Select timeline</option>
              <option value="immediately">Immediately</option>
              <option value="1-3-months">Over the next 1–3 months</option>
              <option value="3-6-months">3–6 months</option>
              <option value="6-plus-months">6+ months</option>
            </select>
          </label>
          <p className="text-xs leading-5 text-ink/60">By submitting, you agree to receive calls and SMS messages from Speaking Roses related to this partnership opportunity. Message and data rates may apply. Reply STOP to opt out.</p>
          {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
          <button disabled={isSubmitting} className="rounded-full bg-rose px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-plum disabled:opacity-60">
            {isSubmitting ? "Submitting..." : "Apply to Check Availability"}
          </button>
        </form>
      )}
    </div>
  );
}

function CTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <a href="#apply" className={`rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] shadow-xl transition hover:-translate-y-0.5 ${dark ? "bg-white text-plum" : "bg-rose text-white"}`}>
        Apply to Check Availability
      </a>
      <p className={`text-xs font-semibold tracking-wide ${dark ? "text-white/60" : "text-ink/50"}`}>Limited spots available</p>
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blush bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" aria-label="Speaking Roses home">
            <Image src="/logo.svg" alt="Speaking Roses" width={300} height={78} className="h-14 w-auto md:h-16" priority />
          </a>
          <a href="#apply" className="rounded-full bg-plum px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow transition hover:bg-rose">
            Apply Now
          </a>
        </div>
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0">
          <Image src="/hero-banner.png" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-10 lg:py-16">
          {/* Headline above the split */}
          <Reveal className="mb-8 text-center lg:text-left">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blush">Selective Distributor Recruitment — Limited Spots</p>
            <h1 className="font-display leading-[0.95] text-white">
              <span className="text-5xl md:text-7xl font-black text-blush drop-shadow-lg">Bring </span>
              <span className="text-4xl md:text-6xl">Personalized Roses to Your Market</span>
            </h1>
          </Reveal>
          {/* Product image LEFT — hero visual. Form RIGHT — secondary action */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
            <Reveal className="overflow-hidden rounded-[2rem] shadow-2xl ring-2 ring-white/20">
              <Image
                src="/rose-product.webp"
                alt="Speaking Roses personalized preserved rose"
                width={720}
                height={720}
                className="h-auto w-full object-cover"
                priority
              />
            </Reveal>
            <Reveal className="flex flex-col gap-5">
              <p className="text-lg leading-8 text-white/85">
                Speaking Roses prints messages, logos, and images directly on preserved rose petals — turning a flower into a lasting memory. We are expanding worldwide and accepting serious, qualified partners to lead local markets. This is not open wholesale. Spots are earned.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <span className="rounded-full bg-white/90 px-4 py-2 text-plum shadow-sm">Distributor</span>
                <span className="rounded-full bg-white/90 px-4 py-2 text-plum shadow-sm">Licensee</span>
                <span className="rounded-full bg-white/90 px-4 py-2 text-plum shadow-sm">Exclusive Partnerships</span>
              </div>
              <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} compact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SECTION — finished product only, no process video ── */}
      <section id="product" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">The product</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A rose that becomes a memory.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">
              Ordinary flowers fade and get thrown away. A Speaking Rose is different. We print personalized messages, logos, and images directly on real preserved rose petals — creating a gift customers keep on their desk, give to clients, bring to a wedding, and remember for years.
            </p>
            <p className="mt-5 text-lg leading-8 text-ink/72">
              The personalization is what sells it. The moment someone sees their name, logo, or message on a real rose petal, the reaction is immediate. This is a product that sells itself.
            </p>
          </Reveal>
          {/* Product gallery — finished product photos, no process/growing video here */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["/rose-1.webp", "/rose-2.webp", "/rose-3.webp"].map((src, index) => (
              <Reveal key={src} className="overflow-hidden rounded-[2rem] bg-petal p-3 shadow-xl">
                <Image src={src} alt={`Speaking Roses personalized preserved rose ${index + 1}`} width={720} height={720} className="h-80 w-full rounded-[1.5rem] object-cover" />
              </Reveal>
            ))}
          </div>
          {/* Product video — shows the finished product experience */}
          <Reveal className="mt-10 overflow-hidden rounded-[2rem] bg-petal p-3 shadow-2xl max-w-3xl mx-auto">
            <video
              src={PRODUCT_VIDEO_URL}
              controls
              playsInline
              className="h-auto w-full rounded-[1.5rem]"
              poster="/rose-1.webp"
            >
              Your browser does not support the video tag.
            </video>
          </Reveal>
          <CTA />
        </div>
      </section>

      {/* ── HOLLYWOOD APPROVED / PRESS — full powerful logo row ── */}
      <section id="press" className="bg-plum py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-blush">Hollywood Approved</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Featured in 500+ outlets. Grammys. Oscars. The Ellen Show.</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Speaking Roses has been on some of the world&apos;s most recognized stages — from top business publications to Hollywood award shows. Featured at the Grammys, the Oscars, The Ellen Show, partnerships with Disney, and validated by Forbes, the Wall Street Journal, Good Morning America, CNN, Inc. Magazine, and 500+ media outlets worldwide.
            </p>
            <p className="mt-5 text-lg leading-8 text-white/75">
              This is not a startup product. This is a brand with two decades of proof, global media recognition, and staying power. That is what you earn the right to represent.
            </p>
          </Reveal>

          {/* Full media logo strip — all SVG, crisp at any size */}
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {[
              { src: "/logo-forbes.svg",  alt: "Forbes",               dark: false },
              { src: "/logo-wsj.svg",     alt: "Wall Street Journal",  dark: false },
              { src: "/logo-oscars.svg",  alt: "Oscars",               dark: false },
              { src: "/logo-grammys.svg", alt: "Grammys",              dark: false },
              { src: "/logo-ellen.svg",   alt: "The Ellen Show",       dark: true  },
              { src: "/logo-fox.svg",     alt: "Fox News",             dark: false },
              { src: "/logo-cnn.svg",     alt: "CNN",                  dark: false },
              { src: "/logo-gma.svg",     alt: "Good Morning America", dark: false },
              { src: "/logo-inc.svg",     alt: "Inc. Magazine",        dark: false },
              { src: "/logo-e.svg",       alt: "E! Entertainment",     dark: true  },
            ].map((logo) => (
              <div key={logo.alt} className={`flex h-12 items-center justify-center rounded-xl px-5 py-2 shadow-sm ${logo.dark ? "bg-plum" : "bg-white"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-7 w-auto object-contain"
                />
              </div>
            ))}
          </Reveal>
          <CTA dark />
        </div>
      </section>

      {/* ── PROOF STATS ── */}
      <section id="proof" className="bg-rose py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-white/70">The opportunity in numbers</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Built on two decades of proof.</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(([title, label]) => (
              <Reveal key={title} className="rounded-3xl border border-white/20 bg-white/10 p-6">
                <div className="font-display text-4xl text-white">{title}</div>
                <p className="mt-3 text-sm leading-6 text-white/80">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA dark />
      </section>

      {/* ── BRAND HISTORY / OUR STORY — Andes video lives here ── */}
      <section id="story" className="bg-petal py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Our story</p>
            <h2 className="font-display text-4xl text-plum md:text-5xl">Born in the Majestic Andes. Perfected over 20 years.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">
              Our roses are raised in the majestic mountains of South America. Once fully mature, they are cut and guided through a two-plus-week, diamond-grade preservation process — individually perfected to look, feel, and smell real, while lasting for years.
            </p>
            <p className="mt-5 text-lg leading-8 text-ink/72">
              The technology to print directly on petals took over 20 years to develop and is protected by patents. This is not a commodity. When a customer holds a Speaking Rose with their logo, their name, or their message on the petal — the reaction is immediate. Emotion. Surprise. Delight. That feeling is what you are selling.
            </p>
            <p className="mt-5 text-lg leading-8 text-ink/72 font-semibold text-plum">
              We are not beginners bringing a random product to market. That product — and that credibility — is what you earn the right to represent.
            </p>
            <CTA />
          </Reveal>
          {/* Andes/origin/brand story video — correct placement: story section, not product */}
          <Reveal className="overflow-hidden rounded-[2rem] bg-white/80 p-3 shadow-2xl ring-1 ring-blush/30">
            <video
              src={BRAND_VIDEO_URL}
              controls
              playsInline
              className="h-auto w-full rounded-[1.5rem]"
            >
              Your browser does not support the video tag.
            </video>
            <p className="mt-3 px-2 pb-1 text-center text-sm text-ink/50">The journey: from the Andes to the Oscars.</p>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNERSHIP OPPORTUNITY ── */}
      <section id="opportunity" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Partnership Opportunity</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">This is selective. Capacity is limited.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">
              Speaking Roses is not open wholesale. This is a brand representation opportunity — not just a product purchasing program. When you join, you are not just buying products. You are gaining the right to represent the brand, receive samples, access products, and potentially grow into larger opportunities — including production programs, exclusive territories, specific industries, regions, or even country-level opportunities in the future.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {paths.map((path) => (
              <Reveal key={path.title} className="rounded-[2rem] border border-blush bg-petal p-7 shadow-sm">
                <Icon>
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M5 9c4 0 7-3 7-7 0 4 3 7 7 7-4 0-7 3-7 7 0-4-3-7-7-7Z" />
                  </svg>
                </Icon>
                <h3 className="font-display text-3xl text-plum">{path.title}</h3>
                <p className="mt-4 leading-7 text-ink/72">{path.body}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      {/* ── WHERE PARTNERS SELL ── */}
      <section id="markets" className="bg-petal py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Where partners sell</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Built for high-emotion, high-intent occasions.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">
              A Speaking Rose sells itself the moment someone sees it. The personalization angle opens doors in virtually every relationship-driven sales channel — from wedding planners and funeral homes to corporate gift buyers, retail brands, and fundraising organizations.
            </p>
            <CTA />
          </Reveal>
          <Reveal className="grid content-center gap-3 sm:grid-cols-2">
            {markets.map((market) => (
              <div key={market} className="flex min-h-14 items-center justify-center rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold leading-snug text-plum shadow-sm ring-1 ring-blush/70">
                {market}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="bg-plum py-20 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-blush">From our partners</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">What partners are saying.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <Reveal key={t.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                <svg className="mb-5 h-8 w-8 text-blush" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg leading-8 text-white/85">{t.quote}</p>
                <div className="mt-6">
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-white/55">{t.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA dark />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">How it works</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Apply, qualify, and schedule a partnership call.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Apply to Check Availability", "Tell us about your market, your available funds, and your timeline. Every application is reviewed individually — we are not an open sign-up."],
              ["02", "Qualification review", "Qualified partners have at least $1,500 in liquid funds or credit and a start timeline within six months. We evaluate every applicant and select serious partners only."],
              ["03", "Book a Zoom call", "Qualified applicants are redirected to schedule a call with the Speaking Roses team to explore the opportunity, your market, and next steps."],
            ].map(([num, title, body]) => (
              <Reveal key={num} className="rounded-[2rem] bg-plum p-8 text-white shadow-xl">
                <div className="font-display text-5xl text-blush">{num}</div>
                <h3 className="mt-8 text-2xl font-bold text-white">{title}</h3>
                <p className="mt-4 leading-7 text-white/75">{body}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-petal py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Questions</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Before you apply</h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <Reveal key={faq.q} className="rounded-3xl border border-blush bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-plum">{faq.q}</h3>
                <p className="mt-3 leading-7 text-ink/72">{faq.a}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section id="apply" className="bg-plum py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-blush">Apply to Check Availability</p>
            <h2 className="font-display text-4xl text-white md:text-6xl">See if your market is open.</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              Spots are limited. We evaluate every applicant individually. Partners with $1,500+ in liquid funds and a timeline within six months are redirected to book a call with the team. All leads are captured — the team may follow up for future openings.
            </p>
            <p className="mt-4 text-sm font-semibold text-blush/80 uppercase tracking-wide">Limited spots available</p>
          </Reveal>
          <Reveal>
            <ApplyForm form={form} setField={setField} formatPhone={formatPhone} validatePhone={validatePhone} phoneError={phoneError} setPhoneError={setPhoneError} handleSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} submitted={submitted} isQualified={isQualified} />
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-5 py-8 text-center text-sm text-white/60">© 2026 Speaking Roses. Privacy Policy | Terms</footer>

      {showFloat && (
        <a href="#apply" className="fixed bottom-5 right-5 z-50 rounded-full bg-rose px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-2xl transition hover:-translate-y-1 md:bottom-7 md:right-7">
          Apply to Check Availability
        </a>
      )}
    </main>
  );
}
