const validateQuote = (quote: string, anonymous: boolean): { validated: boolean; errors: { msg: string }[] } => {
  let errors: { msg: string }[] = [];
  if (quote === undefined || anonymous === undefined) {
    errors.push({ msg: "quote cannot be empty" });
    return { validated: false, errors };
  }
  if (typeof quote !== "string" || typeof anonymous !== "boolean") {
    errors.push({ msg: "invalid request" });
    return { validated: false, errors };
  }
  if (quote.length < 1 || quote.length > 280) {
    errors.push({ msg: "a quote can be 1 to 280 characters long" });
    return { validated: false, errors };
  }
  // if validation passed
  return { validated: true, errors };
};

export default validateQuote;
