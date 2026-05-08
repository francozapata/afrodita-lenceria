import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import AppProviders from "@/components/AppProviders";

export const metadata: Metadata = { title: "Afrodita Lencería", description: "Tienda online de lencería en Córdoba, Argentina" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es" data-scroll-behavior="smooth"><body><AppProviders><Nav />{children}<Footer /></AppProviders></body></html>;
}
