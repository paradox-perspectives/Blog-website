const express = require('express');
const mails = require('./mails.json');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(mails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        mails.push(email);
        res.status(201).json({ message: 'Email added successfully' }); // Add this line to send a response
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;