import { ReactNode } from 'react';

interface MobilePrimaryBtnProps {
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}

export default function MobilePrimaryBtn({ onClick, active, children }: MobilePrimaryBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2 text-sm rounded-md transition-colors ${
        active ? 'bg-amber-500/90 text-white' : 'text-blue-200 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}
