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
    
    const invalidEmail = (errors?.length > 0 && errors.find(err => err !== 'email') && errors.find(err => err === 'invalid-format-email')) 
                        ? true 
                        : false;

    if(key === 'email' && invalidEmail) {
        return invalidEmail;
    }
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
};
const validate = (payload: any ): any => {
    const key = Object.keys(payload);
    let errors = [];

    key.map(prop => {
        let isError = false;
        if (payload[prop].length < 1) {
            isError = true;
            errors = [...errors, prop];
        }
        if (prop === 'email' && !isError && !checkEmailFormat(payload[prop])) {                
            errors = [...errors, 'invalid-format-email'];
        }
    });

    return errors;
}

export {
    splitCharacter,
    normalizeDate,
    generateColor,
    hasError,
    checkEmailFormat,
    generateErrorMessage,
    validate
};