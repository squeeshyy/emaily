const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hello: 'buddy' });
});

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('app running on port 5000');
});
