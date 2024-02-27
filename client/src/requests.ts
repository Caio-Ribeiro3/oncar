import { fetcher } from "./facade/fetcher";
import { PaginatedEntity } from "./types";

export async function getPaginatedCars(page: string | null, limit: string | null, query = '') {
    return (await fetcher.get<PaginatedEntity<{
        id: string;
        color: string;
        image: string;
        price: number;
        kilometers: number;
        model: {
            name: string;
            brand: {
                id: string;
                name: string;
            }
        }
    }>>(`/car${page && limit ? `?page=${page}&limit=${limit}` : ''}${query}`)).data
}

export async function getBrands() {
    return (await fetcher.get<{
        id: string;
        name: string;
        models: {
            id: string;
            name: string;
        }[]
    }[]>('/brand')).data
}