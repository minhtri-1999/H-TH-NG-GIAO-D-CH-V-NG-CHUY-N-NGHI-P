import{createRoot as qa}from"https://esm.sh/react-dom@18.2.0/client";import{createElement as Ja}from"https://esm.sh/react@18.2.0";import _a,{useState as p,useEffect as z,useRef as U,useMemo as D}from"https://esm.sh/react@18.2.0";import{Fragment as K,jsx as e,jsxs as o}from"https://esm.sh/react@18.2.0/jsx-runtime";function Ka({timeframe:d}){let tt=U(null);return z(()=>{if(!tt.current)return;tt.current.innerHTML="";let C="60";d==="1"?C="1":d==="5"?C="5":d==="15"?C="15":d==="60"?C="60":d==="1D"?C="D":d==="1W"?C="W":d==="1M"&&(C="M");let q=document.createElement("script");q.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",q.type="text/javascript",q.async=!0,q.innerHTML=JSON.stringify({autosize:!0,symbol:"FOREXCOM:XAUUSD",interval:C,timezone:"Asia/Ho_Chi_Minh",theme:"dark",style:"1",locale:"vi",enable_publishing:!1,allow_symbol_change:!0,calendar:!0,hide_side_toolbar:!1,studies:[{id:"MAExp@tv-basicstudies",inputs:{length:50}},{id:"MAExp@tv-basicstudies",inputs:{length:200}}],support_host:"https://www.tradingview.com"}),tt.current.appendChild(q)},[d]),e("div",{className:"tradingview-widget-container",ref:tt,style:{height:"100%",width:"100%"},children:e("div",{className:"tradingview-widget-container__widget",style:{height:"100%",width:"100%"}})})}var Wt=d=>{let C=new Date(d+252e5),q=C.getUTCFullYear(),pt=String(C.getUTCMonth()+1).padStart(2,"0");return`${String(C.getUTCDate()).padStart(2,"0")}/${pt}/${q}`};function Le(){let[d,tt]=p("5"),[C,q]=p("tradingview"),[pt,ea]=p(!1),[u,Me]=p(null),[aa,Ce]=p(!0),[Ae,re]=p(null),[Y,oa]=p(()=>{let t=localStorage.getItem("active_dash_tab");return t==="ai"||t==="backtest"||t==="outlook"?t:"ai"}),Gt=t=>{oa(t),localStorage.setItem("active_dash_tab",t)},[Ie,ne]=p([]),[Qa,to]=p(!1),[nt,ra]=p(()=>localStorage.getItem("backtest_timeframe_filter")||"ALL"),na=t=>{ra(t),localStorage.setItem("backtest_timeframe_filter",t)},[ct,ia]=p(()=>localStorage.getItem("backtest_selected_day")||"ALL"),sa=t=>{ia(t),localStorage.setItem("backtest_selected_day",t)},et=D(()=>{let t=[...Ie].sort((n,l)=>l.closeTime-n.closeTime),a=Wt(Date.now()),r=Wt(Date.now()-864e5);return ct==="TODAY"?t=t.filter(n=>Wt(n.closeTime)===a):ct==="YESTERDAY"&&(t=t.filter(n=>Wt(n.closeTime)===r)),nt==="ALL"?t:t.filter(n=>n.timeframe.toUpperCase()===nt.toUpperCase())},[Ie,nt,ct]),gt=D(()=>{if(et.length===0)return{winRate:0,netPips:0,totalProfit:0,total:0};let t=et.length,a=et.filter(s=>s.status==="TP1"||s.status==="TP2").length,r=Math.round(a/t*100),n=Number(et.reduce((s,i)=>s+(Number(i.pips)||0),0).toFixed(1)),l=Number(et.reduce((s,i)=>s+(Number(i.profitUsd)||0),0).toFixed(2));return{winRate:r,netPips:n,totalProfit:l,total:t}},[et]),ie=async(t=!1)=>{try{let a=await fetch("/api/backtest/history");if(a.ok){let r=await a.json();r.success&&r.trades&&ne(r.trades)}}catch(a){console.error("Error fetching backtest history:",a)}},eo=async()=>{try{let t=await fetch("/api/backtest/reset",{method:"POST"});if(t.ok){let a=await t.json();a.success&&a.trades&&ne(a.trades)}else alert("L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 l\u1EA1i d\u1EEF li\u1EC7u n\u1EBFn.")}catch(t){alert("L\u1ED7i h\u1EC7 th\u1ED1ng: "+t.message)}},[H,ut]=p(null),[la,ze]=p(!1),[se,it]=p("login"),[J,le]=p(""),[X,de]=p(""),[st,at]=p(""),[Ee,L]=p(null),[Pe,A]=p(null),[_,Ft]=p(0),[xt,bt]=p(!1),[pe,ot]=p(""),[mt,$t]=p(!1),Nt=U([]),[W,Lt]=p(()=>{let t=localStorage.getItem("ai_active_trades");return t?JSON.parse(t):{}}),[Yt,ce]=p(!1),[Vt,ge]=p(0),[da,ht]=p(""),[Mt,Re]=p(()=>localStorage.getItem("ai_analysis_triggered")==="true");z(()=>{localStorage.setItem("ai_active_trades",JSON.stringify(W))},[W]),z(()=>{localStorage.setItem("ai_analysis_triggered",String(Mt))},[Mt]);let[ft,pa]=p(!0),[vt,ca]=p(!0),[Ct,ga]=p(50),[At,ua]=p(200),[It,xa]=p("close"),[zt,ba]=p("close"),[Et,ma]=p("#FFD700"),[Pt,ha]=p("#FF1744"),[ao,oo]=p(!1),[ro,no]=p(!1),[io,so]=p(!1),[lo,po]=p(!1),[co,go]=p(!1),[lt,Rt]=p(null),[jt,Xt]=p(null),[Dt,_t]=p("pine"),[ue,xe]=p(50),[be,me]=p("close"),[Kt,qt]=p("#FFD700");z(()=>{lt==="ema50"?(xe(Ct),me(It),qt(Et)):lt==="ema200"&&(xe(At),me(zt),qt(Pt))},[lt]);let fa=()=>{lt==="ema50"?(ga(ue),xa(be),ma(Kt)):lt==="ema200"&&(ua(ue),ba(be),ha(Kt)),Rt(null)},va=async()=>{try{ze(!0);let t=await fetch("/api/auth/me");if(t.ok){let a=await t.json();a.authenticated&&a.email?ut({email:a.email}):ut(null)}else ut(null)}catch(t){console.error("Session check error:",t),ut(null)}finally{ze(!1)}};z(()=>{va()},[]),z(()=>{H&&ie(!1)},[H]),z(()=>{if(H&&(Y==="ai"||Y==="backtest")){ie(!0);let t=setInterval(()=>{ie(!1)},5e3);return()=>clearInterval(t)}},[Y,H]),z(()=>{if(_<=0)return;let t=setInterval(()=>{Ft(a=>a-1)},1e3);return()=>clearInterval(t)},[_]);let ya=async t=>{if(t.preventDefault(),!J||!X){L("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}bt(!0),L(null),A(null);try{let a=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:J,password:X})}),r=await a.json();if(!a.ok){a.status===403&&r.needsVerification?(it("otp"),Ft(300),r.isSimulator&&r.otp?(ot(r.otp),A(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(ot(""),A(r.error||"T\xE0i kho\u1EA3n ch\u01B0a k\xEDch ho\u1EA1t. M\u1ED9t m\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email."))):L(r.error||"\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i.");return}r.success&&(ut({email:r.user.email}),A("\u0110\u0103ng nh\u1EADp th\xE0nh c\xF4ng!"))}catch(a){L("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{bt(!1)}},wa=async t=>{if(t.preventDefault(),!J||!X){L("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 email v\xE0 m\u1EADt kh\u1EA9u.");return}if(X.length<6){L("M\u1EADt kh\u1EA9u ph\u1EA3i ch\u1EE9a \xEDt nh\u1EA5t 6 k\xFD t\u1EF1.");return}bt(!0),L(null),A(null);try{let a=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:J,password:X})}),r=await a.json();if(!a.ok){L(r.error||"\u0110\u0103ng k\xFD th\u1EA5t b\u1EA1i.");return}r.success&&(it("otp"),Ft(300),r.isSimulator&&r.otp?(ot(r.otp),A(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: Ch\u01B0a c\u1EA5u h\xECnh Email API. M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${r.otp}`)):(ot(""),A(r.message||"\u0110\u0103ng k\xFD th\xE0nh c\xF4ng! Vui l\xF2ng nh\u1EADp m\xE3 OTP g\u1EEDi t\u1EDBi email.")))}catch(a){L("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{bt(!1)}},ka=async t=>{if(t.preventDefault(),!st){L("Vui l\xF2ng nh\u1EADp m\xE3 OTP.");return}bt(!0),L(null),A(null);try{let a=await fetch("/api/auth/verify-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:J,otp:st})}),r=await a.json();if(!a.ok){L(r.error||"X\xE1c th\u1EF1c OTP th\u1EA5t b\u1EA1i.");return}r.success&&(it("login"),at(""),ot(""),A("K\xEDch ho\u1EA1t t\xE0i kho\u1EA3n th\xE0nh c\xF4ng! B\xE2y gi\u1EDD b\u1EA1n c\xF3 th\u1EC3 \u0111\u0103ng nh\u1EADp."))}catch(a){L("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+a.message)}finally{bt(!1)}},Sa=async()=>{if(!(_>0)){L(null),A(null);try{let t=await fetch("/api/auth/resend-otp",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:J})}),a=await t.json();if(!t.ok){L(a.error||"G\u1EEDi l\u1EA1i OTP th\u1EA5t b\u1EA1i.");return}a.success&&(Ft(300),a.isSimulator&&a.otp?(ot(a.otp),A(`\u26A0\uFE0F [CH\u1EBE \u0110\u1ED8 TH\u1EEC NGHI\u1EC6M]: M\xE3 OTP c\u1EE7a b\u1EA1n l\xE0: ${a.otp}`)):(ot(""),A(a.message||"M\xE3 OTP m\u1EDBi \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 email c\u1EE7a b\u1EA1n.")))}catch(t){L("L\u1ED7i k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7: "+t.message)}}},Ta=async()=>{try{await fetch("/api/auth/logout",{method:"POST"}),ut(null),Me(null),Jt(4500),Zt(0),it("login"),le(""),de(""),at(""),L(null),A(null),Lt({}),ce(!1),ge(0),ht(""),Re(!1),localStorage.removeItem("ai_active_trades"),localStorage.removeItem("ai_analysis_triggered")}catch(t){console.error("Logout error",t)}},he=()=>{if(Yt)return;ce(!0),ge(5),ht("\u{1F50D} \u0110ang k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7, t\u1EA3i d\u1EEF li\u1EC7u n\u1EBFn V\xE0ng Spot XAU/USD...");let t=5,a=setInterval(()=>{t--,ge(t),t===4?(ht("\u{1F4CA} \u0110ang ph\xE2n t\xEDch c\u1EA5u tr\xFAc th\u1ECB tr\u01B0\u1EDDng SMC (BOS, CHoCH, Order Block, FVG)..."),I("info")):t===3?(ht("\u{1F4C8} \u0110ang x\xE1c \u0111\u1ECBnh c\u1EA5u tr\xFAc Price Action & c\xE1c v\xF9ng qu\xE9t thanh kho\u1EA3n (Liquidity Sweep)..."),I("info")):t===2?(ht("\u{1F56F}\uFE0F \u0110ang nh\u1EADn di\u1EC7n c\xE1c m\xF4 h\xECnh n\u1EBFn \u0111\u1EA3o chi\u1EC1u c\u01B0\u1EDDng \u0111\u1ED9 cao (Pinbar, Engulfing)..."),I("info")):t===1?(ht("\u{1F916} A.I \u0111ang t\u1ED1i \u01B0u h\xF3a \u0111i\u1EC3m v\xE0o LIMIT ch\u1ED1ng qu\xE9t SL v\xE0 ph\xE2n b\u1ED5 t\u1EF7 l\u1EC7 RR..."),I("info")):t<=0&&(clearInterval(a),ce(!1),I("buy"),Na())},1e3)},Na=()=>{let t=V.current||T||4500,a=u?.signals?.indicators?.atr||3.2,r="BUY";u?.signals?.type==="SELL"||u?.signals?.type==="STRONG_SELL"?r="SELL":u?.signals?.type==="BUY"||u?.signals?.type==="STRONG_BUY"?r="BUY":r=Math.random()>.5?"BUY":"SELL";let n=0,l=0,s=0,i=0,f=.38+Math.random()*.22,g=.85+Math.random()*.25,b=1.2+Math.random()*.4,v=2.6+Math.random()*.7;r==="BUY"?(n=Math.round((t-f*a)*100)/100,l=Math.round((n-g*a)*100)/100,s=Math.round((n+b*a)*100)/100,i=Math.round((n+v*a)*100)/100):(n=Math.round((t+f*a)*100)/100,l=Math.round((n+g*a)*100)/100,s=Math.round((n-b*a)*100)/100,i=Math.round((n-v*a)*100)/100);let w=(Math.abs(i-n)/Math.abs(n-l)).toFixed(1),h="",y="",k="";r==="BUY"?(h=`Ph\xE1t hi\u1EC7n v\xF9ng qu\xE9t thanh kho\u1EA3n \u0111\xE1y (Liquidity Sweep) d\u01B0\u1EDBi ng\u01B0\u1EE1ng h\u1ED7 tr\u1EE3 g\u1EA7n nh\u1EA5t t\u1EA1i $${(n+.8).toFixed(2)}. D\xF2ng ti\u1EC1n th\xF4ng minh (Smart Money Concept) \u0111ang \u0111\u1EB7t b\u1EABy s\u0103n d\u1EEBng l\u1ED7 (Stop Hunt) c\u1EE7a phe nh\u1ECF l\u1EBB tr\u01B0\u1EDBc khi \u0111\u1EA9y gi\xE1 t\u0103ng. \u0110i\u1EC3m BUY LIMIT \u0111\u01B0\u1EE3c thi\u1EBFt l\u1EADp \u0111\xF3n \u0111\u1EA7u r\xE2u n\u1EBFn t\u1EA1i $${n.toFixed(2)} n\u1EB1m \u1EDF v\xF9ng chi\u1EBFt kh\u1EA5u (Discount Zone) c\u1EE7a kh\u1ED1i l\u1EC7nh (Bullish Order Block).`,y=`M\u1EE9c d\u1EEBng l\u1ED7 (SL) \u0111\u01B0\u1EE3c th\u1EAFt ch\u1EB7t t\u1EA1i $${l.toFixed(2)}, ngay b\xEAn d\u01B0\u1EDBi \u0111\xE1y v\xF9ng qu\xE9t thanh kho\u1EA3n th\u1EE9 hai v\xE0 kh\u1ED1i l\u1EC7nh t\u0103ng tr\u01B0\u1EDFng (Bullish Order Block). N\u1EBFu gi\xE1 n\u1EBFn \u0111\xF3ng d\u01B0\u1EDBi v\xF9ng n\xE0y, c\u1EA5u tr\xFAc t\u0103ng (BOS) s\u1EBD b\u1ECB v\xF4 hi\u1EC7u h\xF3a ho\xE0n to\xE0n, vi\u1EC7c c\u1EAFt l\u1ED7 l\xE0 b\u1EAFt bu\u1ED9c \u0111\u1EC3 b\u1EA3o to\xE0n v\u1ED1n.`,k=`M\u1EE5c ti\xEAu ch\u1ED1t l\u1EDDi 1 (TP1) t\u1EA1i $${s.toFixed(2)} \u0111\u01B0\u1EE3c \u0111\u1EB7t \u1EDF \u0111\u1EC9nh c\u0169 n\u1EBFn v\xE0 ch\u1ED1t l\u1EDDi 2 (TP2) t\u1EA1i $${i.toFixed(2)} \u1EDF v\xF9ng m\u1EA5t c\xE2n b\u1EB1ng cung c\u1EA7u (Fair Value Gap - FVG) gi\u1EA3m gi\xE1 ph\xEDa tr\xEAn, n\u01A1i t\xEDch t\u1EE5 l\u01B0\u1EE3ng l\u1EDBn thanh kho\u1EA3n ch\u1EDD mua. Khi \u0111\u1EA1t TP1, h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng d\u1EDDi SL v\u1EC1 Entry \u0111\u1EC3 b\u1EA3o to\xE0n l\u1EE3i nhu\u1EADn t\u1ED1i \u0111a, \u0111\u1EA1t t\u1EC9 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn (R:R) l\xEAn t\u1EDBi 1:${w}.`):(h=`Ph\xE1t hi\u1EC7n b\u1EABy qu\xE9t thanh kho\u1EA3n \u0111\u1EC9nh (Liquidity Sweep/Buy-side Liquidity) \u1EDF v\xF9ng kh\xE1ng c\u1EF1 $${(n-.8).toFixed(2)}. C\xE1c t\u1ED5 ch\u1EE9c l\u1EDBn \u0111ang k\xEDch ho\u1EA1t qu\xE9t Stop Hunt c\xE1c l\u1EC7nh b\xE1n kh\u1ED1ng nh\u1ECF l\u1EBB \u0111\u1EC3 gom thanh kho\u1EA3n. \u0110i\u1EC3m SELL LIMIT \u0111\u01B0\u1EE3c thi\u1EBFt l\u1EADp \u0111\xF3n \u0111\u1EA7u t\u1EA1i $${n.toFixed(2)} n\u1EB1m \u1EDF v\xF9ng Premium Zone t\u1ED1i \u01B0u v\xE0 kh\u1ED1i l\u1EC7nh gi\u1EA3m tr\u01B0\u1EDFng (Bearish Order Block).`,y=`M\u1EE9c d\u1EEBng l\u1ED7 (SL) th\u1EAFt ch\u1EB7t \u0111\u1EB7t t\u1EA1i $${l.toFixed(2)} ph\xEDa tr\xEAn \u0111\u1EC9nh qu\xE9t thanh kho\u1EA3n. Vi\u1EC7c v\u01B0\u1EE3t qua m\u1EE9c gi\xE1 n\xE0y s\u1EBD ph\xE1 v\u1EE1 c\u1EA5u tr\xFAc gi\u1EA3m hi\u1EC7n t\u1EA1i (CHoCH t\u0103ng), v\xF4 hi\u1EC7u h\xF3a ho\xE0n to\xE0n k\u1ECBch b\u1EA3n b\xE1n kh\u1ED1ng.`,k=`M\u1EE5c ti\xEAu ch\u1ED1t l\u1EDDi 1 (TP1) t\u1EA1i $${s.toFixed(2)} v\xE0 ch\u1ED1t l\u1EDDi 2 (TP2) t\u1EA1i $${i.toFixed(2)} n\u1EB1m s\xE2u d\u01B0\u1EDBi \u0111\xE1y c\u0169 v\xE0 v\xF9ng FVG t\u0103ng gi\xE1 ch\u01B0a \u0111\u01B0\u1EE3c gi\u1EA3m thi\u1EC3u (Unmitigated Bullish FVG). Khi gi\xE1 ch\u1EA1m TP1, h\u1EC7 th\u1ED1ng d\u1EDDi SL v\u1EC1 \u0111i\u1EC3m h\xF2a v\u1ED1n (Break Even), b\u1EA3o to\xE0n l\u1EE3i nhu\u1EADn t\u1ED1i \u0111a v\u1EDBi t\u1EF7 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn (R:R) \u0111\u1EA1t 1:${w}.`);let S={timeframe:d,position:r,type:"LIMIT",entry:n,stopLoss:l,takeProfit1:s,takeProfit2:i,hitTp1:!1,status:"PENDING",pips:0,openPrice:0,openTime:"",rrRatio:w,entryReason:h,slReason:y,tpReason:k};Lt(M=>({...M,[d]:S}))},uo=()=>{Gt("ai"),Re(!0);let t=W[d];(!t||t.status==="TP"||t.status==="SL")&&!Yt&&he()};z(()=>{if(Y==="ai"&&Mt&&!Yt){let t=W[d];(!t||t.status==="TP"||t.status==="SL")&&he()}},[Y,d,Mt]);let[T,Jt]=p(4500),[fe,Zt]=p(0),[Ht,xo]=p(!0),[bo,De]=p([]),[mo,He]=p({bids:[],asks:[]}),[ho,fo]=p("book"),[La,Ma]=p(""),[vo,Ca]=p(""),[Z,Aa]=p(!1),[Ot,yo]=p(100),[Qt,wo]=p(5),[ve,ko]=p("micro"),[te,So]=p("percent"),[ee,To]=p(5),[ye,No]=p(0),[Lo,Ia]=p([{id:"h1",time:"05:40:12",type:"SELL",entry:4512.4,stopLoss:4516.8,tp1:4504,status:"HIT TP1 \u{1F7E2} (+84 pips)"},{id:"h2",time:"03:15:45",type:"BUY",entry:4495.2,stopLoss:4489.5,tp1:4503.5,status:"HIT TP1 \u{1F7E2} (+83 pips)"},{id:"h3",time:"01:04:10",type:"SELL",entry:4520.1,stopLoss:4525,tp1:4511,status:"HIT SL \u{1F534} (-49 pips)"},{id:"h4",time:"23:12:05",type:"BUY",entry:4488.5,stopLoss:4482,tp1:4498,status:"HIT TP1 \u{1F7E2} (+95 pips)"}]),G=U({}),[Mo,Oe]=p(""),[za,Ea]=p(!0),[rt,Bt]=p(80),[yt,wt]=p(0),Be=yt===0,[we,ke]=p(1),x=D(()=>{if(!u?.chart?.timestamp)return[];let t=u.chart.timestamp.length,a=[];for(let r=0;r<t;r++)a.push({time:u.chart.timestamp[r],open:u.chart.open[r]??0,high:u.chart.high[r]??0,low:u.chart.low[r]??0,close:u.chart.close[r]??0,volume:u.chart.volume[r]??0});if(a.length>0){let r=a[a.length-1];r.close=T,T>r.high&&(r.high=T),T<r.low&&(r.low=T)}return a},[u,T]),Q=D(()=>{if(x.length===0)return[];let t=x.length,a=Math.max(10,Math.min(rt,t)),r=Math.max(0,Math.min(yt,t-a)),n=t-r,l=Math.max(0,n-a);return x.slice(l,n)},[x,rt,yt]),F=D(()=>{if(x.length===0)return 0;let t=x.length,a=Math.max(10,Math.min(rt,t)),r=Math.max(0,Math.min(yt,t-a)),n=t-r;return Math.max(0,n-a)},[x,rt,yt]),Pa=D(()=>{if(x.length===0)return[];let t=[],r=2/((Number(Ct)||50)+1),n=It||"close",l=x[0][n]||x[0].close;t.push(l);for(let s=1;s<x.length;s++)l=(x[s][n]||x[s].close)*r+l*(1-r),t.push(l);return t},[x,Ct,It]),Ra=D(()=>{if(x.length===0)return[];let t=[],r=2/((Number(At)||200)+1),n=zt||"close",l=x[0][n]||x[0].close;t.push(l);for(let s=1;s<x.length;s++)l=(x[s][n]||x[s].close)*r+l*(1-r),t.push(l);return t},[x,At,zt]),Ue=D(()=>{if(x.length<10)return null;let a=(u?.advancedAnalysis?.swings||[]).filter(i=>i.type==="HIGH").sort((i,f)=>i.index-f.index);if(a.length>=2){let i=a[0];for(let g of a)g.price>i.price&&(i=g);let f=a.find(g=>g.index>i.index&&g.price<i.price);if(f||(f=a[a.length-1]),i&&f&&i.index!==f.index)return{i1:i.index,price1:i.price,i2:f.index,price2:f.price,source:"SMC Swings"}}let r=0,n=x[0].high;for(let i=1;i<Math.floor(x.length*.7);i++)x[i].high>n&&(n=x[i].high,r=i);let l=r+5,s=0;if(l<x.length){s=x[l].high;for(let i=l;i<x.length;i++)x[i].high>s&&x[i].high<n&&(s=x[i].high,l=i)}return r!==l&&l<x.length?{i1:r,price1:n,i2:l,price2:s,source:"PA Scan"}:{i1:Math.max(0,x.length-80),price1:4568,i2:Math.max(0,x.length-20),price2:4516,source:"SMC Profile"}},[x,u]),c=D(()=>{if(Q.length<5)return null;let t=1400,a=520,r=4,n=68,l=12,s=34,i=t-r-n,f=a-l-s,g=Q.map(N=>N.high),b=Q.map(N=>N.low),v=Math.max(...g),w=Math.min(...b),h=v-w||1,y=(v+w)/2,k=h*1.1*we||1;v=y+k/2,w=y-k/2;let S=v-w,M=Q.length,E=i/M,j=Math.max(1,E*.75),P=N=>r+(N+.5)*E,O=N=>l+(1-(N-w)/S)*f,St=Math.max(1,Math.floor(M/8)),R=[];for(let N=0;N<M;N+=St){let Tt=Q[N].time*1e3,oe=new Date(Tt),Ut;["1D","1W","1M"].includes(d)?Ut=oe.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}):Ut=oe.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}),R.push({x:P(N),label:Ut})}let dt=8,B=[];for(let N=0;N<=dt;N++){let Tt=w+S*N/dt;B.push({y:O(Tt),price:Tt})}return{width:t,height:a,paddingLeft:r,paddingRight:n,paddingBottom:s,usableWidth:i,usableHeight:f,maxPrice:v,minPrice:w,paddedRange:S,candleSlotW:E,bodyWidth:j,getX:P,getY:O,timeLabels:R,priceLabels:B}},[Q,d,we]),V=U(4500),We=U(null),Ge=U(0),ae=U(!1),Fe=U(0),$e=U(0),kt=U(null),Se=U(!1),Ye=U(0),Ve=U(1),Da={1:60,5:300,15:900,60:3600,"1D":86400,"1W":604800,"1M":2592e3};z(()=>{We.current=u},[u]);let I=(t="info")=>{try{let a=new(window.AudioContext||window.webkitAudioContext),r=a.createOscillator(),n=a.createGain();r.connect(n),n.connect(a.destination),t==="buy"?(r.frequency.setValueAtTime(587.33,a.currentTime),n.gain.setValueAtTime(.12,a.currentTime),r.start(),r.frequency.setValueAtTime(698.46,a.currentTime+.12),n.gain.setValueAtTime(.1,a.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),r.stop(a.currentTime+.4)):t==="sell"?(r.frequency.setValueAtTime(523.25,a.currentTime),n.gain.setValueAtTime(.12,a.currentTime),r.start(),r.frequency.setValueAtTime(392,a.currentTime+.12),n.gain.setValueAtTime(.1,a.currentTime+.12),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.35),r.stop(a.currentTime+.4)):(r.frequency.setValueAtTime(440,a.currentTime),n.gain.setValueAtTime(.08,a.currentTime),n.gain.exponentialRampToValueAtTime(.001,a.currentTime+.15),r.start(),r.stop(a.currentTime+.2))}catch(a){console.warn("Audio Context failed",a)}};z(()=>{if(!Z||!u?.advancedAnalysis)return;let t=u.advancedAnalysis,a=Date.now(),r=t.fvgs.find(i=>!i.mitigated&&i.type==="BULLISH");if(r&&T<=r.top&&T>=r.bottom){let i=`fvg_bullish_${r.index}`;(!G.current[i]||a-G.current[i]>3e4)&&(G.current[i]=a,I("buy"))}let n=t.fvgs.find(i=>!i.mitigated&&i.type==="BEARISH");if(n&&T>=n.bottom&&T<=n.top){let i=`fvg_bearish_${n.index}`;(!G.current[i]||a-G.current[i]>3e4)&&(G.current[i]=a,I("sell"))}let l=t.orderBlocks.find(i=>!i.mitigated&&i.type==="BULLISH");if(l&&T>=l.low&&T<=l.high){let i=`ob_bullish_${l.index}`;(!G.current[i]||a-G.current[i]>3e4)&&(G.current[i]=a,I("buy"))}let s=t.orderBlocks.find(i=>!i.mitigated&&i.type==="BEARISH");if(s&&T>=s.low&&T<=s.high){let i=`ob_bearish_${s.index}`;(!G.current[i]||a-G.current[i]>3e4)&&(G.current[i]=a,I("sell"))}},[T,Z,u]),z(()=>{let t=setInterval(()=>{let a=new Date;Ma(a.toLocaleTimeString("en-GB")+" UTC");let r=Da[d]||86400,n=Math.floor(a.getTime()/1e3),l=r-n%r;if(l>=3600){let s=Math.floor(l/3600),i=Math.floor(l%3600/60),f=l%60;Oe(`${s}:${String(i).padStart(2,"0")}:${String(f).padStart(2,"0")}`)}else{let s=Math.floor(l/60),i=l%60;Oe(`${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`)}},1e3);return()=>clearInterval(t)},[d]),z(()=>{let t=a=>{document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA"||(a.key==="+"||a.key==="="?(a.preventDefault(),Xe()):a.key==="-"?(a.preventDefault(),_e()):a.key==="ArrowLeft"?(a.preventDefault(),wt(r=>Math.min(x.length-rt,r+5))):a.key==="ArrowRight"?(a.preventDefault(),wt(r=>Math.max(0,r-5))):(a.key==="r"||a.key==="R")&&(a.preventDefault(),Bt(80),wt(0),ke(1)))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[x.length,rt]);let Te=async(t=!1)=>{if(H){t||Ce(!0),t||re(null);try{let a=await fetch(`/api/signals/XAUUSD?tf=${d}`);if(!a.ok)throw new Error("Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i \u0111\u1EBFn server API Gold");let r=await a.json();re(null),Me(r),Ca(new Date().toLocaleTimeString("vi-VN")),r.lastPrice>0&&(!We.current||Math.abs(V.current-r.lastPrice)>100?V.current=r.lastPrice:V.current=V.current*.7+r.lastPrice*.3,Jt(Math.round(V.current*100)/100)),r.signals&&r.signals.type!=="NEUTRAL"&&Ia(n=>{let l=n[0];if(!l||l.type!==r.signals.type||Math.abs(l.entry-r.signals.suggestion.entry)>.5){let i=new Date().toLocaleTimeString("vi-VN");return[{id:Math.random().toString(),time:i,type:r.signals.type,entry:r.signals.suggestion.entry,stopLoss:r.signals.suggestion.stopLoss,tp1:r.signals.suggestion.takeProfit1,status:"Active \u{1F7E1}"},...n.slice(0,14)]}return n}),t||(Oa(r.lastPrice),Ba(r.lastPrice)),Zt(r.priceChange)}catch(a){t||re(a.message)}finally{t||Ce(!1)}}},Ha=async()=>{try{let t=await fetch("/api/price/XAUUSD");if(!t.ok)return;let a=await t.json();a.price&&a.price>0&&(V.current=V.current*.7+a.price*.3,Jt(Math.round(V.current*100)/100),Zt(a.change))}catch{}};z(()=>{if(!H)return;Te(!1);let t=setInterval(()=>{Ht&&H&&Ha()},1500),a=setInterval(()=>{Ht&&H&&Te(!0)},3e4);return()=>{clearInterval(t),clearInterval(a)}},[d,Ht,H]);let Oa=t=>{let a=.35+Math.random()*.15,r=[],n=[];for(let l=1;l<=10;l++)n.push({price:t+a/2+(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10}),r.push({price:t-a/2-(l-1)*.15,size:Math.round((Math.random()*80+5)*10)/10});He({bids:r,asks:n.reverse()})},Ba=t=>{let a=[],r=new Date;for(let n=0;n<20;n++){let l=n*280,s=new Date(r.getTime()-l),i=Math.random()>.48;a.push({id:`init-${n}`,time:s.toLocaleTimeString()+"."+String(s.getMilliseconds()).padStart(3,"0"),type:i?"BUY":"SELL",price:t+(Math.random()-.5)*.4,size:(Math.random()*4.5+.1).toFixed(1)+" Lot"})}De(a)};z(()=>{if(!Ht||!u||!H)return;let t=setInterval(()=>{let a=V.current,r=u.lastPrice,n=(r-a)*.05,l=(Math.random()-.5)*.25,s=Math.round((a+n+l)*100)/100;V.current=s,Jt(s);let i=r/(1+u.priceChange/100),f=(s-i)/i*100;if(Zt(f),Ge.current++,Ge.current%3===0){let b=.35+Math.random()*.1;He(v=>{let w=v.asks.map((y,k)=>{let S=10-k;return{price:Math.round((s+b/2+(S-1)*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)}});return{bids:v.bids.map((y,k)=>({price:Math.round((s-b/2-k*.15)*100)/100,size:Math.max(1,Math.round((y.size+(Math.random()-.5)*5)*10)/10)})),asks:w}})}if(Math.random()<.35){let b=Math.random()>.47,v=new Date,w=b?s+Math.random()*.05:s-Math.random()*.05,h={id:Math.random().toString(),time:v.toLocaleTimeString()+"."+String(v.getMilliseconds()).padStart(3,"0"),type:b?"BUY":"SELL",price:Math.round(w*100)/100,size:(Math.random()*5+.1).toFixed(1)+" Lot"};De(y=>[h,...y.slice(0,24)])}let g=W[d];if(g){if(g.status==="PENDING")(g.position==="BUY"?s<=g.entry:s>=g.entry)&&(Lt(w=>{let h={...w};return h[d]&&h[d].status==="PENDING"&&(h[d]={...h[d],status:"ACTIVE",openPrice:s,openTime:new Date().toLocaleTimeString()}),h}),I("info"));else if(g.status==="ACTIVE"){let b=g.position==="BUY";g.hitTp1||(b?s>=g.takeProfit1:s<=g.takeProfit1)&&(Lt(k=>{let S={...k};return S[d]&&S[d].status==="ACTIVE"&&(S[d]={...S[d],hitTp1:!0,stopLoss:g.entry}),S}),I("buy"));let v=g.hitTp1?g.entry:g.stopLoss,w=b?s>=g.takeProfit2:s<=g.takeProfit2,h=b?s<=v:s>=v;if(w||h){let y=w?"TP":"SL",k=0;b?k=Math.round((s-g.entry)*10):k=Math.round((g.entry-s)*10);let S=100,M=.1;d==="5"?M=.2:d==="15"?M=.5:d==="60"?M=1:d==="1D"&&(M=2);let E=Number((k*S*M/10).toFixed(2));Lt(P=>{let O={...P};return O[d]&&O[d].status==="ACTIVE"&&(O[d]={...O[d],status:y,closePrice:s,closeTime:new Date().toLocaleTimeString(),pips:k,profitUsd:E}),O});let j={id:`AI-${d.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`,timeframe:d==="1"?"M1":d==="5"?"M5":d==="15"?"M15":d==="60"?"H1":"D1",position:g.position,entry:g.entry,stopLoss:g.stopLoss,takeProfit1:g.takeProfit1,takeProfit2:g.takeProfit2,status:y==="TP"?"TP2":g.hitTp1?"TP1":"SL",openTime:Date.now()-3e4,closeTime:Date.now(),pips:k,profitUsd:E,isAi:!0};ne(P=>[j,...P]),I(y==="TP"?"buy":"sell")}}}},85);return()=>clearInterval(t)},[Ht,u,H,d,W]);let Ua=t=>{if(!kt.current||!c)return;let a=kt.current.getBoundingClientRect();(t.clientX-a.left)/a.width*c.width>c.width-c.paddingRight?(Se.current=!0,Ye.current=t.clientY,Ve.current=we):(ae.current=!0,Fe.current=t.clientX,$e.current=yt)},Wa=t=>{if(Se.current){let r=1+(t.clientY-Ye.current)*.005;ke(Math.max(.05,Math.min(10,Ve.current*r)))}else if(ae.current&&kt.current&&c){let a=t.clientX-Fe.current,n=(kt.current.clientWidth||860)/Math.max(rt,1),l=Math.round(-a/n),s=Math.max(0,Math.min(x.length-rt,$e.current+l));wt(s)}},je=()=>{ae.current=!1,Se.current=!1},Ga=()=>{Bt(80),wt(0),ke(1)};z(()=>{let t=kt.current;if(!t)return;let a=r=>{r.preventDefault();let n=r.deltaY>0?1:-1;Bt(l=>Math.max(10,Math.min(500,l+n*Math.ceil(l*.08))))};return t.addEventListener("wheel",a,{passive:!1}),()=>{t.removeEventListener("wheel",a)}},[c]);let Fa=()=>wt(0),Xe=()=>Bt(t=>Math.max(10,Math.round(t*.7))),_e=()=>Bt(t=>Math.min(500,Math.round(t*1.4))),m=D(()=>{if(!u)return null;let t=W[d];if(t&&(t.status==="PENDING"||t.status==="ACTIVE")){let B=t.position==="BUY",N=B?"BUY":"SELL",Tt=t.stopLoss,oe=t.takeProfit1,Ut=t.takeProfit2,Ze=t.entry,Xa=`$${Ze.toFixed(2)}`;return{type:N,confluenceScore:B?78:-78,winProbability:88,entryText:Xa,entryMid:Ze,sl:Tt,tp1:oe,tp2:Ut,atr:u.signals?.indicators?.atr||u.tradingViewAnalysis?.atr||3.2,rsi:u.signals?.indicators?.rsi||u.tradingViewAnalysis?.rsi||50,adx:u.tradingViewAnalysis?.adx||20,ema10:u.tradingViewAnalysis?.ema10||T,sma20:u.tradingViewAnalysis?.sma20||T}}let a=u.signals,r=u.tradingViewAnalysis,n=a.type==="BUY"?a.strength:a.type==="SELL"?-a.strength:0,l=r?r.recommendAll*100:0,s=Math.round((n+l)/2),i="NEUTRAL";s>=40?i="STRONG_BUY":s>=15?i="BUY":s<=-40?i="STRONG_SELL":s<=-15&&(i="SELL");let f=50,g=0,b=0,v=0,w=0,h=a.indicators.atr||r?.atr||3.2,y=a.indicators.rsi||r?.rsi||50,k=r?r.macd-r.macdSignal:0;if(r){let B=T>r.ema50,N=r.ema10>r.sma20;i.includes("BUY")?(B&&(g+=6),N&&(g+=6)):i.includes("SELL")&&(B||(g+=6),N||(g+=6))}i.includes("BUY")?(y>=50&&y<=65&&(b+=6),k>0&&(b+=6)):i.includes("SELL")&&(y>=35&&y<=50&&(b+=6),k<0&&(b+=6)),r&&r.adx>25&&(v+=6),i.includes("BUY")&&y<30&&(w+=8),i.includes("SELL")&&y>70&&(w+=8);let S=Math.min(94,Math.max(35,Math.round(f+Math.abs(s)*.3+g+b+v+w))),M=0,E=0,j="",P=0,O=0,St=0,R=0,dt=u.chart?.close&&u.chart.close.length>0?u.chart.close[u.chart.close.length-1]:T;if(a&&a.suggestion&&a.suggestion.position!=="NEUTRAL"){let B=a.suggestion;P=B.stopLoss,O=B.takeProfit1,St=B.takeProfit2,R=B.entry,M=Math.round((R-.15*h)*100)/100,E=Math.round((R+.15*h)*100)/100,j=`$${R.toFixed(2)}`,a.strength>0&&(S=Math.min(94,Math.max(78,80+Math.round(a.strength*.15))))}else M=Math.round((i.includes("BUY")?dt-.25*h:dt)*100)/100,E=Math.round((i.includes("BUY")?dt:dt+.25*h)*100)/100,j=`$${M.toFixed(2)} - $${E.toFixed(2)}`,R=(M+E)/2,i.includes("BUY")?(P=Math.round((R-1.5*h)*100)/100,O=Math.round((R+1.5*h)*100)/100,St=Math.round((R+3*h)*100)/100):i.includes("SELL")&&(P=Math.round((R+1.5*h)*100)/100,O=Math.round((R-1.5*h)*100)/100,St=Math.round((R-3*h)*100)/100);return{type:i,confluenceScore:s,winProbability:S,entryText:j,entryMid:R,sl:P,tp1:O,tp2:St,atr:h,rsi:y,adx:r?.adx||20,ema10:r?.ema10||T,sma20:r?.sma20||T}},[u,W,Mt,d,T]),Ne=D(()=>ye>0?ye:!m||!m.sl?0:Math.abs(m.entryMid-m.sl),[ye,m]),Ke=D(()=>te==="percent"?Ot*Qt/100:ee,[Ot,Qt,ee,te]),Co=D(()=>Ot<=0?0:te==="usd"?ee/Ot*100:Qt,[Ot,Qt,ee,te]),Ao=D(()=>Ne<=0?0:Ke/(Ne*(ve==="standard"?100:ve==="mini"?10:1)),[Ke,Ne,ve]),Io=D(()=>{if(!m)return{};let t=m.type,a=m.winProbability,r="var(--yellow)";return t.includes("BUY")?r="var(--green)":t.includes("SELL")&&(r="var(--red)"),{background:`conic-gradient(${r} 0% ${a}%, var(--bg3) ${a}% 100%)`}},[m]),$a=(t,a)=>{let r=a.replace(/\D/g,"").slice(-1),n=st.split("");for(;n.length<6;)n.push("");n[t]=r;let l=n.join("");at(l),r&&t<5&&Nt.current[t+1]?.focus()},Ya=(t,a)=>{if(a.key==="Backspace"){let r=st.split("");for(;r.length<6;)r.push("");!r[t]&&t>0?(r[t-1]="",at(r.join("")),Nt.current[t-1]?.focus()):(r[t]="",at(r.join("")))}},$=(()=>{let t=X;if(!t)return 0;let a=0;return t.length>=6&&a++,t.length>=10&&a++,/[A-Z]/.test(t)&&/[0-9]/.test(t)&&a++,a})(),qe=300,Va=qe>0?_/qe:0,Je=2*Math.PI*22,ja=Je*(1-Va);return la?o("div",{className:"auth-container",children:[e("div",{className:"auth-grid-overlay"}),o("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"20px",position:"relative",zIndex:1},children:[e("div",{className:"auth-logo-ring",children:e("img",{src:"/frontend/logo.png",alt:"XAU Logo",className:"auth-logo-img"})}),e("div",{style:{color:"var(--gold)",fontWeight:"800",fontSize:"14px",letterSpacing:"2px",textTransform:"uppercase"},children:"\u0110ang kh\u1EDFi \u0111\u1ED9ng h\u1EC7 th\u1ED1ng..."}),e("div",{className:"load-bar",style:{width:"220px"},children:e("div",{className:"load-fill"})})]})]}):H?o("div",{className:"root",children:[o("header",{className:"topbar",children:[e("div",{className:"topbar-left",children:o("div",{className:"brand",style:{display:"flex",alignItems:"center"},children:[e("img",{src:"/frontend/logo.png",alt:"XAU Logo",style:{width:"45px",height:"45px",borderRadius:"8px",marginRight:"8px",filter:"drop-shadow(0 0 8px rgba(255, 171, 0, 0.4))"}}),e("span",{className:"brand-name",children:"H\u1EC6 TH\u1ED0NG GIAO D\u1ECACH V\xC0NG CHUY\xCAN NGHI\u1EC6P XAU/USD"}),e("span",{className:"brand-badge",children:"D\u1EEE LI\u1EC6U TH\u1EDCI GIAN TH\u1EF0C MILLISECOND"})]})}),o("div",{className:"topbar-right",children:[e("span",{className:"clock",children:La||"00:00:00 UTC"}),H&&o("div",{className:"user-profile-chip",style:{display:"flex",alignItems:"center",gap:"8px",background:"rgba(255, 215, 0, 0.04)",border:"1px solid rgba(255, 215, 0, 0.12)",padding:"4px 12px",borderRadius:"8px",marginRight:"10px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03)"},children:[o("span",{style:{fontSize:"11px",color:"var(--text2)",fontWeight:"600"},children:["\u{1F464} ",H.email]}),e("div",{style:{width:"1px",height:"12px",background:"rgba(255,255,255,0.12)",margin:"0 4px"}}),e("button",{type:"button",onClick:Ta,style:{background:"transparent",border:"none",color:"#ff1744",fontSize:"11px",fontWeight:"700",cursor:"pointer",padding:"2px 6px",borderRadius:"4px",display:"flex",alignItems:"center",gap:"4px",transition:"all 0.2s ease"},onMouseOver:t=>{t.currentTarget.style.background="rgba(255, 23, 68, 0.1)"},onMouseOut:t=>{t.currentTarget.style.background="transparent"},children:"\u{1F6AA} \u0110\u0103ng xu\u1EA5t"})]}),e("button",{className:`tf-btn ${Z?"active":""}`,style:{borderColor:Z?"var(--green)":"rgba(255,255,255,0.05)",background:Z?"rgba(0, 230, 118, 0.12)":"var(--bg3)",color:Z?"var(--green)":"var(--text)",marginRight:"10px",fontWeight:Z?"600":"normal",cursor:"pointer"},onClick:()=>Aa(!Z),children:Z?"\u{1F514} B\xE1o \xC2m: B\u1EACT":"\u{1F515} B\xE1o \xC2m: T\u1EAET"}),e("button",{className:"tf-btn",style:{borderColor:"rgba(255,255,255,0.05)",background:"var(--bg3)",color:"var(--text)"},onClick:Te,children:"\u{1F504} T\u1EA3i L\u1EA1i"})]})]}),o("div",{className:"layout",children:[!pt&&o("aside",{className:"sidebar",children:[e("header",{className:"sb-header hide-on-mobile",children:e("div",{className:"gold-profile-card",children:e("div",{className:"g-title",children:"\u{1F7E1} V\xC0NG SPOT (XAU/USD)"})})}),o("div",{style:{padding:"16px",flex:1,display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:[u&&e("div",{className:"sug-card hide-on-mobile",style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"16px",background:"rgba(20, 24, 33, 0.45)",backdropFilter:"blur(8px)",border:"1px solid rgba(255, 215, 0, 0.08)",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.25)"},children:e("img",{src:"/frontend/logo.png",alt:"Xtreme Algo Union Logo",style:{width:"100%",maxWidth:"220px",height:"auto",borderRadius:"12px",filter:"drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",transition:"all 0.3s ease"},onMouseOver:t=>{t.currentTarget.style.filter="drop-shadow(0 0 24px rgba(255, 171, 0, 0.5))",t.currentTarget.style.transform="scale(1.02)"},onMouseOut:t=>{t.currentTarget.style.filter="drop-shadow(0 0 16px rgba(255, 171, 0, 0.25))",t.currentTarget.style.transform="scale(1)"}})}),W[d]&&(W[d].status==="PENDING"||W[d].status==="ACTIVE")?m&&o("div",{className:"sug-card",style:{borderTop:"3px solid var(--gold)",background:"rgba(20, 24, 33, 0.65)",backdropFilter:"blur(12px)"},children:[o("div",{className:"sug-title",style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:"\u2728 CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT"}),e("span",{style:{fontSize:"9px",background:"rgba(255, 171, 0, 0.15)",color:"var(--gold)",padding:"2px 6px",borderRadius:"4px",fontWeight:"bold"},children:"PRO FEED"})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"16px",margin:"14px 0",background:"rgba(255,255,255,0.02)",padding:"10px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.04)"},children:o("div",{style:{flex:1},children:[e("span",{style:{fontSize:"10px",color:"var(--text2)",textTransform:"uppercase",display:"block"},children:"Khuy\u1EBFn ngh\u1ECB h\u1EE3p l\u01B0u"}),e("span",{className:`sug-val ${m.type.includes("BUY")?"buy":m.type.includes("SELL")?"sell":""}`,style:{fontSize:"15px",fontWeight:"800",marginTop:"2px",display:"block"},children:m.type==="STRONG_BUY"?"\u{1F7E2} MUA M\u1EA0NH (STRONG BUY)":m.type==="BUY"?"\u{1F7E2} MUA V\xC0O (BUY)":m.type==="STRONG_SELL"?"\u{1F534} B\xC1N M\u1EA0NH (STRONG SELL)":m.type==="SELL"?"\u{1F534} B\xC1N RA (SELL)":"\u{1F7E1} TRUNG L\u1EACP (NEUTRAL)"})]})}),o("div",{className:"sug-grid",style:{gap:"8px"},children:[o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"ENTRY"}),e("span",{className:"sug-val entry",style:{fontSize:"11.5px",letterSpacing:"-0.2px"},children:m.entryText})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"\u0110i\u1EC3m C\u1EAFt l\u1ED7 (SL)"}),e("span",{className:"sug-val sl",style:{fontSize:"11.5px"},children:m.sl>0?`$${m.sl.toFixed(2)}`:"\u2014"})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 1 (TP1)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:m.tp1>0?`$${m.tp1.toFixed(2)}`:"\u2014"})]}),o("div",{className:"sug-item",children:[e("span",{className:"sug-label",children:"Ch\u1ED1t l\u1EDDi 2 (TP2)"}),e("span",{className:"sug-val tp",style:{fontSize:"11.5px"},children:m.tp2>0?`$${m.tp2.toFixed(2)}`:"\u2014"})]}),e("div",{className:"sug-item",style:{gridColumn:"span 2"},children:o("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"8px",marginTop:"4px"},children:[o("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"T\u1EF7 l\u1EC7 r\u1EE7i ro/l\u1EE3i nhu\u1EADn:"}),e("strong",{style:{color:"#fff",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:"1:1.5 \u2794 1:3.0"})]}),o("div",{children:[e("span",{className:"sug-label",style:{fontSize:"9px"},children:"H\u1EC7 s\u1ED1 bi\u1EBFn \u0111\u1ED9ng (ATR):"}),o("strong",{style:{color:"var(--gold)",display:"block",fontSize:"11px",marginTop:"2px",fontFamily:"monospace"},children:["$",m.atr.toFixed(2)]})]})]})}),o("div",{className:"sug-item",style:{gridColumn:"span 2",background:"rgba(255, 255, 255, 0.01)",padding:"8px",borderRadius:"6px",border:"1px solid rgba(255, 255, 255, 0.03)",marginTop:"4px"},children:[e("span",{className:"sug-label",style:{fontSize:"9.5px",marginBottom:"6px",display:"block"},children:"H\u1EE3p l\u01B0u \u0111a khung th\u1EDDi gian:"}),e("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"4px",textAlign:"center"},children:[{id:"1",label:"M1"},{id:"5",label:"M5"},{id:"15",label:"M15"},{id:"60",label:"H1"},{id:"1D",label:"D1"}].map(t=>{let a=u?.multiTimeframeSignals?.[t.id]||"NEUTRAL",r="var(--text3)",n="rgba(255, 255, 255, 0.03)",l="TRUNG L\u1EACP";a.includes("BUY")?(r="var(--green)",n="rgba(0, 230, 118, 0.08)",l=a==="STRONG_BUY"?"MUA M\u1EA0NH":"MUA"):a.includes("SELL")?(r="var(--red)",n="rgba(255, 23, 68, 0.08)",l=a==="STRONG_SELL"?"B\xC1N M\u1EA0NH":"B\xC1N"):(r="var(--yellow)",n="rgba(255, 171, 0, 0.08)",l="TRUNG L\u1EACP");let s=d===t.id;return o("div",{onClick:()=>{I(),tt(t.id)},style:{background:n,border:s?"1px solid var(--gold)":"1px solid rgba(255,255,255,0.04)",borderRadius:"4px",padding:"4px 1px",cursor:"pointer",transition:"all 0.15s ease",boxShadow:s?"0 0 6px rgba(255, 171, 0, 0.12)":"none"},onMouseOver:i=>{i.currentTarget.style.transform="scale(1.03)",i.currentTarget.style.borderColor="var(--gold)"},onMouseOut:i=>{i.currentTarget.style.transform="scale(1)",i.currentTarget.style.borderColor=s?"var(--gold)":"rgba(255,255,255,0.04)"},children:[e("span",{style:{fontSize:"9px",fontWeight:"800",color:s?"var(--gold)":"#fff",display:"block"},children:t.label}),e("span",{style:{fontSize:"6.5px",color:r,display:"block",marginTop:"2px",fontWeight:"bold",whiteSpace:"nowrap"},children:l})]},t.id)})})]})]})]}):o("div",{className:"sug-card",style:{borderTop:"3px solid rgba(255, 171, 0, 0.3)",background:"rgba(20, 24, 33, 0.45)",backdropFilter:"blur(12px)",padding:"24px 16px",textAlign:"center",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px",border:"1px solid rgba(255, 171, 0, 0.15)",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"},children:[e("div",{style:{width:"44px",height:"44px",borderRadius:"50%",background:"rgba(255, 171, 0, 0.1)",display:"flex",alignItems:"center",justifyContent:"center",border:"1px dashed var(--gold)",boxShadow:"0 0 15px rgba(255, 171, 0, 0.2)",animation:"aiDotBlink 1.5s infinite alternate"},children:e("span",{style:{fontSize:"18px"},children:"\u26A1"})}),e("h4",{style:{color:"#fff",margin:"4px 0 0 0",fontSize:"13px",fontWeight:"800",letterSpacing:"0.2px"},children:"CH\u1EC8 B\xC1O \u0110ANG KH\xD3A"}),o("p",{style:{color:"var(--text2)",fontSize:"11px",lineHeight:"1.5",margin:0},children:["Ch\u1EC9 b\xE1o h\u1EE3p l\u01B0u k\u1EF9 thu\u1EADt \u0111ang t\u1EA1m \u1EA9n. Vui l\xF2ng b\u1EA5m v\xE0o tab ",e("strong",{style:{color:"var(--gold)"},children:"\u{1F916} Ph\xE2n t\xEDch A.I"})," v\xE0 kh\u1EDFi ch\u1EA1y \u0111\u1EC3 k\xEDch ho\u1EA1t \u0111\u1ED3ng b\u1ED9 d\u1EEF li\u1EC7u."]})]})]})]}),o("main",{className:"main",children:[o("div",{className:"sym-header",children:[o("div",{className:"sym-info",children:[o("div",{className:"sym-title-wrap",children:[e("span",{className:"sym-title",children:"GOLD (XAU/USD)"}),e("span",{className:"sym-subtitle",children:"V\xE0ng giao ngay / \u0110\xF4 la M\u1EF9"})]}),o("div",{className:"price-info",children:[o("span",{className:"price-current",children:["$",T.toFixed(2)]}),o("span",{className:`price-change ${fe>=0?"up":"down"}`,children:[fe>=0?"+":"",fe.toFixed(3),"%"]})]})]}),e("div",{className:"hide-on-mobile",style:{display:"flex",gap:"4px",background:"var(--bg3)",padding:"3px",borderRadius:"6px",border:"1px solid var(--border)",marginLeft:"auto",marginRight:"6px"},children:[{id:"1",name:"M1"},{id:"5",name:"M5"},{id:"15",name:"M15"},{id:"60",name:"1H"},{id:"1D",name:"1D"}].map(t=>e("button",{onClick:()=>{I(),tt(t.id)},style:{background:d===t.id?"var(--yellow)":"transparent",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:"bold",color:d===t.id?"#000":"var(--text2)",cursor:"pointer",transition:"all 0.15s ease"},children:t.name},t.id))}),e("div",{style:{display:"flex",gap:"6px",alignItems:"center",marginLeft:"6px"},children:e("button",{onClick:()=>{I(),q("tradingview")},className:`tf-btn ${C==="tradingview"?"active":""}`,style:{background:C==="tradingview"?"var(--yellow)":"var(--bg3)",borderColor:C==="tradingview"?"var(--yellow)":"rgba(255,255,255,0.05)",color:C==="tradingview"?"#000":"var(--text2)",fontWeight:"bold",cursor:"pointer",fontSize:"11px",padding:"5px 12px",borderRadius:"4px",transition:"all 0.2s ease"},children:"\u{1F4CA} BI\u1EC2U \u0110\u1ED2 TRADINGVIEW"})})]}),aa&&e("div",{className:"load-bar",children:e("div",{className:"load-fill"})}),Ae&&o("div",{className:"err-msg",children:["\u26A0\uFE0F L\u1ED7i: ",Ae]}),o("div",{className:"main-workspace",children:[e("div",{className:`chart-column ${pt?"full-chart-active":""}`,children:e("div",{className:"chart-wrap",style:{height:"100%",width:"100%",display:"flex",flexDirection:"column",position:"relative"},children:C==="tradingview"?o(K,{children:[e(Ka,{timeframe:d}),za&&o("div",{className:"tv-guide-overlay",children:[o("div",{className:"tv-guide-header",children:[o("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[e("span",{className:"tv-guide-icon",children:"\u{1F4A1}"}),e("span",{className:"tv-guide-title",children:"M\u1EB9o: B\u1EADt \u0110\u1EBFm Ng\u01B0\u1EE3c \u0110\xF3ng N\u1EBFn Tr\xEAn Chart"})]}),e("button",{className:"tv-guide-close",onClick:()=>Ea(!1),children:"\xD7"})]}),o("div",{className:"tv-guide-body",children:["\u0110\u1EC3 ch\u1EA1y \u0111\u1EBFm ng\u01B0\u1EE3c n\u1EBFn th\u1EDDi gian th\u1EF1c \u1EDF d\u01B0\u1EDBi t\u1EF7 gi\xE1 ",o("strong",{style:{color:"var(--green)"},children:["$",T.toFixed(2)]}),":",o("ol",{className:"tv-guide-steps",children:[o("li",{children:[e("strong",{children:"Click chu\u1ED9t ph\u1EA3i"})," v\xE0o v\xF9ng c\u1ED9t t\u1EF7 gi\xE1 b\xEAn ph\u1EA3i bi\u1EC3u \u0111\u1ED3."]}),o("li",{children:["Ch\u1ECDn d\xF2ng ",e("strong",{style:{color:"var(--gold)"},children:'"\u0110\u1EBFm ng\u01B0\u1EE3c t\u1EDBi khi \u0111\xF3ng n\u1EBFn" (Countdown to bar close)'}),"."]})]}),e("div",{className:"tv-guide-footer",children:"\u2713 T\u1EF1 \u0111\u1ED9ng l\u01B0u v\xE0 ho\u1EA1t \u0111\u1ED9ng v\u0129nh vi\u1EC5n tr\xEAn tr\xECnh duy\u1EC7t c\u1EE7a b\u1EA1n!"})]})]})]}):o("div",{style:{position:"relative",width:"100%",height:"100%",flex:1,display:"flex",flexDirection:"column",background:"#131722",overflow:"hidden"},children:[c?o("svg",{className:"chart-svg",ref:kt,width:"100%",height:"100%",viewBox:`0 0 ${c.width} ${c.height}`,preserveAspectRatio:"none",onMouseDown:Ua,onMouseMove:Wa,onMouseUp:je,onMouseLeave:je,onDoubleClick:Ga,style:{cursor:ae.current?"grabbing":"crosshair",userSelect:"none"},children:[e("defs",{children:o("filter",{id:"glow",x:"-20%",y:"-20%",width:"140%",height:"140%",children:[e("feGaussianBlur",{stdDeviation:"3",result:"blur"}),o("feMerge",{children:[e("feMergeNode",{in:"blur"}),e("feMergeNode",{in:"SourceGraphic"})]})]})}),c.priceLabels.map((t,a)=>o("g",{children:[e("line",{x1:c.paddingLeft,y1:t.y,x2:c.width-c.paddingRight,y2:t.y,stroke:"rgba(255, 255, 255, 0.03)",strokeWidth:"1"}),o("text",{x:c.width-c.paddingRight+8,y:t.y+4,fill:"var(--text3)",fontSize:"10px",fontFamily:"monospace",children:["$",t.price.toFixed(2)]})]},`grid-y-${a}`)),c.timeLabels.map((t,a)=>o("g",{children:[e("line",{x1:t.x,y1:0,x2:t.x,y2:c.height-c.paddingBottom,stroke:"rgba(255, 255, 255, 0.02)",strokeWidth:"1"}),e("text",{x:t.x-18,y:c.height-12,fill:"var(--text3)",fontSize:"9.5px",fontFamily:"monospace",children:t.label})]},`grid-x-${a}`)),m&&(()=>{let t=c.getY(m.entryMid),a=c.getY(m.sl),r=c.getY(m.tp2),n=c.paddingLeft,l=c.width-c.paddingRight;return o(K,{children:[e("rect",{x:n,y:Math.min(t,a),width:l-n,height:Math.abs(t-a),fill:"rgba(255, 23, 68, 0.06)",stroke:"rgba(255, 23, 68, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"}),e("rect",{x:n,y:Math.min(t,r),width:l-n,height:Math.abs(t-r),fill:"rgba(0, 230, 118, 0.06)",stroke:"rgba(0, 230, 118, 0.15)",strokeWidth:"1",strokeDasharray:"2,2"})]})})(),u?.advancedAnalysis&&(()=>{let t=u.advancedAnalysis,a=c.paddingLeft,r=c.width-c.paddingRight;return o("g",{id:"smc-dynamic-structures",children:[t.orderBlocks?.map((n,l)=>{let s=n.index,i=n.mitigated?Math.min(x.length-1,n.index+10):x.length-1,f=c.getX(s-F),g=c.getX(i-F),b=Math.max(a,f),v=Math.min(r,g);if(b>=v)return null;let w=c.getY(n.high),h=c.getY(n.low),y=Math.min(w,h),k=Math.abs(w-h),S=n.type==="BULLISH",M=S?"rgba(0, 230, 118, 0.06)":"rgba(255, 23, 68, 0.06)",E=S?"rgba(0, 230, 118, 0.22)":"rgba(255, 23, 68, 0.22)",j=S?"+OB BULLISH":"-OB BEARISH",P=S?"rgba(0, 230, 118, 0.8)":"rgba(255, 23, 68, 0.8)";return o("g",{children:[e("rect",{x:b,y,width:v-b,height:k,fill:M,stroke:E,strokeWidth:"1"}),v-b>50&&e("text",{x:b+6,y:y+11,fill:P,fontSize:"8px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:j})]},`ob-${l}`)}),t.fvgs?.map((n,l)=>{let s=Math.max(0,n.index-2),i=n.mitigated?Math.min(x.length-1,n.index+6):x.length-1,f=c.getX(s-F),g=c.getX(i-F),b=Math.max(a,f),v=Math.min(r,g);if(b>=v)return null;let w=c.getY(n.top),h=c.getY(n.bottom),y=Math.min(w,h),k=Math.abs(w-h),S=n.type==="BULLISH",M=S?"rgba(0, 188, 212, 0.04)":"rgba(233, 30, 99, 0.04)",E=S?"rgba(0, 188, 212, 0.16)":"rgba(233, 30, 99, 0.16)",j=S?"FVG BULLISH":"FVG BEARISH",P=S?"rgba(0, 188, 212, 0.65)":"rgba(233, 30, 99, 0.65)";return o("g",{children:[e("rect",{x:b,y,width:v-b,height:k,fill:M,stroke:E,strokeWidth:"0.8",strokeDasharray:"2,2"}),v-b>50&&k>6&&e("text",{x:b+6,y:y+9,fill:P,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:j})]},`fvg-${l}`)}),t.structureShifts?.map((n,l)=>{let s=x.findIndex(k=>k.time===n.time);if(s===-1)return null;let i=Math.min(x.length-1,s+20),f=c.getX(s-F),g=c.getX(i-F),b=Math.max(a,f),v=Math.min(r,g);if(b>=v)return null;let w=c.getY(n.price),h=n.direction==="BULLISH",y=h?"var(--green)":"var(--red)";return o("g",{children:[e("line",{x1:b,y1:w,x2:v,y2:w,stroke:y,strokeWidth:"1.2",strokeDasharray:"3,3",opacity:"0.85"}),o("g",{transform:`translate(${b+6}, ${w-6})`,children:[e("rect",{x:"-3",y:"-2",width:"48",height:"12",rx:"3",fill:"rgba(19, 23, 34, 0.95)",stroke:y,strokeWidth:"0.8"}),o("text",{x:"21",y:"7",textAnchor:"middle",fill:y,fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",children:[n.type," ",h?"\u2197":"\u2198"]})]})]},`shift-${l}`)}),t.sweeps?.map((n,l)=>{let s=x.findIndex(b=>b.time===n.time);if(s===-1)return null;let i=c.getX(s-F);if(i<a||i>r)return null;let f=c.getY(n.price),g=n.type==="SSL";return o("g",{children:[e("line",{x1:i-4,y1:f-4,x2:i+4,y2:f+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("line",{x1:i+4,y1:f-4,x2:i-4,y2:f+4,stroke:"var(--yellow)",strokeWidth:"1.5"}),e("text",{x:i,y:g?f+14:f-10,textAnchor:"middle",fill:"var(--yellow)",fontSize:"7.5px",fontWeight:"bold",fontFamily:"monospace",pointerEvents:"none",children:g?"SSL SWEEP":"BSL SWEEP"})]},`sweep-${l}`)})]})})(),Q.map((t,a)=>{let r=c.getX(a),n=c.getY(t.high),l=c.getY(t.low),s=c.getY(t.open),i=c.getY(t.close),g=t.close>=t.open?"var(--green)":"var(--red)";return o("g",{children:[e("line",{x1:r,y1:n,x2:r,y2:l,stroke:g,strokeWidth:"1.5"}),e("rect",{x:r-c.bodyWidth/2,y:Math.min(s,i),width:c.bodyWidth,height:Math.max(1.5,Math.abs(s-i)),fill:g,stroke:g,strokeWidth:"0.5"})]},`candle-${a}`)}),ft&&(()=>{let t="";for(let a=0;a<Q.length;a++){let r=F+a,n=Pa[r];if(n){let l=c.getX(a),s=c.getY(n);t===""?t+=`M ${l} ${s}`:t+=` L ${l} ${s}`}}return t?e("path",{d:t,fill:"none",stroke:Et,strokeWidth:"2",opacity:"0.85"}):null})(),vt&&(()=>{let t="";for(let a=0;a<Q.length;a++){let r=F+a,n=Ra[r];if(n){let l=c.getX(a),s=c.getY(n);t===""?t+=`M ${l} ${s}`:t+=` L ${l} ${s}`}}return t?e("path",{d:t,fill:"none",stroke:Pt,strokeWidth:"2.2",opacity:"0.85"}):null})(),Ue&&(()=>{let{i1:t,price1:a,i2:r,price2:n}=Ue,l=(n-a)/(r-t),s=c.getX(t-F),i=c.getY(a),g=x.length-1+10,b=c.getX(g-F),v=c.getY(a+l*(g-t));return o("g",{children:[e("line",{x1:s,y1:i,x2:b,y2:v,stroke:"var(--gold)",strokeWidth:"2.5",strokeDasharray:"6,4",filter:"url(#glow)"}),e("circle",{cx:s,cy:i,r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),e("circle",{cx:c.getX(r-F),cy:c.getY(n),r:"4",fill:"var(--gold)",stroke:"#000",strokeWidth:"1"}),o("text",{x:Math.max(s+10,c.width-c.paddingRight-180),y:v-10,fill:"var(--gold)",fontSize:"10px",fontWeight:"bold",fontFamily:"monospace",opacity:"0.9",children:["\u2198 \u0110\u01AF\u1EDCNG XU H\u01AF\u1EDANG GI\u1EA2M ",d==="1D"?"D1":d==="1W"?"W1":d==="1M"?"MN":`M${d}`," (SMC)"]})]})})(),m&&(()=>{let t=c.getY(m.entryMid),a=c.getY(m.sl),r=c.getY(m.tp1),n=c.getY(m.tp2),l=c.paddingLeft,s=c.width-c.paddingRight;return o("g",{children:[e("line",{x1:l,y1:a,x2:s,y2:a,stroke:"var(--red)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:a-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 23, 68, 0.2)",stroke:"var(--red)",strokeWidth:"1"}),o("text",{x:s+8,y:a+4,fill:"var(--red)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["SL:$",m.sl.toFixed(1)]}),e("line",{x1:l,y1:t,x2:s,y2:t,stroke:"var(--gold)",strokeWidth:"1.5",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:t-8,width:"60",height:"16",rx:"3",fill:"rgba(255, 171, 0, 0.2)",stroke:"var(--gold)",strokeWidth:"1"}),o("text",{x:s+8,y:t+4,fill:"var(--gold)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["ENT:$",m.entryMid.toFixed(1)]}),e("line",{x1:l,y1:r,x2:s,y2:r,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:r-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),o("text",{x:s+8,y:r+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP1:$",m.tp1.toFixed(1)]}),e("line",{x1:l,y1:n,x2:s,y2:n,stroke:"var(--green)",strokeWidth:"1.2",strokeDasharray:"4,4"}),e("rect",{x:s+4,y:n-8,width:"60",height:"16",rx:"3",fill:"rgba(0, 230, 118, 0.15)",stroke:"var(--green)",strokeWidth:"1"}),o("text",{x:s+8,y:n+4,fill:"var(--green)",fontSize:"9px",fontWeight:"bold",fontFamily:"monospace",children:["TP2:$",m.tp2.toFixed(1)]})]})})()]}):e("div",{className:"chart-empty",style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",color:"var(--text3)"},children:"\u0110ang d\u1EF1ng bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt..."}),o("div",{className:"chart-ema-legend",onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:[o("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:Et,color:Et}}),o("span",{className:"ema-legend-name",style:{color:ft?"#fff":"var(--text3)"},children:["EMA ",Ct," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:It})]}),o("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${ft?"active":""}`,onClick:()=>pa(!ft),title:ft?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:ft?o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>Rt("ema50"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Xt("ema50"),_t("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]}),o("div",{className:"ema-legend-row",children:[e("span",{className:"ema-legend-dot",style:{backgroundColor:Pt,color:Pt}}),o("span",{className:"ema-legend-name",style:{color:vt?"#fff":"var(--text3)"},children:["EMA ",At," ",e("span",{style:{opacity:.6,fontSize:"9.5px"},children:zt})]}),o("div",{className:"ema-legend-actions",children:[e("button",{className:`ema-action-btn ${vt?"active":""}`,onClick:()=>ca(!vt),title:vt?"\u1EA8n \u0111\u01B0\u1EDDng EMA":"Hi\u1EC7n \u0111\u01B0\u1EDDng EMA",children:vt?o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e("circle",{cx:"12",cy:"12",r:"3"})]}):o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}),e("button",{className:"ema-action-btn",onClick:()=>Rt("ema200"),title:"C\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 (Length, Source, Color)",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("circle",{cx:"12",cy:"12",r:"3"}),e("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}),e("button",{className:"ema-action-btn open-source-btn",onClick:()=>{Xt("ema200"),_t("pine")},title:"Xem m\xE3 ngu\u1ED3n m\u1EDF ch\u1EC9 b\xE1o",children:o("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e("polyline",{points:"16 18 22 12 16 6"}),e("polyline",{points:"8 6 2 12 8 18"})]})})]})]})]}),lt&&e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:t=>t.stopPropagation(),onMouseMove:t=>t.stopPropagation(),children:o("div",{className:"chart-modal-card",children:[o("div",{className:"chart-modal-header",children:[o("span",{className:"chart-modal-title",children:["\u2699\uFE0F C\xE0i \u0110\u1EB7t Ch\u1EC9 B\xE1o: EMA ",lt==="ema50"?"50":"200"]}),e("button",{className:"chart-modal-close",onClick:()=>Rt(null),children:"\xD7"})]}),o("div",{className:"chart-modal-body",children:[o("div",{className:"settings-group",children:[e("label",{className:"settings-label",children:"Chu k\u1EF3 (Length)"}),o("div",{className:"settings-input-row",children:[e("input",{type:"number",min:"2",max:"500",className:"settings-number-input",value:ue,onChange:t=>xe(Math.max(2,parseInt(t.target.value)||2))}),e("span",{style:{fontSize:"11px",color:"var(--text3)"},children:"(2 - 500 n\u1EBFn)"})]})]}),o("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"Ngu\u1ED3n gi\xE1 tr\u1ECB (Source)"}),e("div",{className:"settings-input-row",children:o("select",{className:"settings-select",value:be,onChange:t=>me(t.target.value),children:[e("option",{value:"close",children:"\u0110\xF3ng c\u1EEDa (Close)"}),e("option",{value:"open",children:"M\u1EDF c\u1EEDa (Open)"}),e("option",{value:"high",children:"Cao nh\u1EA5t (High)"}),e("option",{value:"low",children:"Th\u1EA5p nh\u1EA5t (Low)"})]})})]}),o("div",{className:"settings-group",style:{marginTop:"12px"},children:[e("label",{className:"settings-label",children:"M\xE0u \u0111\u01B0\u1EDDng ch\u1EC9 b\xE1o (Color)"}),e("div",{className:"settings-colors-grid",children:["#FFD700","#00e5ff","#FF1744","#d500f9","#00e676","#ff9100","#ffffff","#787b86"].map(t=>e("div",{className:`settings-color-dot ${Kt===t?"active":""}`,style:{backgroundColor:t},onClick:()=>qt(t)},t))}),o("div",{style:{marginTop:"10px",width:"100%"},children:[e("span",{style:{fontSize:"11px",color:"var(--text3)",display:"block",marginBottom:"4px"},children:"M\xE3 m\xE0u HEX t\xF9y ch\u1EC9nh:"}),e("input",{type:"text",className:"settings-number-input",style:{width:"120px"},value:Kt,onChange:t=>qt(t.target.value)})]})]})]}),o("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn cancel",onClick:()=>Rt(null),children:"H\u1EE7y b\u1ECF"}),e("button",{className:"modal-btn apply",onClick:fa,children:"\xC1p d\u1EE5ng"})]})]})}),jt&&(()=>{let t=jt==="ema50"?Ct:At,a=jt==="ema50"?It:zt,n=`//@version=5
// \xA9 TradingView Pine Script v5
// Ch\u1EC9 b\xE1o Exponential Moving Average (EMA) - B\u1EA3n M\xE3 Ngu\u1ED3n M\u1EDF
indicator("Exponential Moving Average", shorttitle="EMA ${t}", overlay=true)

// C\u1EA5u h\xECnh c\xE1c tham s\u1ED1 \u0111\u1EA7u v\xE0o c\u1EE7a ch\u1EC9 b\xE1o
lengthInput = input.int(${t}, minval=1, title="Length")
sourceInput = input.source(${a}, title="Source")

// H\xE0m t\xEDnh to\xE1n EMA t\xEDch l\u0169y \u0111\u1ED9ng
emaValue = ta.ema(sourceInput, lengthInput)

// V\u1EBD \u0111\u01B0\u1EDDng EMA l\xEAn bi\u1EC3u \u0111\u1ED3 k\u1EF9 thu\u1EADt v\u1EDBi m\xE0u s\u1EAFc l\u1EF1a ch\u1ECDn
plot(emaValue, title="EMA Line", color=color.from_hex("${jt==="ema50"?Et:Pt}"), linewidth=2)`,l=`/**
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
}`;return e("div",{className:"chart-overlay-modal",style:{pointerEvents:"auto"},onMouseDown:s=>s.stopPropagation(),onMouseMove:s=>s.stopPropagation(),children:o("div",{className:"chart-modal-card wide",children:[o("div",{className:"chart-modal-header",children:[o("span",{className:"chart-modal-title",children:["\u{1F4D6} M\xE3 Ngu\u1ED3n M\u1EDF Ch\u1EC9 B\xE1o: EMA ",t," (",a,")"]}),e("button",{className:"chart-modal-close",onClick:()=>Xt(null),children:"\xD7"})]}),o("div",{className:"chart-modal-body",children:[o("div",{className:"chart-modal-tabs",children:[e("button",{className:`chart-modal-tab-btn ${Dt==="pine"?"active":""}`,onClick:()=>_t("pine"),children:"Pine Script v5 (TradingView)"}),e("button",{className:`chart-modal-tab-btn ${Dt==="js"?"active":""}`,onClick:()=>_t("js"),children:"JavaScript / TypeScript"})]}),e("div",{className:"code-container",children:e("pre",{style:{margin:0},children:e("code",{children:Dt==="pine"?n:l})})}),o("div",{style:{marginTop:"12px",fontSize:"11.5px",color:"var(--text3)",display:"flex",gap:"6px",alignItems:"flex-start",lineHeight:"1.4"},children:[e("span",{children:"\u{1F4A1}"}),e("span",{children:Dt==="pine"?"M\xE3 ngu\u1ED3n Pine Script c\xF3 th\u1EC3 copy v\xE0 d\xE1n tr\u1EF1c ti\u1EBFp v\xE0o m\u1EE5c Pine Editor tr\xEAn trang TradingView c\u1EE7a b\u1EA1n \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng EMA \u0111\u1ED3ng b\u1ED9 100%.":"H\u1EC7 s\u1ED1 m\u01B0\u1EE3t (smoothing multiplier) c\u1EE7a chu k\u1EF3 "+t+" l\xE0 k = 2 / ("+t+" + 1) \u2248 "+(2/(t+1)).toFixed(4)+". \u0110\xE2y l\xE0 thu\u1EADt to\xE1n ti\xEAu chu\u1EA9n ng\xE0nh \u0111\u01B0\u1EE3c t\u1ED1i \u01B0u h\xF3a ch\u1EA1y tr\u1EF1c ti\u1EBFp tr\xEAn Deno Sandbox."})]})]}),o("div",{className:"chart-modal-footer",children:[e("button",{className:"modal-btn apply",onClick:()=>{navigator.clipboard.writeText(Dt==="pine"?n:l),alert("\u0110\xE3 sao ch\xE9p m\xE3 ngu\u1ED3n ch\u1EC9 b\xE1o v\xE0o Clipboard!")},children:"\u{1F4CB} Sao ch\xE9p m\xE3 ngu\u1ED3n"}),e("button",{className:"modal-btn cancel",onClick:()=>Xt(null),children:"\u0110\xF3ng"})]})]})})})(),o("div",{className:"chart-badge",style:{display:"flex",alignItems:"center",gap:"10px",pointerEvents:"auto"},children:[o("span",{children:["\u{1F4C8} C\u1EA4U TR\xDAC V\xC0NG ",d==="1D"?"D1":d==="1W"?"W1":d==="1M"?"MN":`M${d}`," (SMC)"]}),e("span",{style:{color:"rgba(255,255,255,0.15)"},children:"|"}),e("button",{onClick:Xe,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2795 Ph\xF3ng to"}),e("button",{onClick:_e,style:{background:"none",border:"none",color:"#fff",cursor:"pointer",fontWeight:"bold"},children:"\u2796 Thu nh\u1ECF"}),e("button",{onClick:Fa,style:{background:"none",border:"none",color:Be?"var(--green)":"var(--yellow)",cursor:"pointer",fontWeight:"bold"},children:Be?"\u25CF TR\u1EF0C TI\u1EBEP":"\u23EE XEM GI\xC1 TR\u1EF0C TI\u1EBEP"})]})]})})}),!pt&&o("div",{className:"realtime-panel",style:{height:"100%"},children:[e("div",{className:"panel-tab",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px",background:"var(--bg3)",borderBottom:"1px solid var(--border)"},children:e("span",{style:{fontSize:"11.5px",fontWeight:"700",color:"var(--gold)",letterSpacing:"0.5px"},children:"\u{1F4C5} L\u1ECACH KINH T\u1EBE (INVESTING)"})}),e("div",{style:{flex:1,width:"100%",height:"calc(100% - 37px)",overflow:"hidden"},children:e("iframe",{src:"https://sslecal2.investing.com/?ecoTimezone=28&ecoLanguage=52&lang=52&columns=time,currency,importance,event,actual,forecast,previous&features=datepicker,timezone&countryIds=5,72,17,25,32,6,37,43,22,39,35,42,4,36,110,26,12,11,10,38,14&calType=week&timeFrame=today",width:"100%",height:"100%",frameBorder:"0",allowTransparency:"true",marginWidth:0,marginHeight:0,style:{border:"none",filter:"invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(0.95)",background:"transparent"}})})]})]}),u&&!pt&&o("div",{className:"signal-dash",children:[o("div",{className:"dash-tabs",children:[e("button",{className:`dash-tab-btn ${Y==="ai"?"active":""}`,onClick:()=>Gt("ai"),children:"\u{1F916} PH\xC2N T\xCDCH A.I"}),e("button",{className:`dash-tab-btn ${Y==="backtest"?"active":""}`,onClick:()=>Gt("backtest"),children:"\u{1F4CA} L\u1ECACH S\u1EEC CH\u1ED0T L\u1EDCI / C\u1EAET L\u1ED6"}),e("button",{className:`dash-tab-btn ${Y==="outlook"?"active":""}`,onClick:()=>Gt("outlook"),children:"\u{1F4CB} NH\u1EACN \u0110\u1ECANH TH\u1ECA TR\u01AF\u1EDCNG"})]}),Y==="ai"&&u&&u.advancedAnalysis&&e("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:Yt?o("div",{className:"ai-scan-container",children:[e("div",{className:"ai-scan-glow"}),o("div",{className:"ai-radial-wrap",children:[o("svg",{className:"ai-radial-svg",width:"120",height:"120",children:[e("circle",{className:"ai-radial-bg",cx:"60",cy:"60",r:"50",strokeWidth:"8",fill:"transparent"}),e("circle",{className:"ai-radial-fill",cx:"60",cy:"60",r:"50",strokeWidth:"8",fill:"transparent",strokeDasharray:"314.16",strokeDashoffset:314.16-314.16*Vt/5})]}),o("span",{className:"ai-countdown-number",children:[Vt,"s"]})]}),e("div",{className:"ai-scan-step-title",children:"\u26A1 \u0110ang ph\xE2n t\xEDch \u0111a c\u1EA5u tr\xFAc th\u1ECB tr\u01B0\u1EDDng"}),e("div",{className:"ai-scan-step-desc",children:da}),e("div",{className:"ai-scan-logs",children:[{s:5,label:"K\u1EBFt n\u1ED1i m\xE1y ch\u1EE7, t\u1EA3i d\u1EEF li\u1EC7u n\u1EBFn Spot XAU/USD"},{s:4,label:"Ph\xE2n t\xEDch c\u1EA5u tr\xFAc SMC (BOS, CHoCH, Order Block, FVG)"},{s:3,label:"X\xE1c \u0111\u1ECBnh Price Action & qu\xE9t thanh kho\u1EA3n (Liquidity Sweep)"},{s:2,label:"Nh\u1EADn di\u1EC7n m\xF4 h\xECnh n\u1EBFn \u0111\u1EA3o chi\u1EC1u c\u01B0\u1EDDng \u0111\u1ED9 cao"},{s:1,label:"T\u1ED1i \u01B0u h\xF3a \u0111i\u1EC3m LIMIT ch\u1ED1ng qu\xE9t SL & t\u1EF7 l\u1EC7 RR"}].map((t,a)=>{let r=Vt<t.s?"completed":Vt===t.s?"active":"";return o("div",{className:`ai-scan-log-item ${r}`,children:[e("div",{className:"ai-scan-log-dot"}),o("span",{children:[t.label," ",r==="completed"?"\u{1F7E2} HO\xC0N TH\xC0NH":r==="active"?"\u26A1 \u0110ANG QU\xC9T...":"\u23F3 CH\u1EDC"]})]},a)})})]}):o(K,{children:[(()=>{let t=W[d];if(t&&(t.status==="PENDING"||t.status==="ACTIVE")){let r=t.position==="BUY";return o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",borderTop:`4px solid ${r?"var(--green)":"var(--red)"}`,boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"16px"},children:[o("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[o("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F3AF}"}),o("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"#fff",margin:0,letterSpacing:"0.5px"},children:"K\u1EBE HO\u1EA0CH GIAO D\u1ECACH LIMIT T\u1ED0I \u01AFU A.I"}),o("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:["Qu\xE9t b\u1EABy thanh kho\u1EA3n (Anti Stop Hunt) \u2022 Khung ",d==="1"?"M1":d==="5"?"M5":d==="15"?"M15":d==="60"?"H1":"D1"," \u2022 C\u1EE1 l\xF4: ",d==="5"?.2:d==="15"?.5:d==="60"?1:d==="1D"?2:.1," Lot"]})]})]}),o("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t.hitTp1&&e("span",{style:{fontSize:"10px",fontWeight:"bold",padding:"3px 8px",borderRadius:"4px",background:"rgba(0, 230, 118, 0.15)",color:"var(--green)",border:"1px solid var(--green)",animation:"aiDotBlink 1.5s infinite alternate"},children:"\u{1F389} \u0110\xC3 CH\u1EA0M TP1 (D\u1EDCI SL H\xD2A V\u1ED0N)"}),e("span",{style:{fontSize:"10px",fontWeight:"bold",padding:"3px 8px",borderRadius:"4px",background:t.status==="ACTIVE"?"rgba(0, 230, 118, 0.12)":"rgba(255, 171, 0, 0.12)",color:t.status==="ACTIVE"?"var(--green)":"var(--yellow)",border:`1px solid ${t.status==="ACTIVE"?"var(--green)":"var(--yellow)"}`,animation:"aiDotBlink 1.5s infinite alternate"},children:t.status==="ACTIVE"?"\u{1F7E2} ACTIVE":"\u23F3 PENDING LIMIT"}),e("span",{style:{fontSize:"11px",fontWeight:"bold",textTransform:"uppercase",padding:"4px 10px",borderRadius:"6px",background:r?"rgba(0, 230, 118, 0.12)":"rgba(255, 23, 68, 0.12)",color:r?"var(--green)":"var(--red)",border:`1px solid ${r?"rgba(0, 230, 118, 0.25)":"rgba(255, 23, 68, 0.25)"}`},children:r?"\u{1F402} BUY LIMIT":"\u{1F43B} SELL LIMIT"})]})]}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"12px",background:"rgba(255, 255, 255, 0.02)",padding:"12px",borderRadius:"8px",border:"1px solid rgba(255, 255, 255, 0.04)"},children:[o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"M\u1EE8C CH\u1EDC V\xC0O (ENTRY)"}),o("strong",{style:{fontSize:"14px",color:"var(--gold)",fontFamily:"monospace"},children:["$",t.entry.toFixed(2)]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"C\u1EAET L\u1ED6 AN TO\xC0N (SL)"}),o("strong",{style:{fontSize:"14px",color:"var(--red)",fontFamily:"monospace"},children:["$",t.stopLoss.toFixed(2)]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 1 (TP1)"}),o("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:["$",t.takeProfit1.toFixed(2)]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"CH\u1ED0T L\u1EDCI 2 (TP2)"}),o("strong",{style:{fontSize:"14px",color:"var(--green)",fontFamily:"monospace"},children:["$",t.takeProfit2.toFixed(2)]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[e("span",{style:{fontSize:"9.5px",color:"var(--text3)"},children:"T\u1EF6 L\u1EC6 L\u1EE2I NHU\u1EACN (R:R)"}),o("strong",{style:{fontSize:"14px",color:"#fff",fontFamily:"monospace"},children:["1:",t.rrRatio]})]})]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:[o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 171, 0, 0.02)",borderLeft:"4px solid var(--gold)",border:"1px solid rgba(255, 171, 0, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--gold)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F4E5} SMC - \u0110\u1ECCC V\u1ECA B\u1EAAY D\u1EEANG L\u1ED6 (ENTRY RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:t.entryReason})]}),o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(255, 23, 68, 0.02)",borderLeft:"4px solid var(--red)",border:"1px solid rgba(255, 23, 68, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--red)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F6E1}\uFE0F PRICE ACTION - \u0110I\u1EC2M D\u1EEANG B\u1EA2O V\u1EC6 V\u1ED0N (SL RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:t.slReason})]}),o("div",{style:{padding:"14px",borderRadius:"8px",background:"rgba(0, 230, 118, 0.02)",borderLeft:"4px solid var(--green)",border:"1px solid rgba(0, 230, 118, 0.05)",borderLeftWidth:"4px"},children:[e("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"},children:e("span",{style:{color:"var(--green)",fontWeight:"bold",fontSize:"12.5px"},children:"\u{1F3AF} M\xD4 H\xCCNH N\u1EBEN - CH\u1ED0T L\u1EDCI \u0110\xCDCH \u0110\u1EBEN (TP RATIONALE)"})}),e("p",{style:{fontSize:"12px",color:"var(--text)",lineHeight:"1.6",margin:0},children:t.tpReason})]})]})]}),o("div",{className:"sug-card ai-lock-card",style:{margin:0,background:"rgba(20, 24, 33, 0.75)",borderTop:"3px solid var(--text3)"},children:[e("div",{className:"ai-lock-icon",children:"\u{1F512}"}),e("div",{className:"ai-lock-title",children:"V\u1ECA TH\u1EBE KHUNG KH\xC1C BI\u1EC6T \u0110ANG HO\u1EA0T \u0110\u1ED8NG"}),o("div",{className:"ai-lock-desc",children:["A.I \u0111ang duy tr\xEC v\xE0 theo d\xF5i v\u1ECB th\u1EBF giao d\u1ECBch ",t.position," LIMIT \u1EDF gi\xE1 $",t.entry.toFixed(2)," tr\xEAn khung ",d==="1"?"M1":d==="5"?"M5":d==="15"?"M15":d==="60"?"H1":"D1",". H\u1EC7 th\u1ED1ng \u0111\xE3 kh\xF3a t\xEDnh n\u0103ng ph\xE2n t\xEDch \u0111\u1EC3 b\u1EA3o \u0111\u1EA3m t\xEDnh nh\u1EA5t qu\xE1n giao d\u1ECBch ch\u1ED1ng nhi\u1EC5u t\xEDn hi\u1EC7u."]}),e("button",{className:"ai-restart-btn",disabled:!0,style:{opacity:.5},children:"\u231B CH\u1EDC L\u1EC6NH CH\u1EA0M TP / SL \u0110\u1EC2 PH\xC2N T\xCDCH CHU K\u1EF2 M\u1EDAI"})]})]})}else return o("div",{style:{textAlign:"center",padding:"40px 20px"},children:[t&&o("div",{style:{background:t.status==="TP"?"rgba(0, 230, 118, 0.06)":"rgba(255, 23, 68, 0.06)",border:`1px solid ${t.status==="TP"?"var(--green)":"var(--red)"}`,borderRadius:"12px",padding:"20px",maxWidth:"500px",margin:"0 auto 30px auto",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"},children:[e("div",{style:{fontSize:"28px",marginBottom:"8px"},children:t.status==="TP"?"\u{1F3C6}":"\u{1F6E1}\uFE0F"}),o("h4",{style:{color:"#fff",margin:0,fontSize:"13px",fontWeight:"800",textTransform:"uppercase"},children:["K\u1EBET QU\u1EA2 GIAO D\u1ECACH A.I V\u1EEAA \u0110\xD3NG (",d==="1"?"M1":d==="5"?"M5":d==="15"?"M15":d==="60"?"H1":"D1",")"]}),o("p",{style:{margin:"10px 0 0 0",fontSize:"13px",color:"var(--text)"},children:["Tr\u1EA1ng th\xE1i: ",e("strong",{style:{color:t.status==="TP"?"var(--green)":"var(--red)"},children:t.status==="TP"?`\u{1F7E2} CH\u1ED0T L\u1EDCI TH\xC0NH C\xD4NG (+${Math.abs(t.pips)} pips)`:`\u{1F534} CH\u1EA0M C\u1EAET L\u1ED6 B\u1EA2O V\u1EC6 (-${Math.abs(t.pips)} pips)`})]}),o("p",{style:{margin:"4px 0 0 0",fontSize:"11px",color:"var(--text3)"},children:["Hi\u1EC7u su\u1EA5t t\xE0i kho\u1EA3n: ",e("strong",{style:{color:t.status==="TP"?"var(--green)":"var(--red)"},children:t.status==="TP"?`+$${t.profitUsd.toFixed(2)} USD`:`-$${Math.abs(t.profitUsd).toFixed(2)} USD`})]})]}),o("div",{style:{maxWidth:"500px",margin:"0 auto"},children:[e("div",{style:{fontSize:"40px",marginBottom:"16px"},children:"\u{1F916}"}),e("h3",{style:{color:"#fff",fontSize:"18px",fontWeight:"800",marginBottom:"8px",letterSpacing:"0.2px"},children:"THI\u1EBET L\u1EACP K\u1EBE HO\u1EA0CH LIMIT CH\u1ED0NG QU\xC9T THANH KHO\u1EA2N"}),e("p",{style:{color:"var(--text2)",fontSize:"12px",lineHeight:"1.6",marginBottom:"24px"},children:"Thu\u1EADt to\xE1n A.I s\u1EBD ph\xE2n t\xEDch to\xE0n di\u1EC7n SMC, Price Action, Candlesticks \u0111\u1EC3 t\xECm kho\u1EA3ng gi\xE1 th\u1ECB tr\u01B0\u1EDDng gom thanh kho\u1EA3n (Stop Hunt). T\u1EEB \u0111\xF3 \u0111\u01B0a ra \u0111i\u1EC3m LIMIT t\u1ED1i \u01B0u c\xF3 t\u1EF7 l\u1EC7 RR xu\u1EA5t s\u1EAFc nh\u1EA5t."}),e("button",{className:"ai-restart-btn",onClick:he,style:{width:"100%",maxWidth:"320px",padding:"14px 28px",fontSize:"13px"},children:"\u26A1 KH\u1EDEI CH\u1EA0Y PH\xC2N T\xCDCH & QU\xC9T LIMIT T\u1ED0I \u01AFU"})]})]})})(),o("div",{className:"reasons",style:{background:"rgba(255, 171, 0, 0.02)",borderColor:"rgba(255, 171, 0, 0.1)",margin:"20px 0 0 0"},children:[e("h3",{children:"\u26A0\uFE0F Tuy\xEAn b\u1ED1 mi\u1EC5n tr\u1EEB tr\xE1ch nhi\u1EC7m"}),e("div",{style:{fontSize:"12px",color:"var(--text2)",lineHeight:"1.6"},children:"V\xE0ng (Gold spot) l\xE0 m\u1ED9t trong nh\u1EEFng t\xE0i s\u1EA3n t\xE0i ch\xEDnh c\xF3 \u0111\u1ED9 bi\u1EBFn \u0111\u1ED9ng v\xE0 \u0111\xF2n b\u1EA9y l\u1EDBn nh\u1EA5t th\u1EBF gi\u1EDBi. C\xE1c ph\xE2n t\xEDch k\u1EF9 thu\u1EADt, x\xE1c xu\u1EA5t v\xE0 g\u1EE3i \xFD v\xE0o l\u1EC7nh hi\u1EC3n th\u1ECB tr\xEAn h\u1EC7 th\u1ED1ng ch\u1EC9 mang t\xEDnh ch\u1EA5t tham kh\u1EA3o d\u1EF1a tr\xEAn thu\u1EADt to\xE1n t\xEDch l\u0169y. Kh\xF4ng c\u1EA5u th\xE0nh l\u1EDDi khuy\xEAn \u0111\u1EA7u t\u01B0 t\xE0i ch\xEDnh ch\xEDnh th\u1EE9c. Vui l\xF2ng t\u1EF1 qu\u1EA3n tr\u1ECB v\u1ED1n nghi\xEAm ng\u1EB7t!"})]})]})}),Y==="backtest"&&u&&o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o("div",{className:"sug-card",style:{margin:0,padding:"24px",background:"linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%)",backdropFilter:"blur(20px)",borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.05)",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.4)",display:"flex",flexDirection:"column",gap:"20px"},children:[e("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px",flexWrap:"wrap",gap:"12px"},children:o("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("span",{style:{fontSize:"20px"},children:"\u{1F4CA}"}),o("div",{children:[e("h2",{style:{fontSize:"16px",fontWeight:"800",color:"var(--gold)",margin:0,letterSpacing:"0.5px"},children:"NH\u1EACT K\xDD & L\u1ECACH S\u1EEC GIAO D\u1ECACH A.I BACKTEST"}),e("p",{style:{fontSize:"11px",color:"var(--text3)",margin:"2px 0 0 0"},children:"Hi\u1EC7u su\u1EA5t ki\u1EC3m th\u1EED chi\u1EBFn l\u01B0\u1EE3c tr\xEAn d\u1EEF li\u1EC7u n\u1EBFn bi\u1EC3u \u0111\u1ED3 th\u1EDDi gian th\u1EF1c"})]})]})}),o("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[o("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"Khung th\u1EDDi gian:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:["ALL","M1","M5","M15","H1","D1"].map(t=>e("button",{onClick:()=>na(t),style:{background:nt===t?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${nt===t?"var(--gold)":"var(--border)"}`,color:nt===t?"var(--gold)":"var(--text2)",padding:"4px 10px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t==="ALL"?"\u{1F30D} T\u1EA4T C\u1EA2":`\u26A1 ${t}`},t))})]}),o("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e("span",{style:{fontSize:"11px",fontWeight:"bold",color:"var(--text2)",minWidth:"120px"},children:"L\u1ECDc ng\xE0y giao d\u1ECBch:"}),e("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[{value:"TODAY",label:"\u{1F4C5} H\xF4m nay"},{value:"YESTERDAY",label:"\u{1F4C5} H\xF4m qua"},{value:"ALL",label:"\u{1F310} T\u1EA5t c\u1EA3 c\xE1c ng\xE0y"}].map(t=>e("button",{onClick:()=>sa(t.value),style:{background:ct===t.value?"rgba(255, 215, 0, 0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${ct===t.value?"var(--gold)":"var(--border)"}`,color:ct===t.value?"var(--gold)":"var(--text2)",padding:"4px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",cursor:"pointer",transition:"all 0.2s"},children:t.label},t.value))})]})]}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginTop:"4px"},children:[o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1ED5ng l\u1EC7nh ch\u1ED1t"}),e("strong",{style:{fontSize:"20px",color:"#fff",fontFamily:"monospace"},children:gt.total})]}),o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"T\u1EF7 L\u1EC7 Th\u1EAFng (Win Rate)"}),e("strong",{style:{fontSize:"20px",color:gt.winRate>=50?"var(--green)":"var(--yellow)",fontFamily:"monospace"},children:`${gt.winRate}%`})]}),o("div",{style:{background:"rgba(255,255,255,0.02)",padding:"16px",borderRadius:"8px",border:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:"4px"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",fontWeight:"bold",textTransform:"uppercase"},children:"Pips R\xF2ng t\xEDch l\u0169y"}),e("strong",{style:{fontSize:"20px",color:gt.netPips>=0?"var(--green)":"var(--red)",fontFamily:"monospace"},children:`${gt.netPips>=0?"+":""}${gt.netPips} pips`})]})]})]}),o("div",{className:"smc-card",style:{margin:0},children:[e("h3",{className:"smc-card-title",children:"\u{1F4CB} Nh\u1EADt K\xFD Giao D\u1ECBch Ch\u1ED1t L\u1EDDi / C\u1EAFt L\u1ED7 Chi Ti\u1EBFt"}),e("div",{className:"smc-table-wrap",children:o("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"12px"},children:[e("thead",{children:o("tr",{style:{borderBottom:"1px solid var(--border)",color:"var(--text2)",background:"rgba(255,255,255,0.01)"},children:[e("th",{style:{padding:"12px",fontWeight:"bold"},children:"M\xE3 l\u1EC7nh (ID)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Khung gi\u1EDD"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Lo\u1EA1i l\u1EC7nh"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 kh\u1EDBp (Entry)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"C\u1EAFt L\u1ED7 (SL)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 1 (TP1)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Ch\u1ED1t L\u1EDDi 2 (TP2)"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\xE1 \u0111\xF3ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"K\u1EBFt qu\u1EA3"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Pips r\xF2ng"}),e("th",{style:{padding:"12px",fontWeight:"bold"},children:"Gi\u1EDD \u0111\xF3ng"})]})}),e("tbody",{children:et.length>0?(()=>{let t="";return et.map((a,r)=>{let n=Wt(a.closeTime),l=t!==n;return l&&(t=n),o(_a.Fragment,{children:[l&&e("tr",{style:{background:"rgba(255, 215, 0, 0.04)"},children:o("td",{colSpan:11,style:{padding:"8px 12px",color:"var(--gold)",fontWeight:"bold",letterSpacing:"0.5px"},children:["\u{1F4C5} L\u1EC6NH \u0110\xC3 \u0110\xD3NG NG\xC0Y: ",n]})}),o("tr",{style:{borderBottom:"1px solid rgba(255,255,255,0.03)",background:r%2===0?"rgba(255,255,255,0.005)":"transparent"},children:[e("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--text2)"},children:a.id}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:"smc-badge active",style:{fontSize:"10.5px"},children:a.timeframe})}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${a.position==="BUY"?"bullish":"bearish"}`,style:{fontSize:"10.5px"},children:a.position})}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace"},children:["$",a.entry.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--red)"},children:["$",a.stopLoss.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)"},children:["$",a.takeProfit1.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",color:"var(--green)",opacity:.9},children:["$",a.takeProfit2.toFixed(2)]}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:a.status==="SL"?"var(--red)":"var(--green)"},children:["$",(a.status==="SL"?a.stopLoss:a.status==="TP1"?a.takeProfit1:a.takeProfit2).toFixed(2)]}),e("td",{style:{padding:"10px 12px"},children:e("span",{className:`smc-badge ${a.status==="SL"?"bearish":"bullish"}`,style:{fontSize:"10.5px",background:a.status==="SL"?"rgba(255, 23, 68, 0.15)":"rgba(0, 230, 118, 0.15)",color:a.status==="SL"?"var(--red)":"var(--green)",border:`1.5px solid ${a.status==="SL"?"var(--red)":"var(--green)"}`},children:a.status==="SL"?"STOP LOSS":a.status==="TP1"?"TAKE PROFIT 1":"TAKE PROFIT 2"})}),o("td",{style:{padding:"10px 12px",fontFamily:"monospace",fontWeight:"bold",color:a.pips>=0?"var(--green)":"var(--red)"},children:[a.pips>=0?"+":"",a.pips," pips"]}),e("td",{style:{padding:"10px 12px",color:"var(--text3)"},children:new Date(a.closeTime).toLocaleTimeString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh",hour:"2-digit",minute:"2-digit"})})]})]},`trade-row-${a.id}-${r}`)})})():e("tr",{children:o("td",{colSpan:11,style:{padding:"20px",textAlign:"center",color:"var(--text3)"},children:["Kh\xF4ng c\xF3 l\u1ECBch s\u1EED giao d\u1ECBch n\xE0o \u0111\u01B0\u1EE3c ghi nh\u1EADn cho khung th\u1EDDi gian ",nt,"!"]})})})]})})]})]}),Y==="outlook"&&u?.marketOutlook&&(()=>{let t=u.marketOutlook;return o("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o("div",{className:"outlook-banner",style:{borderTop:"4px solid var(--gold)"},children:[o("div",{children:[e("span",{style:{fontSize:"11px",textTransform:"uppercase",color:"var(--text3)",letterSpacing:"1.5px",fontWeight:"bold"},children:"H\u1EC6 TH\u1ED0NG PH\xC2N T\xCDCH H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT H\xC0NG NG\xC0Y"}),e("h2",{style:{fontSize:"22px",fontWeight:"900",color:"#fff",margin:"6px 0",letterSpacing:"0.5px"},children:"XAU/USD GOLD SPOT"}),o("span",{style:{fontSize:"12px",color:"var(--text2)"},children:["Th\u1EDDi gian c\u1EADp nh\u1EADt: ",e("strong",{style:{color:"var(--gold)"},children:t.date})," | Khung \u0111\u1ED3 th\u1ECB: ",e("strong",{children:t.timeframe})]})]}),e("div",{style:{display:"flex",alignItems:"center",gap:"24px",flexWrap:"wrap"},children:o("div",{style:{textAlign:"right"},children:[e("span",{style:{fontSize:"10px",color:"var(--text3)",display:"block",textTransform:"uppercase",fontWeight:"bold",marginBottom:"2px"},children:"Xu h\u01B0\u1EDBng ch\u1EE7 \u0111\u1EA1o"}),e("span",{className:t.synthesizedOutlook.bias==="BUY"?"outlook-badge-buy":t.synthesizedOutlook.bias==="SELL"?"outlook-badge-sell":"outlook-badge-hold",style:{display:"inline-block"},children:t.synthesizedOutlook.bias==="BUY"?"\u{1F7E2} MUA CH\u1EE6 \u0110\u1EA0O (BUY)":t.synthesizedOutlook.bias==="SELL"?"\u{1F534} B\xC1N CH\u1EE6 \u0110\u1EA0O (SELL)":"\u{1F7E1} \u0110\u1EE8NG NGO\xC0I (HOLD)"})]})})]}),o("div",{className:"outlook-summary-box",style:{margin:0,padding:"30px",borderLeft:"5px solid var(--gold)"},children:[e("h3",{style:{fontSize:"16px",color:"var(--gold)",margin:"0 0 16px 0",borderBottom:"1.5px solid var(--border)",paddingBottom:"12px",display:"flex",alignItems:"center",gap:"10px",fontWeight:"800",letterSpacing:"0.5px"},children:"\u{1F4DD} NH\u1EACN \u0110\u1ECANH T\u1ED4NG QUAN TRONG NG\xC0Y (DOW + SMC + PRICE ACTION)"}),e("p",{style:{fontSize:"14.5px",color:"#fff",lineHeight:"1.85",margin:"0 0 26px 0",textAlign:"justify",fontWeight:"400",opacity:"0.95"},children:t.synthesizedOutlook.summary}),e("h4",{style:{fontSize:"11px",color:"var(--text3)",margin:"0 0 12px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold"},children:"\u{1F4CA} H\u1EC6 TH\u1ED0NG CH\u1EC8 B\xC1O H\u1EE2P L\u01AFU K\u1EF8 THU\u1EACT:"}),o("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"26px"},className:"outlook-grid",children:[o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F4C8} L\xDD THUY\u1EBET DOW (H1)"}),o("strong",{style:{display:"block",fontSize:"14px",color:t.trendDow.primary==="T\u0102NG"?"var(--green)":t.trendDow.primary==="GI\u1EA2M"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["Xu h\u01B0\u1EDBng: ",t.trendDow.primary]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["S\xF3ng c\u1EA5p 2: ",t.trendDow.secondary]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{children:["Kh\xE1ng c\u1EF1 ch\xEDnh: ",o("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[0]?.price?t.trendDow.keyLevels[0].price.toFixed(1):"\u2014"]})]}),o("div",{children:["H\u1ED7 tr\u1EE3 ch\xEDnh: ",o("strong",{style:{color:"#fff",fontFamily:"monospace"},children:["$",t.trendDow.keyLevels[1]?.price?t.trendDow.keyLevels[1].price.toFixed(1):"\u2014"]})]})]})]}),o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F3DB}\uFE0F SMART MONEY CONCEPTS"}),o("strong",{style:{display:"block",fontSize:"14px",color:"#fff",marginTop:"6px"},children:["C\u1EA5u tr\xFAc: ",t.smcAnalysis.marketStructure]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["Kh\u1ED1i C\u1EA7u/Cung: ",t.smcAnalysis.keyOrderBlocks.length," OB ho\u1EA1t \u0111\u1ED9ng"]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{children:["Kho\u1EA3ng FVG H1: ",e("strong",{style:{color:"#80deea",fontFamily:"monospace"},children:t.smcAnalysis.fvgs[0]?.gap||"\u0110\xE3 l\u1EA5p h\u1EBFt"})]}),o("div",{children:["C\u1EA3n OB Cung: ",e("strong",{style:{color:"var(--red)",fontFamily:"monospace"},children:t.smcAnalysis.keyOrderBlocks.find(a=>a.type.includes("BEARISH"))?.priceRange||"Kh\xF4ng c\xF3"})]})]})]}),o("div",{style:{background:"rgba(20, 24, 33, 0.4)",border:"1px solid rgba(255, 215, 0, 0.1)",borderRadius:"10px",padding:"14px",backdropFilter:"blur(6px)"},children:[e("span",{style:{fontSize:"9px",color:"var(--gold)",fontWeight:"bold",textTransform:"uppercase",display:"block",letterSpacing:"0.5px"},children:"\u{1F56F}\uFE0F PRICE ACTION & T\xC2M L\xDD"}),o("strong",{style:{display:"block",fontSize:"14px",color:t.priceAction.sentiment==="T\xCDCH C\u1EF0C"?"var(--green)":t.priceAction.sentiment==="TI\xCAU C\u1EF0C"?"var(--red)":"var(--yellow)",marginTop:"6px"},children:["T\xE2m l\xFD n\u1EBFn: ",t.priceAction.sentiment]}),o("span",{style:{display:"block",fontSize:"11.5px",color:"var(--text2)",marginTop:"4px"},children:["N\u1EBFn \u0111\u1EB7c tr\u01B0ng: ",t.priceAction.recentPatterns[0]?.split(":")[0]||"Kh\xF4ng c\xF3"]}),o("div",{style:{display:"flex",flexDirection:"column",gap:"3px",borderTop:"1px solid rgba(255,255,255,0.05)",marginTop:"10px",paddingTop:"8px",fontSize:"11px",color:"var(--text2)"},children:[o("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn g\u1EA7n nh\u1EA5t: ",e("strong",{children:t.priceAction.recentPatterns[0]?.split(":")[0]||"Trung l\u1EADp"})]}),o("div",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:["N\u1EBFn li\u1EC1n k\u1EC1: ",e("strong",{children:t.priceAction.recentPatterns[1]?.split(":")[0]||"Trung l\u1EADp"})]})]})]})]}),o("div",{style:{background:"linear-gradient(135deg, rgba(255, 171, 0, 0.05) 0%, rgba(7, 9, 14, 0.6) 100%)",border:"1.5px dashed var(--gold)",borderRadius:"14px",padding:"22px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.2)"},children:[e("h4",{style:{fontSize:"12px",color:"var(--gold)",margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"6px"},children:"\u26A1 K\u1EBE HO\u1EA0CH GIAO D\u1ECACH H\u1EE2P L\u01AFU CHI TI\u1EBET TRONG NG\xC0Y"}),o("p",{style:{fontSize:"14px",color:"#fff",fontWeight:"700",lineHeight:"1.6",margin:"0"},children:["\u{1F449} ",t.priceAction.actionableAdvice]})]})]})]})})()]})]})]})]}):o("div",{className:"auth-container",children:[e("div",{className:"auth-grid-overlay"}),o("div",{className:"auth-card",children:[o("div",{className:"auth-logo-wrap",children:[e("div",{className:"auth-logo-ring",children:e("img",{src:"/frontend/logo.png",alt:"XAU Logo",className:"auth-logo-img"})}),o("div",{style:{textAlign:"center"},children:[e("div",{className:"auth-brand-name",children:"XAU/USD Gold Pro"}),e("div",{className:"auth-brand-sub",children:"H\u1EC7 Th\u1ED1ng Giao D\u1ECBch V\xE0ng Chuy\xEAn Nghi\u1EC7p"})]}),o("div",{className:"auth-live-badge",children:[e("div",{className:"auth-live-dot"}),"D\u1EEF li\u1EC7u th\u1EDDi gian th\u1EF1c \xB7 T\xEDn hi\u1EC7u millisecond"]})]}),Ee&&o("div",{className:"auth-alert error",children:[e("span",{className:"auth-alert-icon",children:"\u26A0\uFE0F"}),e("div",{children:Ee})]}),Pe&&o("div",{className:"auth-alert success",children:[e("span",{className:"auth-alert-icon",children:"\u2705"}),e("div",{children:Pe})]}),se==="login"&&o(K,{children:[o("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn active",children:"\u{1F510} \u0110\u0103ng Nh\u1EADp"}),e("button",{className:"auth-tab-btn",onClick:()=>{it("register"),L(null),A(null),$t(!1)},children:"\u{1F4DD} \u0110\u0103ng K\xFD"})]}),o("form",{className:"auth-form",onSubmit:ya,children:[o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F4E7} \u0110\u1ECBa ch\u1EC9 Email"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:J,onChange:t=>le(t.target.value),autoComplete:"email",required:!0}),e("span",{className:"auth-input-icon",style:{left:"unset",right:"14px",position:"absolute"},children:"\u{1F4E7}"})]})]}),o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F511} M\u1EADt kh\u1EA9u"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:mt?"text":"password",className:"auth-input",placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",value:X,onChange:t=>de(t.target.value),autoComplete:"current-password",required:!0}),e("button",{type:"button",className:"auth-pw-toggle",onClick:()=>$t(!mt),tabIndex:-1,children:mt?"\u{1F648}":"\u{1F441}\uFE0F"})]})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:xt,children:xt?o(K,{children:[e("div",{className:"auth-spinner"})," \u0110ang x\xE1c th\u1EF1c..."]}):"\u{1F513} M\u1EDE KH\xD3A TERMINAL"})]}),o("div",{className:"auth-stats-bar",children:[o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"24/7"}),e("div",{className:"auth-stat-label",children:"Ho\u1EA1t \u0111\u1ED9ng"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"5ms"}),e("div",{className:"auth-stat-label",children:"\u0110\u1ED9 tr\u1EC5"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"5+"}),e("div",{className:"auth-stat-label",children:"Khung th\u1EDDi gian"})]}),o("div",{className:"auth-stat-item",children:[e("div",{className:"auth-stat-value",children:"A.I"}),e("div",{className:"auth-stat-label",children:"Ph\xE2n t\xEDch"})]})]})]}),se==="register"&&o(K,{children:[o("div",{className:"auth-tabs",children:[e("button",{className:"auth-tab-btn",onClick:()=>{it("login"),L(null),A(null),$t(!1)},children:"\u{1F510} \u0110\u0103ng Nh\u1EADp"}),e("button",{className:"auth-tab-btn active",children:"\u{1F4DD} \u0110\u0103ng K\xFD"})]}),o("form",{className:"auth-form",onSubmit:wa,children:[o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F4E7} \u0110\u1ECBa ch\u1EC9 Email th\u1EF1c t\u1EBF"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:"email",className:"auth-input",placeholder:"name@example.com",value:J,onChange:t=>le(t.target.value),autoComplete:"email",required:!0}),e("span",{style:{position:"absolute",right:"14px",fontSize:"14px"},children:"\u{1F4E7}"})]}),e("div",{style:{fontSize:"10.5px",color:"var(--text3)",marginTop:"2px"},children:"M\xE3 OTP x\xE1c th\u1EF1c s\u1EBD \u0111\u01B0\u1EE3c g\u1EEDi v\u1EC1 h\xF2m th\u01B0 n\xE0y"})]}),o("div",{className:"auth-field",children:[e("label",{className:"auth-label",children:"\u{1F511} M\u1EADt kh\u1EA9u (t\u1ED1i thi\u1EC3u 6 k\xFD t\u1EF1)"}),o("div",{className:"auth-input-wrap",children:[e("input",{type:mt?"text":"password",className:"auth-input",placeholder:"Nh\u1EADp m\u1EADt kh\u1EA9u m\u1EA1nh...",value:X,onChange:t=>de(t.target.value),autoComplete:"new-password",required:!0}),e("button",{type:"button",className:"auth-pw-toggle",onClick:()=>$t(!mt),tabIndex:-1,children:mt?"\u{1F648}":"\u{1F441}\uFE0F"})]}),X.length>0&&o("div",{className:"auth-pw-strength",children:[e("div",{className:`auth-pw-strength-bar ${$>=1?$===1?"weak":$===2?"medium":"strong":""}`}),e("div",{className:`auth-pw-strength-bar ${$>=2?$===2?"medium":"strong":""}`}),e("div",{className:`auth-pw-strength-bar ${$>=3?"strong":""}`})]}),X.length>0&&e("div",{style:{fontSize:"10px",color:$===0||$===1?"#ff1744":$===2?"#ffab00":"#00e676",marginTop:"2px"},children:$===0||$===1?"M\u1EADt kh\u1EA9u y\u1EBFu \u2014 n\xEAn th\xEAm ch\u1EEF hoa v\xE0 s\u1ED1":$===2?"M\u1EADt kh\u1EA9u trung b\xECnh":"\u2713 M\u1EADt kh\u1EA9u m\u1EA1nh"})]}),e("button",{type:"submit",className:"auth-submit-btn",disabled:xt,children:xt?o(K,{children:[e("div",{className:"auth-spinner"})," \u0110ang \u0111\u0103ng k\xFD & g\u1EEDi OTP..."]}):"\u2709\uFE0F \u0110\u0102NG K\xDD & G\u1EECI M\xC3 OTP"})]}),o("div",{style:{fontSize:"11px",color:"var(--text3)",textAlign:"center",lineHeight:"1.5"},children:["B\u1EB1ng c\xE1ch \u0111\u0103ng k\xFD, b\u1EA1n \u0111\u1ED3ng \xFD v\u1EDBi \u0111i\u1EC1u kho\u1EA3n d\u1ECBch v\u1EE5.",e("br",{}),"M\xE3 OTP c\xF3 hi\u1EC7u l\u1EF1c trong ",e("strong",{style:{color:"var(--gold)"},children:"5 ph\xFAt"}),"."]})]}),se==="otp"&&o("div",{className:"auth-otp-wrap",children:[o("div",{className:"auth-otp-header",children:[e("span",{className:"auth-otp-icon",children:"\u{1F4EC}"}),e("div",{className:"auth-otp-title",children:"X\xE1c th\u1EF1c Email"}),o("div",{className:"auth-otp-desc",children:["Nh\u1EADp m\xE3 OTP 6 s\u1ED1 \u0111\xE3 \u0111\u01B0\u1EE3c g\u1EEDi t\u1EDBi:",e("br",{}),e("span",{className:"auth-otp-email",children:J})]})]}),o("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e("div",{className:"auth-countdown-wrap",children:o("div",{className:"auth-countdown-ring",children:[o("svg",{width:"56",height:"56",viewBox:"0 0 56 56",children:[e("circle",{className:"auth-countdown-bg",cx:"28",cy:"28",r:"22",strokeWidth:"3"}),e("circle",{className:"auth-countdown-fill",cx:"28",cy:"28",r:"22",strokeWidth:"3",strokeDasharray:Je,strokeDashoffset:ja})]}),e("div",{className:"auth-countdown-text",children:_>0?`${Math.floor(_/60)}:${(_%60).toString().padStart(2,"0")}`:"0:00"})]})}),e("div",{className:"auth-otp-boxes",children:[0,1,2,3,4,5].map(t=>e("input",{ref:a=>{Nt.current[t]=a},type:"text",inputMode:"numeric",maxLength:1,className:`auth-otp-box ${st[t]?"filled":""}`,value:st[t]||"",onChange:a=>$a(t,a.target.value),onKeyDown:a=>Ya(t,a),onFocus:a=>a.target.select(),onPaste:a=>{let r=a.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);if(r.length>0){at(r.padEnd(6,"").slice(0,6));let n=Math.min(r.length,5);Nt.current[n]?.focus()}a.preventDefault()}},t))})]}),e("button",{className:"auth-submit-btn",style:{width:"100%"},onClick:ka,disabled:xt||st.replace(/\D/g,"").length<6,children:xt?o(K,{children:[e("div",{className:"auth-spinner"})," \u0110ang ki\u1EC3m tra..."]}):"\u{1F680} K\xCDCH HO\u1EA0T T\xC0I KHO\u1EA2N"}),pe&&o("div",{style:{background:"rgba(255, 171, 0, 0.06)",border:"1px dashed rgba(255,171,0,0.4)",borderRadius:"12px",padding:"14px",fontSize:"12px",color:"var(--text)",textAlign:"center",lineHeight:"1.6",width:"100%"},children:[e("div",{style:{fontWeight:"800",color:"var(--gold)",marginBottom:"6px",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.5px"},children:"\u{1F916} Ch\u1EBF \u0111\u1ED9 th\u1EED nghi\u1EC7m (Simulator)"}),o("div",{children:["M\xE3 OTP: ",e("strong",{style:{color:"#00e676",fontSize:"20px",fontFamily:"monospace",letterSpacing:"4px"},children:pe})]}),e("button",{type:"button",onClick:()=>{at(pe),Nt.current[5]?.focus()},style:{marginTop:"8px",background:"rgba(0, 230, 118, 0.12)",border:"1px solid rgba(0, 230, 118, 0.25)",color:"#00e676",borderRadius:"6px",padding:"4px 12px",fontSize:"11px",fontWeight:"700",cursor:"pointer"},children:"\u26A1 \u0110i\u1EC1n t\u1EF1 \u0111\u1ED9ng"}),o("div",{style:{fontSize:"10px",color:"var(--text3)",marginTop:"8px"},children:["\u0110\u1EC3 g\u1EEDi email th\u1EF1c, c\u1EA5u h\xECnh SMTP ho\u1EB7c Resend trong ",e("code",{children:".env"})]})]}),e("div",{className:"auth-resend-row",children:_>0?o(K,{children:["G\u1EEDi l\u1EA1i m\xE3 sau ",Math.floor(_/60),":",(_%60).toString().padStart(2,"0")]}):o(K,{children:["Kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c email?"," ",e("button",{className:"auth-resend-btn",type:"button",onClick:Sa,children:"G\u1EEDi l\u1EA1i OTP"})]})}),e("div",{className:"auth-link",onClick:()=>{it("login"),L(null),A(null),ot(""),at("")},children:"\u2190 Quay l\u1EA1i \u0111\u0103ng nh\u1EADp"})]})]})]})}var Qe=`
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

/* PREMIUM A.I ANALYSIS STYLES */
.ai-scan-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(135deg, rgba(20, 24, 33, 0.85) 0%, rgba(14, 17, 26, 0.95) 100%);
  backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  gap: 24px;
  min-height: 480px;
  position: relative;
  overflow: hidden;
}

.ai-scan-glow {
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.12) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: aiGlowPulse 3s infinite ease-in-out;
  pointer-events: none;
  z-index: 0;
}

@keyframes aiGlowPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

.ai-radial-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.ai-radial-svg {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.ai-radial-bg {
  stroke: rgba(255, 255, 255, 0.03);
}

.ai-radial-fill {
  stroke: var(--gold);
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s linear;
}

.ai-countdown-number {
  font-size: 42px;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 12px var(--gold);
  animation: aiNumScale 1s infinite ease-in-out;
  font-family: monospace;
}

@keyframes aiNumScale {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.15); opacity: 1; text-shadow: 0 0 20px var(--gold); }
}

