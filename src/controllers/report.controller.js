import House from '../models/House'

export const reportDay = async (req, res) => {
    try {
        const { parametro } = req.params
        const now = new Date()
        const now_utc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours()-5, now.getUTCMinutes(), now.getUTCSeconds()))
        const dates = {
            first: new Date(Date.UTC(now_utc.getUTCFullYear(), now_utc.getUTCMonth(), now_utc.getUTCDate() - 1, 0, 0, 0)),
            now: now_utc
            // last: new Date(Date.UTC(now_utc.getUTCFullYear(), now_utc.getUTCMonth(), 2, 0, 0, 0))
        }
        let data = {}
        let data_esp = {
            t: [],
            h: [],
            v: [],
            I: [],
            P: [] 
        }
        let data_rasp = {
            wind: [],
            angle: []
        }
        let horas = []
        if (parametro == 'temperature' || parametro == 'humidity' || parametro == 'voltage' || parametro == 'current' || parametro == 'power') {
            const parameters = await House.find({mac: '24:0A:C4:16:72:00', createdAt: { $gt: dates.first, $lt: dates.now } })
            for (let i = 0; i < parameters.length; i++) {
                data_esp.t[i] = parseFloat(parameters[i].values.t)
                data_esp.h[i] = parseFloat(parameters[i].values.h)
                data_esp.v[i] = parseFloat(parameters[i].values.v)
                data_esp.I[i] = parseFloat(parameters[i].values.I)
                data_esp.P[i] = parseFloat((data_esp.v[i] * data_esp.I[i]).toFixed(2))
            }
            data = data_esp
            horas = [parameters[0].createdAt, parameters[parameters.length - 1].createdAt]
        } else if (parametro == 'wind' || parametro == 'angle') {
            const parameters = await House.find({mac: 'raspberry', createdAt: { $gt: dates.first, $lt: dates.now } })
            for (let i = 0; i < parameters.length; i++) {
                data_rasp.wind[i] = parseFloat(parameters[i].values[15])
                data_rasp.angle[i] = parseFloat(parameters[i].values[17])
            }
            horas = [parameters[0].createdAt, parameters[parameters.length - 1].createdAt]
            data = data_rasp
        }
        res.status(200).json({
            data: data,
            horas: horas
        })
    } catch (error) {
        console.error(error)
    }
}