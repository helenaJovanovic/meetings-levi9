var express = require('express');
var router = express.Router();

var User = require('../model/user');

//Just one function GET/:user_id -> return username
router.get('/:user_id', async(req, res) => {

    const user = await User.findOne({ _id: req.params.user_id });

    res.status(200).json(user);
});

router.get('/', async(req, res) => {
   const users = await User.find({});
   res.status(200).json(users); 
});

module.exports = router;