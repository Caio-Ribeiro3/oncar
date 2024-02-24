export type Car = {}
export type Simulation = {}

export async function getCars(): Promise<Car[]> {
    return []
}

export async function getCar(): Promise<Car> {
    return {}
}

export async function createCar(): Promise<Car> {
    return {}
}

export async function deleteCar(): Promise<boolean> {
    return false
}

export async function createSimulation(): Promise<Simulation> {
    return {}
}

export async function getCustomerScore(): Promise<number> {
    return (Math.random() * 998) + 1
}