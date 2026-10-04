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
const path=location.pathname.replace(/^\/foodwise-school-network/,'').replace(/\/$/,'')||'/';
function Teacher(){return <><SiteHeader active="teacher"/><main className="themed-page page-teacher"><PageBanner page="teacher"/><section className="workspace"><article className="panel join-form"><h2>教師填報與共同資料</h2><p style={{fontSize:16,lineHeight:1.9}}>這裡是 GitHub Pages 公開展示版。每日量測、學校申請與行動發布，請前往原本的教師平台登入；填報者仍須取得網站存取與所屬學校權限。</p><a className="btn" href="https://foodwise-school-network.janejane87925186.chatgpt.site/teacher">前往教師填報平台 →</a><p className="small-note">公開儀表板使用經核對後發布的資料快照，不會即時同步教師平台；未填報顯示待量測。</p></article></section></main></>;}
const page=path==='/observatory'?<Platform page="observe"/>:path==='/actions'?<Platform page="actions"/>:path==='/resources'?<Platform page="resources"/>:path==='/teacher'?<Teacher/>:path==='/about'?<About/>:path==='/knowledge'?<Knowledge/>:path==='/champions'?<Champions/>:<Home/>;
createRoot(document.getElementById('root')!).render(page);
