"use client";

import { useEffect, useState } from "react";
import { company } from "../company";

/**
 * Contact e-mail that never appears as a plain address in the server-rendered HTML,
 * so simple scrapers reading the page source do not harvest it.
 * Before hydration the "@" comes from CSS (.email-at::before) and there is no mailto link;
 * once the browser runs JavaScript, the address is assembled and becomes a normal clickable mailto link.
 */
export default function ProtectedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail([company.emailUser, company.emailDomain].join(String.fromCharCode(64)));
  }, []);

  if (!email) {
    return (
      <a>
        {company.emailUser}
        <span className="email-at" aria-hidden="true"></span>
        {company.emailDomain}
      </a>
    );
  }

  return <a href={`mailto:${email}`}>{email}</a>;
}
