import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

const siteId = "speaking-roses-pending";
const siteKey = "sk_speaking_roses_pending";

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
            __html: `window.MEGA_TAG_CONFIG={siteKey:"${siteKey}",siteId:"${siteId}"};window.API_ENDPOINT="https://optimizer.gomega.ai";window.TRACKING_API_ENDPOINT="https://events-api.gomega.ai";`,
          }}
        />
        <script id="optimizer-script" src="https://cdn.gomega.ai/scripts/optimizer.min.js" data-site-id={siteId} async />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
