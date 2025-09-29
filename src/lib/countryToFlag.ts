export function countryToFlag(isoCode) {
    return isoCode
        .toUpperCase()
        .replace(/./g, char =>
            String.fromCodePoint(127397 + char.charCodeAt()));
}
