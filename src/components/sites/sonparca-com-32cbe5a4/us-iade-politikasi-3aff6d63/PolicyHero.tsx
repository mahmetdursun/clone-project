import { introText, lastUpdated, pageTitle } from "./data";

export function PolicyHero() {
  return (
    <>
      <header className="border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words">
          {pageTitle}
        </h1>
        <p className="text-xs md:text-sm text-gray-500">{lastUpdated}</p>
      </header>
      <p className="mt-4 text-sm md:text-base leading-relaxed">{introText}</p>
    </>
  );
}
