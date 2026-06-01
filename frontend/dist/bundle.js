import{createRoot as Pa}from"https://esm.sh/react-dom@18.2.0/client";import{createElement as Ha}from"https://esm.sh/react@18.2.0";import Oa,{useState as p,useEffect as E,useRef as R,useMemo as C}from"https://esm.sh/react@18.2.0";import{Fragment as q,jsx as e,jsxs as o}from"https://esm.sh/react@18.2.0/jsx-runtime";function Da({timeframe:f}){let J=R(null);return E(()=>{if(!J.current)return;J.current.innerHTML="";let T="60";f==="1"?T="1":f==="5"?T="5":f==="15"?T="15":f==="60"?T="60":f==="1D"?T="D":f==="1W"?T="W":f==="1M"&&(T="M");let V=document.createElement("script");V.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",V.type="text/javascript",V.async=!0,V.innerHTML=JSON.stringify({autosize:!0,symbol:"FOREXCOM:XAUUSD",interval:T,timezone:"Asia/Ho_Chi_Minh",theme:"dark",style:"1",locale:"vi",enable_publishing:!1,allow_symbol_change:!0,calendar:!0,hide_side_toolbar:!1,studies:[{id:"MAExp@tv-basicstudies",inputs:{length:50}},{id:"MAExp@tv-basicstudies",inputs:{length:200}}],support_host:"https://www.tradingview.com"}),J.current.appendChild(V)},[f]),e("div",{className:"tradingview-widget-container",ref:J,style:{height:"100%",width:"100%"},children:e("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}var Ot=f=>{let T=new Date(f+252e5),V=T.getUTCFullYear(),dt=String(T.getUTCMonth()+1).padStart(2,"0");return`${String(T.getUTCDate()).padStart(2,"0")}/${dt}/${V}`};function be(){let[f,J]=p("5"),[T,V]=p("tradingview"),[dt,$e]=p(!1),[c,me]=p(null),[Ve,he]=p(!0),[fe,_t]=p(null),[j,je]=p(()=>{let t=localStorage.getItem("active_dash_tab");return t==="ai"||t==="backtest"||t==="outlook"?t:"ai"}),qt=t=>{je(t),localStorage.setItem("active_dash_tab",t)},[ve,ye]=p([]),[Ua,Wa]=p(!1),[at,Xe]=p(()=>localStorage.getItem("backtest_timeframe_filter")||"ALL"),Ke=t=>{Xe(t),localStorage.setItem("backtest_timeframe_filter",t)},[pt,_e]=p(()=>localStorage.getItem("backtest_selected_day")||"ALL"),qe=t=>{_e(t),localStorage.setItem("backtest_selected_day",t)},Z=C(()=>{let t=[...ve].sort((n,s)=>s.closeTime-n.closeTime),a=Ot(Date.now()),r=Ot(Date.now()-864e5);return pt==="TODAY"?t=t.filter(n=>Ot(n.closeTime)===a):pt==="YESTERDAY"&&(t=t.filter(n=>Ot(n.closeTime)===r)),at==="ALL"?t:t.filter(n=>n.timeframe.toUpperCase()===at.toUpperCase())},[ve,at,pt]),ct=C(()=>{if(Z.length===0)return{winRate:0,netPips:0,totalProfit:0,total:0};let t=Z.length,a=Z.filter(i=>i.status==="TP1"||i.status==="TP2").length,r=Math.round(a/t*100),n=Number(Z.reduce((i,l)=>i+(Number(l.pips)||0),0).toFixed(1)),s=Number(Z.reduce((i,l)=>i+(Number(l.profitUsd)||0),0).toFixed(2));return{winRate:r,netPips:n,totalProfit:s,total:t}},[Z]),Jt=async(t=!1)=>{try{let a=await fetch("/api/backtest/history");if(a.ok){let r=await a.json();r.success&&r.trades&&ye(r.trades)}}catch(a){console.error("Error fetching backtest history:",a)}},Ga=async()=>{try{let t=await fetch("/api/backtest/reset",{method:"POST"});if(t.ok){let a=await t.json();a.success&&a.trades&&ye(a.trades)}else alert("L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 l\u1EA1i d\u1EEF li\u1EC7u n\u1EBFn.")}catch(t){alert("L\u1ED7i h\u1EC7 th\u1ED1ng: "+t.message)}},[I,gt]=p(null),[Je,we]=p(!1),[Zt,ot]=p("login"),[X,Qt]=p(""),[W,te]=p(""),[rt,Q]=p(""),[ke,k]=p(null),[Se,L]=p(null),[G,Dt]=p(0),[ut,xt]=p(!1),[ee,tt]=p(""),[bt,Pt]=p(!1),wt=R([]),[mt,Ze]=p(!0),[ht,Qe]=p(!0),[kt,ta]=p(50),[St,ea]=p(200),[Tt,aa]=p("close"),[Nt,oa]=p("close"),[Lt,ra]=p("#FFD700"),[Mt,na]=p("#FF1744"),[Fa,Ya]=p(!1),[$a,Va]=p(!1),[ja,Xa]=p(!1),[Ka,_a]=p(!1),[qa,Ja]=p(!1),[nt,Ct]=p(null),[Ht,Bt]=p(null),[zt,Ut]=p("pine"),[ae,oe]=p(50),[re,ne]=p("close"),[Wt,Gt]=p("#FFD700");E(()=>{nt==="ema50"?(oe(kt),ne(Tt),Gt(Lt)):nt==="ema200"&&(oe(St),ne(Nt),Gt(Mt))},[nt]);let ia=()=>{nt==="ema50"?(ta(ae),aa(re),ra(Wt)):nt==="ema200"&&(ea(ae),oa(re),na(Wt)),Ct(null)},sa=async()=>{try{we(!0);let t=await fetch("/api/auth/me");if(t.ok){let a=await t.json();a.authenticated&&a.email?gt({email:a.email}):gt(null)}else gt(null)}catch(t){console.error("Session check error:",t),gt(null)}finally{we(!1)}};E(()=>{sa()},[]),E(()=>{I&&Jt(!1)},[I]),E(()=>{if(I&&(j==="ai"||j==="backtest")){Jt(!0);let t=setInterval(()=>{Jt(!1)},5e3);return()=>clearInterval(t)}},[j,I]),E(()=>{if(G<=0)return;let t=setInterval(()=>{Dt(a=>a-1)},1e3);return()=>clearInterval(t)},[G]);let la=async t=>{if(t.preventDefault(),!X||!W){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}xt(!0),k(null),L(null);try{let a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:X,password:W})}),r=await a.json();if(!a.ok){a.status===403&&r.needsVerification?(ot("otp"),Dt(300),r.isSimulator&&r.otp?(tt(r.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(tt(""),L(r.error||"T\xE0i kho\u1EA3n ch\u01B0a k\xEDch ho\u1EA1t. M\u1ED9t m\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email."))):k(r.error||"\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i.");return}r.success&&(gt({email:r.user.email}),L("\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng!"))}catch(a){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{xt(!1)}},da=async t=>{if(t.preventDefault(),!X||!W){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}if(W.length<6){k("M\u1EADt kh\u1EA9u ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 6 k\xFD t\u1EF1.");return}xt(!0),k(null),L(null);try{let a=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:X,password:W})}),r=await a.json();if(!a.ok){k(r.error||"\u0110\u0103ng k\xFD th\u1EA5t b\u1EA1i.");return}r.success&&(ot("otp"),Dt(300),r.isSimulator&&r.otp?(tt(r.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(tt(""),L(r.message||"\u0110\u0103ng k\xFD th\xE0nh c\xF4ng! Vui l\xF2ng nh\u1EADp m\xE3 OTP g\u1EEDi t\u1EDBi email.")))}catch(a){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{xt(!1)}},pa=async t=>{if(t.preventDefault(),!rt){k("Vui l\xF2ng nh\u1EADp m\xE3 OTP.");return}xt(!0),k(null),L(null);try{let a=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:X,otp:rt})}),r=await a.json();if(!a.ok){k(r.error||"X\xE1c th\u1EF1c OTP th\u1EA5t b\u1EA1i.");return}r.success&&(ot("login"),Q(""),tt(""),L("K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng! B\xE2y gi\u1EDD b\u1EA1n c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp."))}catch(a){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{xt(!1)}},ca=async()=>{if(!(G>0)){k(null),L(null);try{let t=await fetch("/api/auth/resend-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:X})}),a=await t.json();if(!t.ok){k(a.error||"G\u1EEDi l\u1EA1i OTP th\u1EA5t b\u1EA1i.");return}a.success&&(Dt(300),a.isSimulator&&a.otp?(tt(a.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${a.otp}`)):(tt(""),L(a.message||"M\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email c\u1EE7a b\u1EA1n.")))}catch(t){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+t.message)}}},ga=async()=>{try{await fetch("/api/auth/logout",{method:"POST"}),gt(null),me(null),Ft(4500),Yt(0),ot("login"),Qt(""),te(""),Q(""),k(null),L(null)}catch(t){console.error("Logout error",t)}},[w,Ft]=p(4500),[ie,Yt]=p(0),[At,Za]=p(!0),[Qa,Te]=p([]),[to,Ne]=p({bids:[],asks:[]}),[eo,ao]=p("book"),[ua,xa]=p(""),[oo,ba]=p(""),[K,ma]=p(!1),[It,ro]=p(100),[$t,no]=p(5),[se,io]=p("micro"),[Vt,so]=p("percent"),[jt,lo]=p(5),[le,po]=p(0),[co,ha]=p([{id:"h1",time:"05:40:12",type:"SELL",entry:4512.4,stopLoss:4516.8,tp1:4504,status:"HIT TP1 \u{1F7E2} (+84 pips)"},{id:"h2",time:"03:15:45",type:"BUY",entry:4495.2,stopLoss:4489.5,tp1:4503.5,status:"HIT TP1 \u{1F7E2} (+83 pips)"},{id:"h3",time:"01:04:10",type:"SELL",entry:4520.1,stopLoss:4525,tp1:4511,status:"HIT SL \u{1F534} (-49 pips)"},{id:"h4",time:"23:12:05",type:"BUY",entry:4488.5,stopLoss:4482,tp1:4498,status:"HIT TP1 \u{1F7E2} (+95 pips)"}]),O=R({}),[go,Le]=p(""),[fa,va]=p(!0),[et,Et]=p(80),[ft,vt]=p(0),Me=ft===0,[de,pe]=p(1),g=C(()=>{if(!c?.chart?.timestamp)return[];let t=c.chart.timestamp.length,a=[];for(let r=0;r<t;r++)a.push({time:c.chart.timestamp[r],open:c.chart.open[r]??0,high:c.chart.high[r]??0,low:c.chart.low[r]??0,close:c.chart.close[r]??0,volume:c.chart.volume[r]??0});if(a.length>0){let r=a[a.length-1];r.close=w,w>r.high&&(r.high=w),w<r.low&&(r.low=w)}return a},[c,w]),_=C(()=>{if(g.length===0)return[];let t=g.length,a=Math.max(10,Math.min(et,t)),r=Math.max(0,Math.min(ft,t-a)),n=t-r,s=Math.max(0,n-a);return g.slice(s,n)},[g,et,ft]),D=C(()=>{if(g.length===0)return 0;let t=g.length,a=Math.max(10,Math.min(et,t)),r=Math.max(0,Math.min(ft,t-a)),n=t-r;return Math.max(0,n-a)},[g,et,ft]),ya=C(()=>{if(g.length===0)return[];let t=[],r=2/((Number(kt)||50)+1),n=Tt||"close",s=g[0][n]||g[0].close;t.push(s);for(let i=1;i<g.length;i++)s=(g[i][n]||g[i].close)*r+s*(1-r),t.push(s);return t},[g,kt,Tt]),wa=C(()=>{if(g.length===0)return[];let t=[],r=2/((Number(St)||200)+1),n=Nt||"close",s=g[0][n]||g[0].close;t.push(s);for(let i=1;i<g.length;i++)s=(g[i][n]||g[i].close)*r+s*(1-r),t.push(s);return t},[g,St,Nt]),Ce=C(()=>{if(g.length<10)return null;let a=(c?.advancedAnalysis?.swings||[]).filter(l=>l.type==="HIGH").sort((l,x)=>l.index-x.index);if(a.length>=2){let l=a[0];for(let b of a)b.price>l.price&&(l=b);let x=a.find(b=>b.index>l.index&&b.price<l.price);if(x||(x=a[a.length-1]),l&&x&&l.index!==x.index)return{i1:l.index,price1:l.price,i2:x.index,price2:x.price,source:"SMC Swings"}}let r=0,n=g[0].high;for(let l=1;l<Math.floor(g.length*.7);l++)g[l].high>n&&(n=g[l].high,r=l);let s=r+5,i=0;if(s<g.length){i=g[s].high;for(let l=s;l<g.length;l++)g[l].high>i&&g[l].high<n&&(i=g[l].high,s=l)}return r!==s&&s<g.length?{i1:r,price1:n,i2:s,price2:i,source:"PA Scan"}:{i1:Math.max(0,g.length-80),price1:4568,i2:Math.max(0,g.length-20),price2:4516,source:"SMC Profile"}},[g,c]),d=C(()=>{if(_.length<5)return null;let t=1400,a=520,r=4,n=68,s=12,i=34,l=t-r-n,x=a-s-i,b=_.map(M=>M.high),h=_.map(M=>M.low),v=Math.max(...b),m=Math.min(...h),y=v-m||1,S=(v+m)/2,z=y*1.1*de||1;v=S+z/2,m=S-z/2;let N=v-m,H=_.length,B=l/H,Y=Math.max(1,B*.75),U=M=>r+(M+.5)*B,st=M=>s+(1-(M-m)/N)*x,A=Math.max(1,Math.floor(H/8)),lt=[];for(let M=0;M<H;M+=A){let Kt=_[M].time*1e3,Ge=new Date(Kt),xe;["1D","1W","1M"].includes(f)?xe=Ge.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}):xe=Ge.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),lt.push({x:U(M),label:xe})}let $=8,Rt=[];for(let M=0;M<=$;M++){let Kt=m+N*M/$;Rt.push({y:st(Kt),price:Kt})}return{width:t,height:a,paddingLeft:r,paddingRight:n,paddingBottom:i,usableWidth:l,usableHeight:x,maxPrice:v,minPrice:m,paddedRange:N,candleSlotW:B,bodyWidth:Y,getX:U,getY:st,timeLabels:lt,priceLabels:Rt}},[_,f,de]),F=R(4500),ze=R(null),Ae=R(0),Xt=R(!1),Ie=R(0),Ee=R(0),yt=R(null),ce=R(!1),Re=R(0),Oe=R(1),ka={1:60,5:300,15:900,60:3600,"1D":86400,"1W":604800,"1M":2592e3};E(()=>{ze.current=c},[c]);let it=(t="info")=>{try{let a=new(window.AudioContext||window.webkitAudioContext),r=a.createOscillator(),n=a.createGain();r.connect(n),n.connect(a.destination),t==="buy"?(r.frequency.setValueAtTime(587.33,a.currentTime),n.gain.setValueAtTime(.12,a.currentTime),r.start(),r.frequency.setValueAtTime(698.46,a.currentTime+.12),n.gain.setValueAtTime(.1,a.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),r.stop(a.currentTime+.4)):t==="sell"?(r.frequency.setValueAtTime(523.25,a.currentTime),n.gain.setValueAtTime(.12,a.currentTime),r.start(),r.frequency.setValueAtTime(392,a.currentTime+.12),n.gain.setValueAtTime(.1,a.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),r.stop(a.currentTime+.4)):(r.frequency.setValueAtTime(440,a.currentTime),n.gain.setValueAtTime(.08,a.currentTime),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.15),r.start(),r.stop(a.currentTime+.2))}catch(a){console.warn("Audio Context failed",a)}};E(()=>{if(!K||!c?.advancedAnalysis)return;let t=c.advancedAnalysis,a=Date.now(),r=t.fvgs.find(l=>!l.mitigated&&l.type==="BULLISH");if(r&&w<=r.top&&w>=r.bottom){let l=`fvg_bullish_${r.index}`;(!O.current[l]||a-O.current[l]>3e4)&&(O.current[l]=a,it("buy"))}let n=t.fvgs.find(l=>!l.mitigated&&l.type==="BEARISH");if(n&&w>=n.bottom&&w<=n.top){let l=`fvg_bearish_${n.index}`;(!O.current[l]||a-O.current[l]>3e4)&&(O.current[l]=a,it("sell"))}let s=t.orderBlocks.find(l=>!l.mitigated&&l.type==="BULLISH");if(s&&w>=s.low&&w<=s.high){let l=`ob_bullish_${s.index}`;(!O.current[l]||a-O.current[l]>3e4)&&(O.current[l]=a,it("buy"))}let i=t.orderBlocks.find(l=>!l.mitigated&&l.type==="BEARISH");if(i&&w>=i.low&&w<=i.high){let l=`ob_bearish_${i.index}`;(!O.current[l]||a-O.current[l]>3e4)&&(O.current[l]=a,it("sell"))}},[w,K,c]),E(()=>{let t=setInterval(()=>{let a=new Date;xa(a.toLocaleTimeString("en-GB")+" UTC");let r=ka[f]||86400,n=Math.floor(a.getTime()/1e3),s=r-n%r;if(s>=3600){let i=Math.floor(s/3600),l=Math.floor(s%3600/60),x=s%60;Le(`${i}:${String(l).padStart(2,"0")}:${String(x).padStart(2,"0")}`)}else{let i=Math.floor(s/60),l=s%60;Le(`${String(i).padStart(2,"0")}:${String(l).padStart(2,"0")}`)}},1e3);return()=>clearInterval(t)},[f]),E(()=>{let t=a=>{document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA"||(a.key==="+"||a.key==="="?(a.preventDefault(),Pe()):a.key==="-"?(a.preventDefault(),He()):a.key==="ArrowLeft"?(a.preventDefault(),vt(r=>Math.min(g.length-et,r+5))):a.key==="ArrowRight"?(a.preventDefault(),vt(r=>Math.max(0,r-5))):(a.key==="r"||a.key==="R")&&(a.preventDefault(),Et(80),vt(0),pe(1)))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[g.length,et]);let ge=async(t=!1)=>{if(I){t||he(!0),t||_t(null);try{let a=await fetch(`/api/signals/XAUUSD?tf=${f}`);if(!a.ok)throw new Error("Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn server API Gold");let r=await a.json();_t(null),me(r),ba(new Date().toLocaleTimeString("vi-VN")),r.lastPrice>0&&(!ze.current||Math.abs(F.current-r.lastPrice)>100?F.current=r.lastPrice:F.current=F.current*.7+r.lastPrice*.3,Ft(Math.round(F.current*100)/100)),r.signals&&r.signals.type!=="NEUTRAL"&&ha(n=>{let s=n[0];if(!s||s.type!==r.signals.type||Math.abs(s.entry-r.signals.suggestion.entry)>.5){let l=new Date().toLocaleTimeString("vi-VN");return[{id:Math.random().toString(),time:l,type:r.signals.type,entry:r.signals.suggestion.entry,stopLoss:r.signals.suggestion.stopLoss,tp1:r.signals.suggestion.takeProfit1,status:"Active \u{1F7E1}"},...n.slice(0,14)]}return n}),t||(Ta(r.lastPrice),Na(r.lastPrice)),Yt(r.priceChange)}catch(a){t||_t(a.message)}finally{t||he(!1)}}},Sa=async()=>{try{let t=await fetch("/api/price/XAUUSD");if(!t.ok)return;let a=await t.json();a.price&&a.price>0&&(F.current=F.current*.7+a.price*.3,Ft(Math.round(F.current*100)/100),Yt(a.change))}catch{}};E(()=>{if(!I)return;ge(!1);let t=setInterval(()=>{At&&I&&Sa()},1500),a=setInterval(()=>{At&&I&&ge(!0)},3e4);return()=>{clearInterval(t),clearInterval(a)}},[f,At,I]);let Ta=t=>{let a=.35+Math.random()*.15,r=[],n=[];for(let s=1;s<=10;s++)n.push({price:t+a/2+(s-1)*.15,size:Math.round((Math.random()*80+5)*10)/10}),r.push({price:t-a/2-(s-1)*.15,size:Math.round((Math.random()*80+5)*10)/10});Ne({bids:r,asks:n.reverse()})},Na=t=>{let a=[],r=new Date;for(let n=0;n<20;n++){let s=n*280,i=new Date(r.getTime()-s),l=Math.random()>.48;a.push({id:`init-${n}`,time:i.toLocaleTimeString()+"."+String(i.getMilliseconds()).padStart(3,"0"),type:l?"BUY":"SELL",price:t+(Math.random()-.5)*.4,size:(Math.random()*4.5+.1).toFixed(1)+" Lot"})}Te(a)};E(()=>{if(!At||!c||!I)return;let t=setInterval(()=>{let a=F.current,r=c.lastPrice,n=(r-a)*.05,s=(Math.random()-.5)*.25,i=Math.round((a+n+s)*100)/100;F.current=i,Ft(i);let l=r/(1+c.priceChange/100),x=(i-l)/l*100;if(Yt(x),Ae.current++,Ae.current%3===0){let b=.35+Math.random()*.1;Ne(h=>{let v=h.asks.map((y,S)=>{let z=10-S;return{price:Math.round((i+b/2+(z-1)*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)}});return{bids:h.bids.map((y,S)=>({price:Math.round((i-b/2-S*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)})),asks:v}})}if(Math.random()<.35){let b=Math.random()>.47,h=new Date,v=b?i+Math.random()*.05:i-Math.random()*.05,m={id:Math.random().toString(),time:h.toLocaleTimeString()+"."+String(h.getMilliseconds()).padStart(3,"0"),type:b?"BUY":"SELL",price:Math.round(v*100)/100,size:(Math.random()*5+.1).toFixed(1)+" Lot"};Te(y=>[m,...y.slice(0,24)])}},85);return()=>clearInterval(t)},[At,c]);let La=t=>{if(!yt.current||!d)return;let a=yt.current.getBoundingClientRect();(t.clientX-a.left)/a.width*d.width>d.width-d.paddingRight?(ce.current=!0,Re.current=t.clientY,Oe.current=de):(Xt.current=!0,Ie.current=t.clientX,Ee.current=ft)},Ma=t=>{if(ce.current){let r=1+(t.clientY-Re.current)*.005;pe(Math.max(.05,Math.min(10,Oe.current*r)))}else if(Xt.current&&yt.current&&d){let a=t.clientX-Ie.current,n=(yt.current.clientWidth||860)/Math.max(et,1),s=Math.round(-a/n),i=Math.max(0,Math.min(g.length-et,Ee.current+s));vt(i)}},De=()=>{Xt.current=!1,ce.current=!1},Ca=()=>{Et(80),vt(0),pe(1)};E(()=>{let t=yt.current;if(!t)return;let a=r=>{r.preventDefault();let n=r.deltaY>0?1:-1;Et(s=>Math.max(10,Math.min(500,s+n*Math.ceil(s*.08))))};return t.addEventListener("wheel",a,{passive:!1}),()=>{t.removeEventListener("wheel",a)}},[d]);let za=()=>vt(0),Pe=()=>Et(t=>Math.max(10,Math.round(t*.7))),He=()=>Et(t=>Math.min(500,Math.round(t*1.4))),u=C(()=>{if(!c)return null;let t=c.signals,a=c.tradingViewAnalysis,r=t.type==="BUY"?t.strength:t.type==="SELL"?-t.strength:0,n=a?a.recommendAll*100:0,s=Math.round((r+n)/2),i="NEUTRAL";s>=40?i="STRONG_BUY":s>=15?i="BUY":s<=-40?i="STRONG_SELL":s<=-15&&(i="SELL");let l=50,x=0,b=0,h=0,v=0,m=t.indicators.atr||a?.atr||3.2,y=t.indicators.rsi||a?.rsi||50,S=a?a.macd-a.macdSignal:0;if(a){let $=w>a.ema50,Rt=a.ema10>a.sma20;i.includes("BUY")?($&&(x+=6),Rt&&(x+=6)):i.includes("SELL")&&($||(x+=6),Rt||(x+=6))}i.includes("BUY")?(y>=50&&y<=65&&(b+=6),S>0&&(b+=6)):i.includes("SELL")&&(y>=35&&y<=50&&(b+=6),S<0&&(b+=6)),a&&a.adx>25&&(h+=6),i.includes("BUY")&&y<30&&(v+=8),i.includes("SELL")&&y>70&&(v+=8);let z=Math.min(94,Math.max(35,Math.round(l+Math.abs(s)*.3+x+b+h+v))),N=0,H=0,B="",Y=0,U=0,st=0,A=0,lt=c.chart?.close&&c.chart.close.length>0?c.chart.close[c.chart.close.length-1]:w;if(t&&t.suggestion&&t.suggestion.position!=="NEUTRAL"){let $=t.suggestion;Y=$.stopLoss,U=$.takeProfit1,st=$.takeProfit2,A=$.entry,N=Math.round((A-.15*m)*100)/100,H=Math.round((A+.15*m)*100)/100,B=`$${A.toFixed(2)}`,t.strength>0&&(z=Math.min(94,Math.max(78,80+Math.round(t.strength*.15))))}else N=Math.round((i.includes("BUY")?lt-.25*m:lt)*100)/100,H=Math.round((i.includes("BUY")?lt:lt+.25*m)*100)/100,B=`$${N.toFixed(2)} - $${H.toFixed(2)}`,A=(N+H)/2,i.includes("BUY")?(Y=Math.round((A-1.5*m)*100)/100,U=Math.round((A+1.5*m)*100)/100,st=Math.round((A+3*m)*100)/100):i.includes("SELL")&&(Y=Math.round((A+1.5*m)*100)/100,U=Math.round((A-1.5*m)*100)/100,st=Math.round((A-3*m)*100)/100);return{type:i,confluenceScore:s,winProbability:z,entryText:B,entryMid:A,sl:Y,tp1:U,tp2:st,atr:m,rsi:y,adx:a?.adx||20,ema10:a?.ema10||w,sma20:a?.sma20||w}},[c]),ue=C(()=>le>0?le:!u||!u.sl?0:Math.abs(u.entryMid-u.sl),[le,u]),Be=C(()=>Vt==="percent"?It*$t/100:jt,[It,$t,jt,Vt]),uo=C(()=>It<=0?0:Vt==="usd"?jt/It*100:$t,[It,$t,jt,Vt]),xo=C(()=>ue<=0?0:Be/(ue*(se==="standard"?100:se==="mini"?10:1)),[Be,ue,se]),bo=C(()=>{if(!u)return{};let t=u.type,a=u.winProbability,r="var(--yellow)";return t.includes("BUY")?r="var(--green)":t.includes("SELL")&&(r="var(--red)"),{background:`conic-gradient(${r} 0% ${a}%, var(--bg3) ${a}% 100%)`}},[u]),Aa=(t,a)=>{let r=a.replace(/\D/g,"").slice(-1),n=rt.split("");for(;n.length<6;)n.push("");n[t]=r;let s=n.join("");Q(s),r&&t<5&&wt.current[t+1]?.focus()},Ia=(t,a)=>{if(a.key==="Backspace"){let r=rt.split("");for(;r.length<6;)r.push("");!r[t]&&t>0?(r[t-1]="",Q(r.join("")),wt.current[t-1]?.focus()):(r[t]="",Q(r.join("")))}},P=(()=>{let t=W;if(!t)return 0;let a=0;return t.length>=6&&a++,t.length>=10&&a++,/[A-Z]/.test(t)&&/[0-9]/.test(t)&&a++,a})(),Ue=300,Ea=Ue>0?G/Ue:0,We=2*Math.PI*22,Ra=We*(1-Ea);return Je?o("div",{className:"auth-container",children:[e("div",{className:"auth-grid-overlay"}),o("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",position:"relative",zIndex:1},children:[e("div",{className:"auth-logo-ring",children:e("img",{src:"/frontend/logo.png",alt:"XAU Logo",className:"auth-logo-img"})}),e("div",{style:{color:"var(--gold)",fontWeight:"800",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase"},children:"\u0110ang kh\u1EDFi \u0111\u1ED9ng h\u1EC7 th\u1ED1ng..."}),e("div",{className:"load-bar",style:{width:"220px"},children:e("div",{className:"load-fill"})})]})]}):I?o("div",{className:"root",children:[o("header",{className:"topbar",children:[e("div",{className:"topbar-left",children:o("div",{className:"brand",style:{display:"flex",alignItems:"center"},children:[e("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"45px",height:"45px",borderRadius:"8px",marginRight:"8px",filter:"drop-shadow(0 0 8px rgba(255, 171, 0, 0.4))"}}),e("span",{className:"brand-name",children:"H\u1EC6 TH\u1ED0NG GIAO D\u1ECACH V\xC0NG CHUY\xCAN NGHI\u1EC6P XAU/USD"}),e("span",{className:"brand-badge",children:"D\u1EEE LI\u1EC6U TH\u1EDCI GIAN TH\u1EF0C MILLISECOND"})]})}),o("div",{className:"topbar-right",children:[e("span",{className:"clock",children:ua||"00:00:00 UTC"}),I&&o("div",{className:"user-profile-chip",style:{display:"flex",alignItems:"center",gap:"8px",background:"rgba(255, 215, 0, 0.04)",border:"1px solid rgba(255, 215, 0, 0.12)",padding:"4px 12px",borderRadius:"8px",marginRight:"10px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03)"},children:[o("span",{style:{fontSize:"11px",color:"var(--text2)",fontWeight:"600"},children:["\u{1F464} ",I.email]}),e("div",{style:{width:"1px",height:"12px",background:"rgba(255,255,255,0.12)",margin:"0 4px"}}),e("button",{type:"button",onClick:ga,style:{background:"transparent",border:"none",color:"#ff1744",fontSize:"11px",fontWeight:"700",cursor:"pointer",padding:"2px 6px",borderRadius:"4px",display:"flex",alignItems:"center",gap:"4px",transition:"all 0.2s ease"},onMouseOver:t=>{t.currentTarget.style.background="rgba(255, 23, 68, 0.1)"},onMouseOut:t=>{t.currentTarget.style.background="transparent"},children:"\u{1F6AA} \u0110\u0103ng xu\u1EA5t"})]}),e("button",{className:`tf-btn ${K?"active":""}`,style:{borderColor:K?"var(--green)":"rgba(255,255,255,0.05)",background:K?"rgba(0, 230, 118, 0.12)":"var(--bg3)",color:K?"var(--green)":"var(--text)",marginRight:"10px",fontWeight:K?"600":"normal",cursor:"pointer"},onClick:()=>ma(!K),children:K?"\u{1F514} B\xE1o \xC2m: B\u1EACT":"\u{1F515} B\xE1o \xC2m: T\u1EAET"}),e("button",{className:"tf-btn",style:{borderColor:"rgba(255,255,255,0.05)",background:"var(--bg3)",color:"var(--text)"},onClick:ge,children:"\u{1F504} T\u1EA3i L\u1EA1i"})]})]}),o("div",{className:"layout",children:[!dt&&o("aside",{className:"sidebar",children:[e("header",{className:"sb-header hide-on-mobile",children:e("div",{className:"gold-profile-card",children:e("div",{className:"g-title",children:"\u{1F7E1} V\xC0NG SPOT (XAU/USD)"})})}),o("div",{style:{padding:"16px",flex:1,display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:[c&&e("div",{className:"sug-card hide-on-mobile",style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"16px",background:"rgba(20, 24, 33, 0.45)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 215, 0, 0.08)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.25)"},children:e("img",{src:"/frontend/logo.png",alt:"Xtreme Algo Union Logo",style:{width:"100%",maxWidth:"220px",height:"auto",borderRadius:"12px",filter:"drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",transition:"all 0.3s ease"},onMouseOver:t=>{t.currentTarget.style.filter="drop-shadow(0 0 24px rgba(255, 171, 0, 0.5))",t.currentTarget.style.transform="scale(1.02)"},onMouseOut:t=>{t.currentTarget.style.filter="drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",t.currentTarget.style.transform="scale(1)"}})}),u&&o("div",{className:"sug-card",style:{borderTop:"3px solid var(--gold)",background:"rgba(20, 24, 33, 0.65)",backdropFilter:"blur(12px)"},children:[o("div",{className:"sug-title",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:"\u2728 CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT"}),e("span",{style:{fontSize:"9px",background:"rgba(255, 171, 0, 0.15)",color:"var(--gold)",padding:"2px 6px",borderRadius:"4px",fontWeight:"bold"},children:"PRO FEED"})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"16px",margin:"14px 0",background:"rgba(255,255,255,0.02)",padding:"10px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.04)"},children:o("div",{style:{flex:1},children:[e("span",{style:{fontSize:"10px",color:"var(--text2)",textTransform:"uppercase",display:"block"},children:"Khuy\u1EBFn ngh\u1ECB h\u1EE3p l\u01B0u"}),e("span",{className:`sug-val ${u.type.includes("BUY")?"buy":u.type.includes("SELL")?"sell":""}`,style:{fontSize:"15px",fontWeight:"800",marginTop:"2px",display:"block"},children:u.type==="STRONG_BUY"?"\u{1F7E2} MUA M\u1EA0NH (STRONG BUY)":u.type==="BUY"?"\u{1F7E2} MUA V\xC0O (BUY)":u.type==="STRONG_SELL"?"\u{1F534} B\xC1N M\u1EA0NH (STRONG SELL)":u.type==="SELL"?"\u{1F534} B\xC1N RA (SELL)":"\u{1F7E1} TRUNG L\u1EACP (NEUTRAL)"})]})}),o("div",{className:"sug-grid",style:{gap:"8px"},children:[o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"ENTRY"}),e("span",{className:"sug-val entry",style:{fontSize:"11.5px",letterSpacing:"-0.2px"},children:u.entryText})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"\u0110i\u1EC3m C\u1EAFt l\u1ED7 (SL)"}),e("span",{className:"sug-val sl",style:{fontSize:"11.5px"},children:u.sl>0?`$${u.sl.toFixed(2)}`:"\u2014"})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 1 (TP1)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:u.tp1>0?`$${u.tp1.toFixed(2)}`:"\u2014"})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 2 (TP2)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:u.tp2>0?`$${u.tp2.toFixed(2)}`:"\u2014"})]}),e("div",{className:"sug-item",style:{gridColumn:"span 2"},children:o("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"8px",marginTop:"4px"},children:[o("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"T\u1EF7 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn:"}),e("strong",{style:{color:"#fff",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:"1:1.5 \u2794 1:3.0"})]}),o("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"H\u1EC7 s\u1ED1 bi\u1EBFn \u0111\u1ED9ng (ATR):"}),o("strong",{style:{color:"var(--gold)",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:["$",u.atr.toFixed(2)]})]})]})}),o("div",{className:"sug-item",style:{gridColumn:"span 2",background:"rgba(255, 255, 255, 0.01)",padding:"8px",borderRadius:"6px",border:"1px solid rgba(255, 255, 255, 0.03)",marginTop:"4px"},children:[e("span",{className:"sug-label",style:{fontSize:"9.5px",marginBottom:"6px",display:"block"},children:"H\u1EE3p l\u01B0u \u0111a khung th\u1EDDi gian:"}),e("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"4px",textAlign:"center"},children:[{id:"1",label:"M1"},{id:"5",label:"M5"},{id:"15",label:"M15"},{id:"60",label:"H1"},{id:"1D",label:"D1"}].map(t=>{let a=c?.multiTimeframeSignals?.[t.id]||"NEUTRAL",r="var(--text3)",n="rgba(255, 255, 255, 0.03)",s="TRUNG L\u1EACP";a.includes("BUY")?(r="var(--green)",n="rgba(0, 230, 118, 0.08)",s=a==="STRONG_BUY"?"MUA M\u1EA0NH":"MUA"):a.includes("SELL")?(r="var(--red)",n="rgba(255, 23, 68, 0.08)",s=a==="STRONG_SELL"?"B\xC1N M\u1EA0NH":"B\xC1N"):(r="var(--yellow)",n="rgba(255, 171, 0, 0.08)",s="TRUNG L\u1EACP");let i=f===t.id;return o("div",{onClick:()=>{it(),J(t.id)},style:{background:n,border:i?"1px solid var(--gold)":"1px solid rgba(255,255,255,0.04)",borderRadius:"4px",padding:"4px 1px",cursor:"pointer",transition:"all 0.15s ease",boxShadow:i?"0 0 6px rgba(255, 171, 0, 0.12)":"none"},onMouseOver:l=>{l.currentTarget.style.transform="scale(1.03)",l.currentTarget.style.borderColor="var(--gold)"},onMouseOut:l=>{l.currentTarget.style.transform="scale(1)",l.currentTarget.style.borderColor=i?"var(--gold)":"rgba(255,255,255,0.04)"},children:[e("span",{style:{fontSize:"9px",fontWeight:"800",color:i?"var(--gold)":"#fff",display:"block"},children:t.label}),e("span",{style:{fontSize:"6.5px",color:r,display:"block",marginTop:"2px",fontWeight:"bold",whiteSpace:"nowrap"},children:s})]},t.id)})})]})]})]})]})]}),o("main",{className:"main",children:[o("div",{className:"sym-header",children:[o("div",{className:"sym-info",children:[o("div",{className:"sym-title-wrap",children:[e("span",{className:"sym-title",children:"GOLD (XAU/USD)"}),e("span",{className:"sym-subtitle",children:"V\xE0ng giao ngay / \u0110\xF4 la M\u1EF9"})]}),o("div",{className:"price-info",children:[o("span",{className:"price-current",children:["$",w.toFixed(2)]}),o("span",{className:`price-change ${ie>=0?"up":"down"}`,children:[ie>=0?"+":"",ie.toFixed(3),"%"]})]})]}),e("div",{className:"hide-on-mobile",style:{display:"flex",gap:"4px",background:"var(--bg3)",padding:"3px",borderRadius:"6px",border:"1px solid var(--border)",marginLeft:"auto",marginRight:"6px"},children:[{id:"1",name:"M1"},{id:"5",name:"M5"},{id:"15",name:"M15"},{id:"60",name:"1H"},{id:"1D",name:"1D"}].map(t=>e("button",{onClick:()=>{it(),J(t.id)},style:{background:f===t.id?"var(--yellow)":"transparent",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:"bold",color:f===t.id?"#000":"var(--text2)",cursor:"pointer",transition:"all 0.15s ease"},children:t.name},t.id))}),e("div",{style:{display:"flex",gap:"6px",alignItems:"center",marginLeft:"6px"},children:e("button",{onClick:()=>{it(),V("tradingview")},className:`tf-btn ${T==="tradingview"?"active":""}`,style:{background:T==="tradingview"?"var(--yellow)":"var(--bg3)",borderColor:T==="tradingview"?"var(--yellow)":"rgba(255,255,255,0.05)",color:T==="tradingview"?"#000":"var(--text2)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:"\u{1F4CA} BI\u1EC2U \u0110\u1ED2 TRADINGVIEW"})})]}),Ve&&e("div",{className:"load-bar",children:e("div",{className:"load-fill"})}),fe&&o("div",{className:"err-msg",children:["\u26A0\uFE0F L\u1ED7i: ",fe]}),o("div",{className:"main-workspace",children:[e("div",{className:`chart-column ${dt?"full-chart-active":""}`,children:e("div",{className:"chart-wrap",style:{height:"100%",width:"100%",display:"flex",flexDirection:"column",position:"relative"},children:T==="tradingview"?o(q,{children:[e(Da,{timeframe:f}),fa&&o("div",{className:"tv-guide-overlay",children:[o("div",{className:"tv-guide-header",children:[o("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{className:"tv-guide-icon",children:"\u{1F4A1}"}),e("span",{className:"tv-guide-title",children:"M\u1EB9o: B\u1EADt \u0110\u1EBFm Ng\u01B0\u1EE3c \u0110\xF3ng N\u1EBFn Tr\xEAn Chart"})]}),e("button",{className:"tv-guide-close",onClick:()=>va(!1),children:"\xD7"})]}),o("div",{className:"tv-guide-body",children:["\u0110\u1EC3 ch\u1EA1y \u0111\u1EBFm ng\u01B0\u1EE3c n\u1EBFn th\u1EDDi gian th\u1EF1c \u1EDF d\u01B0\u1EDBi t\u1EF7 gi\xE1 ",o("strong",{style:{color:"var(--green)"},children:["$",w.toFixed(2)]}),":",o("ol",{className:"tv-guide-steps",children:[o("li",{children:[e("strong",{children:"Click chu\u1ED9t ph\u1EA3i"})," v\xE0o v\xF9ng c\u1ED9t t\u1EF7 gi\xE1 b\xEAn ph\u1EA3i bi\u1EC3u \u0111\u1ED3."]}),o("li",{children:["Ch\u1ECDn d\xF2ng ",e("strong",{style:{color:"var(--gold)"},children:'"\u0110\u1EBFm ng\u01B0\u1EE3c t\u1EDBi khi \u0111\xF3ng n\u1EBFn" (Countdown to bar close)'}),"."]})]}),e("div",{className:"tv-guide-footer",children:"\u2713 T\u1EF1 \u0111\u1ED9ng l\u01B0u v\xE0 ho\u1EA1t \u0111\u1ED9ng v\u0129nh vi\u1EC5n tr\xEAn tr\xECnh duy\u1EC7t c\u1EE7a b\u1EA1n!"})]})]})]}):o("div",{style:{position:"relative",width:"100%",height:"100%",flex:1,display:"flex",flexDirection:"column",background:"#131722",overflow:"hidden"},children:[d?o("svg",{className:"chart-svg",ref:yt,width:"100%",height:"100%",viewBox:`0 0 ${d.width} ${d.height}`,preserveAspectRatio:"none",onMouseDown:La,onMouseMove:Ma,onMouseUp:De,onMouseLeave:De,onDoubleClick:Ca,style:{cursor:Xt.current?"grabbing":"crosshair",userSelect:"none"},children:[e("defs",{children:o("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e("feGaussianBlur",{stdDeviation:"3",result:"blur"}),o("feMerge",{children:[e("feMergeNode",{in:"blur"}),e("feMergeNode",{in:"SourceGraphic"})]})]})}),d.priceLabels.map((t,a)=>o("g",{children:[e("line",{x1:d.paddingLeft,y1:t.y,x2:d.width-d.paddingRight,y2:t.y,stroke:"rgba(255, 255, 255, 0.03)",strokeWidth:"1"}),o("text",{x:d.width-d.paddingRight+8,y:t.y+4,fill:"var(--text3)",fontSize:"10px",fontFamily:"monospace",children:["$",t.price.toFixed(2)]})]},`grid-y-${a}`)),d.timeLabels.map((t,a)=>o("g",{children:[e("line",{x1:t.x,y1:0,x2:t.x,y2:d.height-d.paddingBottom,stroke:"rgba(255, 255, 255, 0.02)",strokeWidth:"1"}),e("text",{x:t.x-18,y:d.height-12,fill:"var(--text3)",fontSize:"9.5px",fontFamily:"monospace",children:t.label})]},`grid-x-${a}`)),u&&(()=>{let t=d.getY(u.entryMid),a=d.getY(u.sl),r=d.getY(u.tp2),n=d.paddingLeft,s=d.width-d.paddingRight;return o(q,{children:[e("rect",{x:n,y:Math.min(t,a),width:s-n,height:Math.abs(t-a),fill:"rgba(255, 23, 68, 0.06)",stroke:"rgba(255, 23, 68, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"}),e("rect",{x:n,y:Math.min(t,r),width:s-n,height:Math.abs(t-r),fill:"rgba(0, 230, 118, 0.06)",stroke:"rgba(0, 230, 118, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"})]})})(),c?.advancedAnalysis&&(()=>{let t=c.advancedAnalysis,a=d.paddingLeft,r=d.width-d.paddingRight;return o("g",{id:"smc-dynamic-structures",children:[t.orderBlocks?.map((n,s)=>{let i=n.index,l=n.mitigated?Math.min(g.length-1,n.index+10):g.length-1,x=d.getX(i-D),b=d.getX(l-D),h=Math.max(a,x),v=Math.min(r,b);if(h>=v)return null;let m=d.getY(n.high),y=d.getY(n.low),S=Math.min(m,y),z=Math.abs(m-y),N=n.type==="BULLISH",H=N?"rgba(0, 230, 118, 0.06)":"rgba(255, 23, 68, 0.06)",B=N?"rgba(0, 230, 118, 0.22)":"rgba(255, 23, 68, 0.22)",Y=N?"+OB BULLISH":"-OB BEARISH",U=N?"rgba(0, 230, 118, 0.8)":"rgba(255, 23, 68, 0.8)";return o("g",{children:[e("rect",{x:h,y:S,width:v-h,height:z,fill:H,stroke:B,strokeWidth:"1"}),v-h>50&&e("text",{x:h+6,y:S+11,fill:U,fontSize:"8px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:Y})]},`ob-${s}`)}),t.fvgs?.map((n,s)=>{let i=Math.max(0,n.index-2),l=n.mitigated?Math.min(g.length-1,n.index+6):g.length-1,x=d.getX(i-D),b=d.getX(l-D),h=Math.max(a,x),v=Math.min(r,b);if(h>=v)return null;let m=d.getY(n.top),y=d.getY(n.bottom),S=Math.min(m,y),z=Math.abs(m-y),N=n.type==="BULLISH",H=N?"rgba(0, 188, 212, 0.04)":"rgba(233, 30, 99, 0.04)",B=N?"rgba(0, 188, 212, 0.16)":"rgba(233, 30, 99, 0.16)",Y=N?"FVG BULLISH":"FVG BEARISH",U=N?"rgba(0, 188, 212, 0.65)":"rgba(233, 30, 99, 0.65)";return o("g",{children:[e("rect",{x:h,y:S,width:v-h,height:z,fill:H,stroke:B,strokeWidth:"0.8",strokeDasharray:"2,2"}),v-h>50&&z>6&&e("text",{x:h+6,y:S+9,fill:U,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:Y})]},`fvg-${s}`)}),t.structureShifts?.map((n,s)=>{let i=g.findIndex(z=>z.time===n.time);if(i===-1)return null;let l=Math.min(g.length-1,i+20),x=d.getX(i-D),b=d.getX(l-D),h=Math.max(a,x),v=Math.min(r,b);if(h>=v)return null;let m=d.getY(n.price),y=n.direction==="BULLISH",S=y?"var(--green)":"var(--red)";return o("g",{children:[e("line",{x1:h,y1:m,x2:v,y2:m,stroke:S,strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.85"}),o("g",{transform:`translate(${h+6}, ${m-6})`,children:[e("rect",{x:"-3",y:"-2",width:"48",height:"12",rx:"3",fill:"rgba(19, 23, 34, 0.95)",stroke:S,strokeWidth:"0.8"}),o("text",{x:"21",y:"7",textAnchor:"middle",fill:S,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",children:[n.type," ",y?"\u2197":"\u2198"]})]})]},`shift-${s}`)}),t.sweeps?.map((n,s)=>{let i=g.findIndex(h=>h.time===n.time);if(i===-1)return null;let l=d.getX(i-D);if(l<a||l>r)return null;let x=d.getY(n.price),b=n.type==="SSL";return o("g",{children:[e("line",{x1:l-4,y1:x-4,x2:l+4,y2:x+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("line",{x1:l+4,y1:x-4,x2:l-4,y2:x+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("text",{x:l,y:b?x+14:x-10,textAnchor:"middle",fill:"var(--yellow)",fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:b?"SSL SWEEP":"BSL SWEEP"})]},`sweep-${s}`)})]})})(),_.map((t,a)=>{let r=d.getX(a),n=d.getY(t.high),s=d.getY(t.low),i=d.getY(t.open),l=d.getY(t.close),b=t.close>=t.open?"var(--green)":"var(--red)";return o("g",{children:[e("line",{x1:r,y1:n,x2:r,y2:s,stroke:b,strokeWidth:"1.5"}),e("rect",{x:r-d.bodyWidth/2,y:Math.min(i,l),width:d.bodyWidth,height:Math.max(1.5,Math.abs(i-l)),fill:b,stroke:b,strokeWidth:"0.5"})]},`candle-${a}`)}),mt&&(()=>{let t="";for(let a=0;a<_.length;a++){let r=D+a,n=ya[r];if(n){let s=d.getX(a),i=d.getY(n);t===""?t+=`M ${s} ${i}`:t+=` L ${s} ${i}`}}return t?e("path",{d:t,fill:"none",stroke:Lt,strokeWidth:"2",opacity:"0.85"}):null})(),ht&&(()=>{let t="";for(let a=0;a<_.length;a++){let r=D+a,n=wa[r];if(n){let s=d.getX(a),i=d.getY(n);t===""?t+=`M ${s} ${i}`:t+=` L ${s} ${i}`}}return t?e("path",{d:t,fill:"none",stroke:Mt,strokeWidth:"2.2",opacity:"0.85"}):null})(),Ce&&(()=>{let{i1:t,price1:a,i2:r,price2:n}=Ce,s=(n-a)/(r-t),i=d.getX(t-D),l=d.getY(a),b=g.length-1+10,h=d.getX(b-D),v=d.getY(a+s*(b-t));return o("g",{children:[e("line",{x1:i,y1:l,x2:h,y2:v,stroke:"var(--gold)",strokeWidth:"2.5",strokeDasharray:"6,4",filter:"url(#glow)"}),e("circle",{cx:i,cy:l,r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),e("circle",{cx:d.getX(r-D),cy:d.getY(n),r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),o("text",{x:Math.max(i+10,d.width-d.paddingRight-180),y:v-10,fill:"var(--gold)",fontSize:"10px",fontWeight:"bold",fontFamily:"monospace",opacity:"0.9",children:["\u2198 \u0110\u01AF\u1EDCNG XU H\u01AF\u1EDANG GI\u1EA2M ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]})]})})(),u&&(()=>{let t=d.getY(u.entryMid),a=d.getY(u.sl),r=d.getY(u.tp1),n=d.getY(u.tp2),s=d.paddingLeft,i=d.width-d.paddingRight;return o("g",{children:[e("line",{x1:s,y1:a,x2:i,y2:a,stroke:"var(--red)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:i+4,y:a-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 23, 68, 0.2)",stroke:"var(--red)",strokeWidth:"1"}),o("text",{x:i+8,y:a+4,fill:"var(--red)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["SL:$",u.sl.toFixed(1)]}),e("line",{x1:s,y1:t,x2:i,y2:t,stroke:"var(--gold)",strokeWidth:"1.5",strokeDasharray:"4,4"}),e("rect",{x:i+4,y:t-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 171, 0, 0.2)",stroke:"var(--gold)",strokeWidth:"1"}),o("text",{x:i+8,y:t+4,fill:"var(--gold)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["ENT:$",u.entryMid.toFixed(1)]}),e("line",{x1:s,y1:r,x2:i,y2:r,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:i+4,y:r-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),o("text",{x:i+8,y:r+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP1:$",u.tp1.toFixed(1)]}),e("line",{x1:s,y1:n,x2:i,y2:n,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:i+4,y:n-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),o("text",{x:i+8,y:n+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP2:$",u.tp2.toFixed(1)]})]})})()]}):e("div",{className:"chart-empty",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"var(--text3)"},children:"\u0110ang d\u1EF1ng bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt..."}),o("div",{className:"chart-ema-legend",onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:[o("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:Lt,color:Lt}}),o("span",{className:"ema-legend-name",style:{color:mt?"#fff":"var(--text3)"},children:["EMA ",kt," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:Tt})]}),o("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${mt?"active":""}`,onClick:()=>Ze(!mt),title:mt?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:mt?o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>Ct("ema50"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Bt("ema50"),Ut("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]}),o("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:Mt,color:Mt}}),o("span",{className:"ema-legend-name",style:{color:ht?"#fff":"var(--text3)"},children:["EMA ",St," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:Nt})]}),o("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${ht?"active":""}`,onClick:()=>Qe(!ht),title:ht?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:ht?o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>Ct("ema200"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Bt("ema200"),Ut("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]})]}),nt&&e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:o("div",{className:"chart-modal-card",children:[o("div",{className:"chart-modal-header",children:[o("span",{className:"chart-modal-title",children:["\u2699\uFE0F C\xE0i \u0110\u1EB7t Ch\u1EC9 B\xE1o: EMA ",nt==="ema50"?"50":"200"]}),e("button",{className:"chart-modal-close",onClick:()=>Ct(null),children:"\xD7"})]}),o("div",{className:"chart-modal-body",children:[o("div",{className:"settings-group",children:[e("label",{className:"settings-label",children:"Chu k\u1EF3 (Length)"}),o("div",{className:"settings-input-row",children:[e("input",{type:"number",min:"2",max:"500",className:"settings-number-input",value:ae,onChange:t=>oe(Math.max(2,parseInt(t.target.value)||2))}),e("span",{style:{fontSize:"11px",color:"var(--text3)"},children:"(2 - 500 n\u1EBFn)"})]})]}),o("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"Ngu\u1ED3n gi\xE1 tr\u1ECB (Source)"}),e("div",{className:"settings-input-row",children:o("select",{className:"settings-select",value:re,onChange:t=>ne(t.target.value),children:[e("option",{value:"close",children:"\u0110\xF3ng c\u1EEDa (Close)"}),e("option",{value:"open",children:"M\u1EDF c\u1EEDa (Open)"}),e("option",{value:"high",children:"Cao nh\u1EA5t (High)"}),e("option",{value:"low",children:"Th\u1EA5p nh\u1EA5t (Low)"})]})})]}),o("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"M\xE0u \u0111\u01B0\u1EDDng ch\u1EC9 b\xE1o (Color)"}),e("div",{className:"settings-colors-grid",children:["#FFD700","#00e5ff","#FF1744","#d500f9","#00e676","#ff9100","#ffffff","#787b86"].map(t=>e("div",{className:`settings-color-dot ${Wt===t?"active":""}`,style:{backgroundColor:t},onClick:()=>Gt(t)},t))}),o("div",{style:{marginTop:"10px",width:"100%"},children:[e("span",{style:{fontSize:"11px",color:"var(--text3)",display:"block",marginBottom:"4px"},children:"M\xE3 m\xE0u HEX t\xF9y ch\u1EC9nh:"}),e("input",{type:"text",className:"settings-number-input",style:{width:"120px"},value:Wt,onChange:t=>Gt(t.target.value)})]})]})]}),o("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn cancel",onClick:()=>Ct(null),children:"H\u1EE7y b\u1ECF"}),e("button",{className:"modal-btn apply",onClick:ia,children:"\xC1p d\u1EE5ng"})]})]})}),Ht&&(()=>{let t=Ht==="ema50"?kt:St,a=Ht==="ema50"?Tt:Nt,n=`//@version=5
// \xA9 TradingView Pine Script v5
// Ch\u1EC9 b\xE1o Exponential Moving Average (EMA) - B\u1EA3n M\xE3 Ngu\u1ED3n M\u1EDF
indicator("Exponential Moving Average", shorttitle="EMA ${t}", overlay=true)

// C\u1EA5u h\xECnh c\xE1c tham s\u1ED1 \u0111\u1EA7u v\xE0o c\u1EE7a ch\u1EC9 b\xE1o
lengthInput = input.int(${t}, minval=1, title="Length")
sourceInput = input.source(${a}, title="Source")

// H\xE0m t\xEDnh to\xE1n EMA t\xEDch l\u0169y \u0111\u1ED9ng
emaValue = ta.ema(sourceInput, lengthInput)

// V\u1EBD \u0111\u01B0\u1EDDng EMA l\xEAn bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt v\u1EDBi m\xE0u s\u1EAFc l\u1EF1a ch\u1ECDn
plot(emaValue, title="EMA Line", color=color.from_hex("${Ht==="ema50"?Lt:Mt}"), linewidth=2)`,s=`/**
 * C\xD4NG TH\u1EE8C TO\xC1N H\u1ECCC & L\u1EACP TR\xCCNH T\xCDNH EMA (EXPONENTIAL MOVING AVERAGE)
 * Phi\xEAn b\u1EA3n m\xE3 ngu\u1ED3n m\u1EDF vi\u1EBFt b\u1EB1ng JavaScript/TypeScript cho XAU/USD Gold Terminal.
 * 
 * H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (Smoothing Multiplier) k = 2 / (Length + 1)
 * C\xF4ng th\u1EE9c t\xEDnh n\u1EBFn th\u1EE9 i: 
 *   EMA(i) = Gi\xE1(i) * k + EMA(i-1) * (1 - k)
 */
function calculateEMA(candles, length = ${t}, source = "${a}") {
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
}`;return e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:i=>i.stopPropagation(),onMouseMove:i=>i.stopPropagation(),children:o("div",{className:"chart-modal-card wide",children:[o("div",{className:"chart-modal-header",children:[o("span",{className:"chart-modal-title",children:["\u{1F4D6} M\xE3 Ngu\u1ED3n M\u1EDF Ch\u1EC9 B\xE1o: EMA ",t," (",a,")"]}),e("button",{className:"chart-modal-close",onClick:()=>Bt(null),children:"\xD7"})]}),o("div",{className:"chart-modal-body",children:[o("div",{className:"chart-modal-tabs",children:[e("button",{className:`chart-modal-tab-btn ${zt==="pine"?"active":""}`,onClick:()=>Ut("pine"),children:"Pine Script v5 (TradingView)"}),e("button",{className:`chart-modal-tab-btn ${zt==="js"?"active":""}`,onClick:()=>Ut("js"),children:"JavaScript / TypeScript"})]}),e("div",{className:"code-container",children:e("pre",{style:{margin:0},children:e("code",{children:zt==="pine"?n:s})})}),o("div",{style:{marginTop:"12px",fontSize:"11.5px",color:"var(--text3)",display:"flex",gap:"6px",alignItems:"flex-start",lineHeight:"1.4"},children:[e("span",{children:"\u{1F4A1}"}),e("span",{children:zt==="pine"?"M\xE3 ngu\u1ED3n Pine Script c\xF3 th\u1EC3 copy v\xE0 d\xE1n tr\u1EF1c ti\u1EBFp v\xE0o m\u1EE5c Pine Editor tr\xEAn trang TradingView c\u1EE7a b\u1EA1n \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng EMA \u0111\u1ED3ng b\u1ED9 100%.":"H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (smoothing multiplier) c\u1EE7a chu k\u1EF3 "+t+" l\xE0 k = 2 / ("+t+" + 1) \u2248 "+(2/(t+1)).toFixed(4)+". \u0110\xE2y l\xE0 thu\u1EADt to\xE1n ti\xEAu chu\u1EA9n ng\xE0nh \u0111\u01B0\u1EE3c t\u1ED1i \u01B0u h\xF3a ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Deno Sandbox."})]})]}),o("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn apply",onClick:()=>{navigator.clipboard.writeText(zt==="pine"?n:s),alert("\u0110\xE3 sao ch\xE9p m\xE3 ngu\u1ED3n ch\u1EC9 b\xE1o v\xE0o Clipboard!")},children:"\u{1F4CB} Sao ch\xE9p m\xE3 ngu\u1ED3n"}),e("button",{className:"modal-btn cancel",onClick:()=>Bt(null),children:"\u0110\xF3ng"})]})]})})})(),o("div",{className:"chart-badge",style:{display:"flex",alignItems:"center",gap:"10px",pointerEvents:"auto"},children:[o("span",{children:["\u{1F4C8} C\u1EA4U TR\xDAC V\xC0NG ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]}),e("span",{style:{color:"rgba(255,255,255,0.15)"},children:"|"}),e("button",{onClick:Pe,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2795 Ph\xF3ng to"}),e("button",{onClick:He,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2796 Thu nh\u1ECF"}),e("button",{onClick:za,style:{background:"none",border:"none",color:Me?"var(--green)":"var(--yellow)",cursor:"pointer",fontWeight:"bold"},children:Me?"\u25CF TR\u1EF0C TI\u1EBEP":"\u23EE XEM GI\xC1 TR\u1EF0C TI\u1EBEP"})]})]})})}),!dt&&o("div",{className:"realtime-panel",style:{height:"100%"},children:[e("div",{className:"panel-tab",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"var(--bg3)",borderBottom:"1px solid var(--border)"},children:e("span",{style:{fontSize:"11.5px",fontWeight:"700",color:"var(--gold)",letterSpacing:"0.5px"},children:"\u{1F4C5} L\u1ECACH KINH T\u1EBE (INVESTING)"})}),e("div",{style:{flex:1,width:"100%",height:"calc(100% - 37px)",overflow:"hidden"},children:e("iframe",{src:"https://sslecal2.investing.com/?ecoTimezone=28&ecoLanguage=52&lang=52&columns=time,currency,importance,event,actual,forecast,previous&features=datepicker,timezone&countryIds=5,72,17,25,32,6,37,43,22,39,35,42,4,36,110,26,12,11,10,38,14&calType=week&timeFrame=today",width:"100%",height:"100%",frameBorder:"0",allowTransparency:"true",marginWidth:0,marginHeight:0,style:{border:"none",filter:"invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(0.95)",background:"transparent"}})})]})]}),c&&!dt&&o("div",{className:"signal-dash",children:[o("div",{className:"dash-tabs",children:[e("button",{className:`dash-tab-btn ${j==="ai"?"active":""}`,onClick:()=>qt("ai"),children:"\u{1F916} PH\xC2N T\xCDCH A.I"}),e("button",{className:`dash-tab-btn ${j==="backtest"?"active":""}`,onClick:()=>qt("backtest"),children:"\u{1F4CA} L\u1ECACH S\u1EEC CH\u1ED0T L\u1EDCI / C\u1EAET L\u1ED6"}),e("button",{className:`dash-tab-btn ${j==="outlook"?"active":""}`,onClick:()=>qt("outlook"),children:"\u{1F4CB} NH\u1EACN \u0110\u1ECANH TH\u1ECA TR\u01AF\u1EDCNG"})]}),j==="ai"&&c&&c.advancedAnalysis&&o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[c?.signals?.suggestion&&o("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",borderTop:`4px solid ${c.signals.suggestion.position==="BUY"?"var(--green)":c.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)"}`,boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"16px"},children:[o("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[o("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F3AF}"}),o("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"#fff",margin:0,letterSpacing:"0.5px"},children:"K\u1EBE HO\u1EA0CH GIAO D\u1ECACH & BI\u1EC6N GI\u1EA2I CHUY\xCAN S\xC2U A.I"}),e("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"H\u1EE3p l\u01B0u 3 ph\u01B0\u01A1ng ph\xE1p ti\xEAu chu\u1EA9n: SMC + Price Action + M\xF4 h\xECnh n\u1EBFn \u0111\u1EA3o chi\u1EC1u"})]})]}),e("span",{style:{fontSize:"11px",fontWeight:"bold",textTransform:"uppercase",padding:"4px 10px",borderRadius:"6px",background:c.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.12)":c.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.12)":"rgba(255, 171, 0, 0.12)",color:c.signals.suggestion.position==="BUY"?"var(--green)":c.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)",border:`1px solid ${c.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.25)":c.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.25)":"rgba(255, 171, 0, 0.25)"}`},children:c.signals.suggestion.position==="BUY"?"\u{1F402} KHUY\u1EBEN NGH\u1ECA MUA (BUY)":c.signals.suggestion.position==="SELL"?"\u{1F43B} KHUY\u1EBEN NGH\u1ECA B\xC1N (SELL)":"\u{1F7E1} CH\u1EDC \u0110\u1EE2I (NEUTRAL)"})]}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"12px",background:"rgba(255, 255, 255, 0.02)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255, 255, 255, 0.04)"},children:[o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"\u0110I\u1EC2M V\xC0O (ENTRY)"}),o("strong",{style:{fontSize:"14px",color:"var(--gold)",fontFamily:"monospace"},children:["$",c.signals.suggestion.entry.toFixed(2)]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"C\u1EAET L\u1ED6 (SL)"}),e("strong",{style:{fontSize:"14px",color:"var(--red)",fontFamily:"monospace"},children:c.signals.suggestion.stopLoss>0?`$${c.signals.suggestion.stopLoss.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 1 (TP1)"}),e("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:c.signals.suggestion.takeProfit1>0?`$${c.signals.suggestion.takeProfit1.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 2 (TP2)"}),e("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:c.signals.suggestion.takeProfit2>0?`$${c.signals.suggestion.takeProfit2.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 171, 0, 0.02)",borderLeft:"4px solid var(--gold)",border:"1px solid rgba(255, 171, 0, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F4E5} BI\u1EC6N GI\u1EA2I \u0110I\u1EC2M V\xC0O L\u1EC6NH (ENTRY RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.entryReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u th\u1ECB tr\u01B0\u1EDDng..."})]}),o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 23, 68, 0.02)",borderLeft:"4px solid var(--red)",border:"1px solid rgba(255, 23, 68, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--red)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F6E1}\uFE0F BI\u1EC6N GI\u1EA2I PH\xD2NG V\u1EC6 C\u1EAET L\u1ED6 (SL RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.slReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u b\u1EA3o v\u1EC7 v\u1ECB th\u1EBF..."})]}),o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(0, 230, 118, 0.02)",borderLeft:"4px solid var(--green)",border:"1px solid rgba(0, 230, 118, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--green)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F3AF} BI\u1EC6N GI\u1EA2I CH\u1ED0T L\u1EDCI M\u1EE4C TI\xCAU (TP RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.tpReason||"\u0110ang ph\xE2n t\xEDch m\u1EE5c ti\xEAu thanh kho\u1EA3n..."})]})]})]}),o("div",{className:"reasons",style:{background:"rgba(255, 171, 0, 0.02)",borderColor:"rgba(255, 171, 0, 0.1)",margin:0},children:[e("h3",{children:"\u26A0\uFE0F Tuy\xEAn b\u1ED1 mi\u1EC5n tr\u1EEB tr\xE1ch nhi\u1EC7m"}),e("div",{style:{fontSize:"12px",color:"var(--text2)",lineHeight:"1.6"},children:"V\xE0ng (Gold spot) l\xE0 m\u1ED9t trong nh\u1EEFng t\xE0i s\u1EA3n t\xE0i ch\xEDnh c\xF3 \u0111\u1ED9 bi\u1EBFn \u0111\u1ED9ng v\xE0 \u0111\xF2n b\u1EA9y l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi. C\xE1c ph\xE2n t\xEDch k\u1EF9 thu\u1EADt, x\xE1c xu\u1EA5t v\xE0 g\u1EE3i \xFD v\xE0o l\u1EC7nh hi\u1EC3n th\u1ECB tr\xEAn h\u1EC7 th\u1ED1ng ch\u1EC9 mang t\xEDnh ch\u1EA5t tham kh\u1EA3o d\u1EF1a tr\xEAn thu\u1EADt to\xE1n t\xEDch l\u0169y. Kh\xF4ng c\u1EA5u th\xE0nh l\u1EDDi khuy\xEAn \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh ch\xEDnh th\u1EE9c. Vui l\xF2ng t\u1EF1 qu\u1EA3n tr\u1ECB v\u1ED1n nghi\xEAm ng\u1EB7t!"})]})]}),j==="backtest"&&c&&o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"20px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px",flexWrap:"wrap",gap:"12px"},children:o("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F4CA}"}),o("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"var(--gold)",margin:0,letterSpacing:"0.5px"},children:"NH\u1EACT K\xDD & L\u1ECACH S\u1EEC GIAO D\u1ECACH A.I BACKTEST"}),e("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"Hi\u1EC7u su\u1EA5t ki\u1EC3m th\u1EED chi\u1EBFn l\u01B0\u1EE3c tr\xEAn d\u1EEF li\u1EC7u n\u1EBFn bi\u1EC3u \u0111\u1ED3 th\u1EDDi gian th\u1EF1c"})]})]})}),o("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[o("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"Khung th\u1EDDi gian:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:["ALL","M1","M5","M15","H1","D1"].map(t=>e("button",{onClick:()=>Ke(t),style:{background:at===t?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${at===t?"var(--gold)":"var(--border)"}`,color:at===t?"var(--gold)":"var(--text2)",padding:"4px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t==="ALL"?"\u{1F30D} T\u1EA4T C\u1EA2":`\u26A1 ${t}`},t))})]}),o("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"L\u1ECDc ng\xE0y giao d\u1ECBch:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{value:"TODAY",label:"\u{1F4C5} H\xF4m nay"},{value:"YESTERDAY",label:"\u{1F4C5} H\xF4m qua"},{value:"ALL",label:"\u{1F310} T\u1EA5t c\u1EA3 c\xE1c ng\xE0y"}].map(t=>e("button",{onClick:()=>qe(t.value),style:{background:pt===t.value?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${pt===t.value?"var(--gold)":"var(--border)"}`,color:pt===t.value?"var(--gold)":"var(--text2)",padding:"4px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t.label},t.value))})]})]}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginTop:"4px"},children:[o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1ED5ng l\u1EC7nh ch\u1ED1t"}),e("strong",{style:{fontSize:"20px",color:"#fff",fontFamily:"monospace"},children:ct.total})]}),o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1EF7 L\u1EC7 Th\u1EAFng (Win Rate)"}),e("strong",{style:{fontSize:"20px",color:ct.winRate>=50?"var(--green)":"var(--yellow)",fontFamily:"monospace"},children:`${ct.winRate}%`})]}),o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"Pips R\xF2ng t\xEDch l\u0169y"}),e("strong",{style:{fontSize:"20px",color:ct.netPips>=0?"var(--green)":"var(--red)",fontFamily:"monospace"},children:`${ct.netPips>=0?"+":""}${ct.netPips} pips`})]})]})]}),o("div",{className:"smc-card",style:{margin:0},children:[e("h3",{className:"smc-card-title",children:"\u{1F4CB} Nh\u1EADt K\xFD Giao D\u1ECBch Ch\u1ED1t L\u1EDDi / C\u1EAFt L\u1ED7 Chi Ti\u1EBFt"}),e("div",{className:"smc-table-wrap",children:o("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"12px"},children:[e("thead",{children:o("tr",{style:{borderBottom:"1px solid var(--border)",color:"var(--text2)",background:"rgba(255,255,255,0.01)"},children:[e("th",{style:{padding:"12px",fontWeight:"bold"},children:"M\xE3 l\u1EC7nh (ID)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Khung gi\u1EDD"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Lo\u1EA1i l\u1EC7nh"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 kh\u1EDBp (Entry)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"C\u1EAFt L\u1ED7 (SL)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 1 (TP1)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 2 (TP2)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 \u0111\xF3ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"K\u1EBFt qu\u1EA3"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Pips r\xF2ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\u1EDD \u0111\xF3ng"})]})}),e("tbody",{children:Z.length>0?(()=>{let t="";return Z.map((a,r)=>{let n=Ot(a.closeTime),s=t!==n;return s&&(t=n),o(Oa.Fragment,{children:[s&&e("tr",{style:{background:"rgba(255, 215, 0, 0.04)"},children:o("td",{colSpan:11,style:{padding:"8px 12px",color:"var(--gold)",fontWeight:"bold",letterSpacing:"0.5px"},children:["\u{1F4C5} L\u1EC6NH \u0110\xC3 \u0110\xD3NG NG\xC0Y: ",n]})}),o("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.03)",background:r%2===0?"rgba(255,255,255,0.005)":"transparent"},children:[e("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--text2)"},children:a.id}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:"smc-badge active",style:{fontSize:"10.5px"},children:a.timeframe})}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${a.position==="BUY"?"bullish":"bearish"}`,style:{fontSize:"10.5px"},children:a.position})}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace"},children:["$",a.entry.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--red)"},children:["$",a.stopLoss.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)"},children:["$",a.takeProfit1.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)",opacity:.9},children:["$",a.takeProfit2.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:a.status==="SL"?"var(--red)":"var(--green)"},children:["$",(a.status==="SL"?a.stopLoss:a.status==="TP1"?a.takeProfit1:a.takeProfit2).toFixed(2)]}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${a.status==="SL"?"bearish":"bullish"}`,style:{fontSize:"10.5px",background:a.status==="SL"?"rgba(255, 23, 68, 0.15)":"rgba(0, 230, 118, 0.15)",color:a.status==="SL"?"var(--red)":"var(--green)",border:`1.5px solid ${a.status==="SL"?"var(--red)":"var(--green)"}`},children:a.status==="SL"?"STOP LOSS":a.status==="TP1"?"TAKE PROFIT 1":"TAKE PROFIT 2"})}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:a.pips>=0?"var(--green)":"var(--red)"},children:[a.pips>=0?"+":"",a.pips," pips"]}),e("td",{style:{padding:"10px 12px",color:"var(--text3)"},children:new Date(a.closeTime).toLocaleTimeString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",hour:"2-digit",minute:"2-digit"})})]})]},`trade-row-${a.id}-${r}`)})})():e("tr",{children:o("td",{colSpan:11,style:{padding:"20px",textAlign:"center",color:"var(--text3)"},children:["Kh\xF4ng c\xF3 l\u1ECBch s\u1EED giao d\u1ECBch n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn cho khung th\u1EDDi gian ",at,"!"]})})})]})})]})]}),j==="outlook"&&c?.marketOutlook&&(()=>{let t=c.marketOutlook;return o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o("div",{className:"outlook-banner",style:{borderTop:"4px solid var(--gold)"},children:[o("div",{children:[e("span",{style:{fontSize:"11px",textTransform:"uppercase",color:"var(--text3)",letterSpacing:"1.5px",fontWeight:"bold"},children:"H\u1EC6 TH\u1ED0NG PH\xC2N T\xCDCH H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT H\xC0NG NG\xC0Y"}),e("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",margin:"6px 0",letterSpacing:"0.5px"},children:"XAU/USD GOLD SPOT"}),o("span",{style:{fontSize:"12px",color:"var(--text2)"},children:["Th\u1EDDi gian c\u1EADp nh\u1EADt: ",e("strong",{style:{color:"var(--gold)"},children:t.date})," | Khung \u0111\u1ED3 th\u1ECB: ",e("strong",{children:t.timeframe})]})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"},children:o("div",{style:{textAlign:"right"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",display:"block",textTransform:"uppercase",fontWeight:"bold",marginBottom:"2px"},children:"Xu h\u01B0\u1EDBng ch\u1EE7 \u0111\u1EA1o"}),e("span",{className:t.synthesizedOutlook.bias==="BUY"?"outlook-badge-buy":t.synthesizedOutlook.bias==="SELL"?"outlook-badge-sell":"outlook-badge-hold",style:{display:"inline-block"},children:t.synthesizedOutlook.bias==="BUY"?"\u{1F7E2} MUA CH\u1EE6 \u0110\u1EA0O (BUY)":t.synthesizedOutlook.bias==="SELL"?"\u{1F534} B\xC1N CH\u1EE6 \u0110\u1EA0O (SELL)":"\u{1F7E1} \u0110\u1EE8NG NGO\xC0I (HOLD)"})]})})]}),o("div",{className:"outlook-summary-box",style:{margin:0,padding:"30px",borderLeft:"5px solid var(--gold)"},children:[e("h3",{style:{fontSize:"16px",color:"var(--gold)",margin:"0 0 16px 0",borderBottom:"1.5px solid var(--border)",paddingBottom:"12px",display:"flex",alignItems:"center",gap:"10px",fontWeight:"800",letterSpacing:"0.5px"},children:"\u{1F4DD} NH\u1EACN \u0110\u1ECANH T\u1ED4NG QUAN TRONG NG\xC0Y (DOW + SMC + PRICE ACTION)"}),e("p",{style:{fontSize:"14.5px",color:"#fff",lineHeight:"1.85",margin:"0 0 26px 0",textAlign:"justify",fontWeight:"400",opacity:"0.95"},children:t.synthesizedOutlook.summary}),e("h4",{style:{fontSize:"11px",color:"var(--text3)",margin:"0 0 12px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold"},children:"\u{1F4CA} H\u1EC6 TH\u1ED0NG CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT:"}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"26px"},className:"outlook-grid",children:[o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F4C8} L\xDD THUY\u1EBET DOW (H1)"}),o("strong",{style:{display:"block",fontSize:"14px",color:t.trendDow.primary==="T\u0102NG"?"var(--green)":t.trendDow.primary==="GI\u1EA2M"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["Xu h\u01B0\u1EDBng: ",t.trendDow.primary]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["S\xF3ng c\u1EA5p 2: ",t.trendDow.secondary]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{children:["Kh\xE1ng c\u1EF1 ch\xEDnh: ",o("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[0]?.price?t.trendDow.keyLevels[0].price.toFixed(1):"\u2014"]})]}),o("div",{children:["H\u1ED7 tr\u1EE3 ch\xEDnh: ",o("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[1]?.price?t.trendDow.keyLevels[1].price.toFixed(1):"\u2014"]})]})]})]}),o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F3DB}\uFE0F SMART MONEY CONCEPTS"}),o("strong",{style:{display:"block",fontSize:"14px",color:"#fff",marginTop:"6px"},children:["C\u1EA5u tr\xFAc: ",t.smcAnalysis.marketStructure]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["Kh\u1ED1i C\u1EA7u/Cung: ",t.smcAnalysis.keyOrderBlocks.length," OB ho\u1EA1t \u0111\u1ED9ng"]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{children:["Kho\u1EA3ng FVG H1: ",e("strong",{style:{color:"#80deea",fontFamily:"monospace"},children:t.smcAnalysis.fvgs[0]?.gap||"\u0110\xE3 l\u1EA5p h\u1EBFt"})]}),o("div",{children:["C\u1EA3n OB Cung: ",e("strong",{style:{color:"var(--red)",fontFamily:"monospace"},children:t.smcAnalysis.keyOrderBlocks.find(a=>a.type.includes("BEARISH"))?.priceRange||"Kh\xF4ng c\xF3"})]})]})]}),o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F56F}\uFE0F PRICE ACTION & T\xC2M L\xDD"}),o("strong",{style:{display:"block",fontSize:"14px",color:t.priceAction.sentiment==="T\xCDCH C\u1EF0C"?"var(--green)":t.priceAction.sentiment==="TI\xCAU C\u1EF0C"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["T\xE2m l\xFD n\u1EBFn: ",t.priceAction.sentiment]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["N\u1EBFn \u0111\u1EB7c tr\u01B0ng: ",t.priceAction.recentPatterns[0]?.split(":")[0]||"Kh\xF4ng c\xF3"]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn g\u1EA7n nh\u1EA5t: ",e("strong",{children:t.priceAction.recentPatterns[0]?.split(":")[0]||"Trung l\u1EADp"})]}),o("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn li\u1EC1n k\u1EC1: ",e("strong",{children:t.priceAction.recentPatterns[1]?.split(":")[0]||"Trung l\u1EADp"})]})]})]})]}),o("div",{style:{background:"linear-gradient(135deg, rgba(255, 171, 0, 0.05) 0%, rgba(7, 9, 14, 0.6) 100%)",border:"1.5px dashed var(--gold)",borderRadius:"14px",padding:"22px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.2)"},children:[e("h4",{style:{fontSize:"12px",color:"var(--gold)",margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"6px"},children:"\u26A1 K\u1EBE HO\u1EA0CH GIAO D\u1ECACH H\u1EE2P L\u01AFU CHI TI\u1EBET TRONG NG\xC0Y"}),o("p",{style:{fontSize:"14px",color:"#fff",fontWeight:"700",lineHeight:"1.6",margin:"0"},children:["\u{1F449} ",t.priceAction.actionableAdvice]})]})]})]})})()]})]})]})]}):o("div",{className:"auth-container",children:[e("div",{className:"auth-grid-overlay"}),o("div",{className:"auth-card",children:[o("div",{className:"auth-logo-wrap",children:[e("div",{className:"auth-logo-ring",children:e("img",{src:"/frontend/logo.png",alt:"XAU Logo",className:"auth-logo-img"})}),o("div",{style:{textAlign:"center"},children:[e("div",{className:"auth-brand-name",children:"XAU/USD Gold Pro"}),e("div",{className:"auth-brand-sub",children:"H\u1EC7 Th\u1ED1ng Giao D\u1ECBch V\xE0ng Chuy\xEAn Nghi\u1EC7p"})]}),o("div",{className:"auth-live-badge",children:[e("div",{className:"auth-live-dot"}),"D\u1EEF li\u1EC7u th\u1EDDi gian th\u1EF1c \xB7 T\xEDn hi\u1EC7u millisecond"]})]}),ke&&o("div",{className:"auth-alert error",children:[e("span",{className:"auth-alert-icon",children:"\u26A0\uFE0F"}),e("div",{children:ke})]}),Se&&o("div",{className:"auth-alert success",children:[e("span",{className:"auth-alert-icon",children:"\u2705"}),e("div",{children:Se})]}),Zt==="login"&&o(q,{children:[o("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn active",children:"\u{1F510} \u0110\u0103ng Nh\u1EADp"}),e("button",{className:"auth-tab-btn",onClick:()=>{ot("register"),k(null),L(null),Pt(!1)},children:"\u{1F4DD} \u0110\u0103ng K\xFD"})]}),o("form",{className:"auth-form",onSubmit:la,children:[o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F4E7} \u0110\u1ECBa ch\u1EC9 Email"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:X,onChange:t=>Qt(t.target.value),autoComplete:"email",required:!0}),e("span",{className:"auth-input-icon",style:{left:"unset",right:"14px",position:"absolute"},children:"\u{1F4E7}"})]})]}),o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F511} M\u1EADt kh\u1EA9u"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:bt?"text":"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:W,onChange:t=>te(t.target.value),autoComplete:"current-password",required:!0}),e("button",{type:"button",className:"auth-pw-toggle",onClick:()=>Pt(!bt),tabIndex:-1,children:bt?"\u{1F648}":"\u{1F441}\uFE0F"})]})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:ut,children:ut?o(q,{children:[e("div",{className:"auth-spinner"})," \u0110ang x\xE1c th\u1EF1c..."]}):"\u{1F513} M\u1EDE KH\xD3A TERMINAL"})]}),o("div",{className:"auth-stats-bar",children:[o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"24/7"}),e("div",{className:"auth-stat-label",children:"Ho\u1EA1t \u0111\u1ED9ng"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"5ms"}),e("div",{className:"auth-stat-label",children:"\u0110\u1ED9 tr\u1EC5"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"5+"}),e("div",{className:"auth-stat-label",children:"Khung th\u1EDDi gian"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"A.I"}),e("div",{className:"auth-stat-label",children:"Ph\xE2n t\xEDch"})]})]})]}),Zt==="register"&&o(q,{children:[o("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn",onClick:()=>{ot("login"),k(null),L(null),Pt(!1)},children:"\u{1F510} \u0110\u0103ng Nh\u1EADp"}),e("button",{className:"auth-tab-btn active",children:"\u{1F4DD} \u0110\u0103ng K\xFD"})]}),o("form",{className:"auth-form",onSubmit:da,children:[o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F4E7} \u0110\u1ECBa ch\u1EC9 Email th\u1EF1c t\u1EBF"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:X,onChange:t=>Qt(t.target.value),autoComplete:"email",required:!0}),e("span",{style:{position:"absolute",right:"14px",fontSize:"14px"},children:"\u{1F4E7}"})]}),e("div",{style:{fontSize:"10.5px",color:"var(--text3)",marginTop:"2px"},children:"M\xE3 OTP x\xE1c th\u1EF1c s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 h\xF2m th\u01B0 n\xE0y"})]}),o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F511} M\u1EADt kh\u1EA9u (t\u1ED1i thi\u1EC3u 6 k\xFD t\u1EF1)"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:bt?"text":"password",className:"auth-input",placeholder:"Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EA1nh...",value:W,onChange:t=>te(t.target.value),autoComplete:"new-password",required:!0}),e("button",{type:"button",className:"auth-pw-toggle",onClick:()=>Pt(!bt),tabIndex:-1,children:bt?"\u{1F648}":"\u{1F441}\uFE0F"})]}),W.length>0&&o("div",{className:"auth-pw-strength",children:[e("div",{className:`auth-pw-strength-bar ${P>=1?P===1?"weak":P===2?"medium":"strong":""}`}),e("div",{className:`auth-pw-strength-bar ${P>=2?P===2?"medium":"strong":""}`}),e("div",{className:`auth-pw-strength-bar ${P>=3?"strong":""}`})]}),W.length>0&&e("div",{style:{fontSize:"10px",color:P===0||P===1?"#ff1744":P===2?"#ffab00":"#00e676",marginTop:"2px"},children:P===0||P===1?"M\u1EADt kh\u1EA9u y\u1EBFu \u2014 n\xEAn th\xEAm ch\u1EEF hoa v\xE0 s\u1ED1":P===2?"M\u1EADt kh\u1EA9u trung b\xECnh":"\u2713 M\u1EADt kh\u1EA9u m\u1EA1nh"})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:ut,children:ut?o(q,{children:[e("div",{className:"auth-spinner"})," \u0110ang \u0111\u0103ng k\xFD & g\u1EEDi OTP..."]}):"\u2709\uFE0F \u0110\u0102NG K\xDD & G\u1EECI M\xC3 OTP"})]}),o("div",{style:{fontSize:"11px",color:"var(--text3)",textAlign:"center",lineHeight:"1.5"},children:["B\u1EB1ng c\xE1ch \u0111\u0103ng k\xFD, b\u1EA1n \u0111\u1ED3ng \xFD v\u1EDBi \u0111i\u1EC1u kho\u1EA3n d\u1ECBch v\u1EE5.",e("br",{}),"M\xE3 OTP c\xF3 hi\u1EC7u l\u1EF1c trong ",e("strong",{style:{color:"var(--gold)"},children:"5 ph\xFAt"}),"."]})]}),Zt==="otp"&&o("div",{className:"auth-otp-wrap",children:[o("div",{className:"auth-otp-header",children:[e("span",{className:"auth-otp-icon",children:"\u{1F4EC}"}),e("div",{className:"auth-otp-title",children:"X\xE1c th\u1EF1c Email"}),o("div",{className:"auth-otp-desc",children:["Nh\u1EADp m\xE3 OTP 6 s\u1ED1 \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi:",e("br",{}),e("span",{className:"auth-otp-email",children:X})]})]}),o("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e("div",{className:"auth-countdown-wrap",children:o("div",{className:"auth-countdown-ring",children:[o("svg",{width:"56",height:"56",viewBox:"0 0 56 56",children:[e("circle",{className:"auth-countdown-bg",cx:"28",cy:"28",r:"22",strokeWidth:"3"}),e("circle",{className:"auth-countdown-fill",cx:"28",cy:"28",r:"22",strokeWidth:"3",strokeDasharray:We,strokeDashoffset:Ra})]}),e("div",{className:"auth-countdown-text",children:G>0?`${Math.floor(G/60)}:${(G%60).toString().padStart(2,"0")}`:"0:00"})]})}),e("div",{className:"auth-otp-boxes",children:[0,1,2,3,4,5].map(t=>e("input",{ref:a=>{wt.current[t]=a},type:"text",inputMode:"numeric",maxLength:1,className:`auth-otp-box ${rt[t]?"filled":""}`,value:rt[t]||"",onChange:a=>Aa(t,a.target.value),onKeyDown:a=>Ia(t,a),onFocus:a=>a.target.select(),onPaste:a=>{let r=a.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);if(r.length>0){Q(r.padEnd(6,"").slice(0,6));let n=Math.min(r.length,5);wt.current[n]?.focus()}a.preventDefault()}},t))})]}),e("button",{className:"auth-submit-btn",style:{width:"100%"},onClick:pa,disabled:ut||rt.replace(/\D/g,"").length<6,children:ut?o(q,{children:[e("div",{className:"auth-spinner"})," \u0110ang ki\u1EC3m tra..."]}):"\u{1F680} K\xCDCH HO\u1EA0T T\xC0I KHO\u1EA2N"}),ee&&o("div",{style:{background:"rgba(255, 171, 0, 0.06)",border:"1px dashed rgba(255,171,0,0.4)",borderRadius:"12px",padding:"14px",fontSize:"12px",color:"var(--text)",textAlign:"center",lineHeight:"1.6",width:"100%"},children:[e("div",{style:{fontWeight:"800",color:"var(--gold)",marginBottom:"6px",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.5px"},children:"\u{1F916} Ch\u1EBF \u0111\u1ED9 th\u1EED nghi\u1EC7m (Simulator)"}),o("div",{children:["M\xE3 OTP: ",e("strong",{style:{color:"#00e676",fontSize:"20px",fontFamily:"monospace",letterSpacing:"4px"},children:ee})]}),e("button",{type:"button",onClick:()=>{Q(ee),wt.current[5]?.focus()},style:{marginTop:"8px",background:"rgba(0, 230, 118, 0.12)",border:"1px solid rgba(0, 230, 118, 0.25)",color:"#00e676",borderRadius:"6px",padding:"4px 12px",fontSize:"11px",fontWeight:"700",cursor:"pointer"},children:"\u26A1 \u0110i\u1EC1n t\u1EF1 \u0111\u1ED9ng"}),o("div",{style:{fontSize:"10px",color:"var(--text3)",marginTop:"8px"},children:["\u0110\u1EC3 g\u1EEDi email th\u1EF1c, c\u1EA5u h\xECnh SMTP ho\u1EB7c Resend trong ",e("code",{children:".env"})]})]}),e("div",{className:"auth-resend-row",children:G>0?o(q,{children:["G\u1EEDi l\u1EA1i m\xE3 sau ",Math.floor(G/60),":",(G%60).toString().padStart(2,"0")]}):o(q,{children:["Kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c email?"," ",e("button",{className:"auth-resend-btn",type:"button",onClick:ca,children:"G\u1EEDi l\u1EA1i OTP"})]})}),e("div",{className:"auth-link",onClick:()=>{ot("login"),k(null),L(null),tt(""),Q("")},children:"\u2190 Quay l\u1EA1i \u0111\u0103ng nh\u1EADp"})]})]})]})}var Fe=`
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

  /* LAYOUT & ORDER WITH DISPLAY: CONTENTS FOR CLEAN REORDERING */
  .layout {
    display: flex !important;
    flex-direction: column !important;
    overflow: visible !important;
    height: auto !important;
  }
  .main {
    display: contents !important;
  }
  .main-workspace {
    display: contents !important;
  }
  .sym-header {
    order: 1 !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding: 10px 14px !important;
    gap: 8px !important;
  }
  .load-bar, .err-msg {
    order: 2 !important;
  }
  .chart-column {
    order: 3 !important;
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
  .sidebar {
    order: 4 !important; /* Renders sidebar immediately below the chart on mobile! */
    width: 100% !important;
    border-right: none !important;
    border-top: 1px solid var(--border) !important;
    height: auto !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
  }
  .signal-dash {
    order: 5 !important; /* Renders technical tabs dock below the sidebar! */
    width: 100% !important;
    flex-shrink: 0 !important;
  }
  .realtime-panel {
    order: 6 !important; /* Renders Economic Calendar at the very bottom on mobile! */
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

/* PREMIUM RESPONSIVE SCROLLABLE TABLE STYLES */
.smc-table-wrap {
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  padding-bottom: 8px;
  width: 100%;
}
.smc-table-wrap::-webkit-scrollbar {
  height: 6px;
}
.smc-table-wrap::-webkit-scrollbar-track {
  background: var(--bg);
  border-radius: 3px;
}
.smc-table-wrap::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
}
.smc-table-wrap::-webkit-scrollbar-thumb:hover {
  background: var(--gold);
}

.smc-card table {
  min-width: 900px !important;
  width: 100% !important;
}
.smc-card table th,
.smc-card table td {
  white-space: nowrap !important;
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

/* ============================================================ */
/* AUTH LOCK SYSTEM \u2014 PREMIUM REDESIGN (LOGIN / SIGNUP / OTP)  */
/* ============================================================ */

/* Animated mesh-gradient background */
.auth-container {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  background: #06080f;
}

/* Floating orbs */
.auth-container::before,
.auth-container::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  animation: auth-float 8s ease-in-out infinite alternate;
}
.auth-container::before {
  width: 500px; height: 500px;
  top: -100px; left: -120px;
  background: radial-gradient(circle, rgba(255, 186, 0, 0.12) 0%, transparent 70%);
  animation-duration: 9s;
}
.auth-container::after {
  width: 400px; height: 400px;
  bottom: -80px; right: -80px;
  background: radial-gradient(circle, rgba(0, 176, 255, 0.08) 0%, transparent 70%);
  animation-duration: 11s;
  animation-direction: alternate-reverse;
}

@keyframes auth-float {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -20px) scale(1.05); }
  100% { transform: translate(-20px, 30px) scale(0.95); }
}

/* Grid overlay texture */
.auth-grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,215,0,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,215,0,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

/* Main card */
.auth-card {
  position: relative;
  z-index: 1;
  width: 460px;
  background: rgba(10, 13, 22, 0.82);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 215, 0, 0.18);
  border-radius: 24px;
  padding: 44px 40px 36px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03),
    0 30px 80px rgba(0,0,0,0.7),
    0 0 60px rgba(255, 186, 0, 0.06),
    inset 0 1px 0 rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 22px;
  animation: auth-fade-in 0.5s cubic-bezier(0.2, 0.9, 0.3, 1);
}

/* Shimmer top border */
.auth-card::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent);
  border-radius: 2px;
}

