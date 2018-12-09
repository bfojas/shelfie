const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const controller = require("./controller.js")
const massive = require('massive');
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(database =>
    app.set('db',database)).catch(error =>console.log('massive fucked up', error))

app.post('/api/inventory', controller.addItem)
app.get('/api/inventory', controller.getInventory)
app.delete('/api/inventory/:id', controller.delete)
app.put('/api/inventory/:id', controller.editItem)



const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))