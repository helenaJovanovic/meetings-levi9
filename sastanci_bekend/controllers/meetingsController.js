const express = require("express");
const Meeting = require('../model/meeting');
const User = require('../model/user');


exports.addmeeting = async (req, res) => {
    try {
        let { name, description, start_meeting, end_meeting, user_ids } = req.body;

        if (!(name && description && start_meeting && end_meeting && user_ids)) {
            return res.status(400).send("All fields are required");
        }

        try {
            start_meeting = new Date(start_meeting);
            end_meeting = new Date(end_meeting);
        }
        catch (err) {
            return res.status(400).send("Invalid date format");
        }

        user_ids.forEach(id => {
            const userIdExists = User.findOne({ _id: id });
            
            if (!userIdExists) {
                return res.status(404).send("User id from request doesn't exist");
            }
        });

        const meetingExists = await Meeting.findOne({ start_meeting: start_meeting });

        if (meetingExists) {
            return res.status(400).send("Meeting in that hour already exists");
        }

        const reservation = await Meeting.create({
            name: name,
            description: description,
            start_meeting: start_meeting,
            end_meeting: end_meeting,
            user_ids: user_ids
        }).catch((error) => {
            res.status(500).send(error);
        });

        return res.status(201).json(reservation);

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

// DELETE request on url/reservations/removeMeeting/:id
// returns deleted object
exports.removemeeting = async (req, res) => {
    Meeting.findByIdAndDelete(req.params.id).then(
        (reservation) => {
            if (!reservation) {
                return res.status(404).send();
            }

            res.send(reservation);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}


//GET requst to url/reservations/getByMeetingsId/:id
exports.getByMeetingId = async (req, res) => {
    const record = await Meeting.findOne({ _id: req.params.id });
    return res.status(200).json(record);
}

//GET request to url/reservations/getByUserId/:username
exports.getByUsername = async (req, res) => {
    const Username = req.params.username;
    console.log(Username);
    const user = await User.findOne({ Username: Username });
    console.log(user);
    const records = await Meeting.find({ user_id: user._id });
    return res.status(200).json(records);
}

//GET request to url/reservations/
exports.getAll = async (req, res) => {
    const records = await Meeting.find({});
    return res.status(200).json(records);
}