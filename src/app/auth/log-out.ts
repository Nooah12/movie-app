/* 'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export const logOut = () => {
    const supabase = createClient()
    supabase.auth.signOut()

    redirect('/')
}
 */



// app/auth/sign-out/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.redirect(`/auth/sign-in?error=${error.message}`);
  }

  return NextResponse.redirect(`/`);
}
