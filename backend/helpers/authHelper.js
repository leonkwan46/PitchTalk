import { Parent, Reviewer, Student, Teacher, User } from '../db/modals/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userDataHelper from './userDataHelper.js'

const authHelper = {}

authHelper.validateUserByEmail = async (email, isLogin=false) => {
    let user = await User.findOne({ email })

    if (isLogin) {
        if (!user) throw new Error('Invalid Username/Password')
        if (!user.isRegistered) throw new Error('User not registered')
    } else {
        if (user) throw new Error('User already exists')
    }
    return user
}

authHelper.validatePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword)
    if (!isMatch) throw new Error('Invalid Username/Password')
    return isMatch
}

authHelper.returnUserDataToClient = async (user = '', isValid = false) => {
    if (!isValid) user = await authHelper.validateUserByEmail(user.email, true)
    if (!user) throw new Error('User not found')

    const defaultUserData = {
        userId: user._id,
        email: user.email,
        role: user.role,
        isRegistered: user.isRegistered,
        isGeneralFormComplete: user.isGeneralFormComplete,
    }

    let additionalUserData = {}
    switch (user.role) {
        case 'parent':
            additionalUserData = await userDataHelper.fetchParentUserData(user)
            break
        case 'teacher':
            additionalUserData = await userDataHelper.fetchTeacherUserData(user)
            break
        case 'student':
            additionalUserData = await userDataHelper.fetchStudentUserData(user)
            break
        case 'reviewer':
            additionalUserData = await userDataHelper.fetchReviewerUserData(user)
            break
        default:
            break
    }

    return { ...defaultUserData, ...additionalUserData }
}

authHelper.generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

authHelper.generateAuthToken = async (user) => {
    const tokenPayload = {
        _id: user._id,
        email: user.email,
        hashPassword: user.hashPassword,
        role: user.role,
        gender: user.gender,
        name: user.name,
        isRegistered: user.isRegistered,
        isInvited: user.isInvited,
        invitationCode: user.invitationCode,
        isInvitationVerified: user.isInvitationVerified,
        isDocUploaded: user.isDocUploaded,
        isDocVerified: user.isDocVerified,
        isGeneralFormComplete: user.isGeneralFormComplete,
        createAt: user.createAt,
    }
    return await jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1d' })
}

authHelper.createAccount = async (email, password, role) => {
    let user = await authHelper.validateUserByEmail(email)
    const hashPassword = await authHelper.generateHashPassword(password)
    // Create User
    switch (role) {
        case 'parent':
            user = new Parent({
                email,
                hashPassword,
                role,
                isRegistered: true
            })
            break
        case 'teacher':
            user = new Teacher({
                email,
                hashPassword,
                role,
                isRegistered: true
            })
            break
        case 'student':
            user = new Student({
                email,
                hashPassword,
                role,
                isRegistered: true
            })
            break
        case 'reviewer':
            user = new Reviewer({
                email,
                hashPassword,
                role,
                isRegistered: true
            })
            break
        default:
            throw new Error('Invalid role')
    }
    // Store User
    const storingUser = await user.save()
    if (!storingUser) throw new Error('Failed to store user')

    // Find User
    user = await User.findOne({ email })
    // Generate Token
    const token = await authHelper.generateAuthToken(user)

    return { user, token }
}

export default authHelper