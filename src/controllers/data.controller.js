import House from '../models/House'

export const getDataByDates = async (req, res) => {
    try {
        const dates = {
            first: new Date(req.body.dates.first),
            last: new Date(req.body.dates.last)
        }
        const esp32 = await House.find({mac: '24:0A:C4:16:72:00', createdAt: { $gt: dates.first, $lt: dates.last } })
    
        const raspberry = await House.find({mac: 'raspberry', createdAt: { $gt: dates.first, $lt: dates.last } })

        // console.log(esp32, raspberry)
        res.status(200).json({
            esp32: esp32,
            raspberry: raspberry,
        })
    } catch (error) {
        console.error(error)
    }
}