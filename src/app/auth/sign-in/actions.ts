"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/* export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  // sign up email verification
  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/auth/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/auth/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/auth/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
}; */


export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return redirect(`/auth/sign-up?error=${encodeURIComponent("Email and password are required")}`);
  }

  const { data: existingUser } = await supabase.auth.signInWithPassword({
    email,
    password: "dummy-password-to-check-existence"
  });

  if (existingUser?.user || (existingUser?.user === null)) {
    return redirect(`/auth/sign-up?error=${encodeURIComponent("Email already registered")}`);
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    // Supabase will return specific errors for existing emails
    if (error.message.toLowerCase().includes('email already registered')) {
      return redirect(`/auth/sign-up?error=${encodeURIComponent("This email is already registered")}`);
    }
    
    return redirect(`/auth/sign-up?error=${encodeURIComponent(error.message)}`);
  }

  return redirect(`/auth/sign-up?success=${encodeURIComponent("Check your email to confirm your account")}`);
};






export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/auth/sign-in", error.message);
  }

  return redirect("/");
};





/* if (!email || !password) {
  return encodedRedirect(
    "error",
    "/sign-up",
    "Email and password are required",
  );
}

// Sign up the user
const { error: signUpError } = await supabase.auth.signUp({
  email,
  password,
});

if (signUpError) {
  console.error(signUpError.code + " " + signUpError.message);
  return encodedRedirect("error", "/sign-up", signUpError.message);
}

// Automatically sign them in
const { error: signInError } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (signInError) {
  return encodedRedirect("error", "/sign-in", signInError.message);
}

// Redirect to protected route
return redirect("/protected");
};
 */




/* export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
 */



/* 'use server'
import { createClient } from "@/utils/supabase/server"
import { logInSchema } from './schemas'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const signUp = async (data: z.infer<typeof logInSchema>) => {
    const supabase = createClient()
    const parsedData = logInSchema.parse(data)

    const { data: { user }, error } = await supabase.auth.signUp(parsedData)
    
      if (user && user.email) {
        const { id, email } = user
        await supabase.from
            ('users').insert([{ id, email }])
      }

    if (error) {
        throw error
    }
    
    redirect('/')
} */




/* 'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
} */