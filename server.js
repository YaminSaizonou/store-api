const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const knex = require('knex');
const register = require('./controllers/register');

const postgres = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'store'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads'); 
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


const PORT = process.env.PORT || 3001; 

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!'); 
});

app.post('/register', async (req, res) => { register.handleRegister(req, res, postgres, bcrypt) });

app.post('/login', async (req, res) => { login.handleLogin(req, res, postgres, bcrypt) });

app.get('/profile/:id', async (req, res) => { profile.handleProfile(req, res, postgres) });

app.post('/addItem', upload.single('image'), async (req, res) => {addItem.handleAddItem(req, res, postgres) });

app.delete('/deleteItem', async (req, res) => { deleteItem.hanldeDeleteItem(req, res, postgres) });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});