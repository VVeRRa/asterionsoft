import type { Locale } from "../locales";
import type { LegalDoc } from "./types";

/*
 * Privacy policy. Keep it in line with what the code actually does:
 * - retention periods are enforced by supabase/migrations/*_inquiry_retention.sql (purge_inquiries),
 * - Cloudflare Turnstile is listed as a processor and in the cookies section; if the form ever stops
 *   using it (no NEXT_PUBLIC_TURNSTILE_SITE_KEY), remove both mentions,
 * - a new processor, analytics or embedded third-party content needs an update here before it ships.
 */
export const privacy: Record<Locale, LegalDoc> = {
  cs: {
    title: "Zásady ochrany osobních údajů",
    description: "Jak Asterion Software s.r.o. zpracovává osobní údaje z poptávek, zakázek a konzultací.",
    blocks: [
      { type: "h2", text: "Kdo vaše údaje zpracovává" },
      {
        type: "p",
        text: "Správcem osobních údajů je Asterion Software s.r.o., IČO 10736697, se sídlem Bělehradská 858/23, 120 00 Praha 2, zapsaná v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 347537. Ve věcech osobních údajů nám pište na {email} nebo volejte +420 604 257 866. Pověřence pro ochranu osobních údajů jsme nejmenovali, zákon to po nás nevyžaduje.",
      },
      {
        type: "p",
        text: "Služby nabízíme firmám, podnikatelům a dalším organizacím, například SVJ. Zpracováváme proto hlavně údaje kontaktních osob na straně zákazníků.",
      },

      { type: "h2", text: "Co zpracováváme, proč a jak dlouho" },
      {
        type: "table",
        head: ["Účel", "Údaje", "Právní základ", "Jak dlouho"],
        rows: [
          [
            "Odpověď na poptávku a jednání o zakázce",
            "jméno, e-mail, telefon, firma, zvolená služba, text poptávky, jazyk webu, navazující komunikace",
            "Poptáváte-li sami za sebe (např. jako OSVČ), kroky před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR). Jednáte-li za firmu nebo organizaci, náš oprávněný zájem odpovědět a jednat o zakázce (čl. 6 odst. 1 písm. f) GDPR).",
            "12 měsíců od posledního kontaktu, pokud nevznikne zakázka",
          ],
          [
            "Automatické třídění poptávek",
            "text poptávky, název firmy, zvolená služba, jazyk webu",
            "oprávněný zájem rychle a správně odpovědět (písm. f)",
            "stejně jako poptávka",
          ],
          [
            "Ochrana formuláře proti zneužití",
            "jednosměrný otisk (hash) IP adresy, typ prohlížeče, výsledek ověření Cloudflare Turnstile",
            "oprávněný zájem chránit web před spamem a zneužitím k rozesílání e-mailů (písm. f)",
            "30 dní",
          ],
          [
            "Provoz webu",
            "IP adresa, čas a adresa požadavku v technických záznamech hostingu",
            "oprávněný zájem provozovat web a řešit chyby a útoky (písm. f)",
            "hosting je maže automaticky, nejpozději do 30 dnů",
          ],
          [
            "Plnění smlouvy (analýza, implementace, konzultace, školení, provoz)",
            "kontaktní údaje, komunikace, podklady k zakázce",
            "plnění smlouvy (písm. b), u kontaktních osob klienta oprávněný zájem (písm. f)",
            "po dobu spolupráce a 4 roky po jejím skončení kvůli případným nárokům ze smlouvy",
          ],
          [
            "Fakturace a účetnictví",
            "fakturační údaje, platby",
            "právní povinnost (písm. c) podle zákona o účetnictví a daňových předpisů",
            "po dobu stanovenou těmito předpisy: účetní doklady 5 let od konce účetního období, daňové doklady k DPH 10 let",
          ],
          [
            "Záznam konzultace, jen na vaši žádost",
            "obraz, hlas, sdílená obrazovka",
            "souhlas všech účastníků (písm. a)",
            "14 dní od konzultace, pak záznam smažeme",
          ],
        ],
      },
      {
        type: "p",
        text: "Konzultace standardně nenahráváme. Z hovoru vznikne písemné shrnutí, které uchováváme jako součást komunikace o zakázce. Souhlas s nahráváním můžete kdykoli odvolat a záznam pak smažeme hned. Odvolání souhlasu nemá vliv na zpracování před ním.",
      },

      { type: "h2", text: "Oslovení firem" },
      {
        type: "p",
        text: "Firmy, kterým by naše služby mohly pomoci, občas oslovujeme sami. Používáme k tomu profesní kontaktní údaje (jméno, funkci, pracovní e-mail a telefon) z veřejných zdrojů, jako jsou weby firem a obchodní rejstřík. Právním základem je náš oprávněný zájem nabídnout služby, které souvisejí s vaší prací (písm. f). Pokud o spolupráci nemáte zájem, údaje po 12 měsících smažeme. Proti tomuto zpracování můžete kdykoli vznést námitku a údaje pak k oslovování nepoužijeme. O zdroji vašich údajů vás informujeme nejpozději při prvním kontaktu.",
      },

      { type: "h2", text: "Musíte nám údaje poskytnout?" },
      {
        type: "p",
        text: "Ne. Bez e-mailu nebo telefonu vám ale nemůžeme na poptávku odpovědět a bez fakturačních údajů nemůžeme uzavřít smlouvu ani vystavit fakturu.",
      },

      { type: "h2", text: "Odkud údaje máme" },
      {
        type: "p",
        text: "Hlavně od vás: z formuláře, e-mailu nebo hovoru. Pokud nám váš kontakt předal kolega z vaší firmy, používáme ho jen ke komunikaci o zakázce. U oslovení firem pocházejí údaje z veřejných zdrojů uvedených výše.",
      },

      { type: "h2", text: "Automatické třídění poptávek" },
      {
        type: "p",
        text: "Text poptávky může projít jazykovým modelem Claude od společnosti Anthropic. Model navrhne kategorii, naléhavost a krátké shrnutí, abychom mohli rychleji odpovědět. Kontaktní pole formuláře (jméno, e-mail a telefon) modelu neposíláme. Pokud je ale napíšete přímo do textu poptávky, model je uvidí. O žádné poptávce nerozhoduje stroj, každou čte člověk. Nejde tedy o automatizované rozhodování podle čl. 22 GDPR.",
      },

      { type: "h2", text: "Komu údaje předáváme" },
      {
        type: "p",
        text: "Údaje předáváme jen zpracovatelům, kteří pro nás zajišťují provoz, a to na základě smlouvy o zpracování osobních údajů. Orgánům veřejné moci je poskytneme, jen pokud to ukládá zákon.",
      },
      {
        type: "table",
        head: ["Zpracovatel", "Proč", "Sídlo"],
        rows: [
          ["Vercel Inc.", "hosting webu", "USA"],
          ["Supabase Inc.", "databáze poptávek, data uložená v EU (Irsko)", "USA"],
          ["Plus Five Five, Inc. (Resend)", "odesílání e-mailů z webu", "USA"],
          ["Anthropic PBC", "automatické třídění poptávek", "USA"],
          ["Cloudflare, Inc.", "ochrana formuláře proti spamu (Turnstile)", "USA"],
          ["INTERNET CZ, a.s. (FORPSI)", "firemní e-mail", "Česká republika"],
          ["externí účetní služby", "účetnictví a daně", "Česká republika"],
          ["spolupracující konzultanti a vývojáři", "příprava a vedení zakázek, vázáni mlčenlivostí a smlouvou", "Česká republika"],
        ],
      },
      {
        type: "p",
        text: "Konzultace na dálku vedeme v nástroji, na kterém se domluvíme s klientem, například Microsoft Teams, Google Meet nebo Zoom. Pokud použijeme nástroj klienta, zpracovává údaje podle jeho nastavení a smluv.",
      },
      {
        type: "p",
        text: "Pokud se údaje předávají mimo Evropský hospodářský prostor, opíráme se o rozhodnutí Evropské komise o odpovídající ochraně (EU-US Data Privacy Framework) u certifikovaných příjemců, jinak o standardní smluvní doložky schválené Evropskou komisí. Kopii těchto záruk vám na požádání pošleme. Osobní údaje neprodáváme a neposkytujeme je k trénování AI modelů.",
      },

      { type: "h2", text: "Údaje v řešeních pro klienty" },
      {
        type: "p",
        text: "Když pro klienta provozujeme automatizaci nebo asistenta, zpracováváme osobní údaje podle jeho pokynů a podle smlouvy o zpracování, kterou s ním máme. Pokud se na nás obrátíte ohledně údajů, které zpracováváme podle pokynů klienta, žádost mu předáme a pomůžeme s jejím vyřízením.",
      },

      { type: "h2", text: "Vaše práva" },
      {
        type: "p",
        text: "Máte právo na přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování a přenositelnost. Proti zpracování na základě oprávněného zájmu můžete vznést námitku. Souhlas můžete kdykoli odvolat. Stačí napsat na {email}. Odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce. Výjimečně můžeme lhůtu prodloužit o další dva měsíce, o tom vás ale informujeme do měsíce od žádosti.",
      },
      {
        type: "p",
        text: "Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, [www.uoou.gov.cz](https://uoou.gov.cz).",
      },

      { type: "h2", text: "Cookies" },
      {
        type: "p",
        text: "Web asterionsoft.cz nepoužívá cookies ani podobné technologie pro analytiku, marketing nebo reklamu a nesleduje vás mezi weby. Na hlavní stránce s poptávkovým formulářem načítáme ochranu proti spamu Cloudflare Turnstile. Ta může v prohlížeči uložit nebo přečíst technické údaje nutné k ověření, že formulář vyplňuje člověk, a předat Cloudflare údaje o prohlížeči a zařízení včetně IP adresy. Jde o nezbytné úložiště pro bezpečný provoz formuláře, a proto k němu nepotřebujeme váš souhlas. Písmo webu načítáme z našeho serveru, ne od třetích stran. Pokud někdy začneme používat cookies, které nezbytné nejsou, požádáme vás předem o souhlas.",
      },

      { type: "h2", text: "Zabezpečení" },
      {
        type: "p",
        text: "Údaje ukládáme šifrovaně. Přístup k nim mají jen lidé, kteří je potřebují k práci, a to s dvoufázovým přihlášením.",
      },

      { type: "h2", text: "Změny" },
      {
        type: "p",
        text: "Zásady můžeme aktualizovat. Platnou verzi najdete vždy na této stránce s datem účinnosti.",
      },
    ],
  },

  en: {
    title: "Privacy policy",
    description: "How Asterion Software s.r.o. processes personal data from enquiries, projects and consultations.",
    blocks: [
      {
        type: "p",
        text: "This is a translation for your convenience. The [Czech version](/ochrana-osobnich-udaju/) prevails.",
      },
      { type: "h2", text: "Who processes your data" },
      {
        type: "p",
        text: "The controller is Asterion Software s.r.o., company ID 10736697, registered office Bělehradská 858/23, 120 00 Prague 2, Czech Republic, registered in the Commercial Register kept by the Municipal Court in Prague, section C, file 347537. For anything related to personal data, write to {email} or call +420 604 257 866. We have not appointed a data protection officer, as the law does not require one for us.",
      },
      {
        type: "p",
        text: "We offer our services to companies, entrepreneurs and other organisations such as owners’ associations. We therefore mainly process data of contact persons on the customer’s side.",
      },

      { type: "h2", text: "What we process, why and for how long" },
      {
        type: "table",
        head: ["Purpose", "Data", "Legal basis", "Retention"],
        rows: [
          [
            "Replying to your enquiry and discussing a project",
            "name, email, phone, company, selected service, enquiry text, website language, follow-up communication",
            "If you enquire on your own behalf (e.g. as a sole trader), steps prior to entering into a contract at your request (Art. 6(1)(b) GDPR). If you act for a company or organisation, our legitimate interest in replying and discussing the project (Art. 6(1)(f) GDPR).",
            "12 months from the last contact if no project follows",
          ],
          [
            "Automatic sorting of enquiries",
            "enquiry text, company name, selected service, website language",
            "legitimate interest in replying quickly and accurately (point f)",
            "same as the enquiry",
          ],
          [
            "Protecting the form against abuse",
            "one-way hash of the IP address, browser type, result of the Cloudflare Turnstile check",
            "legitimate interest in protecting the website against spam and against being misused to send emails (point f)",
            "30 days",
          ],
          [
            "Running the website",
            "IP address, time and URL of the request in the hosting provider’s technical logs",
            "legitimate interest in running the website and handling errors and attacks (point f)",
            "deleted automatically by the hosting provider within 30 days at the latest",
          ],
          [
            "Performing a contract (analysis, implementation, consultations, training, operation)",
            "contact details, communication, project materials",
            "performance of a contract (point b), legitimate interest for the client’s contact persons (point f)",
            "for the duration of the cooperation and 4 years after it ends, in case of claims under the contract",
          ],
          [
            "Invoicing and accounting",
            "billing details, payments",
            "legal obligation (point c) under Czech accounting and tax laws",
            "for the periods set by these laws: accounting records 5 years from the end of the accounting period, VAT documents 10 years",
          ],
          [
            "Recording of a consultation, only at your request",
            "image, voice, shared screen",
            "consent of all participants (point a)",
            "14 days from the consultation, then deleted",
          ],
        ],
      },
      {
        type: "p",
        text: "We do not record consultations by default. Each call results in a written summary, which we keep as part of the project communication. You can withdraw your consent to recording at any time and we will delete the recording immediately. Withdrawal does not affect processing before it.",
      },

      { type: "h2", text: "Reaching out to companies" },
      {
        type: "p",
        text: "From time to time we contact companies our services could help. For this we use business contact details (name, position, work email and phone) from public sources such as company websites and the Commercial Register. The legal basis is our legitimate interest in offering services related to your work (point f). If you are not interested, we delete the data after 12 months. You can object to this processing at any time and we will no longer use the data to contact you. We tell you where we got your data no later than at the first contact.",
      },

      { type: "h2", text: "Do you have to provide your data?" },
      {
        type: "p",
        text: "No. Without an email address or phone number, however, we cannot reply to your enquiry, and without billing details we cannot conclude a contract or issue an invoice.",
      },

      { type: "h2", text: "Where we get the data" },
      {
        type: "p",
        text: "Mainly from you: through the form, email or a call. If a colleague from your company gave us your contact, we use it only to communicate about the project. When we reach out to companies, the data comes from the public sources listed above.",
      },

      { type: "h2", text: "Automatic sorting of enquiries" },
      {
        type: "p",
        text: "The text of your enquiry may be processed by the Claude language model from Anthropic. The model suggests a category, urgency and a short summary so we can reply faster. We do not send the form’s contact fields (name, email and phone) to the model. If you write them into the enquiry text itself, however, the model will see them. No enquiry is decided by a machine; a person reads every one. This is therefore not automated decision-making under Art. 22 GDPR.",
      },

      { type: "h2", text: "Who we share data with" },
      {
        type: "p",
        text: "We share data only with processors who help us run our business, under a data processing agreement. We disclose data to public authorities only where the law requires it.",
      },
      {
        type: "table",
        head: ["Processor", "Purpose", "Registered in"],
        rows: [
          ["Vercel Inc.", "website hosting", "USA"],
          ["Supabase Inc.", "enquiry database, data stored in the EU (Ireland)", "USA"],
          ["Plus Five Five, Inc. (Resend)", "sending emails from the website", "USA"],
          ["Anthropic PBC", "automatic sorting of enquiries", "USA"],
          ["Cloudflare, Inc.", "protecting the form against spam (Turnstile)", "USA"],
          ["INTERNET CZ, a.s. (FORPSI)", "company email", "Czech Republic"],
          ["external accounting services", "accounting and taxes", "Czech Republic"],
          ["cooperating consultants and developers", "preparing and delivering projects, bound by confidentiality and contract", "Czech Republic"],
        ],
      },
      {
        type: "p",
        text: "We hold remote consultations in a tool agreed with the client, for example Microsoft Teams, Google Meet or Zoom. If we use the client’s tool, it processes data under the client’s settings and contracts.",
      },
      {
        type: "p",
        text: "Where data is transferred outside the European Economic Area, we rely on the European Commission’s adequacy decision (EU-US Data Privacy Framework) for certified recipients, and otherwise on standard contractual clauses approved by the European Commission. We will send you a copy of these safeguards on request. We do not sell personal data or provide it for training AI models.",
      },

      { type: "h2", text: "Data in solutions we run for clients" },
      {
        type: "p",
        text: "When we run an automation or an assistant for a client, we process personal data on the client’s instructions and under the data processing agreement we have with them. If you contact us about data we process on a client’s instructions, we will pass your request on to the client and help to handle it.",
      },

      { type: "h2", text: "Your rights" },
      {
        type: "p",
        text: "You have the right to access your data, have it corrected or erased, restrict its processing and receive it in a portable format. You can object to processing based on legitimate interest. You can withdraw consent at any time. Just write to {email}. We will reply without undue delay and within one month at the latest. In exceptional cases we may extend this by two further months, and we will tell you so within one month of your request.",
      },
      {
        type: "p",
        text: "You also have the right to lodge a complaint with the Czech Office for Personal Data Protection (Úřad pro ochranu osobních údajů), Pplk. Sochora 27, 170 00 Prague 7, [www.uoou.gov.cz](https://uoou.gov.cz).",
      },

      { type: "h2", text: "Cookies" },
      {
        type: "p",
        text: "The asterionsoft.cz website does not use cookies or similar technologies for analytics, marketing or advertising and does not track you across websites. On the main page with the enquiry form we load Cloudflare Turnstile spam protection. It may store or read technical data in your browser that is needed to check that a person is filling in the form, and it passes information about your browser and device, including your IP address, to Cloudflare. This is strictly necessary storage for running the form securely, so it does not require your consent. We serve the website font from our own server, not from third parties. If we ever start using cookies that are not strictly necessary, we will ask for your consent first.",
      },

      { type: "h2", text: "Security" },
      {
        type: "p",
        text: "We store data encrypted. Only people who need it for their work have access to it, and only with two-factor authentication.",
      },

      { type: "h2", text: "Changes" },
      {
        type: "p",
        text: "We may update this policy. The current version, with its effective date, is always on this page.",
      },
    ],
  },

  de: {
    title: "Datenschutzerklärung",
    description: "Wie die Asterion Software s.r.o. personenbezogene Daten aus Anfragen, Aufträgen und Beratungen verarbeitet.",
    blocks: [
      {
        type: "p",
        text: "Dies ist eine Übersetzung zu Ihrer Information. Maßgeblich ist die [tschechische Fassung](/ochrana-osobnich-udaju/).",
      },
      { type: "h2", text: "Wer Ihre Daten verarbeitet" },
      {
        type: "p",
        text: "Verantwortlicher ist die Asterion Software s.r.o., Id.-Nr. 10736697, Sitz Bělehradská 858/23, 120 00 Prag 2, Tschechische Republik, eingetragen im Handelsregister beim Stadtgericht Prag, Abteilung C, Einlage 347537. Bei Fragen zum Datenschutz schreiben Sie an {email} oder rufen Sie +420 604 257 866 an. Einen Datenschutzbeauftragten haben wir nicht benannt, da das Gesetz dies für uns nicht vorschreibt.",
      },
      {
        type: "p",
        text: "Unsere Leistungen richten sich an Unternehmen, Unternehmer und andere Organisationen, etwa Eigentümergemeinschaften. Wir verarbeiten daher vor allem Daten von Ansprechpartnern auf Kundenseite.",
      },

      { type: "h2", text: "Was wir verarbeiten, wozu und wie lange" },
      {
        type: "table",
        head: ["Zweck", "Daten", "Rechtsgrundlage", "Speicherdauer"],
        rows: [
          [
            "Beantwortung Ihrer Anfrage und Gespräche über einen Auftrag",
            "Name, E-Mail, Telefon, Firma, gewählte Leistung, Anfragetext, Sprache der Website, weitere Kommunikation",
            "Fragen Sie für sich selbst an (z. B. als Einzelunternehmer), vorvertragliche Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Handeln Sie für ein Unternehmen oder eine Organisation, unser berechtigtes Interesse, zu antworten und über den Auftrag zu sprechen (Art. 6 Abs. 1 lit. f DSGVO).",
            "12 Monate ab dem letzten Kontakt, wenn kein Auftrag zustande kommt",
          ],
          [
            "Automatische Einordnung von Anfragen",
            "Anfragetext, Firmenname, gewählte Leistung, Sprache der Website",
            "berechtigtes Interesse an einer schnellen und passenden Antwort (lit. f)",
            "wie die Anfrage",
          ],
          [
            "Schutz des Formulars vor Missbrauch",
            "Einweg-Hash der IP-Adresse, Browsertyp, Ergebnis der Prüfung durch Cloudflare Turnstile",
            "berechtigtes Interesse am Schutz der Website vor Spam und vor Missbrauch zum Versand von E-Mails (lit. f)",
            "30 Tage",
          ],
          [
            "Betrieb der Website",
            "IP-Adresse, Zeit und Adresse der Anfrage in den technischen Protokollen des Hosters",
            "berechtigtes Interesse am Betrieb der Website und an der Behebung von Fehlern und Angriffen (lit. f)",
            "der Hoster löscht sie automatisch, spätestens nach 30 Tagen",
          ],
          [
            "Vertragserfüllung (Analyse, Umsetzung, Beratung, Schulung, Betrieb)",
            "Kontaktdaten, Kommunikation, Auftragsunterlagen",
            "Vertragserfüllung (lit. b), bei Ansprechpartnern des Kunden berechtigtes Interesse (lit. f)",
            "für die Dauer der Zusammenarbeit und 4 Jahre danach wegen möglicher Ansprüche aus dem Vertrag",
          ],
          [
            "Rechnungsstellung und Buchhaltung",
            "Rechnungsdaten, Zahlungen",
            "rechtliche Verpflichtung (lit. c) nach tschechischem Buchhaltungs- und Steuerrecht",
            "für die gesetzlich vorgeschriebene Dauer: Buchungsbelege 5 Jahre ab Ende des Geschäftsjahres, Umsatzsteuerbelege 10 Jahre",
          ],
          [
            "Aufzeichnung einer Beratung, nur auf Ihren Wunsch",
            "Bild, Stimme, geteilter Bildschirm",
            "Einwilligung aller Teilnehmer (lit. a)",
            "14 Tage ab der Beratung, danach gelöscht",
          ],
        ],
      },
      {
        type: "p",
        text: "Beratungen zeichnen wir standardmäßig nicht auf. Aus jedem Gespräch entsteht eine schriftliche Zusammenfassung, die wir als Teil der Auftragskommunikation aufbewahren. Ihre Einwilligung zur Aufzeichnung können Sie jederzeit widerrufen, dann löschen wir die Aufzeichnung sofort. Der Widerruf berührt die Verarbeitung vor dem Widerruf nicht.",
      },

      { type: "h2", text: "Ansprache von Unternehmen" },
      {
        type: "p",
        text: "Gelegentlich sprechen wir Unternehmen an, denen unsere Leistungen helfen könnten. Dafür nutzen wir berufliche Kontaktdaten (Name, Funktion, dienstliche E-Mail und Telefonnummer) aus öffentlichen Quellen wie Firmenwebsites und dem Handelsregister. Rechtsgrundlage ist unser berechtigtes Interesse, Leistungen anzubieten, die mit Ihrer Arbeit zusammenhängen (lit. f). Haben Sie kein Interesse, löschen wir die Daten nach 12 Monaten. Sie können dieser Verarbeitung jederzeit widersprechen; dann nutzen wir die Daten nicht mehr für eine Ansprache. Woher wir Ihre Daten haben, teilen wir Ihnen spätestens beim ersten Kontakt mit.",
      },

      { type: "h2", text: "Müssen Sie uns Daten angeben?" },
      {
        type: "p",
        text: "Nein. Ohne E-Mail-Adresse oder Telefonnummer können wir Ihre Anfrage aber nicht beantworten, und ohne Rechnungsdaten können wir keinen Vertrag schließen und keine Rechnung ausstellen.",
      },

      { type: "h2", text: "Woher wir die Daten haben" },
      {
        type: "p",
        text: "Vor allem von Ihnen: über das Formular, per E-Mail oder im Gespräch. Hat uns ein Kollege aus Ihrem Unternehmen Ihren Kontakt gegeben, nutzen wir ihn nur für die Kommunikation über den Auftrag. Bei der Ansprache von Unternehmen stammen die Daten aus den oben genannten öffentlichen Quellen.",
      },

      { type: "h2", text: "Automatische Einordnung von Anfragen" },
      {
        type: "p",
        text: "Der Text Ihrer Anfrage kann vom Sprachmodell Claude von Anthropic verarbeitet werden. Das Modell schlägt eine Kategorie, die Dringlichkeit und eine kurze Zusammenfassung vor, damit wir schneller antworten können. Die Kontaktfelder des Formulars (Name, E-Mail und Telefon) senden wir nicht an das Modell. Schreiben Sie diese jedoch in den Anfragetext selbst, sieht das Modell sie. Über keine Anfrage entscheidet eine Maschine, jede liest ein Mensch. Es handelt sich daher nicht um eine automatisierte Entscheidung nach Art. 22 DSGVO.",
      },

      { type: "h2", text: "An wen wir Daten weitergeben" },
      {
        type: "p",
        text: "Wir geben Daten nur an Auftragsverarbeiter weiter, die uns beim Betrieb unterstützen, und zwar auf Grundlage eines Auftragsverarbeitungsvertrags. Behörden erhalten Daten nur, wenn das Gesetz es verlangt.",
      },
      {
        type: "table",
        head: ["Auftragsverarbeiter", "Zweck", "Sitz"],
        rows: [
          ["Vercel Inc.", "Hosting der Website", "USA"],
          ["Supabase Inc.", "Datenbank für Anfragen, Daten gespeichert in der EU (Irland)", "USA"],
          ["Plus Five Five, Inc. (Resend)", "Versand von E-Mails aus der Website", "USA"],
          ["Anthropic PBC", "automatische Einordnung von Anfragen", "USA"],
          ["Cloudflare, Inc.", "Schutz des Formulars vor Spam (Turnstile)", "USA"],
          ["INTERNET CZ, a.s. (FORPSI)", "geschäftliche E-Mail", "Tschechische Republik"],
          ["externe Buchhaltungsdienste", "Buchhaltung und Steuern", "Tschechische Republik"],
          ["kooperierende Berater und Entwickler", "Vorbereitung und Durchführung von Aufträgen, zur Verschwiegenheit vertraglich verpflichtet", "Tschechische Republik"],
        ],
      },
      {
        type: "p",
        text: "Online-Beratungen führen wir in einem mit dem Kunden vereinbarten Werkzeug durch, zum Beispiel Microsoft Teams, Google Meet oder Zoom. Nutzen wir das Werkzeug des Kunden, verarbeitet es die Daten nach dessen Einstellungen und Verträgen.",
      },
      {
        type: "p",
        text: "Werden Daten außerhalb des Europäischen Wirtschaftsraums übermittelt, stützen wir uns bei zertifizierten Empfängern auf den Angemessenheitsbeschluss der Europäischen Kommission (EU-US Data Privacy Framework), sonst auf von der Europäischen Kommission genehmigte Standardvertragsklauseln. Eine Kopie dieser Garantien senden wir Ihnen auf Anfrage. Wir verkaufen keine personenbezogenen Daten und stellen sie nicht für das Training von KI-Modellen bereit.",
      },

      { type: "h2", text: "Daten in Lösungen, die wir für Kunden betreiben" },
      {
        type: "p",
        text: "Betreiben wir für einen Kunden eine Automatisierung oder einen Assistenten, verarbeiten wir personenbezogene Daten nach seinen Weisungen und auf Grundlage des Auftragsverarbeitungsvertrags mit ihm. Wenden Sie sich an uns wegen Daten, die wir nach Weisung eines Kunden verarbeiten, leiten wir Ihre Anfrage an den Kunden weiter und helfen bei der Bearbeitung.",
      },

      { type: "h2", text: "Ihre Rechte" },
      {
        type: "p",
        text: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Einer Verarbeitung auf Grundlage des berechtigten Interesses können Sie widersprechen. Eine Einwilligung können Sie jederzeit widerrufen. Schreiben Sie einfach an {email}. Wir antworten unverzüglich, spätestens innerhalb eines Monats. In Ausnahmefällen können wir die Frist um zwei weitere Monate verlängern; darüber informieren wir Sie innerhalb eines Monats nach Ihrer Anfrage.",
      },
      {
        type: "p",
        text: "Sie haben außerdem das Recht, sich bei der tschechischen Datenschutzbehörde (Úřad pro ochranu osobních údajů), Pplk. Sochora 27, 170 00 Prag 7, [www.uoou.gov.cz](https://uoou.gov.cz), zu beschweren.",
      },

      { type: "h2", text: "Cookies" },
      {
        type: "p",
        text: "Die Website asterionsoft.cz verwendet keine Cookies oder ähnlichen Technologien für Analyse, Marketing oder Werbung und verfolgt Sie nicht über Websites hinweg. Auf der Startseite mit dem Anfrageformular laden wir den Spamschutz Cloudflare Turnstile. Er kann im Browser technische Daten speichern oder auslesen, die zur Prüfung nötig sind, dass ein Mensch das Formular ausfüllt, und übermittelt Angaben zu Browser und Gerät einschließlich der IP-Adresse an Cloudflare. Es handelt sich um unbedingt erforderliche Speicherung für den sicheren Betrieb des Formulars, für die keine Einwilligung nötig ist. Die Schrift der Website laden wir von unserem eigenen Server, nicht von Dritten. Sollten wir jemals nicht unbedingt erforderliche Cookies einsetzen, bitten wir Sie vorher um Ihre Einwilligung.",
      },

      { type: "h2", text: "Sicherheit" },
      {
        type: "p",
        text: "Wir speichern Daten verschlüsselt. Zugriff haben nur Personen, die sie für ihre Arbeit brauchen, und nur mit Zwei-Faktor-Authentifizierung.",
      },

      { type: "h2", text: "Änderungen" },
      {
        type: "p",
        text: "Wir können diese Erklärung aktualisieren. Die aktuelle Fassung mit Datum des Inkrafttretens finden Sie immer auf dieser Seite.",
      },
    ],
  },
};
