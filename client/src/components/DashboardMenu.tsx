import { Link } from 'react-router-dom';

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';

import CarIcon from '@mui/icons-material/CarRental';

export default function DashboardMenu() {
    return (
        <Box
            sx={{
                minHeight: 0,
                overflow: 'hidden auto',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                [`& .${listItemButtonClasses.root}`]: {
                    gap: 1.5,
                },
            }}
        >
            <List
                size="sm"
                sx={{
                    gap: 1,
                    '--List-nestedInsetStart': '30px',
                    '--ListItem-radius': (theme) => theme.vars.radius.sm,
                }}
            >
                <Link to='car'>
                    <ListItem>
                        <ListItemButton>
                            <CarIcon />
                            <ListItemContent>
                                <Typography level="title-sm">
                                    Veículos
                                </Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Box>
    )
}