(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{343:function(e,t,n){e.exports=n(724)},390:function(e,t){},724:function(e,t,n){"use strict";n.r(t);var a=n(2),o=n.n(a),r=n(33),c=n.n(r),i=n(43),s=n.n(i),l=n(84),u=n(64),f=n(63),d=n(256),m=n.n(d),h=n(257);n(260);function v(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return console.log("display"),new Promise(function(e){navigator.getDisplayMedia({video:!0}).then(function(t){e(t)})})}var p=n(258),g=n.n(p),w=n(174),b=n.n(w),y=g.a.connect("https://aqueous-earth-75182.herokuapp.com/");function E(e){return new Promise(function(t){y.emit("create",{room:e});var n=new b.a({nodeId:"answer"});y.on("offer",function(e){n.makeAnswer(e.sdp)}),n.signal=function(t){y.emit("answer",{sdp:t,room:e})},n.connect=function(){y.emit("connect",{room:e}),console.log("connect create"),t(n)},n.addOnData(function(e){console.log({message:e})},"answer")})}function j(e){return new Promise(function(t){y.emit("join",{room:e});var n=new b.a({nodeId:"offer"});y.on("join",function(){n.makeOffer(),n.signal=function(t){y.emit("offer",{sdp:t,room:e})},y.on("answer",function(e){n.setAnswer(e.sdp)}),n.connect=function(){console.log("connect join"),t(n)},n.addOnData(function(e){console.log({message:e})},"offer")})})}var O,x=function(e){var t=e.isTeacher,n=e.room,r=Object(a.useState)(""),c=Object(u.a)(r,2),i=c[0],d=c[1],m=Object(a.useState)(void 0),h=Object(u.a)(m,2),v=h[0],p=h[1];Object(a.useEffect)(function(){g()},[]);var g=function(){var e=Object(l.a)(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return e.next=3,E(n);case 3:(a=e.sent).addOnData(function(e){console.log({raw:e}),"share"===e.label&&d(e.data)}),p(a),e.next=9;break;case 8:setTimeout(Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(n);case 2:(a=e.sent).addOnData(function(e){console.log({raw:e}),"share"===e.label&&d(e.data)}),p(a);case 5:case"end":return e.stop()}},e,this)})),3e3);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}();return console.log({peer:v}),o.a.createElement("div",{style:{margin:20,marginTop:0,height:"auto",padding:20,border:"solid thin"}},o.a.createElement("p",null,"shareboard"),v&&o.a.createElement("div",{style:{width:"40vw"}},o.a.createElement(f.c,{multiline:!0,value:i,onChange:function(e){d(e.target.value),v.send(e.target.value,"share")},style:{width:"40vw"}})))},k=o.a.createRef(),R=o.a.createRef(),P=o.a.createRef(),D=o.a.createRef(),S=function(){var e=Object(a.useState)(""),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)("def"),i=Object(u.a)(c,2),d=i[0],p=i[1],g=Object(a.useState)("def"),w=Object(u.a)(g,2),b=w[0],y=w[1];function E(){return(E=Object(l.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:return R.srcObject=e.sent,e.next=5,Object(h.getLocalVideo)();case 5:D.srcObject=e.sent;case 6:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}Object(a.useEffect)(function(){O=new m.a({key:"725b7ef3-cd3d-4032-b019-00fc43b6639f",debug:3}),function(){E.apply(this,arguments)}()},[]);var j=function(e){y("connecting"),"def"===b&&function(e,t){var n=O.joinRoom(e,{mode:"sfu",stream:R.srcObject});if(n){n.on("stream",function(e){k&&(k.srcObject=e)});var a=O.joinRoom(e+"video",{mode:"sfu",stream:D.srcObject});a&&a.on("stream",function(e){P&&(P.srcObject=e),t()})}}(n,function(){p(e),y("connected")})};return o.a.createElement("div",null,o.a.createElement("div",{style:{display:"flex"}},o.a.createElement(f.c,{value:n,onChange:function(e){r(e.target.value)}}),o.a.createElement(f.a,{onClick:function(){j("teacher")}},"teacher"),o.a.createElement(f.a,{onClick:function(){j("student")}},"student"),o.a.createElement("p",{style:{paddingRight:30}},""),o.a.createElement("p",{style:{paddingRight:30}},"room\u3000:\u3000",n),o.a.createElement("p",{style:{paddingRight:30}},"status\u3000:\u3000","def"!==b&&b),o.a.createElement("p",{style:{paddingRight:30}},"user\u3000:\u3000","def"!==d&&d)),o.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},o.a.createElement("div",{style:{display:"flex"}},o.a.createElement("video",{ref:function(e){return D=e},autoPlay:!0,style:{width:"30vw",maxHeight:"30vh",paddingRight:30}}),o.a.createElement("video",{ref:function(e){return P=e},autoPlay:!0,style:{width:"30vw",maxHeight:"30vh"}})),o.a.createElement("br",null),o.a.createElement(f.b,null),o.a.createElement("br",null),o.a.createElement("div",{style:{display:"flex"}},"teacher"!==d&&o.a.createElement("video",{ref:function(e){return R=e},autoPlay:!0,style:{width:"50vw",maxHeight:"55vh"}}),"student"!==d&&o.a.createElement("video",{ref:function(e){return k=e},autoPlay:!0,style:{width:"50vw",maxHeight:"55vh"}}),"def"!==d&&o.a.createElement(x,{isTeacher:"teacher"===d,room:n}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[343,2,1]]]);
//# sourceMappingURL=main.c0056eef.chunk.js.map