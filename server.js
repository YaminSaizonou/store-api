const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const knex = require('knex');

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});