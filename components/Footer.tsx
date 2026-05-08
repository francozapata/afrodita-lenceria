import Link from "next/link";
import { Heart, Camera, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[#ead8d0] bg-[#fffaf6]/85">
      <div className="section grid gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div>
          <p className="font-display text-4xl font-black text-[#493238]">Afrodita</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-[#80666b]">Tienda online de lencería, básicos, encaje, accesorios y prendas seleccionadas con stock por talle y color.</p>
          <div className="mt-5 flex gap-2 text-[#5b2738]"><Camera/><MessageCircle/><Mail/></div>
        </div>
        <FooterCol title="Comprar" links={[["/productos","Productos"],["/guia-de-talles","Guía de talles"],["/como-comprar","Cómo comprar"],["/envios","Envíos"]]} />
        <FooterCol title="Ayuda" links={[["/contacto","Contacto"],["/cambios-y-devoluciones","Cambios"],["/legal/terminos","Términos"],["/legal/privacidad","Privacidad"]]} />
        <div className="card-soft p-5">
          <p className="font-black text-[#493238]">Atención cercana</p>
          <p className="mt-2 text-sm leading-6 text-[#80666b]">Consultas por Instagram, WhatsApp o email. Revisá siempre talle, color y descripción antes de confirmar.</p>
        </div>
      </div>
      <div className="border-t border-[#ead8d0] px-4 py-5 text-center text-xs font-bold text-[#80666b]">
        Hecho con <Heart className="inline" size={14}/> para Afrodita Lencería.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return <div><p className="mb-3 font-black text-[#493238]">{title}</p>{links.map(([href,label])=><Link key={href} href={href} className="block py-1.5 text-sm font-semibold text-[#80666b] hover:text-[#c6a24a]">{label}</Link>)}</div>;
}
