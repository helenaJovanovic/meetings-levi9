var express = require('express');
var router = express.Router();

var meeting_c = require('../controllers/meetingsController');


router.get('/getAll', meeting_c.getAll);

router.get('/getByReservationId/:id', meeting_c.getByReservationId);

router.get('/getByUsername/:username', meeting_c.getByUsername);

router.post('/addMeeting', meeting_c.addmeeting);

router.delete('/removeMeeting/:id', meeting_c.removemeeting);


module.exports = router;