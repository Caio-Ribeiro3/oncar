import * as React from 'react';

import { Form, useLoaderData } from 'react-router-dom';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

import InfoOutlined from '@mui/icons-material/InfoOutlined';

import { loader } from '../routes/car'

interface AddCarModalProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCarModal(props: AddCarModalProps) {
    const { setOpen } = props

    const { brands } = useLoaderData() as Awaited<ReturnType<typeof loader>>

    const [brand, setBrand] = React.useState<string>()

    return (
        <Modal
            open
            onClose={() => {
                setOpen(false)
            }}>
            <ModalDialog>
                <ModalClose />
                <Card
                    component={Form}
                    method="post"
                    sx={{ width: 320, border: 'none' }}
                    onSubmit={() => {
                        setOpen(false)
                    }}
                >
                    <input type='hidden' name='action' value='create' />
                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-brand-label" htmlFor="select-field-brand-button">
                            Marca
                        </FormLabel>
                        <Select
                            name='brand'
                            onChange={(_, newValue) => {
                                setBrand(newValue as unknown as string)
                            }}
                            slotProps={{
                                button: {
                                    id: 'select-field-brand-button',
                                    'aria-labelledby': 'select-field-brand-label select-field-brand-button',
                                },
                            }}
                        >
                            {brands.map(el => (
                                <Option key={el.id} value={el.id}>{el.name}</Option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                            Modelo
                        </FormLabel>
                        <Select
                            name='model'
                            disabled={!brand}
                        >
                            {brands.find(el => el.id === brand)?.models.map(el => (
                                <Option key={el.id} value={el.id}>{el.name}</Option>
                            ))}
                        </Select>
                        {!brand && (
                            <FormHelperText>
                                <InfoOutlined />
                                Escolha uma marca antes
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                            Cor
                        </FormLabel>
                        <Input name='color' />
                    </FormControl>

                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                            Preço
                        </FormLabel>
                        <Input type='number' name='price' />
                    </FormControl>
                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                            Quilometragem
                        </FormLabel>
                        <Input type='number' name='kilometers' />
                    </FormControl>

                    <FormControl
                        required
                    >
                        <FormLabel id="select-field-demo-label" htmlFor="select-field-demo-button">
                            Imagem
                        </FormLabel>
                        <Input name='image' />
                    </FormControl>
                    <CardContent orientation="horizontal">
                        <Button
                            sx={{ flex: 1 }}
                            type="submit"
                        >
                            Confirmar
                        </Button>
                    </CardContent>
                </Card>
            </ModalDialog>
        </Modal>
    )
}