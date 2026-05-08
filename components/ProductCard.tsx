import Image from "next/image";
import Link from "next/link";
import { productImage, totalStock } from "@/lib/catalog";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({product}:{product:any}){
  const stock=totalStock(product); const img=productImage(product);
  return <Link href={`/productos/${product.id}`} className="group card block overflow-hidden transition hover:-translate-y-1 hover:shadow-[0_34px_80px_rgba(73,50,56,.16)]">
    <div className="relative aspect-[4/5] overflow-hidden bg-[#fff8ef]">
      <Image src={img} alt={product.name} fill sizes="(max-width:768px) 100vw, 320px" className="object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#37242a]/45 to-transparent" />
      {product.compare_at_price&&<span className="absolute left-3 top-3 rounded-full bg-[#5b2738] px-3 py-1 text-xs font-black text-white">Oferta</span>}
      {stock<=3&&stock>0&&<span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#7b334b]">Últimas {stock}</span>}
      {stock===0&&<span className="absolute right-3 top-3 rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-700">Sin stock</span>}
      <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[#5b2738] shadow"><ShoppingBag size={18}/></span>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-black text-[#493238]">{product.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#80666b]">{product.description || "Producto Afrodita"}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>{product.compare_at_price&&<p className="text-xs text-[#9d8589] line-through">${Number(product.compare_at_price).toLocaleString('es-AR')}</p>}<p className="text-2xl font-black text-[#5b2738]">${Number(product.price).toLocaleString('es-AR')}</p></div>
        <span className="rounded-full bg-[#fff8ef] px-3 py-1 text-xs font-black text-[#c6a24a]">Ver detalle</span>
      </div>
    </div>
  </Link>;
}
