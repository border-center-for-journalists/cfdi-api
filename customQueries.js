//Indexes
db.invoice.setIndex({ total: -1 });

//Data Janitor
db.invoice.update({
  $or: [
    { moneda: "Peso Mexicano" },
    { moneda: "Pesos Mexicanos" },
    { moneda: "PESOS MONEDA NACIONAL" },
    { moneda: "XXX" },
    { moneda: "MXP" },
    { moneda: "Pesos" },
    { moneda: "PESOS" },
    { moneda: "MN" },
    { moneda: "Pesos (MXP)" },
    { moneda: "Moneda Nacional" },
    { moneda: "PESOS M.N." },
    { moneda: "NACIONAL" },
    { moneda: "PESOS (MXN)" },
    { moneda: "M.N." },
    { moneda: "PESOS MEXICANOS" },
    { moneda: "pesos" },
    { moneda: "MX" },
    { moneda: "PESOS MX"}
  ]
}, { $set: { moneda: 'MXN' } }, { multi: true });

db.invoice.update({ moneda: "Dólar Americano" }, { $set: { moneda: 'USD' } }, { multi: true });
