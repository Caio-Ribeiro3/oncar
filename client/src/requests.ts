import { fetcher } from "./fetcher";
import { Brand, Car, Lead, PaginatedEntity } from "./types";

export async function getPaginatedCars(page: string | null, limit: string | null, query = '') {
    return (await fetcher.get<PaginatedEntity<Car>>(`/car${page && limit ? `?page=${page}&limit=${limit}` : ''}${query}`)).data
}

export async function getBrands() {
    return (await fetcher.get<Brand[]>('/brand')).data
}

export async function createSimulation(payload: Lead & {
    carId: Car['id'];
}) {
    return (await fetcher.post('/simulation', payload)).data
}

export async function getCarById({ carId }: { carId: Car['id'] }) {
    return (await fetcher.get<Car>(`/car/${carId}`)).data
}

export async function deleteCar(payload: Pick<Car, 'id'>) {
    return (await fetcher.delete('/car', {
        data: {
            carId: payload.id
        }
    })).data
}

interface CreateCarPayload extends Pick<Car, 'color' | 'kilometers' | 'image' | 'price'> {
    model: string;
    brand: string;
}

export async function createCar(payload: CreateCarPayload) {
    const { brand, color, image, kilometers, model, price } = payload
    return (await fetcher.post('/car', {
        brand,
        model,
        color,
        kilometers,
        image,
        price
    })).data
}