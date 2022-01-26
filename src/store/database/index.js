import {Database} from "@vuex-orm/core";

const database = new Database();
let databaseGroups = {};

const requireModel = require.context('.', true, /\.js$/);
requireModel.keys().forEach(fileName => {
  if (fileName === './index.js') return;
  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '');
  const [modelName, fileRole] = path.split('/');

  if (databaseGroups[modelName] === undefined) {
    databaseGroups[modelName] = {}
  }

  if (fileRole === "index") {
    databaseGroups[modelName].model = requireModel(fileName).default;
  } else if (fileRole === "module") {
    databaseGroups[modelName].module = requireModel(fileName).default;
  }
});

Object.keys(databaseGroups).forEach((modelName) => {
  let modelGroup = databaseGroups[modelName];
  if (modelGroup.model && modelGroup.module) {
    database.register(modelGroup.model, modelGroup.module);
  } else if (modelGroup.model) {
    database.register(modelGroup.model);
  }
});

export default database;
