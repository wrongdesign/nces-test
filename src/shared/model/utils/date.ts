type FormatDateReturnType = 'full' | 'short' | 'monthYear' | 'string';

const validFormats: Record<FormatDateReturnType, Intl.DateTimeFormatOptions> = {
    full: {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    },
    short: {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    },
    monthYear: {
        month: 'short',
        year: 'numeric',
    },
    string: {},
};

export const formatDate = (
    date: Date | string | undefined,
    locale: Intl.LocalesArgument,
    returnType: FormatDateReturnType = 'string'
) => {
    const validDate = typeof date === 'string' ? new Date(date) : date;

    return validDate ? validDate.toLocaleDateString(locale, validFormats[returnType]) : '-';
};