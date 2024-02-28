import { useEffect, useRef } from 'react';

import { Form, useActionData } from 'react-router-dom';

import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

export default function SimulationForm() {
    const actionData = useActionData();
    const formRef = useRef<HTMLFormElement>()

    useEffect(() => {
        formRef.current?.reset()
    }, [actionData])

    return (
        <Card method='post' component={Form} ref={formRef}>
            <Typography level='h2'>
                Veja as parcelas desse veículo
            </Typography>
            <Typography>
                Tudo sem compromisso, vamos começar com alguns dados :)
            </Typography>
            <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="name">
                    Nome
                </FormLabel>
                <Input id="name" name='name' />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="email">
                    Email
                </FormLabel>
                <Input type='email' id="email" name='email' />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="phone">
                    Celular
                </FormLabel>
                <Input id="phone" name='phone' />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="cpf">
                    CPF
                </FormLabel>
                <Input id="cpf" name='cpf' />
            </FormControl>
            <CardActions>
                <Button type='submit'>
                    Simulação
                </Button>
            </CardActions>
        </Card>
    )
}