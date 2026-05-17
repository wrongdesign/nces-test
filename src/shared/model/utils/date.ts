type FormatDateReturnType =
  | "full"
  | "short"
  | "monthYear"
  | "string"
  | "fullString";

const validFormats: Record<
  Exclude<FormatDateReturnType, "fullString">,
  Intl.DateTimeFormatOptions
> = {
  full: {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  short: {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  monthYear: {
    month: "short",
    year: "numeric",
  },
  string: {},
};

export const formatDate = (
  date: Date | string | undefined,
  locale: Intl.LocalesArgument,
  returnType: FormatDateReturnType = "string",
) => {
  const validDate = typeof date === "string" ? new Date(date) : date;

  if (!validDate || isNaN(validDate.getTime())) {
    return "-";
  }

  if (returnType === "fullString") {
    const year = validDate.getFullYear();

    const month = String(validDate.getMonth() + 1).padStart(2, "0");

    const day = String(validDate.getDate()).padStart(2, "0");

    const hours = String(validDate.getHours()).padStart(2, "0");

    const minutes = String(validDate.getMinutes()).padStart(2, "0");

    const seconds = String(validDate.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return validDate.toLocaleDateString(locale, validFormats[returnType]);
};
