import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getCart } from "@/lib/cart-actions";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant" });
const manrope = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-manrope" });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: { default: "Tante Taat · Handgesmeden sieraden met een verhaal", template: "%s · Tante Taat" },
  description:
    "Goudsmederij in Emmen. Moedermelk- en DNA-sieraden, vingerafdruk sieraden, geboorteringen, edelstenen en trouwringen. Handgesmeed van 100% duurzaam goud en zilver.",
  metadataBase: new URL("https://tantetaat.nl"),
  openGraph: { locale: "nl_NL", type: "website", siteName: "Tante Taat" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await getCart();
  return (
    <html lang="nl" className={`${cormorant.variable} ${manrope.variable} ${caveat.variable}`}>
      <body className="min-h-screen">
        <CartProvider initialCart={cart}>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
