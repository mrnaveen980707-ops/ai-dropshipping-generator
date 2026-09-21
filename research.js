(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports){module.exports=api;}
  root.DropshippingResearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0;}
  function money(n){return Math.round((num(n)+Number.EPSILON)*100)/100;}

  function buildBrief(input){
    const product=(input.product||'').trim();
    if(!product) throw new Error('Product is required');
    const market=input.market==='Global'?'Global':'India';
    const category=(input.category||'Other').trim()||'Other';
    const price=(input.price||'').trim()||'Not set';
    const problem=(input.problem||'').trim()||'Define the strongest customer problem before testing.';
    const india=market==='India';

    return {
      snapshot:{product,market,category,price,problem},
      audience: india
        ? ['Urban and tier-2 online shoppers who understand the use case quickly','Value-conscious buyers comparing against marketplace alternatives','COD users who need strong trust signals and clear delivery expectations']
        : ['Problem-aware shoppers reachable through short-form creative','Buyers comparing convenience, novelty and social proof','Mobile-first consumers who need a fast demonstration of value'],
      positioning:[
        'Lead with the specific outcome rather than calling the product “trending”.',
        'Quantify convenience only when you can substantiate it.',
        'Test a bundle, bonus, guarantee or accessory only when the unit economics remain viable.',
        india?'Use trust, COD clarity and delivery transparency as part of the offer.':'Use delivery speed, proof and differentiation as part of the offer.'
      ],
      angles:[
        'Problem → demo → outcome: show the pain point in the first 2 seconds.',
        'Before vs after: make the improvement visually obvious.',
        'Use-case proof: show the product in a realistic daily situation.',
        'Objection handling: address price, durability, size, shipping or ease-of-use.'
      ],
      productPage:[
        'What problem does this solve better than a familiar alternative?',
        'What can be demonstrated visually in under 10 seconds?',
        'What are the top 5 objections a skeptical buyer will have?',
        'What proof can you show without exaggeration?',
        'What makes the offer worth acting on now without fake scarcity?'
      ],
      risks: india
        ? ['COD/RTO exposure','Long or inconsistent delivery times','Marketplace price comparison','Low-trust product claims','Weak post-purchase communication']
        : ['Crowded ad auctions','Fast copycat competition','Shipping variability','Policy-sensitive claims','Low differentiation'],
      validation:[
        'Validate at least 3 competing offers and record price, reviews and positioning.',
        'Get supplier quotes from at least 2 sources and calculate landed cost.',
        'Create 3 distinct creatives with different hooks—not just 3 edits of one ad.',
        'Build one focused product page with proof, FAQs, shipping and returns.',
        'Define stop/continue rules before spending on ads.'
      ]
    };
  }

  function evaluateSupplier(input){
    const unit=num(input.unitCost), shipping=num(input.shipping), duties=num(input.duties), packaging=num(input.packaging), fees=num(input.paymentFees);
    const landed=money(unit+shipping+duties+packaging+fees);
    const selling=num(input.sellingPrice);
    const gross=money(selling-landed);
    const margin=selling>0?money((gross/selling)*100):0;
    const scoreItems=[
      ['sampleApproved',20],['tracking',15],['returns',15],['response',10],['compliance',20],['backupSupplier',20]
    ];
    const reliability=scoreItems.reduce((t,[k,w])=>t+(input[k]?w:0),0);
    return {landedCost:landed,grossProfit:gross,grossMarginPercent:margin,reliabilityScore:reliability};
  }

  function calculateCod(input){
    const orders=Math.max(0,num(input.orders));
    const selling=num(input.sellingPrice);
    const landed=num(input.landedCost);
    const forward=num(input.forwardShipping);
    const reverse=num(input.reverseShipping);
    const adSpend=num(input.adSpend);
    const paymentFeePct=num(input.paymentFeePct);
    const deliveryRate=Math.min(100,Math.max(0,num(input.deliveryRate)))/100;
    const delivered=orders*deliveryRate;
    const rto=orders-delivered;
    const revenue=delivered*selling;
    const productCost=delivered*landed;
    const forwardCost=orders*forward;
    const reverseCost=rto*reverse;
    const paymentFees=revenue*(paymentFeePct/100);
    const contribution=money(revenue-productCost-forwardCost-reverseCost-paymentFees-adSpend);
    const perOrder=orders>0?money(contribution/orders):0;
    const perDelivered=delivered>0?money(contribution/delivered):0;
    return {
      orders:money(orders),deliveredOrders:money(delivered),rtoOrders:money(rto),
      revenue:money(revenue),productCost:money(productCost),forwardShippingCost:money(forwardCost),
      reverseShippingCost:money(reverseCost),paymentFees:money(paymentFees),adSpend:money(adSpend),
      contributionProfit:contribution,contributionPerOrder:perOrder,contributionPerDeliveredOrder:perDelivered
    };
  }

  function briefToMarkdown(brief){
    const s=brief.snapshot;
    const section=(title,items)=>'## '+title+'\n'+items.map(x=>'- '+x).join('\n')+'\n';
    return '# Dropshipping Research Brief\n\n'
      +'**Product:** '+s.product+'\n\n**Market:** '+s.market+'\n\n**Category:** '+s.category+'\n\n**Planned price:** '+s.price+'\n\n'
      +'**Problem / desired outcome:** '+s.problem+'\n\n'
      +section('Audience hypotheses',brief.audience)+'\n'
      +section('Positioning ideas',brief.positioning)+'\n'
      +section('Creative angles',brief.angles)+'\n'
      +section('Product-page prompts',brief.productPage)+'\n'
      +section('Risk checklist',brief.risks)+'\n'
      +section('Minimum validation plan',brief.validation);
  }

  function briefToCsv(brief){
    const rows=[['section','item']];
    const add=(name,items)=>items.forEach(x=>rows.push([name,x]));
    rows.push(['snapshot','Product: '+brief.snapshot.product]);
    rows.push(['snapshot','Market: '+brief.snapshot.market]);
    rows.push(['snapshot','Category: '+brief.snapshot.category]);
    rows.push(['snapshot','Planned price: '+brief.snapshot.price]);
    rows.push(['snapshot','Problem: '+brief.snapshot.problem]);
    add('audience',brief.audience); add('positioning',brief.positioning); add('creative_angles',brief.angles);
    add('product_page',brief.productPage); add('risks',brief.risks); add('validation',brief.validation);
    const q=v=>'"'+String(v).replace(/"/g,'""')+'"';
    return rows.map(r=>r.map(q).join(',')).join('\n');
  }

  return {buildBrief,evaluateSupplier,calculateCod,briefToMarkdown,briefToCsv};
});