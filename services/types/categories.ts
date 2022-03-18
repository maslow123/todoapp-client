import { GenericErrorResponse } from "./generic";

export interface ListCategoryResponse extends GenericErrorResponse {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};