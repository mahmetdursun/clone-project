import { introText, lastUpdated, pageTitle } from "./data";

export function TermsHero() {
  return (
    <>
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 break-words">{pageTitle}</h1>
      <p className="text-xs md:text-sm mb-4">{lastUpdated}</p>
      <p className="text-sm md:text-base mb-4 whitespace-normal break-words">{introText}</p>
    </>
  );
}
