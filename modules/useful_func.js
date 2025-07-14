export function getCurrentDate() {
    const date = new Date();
    return date.toLocaleString("ru-RU", { hour12: false });
}

export function cleanHtml(text) {
    return text.replace(/</g, "<").replace(/>/g, ">");
}
