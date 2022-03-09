import { GenericErrorResponse } from "services/types/generic";
import { LoginRequest, LoginResponse } from "services/types/users";

const loginUser = async (payload: LoginRequest): Promise<LoginResponse> => {
    const data = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        body: JSON.stringify(payload)
    });
    const json = await data.json();

    return json;
};

export default loginUser;