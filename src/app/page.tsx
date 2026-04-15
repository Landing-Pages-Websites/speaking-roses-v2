"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import { useTracking } from "@/hooks/useTracking";

const BOOK_CALL_URL = "https://partnership.speakingroses.com/book-call";
const SITE_KEY = "sk_mo06cibl_0o7i2f0t7lxf";
const GTM_ID = "GTM-TTDNNJDM";

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

const proofPoints = [
  ["$334B+", "personalization market referenced on the Speaking Roses partnership page"],
  ["500+", "outlets and events referenced on the partnership page, including Forbes, Inc, Grammys, and Oscars"],
  ["20+ years", "developing the printing process, referenced on the Speaking Roses main site"],
  ["$1,500+", "liquid funds or credit listed on the source form for Distributor applicants"],
];

const paths = [
  {
    title: "Distributor",
    body: "Buy Speaking Roses products at wholesale and resell in your local market without handling production.",
  },
  {
    title: "Influencer Partner",
    body: "Promote personalized roses through social media, fundraising, and community channels with your own affiliate link.",
  },
  {
    title: "Licensee",
    body: "Access patented technology, equipment, training, and support to produce and sell personalized flowers locally.",
  },
  {
    title: "Strategic Operator",
    body: "Open national accounts, build channel partnerships, and lead larger territory or country-level opportunities.",
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
    a: "The company is seeking local distributors, influencer partners, licensees, and operators who can bring personalized preserved roses into their market.",
  },
  {
    q: "Do I need to produce the roses myself?",
    a: "Not for the distributor path. Distributors can purchase products at wholesale and resell locally. Licensees can explore production rights, equipment, training, and support.",
  },
  {
    q: "What markets can partners sell into?",
    a: "The reference page names gift shops, funeral homes, wedding planners, fundraising groups, souvenir shops, promotional companies, retail brands, social media, and e-commerce.",
  },
  {
    q: "What happens after I apply?",
    a: "Qualified applicants with at least $1,500 in liquid funds or credit and a timeline within six months are redirected to schedule a Zoom call with the Speaking Roses team.",
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
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

function CTA({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-10 flex items-center justify-center">
      <a href="#apply" className={`rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] shadow-xl transition hover:-translate-y-0.5 ${dark ? "bg-white text-plum" : "bg-rose text-white"}`}>
        Apply for Availability
      </a>
    </div>
  );
}

export default function Home() {
  useTracking({ siteKey: SITE_KEY, gtmId: GTM_ID });
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
    if (!emailValid) {
      setError("Enter a valid email address.");
      return;
    }

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-blush bg-white/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#hero" className="flex items-center gap-3" aria-label="Speaking Roses home">
            <Image src="/logo.svg" alt="Speaking Roses" width={300} height={78} className="h-16 w-auto md:h-20" priority />
          </a>
          <a href="#apply" className="rounded-full bg-plum px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-rose">
            Apply Now
          </a>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden bg-petal pt-32 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(224,192,200,.55),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,79,101,.18),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <Reveal className="flex flex-col justify-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-rose">Distributor recruitment</p>
            <h1 className="font-display text-5xl leading-[0.95] text-plum md:text-7xl">Bring personalized preserved roses to your market.</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-ink/78">Speaking Roses pairs real preserved roses with printed messages, logos, and images on the petals. The company is expanding worldwide and seeking qualified partners to lead local markets.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-plum">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Distributor</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Influencer Partner</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">Licensee</span>
            </div>
            <CTA />
          </Reveal>
          <Reveal className="relative">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-rose/20 blur-2xl" />
            <div className="overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl">
              <Image src="/hero.jpeg" alt="Personalized Speaking Roses preserved rose display" width={960} height={720} className="h-[560px] w-full rounded-[2rem] object-cover" priority />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="proof" className="bg-plum py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-blush">What the opportunity includes</p>
            <h2 className="font-display text-4xl md:text-5xl">Source-backed paths for qualified partners.</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map(([title, label]) => (
              <Reveal key={title} className="rounded-3xl border border-white/15 bg-white/8 p-6 text-left">
                <div className="font-display text-4xl">{title}</div>
                <p className="mt-3 text-sm leading-6 text-white/75">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <CTA dark />
      </section>

      <section id="opportunity" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Partnership Opportunity</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A product built for memorable gifting moments.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">The reference page highlights demand across Mother’s Day, weddings, anniversaries, birthdays, funerals, corporate gifts, fundraising opportunities, and more.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {paths.map((path) => (
              <Reveal key={path.title} className="rounded-[2rem] border border-blush bg-petal p-7 shadow-sm">
                <Icon><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M5 9c4 0 7-3 7-7 0 4 3 7 7 7-4 0-7 3-7 7 0-4-3-7-7-7Z" /></svg></Icon>
                <h3 className="font-display text-3xl text-plum">{path.title}</h3>
                <p className="mt-4 leading-7 text-ink/72">{path.body}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      <section id="markets" className="bg-petal py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Where partners sell</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Built for high-emotion, high-intent occasions.</h2>
            <p className="mt-6 text-lg leading-8 text-ink/72">Speaking Roses gives partners a product with visual impact and personalization, suited for both direct sales and relationship-driven local channels.</p>
            <CTA />
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {markets.map((market) => (
              <div key={market} className="rounded-3xl bg-white p-5 font-semibold text-plum shadow-sm">{market}</div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="process" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">How it works</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Apply, qualify, and schedule a partnership call.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Apply for market availability", "Tell Speaking Roses about your market, funds, and timing."],
              ["02", "Qualification review", "Qualified leads have at least $1,000 in liquid funds and a timeline under six months."],
              ["03", "Book a Zoom call", "Qualified applicants are redirected to schedule a call to explore the opportunity."],
            ].map(([num, title, body]) => (
              <Reveal key={num} className="rounded-[2rem] bg-plum p-8 text-white shadow-xl">
                <div className="font-display text-5xl text-blush">{num}</div>
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-4 leading-7 text-white/75">{body}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      <section id="gallery" className="bg-petal py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Personalized products</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">A gift designed to become an experience and a memory.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["/rose-1.webp", "/rose-2.webp", "/rose-3.webp"].map((src, index) => (
              <Reveal key={src} className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl">
                <Image src={src} alt={`Speaking Roses personalized preserved rose example ${index + 1}`} width={720} height={720} className="h-80 w-full rounded-[1.5rem] object-cover" />
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      <section id="faq" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-rose">Questions</p>
            <h2 className="font-display text-4xl text-plum md:text-6xl">Before you apply</h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <Reveal key={faq.q} className="rounded-3xl border border-blush bg-petal p-7">
                <h3 className="text-xl font-bold text-plum">{faq.q}</h3>
                <p className="mt-3 leading-7 text-ink/72">{faq.a}</p>
              </Reveal>
            ))}
          </div>
          <CTA />
        </div>
      </section>

      <section id="apply" className="bg-plum py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-blush">Apply for availability</p>
            <h2 className="font-display text-4xl md:text-6xl">See if your market is open.</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">Qualified leads are redirected to book a call after submission. Unqualified leads are still captured for follow-up but do not receive the automatic booking redirect.</p>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-white p-6 text-ink shadow-2xl md:p-8">
            {submitted && !isQualified ? (
              <div className="rounded-3xl bg-petal p-8 text-center">
                <h3 className="font-display text-4xl text-plum">Thanks for applying.</h3>
                <p className="mt-4 text-ink/72">Your information has been received. The Speaking Roses team can follow up if your market and timing are a fit.</p>
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
                    <option value="under-1500">I don’t have $1,500</option>
                    <option value="1500-5000">$1,500–$5,000 liquid/credit</option>
                    <option value="5000-10000">$5,000–$10,000 liquid/credit</option>
                    <option value="10000-plus">$10,000+ liquid/credit</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-plum">
                  <span>How soon would you like to start?</span>
                  <select name="timeline" required value={form.timeline} onChange={(e) => setField("timeline", e.target.value)} className="field">
                    <option value="">Select timeline</option>
                    <option value="immediately">Immediately</option>
                    <option value="3-6-months">Within 3–6 months</option>
                    <option value="6-plus-months">More than 6 months from now</option>
                  </select>
                </label>
                <p className="text-xs leading-5 text-ink/60">By submitting, you agree to receive calls and SMS messages from Speaking Roses related to this partnership opportunity. Message and data rates may apply. Reply STOP to opt out.</p>
                {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
                <button disabled={isSubmitting} className="rounded-full bg-rose px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl transition hover:bg-plum disabled:opacity-60">
                  {isSubmitting ? "Submitting..." : "Apply for Availability"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink px-5 py-8 text-center text-sm text-white/60">© 2026 Speaking Roses. Privacy Policy | Terms</footer>

      {showFloat && (
        <a href="#apply" className="fixed bottom-5 right-5 z-50 rounded-full bg-rose px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-2xl transition hover:-translate-y-1 md:bottom-7 md:right-7">
          Apply Now
        </a>
      )}
    </main>
  );
}
