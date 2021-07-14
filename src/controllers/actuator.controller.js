import Actuator from '../models/Actuator'

export const createDevice = async (req, res) => {
    try {
        const new_actuator = new Sensor(req.body)
        // await new_actuator.save()

        res.status(200).json({
            saved: true
        })
    } catch (error) {
        console.error(error)
    }
}