/** A row of chips – used in service cards and in the tech stack list. */
export default function Chips({ items, className = "chips" }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
    </div>
  );
}
