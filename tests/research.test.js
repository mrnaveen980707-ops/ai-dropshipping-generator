const assert=require('node:assert/strict');
const {buildBrief,evaluateSupplier,calculateCod,compareCompetitors,creativePlan,auditProductPage,scoreOpportunity,validateMarketTemplate,briefToMarkdown,briefToCsv,createWorkspace,exportWorkspace,importWorkspace}=require('../research.js');

assert.throws(()=>buildBrief({product:''}),/Product is required/);
const india=buildBrief({product:'Magnetic Drawing Board',market:'India',category:'Kids & family',price:'₹1499',problem:'Screen-free play'});
assert.equal(india.snapshot.market,'India'); assert.ok(india.risks.includes('COD/RTO exposure')); assert.equal(india.validation.length,5);
const global=buildBrief({product:'Travel Organizer',market:'Global'}); assert.ok(global.risks.includes('Crowded ad auctions'));

const supplier=evaluateSupplier({unitCost:300,shipping:80,duties:20,packaging:25,paymentFees:15,sellingPrice:999,sampleApproved:true,tracking:true,returns:true,response:true,compliance:true,backupSupplier:false});
assert.equal(supplier.landedCost,440); assert.equal(supplier.grossProfit,559); assert.equal(supplier.reliabilityScore,80);

const cod=calculateCod({orders:100,deliveryRate:70,sellingPrice:999,landedCost:440,forwardShipping:70,reverseShipping:60,adSpend:10000,paymentFeePct:2});
assert.equal(cod.deliveredOrders,70); assert.equal(cod.rtoOrders,30);

const competitors=compareCompetitors([{name:'A',price:999,offerClarity:8,socialProof:7,creativeQuality:8,deliveryTrust:6,differentiation:9},{name:'B',price:899,offerClarity:5,socialProof:5,creativeQuality:5,deliveryTrust:5,differentiation:5}]);
assert.equal(competitors[0].name,'A'); assert.equal(competitors[0].score,7.6);

const plan=creativePlan({product:'Drawing Board',problem:'too much screen time',proof:'child using it during travel'});
assert.equal(plan.length,3); assert.match(plan[0].hook,/screen time/);

const audit=auditProductPage({clearHeadline:true,demoAboveFold:true,priceVisible:true,trustSignals:true,benefitSections:true,objectionFaq:true,shippingClarity:true,returnsClarity:true,mobileFriendly:true,ctaRepeated:true});
assert.equal(audit.score,100);

const opportunity=scoreOpportunity({demandEvidence:8,marginPotential:7,logisticsEase:6,creativePotential:9,competitionAdvantage:5});
assert.equal(opportunity.score,73.5); assert.match(opportunity.methodology,/user-provided inputs/);

const validTemplate={schemaVersion:1,id:'india-basic',name:'India basic',checks:[{key:'cod',label:'COD risk',weight:20}]};
assert.equal(validateMarketTemplate(validTemplate).valid,true);
assert.equal(validateMarketTemplate({schemaVersion:2,checks:[]}).valid,false);

assert.match(briefToMarkdown(india),/Dropshipping Research Brief/);
assert.match(briefToCsv(india),/section,item/);

const ws=createWorkspace({product:{product:'Drawing Board'},competitors:[{name:'A'}]});
assert.equal(ws.schemaVersion,1);
assert.equal(importWorkspace(exportWorkspace(ws)).product.product,'Drawing Board');
assert.throws(()=>importWorkspace('not-json'),/invalid/);
assert.throws(()=>importWorkspace(JSON.stringify({schemaVersion:99})),/Unsupported/);
console.log('All research toolkit tests passed.');