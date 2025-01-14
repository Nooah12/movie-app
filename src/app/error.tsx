'use client'

import { useEffect } from "react"

export default function error({error, reset}: { error: Error, reset: () => void}) {
    useEffect(() => {
        console.error(error)
    }, [error])
  return (
    <div>
        <p>Something went wrong. Please try again</p>
        <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded" onClick={() => reset()}>Try again</button>
    </div>
  )
}
