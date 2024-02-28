/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

import AddCarModal from '../../components/AddCarModal';
import { createCar, deleteCar, getBrands, getPaginatedCars } from '../../requests';
import TablePagination from '../../components/TablePagination';
import CarTable from '../../components/CarTable';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const action = formData.get('action')
    switch (action) {
        case 'delete':
            const id = formData.get('carId') as string
            return deleteCar({ id })
        case 'create':
            const brand = formData.get('brand') as string
            const model = formData.get('model') as string
            const color = formData.get('color') as string
            const kilometers = formData.get('kilometers') as string
            const image = formData.get('image') as string
            const price = formData.get('price') as string
            return createCar({
                brand,
                model,
                color,
                kilometers: parseInt(kilometers, 10),
                image,
                price: parseInt(price, 10)
            })
        default:
            throw new Error('invalid action')
    }
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const limit = url.searchParams.get('limit')
    const [cars, brands] = await Promise.all([
        getPaginatedCars(page, limit),
        getBrands(),
    ])
    return {
        cars,
        brands
    }
}

export default function CarRoute() {
    const [openCreationModal, setOpenCreationModal] = useState(false);

    function getPagination(loaderData: Awaited<ReturnType<typeof loader>>) {
        return loaderData.cars
    }

    return (
        <>
            {openCreationModal && <AddCarModal setOpen={setOpenCreationModal} />}
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <Button
                    onClick={() => {
                        setOpenCreationModal(true)
                    }}
                >
                    Adicionar
                </Button>
            </Box>
            <CarTable />
            <TablePagination getPagination={getPagination} />
        </>
    );
}

export const heading = {
    match: '/dashboard/car',
    name: 'Veículos'
}