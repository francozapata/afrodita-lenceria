"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartPage(){
  const {items,subtotal,removeItem,updateQty}=useCart();
  return <main className="section">
    <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full bg-[#5b2738] text-white"><ShoppingBag/></span><div><p className="kicker">Tu compra</p><h1 className="heading-lg">Carrito</h1></div></div>
    {!items.length?<div className="card mt-6 p-8"><p className="text-lg text-[#80666b]">Tu carrito está vacío.</p><Link href="/productos" className="btn-primary mt-5">Ver productos <ArrowRight size={18}/></Link></div>:<section className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">{items.map(item=><div key={item.variantId} className="card flex gap-4 p-4 md:p-5"><div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-3xl bg-white"><Image src={item.image||'/afrodita-logo.jpg'} alt={item.name} fill sizes="112px" className="object-cover"/></div><div className="flex-1"><h2 className="text-lg font-black">{item.name}</h2><p className="mt-1 text-sm font-semibold text-[#80666b]">Talle {item.size} · Color {item.color}</p><p className="mt-2 text-xl font-black text-[#5b2738]">${item.price.toLocaleString('es-AR')}</p><div className="mt-3 flex items-center gap-3"><input className="input max-w-24" type="number" min={1} max={item.stock} value={item.quantity} onChange={e=>updateQty(item.variantId,Number(e.target.value))}/><button onClick={()=>removeItem(item.variantId)} className="rounded-full bg-red-50 p-3 text-red-700"><Trash2 size={18}/></button></div></div></div>)}</div>
      <aside className="card h-fit p-6 lg:sticky lg:top-32"><h2 className="text-2xl font-black">Resumen</h2><div className="gold-line my-5"/><div className="flex justify-between text-lg"><span>Subtotal</span><b>${subtotal.toLocaleString('es-AR')}</b></div><p className="mt-4 rounded-3xl bg-[#fff8ef] p-4 text-sm leading-6 text-[#80666b]">El envío se calcula en el checkout según la zona/código postal configurado.</p><Link href="/checkout" className="btn-primary mt-6 w-full">Iniciar compra <ArrowRight size={18}/></Link></aside>
    </section>}
  </main>;
}
