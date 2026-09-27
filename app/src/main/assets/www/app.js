
const MIN_DATE='2026-09-01', MAX_DATE='9999-12-31';
const LS_PLANS='predication_plans_v3', LS_LOGS='predication_logs_v3', LS_GOALS='predication_goals_v3', LS_PROFILE='predication_profile_v1', LS_PROFILE_HISTORY='predication_profile_history_v1', LS_AUX='predication_aux_months_v1', LS_PREACHED='predication_preached_months_v1', LS_CARRY='predication_minute_carry_v1';
const oldPlans=JSON.parse(localStorage.getItem('predication_plans_v2')||'null');
const oldLogs=JSON.parse(localStorage.getItem('predication_logs_v2')||'null');
const seedRaw=[
['2026-09-02','Prédication',5],['2026-09-04','Prédication',5],['2026-09-05','Prédication',5],['2026-09-06','Prédication',2,'Dimanche'],['2026-09-09','Prédication',5],['2026-09-11','Prédication',5],['2026-09-12','Prédication',5],['2026-09-18','Prédication',5],['2026-09-19','Prédication',4],['2026-09-25','Béthel/LDC',36,'Week-end Béthel 1'],
['2026-10-02','Prédication',5],['2026-10-03','Prédication',5],['2026-10-04','Prédication',2,'Dimanche'],['2026-10-07','Prédication',5],['2026-10-09','Prédication',5],['2026-10-10','Prédication',5],['2026-10-14','Prédication',5],['2026-10-16','Prédication',5],
['2026-11-04','Prédication',5],['2026-11-06','Prédication',5],['2026-11-07','Prédication',5],['2026-11-08','Prédication',2,'Dimanche'],['2026-11-11','Prédication',5],['2026-11-13','Prédication',5],['2026-11-14','Prédication',5],['2026-11-20','Prédication',5],['2026-11-21','Prédication',5],['2026-11-27','Prédication',5],['2026-11-28','Prédication',5],
['2026-12-02','Prédication',5],['2026-12-04','Prédication',5],['2026-12-05','Prédication',5],['2026-12-06','Prédication',2,'Dimanche'],['2026-12-09','Prédication',5],['2026-12-11','Prédication',5],['2026-12-12','Prédication',5],['2026-12-18','Prédication',5],['2026-12-19','Prédication',5],['2026-12-25','Prédication',5],['2026-12-26','Prédication',5],
['2027-01-01','Prédication',5],['2027-01-02','Prédication',5],['2027-01-03','Prédication',2,'Dimanche'],['2027-01-06','Prédication',5],['2027-01-08','Prédication',5],['2027-01-09','Prédication',5],['2027-01-13','Prédication',5],['2027-01-15','Prédication',5],['2027-01-16','Prédication',5],['2027-01-22','Prédication',5],['2027-01-23','Prédication',5],['2027-01-29','Prédication',5],['2027-01-30','Prédication',5],
['2027-02-03','Prédication',5],['2027-02-05','Prédication',5],['2027-02-06','Prédication',5],['2027-02-07','Prédication',2,'Dimanche'],['2027-02-10','Prédication',5],['2027-02-12','Prédication',5],['2027-02-13','Prédication',5],['2027-02-19','Prédication',5],['2027-02-20','Prédication',5],['2027-02-26','Prédication',5],['2027-02-27','Prédication',5],
['2027-03-03','Prédication',5],['2027-03-05','Prédication',5],['2027-03-06','Prédication',5],['2027-03-07','Prédication',2,'Dimanche'],['2027-03-10','Prédication',5],['2027-03-12','Prédication',5],['2027-03-13','Prédication',5],['2027-03-19','Prédication',5],['2027-03-20','Prédication',4],['2027-03-26','Béthel/LDC',36,'Week-end Béthel 2'],
['2027-04-02','Prédication',5],['2027-04-03','Prédication',5],['2027-04-04','Prédication',2,'Dimanche'],['2027-04-07','Prédication',5],['2027-04-09','Prédication',5],['2027-04-10','Prédication',5],['2027-04-14','Prédication',5],['2027-04-16','Prédication',5],['2027-04-17','Prédication',5],['2027-04-23','Prédication',5],['2027-04-24','Prédication',5],
['2027-05-09','Prédication',2,'Dimanche'],['2027-05-12','Prédication',5],['2027-05-14','Prédication',5],['2027-05-15','Prédication',5],['2027-05-19','Prédication',5],['2027-05-21','Prédication',5],['2027-05-22','Prédication',5],['2027-05-28','Prédication',5],['2027-05-29','Prédication',5],
['2027-06-02','Prédication',5],['2027-06-04','Prédication',5],['2027-06-05','Prédication',5],['2027-06-06','Prédication',2,'Dimanche'],['2027-06-09','Prédication',5],['2027-06-11','Prédication',5],['2027-06-12','Prédication',5],['2027-06-18','Prédication',5],['2027-06-19','Prédication',4],['2027-06-25','Béthel/LDC',36,'Week-end Béthel 3'],['2027-07-01','Prédication',10,'Objectif juillet'],['2027-08-01','Prédication',10,'Objectif août']
];
const seedPlans=seedRaw.map((x,i)=>({id:'seed-'+i,date:x[0],type:x[1],hours:x[2],note:x[3]||''}));
let plans=JSON.parse(localStorage.getItem(LS_PLANS)||'null') || (oldPlans?oldPlans.map(x=>({...x,type:x.type==='Béthel'?'Béthel/LDC':x.type})):seedPlans);
let logs=JSON.parse(localStorage.getItem(LS_LOGS)||'null') || oldLogs || [];
let goals=JSON.parse(localStorage.getItem(LS_GOALS)||'null') || {'2026':600};
let profile=localStorage.getItem(LS_PROFILE)||'regular600';
let profileHistory=JSON.parse(localStorage.getItem(LS_PROFILE_HISTORY)||'null') || [{from:'2026-09',profile}];
profileHistory=profileHistory.filter(x=>x&&x.from&&x.profile).sort((a,b)=>a.from.localeCompare(b.from));
if(!profileHistory.length)profileHistory=[{from:'2026-09',profile:'regular600'}];
let auxMonths=JSON.parse(localStorage.getItem(LS_AUX)||'{}');
let preachedMonths=JSON.parse(localStorage.getItem(LS_PREACHED)||'{}');
let minuteCarry=JSON.parse(localStorage.getItem(LS_CARRY)||'{}');
function persist(){normalizeRecordsToMinutesPrecision();localStorage.setItem(LS_PLANS,JSON.stringify(plans));localStorage.setItem(LS_LOGS,JSON.stringify(logs));localStorage.setItem(LS_GOALS,JSON.stringify(goals));localStorage.setItem(LS_PROFILE,profile);localStorage.setItem(LS_PROFILE_HISTORY,JSON.stringify(profileHistory));localStorage.setItem(LS_AUX,JSON.stringify(auxMonths));localStorage.setItem(LS_PREACHED,JSON.stringify(preachedMonths));localStorage.setItem(LS_CARRY,JSON.stringify(minuteCarry));renderAll()}

