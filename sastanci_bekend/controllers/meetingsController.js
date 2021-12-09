const express = require("express");
const Reservation = require('../model/meeting');
const User = require('../model/user');


exports.addmeeting = async (req, res) => {
    try {
        let { start_meeting, end_meeting, user_id } = req.body;

        if (!(start_meeting && end_meeting && user_id)) {
            return res.status(400).send("All fields are required");
        }
      
        try{
            start_meeting = new Date(start_meeting);
            end_meeting = new Date(end_meeting);
        }
        catch(err){
            return res.status(400).send("Invalid date format");
       }

        const userIdExists = await User.findOne({ _id: user_id });
        const meetingExists = await Reservation.findOne({ start_meeting: start_meeting });

        if (meetingExists) {
            return res.status(400).send("Meeting in that hour already exists");
        }

        if (!userIdExists) {
            return res.status(404).send("User id from request doesn't exist");
        }

        const reservation = await Reservation.create({
            start_meeting: start_meeting,
            end_meeting: end_meeting,
            user_id: user_id
        }).catch((error) => {
            res.status(500).send(error);
        });

        return res.status(201).json(reservation);

    } catch (err) {
        console.log(err);
    }
}

// DELETE request on url/reservations/removeReservation/:id
// returns deleted object
exports.removemeeting = async (req, res) => {
    Reservation.findByIdAndDelete(req.params.id).then(
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


//GET requst to url/reservations/getByReservationsId/:id
exports.getByReservationId = async(req, res) => {
    const record = await Reservation.findOne({_id: req.params.id});
    res.status(200).json(record);
}

//GET request to url/reservations/getByUserId/:username
exports.getByUsername = async (req, res) => {
    const Username = req.params.username;
    console.log(Username);
    const user = await User.findOne({ Username: Username });
    console.log(user);
    const records = await Reservation.find({user_id: user._id});
    res.status(200).json(records);
}

//GET request to url/reservations/
exports.getAll = async (req, res) => {
    const records = await Reservation.find({});
    res.status(200).json(records);
}