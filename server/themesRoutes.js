const express = require('express');
const router = express.Router();
const themes = require('./themes.json');

// GET themes by language
router.get('/:lang', (req, res) => {
    const lang = req.params.lang;
    const translatedThemes = themes.map(theme => theme[lang] || theme.en);
    res.json(translatedThemes);
});

// POST a new theme
router.post('/', (req, res) => {
    const newTheme = req.body;
    if (!newTheme.en || !newTheme.nl) {
        return res.status(400).send('Both English and Dutch names are required.');
    }
    themes.push(newTheme);
    res.status(201).send('Theme added successfully.');
});

module.exports = router;
