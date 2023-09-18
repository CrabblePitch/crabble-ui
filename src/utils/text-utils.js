export function capitalize(text = '') {
    const firstChar = text[0];

    return firstChar.toUpperCase() + text.slice(1);
}
