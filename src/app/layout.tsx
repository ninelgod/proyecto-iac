import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veterinaria Goicochea - Cuidado Profesional para tu Mascota",
  description: "Servicios veterinarios profesionales con más de 20 años de experiencia. Consultas, cirugías, emergencias y cuidado integral para tu mascota en Veterinaria Goicochea.",
  keywords: "veterinaria, mascotas, perros, gatos, consultas veterinarias, cirugías, emergencias, vacunas, Goicochea",
  authors: [{ name: "Veterinaria Goicochea" }],
  openGraph: {
    title: "Veterinaria Goicochea - Cuidado Profesional",
    description: "Servicios veterinarios profesionales con experiencia y dedicación",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}