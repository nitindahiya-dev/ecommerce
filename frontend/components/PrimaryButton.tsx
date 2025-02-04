import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  text: string;
  className?: string;
}

const PrimaryButton = ({ href, text, className }: PrimaryButtonProps) => {
  return (
    <div>
      <Link
        href={href}
        className={`bg-[var(--primary)] text-white font-hanken text-xl px-12 py-3 rounded-full hover:bg-[var(--background)] hover:text-[var(--primary)] hover:outline outline-2 ${className}`}
      >
        {text}
      </Link>
    </div>
  );
};

export default PrimaryButton;
