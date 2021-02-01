/**
 * InvoicesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  /*read: async function(req, res) {
    res.json('importing');
    const invoices = await sails.helpers.importXml();
    console.log('imported ' + invoices.length + 'invoices');
  }
*/
  count: async function(req, res) {
    let query = req.query.where ? JSON.parse(req.query.where) : undefined;
    var numRecords = await Invoice.count(query);
    res.json(numRecords);
  }
};
