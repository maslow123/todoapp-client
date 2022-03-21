import { headers } from "services/headers";
import { TodoCreateRequest, TodoCreateResponse } from "services/types/todos";

const createTodo = async (payload: TodoCreateRequest): Promise<TodoCreateResponse> => {
    try {
        const data = await fetch('http://localhost:8080/todo', {
            method: 'POST',
            body: JSON.stringify(payload),
            ...headers
        });
        const json = await data.json();
    
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };

        return err as TodoCreateResponse;
    }
};

export default createTodo;