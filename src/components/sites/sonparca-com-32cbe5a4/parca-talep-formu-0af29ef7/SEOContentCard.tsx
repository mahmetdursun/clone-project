import { Phone } from "lucide-react";

import { seoSections } from "./data";

export function SEOContentCard() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-dark-bg-light bg-dark-bg px-4 py-3">
        <Phone className="size-4 text-dark-text-primary" aria-hidden="true" />
        <h2 className="text-base font-semibold text-dark-text-primary">
          Otomobil Yedek Parça Talebi
        </h2>
      </div>

      <div className="max-h-[420px] space-y-6 overflow-y-auto p-4 text-sm leading-relaxed text-light-text-primary md:max-h-[480px] md:p-6">
        {seoSections.map((section) => {
          const HeadingTag = section.level;
          return (
            <section key={section.heading}>
              <HeadingTag className="mb-2 text-base font-semibold text-light-text-primary md:text-lg">
                {section.heading}
              </HeadingTag>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "text-light-text-muted" : "mt-2 text-light-text-muted"}
                >
                  {paragraph}
                </p>
              ))}

              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mt-4">
                  <h3 className="mb-1 text-sm font-semibold text-light-text-primary md:text-base">
                    {sub.heading}
                  </h3>
                  {sub.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-light-text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {section.table && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full rounded border border-gray-200 text-xs md:text-sm">
                    <thead className="bg-dark-bg text-dark-text-primary">
                      <tr>
                        {section.table.columns.map((column) => (
                          <th
                            key={column}
                            className="px-3 py-2 text-left font-medium"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr
                          key={row.join("-")}
                          className="hover:bg-light-bg-muted"
                        >
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-3 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
