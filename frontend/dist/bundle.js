import{createRoot as Ta}from"https://esm.sh/react-dom@18.2.0/client";import{createElement as La}from"https://esm.sh/react@18.2.0";import Sa,{useState as c,useEffect as B,useRef as O,useMemo as C}from"https://esm.sh/react@18.2.0";import{Fragment as Ae,jsx as e,jsxs as a}from"https://esm.sh/react@18.2.0/jsx-runtime";function Na({timeframe:f}){let J=O(null);return B(()=>{if(!J.current)return;J.current.innerHTML="";let N="60";f==="1"?N="1":f==="5"?N="5":f==="15"?N="15":f==="60"?N="60":f==="1D"?N="D":f==="1W"?N="W":f==="1M"&&(N="M");let K=document.createElement("script");K.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",K.type="text/javascript",K.async=!0,K.innerHTML=JSON.stringify({autosize:!0,symbol:"FOREXCOM:XAUUSD",interval:N,timezone:"Asia/Ho_Chi_Minh",theme:"dark",style:"1",locale:"vi",enable_publishing:!1,allow_symbol_change:!0,calendar:!0,hide_side_toolbar:!1,studies:[{id:"MAExp@tv-basicstudies",inputs:{length:50}},{id:"MAExp@tv-basicstudies",inputs:{length:200}}],support_host:"https://www.tradingview.com"}),J.current.appendChild(K)},[f]),e("div",{className:"tradingview-widget-container",ref:J,style:{height:"100%",width:"100%"},children:e("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}function ct(){let[f,J]=c("5"),[N,K]=c("tradingview"),[E,gt]=c(!1),[n,mt]=c(null),[Gt,xt]=c(!0),[ut,Ke]=c(null),[D,Ce]=c("general"),[bt,ht]=c([]),[Me,Ie]=c(!1),[Q,Wt]=c("ALL"),[ne,Ft]=c("TODAY"),j=C(()=>{let t=[...bt].sort((l,s)=>s.closeTime-l.closeTime),r=new Date().toLocaleDateString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",year:"numeric"}),i=new Date(Date.now()-864e5).toLocaleDateString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",year:"numeric"});return ne==="TODAY"?t=t.filter(l=>new Date(l.closeTime).toLocaleDateString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",year:"numeric"})===r):ne==="YESTERDAY"&&(t=t.filter(l=>new Date(l.closeTime).toLocaleDateString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",year:"numeric"})===i)),Q==="ALL"?t:t.filter(l=>l.timeframe.toUpperCase()===Q.toUpperCase())},[bt,Q,ne]),ie=C(()=>{if(j.length===0)return{winRate:0,netPips:0,totalProfit:0,total:0};let t=j.length,r=j.filter(s=>s.status==="TP1"||s.status==="TP2").length,o=Math.round(r/t*100),i=Number(j.reduce((s,d)=>s+(Number(d.pips)||0),0).toFixed(1)),l=Number(j.reduce((s,d)=>s+(Number(d.profitUsd)||0),0).toFixed(2));return{winRate:o,netPips:i,totalProfit:l,total:t}},[j]),ft=async(t=!1)=>{t&&Ie(!0);try{let r=await fetch("/api/backtest/history");if(r.ok){let o=await r.json();o.success&&o.trades&&ht(o.trades)}}catch(r){console.error("Error fetching backtest history:",r)}finally{t&&Ie(!1)}},$t=async()=>{Ie(!0);try{let t=await fetch("/api/backtest/reset",{method:"POST"});if(t.ok){let r=await t.json();r.success&&r.trades&&ht(r.trades)}else alert("L\u1ED7i khi ch\u1EA1y l\u1EA1i backtest t\u1EEB d\u1EEF li\u1EC7u n\u1EBFn.")}catch(t){alert("L\u1ED7i h\u1EC7 th\u1ED1ng: "+t.message)}finally{Ie(!1)}},[_,se]=c(null),[Yt,Vt]=c(!0),[je,ee]=c("login"),[Y,_e]=c(""),[te,qe]=c(""),[Ee,ze]=c(""),[vt,k]=c(null),[yt,L]=c(null),[le,He]=c(0),[de,pe]=c(!1),[Ze,q]=c(""),[ce,Xt]=c(!0),[ge,Kt]=c(!0),[be,jt]=c(50),[he,_t]=c(200),[fe,qt]=c("close"),[ve,Zt]=c("close"),[ye,Jt]=c("#FFD700"),[we,Qt]=c("#FF1744"),[ae,ke]=c(null),[Re,Be]=c(null),[Se,Oe]=c("pine"),[Je,Qe]=c(50),[et,tt]=c("close"),[De,Ue]=c("#FFD700");B(()=>{ae==="ema50"?(Qe(be),tt(fe),Ue(ye)):ae==="ema200"&&(Qe(he),tt(ve),Ue(we))},[ae]);let ea=()=>{ae==="ema50"?(jt(Je),qt(et),Jt(De)):ae==="ema200"&&(_t(Je),Zt(et),Qt(De)),ke(null)},ta=async()=>{try{let t=await fetch("/api/auth/me");if(t.ok){let r=await t.json();r.authenticated&&r.email?se({email:r.email}):se(null)}else se(null)}catch{se(null)}finally{Vt(!1)}};B(()=>{ta()},[]),B(()=>{if(_&&(D==="ai"||D==="backtest")){ft(!0);let t=setInterval(()=>{ft(!1)},5e3);return()=>clearInterval(t)}},[D,_]),B(()=>{if(le<=0)return;let t=setInterval(()=>{He(r=>r-1)},1e3);return()=>clearInterval(t)},[le]);let aa=async t=>{if(t.preventDefault(),!Y||!te){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}pe(!0),k(null),L(null);try{let r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Y,password:te})}),o=await r.json();if(!r.ok){r.status===403&&o.needsVerification?(ee("otp"),He(300),o.isSimulator&&o.otp?(q(o.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${o.otp}`)):(q(""),L(o.error||"T\xE0i kho\u1EA3n ch\u01B0a k\xEDch ho\u1EA1t. M\u1ED9t m\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email."))):k(o.error||"\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i.");return}o.success&&(se({email:o.user.email}),L("\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng!"))}catch(r){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+r.message)}finally{pe(!1)}},ra=async t=>{if(t.preventDefault(),!Y||!te){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}if(te.length<6){k("M\u1EADt kh\u1EA9u ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 6 k\xFD t\u1EF1.");return}pe(!0),k(null),L(null);try{let r=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Y,password:te})}),o=await r.json();if(!r.ok){k(o.error||"\u0110\u0103ng k\xFD th\u1EA5t b\u1EA1i.");return}o.success&&(ee("otp"),He(300),o.isSimulator&&o.otp?(q(o.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${o.otp}`)):(q(""),L(o.message||"\u0110\u0103ng k\xFD th\xE0nh c\xF4ng! Vui l\xF2ng nh\u1EADp m\xE3 OTP g\u1EEDi t\u1EDBi email.")))}catch(r){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+r.message)}finally{pe(!1)}},oa=async t=>{if(t.preventDefault(),!Ee){k("Vui l\xF2ng nh\u1EADp m\xE3 OTP.");return}pe(!0),k(null),L(null);try{let r=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Y,otp:Ee})}),o=await r.json();if(!r.ok){k(o.error||"X\xE1c th\u1EF1c OTP th\u1EA5t b\u1EA1i.");return}o.success&&(ee("login"),ze(""),q(""),L("K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng! B\xE2y gi\u1EDD b\u1EA1n c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp."))}catch(r){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+r.message)}finally{pe(!1)}},na=async()=>{if(!(le>0)){k(null),L(null);try{let t=await fetch("/api/auth/resend-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:Y})}),r=await t.json();if(!t.ok){k(r.error||"G\u1EEDi l\u1EA1i OTP th\u1EA5t b\u1EA1i.");return}r.success&&(He(300),r.isSimulator&&r.otp?(q(r.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(q(""),L(r.message||"M\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email c\u1EE7a b\u1EA1n.")))}catch(t){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+t.message)}}},Ca=async()=>{try{await fetch("/api/auth/logout",{method:"POST"}),se(null),mt(null),Pe(2350),Ge(0),ee("login"),_e(""),qe(""),ze(""),k(null),L(null)}catch(t){console.error("Logout error",t)}},[w,Pe]=c(2350),[at,Ge]=c(0),[We,Ma]=c(!0),[Ia,wt]=c([]),[Ea,kt]=c({bids:[],asks:[]}),[za,Ha]=c("book"),[ia,sa]=c(""),[St,la]=c(""),[V,da]=c(!1),[Ne,Ra]=c(100),[Fe,Ba]=c(5),[rt,Oa]=c("micro"),[$e,Da]=c("percent"),[Ye,Ua]=c(5),[ot,Pa]=c(0),[Ga,pa]=c([{id:"h1",time:"05:40:12",type:"SELL",entry:4512.4,stopLoss:4516.8,tp1:4504,status:"HIT TP1 \u{1F7E2} (+84 pips)"},{id:"h2",time:"03:15:45",type:"BUY",entry:4495.2,stopLoss:4489.5,tp1:4503.5,status:"HIT TP1 \u{1F7E2} (+83 pips)"},{id:"h3",time:"01:04:10",type:"SELL",entry:4520.1,stopLoss:4525,tp1:4511,status:"HIT SL \u{1F534} (-49 pips)"},{id:"h4",time:"23:12:05",type:"BUY",entry:4488.5,stopLoss:4482,tp1:4498,status:"HIT TP1 \u{1F7E2} (+95 pips)"}]),z=O({}),[Wa,Nt]=c(""),[ca,ga]=c(!0),[Z,Te]=c(80),[me,xe]=c(0),Tt=me===0,[nt,it]=c(1),g=C(()=>{if(!n?.chart?.timestamp)return[];let t=n.chart.timestamp.length,r=[];for(let o=0;o<t;o++)r.push({time:n.chart.timestamp[o],open:n.chart.open[o]??0,high:n.chart.high[o]??0,low:n.chart.low[o]??0,close:n.chart.close[o]??0,volume:n.chart.volume[o]??0});if(r.length>0){let o=r[r.length-1];o.close=w,w>o.high&&(o.high=w),w<o.low&&(o.low=w)}return r},[n,w]),X=C(()=>{if(g.length===0)return[];let t=g.length,r=Math.max(10,Math.min(Z,t)),o=Math.max(0,Math.min(me,t-r)),i=t-o,l=Math.max(0,i-r);return g.slice(l,i)},[g,Z,me]),H=C(()=>{if(g.length===0)return 0;let t=g.length,r=Math.max(10,Math.min(Z,t)),o=Math.max(0,Math.min(me,t-r)),i=t-o;return Math.max(0,i-r)},[g,Z,me]),ma=C(()=>{if(g.length===0)return[];let t=[],o=2/((Number(be)||50)+1),i=fe||"close",l=g[0][i]||g[0].close;t.push(l);for(let s=1;s<g.length;s++)l=(g[s][i]||g[s].close)*o+l*(1-o),t.push(l);return t},[g,be,fe]),xa=C(()=>{if(g.length===0)return[];let t=[],o=2/((Number(he)||200)+1),i=ve||"close",l=g[0][i]||g[0].close;t.push(l);for(let s=1;s<g.length;s++)l=(g[s][i]||g[s].close)*o+l*(1-o),t.push(l);return t},[g,he,ve]),Lt=C(()=>{if(g.length<10)return null;let r=(n?.advancedAnalysis?.swings||[]).filter(d=>d.type==="HIGH").sort((d,x)=>d.index-x.index);if(r.length>=2){let d=r[0];for(let u of r)u.price>d.price&&(d=u);let x=r.find(u=>u.index>d.index&&u.price<d.price);if(x||(x=r[r.length-1]),d&&x&&d.index!==x.index)return{i1:d.index,price1:d.price,i2:x.index,price2:x.price,source:"SMC Swings"}}let o=0,i=g[0].high;for(let d=1;d<Math.floor(g.length*.7);d++)g[d].high>i&&(i=g[d].high,o=d);let l=o+5,s=0;if(l<g.length){s=g[l].high;for(let d=l;d<g.length;d++)g[d].high>s&&g[d].high<i&&(s=g[d].high,l=d)}return o!==l&&l<g.length?{i1:o,price1:i,i2:l,price2:s,source:"PA Scan"}:{i1:Math.max(0,g.length-80),price1:4568,i2:Math.max(0,g.length-20),price2:4516,source:"SMC Profile"}},[g,n]),p=C(()=>{if(X.length<5)return null;let t=1400,r=520,o=4,i=68,l=12,s=34,d=t-o-i,x=r-l-s,u=X.map(A=>A.high),h=X.map(A=>A.low),v=Math.max(...u),b=Math.min(...h),y=v-b||1,S=(v+b)/2,M=y*1.1*nt||1;v=S+M/2,b=S-M/2;let T=v-b,R=X.length,U=d/R,F=Math.max(1,U*.75),P=A=>o+(A+.5)*U,re=A=>l+(1-(A-b)/T)*x,I=Math.max(1,Math.floor(R/8)),oe=[];for(let A=0;A<R;A+=I){let Xe=X[A].time*1e3,Dt=new Date(Xe),pt;["1D","1W","1M"].includes(f)?pt=Dt.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}):pt=Dt.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),oe.push({x:P(A),label:pt})}let $=8,Le=[];for(let A=0;A<=$;A++){let Xe=b+T*A/$;Le.push({y:re(Xe),price:Xe})}return{width:t,height:r,paddingLeft:o,paddingRight:i,paddingBottom:s,usableWidth:d,usableHeight:x,maxPrice:v,minPrice:b,paddedRange:T,candleSlotW:U,bodyWidth:F,getX:P,getY:re,timeLabels:oe,priceLabels:Le}},[X,f,nt]),G=O(2350),At=O(null),Ct=O(0),Ve=O(!1),Mt=O(0),It=O(0),ue=O(null),st=O(!1),Et=O(0),zt=O(1),ua={1:60,5:300,15:900,60:3600,"1D":86400,"1W":604800,"1M":2592e3};B(()=>{At.current=n},[n]);let W=(t="info")=>{try{let r=new(window.AudioContext||window.webkitAudioContext),o=r.createOscillator(),i=r.createGain();o.connect(i),i.connect(r.destination),t==="buy"?(o.frequency.setValueAtTime(587.33,r.currentTime),i.gain.setValueAtTime(.12,r.currentTime),o.start(),o.frequency.setValueAtTime(698.46,r.currentTime+.12),i.gain.setValueAtTime(.1,r.currentTime+.12),i.gain.exponentialRampToValueAtTime(.001,r.currentTime+.35),o.stop(r.currentTime+.4)):t==="sell"?(o.frequency.setValueAtTime(523.25,r.currentTime),i.gain.setValueAtTime(.12,r.currentTime),o.start(),o.frequency.setValueAtTime(392,r.currentTime+.12),i.gain.setValueAtTime(.1,r.currentTime+.12),i.gain.exponentialRampToValueAtTime(.001,r.currentTime+.35),o.stop(r.currentTime+.4)):(o.frequency.setValueAtTime(440,r.currentTime),i.gain.setValueAtTime(.08,r.currentTime),i.gain.exponentialRampToValueAtTime(.001,r.currentTime+.15),o.start(),o.stop(r.currentTime+.2))}catch(r){console.warn("Audio Context failed",r)}};B(()=>{if(!V||!n?.advancedAnalysis)return;let t=n.advancedAnalysis,r=Date.now(),o=t.fvgs.find(d=>!d.mitigated&&d.type==="BULLISH");if(o&&w<=o.top&&w>=o.bottom){let d=`fvg_bullish_${o.index}`;(!z.current[d]||r-z.current[d]>3e4)&&(z.current[d]=r,W("buy"))}let i=t.fvgs.find(d=>!d.mitigated&&d.type==="BEARISH");if(i&&w>=i.bottom&&w<=i.top){let d=`fvg_bearish_${i.index}`;(!z.current[d]||r-z.current[d]>3e4)&&(z.current[d]=r,W("sell"))}let l=t.orderBlocks.find(d=>!d.mitigated&&d.type==="BULLISH");if(l&&w>=l.low&&w<=l.high){let d=`ob_bullish_${l.index}`;(!z.current[d]||r-z.current[d]>3e4)&&(z.current[d]=r,W("buy"))}let s=t.orderBlocks.find(d=>!d.mitigated&&d.type==="BEARISH");if(s&&w>=s.low&&w<=s.high){let d=`ob_bearish_${s.index}`;(!z.current[d]||r-z.current[d]>3e4)&&(z.current[d]=r,W("sell"))}},[w,V,n]),B(()=>{let t=setInterval(()=>{let r=new Date;sa(r.toLocaleTimeString("en-GB")+" UTC");let o=ua[f]||86400,i=Math.floor(r.getTime()/1e3),l=o-i%o;if(l>=3600){let s=Math.floor(l/3600),d=Math.floor(l%3600/60),x=l%60;Nt(`${s}:${String(d).padStart(2,"0")}:${String(x).padStart(2,"0")}`)}else{let s=Math.floor(l/60),d=l%60;Nt(`${String(s).padStart(2,"0")}:${String(d).padStart(2,"0")}`)}},1e3);return()=>clearInterval(t)},[f]),B(()=>{let t=r=>{document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA"||(r.key==="+"||r.key==="="?(r.preventDefault(),Rt()):r.key==="-"?(r.preventDefault(),Bt()):r.key==="ArrowLeft"?(r.preventDefault(),xe(o=>Math.min(g.length-Z,o+5))):r.key==="ArrowRight"?(r.preventDefault(),xe(o=>Math.max(0,o-5))):(r.key==="r"||r.key==="R")&&(r.preventDefault(),Te(80),xe(0),it(1)))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[g.length,Z]);let lt=async(t=!1)=>{if(_){t||xt(!0),t||Ke(null);try{let r=await fetch(`/api/signals/XAUUSD?tf=${f}`);if(!r.ok)throw new Error("Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn server API Gold");let o=await r.json();Ke(null),mt(o),la(new Date().toLocaleTimeString("vi-VN")),o.lastPrice>0&&(!At.current||Math.abs(G.current-o.lastPrice)>100?G.current=o.lastPrice:G.current=G.current*.7+o.lastPrice*.3,Pe(Math.round(G.current*100)/100)),o.signals&&o.signals.type!=="NEUTRAL"&&pa(i=>{let l=i[0];if(!l||l.type!==o.signals.type||Math.abs(l.entry-o.signals.suggestion.entry)>.5){let d=new Date().toLocaleTimeString("vi-VN");return[{id:Math.random().toString(),time:d,type:o.signals.type,entry:o.signals.suggestion.entry,stopLoss:o.signals.suggestion.stopLoss,tp1:o.signals.suggestion.takeProfit1,status:"Active \u{1F7E1}"},...i.slice(0,14)]}return i}),t||(ba(o.lastPrice),ha(o.lastPrice)),Ge(o.priceChange)}catch(r){t||Ke(r.message)}finally{t||xt(!1)}}},Fa=async()=>{try{let t=await fetch("/api/price/XAUUSD");if(!t.ok)return;let r=await t.json();r.price&&r.price>0&&(G.current=G.current*.7+r.price*.3,Pe(Math.round(G.current*100)/100),Ge(r.change))}catch{}};B(()=>{if(!_)return;lt(!1);let t=setInterval(()=>{We&&_&&lt(!0)},500);return()=>{clearInterval(t)}},[f,We,_]);let ba=t=>{let r=.35+Math.random()*.15,o=[],i=[];for(let l=1;l<=10;l++)i.push({price:t+r/2+(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10}),o.push({price:t-r/2-(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10});kt({bids:o,asks:i.reverse()})},ha=t=>{let r=[],o=new Date;for(let i=0;i<20;i++){let l=i*280,s=new Date(o.getTime()-l),d=Math.random()>.48;r.push({id:`init-${i}`,time:s.toLocaleTimeString()+"."+String(s.getMilliseconds()).padStart(3,"0"),type:d?"BUY":"SELL",price:t+(Math.random()-.5)*.4,size:(Math.random()*4.5+.1).toFixed(1)+" Lot"})}wt(r)};B(()=>{if(!We||!n||!_)return;let t=setInterval(()=>{let r=G.current,o=n.lastPrice,i=(o-r)*.05,l=(Math.random()-.5)*.25,s=Math.round((r+i+l)*100)/100;G.current=s,Pe(s);let d=o/(1+n.priceChange/100),x=(s-d)/d*100;if(Ge(x),Ct.current++,Ct.current%3===0){let u=.35+Math.random()*.1;kt(h=>{let v=h.asks.map((y,S)=>{let M=10-S;return{price:Math.round((s+u/2+(M-1)*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)}});return{bids:h.bids.map((y,S)=>({price:Math.round((s-u/2-S*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)})),asks:v}})}if(Math.random()<.35){let u=Math.random()>.47,h=new Date,v=u?s+Math.random()*.05:s-Math.random()*.05,b={id:Math.random().toString(),time:h.toLocaleTimeString()+"."+String(h.getMilliseconds()).padStart(3,"0"),type:u?"BUY":"SELL",price:Math.round(v*100)/100,size:(Math.random()*5+.1).toFixed(1)+" Lot"};wt(y=>[b,...y.slice(0,24)])}},85);return()=>clearInterval(t)},[We,n]);let fa=t=>{if(!ue.current||!p)return;let r=ue.current.getBoundingClientRect();(t.clientX-r.left)/r.width*p.width>p.width-p.paddingRight?(st.current=!0,Et.current=t.clientY,zt.current=nt):(Ve.current=!0,Mt.current=t.clientX,It.current=me)},va=t=>{if(st.current){let o=1+(t.clientY-Et.current)*.005;it(Math.max(.05,Math.min(10,zt.current*o)))}else if(Ve.current&&ue.current&&p){let r=t.clientX-Mt.current,i=(ue.current.clientWidth||860)/Math.max(Z,1),l=Math.round(-r/i),s=Math.max(0,Math.min(g.length-Z,It.current+l));xe(s)}},Ht=()=>{Ve.current=!1,st.current=!1},ya=()=>{Te(80),xe(0),it(1)};B(()=>{let t=ue.current;if(!t)return;let r=o=>{o.preventDefault();let i=o.deltaY>0?1:-1;Te(l=>Math.max(10,Math.min(500,l+i*Math.ceil(l*.08))))};return t.addEventListener("wheel",r,{passive:!1}),()=>{t.removeEventListener("wheel",r)}},[p]);let wa=()=>xe(0),Rt=()=>Te(t=>Math.max(10,Math.round(t*.7))),Bt=()=>Te(t=>Math.min(500,Math.round(t*1.4))),m=C(()=>{if(!n)return null;let t=n.signals,r=n.tradingViewAnalysis,o=t.type==="BUY"?t.strength:t.type==="SELL"?-t.strength:0,i=r?r.recommendAll*100:0,l=Math.round((o+i)/2),s="NEUTRAL";l>=40?s="STRONG_BUY":l>=15?s="BUY":l<=-40?s="STRONG_SELL":l<=-15&&(s="SELL");let d=50,x=0,u=0,h=0,v=0,b=t.indicators.atr||r?.atr||3.2,y=t.indicators.rsi||r?.rsi||50,S=r?r.macd-r.macdSignal:0;if(r){let $=w>r.ema50,Le=r.ema10>r.sma20;s.includes("BUY")?($&&(x+=6),Le&&(x+=6)):s.includes("SELL")&&($||(x+=6),Le||(x+=6))}s.includes("BUY")?(y>=50&&y<=65&&(u+=6),S>0&&(u+=6)):s.includes("SELL")&&(y>=35&&y<=50&&(u+=6),S<0&&(u+=6)),r&&r.adx>25&&(h+=6),s.includes("BUY")&&y<30&&(v+=8),s.includes("SELL")&&y>70&&(v+=8);let M=Math.min(94,Math.max(35,Math.round(d+Math.abs(l)*.3+x+u+h+v))),T=0,R=0,U="",F=0,P=0,re=0,I=0,oe=n.chart?.close&&n.chart.close.length>0?n.chart.close[n.chart.close.length-1]:w;if(t&&t.suggestion&&t.suggestion.position!=="NEUTRAL"){let $=t.suggestion;F=$.stopLoss,P=$.takeProfit1,re=$.takeProfit2,I=$.entry,T=Math.round((I-.15*b)*100)/100,R=Math.round((I+.15*b)*100)/100,U=`$${I.toFixed(2)}`,t.strength>0&&(M=Math.min(94,Math.max(78,80+Math.round(t.strength*.15))))}else T=Math.round((s.includes("BUY")?oe-.25*b:oe)*100)/100,R=Math.round((s.includes("BUY")?oe:oe+.25*b)*100)/100,U=`$${T.toFixed(2)} - $${R.toFixed(2)}`,I=(T+R)/2,s.includes("BUY")?(F=Math.round((I-1.5*b)*100)/100,P=Math.round((I+1.5*b)*100)/100,re=Math.round((I+3*b)*100)/100):s.includes("SELL")&&(F=Math.round((I+1.5*b)*100)/100,P=Math.round((I-1.5*b)*100)/100,re=Math.round((I-3*b)*100)/100);return{type:s,confluenceScore:l,winProbability:M,entryText:U,entryMid:I,sl:F,tp1:P,tp2:re,atr:b,rsi:y,adx:r?.adx||20,ema10:r?.ema10||w,sma20:r?.sma20||w}},[n]),dt=C(()=>ot>0?ot:!m||!m.sl?0:Math.abs(m.entryMid-m.sl),[ot,m]),Ot=C(()=>$e==="percent"?Ne*Fe/100:Ye,[Ne,Fe,Ye,$e]),$a=C(()=>Ne<=0?0:$e==="usd"?Ye/Ne*100:Fe,[Ne,Fe,Ye,$e]),Ya=C(()=>dt<=0?0:Ot/(dt*(rt==="standard"?100:rt==="mini"?10:1)),[Ot,dt,rt]),ka=C(()=>{if(!m)return{};let t=m.type,r=m.winProbability,o="var(--yellow)";return t.includes("BUY")?o="var(--green)":t.includes("SELL")&&(o="var(--red)"),{background:`conic-gradient(${o} 0% ${r}%, var(--bg3) ${r}% 100%)`}},[m]);return Yt?e("div",{className:"auth-container",children:a("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[e("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"120px",height:"120px",borderRadius:"16px",animation:"pulse 2s infinite ease-in-out",filter:"drop-shadow(0 0 24px rgba(255, 171, 0, 0.6))",marginBottom:"8px"}}),e("div",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"16px",letterSpacing:"1px"},children:"\u0110ANG KH\u1EDEI \u0110\u1ED8NG XAU/USD GOLD TERMINAL..."}),e("div",{className:"load-bar",style:{width:"200px"},children:e("div",{className:"load-fill"})})]})}):_?a("div",{className:"root",children:[a("header",{className:"topbar",children:[e("div",{className:"topbar-left",children:a("div",{className:"brand",style:{display:"flex",alignItems:"center"},children:[e("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"32px",height:"32px",borderRadius:"6px",marginRight:"8px",filter:"drop-shadow(0 0 6px rgba(255, 171, 0, 0.35))"}}),e("span",{className:"brand-name",children:"H\u1EC6 TH\u1ED0NG GIAO D\u1ECACH V\xC0NG CHUY\xCAN NGHI\u1EC6P XAU/USD"}),e("span",{className:"brand-badge",children:"D\u1EEE LI\u1EC6U TH\u1EDCI GIAN TH\u1EF0C MILLISECOND"})]})}),a("div",{className:"topbar-right",children:[e("span",{className:"clock",children:ia||"00:00:00 UTC"}),e("button",{className:`tf-btn ${V?"active":""}`,style:{borderColor:V?"var(--green)":"rgba(255,255,255,0.05)",background:V?"rgba(0, 230, 118, 0.12)":"var(--bg3)",color:V?"var(--green)":"var(--text)",marginRight:"10px",fontWeight:V?"600":"normal",cursor:"pointer"},onClick:()=>da(!V),children:V?"\u{1F514} B\xE1o \xC2m: B\u1EACT":"\u{1F515} B\xE1o \xC2m: T\u1EAET"}),e("button",{className:"tf-btn",style:{borderColor:"rgba(255,255,255,0.05)",background:"var(--bg3)",color:"var(--text)"},onClick:lt,children:"\u{1F504} T\u1EA3i L\u1EA1i"})]})]}),a("div",{className:"layout",children:[!E&&a("aside",{className:"sidebar",children:[e("div",{className:"sb-header",children:e("div",{className:"gold-profile-card",children:e("div",{className:"g-title",children:"\u{1F7E1} V\xC0NG SPOT (XAU/USD)"})})}),a("div",{style:{padding:"16px",flex:1,display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:[n&&e("div",{className:"sug-card",style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"16px",background:"rgba(20, 24, 33, 0.45)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 215, 0, 0.08)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.25)"},children:e("img",{src:"/frontend/logo.png",alt:"Xtreme Algo Union Logo",style:{width:"100%",maxWidth:"220px",height:"auto",borderRadius:"12px",filter:"drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",transition:"all 0.3s ease"},onMouseOver:t=>{t.currentTarget.style.filter="drop-shadow(0 0 24px rgba(255, 171, 0, 0.5))",t.currentTarget.style.transform="scale(1.02)"},onMouseOut:t=>{t.currentTarget.style.filter="drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",t.currentTarget.style.transform="scale(1)"}})}),m&&a("div",{className:"sug-card",style:{borderTop:"3px solid var(--gold)",background:"rgba(20, 24, 33, 0.65)",backdropFilter:"blur(12px)"},children:[a("div",{className:"sug-title",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:"\u2728 CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT"}),e("span",{style:{fontSize:"9px",background:"rgba(255, 171, 0, 0.15)",color:"var(--gold)",padding:"2px 6px",borderRadius:"4px",fontWeight:"bold"},children:"PRO FEED"})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"16px",margin:"14px 0",background:"rgba(255,255,255,0.02)",padding:"10px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.04)"},children:a("div",{style:{flex:1},children:[e("span",{style:{fontSize:"10px",color:"var(--text2)",textTransform:"uppercase",display:"block"},children:"Khuy\u1EBFn ngh\u1ECB h\u1EE3p l\u01B0u"}),e("span",{className:`sug-val ${m.type.includes("BUY")?"buy":m.type.includes("SELL")?"sell":""}`,style:{fontSize:"15px",fontWeight:"800",marginTop:"2px",display:"block"},children:m.type==="STRONG_BUY"?"\u{1F7E2} MUA M\u1EA0NH (STRONG BUY)":m.type==="BUY"?"\u{1F7E2} MUA V\xC0O (BUY)":m.type==="STRONG_SELL"?"\u{1F534} B\xC1N M\u1EA0NH (STRONG SELL)":m.type==="SELL"?"\u{1F534} B\xC1N RA (SELL)":"\u{1F7E1} TRUNG L\u1EACP (NEUTRAL)"})]})}),a("div",{className:"sug-grid",style:{gap:"8px"},children:[a("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"ENTRY"}),e("span",{className:"sug-val entry",style:{fontSize:"11.5px",letterSpacing:"-0.2px"},children:m.entryText})]}),a("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"\u0110i\u1EC3m C\u1EAFt l\u1ED7 (SL)"}),e("span",{className:"sug-val sl",style:{fontSize:"11.5px"},children:m.sl>0?`$${m.sl.toFixed(2)}`:"\u2014"})]}),a("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 1 (TP1)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:m.tp1>0?`$${m.tp1.toFixed(2)}`:"\u2014"})]}),a("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 2 (TP2)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:m.tp2>0?`$${m.tp2.toFixed(2)}`:"\u2014"})]}),e("div",{className:"sug-item",style:{gridColumn:"span 2"},children:a("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"8px",marginTop:"4px"},children:[a("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"T\u1EF7 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn:"}),e("strong",{style:{color:"#fff",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:"1:1.5 \u2794 1:3.0"})]}),a("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"H\u1EC7 s\u1ED1 bi\u1EBFn \u0111\u1ED9ng (ATR):"}),a("strong",{style:{color:"var(--gold)",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:["$",m.atr.toFixed(2)]})]})]})}),a("div",{className:"sug-item",style:{gridColumn:"span 2",background:"rgba(255, 255, 255, 0.01)",padding:"8px",borderRadius:"6px",border:"1px solid rgba(255, 255, 255, 0.03)",marginTop:"4px"},children:[e("span",{className:"sug-label",style:{fontSize:"9.5px",marginBottom:"6px",display:"block"},children:"H\u1EE3p l\u01B0u \u0111a khung th\u1EDDi gian:"}),e("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"4px",textAlign:"center"},children:[{id:"1",label:"M1"},{id:"5",label:"M5"},{id:"15",label:"M15"},{id:"60",label:"H1"},{id:"1D",label:"D1"}].map(t=>{let r=n?.multiTimeframeSignals?.[t.id]||"NEUTRAL",o="var(--text3)",i="rgba(255, 255, 255, 0.03)",l="TRUNG L\u1EACP";r.includes("BUY")?(o="var(--green)",i="rgba(0, 230, 118, 0.08)",l=r==="STRONG_BUY"?"MUA M\u1EA0NH":"MUA"):r.includes("SELL")?(o="var(--red)",i="rgba(255, 23, 68, 0.08)",l=r==="STRONG_SELL"?"B\xC1N M\u1EA0NH":"B\xC1N"):(o="var(--yellow)",i="rgba(255, 171, 0, 0.08)",l="TRUNG L\u1EACP");let s=f===t.id;return a("div",{onClick:()=>{W(),J(t.id)},style:{background:i,border:s?"1px solid var(--gold)":"1px solid rgba(255,255,255,0.04)",borderRadius:"4px",padding:"4px 1px",cursor:"pointer",transition:"all 0.15s ease",boxShadow:s?"0 0 6px rgba(255, 171, 0, 0.12)":"none"},onMouseOver:d=>{d.currentTarget.style.transform="scale(1.03)",d.currentTarget.style.borderColor="var(--gold)"},onMouseOut:d=>{d.currentTarget.style.transform="scale(1)",d.currentTarget.style.borderColor=s?"var(--gold)":"rgba(255,255,255,0.04)"},children:[e("span",{style:{fontSize:"9px",fontWeight:"800",color:s?"var(--gold)":"#fff",display:"block"},children:t.label}),e("span",{style:{fontSize:"6.5px",color:o,display:"block",marginTop:"2px",fontWeight:"bold",whiteSpace:"nowrap"},children:l})]},t.id)})})]})]})]})]})]}),a("main",{className:"main",children:[a("div",{className:"sym-header",children:[a("div",{className:"sym-info",children:[a("div",{className:"sym-title-wrap",children:[e("span",{className:"sym-title",children:"GOLD (XAU/USD)"}),e("span",{className:"sym-subtitle",children:"V\xE0ng giao ngay / \u0110\xF4 la M\u1EF9"})]}),a("div",{className:"price-info",children:[a("span",{className:"price-current",children:["$",w.toFixed(2)]}),a("span",{className:`price-change ${at>=0?"up":"down"}`,children:[at>=0?"+":"",at.toFixed(3),"%"]})]})]}),e("div",{style:{display:"flex",gap:"4px",background:"var(--bg3)",padding:"3px",borderRadius:"6px",border:"1px solid var(--border)",marginLeft:"auto",marginRight:"6px"},children:[{id:"1",name:"M1"},{id:"5",name:"M5"},{id:"15",name:"M15"},{id:"60",name:"1H"},{id:"1D",name:"1D"}].map(t=>e("button",{onClick:()=>{W(),J(t.id)},style:{background:f===t.id?"var(--yellow)":"transparent",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:"bold",color:f===t.id?"#000":"var(--text2)",cursor:"pointer",transition:"all 0.15s ease"},children:t.name},t.id))}),a("div",{style:{display:"flex",gap:"6px",alignItems:"center",marginLeft:"6px"},children:[e("button",{onClick:()=>{W(),K("tradingview")},className:`tf-btn ${N==="tradingview"?"active":""}`,style:{background:N==="tradingview"?"var(--yellow)":"var(--bg3)",borderColor:N==="tradingview"?"var(--yellow)":"rgba(255,255,255,0.05)",color:N==="tradingview"?"#000":"var(--text2)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:"\u{1F4CA} BI\u1EC2U \u0110\u1ED2 TRADINGVIEW"}),e("button",{onClick:()=>{W(),K("deno")},className:`tf-btn ${N==="deno"?"active":""}`,style:{background:N==="deno"?"var(--yellow)":"var(--bg3)",borderColor:N==="deno"?"var(--yellow)":"rgba(255,255,255,0.05)",color:N==="deno"?"#000":"var(--text2)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:"\u26A1 BI\u1EC2U \u0110\u1ED2 C\u1EA4U TR\xDAC SMC"}),a("button",{onClick:()=>{W(),gt(t=>!t)},className:`tf-btn ${E?"active":""}`,style:{background:E?"var(--green)":"var(--bg3)",borderColor:E?"var(--green)":"rgba(255,255,255,0.05)",color:E?"#000":"var(--text)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:["\u{1F5A5}\uFE0F ",E?"H\u1EE6Y FULL CHART":"FULL CHART"]})]})]}),Gt&&e("div",{className:"load-bar",children:e("div",{className:"load-fill"})}),ut&&a("div",{className:"err-msg",children:["\u26A0\uFE0F L\u1ED7i: ",ut]}),a("div",{className:"main-workspace",children:[e("div",{className:`chart-column ${E?"full-chart-active":""}`,children:a("div",{className:"chart-wrap",style:{height:"100%",width:"100%",display:"flex",flexDirection:"column",position:"relative"},children:[a("button",{onClick:()=>{W(),gt(t=>!t)},style:{position:"absolute",bottom:"16px",left:"50%",transform:"translateX(-50%)",zIndex:99,background:E?"rgba(0, 230, 118, 0.9)":"rgba(21, 26, 38, 0.85)",backdropFilter:"blur(12px)",border:`1.5px solid ${E?"var(--green)":"rgba(255,255,255,0.15)"}`,color:E?"#000":"#fff",padding:"8px 18px",borderRadius:"20px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",textTransform:"uppercase",letterSpacing:"0.5px"},children:["\u{1F5A5}\uFE0F ",E?"H\u1EE6Y FULL CHART":"FULL CHART"]}),N==="tradingview"?a(Ae,{children:[e(Na,{timeframe:f}),ca&&a("div",{className:"tv-guide-overlay",children:[a("div",{className:"tv-guide-header",children:[a("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{className:"tv-guide-icon",children:"\u{1F4A1}"}),e("span",{className:"tv-guide-title",children:"M\u1EB9o: B\u1EADt \u0110\u1EBFm Ng\u01B0\u1EE3c \u0110\xF3ng N\u1EBFn Tr\xEAn Chart"})]}),e("button",{className:"tv-guide-close",onClick:()=>ga(!1),children:"\xD7"})]}),a("div",{className:"tv-guide-body",children:["\u0110\u1EC3 ch\u1EA1y \u0111\u1EBFm ng\u01B0\u1EE3c n\u1EBFn th\u1EDDi gian th\u1EF1c \u1EDF d\u01B0\u1EDBi t\u1EF7 gi\xE1 ",a("strong",{style:{color:"var(--green)"},children:["$",w.toFixed(2)]}),":",a("ol",{className:"tv-guide-steps",children:[a("li",{children:[e("strong",{children:"Click chu\u1ED9t ph\u1EA3i"})," v\xE0o v\xF9ng c\u1ED9t t\u1EF7 gi\xE1 b\xEAn ph\u1EA3i bi\u1EC3u \u0111\u1ED3."]}),a("li",{children:["Ch\u1ECDn d\xF2ng ",e("strong",{style:{color:"var(--gold)"},children:'"\u0110\u1EBFm ng\u01B0\u1EE3c t\u1EDBi khi \u0111\xF3ng n\u1EBFn" (Countdown to bar close)'}),"."]})]}),e("div",{className:"tv-guide-footer",children:"\u2713 T\u1EF1 \u0111\u1ED9ng l\u01B0u v\xE0 ho\u1EA1t \u0111\u1ED9ng v\u0129nh vi\u1EC5n tr\xEAn tr\xECnh duy\u1EC7t c\u1EE7a b\u1EA1n!"})]})]})]}):a("div",{style:{position:"relative",width:"100%",height:"100%",flex:1,display:"flex",flexDirection:"column",background:"#131722",overflow:"hidden"},children:[p?a("svg",{className:"chart-svg",ref:ue,width:"100%",height:"100%",viewBox:`0 0 ${p.width} ${p.height}`,preserveAspectRatio:"none",onMouseDown:fa,onMouseMove:va,onMouseUp:Ht,onMouseLeave:Ht,onDoubleClick:ya,style:{cursor:Ve.current?"grabbing":"crosshair",userSelect:"none"},children:[e("defs",{children:a("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e("feGaussianBlur",{stdDeviation:"3",result:"blur"}),a("feMerge",{children:[e("feMergeNode",{in:"blur"}),e("feMergeNode",{in:"SourceGraphic"})]})]})}),p.priceLabels.map((t,r)=>a("g",{children:[e("line",{x1:p.paddingLeft,y1:t.y,x2:p.width-p.paddingRight,y2:t.y,stroke:"rgba(255, 255, 255, 0.03)",strokeWidth:"1"}),a("text",{x:p.width-p.paddingRight+8,y:t.y+4,fill:"var(--text3)",fontSize:"10px",fontFamily:"monospace",children:["$",t.price.toFixed(2)]})]},`grid-y-${r}`)),p.timeLabels.map((t,r)=>a("g",{children:[e("line",{x1:t.x,y1:0,x2:t.x,y2:p.height-p.paddingBottom,stroke:"rgba(255, 255, 255, 0.02)",strokeWidth:"1"}),e("text",{x:t.x-18,y:p.height-12,fill:"var(--text3)",fontSize:"9.5px",fontFamily:"monospace",children:t.label})]},`grid-x-${r}`)),m&&(()=>{let t=p.getY(m.entryMid),r=p.getY(m.sl),o=p.getY(m.tp2),i=p.paddingLeft,l=p.width-p.paddingRight;return a(Ae,{children:[e("rect",{x:i,y:Math.min(t,r),width:l-i,height:Math.abs(t-r),fill:"rgba(255, 23, 68, 0.06)",stroke:"rgba(255, 23, 68, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"}),e("rect",{x:i,y:Math.min(t,o),width:l-i,height:Math.abs(t-o),fill:"rgba(0, 230, 118, 0.06)",stroke:"rgba(0, 230, 118, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"})]})})(),n?.advancedAnalysis&&(()=>{let t=n.advancedAnalysis,r=p.paddingLeft,o=p.width-p.paddingRight;return a("g",{id:"smc-dynamic-structures",children:[t.orderBlocks?.map((i,l)=>{let s=i.index,d=i.mitigated?Math.min(g.length-1,i.index+10):g.length-1,x=p.getX(s-H),u=p.getX(d-H),h=Math.max(r,x),v=Math.min(o,u);if(h>=v)return null;let b=p.getY(i.high),y=p.getY(i.low),S=Math.min(b,y),M=Math.abs(b-y),T=i.type==="BULLISH",R=T?"rgba(0, 230, 118, 0.06)":"rgba(255, 23, 68, 0.06)",U=T?"rgba(0, 230, 118, 0.22)":"rgba(255, 23, 68, 0.22)",F=T?"+OB BULLISH":"-OB BEARISH",P=T?"rgba(0, 230, 118, 0.8)":"rgba(255, 23, 68, 0.8)";return a("g",{children:[e("rect",{x:h,y:S,width:v-h,height:M,fill:R,stroke:U,strokeWidth:"1"}),v-h>50&&e("text",{x:h+6,y:S+11,fill:P,fontSize:"8px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:F})]},`ob-${l}`)}),t.fvgs?.map((i,l)=>{let s=Math.max(0,i.index-2),d=i.mitigated?Math.min(g.length-1,i.index+6):g.length-1,x=p.getX(s-H),u=p.getX(d-H),h=Math.max(r,x),v=Math.min(o,u);if(h>=v)return null;let b=p.getY(i.top),y=p.getY(i.bottom),S=Math.min(b,y),M=Math.abs(b-y),T=i.type==="BULLISH",R=T?"rgba(0, 188, 212, 0.04)":"rgba(233, 30, 99, 0.04)",U=T?"rgba(0, 188, 212, 0.16)":"rgba(233, 30, 99, 0.16)",F=T?"FVG BULLISH":"FVG BEARISH",P=T?"rgba(0, 188, 212, 0.65)":"rgba(233, 30, 99, 0.65)";return a("g",{children:[e("rect",{x:h,y:S,width:v-h,height:M,fill:R,stroke:U,strokeWidth:"0.8",strokeDasharray:"2,2"}),v-h>50&&M>6&&e("text",{x:h+6,y:S+9,fill:P,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:F})]},`fvg-${l}`)}),t.structureShifts?.map((i,l)=>{let s=g.findIndex(M=>M.time===i.time);if(s===-1)return null;let d=Math.min(g.length-1,s+20),x=p.getX(s-H),u=p.getX(d-H),h=Math.max(r,x),v=Math.min(o,u);if(h>=v)return null;let b=p.getY(i.price),y=i.direction==="BULLISH",S=y?"var(--green)":"var(--red)";return a("g",{children:[e("line",{x1:h,y1:b,x2:v,y2:b,stroke:S,strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.85"}),a("g",{transform:`translate(${h+6}, ${b-6})`,children:[e("rect",{x:"-3",y:"-2",width:"48",height:"12",rx:"3",fill:"rgba(19, 23, 34, 0.95)",stroke:S,strokeWidth:"0.8"}),a("text",{x:"21",y:"7",textAnchor:"middle",fill:S,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",children:[i.type," ",y?"\u2197":"\u2198"]})]})]},`shift-${l}`)}),t.sweeps?.map((i,l)=>{let s=g.findIndex(h=>h.time===i.time);if(s===-1)return null;let d=p.getX(s-H);if(d<r||d>o)return null;let x=p.getY(i.price),u=i.type==="SSL";return a("g",{children:[e("line",{x1:d-4,y1:x-4,x2:d+4,y2:x+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("line",{x1:d+4,y1:x-4,x2:d-4,y2:x+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("text",{x:d,y:u?x+14:x-10,textAnchor:"middle",fill:"var(--yellow)",fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:u?"SSL SWEEP":"BSL SWEEP"})]},`sweep-${l}`)})]})})(),X.map((t,r)=>{let o=p.getX(r),i=p.getY(t.high),l=p.getY(t.low),s=p.getY(t.open),d=p.getY(t.close),u=t.close>=t.open?"var(--green)":"var(--red)";return a("g",{children:[e("line",{x1:o,y1:i,x2:o,y2:l,stroke:u,strokeWidth:"1.5"}),e("rect",{x:o-p.bodyWidth/2,y:Math.min(s,d),width:p.bodyWidth,height:Math.max(1.5,Math.abs(s-d)),fill:u,stroke:u,strokeWidth:"0.5"})]},`candle-${r}`)}),ce&&(()=>{let t="";for(let r=0;r<X.length;r++){let o=H+r,i=ma[o];if(i){let l=p.getX(r),s=p.getY(i);t===""?t+=`M ${l} ${s}`:t+=` L ${l} ${s}`}}return t?e("path",{d:t,fill:"none",stroke:ye,strokeWidth:"2",opacity:"0.85"}):null})(),ge&&(()=>{let t="";for(let r=0;r<X.length;r++){let o=H+r,i=xa[o];if(i){let l=p.getX(r),s=p.getY(i);t===""?t+=`M ${l} ${s}`:t+=` L ${l} ${s}`}}return t?e("path",{d:t,fill:"none",stroke:we,strokeWidth:"2.2",opacity:"0.85"}):null})(),Lt&&(()=>{let{i1:t,price1:r,i2:o,price2:i}=Lt,l=(i-r)/(o-t),s=p.getX(t-H),d=p.getY(r),u=g.length-1+10,h=p.getX(u-H),v=p.getY(r+l*(u-t));return a("g",{children:[e("line",{x1:s,y1:d,x2:h,y2:v,stroke:"var(--gold)",strokeWidth:"2.5",strokeDasharray:"6,4",filter:"url(#glow)"}),e("circle",{cx:s,cy:d,r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),e("circle",{cx:p.getX(o-H),cy:p.getY(i),r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),a("text",{x:Math.max(s+10,p.width-p.paddingRight-180),y:v-10,fill:"var(--gold)",fontSize:"10px",fontWeight:"bold",fontFamily:"monospace",opacity:"0.9",children:["\u2198 \u0110\u01AF\u1EDCNG XU H\u01AF\u1EDANG GI\u1EA2M ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]})]})})(),m&&(()=>{let t=p.getY(m.entryMid),r=p.getY(m.sl),o=p.getY(m.tp1),i=p.getY(m.tp2),l=p.paddingLeft,s=p.width-p.paddingRight;return a("g",{children:[e("line",{x1:l,y1:r,x2:s,y2:r,stroke:"var(--red)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:r-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 23, 68, 0.2)",stroke:"var(--red)",strokeWidth:"1"}),a("text",{x:s+8,y:r+4,fill:"var(--red)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["SL:$",m.sl.toFixed(1)]}),e("line",{x1:l,y1:t,x2:s,y2:t,stroke:"var(--gold)",strokeWidth:"1.5",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:t-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 171, 0, 0.2)",stroke:"var(--gold)",strokeWidth:"1"}),a("text",{x:s+8,y:t+4,fill:"var(--gold)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["ENT:$",m.entryMid.toFixed(1)]}),e("line",{x1:l,y1:o,x2:s,y2:o,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:o-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),a("text",{x:s+8,y:o+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP1:$",m.tp1.toFixed(1)]}),e("line",{x1:l,y1:i,x2:s,y2:i,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:i-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),a("text",{x:s+8,y:i+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP2:$",m.tp2.toFixed(1)]})]})})()]}):e("div",{className:"chart-empty",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"var(--text3)"},children:"\u0110ang d\u1EF1ng bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt..."}),a("div",{className:"chart-ema-legend",onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:[a("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:ye,color:ye}}),a("span",{className:"ema-legend-name",style:{color:ce?"#fff":"var(--text3)"},children:["EMA ",be," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:fe})]}),a("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${ce?"active":""}`,onClick:()=>Xt(!ce),title:ce?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:ce?a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>ke("ema50"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Be("ema50"),Oe("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]}),a("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:we,color:we}}),a("span",{className:"ema-legend-name",style:{color:ge?"#fff":"var(--text3)"},children:["EMA ",he," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:ve})]}),a("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${ge?"active":""}`,onClick:()=>Kt(!ge),title:ge?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:ge?a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>ke("ema200"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Be("ema200"),Oe("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]})]}),ae&&e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:a("div",{className:"chart-modal-card",children:[a("div",{className:"chart-modal-header",children:[a("span",{className:"chart-modal-title",children:["\u2699\uFE0F C\xE0i \u0110\u1EB7t Ch\u1EC9 B\xE1o: EMA ",ae==="ema50"?"50":"200"]}),e("button",{className:"chart-modal-close",onClick:()=>ke(null),children:"\xD7"})]}),a("div",{className:"chart-modal-body",children:[a("div",{className:"settings-group",children:[e("label",{className:"settings-label",children:"Chu k\u1EF3 (Length)"}),a("div",{className:"settings-input-row",children:[e("input",{type:"number",min:"2",max:"500",className:"settings-number-input",value:Je,onChange:t=>Qe(Math.max(2,parseInt(t.target.value)||2))}),e("span",{style:{fontSize:"11px",color:"var(--text3)"},children:"(2 - 500 n\u1EBFn)"})]})]}),a("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"Ngu\u1ED3n gi\xE1 tr\u1ECB (Source)"}),e("div",{className:"settings-input-row",children:a("select",{className:"settings-select",value:et,onChange:t=>tt(t.target.value),children:[e("option",{value:"close",children:"\u0110\xF3ng c\u1EEDa (Close)"}),e("option",{value:"open",children:"M\u1EDF c\u1EEDa (Open)"}),e("option",{value:"high",children:"Cao nh\u1EA5t (High)"}),e("option",{value:"low",children:"Th\u1EA5p nh\u1EA5t (Low)"})]})})]}),a("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"M\xE0u \u0111\u01B0\u1EDDng ch\u1EC9 b\xE1o (Color)"}),e("div",{className:"settings-colors-grid",children:["#FFD700","#00e5ff","#FF1744","#d500f9","#00e676","#ff9100","#ffffff","#787b86"].map(t=>e("div",{className:`settings-color-dot ${De===t?"active":""}`,style:{backgroundColor:t},onClick:()=>Ue(t)},t))}),a("div",{style:{marginTop:"10px",width:"100%"},children:[e("span",{style:{fontSize:"11px",color:"var(--text3)",display:"block",marginBottom:"4px"},children:"M\xE3 m\xE0u HEX t\xF9y ch\u1EC9nh:"}),e("input",{type:"text",className:"settings-number-input",style:{width:"120px"},value:De,onChange:t=>Ue(t.target.value)})]})]})]}),a("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn cancel",onClick:()=>ke(null),children:"H\u1EE7y b\u1ECF"}),e("button",{className:"modal-btn apply",onClick:ea,children:"\xC1p d\u1EE5ng"})]})]})}),Re&&(()=>{let t=Re==="ema50"?be:he,r=Re==="ema50"?fe:ve,i=`//@version=5
// \xA9 TradingView Pine Script v5
// Ch\u1EC9 b\xE1o Exponential Moving Average (EMA) - B\u1EA3n M\xE3 Ngu\u1ED3n M\u1EDF
indicator("Exponential Moving Average", shorttitle="EMA ${t}", overlay=true)

// C\u1EA5u h\xECnh c\xE1c tham s\u1ED1 \u0111\u1EA7u v\xE0o c\u1EE7a ch\u1EC9 b\xE1o
lengthInput = input.int(${t}, minval=1, title="Length")
sourceInput = input.source(${r}, title="Source")

// H\xE0m t\xEDnh to\xE1n EMA t\xEDch l\u0169y \u0111\u1ED9ng
emaValue = ta.ema(sourceInput, lengthInput)

// V\u1EBD \u0111\u01B0\u1EDDng EMA l\xEAn bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt v\u1EDBi m\xE0u s\u1EAFc l\u1EF1a ch\u1ECDn
plot(emaValue, title="EMA Line", color=color.from_hex("${Re==="ema50"?ye:we}"), linewidth=2)`,l=`/**
 * C\xD4NG TH\u1EE8C TO\xC1N H\u1ECCC & L\u1EACP TR\xCCNH T\xCDNH EMA (EXPONENTIAL MOVING AVERAGE)
 * Phi\xEAn b\u1EA3n m\xE3 ngu\u1ED3n m\u1EDF vi\u1EBFt b\u1EB1ng JavaScript/TypeScript cho XAU/USD Gold Terminal.
 * 
 * H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (Smoothing Multiplier) k = 2 / (Length + 1)
 * C\xF4ng th\u1EE9c t\xEDnh n\u1EBFn th\u1EE9 i: 
 *   EMA(i) = Gi\xE1(i) * k + EMA(i-1) * (1 - k)
 */
function calculateEMA(candles, length = ${t}, source = "${r}") {
  if (!candles || candles.length === 0) return [];
  
  const values = [];
  const k = 2 / (length + 1);
  
  // Kh\u1EDFi t\u1EA1o gi\xE1 tr\u1ECB EMA \u0111\u1EA7u ti\xEAn b\u1EB1ng gi\xE1 tr\u1ECB n\u1EBFn \u0111\u1EA7u ti\xEAn
  let ema = candles[0][source] || candles[0].close;
  values.push(ema);
  
  // \xC1p d\u1EE5ng c\xF4ng th\u1EE9c t\xEDch l\u0169y nh\xE2n t\u1ED1 cho to\xE0n b\u1ED9 c\xE1c n\u1EBFn ti\u1EBFp theo
  for (let i = 1; i < candles.length; i++) {
    const currentPrice = candles[i][source] || candles[i].close;
    ema = currentPrice * k + ema * (1 - k);
    values.push(ema);
  }
  
  return values;
}`;return e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:s=>s.stopPropagation(),onMouseMove:s=>s.stopPropagation(),children:a("div",{className:"chart-modal-card wide",children:[a("div",{className:"chart-modal-header",children:[a("span",{className:"chart-modal-title",children:["\u{1F4D6} M\xE3 Ngu\u1ED3n M\u1EDF Ch\u1EC9 B\xE1o: EMA ",t," (",r,")"]}),e("button",{className:"chart-modal-close",onClick:()=>Be(null),children:"\xD7"})]}),a("div",{className:"chart-modal-body",children:[a("div",{className:"chart-modal-tabs",children:[e("button",{className:`chart-modal-tab-btn ${Se==="pine"?"active":""}`,onClick:()=>Oe("pine"),children:"Pine Script v5 (TradingView)"}),e("button",{className:`chart-modal-tab-btn ${Se==="js"?"active":""}`,onClick:()=>Oe("js"),children:"JavaScript / TypeScript"})]}),e("div",{className:"code-container",children:e("pre",{style:{margin:0},children:e("code",{children:Se==="pine"?i:l})})}),a("div",{style:{marginTop:"12px",fontSize:"11.5px",color:"var(--text3)",display:"flex",gap:"6px",alignItems:"flex-start",lineHeight:"1.4"},children:[e("span",{children:"\u{1F4A1}"}),e("span",{children:Se==="pine"?"M\xE3 ngu\u1ED3n Pine Script c\xF3 th\u1EC3 copy v\xE0 d\xE1n tr\u1EF1c ti\u1EBFp v\xE0o m\u1EE5c Pine Editor tr\xEAn trang TradingView c\u1EE7a b\u1EA1n \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng EMA \u0111\u1ED3ng b\u1ED9 100%.":"H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (smoothing multiplier) c\u1EE7a chu k\u1EF3 "+t+" l\xE0 k = 2 / ("+t+" + 1) \u2248 "+(2/(t+1)).toFixed(4)+". \u0110\xE2y l\xE0 thu\u1EADt to\xE1n ti\xEAu chu\u1EA9n ng\xE0nh \u0111\u01B0\u1EE3c t\u1ED1i \u01B0u h\xF3a ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Deno Sandbox."})]})]}),a("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn apply",onClick:()=>{navigator.clipboard.writeText(Se==="pine"?i:l),alert("\u0110\xE3 sao ch\xE9p m\xE3 ngu\u1ED3n ch\u1EC9 b\xE1o v\xE0o Clipboard!")},children:"\u{1F4CB} Sao ch\xE9p m\xE3 ngu\u1ED3n"}),e("button",{className:"modal-btn cancel",onClick:()=>Be(null),children:"\u0110\xF3ng"})]})]})})})(),a("div",{className:"chart-badge",style:{display:"flex",alignItems:"center",gap:"10px",pointerEvents:"auto"},children:[a("span",{children:["\u{1F4C8} C\u1EA4U TR\xDAC V\xC0NG ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]}),e("span",{style:{color:"rgba(255,255,255,0.15)"},children:"|"}),e("button",{onClick:Rt,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2795 Ph\xF3ng to"}),e("button",{onClick:Bt,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2796 Thu nh\u1ECF"}),e("button",{onClick:wa,style:{background:"none",border:"none",color:Tt?"var(--green)":"var(--yellow)",cursor:"pointer",fontWeight:"bold"},children:Tt?"\u25CF TR\u1EF0C TI\u1EBEP":"\u23EE XEM GI\xC1 TR\u1EF0C TI\u1EBEP"})]})]})]})}),!E&&a("div",{className:"realtime-panel",style:{height:"100%"},children:[e("div",{className:"panel-tab",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"var(--bg3)",borderBottom:"1px solid var(--border)"},children:e("span",{style:{fontSize:"11.5px",fontWeight:"700",color:"var(--gold)",letterSpacing:"0.5px"},children:"\u{1F4C5} L\u1ECACH KINH T\u1EBE (INVESTING)"})}),e("div",{style:{flex:1,width:"100%",height:"calc(100% - 37px)",overflow:"hidden"},children:e("iframe",{src:"https://sslecal2.investing.com/?ecoTimezone=28&ecoLanguage=52&lang=52&columns=time,currency,importance,event,actual,forecast,previous&features=datepicker,timezone&countryIds=5,72,17,25,32,6,37,43,22,39,35,42,4,36,110,26,12,11,10,38,14&calType=week&timeFrame=today",width:"100%",height:"100%",frameBorder:"0",allowTransparency:"true",marginWidth:0,marginHeight:0,style:{border:"none",filter:"invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(0.95)",background:"transparent"}})})]})]}),n&&!E&&a("div",{className:"signal-dash",children:[a("div",{className:"dash-tabs",children:[e("button",{className:`dash-tab-btn ${D==="general"?"active":""}`,onClick:()=>Ce("general"),children:"\u{1F4CA} T\xEDn Hi\u1EC7u Chung"}),e("button",{className:`dash-tab-btn ${D==="ai"?"active":""}`,onClick:()=>Ce("ai"),children:"\u{1F916} PH\xC2N T\xCDCH A.I"}),e("button",{className:`dash-tab-btn ${D==="backtest"?"active":""}`,onClick:()=>Ce("backtest"),children:"\u{1F4CA} L\u1ECACH S\u1EEC CH\u1ED0T L\u1EDCI / C\u1EAET L\u1ED6"}),e("button",{className:`dash-tab-btn ${D==="outlook"?"active":""}`,onClick:()=>Ce("outlook"),children:"\u{1F4CB} NH\u1EACN \u0110\u1ECANH TH\u1ECA TR\u01AF\u1EDCNG"})]}),D==="general"&&a(Ae,{children:[e("div",{className:"top-metrics-row",style:{gridTemplateColumns:"1fr"},children:a("div",{className:"hero-signal",style:{borderColor:n.signals.type==="BUY"?"var(--green)":n.signals.type==="SELL"?"var(--red)":"var(--yellow)"},children:[e("div",{className:"hero-badge",style:{background:n.signals.type==="BUY"?"var(--green)":n.signals.type==="SELL"?"var(--red)":"var(--yellow)",color:"#000"},children:n.signals.type==="BUY"?"T\xCDN HI\u1EC6U MUA (BUY)":n.signals.type==="SELL"?"T\xCDN HI\u1EC6U B\xC1N (SELL)":"T\xCDN HI\u1EC6U TRUNG L\u1EACP"}),a("div",{className:"hero-meters",children:[a("div",{className:"meter",children:[a("div",{className:"meter-head",children:[e("span",{className:"meter-label",children:"S\u1EE9c M\u1EA1nh T\xEDn Hi\u1EC7u (Strength)"}),a("span",{className:"meter-val",style:{color:"var(--gold)"},children:[n.signals.strength,"%"]})]}),e("div",{className:"meter-track",children:e("div",{className:"meter-fill",style:{width:`${n.signals.strength}%`,background:"var(--gold)"}})})]}),a("div",{className:"meter",children:[a("div",{className:"meter-head",children:[e("span",{className:"meter-label",children:"\u0110\u1ED9 Tin C\u1EADy (Confidence)"}),a("span",{className:"meter-val",style:{color:"var(--blue)"},children:[n.signals.confidence,"%"]})]}),e("div",{className:"meter-track",children:e("div",{className:"meter-fill",style:{width:`${n.signals.confidence}%`,background:"var(--blue)"}})})]})]}),a("div",{className:"hero-prob",children:[e("div",{className:"prob-circle",style:ka,children:a("span",{children:[n.signals.strength,"%"]})}),e("div",{className:"prob-label",children:"X\xC1C XU\u1EA4T XU H\u01AF\u1EDANG"})]})]})}),a("div",{className:"ind-grid",children:[a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"Ch\u1EC9 b\xE1o RSI (14)"}),e("span",{className:"ind-value",style:{color:n.signals.indicators.rsi>70?"var(--red)":n.signals.indicators.rsi<30?"var(--green)":"#fff"},children:n.signals.indicators.rsi}),e("span",{className:"ind-hint",children:n.signals.indicators.rsi>70?"Qu\xE1 Mua (Canh B\xE1n)":n.signals.indicators.rsi<30?"Qu\xE1 B\xE1n (Canh Mua)":"Trung T\xEDnh"})]}),a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"MACD (12, 26, 9)"}),e("span",{className:"ind-value",style:{color:n.signals.indicators.macdSignal==="BUY"?"var(--green)":n.signals.indicators.macdSignal==="SELL"?"var(--red)":"#fff"},children:n.signals.indicators.macdSignal==="BUY"?"MUA":n.signals.indicators.macdSignal==="SELL"?"B\xC1N":"TRUNG L\u1EACP"}),e("span",{className:"ind-hint",children:"\u0110\u1ED9ng l\u01B0\u1EE3ng MACD"})]}),a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"K\xEAnh SMA20"}),e("span",{className:"ind-value",style:{color:n.signals.indicators.sma20Trend==="UP"?"var(--green)":n.signals.indicators.sma20Trend==="DOWN"?"var(--red)":"#fff"},children:n.signals.indicators.sma20Trend==="UP"?"T\u0102NG":n.signals.indicators.sma20Trend==="DOWN"?"GI\u1EA2M":"\u0110I NGANG"}),e("span",{className:"ind-hint",children:"Xu h\u01B0\u1EDBng ch\xEDnh"})]}),a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"Bollinger Bands"}),e("span",{className:"ind-value",style:{color:"var(--yellow)"},children:n.signals.indicators.bollingerPosition==="UPPER"?"BI\xCAN TR\xCAN":n.signals.indicators.bollingerPosition==="LOWER"?"BI\xCAN D\u01AF\u1EDAI":"\u0110\u01AF\u1EDCNG GI\u1EEEA"}),e("span",{className:"ind-hint",children:"V\u1ECB tr\xED gi\xE1 hi\u1EC7n t\u1EA1i"})]}),a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"N\u1EBFn Ticker (Live)"}),e("span",{className:"ind-value",style:{color:"var(--green)"},children:"TR\u1EF0C TUY\u1EBEN"}),e("span",{className:"ind-hint",children:"T\u1EA7n su\u1EA5t < 90ms"})]}),a("div",{className:"ind-card",children:[e("span",{className:"ind-label",children:"\u0110\u1ED9 Tr\u1EC5 Ngu\u1ED3n API"}),e("span",{className:"ind-value",style:{color:"var(--green)",fontSize:"14px",marginTop:"4px"},children:"< 150ms"}),e("span",{className:"ind-hint",children:"Giao th\u1EE9c REST/Rapid"})]})]}),a("div",{className:"reasons-box",children:[a("div",{className:"reasons",children:[e("h3",{children:"\u{1F50D} Lu\u1EADn \u0111i\u1EC3m ph\xE2n t\xEDch chi\u1EBFn thu\u1EADt (XAU/USD)"}),n.signals.reasons.map((t,r)=>e("div",{className:"reason-row",children:t},r))]}),a("div",{className:"reasons",style:{background:"rgba(255, 171, 0, 0.02)",borderColor:"rgba(255, 171, 0, 0.1)"},children:[e("h3",{children:"\u26A0\uFE0F Tuy\xEAn b\u1ED1 mi\u1EC5n tr\u1EEB tr\xE1ch nhi\u1EC7m"}),e("div",{style:{fontSize:"12px",color:"var(--text2)",lineHeight:"1.6"},children:"V\xE0ng (Gold spot) l\xE0 m\u1ED9t trong nh\u1EEFng t\xE0i s\u1EA3n t\xE0i ch\xEDnh c\xF3 \u0111\u1ED9 bi\u1EBFn \u0111\u1ED9ng v\xE0 \u0111\xF2n b\u1EA9y l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi. C\xE1c ph\xE2n t\xEDch k\u1EF9 thu\u1EADt, x\xE1c xu\u1EA5t v\xE0 g\u1EE3i \xFD v\xE0o l\u1EC7nh hi\u1EC3n th\u1ECB tr\xEAn h\u1EC7 th\u1ED1ng ch\u1EC9 mang t\xEDnh ch\u1EA5t tham kh\u1EA3o d\u1EF1a tr\xEAn thu\u1EADt to\xE1n t\xEDch l\u0169y. Kh\xF4ng c\u1EA5u th\xE0nh l\u1EDDi khuy\xEAn \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh ch\xEDnh th\u1EE9c. Vui l\xF2ng t\u1EF1 qu\u1EA3n tr\u1ECB v\u1ED1n nghi\xEAm ng\u1EB7t!"})]})]})]}),D==="ai"&&n.advancedAnalysis&&a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[n?.signals?.suggestion&&a("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",borderTop:`4px solid ${n.signals.suggestion.position==="BUY"?"var(--green)":n.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)"}`,boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"16px"},children:[a("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[a("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F3AF}"}),a("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"#fff",margin:0,letterSpacing:"0.5px"},children:"K\u1EBE HO\u1EA0CH GIAO D\u1ECACH & BI\u1EC6N GI\u1EA2I CHUY\xCAN S\xC2U A.I"}),e("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"H\u1EE3p l\u01B0u 3 ph\u01B0\u01A1ng ph\xE1p ti\xEAu chu\u1EA9n: SMC + Price Action + M\xF4 h\xECnh n\u1EBFn \u0111\u1EA3o chi\u1EC1u"})]})]}),e("span",{style:{fontSize:"11px",fontWeight:"bold",textTransform:"uppercase",padding:"4px 10px",borderRadius:"6px",background:n.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.12)":n.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.12)":"rgba(255, 171, 0, 0.12)",color:n.signals.suggestion.position==="BUY"?"var(--green)":n.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)",border:`1px solid ${n.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.25)":n.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.25)":"rgba(255, 171, 0, 0.25)"}`},children:n.signals.suggestion.position==="BUY"?"\u{1F402} KHUY\u1EBEN NGH\u1ECA MUA (BUY)":n.signals.suggestion.position==="SELL"?"\u{1F43B} KHUY\u1EBEN NGH\u1ECA B\xC1N (SELL)":"\u{1F7E1} CH\u1EDC \u0110\u1EE2I (NEUTRAL)"})]}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"12px",background:"rgba(255, 255, 255, 0.02)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255, 255, 255, 0.04)"},children:[a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"\u0110I\u1EC2M V\xC0O (ENTRY)"}),a("strong",{style:{fontSize:"14px",color:"var(--gold)",fontFamily:"monospace"},children:["$",n.signals.suggestion.entry.toFixed(2)]})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"C\u1EAET L\u1ED6 (SL)"}),e("strong",{style:{fontSize:"14px",color:"var(--red)",fontFamily:"monospace"},children:n.signals.suggestion.stopLoss>0?`$${n.signals.suggestion.stopLoss.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 1 (TP1)"}),e("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:n.signals.suggestion.takeProfit1>0?`$${n.signals.suggestion.takeProfit1.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 2 (TP2)"}),e("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:n.signals.suggestion.takeProfit2>0?`$${n.signals.suggestion.takeProfit2.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 171, 0, 0.02)",borderLeft:"4px solid var(--gold)",border:"1px solid rgba(255, 171, 0, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F4E5} BI\u1EC6N GI\u1EA2I \u0110I\u1EC2M V\xC0O L\u1EC6NH (ENTRY RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:n.signals.suggestion.entryReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u th\u1ECB tr\u01B0\u1EDDng..."})]}),a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 23, 68, 0.02)",borderLeft:"4px solid var(--red)",border:"1px solid rgba(255, 23, 68, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--red)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F6E1}\uFE0F BI\u1EC6N GI\u1EA2I PH\xD2NG V\u1EC6 C\u1EAET L\u1ED6 (SL RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:n.signals.suggestion.slReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u b\u1EA3o v\u1EC7 v\u1ECB th\u1EBF..."})]}),a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(0, 230, 118, 0.02)",borderLeft:"4px solid var(--green)",border:"1px solid rgba(0, 230, 118, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--green)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F3AF} BI\u1EC6N GI\u1EA2I CH\u1ED0T L\u1EDCI M\u1EE4C TI\xCAU (TP RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:n.signals.suggestion.tpReason||"\u0110ang ph\xE2n t\xEDch m\u1EE5c ti\xEAu thanh kho\u1EA3n..."})]})]})]}),a("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},className:"ai-summary-grid",children:[a("div",{className:"trend-header-card",style:{margin:0},children:[a("div",{className:"trend-status-info",children:[e("span",{className:"trend-status-title",children:"Tr\u1EA1ng Th\xE1i C\u1EA5u Tr\xFAc SMC (XAU/USD)"}),e("div",{className:"trend-status-val",children:n.advancedAnalysis.structureShifts.length>0?(()=>{let t=n.advancedAnalysis.structureShifts[n.advancedAnalysis.structureShifts.length-1];return a("span",{className:t.direction==="BULLISH"?"text-green":"text-red",style:{color:t.direction==="BULLISH"?"var(--green)":"var(--red)",display:"flex",alignItems:"center",gap:"8px"},children:[t.direction==="BULLISH"?"\u{1F402} XU H\u01AF\u1EDANG T\u0102NG (BULLISH)":"Bearish GI\u1EA2M (BEARISH)",e("span",{className:"smc-badge active",style:{fontSize:"11px",padding:"4px 8px"},children:t.type})]})})():e("span",{style:{color:"var(--text2)"},children:"\u{1F7E1} T\xCDCH L\u0168Y (CONSOLIDATION)"})}),e("p",{style:{fontSize:"12px",color:"var(--text2)",marginTop:"4px"},children:"C\u1EA5u tr\xFAc Ph\xE1 v\u1EE1 c\u1EA5u tr\xFAc (BOS) & Thay \u0111\u1ED5i t\xEDnh ch\u1EA5t (CHoCH) t\u1EEB n\u1EBFn th\u1EF1c t\u1EBF."})]}),a("div",{className:"crossover-status",style:{marginTop:"10px"},children:[e("div",{className:"crossover-badge golden",style:{animation:"none",boxShadow:"none",fontSize:"11px"},children:a("span",{children:["FVG ACTIVE: ",n.advancedAnalysis.fvgs.filter(t=>!t.mitigated).length]})}),e("div",{className:"crossover-badge death",style:{animation:"none",boxShadow:"none",background:"rgba(255, 171, 0, 0.08)",border:"1.5px solid var(--yellow)",color:"var(--yellow)",fontSize:"11px"},children:a("span",{children:["OB ACTIVE: ",n.advancedAnalysis.orderBlocks.filter(t=>!t.mitigated).length]})})]})]}),a("div",{className:"trend-header-card",style:{margin:0},children:[a("div",{className:"trend-status-info",children:[e("span",{className:"trend-status-title",children:"Xu H\u01B0\u1EDBng & Giao C\u1EAFt EMA Cloud"}),e("div",{className:"trend-status-val",children:n.advancedAnalysis.emaTrend.alignment==="BULLISH"?e("span",{style:{color:"var(--green)"},children:"\u{1F402} T\u0102NG M\u1EA0NH (BULLISH ALIGNMENT)"}):n.advancedAnalysis.emaTrend.alignment==="BEARISH"?e("span",{style:{color:"var(--red)"},children:"\u{1F43B} GI\u1EA2M M\u1EA0NH (BEARISH ALIGNMENT)"}):e("span",{style:{color:"var(--yellow)"},children:"\u{1F7E1} T\xCDCH L\u0168Y (EMA FLAT)"})}),e("p",{style:{fontSize:"12px",color:"var(--text2)",marginTop:"4px"},children:n.advancedAnalysis.emaTrend.description})]}),a("div",{className:"crossover-status",style:{marginTop:"10px"},children:[n.advancedAnalysis.emaTrend.crossover==="GOLDEN_CROSS"&&e("div",{className:"crossover-badge golden",style:{fontSize:"11px"},children:e("span",{children:"\u2728 GOLDEN CROSS"})}),n.advancedAnalysis.emaTrend.crossover==="DEATH_CROSS"&&e("div",{className:"crossover-badge death",style:{fontSize:"11px"},children:e("span",{children:"\u{1F480} DEATH CROSS"})}),n.advancedAnalysis.emaTrend.pullback!=="NONE"&&e("div",{className:"pullback-banner",style:{fontSize:"11px"},children:a("span",{children:["\u{1F4E5} H\u1ED2I PULLBACK: ",n.advancedAnalysis.emaTrend.pullback.replace("PULLBACK_","").replace("_"," ")]})})]})]})]}),n.tradingViewAnalysis&&a("div",{className:"sug-card",children:[e("div",{className:"sug-title",style:{fontSize:"12px",borderBottom:"none",paddingBottom:0},children:"\u{1F3DB}\uFE0F H\u1EC7 Th\u1ED1ng \u0110\u01B0\u1EDDng Trung B\xECnh \u0110\u1ED9ng L\u0169y Th\u1EEBa (EMA Cloud)"}),a("div",{className:"ema-cloud-grid",style:{gridTemplateColumns:"repeat(5, 1fr)"},children:[a("div",{className:"ema-cloud-cell",children:[e("span",{className:"ema-cloud-name",children:"EMA 10"}),a("span",{className:"ema-cloud-val",style:{color:"var(--blue)"},children:["$",n.tradingViewAnalysis.ema10.toFixed(2)]})]}),a("div",{className:"ema-cloud-cell",children:[e("span",{className:"ema-cloud-name",children:"EMA 20"}),a("span",{className:"ema-cloud-val",style:{color:"var(--green)"},children:["$",n.tradingViewAnalysis.ema20.toFixed(2)]})]}),a("div",{className:"ema-cloud-cell",children:[e("span",{className:"ema-cloud-name",children:"EMA 50"}),a("span",{className:"ema-cloud-val",style:{color:"var(--gold)"},children:["$",n.tradingViewAnalysis.ema50.toFixed(2)]})]}),a("div",{className:"ema-cloud-cell",children:[e("span",{className:"ema-cloud-name",children:"EMA 100"}),a("span",{className:"ema-cloud-val",style:{color:"#d500f9"},children:["$",n.tradingViewAnalysis.ema100.toFixed(2)]})]}),a("div",{className:"ema-cloud-cell",children:[e("span",{className:"ema-cloud-name",children:"EMA 200"}),a("span",{className:"ema-cloud-val",style:{color:"var(--red)"},children:["$",n.tradingViewAnalysis.ema200.toFixed(2)]})]})]})]}),a("div",{className:"smc-grid",style:{gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[a("div",{className:"smc-card",children:[e("h3",{className:"smc-card-title",children:e("span",{children:"\u26A1 Kho\u1EA3ng Tr\u1ED1ng Gi\xE1 (Fair Value Gaps - FVG)"})}),e("div",{className:"smc-list",style:{maxHeight:"300px",overflowY:"auto"},children:n.advancedAnalysis.fvgs.length>0?n.advancedAnalysis.fvgs.slice().reverse().map((t,r)=>a("div",{className:`smc-row-item ${t.mitigated?"":"unmitigated"}`,style:{borderLeft:`4px solid ${t.type==="BULLISH"?"var(--green)":"var(--red)"}`},children:[a("div",{className:"smc-row-header",children:[e("span",{className:`smc-badge ${t.type==="BULLISH"?"bullish":"bearish"}`,children:t.type==="BULLISH"?"BULLISH FVG":"BEARISH FVG"}),e("span",{className:`smc-badge ${t.mitigated?"mitigated":"active"}`,children:t.mitigated?"Mitigated (\u0110\xE3 l\u1EA5p)":"Active (Ch\u01B0a l\u1EA5p)"})]}),a("div",{className:"smc-price-box",children:[a("div",{children:[e("span",{className:"smc-price-lbl",children:"Top:"}),a("span",{children:["$",t.top.toFixed(2)]})]}),a("div",{children:[e("span",{className:"smc-price-lbl",children:"Bottom:"}),a("span",{children:["$",t.bottom.toFixed(2)]})]})]})]},`fvg-${r}`)):e("div",{style:{textAlign:"center",color:"var(--text3)",padding:"20px"},children:"Ch\u01B0a ph\xE1t hi\u1EC7n kho\u1EA3ng tr\u1ED1ng FVG n\xE0o."})})]}),a("div",{className:"smc-card",children:[e("h3",{className:"smc-card-title",children:e("span",{children:"\u{1F3DB}\uFE0F Kh\u1ED1i L\u1EC7nh \u0110\u1ECBnh Ch\u1EBF (Order Blocks - OB)"})}),e("div",{className:"smc-list",style:{maxHeight:"300px",overflowY:"auto"},children:n.advancedAnalysis.orderBlocks.length>0?n.advancedAnalysis.orderBlocks.slice().reverse().map((t,r)=>a("div",{className:`smc-row-item ${t.mitigated?"":"unmitigated"}`,style:{borderLeft:`4px solid ${t.type==="BULLISH"?"var(--green)":"var(--red)"}`},children:[a("div",{className:"smc-row-header",children:[e("span",{className:`smc-badge ${t.type==="BULLISH"?"bullish":"bearish"}`,children:t.type==="BULLISH"?"\u{1F3DB}\uFE0F BULLISH OB":" Bearish OB"}),e("span",{className:`smc-badge ${t.mitigated?"mitigated":"active"}`,children:t.mitigated?"Mitigated":"Active / Unmitigated"})]}),a("div",{className:"smc-price-box",children:[a("div",{children:[e("span",{className:"smc-price-lbl",children:"High:"}),a("span",{children:["$",t.high.toFixed(2)]})]}),a("div",{children:[e("span",{className:"smc-price-lbl",children:"Low:"}),a("span",{children:["$",t.low.toFixed(2)]})]})]})]},`ob-${r}`)):e("div",{style:{textAlign:"center",color:"var(--text3)",padding:"20px"},children:"Kh\xF4ng t\xECm th\u1EA5y kh\u1ED1i l\u1EC7nh Order Block n\xE0o ho\u1EA1t \u0111\u1ED9ng."})})]}),a("div",{className:"smc-card",style:{gridColumn:"span 2"},children:[a("h3",{className:"smc-card-title",style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",flexWrap:"wrap",gap:"8px"},children:[e("span",{children:"\u{1F56F}\uFE0F T\u1ED5ng H\u1EE3p Price Action & M\xF4 H\xECnh N\u1EBFn \u0110\u1EA3o Chi\u1EC1u (A.I)"}),St&&a("div",{className:"live-update-badge",children:[e("span",{className:"pulse-dot"}),a("span",{style:{fontSize:"11px",color:"var(--green)",fontWeight:"normal",opacity:.9},children:["C\u1EADp nh\u1EADt l\xFAc: ",St]})]})]}),e("div",{className:"smc-list",style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",maxHeight:"400px",overflowY:"auto"},children:n.advancedAnalysis.patterns.length>0?n.advancedAnalysis.patterns.slice().reverse().map((t,r)=>a("div",{className:"smc-row-item",style:{borderLeft:`4px solid ${t.type==="BULLISH"?"var(--green)":"var(--red)"}`,margin:0},children:[a("div",{className:"smc-row-header",children:[e("span",{className:`smc-badge ${t.type==="BULLISH"?"bullish":"bearish"}`,children:t.type==="BULLISH"?"\u{1F4C8} BUY ALERT":"\u{1F4C9} SELL ALERT"}),e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"#fff"},children:t.name})]}),e("p",{className:"smc-desc",style:{marginTop:"4px",fontSize:"11.5px"},children:t.description}),e("span",{style:{fontSize:"9px",color:"var(--text3)",fontFamily:"monospace",alignSelf:"flex-end"},children:new Date(t.time*1e3).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})})]},`pattern-${r}`)):e("div",{style:{textAlign:"center",color:"var(--text3)",padding:"20px",gridColumn:"span 2"},children:"Ch\u01B0a ghi nh\u1EADn h\xE0nh vi n\u1EBFn \u0111\u1EB7c tr\u01B0ng trong d\u1EEF li\u1EC7u."})})]}),a("div",{className:"smc-card",style:{gridColumn:"span 2"},children:[e("h3",{className:"smc-card-title",children:"\u{1F3F9} T\xEDn Hi\u1EC7u Ch\u1EC9 B\xE1o \u0110\u1ED9ng L\u01B0\u1EE3ng & Qu\xE9t Thanh Kho\u1EA3n"}),a("div",{style:{display:"grid",gridTemplateColumns:"1.2fr 1fr 1fr",gap:"16px",marginTop:"8px"},children:[n.tradingViewAnalysis&&a("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[a("div",{className:"indicator-gauge-card",style:{padding:"8px",borderRadius:"4px"},children:[a("div",{className:"gauge-meta",style:{marginBottom:"4px"},children:[e("span",{className:"gauge-lbl",style:{fontSize:"10px"},children:"ADX Trend"}),e("span",{className:"gauge-val",style:{fontSize:"11px",color:"var(--gold)"},children:n.tradingViewAnalysis.adx.toFixed(1)})]}),e("div",{className:"gauge-track",style:{height:"4px"},children:e("div",{className:"gauge-fill",style:{width:`${Math.min(100,n.tradingViewAnalysis.adx*2)}%`,background:"var(--gold)"}})})]}),a("div",{className:"indicator-gauge-card",style:{padding:"8px",borderRadius:"4px"},children:[a("div",{className:"gauge-meta",style:{marginBottom:"4px"},children:[e("span",{className:"gauge-lbl",style:{fontSize:"10px"},children:"CCI(20)"}),e("span",{className:"gauge-val",style:{fontSize:"11px",color:n.tradingViewAnalysis.cci20>100?"var(--red)":n.tradingViewAnalysis.cci20<-100?"var(--green)":"#fff"},children:n.tradingViewAnalysis.cci20.toFixed(0)})]}),e("div",{className:"gauge-track",style:{height:"4px"},children:e("div",{className:"gauge-fill",style:{width:`${Math.max(5,Math.min(100,(n.tradingViewAnalysis.cci20+200)/400*100))}%`,background:n.tradingViewAnalysis.cci20>100?"var(--red)":n.tradingViewAnalysis.cci20<-100?"var(--green)":"var(--blue)"}})})]}),a("div",{className:"indicator-gauge-card",style:{padding:"8px",borderRadius:"4px"},children:[a("div",{className:"gauge-meta",style:{marginBottom:"4px"},children:[e("span",{className:"gauge-lbl",style:{fontSize:"10px"},children:"Stoch (K/D)"}),a("span",{className:"gauge-val",style:{fontSize:"11px",color:"var(--blue)"},children:[n.tradingViewAnalysis.stochK.toFixed(0),"/",n.tradingViewAnalysis.stochD.toFixed(0)]})]}),e("div",{className:"gauge-track",style:{height:"4px"},children:e("div",{className:"gauge-fill",style:{width:`${n.tradingViewAnalysis.stochK}%`,background:"var(--blue)"}})})]})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"170px",overflowY:"auto"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--gold)",display:"block",marginBottom:"4px"},children:"\u{1F3F9} Qu\xE9t Thanh Kho\u1EA3n (Sweeps)"}),n.advancedAnalysis.sweeps.length>0?n.advancedAnalysis.sweeps.slice(-3).reverse().map((t,r)=>a("div",{style:{background:"rgba(0, 176, 255, 0.04)",border:"1px solid rgba(0, 176, 255, 0.15)",borderRadius:"4px",padding:"6px",fontSize:"10.5px"},children:[a("div",{style:{color:"var(--blue)",fontWeight:"bold",fontSize:"9px"},children:[t.type," Sweep"]}),a("div",{style:{margin:"2px 0",color:"#fff"},children:["M\u1EE9c qu\xE9t: $",t.price.toFixed(2)]})]},`sw-${r}`)):e("span",{style:{fontSize:"10px",color:"var(--text3)"},children:"Ch\u01B0a qu\xE9t thanh kho\u1EA3n."})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"170px",overflowY:"auto"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--gold)",display:"block",marginBottom:"4px"},children:"\u{1F9EC} Ph\xE1 C\u1EA5u Tr\xFAc (BOS/CHoCH)"}),n.advancedAnalysis.structureShifts.length>0?n.advancedAnalysis.structureShifts.slice(-3).reverse().map((t,r)=>a("div",{style:{background:"rgba(0, 230, 118, 0.02)",border:`1px solid ${t.direction==="BULLISH"?"rgba(0, 230, 118, 0.15)":"rgba(255, 23, 68, 0.15)"}`,borderRadius:"4px",padding:"6px",fontSize:"10.5px"},children:[a("div",{style:{color:t.direction==="BULLISH"?"var(--green)":"var(--red)",fontWeight:"bold",fontSize:"9px"},children:[t.type," (",t.direction,")"]}),a("div",{style:{margin:"2px 0",color:"#fff"},children:["Gi\xE1 ph\xE1: $",t.price.toFixed(2)]})]},`sh-${r}`)):e("span",{style:{fontSize:"10px",color:"var(--text3)"},children:"Ch\u01B0a ph\xE1 c\u1EA5u tr\xFAc."})]})]})]})]})]}),D==="backtest"&&n&&a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[a("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"20px"},children:[a("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px",flexWrap:"wrap",gap:"12px"},children:[a("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F4CA}"}),a("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"var(--gold)",margin:0,letterSpacing:"0.5px"},children:"NH\u1EACT K\xDD & L\u1ECACH S\u1EEC GIAO D\u1ECACH A.I BACKTEST"}),e("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"Hi\u1EC7u su\u1EA5t ki\u1EC3m th\u1EED chi\u1EBFn l\u01B0\u1EE3c tr\xEAn d\u1EEF li\u1EC7u n\u1EBFn bi\u1EC3u \u0111\u1ED3 th\u1EDDi gian th\u1EF1c"})]})]}),e("button",{className:"modal-btn apply",onClick:$t,disabled:Me,style:{display:"flex",alignItems:"center",gap:"8px",background:"var(--gold)",color:"#000",fontWeight:"bold",border:"none",borderRadius:"6px",padding:"8px 16px",cursor:"pointer",opacity:Me?.6:1,transition:"all 0.2s"},children:Me?"\u23F3 \u0110ang ch\u1EA1y Backtest...":"\u{1F504} Ch\u1EA1y L\u1EA1i Backtest Th\u1EF1c T\u1EBF"})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[a("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"Khung th\u1EDDi gian:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:["ALL","M1","M5","M15","H1","D1"].map(t=>e("button",{onClick:()=>Wt(t),style:{background:Q===t?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${Q===t?"var(--gold)":"var(--border)"}`,color:Q===t?"var(--gold)":"var(--text2)",padding:"4px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t==="ALL"?"\u{1F30D} T\u1EA4T C\u1EA2":`\u26A1 ${t}`},t))})]}),a("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"L\u1ECDc ng\xE0y giao d\u1ECBch:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{value:"TODAY",label:"\u{1F4C5} H\xF4m nay"},{value:"YESTERDAY",label:"\u{1F4C5} H\xF4m qua"},{value:"ALL",label:"\u{1F310} T\u1EA5t c\u1EA3 c\xE1c ng\xE0y"}].map(t=>e("button",{onClick:()=>Ft(t.value),style:{background:ne===t.value?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${ne===t.value?"var(--gold)":"var(--border)"}`,color:ne===t.value?"var(--gold)":"var(--text2)",padding:"4px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t.label},t.value))})]})]}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginTop:"4px"},children:[a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1ED5ng l\u1EC7nh ch\u1ED1t"}),e("strong",{style:{fontSize:"20px",color:"#fff",fontFamily:"monospace"},children:ie.total})]}),a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1EF7 L\u1EC7 Th\u1EAFng (Win Rate)"}),a("strong",{style:{fontSize:"20px",color:ie.winRate>=50?"var(--green)":"var(--yellow)",fontFamily:"monospace"},children:[ie.winRate,"%"]})]}),a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"Pips R\xF2ng t\xEDch l\u0169y"}),a("strong",{style:{fontSize:"20px",color:ie.netPips>=0?"var(--green)":"var(--red)",fontFamily:"monospace"},children:[ie.netPips>=0?"+":"",ie.netPips," pips"]})]})]})]}),a("div",{className:"smc-card",style:{margin:0},children:[e("h3",{className:"smc-card-title",children:"\u{1F4CB} Nh\u1EADt K\xFD Giao D\u1ECBch Ch\u1ED1t L\u1EDDi / C\u1EAFt L\u1ED7 Chi Ti\u1EBFt"}),e("div",{style:{overflowX:"auto"},children:a("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"12px"},children:[e("thead",{children:a("tr",{style:{borderBottom:"1px solid var(--border)",color:"var(--text2)",background:"rgba(255,255,255,0.01)"},children:[e("th",{style:{padding:"12px",fontWeight:"bold"},children:"M\xE3 l\u1EC7nh (ID)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Khung gi\u1EDD"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Lo\u1EA1i l\u1EC7nh"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 kh\u1EDBp (Entry)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"C\u1EAFt L\u1ED7 (SL)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 1 (TP1)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 2 (TP2)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 \u0111\xF3ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"K\u1EBFt qu\u1EA3"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Pips r\xF2ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\u1EDD \u0111\xF3ng"})]})}),e("tbody",{children:j.length>0?(()=>{let t="";return j.map((r,o)=>{let i=new Date(r.closeTime).toLocaleDateString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",day:"2-digit",month:"2-digit",year:"numeric"}),l=t!==i;return l&&(t=i),a(Sa.Fragment,{children:[l&&e("tr",{style:{background:"rgba(255, 215, 0, 0.04)"},children:a("td",{colSpan:11,style:{padding:"8px 12px",color:"var(--gold)",fontWeight:"bold",letterSpacing:"0.5px"},children:["\u{1F4C5} L\u1EC6NH \u0110\xC3 \u0110\xD3NG NG\xC0Y: ",i]})}),a("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.03)",background:o%2===0?"rgba(255,255,255,0.005)":"transparent"},children:[e("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--text2)"},children:r.id}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:"smc-badge active",style:{fontSize:"10.5px"},children:r.timeframe})}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${r.position==="BUY"?"bullish":"bearish"}`,style:{fontSize:"10.5px"},children:r.position})}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace"},children:["$",r.entry.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--red)"},children:["$",r.stopLoss.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)"},children:["$",r.takeProfit1.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)",opacity:.9},children:["$",r.takeProfit2.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:r.status==="SL"?"var(--red)":"var(--green)"},children:["$",(r.status==="SL"?r.stopLoss:r.status==="TP1"?r.takeProfit1:r.takeProfit2).toFixed(2)]}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${r.status==="SL"?"bearish":"bullish"}`,style:{fontSize:"10.5px",background:r.status==="SL"?"rgba(255, 23, 68, 0.15)":"rgba(0, 230, 118, 0.15)",color:r.status==="SL"?"var(--red)":"var(--green)",border:`1.5px solid ${r.status==="SL"?"var(--red)":"var(--green)"}`},children:r.status==="SL"?"STOP LOSS":r.status==="TP1"?"TAKE PROFIT 1":"TAKE PROFIT 2"})}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:r.pips>=0?"var(--green)":"var(--red)"},children:[r.pips>=0?"+":"",r.pips," pips"]}),e("td",{style:{padding:"10px 12px",color:"var(--text3)"},children:new Date(r.closeTime).toLocaleTimeString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",hour:"2-digit",minute:"2-digit"})})]})]},`trade-row-${r.id}-${o}`)})})():e("tr",{children:e("td",{colSpan:11,style:{padding:"20px",textAlign:"center",color:"var(--text3)"},children:Me?"\u0110ang ti\u1EBFn h\xE0nh ch\u1EA1y backtest tr\xEAn d\u1EEF li\u1EC7u n\u1EBFn th\u1EADt...":`Kh\xF4ng c\xF3 l\u1ECBch s\u1EED giao d\u1ECBch n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn cho khung th\u1EDDi gian ${Q}!`})})})]})})]})]}),D==="outlook"&&n?.marketOutlook&&(()=>{let t=n.marketOutlook;return a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[a("div",{className:"outlook-banner",style:{borderTop:"4px solid var(--gold)"},children:[a("div",{children:[e("span",{style:{fontSize:"11px",textTransform:"uppercase",color:"var(--text3)",letterSpacing:"1.5px",fontWeight:"bold"},children:"H\u1EC6 TH\u1ED0NG PH\xC2N T\xCDCH H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT H\xC0NG NG\xC0Y"}),e("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",margin:"6px 0",letterSpacing:"0.5px"},children:"XAU/USD GOLD SPOT"}),a("span",{style:{fontSize:"12px",color:"var(--text2)"},children:["Th\u1EDDi gian c\u1EADp nh\u1EADt: ",e("strong",{style:{color:"var(--gold)"},children:t.date})," | Khung \u0111\u1ED3 th\u1ECB: ",e("strong",{children:t.timeframe})]})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"},children:a("div",{style:{textAlign:"right"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",display:"block",textTransform:"uppercase",fontWeight:"bold",marginBottom:"2px"},children:"Xu h\u01B0\u1EDBng ch\u1EE7 \u0111\u1EA1o"}),e("span",{className:t.synthesizedOutlook.bias==="BUY"?"outlook-badge-buy":t.synthesizedOutlook.bias==="SELL"?"outlook-badge-sell":"outlook-badge-hold",style:{display:"inline-block"},children:t.synthesizedOutlook.bias==="BUY"?"\u{1F7E2} MUA CH\u1EE6 \u0110\u1EA0O (BUY)":t.synthesizedOutlook.bias==="SELL"?"\u{1F534} B\xC1N CH\u1EE6 \u0110\u1EA0O (SELL)":"\u{1F7E1} \u0110\u1EE8NG NGO\xC0I (HOLD)"})]})})]}),a("div",{className:"outlook-summary-box",style:{margin:0,padding:"30px",borderLeft:"5px solid var(--gold)"},children:[e("h3",{style:{fontSize:"16px",color:"var(--gold)",margin:"0 0 16px 0",borderBottom:"1.5px solid var(--border)",paddingBottom:"12px",display:"flex",alignItems:"center",gap:"10px",fontWeight:"800",letterSpacing:"0.5px"},children:"\u{1F4DD} NH\u1EACN \u0110\u1ECANH T\u1ED4NG QUAN TRONG NG\xC0Y (DOW + SMC + PRICE ACTION)"}),e("p",{style:{fontSize:"14.5px",color:"#fff",lineHeight:"1.85",margin:"0 0 26px 0",textAlign:"justify",fontWeight:"400",opacity:"0.95"},children:t.synthesizedOutlook.summary}),e("h4",{style:{fontSize:"11px",color:"var(--text3)",margin:"0 0 12px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold"},children:"\u{1F4CA} H\u1EC6 TH\u1ED0NG CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT:"}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"26px"},className:"outlook-grid",children:[a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F4C8} L\xDD THUY\u1EBET DOW (H1)"}),a("strong",{style:{display:"block",fontSize:"14px",color:t.trendDow.primary==="T\u0102NG"?"var(--green)":t.trendDow.primary==="GI\u1EA2M"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["Xu h\u01B0\u1EDBng: ",t.trendDow.primary]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["S\xF3ng c\u1EA5p 2: ",t.trendDow.secondary]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{children:["Kh\xE1ng c\u1EF1 ch\xEDnh: ",a("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[0]?.price?t.trendDow.keyLevels[0].price.toFixed(1):"\u2014"]})]}),a("div",{children:["H\u1ED7 tr\u1EE3 ch\xEDnh: ",a("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[1]?.price?t.trendDow.keyLevels[1].price.toFixed(1):"\u2014"]})]})]})]}),a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F3DB}\uFE0F SMART MONEY CONCEPTS"}),a("strong",{style:{display:"block",fontSize:"14px",color:"#fff",marginTop:"6px"},children:["C\u1EA5u tr\xFAc: ",t.smcAnalysis.marketStructure]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["Kh\u1ED1i C\u1EA7u/Cung: ",t.smcAnalysis.keyOrderBlocks.length," OB ho\u1EA1t \u0111\u1ED9ng"]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{children:["Kho\u1EA3ng FVG H1: ",e("strong",{style:{color:"#80deea",fontFamily:"monospace"},children:t.smcAnalysis.fvgs[0]?.gap||"\u0110\xE3 l\u1EA5p h\u1EBFt"})]}),a("div",{children:["C\u1EA3n OB Cung: ",e("strong",{style:{color:"var(--red)",fontFamily:"monospace"},children:t.smcAnalysis.keyOrderBlocks.find(r=>r.type.includes("BEARISH"))?.priceRange||"Kh\xF4ng c\xF3"})]})]})]}),a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F56F}\uFE0F PRICE ACTION & T\xC2M L\xDD"}),a("strong",{style:{display:"block",fontSize:"14px",color:t.priceAction.sentiment==="T\xCDCH C\u1EF0C"?"var(--green)":t.priceAction.sentiment==="TI\xCAU C\u1EF0C"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["T\xE2m l\xFD n\u1EBFn: ",t.priceAction.sentiment]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["N\u1EBFn \u0111\u1EB7c tr\u01B0ng: ",t.priceAction.recentPatterns[0]?.split(":")[0]||"Kh\xF4ng c\xF3"]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn g\u1EA7n nh\u1EA5t: ",e("strong",{children:t.priceAction.recentPatterns[0]?.split(":")[0]||"Trung l\u1EADp"})]}),a("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn li\u1EC1n k\u1EC1: ",e("strong",{children:t.priceAction.recentPatterns[1]?.split(":")[0]||"Trung l\u1EADp"})]})]})]})]}),a("div",{style:{background:"linear-gradient(135deg, rgba(255, 171, 0, 0.05) 0%, rgba(7, 9, 14, 0.6) 100%)",border:"1.5px dashed var(--gold)",borderRadius:"14px",padding:"22px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.2)"},children:[e("h4",{style:{fontSize:"12px",color:"var(--gold)",margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"6px"},children:"\u26A1 K\u1EBE HO\u1EA0CH GIAO D\u1ECACH H\u1EE2P L\u01AFU CHI TI\u1EBET TRONG NG\xC0Y"}),a("p",{style:{fontSize:"14px",color:"#fff",fontWeight:"700",lineHeight:"1.6",margin:"0"},children:["\u{1F449} ",t.priceAction.actionableAdvice]})]})]})]})})()]})]})]})]}):e("div",{className:"auth-container",children:a("div",{className:"auth-card",children:[a("div",{className:"auth-header",style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"110px",height:"110px",borderRadius:"14px",marginBottom:"16px",filter:"drop-shadow(0 0 20px rgba(255, 171, 0, 0.5))"}}),e("h1",{className:"auth-title",children:"XAU/USD GOLD PRO"}),e("p",{className:"auth-subtitle",children:"H\u1EC7 th\u1ED1ng T\xEDn hi\u1EC7u & \u0110\u1ED3 th\u1ECB th\xF4ng minh"})]}),vt&&a("div",{className:"auth-alert error",children:[e("span",{children:"\u26A0\uFE0F"}),e("div",{children:vt})]}),yt&&a("div",{className:"auth-alert success",children:[e("span",{children:"\u2705"}),e("div",{children:yt})]}),je==="login"&&a(Ae,{children:[a("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn active",children:"\u0110\u0102NG NH\u1EACP"}),e("button",{className:"auth-tab-btn",onClick:()=>{ee("register"),k(null),L(null)},children:"\u0110\u0102NG K\xDD"})]}),a("form",{className:"auth-form",onSubmit:aa,children:[a("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u0110\u1ECBa ch\u1EC9 Email"}),e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:Y,onChange:t=>_e(t.target.value),required:!0})]}),a("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"M\u1EADt kh\u1EA9u"}),e("input",{type:"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:te,onChange:t=>qe(t.target.value),required:!0})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:de,children:de?"\u0110ang x\xE1c th\u1EF1c...":"M\u1EDE KH\xD3A TERMINAL \u{1F513}"})]})]}),je==="register"&&a(Ae,{children:[a("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn",onClick:()=>{ee("login"),k(null),L(null)},children:"\u0110\u0102NG NH\u1EACP"}),e("button",{className:"auth-tab-btn active",children:"\u0110\u0102NG K\xDD"})]}),a("form",{className:"auth-form",onSubmit:ra,children:[a("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u0110\u1ECBa ch\u1EC9 Email th\u1EF1c t\u1EBF"}),e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:Y,onChange:t=>_e(t.target.value),required:!0})]}),a("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"M\u1EADt kh\u1EA9u (t\u1EEB 6 k\xFD t\u1EF1)"}),e("input",{type:"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:te,onChange:t=>qe(t.target.value),required:!0})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:de,children:de?"\u0110ang \u0111\u0103ng k\xFD & g\u1EEDi OTP...":"\u0110\u0102NG K\xDD & G\u1EECI OTP \u2709\uFE0F"})]})]}),je==="otp"&&a("div",{className:"auth-otp-wrap",children:[a("div",{style:{textAlign:"center",color:"var(--text2)",fontSize:"13.5px"},children:["Vui l\xF2ng nh\u1EADp m\xE3 OTP 6 s\u1ED1 \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi h\xF2m th\u01B0:",e("br",{}),e("strong",{style:{color:"var(--gold)"},children:Y})]}),a("form",{className:"auth-form",style:{width:"100%"},onSubmit:oa,children:[a("div",{className:"auth-field",children:[e("label",{className:"auth-label",style:{textAlign:"center"},children:"M\xC3 X\xC1C TH\u1EF0C OTP"}),e("input",{type:"text",maxLength:6,className:"auth-otp-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022",value:Ee,onChange:t=>ze(t.target.value.replace(/\D/g,"")),required:!0})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:de||Ee.length!==6,children:de?"\u0110ang ki\u1EC3m tra...":"K\xCDCH HO\u1EA0T T\xC0I KHO\u1EA2N \u{1F680}"})]}),Ze&&a("div",{style:{background:"rgba(255, 171, 0, 0.08)",border:"1px dashed var(--gold)",borderRadius:"8px",padding:"12px",marginTop:"12px",fontSize:"12.5px",color:"var(--text)",textAlign:"center",lineHeight:"1.5"},children:[e("div",{style:{fontWeight:"bold",color:"var(--gold)",marginBottom:"4px"},children:"\u{1F916} PH\xC1T HI\u1EC6N CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M"}),"M\xE1y ch\u1EE7 ch\u01B0a c\u1EA5u h\xECnh Email API trong t\u1EC7p ",e("code",{style:{color:"var(--yellow)",fontFamily:"monospace"},children:".env"}),".",a("div",{style:{margin:"8px 0"},children:["M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ",e("strong",{style:{color:"var(--green)",fontSize:"16px",fontFamily:"monospace",letterSpacing:"1px"},children:Ze})]}),e("span",{onClick:()=>ze(Ze),style:{background:"rgba(0, 230, 118, 0.15)",color:"var(--green)",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",cursor:"pointer",fontWeight:"bold",display:"inline-block",border:"1px solid rgba(0, 230, 118, 0.3)"},children:"\u26A1 T\u1EF0 \u0110\u1ED8NG \u0110I\u1EC0N M\xC3 OTP"}),a("div",{style:{fontSize:"10.5px",color:"var(--text3)",marginTop:"8px"},children:["\u0110\u1EC3 g\u1EEDi email th\u1EADt v\u1EC1 h\xF2m th\u01B0, vui l\xF2ng c\u1EA5u h\xECnh SMTP ho\u1EB7c Resend API trong t\u1EC7p ",e("strong",{style:{color:"#fff"},children:".env"})," \u1EDF th\u01B0 m\u1EE5c d\u1EF1 \xE1n v\xE0 kh\u1EDFi \u0111\u1ED9ng l\u1EA1i server."]})]}),e("div",{className:"auth-resend",children:le>0?a("span",{children:["G\u1EEDi l\u1EA1i m\xE3 sau ",Math.floor(le/60),":",(le%60).toString().padStart(2,"0")]}):a("span",{children:["Kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c email? ",e("span",{onClick:na,children:"B\u1EA5m g\u1EEDi l\u1EA1i OTP"})]})}),e("div",{className:"auth-link",onClick:()=>{ee("login"),k(null),L(null),q("")},children:"\u2190 Quay l\u1EA1i trang \u0110\u0103ng nh\u1EADp"})]})]})})}var Ut=`
:root {
  --bg: #07090e; 
  --bg2: #0e111a; 
  --bg3: #151a26; 
  --border: #22293a;
  --gold: #ffd700;
  --gold-glow: rgba(255, 215, 0, 0.15);
  --gold-dark: #b8860b;
  --text: #f0f3f6; 
  --text2: #9eacbf; 
  --text3: #52637a;
  --green: #00e676; 
  --red: #ff1744; 
  --yellow: #ffab00; 
  --blue: #00b0ff;
  --green-bg: rgba(0, 230, 118, 0.06); 
  --red-bg: rgba(255, 23, 68, 0.06);
  --blue-bg: rgba(0, 176, 255, 0.06);
}

* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

body { 
  font-family: 'Inter', -apple-system, sans-serif; 
  background: var(--bg); 
  color: var(--text); 
  overflow: hidden; 
}

.root { 
  height: 100vh; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden; 
}

/* TOPBAR */
.topbar { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 0 20px; 
  height: 54px; 
  background: var(--bg2); 
  border-bottom: 1px solid var(--border); 
  flex-shrink: 0; 
  z-index: 100; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.topbar-left { 
  display: flex; 
  align-items: center; 
  gap: 24px; 
}

.brand { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
}

.brand-icon { 
  font-size: 26px; 
  filter: drop-shadow(0 0 8px var(--gold));
  animation: shine 3s infinite ease-in-out;
}

@keyframes shine {
  0%, 100% { filter: drop-shadow(0 0 2px var(--gold)); }
  50% { filter: drop-shadow(0 0 10px var(--gold)); }
}

.brand-name { 
  font-size: 18px; 
  font-weight: 800; 
  background: linear-gradient(135deg, var(--gold), #fff, var(--gold-dark)); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  letter-spacing: 0.5px;
}

.brand-badge { 
  font-size: 9px; 
  font-weight: 800; 
  background: var(--red); 
  color: #fff; 
  padding: 2px 7px; 
  border-radius: 4px; 
  animation: pulse 1.5s infinite; 
  letter-spacing: 0.8px; 
}

@keyframes pulse { 
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 23, 68, 0.4); } 
  50% { opacity: 0.6; box-shadow: 0 0 8px 3px rgba(255, 23, 68, 0.6); } 
}

.topbar-right { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
}

.clock { 
  font-size: 12px; 
  color: var(--text2); 
  font-family: monospace; 
  background: var(--bg3); 
  padding: 5px 12px; 
  border-radius: 8px; 
  border: 1px solid var(--border);
}

.src-link { 
  color: var(--text2); 
  text-decoration: none; 
  font-size: 13px; 
  font-weight: 600; 
  padding: 5px 12px; 
  border-radius: 8px; 
  border: 1px solid var(--border); 
  transition: all 0.2s; 
}

.src-link:hover { 
  color: var(--gold); 
  border-color: var(--gold); 
  background: var(--gold-glow);
}

/* LAYOUT */
.layout { 
  display: flex; 
  flex: 1; 
  overflow: hidden; 
}

/* SIDEBAR - TRADING TERMINAL SIDE INFO */
.sidebar { 
  width: 320px; 
  background: var(--bg2); 
  border-right: 1px solid var(--border); 
  display: flex; 
  flex-direction: column; 
  overflow-y: auto; 
  flex-shrink: 0; 
}

.sb-header {
  padding: 16px;
  border-bottom: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255,215,0,0.03) 0%, rgba(0,0,0,0) 100%);
}

.gold-profile-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--bg3);
  border-radius: 12px;
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.gold-profile-card::after {
  content: "";
  position: absolute;
  top: 0; right: 0;
  width: 4px; height: 100%;
  background: var(--gold);
}

.g-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 6px;
}

