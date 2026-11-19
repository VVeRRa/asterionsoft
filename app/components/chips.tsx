/** Řada štítků (chips) – v kartách služeb i v přehledu technologií. */
export default function Chips({ items, className = "chips" }: { items: string[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
    </div>
  );
}
