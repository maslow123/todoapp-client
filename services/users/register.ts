import { RegisterUserRequest, RegisterUserResponse } from "services/types/users";

const registerUser = async (payload: RegisterUserRequest): Promise<RegisterUserResponse> => {
    try {
        const data = await fetch('http://localhost:8080/users/register', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const json = await data.json();
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };
        return err as RegisterUserResponse;
    }
};

export default registerUser;