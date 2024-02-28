import { PropsWithChildren, ReactNode } from "react";

import Box from '@mui/joy/Box';

import Header from "./Header";
import Sidebar, { SidebarProps } from "./Sidebar";

type LayoutWithSidebarProps = PropsWithChildren<{ sidebar: ReactNode; }> & SidebarProps

export default function LayoutWithSidebar(props: LayoutWithSidebarProps) {
    const { sidebar, children, width } = props
    return (

        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Header />
            <Sidebar width={width}>
                {sidebar}
            </Sidebar>
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
                {children}
            </Box>
        </Box>
    )
}