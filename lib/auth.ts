"use client";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { supabase } from "./supabase";

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const { error } = await supabase.from("profiles").upsert({
    firebase_uid: user.uid,
    email: user.email,
    display_name: user.displayName,
    avatar_url: user.photoURL,
  }, { onConflict: "firebase_uid" });
  if (error) throw new Error(JSON.stringify(error, null, 2));
  return user;
}
export async function logout() { await signOut(auth); }
