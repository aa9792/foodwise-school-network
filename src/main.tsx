import React from 'react';
import {createRoot} from 'react-dom/client';
import Home from './home';
import Platform from './platform';
import About from './about/page';
import Knowledge from './knowledge/page';
import Champions from './champions/page';
import {SiteHeader} from './site-header';
import {PageBanner} from './page-banner';
import './globals.css';
import {SHEET_URL} from './sheets-data';
const path=location.pathname.replace(/^\/foodwise-school-network/,'').replace(/\/$/,'')||'/';
function Teacher(){return <><SiteHeader active="teacher"/><main className="themed-page page-teacher"><PageBanner page="teacher"/><section className="workspace"><div className="teacher-grid"><article className="panel entry-form"><h2>每日剩食量測</h2><p className="sheet-entry-copy">長興、港西、長樂共用同一份 Google 試算表。請記錄扣除桶重後的P、U、實際用餐人數、量測範圍及期別。</p><a className="btn" href={SHEET_URL+'#gid=1456762182'} target="_blank" rel="noopener noreferrer">開啟 Google 量測紀錄 →</a></article><article className="panel action-form"><h2>學校行動紀錄</h2><p className="sheet-entry-copy">分享實際做法、發現與下一步，填寫對應節次，讓三校能看見彼此的惜食行動。</p><a className="btn orange" href={SHEET_URL+'#gid=137292527'} target="_blank" rel="noopener noreferrer">開啟 Google 行動紀錄 →</a></article></div><section className="principles sheet-flow"><div><span>01</span><h3>用 Google 帳號填報</h3><p>編輯需由管理者分享試算表權限。學校代碼依序為 changxing、gangxi、changle。</p></div><div><span>02</span><h3>核對後再公開</h3><p>先檢查人數、重量、日期、量測範圍與版本，公開狀態選「已核對」。修改請更新原列，避免重複。</p></div><div><span>03</span><h3>三校一起看見</h3><p>網站每60秒重新讀取公開分頁。Google發布更新可能需數分鐘；未填報不視為零。</p></div></section><p className="small-note">只填學校、班級彙總，不填學生姓名或個人健康資料。原始紀錄維持受限分享；網站只讀取兩個已發布的公開分頁。</p><a className="text-btn" href={SHEET_URL+'#gid=1659081743'} target="_blank" rel="noopener noreferrer">查看完整填報說明 →</a></section></main></>;}
const page=path==='/observatory'?<Platform page="observe"/>:path==='/actions'?<Platform page="actions"/>:path==='/resources'?<Platform page="resources"/>:path==='/teacher'?<Teacher/>:path==='/about'?<About/>:path==='/knowledge'?<Knowledge/>:path==='/champions'?<Champions/>:<Home/>;
createRoot(document.getElementById('root')!).render(page);
