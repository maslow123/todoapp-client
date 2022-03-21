import { headers } from "services/headers";
import { TodoUpdateRequest, TodoUpdateResponse } from "services/types/todos";
import { getToken } from "util/helper";

const editTodo = async (payload: TodoUpdateRequest): Promise<TodoUpdateResponse> => {
    try {
        getToken();
        const data = await fetch('http://localhost:8080/todo', {
            method: 'PUT',
            body: JSON.stringify(payload),
            ...headers
        });
        const json = await data.json();
    
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };

        return err as TodoUpdateResponse;
    }
};

export default editTodo;