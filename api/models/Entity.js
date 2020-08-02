/**
 * Entity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    rfc: {
      type: 'string',
      required: true,
      unique: true,
    },


    nombre: {
      type: 'string',
    },

    facturasEmitidas: {
      collection: 'invoice',
      via: 'emisor'
    },

    facturasRecibidas: {
      collection: 'invoice',
      via: 'receptor'
    },

  },

};
