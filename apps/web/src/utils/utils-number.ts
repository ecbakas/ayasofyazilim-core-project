export function localizeNumber(locale: string) {
  return Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
}
export function localizeCurrency(locale: string) {
  return (amount: number, currency: string) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
}
