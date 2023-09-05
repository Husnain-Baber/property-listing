const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

const properties = require('./routes/api/properties');
const users = require('./routes/api/users');
// Connect Database
connectDB();
app.use(cors({origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/properties', properties);
app.use('/api/users', users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));