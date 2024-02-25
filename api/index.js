const path = require('path')

const express = require("express")
const cors = require("cors");

const db = require('./db/client');
const paginatedEntities = require('./lib/paginatedEntity');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/api/v1/car', async (req, res) => {
    const { page, limit } = req.query

    const cars = await paginatedEntities({
        ormEntity: db.car,
        args: {
            select: {
                id: true,
                color: true,
                image: true,
                price: true,
                kilometers: true,
                model: {
                    select: {
                        name: true,
                        brand: true
                    }
                }
            }
        },
        page: page ? parseInt(page, 10) : undefined,
        limit: limit ? parseInt(limit, 10) : undefined
    })

    res.json(cars)
})

app.post('/api/v1/car', async (req, res) => {
    const { brand, model, color, image, kilometers, price } = req.body

    const hasBrand = await db.brand.findFirstOrThrow({ where: { id: brand } })

    const hasModel = await db.model.findFirstOrThrow({ where: { AND: [{ id: model }, { brandId: hasBrand.id }] } })

    const car = await db.car.create({
        data: {
            color,
            image,
            kilometers,
            price,
            model: {
                connect: {
                    id: hasModel.id
                }
            }
        }
    })

    res.json(car)
})

app.delete('/api/v1/car', async (req, res) => {
    const { carId } = req.body

    const car = await db.car.findFirst({
        where: {
            id: carId
        },
        select: {
            model: true
        }
    })

    await db.model.update({
        where: {
            id: car.model.id
        },
        data: {
            cars: {
                delete: {
                    id: carId
                }
            }
        }
    })

    res.json({ deleted: true })
})

app.get('/api/v1/brand', async (req, res) => {
    const cars = await db.brand.findMany({
        select: {
            id: true,
            name: true,
            models: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    res.json(cars)
})

app.get('/app*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app