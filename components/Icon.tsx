/**
 * Material Symbols glyph. Decorative by default — every icon on this page sits
 * beside a text label, so exposing it to screen readers would just duplicate.
 */
export function Icon({
  name,
  size = 20,
  color,
  className,
}: {
  name: string;
  size?: number;
  /** Any CSS colour, usually a var(--token). */
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined${className ? ` ${className}` : ""}`}
      style={{ fontSize: size, color }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
