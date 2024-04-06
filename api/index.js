const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const packages = require('./packages.json');
const getPackageData = require('./getPackageData');

app.get('/packages', (req, res) => {
  const count = req.query.count || 50;
  const offset = req.query.offset || Math.floor(Math.random() * (packages.length - count));
  const response = packages.slice(offset, offset + count);
  res.status(200).json(response);
});

app.get('/package', async (req, res) => {
  const packageName = req.query.name;

  if (!packageName) {
    return res.status(400).send("Missing package name");
  }

  getPackageData(packageName, (packageData) => {
    console.log(packageData);
    res.status(packageData.status).send(packageData.data);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
})