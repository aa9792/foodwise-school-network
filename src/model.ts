export type School={id:string;name:string;region:string};
export type MealRecord={id:string;schoolId:string;date:string;cohort:string;phase:'baseline'|'action'|'followup';participants:number;plateG:number;unservedG:number;inedibleG:number|null;menu:string;note:string;version:string;updatedAt:string};
export type Action={id:string;schoolId:string;title:string;body:string;lesson:number;date:string};
export const CORE_SCHOOLS:School[]=[{id:'changxing',name:'長興國小',region:'三校共學夥伴'},{id:'gangxi',name:'港西國小',region:'三校共學夥伴'},{id:'changle',name:'長樂國小',region:'三校共學夥伴'}];
export const PHASES={baseline:'基線期',action:'行動期',followup:'追蹤期'};
export const LESSONS=['餐桶裡的線索','一口食物的旅程','秤重也要公平','可信的紀錄','五天一張圖','AI分析要查證','先聽懂，再行動','三校同行動卡','修正也是一種能力','讓改善有證據','我們是模組檢核員','把方法交給下一班'];
export function periodValue(rows:MealRecord[]){const people=rows.reduce((a,r)=>a+r.participants,0);return people>0?rows.reduce((a,r)=>a+r.plateG+r.unservedG,0)/people:null;}
export function comparablePeriods(b:MealRecord[],a:MealRecord[]){
 const dates=(rows:MealRecord[])=>[...new Set(rows.map(r=>r.date))].sort();
 const bd=dates(b),ad=dates(a);if(bd.length<5||ad.length<5||bd[bd.length-1]>=ad[0])return false;
 const scopes=(rows:MealRecord[])=>[...new Set(rows.map(r=>r.cohort))].sort();const bs=scopes(b),as=scopes(a);
 if(bs.join('|')!==as.join('|'))return false;
 return bs.every(c=>dates(b.filter(r=>r.cohort===c)).join('|')===bd.join('|')&&dates(a.filter(r=>r.cohort===c)).join('|')===ad.join('|'));
}
export function validateMeal(value:unknown,today=new Date().toISOString().slice(0,10)){
 const v=value as Record<string,unknown>;if(!v||typeof v!=='object')throw Error('資料格式不正確。');
 const str=(k:string,max:number)=>{if(typeof v[k]!=='string'||(v[k] as string).length>max)throw Error(`${k}欄位不正確。`);return (v[k] as string).trim();};
 const date=str('date',10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||date>today)throw Error('請填有效且不晚於今天的量測日期。');
 const cohort=str('cohort',40);if(!cohort)throw Error('請填量測範圍，例如四年甲班；前後期使用相同範圍。');
 const phase=str('phase',16);if(!['baseline','action','followup'].includes(phase))throw Error('量測期別不正確。');
 const num=(k:string,max:number)=>{if(typeof v[k]!=='number'||!Number.isFinite(v[k])||(v[k] as number)<0||(v[k] as number)>max)throw Error('人數或重量不正確；缺漏請先補量，不可填0。');return v[k] as number;};
 const participants=num('participants',10000);if(!Number.isInteger(participants)||participants<1)throw Error('用餐人數需為1至10000的整數。');
 const plateG=num('plateG',10000000),unservedG=num('unservedG',10000000);const inedibleG=v.inedibleG===null?null:num('inedibleG',10000000);
 const version=str('version',32);if(!version)throw Error('請填教案版本。');
 if(v.confirmed!==true)throw Error('請確認已扣桶重、分類與人數核對完成。');
 return {date,cohort,phase:phase as MealRecord['phase'],participants,plateG,unservedG,inedibleG,menu:str('menu',200),note:str('note',600),version};
}
