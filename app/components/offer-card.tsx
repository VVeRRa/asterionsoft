import type { ReactNode } from "react";
import { revealStyle } from "../reveal";
import Chips from "./chips";

type Props = {
  index: number;
  title: string;
  description: string;
  chips: string[];
  priceLabel: string;
  price: string;
  linkLabel: string;
  onOpen: () => void;
  /** Content above the title – a service icon or the audience of an industry solution. */
  top?: ReactNode;
  className?: string;
};

/**
 * Offer card (a catalog service or an industry solution). The whole card is clickable: the “Detail”
 * link is stretched over the card via CSS (`.service-card .text-link::before`).
 */
export default function OfferCard({ index, title, description, chips, priceLabel, price, linkLabel, onOpen, top, className }: Props) {
  return (
    <article className={["service-card", className, "reveal"].filter(Boolean).join(" ")} style={revealStyle(index)}>
      {top}
      <h3>{title}</h3>
      <p>{description}</p>
      <Chips items={chips} />
      <div className="service-bottom">
        <div className="price"><small>{priceLabel}</small><strong>{price}</strong></div>
        <button type="button" className="text-link" onClick={onOpen}>{linkLabel}</button>
      </div>
    </article>
  );
}
