"use strict";(self.webpackChunkmetaculus_doc=self.webpackChunkmetaculus_doc||[]).push([[923],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var s=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,s,r=function(e,t){if(null==e)return{};var n,s,r={},o=Object.keys(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)n=o[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=s.createContext({}),c=function(e){var t=s.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return s.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.createElement(s.Fragment,{},t)}},p=s.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,g=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?s.createElement(g,a(a({ref:t},u),{},{components:n})):s.createElement(g,a({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,a[1]=i;for(var c=2;c<o;c++)a[c]=n[c];return s.createElement.apply(null,a)}return s.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6981:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var s=n(7462),r=(n(7294),n(3905));const o={sidebar_position:3},a="Metaculus Scoring System",i={unversionedId:"scoring",id:"scoring",title:"Metaculus Scoring System",description:"PAGE NOT CURRENTLY FUNCTIONAL",source:"@site/docs-guides/3-scoring.md",sourceDirName:".",slug:"/scoring",permalink:"/faq/docs-guides/scoring",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Question Approval Checklist",permalink:"/faq/docs-guides/question-creation/question-checklist"},next:{title:"Prediction Resources",permalink:"/faq/docs-guides/resources"}},l={},c=[],u={toc:c};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,s.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"metaculus-scoring-system"},"Metaculus Scoring System"),(0,r.kt)("p",null,"##PAGE NOT CURRENTLY FUNCTIONAL"),(0,r.kt)("section",{className:"section-box"},(0,r.kt)("div",{className:"section__header"},(0,r.kt)("h2",{className:"section__header"},(0,r.kt)("span",null,"Metaculus Scoring System"))),(0,r.kt)("div",{className:"section__content--padded"},(0,r.kt)("p",null,"Here at Metaculus, we want our players to make the best possible predictions. To that end, we needed to come up with a scoring system that rewards both individuals and the community as a whole for being correct over the long run. This app demonstrates a variety of scoring models, and it shows how the final result can depend upon the distribution of player predictions."),(0,r.kt)("p",null,"Try playing around with it to design what you think would be the best way to calculate scores, or jump down to our ",(0,r.kt)("a",{href:"#explanation"},"explanation")," of how the whole thing works, and the scoring system Metaculus uses."),(0,r.kt)("h3",null,"Distribution of player predictions"),(0,r.kt)("div",{className:"scoring__dist--group"},(0,r.kt)("h4",null,"Distribution 1"),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"mode:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"1",max:"99",model:"dist1Mode",scale:"100"}),(0,r.kt)("span",{className:"d3-output",model:"dist1Mode",fmt:".0%"},"...")),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"width:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"3",max:"900",model:"dist1Width",scale:"3000"}),(0,r.kt)("span",{className:"d3-output",model:"dist1Width",fmt:".1%"},"...")),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"# players:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"0",max:"1000",model:"dist1Total"}),(0,r.kt)("span",{className:"d3-output",model:"dist1Total"},"..."))),(0,r.kt)("div",{className:"scoring__dist--group"},(0,r.kt)("h4",null,"Distribution 2"),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"mode:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"1",max:"99",model:"dist2Mode",scale:"100"}),(0,r.kt)("span",{className:"d3-output",model:"dist2Mode",fmt:".0%"},"...")),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"width:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"3",max:"900",model:"dist2Width",scale:"3000"}),(0,r.kt)("span",{className:"d3-output",model:"dist2Width",fmt:".1%"},"...")),(0,r.kt)("div",{className:"scoring__dist--row"},(0,r.kt)("span",null,"# players:"),(0,r.kt)("input",{className:"d3-input",type:"range",min:"0",max:"1000",model:"dist2Total"}),(0,r.kt)("span",{className:"d3-output",model:"dist2Total"},"..."))),(0,r.kt)("svg",{id:"guess-graph"}),(0,r.kt)("h3",null,"Output player scores"))))}d.isMDXComponent=!0}}]);