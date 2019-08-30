const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const config = require("./config/general");
const cors = require('cors');
const roomsRoute = require('./routes/roomsRoute');
const mqtt = require('mqtt');
const roomController = require('./controllers/roomController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
  
app.get('/', (req, res) => {
    return res.send("opa")
})

app.use('/rooms', roomsRoute);

const options = {
    port: 17831,
    host: 'mqtt://farmer.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'gsjiffrr',
    password: 'nyyGhWthNz-M',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};

const client = mqtt.connect('mqtt://farmer.cloudmqtt.com' , options)

client.on('connect', function() { // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('Test/#', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            roomController.create(JSON.parse(message.toString()))
        });
    });
});

mongoose.connect(config.db.URL, {useNewUrlParser: true, useCreateIndex: true}).then( ok => console.log("Conexao com o banco de dados realizada com sucesso!"))

app.listen(process.env.PORT || config.api.PORT, function(err){
    if(err) return;
    console.log("Api iniciada na porta",config.api.PORT)
});