const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Render assigns its own PORT — must not be hardcoded

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let bookings = [];

app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
    const booking = {
        id: Date.now().toString(),
        ...req.body,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    res.status(201).json(booking);
});

app.patch('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);

    if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
    }

    Object.assign(booking, req.body);
    res.json(booking);
});

app.delete('/api/bookings/:id', (req, res) => {
    bookings = bookings.filter(b => b.id !== req.params.id);
    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.send('3D Dental API Server is running');
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});