export function TrustBadges() {
  const items = ["Free to use", "Processed on your device", "No account needed"];

  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="chip">
          <span className="chip-dot" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