.ai-scan-step-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--gold);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  z-index: 1;
  text-align: center;
}

.ai-scan-step-desc {
  font-size: 13px;
  color: var(--text);
  z-index: 1;
  text-align: center;
  max-width: 480px;
  line-height: 1.6;
  background: rgba(255,255,255,0.02);
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.04);
}

.ai-scan-logs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 480px;
  z-index: 1;
}

.ai-scan-log-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text3);
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.ai-scan-log-item.active {
  color: var(--gold);
  background: rgba(255, 215, 0, 0.04);
  border: 1px solid rgba(255, 215, 0, 0.1);
  font-weight: bold;
}

.ai-scan-log-item.completed {
  color: var(--green);
}

.ai-scan-log-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text3);
  transition: all 0.3s ease;
}

.ai-scan-log-item.active .ai-scan-log-dot {
  background: var(--gold);
  box-shadow: 0 0 8px var(--gold);
  animation: aiDotBlink 1s infinite alternate;
}

.ai-scan-log-item.completed .ai-scan-log-dot {
  background: var(--green);
}

@keyframes aiDotBlink {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

.ai-lock-card {
  border-top: 4px solid var(--text3) !important;
  background: linear-gradient(135deg, rgba(20, 24, 33, 0.5) 0%, rgba(14, 17, 26, 0.6) 100%) !important;
  text-align: center;
  padding: 30px !important;
}

.ai-lock-icon {
  font-size: 32px;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
}

.ai-lock-title {
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
}

.ai-lock-desc {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.6;
  max-width: 460px;
  margin: 0 auto 16px auto;
}

.ai-restart-btn {
  background: rgba(255, 215, 0, 0.08);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: var(--gold);
  font-weight: 800;
  font-size: 12px;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.ai-restart-btn:hover:not(:disabled) {
  background: var(--gold);
  color: var(--bg);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
  transform: translateY(-2px);
}

.ai-restart-btn:active:not(:disabled) {
  transform: translateY(0);
}

.ai-restart-btn:disabled {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.05);
  color: var(--text3);
  cursor: not-allowed;
  box-shadow: none;
}
`;var ta=document.createElement("style");ta.textContent=Qe;document.head.appendChild(ta);var Za=qa(document.getElementById("root"));Za.render(Ja(Le));
