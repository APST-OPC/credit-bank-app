export const stringFormat = (
  str: string,
  casing: "pascal" | "capital" = "pascal"
) => {
  if (casing === "capital") {
    return str.toUpperCase();
  }
  return str
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
};