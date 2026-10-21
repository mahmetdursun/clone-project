import { sections, type TermsSection } from "./data";

function SectionBody({ section }: { section: TermsSection }) {
  switch (section.kind) {
    case "list":
      return (
        <ul className="list-disc list-inside mb-4 text-sm md:text-base">
          {section.items.map((item, i) => (
            <li key={i} className="whitespace-normal break-words pb-2">
              {item}
            </li>
          ))}
        </ul>
      );
    case "paragraph":
      return <p className="text-sm md:text-base mb-4 whitespace-normal break-words">{section.text}</p>;
    case "contact":
      return (
        <>
          <p className="text-sm md:text-base mb-4 whitespace-normal break-words">{section.text}</p>
          <ul className="list-none mb-4 text-sm md:text-base">
            <li className="whitespace-normal break-words pb-2">
              <b>E-posta:</b>
              <a href={`mailto:${section.contact.email}`} className="hover:underline">
                {" "}
                {section.contact.email}
              </a>
            </li>
            <li className="whitespace-normal break-words pb-2">
              <b>Telefon:</b>
              <a href={`tel:${section.contact.phone}`} className="hover:underline">
                {section.contact.phone}
              </a>
            </li>
            <li className="whitespace-normal break-words pb-2">
              <b>Adres:</b> {section.contact.address}
            </li>
          </ul>
        </>
      );
    default:
      return null;
  }
}

export function TermsContent() {
  return (
    <>
      {sections.map((section) => (
        <section key={section.number}>
          <h2 className="text-lg md:text-xl font-bold mb-3 mt-6 break-words">{section.title}</h2>
          <SectionBody section={section} />
        </section>
      ))}
    </>
  );
}
