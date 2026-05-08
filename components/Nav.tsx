"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, UserRound, ShieldCheck, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState } from "react";

const links = [
  ["/productos", "Productos"],
  ["/guia-de-talles", "Guía de talles"],
  ["/como-comprar", "Cómo comprar"],
  ["/envios", "Envíos"],
  ["/contacto", "Contacto"],
];

export default function Nav() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8d0]/80 bg-[#fffaf6]/86 backdrop-blur-xl">
      <div className="hidden bg-[#5b2738] px-4 py-2 text-center text-xs font-bold tracking-[.18em] text-[#fff7ea] md:block">
        <span className="inline-flex items-center gap-2"><Sparkles size={14}/> Afrodita Lencería · Stock por talle y color · Pedidos online</span>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative h-14 w-14 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#ead8d0]">
            <Image src="/afrodita-logo.jpg" alt="Afrodita" fill sizes="56px" priority className="object-contain p-1" />
          </span>
          <span>
            <b className="block font-display text-3xl leading-6 text-[#493238]">Afrodita</b>
            <span className="text-xs font-black tracking-[.38em] text-[#c6a24a]">LENCERÍA</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold text-[#493238] md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="transition hover:text-[#c6a24a]">{label}</Link>
          ))}
          <Link href="/admin" className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[#80666b] shadow-sm ring-1 ring-[#ead8d0]"><ShieldCheck size={16}/>Admin</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-[#ead8d0]"><UserRound size={20}/></Link>
          <Link href="/carrito" className="relative grid h-11 w-11 place-items-center rounded-full bg-[#5b2738] text-white shadow-lg shadow-[#5b2738]/20">
            <ShoppingBag size={20}/>
            {count > 0 && <span className="absolute -right-1 -top-2 rounded-full bg-[#c6a24a] px-2 py-0.5 text-xs font-black text-white">{count}</span>}
          </Link>
          <button className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm ring-1 ring-[#ead8d0] md:hidden" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-[#ead8d0] bg-white/95 px-4 py-4 md:hidden">
          {links.map(([href, label]) => <Link onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 font-bold" key={href} href={href}>{label}</Link>)}
          <Link onClick={() => setOpen(false)} href="/admin" className="block rounded-2xl px-3 py-3 font-bold">Admin</Link>
        </div>
      )}
    </header>
  );
}
