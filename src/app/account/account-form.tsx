'use client'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020916] text-white py-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Not signed in</h1>
          <p>Please sign in to view your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020916] text-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#0d1b35] rounded-xl shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Account</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="px-3 py-2 bg-gray-700 rounded-md">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                User ID
              </label>
              <div className="px-3 py-2 bg-gray-700 rounded-md text-sm font-mono">
                {user.id}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Account Created
              </label>
              <div className="px-3 py-2 bg-gray-700 rounded-md">
                {new Date(user.created_at).toLocaleDateString()}
              </div>
            </div>
  
            <div className="flex justify-end space-x-4 pt-4">
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}