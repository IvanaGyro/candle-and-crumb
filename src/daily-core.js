const pacificDate = new Intl.DateTimeFormat('en-US', {timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'});
function gameDate(now = new Date()) {
  const p = Object.fromEntries(pacificDate.formatToParts(now).map(p=>[p.type,p.value]));
  return `${p.year}-${p.month}-${p.day}`;
}
function nextReset(now = new Date()) {
  const today = gameDate(now);
  let lo = now.getTime(), hi = lo + 27*3600000;
  while (hi-lo>1) { const mid=Math.floor((lo+hi)/2); if(gameDate(new Date(mid))===today) lo=mid; else hi=mid; }
  return new Date(hi);
}
function selectedForDate(date) {
  const day = Math.floor(Date.parse(date+'T00:00:00Z')/86400000);
  if (!Number.isFinite(day)) throw new Error('Invalid date');
  const mask=0xffffffffn, prime=0xfffffffbn;
  const permute = x=>{x&=mask;if(x>=prime)return x;const r=x*x%prime;return x<0x7ffffffen?r:prime-r;};
  const seed=(BigInt(day)*1000n+420206672n)&mask;
  const offset=permute((permute(seed)+0x46790905n)&mask);
  let counter=0x78ed20ccn;
  const result=new Set();
  for(let tries=0; result.size<12; tries++) {
    if(tries>100000)throw new Error('Cannot calculate locations');
    result.add(Number((permute((permute(counter)+offset)&mask)^0x5bf03635n)%26n)+1);
    counter=(counter+1n)&mask;
  }
  return [...result];
}
if(typeof module!=='undefined')module.exports={gameDate,nextReset,selectedForDate};
