import House from '../models/House'

export const reportDay = async (req, res) => {
    try {
        const { parametro } = req.params
        const desde = parseInt(parametro) * 24 * 60 * 60 * 1000
        const now = new Date()
        const now_utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours()-5, now.getUTCMinutes(), now.getUTCSeconds()))
        let dates = {
            first: new Date(),
            now: now_utc
        }
        dates.first = new Date(dates.now - desde)
        console.log(dates)
        let data_esp = {
            t: [],
            h: [],
            v: [],
            I: [],
            P: [],
            date: []
        }
        let data_rasp = {
            wind: [],
            angle: [],
            date: []
        }
        let horas = []
        const esp32 = await House.find({mac: '24:0A:C4:16:72:00', createdAt: { $gt: dates.first, $lt: dates.now } })
        for (let i = 0; i < esp32.length; i++) {
            data_esp.t[i] = parseFloat(esp32[i].values.t)
            data_esp.h[i] = parseFloat(esp32[i].values.h)
            data_esp.v[i] = parseFloat(esp32[i].values.v)
            data_esp.I[i] = parseFloat(esp32[i].values.I)
            data_esp.P[i] = parseFloat((data_esp.v[i] * data_esp.I[i]).toFixed(2))
            data_esp.date[i] = esp32[i].createdAt

        }
    
        const raspberry = await House.find({mac: 'raspberry', createdAt: { $gt: dates.first, $lt: dates.now } })
        for (let i = 0; i < raspberry.length; i++) {
            data_rasp.wind[i] = parseFloat(raspberry[i].values[15])
            data_rasp.angle[i] = parseFloat(raspberry[i].values[17])
            data_rasp.date[i] = raspberry[i].createdAt
        }
        // console.log(data_esp, data_rasp)
        res.status(200).json({
            data_esp: data_esp,
            data_rasp: data_rasp,
        })
    } catch (error) {
        console.error(error)
    }
}

export const initial = async (req, res) => {
    try {
        const now = new Date()
        const now_utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours()-5, now.getUTCMinutes(), now.getUTCSeconds()))
        const dates = {
            first: new Date(Date.UTC(now_utc.getUTCFullYear(), now_utc.getUTCMonth(), now_utc.getUTCDate(), 0, 0, 0)),
            now: now_utc
            // last: new Date(Date.UTC(now_utc.getUTCFullYear(), now_utc.getUTCMonth(), 2, 0, 0, 0))
        }
        let data_esp = {
            t: [],
            h: [],
            v: [],
            I: [],
            P: [],
            date: []
        }
        let data_rasp = {
            wind: [],
            angle: [],
            date: []
        }
        let horas = []
        const esp32 = await House.find({mac: '24:0A:C4:16:72:00', createdAt: { $gt: dates.first, $lt: dates.now } })
        for (let i = 0; i < esp32.length; i++) {
            data_esp.t[i] = parseFloat(esp32[i].values.t)
            data_esp.h[i] = parseFloat(esp32[i].values.h)
            data_esp.v[i] = parseFloat(esp32[i].values.v)
            data_esp.I[i] = parseFloat(esp32[i].values.I)
            data_esp.P[i] = parseFloat((data_esp.v[i] * data_esp.I[i]).toFixed(2))
            data_esp.date[i] = esp32[i].createdAt
        }
        horas = [esp32[0].createdAt, esp32[esp32.length - 1].createdAt]
    
        const raspberry = await House.find({mac: 'raspberry', createdAt: { $gt: dates.first, $lt: dates.now } })
        for (let i = 0; i < raspberry.length; i++) {
            data_rasp.wind[i] = parseFloat(raspberry[i].values[15])
            data_rasp.angle[i] = parseFloat(raspberry[i].values[17])
            data_rasp.date[i] = raspberry[i].createdAt
        }
        horas = [raspberry[0].createdAt, raspberry[raspberry.length - 1].createdAt]
        res.status(200).json({
            data_esp: data_esp,
            data_rasp: data_rasp
        })
    } catch (error) {
        console.error(error)
    }
}