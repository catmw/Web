const express = require('express');
const mysql = require('mysql');
//const cors = require('cors');
const app = express();
const PORT = 3000;

//app.use(cors());
app.use(express.static('public'))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'uselections'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

//Route to get home page
app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/public/routes.html');
});

// Route to fetch states
app.get('/states', (req, res) => {
    const query = 'SELECT * FROM states';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// Route to fetch candidates
app.get('/candidates', (req, res) => {
    const query = 
        `SELECT DISTINCT candidate_party, candidate_name
        FROM pres_votes;`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database error');
        } else {
            res.json(results); // Send the filtered data to the frontend
        }
    });
});


// Route to fetch election results by year
app.get('/results/2024', (req, res) => {
    const query = 'SELECT * FROM pres_votes WHERE year = 2024';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});