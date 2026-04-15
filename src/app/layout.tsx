import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteId = "7ff55ad5-2e07-4c13-b612-d054f0bd2c71";
const siteKey = "sk_919b18a6_omsu57qhb5v";
const gtmId = "GTM-TTDNNJDM";

export const metadata: Metadata = {
  title: "Speaking Roses Partnership | Distributor Recruitment",
  description:
    "Apply to bring personalized preserved Speaking Roses products to your local market as a distributor, influencer partner, licensee, or strategic operator.",
  openGraph: {
    title: "Speaking Roses Partnership | Distributor Recruitment",
    description:
      "Speaking Roses is expanding worldwide and seeking qualified partners to lead local markets with personalized preserved roses.",
    images: ["/hero.jpeg"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="mega-site-id" content={siteId} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${siteKey}",siteId:"${siteId}",gtmId:"${gtmId}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script id="optimizer-script" src="https://cdn.gomega.ai/scripts/optimizer.min.js" data-site-id={siteId} async />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script src="https://572388.tctm.co/t.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
