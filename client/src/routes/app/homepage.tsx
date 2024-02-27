import * as React from 'react';

import { Form, Link, LoaderFunctionArgs, useLoaderData, useSearchParams, useSubmit } from "react-router-dom"

import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import ListDivider from '@mui/joy/ListDivider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormLabel from '@mui/joy/FormLabel';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';

import { getBrands, getPaginatedCars } from "../../requests"
import Image from "../../components/Image";
import { debounce } from '../../utils';

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = url.searchParams.get('page')
    const limit = url.searchParams.get('limit')

    const [cars, brands] = await Promise.all([
        getPaginatedCars(page, limit, url.search),
        getBrands()
    ])

    return { cars, brands }
}

export async function action() {
    return {}
}

export default function HomepageRoute() {
    const { cars, brands } = useLoaderData() as Awaited<ReturnType<typeof loader>>
    const [searchParams] = useSearchParams();
    const [brand, setBrand] = React.useState<string>(brands.find(el => el.id === searchParams.get('brand'))?.id || '')
    const submit = React.useCallback(debounce(useSubmit(), 1000), []);

    const formRef = React.useRef<HTMLFormElement>()

    return (
        <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
            <Sheet
                className="Sidebar"
                sx={{
                    position: { xs: 'fixed', md: 'sticky' },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                        md: 'none',
                    },
                    transition: 'transform 0.4s, width 0.4s',
                    zIndex: 10,
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
                            '--Sidebar-width': '320px',
                            [theme.breakpoints.up('lg')]: {
                                '--Sidebar-width': '340px',
                            },
                        },
                    })}
                />
                <Box
                    className="Sidebar-overlay"
                    sx={{
                        position: 'fixed',
                        zIndex: 8,
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
                    onClick={() => {
                        // closeSidebar()
                    }}
                />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography level="title-lg">Oncar</Typography>
                </Box>
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
            </Sheet>
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
                    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                        {cars.data.map(car => (
                            <Grid
                                key={car.id}
                                xs={4}
                            >
                                <CarCard
                                    image={car.image}
                                    brand={car.model.brand.name}
                                    model={car.model.name}
                                    kilometers={car.kilometers}
                                    price={car.price}
                                    id={car.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

interface CarCardProps {
    image: string;
    model: string;
    brand: string;
    price: number;
    kilometers: number;
    id: string;
}

function CarCard(props: CarCardProps) {
    const { image, brand, kilometers, model, price, id } = props

    return (
        <Link to={`car/${id}`}>
            <Card sx={{ padding: 0 }}>
                <Image
                    src={image}
                    width={320}
                    height={320}
                    alt={`image of car ${brand} ${model}`}
                />
                <CardContent
                    orientation="vertical"
                    sx={{
                        gap: 1,
                        padding: 2
                    }}
                >
                    <Typography level="title-lg">
                        {`${brand} ${model}`}
                    </Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        R$ {price.toLocaleString()}
                    </Typography>
                    <Typography level="body-xs">
                        {kilometers.toLocaleString()} KMs
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}