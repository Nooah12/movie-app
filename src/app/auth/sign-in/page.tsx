import { signInAction } from "@/app/auth/sign-in/actions";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex-grow">
        <form className="flex flex-col min-w-64 max-w-64 md:max-w-sm mx-auto mt-8 p-4 bg-[#0d1b35] rounded-lg">
          <h1 className="text-2xl font-medium mb-4">Sign In</h1>
          <p className="text-sm text text-white">Dont have an account?</p>
            <Link className="font-medium underline text-green-300" href="/auth/sign-up">
              Sign up
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
              formAction={signInAction}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
  )
}
