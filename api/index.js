require('dotenv/config');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const swaggerDocument = require('./swagger.json');
const { connectDB } = require('./configs/connect-database');
const { route } = require('./routers');

// init app
const app = express();
const port = process.env.APP_PORT || 3000;

// connect database
connectDB();

// use middleware
app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
