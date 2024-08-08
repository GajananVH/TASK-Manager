// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/Auth');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const uri = 'mongodb+srv://gvhegde:Gvhegde123@pricingclusterv2.ge13mym.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/tasks', require('./Routes/Tasks'));
app.use('/api/auth', authRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
