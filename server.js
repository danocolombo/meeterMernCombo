const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
// //================================
// //multi-tenant stuff
// //--------------------------------
// const { bindCurrentNamespace } = require('./lib/storage');

//end of multi-tenant stuff
//=================================
// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// app.use(bindCurrentNamespace);
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/meeting', require('./routes/api/meeting'));
app.use('/api/people', require('./routes/api/people'));
app.use('/api/groups', require('./routes/api/groups'));
app.use('/api/client', require('./routes/api/client'));
app.use('/api/meeter', require('./routes/api/meeter'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
