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

        const meeting = await Meeting.create({
            name: name,
            description: description,
            start_meeting: start_meeting,
            end_meeting: end_meeting,
            user_ids: user_ids
        }).catch((error) => {
            res.status(500).send(error);
        });

        return res.status(201).json(meeting);

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.removemeeting = async (req, res) => {
    Meeting.findByIdAndDelete(req.params.id).then(
        (meeting) => {
            if (!meeting) {
                return res.status(404).send();
            }

            res.send(meeting);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
}


exports.getByMeetingId = async (req, res) => {
    const record = await Meeting.findOne({ _id: req.params.id });
    return res.status(200).json(record);
}

exports.getMeetingByDay = async (req, res) => {
    var day = req.params.day;
    const allMeetings = await Meeting.find({});

    var records = [];

    allMeetings.forEach((el) => {
        if(el.start_meeting.getDate() == day){
            records.push(el);
        }
    });
    
    return res.status(200).json(records);
}

exports.getByUsername = async (req, res) => {
    const Username = req.params.username;
    console.log(Username);
    const user = await User.findOne({ Username: Username });
    console.log(user);
    const records = await Meeting.find({ user_id: user._id });
    return res.status(200).json(records);
}

exports.getAll = async (req, res) => {
    const records = await Meeting.find({});
    return res.status(200).json(records);
}