.g-desc {
  font-size: 11px;
  color: var(--text2);
  line-height: 1.5;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.stat-item {
  padding: 8px;
  background: var(--bg2);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.stat-label {
  display: block;
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
}

.stat-val {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  font-family: monospace;
}

.stat-val.up { color: var(--green); }
.stat-val.down { color: var(--red); }

/* MAIN PANELS */
.main { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden;
  min-height: 0;
}

.sym-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 12px 20px; 
  background: var(--bg2); 
  border-bottom: 1px solid var(--border); 
  flex-wrap: wrap; 
  gap: 12px; 
}

.sym-info { 
  display: flex; 
  align-items: center; 
  gap: 16px; 
}

.sym-title-wrap {
  display: flex;
  flex-direction: column;
}

.sym-title { 
  font-size: 20px; 
  font-weight: 800; 
  color: #fff; 
  letter-spacing: 0.5px;
}

.sym-subtitle {
  font-size: 10px;
  color: var(--text3);
  text-transform: uppercase;
}

.price-info { 
  display: flex; 
  align-items: baseline; 
  gap: 12px; 
}

.price-current { 
  font-size: 26px; 
  font-weight: 900; 
  color: #fff; 
  font-family: monospace; 
  text-shadow: 0 0 10px rgba(255,255,255,0.1);
}

.price-change { 
  font-size: 13px; 
  font-weight: 700; 
  padding: 3px 10px; 
  border-radius: 6px; 
}

.price-change.up { 
  color: var(--green); 
  background: var(--green-bg); 
  border: 1px solid rgba(0, 230, 118, 0.15);
}

.price-change.down { 
  color: var(--red); 
  background: var(--red-bg); 
  border: 1px solid rgba(255, 23, 68, 0.15);
}

.tf-row { 
  display: flex; 
  gap: 6px; 
  align-items: center; 
}

.tf-btn { 
  padding: 6px 14px; 
  background: none; 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  color: var(--text2); 
  cursor: pointer; 
  font-size: 12px; 
  font-weight: 700; 
  transition: all 0.2s; 
}

.tf-btn:hover { 
  border-color: var(--gold); 
  color: var(--gold); 
}

.tf-btn.active { 
  background: var(--gold); 
  border-color: var(--gold); 
  color: #000; 
}

.control-btn { 
  padding: 6px 12px; 
  background: none; 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  cursor: pointer; 
  font-size: 15px; 
  transition: all 0.2s; 
}

.control-btn:hover { 
  border-color: var(--gold); 
  background: var(--gold-glow);
}

.control-btn.active {
  background: var(--green-bg);
  border-color: var(--green);
  color: var(--green);
}

.control-btn:disabled { 
  opacity: 0.4; 
}

/* Loading & errors */
.load-bar { 
  height: 2px; 
  background: var(--bg3); 
  overflow: hidden; 
}

.load-fill { 
  height: 100%; 
  width: 40%; 
  background: linear-gradient(90deg, var(--gold), var(--green)); 
  animation: loadmove 1.2s infinite ease-in-out; 
}

@keyframes loadmove { 
  0% { transform: translateX(-100%) } 
  100% { transform: translateX(300%) } 
}

.err-msg { 
  background: var(--red-bg); 
  color: var(--red); 
  padding: 12px 20px; 
  font-size: 13px; 
  border-bottom: 1px solid rgba(255, 23, 68, 0.2); 
}

/* GRID LAYOUT FOR CHART AND MILLISECOND FEED */
.main-workspace {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--border);
  flex: 1.6;
  min-height: 480px;
  background: var(--bg);
  overflow: hidden;
}

