export function LogoMark({
  className,
}: {
  className?: string;
}) {
  return (
    <span
      className={className}
      role="img"
      aria-label="LifeOS logo"
      style={{ letterSpacing: "-0.04em", fontFeatureSettings: '"kern" 1' }}
    >
      LifeOS
    </span>
  );
}
