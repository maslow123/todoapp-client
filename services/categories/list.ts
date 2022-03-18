import { headers } from "services/headers";
import { ListCategoryResponse } from "services/types/categories";

const listCategory = async (): Promise<ListCategoryResponse[] | ListCategoryResponse> => {
    try {
        const data = await fetch('http://localhost:8080/categories?page_id=1&page_size=5', {
            method: 'GET',
            ...headers
        });
        const json = await data.json();
    
        return json;
    } catch(e) {
        const err = {
            error: e.message
        };

        return err as ListCategoryResponse;
    }
};

export default listCategory;