.chart-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.chart-wrap { 
  flex: 1;
  display: flex; 
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: #131722;
  min-height: 350px;
}

.chart-svg { 
  width: 100%; 
  flex: 1;
  display: block;
}

.chart-empty { 
  color: var(--text3); 
  font-size: 15px; 
}

.chart-badge {
  position: absolute;
  top: 15px;
  left: 20px;
  background: rgba(14, 17, 26, 0.7);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  font-size: 11px;
  color: var(--text2);
  pointer-events: none;
  font-family: monospace;
}

/* REAL-TIME MILLISECOND FEED PANEL (ORDER BOOK & TRADES) */
.realtime-panel {
  width: 280px;
  border-left: 1px solid var(--border);
  background: var(--bg2);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.panel-tab {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--bg3);
}

.tab-btn {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  color: var(--text2);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s;
  text-transform: uppercase;
}

.tab-btn.active {
  color: var(--gold);
  background: var(--bg2);
  border-bottom: 2px solid var(--gold);
}

.book-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 11px;
}

.book-header {
  display: flex;
  justify-content: space-between;
  color: var(--text3);
  padding: 4px 6px;
  border-bottom: 1px solid var(--border);
  font-weight: bold;
}

.book-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 6px;
  position: relative;
  cursor: pointer;
  transition: background 0.1s;
}

