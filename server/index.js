const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import route modules
const contentRoutes = require('./routes/content');
const interviewRoutes = require('./routes/interview');
const simulatorRoutes = require('./routes/simulator');

// Mount routes
app.use('/api/content', contentRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/simulator', simulatorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Learning Repository API running on port ${PORT}`);
});
