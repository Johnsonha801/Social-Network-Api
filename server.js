const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Mongo connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-6', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Log queries
mongoose.set('debug', true);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
