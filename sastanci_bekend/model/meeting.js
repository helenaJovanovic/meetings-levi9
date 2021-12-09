const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    
    start_meeting: {type: Date, default:null},
    end_meeting: {type: Date, default: null},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

meetingSchema.index({ start_meeting: 1}, { unique: true });

module.exports = mongoose.model("meeting", meetingSchema);
