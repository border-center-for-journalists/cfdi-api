module.exports = {


  friendlyName: 'Read folder',


  description: '',


  inputs: {
    dir: {
      type: 'string',
      example: 'xml',
      description: 'The folder to read',
      required: true
    }
  },


  exits: {

    success: {
      description: 'Returns an array of the files in folder',
    },

  },


  fn: async function(inputs) {
    const path = require('path').resolve(sails.config.appPath, inputs.dir);
    const fs = require("fs")
    const files = fs.readdirSync(path);
    return files;
  }


};
