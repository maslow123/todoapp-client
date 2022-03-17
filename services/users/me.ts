import { headers } from "services/headers";
import { MeResponse } from "services/types/users";

const me = async (): Promise<MeResponse> => {
    try {
        const data = await fetch('http://localhost:8080/users/me', {
            method: 'GET',
            ...headers
        });
        const json = await data.json();
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };
        return err as MeResponse;
    }
};

export default me;