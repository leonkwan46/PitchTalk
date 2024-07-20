import mongoose from 'mongoose'

const documentSchema = new mongoose.Schema({
    DBSCert: {
        type: Object,
        required: true,
    },
    ProofOfId: {
        type: Object,
        required: true,
    },
    ProfessionalCert: {
        type: Object,
        required: true,
    },
})

export default mongoose.model("Document", documentSchema)