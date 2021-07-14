import Device from '../models/Device'

export const createDevice = async (req, res) => {
    try {
        const new_device = new Device(req.body)
        await new_device.save()

        res.status(200).json({
            saved: true
        })
    } catch (error) {
        console.error(error)
    }
}

export const getDevices = async (req, res) => {
    try {
        const devices = await Device.find().sort({_id: 1})
        res.status(200).json({
            devices: devices
        })
    } catch (error) {
        console.log(error)
    }
}

export const searchDevice = async (req, res) => {
    try {
        console.log(req.params)
        const name = req.params.name
        const devices = await Device.find()
        const nameFiltered = devices.filter(device => {
            return device.esp
                .toString()
                .toLowerCase()
                .indexOf(name.toLowerCase()) >= 0
        })
        res.status(200).json({
            nameFiltered
        })
    } catch (error) {
        console.log(error)
    }
}