import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
const root=process.cwd(), photos={HA:'houssam.webp',HH:'hamza.webp',HHd:'hiba.webp',MAT:'mohamed-ali.webp',WM:'wissal.webp'}
type Id=keyof typeof photos
type Contact={email?:string,phone?:string,linkedin?:string}
const ids=Object.keys(photos) as Id[]
function read(file:string){const p=path.resolve(root,'.private',file);return existsSync(p)?JSON.parse(readFileSync(p,'utf8')):{}}
export default defineConfig(({command})=>{
 const local=command==='serve', consent=read('publication.json'),directory=read('contacts.json')
 const allowed=ids.filter(id=>(local||consent.photos?.includes(id))&&existsSync(path.resolve(root,'.private/photos',photos[id])))
 const contacts:Partial<Record<Id,Contact>>={}
 for(const id of ids){for(const k of ['email','phone','linkedin'] as const){
  const val=directory[id]?.[k]
  if(!consent.contacts?.[id]?.includes(k)||typeof val!=='string')continue
  const valid=k==='email'?/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(val):k==='phone'?/^\+?[\d ()-]{7,22}$/.test(val):/^https:\/\/(?:[a-z]+\.)?linkedin\.com\/in\/[\w%-]+\/?$/.test(val)
  if(valid)(contacts[id]??={})[k]=val
 }}
 return {base:'./',server:{watch:{ignored:['**/design-sources/**','**/*.zip','**/docs/validation/**','**/.private/**','**/.qa/**']},fs:{deny:['.env','.env.*','*.{crt,pem}','**/.git/**','**/.private/**']}},plugins:[react(),{name:'floreol-permissions',
  configureServer(server){server.middlewares.use((req,res,next)=>{const key=allowed.find(id=>req.url?.split('?')[0]==='/media/'+photos[id]);if(!key)return next();res.setHeader('Content-Type','image/webp');res.end(readFileSync(path.resolve(root,'.private/photos',photos[key])))})},
  transformIndexHtml(){return [{tag:'script',children:'window.FLOREOL_PUBLICATION='+JSON.stringify({photos:allowed,contacts}).replaceAll('<','\\u003c'),injectTo:'head'}]},
  generateBundle(){for(const id of allowed)this.emitFile({type:'asset',fileName:'media/'+photos[id],source:readFileSync(path.resolve(root,'.private/photos',photos[id]))})}
 }],build:{chunkSizeWarningLimit:1150}}
})