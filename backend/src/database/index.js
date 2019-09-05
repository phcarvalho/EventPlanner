const azure = require("azure-storage");

const tableAuth = require(".././config/tableAuth");

const tableSvc = azure.createTableService(
  tableAuth.account,
  tableAuth.accessKey
);

class Azita {
  constructor() {
    this.init();
  }

  init() {
    tableSvc.createTableIfNotExists(tableAuth.table, function(
      error,
      result,
      response
    ) {
      if (!error) {
        console.log(result);
      }
    });
  }
}

module.exports = new Azita();
