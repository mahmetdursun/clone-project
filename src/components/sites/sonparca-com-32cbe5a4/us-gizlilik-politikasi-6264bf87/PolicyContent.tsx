import { closingNote, policySections, type PolicySection } from "./data";

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 md:mb-4">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 md:h-8 md:w-8 md:text-sm">
        {number}
      </span>
      <h2 className="break-words text-lg font-bold text-gray-900 md:text-xl">
        {title}
      </h2>
    </div>
  );
}

function SectionIntro({ text }: { text: string }) {
  return (
    <p className="mb-3 whitespace-normal break-words text-sm md:mb-4 md:text-base">
      {text}
    </p>
  );
}

function SectionBody({ section }: { section: PolicySection }) {
  switch (section.variant) {
    case "cards":
      return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {section.cards?.map((card) => (
            <div
              key={card.title}
              className="rounded-md border border-gray-200 bg-white p-3 text-xs md:p-4 md:text-sm"
            >
              <h3 className="mb-2 font-semibold">{card.title}</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {card.items.map((item) => (
                  <li key={item} className="whitespace-normal break-words">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "list":
      return (
        <>
          <ul className="mb-3 list-inside list-disc space-y-1 text-xs md:mb-4 md:text-sm">
            {section.listItems?.map((item) => (
              <li key={item.text} className="whitespace-normal break-words">
                {item.label ? <strong>{item.label} </strong> : null}
                {item.text}
              </li>
            ))}
          </ul>
          {section.calloutNote ? (
            <div className="whitespace-normal break-words rounded-md border border-blue-200 bg-blue-50 p-3 text-[11px] text-blue-800 md:p-4 md:text-xs">
              {section.calloutNote}
            </div>
          ) : null}
          {section.trailingNote ? (
            <p
              className={`whitespace-normal break-words text-[11px] md:text-xs ${
                section.trailingNoteVariant === "gray-600"
                  ? "text-gray-600"
                  : "mb-3 text-sm md:mb-4 md:text-base"
              }`}
            >
              {section.trailingNote}
            </p>
          ) : null}
        </>
      );
    case "paragraphs":
      return (
        <>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-3 whitespace-normal break-words text-sm md:mb-4 md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </>
      );
    case "contact":
      return (
        <>
          <ul className="mb-3 list-none space-y-1 text-xs md:mb-4 md:text-sm">
            {section.contactItems?.map((item) => (
              <li key={item.label} className="whitespace-normal break-words">
                <strong>{item.label}</strong>{" "}
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </li>
            ))}
          </ul>
          {section.trailingNote ? (
            <p className="mb-3 whitespace-normal break-words text-sm md:mb-4 md:text-base">
              {section.trailingNote}
            </p>
          ) : null}
        </>
      );
    default:
      return null;
  }
}

export function PolicyContent() {
  return (
    <>
      {policySections.map((section) => (
        <section
          key={section.number}
          className={section.number === 9 ? "mb-4 md:mb-6" : "mb-8 md:mb-10"}
        >
          <SectionHeading number={section.number} title={section.title} />
          {section.intro ? <SectionIntro text={section.intro} /> : null}
          <SectionBody section={section} />
        </section>
      ))}
      <p className="mt-3 whitespace-normal break-words text-[11px] text-gray-500 md:text-xs">
        {closingNote}
      </p>
    </>
  );
}
