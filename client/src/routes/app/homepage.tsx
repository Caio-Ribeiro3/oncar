import { LoaderFunctionArgs } from "react-router-dom"

import Box from '@mui/joy/Box';

import { getBrands, getPaginatedCars } from "../../requests"
import CarGrid from '../../components/CarGrid';
import CarFilters from '../../components/CarFilters';
import { SIDEBAR_Z_INDEX } from "../../constants";
import LayoutWithSidebar from "../../components/LayoutWithSidebar";

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const limit = url.searchParams.get('limit')

    const [cars, brands] = await Promise.all([
        getPaginatedCars(page, limit, url.search),
        getBrands()
    ])

    return { cars, brands }
}

export async function action() {
    return {}
}

export default function HomepageRoute() {
    return (
        <LayoutWithSidebar
            width={320}
            sidebar={(
                <Box sx={{ zIndex: SIDEBAR_Z_INDEX + 1 }}>
                    <CarFilters />
                </Box>
            )}
        >
            <Box
                sx={{
                    display: 'flex',
                    mb: 1,
                    gap: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'start', sm: 'center' },
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}
            >
                <CarGrid />
            </Box>
        </LayoutWithSidebar>
    )
}