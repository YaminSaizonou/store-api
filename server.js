const express = require('express');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const knex = require('knex');
const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const addItem = require('./controllers/addItem');
const addSize = require('./controllers/addSize');
const deleteItem = require('./controllers/deleteItem');
const addCategory = require('./controllers/addCategory');
const items = require('./controllers/items');
const categories = require('./controllers/categories');
const womenCategories = require('./controllers/getWomenCategories');
const menCategories = require('./controllers/getMenCategories');
const itemByCategory = require('./controllers/itemByCategory');
const profiles = require('./controllers/profiles');
const item = require('./controllers/item');
const checkout = require('./controllers/checkout');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)



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

app.post('/checkout', async (req, res) => { checkout.handleCheckout(req, res, stripe) });
app.post('/register', async (req, res) => { register.handleRegister(req, res, postgres, bcrypt) });
app.post('/login', async (req, res) => { login.handleLogin(req, res, postgres, bcrypt) });
app.get('/profile/:id', async (req, res) => { profile.handleProfile(req, res, postgres) });
app.post('/addItem', upload.single('image'), async (req, res) => { addItem.handleAddItem(req, res, postgres) });
app.delete('/deleteItem/:id', async (req, res) => { deleteItem.handleDeleteItem(req, res, postgres) }); // Correct route
app.post('/addCategory', async (req, res) => { addCategory.handleAddCategory(req, res, postgres) });
app.post('/addSize', async (req, res) => { addSize.handleAddSize(req, res, postgres) });
app.get('/items', async (req, res) => { items.handleItems(req, res, postgres) });
app.get('/item/:id', async (req, res) => { item.handleItem(req, res, postgres) });
app.get('/itemsByCategory', async (req, res) => { itemByCategory.handleItemsByCategory(req, res, postgres) });
app.get('/categories', async (req, res) => { categories.handleCategories(req, res, postgres) });
app.get('/womenCategories', async (req, res) => { womenCategories.getWomenCategories(req, res, postgres) });
app.get('/menCategories', async (req, res) => { menCategories.getMenCategories(req, res, postgres) });
app.get('/profiles', async (req, res) => { profiles.handleProfiles(req, res, postgres) });



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
