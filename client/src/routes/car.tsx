/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import { useLoaderData, ActionFunctionArgs, useSubmit } from 'react-router-dom';

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


import { fetcher } from '../facade/fetcher';

import Image from '../components/Image';
import AddCarModal from '../components/AddCarModal';

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
                                encType: "application/x-www-form-urlencoded",
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
            return fetcher.delete<{}>('/car', {
                carId
            })
        case 'create':
            const brand = formData.get('brand')
            const model = formData.get('model')
            const color = formData.get('color')
            return fetcher.post<{}>('/car', {
                brand,
                model,
                color
            })
        default:
            throw new Error('invalid action')
    }
}

export async function loader() {
    const [cars, brands] = await Promise.all([
        fetcher.get<{
            id: string;
            color: string;
            model: {
                name: string;
                brand: {
                    id: string;
                    name: string;
                }
            }
        }[]>('/car'),
        fetcher.get<{
            id: string;
            name: string;
            models: {
                id: string;
                name: string;
            }[]
        }[]>('/brand'),
    ])
    return {
        cars,
        brands
    }
}

export default function CarRoute() {
    const { cars } = useLoaderData() as Awaited<ReturnType<typeof loader>>
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
                            <th style={{ width: 84, padding: '12px 6px' }} />
                            <th style={{ width: 120, padding: '12px 6px' }}>
                                Modelo
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>
                                Marca
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }}>
                                Cor
                            </th>
                            <th style={{ width: 140, padding: '12px 6px' }} />
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((row) => (
                            <tr key={row.id}>
                                <td style={{ width: 84, padding: '12px 6px' }}>
                                    <Image alt='' height={60} width={60} src='' style={{ borderRadius: 8 }} />
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
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={Number(page) ? 'outlined' : 'plain'}
                        color="neutral"
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />

                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}
