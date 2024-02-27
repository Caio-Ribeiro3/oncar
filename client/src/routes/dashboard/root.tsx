import { Outlet, useLocation } from "react-router-dom";

import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

import { heading as carHeading } from "./car";

export function loader() {
    return {}
}

export default function DashboardRootRoute() {
    const { pathname } = useLocation();

    const pageName = [carHeading].find(el => el.match === pathname)?.name

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Sidebar />
            <Box
                component="main"
                className="MainContent"
                sx={{
                    px: { xs: 2, md: 6 },
                    pt: {
                        xs: 'calc(12px + var(--Header-height))',
                        sm: 'calc(12px + var(--Header-height))',
                        md: 3,
                    },
                    pb: { xs: 2, sm: 2, md: 3 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100dvh',
                    gap: 1,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Typography
                            color="neutral"
                            fontSize={12}
                            fontWeight={500}
                        >
                            Dashboard
                        </Typography>
                        <Typography color="primary" fontWeight={500} fontSize={12}>
                            {pageName}
                        </Typography>
                    </Breadcrumbs>
                </Box>
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
                    <Typography level="h2" component="h1">
                        {pageName}
                    </Typography>
                </Box>
                <Outlet />
            </Box>
        </Box>
    );
}