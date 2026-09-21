(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports){module.exports=api;}
  root.DropshippingResearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
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
  return {buildBrief};
});