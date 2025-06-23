require('dotenv').config();      
const express = require('express');
const connectDB = require('./config/config');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());

app.use('/tasks', taskRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
