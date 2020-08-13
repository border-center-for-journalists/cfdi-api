/**
 * EntityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var ObjectId = require('mongodb').ObjectID;

async function getAmountsByCurrency(entityId, currency, entityType, reverseType) {
  const db = sails.getDatastore().manager;
  const rawInvoice = db.collection(Invoice.tableName);
  const match = {
    $match: {
      'moneda': currency,
      [entityType]: ObjectId(entityId)
    }
  };
  const group = {
    $group: {
      _id: `$${reverseType}`,
      total: { $sum: '$total' },
      totals: { $addToSet: '$total' },
      count: { $sum: 1 },
    }
  };
  const d = await rawInvoice.aggregate([
    { $project: { moneda: 1, total: 1, emisor: 1, receptor: 1 } },
    match,
    group
  ]).toArray();

  return d;
}

module.exports = {
  amounts: async (req, res) => {
    const id = req.param('id');
    const entity = await Entity.findOne({ id });
    if( entity ){
      const type = entity.emmiter ? 'emisor' : 'receptor';
      const reverseType = type === 'emisor' ? 'receptor' : 'emisor';
      const totalsByEntityMXN = await getAmountsByCurrency(id, 'MXN', type, reverseType);
      const totalsByEntityUSD = await getAmountsByCurrency(id, 'USD', type, reverseType);
      const entities = await Entity.find({ [entity.emmiter ? 'recipient' : 'emmiter']: '1' });
      const totalsByEntityMXNP = totalsByEntityMXN.map(t => ({ ...t, 'entity': entities.find(e => e.id === t._id.toString()) }));
      const totalsByEntityUSDP = totalsByEntityUSD.map(t => ({...t, 'entity' : entities.find(e => e.id === t._id.toString()) }));
      res.json({
        result: {
          totalsByEntityUSD: totalsByEntityUSDP,
          totalsByEntityMXN: totalsByEntityMXNP,
        },
      });
    } else {
      res.badRequest();
    }
  }
};

