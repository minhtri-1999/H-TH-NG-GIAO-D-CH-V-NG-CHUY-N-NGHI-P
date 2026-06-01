import{createRoot as Lo}from"https://esm.sh/react-dom@18.2.0/client";import{createElement as Mo}from"https://esm.sh/react@18.2.0";import To,{useState as p,useEffect as I,useRef as D,useMemo as C}from"https://esm.sh/react@18.2.0";import{Fragment as Ye,jsx as t,jsxs as a}from"https://esm.sh/react@18.2.0/jsx-runtime";function No({timeframe:f}){let j=D(null);return I(()=>{if(!j.current)return;j.current.innerHTML="";let T="60";f==="1"?T="1":f==="5"?T="5":f==="15"?T="15":f==="60"?T="60":f==="1D"?T="D":f==="1W"?T="W":f==="1M"&&(T="M");let F=document.createElement("script");F.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",F.type="text/javascript",F.async=!0,F.innerHTML=JSON.stringify({autosize:!0,symbol:"FOREXCOM:XAUUSD",interval:T,timezone:"Asia/Ho_Chi_Minh",theme:"dark",style:"1",locale:"vi",enable_publishing:!1,allow_symbol_change:!0,calendar:!0,hide_side_toolbar:!1,studies:[{id:"MAExp@tv-basicstudies",inputs:{length:50}},{id:"MAExp@tv-basicstudies",inputs:{length:200}}],support_host:"https://www.tradingview.com"}),j.current.appendChild(F)},[f]),t("div",{className:"tradingview-widget-container",ref:j,style:{height:"100%",width:"100%"},children:t("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}var Me=f=>{let T=new Date(f+252e5),F=T.getUTCFullYear(),re=String(T.getUTCMonth()+1).padStart(2,"0");return`${String(T.getUTCDate()).padStart(2,"0")}/${re}/${F}`};function ct(){let[f,j]=p("5"),[T,F]=p("tradingview"),[re,Pt]=p(!1),[c,gt]=p(null),[Bt,xt]=p(!0),[mt,$e]=p(null),[Y,Ut]=p(()=>{let e=localStorage.getItem("active_dash_tab");return e==="ai"||e==="backtest"||e==="outlook"?e:"ai"}),Ve=e=>{Ut(e),localStorage.setItem("active_dash_tab",e)},[bt,ut]=p([]),[Ao,Eo]=p(!1),[J,Wt]=p(()=>localStorage.getItem("backtest_timeframe_filter")||"ALL"),Gt=e=>{Wt(e),localStorage.setItem("backtest_timeframe_filter",e)},[ne,Ft]=p(()=>localStorage.getItem("backtest_selected_day")||"ALL"),Yt=e=>{Ft(e),localStorage.setItem("backtest_selected_day",e)},K=C(()=>{let e=[...bt].sort((n,l)=>l.closeTime-n.closeTime),o=Me(Date.now()),r=Me(Date.now()-864e5);return ne==="TODAY"?e=e.filter(n=>Me(n.closeTime)===o):ne==="YESTERDAY"&&(e=e.filter(n=>Me(n.closeTime)===r)),J==="ALL"?e:e.filter(n=>n.timeframe.toUpperCase()===J.toUpperCase())},[bt,J,ne]),ie=C(()=>{if(K.length===0)return{winRate:0,netPips:0,totalProfit:0,total:0};let e=K.length,o=K.filter(i=>i.status==="TP1"||i.status==="TP2").length,r=Math.round(o/e*100),n=Number(K.reduce((i,s)=>i+(Number(s.pips)||0),0).toFixed(1)),l=Number(K.reduce((i,s)=>i+(Number(s.profitUsd)||0),0).toFixed(2));return{winRate:r,netPips:n,totalProfit:l,total:e}},[K]),Xe=async(e=!1)=>{try{let o=await fetch("/api/backtest/history");if(o.ok){let r=await o.json();r.success&&r.trades&&ut(r.trades)}}catch(o){console.error("Error fetching backtest history:",o)}},Io=async()=>{try{let e=await fetch("/api/backtest/reset",{method:"POST"});if(e.ok){let o=await e.json();o.success&&o.trades&&ut(o.trades)}else alert("L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 l\u1EA1i d\u1EEF li\u1EC7u n\u1EBFn.")}catch(e){alert("L\u1ED7i h\u1EC7 th\u1ED1ng: "+e.message)}},[H,je]=p({email:"guest@goldterminal.pro"}),[$t,Vt]=p(!1),[Ke,Z]=p("login"),[$,_e]=p(""),[Q,qe]=p(""),[Ce,Ae]=p(""),[ht,k]=p(null),[ft,L]=p(null),[se,Ee]=p(0),[le,de]=p(!1),[Je,_]=p(""),[pe,Xt]=p(!0),[ce,jt]=p(!0),[be,Kt]=p(50),[ue,_t]=p(200),[he,qt]=p("close"),[fe,Jt]=p("close"),[ve,Zt]=p("#FFD700"),[ye,Qt]=p("#FF1744"),[zo,Ro]=p(!1),[Oo,Do]=p(!1),[Ho,Po]=p(!1),[Bo,Uo]=p(!1),[Wo,Go]=p(!1),[ee,we]=p(null),[Ie,ze]=p(null),[ke,Re]=p("pine"),[Ze,Qe]=p(50),[et,tt]=p("close"),[Oe,De]=p("#FFD700");I(()=>{ee==="ema50"?(Qe(be),tt(he),De(ve)):ee==="ema200"&&(Qe(ue),tt(fe),De(ye))},[ee]);let eo=()=>{ee==="ema50"?(Kt(Ze),qt(et),Zt(Oe)):ee==="ema200"&&(_t(Ze),Jt(et),Qt(Oe)),we(null)},to=async()=>{je({email:"guest@goldterminal.pro"}),Vt(!1)};I(()=>{to()},[]),I(()=>{H&&Xe(!1)},[H]),I(()=>{if(H&&(Y==="ai"||Y==="backtest")){Xe(!0);let e=setInterval(()=>{Xe(!1)},5e3);return()=>clearInterval(e)}},[Y,H]),I(()=>{if(se<=0)return;let e=setInterval(()=>{Ee(o=>o-1)},1e3);return()=>clearInterval(e)},[se]);let oo=async e=>{if(e.preventDefault(),!$||!Q){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}de(!0),k(null),L(null);try{let o=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:$,password:Q})}),r=await o.json();if(!o.ok){o.status===403&&r.needsVerification?(Z("otp"),Ee(300),r.isSimulator&&r.otp?(_(r.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(_(""),L(r.error||"T\xE0i kho\u1EA3n ch\u01B0a k\xEDch ho\u1EA1t. M\u1ED9t m\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email."))):k(r.error||"\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i.");return}r.success&&(je({email:r.user.email}),L("\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng!"))}catch(o){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+o.message)}finally{de(!1)}},ao=async e=>{if(e.preventDefault(),!$||!Q){k("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}if(Q.length<6){k("M\u1EADt kh\u1EA9u ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 6 k\xFD t\u1EF1.");return}de(!0),k(null),L(null);try{let o=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:$,password:Q})}),r=await o.json();if(!o.ok){k(r.error||"\u0110\u0103ng k\xFD th\u1EA5t b\u1EA1i.");return}r.success&&(Z("otp"),Ee(300),r.isSimulator&&r.otp?(_(r.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(_(""),L(r.message||"\u0110\u0103ng k\xFD th\xE0nh c\xF4ng! Vui l\xF2ng nh\u1EADp m\xE3 OTP g\u1EEDi t\u1EDBi email.")))}catch(o){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+o.message)}finally{de(!1)}},ro=async e=>{if(e.preventDefault(),!Ce){k("Vui l\xF2ng nh\u1EADp m\xE3 OTP.");return}de(!0),k(null),L(null);try{let o=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:$,otp:Ce})}),r=await o.json();if(!o.ok){k(r.error||"X\xE1c th\u1EF1c OTP th\u1EA5t b\u1EA1i.");return}r.success&&(Z("login"),Ae(""),_(""),L("K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng! B\xE2y gi\u1EDD b\u1EA1n c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp."))}catch(o){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+o.message)}finally{de(!1)}},no=async()=>{if(!(se>0)){k(null),L(null);try{let e=await fetch("/api/auth/resend-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:$})}),o=await e.json();if(!e.ok){k(o.error||"G\u1EEDi l\u1EA1i OTP th\u1EA5t b\u1EA1i.");return}o.success&&(Ee(300),o.isSimulator&&o.otp?(_(o.otp),L(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${o.otp}`)):(_(""),L(o.message||"M\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email c\u1EE7a b\u1EA1n.")))}catch(e){k("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+e.message)}}},Fo=async()=>{try{await fetch("/api/auth/logout",{method:"POST"}),je(null),gt(null),He(4500),Pe(0),Z("login"),_e(""),qe(""),Ae(""),k(null),L(null)}catch(e){console.error("Logout error",e)}},[w,He]=p(4500),[ot,Pe]=p(0),[Se,Yo]=p(!0),[$o,vt]=p([]),[Vo,yt]=p({bids:[],asks:[]}),[Xo,jo]=p("book"),[io,so]=p(""),[Ko,lo]=p(""),[V,po]=p(!1),[Te,_o]=p(100),[Be,qo]=p(5),[at,Jo]=p("micro"),[Ue,Zo]=p("percent"),[We,Qo]=p(5),[rt,ea]=p(0),[ta,co]=p([{id:"h1",time:"05:40:12",type:"SELL",entry:4512.4,stopLoss:4516.8,tp1:4504,status:"HIT TP1 \u{1F7E2} (+84 pips)"},{id:"h2",time:"03:15:45",type:"BUY",entry:4495.2,stopLoss:4489.5,tp1:4503.5,status:"HIT TP1 \u{1F7E2} (+83 pips)"},{id:"h3",time:"01:04:10",type:"SELL",entry:4520.1,stopLoss:4525,tp1:4511,status:"HIT SL \u{1F534} (-49 pips)"},{id:"h4",time:"23:12:05",type:"BUY",entry:4488.5,stopLoss:4482,tp1:4498,status:"HIT TP1 \u{1F7E2} (+95 pips)"}]),z=D({}),[oa,wt]=p(""),[go,xo]=p(!0),[q,Ne]=p(80),[ge,xe]=p(0),kt=ge===0,[nt,it]=p(1),g=C(()=>{if(!c?.chart?.timestamp)return[];let e=c.chart.timestamp.length,o=[];for(let r=0;r<e;r++)o.push({time:c.chart.timestamp[r],open:c.chart.open[r]??0,high:c.chart.high[r]??0,low:c.chart.low[r]??0,close:c.chart.close[r]??0,volume:c.chart.volume[r]??0});if(o.length>0){let r=o[o.length-1];r.close=w,w>r.high&&(r.high=w),w<r.low&&(r.low=w)}return o},[c,w]),X=C(()=>{if(g.length===0)return[];let e=g.length,o=Math.max(10,Math.min(q,e)),r=Math.max(0,Math.min(ge,e-o)),n=e-r,l=Math.max(0,n-o);return g.slice(l,n)},[g,q,ge]),R=C(()=>{if(g.length===0)return 0;let e=g.length,o=Math.max(10,Math.min(q,e)),r=Math.max(0,Math.min(ge,e-o)),n=e-r;return Math.max(0,n-o)},[g,q,ge]),mo=C(()=>{if(g.length===0)return[];let e=[],r=2/((Number(be)||50)+1),n=he||"close",l=g[0][n]||g[0].close;e.push(l);for(let i=1;i<g.length;i++)l=(g[i][n]||g[i].close)*r+l*(1-r),e.push(l);return e},[g,be,he]),bo=C(()=>{if(g.length===0)return[];let e=[],r=2/((Number(ue)||200)+1),n=fe||"close",l=g[0][n]||g[0].close;e.push(l);for(let i=1;i<g.length;i++)l=(g[i][n]||g[i].close)*r+l*(1-r),e.push(l);return e},[g,ue,fe]),St=C(()=>{if(g.length<10)return null;let o=(c?.advancedAnalysis?.swings||[]).filter(s=>s.type==="HIGH").sort((s,m)=>s.index-m.index);if(o.length>=2){let s=o[0];for(let b of o)b.price>s.price&&(s=b);let m=o.find(b=>b.index>s.index&&b.price<s.price);if(m||(m=o[o.length-1]),s&&m&&s.index!==m.index)return{i1:s.index,price1:s.price,i2:m.index,price2:m.price,source:"SMC Swings"}}let r=0,n=g[0].high;for(let s=1;s<Math.floor(g.length*.7);s++)g[s].high>n&&(n=g[s].high,r=s);let l=r+5,i=0;if(l<g.length){i=g[l].high;for(let s=l;s<g.length;s++)g[s].high>i&&g[s].high<n&&(i=g[s].high,l=s)}return r!==l&&l<g.length?{i1:r,price1:n,i2:l,price2:i,source:"PA Scan"}:{i1:Math.max(0,g.length-80),price1:4568,i2:Math.max(0,g.length-20),price2:4516,source:"SMC Profile"}},[g,c]),d=C(()=>{if(X.length<5)return null;let e=1400,o=520,r=4,n=68,l=12,i=34,s=e-r-n,m=o-l-i,b=X.map(M=>M.high),h=X.map(M=>M.low),v=Math.max(...b),u=Math.min(...h),y=v-u||1,S=(v+u)/2,A=y*1.1*nt||1;v=S+A/2,u=S-A/2;let N=v-u,O=X.length,P=s/O,W=Math.max(1,P*.75),B=M=>r+(M+.5)*P,oe=M=>l+(1-(M-u)/N)*m,E=Math.max(1,Math.floor(O/8)),ae=[];for(let M=0;M<O;M+=E){let Fe=X[M].time*1e3,Ot=new Date(Fe),pt;["1D","1W","1M"].includes(f)?pt=Ot.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}):pt=Ot.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),ae.push({x:B(M),label:pt})}let G=8,Le=[];for(let M=0;M<=G;M++){let Fe=u+N*M/G;Le.push({y:oe(Fe),price:Fe})}return{width:e,height:o,paddingLeft:r,paddingRight:n,paddingBottom:i,usableWidth:s,usableHeight:m,maxPrice:v,minPrice:u,paddedRange:N,candleSlotW:P,bodyWidth:W,getX:B,getY:oe,timeLabels:ae,priceLabels:Le}},[X,f,nt]),U=D(4500),Tt=D(null),Nt=D(0),Ge=D(!1),Lt=D(0),Mt=D(0),me=D(null),st=D(!1),Ct=D(0),At=D(1),uo={1:60,5:300,15:900,60:3600,"1D":86400,"1W":604800,"1M":2592e3};I(()=>{Tt.current=c},[c]);let te=(e="info")=>{try{let o=new(window.AudioContext||window.webkitAudioContext),r=o.createOscillator(),n=o.createGain();r.connect(n),n.connect(o.destination),e==="buy"?(r.frequency.setValueAtTime(587.33,o.currentTime),n.gain.setValueAtTime(.12,o.currentTime),r.start(),r.frequency.setValueAtTime(698.46,o.currentTime+.12),n.gain.setValueAtTime(.1,o.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,o.currentTime+.35),r.stop(o.currentTime+.4)):e==="sell"?(r.frequency.setValueAtTime(523.25,o.currentTime),n.gain.setValueAtTime(.12,o.currentTime),r.start(),r.frequency.setValueAtTime(392,o.currentTime+.12),n.gain.setValueAtTime(.1,o.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,o.currentTime+.35),r.stop(o.currentTime+.4)):(r.frequency.setValueAtTime(440,o.currentTime),n.gain.setValueAtTime(.08,o.currentTime),n.gain.exponentialRampToValueAtTime(.001,o.currentTime+.15),r.start(),r.stop(o.currentTime+.2))}catch(o){console.warn("Audio Context failed",o)}};I(()=>{if(!V||!c?.advancedAnalysis)return;let e=c.advancedAnalysis,o=Date.now(),r=e.fvgs.find(s=>!s.mitigated&&s.type==="BULLISH");if(r&&w<=r.top&&w>=r.bottom){let s=`fvg_bullish_${r.index}`;(!z.current[s]||o-z.current[s]>3e4)&&(z.current[s]=o,te("buy"))}let n=e.fvgs.find(s=>!s.mitigated&&s.type==="BEARISH");if(n&&w>=n.bottom&&w<=n.top){let s=`fvg_bearish_${n.index}`;(!z.current[s]||o-z.current[s]>3e4)&&(z.current[s]=o,te("sell"))}let l=e.orderBlocks.find(s=>!s.mitigated&&s.type==="BULLISH");if(l&&w>=l.low&&w<=l.high){let s=`ob_bullish_${l.index}`;(!z.current[s]||o-z.current[s]>3e4)&&(z.current[s]=o,te("buy"))}let i=e.orderBlocks.find(s=>!s.mitigated&&s.type==="BEARISH");if(i&&w>=i.low&&w<=i.high){let s=`ob_bearish_${i.index}`;(!z.current[s]||o-z.current[s]>3e4)&&(z.current[s]=o,te("sell"))}},[w,V,c]),I(()=>{let e=setInterval(()=>{let o=new Date;so(o.toLocaleTimeString("en-GB")+" UTC");let r=uo[f]||86400,n=Math.floor(o.getTime()/1e3),l=r-n%r;if(l>=3600){let i=Math.floor(l/3600),s=Math.floor(l%3600/60),m=l%60;wt(`${i}:${String(s).padStart(2,"0")}:${String(m).padStart(2,"0")}`)}else{let i=Math.floor(l/60),s=l%60;wt(`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`)}},1e3);return()=>clearInterval(e)},[f]),I(()=>{let e=o=>{document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA"||(o.key==="+"||o.key==="="?(o.preventDefault(),It()):o.key==="-"?(o.preventDefault(),zt()):o.key==="ArrowLeft"?(o.preventDefault(),xe(r=>Math.min(g.length-q,r+5))):o.key==="ArrowRight"?(o.preventDefault(),xe(r=>Math.max(0,r-5))):(o.key==="r"||o.key==="R")&&(o.preventDefault(),Ne(80),xe(0),it(1)))};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[g.length,q]);let lt=async(e=!1)=>{if(H){e||xt(!0),e||$e(null);try{let o=await fetch(`/api/signals/XAUUSD?tf=${f}`);if(!o.ok)throw new Error("Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn server API Gold");let r=await o.json();$e(null),gt(r),lo(new Date().toLocaleTimeString("vi-VN")),r.lastPrice>0&&(!Tt.current||Math.abs(U.current-r.lastPrice)>100?U.current=r.lastPrice:U.current=U.current*.7+r.lastPrice*.3,He(Math.round(U.current*100)/100)),r.signals&&r.signals.type!=="NEUTRAL"&&co(n=>{let l=n[0];if(!l||l.type!==r.signals.type||Math.abs(l.entry-r.signals.suggestion.entry)>.5){let s=new Date().toLocaleTimeString("vi-VN");return[{id:Math.random().toString(),time:s,type:r.signals.type,entry:r.signals.suggestion.entry,stopLoss:r.signals.suggestion.stopLoss,tp1:r.signals.suggestion.takeProfit1,status:"Active \u{1F7E1}"},...n.slice(0,14)]}return n}),e||(fo(r.lastPrice),vo(r.lastPrice)),Pe(r.priceChange)}catch(o){e||$e(o.message)}finally{e||xt(!1)}}},ho=async()=>{try{let e=await fetch("/api/price/XAUUSD");if(!e.ok)return;let o=await e.json();o.price&&o.price>0&&(U.current=U.current*.7+o.price*.3,He(Math.round(U.current*100)/100),Pe(o.change))}catch{}};I(()=>{if(!H)return;lt(!1);let e=setInterval(()=>{Se&&H&&ho()},1500),o=setInterval(()=>{Se&&H&&lt(!0)},3e4);return()=>{clearInterval(e),clearInterval(o)}},[f,Se,H]);let fo=e=>{let o=.35+Math.random()*.15,r=[],n=[];for(let l=1;l<=10;l++)n.push({price:e+o/2+(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10}),r.push({price:e-o/2-(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10});yt({bids:r,asks:n.reverse()})},vo=e=>{let o=[],r=new Date;for(let n=0;n<20;n++){let l=n*280,i=new Date(r.getTime()-l),s=Math.random()>.48;o.push({id:`init-${n}`,time:i.toLocaleTimeString()+"."+String(i.getMilliseconds()).padStart(3,"0"),type:s?"BUY":"SELL",price:e+(Math.random()-.5)*.4,size:(Math.random()*4.5+.1).toFixed(1)+" Lot"})}vt(o)};I(()=>{if(!Se||!c||!H)return;let e=setInterval(()=>{let o=U.current,r=c.lastPrice,n=(r-o)*.05,l=(Math.random()-.5)*.25,i=Math.round((o+n+l)*100)/100;U.current=i,He(i);let s=r/(1+c.priceChange/100),m=(i-s)/s*100;if(Pe(m),Nt.current++,Nt.current%3===0){let b=.35+Math.random()*.1;yt(h=>{let v=h.asks.map((y,S)=>{let A=10-S;return{price:Math.round((i+b/2+(A-1)*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)}});return{bids:h.bids.map((y,S)=>({price:Math.round((i-b/2-S*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)})),asks:v}})}if(Math.random()<.35){let b=Math.random()>.47,h=new Date,v=b?i+Math.random()*.05:i-Math.random()*.05,u={id:Math.random().toString(),time:h.toLocaleTimeString()+"."+String(h.getMilliseconds()).padStart(3,"0"),type:b?"BUY":"SELL",price:Math.round(v*100)/100,size:(Math.random()*5+.1).toFixed(1)+" Lot"};vt(y=>[u,...y.slice(0,24)])}},85);return()=>clearInterval(e)},[Se,c]);let yo=e=>{if(!me.current||!d)return;let o=me.current.getBoundingClientRect();(e.clientX-o.left)/o.width*d.width>d.width-d.paddingRight?(st.current=!0,Ct.current=e.clientY,At.current=nt):(Ge.current=!0,Lt.current=e.clientX,Mt.current=ge)},wo=e=>{if(st.current){let r=1+(e.clientY-Ct.current)*.005;it(Math.max(.05,Math.min(10,At.current*r)))}else if(Ge.current&&me.current&&d){let o=e.clientX-Lt.current,n=(me.current.clientWidth||860)/Math.max(q,1),l=Math.round(-o/n),i=Math.max(0,Math.min(g.length-q,Mt.current+l));xe(i)}},Et=()=>{Ge.current=!1,st.current=!1},ko=()=>{Ne(80),xe(0),it(1)};I(()=>{let e=me.current;if(!e)return;let o=r=>{r.preventDefault();let n=r.deltaY>0?1:-1;Ne(l=>Math.max(10,Math.min(500,l+n*Math.ceil(l*.08))))};return e.addEventListener("wheel",o,{passive:!1}),()=>{e.removeEventListener("wheel",o)}},[d]);let So=()=>xe(0),It=()=>Ne(e=>Math.max(10,Math.round(e*.7))),zt=()=>Ne(e=>Math.min(500,Math.round(e*1.4))),x=C(()=>{if(!c)return null;let e=c.signals,o=c.tradingViewAnalysis,r=e.type==="BUY"?e.strength:e.type==="SELL"?-e.strength:0,n=o?o.recommendAll*100:0,l=Math.round((r+n)/2),i="NEUTRAL";l>=40?i="STRONG_BUY":l>=15?i="BUY":l<=-40?i="STRONG_SELL":l<=-15&&(i="SELL");let s=50,m=0,b=0,h=0,v=0,u=e.indicators.atr||o?.atr||3.2,y=e.indicators.rsi||o?.rsi||50,S=o?o.macd-o.macdSignal:0;if(o){let G=w>o.ema50,Le=o.ema10>o.sma20;i.includes("BUY")?(G&&(m+=6),Le&&(m+=6)):i.includes("SELL")&&(G||(m+=6),Le||(m+=6))}i.includes("BUY")?(y>=50&&y<=65&&(b+=6),S>0&&(b+=6)):i.includes("SELL")&&(y>=35&&y<=50&&(b+=6),S<0&&(b+=6)),o&&o.adx>25&&(h+=6),i.includes("BUY")&&y<30&&(v+=8),i.includes("SELL")&&y>70&&(v+=8);let A=Math.min(94,Math.max(35,Math.round(s+Math.abs(l)*.3+m+b+h+v))),N=0,O=0,P="",W=0,B=0,oe=0,E=0,ae=c.chart?.close&&c.chart.close.length>0?c.chart.close[c.chart.close.length-1]:w;if(e&&e.suggestion&&e.suggestion.position!=="NEUTRAL"){let G=e.suggestion;W=G.stopLoss,B=G.takeProfit1,oe=G.takeProfit2,E=G.entry,N=Math.round((E-.15*u)*100)/100,O=Math.round((E+.15*u)*100)/100,P=`$${E.toFixed(2)}`,e.strength>0&&(A=Math.min(94,Math.max(78,80+Math.round(e.strength*.15))))}else N=Math.round((i.includes("BUY")?ae-.25*u:ae)*100)/100,O=Math.round((i.includes("BUY")?ae:ae+.25*u)*100)/100,P=`$${N.toFixed(2)} - $${O.toFixed(2)}`,E=(N+O)/2,i.includes("BUY")?(W=Math.round((E-1.5*u)*100)/100,B=Math.round((E+1.5*u)*100)/100,oe=Math.round((E+3*u)*100)/100):i.includes("SELL")&&(W=Math.round((E+1.5*u)*100)/100,B=Math.round((E-1.5*u)*100)/100,oe=Math.round((E-3*u)*100)/100);return{type:i,confluenceScore:l,winProbability:A,entryText:P,entryMid:E,sl:W,tp1:B,tp2:oe,atr:u,rsi:y,adx:o?.adx||20,ema10:o?.ema10||w,sma20:o?.sma20||w}},[c]),dt=C(()=>rt>0?rt:!x||!x.sl?0:Math.abs(x.entryMid-x.sl),[rt,x]),Rt=C(()=>Ue==="percent"?Te*Be/100:We,[Te,Be,We,Ue]),aa=C(()=>Te<=0?0:Ue==="usd"?We/Te*100:Be,[Te,Be,We,Ue]),ra=C(()=>dt<=0?0:Rt/(dt*(at==="standard"?100:at==="mini"?10:1)),[Rt,dt,at]),na=C(()=>{if(!x)return{};let e=x.type,o=x.winProbability,r="var(--yellow)";return e.includes("BUY")?r="var(--green)":e.includes("SELL")&&(r="var(--red)"),{background:`conic-gradient(${r} 0% ${o}%, var(--bg3) ${o}% 100%)`}},[x]);return $t?t("div",{className:"auth-container",children:a("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[t("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"120px",height:"120px",borderRadius:"16px",animation:"pulse 2s infinite ease-in-out",filter:"drop-shadow(0 0 24px rgba(255, 171, 0, 0.6))",marginBottom:"8px"}}),t("div",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"16px",letterSpacing:"1px"},children:"\u0110ANG KH\u1EDEI \u0110\u1ED8NG XAU/USD GOLD TERMINAL..."}),t("div",{className:"load-bar",style:{width:"200px"},children:t("div",{className:"load-fill"})})]})}):H?a("div",{className:"root",children:[a("header",{className:"topbar",children:[t("div",{className:"topbar-left",children:a("div",{className:"brand",style:{display:"flex",alignItems:"center"},children:[t("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"45px",height:"45px",borderRadius:"8px",marginRight:"8px",filter:"drop-shadow(0 0 8px rgba(255, 171, 0, 0.4))"}}),t("span",{className:"brand-name",children:"H\u1EC6 TH\u1ED0NG GIAO D\u1ECACH V\xC0NG CHUY\xCAN NGHI\u1EC6P XAU/USD"}),t("span",{className:"brand-badge",children:"D\u1EEE LI\u1EC6U TH\u1EDCI GIAN TH\u1EF0C MILLISECOND"})]})}),a("div",{className:"topbar-right",children:[t("span",{className:"clock",children:io||"00:00:00 UTC"}),t("button",{className:`tf-btn ${V?"active":""}`,style:{borderColor:V?"var(--green)":"rgba(255,255,255,0.05)",background:V?"rgba(0, 230, 118, 0.12)":"var(--bg3)",color:V?"var(--green)":"var(--text)",marginRight:"10px",fontWeight:V?"600":"normal",cursor:"pointer"},onClick:()=>po(!V),children:V?"\u{1F514} B\xE1o \xC2m: B\u1EACT":"\u{1F515} B\xE1o \xC2m: T\u1EAET"}),t("button",{className:"tf-btn",style:{borderColor:"rgba(255,255,255,0.05)",background:"var(--bg3)",color:"var(--text)"},onClick:lt,children:"\u{1F504} T\u1EA3i L\u1EA1i"})]})]}),a("div",{className:"layout",children:[!re&&a("aside",{className:"sidebar",children:[t("div",{className:"sb-header hide-on-mobile",children:t("div",{className:"gold-profile-card",children:t("div",{className:"g-title",children:"\u{1F7E1} V\xC0NG SPOT (XAU/USD)"})})}),a("div",{style:{padding:"16px",flex:1,display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:[c&&t("div",{className:"sug-card hide-on-mobile",style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"16px",background:"rgba(20, 24, 33, 0.45)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 215, 0, 0.08)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.25)"},children:t("img",{src:"/frontend/logo.png",alt:"Xtreme Algo Union Logo",style:{width:"100%",maxWidth:"220px",height:"auto",borderRadius:"12px",filter:"drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",transition:"all 0.3s ease"},onMouseOver:e=>{e.currentTarget.style.filter="drop-shadow(0 0 24px rgba(255, 171, 0, 0.5))",e.currentTarget.style.transform="scale(1.02)"},onMouseOut:e=>{e.currentTarget.style.filter="drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",e.currentTarget.style.transform="scale(1)"}})}),x&&a("div",{className:"sug-card",style:{borderTop:"3px solid var(--gold)",background:"rgba(20, 24, 33, 0.65)",backdropFilter:"blur(12px)"},children:[a("div",{className:"sug-title",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:"\u2728 CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT"}),t("span",{style:{fontSize:"9px",background:"rgba(255, 171, 0, 0.15)",color:"var(--gold)",padding:"2px 6px",borderRadius:"4px",fontWeight:"bold"},children:"PRO FEED"})]}),t("div",{style:{display:"flex",alignItems:"center",gap:"16px",margin:"14px 0",background:"rgba(255,255,255,0.02)",padding:"10px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.04)"},children:a("div",{style:{flex:1},children:[t("span",{style:{fontSize:"10px",color:"var(--text2)",textTransform:"uppercase",display:"block"},children:"Khuy\u1EBFn ngh\u1ECB h\u1EE3p l\u01B0u"}),t("span",{className:`sug-val ${x.type.includes("BUY")?"buy":x.type.includes("SELL")?"sell":""}`,style:{fontSize:"15px",fontWeight:"800",marginTop:"2px",display:"block"},children:x.type==="STRONG_BUY"?"\u{1F7E2} MUA M\u1EA0NH (STRONG BUY)":x.type==="BUY"?"\u{1F7E2} MUA V\xC0O (BUY)":x.type==="STRONG_SELL"?"\u{1F534} B\xC1N M\u1EA0NH (STRONG SELL)":x.type==="SELL"?"\u{1F534} B\xC1N RA (SELL)":"\u{1F7E1} TRUNG L\u1EACP (NEUTRAL)"})]})}),a("div",{className:"sug-grid",style:{gap:"8px"},children:[a("div",{className:"sug-item",children:[t("span",{className:"sug-label",children:"ENTRY"}),t("span",{className:"sug-val entry",style:{fontSize:"11.5px",letterSpacing:"-0.2px"},children:x.entryText})]}),a("div",{className:"sug-item",children:[t("span",{className:"sug-label",children:"\u0110i\u1EC3m C\u1EAFt l\u1ED7 (SL)"}),t("span",{className:"sug-val sl",style:{fontSize:"11.5px"},children:x.sl>0?`$${x.sl.toFixed(2)}`:"\u2014"})]}),a("div",{className:"sug-item",children:[t("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 1 (TP1)"}),t("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:x.tp1>0?`$${x.tp1.toFixed(2)}`:"\u2014"})]}),a("div",{className:"sug-item",children:[t("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 2 (TP2)"}),t("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:x.tp2>0?`$${x.tp2.toFixed(2)}`:"\u2014"})]}),t("div",{className:"sug-item",style:{gridColumn:"span 2"},children:a("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"8px",marginTop:"4px"},children:[a("div",{children:[t("span",{className:"sug-label",style:{fontSize:"9px"},children:"T\u1EF7 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn:"}),t("strong",{style:{color:"#fff",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:"1:1.5 \u2794 1:3.0"})]}),a("div",{children:[t("span",{className:"sug-label",style:{fontSize:"9px"},children:"H\u1EC7 s\u1ED1 bi\u1EBFn \u0111\u1ED9ng (ATR):"}),a("strong",{style:{color:"var(--gold)",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:["$",x.atr.toFixed(2)]})]})]})}),a("div",{className:"sug-item",style:{gridColumn:"span 2",background:"rgba(255, 255, 255, 0.01)",padding:"8px",borderRadius:"6px",border:"1px solid rgba(255, 255, 255, 0.03)",marginTop:"4px"},children:[t("span",{className:"sug-label",style:{fontSize:"9.5px",marginBottom:"6px",display:"block"},children:"H\u1EE3p l\u01B0u \u0111a khung th\u1EDDi gian:"}),t("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"4px",textAlign:"center"},children:[{id:"1",label:"M1"},{id:"5",label:"M5"},{id:"15",label:"M15"},{id:"60",label:"H1"},{id:"1D",label:"D1"}].map(e=>{let o=c?.multiTimeframeSignals?.[e.id]||"NEUTRAL",r="var(--text3)",n="rgba(255, 255, 255, 0.03)",l="TRUNG L\u1EACP";o.includes("BUY")?(r="var(--green)",n="rgba(0, 230, 118, 0.08)",l=o==="STRONG_BUY"?"MUA M\u1EA0NH":"MUA"):o.includes("SELL")?(r="var(--red)",n="rgba(255, 23, 68, 0.08)",l=o==="STRONG_SELL"?"B\xC1N M\u1EA0NH":"B\xC1N"):(r="var(--yellow)",n="rgba(255, 171, 0, 0.08)",l="TRUNG L\u1EACP");let i=f===e.id;return a("div",{onClick:()=>{te(),j(e.id)},style:{background:n,border:i?"1px solid var(--gold)":"1px solid rgba(255,255,255,0.04)",borderRadius:"4px",padding:"4px 1px",cursor:"pointer",transition:"all 0.15s ease",boxShadow:i?"0 0 6px rgba(255, 171, 0, 0.12)":"none"},onMouseOver:s=>{s.currentTarget.style.transform="scale(1.03)",s.currentTarget.style.borderColor="var(--gold)"},onMouseOut:s=>{s.currentTarget.style.transform="scale(1)",s.currentTarget.style.borderColor=i?"var(--gold)":"rgba(255,255,255,0.04)"},children:[t("span",{style:{fontSize:"9px",fontWeight:"800",color:i?"var(--gold)":"#fff",display:"block"},children:e.label}),t("span",{style:{fontSize:"6.5px",color:r,display:"block",marginTop:"2px",fontWeight:"bold",whiteSpace:"nowrap"},children:l})]},e.id)})})]})]})]})]})]}),a("main",{className:"main",children:[a("div",{className:"sym-header",children:[a("div",{className:"sym-info",children:[a("div",{className:"sym-title-wrap",children:[t("span",{className:"sym-title",children:"GOLD (XAU/USD)"}),t("span",{className:"sym-subtitle",children:"V\xE0ng giao ngay / \u0110\xF4 la M\u1EF9"})]}),a("div",{className:"price-info",children:[a("span",{className:"price-current",children:["$",w.toFixed(2)]}),a("span",{className:`price-change ${ot>=0?"up":"down"}`,children:[ot>=0?"+":"",ot.toFixed(3),"%"]})]})]}),t("div",{className:"hide-on-mobile",style:{display:"flex",gap:"4px",background:"var(--bg3)",padding:"3px",borderRadius:"6px",border:"1px solid var(--border)",marginLeft:"auto",marginRight:"6px"},children:[{id:"1",name:"M1"},{id:"5",name:"M5"},{id:"15",name:"M15"},{id:"60",name:"1H"},{id:"1D",name:"1D"}].map(e=>t("button",{onClick:()=>{te(),j(e.id)},style:{background:f===e.id?"var(--yellow)":"transparent",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:"bold",color:f===e.id?"#000":"var(--text2)",cursor:"pointer",transition:"all 0.15s ease"},children:e.name},e.id))}),t("div",{style:{display:"flex",gap:"6px",alignItems:"center",marginLeft:"6px"},children:t("button",{onClick:()=>{te(),F("tradingview")},className:`tf-btn ${T==="tradingview"?"active":""}`,style:{background:T==="tradingview"?"var(--yellow)":"var(--bg3)",borderColor:T==="tradingview"?"var(--yellow)":"rgba(255,255,255,0.05)",color:T==="tradingview"?"#000":"var(--text2)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:"\u{1F4CA} BI\u1EC2U \u0110\u1ED2 TRADINGVIEW"})})]}),Bt&&t("div",{className:"load-bar",children:t("div",{className:"load-fill"})}),mt&&a("div",{className:"err-msg",children:["\u26A0\uFE0F L\u1ED7i: ",mt]}),a("div",{className:"main-workspace",children:[t("div",{className:`chart-column ${re?"full-chart-active":""}`,children:t("div",{className:"chart-wrap",style:{height:"100%",width:"100%",display:"flex",flexDirection:"column",position:"relative"},children:T==="tradingview"?a(Ye,{children:[t(No,{timeframe:f}),go&&a("div",{className:"tv-guide-overlay",children:[a("div",{className:"tv-guide-header",children:[a("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[t("span",{className:"tv-guide-icon",children:"\u{1F4A1}"}),t("span",{className:"tv-guide-title",children:"M\u1EB9o: B\u1EADt \u0110\u1EBFm Ng\u01B0\u1EE3c \u0110\xF3ng N\u1EBFn Tr\xEAn Chart"})]}),t("button",{className:"tv-guide-close",onClick:()=>xo(!1),children:"\xD7"})]}),a("div",{className:"tv-guide-body",children:["\u0110\u1EC3 ch\u1EA1y \u0111\u1EBFm ng\u01B0\u1EE3c n\u1EBFn th\u1EDDi gian th\u1EF1c \u1EDF d\u01B0\u1EDBi t\u1EF7 gi\xE1 ",a("strong",{style:{color:"var(--green)"},children:["$",w.toFixed(2)]}),":",a("ol",{className:"tv-guide-steps",children:[a("li",{children:[t("strong",{children:"Click chu\u1ED9t ph\u1EA3i"})," v\xE0o v\xF9ng c\u1ED9t t\u1EF7 gi\xE1 b\xEAn ph\u1EA3i bi\u1EC3u \u0111\u1ED3."]}),a("li",{children:["Ch\u1ECDn d\xF2ng ",t("strong",{style:{color:"var(--gold)"},children:'"\u0110\u1EBFm ng\u01B0\u1EE3c t\u1EDBi khi \u0111\xF3ng n\u1EBFn" (Countdown to bar close)'}),"."]})]}),t("div",{className:"tv-guide-footer",children:"\u2713 T\u1EF1 \u0111\u1ED9ng l\u01B0u v\xE0 ho\u1EA1t \u0111\u1ED9ng v\u0129nh vi\u1EC5n tr\xEAn tr\xECnh duy\u1EC7t c\u1EE7a b\u1EA1n!"})]})]})]}):a("div",{style:{position:"relative",width:"100%",height:"100%",flex:1,display:"flex",flexDirection:"column",background:"#131722",overflow:"hidden"},children:[d?a("svg",{className:"chart-svg",ref:me,width:"100%",height:"100%",viewBox:`0 0 ${d.width} ${d.height}`,preserveAspectRatio:"none",onMouseDown:yo,onMouseMove:wo,onMouseUp:Et,onMouseLeave:Et,onDoubleClick:ko,style:{cursor:Ge.current?"grabbing":"crosshair",userSelect:"none"},children:[t("defs",{children:a("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[t("feGaussianBlur",{stdDeviation:"3",result:"blur"}),a("feMerge",{children:[t("feMergeNode",{in:"blur"}),t("feMergeNode",{in:"SourceGraphic"})]})]})}),d.priceLabels.map((e,o)=>a("g",{children:[t("line",{x1:d.paddingLeft,y1:e.y,x2:d.width-d.paddingRight,y2:e.y,stroke:"rgba(255, 255, 255, 0.03)",strokeWidth:"1"}),a("text",{x:d.width-d.paddingRight+8,y:e.y+4,fill:"var(--text3)",fontSize:"10px",fontFamily:"monospace",children:["$",e.price.toFixed(2)]})]},`grid-y-${o}`)),d.timeLabels.map((e,o)=>a("g",{children:[t("line",{x1:e.x,y1:0,x2:e.x,y2:d.height-d.paddingBottom,stroke:"rgba(255, 255, 255, 0.02)",strokeWidth:"1"}),t("text",{x:e.x-18,y:d.height-12,fill:"var(--text3)",fontSize:"9.5px",fontFamily:"monospace",children:e.label})]},`grid-x-${o}`)),x&&(()=>{let e=d.getY(x.entryMid),o=d.getY(x.sl),r=d.getY(x.tp2),n=d.paddingLeft,l=d.width-d.paddingRight;return a(Ye,{children:[t("rect",{x:n,y:Math.min(e,o),width:l-n,height:Math.abs(e-o),fill:"rgba(255, 23, 68, 0.06)",stroke:"rgba(255, 23, 68, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"}),t("rect",{x:n,y:Math.min(e,r),width:l-n,height:Math.abs(e-r),fill:"rgba(0, 230, 118, 0.06)",stroke:"rgba(0, 230, 118, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"})]})})(),c?.advancedAnalysis&&(()=>{let e=c.advancedAnalysis,o=d.paddingLeft,r=d.width-d.paddingRight;return a("g",{id:"smc-dynamic-structures",children:[e.orderBlocks?.map((n,l)=>{let i=n.index,s=n.mitigated?Math.min(g.length-1,n.index+10):g.length-1,m=d.getX(i-R),b=d.getX(s-R),h=Math.max(o,m),v=Math.min(r,b);if(h>=v)return null;let u=d.getY(n.high),y=d.getY(n.low),S=Math.min(u,y),A=Math.abs(u-y),N=n.type==="BULLISH",O=N?"rgba(0, 230, 118, 0.06)":"rgba(255, 23, 68, 0.06)",P=N?"rgba(0, 230, 118, 0.22)":"rgba(255, 23, 68, 0.22)",W=N?"+OB BULLISH":"-OB BEARISH",B=N?"rgba(0, 230, 118, 0.8)":"rgba(255, 23, 68, 0.8)";return a("g",{children:[t("rect",{x:h,y:S,width:v-h,height:A,fill:O,stroke:P,strokeWidth:"1"}),v-h>50&&t("text",{x:h+6,y:S+11,fill:B,fontSize:"8px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:W})]},`ob-${l}`)}),e.fvgs?.map((n,l)=>{let i=Math.max(0,n.index-2),s=n.mitigated?Math.min(g.length-1,n.index+6):g.length-1,m=d.getX(i-R),b=d.getX(s-R),h=Math.max(o,m),v=Math.min(r,b);if(h>=v)return null;let u=d.getY(n.top),y=d.getY(n.bottom),S=Math.min(u,y),A=Math.abs(u-y),N=n.type==="BULLISH",O=N?"rgba(0, 188, 212, 0.04)":"rgba(233, 30, 99, 0.04)",P=N?"rgba(0, 188, 212, 0.16)":"rgba(233, 30, 99, 0.16)",W=N?"FVG BULLISH":"FVG BEARISH",B=N?"rgba(0, 188, 212, 0.65)":"rgba(233, 30, 99, 0.65)";return a("g",{children:[t("rect",{x:h,y:S,width:v-h,height:A,fill:O,stroke:P,strokeWidth:"0.8",strokeDasharray:"2,2"}),v-h>50&&A>6&&t("text",{x:h+6,y:S+9,fill:B,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:W})]},`fvg-${l}`)}),e.structureShifts?.map((n,l)=>{let i=g.findIndex(A=>A.time===n.time);if(i===-1)return null;let s=Math.min(g.length-1,i+20),m=d.getX(i-R),b=d.getX(s-R),h=Math.max(o,m),v=Math.min(r,b);if(h>=v)return null;let u=d.getY(n.price),y=n.direction==="BULLISH",S=y?"var(--green)":"var(--red)";return a("g",{children:[t("line",{x1:h,y1:u,x2:v,y2:u,stroke:S,strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.85"}),a("g",{transform:`translate(${h+6}, ${u-6})`,children:[t("rect",{x:"-3",y:"-2",width:"48",height:"12",rx:"3",fill:"rgba(19, 23, 34, 0.95)",stroke:S,strokeWidth:"0.8"}),a("text",{x:"21",y:"7",textAnchor:"middle",fill:S,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",children:[n.type," ",y?"\u2197":"\u2198"]})]})]},`shift-${l}`)}),e.sweeps?.map((n,l)=>{let i=g.findIndex(h=>h.time===n.time);if(i===-1)return null;let s=d.getX(i-R);if(s<o||s>r)return null;let m=d.getY(n.price),b=n.type==="SSL";return a("g",{children:[t("line",{x1:s-4,y1:m-4,x2:s+4,y2:m+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),t("line",{x1:s+4,y1:m-4,x2:s-4,y2:m+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),t("text",{x:s,y:b?m+14:m-10,textAnchor:"middle",fill:"var(--yellow)",fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:b?"SSL SWEEP":"BSL SWEEP"})]},`sweep-${l}`)})]})})(),X.map((e,o)=>{let r=d.getX(o),n=d.getY(e.high),l=d.getY(e.low),i=d.getY(e.open),s=d.getY(e.close),b=e.close>=e.open?"var(--green)":"var(--red)";return a("g",{children:[t("line",{x1:r,y1:n,x2:r,y2:l,stroke:b,strokeWidth:"1.5"}),t("rect",{x:r-d.bodyWidth/2,y:Math.min(i,s),width:d.bodyWidth,height:Math.max(1.5,Math.abs(i-s)),fill:b,stroke:b,strokeWidth:"0.5"})]},`candle-${o}`)}),pe&&(()=>{let e="";for(let o=0;o<X.length;o++){let r=R+o,n=mo[r];if(n){let l=d.getX(o),i=d.getY(n);e===""?e+=`M ${l} ${i}`:e+=` L ${l} ${i}`}}return e?t("path",{d:e,fill:"none",stroke:ve,strokeWidth:"2",opacity:"0.85"}):null})(),ce&&(()=>{let e="";for(let o=0;o<X.length;o++){let r=R+o,n=bo[r];if(n){let l=d.getX(o),i=d.getY(n);e===""?e+=`M ${l} ${i}`:e+=` L ${l} ${i}`}}return e?t("path",{d:e,fill:"none",stroke:ye,strokeWidth:"2.2",opacity:"0.85"}):null})(),St&&(()=>{let{i1:e,price1:o,i2:r,price2:n}=St,l=(n-o)/(r-e),i=d.getX(e-R),s=d.getY(o),b=g.length-1+10,h=d.getX(b-R),v=d.getY(o+l*(b-e));return a("g",{children:[t("line",{x1:i,y1:s,x2:h,y2:v,stroke:"var(--gold)",strokeWidth:"2.5",strokeDasharray:"6,4",filter:"url(#glow)"}),t("circle",{cx:i,cy:s,r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),t("circle",{cx:d.getX(r-R),cy:d.getY(n),r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),a("text",{x:Math.max(i+10,d.width-d.paddingRight-180),y:v-10,fill:"var(--gold)",fontSize:"10px",fontWeight:"bold",fontFamily:"monospace",opacity:"0.9",children:["\u2198 \u0110\u01AF\u1EDCNG XU H\u01AF\u1EDANG GI\u1EA2M ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]})]})})(),x&&(()=>{let e=d.getY(x.entryMid),o=d.getY(x.sl),r=d.getY(x.tp1),n=d.getY(x.tp2),l=d.paddingLeft,i=d.width-d.paddingRight;return a("g",{children:[t("line",{x1:l,y1:o,x2:i,y2:o,stroke:"var(--red)",strokeWidth:"1.2",strokeDasharray:"4,4"}),t("rect",{x:i+4,y:o-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 23, 68, 0.2)",stroke:"var(--red)",strokeWidth:"1"}),a("text",{x:i+8,y:o+4,fill:"var(--red)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["SL:$",x.sl.toFixed(1)]}),t("line",{x1:l,y1:e,x2:i,y2:e,stroke:"var(--gold)",strokeWidth:"1.5",strokeDasharray:"4,4"}),t("rect",{x:i+4,y:e-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 171, 0, 0.2)",stroke:"var(--gold)",strokeWidth:"1"}),a("text",{x:i+8,y:e+4,fill:"var(--gold)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["ENT:$",x.entryMid.toFixed(1)]}),t("line",{x1:l,y1:r,x2:i,y2:r,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),t("rect",{x:i+4,y:r-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),a("text",{x:i+8,y:r+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP1:$",x.tp1.toFixed(1)]}),t("line",{x1:l,y1:n,x2:i,y2:n,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),t("rect",{x:i+4,y:n-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),a("text",{x:i+8,y:n+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP2:$",x.tp2.toFixed(1)]})]})})()]}):t("div",{className:"chart-empty",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"var(--text3)"},children:"\u0110ang d\u1EF1ng bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt..."}),a("div",{className:"chart-ema-legend",onMouseDown:e=>e.stopPropagation(),onMouseMove:e=>e.stopPropagation(),children:[a("div",{className:"ema-legend-row",children:[t("span",{className:"ema-legend-dot",style:{backgroundColor:ve,color:ve}}),a("span",{className:"ema-legend-name",style:{color:pe?"#fff":"var(--text3)"},children:["EMA ",be," ",t("span",{style:{opacity:.6,fontSize:"9.5px"},children:he})]}),a("div",{className:"ema-legend-actions",children:[t("button",{className:`ema-action-btn ${pe?"active":""}`,onClick:()=>Xt(!pe),title:pe?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:pe?a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t("circle",{cx:"12",cy:"12",r:"3"})]}):a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),t("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),t("button",{className:"ema-action-btn",onClick:()=>we("ema50"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("circle",{cx:"12",cy:"12",r:"3"}),t("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),t("button",{className:"ema-action-btn open-source-btn",onClick:()=>{ze("ema50"),Re("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("polyline",{points:"16 18 22 12 16 6"}),t("polyline",{points:"8 6 2 12 8 18"})]})})]})]}),a("div",{className:"ema-legend-row",children:[t("span",{className:"ema-legend-dot",style:{backgroundColor:ye,color:ye}}),a("span",{className:"ema-legend-name",style:{color:ce?"#fff":"var(--text3)"},children:["EMA ",ue," ",t("span",{style:{opacity:.6,fontSize:"9.5px"},children:fe})]}),a("div",{className:"ema-legend-actions",children:[t("button",{className:`ema-action-btn ${ce?"active":""}`,onClick:()=>jt(!ce),title:ce?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:ce?a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t("circle",{cx:"12",cy:"12",r:"3"})]}):a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),t("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),t("button",{className:"ema-action-btn",onClick:()=>we("ema200"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("circle",{cx:"12",cy:"12",r:"3"}),t("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),t("button",{className:"ema-action-btn open-source-btn",onClick:()=>{ze("ema200"),Re("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:a("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[t("polyline",{points:"16 18 22 12 16 6"}),t("polyline",{points:"8 6 2 12 8 18"})]})})]})]})]}),ee&&t("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:e=>e.stopPropagation(),onMouseMove:e=>e.stopPropagation(),children:a("div",{className:"chart-modal-card",children:[a("div",{className:"chart-modal-header",children:[a("span",{className:"chart-modal-title",children:["\u2699\uFE0F C\xE0i \u0110\u1EB7t Ch\u1EC9 B\xE1o: EMA ",ee==="ema50"?"50":"200"]}),t("button",{className:"chart-modal-close",onClick:()=>we(null),children:"\xD7"})]}),a("div",{className:"chart-modal-body",children:[a("div",{className:"settings-group",children:[t("label",{className:"settings-label",children:"Chu k\u1EF3 (Length)"}),a("div",{className:"settings-input-row",children:[t("input",{type:"number",min:"2",max:"500",className:"settings-number-input",value:Ze,onChange:e=>Qe(Math.max(2,parseInt(e.target.value)||2))}),t("span",{style:{fontSize:"11px",color:"var(--text3)"},children:"(2 - 500 n\u1EBFn)"})]})]}),a("div",{className:"settings-group",style:{marginTop:"12px"},children:[t("label",{className:"settings-label",children:"Ngu\u1ED3n gi\xE1 tr\u1ECB (Source)"}),t("div",{className:"settings-input-row",children:a("select",{className:"settings-select",value:et,onChange:e=>tt(e.target.value),children:[t("option",{value:"close",children:"\u0110\xF3ng c\u1EEDa (Close)"}),t("option",{value:"open",children:"M\u1EDF c\u1EEDa (Open)"}),t("option",{value:"high",children:"Cao nh\u1EA5t (High)"}),t("option",{value:"low",children:"Th\u1EA5p nh\u1EA5t (Low)"})]})})]}),a("div",{className:"settings-group",style:{marginTop:"12px"},children:[t("label",{className:"settings-label",children:"M\xE0u \u0111\u01B0\u1EDDng ch\u1EC9 b\xE1o (Color)"}),t("div",{className:"settings-colors-grid",children:["#FFD700","#00e5ff","#FF1744","#d500f9","#00e676","#ff9100","#ffffff","#787b86"].map(e=>t("div",{className:`settings-color-dot ${Oe===e?"active":""}`,style:{backgroundColor:e},onClick:()=>De(e)},e))}),a("div",{style:{marginTop:"10px",width:"100%"},children:[t("span",{style:{fontSize:"11px",color:"var(--text3)",display:"block",marginBottom:"4px"},children:"M\xE3 m\xE0u HEX t\xF9y ch\u1EC9nh:"}),t("input",{type:"text",className:"settings-number-input",style:{width:"120px"},value:Oe,onChange:e=>De(e.target.value)})]})]})]}),a("div",{className:"chart-modal-footer",children:[t("button",{className:"modal-btn cancel",onClick:()=>we(null),children:"H\u1EE7y b\u1ECF"}),t("button",{className:"modal-btn apply",onClick:eo,children:"\xC1p d\u1EE5ng"})]})]})}),Ie&&(()=>{let e=Ie==="ema50"?be:ue,o=Ie==="ema50"?he:fe,n=`//@version=5
// \xA9 TradingView Pine Script v5
// Ch\u1EC9 b\xE1o Exponential Moving Average (EMA) - B\u1EA3n M\xE3 Ngu\u1ED3n M\u1EDF
indicator("Exponential Moving Average", shorttitle="EMA ${e}", overlay=true)

// C\u1EA5u h\xECnh c\xE1c tham s\u1ED1 \u0111\u1EA7u v\xE0o c\u1EE7a ch\u1EC9 b\xE1o
lengthInput = input.int(${e}, minval=1, title="Length")
sourceInput = input.source(${o}, title="Source")

// H\xE0m t\xEDnh to\xE1n EMA t\xEDch l\u0169y \u0111\u1ED9ng
emaValue = ta.ema(sourceInput, lengthInput)

// V\u1EBD \u0111\u01B0\u1EDDng EMA l\xEAn bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt v\u1EDBi m\xE0u s\u1EAFc l\u1EF1a ch\u1ECDn
plot(emaValue, title="EMA Line", color=color.from_hex("${Ie==="ema50"?ve:ye}"), linewidth=2)`,l=`/**
 * C\xD4NG TH\u1EE8C TO\xC1N H\u1ECCC & L\u1EACP TR\xCCNH T\xCDNH EMA (EXPONENTIAL MOVING AVERAGE)
 * Phi\xEAn b\u1EA3n m\xE3 ngu\u1ED3n m\u1EDF vi\u1EBFt b\u1EB1ng JavaScript/TypeScript cho XAU/USD Gold Terminal.
 * 
 * H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (Smoothing Multiplier) k = 2 / (Length + 1)
 * C\xF4ng th\u1EE9c t\xEDnh n\u1EBFn th\u1EE9 i: 
 *   EMA(i) = Gi\xE1(i) * k + EMA(i-1) * (1 - k)
 */
function calculateEMA(candles, length = ${e}, source = "${o}") {
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
}`;return t("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:i=>i.stopPropagation(),onMouseMove:i=>i.stopPropagation(),children:a("div",{className:"chart-modal-card wide",children:[a("div",{className:"chart-modal-header",children:[a("span",{className:"chart-modal-title",children:["\u{1F4D6} M\xE3 Ngu\u1ED3n M\u1EDF Ch\u1EC9 B\xE1o: EMA ",e," (",o,")"]}),t("button",{className:"chart-modal-close",onClick:()=>ze(null),children:"\xD7"})]}),a("div",{className:"chart-modal-body",children:[a("div",{className:"chart-modal-tabs",children:[t("button",{className:`chart-modal-tab-btn ${ke==="pine"?"active":""}`,onClick:()=>Re("pine"),children:"Pine Script v5 (TradingView)"}),t("button",{className:`chart-modal-tab-btn ${ke==="js"?"active":""}`,onClick:()=>Re("js"),children:"JavaScript / TypeScript"})]}),t("div",{className:"code-container",children:t("pre",{style:{margin:0},children:t("code",{children:ke==="pine"?n:l})})}),a("div",{style:{marginTop:"12px",fontSize:"11.5px",color:"var(--text3)",display:"flex",gap:"6px",alignItems:"flex-start",lineHeight:"1.4"},children:[t("span",{children:"\u{1F4A1}"}),t("span",{children:ke==="pine"?"M\xE3 ngu\u1ED3n Pine Script c\xF3 th\u1EC3 copy v\xE0 d\xE1n tr\u1EF1c ti\u1EBFp v\xE0o m\u1EE5c Pine Editor tr\xEAn trang TradingView c\u1EE7a b\u1EA1n \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng EMA \u0111\u1ED3ng b\u1ED9 100%.":"H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (smoothing multiplier) c\u1EE7a chu k\u1EF3 "+e+" l\xE0 k = 2 / ("+e+" + 1) \u2248 "+(2/(e+1)).toFixed(4)+". \u0110\xE2y l\xE0 thu\u1EADt to\xE1n ti\xEAu chu\u1EA9n ng\xE0nh \u0111\u01B0\u1EE3c t\u1ED1i \u01B0u h\xF3a ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Deno Sandbox."})]})]}),a("div",{className:"chart-modal-footer",children:[t("button",{className:"modal-btn apply",onClick:()=>{navigator.clipboard.writeText(ke==="pine"?n:l),alert("\u0110\xE3 sao ch\xE9p m\xE3 ngu\u1ED3n ch\u1EC9 b\xE1o v\xE0o Clipboard!")},children:"\u{1F4CB} Sao ch\xE9p m\xE3 ngu\u1ED3n"}),t("button",{className:"modal-btn cancel",onClick:()=>ze(null),children:"\u0110\xF3ng"})]})]})})})(),a("div",{className:"chart-badge",style:{display:"flex",alignItems:"center",gap:"10px",pointerEvents:"auto"},children:[a("span",{children:["\u{1F4C8} C\u1EA4U TR\xDAC V\xC0NG ",f==="1D"?"D1":f==="1W"?"W1":f==="1M"?"MN":`M${f}`," (SMC)"]}),t("span",{style:{color:"rgba(255,255,255,0.15)"},children:"|"}),t("button",{onClick:It,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2795 Ph\xF3ng to"}),t("button",{onClick:zt,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2796 Thu nh\u1ECF"}),t("button",{onClick:So,style:{background:"none",border:"none",color:kt?"var(--green)":"var(--yellow)",cursor:"pointer",fontWeight:"bold"},children:kt?"\u25CF TR\u1EF0C TI\u1EBEP":"\u23EE XEM GI\xC1 TR\u1EF0C TI\u1EBEP"})]})]})})}),!re&&a("div",{className:"realtime-panel",style:{height:"100%"},children:[t("div",{className:"panel-tab",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"var(--bg3)",borderBottom:"1px solid var(--border)"},children:t("span",{style:{fontSize:"11.5px",fontWeight:"700",color:"var(--gold)",letterSpacing:"0.5px"},children:"\u{1F4C5} L\u1ECACH KINH T\u1EBE (INVESTING)"})}),t("div",{style:{flex:1,width:"100%",height:"calc(100% - 37px)",overflow:"hidden"},children:t("iframe",{src:"https://sslecal2.investing.com/?ecoTimezone=28&ecoLanguage=52&lang=52&columns=time,currency,importance,event,actual,forecast,previous&features=datepicker,timezone&countryIds=5,72,17,25,32,6,37,43,22,39,35,42,4,36,110,26,12,11,10,38,14&calType=week&timeFrame=today",width:"100%",height:"100%",frameBorder:"0",allowTransparency:"true",marginWidth:0,marginHeight:0,style:{border:"none",filter:"invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(0.95)",background:"transparent"}})})]})]}),c&&!re&&a("div",{className:"signal-dash",children:[a("div",{className:"dash-tabs",children:[t("button",{className:`dash-tab-btn ${Y==="ai"?"active":""}`,onClick:()=>Ve("ai"),children:"\u{1F916} PH\xC2N T\xCDCH A.I"}),t("button",{className:`dash-tab-btn ${Y==="backtest"?"active":""}`,onClick:()=>Ve("backtest"),children:"\u{1F4CA} L\u1ECACH S\u1EEC CH\u1ED0T L\u1EDCI / C\u1EAET L\u1ED6"}),t("button",{className:`dash-tab-btn ${Y==="outlook"?"active":""}`,onClick:()=>Ve("outlook"),children:"\u{1F4CB} NH\u1EACN \u0110\u1ECANH TH\u1ECA TR\u01AF\u1EDCNG"})]}),Y==="ai"&&c&&c.advancedAnalysis&&a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[c?.signals?.suggestion&&a("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",borderTop:`4px solid ${c.signals.suggestion.position==="BUY"?"var(--green)":c.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)"}`,boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"16px"},children:[a("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[a("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[t("span",{style:{fontSize:"20px"},children:"\u{1F3AF}"}),a("div",{children:[t("h2",{style:{fontSize:"16px",fontWeight:"800",color:"#fff",margin:0,letterSpacing:"0.5px"},children:"K\u1EBE HO\u1EA0CH GIAO D\u1ECACH & BI\u1EC6N GI\u1EA2I CHUY\xCAN S\xC2U A.I"}),t("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"H\u1EE3p l\u01B0u 3 ph\u01B0\u01A1ng ph\xE1p ti\xEAu chu\u1EA9n: SMC + Price Action + M\xF4 h\xECnh n\u1EBFn \u0111\u1EA3o chi\u1EC1u"})]})]}),t("span",{style:{fontSize:"11px",fontWeight:"bold",textTransform:"uppercase",padding:"4px 10px",borderRadius:"6px",background:c.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.12)":c.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.12)":"rgba(255, 171, 0, 0.12)",color:c.signals.suggestion.position==="BUY"?"var(--green)":c.signals.suggestion.position==="SELL"?"var(--red)":"var(--yellow)",border:`1px solid ${c.signals.suggestion.position==="BUY"?"rgba(0, 230, 118, 0.25)":c.signals.suggestion.position==="SELL"?"rgba(255, 23, 68, 0.25)":"rgba(255, 171, 0, 0.25)"}`},children:c.signals.suggestion.position==="BUY"?"\u{1F402} KHUY\u1EBEN NGH\u1ECA MUA (BUY)":c.signals.suggestion.position==="SELL"?"\u{1F43B} KHUY\u1EBEN NGH\u1ECA B\xC1N (SELL)":"\u{1F7E1} CH\u1EDC \u0110\u1EE2I (NEUTRAL)"})]}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"12px",background:"rgba(255, 255, 255, 0.02)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255, 255, 255, 0.04)"},children:[a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[t("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"\u0110I\u1EC2M V\xC0O (ENTRY)"}),a("strong",{style:{fontSize:"14px",color:"var(--gold)",fontFamily:"monospace"},children:["$",c.signals.suggestion.entry.toFixed(2)]})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[t("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"C\u1EAET L\u1ED6 (SL)"}),t("strong",{style:{fontSize:"14px",color:"var(--red)",fontFamily:"monospace"},children:c.signals.suggestion.stopLoss>0?`$${c.signals.suggestion.stopLoss.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[t("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 1 (TP1)"}),t("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:c.signals.suggestion.takeProfit1>0?`$${c.signals.suggestion.takeProfit1.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[t("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 2 (TP2)"}),t("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:c.signals.suggestion.takeProfit2>0?`$${c.signals.suggestion.takeProfit2.toFixed(2)}`:"V\xD4 HI\u1EC6U H\xD3A"})]})]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 171, 0, 0.02)",borderLeft:"4px solid var(--gold)",border:"1px solid rgba(255, 171, 0, 0.05)",borderLeftWidth:"4px"},children:[t("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:t("span",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F4E5} BI\u1EC6N GI\u1EA2I \u0110I\u1EC2M V\xC0O L\u1EC6NH (ENTRY RATIONALE)"})}),t("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.entryReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u th\u1ECB tr\u01B0\u1EDDng..."})]}),a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 23, 68, 0.02)",borderLeft:"4px solid var(--red)",border:"1px solid rgba(255, 23, 68, 0.05)",borderLeftWidth:"4px"},children:[t("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:t("span",{style:{color:"var(--red)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F6E1}\uFE0F BI\u1EC6N GI\u1EA2I PH\xD2NG V\u1EC6 C\u1EAET L\u1ED6 (SL RATIONALE)"})}),t("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.slReason||"\u0110ang ph\xE2n t\xEDch d\u1EEF li\u1EC7u b\u1EA3o v\u1EC7 v\u1ECB th\u1EBF..."})]}),a("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(0, 230, 118, 0.02)",borderLeft:"4px solid var(--green)",border:"1px solid rgba(0, 230, 118, 0.05)",borderLeftWidth:"4px"},children:[t("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:t("span",{style:{color:"var(--green)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F3AF} BI\u1EC6N GI\u1EA2I CH\u1ED0T L\u1EDCI M\u1EE4C TI\xCAU (TP RATIONALE)"})}),t("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:c.signals.suggestion.tpReason||"\u0110ang ph\xE2n t\xEDch m\u1EE5c ti\xEAu thanh kho\u1EA3n..."})]})]})]}),a("div",{className:"reasons",style:{background:"rgba(255, 171, 0, 0.02)",borderColor:"rgba(255, 171, 0, 0.1)",margin:0},children:[t("h3",{children:"\u26A0\uFE0F Tuy\xEAn b\u1ED1 mi\u1EC5n tr\u1EEB tr\xE1ch nhi\u1EC7m"}),t("div",{style:{fontSize:"12px",color:"var(--text2)",lineHeight:"1.6"},children:"V\xE0ng (Gold spot) l\xE0 m\u1ED9t trong nh\u1EEFng t\xE0i s\u1EA3n t\xE0i ch\xEDnh c\xF3 \u0111\u1ED9 bi\u1EBFn \u0111\u1ED9ng v\xE0 \u0111\xF2n b\u1EA9y l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi. C\xE1c ph\xE2n t\xEDch k\u1EF9 thu\u1EADt, x\xE1c xu\u1EA5t v\xE0 g\u1EE3i \xFD v\xE0o l\u1EC7nh hi\u1EC3n th\u1ECB tr\xEAn h\u1EC7 th\u1ED1ng ch\u1EC9 mang t\xEDnh ch\u1EA5t tham kh\u1EA3o d\u1EF1a tr\xEAn thu\u1EADt to\xE1n t\xEDch l\u0169y. Kh\xF4ng c\u1EA5u th\xE0nh l\u1EDDi khuy\xEAn \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh ch\xEDnh th\u1EE9c. Vui l\xF2ng t\u1EF1 qu\u1EA3n tr\u1ECB v\u1ED1n nghi\xEAm ng\u1EB7t!"})]})]}),Y==="backtest"&&c&&a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[a("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"20px"},children:[t("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px",flexWrap:"wrap",gap:"12px"},children:a("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[t("span",{style:{fontSize:"20px"},children:"\u{1F4CA}"}),a("div",{children:[t("h2",{style:{fontSize:"16px",fontWeight:"800",color:"var(--gold)",margin:0,letterSpacing:"0.5px"},children:"NH\u1EACT K\xDD & L\u1ECACH S\u1EEC GIAO D\u1ECACH A.I BACKTEST"}),t("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"Hi\u1EC7u su\u1EA5t ki\u1EC3m th\u1EED chi\u1EBFn l\u01B0\u1EE3c tr\xEAn d\u1EEF li\u1EC7u n\u1EBFn bi\u1EC3u \u0111\u1ED3 th\u1EDDi gian th\u1EF1c"})]})]})}),a("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[a("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[t("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"Khung th\u1EDDi gian:"}),t("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:["ALL","M1","M5","M15","H1","D1"].map(e=>t("button",{onClick:()=>Gt(e),style:{background:J===e?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${J===e?"var(--gold)":"var(--border)"}`,color:J===e?"var(--gold)":"var(--text2)",padding:"4px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:e==="ALL"?"\u{1F30D} T\u1EA4T C\u1EA2":`\u26A1 ${e}`},e))})]}),a("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[t("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"L\u1ECDc ng\xE0y giao d\u1ECBch:"}),t("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{value:"TODAY",label:"\u{1F4C5} H\xF4m nay"},{value:"YESTERDAY",label:"\u{1F4C5} H\xF4m qua"},{value:"ALL",label:"\u{1F310} T\u1EA5t c\u1EA3 c\xE1c ng\xE0y"}].map(e=>t("button",{onClick:()=>Yt(e.value),style:{background:ne===e.value?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${ne===e.value?"var(--gold)":"var(--border)"}`,color:ne===e.value?"var(--gold)":"var(--text2)",padding:"4px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:e.label},e.value))})]})]}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginTop:"4px"},children:[a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[t("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1ED5ng l\u1EC7nh ch\u1ED1t"}),t("strong",{style:{fontSize:"20px",color:"#fff",fontFamily:"monospace"},children:ie.total})]}),a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[t("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1EF7 L\u1EC7 Th\u1EAFng (Win Rate)"}),t("strong",{style:{fontSize:"20px",color:ie.winRate>=50?"var(--green)":"var(--yellow)",fontFamily:"monospace"},children:`${ie.winRate}%`})]}),a("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[t("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"Pips R\xF2ng t\xEDch l\u0169y"}),t("strong",{style:{fontSize:"20px",color:ie.netPips>=0?"var(--green)":"var(--red)",fontFamily:"monospace"},children:`${ie.netPips>=0?"+":""}${ie.netPips} pips`})]})]})]}),a("div",{className:"smc-card",style:{margin:0},children:[t("h3",{className:"smc-card-title",children:"\u{1F4CB} Nh\u1EADt K\xFD Giao D\u1ECBch Ch\u1ED1t L\u1EDDi / C\u1EAFt L\u1ED7 Chi Ti\u1EBFt"}),t("div",{className:"smc-table-wrap",children:a("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"12px"},children:[t("thead",{children:a("tr",{style:{borderBottom:"1px solid var(--border)",color:"var(--text2)",background:"rgba(255,255,255,0.01)"},children:[t("th",{style:{padding:"12px",fontWeight:"bold"},children:"M\xE3 l\u1EC7nh (ID)"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Khung gi\u1EDD"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Lo\u1EA1i l\u1EC7nh"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 kh\u1EDBp (Entry)"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"C\u1EAFt L\u1ED7 (SL)"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 1 (TP1)"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 2 (TP2)"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 \u0111\xF3ng"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"K\u1EBFt qu\u1EA3"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Pips r\xF2ng"}),t("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\u1EDD \u0111\xF3ng"})]})}),t("tbody",{children:K.length>0?(()=>{let e="";return K.map((o,r)=>{let n=Me(o.closeTime),l=e!==n;return l&&(e=n),a(To.Fragment,{children:[l&&t("tr",{style:{background:"rgba(255, 215, 0, 0.04)"},children:a("td",{colSpan:11,style:{padding:"8px 12px",color:"var(--gold)",fontWeight:"bold",letterSpacing:"0.5px"},children:["\u{1F4C5} L\u1EC6NH \u0110\xC3 \u0110\xD3NG NG\xC0Y: ",n]})}),a("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.03)",background:r%2===0?"rgba(255,255,255,0.005)":"transparent"},children:[t("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--text2)"},children:o.id}),t("td",{style:{padding:"10px 12px"},children:t("span",{className:"smc-badge active",style:{fontSize:"10.5px"},children:o.timeframe})}),t("td",{style:{padding:"10px 12px"},children:t("span",{className:`smc-badge ${o.position==="BUY"?"bullish":"bearish"}`,style:{fontSize:"10.5px"},children:o.position})}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace"},children:["$",o.entry.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--red)"},children:["$",o.stopLoss.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)"},children:["$",o.takeProfit1.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)",opacity:.9},children:["$",o.takeProfit2.toFixed(2)]}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:o.status==="SL"?"var(--red)":"var(--green)"},children:["$",(o.status==="SL"?o.stopLoss:o.status==="TP1"?o.takeProfit1:o.takeProfit2).toFixed(2)]}),t("td",{style:{padding:"10px 12px"},children:t("span",{className:`smc-badge ${o.status==="SL"?"bearish":"bullish"}`,style:{fontSize:"10.5px",background:o.status==="SL"?"rgba(255, 23, 68, 0.15)":"rgba(0, 230, 118, 0.15)",color:o.status==="SL"?"var(--red)":"var(--green)",border:`1.5px solid ${o.status==="SL"?"var(--red)":"var(--green)"}`},children:o.status==="SL"?"STOP LOSS":o.status==="TP1"?"TAKE PROFIT 1":"TAKE PROFIT 2"})}),a("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:o.pips>=0?"var(--green)":"var(--red)"},children:[o.pips>=0?"+":"",o.pips," pips"]}),t("td",{style:{padding:"10px 12px",color:"var(--text3)"},children:new Date(o.closeTime).toLocaleTimeString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",hour:"2-digit",minute:"2-digit"})})]})]},`trade-row-${o.id}-${r}`)})})():t("tr",{children:a("td",{colSpan:11,style:{padding:"20px",textAlign:"center",color:"var(--text3)"},children:["Kh\xF4ng c\xF3 l\u1ECBch s\u1EED giao d\u1ECBch n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn cho khung th\u1EDDi gian ",J,"!"]})})})]})})]})]}),Y==="outlook"&&c?.marketOutlook&&(()=>{let e=c.marketOutlook;return a("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[a("div",{className:"outlook-banner",style:{borderTop:"4px solid var(--gold)"},children:[a("div",{children:[t("span",{style:{fontSize:"11px",textTransform:"uppercase",color:"var(--text3)",letterSpacing:"1.5px",fontWeight:"bold"},children:"H\u1EC6 TH\u1ED0NG PH\xC2N T\xCDCH H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT H\xC0NG NG\xC0Y"}),t("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",margin:"6px 0",letterSpacing:"0.5px"},children:"XAU/USD GOLD SPOT"}),a("span",{style:{fontSize:"12px",color:"var(--text2)"},children:["Th\u1EDDi gian c\u1EADp nh\u1EADt: ",t("strong",{style:{color:"var(--gold)"},children:e.date})," | Khung \u0111\u1ED3 th\u1ECB: ",t("strong",{children:e.timeframe})]})]}),t("div",{style:{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"},children:a("div",{style:{textAlign:"right"},children:[t("span",{style:{fontSize:"10px",color:"var(--text3)",display:"block",textTransform:"uppercase",fontWeight:"bold",marginBottom:"2px"},children:"Xu h\u01B0\u1EDBng ch\u1EE7 \u0111\u1EA1o"}),t("span",{className:e.synthesizedOutlook.bias==="BUY"?"outlook-badge-buy":e.synthesizedOutlook.bias==="SELL"?"outlook-badge-sell":"outlook-badge-hold",style:{display:"inline-block"},children:e.synthesizedOutlook.bias==="BUY"?"\u{1F7E2} MUA CH\u1EE6 \u0110\u1EA0O (BUY)":e.synthesizedOutlook.bias==="SELL"?"\u{1F534} B\xC1N CH\u1EE6 \u0110\u1EA0O (SELL)":"\u{1F7E1} \u0110\u1EE8NG NGO\xC0I (HOLD)"})]})})]}),a("div",{className:"outlook-summary-box",style:{margin:0,padding:"30px",borderLeft:"5px solid var(--gold)"},children:[t("h3",{style:{fontSize:"16px",color:"var(--gold)",margin:"0 0 16px 0",borderBottom:"1.5px solid var(--border)",paddingBottom:"12px",display:"flex",alignItems:"center",gap:"10px",fontWeight:"800",letterSpacing:"0.5px"},children:"\u{1F4DD} NH\u1EACN \u0110\u1ECANH T\u1ED4NG QUAN TRONG NG\xC0Y (DOW + SMC + PRICE ACTION)"}),t("p",{style:{fontSize:"14.5px",color:"#fff",lineHeight:"1.85",margin:"0 0 26px 0",textAlign:"justify",fontWeight:"400",opacity:"0.95"},children:e.synthesizedOutlook.summary}),t("h4",{style:{fontSize:"11px",color:"var(--text3)",margin:"0 0 12px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold"},children:"\u{1F4CA} H\u1EC6 TH\u1ED0NG CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT:"}),a("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"26px"},className:"outlook-grid",children:[a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[t("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F4C8} L\xDD THUY\u1EBET DOW (H1)"}),a("strong",{style:{display:"block",fontSize:"14px",color:e.trendDow.primary==="T\u0102NG"?"var(--green)":e.trendDow.primary==="GI\u1EA2M"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["Xu h\u01B0\u1EDBng: ",e.trendDow.primary]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["S\xF3ng c\u1EA5p 2: ",e.trendDow.secondary]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{children:["Kh\xE1ng c\u1EF1 ch\xEDnh: ",a("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",e.trendDow.keyLevels[0]?.price?e.trendDow.keyLevels[0].price.toFixed(1):"\u2014"]})]}),a("div",{children:["H\u1ED7 tr\u1EE3 ch\xEDnh: ",a("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",e.trendDow.keyLevels[1]?.price?e.trendDow.keyLevels[1].price.toFixed(1):"\u2014"]})]})]})]}),a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[t("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F3DB}\uFE0F SMART MONEY CONCEPTS"}),a("strong",{style:{display:"block",fontSize:"14px",color:"#fff",marginTop:"6px"},children:["C\u1EA5u tr\xFAc: ",e.smcAnalysis.marketStructure]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["Kh\u1ED1i C\u1EA7u/Cung: ",e.smcAnalysis.keyOrderBlocks.length," OB ho\u1EA1t \u0111\u1ED9ng"]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{children:["Kho\u1EA3ng FVG H1: ",t("strong",{style:{color:"#80deea",fontFamily:"monospace"},children:e.smcAnalysis.fvgs[0]?.gap||"\u0110\xE3 l\u1EA5p h\u1EBFt"})]}),a("div",{children:["C\u1EA3n OB Cung: ",t("strong",{style:{color:"var(--red)",fontFamily:"monospace"},children:e.smcAnalysis.keyOrderBlocks.find(o=>o.type.includes("BEARISH"))?.priceRange||"Kh\xF4ng c\xF3"})]})]})]}),a("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[t("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F56F}\uFE0F PRICE ACTION & T\xC2M L\xDD"}),a("strong",{style:{display:"block",fontSize:"14px",color:e.priceAction.sentiment==="T\xCDCH C\u1EF0C"?"var(--green)":e.priceAction.sentiment==="TI\xCAU C\u1EF0C"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["T\xE2m l\xFD n\u1EBFn: ",e.priceAction.sentiment]}),a("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["N\u1EBFn \u0111\u1EB7c tr\u01B0ng: ",e.priceAction.recentPatterns[0]?.split(":")[0]||"Kh\xF4ng c\xF3"]}),a("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[a("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn g\u1EA7n nh\u1EA5t: ",t("strong",{children:e.priceAction.recentPatterns[0]?.split(":")[0]||"Trung l\u1EADp"})]}),a("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn li\u1EC1n k\u1EC1: ",t("strong",{children:e.priceAction.recentPatterns[1]?.split(":")[0]||"Trung l\u1EADp"})]})]})]})]}),a("div",{style:{background:"linear-gradient(135deg, rgba(255, 171, 0, 0.05) 0%, rgba(7, 9, 14, 0.6) 100%)",border:"1.5px dashed var(--gold)",borderRadius:"14px",padding:"22px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.2)"},children:[t("h4",{style:{fontSize:"12px",color:"var(--gold)",margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"6px"},children:"\u26A1 K\u1EBE HO\u1EA0CH GIAO D\u1ECACH H\u1EE2P L\u01AFU CHI TI\u1EBET TRONG NG\xC0Y"}),a("p",{style:{fontSize:"14px",color:"#fff",fontWeight:"700",lineHeight:"1.6",margin:"0"},children:["\u{1F449} ",e.priceAction.actionableAdvice]})]})]})]})})()]})]})]})]}):t("div",{className:"auth-container",children:a("div",{className:"auth-card",children:[a("div",{className:"auth-header",style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[t("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"110px",height:"110px",borderRadius:"14px",marginBottom:"16px",filter:"drop-shadow(0 0 20px rgba(255, 171, 0, 0.5))"}}),t("h1",{className:"auth-title",children:"XAU/USD GOLD PRO"}),t("p",{className:"auth-subtitle",children:"H\u1EC7 th\u1ED1ng T\xEDn hi\u1EC7u & \u0110\u1ED3 th\u1ECB th\xF4ng minh"})]}),ht&&a("div",{className:"auth-alert error",children:[t("span",{children:"\u26A0\uFE0F"}),t("div",{children:ht})]}),ft&&a("div",{className:"auth-alert success",children:[t("span",{children:"\u2705"}),t("div",{children:ft})]}),Ke==="login"&&a(Ye,{children:[a("div",{className:"auth-tabs",children:[t("button",{className:"auth-tab-btn active",children:"\u0110\u0102NG NH\u1EACP"}),t("button",{className:"auth-tab-btn",onClick:()=>{Z("register"),k(null),L(null)},children:"\u0110\u0102NG K\xDD"})]}),a("form",{className:"auth-form",onSubmit:oo,children:[a("div",{className:"auth-field",children:[t("label",{className:"auth-label",children:"\u0110\u1ECBa ch\u1EC9 Email"}),t("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:$,onChange:e=>_e(e.target.value),required:!0})]}),a("div",{className:"auth-field",children:[t("label",{className:"auth-label",children:"M\u1EADt kh\u1EA9u"}),t("input",{type:"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:Q,onChange:e=>qe(e.target.value),required:!0})]}),t("button",{type:"submit",className:"auth-submit-btn",disabled:le,children:le?"\u0110ang x\xE1c th\u1EF1c...":"M\u1EDE KH\xD3A TERMINAL \u{1F513}"})]})]}),Ke==="register"&&a(Ye,{children:[a("div",{className:"auth-tabs",children:[t("button",{className:"auth-tab-btn",onClick:()=>{Z("login"),k(null),L(null)},children:"\u0110\u0102NG NH\u1EACP"}),t("button",{className:"auth-tab-btn active",children:"\u0110\u0102NG K\xDD"})]}),a("form",{className:"auth-form",onSubmit:ao,children:[a("div",{className:"auth-field",children:[t("label",{className:"auth-label",children:"\u0110\u1ECBa ch\u1EC9 Email th\u1EF1c t\u1EBF"}),t("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:$,onChange:e=>_e(e.target.value),required:!0})]}),a("div",{className:"auth-field",children:[t("label",{className:"auth-label",children:"M\u1EADt kh\u1EA9u (t\u1EEB 6 k\xFD t\u1EF1)"}),t("input",{type:"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:Q,onChange:e=>qe(e.target.value),required:!0})]}),t("button",{type:"submit",className:"auth-submit-btn",disabled:le,children:le?"\u0110ang \u0111\u0103ng k\xFD & g\u1EEDi OTP...":"\u0110\u0102NG K\xDD & G\u1EECI OTP \u2709\uFE0F"})]})]}),Ke==="otp"&&a("div",{className:"auth-otp-wrap",children:[a("div",{style:{textAlign:"center",color:"var(--text2)",fontSize:"13.5px"},children:["Vui l\xF2ng nh\u1EADp m\xE3 OTP 6 s\u1ED1 \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi h\xF2m th\u01B0:",t("br",{}),t("strong",{style:{color:"var(--gold)"},children:$})]}),a("form",{className:"auth-form",style:{width:"100%"},onSubmit:ro,children:[a("div",{className:"auth-field",children:[t("label",{className:"auth-label",style:{textAlign:"center"},children:"M\xC3 X\xC1C TH\u1EF0C OTP"}),t("input",{type:"text",maxLength:6,className:"auth-otp-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022",value:Ce,onChange:e=>Ae(e.target.value.replace(/\D/g,"")),required:!0})]}),t("button",{type:"submit",className:"auth-submit-btn",disabled:le||Ce.length!==6,children:le?"\u0110ang ki\u1EC3m tra...":"K\xCDCH HO\u1EA0T T\xC0I KHO\u1EA2N \u{1F680}"})]}),Je&&a("div",{style:{background:"rgba(255, 171, 0, 0.08)",border:"1px dashed var(--gold)",borderRadius:"8px",padding:"12px",marginTop:"12px",fontSize:"12.5px",color:"var(--text)",textAlign:"center",lineHeight:"1.5"},children:[t("div",{style:{fontWeight:"bold",color:"var(--gold)",marginBottom:"4px"},children:"\u{1F916} PH\xC1T HI\u1EC6N CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M"}),"M\xE1y ch\u1EE7 ch\u01B0a c\u1EA5u h\xECnh Email API trong t\u1EC7p ",t("code",{style:{color:"var(--yellow)",fontFamily:"monospace"},children:".env"}),".",a("div",{style:{margin:"8px 0"},children:["M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ",t("strong",{style:{color:"var(--green)",fontSize:"16px",fontFamily:"monospace",letterSpacing:"1px"},children:Je})]}),t("span",{onClick:()=>Ae(Je),style:{background:"rgba(0, 230, 118, 0.15)",color:"var(--green)",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",cursor:"pointer",fontWeight:"bold",display:"inline-block",border:"1px solid rgba(0, 230, 118, 0.3)"},children:"\u26A1 T\u1EF0 \u0110\u1ED8NG \u0110I\u1EC0N M\xC3 OTP"}),a("div",{style:{fontSize:"10.5px",color:"var(--text3)",marginTop:"8px"},children:["\u0110\u1EC3 g\u1EEDi email th\u1EADt v\u1EC1 h\xF2m th\u01B0, vui l\xF2ng c\u1EA5u h\xECnh SMTP ho\u1EB7c Resend API trong t\u1EC7p ",t("strong",{style:{color:"#fff"},children:".env"})," \u1EDF th\u01B0 m\u1EE5c d\u1EF1 \xE1n v\xE0 kh\u1EDFi \u0111\u1ED9ng l\u1EA1i server."]})]}),t("div",{className:"auth-resend",children:se>0?a("span",{children:["G\u1EEDi l\u1EA1i m\xE3 sau ",Math.floor(se/60),":",(se%60).toString().padStart(2,"0")]}):a("span",{children:["Kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c email? ",t("span",{onClick:no,children:"B\u1EA5m g\u1EEDi l\u1EA1i OTP"})]})}),t("div",{className:"auth-link",onClick:()=>{Z("login"),k(null),L(null),_("")},children:"\u2190 Quay l\u1EA1i trang \u0110\u0103ng nh\u1EADp"})]})]})})}var Dt=`
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
`;var Ht=document.createElement("style");Ht.textContent=Dt;document.head.appendChild(Ht);var Co=Lo(document.getElementById("root"));Co.render(Mo(ct));
