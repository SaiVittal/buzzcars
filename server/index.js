// index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
const PORT = 8080;

// Enable CORS
app.use(cors());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saivittal@20',
  database: 'buzzcars',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Define an API endpoint to get vehicles
// Inside your Express server setup (e.g., server.js)
app.get('/api/vehicles/', (req, res) => {
    const query = 'SELECT * FROM vehicles';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results);
        console.log(results);
      }
    });
  });

  app.post('/api/vehicles/', (req, res) => {
    const { id, make, model, year } = req.body;
  
    if (!id || !make || !model || !year) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const insertQuery = 'INSERT INTO vehicles (id, make, model, year) VALUES (?, ?, ?, ?)';
  
    connection.query(insertQuery, [id, make, model, year], (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      console.log('Data inserted into MySQL:', result);
      res.status(201).json({ message: 'Data inserted successfully' });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
