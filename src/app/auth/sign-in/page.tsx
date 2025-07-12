'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })
    
    if (error) {
      alert(error.message)
      setLoading(false)
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className="flex-grow">
      <form onSubmit={handleSignIn} className="flex flex-col min-w-64 max-w-64 md:max-w-sm mx-auto mt-8 p-4 bg-[#0d1b35] rounded-lg">
        <h1 className="text-2xl font-medium mb-4">Sign In</h1>
        <p className="text-sm text text-white">Dont have an account?</p>
        <Link className="font-medium underline text-green-300" href="/auth/sign-up">
          Sign up
        </Link>
        
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="you@example.com"
            className="text-black p-2 rounded" 
            required 
          />
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Your password"
            minLength={6}
            className="text-black p-2 rounded"
            required 
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}