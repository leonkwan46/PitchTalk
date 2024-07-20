import { Parent, Student, Teacher } from "../db/modals/index.js"

const userDataHelper = {}

// Fetch parent user data
userDataHelper.fetchParentUserData = async (user) => {
    return {
        isInvited: user.isInvited,
        isInvitationVerified: user.isInvitationVerified,
    }
}

// Fetch teacher user data
userDataHelper.fetchTeacherUserData = async (user) => {
    return {
        isDocUploaded: user.isDocUploaded,
        isDocVerified: user.isDocVerified,
    }
}

// Fetch student user data
userDataHelper.fetchStudentUserData = async (user) => {
    return {
        instrument: user.instruments,
    }
}

// Fetch user data by role and return ID
userDataHelper.fetchUserDataByIDAndRole = async (id, role) => {
    let userData
    switch (role) {
        case 'teacher':
            userData = await fetchTeacher(id)
            break
        case 'parent':
            userData = await fetchParent(id)
            break
        case 'student':
            userData = await fetchStudent(id)
            break
        default:
            break
    }
    return userData
}

// Fetch parent data
const fetchParent = async (parentId) => {
    const parent = await Parent.findById(parentId)
    return parent ? { ...parent.toObject() } : null
}

// Fetch teacher data
const fetchTeacher = async (teacherId) => {
    const teacher = await Teacher.findById(teacherId)
    return teacher ? { ...teacher.toObject() } : null
}

// Fetch student data
const fetchStudent = async (studentId) => {
    const student = await Student.findById(studentId)
    return student ? { ...student.toObject() } : null
}

export default userDataHelper