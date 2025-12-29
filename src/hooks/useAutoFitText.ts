export function useAutoFitText(text: string) {
    const length = text.length;

    let fontSizeClass = 'text-8xl';

    if (length > 30) {
        fontSizeClass = 'text-4xl';
    } else if (length > 15) {
        fontSizeClass = 'text-6xl';
    }

    return { fontSizeClass };
}
