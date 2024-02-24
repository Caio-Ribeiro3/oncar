const path = require('path')

const express = require("express")
const cors = require("cors");

const db = require('./db/client');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/v1/car', async (req, res) => {
    const cars = await db.car.findMany({
        take: 10,
        skip: 0,
        select: {
            id: true,
            color: true,
            model: {
                select: {
                    name: true,
                    brand: true
                }
            }
        }
    })

    res.json(cars)
})

app.post('/api/v1/car', async (req, res) => {
    const { brand, model, color } = req.body

    const hasBrand = await db.brand.findFirstOrThrow({ where: { name: brand }, include: { models: true } })
    console.log(hasBrand.models)

    const hasModel = await db.model.findFirstOrThrow({ where: { AND: [{ name: model }, { brandId: hasBrand.id }] } })

    const car = await db.car.create({
        data: {
            color,
            model: {
                connect: {
                    id: hasModel.id
                }
            }
        }
    })

    res.json(car)
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;