@keyframes auth-fade-in {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Logo area */
.auth-logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.auth-logo-ring {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-logo-ring::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(255,215,0,0.8) 0%,
    rgba(255,186,0,0.2) 25%,
    rgba(255,215,0,0.0) 50%,
    rgba(255,186,0,0.2) 75%,
    rgba(255,215,0,0.8) 100%
  );
  animation: auth-ring-spin 4s linear infinite;
}

.auth-logo-ring::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: #06080f;
}

@keyframes auth-ring-spin {
  to { transform: rotate(360deg); }
}

.auth-logo-img {
  position: relative;
  z-index: 1;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  object-fit: cover;
  filter: drop-shadow(0 0 18px rgba(255,186,0,0.5));
}

.auth-brand-name {
  font-size: 17px;
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffd700 0%, #ffffff 50%, #ffab00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-brand-sub {
  font-size: 10px;
  color: rgba(158, 172, 191, 0.8);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: -6px;
}

/* Live badge */
.auth-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 230, 118, 0.08);
  border: 1px solid rgba(0, 230, 118, 0.2);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 9px;
  font-weight: 700;
  color: #00e676;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 2px;
}

.auth-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #00e676;
  animation: auth-pulse 1.5s ease-in-out infinite;
}

@keyframes auth-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}

