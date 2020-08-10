/**
 * Invoice.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {
    uuid: { type: 'string', required: true, unique: true },
    emisor: { model: 'entity' },
    receptor: { model: 'entity' },
    total: {type: 'number'}
  },
  createFromXML: async function(filename) {
    const xml = await sails.helpers.openXml(filename);
    const uuid = filename.split('.')[0];
    const invoice = simplifyObject(xml).Comprobante;

    const emisor = await Entity.findOrCreate({ rfc: invoice.Emisor.rfc }, invoice.Emisor);
    const receptor = await Entity.findOrCreate({ rfc: invoice.Receptor.rfc }, invoice.Receptor);
    await Entity.update({ id: emisor.id }).set({ emmiter: "1" });
    await Entity.update({ id: receptor.id }).set({ recipient: "1" });

    invoice.emisor = emisor.id;
    invoice.receptor = receptor.id;
    invoice.uuid = uuid;

    return Invoice.findOrCreate({ uuid: uuid }, invoice);
  },

};
//invoice fields contain cfdi:<property name> remove cfdi:part if it exists and lower case first letter since not all invoices are capitalized
function simplifyObject(object) {
  const keys = Object.keys(object);
  const obj = {};
  keys.forEach(k => {
    let key = k.indexOf(':') > -1 ? k.split(':')[1] : k;
    if (typeof(object[k]) === 'object' && !Array.isArray(object[k])) {
      obj[key] = simplifyObject(object[k]);
    } else {
      key = key[0].toLowerCase() + key.slice(1);
      obj[key] = object[k];
    }
  });
  return obj;
}