.book-row:hover { background: var(--bg3); }

.book-row .size-bar {
  position: absolute;
  top: 1px; right: 0; bottom: 1px;
  z-index: 1;
  opacity: 0.12;
  transition: width 0.3s ease;
}

.book-row.ask .size-bar { background: var(--red); }
.book-row.bid .size-bar { background: var(--green); }

.book-row span { position: relative; z-index: 2; }
.book-row.ask .price { color: var(--red); }
.book-row.bid .price { color: var(--green); }

.book-spread {
  padding: 8px 6px;
  margin: 4px 0;
  background: var(--bg3);
  border-radius: 6px;
  text-align: center;
  font-weight: 700;
  color: var(--text2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.02);
}

.trades-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  font-family: monospace;
  font-size: 10px;
}

.trade-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 6px;
  border-bottom: 1px solid rgba(255,255,255,0.02);
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from { transform: translateY(-5px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.trade-row.buy .price { color: var(--green); }
.trade-row.sell .price { color: var(--red); }
.trade-row .time { color: var(--text3); }
.trade-row .size { color: var(--text2); }

/* SIGNAL & PROBABILITY DASHBOARD */
.signal-dash { 
  padding: 20px; 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.top-metrics-row {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}

@media (max-width: 1000px) {
  .top-metrics-row { grid-template-columns: 1fr; }
}

/* HERO SIGNAL BOX */
.hero-signal { 
  display: flex; 
  align-items: center; 
  gap: 24px; 
  padding: 24px; 
  background: var(--bg2); 
  border: 2px solid; 
  border-radius: 16px; 
  flex-wrap: wrap; 
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.hero-signal::before {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(255,255,255,0.01) 0%, transparent 100%);
  pointer-events: none;
}

.hero-badge { 
  padding: 16px 36px; 
  border-radius: 12px; 
  font-size: 22px; 
  font-weight: 900; 
  color: #000; 
  text-align: center; 
  min-width: 180px; 
  letter-spacing: 0.5px;
  text-shadow: none; 
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

.hero-meters { 
  flex: 1; 
  min-width: 240px; 
  display: flex; 
  flex-direction: column; 
  gap: 12px; 
}

.meter { }
.meter-head { 
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 5px; 
}

.meter-label { 
  font-size: 12px; 
  color: var(--text2); 
}

.meter-val { 
  font-size: 14px; 
  font-weight: 800; 
}

.meter-track { 
  height: 8px; 
  background: var(--bg3); 
  border-radius: 4px; 
  overflow: hidden; 
  border: 1px solid rgba(255,255,255,0.01);
}

.meter-fill { 
  height: 100%; 
  border-radius: 4px; 
  transition: width 0.8s cubic-bezier(0.1, 0.8, 0.2, 1); 
}

.hero-prob { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  gap: 8px; 
}

.prob-circle { 
  width: 90px; 
  height: 90px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  box-shadow: 0 0 15px rgba(0,0,0,0.4);
}

.prob-circle span { 
  background: var(--bg2); 
  width: 66px; 
  height: 66px; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 20px; 
  font-weight: 900; 
  color: #fff; 
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

.prob-label { 
  font-size: 11px; 
  color: var(--text2); 
  text-align: center; 
  font-weight: 600;
}

/* SUGGESTION CARD (G\u1EE3i \xFD giao d\u1ECBch) */
.sug-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  background: linear-gradient(135deg, var(--bg2) 0%, rgba(21, 26, 38, 0.5) 100%);
  position: relative;
}

.sug-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
}

.sug-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.sug-item {
  padding: 10px 12px;
  background: var(--bg3);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.02);
}

.sug-label {
  display: block;
  font-size: 10px;
  color: var(--text3);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.sug-val {
  display: block;
  font-size: 15px;
  font-weight: 800;
  font-family: monospace;
}

.sug-val.buy { color: var(--green); }
.sug-val.sell { color: var(--red); }
.sug-val.entry { color: var(--blue); }
.sug-val.tp { color: var(--gold); }
.sug-val.sl { color: var(--red); }

/* INDICATOR CARD GRID */
.ind-grid { 
  display: grid; 
  grid-template-columns: repeat(6, 1fr); 
  gap: 12px; 
}

.ind-card { 
  background: var(--bg2); 
  border: 1px solid var(--border); 
  border-radius: 12px; 
  padding: 16px 12px; 
  text-align: center; 
  transition: all 0.3s; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.ind-card:hover { 
  border-color: var(--gold); 
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.05);
}

.ind-label { 
  display: block; 
  font-size: 10px; 
  color: var(--text3); 
  text-transform: uppercase; 
  letter-spacing: 0.8px; 
  margin-bottom: 10px; 
}

.ind-value { 
  display: block; 
  font-size: 18px; 
  font-weight: 800; 
}

.ind-hint { 
  display: block; 
  font-size: 9px; 
  color: var(--text3); 
  margin-top: 5px; 
  font-weight: 500;
}

/* REASONS & LOGS */
.reasons-box { 
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

@media (max-width: 900px) {
  .reasons-box { grid-template-columns: 1fr; }
}

.reasons { 
  background: var(--bg2); 
  border: 1px solid var(--border); 
  border-radius: 16px; 
  padding: 20px; 
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
}

.reasons h3 { 
  font-size: 14px; 
  margin-bottom: 14px; 
  color: #fff; 
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.reason-row { 
  padding: 8px 0; 
  font-size: 13px; 
  color: var(--text2); 
  border-bottom: 1px solid rgba(255,255,255,0.02); 
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.4;
}

.reason-row::before {
  content: "\u2726";
  color: var(--gold);
  font-weight: bold;
}

.reason-row:last-child { 
  border: none; 
}

/* DISCLAIMER */
.disclaimer { 
  background: rgba(255, 171, 0, 0.03); 
  border: 1px solid rgba(255, 171, 0, 0.12); 
  border-radius: 10px; 
  padding: 12px 20px; 
  font-size: 11px; 
  color: var(--yellow); 
  text-align: center; 
  line-height: 1.5;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .ind-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 780px) {
  /* BODY & ROOT SCROLLABLE FOR MOBILE */
  body, .root {
    overflow: auto !important;
    height: auto !important;
  }

  /* LAYOUT & ORDER */
  .layout {
    flex-direction: column !important;
    overflow: visible !important;
    height: auto !important;
  }
  .sidebar {
    width: 100% !important;
    order: 2 !important; /* Stacks sidebar cleanly below the chart & terminal tabs */
    border-right: none !important;
    border-top: 1px solid var(--border) !important;
    height: auto !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
  }
  .main {
    width: 100% !important;
    order: 1 !important; /* Keeps primary chart & terminal tabs at the top for quick access */
    height: auto !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
  }
  
  /* WORKSPACE CHART & ECONOMIC CALENDAR / ORDER BOOK */
  .main-workspace {
    flex-direction: column !important;
    min-height: auto !important;
    height: auto !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
  }
  .chart-column {
    width: 100% !important;
    height: 350px !important; /* Optimized height for mobile viewports */
    min-height: 350px !important;
    overflow: hidden !important;
    flex-shrink: 0 !important;
  }
  .chart-column.full-chart-active {
    height: 70vh !important; /* Stretch to fill 70% of viewport height in Full Chart mode */
    min-height: 500px !important;
  }
  .chart-wrap {
    height: 100% !important;
    overflow: hidden !important;
    flex-shrink: 0 !important;
  }
  .realtime-panel {
    width: 100% !important;
    border-left: none !important;
    border-top: 1px solid var(--border) !important;
    height: 380px !important; /* Dedicated space with independent scroll for calendar */
    overflow: hidden !important;
    flex-shrink: 0 !important;
  }

  /* TOPBAR RESPONSIVENESS */
  .topbar {
    padding: 8px 12px !important;
    height: auto !important;
    min-height: 54px !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
    justify-content: center !important;
  }
  .topbar-left {
    width: 100% !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 8px !important;
  }
  .topbar-right {
    width: 100% !important;
    justify-content: center !important;
    gap: 8px !important;
    flex-wrap: wrap !important;
  }
  .brand {
    justify-content: center !important;
  }
  .brand-name {
    font-size: 13px !important;
    letter-spacing: 0.2px !important;
    display: inline-block !important;
  }
  .brand-badge {
    display: none !important; /* Hide millisecond badge on mobile to avoid layout crowding */
  }
  .clock {
    display: none !important;
  }
  .topbar .tf-btn {
    padding: 4px 8px !important;
    font-size: 11px !important;
    margin: 0 !important;
  }

  /* HEADER & TIME INTERVALS BUTTONS */
  .sym-header {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 10px 14px !important;
    gap: 8px !important;
  }
  .sym-info {
    flex-direction: column !important;
    align-items: center !important;
    gap: 6px !important;
  }
  .price-info {
    justify-content: center !important;
  }
  .sym-header > div {
    justify-content: center !important;
    width: 100% !important;
  }

  /* WIDGET GRID (INDICATORS) */
  .ind-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  /* GENERAL TAB SIGNAL DISPLAY */
  .hero-signal {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 16px !important;
    gap: 16px !important;
  }
  .hero-badge {
    width: 100% !important;
    min-width: 0 !important;
    padding: 12px 24px !important;
    font-size: 18px !important;
  }

  /* TAB COMPACT SELECTOR & HORIZONTAL SWIPING */
  .dash-tabs {
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    white-space: nowrap !important;
    -webkit-overflow-scrolling: touch !important;
    padding-bottom: 8px !important;
    gap: 8px !important;
  }
  .dash-tab-btn {
    flex-shrink: 0 !important;
    padding: 8px 12px !important;
    font-size: 11px !important;
  }
}

/* EXTENSION FOR SMC & EMA TABS */
.dash-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1.5px solid var(--border);
  padding-bottom: 12px;
}
.dash-tab-btn {
  background: var(--bg3);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  color: var(--text2);
  padding: 10px 18px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.dash-tab-btn:hover {
  border-color: var(--gold);
  color: var(--text);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.05);
}
.dash-tab-btn.active {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
  border-color: var(--gold);
  color: #07090e;
  box-shadow: 0 4px 15px var(--gold-glow);
}
.smc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 1000px) {
  .smc-grid {
    grid-template-columns: 1fr;
  }
}
.smc-card {
  background: var(--bg2);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.smc-card-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1.5px solid var(--border);
  padding-bottom: 10px;
}
.smc-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}
.smc-list::-webkit-scrollbar {
  width: 4px;
}
.smc-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 2px;
}
.smc-row-item {
  background: var(--bg3);
  border: 1px solid rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.2s;
}
.smc-row-item:hover {
  transform: translateX(3px);
  border-color: rgba(255, 255, 255, 0.05);
}
.smc-row-item.unmitigated {
  border-color: var(--gold);
}
.smc-row-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.smc-badge {
  font-size: 9.5px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 6px;
  text-transform: uppercase;
}
.smc-badge.bullish {
  background: var(--green-bg);
  color: var(--green);
  border: 1px solid rgba(0, 230, 118, 0.2);
}
.smc-badge.bearish {
  background: var(--red-bg);
  color: var(--red);
  border: 1px solid rgba(255, 23, 68, 0.2);
}
.smc-badge.mitigated {
  background: rgba(120, 129, 149, 0.1);
  color: var(--text2);
  border: 1px solid rgba(120, 129, 149, 0.15);
}
.smc-badge.active {
  background: var(--gold-glow);
  color: var(--gold);
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.1);
}
.smc-price-box {
  display: flex;
  gap: 12px;
  font-family: monospace;
  font-size: 13.5px;
  font-weight: 700;
}
.smc-price-lbl {
  color: var(--text3);
  font-size: 11px;
  text-transform: uppercase;
  margin-right: 4px;
}
.smc-desc {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
}

