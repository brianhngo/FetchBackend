const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(routes);

// Server Connection
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
