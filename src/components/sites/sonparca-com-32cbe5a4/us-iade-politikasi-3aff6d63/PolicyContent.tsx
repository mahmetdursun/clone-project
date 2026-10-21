import { Fragment } from "react";
import { Mail, Phone } from "lucide-react";

import {
  closingParagraph,
  sections,
  type PolicySection,
  type SectionBlock,
} from "./data";

/** Renders `**bold**` markdown-style segments as <strong> without a markdown dependency. */
function withBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

const badgeClasses: Record<PolicySection["badgeColor"], string> = {
  red: "bg-red-100 text-red-600",
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  orange: "bg-orange-100 text-orange-700",
};

const calloutClasses = {
  red: "rounded-md border border-red-200 bg-red-50 p-4 md:p-5",
  blue: "rounded-md border border-blue-200 bg-blue-50 p-4 mb-3 md:mb-4",
  orange: "rounded-md border border-orange-200 bg-orange-50 p-4 md:p-5 mb-3 md:mb-4",
  gray: "rounded-md border border-gray-200 bg-gray-50 p-4 md:p-5",
} as const;

const calloutTextClasses = {
  red: "text-red-800",
  blue: "text-blue-800",
  orange: "text-orange-800",
  gray: "text-gray-700",
} as const;

function SectionHeading({ number, title, badgeColor }: { number: number; title: string; badgeColor: PolicySection["badgeColor"] }) {
  return (
    <div className="flex items-center gap-2 mb-3 md:mb-4">
      <span
        className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full ${badgeClasses[badgeColor]} text-xs md:text-sm font-semibold`}
      >
        {number}
      </span>
      <h2 className="text-lg md:text-xl font-bold text-gray-900 break-words">{title}</h2>
    </div>
  );
}

function Block({ block }: { block: SectionBlock }) {
  switch (block.type) {
    case "callout": {
      const tone = block.tone;
      return (
        <div className={calloutClasses[tone]}>
          {block.lead && (
            <p className={`text-xs md:text-sm font-semibold ${calloutTextClasses[tone]} mb-2`}>{block.lead}</p>
          )}
          {block.body && (
            <p className={`text-xs md:text-sm ${calloutTextClasses[tone]} ${block.items ? "mb-3" : ""} whitespace-normal break-words`}>
              {withBold(block.body)}
            </p>
          )}
          {block.items && (
            <ul className={`list-disc list-inside space-y-1 text-xs md:text-sm ${calloutTextClasses[tone]}`}>
              {block.items.map((item, i) => (
                <li key={i} className="whitespace-normal break-words">
                  {withBold(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    case "paragraph":
      return <p className="text-xs md:text-sm text-gray-700 mb-2 whitespace-normal break-words">{block.text}</p>;
    case "list":
      return (
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-gray-700">
          {block.items.map((item, i) => (
            <li key={i} className="whitespace-normal break-words">
              {withBold(item)}
            </li>
          ))}
        </ul>
      );
    case "twoColumnCards":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {block.columns.map((col, i) => (
            <div key={i} className="rounded-md border border-gray-200 bg-white p-3 md:p-4">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">{col.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-700">
                {col.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "categoryGrid":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {block.cards.map((card, i) => (
            <div
              key={i}
              className="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs md:text-sm whitespace-normal break-words"
            >
              <h3 className="font-semibold mb-1">{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      );
    case "orderedProcess":
      return (
        <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm rounded-md border border-gray-200 bg-gray-50 p-4">
          {block.items.map((item, i) =>
            typeof item === "string" ? (
              <li key={i} className="whitespace-normal break-words">
                {withBold(item)}
              </li>
            ) : (
              <li key={i} className="whitespace-normal break-words">
                <strong>{item.lead}</strong>
                <ul className="list-disc list-inside ml-4 mt-1 text-gray-700">
                  {item.subItems.map((sub, j) => (
                    <li key={j}>
                      <strong>{sub.lead}</strong> {sub.text}
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
        </ol>
      );
    case "twoColumnDivided":
      return (
        <div className="rounded-md border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-xs md:text-sm">
            {block.columns.map((col, i) => (
              <div key={i} className="p-4">
                <h3 className="font-semibold mb-2">{col.title}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {col.items.map((item, j) => (
                    <li key={j}>{withBold(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case "contactBox":
      return (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-5">
          <p className="text-xs md:text-sm mb-3">
            <strong>{block.lead}</strong>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-5 text-xs md:text-sm">
            <a
              href={`tel:${block.phone}`}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <Phone className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              <span>{block.phone}</span>
            </a>
            <a
              href={`mailto:${block.email}`}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <Mail className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              <span>{block.email}</span>
            </a>
          </div>
          <p className="mt-4 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">{block.footnote}</p>
        </div>
      );
    default:
      return null;
  }
}

export function PolicyContent() {
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.number}
          className={section.number <= 6 ? "mb-8 md:mb-10" : "mb-6 md:mb-8"}
        >
          <SectionHeading number={section.number} title={section.title} badgeColor={section.badgeColor} />
          {section.intro && (
            <p className="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">{withBold(section.intro)}</p>
          )}
          {section.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
      <p className="mt-3 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">{closingParagraph}</p>
    </>
  );
}
