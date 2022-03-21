import { headers } from "services/headers";
import { TodoListResponse } from "services/types/todos";

const listTodo = async (): Promise<TodoListResponse> => {
    try {
        const data = await fetch('http://localhost:8080/todo?page_id=1&page_size=20', {
            method: 'GET',
            ...headers
        });
        const json = await data.json();
    
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };

        return err as TodoListResponse;
    }
};

export default listTodo;