const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title:{
        type:String,
        required:[true,'judul tidak boleh kosong']
    },
    description:String,
    status:String,
    duedate:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
})

const Task = mongoose.model('Task',TaskSchema)
module.exports = Task