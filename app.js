const $=id=>document.getElementById(id),v=id=>$(id).value,c=id=>$(id).checked;
const esc=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[x]));
const list=a=>'<ul>'+a.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
let currentBrief=null;

function panel(name){
  document.querySelectorAll('.panel').forEach(p=>p.hidden=p.dataset.panel!==name);
  document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===name)));
  history.replaceState(null,'','#'+name);
}
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>panel(b.dataset.tab)));

function product(){return {product:v('product'),market:v('market'),category:v('category'),price:v('price'),problem:v('problem')}}
function opportunity(){return {demandEvidence:v('demand'),marginPotential:v('margin'),logisticsEase:v('logistics'),creativePotential:v('creativeScore'),competitionAdvantage:v('competition')}}
function supplier(){return {unitCost:v('sUnit'),shipping:v('sShip'),duties:v('sDuty'),packaging:v('sPack'),paymentFees:v('sFees'),sellingPrice:v('sSell'),sampleApproved:c('sampleApproved'),tracking:c('tracking'),returns:c('returns'),response:c('response'),compliance:c('compliance'),backupSupplier:c('backupSupplier')}}
function cod(){return {orders:v('cOrders'),deliveryRate:v('cRate'),sellingPrice:v('cSell'),landedCost:v('cLanded'),forwardShipping:v('cForward'),reverseShipping:v('cReverse'),adSpend:v('cAds'),paymentFeePct:v('cFeePct')}}
function comps(){return [{name:v('compA'),price:v('compAPrice'),offerClarity:v('a1'),socialProof:v('a2'),creativeQuality:v('a3'),deliveryTrust:v('a4'),differentiation:v('a5')},{name:v('compB'),price:v('compBPrice'),offerClarity:v('b1'),socialProof:v('b2'),creativeQuality:v('b3'),deliveryTrust:v('b4'),differentiation:v('b5')}]}
function creative(){return {product:v('crProduct'),problem:v('crProblem'),proof:v('crProof')}}
function cro(){const o={};['clearHeadline','demoAboveFold','priceVisible','trustSignals','benefitSections','objectionFaq','shippingClarity','returnsClarity','mobileFriendly','ctaRepeated'].forEach(id=>o[id]=c(id));return o}
function workspace(){return DropshippingResearch.createWorkspace({product:product(),opportunity:opportunity(),supplier:supplier(),cod:cod(),competitors:comps(),creative:creative(),cro:cro()})}

