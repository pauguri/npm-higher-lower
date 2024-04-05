const NpmApi = require('npm-api');
const npm = new NpmApi();
const npmStats = require('download-stats');

const getRandomPackageName = (packages) => {
  const index = Math.floor(Math.random() * packages.length);
  const packageName = packages[index];
  packages.splice(index, 1);
  return packageName;
};

module.exports = async (packages) => {
  const packageName = getRandomPackageName(packages);
  const repo = npm.repo(packageName);
  console.log("Requested package: ", packageName);

  // get package description
  const packageData = await repo.package();
  const description = packageData.description;

  let responseBody = {
    package: packageName,
    description: description
  };

  //get the number of downloads for the last week
  npmStats.get.lastWeek(packageName, function (err, data) {
    if (err) {
      return { status: 500, data: "Error fetching download stats" };
    }

    responseBody = Object.assign(responseBody, data);
    return { status: 200, data: responseBody };
  });
};