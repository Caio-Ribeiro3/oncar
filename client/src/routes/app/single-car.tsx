import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';

import { createSimulation, getCarById } from '../../requests';
import SimulationForm from '../../components/SimulationForm';
import SimulationDialog from '../../components/SimulationDialog';
import CarResume from '../../components/CarResume';

export async function loader({ params }: LoaderFunctionArgs) {
    return await getCarById({ carId: params.carId! })
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData()

    const name = formData.get('name') as string
    const cpf = formData.get('cpf') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string

    return createSimulation({
        carId: params.carId!,
        name,
        cpf,
        email,
        phone,
    })
}

export default function SingleCarRoute() {
    return (
        <>
            <SimulationDialog />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Grid
                    container
                    spacing={4}
                    sx={{
                        flexGrow: 1,
                        maxWidth: 'lg',
                        margin: '0 auto',
                        pb: { xs: 2, sm: 2, md: 3 },
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                    }}>
                    <Grid xs={8}>
                        <CarResume />
                    </Grid>
                    <Grid xs={4}>
                        <SimulationForm />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}