function set(id,x){if($(id))$(id).value=x??''} function tick(id,x){if($(id))$(id).checked=!!x}
function apply(w){
  const p=w.product||{};['product','market','category','price','problem'].forEach(k=>set(k,p[k]));
  const o=w.opportunity||{};set('demand',o.demandEvidence);set('margin',o.marginPotential);set('logistics',o.logisticsEase);set('creativeScore',o.creativePotential);set('competition',o.competitionAdvantage);
  const s=w.supplier||{};set('sUnit',s.unitCost);set('sShip',s.shipping);set('sDuty',s.duties);set('sPack',s.packaging);set('sFees',s.paymentFees);set('sSell',s.sellingPrice);['sampleApproved','tracking','returns','response','compliance','backupSupplier'].forEach(id=>tick(id,s[id]));
  const d=w.cod||{};set('cOrders',d.orders);set('cRate',d.deliveryRate);set('cSell',d.sellingPrice);set('cLanded',d.landedCost);set('cForward',d.forwardShipping);set('cReverse',d.reverseShipping);set('cAds',d.adSpend);set('cFeePct',d.paymentFeePct);
  (w.competitors||[]).slice(0,2).forEach((x,i)=>{const L=i?'B':'A',P=i?'b':'a';set('comp'+L,x.name);set('comp'+L+'Price',x.price);set(P+'1',x.offerClarity);set(P+'2',x.socialProof);set(P+'3',x.creativeQuality);set(P+'4',x.deliveryTrust);set(P+'5',x.differentiation)});
  const cr=w.creative||{};set('crProduct',cr.product);set('crProblem',cr.problem);set('crProof',cr.proof);Object.entries(w.cro||{}).forEach(([k,x])=>tick(k,x));
}
function saveLocal(){localStorage.setItem('dropshippingResearchWorkspace',DropshippingResearch.exportWorkspace(workspace()));$('saveStatus').textContent='Saved locally on this device.'}
function loadLocal(){const raw=localStorage.getItem('dropshippingResearchWorkspace');if(!raw){$('saveStatus').textContent='No saved workspace found.';return}try{apply(DropshippingResearch.importWorkspace(raw));$('saveStatus').textContent='Loaded saved workspace.'}catch(e){$('saveStatus').textContent=e.message}}
function clearLocal(){localStorage.removeItem('dropshippingResearchWorkspace');$('saveStatus').textContent='Local workspace cleared.'}
function download(name,text,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
async function importFile(file){if(!file)return;try{apply(DropshippingResearch.importWorkspace(await file.text()));$('saveStatus').textContent='Workspace imported.'}catch(e){$('saveStatus').textContent=e.message}}

function brief(){try{currentBrief=DropshippingResearch.buildBrief(product())}catch(e){$('researchOut').textContent=e.message;return}const b=currentBrief,s=b.snapshot;$('researchOut').innerHTML='<h3>'+esc(s.product)+'</h3><p>'+esc(s.market)+' • '+esc(s.category)+' • '+esc(s.price)+'</p><h4>Audience</h4>'+list(b.audience)+'<h4>Positioning</h4>'+list(b.positioning)+'<h4>Creative angles</h4>'+list(b.angles)+'<h4>Risks</h4>'+list(b.risks)+'<h4>Validation</h4>'+list(b.validation)}
function score(){const r=DropshippingResearch.scoreOpportunity(opportunity());$('scoreOut').innerHTML='<div class="metric">'+r.score+'/100</div><p>'+esc(r.methodology)+'</p>'+(r.notes.length?'<h4>Watch-outs</h4>'+list(r.notes):'<p>No major weak area in the entered scores.</p>')}
function supplierCalc(){const r=DropshippingResearch.evaluateSupplier(supplier());$('supplierOut').innerHTML='<div class="metric">'+r.landedCost+'</div><p>Landed cost</p><p>Gross profit: <b>'+r.grossProfit+'</b><br>Gross margin: <b>'+r.grossMarginPercent+'%</b><br>Readiness: <b>'+r.reliabilityScore+'/100</b></p>'}
function codCalc(){const r=DropshippingResearch.calculateCod(cod());$('codOut').innerHTML='<div class="metric">'+r.contributionProfit+'</div><p>Estimated contribution</p><p>Delivered: <b>'+r.deliveredOrders+'</b> • RTO: <b>'+r.rtoOrders+'</b><br>Revenue: <b>'+r.revenue+'</b><br>Contribution/order: <b>'+r.contributionPerOrder+'</b></p>'}
function compare(){const r=DropshippingResearch.compareCompetitors(comps());$('compOut').innerHTML=r.length?r.map((x,i)=>'<p><b>#'+(i+1)+' '+esc(x.name)+'</b> — '+x.score+'/10 • price '+x.price+'</p>').join(''):'<p>Add at least one competitor.</p>'}
function creativePlan(){const r=DropshippingResearch.creativePlan(creative());$('creativeOut').innerHTML=r.map(x=>'<h4>'+esc(x.angle)+'</h4><p><b>Hook:</b> '+esc(x.hook)+'<br><b>Body:</b> '+esc(x.body)+'<br><b>Proof:</b> '+esc(x.proof)+'<br><b>CTA:</b> '+esc(x.cta)+'</p>').join('')}
function audit(){const r=DropshippingResearch.auditProductPage(cro());$('auditOut').innerHTML='<div class="metric">'+r.score+'/100</div>'+(r.recommendations.length?'<h4>Next improvements</h4>'+list(r.recommendations):'<p>All checklist items are covered. Validate quality, not just presence.</p>')}

[['generateBrief',brief],['scoreOpp',score],['supplierCalc',supplierCalc],['codCalc',codCalc],['compare',compare],['creativePlan',creativePlan],['audit',audit],['saveLocal',saveLocal],['loadLocal',loadLocal],['clearLocal',clearLocal],['exportWorkspace',()=>download('dropshipping-workspace.json',DropshippingResearch.exportWorkspace(workspace()),'application/json')]].forEach(([id,fn])=>$(id).addEventListener('click',fn));
$('importWorkspace').addEventListener('change',e=>importFile(e.target.files[0]));
panel((location.hash||'#research').slice(1));