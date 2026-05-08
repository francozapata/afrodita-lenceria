import Image from "next/image";
import Link from "next/link";
import { getProductById, productImage, totalStock } from "@/lib/catalog";
import AddToCartPanel from "./AddToCartPanel";
import { ArrowLeft, ShieldCheck, Truck, Ruler } from "lucide-react";

export default async function ProductDetail({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const product=await getProductById(id);
  if(!product) return <main className="section"><h1>No encontrado</h1></main>;
  const main=productImage(product); const stock=totalStock(product);
  return <main className="section">
    <Link href="/productos" className="inline-flex items-center gap-2 text-sm font-bold text-[#80666b] hover:text-[#c6a24a]"><ArrowLeft size={16}/> Volver al catálogo</Link>
    <section className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
      <div>
        <div className="card relative aspect-[4/5] overflow-hidden bg-[#fff8ef]"><Image src={main} alt={product.name} fill priority sizes="(max-width:1024px) 100vw, 620px" className="object-cover"/></div>
        {!!product.product_images?.length&&<div className="mt-4 grid grid-cols-4 gap-3">{product.product_images?.map(img=><div key={img.id} className="relative aspect-square overflow-hidden rounded-3xl border border-[#ead8d0] bg-white shadow-sm"><Image src={img.image_url} alt={product.name} fill sizes="140px" className="object-cover"/></div>)}</div>}
      </div>
      <div className="lg:sticky lg:top-32 lg:h-fit">
        <span className="badge">Stock total: {stock}</span>
        <h1 className="heading-lg mt-4">{product.name}</h1>
        <div className="mt-4 flex items-end gap-3">{product.compare_at_price&&<span className="text-lg text-[#9d8589] line-through">${Number(product.compare_at_price).toLocaleString('es-AR')}</span>}<span className="text-4xl font-black text-[#5b2738]">${Number(product.price).toLocaleString('es-AR')}</span></div>
        <p className="mt-5 text-lg leading-8 text-[#80666b]">{product.description}</p>
        <div className="mt-6"><AddToCartPanel product={product} image={main}/></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Info icon={<Ruler/>} title="Talles" text="Revisá guía antes de comprar."/>
          <Info icon={<Truck/>} title="Envío" text="Se calcula en checkout."/>
          <Info icon={<ShieldCheck/>} title="Higiene" text="Cambios con condiciones."/>
        </div>
        <div className="mt-5 rounded-3xl border border-[#ead8d0] bg-[#fff8ef] p-5 text-sm leading-7 text-[#80666b]"><b className="text-[#493238]">Importante:</b> por tratarse de ropa interior, revisá talle, color y descripción antes de confirmar. Los cambios están sujetos a la política de higiene.</div>
      </div>
    </section>
  </main>;
}
function Info({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="card-soft p-4"><div className="text-[#c6a24a]">{icon}</div><p className="mt-2 font-black">{title}</p><p className="mt-1 text-xs leading-5 text-[#80666b]">{text}</p></div>}
