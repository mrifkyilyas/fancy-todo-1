const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please input project name']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project