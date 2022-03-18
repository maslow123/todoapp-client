export type AddTodoRequest = {
    color: string;
    date: Date;
    title: string;
    content: string;
    is_priority: boolean;
    category_id: number;
};