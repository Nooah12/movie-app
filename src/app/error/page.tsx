'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  
  return (
    <div className="flex-grow max-w-md mx-auto mt-8 p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h1 className="text-lg font-semibold text-red-800 mb-2">Error</h1>
        <p className="text-red-700">
          {message || 'Sorry, something went wrong'}
        </p>
      </div>
    </div>
  )
}