"use client";
import { useState } from "react";
import { loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
export default function LoginPage(){ const router=useRouter(); const [loading,setLoading]=useState(false); async function handleLogin(){ try{setLoading(true); await loginWithGoogle(); router.push('/admin')}catch(e){console.error(e); alert(e instanceof Error?e.message:'No se pudo iniciar sesión')}finally{setLoading(false)}} return <main className="section"><section className="card mx-auto max-w-md p-8 text-center"><h1 className="font-display text-4xl font-black">Ingresar a Afrodita</h1><p className="mt-3 text-[#80666b]">Entrá con Google para comprar o administrar la tienda.</p><button onClick={handleLogin} disabled={loading} className="btn-primary mt-7 w-full">{loading?'Ingresando...':'Ingresar con Google'}</button></section></main>}
