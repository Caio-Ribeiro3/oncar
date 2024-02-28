import { useLoaderData } from "react-router-dom"

import Grid from '@mui/joy/Grid';

import { loader } from '../routes/app/homepage';

import CarCard from './CarCard';

export default function CarGrid() {
    const { cars } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    return (
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            {cars.data.map(car => (
                <Grid
                    key={car.id}
                    xs={4}
                >
                    <CarCard
                        image={car.image}
                        brand={car.model.brand.name}
                        model={car.model.name}
                        kilometers={car.kilometers}
                        price={car.price}
                        id={car.id}
                    />
                </Grid>
            ))}
        </Grid>
    )
}