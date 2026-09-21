const assert=require('node:assert/strict');
const {buildBrief,evaluateSupplier,calculateCod,briefToMarkdown,briefToCsv}=require('../research.js');

assert.throws(()=>buildBrief({product:''}),/Product is required/);
const india=buildBrief({product:'Magnetic Drawing Board',market:'India',category:'Kids & family',price:'₹1499',problem:'Screen-free play'});
assert.equal(india.snapshot.market,'India'); assert.ok(india.risks.includes('COD/RTO exposure')); assert.equal(india.validation.length,5);
const global=buildBrief({product:'Travel Organizer',market:'Global'}); assert.ok(global.risks.includes('Crowded ad auctions'));

const supplier=evaluateSupplier({unitCost:300,shipping:80,duties:20,packaging:25,paymentFees:15,sellingPrice:999,sampleApproved:true,tracking:true,returns:true,response:true,compliance:true,backupSupplier:false});
assert.equal(supplier.landedCost,440); assert.equal(supplier.grossProfit,559); assert.equal(supplier.reliabilityScore,80);

const cod=calculateCod({orders:100,deliveryRate:70,sellingPrice:999,landedCost:440,forwardShipping:70,reverseShipping:60,adSpend:10000,paymentFeePct:2});
assert.equal(cod.deliveredOrders,70); assert.equal(cod.rtoOrders,30); assert.ok(Number.isFinite(cod.contributionProfit));

assert.match(briefToMarkdown(india),/Dropshipping Research Brief/);
assert.match(briefToCsv(india),/section,item/);
console.log('All research toolkit tests passed.');