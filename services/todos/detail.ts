import { headers } from "services/headers";
import { TodoDetailResponse } from "services/types/todos";

const detailTodo = async (todoID: number): Promise<TodoDetailResponse> => {
    try {
        const data = await fetch(`http://localhost:8080/todo/${todoID}`, {
            method: 'GET',
            ...headers
        });
        const json = await data.json();
    
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };

        return err as TodoDetailResponse;
    }
};

export default detailTodo;