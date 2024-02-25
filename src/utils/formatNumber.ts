export function formatNumber(number) {
  return number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  });
}
