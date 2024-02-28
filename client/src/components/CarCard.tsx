import { Link } from "react-router-dom"

import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

import { formatKilometers, formatPrice } from '../utils';
import Image from './Image';

interface CarCardProps {
    image: string;
    model: string;
    brand: string;
    price: number;
    kilometers: number;
    id: string;
}

export default function CarCard(props: CarCardProps) {
    const { image, brand, kilometers, model, price, id } = props

    return (
        <Link to={`car/${id}`}>
            <Card sx={{ padding: 0 }}>
                <Image
                    src={image}
                    width={320}
                    height={320}
                    alt={`image of car ${brand} ${model}`}
                />
                <CardContent
                    orientation="vertical"
                    sx={{
                        gap: 1,
                        padding: 2
                    }}
                >
                    <Typography level="title-lg">
                        {`${brand} ${model}`}
                    </Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {formatPrice(price)}
                    </Typography>
                    <Typography level="body-xs">
                        {formatKilometers(kilometers)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    )
}