/* EMA & PRICE ACTION STYLES */
.trend-header-card {
  background: linear-gradient(135deg, var(--bg2) 0%, rgba(21, 26, 38, 0.6) 100%);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.trend-status-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 280px;
}
.trend-status-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text3);
}
.trend-status-val {
  font-size: 22px;
  font-weight: 900;
  display: flex;
  align-items: center;
  gap: 8px;
}
.trend-status-val.bullish { color: var(--green); }
.trend-status-val.bearish { color: var(--red); }
.trend-status-val.neutral { color: var(--yellow); }

.crossover-status {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.crossover-badge {
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
  animation: float 3s infinite ease-in-out;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.crossover-badge.golden {
  background: rgba(0, 230, 118, 0.1);
  color: var(--green);
  border: 1.5px solid var(--green);
  box-shadow: 0 0 15px rgba(0, 230, 118, 0.2);
}
.crossover-badge.death {
  background: rgba(255, 23, 68, 0.1);
  color: var(--red);
  border: 1.5px solid var(--red);
  box-shadow: 0 0 15px rgba(255, 23, 68, 0.2);
}

.pullback-banner {
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 176, 255, 0.08);
  border: 1.5px solid var(--blue);
  color: var(--blue);
}

.ema-alignment-track {
  height: 12px;
  background: var(--bg3);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.02);
  margin-top: 10px;
}
.ema-alignment-bar {
  height: 100%;
  border-radius: 6px;
  transition: width 1s ease;
}
.ema-alignment-bar.bullish { background: linear-gradient(90deg, var(--green) 0%, #00b0ff 100%); }
.ema-alignment-bar.bearish { background: linear-gradient(90deg, var(--red) 0%, #d500f9 100%); }
.ema-alignment-bar.neutral { background: var(--bg3); }

.tv-indicators-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tv-indicators-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 1000px) {
  .tv-indicators-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .tv-indicators-grid { grid-template-columns: 1fr; }
}

.indicator-gauge-card {
  background: var(--bg2);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  transition: all 0.3s;
}
.indicator-gauge-card:hover {
  border-color: var(--gold);
  transform: translateY(-2px);
}
.gauge-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.gauge-lbl {
  font-size: 11px;
  color: var(--text3);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.gauge-val {
  font-size: 18px;
  font-weight: 800;
  font-family: monospace;
}
.gauge-track {
  height: 6px;
  background: var(--bg3);
  border-radius: 3px;
  overflow: hidden;
}
.gauge-fill {
  height: 100%;
  border-radius: 3px;
}
.gauge-state {
  font-size: 11px;
  color: var(--text2);
  font-weight: 600;
}

.ema-cloud-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
@media (max-width: 900px) {
  .ema-cloud-grid { grid-template-columns: repeat(3, 1fr); }
}
.ema-cloud-cell {
  background: var(--bg3);
  border: 1px solid rgba(255,255,255,0.02);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  transition: all 0.2s;
}
.ema-cloud-cell:hover {
  border-color: rgba(255,255,255,0.06);
  transform: scale(1.02);
}
.ema-cloud-name {
  font-size: 9.5px;
  color: var(--text3);
  font-weight: bold;
}
.ema-cloud-val {
  font-size: 13.5px;
  font-weight: 800;
  font-family: monospace;
}

/* Live Update Badge & Pulse Dot */
.live-update-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 230, 118, 0.08);
  border: 1px solid rgba(0, 230, 118, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 230, 118, 0.05);
}

.pulse-dot {
  width: 7px;
  height: 7px;
  background-color: var(--green);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7);
  animation: pulse-green 1.5s infinite;
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(0, 230, 118, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 230, 118, 0);
  }
}

