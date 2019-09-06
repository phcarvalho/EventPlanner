const azure = require('azure-storage');

const tableAuth = require('.././config/tableAuth');

const tableSvc = azure.createTableService(
  tableAuth.account,
  tableAuth.accessKey
);

class Azita {
  constructor() {
    this.init();
  }

  init() {
    tableSvc.createTableIfNotExists(tableAuth.table, error => {
      if (error) {
        console.log(error);
      }
    });
  }
}

module.exports = new Azita();