const APP_VERSION=22;
const DATA_SCHEMA_VERSION=2;
const LS_SCHEMA='predication_schema_version';
const LS_IMPORT_SAFETY='predication_pre_import_backup_v1';
function normalizeHourValue(v){const minutes=Math.max(0,Math.round((Number(v)||0)*60));return minutes/60}
function normalizeRecordsToMinutesPrecision(){
  plans=plans.map(x=>({...x,hours:normalizeHourValue(x.hours)}));
  logs=logs.map(x=>({...x,preach:normalizeHourValue(x.preach),bethel:normalizeHourValue(x.bethel)}));
  Object.keys(goals||{}).forEach(k=>goals[k]=normalizeHourValue(goals[k]));
}
function snapshotData(){return{app:'Suivi de prédication',version:APP_VERSION,schemaVersion:DATA_SCHEMA_VERSION,exportedAt:new Date().toISOString(),data:{plans,logs,goals,profileHistory,auxMonths,preachedMonths,minuteCarry}}}
function showAppError(message){const box=document.getElementById('appError');if(!box)return;box.textContent=message;box.classList.add('show');clearTimeout(showAppError._t);showAppError._t=setTimeout(()=>box.classList.remove('show'),6000)}
window.addEventListener('error',()=>showAppError("Une erreur est survenue. Tes données restent enregistrées."));
window.addEventListener('unhandledrejection',()=>showAppError("Une opération n’a pas pu être terminée. Tes données restent enregistrées."));

