import {mkdir,readFile,writeFile} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
for(const route of ['observatory','actions','resources','teacher','about','knowledge','champions']){await mkdir('dist/'+route,{recursive:true});await writeFile('dist/'+route+'/index.html',html);}
await writeFile('dist/.nojekyll','');
