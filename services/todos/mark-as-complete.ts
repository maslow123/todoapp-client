import { headers } from "services/headers";
import { TodoUpdateResponse } from "services/types/todos";

const markAsCompleteTodo = async (todoID: number): Promise<TodoUpdateResponse> => {
    try {
        const data = await fetch(`http://localhost:8080/todo/${todoID}`, {
            method: 'PUT',
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

export default markAsCompleteTodo;