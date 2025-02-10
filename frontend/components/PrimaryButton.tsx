// components/PrimaryButton.tsx
import Link from "next/link";
import React, { ReactNode } from "react";

export interface PrimaryButtonProps {
  href?: string; // When provided, we'll render a Next.js Link.
  text: string;
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit"; // For native button usage.
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  href,
  text,
  className = "",
  icon,
  type = "button",
  variant = "primary",
  onClick,
}) => {
  // Define variant styling classes.
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-[var(--primary)] text-white hover:bg-[var(--background)] hover:text-[var(--primary)]";
  } else if (variant === "secondary") {
    variantClasses =
      "bg-white text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white";
  }
  const commonClasses = `flex items-center justify-center font-hanken text-xl px-12 py-3 rounded-full hover:outline outline-2 ${variantClasses} ${className}`;

  // If href is provided, render a Link; otherwise, render a button.
  if (href) {
    return (
      <Link href={href} className={commonClasses}>
        {icon}
        {text}
      </Link>
    );
  }
  return (
    <button type={type} className={commonClasses} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};

export default PrimaryButton;
