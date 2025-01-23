/* 'use client'
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black/80">
      <div className="relative w-24 h-24">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#beff46] rounded-full"
            style={{
              top: `${Math.sin((i * Math.PI) / 4) * 30 + 50}%`,
              left: `${Math.cos((i * Math.PI) / 4) * 30 + 50}%`,
              animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.5); opacity: 0.5; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
 */


export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#beff46]/20 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-[#beff46] rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <span className="mt-4 text-[#beff46] font-semibold">Loading...</span>
    </div>
  );
}
