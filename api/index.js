const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const NpmApi = require('npm-api');
const npm = new NpmApi();
const npmStats = require('download-stats');
const packages = require('./packages.json');
const randomPackage = () => packages[Math.floor(Math.random() * packages.length)];

app.get('/randompackage', async (req, res) => {

  const package = randomPackage();
  const repo = npm.repo(package);
  console.log("Requested package: ", package);

  // get package description
  const packageData = await repo.package();
  const description = packageData.description;

  let responseBody = {
    package: package,
    description: description
  };

  //get the number of downloads for the last week
  npmStats.get.lastWeek(package, function (err, data) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    responseBody = Object.assign(responseBody, data);
    res.status(200).send(responseBody);
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});