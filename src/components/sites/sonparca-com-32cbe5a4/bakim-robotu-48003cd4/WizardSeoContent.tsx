import { WIZARD_SEO_CONTENT } from "./data";

export function WizardSeoContent() {
  return (
    <div className="mt-10 space-y-4 rounded-lg border border-gray-200 bg-white p-6 text-sm leading-relaxed text-gray-600">
      {WIZARD_SEO_CONTENT.map((block, i) => (
        <div key={i}>
          {block.h2 ? (
            <h2 className="mb-2 text-lg font-bold text-light-text-primary">
              {block.h2}
            </h2>
          ) : null}
          {block.h3 ? (
            <h3 className="mb-1 font-semibold text-light-text-primary">
              {block.h3}
            </h3>
          ) : null}
          {block.paragraphs.map((p, pi) => (
            <p key={pi} className="mb-2">
              {p}
            </p>
          ))}
          {block.table ? (
            <div className="mt-3 mb-2 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    {block.table.headers.map((h) => (
                      <th
                        key={h}
                        className="py-2 pr-4 font-semibold text-light-text-primary"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.table.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-gray-100">
                      {row.map((cell, ci) => (
                        <td key={ci} className="py-2 pr-4 text-gray-600">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
