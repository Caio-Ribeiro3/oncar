import { useLoaderData, Link, useNavigate } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { PaginatedEntity } from '../types';


type TablePaginationProps<ReturnOfUseLoaderData, EntityType> = {
    getPagination(payload: ReturnOfUseLoaderData): PaginatedEntity<EntityType>
}

export default function TablePagination<ReturnOfUseLoaderData, EntityType>(props: TablePaginationProps<ReturnOfUseLoaderData, EntityType>) {
    const { getPagination } = props

    const loaderData = useLoaderData() as Awaited<ReturnOfUseLoaderData>

    const paginationState = getPagination(loaderData)

    const { count, page, limit } = paginationState

    const navigate = useNavigate();

    return (
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
    )
}
