(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{193:function(e,t,n){e.exports=n(345)},345:function(e,t,n){"use strict";n.r(t);var a,o=n(1),r=n.n(o),c=n(15),i=n.n(c),u=n(36),s=n.n(u),l=n(105),f=n(69),d=n(68),h=n(106),m=n.n(h),v=n(107);n(109);function b(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return console.log("display"),new Promise(function(e){navigator.getDisplayMedia({video:!0}).then(function(t){e(t)})})}var w=function(){var e=Object(o.useState)(""),t=Object(f.a)(e,2),n=t[0],c=t[1],i=Object(o.useState)("def"),u=Object(f.a)(i,2),h=(u[0],u[1],r.a.createRef()),w=r.a.createRef(),g=r.a.createRef(),p=r.a.createRef();function j(){return(j=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b();case 2:return w.srcObject=e.sent,e.next=5,Object(v.getLocalVideo)();case 5:p.srcObject=e.sent;case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}return Object(o.useEffect)(function(){a=new m.a({key:"725b7ef3-cd3d-4032-b019-00fc43b6639f",debug:3}),function(){j.apply(this,arguments)}()},[]),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(d.b,{value:n,onChange:function(e){c(e.target.value)}}),r.a.createElement(d.a,{onClick:function(){var e=a.joinRoom(n,{mode:"sfu",stream:w.srcObject});if(e){e.on("stream",function(e){h.srcObject=e});var t=a.joinRoom(n+"video",{mode:"sfu",stream:p.srcObject});t&&t.on("stream",function(e){g.srcObject=e})}}},"open")),r.a.createElement("div",null,r.a.createElement("video",{ref:function(e){return p=e},autoPlay:!0,style:{width:"50%",height:"100%"}}),r.a.createElement("video",{ref:function(e){return g=e},autoPlay:!0,style:{width:"50%",height:"100%"}}),r.a.createElement("video",{ref:function(e){return w=e},autoPlay:!0,style:{width:"50%",height:"100%"}}),r.a.createElement("video",{ref:function(e){return h=e},autoPlay:!0,style:{width:"50%",height:"100%"}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[193,2,1]]]);
//# sourceMappingURL=main.ebeccbb2.chunk.js.map