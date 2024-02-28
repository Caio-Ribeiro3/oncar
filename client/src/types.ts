export interface PaginatedEntity<T> {
    page: number;
    count: number;
    limit: number;
    data: T[];
}

export interface Car {
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
}

export interface Brand {
    id: string;
    name: string;
    models: {
        id: string;
        name: string;
    }[]
}

export interface Lead {
    name: string;
    cpf: string;
    email: string;
    phone: string;
}