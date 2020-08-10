/**
 * InvoicesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  read: async function(req, res) {
    res.json('importing');
   // const invoices = await sails.helpers.importXml();
    //console.log('imported ' + invoices.length + 'invoices');
  }

};