/* Floating TradingView Controls */
.tv-chart-controls {
  position: absolute;
  bottom: 45px;
  left: 12px;
  display: flex;
  gap: 6px;
  background: rgba(21, 26, 38, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 5px;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
  align-items: center;
}

.tv-ctrl-btn {
  background: transparent;
  border: none;
  color: var(--text2);
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.tv-ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transform: translateY(-0.5px);
}

.tv-ctrl-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.tv-live-btn {
  background: var(--green);
  border: none;
  color: #131722;
  font-size: 10px;
  font-weight: 700;
  padding: 0 10px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
  letter-spacing: 0.5px;
}

.tv-live-btn:hover {
  background: #00ff88;
  transform: translateY(-1px);
  box-shadow: 0 0 10px rgba(0, 230, 118, 0.4);
}

/* TradingView-style Price Scale Badge & Countdown */
.tv-scale-badge-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
  margin-left: auto;
  margin-right: 20px;
}

.tv-price-badge {
  color: #ffffff;
  font-family: monospace;
  font-weight: 800;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1.2;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: background-color 0.25s ease;
}

.tv-price-badge.up {
  background-color: #08a67e; /* Beautiful TradingView Green */
  border-right: 3px solid #00ff88;
}

.tv-price-badge.down {
  background-color: #f23645; /* Beautiful TradingView Red */
  border-right: 3px solid #ff1744;
}

