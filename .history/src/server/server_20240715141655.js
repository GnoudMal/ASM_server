const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const uri = 'mongodb+srv://chaolaolo:chaolaolo@cluster0.ng1qeww.mongodb.net/ASSIGNMENT'

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
let productModel = require('../model/productModel');

const apiMobile = require('../api');
app.use('./api',apiMobile)


app.get('/', async (req, res) => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect success')

        let product  = await productModel.find();

        console.log(product);

        res.send(product);

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
module.exports = app;