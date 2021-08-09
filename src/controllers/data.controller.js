import House from '../models/House'

export const getDataByDates = async (req, res) => {
    try {
        const dates = {
            first: new Date(req.body.dates.first),
            last: new Date(req.body.dates.last)
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
        const esp32 = await House.find({mac: '24:0A:C4:16:72:00', createdAt: { $gt: dates.first, $lt: dates.last } })
        for (let i = 0; i < esp32.length; i++) {
            data_esp.t[i] = parseFloat(esp32[i].values.t)
            data_esp.h[i] = parseFloat(esp32[i].values.h)
            data_esp.v[i] = parseFloat(esp32[i].values.v)
            data_esp.I[i] = parseFloat(esp32[i].values.I)
            data_esp.P[i] = parseFloat((data_esp.v[i] * data_esp.I[i]).toFixed(2))
            data_esp.date[i] = esp32[i].createdAt
        }
        const raspberry = await House.find({mac: 'raspberry', createdAt: { $gt: dates.first, $lt: dates.last } })
        for (let i = 0; i < raspberry.length; i++) {
            data_rasp.wind[i] = parseFloat(raspberry[i].values[15])
            data_rasp.angle[i] = parseFloat(raspberry[i].values[17])
            data_rasp.date[i] = raspberry[i].createdAt
        }
        // console.log(esp32, raspberry)
        res.status(200).json({
            data_esp,
            data_rasp
        })
    } catch (error) {
        console.error(error)
    }
}