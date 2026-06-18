export type Country = {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
};

export const dialCodeMap: Record<string, string> = {
  IN: "+91",
  US: "+1",
  GB: "+44",
  AU: "+61",
  DE: "+49",
  FR: "+33",
  JP: "+81",
  CN: "+86",
  BR: "+55",
  ZA: "+27",
  RU: "+7",
  AE: "+971",
  SG: "+65",
  SA: "+966",
};

const getFlag = (code: string): string =>
  code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );

export const countries: Country[] = (() => {
  const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
  });

  return Object.entries(dialCodeMap).map(([code, dial_code]) => ({
    code,
    name: regionNames.of(code) || code,
    dial_code,
    flag: getFlag(code),
  }));
})();