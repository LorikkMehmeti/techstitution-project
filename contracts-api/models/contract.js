var mongoose = require('mongoose');

var contractSchema = new mongoose.Schema({
  nr_proc: Number,
  type_proc: String,
  act_proc:String,
  date_init:{ type: Date, default: Date.now, required: true},
  date_publish: { type: Date, default: Date.now, required: true },
  date_signing: { type: Date, default: Date.now, required: true },
  time_imp_1: { type: Date, default: Date.now, required: true },
  time_imp_2: { type: Date, default: Date.now, required: true },
  date_close: { type: Date, default: Date.now, required: true },
  contract_price:
  { type: Number, required: true},
  total_price:
  { type: Number, required: true},
  contractor_name: String
});

module.exports = mongoose.model('contract', contractSchema);
