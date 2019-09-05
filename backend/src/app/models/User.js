const azure = require('azure-storage');
const uuid = require('uuid/v1');

const tableAuth = require('../../config/tableAuth');

const tableSvc = azure.createTableService(
  tableAuth.account,
  tableAuth.accessKey
);

class User {
  constructor() {
    this.init();
  }

  init() {
    this.PartitionKey = User.name;
  }

  create(req) {
    return new Promise((resolve, reject) => {
      const user = {
        PartitionKey: { _: this.PartitionKey },
        RowKey: { _: uuid() },
      };

      const keyNames = Object.keys(req.body);

      keyNames.map(key => {
        user[key]._ = req.body[key];
        return true;
      });

      tableSvc.insertEntity(
        tableAuth.table,
        user,
        { echoContent: true },
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  }
}

module.exports = new User();
