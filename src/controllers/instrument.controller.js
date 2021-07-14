import Instrument from '../models/Instrument'

export const createInstrument = async (req, res) => {
    try {
        console.log(req.body)
        const new_instrument = new Instrument(req.body)
        await new_instrument.save()

        res.status(200).json({
            saved: true
        })
    } catch (error) {
        console.error(error)
    }
}