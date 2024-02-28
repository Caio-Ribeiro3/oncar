import { PropsWithChildren } from 'react';

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import { closeSidebar } from '../utils';
import { SIDEBAR_Z_INDEX } from '../constants';

export type SidebarProps = PropsWithChildren<{ width?: number; }>

export default function Sidebar(props: SidebarProps) {
    const { children, width = 220 } = props
    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: SIDEBAR_Z_INDEX,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': `${width}px`,
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': `${width + 20}px`,
                        },
                    },
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: SIDEBAR_Z_INDEX - 2,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-lg">Oncar</Typography>
            </Box>
            {children}
        </Sheet>
    );
}