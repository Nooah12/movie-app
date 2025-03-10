/* import { signUpAction } from "@/app/auth/sign-in/actions";
import { FormMessage, Message } from "@/components/FormMessage"
import { SubmitButton } from "@/components/buttons/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <form className="flex flex-col min-w-64 max-w-64 md:max-w-sm mx-auto mt-8 p-4 bg-[#0d1b35] rounded-lg">
        <h1 className="text-2xl font-medium mb-4">Sign up</h1>
        <p className="text-sm text text-white">
          Already have an account?</p>
          <Link className="font-medium underline text-green-300" href="/auth/sign-in">
            Sign in
          </Link>
        
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" className="text-black" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
            className="text-black"
          />
          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
} */


  import { signUpAction } from "@/app/auth/sign-in/actions";
  import Link from "next/link";
  
  export default function SignUp() {
    return (
      <div className="flex-grow">
        <form className="flex flex-col min-w-64 max-w-64 md:max-w-sm mx-auto mt-8 p-4 bg-[#0d1b35] rounded-lg">
          <h1 className="text-2xl font-medium mb-4">Sign Up</h1>
          <p className="text-sm text text-white">
            Already have an account?</p>
            <Link className="font-medium underline text-green-300" href="/auth/sign-in">
              Sign in
            </Link>
          
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <label htmlFor="emailSignUp">Email</label>
            <input 
              id="emailSignUp" 
              name="email" 
              type="email" 
              placeholder="you@example.com"
              className="text-black" 
              required 
            />
            <label htmlFor="passwordSignUp">Password</label>
            <input 
              id="passwordSignUp" 
              name="password" 
              type="password" 
              placeholder="Your password"
              minLength={6}
              className="text-black"
              required 
            />
            <button 
              formAction={signUpAction}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    )
  }
  