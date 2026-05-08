"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { Boxes, ClipboardList, LayoutDashboard, PackagePlus, Settings, Truck, Wrench } from "lucide-react";

export default function AdminPage(){
  const [loading,setLoading]=useState(true); const [isAdmin,setIsAdmin]=useState(false); const [email,setEmail]=useState('');
  useEffect(()=>onAuthStateChanged(auth, async user=>{ if(!user?.email){setLoading(false);return} setEmail(user.email); const {data}=await supabase.from('profiles').select('role').eq('email',user.email).single(); setIsAdmin(data?.role==='admin'); setLoading(false); }),[]);
  if(loading) return <main className="section">Cargando admin...</main>;
  if(!isAdmin) return <main className="section"><div className="card p-8"><h1 className="heading-lg">Acceso denegado</h1><p className="mt-3 text-[#80666b]">No tenés permisos de administrador.</p><Link className="btn-primary mt-5" href="/login">Iniciar sesión</Link></div></main>;
  return <main className="section"><div className="card mb-8 p-8 md:p-10"><span className="badge"><LayoutDashboard size={14}/> Admin conectado</span><p className="mt-4 text-sm font-bold text-[#80666b]">Admin: {email}</p><h1 className="heading-lg mt-2">Panel administrador</h1><p className="mt-3 max-w-2xl leading-7 text-[#80666b]">Gestioná productos, stock, pedidos, envíos, mantenimiento y configuración general de la tienda.</p></div><section className="admin-grid"><AdminCard href="/admin/productos" icon={<PackagePlus/>} title="Productos" text="Crear, editar, pausar y subir fotos."/><AdminCard href="/admin/variantes" icon={<Boxes/>} title="Stock" text="Talles, colores, SKU y cantidades."/><AdminCard href="/admin/pedidos" icon={<ClipboardList/>} title="Pedidos" text="Ver órdenes y cambiar estados."/><AdminCard href="/admin/envios" icon={<Truck/>} title="Envíos" text="Configurar zonas y costos base."/><AdminCard href="/admin/mantenimiento" icon={<Wrench/>} title="Mantenimiento" text="Pausar tienda y mostrar aviso."/><AdminCard href="/admin/configuracion" icon={<Settings/>} title="Configuración" text="Banners, contacto y ajustes."/></section></main>;
}
function AdminCard({href,icon,title,text}:{href:string;icon:React.ReactNode;title:string;text:string}){return <Link href={href} className="card p-6 transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(73,50,56,.14)]"><div className="mb-4 inline-flex rounded-2xl bg-[#fff8ef] p-3 text-[#c6a24a]">{icon}</div><h2 className="text-xl font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-[#80666b]">{text}</p></Link>}
