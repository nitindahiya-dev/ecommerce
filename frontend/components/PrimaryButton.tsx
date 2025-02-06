import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  href: string;
  text: string;
  className?: string;
  icon?: ReactNode; 
}

const PrimaryButton = ({ href, text, className, icon }: PrimaryButtonProps) => {
  return (
    <>
      <Link
        href={href}
        className={`bg-[var(--primary)] text-white flex items-center justify-center font-hanken text-xl px-12 py-3 rounded-full hover:bg-[var(--background)] hover:text-[var(--primary)] hover:outline outline-2 ${className}`}
      >
        {icon}{text}
      </Link>
    </>
  );
};

export default PrimaryButton;
