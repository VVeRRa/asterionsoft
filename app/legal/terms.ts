import type { Locale } from "../locales";
import type { LegalDoc } from "./types";

/*
 * Terms of business (B2B only). The numbers (audit credit 60 days, cancellation 24 h, training 10 working
 * days / 50 % / 2 days, acceptance 10 working days, flat fee notice 1 month, payment due 7 days) are the
 * proposal awaiting confirmation. Keep them identical in all three languages and on the main page.
 */
export const terms: Record<Locale, LegalDoc> = {
  cs: {
    title: "Obchodní podmínky",
    description: "Obchodní podmínky společnosti Asterion Software s.r.o. pro analýzy, implementace, konzultace a školení.",
    blocks: [
      { type: "h2", text: "1. Kdo jsme a pro koho podmínky platí" },
      {
        type: "p",
        text: "Poskytovatelem je Asterion Software s.r.o., IČO 10736697, Bělehradská 858/23, 120 00 Praha 2, zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, sp. zn. C 347537 (dále „Asterion“). Služby poskytujeme výhradně podnikatelům pro jejich podnikání a právnickým osobám, například společenstvím vlastníků jednotek nebo spolkům, pro jejich činnost (dále „klient“). Spotřebitelům služby neposkytujeme. Klient při objednávce uvede IČO a potvrdí, že objednává v rámci svého podnikání nebo činnosti.",
      },

      { type: "h2", text: "2. Uzavření smlouvy" },
      {
        type: "p",
        text: "Poptávka z webu ani úvodní hovor zdarma smlouvu nezakládají. Smlouva vzniká potvrzením objednávky nebo nabídky e-mailem, případně podpisem samostatné smlouvy. Ujednání v nabídce nebo smlouvě mají přednost před těmito podmínkami.",
      },

      { type: "h2", text: "3. Ceny a platby" },
      {
        type: "p",
        text: "Ceny jsou uvedeny bez DPH, DPH připočteme podle platných předpisů. Ceny „od“ na webu jsou orientační, závazná je cena v nabídce. Konzultace a balíčky konzultací se platí předem na fakturu se splatností 7 dní. Termín je potvrzen až po připsání platby. U implementací platí platební kalendář z nabídky, obvykle záloha a doplatek po předání.",
      },

      { type: "h2", text: "4. AI audit procesů" },
      {
        type: "p",
        text: "Cenu auditu odečteme od ceny implementace, pokud klient do 60 dní od předání výstupu auditu písemně přijme naši nabídku na realizaci, tedy e-mailem nebo podpisem smlouvy. Výstup auditu může klient využít i bez další spolupráce s námi.",
      },

      { type: "h2", text: "5. Konzultace na dálku a školení" },
      {
        type: "ul",
        items: [
          "Jednorázová konzultace trvá 60 minut, cena zahrnuje přípravu a písemné shrnutí. Hovoru se mohou účastnit nejvýše 3 osoby za klienta.",
          "Balíček 5 konzultací platí 3 měsíce od první konzultace, při zápočtu jednorázové konzultace od jejího konání. Nevyčerpané konzultace po uplynutí platnosti propadají bez náhrady.",
          "Cenu jednorázové konzultace odečteme od balíčku, pokud ho klient objedná do 14 dní od jejího konání.",
          "Klient může termín bezplatně přesunout nejpozději 24 hodin předem. Pozdější zrušení nebo neúčast se počítá jako čerpaná konzultace.",
          "Zruší-li termín Asterion, nabídneme náhradní termín a platnost balíčku se o tuto dobu prodlouží. Nebude-li náhradní termín možný, vrátíme poměrnou část ceny.",
          "Konzultace standardně nenahráváme. Záznam pořídíme jen na žádost klienta a se souhlasem všech účastníků a po 14 dnech ho smažeme.",
          "Konzultace je odborné doporučení. Rozhodnutí o jeho použití a výsledky zůstávají na klientovi.",
          "Termín firemního školení lze bezplatně přesunout nejpozději 10 pracovních dní předem. Při pozdějším zrušení účtujeme 50 % ceny, při zrušení méně než 2 pracovní dny předem celou cenu.",
        ],
      },

      { type: "h2", text: "6. Implementace, předání a paušál" },
      {
        type: "p",
        text: "Rozsah, termíny a akceptační kritéria určuje nabídka. Klient do 10 pracovních dní od předání dílo buď převezme, nebo vytkne konkrétní vady. Jinak se dílo považuje za převzaté. Změny rozsahu se řeší dodatkem nebo vícepracemi za sazbu z nabídky. Klient zajistí přístupy, podklady a součinnost, prodlení se součinností posouvá termíny.",
      },
      {
        type: "p",
        text: "Paušál za provoz a dohled se sjednává na dobu neurčitou s výpovědní dobou 1 měsíc ke konci kalendářního měsíce. Co paušál zahrnuje a jaká je reakční doba v pracovních dnech, uvádí nabídka.",
      },

      { type: "h2", text: "7. Odpovědnost" },
      {
        type: "p",
        text: "Celková odpovědnost Asterionu za škodu z jedné smlouvy je omezena na cenu zaplacenou podle této smlouvy, u paušálu na částku zaplacenou za posledních 12 měsíců. Neodpovídáme za ušlý zisk ani za výpadky služeb třetích stran, například poskytovatelů AI modelů, cloudu nebo API. Omezení neplatí pro škodu způsobenou úmyslně nebo z hrubé nedbalosti a pro újmu na zdraví.",
      },

      { type: "h2", text: "8. Práce s AI" },
      {
        type: "p",
        text: "Řešení mohou využívat jazykové modely třetích stran. Výstupy AI mohou obsahovat chyby, proto řešení navrhujeme tak, aby důležitá rozhodnutí potvrdil člověk. Klient odpovídá za to, že data, která do řešení vkládá, smí takto zpracovat.",
      },

      { type: "h2", text: "9. Osobní údaje" },
      {
        type: "p",
        text: "Pokud při zakázce zpracováváme osobní údaje za klienta, uzavřeme s ním smlouvu o zpracování osobních údajů podle čl. 28 GDPR. Jak zpracováváme údaje kontaktních osob, popisují [Zásady ochrany osobních údajů](/ochrana-osobnich-udaju/).",
      },

      { type: "h2", text: "10. Práva k výsledkům" },
      {
        type: "p",
        text: "Po zaplacení celé ceny získá klient k dílu nevýhradní, časově a územně neomezenou licenci pro své podnikání nebo činnost, včetně práva dílo upravovat nebo nechat upravit jiným dodavatelem, pokud nabídka nebo smlouva nestanoví jinak. Obecné knihovny, šablony a nástroje použité v díle, a to i ty, které vzniknou během zakázky, nejsou předmětem výhradních práv klienta. Práva k nim zůstávají jejich nositelům (Asterionu nebo jeho dodavatelům), kteří je smějí dál používat. Klient k nim získává licenci v rozsahu potřebném k užívání díla, včetně jeho úprav jiným dodavatelem.",
      },

      { type: "h2", text: "11. Mlčenlivost a reference" },
      {
        type: "p",
        text: "Informace o klientovi a jeho datech držíme v důvěře. Klienta uvedeme jako referenci jen s jeho písemným souhlasem.",
      },

      { type: "h2", text: "12. Závěrečná ustanovení" },
      {
        type: "p",
        text: "Smlouvy se řídí českým právem. Spory rozhodují české soudy, místně příslušný je soud podle sídla Asterionu. Podmínky můžeme změnit. Pro už uzavřené smlouvy platí verze účinná v den jejich uzavření.",
      },
    ],
  },

  en: {
    title: "Terms of business",
    description: "Terms of business of Asterion Software s.r.o. for analyses, implementations, consultations and training.",
    blocks: [
      {
        type: "p",
        text: "This is a translation for your convenience. The [Czech version](/obchodni-podminky/) prevails.",
      },
      { type: "h2", text: "1. Who we are and who these terms apply to" },
      {
        type: "p",
        text: "The provider is Asterion Software s.r.o., company ID 10736697, Bělehradská 858/23, 120 00 Prague 2, Czech Republic, registered in the Commercial Register kept by the Municipal Court in Prague, file C 347537 (“Asterion”). We provide services exclusively to entrepreneurs for their business and to legal entities, such as owners’ associations or clubs, for their activities (the “client”). We do not provide services to consumers. When ordering, the client states its company ID and confirms that it orders as part of its business or activity.",
      },

      { type: "h2", text: "2. Conclusion of a contract" },
      {
        type: "p",
        text: "Neither an enquiry from the website nor a free introductory call creates a contract. A contract is concluded when an order or offer is confirmed by email, or when a separate contract is signed. Terms agreed in an offer or contract take precedence over these terms.",
      },

      { type: "h2", text: "3. Prices and payment" },
      {
        type: "p",
        text: "Prices are stated excluding VAT, which we add in accordance with applicable law. Prices marked “from” on the website are indicative; the binding price is the one in the offer. Consultations and consultation packages are paid in advance by invoice due within 7 days. A date is confirmed once the payment is received. For implementations, the payment schedule in the offer applies, usually a deposit and the balance after handover.",
      },

      { type: "h2", text: "4. AI process audit" },
      {
        type: "p",
        text: "We deduct the price of the audit from the price of the implementation if, within 60 days of receiving the audit output, the client accepts our offer for the implementation in writing, by email or by signing a contract. The client may use the audit output without any further cooperation with us.",
      },

      { type: "h2", text: "5. Remote consultations and training" },
      {
        type: "ul",
        items: [
          "A single consultation lasts 60 minutes; the price includes preparation and a written summary. Up to 3 people per client may take part in the call.",
          "A package of 5 consultations is valid for 3 months from the first consultation, or from the date of a single consultation credited towards it. Unused consultations expire without compensation when the package expires.",
          "We deduct the price of a single consultation from a package if the client orders it within 14 days of the consultation.",
          "The client may reschedule free of charge no later than 24 hours in advance. A later cancellation or no-show counts as a used consultation.",
          "If Asterion cancels a date, we offer a replacement and extend the package validity accordingly. If no replacement is possible, we refund a proportionate part of the price.",
          "We do not record consultations by default. We make a recording only at the client’s request with the consent of all participants and delete it after 14 days.",
          "A consultation is professional advice. Decisions on how to use it, and the results, remain with the client.",
          "A company training can be rescheduled free of charge no later than 10 working days in advance. For a later cancellation we charge 50 % of the price, and the full price if cancelled less than 2 working days in advance.",
        ],
      },

      { type: "h2", text: "6. Implementation, handover and flat fee" },
      {
        type: "p",
        text: "Scope, deadlines and acceptance criteria are set by the offer. Within 10 working days of handover, the client either accepts the work or notifies specific defects. Otherwise the work is deemed accepted. Changes of scope are handled by an amendment or as additional work at the rate in the offer. The client provides access, materials and cooperation; delays in cooperation move the deadlines.",
      },
      {
        type: "p",
        text: "A flat fee for operation and monitoring is agreed for an indefinite period with a notice period of 1 month to the end of a calendar month. What the flat fee covers and the response time in working days are stated in the offer.",
      },

      { type: "h2", text: "7. Liability" },
      {
        type: "p",
        text: "Asterion’s total liability for damage under one contract is limited to the price paid under that contract, and for a flat fee to the amount paid for the last 12 months. We are not liable for lost profit or for outages of third-party services such as AI model, cloud or API providers. The limitation does not apply to damage caused intentionally or by gross negligence, or to harm to health.",
      },

      { type: "h2", text: "8. Working with AI" },
      {
        type: "p",
        text: "Solutions may use third-party language models. AI outputs may contain errors, so we design solutions so that a person confirms important decisions. The client is responsible for ensuring that the data it puts into a solution may be processed in this way.",
      },

      { type: "h2", text: "9. Personal data" },
      {
        type: "p",
        text: "If we process personal data on the client’s behalf as part of a project, we conclude a data processing agreement with the client under Art. 28 GDPR. How we process data of contact persons is described in our [privacy policy](/en/privacy/).",
      },

      { type: "h2", text: "10. Rights to the results" },
      {
        type: "p",
        text: "Once the full price is paid, the client receives a non-exclusive licence to the work, unlimited in time and territory, for its business or activity, including the right to modify the work or have it modified by another supplier, unless the offer or contract states otherwise. General libraries, templates and tools used in the work, including those created during the engagement, are not subject to the client’s exclusive rights. The rights to them remain with their holders (Asterion or its suppliers), who may continue to use them. The client receives a licence to them to the extent needed to use the work, including its modification by another supplier.",
      },

      { type: "h2", text: "11. Confidentiality and references" },
      {
        type: "p",
        text: "We keep information about the client and its data confidential. We name a client as a reference only with its written consent.",
      },

      { type: "h2", text: "12. Final provisions" },
      {
        type: "p",
        text: "Contracts are governed by Czech law. Disputes are decided by Czech courts, with the court competent for Asterion’s registered office having local jurisdiction. We may change these terms. Contracts already concluded are governed by the version effective on the day they were concluded.",
      },
    ],
  },

  de: {
    title: "Allgemeine Geschäftsbedingungen",
    description: "Allgemeine Geschäftsbedingungen der Asterion Software s.r.o. für Analysen, Umsetzungen, Beratungen und Schulungen.",
    blocks: [
      {
        type: "p",
        text: "Dies ist eine Übersetzung zu Ihrer Information. Maßgeblich ist die [tschechische Fassung](/obchodni-podminky/).",
      },
      { type: "h2", text: "1. Wer wir sind und für wen die Bedingungen gelten" },
      {
        type: "p",
        text: "Anbieter ist die Asterion Software s.r.o., Id.-Nr. 10736697, Bělehradská 858/23, 120 00 Prag 2, Tschechische Republik, eingetragen im Handelsregister beim Stadtgericht Prag, Aktenzeichen C 347537 („Asterion“). Wir erbringen Leistungen ausschließlich an Unternehmer für ihr Unternehmen und an juristische Personen, etwa Eigentümergemeinschaften oder Vereine, für ihre Tätigkeit („Kunde“). Verbrauchern bieten wir keine Leistungen an. Bei der Bestellung gibt der Kunde seine Id.-Nr. an und bestätigt, dass er im Rahmen seines Unternehmens oder seiner Tätigkeit bestellt.",
      },

      { type: "h2", text: "2. Vertragsschluss" },
      {
        type: "p",
        text: "Weder eine Anfrage über die Website noch ein kostenloses Erstgespräch begründet einen Vertrag. Der Vertrag kommt durch Bestätigung der Bestellung oder des Angebots per E-Mail oder durch Unterzeichnung eines gesonderten Vertrags zustande. Vereinbarungen im Angebot oder Vertrag haben Vorrang vor diesen Bedingungen.",
      },

      { type: "h2", text: "3. Preise und Zahlung" },
      {
        type: "p",
        text: "Die Preise verstehen sich zuzüglich Umsatzsteuer nach den geltenden Vorschriften. „Ab“-Preise auf der Website sind Richtwerte, verbindlich ist der Preis im Angebot. Beratungen und Beratungspakete werden im Voraus per Rechnung mit einem Zahlungsziel von 7 Tagen bezahlt. Ein Termin ist erst nach Zahlungseingang bestätigt. Bei Umsetzungen gilt der Zahlungsplan aus dem Angebot, in der Regel eine Anzahlung und die Restzahlung nach Übergabe.",
      },

      { type: "h2", text: "4. KI-Prozessaudit" },
      {
        type: "p",
        text: "Den Preis des Audits rechnen wir auf den Preis der Umsetzung an, wenn der Kunde innerhalb von 60 Tagen nach Übergabe des Auditergebnisses unser Angebot für die Umsetzung schriftlich annimmt, per E-Mail oder durch Unterzeichnung eines Vertrags. Das Auditergebnis kann der Kunde auch ohne weitere Zusammenarbeit mit uns nutzen.",
      },

      { type: "h2", text: "5. Online-Beratungen und Schulungen" },
      {
        type: "ul",
        items: [
          "Eine Einzelberatung dauert 60 Minuten; der Preis umfasst Vorbereitung und eine schriftliche Zusammenfassung. Am Gespräch können bis zu 3 Personen des Kunden teilnehmen.",
          "Ein Paket mit 5 Beratungen gilt 3 Monate ab der ersten Beratung, bei Anrechnung einer Einzelberatung ab deren Termin. Nicht genutzte Beratungen verfallen mit Ablauf der Gültigkeit ersatzlos.",
          "Den Preis einer Einzelberatung rechnen wir auf ein Paket an, wenn der Kunde es innerhalb von 14 Tagen nach der Beratung bestellt.",
          "Der Kunde kann einen Termin bis spätestens 24 Stunden vorher kostenlos verschieben. Eine spätere Absage oder Nichterscheinen gilt als genutzte Beratung.",
          "Sagt Asterion einen Termin ab, bieten wir einen Ersatztermin an und verlängern die Gültigkeit des Pakets entsprechend. Ist kein Ersatztermin möglich, erstatten wir den anteiligen Preis.",
          "Beratungen zeichnen wir standardmäßig nicht auf. Eine Aufzeichnung erstellen wir nur auf Wunsch des Kunden mit Einwilligung aller Teilnehmer und löschen sie nach 14 Tagen.",
          "Eine Beratung ist eine fachliche Empfehlung. Die Entscheidung über ihre Anwendung und die Ergebnisse liegen beim Kunden.",
          "Eine Firmenschulung kann bis spätestens 10 Arbeitstage vorher kostenlos verschoben werden. Bei späterer Absage berechnen wir 50 % des Preises, bei Absage weniger als 2 Arbeitstage vorher den vollen Preis.",
        ],
      },

      { type: "h2", text: "6. Umsetzung, Übergabe und Pauschale" },
      {
        type: "p",
        text: "Umfang, Termine und Abnahmekriterien legt das Angebot fest. Innerhalb von 10 Arbeitstagen nach Übergabe nimmt der Kunde das Werk ab oder rügt konkrete Mängel. Andernfalls gilt das Werk als abgenommen. Änderungen des Umfangs werden durch einen Nachtrag oder als Mehrleistung zum Satz aus dem Angebot geregelt. Der Kunde stellt Zugänge, Unterlagen und Mitwirkung bereit; Verzögerungen bei der Mitwirkung verschieben die Termine.",
      },
      {
        type: "p",
        text: "Eine Pauschale für Betrieb und Überwachung wird auf unbestimmte Zeit mit einer Kündigungsfrist von 1 Monat zum Ende eines Kalendermonats vereinbart. Was die Pauschale umfasst und die Reaktionszeit in Arbeitstagen nennt das Angebot.",
      },

      { type: "h2", text: "7. Haftung" },
      {
        type: "p",
        text: "Die Gesamthaftung von Asterion für Schäden aus einem Vertrag ist auf den nach diesem Vertrag gezahlten Preis begrenzt, bei einer Pauschale auf den für die letzten 12 Monate gezahlten Betrag. Wir haften nicht für entgangenen Gewinn und nicht für Ausfälle von Diensten Dritter, etwa Anbietern von KI-Modellen, Cloud oder APIs. Die Begrenzung gilt nicht für vorsätzlich oder grob fahrlässig verursachte Schäden und nicht für Gesundheitsschäden.",
      },

      { type: "h2", text: "8. Arbeit mit KI" },
      {
        type: "p",
        text: "Lösungen können Sprachmodelle Dritter nutzen. KI-Ergebnisse können Fehler enthalten, daher gestalten wir Lösungen so, dass wichtige Entscheidungen ein Mensch bestätigt. Der Kunde ist dafür verantwortlich, dass die Daten, die er in eine Lösung eingibt, so verarbeitet werden dürfen.",
      },

      { type: "h2", text: "9. Personenbezogene Daten" },
      {
        type: "p",
        text: "Verarbeiten wir im Rahmen eines Auftrags personenbezogene Daten im Auftrag des Kunden, schließen wir mit ihm einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Wie wir Daten von Ansprechpartnern verarbeiten, beschreibt die [Datenschutzerklärung](/de/datenschutz/).",
      },

      { type: "h2", text: "10. Rechte an den Ergebnissen" },
      {
        type: "p",
        text: "Nach Zahlung des vollständigen Preises erhält der Kunde eine nicht ausschließliche, zeitlich und räumlich unbegrenzte Lizenz am Werk für seine Geschäftstätigkeit oder Tätigkeit, einschließlich des Rechts, das Werk zu ändern oder von einem anderen Anbieter ändern zu lassen, sofern das Angebot oder der Vertrag nichts anderes bestimmt. Allgemeine Bibliotheken, Vorlagen und Werkzeuge, die im Werk verwendet werden, auch solche, die während des Auftrags entstehen, sind nicht Gegenstand ausschließlicher Rechte des Kunden. Die Rechte daran bleiben bei ihren Inhabern (Asterion oder seinen Zulieferern), die sie weiter verwenden dürfen. Der Kunde erhält daran eine Lizenz in dem Umfang, der für die Nutzung des Werks erforderlich ist, einschließlich seiner Änderung durch einen anderen Anbieter.",
      },

      { type: "h2", text: "11. Vertraulichkeit und Referenzen" },
      {
        type: "p",
        text: "Informationen über den Kunden und seine Daten behandeln wir vertraulich. Als Referenz nennen wir einen Kunden nur mit seiner schriftlichen Zustimmung.",
      },

      { type: "h2", text: "12. Schlussbestimmungen" },
      {
        type: "p",
        text: "Verträge unterliegen tschechischem Recht. Über Streitigkeiten entscheiden tschechische Gerichte; örtlich zuständig ist das Gericht am Sitz von Asterion. Wir können diese Bedingungen ändern. Für bereits geschlossene Verträge gilt die am Tag des Vertragsschlusses gültige Fassung.",
      },
    ],
  },
};
