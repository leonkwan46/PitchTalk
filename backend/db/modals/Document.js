import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
    DBSCert: {
        type: Object,
        default: null,
        required: true,
    },
    ProofOfId: {
        type: Object,
        default: null,
        required: true,
    },
    ProfessionalCert: {
        type: Object,
        default: null,
        required: true,
    },
})

export default mongoose.model("Document", documentSchema)