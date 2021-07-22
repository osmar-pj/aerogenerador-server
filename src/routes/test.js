
const mqtt = require('mqtt')
const options ={
        clientId: 'RASPBERRY',
        username:'Raspberry',
        pasword: ''
}

const connectUrl = 'ws://143.198.128.180.8083/mqtt'
const client = mqtt.connect(connectUrl,options)

const sp = require('serialport')
const port = new sp('/dev/ttyUSB0', {baudRate: 19200})

setInterval(()=>{
        let send ={}
        port.write("LOOP 1\r")
        port.on('data',data =>{
        let datos =JSON.stringify(data)
        let info = JSON.parse(datos)
        let wind = info.data[14]*0.447
        let direccion1 = info.data[16]
        let direccion2 = info.data[17]
        let temperature = (info.data[12]-32)*0.5556
        send={
                esp: 'raspberry',
                values:{
                        wind: wind.toFixed(2),
                        direccion1: direccion1,
                        direccion2:direccion2,
                        temp_station: temperature.toFixed(2)
                }
        }
        console.log(send)
        client.publish('unsaac/aerogenerador/raspberry',JSON.stringify(send))
        client.end()
    })
}, 10000)
