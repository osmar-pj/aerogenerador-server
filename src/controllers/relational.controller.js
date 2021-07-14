import User from '../models/User'
import Device from '../models/Device'

export const userToDevice = async (req, res) => {
    try {
        
        res.status(200).json({
            saved: true
        })
    } catch (error) {
        console.log(error)
    }
}