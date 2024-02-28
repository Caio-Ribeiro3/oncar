import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useActionData } from 'react-router-dom';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function SimulationDialog() {

    const actionData = useActionData();

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(!!actionData)
    }, [actionData])

    return (

        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                    minWidth: 300
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    Sua simulação
                </Typography>
                <Typography
                    textColor="inherit"
                    mb={1}
                >
                    Pontuação{' '}
                    <Typography
                        textColor="inherit"
                        fontWeight="lg"
                    >
                        {actionData?.score}
                    </Typography>
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                    {actionData?.score < 300 ? 'Reprovado' :
                        actionData?.score < 600 ? '70% de entrada, 30% do comprometimento da renda' :
                            actionData?.score < 800 ? '50% de entrada, 25% do comprometimento da renda' :
                                actionData?.score < 951 ? '30% de entrada, 20% do comprometimento da renda' :
                                    '100% de financiamento, taxa zero.'
                    }
                </Typography>
            </Sheet>
        </Modal>
    )
}