const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('./models'); // Import models to establish associations

const app = express();
const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Social Media API is running' });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();
    const server = app.listen(PORT, () => {
      console.log(`--------------------------------------`);
      console.log(`🚀 Socially Backend is UP and RUNNING`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`--------------------------------------`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Error: Port ${PORT} is already in use.`);
        console.error(`💡 Try to close other running servers or change the port in src/index.js`);
      } else {
        console.error(`❌ Server error:`, error);
      }
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
