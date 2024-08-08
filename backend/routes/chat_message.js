import express from 'express'
import { Room } from '../db/modals/index.js'
import authHandler from '../handlers/authHandler.js'
import chatHelper from '../helpers/chatHelper.js'

const router = express.Router()

router.post('/create_chat_room', authHandler, async (req, res, next) => {
    const { role, _id } = req.user
    const memberData = await chatHelper.generateRoomMemberData(_id, role, req.body)

    // Define members and sort them to ensure consistency in comparison
    const members = [
        memberData.teacher,
        memberData.student,
        memberData.parent
    ].sort((a, b) => a._id.toString().localeCompare(b._id.toString()))

    try {
        // Check if a room with the same members already exists
        const existingRoom = await Room.findOne({
            members: { $all: members }
        })

        if (existingRoom) return res.status(400).json({ message: 'Room already exists' })

        // Create and save the new room if no duplicate is found
        const newRoom = new Room({
            name: `${memberData.student.name}'s Music Room`,
            members
        })
        await newRoom.save()
        return res.status(200).json(newRoom)
    } catch (err) {
        next(err)
    }
})

router.get('/get_rooms', authHandler, async (req, res, next) => {
    const { _id } = req.user
    try {
        const rooms = await Room.find({ members: _id })
            .populate('members', 'name email') 

        console.log(rooms)
        return res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
})


export default router