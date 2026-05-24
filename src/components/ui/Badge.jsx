function Badge({ children, className = "" }) {
  if (!children) {
    return null;
  }

  return (
    <span
      className={`inline-flex border border-gold/20 bg-black px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-gold ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
