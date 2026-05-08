"use client";
import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function AddToCartPanel({product,image}:{product:Product; image:string|null}){
  const {addItem}=useCart();
  const variants=product.product_variants||[];
  const colors=[...new Set(variants.map(v=>v.color))];
  const [color,setColor]=useState(colors[0]||"");
  const sizes=[...new Set(variants.filter(v=>!color||v.color===color).map(v=>v.size))];
  const [size,setSize]=useState(sizes[0]||"");
  const selected=useMemo(()=>variants.find(v=>v.color===color && v.size===size) as ProductVariant|undefined,[variants,color,size]);
  function add(){ if(!selected||selected.stock<=0) return alert('Elegí una variante con stock'); addItem({productId:product.id,variantId:selected.id,name:product.name,slug:product.slug,price:Number(product.price),image,size:selected.size,color:selected.color,quantity:1,stock:selected.stock}); alert('Producto agregado al carrito'); }
  return <div className="card p-6">
    <h2 className="text-2xl font-black">Elegí talle y color</h2>
    <p className="mt-1 text-sm leading-6 text-[#80666b]">Las variantes disponibles se toman del stock real cargado en el admin.</p>
    <div className="mt-6 grid gap-5">
      <div><p className="mb-3 text-sm font-black uppercase tracking-[.12em] text-[#80666b]">Color</p><div className="flex flex-wrap gap-2">{colors.map(c=><button key={c} onClick={()=>{setColor(c); const first=variants.find(v=>v.color===c); setSize(first?.size||'')}} className={`rounded-full border px-4 py-2 text-sm font-black transition ${color===c?'border-[#5b2738] bg-[#5b2738] text-white shadow-lg shadow-[#5b2738]/20':'border-[#ead8d0] bg-white text-[#493238] hover:border-[#c6a24a]'}`}>{c}</button>)}</div></div>
      <div><p className="mb-3 text-sm font-black uppercase tracking-[.12em] text-[#80666b]">Talle</p><div className="flex flex-wrap gap-2">{sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={`rounded-full border px-4 py-2 text-sm font-black transition ${size===s?'border-[#5b2738] bg-[#5b2738] text-white shadow-lg shadow-[#5b2738]/20':'border-[#ead8d0] bg-white text-[#493238] hover:border-[#c6a24a]'}`}>{s}</button>)}</div></div>
      <div className="rounded-3xl bg-[#fff8ef] p-4 text-sm font-semibold text-[#80666b]"><CheckCircle2 className="mr-2 inline text-[#c6a24a]" size={18}/> Stock disponible: <b className="text-[#493238]">{selected?.stock ?? 0}</b></div>
      <button onClick={add} disabled={!selected||selected.stock<=0} className="btn-primary w-full disabled:opacity-50"><ShoppingBag size={18}/> Agregar al carrito</button>
    </div>
  </div>;
}
