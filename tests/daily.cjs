const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const {gameDate,nextReset,selectedForDate}=require('../assets/daily-core.js');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const points=JSON.parse(html.match(/<script type="application\/json" id="point-data">([\s\S]*?)<\/script>/)[1]);
assert.deepEqual(points.map(p=>p.id),Array.from({length:26},(_,i)=>i+1));
assert.equal(points[0].name,'入口上方平台');
assert.deepEqual(selectedForDate('2026-09-19'),[17,18,13,2,11,12,26,7,22,5,14,16]);
for(const [instant,date,reset] of [
 ['2026-09-19T06:59:59Z','2026-09-18','2026-09-19T07:00:00.000Z'],
 ['2026-09-19T07:00:00Z','2026-09-19','2026-09-20T07:00:00.000Z'],
 ['2026-01-19T07:59:59Z','2026-01-18','2026-01-19T08:00:00.000Z'],
 ['2026-03-08T08:00:00Z','2026-03-08','2026-03-09T07:00:00.000Z'],
 ['2026-11-01T07:00:00Z','2026-11-01','2026-11-02T08:00:00.000Z'],
 ['2026-12-31T23:59:59Z','2026-12-31','2027-01-01T08:00:00.000Z']
]){assert.equal(gameDate(new Date(instant)),date);assert.equal(nextReset(new Date(instant)).toISOString(),reset);}
for(let day=19000;day<23000;day++){
 const result=selectedForDate(new Date(day*86400000).toISOString().slice(0,10));
 assert.equal(new Set(result).size,12);assert(result.every(id=>id>=1&&id<=26));
}
assert(html.includes('src="assets/cafe-map.jpg"'));
for(const file of ['cafe-map.jpg','style.css','daily-core.js','app.js'])assert(fs.existsSync(path.join(root,'assets',file)));
assert(!html.includes('data:image/'));
for(const token of ['__CORE__','__POINTS__','__IMAGE__'])assert(!html.includes(token));
console.log('PASS: route labels, known day, 4000 dates, reset/DST boundaries, static resources.');
