import { useLoaderData, useSubmit } from 'react-router-dom';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import Table from './Table';
import Image from './Image';
import { Car, PaginatedEntity } from '../types';


export default function CarTable() {
    const { cars } = useLoaderData() as { cars: PaginatedEntity<Car> }
    const { data } = cars

    let submit = useSubmit();

    return (
        <Table>
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
                                                    { action: "delete", carId: row.id },
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
                            </Box>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}