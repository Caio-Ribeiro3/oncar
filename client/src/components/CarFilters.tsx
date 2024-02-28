import * as React from 'react';

import { Form, useLoaderData, useSearchParams, useSubmit } from "react-router-dom"

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ListDivider from '@mui/joy/ListDivider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';

import { loader } from '../routes/app/homepage';
import { debounce } from '../utils';

export default function CarFilters() {
    const { brands } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [searchParams] = useSearchParams();
    const [brand, setBrand] = React.useState<string>(brands.find(el => el.id === searchParams.get('brand'))?.id || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const submit = React.useCallback(debounce(useSubmit(), 1000), []);

    const formRef = React.useRef<HTMLFormElement>()

    return (
        <Box
            ref={formRef}
            component={Form}
            onChange={(event) => {
                submit(event.currentTarget);
            }}
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
                <ListItem>
                    <Stack
                        spacing={1}
                        sx={{ width: '100%' }}
                    >
                        <FormControl>
                            <FormLabel id="select-field-brand-label" htmlFor="select-field-brand-button">
                                Marca
                            </FormLabel>
                            <Select
                                name='brand'
                                onChange={(_, newValue) => {
                                    setBrand(newValue as unknown as string)
                                    formRef.current?.submit()
                                }}
                                defaultValue={brand}
                                slotProps={{
                                    button: {
                                        id: 'select-field-brand-button',
                                        'aria-labelledby': 'select-field-brand-label select-field-brand-button',
                                    },
                                }}
                            >
                                <Option value={''}>Selecione</Option>
                                {brands.map(el => (
                                    <Option key={el.id} value={el.id}>{el.name}</Option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel id="select-field-model-label" htmlFor="select-field-model-button">
                                Modelo
                            </FormLabel>
                            <Select
                                name='model'
                                disabled={!brand}
                                onChange={() => {
                                    formRef.current?.submit()
                                }}
                                defaultValue={brands.find(el => el.id === searchParams.get('brand'))?.models.find(el => el.id === searchParams.get('model'))?.id}
                                slotProps={{
                                    button: {
                                        id: 'select-field-model-button',
                                        'aria-labelledby': 'select-field-model-label select-field-model-button',
                                    },
                                }}
                            >
                                <Option value={''}>Selecione</Option>
                                {brands.find(el => el.id === brand)?.models.map(el => (
                                    <Option key={el.id} value={el.id}>{el.name}</Option>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </ListItem>
                <ListDivider inset="gutter" />
                <ListItem>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom fontWeight={600}>
                            Preço
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={6}>
                                <FormControl>
                                    <FormLabel htmlFor="price-from">
                                        De
                                    </FormLabel>
                                    <Input id='price-from' name='price-from' type='number' />
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormControl>
                                    <FormLabel htmlFor="price-to">
                                        Até
                                    </FormLabel>
                                    <Input id='price-to' name='price-to' type='number' />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </ListItem>
                <ListDivider inset="gutter" />
                <ListItem>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom fontWeight={600}>
                            Quilometragem
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={6}>
                                <FormControl>
                                    <FormLabel htmlFor="kilometer-from">
                                        De
                                    </FormLabel>
                                    <Input id="kilometer-from" name="kilometer-from" type='number' />
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormControl>
                                    <FormLabel htmlFor="kilometer-to">
                                        Até
                                    </FormLabel>
                                    <Input id="kilometer-to" name="kilometer-to" type='number' />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </ListItem>
                <ListDivider inset="gutter" />
                <ListItem>
                    <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel htmlFor="color">
                            Cor
                        </FormLabel>
                        <Input id="color" name='color' />
                    </FormControl>
                </ListItem>
            </List>
        </Box>
    )
}