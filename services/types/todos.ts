import { GenericErrorResponse }  from './generic';

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
    today: Todo[];
    upcoming: Todo[];
    done: Todo[]
};

export interface TodoCreateRequest extends GenericErrorResponse {
    todo_id: number;
    category_id: number;
    title: string;
    content: string;
    date: string;
    color: string;
    is_priority: boolean;
};

export interface TodoDetailResponse extends Todo, GenericErrorResponse {};

export interface TodoCreateResponse extends Todo, GenericErrorResponse {};

export interface TodoUpdateRequest extends TodoCreateRequest {
    todo_id: number;
};

export interface TodoUpdateResponse extends Todo, GenericErrorResponse {};