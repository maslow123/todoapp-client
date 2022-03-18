import { GenericErrorResponse } from "./generic";

export interface Todo {
    category_id: number;
    category_name: string;
    color: string;
    content: string;
    created_at: string;
    date: string;
    id: number;
    is_priority: boolean;
    status: boolean;
    title: string;
    updated_at: string;
    user_email: string;
};

export interface TodoListResponse extends GenericErrorResponse {
    today: Todo[],
    upcoming: Todo[],
    done: Todo[]
};