'use client'

import BrandLogo from '@/components/ui/BrandLogo'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col items-center justify-center p-6">
      <div aria-hidden="true" className="w-full max-w-[200px] h-[2px] bg-[var(--border)] relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-[var(--accent-red)] animate-loading-slide" />
      </div>
      
      <div className="text-center">
        <BrandLogo />
        <p role="status" className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-red)]">
          Loading the latest story…
        </p>
      </div>

      <style jsx global>{`
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-slide {
          animation: loading-slide 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
