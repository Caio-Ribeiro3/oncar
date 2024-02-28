import { useLoaderData } from 'react-router-dom';

import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

import { loader } from '../routes/app/single-car';

import { formatKilometers, formatPrice } from '../utils';

import Image from './Image';

export default function CarResume() {
    const car = useLoaderData() as Awaited<ReturnType<typeof loader>>

    return (

        <Stack spacing={2}>
            <Image
                src={car.image}
                alt={`image of ${car.model.name}`}
                height={500}
                width={500}
                style={{ borderRadius: 8 }}
            />
            <Typography level='h1'>
                {`${car.model.brand.name} ${car.model.name}`}
            </Typography>
            <Grid container>
                <Grid xs={4}>
                    <Typography level='body-md' fontWeight={600}>
                        Cor
                    </Typography>
                    <Typography level='body-sm'>
                        {car.color}
                    </Typography>
                </Grid>
                <Grid xs={4}>
                    <Typography level='body-md' fontWeight={600}>
                        Quilometragem
                    </Typography>
                    <Typography level='body-sm'>
                        {formatKilometers(car.kilometers)}
                    </Typography>
                </Grid>
                <Grid xs={4}>
                    <Typography level='body-md' fontWeight={600}>
                        Preço
                    </Typography>
                    <Typography level='body-sm'>
                        {formatPrice(car.price)}
                    </Typography>
                </Grid>
            </Grid>
        </Stack>
    )
}