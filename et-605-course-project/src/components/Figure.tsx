import React from 'react';

interface FigureProps {
  type: 'types-of-angles' | 'complementary' | 'supplementary' | 'adjacent' | 'linear-pair' | 'vertically-opposite' | 'transversal' | 'corresponding-angles' | 'alternate-interior' | 'co-interior' | 'parallel-lines';
}

export function Figure({ type }: FigureProps) {
  switch (type) {
    case 'types-of-angles':
      return (
        <div className="flex flex-wrap justify-center gap-8 my-6">
          <div className="flex flex-col items-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              <path d="M 10 90 L 90 90 L 50 20" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 60 90 A 30 30 0 0 0 40 75" stroke="#4f46e5" strokeWidth="2" fill="none" />
            </svg>
            <span className="mt-2 font-medium text-slate-700">Acute</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              <path d="M 10 90 L 90 90 M 50 90 L 50 10" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 50 70 L 70 70 L 70 90" stroke="#4f46e5" strokeWidth="2" fill="none" />
            </svg>
            <span className="mt-2 font-medium text-slate-700">Right</span>
          </div>
          <div className="flex flex-col items-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
              <path d="M 10 90 L 90 90 L 10 20" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 60 90 A 30 30 0 0 0 30 65" stroke="#4f46e5" strokeWidth="2" fill="none" />
            </svg>
            <span className="mt-2 font-medium text-slate-700">Obtuse</span>
          </div>
        </div>
      );
    case 'complementary':
      return (
        <div className="flex justify-center my-6">
          <svg width="150" height="150" viewBox="0 0 100 100" className="overflow-visible">
            <path d="M 10 90 L 90 90 M 10 90 L 10 10 M 10 90 L 70 30" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 10 70 L 30 70 L 30 90" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <path d="M 40 90 A 30 30 0 0 0 30 70" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 30 70 A 30 30 0 0 0 10 50" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="45" y="85" fontSize="12" fill="#10b981" fontWeight="bold">60°</text>
            <text x="15" y="45" fontSize="12" fill="#f59e0b" fontWeight="bold">30°</text>
          </svg>
        </div>
      );
    case 'supplementary':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="100" viewBox="0 0 200 100" className="overflow-visible">
            <path d="M 10 90 L 190 90 M 100 90 L 150 20" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 130 90 A 30 30 0 0 0 120 60" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 120 60 A 30 30 0 0 0 70 90" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="140" y="85" fontSize="12" fill="#10b981" fontWeight="bold">55°</text>
            <text x="60" y="70" fontSize="12" fill="#f59e0b" fontWeight="bold">125°</text>
          </svg>
        </div>
      );
    case 'adjacent':
      return (
        <div className="flex justify-center my-6">
          <svg width="150" height="120" viewBox="0 0 150 120" className="overflow-visible">
            <path d="M 10 110 L 140 110 M 10 110 L 100 20 M 10 110 L 40 10" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 60 110 A 50 50 0 0 0 50 65" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 50 65 A 50 50 0 0 0 25 60" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="70" y="95" fontSize="12" fill="#10b981" fontWeight="bold">A</text>
            <text x="25" y="45" fontSize="12" fill="#f59e0b" fontWeight="bold">B</text>
          </svg>
        </div>
      );
    case 'linear-pair':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="100" viewBox="0 0 200 100" className="overflow-visible">
            <path d="M 10 90 L 190 90 M 100 90 L 60 20" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 140 90 A 40 40 0 0 0 80 55" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 80 55 A 40 40 0 0 0 60 90" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="120" y="70" fontSize="14" fill="#10b981" fontWeight="bold">x</text>
            <text x="50" y="85" fontSize="14" fill="#f59e0b" fontWeight="bold">y</text>
            <text x="85" y="110" fontSize="12" fill="#64748b">x + y = 180°</text>
          </svg>
        </div>
      );
    case 'vertically-opposite':
      return (
        <div className="flex justify-center my-6">
          <svg width="150" height="150" viewBox="0 0 150 150" className="overflow-visible">
            <path d="M 20 20 L 130 130 M 20 130 L 130 20" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 50 50 A 30 30 0 0 1 100 50" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 50 100 A 30 30 0 0 0 100 100" stroke="#10b981" strokeWidth="3" fill="none" />
            <path d="M 50 50 A 30 30 0 0 0 50 100" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <path d="M 100 50 A 30 30 0 0 1 100 100" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="70" y="40" fontSize="14" fill="#10b981" fontWeight="bold">a</text>
            <text x="70" y="120" fontSize="14" fill="#10b981" fontWeight="bold">a</text>
            <text x="30" y="80" fontSize="14" fill="#f59e0b" fontWeight="bold">b</text>
            <text x="110" y="80" fontSize="14" fill="#f59e0b" fontWeight="bold">b</text>
          </svg>
        </div>
      );
    case 'transversal':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            <path d="M 20 50 L 180 50 M 20 100 L 180 100" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 60 20 L 140 130" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="145" y="135" fontSize="14" fill="#f59e0b" fontWeight="bold">Transversal</text>
          </svg>
        </div>
      );
    case 'corresponding-angles':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            <path d="M 20 50 L 180 50 M 20 100 L 180 100" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 120 20 L 80 130" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="115" y="45" fontSize="16" fill="#10b981" fontWeight="bold">a</text>
            <text x="97" y="95" fontSize="16" fill="#10b981" fontWeight="bold">a</text>
          </svg>
        </div>
      );
    case 'alternate-interior':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            <path d="M 20 50 L 180 50 M 20 100 L 180 100" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 120 20 L 80 130" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 50 50 L 109 50 L 91 100 L 150 100" stroke="#f59e0b" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <text x="85" y="65" fontSize="16" fill="#f59e0b" fontWeight="bold">x</text>
            <text x="105" y="90" fontSize="16" fill="#f59e0b" fontWeight="bold">x</text>
          </svg>
        </div>
      );
    case 'co-interior':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            <path d="M 20 50 L 180 50 M 20 100 L 180 100" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 120 20 L 80 130" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 150 50 L 109 50 L 91 100 L 150 100" stroke="#ec4899" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            <text x="115" y="65" fontSize="16" fill="#ec4899" fontWeight="bold">x</text>
            <text x="105" y="90" fontSize="16" fill="#ec4899" fontWeight="bold">y</text>
            <text x="140" y="75" fontSize="12" fill="#64748b">x + y = 180°</text>
          </svg>
        </div>
      );
    case 'parallel-lines':
      return (
        <div className="flex justify-center my-6">
          <svg width="200" height="150" viewBox="0 0 200 150" className="overflow-visible">
            <path d="M 20 30 L 180 30 M 20 75 L 180 75 M 20 120 L 180 120" stroke="#4f46e5" strokeWidth="4" fill="none" strokeLinecap="round" />
            <text x="190" y="35" fontSize="14" fill="#64748b" fontWeight="bold">A</text>
            <text x="190" y="80" fontSize="14" fill="#64748b" fontWeight="bold">B</text>
            <text x="190" y="125" fontSize="14" fill="#64748b" fontWeight="bold">C</text>
          </svg>
        </div>
      );
    default:
      return null;
  }
}
