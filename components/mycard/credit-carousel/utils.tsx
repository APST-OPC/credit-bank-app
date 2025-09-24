import { OffNumber } from "./types";

export const CARD_WIDTH = (wDimension: number) => {
  return wDimension > 480 ? 480 : wDimension;
};

export const viewableConfig = {
  itemVisiblePercentThreshold: 50,
};

export const renderNumbers = (a: string, b: OffNumber, c: boolean) => {
  const format = a.replace(/\s+/g, "");
  const digits = (x: number, y: number, z: string) => {
    if (c) {
      return z.slice(x, y).replace(/\d/g, "*");
    } else return z.slice(x, y);
  };
  switch (b) {
    case "cn":
      return `${digits(0, 4, a)} ${digits(4, 8, a)} ${digits(
        8,
        12,
        a
      )} ${format.slice(12, 16)}`;
    case "cvv":
      return digits(0, 3, a);
    case "exp":
      const exp = a.replace(/[^0-9]/g, "");
      return `${digits(0, 2, exp)}/${digits(2, 4, exp)}`;
  }
};
