const azure = require('azure-storage');
const uuid = require('uuid/v1');

const tableAuth = require('../../config/tableAuth');

const tableSvc = azure.createTableService(
  tableAuth.account,
  tableAuth.accessKey
);

class Model {
  constructor() {
    this.init();
  }

  init() {
    this.PartitionKey = this.constructor.name;
  }

  create(req) {
    return new Promise((resolve, reject) => {
      const body = {
        PartitionKey: { _: this.PartitionKey },
        RowKey: { _: uuid() },
      };

      const keys = Object.keys(req.body);

      keys.map(key => {
        body[key] = { _: req.body[key] };
      });

      tableSvc.insertEntity(
        tableAuth.table,
        body,
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

  findByRk(RowKey) {
    return new Promise(resolve => {
      tableSvc.retrieveEntity(
        tableAuth.table,
        this.PartitionKey,
        RowKey,
        (error, result) => {
          if (!error) {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = Model;
