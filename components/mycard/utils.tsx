export const initialValues = {
  cardType: "Credit Card",
  cardHolderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export const inputRestrict = (a: string, b: boolean = true) => {
  let c = a.replace(/[^0-9]/g, "");
  if (b !== true) return c;
  return (c = `${c.slice(0, 2)}${c.slice(2, 4) === "" ? "" : "/"}${c.slice(
    2,
    4
  )}`);
};