function pad(n){return String(n).padStart(2,'0')}function isoMonth(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}`}function isoDate(d){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}
function hoursToMinutes(v){return Math.max(0,Math.round((Number(v)||0)*60))}
function minutesToHoursValue(min){return Math.max(0,Number(min)||0)/60}
function fmt(v){const total=Math.max(0,Math.round((Number(v)||0)*60));const h=Math.floor(total/60),m=total%60;return `${h}:${String(m).padStart(2,'0')}h`}
function sum(a,f){return a.reduce((s,x)=>s+Number(f(x)||0),0)}function monthName(d){return d.toLocaleDateString('fr-BE',{month:'long',year:'numeric'}).replace(/^./,c=>c.toUpperCase())}
function serviceStartYear(date){return date.getMonth()>=8?date.getFullYear():date.getFullYear()-1}function serviceRange(y){return [`${y}-09-01`,`${y+1}-08-31`]}
function inRange(s,a,b){return s>=a&&s<=b}const profileNames={publisher:'Proclamateur',aux30:'Pionnier auxiliaire permanent',regular600:'Pionnier permanent',special90:'Pionnier spécial / missionnaire 90 h',special100:'Pionnier spécial / missionnaire 100 h'};function profileForMonth(k){let p=profileHistory[0]?.profile||'regular600';for(const h of profileHistory){if(h.from<=k)p=h.profile;else break}return p}function annualGoal(y){return Number(goals[y]??600)}function fixedMonthGoal(k){const p=profileForMonth(k);if(p==='aux30')return 30;if(p==='special90')return 90;if(p==='special100')return 100;if(p==='publisher')return Number(auxMonths[k]||0);return plannedMonth(k)}function isPublisherNormal(k){return profileForMonth(k)==='publisher'&&!Number(auxMonths[k]||0)}function fullRegularYear(y){for(let m=0;m<12;m++){const d=new Date(y,m+8,1);if(profileForMonth(isoMonth(d))!=='regular600')return false}return true}function activeProfileNow(){return profileForMonth(isoMonth(currentAllowedMonth()))}
function monthPlans(k){return plans.filter(x=>x.date.startsWith(k))}function monthLogs(k){return logs.filter(x=>x.date.startsWith(k))}
function plannedMonth(k){return sum(monthPlans(k),x=>x.hours)}function logPreach(k){return sum(monthLogs(k),x=>x.preach)}function logBethel(k){return sum(monthLogs(k),x=>x.bethel)}function logTotal(k){return logPreach(k)+logBethel(k)}function logCourses(k){return sum(monthLogs(k),x=>x.courses)}
function yearStats(y){const [a,b]=serviceRange(y),items=logs.filter(x=>inRange(x.date,a,b));const preach=sum(items,x=>x.preach),bethel=sum(items,x=>x.bethel);return{preach,bethel,total:preach+bethel}}
function plannedYear(y){const [a,b]=serviceRange(y);return sum(plans.filter(x=>inRange(x.date,a,b)),x=>x.hours)}function coursesYear(y){const [a,b]=serviceRange(y);return sum(logs.filter(x=>inRange(x.date,a,b)),x=>x.courses)}
function shiftMonthKey(k,delta){const [y,m]=k.split('-').map(Number),d=new Date(y,m-1+delta,1);return `${d.getFullYear()}-${pad(d.getMonth()+1)}`}
function carryIn(k){return Number(minuteCarry[shiftMonthKey(k,-1)]||0)}
function carryOut(k){return Number(minuteCarry[k]||0)}
function monthRawMinutes(k){return Math.round(logTotal(k)*60)}
function monthReportMinutes(k){return monthRawMinutes(k)+carryIn(k)-carryOut(k)}
function monthReportHours(k){return monthReportMinutes(k)/60}
function renderCarry(k){
  const pubNormal=isPublisherNormal(k);
  if(pubNormal){carryBox.classList.add('hidden');return}
  const incoming=carryIn(k),outgoing=carryOut(k),beforeOut=monthRawMinutes(k)+incoming,remainder=((beforeOut%60)+60)%60;
  if(outgoing){
    carryBox.classList.remove('hidden');
    carryText.innerHTML=`<strong>${outgoing} min</strong> reportées au mois suivant.`;
    carryButton.textContent='Annuler le report';
    carryButton.onclick=()=>{delete minuteCarry[k];persist()};
    return;
  }
  if(remainder){
    carryBox.classList.remove('hidden');
    const incomingText=incoming?` (dont ${incoming} min reçues du mois précédent)`:'';
    carryText.innerHTML=`Total avant report : <strong>${fmt(beforeOut/60)}</strong>${incomingText}.`;
    carryButton.textContent=`Reporter ${remainder} min`;
    carryButton.onclick=()=>{minuteCarry[k]=remainder;persist()};
  }else{
    carryBox.classList.add('hidden');
    carryButton.onclick=null;
  }
}

function smartText(goal,value,label='réalisé'){const diff=goal-value;if(diff>0)return `<b>${fmt(value)}</b> ${label} sur <b>${fmt(goal)}</b> • il manque <b>${fmt(diff)}</b>`;if(diff<0)return `<b>${fmt(value)}</b> ${label} sur <b>${fmt(goal)}</b> • objectif dépassé de <b>${fmt(-diff)}</b>`;return `<b>${fmt(value)}</b> ${label} sur <b>${fmt(goal)}</b> • objectif atteint`}
let today=new Date(); const appStartDate=new Date(2026,8,1); const initialCurrentMonth=currentAllowedMonth(); let homeMonth=isoMonth(initialCurrentMonth); let reportDate=new Date(initialCurrentMonth.getFullYear(),initialCurrentMonth.getMonth(),1); let calDate=new Date(initialCurrentMonth.getFullYear(),initialCurrentMonth.getMonth(),1); let reportYear=Math.max(2026,serviceStartYear(initialCurrentMonth));
function activityCreatedAt(x){
  const explicit=Number(x?.createdAt||0);
  if(explicit)return explicit;
  const m=String(x?.id||'').match(/^log-(\d+)$/);
  return m?Number(m[1]):0
}
function renderHome(){
  const k=homeMonth,done=logTotal(k),goal=fixedMonthGoal(k),left=Math.max(0,goal-done),pubNormal=isPublisherNormal(k);
  homeMonthLabel.textContent='Activité de prédication — '+monthName(new Date(k+'-01T12:00:00'));
  homeTotal.textContent=fmt(done);homePreach.textContent=fmt(logPreach(k));homeBethel.textContent=fmt(logBethel(k));homeCourses.textContent=String(logCourses(k));
  homeGoal.textContent=fmt(goal);homeLeft.textContent=fmt(left);homeProgress.style.width=(goal?Math.min(100,done/goal*100):0)+'%';
  homeHoursCard.classList.toggle('hidden',pubNormal);homeGoalCard.classList.toggle('hidden',pubNormal);publisherMonthCard.classList.toggle('hidden',!pubNormal);publisherAuxActions.classList.toggle('hidden',profileForMonth(k)!=='publisher');
  publisherMonthLabel.textContent=monthName(new Date(k+'-01T12:00:00'));publisherCourses.textContent=String(logCourses(k));publisherPreached.checked=!!preachedMonths[k];publisherAux15.classList.toggle('active',Number(auxMonths[k]||0)===15);publisherAux30.classList.toggle('active',Number(auxMonths[k]||0)===30);

  // "Dernières activités" prend toutes les activités enregistrées du mois,
  // y compris celles contenant uniquement des heures Béthel/LDC.
  const items=monthLogs(k).slice().sort((a,b)=>{
    const byDate=String(b.date||'').localeCompare(String(a.date||''));
    return byDate||activityCreatedAt(b)-activityCreatedAt(a)
  }).slice(0,5);
  recentLogs.innerHTML='';
  if(!items.length){recentLogs.innerHTML='<div class="empty-msg">Aucune activité enregistrée ce mois.</div>';return}
  items.forEach(x=>{
    const r=document.createElement('div');r.className='recent-row';
    let sub=[];
    const preach=Number(x.preach||0),bethel=Number(x.bethel||0);
    if(preach>0)sub.push('Prédication '+fmt(preach));
    if(bethel>0)sub.push('Béthel/LDC '+fmt(bethel));
    if(x.courses)sub.push(x.courses+' cours');
    if(x.preached)sub.push('Prêché durant le mois');
    if(!sub.length&&x.note)sub.push(x.note);
    r.innerHTML=`<div><b>${new Date(x.date+'T12:00').toLocaleDateString('fr-BE',{weekday:'short',day:'numeric',month:'short'})}</b><small>${sub.join(' • ')}</small></div><strong>${pubNormal?'':fmt(preach+bethel)}</strong>`;
    r.onclick=()=>openActivity(x);recentLogs.appendChild(r)
  })
}
function renderMonthReport(){const k=isoMonth(reportDate);reportMonthName.textContent=monthName(reportDate);const pubNormal=isPublisherNormal(k),p=profileForMonth(k);hoursMonthReportCard.classList.toggle('hidden',pubNormal);publisherMonthReportCard.classList.toggle('hidden',!pubNormal);monthSmartIndicator.classList.add('hidden');monthSmartIndicator.classList.remove('ok');if(pubNormal){reportPublisherPreached.checked=!!preachedMonths[k];reportPublisherCourses.textContent=String(logCourses(k));carryBox.classList.add('hidden');return}const done=monthReportHours(k),goal=(p==='aux30'||p==='special90'||p==='special100'||(p==='publisher'&&Number(auxMonths[k]||0)))?fixedMonthGoal(k):0;reportTotal.textContent=fmt(done);reportPreach.textContent=fmt(logPreach(k));reportBethel.textContent=fmt(logBethel(k));reportCourses.textContent=String(logCourses(k));if(goal){monthSmartIndicator.innerHTML=smartText(goal,done,'réalisées');monthSmartIndicator.classList.remove('hidden');if(done>=goal)monthSmartIndicator.classList.add('ok')}renderCarry(k)}
function renderYearReport(){const s=yearStats(reportYear),showGoal=fullRegularYear(reportYear),g=annualGoal(reportYear);reportYearName.textContent=`${reportYear}–${reportYear+1}`;yearTotal.textContent=fmt(s.total);yearPreach.textContent=fmt(s.preach);yearBethel.textContent=fmt(s.bethel);yearGoalRow.classList.toggle('hidden',!showGoal);yearProgressWrap.classList.toggle('hidden',!showGoal);yearSmartIndicator.classList.add('hidden');yearSmartIndicator.classList.remove('ok');if(showGoal){yearGoalLabel.textContent=fmt(g);yearProgress.style.width=(g?Math.min(100,s.total/g*100):0)+'%';yearSmartIndicator.innerHTML=smartText(g,s.total,'réalisées');yearSmartIndicator.classList.remove('hidden');if(s.total>=g)yearSmartIndicator.classList.add('ok')}}
function clampMonth(d){const min=new Date(2026,8,1),max=new Date(9999,11,1);if(d<min)return min;if(d>max)return max;return d}
function renderCalendar(){calDate=clampMonth(calDate);calMonthName.textContent=monthName(calDate);const k=isoMonth(calDate),p=profileForMonth(k);calMonthGoal.textContent=isPublisherNormal(k)?'—':fmt(fixedMonthGoal(k));const sy=serviceStartYear(calDate);publisherAuxRow.classList.toggle('hidden',p!=='publisher');publisherAuxSelect.value=String(auxMonths[k]||0);if(p==='publisher'){editYearGoal.classList.add('hidden')}else if(p==='regular600'){editYearGoal.classList.remove('hidden');calGoalButtonLabel.textContent='Objectif annuel :';calYearGoal.textContent=fmt(annualGoal(sy))}else{editYearGoal.classList.remove('hidden');calGoalButtonLabel.textContent='Objectif mensuel :';calYearGoal.textContent=fmt(fixedMonthGoal(k))}const special=p==='special90'||p==='special100';calPlannedTotalWrap.classList.toggle('hidden',!special);if(special)calPlannedTotal.textContent=fmt(plannedMonth(k));calendarSmartIndicator.classList.add('hidden');calendarSmartIndicator.classList.remove('ok');if(p==='regular600'){const g=annualGoal(sy),v=plannedYear(sy);calendarSmartIndicator.innerHTML=smartText(g,v,'planifiées');calendarSmartIndicator.classList.remove('hidden');if(v>=g)calendarSmartIndicator.classList.add('ok')}else if(!isPublisherNormal(k)){const g=fixedMonthGoal(k),v=plannedMonth(k);if(g){calendarSmartIndicator.innerHTML=smartText(g,v,'planifiées');calendarSmartIndicator.classList.remove('hidden');if(v>=g)calendarSmartIndicator.classList.add('ok')}}const first=new Date(calDate.getFullYear(),calDate.getMonth(),1),days=new Date(calDate.getFullYear(),calDate.getMonth()+1,0).getDate();let offset=(first.getDay()+6)%7;calendarGrid.innerHTML='';for(let i=0;i<offset;i++){const e=document.createElement('div');e.className='day empty';calendarGrid.appendChild(e)}for(let d=1;d<=days;d++){const date=new Date(calDate.getFullYear(),calDate.getMonth(),d),s=isoDate(date),items=plans.filter(x=>x.date===s),hours=sum(items,x=>x.hours),isBethel=items.some(x=>x.type==='Béthel/LDC'||x.type==='Béthel');const el=document.createElement('button');el.className='day'+(items.length?' has-plan':'')+(isBethel?' bethel':'')+(s===isoDate(today)?' today':'');el.innerHTML=`<span class="day-num">${d}</span>${items.length?'<span class="day-dot"></span>':''}${hours?`<span class="day-hours">${fmt(hours)}</span>`:''}`;el.onclick=()=>openPlan(s,items[0]||null);calendarGrid.appendChild(el)}calPrev.disabled=isoMonth(calDate)==='2026-09';calNext.disabled=isoMonth(calDate)==='9999-12'}



function buildPickerWheel(el,max){el.innerHTML='';for(let i=0;i<=max;i++){const d=document.createElement('div');d.className='picker-item';d.dataset.value=i;d.textContent=String(i).padStart(2,'0');el.appendChild(d)}}
function pickerClosest(el){const items=[...el.children],center=el.scrollTop+el.clientHeight/2;let best=items[0],dist=Infinity;items.forEach(it=>{const d=Math.abs((it.offsetTop+it.offsetHeight/2)-center);if(d<dist){dist=d;best=it}});return Number(best?.dataset.value||0)}
function pickerMark(el){const v=pickerClosest(el);[...el.children].forEach(it=>it.classList.toggle('active',Number(it.dataset.value)===v));return v}
function pickerScrollTo(el,val){const item=el.querySelector(`[data-value="${val}"]`);if(item)el.scrollTop=item.offsetTop-(el.clientHeight-item.offsetHeight)/2}
let activeTimeField=null;
buildPickerWheel(pickerHours,23);buildPickerWheel(pickerMinutes,59);
function openTimePicker(kind){activeTimeField=kind;const input=kind==='preach'?activityPreach:activityBethel;timePickerTitle.textContent=kind==='preach'?'Heures de prédication':'Heures Béthel/LDC';const total=Math.max(0,Math.round((Number(input.value)||0)*60));timePickerDialog.showModal();requestAnimationFrame(()=>{pickerScrollTo(pickerHours,Math.floor(total/60));pickerScrollTo(pickerMinutes,total%60);requestAnimationFrame(()=>{pickerMark(pickerHours);pickerMark(pickerMinutes)})})}
function syncPickerActive(){pickerMark(pickerHours);pickerMark(pickerMinutes)}
let pickerTimer;[pickerHours,pickerMinutes].forEach(w=>w.addEventListener('scroll',()=>{clearTimeout(pickerTimer);pickerTimer=setTimeout(syncPickerActive,60)},{passive:true}));
preachTimeButton.onclick=()=>openTimePicker('preach');bethelTimeButton.onclick=()=>openTimePicker('bethel');
pickerCancel.onclick=()=>timePickerDialog.close();
pickerConfirm.onclick=()=>{const h=pickerMark(pickerHours),m=pickerMark(pickerMinutes),val=h+m/60;if(activeTimeField==='preach'){activityPreach.value=String(val);preachTimeValue.textContent=`${h}:${String(m).padStart(2,'0')}h`}else{activityBethel.value=String(val);bethelTimeValue.textContent=`${h}:${String(m).padStart(2,'0')}h`}timePickerDialog.close()};
function setCompactTime(kind,value){const total=Math.max(0,Math.round((Number(value)||0)*60)),h=Math.floor(total/60),m=total%60;(kind==='preach'?preachTimeValue:bethelTimeValue).textContent=`${h}:${String(m).padStart(2,'0')}h`}


function renderPremiumHeader(){
  const d=currentAllowedMonth(),y=d.getFullYear(),m=d.getMonth()+1,sy=m>=9?y:y-1;
  const el=document.getElementById('premiumCurrentPeriod');
  if(el)el.textContent=`Année de service ${sy}–${sy+1}`;
}


function goToCurrentMonthFromTop(){
  const d=currentAllowedMonth();
  reportDate=new Date(d.getFullYear(),d.getMonth(),1);
  calendarDate=new Date(d.getFullYear(),d.getMonth(),1);
  renderAll();
}


const SWIPE_SCREENS=['homeScreen','reportScreen','calendarScreen'];

function activateMainScreen(screenId){
  const tab=document.querySelector(`.tab[data-screen="${screenId}"]`);
  if(!tab)return;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  const screen=document.getElementById(screenId);
  if(screen)screen.classList.add('active');

  const profileActions=document.querySelector('.profile-actions');
  if(profileActions)profileActions.classList.toggle('show-report',screenId==='reportScreen');

  if(screenId==='reportScreen')renderMonthReport();
  if(screenId==='calendarScreen')renderCalendar();
}

function currentMainScreenIndex(){
  const active=document.querySelector('.screen.active');
  const i=SWIPE_SCREENS.indexOf(active?.id||'');
  return i<0?0:i;
}

function setupSwipeNavigation(){
  const area=document.querySelector('.app');
  if(!area)return;

  let startX=0,startY=0,lastX=0,tracking=false;
  const threshold=55;
  const verticalTolerance=70;

  area.addEventListener('touchstart',e=>{
    if(e.touches.length!==1)return;
    const target=e.target;

    // Don't hijack gestures inside scrollable or interactive controls.
    if(target.closest('input,textarea,select,button,dialog,.time-wheel,.picker-wheel'))return;

    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    lastX=startX;
    tracking=true;
  },{passive:true});

  area.addEventListener('touchmove',e=>{
    if(!tracking||e.touches.length!==1)return;
    lastX=e.touches[0].clientX;
  },{passive:true});

  area.addEventListener('touchend',e=>{
    if(!tracking)return;
    tracking=false;

    const endX=(e.changedTouches&&e.changedTouches[0])?e.changedTouches[0].clientX:lastX;
    const endY=(e.changedTouches&&e.changedTouches[0])?e.changedTouches[0].clientY:startY;

    const dx=endX-startX;
    const dy=endY-startY;

    if(Math.abs(dx)<threshold)return;
    if(Math.abs(dy)>verticalTolerance)return;
    if(Math.abs(dx)<=Math.abs(dy))return;

    const current=currentMainScreenIndex();
    const next=dx<0?current+1:current-1;

    if(next<0||next>=SWIPE_SCREENS.length)return;

    activateMainScreen(SWIPE_SCREENS[next]);
  },{passive:true});
}

function renderAll(){renderPremiumHeader();profile=activeProfileNow();profileButton.textContent='Profil : '+profileNames[profile];renderHome();renderMonthReport();renderYearReport();renderCalendar()}
function currentAllowedDateString(){
  const current=isoDate(new Date());
  if(current<MIN_DATE)return MIN_DATE;
  if(current>MAX_DATE)return MAX_DATE;
  return current
}
function openActivity(item=null){
  const selectedDate=item?.date||currentAllowedDateString();
  activityId.value=item?.id||'';
  activityTitle.textContent=item?'Modifier l’activité':'Ajouter une activité';
  activityDate.min=MIN_DATE;activityDate.max=MAX_DATE;activityDate.value=selectedDate;
  const k=selectedDate.slice(0,7),pubNormal=isPublisherNormal(k);
  activityHoursRow.classList.toggle('hidden',pubNormal);activityPreachedField.classList.toggle('hidden',!pubNormal);
  activityPreached.checked=item?.preached||preachedMonths[k]||false;
  activityPreach.value=item?.preach||0;activityBethel.value=item?.bethel||0;activityCourses.value=item?.courses||0;activityNote.value=item?.note||'';
  deleteActivity.style.display=item?'block':'none';activityDialog.showModal();setCompactTime('preach',item?.preach||0);setCompactTime('bethel',item?.bethel||0)
}
function openPlan(date,item=null){planDate.value=date;planType.value=item?.type==='Béthel'?'Béthel/LDC':(item?.type||'Prédication');planHours.value=item?.hours??0;planNote.value=item?.note||'';planDialog.dataset.id=item?.id||'';deletePlan.style.display=item?'block':'none';planDialog.showModal()}
saveActivity.onclick=()=>{
  const id=activityId.value,k=activityDate.value.slice(0,7),pubNormal=isPublisherNormal(k),existing=id?logs.find(x=>x.id===id):null,now=Date.now();
  const obj={id:id||'log-'+now,date:activityDate.value,preach:pubNormal?0:(Number(activityPreach.value)||0),bethel:pubNormal?0:(Number(activityBethel.value)||0),courses:Number(activityCourses.value)||0,preached:pubNormal?activityPreached.checked:false,note:activityNote.value.trim(),createdAt:existing?.createdAt||now};
  if(pubNormal)preachedMonths[k]=activityPreached.checked;
  logs=id?logs.map(x=>x.id===id?obj:x):[...logs,obj];
  // Affiche immédiatement le mois dans lequel l'activité vient d'être enregistrée.
  homeMonth=k;
  activityDialog.close();persist()
};deleteActivity.onclick=()=>{if(activityId.value&&confirm('Supprimer cette activité ?')){logs=logs.filter(x=>x.id!==activityId.value);activityDialog.close();persist()}};
savePlan.onclick=()=>{const id=planDialog.dataset.id,obj={id:id||'plan-'+Date.now(),date:planDate.value,type:planType.value,hours:Number(planHours.value)||0,note:planNote.value.trim()};plans=id?plans.map(x=>x.id===id?obj:x):[...plans,obj];planDialog.close();persist()};deletePlan.onclick=()=>{const id=planDialog.dataset.id;if(id&&confirm('Supprimer ce programme ?')){plans=plans.filter(x=>x.id!==id);planDialog.close();persist()}};
addActivity.onclick=()=>openActivity();reportPrev.onclick=()=>{const d=new Date(reportDate);d.setMonth(d.getMonth()-1);reportDate=clampMonth(d);renderMonthReport()};reportNext.onclick=()=>{const d=new Date(reportDate);d.setMonth(d.getMonth()+1);reportDate=clampMonth(d);renderMonthReport()};yearPrev.onclick=()=>{if(reportYear>2026){reportYear--;renderYearReport()}};yearNext.onclick=()=>{if(reportYear<9998){reportYear++;renderYearReport()}};calPrev.onclick=()=>{const d=new Date(calDate);d.setMonth(d.getMonth()-1);calDate=clampMonth(d);renderCalendar()};calNext.onclick=()=>{const d=new Date(calDate);d.setMonth(d.getMonth()+1);calDate=clampMonth(d);renderCalendar()};
function currentAllowedMonth(){const now=new Date();const d=new Date(now.getFullYear(),now.getMonth(),1);return clampMonth(d)}
reportCurrent.onclick=()=>{if(monthReport.hidden){const now=currentAllowedMonth();reportYear=Math.max(2026,serviceStartYear(now));renderYearReport()}else{reportDate=currentAllowedMonth();renderMonthReport()}};
calCurrent.onclick=()=>{calDate=currentAllowedMonth();renderCalendar()};
resetMonthPlan.onclick=()=>{const k=isoMonth(calDate);const label=monthName(calDate);if(confirm(`Remettre à zéro tout le programme prévu pour ${label} ?\n\nLes activités déjà enregistrées dans Accueil/Rapport ne seront pas supprimées.`)){plans=plans.filter(x=>!x.date.startsWith(k));persist()}};
resetYearPlan.onclick=()=>{const y=serviceStartYear(calDate),[a,b]=serviceRange(y);if(confirm(`Remettre à zéro tout le calendrier prévu pour l’année de service ${y}–${y+1} ?\n\nLes activités déjà enregistrées dans Accueil/Rapport ne seront pas supprimées.`)){plans=plans.filter(x=>!inRange(x.date,a,b));persist()}};
reportMonthTab.onclick=()=>{reportMonthTab.classList.add('active');reportYearTab.classList.remove('active');monthReport.hidden=false;yearReport.hidden=true;reportCurrent.textContent='Mois en cours'};reportYearTab.onclick=()=>{reportYearTab.classList.add('active');reportMonthTab.classList.remove('active');monthReport.hidden=true;yearReport.hidden=false;reportCurrent.textContent='Année en cours'};
recentToggle.onclick=()=>{const open=recentCard.classList.toggle('open');recentToggle.setAttribute('aria-expanded',open?'true':'false')};
editYearGoal.onclick=()=>{if(profileForMonth(isoMonth(calDate))!=='regular600')return;const y=serviceStartYear(calDate);goalDialog.dataset.year=y;goalInput.value=annualGoal(y);goalDialog.showModal()};saveGoal.onclick=()=>{goals[goalDialog.dataset.year]=Number(goalInput.value)||0;goalDialog.close();persist()};

function renderProfileHistory(){profileHistoryList.innerHTML='';profileHistory.slice().sort((a,b)=>b.from.localeCompare(a.from)).forEach(h=>{const r=document.createElement('div');r.className='profile-history-row';const d=new Date(h.from+'-01T12:00:00');r.innerHTML=`<span>${monthName(d)}</span><b>${profileNames[h.profile]}</b>`;profileHistoryList.appendChild(r)})}
profileButton.onclick=()=>{const k=isoMonth(currentAllowedMonth());profileSelect.value=profileForMonth(k);profileFrom.value=k;renderProfileHistory();profileDialog.showModal()};
saveProfile.onclick=()=>{const from=profileFrom.value||isoMonth(currentAllowedMonth()),p=profileSelect.value;profileHistory=profileHistory.filter(x=>x.from!==from);profileHistory.push({from,profile:p});profileHistory.sort((a,b)=>a.from.localeCompare(b.from));profile=profileForMonth(isoMonth(currentAllowedMonth()));profileDialog.close();persist()};
publisherAuxSelect.onchange=()=>{const k=isoMonth(calDate),v=Number(publisherAuxSelect.value)||0;if(v)auxMonths[k]=v;else delete auxMonths[k];persist()};
function setHomeAux(hours){const k=homeMonth,current=Number(auxMonths[k]||0);if(current===hours)delete auxMonths[k];else auxMonths[k]=hours;persist()}
publisherAux15.onclick=()=>setHomeAux(15);publisherAux30.onclick=()=>setHomeAux(30);
publisherPreached.onchange=()=>{preachedMonths[homeMonth]=publisherPreached.checked;persist()};
activityDate.onchange=()=>{const k=activityDate.value.slice(0,7),pubNormal=isPublisherNormal(k);activityHoursRow.classList.toggle('hidden',pubNormal);activityPreachedField.classList.toggle('hidden',!pubNormal);activityPreached.checked=!!preachedMonths[k]};

function backupPayload(){return snapshotData()}
function downloadBackup(){const payload=backupPayload(),blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`sauvegarde-predication-v22-${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
async function shareBackupFile(){const payload=backupPayload(),blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),name=`sauvegarde-predication-v22-${new Date().toISOString().slice(0,10)}.json`,file=new File([blob],name,{type:'application/json'});if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){try{await navigator.share({title:'Sauvegarde prédication',text:'Sauvegarde de mes données de prédication',files:[file]});return}catch(e){if(e?.name==='AbortError')return}}downloadBackup();alert('Le partage direct de fichier n’est pas disponible ici. La sauvegarde a été téléchargée : tu peux ensuite la partager ou l’enregistrer où tu veux.')}
function validateBackupPayload(payload){
 const d=payload?.data||payload;
 if(!d||!Array.isArray(d.plans)||!Array.isArray(d.logs)||!Array.isArray(d.profileHistory))throw new Error('Fichier invalide');
 const valid=new Set(['publisher','aux30','regular600','special90','special100']);
 for(const h of d.profileHistory){if(!h||typeof h.from!=='string'||!valid.has(h.profile))throw new Error('Profils invalides')}
 return d
}
function applyBackup(payload){
 const d=validateBackupPayload(payload);
 localStorage.setItem(LS_IMPORT_SAFETY,JSON.stringify(snapshotData()));
 plans=d.plans.map(x=>({...x,hours:normalizeHourValue(x.hours)}));
 logs=d.logs.map(x=>({...x,preach:normalizeHourValue(x.preach),bethel:normalizeHourValue(x.bethel)}));
 goals=d.goals||{};Object.keys(goals).forEach(k=>goals[k]=normalizeHourValue(goals[k]));
 profileHistory=d.profileHistory;auxMonths=d.auxMonths||{};preachedMonths=d.preachedMonths||{};minuteCarry=d.minuteCarry||{};
 profile=profileForMonth(isoMonth(currentAllowedMonth()));localStorage.setItem(LS_SCHEMA,String(DATA_SCHEMA_VERSION));persist()
}
function currentReportText(){if(!yearReport.hidden){const s=yearStats(reportYear),lines=[`Rapport de prédication — année de service ${reportYear}–${reportYear+1}`,`Total d'heures : ${fmt(s.total)}`,`Heures de prédication : ${fmt(s.preach)}`,`Heures Béthel/LDC : ${fmt(s.bethel)}`,`Cours bibliques : ${coursesYear(reportYear)}`];if(fullRegularYear(reportYear))lines.push(`Objectif annuel : ${fmt(annualGoal(reportYear))}`,`Reste à faire : ${fmt(Math.max(0,annualGoal(reportYear)-s.total))}`);return lines.join('\n')}const k=isoMonth(reportDate),name=monthName(reportDate);if(isPublisherNormal(k))return [`Rapport de prédication — ${name}`,`Prêché durant le mois : ${preachedMonths[k]?'Oui':'Non'}`,`Cours bibliques : ${logCourses(k)}`].join('\n');const p=profileForMonth(k),goal=(p==='aux30'||p==='special90'||p==='special100'||(p==='publisher'&&Number(auxMonths[k]||0)))?fixedMonthGoal(k):0,done=monthReportHours(k),lines=[`Rapport de prédication — ${name}`,`Total d'heures : ${fmt(done)}`,`Heures de prédication : ${fmt(logPreach(k))}`,`Heures Béthel/LDC : ${fmt(logBethel(k))}`,`Cours bibliques : ${logCourses(k)}`];if(carryIn(k))lines.push(`Minutes reçues du mois précédent : ${carryIn(k)} min`);if(carryOut(k))lines.push(`Minutes reportées au mois suivant : ${carryOut(k)} min`);if(goal)lines.push(`Objectif du mois : ${fmt(goal)}`,`Reste à faire : ${fmt(Math.max(0,goal-done))}`);return lines.join('\n')}
async function shareCurrentReport(){const text=currentReportText();if(window.AndroidBridge&&typeof AndroidBridge.shareText==='function'){AndroidBridge.shareText('Rapport de prédication',text);return}if(navigator.share){try{await navigator.share({title:'Rapport de prédication',text});return}catch(e){if(e?.name==='AbortError')return}}if(navigator.clipboard){await navigator.clipboard.writeText(text);alert('Rapport copié.')}else{window.location.href='mailto:?subject='+encodeURIComponent('Rapport de prédication')+'&body='+encodeURIComponent(text)}}
dataButton.onclick=()=>dataDialog.showModal();exportData.onclick=downloadBackup;importData.onclick=()=>importFile.click();importFile.onchange=async()=>{const f=importFile.files?.[0];if(!f)return;try{const payload=JSON.parse(await f.text());if(confirm('Importer cette sauvegarde ? Les données actuelles de l’application seront remplacées.')){applyBackup(payload);dataDialog.close();alert('Sauvegarde importée avec succès.')}}catch(e){alert('Import impossible : le fichier est invalide ou incomplet. Tes données actuelles n’ont pas été supprimées.')}finally{importFile.value=''}};shareReport.onclick=shareCurrentReport;

