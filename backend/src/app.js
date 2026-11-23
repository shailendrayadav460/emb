const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const employeeRoutes = require('./routes/employeeRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (process.env.CLIENT_URL || 'https://emb-2.onrender.com/api').split(','),
  })
);
app.use(express.json({ limit: '1mb' }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/api/employees', employeeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
