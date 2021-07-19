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
        console.log(dates, dates.now.getUTCHours())
        const parameters = await House.find({ createdAt: { $gt: dates.first, $lt: dates.now } })
        const t = []
        const h = []
        const v = []
        const I = []
        for (let i = 0; i < parameters.length; i++) {
            t[i] = parseFloat(parameters[i].values.t)
            h[i] = parseFloat(parameters[i].values.h)
            v[i] = parseFloat(parameters[i].values.v)
            I[i] = parseFloat(parameters[i].values.I)
        }
        let data = []
        let horas = dates.now.getUTCHours()
        if (parametro == 'temperature') {
            data = t
        } else if (parametro == 'humidity') {
            data = h
        } else if (parametro == 'voltage') {
            data = v
        } else if (parametro == 'current') {
            data = I
        }
        res.status(200).json({
            data: data,
            horas: horas
        })
    } catch (error) {
        console.error(error)
    }
}