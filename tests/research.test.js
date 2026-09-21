const assert=require('node:assert/strict');
const {buildBrief}=require('../research.js');

assert.throws(()=>buildBrief({product:''}),/Product is required/);

const india=buildBrief({product:'Magnetic Drawing Board',market:'India',category:'Kids & family',price:'₹1499',problem:'Screen-free play'});
assert.equal(india.snapshot.product,'Magnetic Drawing Board');
assert.equal(india.snapshot.market,'India');
assert.ok(india.risks.includes('COD/RTO exposure'));
assert.equal(india.validation.length,5);

const global=buildBrief({product:'Travel Organizer',market:'Global'});
assert.equal(global.snapshot.market,'Global');
assert.ok(global.risks.includes('Crowded ad auctions'));

console.log('All research toolkit tests passed.');