import { mock } from "./mock";

const splitCharacter = (char: string, maxSize: number, isTitle: boolean): string => {
    if (char.length > maxSize) {
        char = `${char.substring(0, maxSize)}...`;
        if (!isTitle) {
            char += 'Baca selengkapnya'
        }
    }
    return char;
};

const normalizeDate = (date: Date, isToday: Boolean): string => {
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();

    if (!isToday) {
        return dateString;
    }
    return timeString;
};

const generateColor = (): string => {
    const totalColor = mock.colors.length;
    const randomColor = Math.floor(Math.random() * totalColor);
    
    return mock.colors[randomColor];
};

export {
    splitCharacter,
    normalizeDate,
    generateColor
};