import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/catalog";
import { SlidersHorizontal, Sparkles } from "lucide-react";

export default async function ProductosPage(){
  const products=await getProducts();
  return <main className="section">
    <div className="card mb-8 overflow-hidden p-8 md:p-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><span className="badge"><Sparkles size={14}/> Catálogo premium</span><h1 className="heading-lg mt-4">Productos</h1><p className="mt-3 max-w-2xl leading-7 text-[#80666b]">Explorá prendas por disponibilidad real. Entrá al detalle para elegir talle, color y cantidad antes de sumar al carrito.</p></div>
        <div className="card-soft flex items-center gap-2 px-4 py-3 text-sm font-black text-[#5b2738]"><SlidersHorizontal size={18}/> {products.length} productos activos</div>
      </div>
    </div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map(p=><ProductCard key={p.id} product={p}/>)}{!products.length&&<div className="card p-8">Todavía no hay productos activos. Cargalos desde el panel administrador.</div>}</div>
  </main>;
}
