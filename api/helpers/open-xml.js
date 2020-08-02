module.exports = {


  friendlyName: 'Open xml',


  description: '',


  inputs: {
    filename: {
      type: 'string',
      example: '0a8f2e5c-79d1-11e6-af5b-00155d014007.xml',
      description: 'The xml filename, assumes it will be in xml folder.',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs) {
    var parser = require('fast-xml-parser');
    const fs = require('fs').promises;
    const path = require('path').resolve(sails.config.appPath, 'xml',inputs.filename);
    const data = await fs.readFile(path, 'utf8');
    const options = {
      attributeNamePrefix: '',
      ignoreAttributes: false,
      parseAttributeValue: true
    };
    return parser.parse(data, options);
  }


};
