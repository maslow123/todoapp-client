const splitCharacter = (char: string, maxSize: number, isTitle: boolean): string => {
    if (char.length > maxSize) {
        char = `${char.substring(0, maxSize)}...`;
        if (!isTitle) {
            char += 'Baca selengkapnya'
        }
    }
    return char;
};

export {
    splitCharacter
};