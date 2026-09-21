(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports){module.exports=api;}
  root.DropshippingResearch=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0;}
  function money(n){return Math.round((num(n)+Number.EPSILON)*100)/100;}
  function clamp(v,min,max){return Math.min(max,Math.max(min,num(v)));}

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
      angles:['Problem → demo → outcome: show the pain point in the first 2 seconds.','Before vs after: make the improvement visually obvious.','Use-case proof: show the product in a realistic daily situation.','Objection handling: address price, durability, size, shipping or ease-of-use.'],
      productPage:['What problem does this solve better than a familiar alternative?','What can be demonstrated visually in under 10 seconds?','What are the top 5 objections a skeptical buyer will have?','What proof can you show without exaggeration?','What makes the offer worth acting on now without fake scarcity?'],
      risks: india?['COD/RTO exposure','Long or inconsistent delivery times','Marketplace price comparison','Low-trust product claims','Weak post-purchase communication']:['Crowded ad auctions','Fast copycat competition','Shipping variability','Policy-sensitive claims','Low differentiation'],
      validation:['Validate at least 3 competing offers and record price, reviews and positioning.','Get supplier quotes from at least 2 sources and calculate landed cost.','Create 3 distinct creatives with different hooks—not just 3 edits of one ad.','Build one focused product page with proof, FAQs, shipping and returns.','Define stop/continue rules before spending on ads.']
    };
  }

  function evaluateSupplier(input){
    const landed=money(num(input.unitCost)+num(input.shipping)+num(input.duties)+num(input.packaging)+num(input.paymentFees));
    const selling=num(input.sellingPrice);
    const gross=money(selling-landed);
    const margin=selling>0?money((gross/selling)*100):0;
    const score=[['sampleApproved',20],['tracking',15],['returns',15],['response',10],['compliance',20],['backupSupplier',20]].reduce((t,[k,w])=>t+(input[k]?w:0),0);
    return {landedCost:landed,grossProfit:gross,grossMarginPercent:margin,reliabilityScore:score};
  }

  function calculateCod(input){
    const orders=Math.max(0,num(input.orders)), selling=num(input.sellingPrice), landed=num(input.landedCost), forward=num(input.forwardShipping), reverse=num(input.reverseShipping), adSpend=num(input.adSpend), paymentFeePct=num(input.paymentFeePct);
    const deliveryRate=clamp(input.deliveryRate,0,100)/100, delivered=orders*deliveryRate, rto=orders-delivered, revenue=delivered*selling;
    const productCost=delivered*landed, forwardCost=orders*forward, reverseCost=rto*reverse, paymentFees=revenue*(paymentFeePct/100);
    const contribution=money(revenue-productCost-forwardCost-reverseCost-paymentFees-adSpend);
    return {orders:money(orders),deliveredOrders:money(delivered),rtoOrders:money(rto),revenue:money(revenue),productCost:money(productCost),forwardShippingCost:money(forwardCost),reverseShippingCost:money(reverseCost),paymentFees:money(paymentFees),adSpend:money(adSpend),contributionProfit:contribution,contributionPerOrder:orders>0?money(contribution/orders):0,contributionPerDeliveredOrder:delivered>0?money(contribution/delivered):0};
  }

  function compareCompetitors(items){
    const clean=(items||[]).filter(x=>x&&String(x.name||'').trim()).map(x=>{
      const score=money((clamp(x.offerClarity,0,10)+clamp(x.socialProof,0,10)+clamp(x.creativeQuality,0,10)+clamp(x.deliveryTrust,0,10)+clamp(x.differentiation,0,10))/5);
      return {name:String(x.name).trim(),price:num(x.price),score,notes:String(x.notes||'').trim()};
    });
    return clean.sort((a,b)=>b.score-a.score);
  }

  function creativePlan(input){
    const product=String(input.product||'Product').trim()||'Product';
    const problem=String(input.problem||'the customer problem').trim()||'the customer problem';
    const proof=String(input.proof||'a clear product demonstration').trim()||'a clear product demonstration';
    return [
      {angle:'Problem/Solution',hook:'Still struggling with '+problem+'?',body:'Show the pain point, reveal '+product+', then demonstrate the outcome.',proof,cta:'See how it works.'},
      {angle:'Demo First',hook:'Watch this before you buy another alternative.',body:'Open with the strongest visual demo of '+product+' and explain only what viewers can see.',proof,cta:'Check the full product details.'},
      {angle:'Objection',hook:'Is '+product+' actually worth it?',body:'Address the biggest likely objection, then support the answer with a realistic use case.',proof,cta:'Compare it for yourself.'}
    ];
  }

  function auditProductPage(input){
    const checks=[
      ['clearHeadline',12,'Use a benefit-led headline that explains the main outcome.'],
      ['demoAboveFold',12,'Show a clear product demo or visual near the top.'],
      ['priceVisible',8,'Make the price and offer easy to find.'],
      ['trustSignals',10,'Add genuine trust signals such as policy clarity, secure checkout, or verifiable reviews.'],
      ['benefitSections',10,'Explain benefits and use cases, not just features.'],
      ['objectionFaq',10,'Answer the most important objections in an FAQ.'],
      ['shippingClarity',10,'State realistic shipping expectations clearly.'],
      ['returnsClarity',8,'Explain returns/refunds without hiding conditions.'],
      ['mobileFriendly',10,'Check mobile readability, spacing and tap targets.'],
      ['ctaRepeated',10,'Repeat a clear CTA at logical points on long pages.']
    ];
    let score=0; const recommendations=[];
    for(const [key,weight,rec] of checks){if(input[key]) score+=weight; else recommendations.push(rec);}
    return {score,recommendations};
  }


  function scoreOpportunity(input){
    const demand=clamp(input.demandEvidence,0,10);
    const margin=clamp(input.marginPotential,0,10);
    const logistics=clamp(input.logisticsEase,0,10);
    const creative=clamp(input.creativePotential,0,10);
    const competition=clamp(input.competitionAdvantage,0,10);
    const weights={demand:0.3,margin:0.25,logistics:0.15,creative:0.2,competition:0.1};
    const weighted=money(
      demand*weights.demand+
      margin*weights.margin+
      logistics*weights.logistics+
      creative*weights.creative+
      competition*weights.competition
    );
    const score=money(weighted*10);
    const notes=[];
    if(demand<6) notes.push('Demand evidence is weak or incomplete.');
    if(margin<6) notes.push('Margin potential needs improvement or better sourcing.');
    if(logistics<6) notes.push('Logistics complexity may create delivery or RTO risk.');
    if(creative<6) notes.push('The product may be difficult to demonstrate in ads.');
    if(competition<6) notes.push('Differentiation versus alternatives is not yet strong.');
    return {
      score,
      components:{demandEvidence:demand,marginPotential:margin,logisticsEase:logistics,creativePotential:creative,competitionAdvantage:competition},
      weights,
      notes,
      methodology:'Weighted score from explicit user-provided inputs. This is not live market validation.'
    };
  }

  function validateMarketTemplate(template){
    if(!template || typeof template!=='object') return {valid:false,errors:['Template must be an object.']};
    const errors=[];
    if(template.schemaVersion!==1) errors.push('schemaVersion must be 1.');
    if(!String(template.id||'').trim()) errors.push('id is required.');
    if(!String(template.name||'').trim()) errors.push('name is required.');
    if(!Array.isArray(template.checks) || template.checks.length===0) errors.push('checks must be a non-empty array.');
    if(Array.isArray(template.checks)){
      template.checks.forEach((c,i)=>{
        if(!String(c.key||'').trim()) errors.push('checks['+i+'].key is required.');
        if(!String(c.label||'').trim()) errors.push('checks['+i+'].label is required.');
        if(c.weight!=null && (num(c.weight)<0 || num(c.weight)>100)) errors.push('checks['+i+'].weight must be between 0 and 100.');
      });
    }
    return {valid:errors.length===0,errors};
  }

  function briefToMarkdown(brief){
    const s=brief.snapshot, section=(title,items)=>'## '+title+'\n'+items.map(x=>'- '+x).join('\n')+'\n';
    return '# Dropshipping Research Brief\n\n**Product:** '+s.product+'\n\n**Market:** '+s.market+'\n\n**Category:** '+s.category+'\n\n**Planned price:** '+s.price+'\n\n**Problem / desired outcome:** '+s.problem+'\n\n'+section('Audience hypotheses',brief.audience)+'\n'+section('Positioning ideas',brief.positioning)+'\n'+section('Creative angles',brief.angles)+'\n'+section('Product-page prompts',brief.productPage)+'\n'+section('Risk checklist',brief.risks)+'\n'+section('Minimum validation plan',brief.validation);
  }

  function briefToCsv(brief){
    const rows=[['section','item']], add=(name,items)=>items.forEach(x=>rows.push([name,x]));
    rows.push(['snapshot','Product: '+brief.snapshot.product],['snapshot','Market: '+brief.snapshot.market],['snapshot','Category: '+brief.snapshot.category],['snapshot','Planned price: '+brief.snapshot.price],['snapshot','Problem: '+brief.snapshot.problem]);
    add('audience',brief.audience);add('positioning',brief.positioning);add('creative_angles',brief.angles);add('product_page',brief.productPage);add('risks',brief.risks);add('validation',brief.validation);
    const q=v=>'"'+String(v).replace(/"/g,'""')+'"'; return rows.map(r=>r.map(q).join(',')).join('\n');
  }

  function createWorkspace(data){
    return {
      schemaVersion:1,
      savedAt:new Date().toISOString(),
      product:data&&data.product?data.product:{},
      opportunity:data&&data.opportunity?data.opportunity:{},
      supplier:data&&data.supplier?data.supplier:{},
      cod:data&&data.cod?data.cod:{},
      competitors:Array.isArray(data&&data.competitors)?data.competitors:[],
      creative:data&&data.creative?data.creative:{},
      cro:data&&data.cro?data.cro:{}
    };
  }

  function exportWorkspace(workspace){
    const w=createWorkspace(workspace||{});
    return JSON.stringify(w,null,2);
  }

  function importWorkspace(text){
    let parsed;
    try{parsed=typeof text==='string'?JSON.parse(text):text;}catch(e){throw new Error('Workspace JSON is invalid.');}
    if(!parsed || parsed.schemaVersion!==1) throw new Error('Unsupported workspace schema version.');
    return createWorkspace(parsed);
  }

  return {buildBrief,evaluateSupplier,calculateCod,compareCompetitors,creativePlan,auditProductPage,scoreOpportunity,validateMarketTemplate,briefToMarkdown,briefToCsv,createWorkspace,exportWorkspace,importWorkspace};
});