/* Alerts */
.auth-alert {
  padding: 11px 14px;
  border-radius: 12px;
  font-size: 12.5px;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  animation: auth-slide-in 0.3s ease;
}

@keyframes auth-slide-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.auth-alert.error {
  background: rgba(255, 23, 68, 0.07);
  border: 1px solid rgba(255, 23, 68, 0.22);
  color: #ff8a80;
}

.auth-alert.success {
  background: rgba(0, 230, 118, 0.06);
  border: 1px solid rgba(0, 230, 118, 0.2);
  color: #69f0ae;
}

.auth-alert-icon {
  font-size: 15px;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Tabs */
.auth-tabs {
  display: flex;
  background: rgba(21, 26, 38, 0.8);
  padding: 4px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  gap: 4px;
}

.auth-tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text2);
  padding: 10px 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.2,0.8,0.2,1);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.auth-tab-btn:hover:not(.active) {
  color: var(--text);
  background: rgba(255,255,255,0.04);
}

.auth-tab-btn.active {
  background: rgba(255, 215, 0, 0.1);
  color: var(--gold);
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 2px 12px rgba(255,215,0,0.12), inset 0 1px 0 rgba(255,215,0,0.1);
}

/* Form */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.auth-label {
  font-size: 10.5px;
  font-weight: 700;
  color: rgba(158,172,191,0.9);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.auth-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-input-icon {
  position: absolute;
  left: 14px;
  color: var(--text3);
  font-size: 15px;
  pointer-events: none;
  transition: color 0.2s;
}

.auth-input {
  width: 100%;
  background: rgba(21, 26, 38, 0.9);
  border: 1.5px solid rgba(34, 41, 58, 0.8);
  border-radius: 12px;
  padding: 13px 16px 13px 44px;
  color: #f0f3f6;
  font-size: 14px;
  outline: none;
  transition: all 0.25s;
  font-family: 'Inter', sans-serif;
}

.auth-input::placeholder {
  color: var(--text3);
}

.auth-input:focus {
  border-color: rgba(255, 215, 0, 0.5);
  background: rgba(14, 17, 26, 0.95);
  box-shadow: 0 0 0 3px rgba(255,215,0,0.07), 0 0 16px rgba(255,215,0,0.05);
}

.auth-input:focus + .auth-input-icon,
.auth-input-wrap:focus-within .auth-input-icon {
  color: var(--gold);
}

/* Password toggle */
.auth-pw-toggle {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text3);
  font-size: 15px;
  padding: 4px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.auth-pw-toggle:hover {
  color: var(--gold);
}

/* Password strength bar */
.auth-pw-strength {
  display: flex;
  gap: 4px;
  height: 3px;
  margin-top: 4px;
}

.auth-pw-strength-bar {
  flex: 1;
  border-radius: 2px;
  background: var(--border);
  transition: background 0.3s;
}

.auth-pw-strength-bar.weak   { background: #ff1744; }
.auth-pw-strength-bar.medium { background: #ffab00; }
.auth-pw-strength-bar.strong { background: #00e676; }

/* Submit button */
.auth-submit-btn {
  position: relative;
  background: linear-gradient(135deg, #ffd700 0%, #e6a800 50%, #ffd700 100%);
  background-size: 200% auto;
  border: none;
  border-radius: 12px;
  color: #07090e;
  padding: 14px 20px;
  font-size: 13.5px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(255, 215, 0, 0.25), 0 2px 8px rgba(0,0,0,0.3);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.auth-submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.auth-submit-btn:hover::before {
  transform: translateX(100%);
}

.auth-submit-btn:hover:not(:disabled) {
  background-position: right center;
  transform: translateY(-2px);
  box-shadow: 0 10px 36px rgba(255, 215, 0, 0.35), 0 4px 12px rgba(0,0,0,0.3);
}

.auth-submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.auth-submit-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none;
}

/* Spinner */
.auth-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0,0,0,0.25);
  border-top-color: #000;
  border-radius: 50%;
  animation: auth-spin 0.6s linear infinite;
}

@keyframes auth-spin {
  to { transform: rotate(360deg); }
}

/* OTP Section */
.auth-otp-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

.auth-otp-header {
  text-align: center;
}

.auth-otp-icon {
  font-size: 36px;
  margin-bottom: 10px;
  display: block;
  animation: auth-bounce 0.6s cubic-bezier(0.36,0.07,0.19,0.97);
}

@keyframes auth-bounce {
  0%, 100% { transform: translateY(0); }
  30%       { transform: translateY(-8px); }
  60%       { transform: translateY(-4px); }
}

.auth-otp-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 6px;
}

.auth-otp-desc {
  color: var(--text2);
  font-size: 13px;
  line-height: 1.5;
}

.auth-otp-email {
  color: var(--gold);
  font-weight: 700;
}

/* OTP digit boxes */
.auth-otp-boxes {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.auth-otp-box {
  width: 46px;
  height: 56px;
  background: rgba(21, 26, 38, 0.9);
  border: 2px solid rgba(34, 41, 58, 0.8);
  border-radius: 12px;
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  text-align: center;
  outline: none;
  font-family: 'Inter', monospace;
  transition: all 0.2s;
  caret-color: var(--gold);
}

.auth-otp-box:focus {
  border-color: rgba(255, 215, 0, 0.6);
  background: rgba(14, 17, 26, 0.95);
  box-shadow: 0 0 0 3px rgba(255,215,0,0.08), 0 0 16px rgba(255,215,0,0.06);
  transform: scale(1.05);
}

.auth-otp-box.filled {
  border-color: rgba(0, 230, 118, 0.4);
  color: #00e676;
}

/* Hidden OTP input (for autofill support) */
.auth-otp-input-hidden {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

/* Progress ring for OTP countdown */
.auth-countdown-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.auth-countdown-ring {
  position: relative;
  width: 56px;
  height: 56px;
}

.auth-countdown-ring svg {
  transform: rotate(-90deg);
}

.auth-countdown-ring circle {
  fill: none;
  stroke-linecap: round;
}

.auth-countdown-bg { stroke: rgba(34,41,58,0.8); }
.auth-countdown-fill {
  stroke: var(--gold);
  transition: stroke-dashoffset 1s linear;
  filter: drop-shadow(0 0 4px rgba(255,215,0,0.4));
}

.auth-countdown-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: var(--gold);
  font-family: monospace;
}

.auth-resend-row {
  font-size: 12.5px;
  color: var(--text3);
  text-align: center;
}

.auth-resend-btn {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.15s;
}

.auth-resend-btn:hover { color: #fff; }
.auth-resend-btn:disabled {
  color: var(--text3);
  cursor: default;
  text-decoration: none;
}

/* Legacy compat */
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

/* Divider */
.auth-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text3);
  font-size: 11px;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* Stats bar below form */
.auth-stats-bar {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-top: 4px;
  border-top: 1px solid rgba(255,255,255,0.04);
}

.auth-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.auth-stat-value {
  font-size: 13px;
  font-weight: 800;
  color: var(--gold);
}

.auth-stat-label {
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* Link and back button */
.auth-link {
  text-align: center;
  font-size: 12.5px;
  color: var(--text2);
  cursor: pointer;
  transition: color 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.auth-link:hover { color: var(--gold); }

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

/* Mobile responsive */
@media (max-width: 500px) {
  .auth-card {
    width: calc(100vw - 32px);
    padding: 32px 24px 28px;
    border-radius: 20px;
  }
  .auth-otp-box {
    width: 40px;
    height: 50px;
    font-size: 20px;
  }
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

/* =========================================================================
   \u{1F4F1} HIGH-FIDELITY IPAD & TABLET RESPONSIVE ENGINE (NO VIRTUAL CODE)
   ========================================================================= */

@media (max-width: 1024px) {
  /* 1. Header co gi\xE3n linh ho\u1EA1t */
  .brand-name {
    font-size: 15px !important;
  }
  .brand-badge {
    font-size: 8px !important;
    padding: 1px 5px !important;
  }
  .topbar {
    padding: 0 12px !important;
  }
  .topbar-left {
    gap: 12px !important;
  }
  .topbar-right {
    gap: 10px !important;
  }
  
  /* 2. Chuy\u1EC3n \u0111\u1ED5i layout sang x\u1EBFp ch\u1ED3ng d\u1ECDc cho iPad d\u1ECDc (< 1024px) */
  .layout {
    flex-direction: column !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
  }
  
  .sidebar {
    width: 100% !important;
    height: auto !important;
    border-right: none !important;
    border-bottom: 1px solid var(--border) !important;
    overflow-y: visible !important;
    flex-shrink: 0 !important;
  }
  
  /* D\xE0n Logo V\xE0ng & Confluence Card n\u1EB1m song song th\xE0nh l\u01B0\u1EDBi 2 c\u1ED9t */
  .sidebar > div {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px !important;
    padding: 16px !important;
  }
  
  .gold-profile-card {
    height: 100% !important;
  }

  .sug-card {
    height: 100% !important;
  }

  .main {
    height: auto !important;
    overflow: visible !important;
    flex-shrink: 0 !important;
  }

  /* 3. Workspace x\u1EBFp ch\u1ED3ng d\u1ECDc: Chart ph\xEDa tr\xEAn, Order Book ph\xEDa d\u01B0\u1EDBi */
  .main-workspace {
    flex-direction: column !important;
    height: auto !important;
    min-height: 820px !important;
  }
  
  .chart-column {
    height: 480px !important;
    flex-shrink: 0 !important;
    border-bottom: 1px solid var(--border) !important;
  }

  .realtime-panel {
    width: 100% !important;
    height: 380px !important;
    border-left: none !important;
  }
  
  /* 4. T\xE1i ph\xE2n chia l\u01B0\u1EDBi ch\u1EC9 b\xE1o & d\u1EF1 b\xE1o ch\u1ED1ng v\u1EE1 khung ch\u1EEF */
  .top-metrics-row {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  
  .ind-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 10px !important;
  }
  
  .outlook-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 14px !important;
  }
}

@media (max-width: 768px) {
  .sidebar > div {
    grid-template-columns: 1fr !important;
  }
  .ind-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .outlook-grid {
    grid-template-columns: 1fr !important;
  }
  .brand-name {
    font-size: 13px !important;
  }
  .hide-on-mobile {
    display: none !important;
  }
}
`;var Ye=document.createElement("style");Ye.textContent=Fe;document.head.appendChild(Ye);var Ba=Pa(document.getElementById("root"));Ba.render(Ha(be));
