const express = require('express');
const router = express.Router();

// In-memory data store for health logs (ytb replaced with a file)
let healthLogs = [];

// Create a new health log
router.post('/', (req, res) => {
    const { mood, sleep, symptoms } = req.body;
    if (!mood || !sleep || !symptoms) {
        return res.status(400).json({ message: 'All fields (mood, sleep, symptoms) are required' });
    }

    const newLog = {
        id: healthLogs.length + 1, // Unique ID for each log
        mood,
        sleep,
        symptoms,
        createdAt: new Date()
    };
    
    healthLogs.push(newLog);
    res.status(201).json(newLog);
});

// Get all health logs
router.get('/', (req, res) => {
    res.status(200).json(healthLogs);
});

// Get a specific health log by ID
router.get('/:id', (req, res) => {
    const log = healthLogs.find(l => l.id === parseInt(req.params.id));
    if (!log) {
        return res.status(404).json({ message: 'Health log not found' });
    }
    res.status(200).json(log);
});

// Update an existing health log by ID
router.put('/:id', (req, res) => {
    const log = healthLogs.find(l => l.id === parseInt(req.params.id));
    if (!log) {
        return res.status(404).json({ message: 'Health log not found' });
    }

    const { mood, sleep, symptoms } = req.body;
    if (!mood || !sleep || !symptoms) {
        return res.status(400).json({ message: 'All fields (mood, sleep, symptoms) are required' });
    }

    log.mood = mood;
    log.sleep = sleep;
    log.symptoms = symptoms;
    log.updatedAt = new Date();

    res.status(200).json(log);
});

// Delete a health log by ID
router.delete('/:id', (req, res) => {
    const logIndex = healthLogs.findIndex(l => l.id === parseInt(req.params.id));
    if (logIndex === -1) {
        return res.status(404).json({ message: 'Health log not found' });
    }

    healthLogs.splice(logIndex, 1);
    res.status(204).send(); // No content to return
});

module.exports = router;
