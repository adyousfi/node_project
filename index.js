const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyParser.json());


const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');  

app.use('/api', categoryRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
