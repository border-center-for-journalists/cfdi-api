module.exports = {


  friendlyName: 'Import xml',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function() {
    const ProgressBar = require('progress');
    const filenames = await sails.helpers.readFolder('xml');
    const progressBar = new ProgressBar('-> loading [:bar] :percent :etas', {
      width: 40,
      complete: '=',
      incomplete: ' ',
      renderThrottle: 1,
      total: filenames.length
    });
    let invoices = [];
    for (i in filenames) {
      let invoice = await Invoice.createFromXML(filenames[i]);
      invoices.push(invoice);
      progressBar.tick();
    }
    return invoices;
  }
};
