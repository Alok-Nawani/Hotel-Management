require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const models = require('./models');
const { exportAllTables, attachExportHooks } = require('./utils/tableExporter');

const customersRouter = require('./routes/customers');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');
const staffRouter = require('./routes/staff');
const inventoryRouter = require('./routes/inventory');
const reviewsRouter = require('./routes/reviews');
const authRouter = require('./routes/auth');
const { auth } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/customers', auth, customersRouter);
app.use('/api/menu', auth, menuRouter);
app.use('/api/orders', auth, ordersRouter);
app.use('/api/payments', auth, paymentsRouter);
app.use('/api/staff', auth, staffRouter);
app.use('/api/inventory', auth, inventoryRouter);
app.use('/api/reviews', auth, reviewsRouter);

// Error handling
const errorHandler = require('./middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start(){
  await sequelize.sync();
  // Attach hooks once models are synced
  attachExportHooks(models);
  // Initial export on boot
  exportAllTables(models);
  app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}
start();