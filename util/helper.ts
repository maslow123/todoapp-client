import { errors } from "./errors";
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

const hasError = (errors: string[], key: string): Boolean => {
    return errors?.length > 0 && errors.indexOf(key) !== -1;
};

const checkEmailFormat = (email: string): Boolean => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const valid: Boolean = email.match(emailFormat) ? true : false;

    return valid;
};

const generateErrorMessage = (errorCode: string): string  => {
    const error = errors.find(e => e.error === errorCode);
    if (error) {
        return error.message;
    }

    return errorCode;
}

export {
    splitCharacter,
    normalizeDate,
    generateColor,
    hasError,
    checkEmailFormat,
    generateErrorMessage
};