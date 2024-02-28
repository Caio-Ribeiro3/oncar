import { PropsWithChildren } from "react"

import JoyTable from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

type TableProps = PropsWithChildren

export default function Table(props: TableProps) {
    const { children } = props
    return (
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
            <JoyTable
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
                {children}
            </JoyTable>
        </Sheet>
    )
}