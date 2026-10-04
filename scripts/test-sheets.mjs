import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import ts from 'typescript';
await fs.mkdir('.test-build',{recursive:true});
for(const name of ['model','sheets-data']){const source=(await fs.readFile('src/'+name+'.ts','utf8')).replace("'./model'","'./model.mjs'");await fs.writeFile('.test-build/'+name+'.mjs',ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);}
const {parseCsv,parseMeals,parseActions,loadPlatformData}=await import('../.test-build/sheets-data.mjs');
assert.deepEqual(parseCsv('title,body\r\n"豆,米","觀察\n再分享"\r\n').rows,[{title:'豆,米',body:'觀察\n再分享'}]);
const header='date,schoolId,cohort,phase,participants,plateG,unservedG,inedibleG,version,updatedAt\n';
const row='2026-09-01,changxing,四年甲班,baseline,25,0,0,,v1,\n';
const parsed=parseMeals(header+row);assert.equal(parsed[0].plateG,0);assert.equal(parsed[0].inedibleG,null);
assert.equal(parseMeals(header).length,0);assert.throws(()=>parseMeals(header+row+row),/重複/);
assert.throws(()=>parseMeals(header+row.replace(',25,0,0,',',25,,0,')),/缺漏/);
assert.throws(()=>parseMeals(header+row.replace('2026-09-01','2026-02-30')),/日期/);
assert.throws(()=>parseMeals(header+row.replace(',25,',',0,')),/正整數/);
assert.throws(()=>parseMeals(header+row.replace('changxing','unknown')),/學校代碼/);
assert.equal(parseActions('date,schoolId,title,body,lesson,updatedAt\n').length,0);
const live=await loadPlatformData();assert.equal(live.schools.length,3);assert.equal(live.records.length,0);assert.equal(live.actions.length,0);
console.log('CSV parsing, missing values, duplicate records, date validation and live Google Sheets reads passed.');
