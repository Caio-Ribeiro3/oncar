/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import { useLoaderData, ActionFunctionArgs, useSubmit, Link, useNavigate, LoaderFunctionArgs } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';


import { fetcher } from '../../facade/fetcher';

import Image from '../../components/Image';
import AddCarModal from '../../components/AddCarModal';
import { getBrands, getPaginatedCars } from '../../requests';

interface RowMenuProps {
    carId: string;
}

function RowMenu({ carId }: RowMenuProps) {
    let submit = useSubmit();
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
            >
                <MoreHorizRoundedIcon />
            </MenuButton>
            <Menu size="sm" sx={{ minWidth: 140 }}>
                <MenuItem
                    onClick={() => {
                        submit(
                            { action: "delete", carId },
                            {
                                method: "post",
                            }
                        );
                    }}
                    sx={{ width: '100%' }}
                    type="submit"
                    component='button'
                    color="danger"
                >
                    Delete
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const action = formData.get('action')
    switch (action) {
        case 'delete':
            const carId = formData.get('carId')
            return fetcher.delete('/car', {
                data: {
                    carId
                }
            })
        case 'create':
            const brand = formData.get('brand')
            const model = formData.get('model')
            const color = formData.get('color')
            const kilometers = formData.get('kilometers') as string
            const image = formData.get('image')
            const price = formData.get('price') as string
            return fetcher.post('/car', {
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
    const { cars } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const { count, data, page, limit } = cars
    const navigate = useNavigate();

    const [openCreationModal, setOpenCreationModal] = React.useState(false);

    const renderFilters = () => (
        <Button
            onClick={() => {
                setOpenCreationModal(true)
            }}
        >
            Adicionar
        </Button>
    );

    return (
        <React.Fragment>
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
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: 'initial',
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 144, padding: '12px 6px' }} />
                            <th>
                                Modelo
                            </th>
                            <th >
                                Marca
                            </th>
                            <th >
                                Cor
                            </th>
                            <th >
                                Preço
                            </th>
                            <th >
                                Quilometragem
                            </th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td style={{ width: 144, padding: '12px 6px' }}>
                                    <Image
                                        alt={`${row.model.name} image`}
                                        height={120}
                                        width={120}
                                        src={row.image}
                                        style={{ borderRadius: 8 }}
                                    />
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.model.name}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.model.brand.name}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.color}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">R$ {row.price.toLocaleString()}</Typography>
                                </td>
                                <td>
                                    <Typography level="body-xs">{row.kilometers.toLocaleString()} KMs</Typography>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <RowMenu carId={row.id} />
                                    </Box>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                    disabled={page - 1 < 1}
                    onClick={() => {
                        navigate(`?limit=${limit}&page=${page - 1}`)
                    }}
                >
                    Anterior
                </Button>
                <Box sx={{ flex: 1 }} />
                {new Array(Math.ceil(count / limit)).fill(1).map((_, index) => index + 1)
                    .map((page) => (
                        <Link
                            key={page}
                            to={`?limit=${limit}&page=${page}`}
                        >
                            <IconButton
                                size="sm"
                                variant={Number(page) ? 'outlined' : 'plain'}
                                color="neutral"
                            >
                                {page}
                            </IconButton>
                        </Link>
                    ))}
                <Box sx={{ flex: 1 }} />

                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                    disabled={page >= Math.ceil(count / limit)}
                    onClick={() => {
                        navigate(`?limit=${limit}&page=${page + 1}`)
                    }}
                >
                    Próximo
                </Button>
            </Box>
        </React.Fragment>
    );
}

export const heading = {
    match: '/dashboard/car',
    name: 'Veículos'
}