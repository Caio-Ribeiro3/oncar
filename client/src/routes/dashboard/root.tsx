import { Outlet, useLocation } from "react-router-dom";

import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import DashboardMenu from "../../components/DashboardMenu";

import { heading as carHeading } from "./car";
import LayoutWithSidebar from "../../components/LayoutWithSidebar";

export function loader() {
    return {}
}

export default function DashboardRootRoute() {
    const { pathname } = useLocation();

    const pageName = [carHeading].find(el => el.match === pathname)?.name

    return (
        <LayoutWithSidebar
            sidebar={(
                <DashboardMenu />
            )}
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
        </LayoutWithSidebar>
    );
}