document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>activateMainScreen(btn.dataset.screen));

const ONBOARDING_KEY='predication_onboarding_done_v1';
let onboardingSelectedProfile=null;

function clearAppForFirstUse(selectedProfile){
  plans=[];
  logs=[];
  goals={};
  auxMonths={};
  preachedMonths={};minuteCarry={};
  const startMonth='2026-09';
  profileHistory=[{from:startMonth,profile:selectedProfile}];
  profile=selectedProfile;
  try{
    localStorage.removeItem('predication_plans');
    localStorage.removeItem('predication_logs');
    localStorage.removeItem('predication_goals');
    localStorage.removeItem('predication_profile_history');
    localStorage.removeItem('predication_aux_months');
    localStorage.removeItem('predication_preached_months');localStorage.removeItem(LS_CARRY);
  }catch(e){}
  persist();
}

function setupOnboarding(){
  const done=localStorage.getItem(ONBOARDING_KEY)==='1';
  if(done) return;
  onboarding.classList.remove('hidden');
  onboardingStart.onclick=()=>{
    onboardingWelcome.classList.add('hidden');
    onboardingProfile.classList.remove('hidden');
  };
  onboardingOptions.querySelectorAll('button').forEach(btn=>{
    btn.onclick=()=>{
      onboardingOptions.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));
      btn.classList.add('selected');
      onboardingSelectedProfile=btn.dataset.profile;
      onboardingConfirm.disabled=false;
    };
  });
  onboardingConfirm.onclick=()=>{
    if(!onboardingSelectedProfile) return;
    clearAppForFirstUse(onboardingSelectedProfile);
    localStorage.setItem(ONBOARDING_KEY,'1');
    onboarding.classList.add('hidden');
    renderAll();
  };
}
function runDataMigration(){normalizeRecordsToMinutesPrecision();localStorage.setItem(LS_SCHEMA,String(DATA_SCHEMA_VERSION));localStorage.setItem(LS_PLANS,JSON.stringify(plans));localStorage.setItem(LS_LOGS,JSON.stringify(logs));localStorage.setItem(LS_GOALS,JSON.stringify(goals))}
runDataMigration();
setupOnboarding();

setupSwipeNavigation();
renderAll();if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js');

window.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('topCurrentMonth');if(b)b.onclick=goToCurrentMonthFromTop;});
