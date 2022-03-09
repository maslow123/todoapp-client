export function hasError(errors: string[], key: string): Boolean {
    return errors?.length > 0 && errors.indexOf(key) !== -1;
};