.tv-countdown-text {
  color: var(--text2);
  font-family: monospace;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(21, 26, 38, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 1px;
}

.tv-clock-icon {
  font-size: 10px;
  animation: rotate-clock 4s infinite linear;
}

@keyframes rotate-clock {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Premium Floating Guide Overlay for TV native features */
.tv-guide-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 999;
  width: 360px;
  background: rgba(14, 17, 26, 0.94);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 215, 0, 0.25);
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 12px rgba(255, 215, 0, 0.04);
  font-family: 'Inter', sans-serif;
  animation: slide-up-fade 0.35s cubic-bezier(0.1, 0.9, 0.2, 1);
}

@keyframes slide-up-fade {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.tv-guide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.tv-guide-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 4px var(--gold));
  animation: pulse-glow 2s infinite ease-in-out;
}

@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 2px var(--gold)); }
  50% { filter: drop-shadow(0 0 8px var(--gold)); }
}

.tv-guide-title {
  font-size: 11.5px;
  font-weight: 800;
  color: var(--gold);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.tv-guide-close {
  background: transparent;
  border: none;
  color: var(--text3);
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
  transition: color 0.15s ease;
  padding: 0 4px;
}

.tv-guide-close:hover {
  color: var(--red);
}

.tv-guide-body {
  font-size: 11.5px;
  color: var(--text2);
  line-height: 1.6;
}

.tv-guide-steps {
  margin: 6px 0 6px 16px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tv-guide-steps li {
  color: var(--text);
}

.tv-guide-steps li strong {
  color: var(--green);
}

.tv-guide-footer {
  font-size: 10px;
  color: var(--green);
  font-weight: 600;
  margin-top: 8px;
  opacity: 0.95;
  border-top: 1px dashed rgba(255, 255, 255, 0.05);
  padding-top: 6px;
}

/* AUTH LOCK SYSTEM (LOGIN / SIGNUP / OTP SCREEN) */
.auth-container {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 9999;
  background: radial-gradient(circle at 50% 50%, #101424 0%, #05070d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.auth-card {
  width: 440px;
  background: rgba(14, 17, 26, 0.75);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 215, 0, 0.2);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255, 215, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: auth-fade-in 0.4s cubic-bezier(0.1, 0.9, 0.2, 1);
}

@keyframes auth-fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.auth-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.auth-title {
  font-size: 20px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--gold), #ffffff, var(--gold-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.8px;
}

.auth-subtitle {
  font-size: 11px;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.auth-tabs {
  display: flex;
  background: var(--bg3);
  padding: 4px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.auth-tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text2);
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.auth-tab-btn.active {
  background: var(--bg2);
  color: var(--gold);
  border: 1px solid rgba(255, 215, 0, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-label {
  font-size: 10px;
  font-weight: 700;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.auth-input-wrap {
  position: relative;
}

.auth-input {
  width: 100%;
  background: var(--bg3);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 12px 16px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;
}

.auth-input:focus {
  border-color: var(--gold);
  background: var(--bg2);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.1);
}

.auth-submit-btn {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
  border: none;
  border-radius: 10px;
  color: #07090e;
  padding: 14px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.auth-submit-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

.auth-submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.auth-alert {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 12.5px;
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.auth-alert.error {
  background: rgba(255, 23, 68, 0.08);
  border: 1px solid rgba(255, 23, 68, 0.2);
  color: #ff8a80;
}

.auth-alert.success {
  background: rgba(0, 230, 118, 0.08);
  border: 1px solid rgba(0, 230, 118, 0.2);
  color: #b9f6ca;
}

.auth-otp-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.auth-otp-input {
  width: 100%;
  background: var(--bg3);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 14px;
  color: #fff;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  letter-spacing: 8px;
  outline: none;
  font-family: monospace;
}

.auth-otp-input:focus {
  border-color: var(--green);
  box-shadow: 0 0 12px rgba(0, 230, 118, 0.15);
}

.auth-link {
  text-align: center;
  font-size: 13px;
  color: var(--text2);
  cursor: pointer;
  transition: color 0.15s;
}

.auth-link:hover {
  color: var(--gold);
}

.auth-resend {
  font-size: 12px;
  color: var(--text3);
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 10px;
}

.auth-resend span {
  color: var(--gold);
  font-weight: bold;
  cursor: pointer;
}

.auth-resend span.disabled {
  color: var(--text3);
  cursor: not-allowed;
  font-weight: normal;
}

/* TRADINGVIEW STYLE INDICATORS OVERLAY */
.chart-ema-legend {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(19, 23, 34, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  z-index: 10;
  pointer-events: auto;
  min-width: 170px;
}

.ema-legend-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
}

.ema-legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 6px currentColor;
}

.ema-legend-name {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 11.5px;
  font-weight: 600;
  color: #c9ccd6;
  white-space: nowrap;
  flex: 1;
}

.ema-legend-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.ema-legend-row:hover .ema-legend-actions {
  opacity: 1;
}

.ema-action-btn {
  background: none;
  border: none;
  padding: 2px;
  color: #787b86;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.ema-action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.ema-action-btn.active {
  color: var(--gold);
}

.ema-action-btn.open-source-btn {
  color: rgba(0, 176, 255, 0.85);
}

.ema-action-btn.open-source-btn:hover {
  color: #00e5ff;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2);
}

/* PREMIUM MODALS IN CHART OVERLAY */
.chart-overlay-modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 15, 23, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.chart-modal-card {
  background: rgba(19, 23, 34, 0.95);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  animation: modalFadeIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-modal-card.wide {
  max-width: 650px;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.chart-modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chart-modal-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chart-modal-close {
  background: none;
  border: none;
  color: var(--text3);
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.chart-modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.chart-modal-body {
  padding: 20px;
}

.chart-modal-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

.chart-modal-tab-btn {
  background: none;
  border: none;
  color: var(--text3);
  font-size: 12px;
  font-weight: bold;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.chart-modal-tab-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.chart-modal-tab-btn.active {
  color: var(--gold);
  background: rgba(255, 215, 0, 0.1);
}

.settings-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.settings-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--text2);
}

.settings-input-row {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
}

.settings-number-input {
  background: rgba(30, 36, 51, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  font-size: 13px;
  width: 100px;
  font-family: monospace;
  outline: none;
}

.settings-number-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 8px var(--gold-glow);
}

.settings-select {
  background: rgba(30, 36, 51, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  font-size: 13px;
  width: 150px;
  outline: none;
  cursor: pointer;
}

.settings-select:focus {
  border-color: var(--gold);
}

.settings-colors-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.settings-color-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.15s ease;
  box-shadow: 0 0 4px rgba(0,0,0,0.3);
}

.settings-color-dot:hover {
  transform: scale(1.1);
}

.settings-color-dot.active {
  border-color: #fff;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255,255,255,0.4);
}

.code-container {
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 14px;
  max-height: 280px;
  overflow-y: auto;
  font-family: "Fira Code", Consolas, Monaco, "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.6;
  color: #c9d1d9;
  text-align: left;
}

.code-container pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.chart-modal-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-btn.cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text2);
}

.modal-btn.cancel:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.modal-btn.apply {
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
  border: none;
  color: #07090e;
  box-shadow: 0 4px 12px var(--gold-glow);
}

.modal-btn.apply:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px var(--gold-glow);
}

/* MARKET OUTLOOK SPECIFIC STYLES */
.outlook-banner {
  background: linear-gradient(135deg, rgba(255, 171, 0, 0.08) 0%, rgba(7, 9, 14, 0.6) 100%);
  border: 1.5px solid var(--gold);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
.outlook-badge-buy {
  background: var(--green-bg);
  color: var(--green);
  border: 1.5px solid var(--green);
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 13px;
  box-shadow: 0 0 15px rgba(0, 230, 118, 0.15);
}
.outlook-badge-sell {
  background: var(--red-bg);
  color: var(--red);
  border: 1.5px solid var(--red);
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 13px;
  box-shadow: 0 0 15px rgba(255, 23, 68, 0.15);
}
.outlook-badge-hold {
  background: rgba(255, 171, 0, 0.08);
  color: var(--gold);
  border: 1.5px solid var(--gold);
  padding: 6px 16px;
  border-radius: 8px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 13px;
  box-shadow: 0 0 15px rgba(255, 171, 0, 0.15);
}
.outlook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 1100px) {
  .outlook-grid {
    grid-template-columns: 1fr;
  }
}
.outlook-card {
  background: var(--bg2);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.outlook-card-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1.5px solid var(--border);
  padding-bottom: 10px;
  margin-bottom: 4px;
}
.outlook-item {
  background: var(--bg3);
  border: 1px solid rgba(255,255,255,0.02);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: all 0.2s;
}
.outlook-item:hover {
  transform: translateX(3px);
  border-color: rgba(255, 255, 255, 0.05);
}
.outlook-label {
  display: block;
  font-size: 9.5px;
  color: var(--text3);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.outlook-value {
  display: block;
  font-size: 13.5px;
  font-weight: 700;
  color: #fff;
}
.outlook-summary-box {
  background: linear-gradient(135deg, rgba(20, 24, 33, 0.8) 0%, rgba(14, 17, 26, 0.9) 100%);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  border-left: 5px solid var(--gold);
}
`;var Pt=document.createElement("style");Pt.textContent=Ut;document.head.appendChild(Pt);var Aa=Ta(document.getElementById("root"));Aa.render(La(ct));
