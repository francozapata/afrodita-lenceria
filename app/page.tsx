import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";
import { ArrowRight, Heart, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";

export default async function Home(){
  const products=(await getProducts()).filter(p=>p.is_featured).slice(0,4);
  return <main>
    <section className="section grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <span className="badge"><Sparkles size={14}/> Nueva experiencia online</span>
        <h1 className="heading-xl mt-6">Lencería elegante, cómoda y fácil de comprar.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#80666b]">Una tienda pensada para comprar por talle, color y stock real, con carrito, pedidos, guía de talles y administración simple para cargar prendas nuevas.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/productos" className="btn-primary">Ver colección <ArrowRight size={18}/></Link><Link href="/guia-de-talles" className="btn-secondary">Elegir mi talle</Link></div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Mini text="Stock real"/><Mini text="Pedidos online"/><Mini text="Atención cercana"/>
        </div>
      </div>
      <div className="card lux-panel relative min-h-[520px] overflow-hidden bg-[#fffaf6]">
        <div className="absolute left-5 top-5 z-10 rounded-full bg-white/85 px-4 py-2 text-xs font-black tracking-[.18em] text-[#7b334b] shadow-sm">AFRODITA LENCERÍA</div>
        <Image src="/afrodita-logo.jpg" alt="Afrodita" fill priority sizes="(max-width:1024px) 100vw, 620px" className="object-contain p-10"/>
        <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/82 p-5 shadow-xl backdrop-blur">
          <p className="font-display text-3xl font-black">Nueva colección</p>
          <p className="mt-1 text-sm text-[#80666b]">Encaje, algodón, morley, básicos, bodys y accesorios.</p>
        </div>
      </div>
    </section>

    <section className="section grid gap-4 md:grid-cols-3">
      <Info icon={<Truck/>} title="Envíos configurables" text="Retiro, Córdoba capital, interior o zonas personalizadas desde admin."/>
      <Info icon={<ShieldCheck/>} title="Compra protegida" text="Políticas claras de cambios, privacidad y condiciones de uso."/>
      <Info icon={<PackageCheck/>} title="Stock por variante" text="Control real por producto, talle, color e imagen."/>
    </section>

    <section className="section">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div><p className="kicker">Destacados</p><h2 className="heading-lg">Elegidos de Afrodita</h2></div>
        <Link href="/productos" className="btn-secondary w-fit">Ver todo <ArrowRight size={18}/></Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}{!products.length&&<div className="card p-8 text-[#80666b]">Marcá productos como destacados desde el admin para verlos acá.</div>}</div>
    </section>

    <section className="section">
      <div className="card grid overflow-hidden lg:grid-cols-2">
        <div className="p-8 md:p-12"><p className="kicker">Experiencia premium</p><h2 className="heading-lg mt-3">Compra simple, visual y cuidada.</h2><p className="mt-5 leading-8 text-[#80666b]">La tienda está preparada para mostrar prendas con imágenes, variantes y detalle de stock, manteniendo una estética delicada y profesional.</p><Link href="/como-comprar" className="btn-primary mt-7">Cómo comprar</Link></div>
        <div className="grid gap-4 bg-[#5b2738] p-8 text-white md:p-12">
          <Feature icon={<Heart/>} title="Favoritos visuales" text="Cards pensadas para vender desde la imagen."/>
          <Feature icon={<ShieldCheck/>} title="Confianza" text="Legales y políticas visibles antes de comprar."/>
          <Feature icon={<Truck/>} title="Envíos claros" text="El cliente ve el costo antes de confirmar."/>
        </div>
      </div>
    </section>
  </main>;
}
function Mini({text}:{text:string}){return <div className="card-soft px-4 py-3 text-sm font-black text-[#5b2738]">{text}</div>}
function Info({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="card p-6 transition hover:-translate-y-1"><div className="mb-4 inline-flex rounded-2xl bg-[#fff8ef] p-3 text-[#c6a24a]">{icon}</div><h3 className="text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#80666b]">{text}</p></div>}
function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="rounded-3xl border border-white/15 bg-white/8 p-5"><div className="mb-3 text-[#f7d7d2]">{icon}</div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-white/75">{text}</p></div>}
