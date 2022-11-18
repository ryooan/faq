"use strict";(self.webpackChunkmetaculus_doc=self.webpackChunkmetaculus_doc||[]).push([[960],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=l(r),h=a,m=d["".concat(c,".").concat(h)]||d[h]||p[h]||i;return r?n.createElement(m,s(s({ref:t},u),{},{components:r})):n.createElement(m,s({ref:t},u))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,s=new Array(i);s[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,s[1]=o;for(var l=2;l<i;l++)s[l]=r[l];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6299:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const i={},s="NewsMatch",o={unversionedId:"questions/newsmatch",id:"questions/newsmatch",title:"NewsMatch",description:"NewsMatch displays a selection of articles relevant to the current Metaculus question. These serve as an additional resource for forecasters as they discuss and predict on the question. Each article is listed with its source and its publication date. Clicking an article title navigates to the article itself. Clicking the \u2018rate\u2019 button allows you to indicate whether the article was helpful or not. Your input improves the accuracy and the usefulness of the model that matches articles to Metaculus questions.",source:"@site/docs/2-questions/5-newsmatch.md",sourceDirName:"2-questions",slug:"/questions/newsmatch",permalink:"/faq/questions/newsmatch",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Navigation and Filtering",permalink:"/faq/questions/navigation-and-filtering"},next:{title:"Question Resolution",permalink:"/faq/question-resolution"}},c={},l=[],u={toc:l};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"newsmatch"},"NewsMatch"),(0,a.kt)("p",null,"NewsMatch displays a selection of articles relevant to the current Metaculus question. These serve as an additional resource for forecasters as they discuss and predict on the question. Each article is listed with its source and its publication date. Clicking an article title navigates to the article itself. Clicking the \u2018rate\u2019 button allows you to indicate whether the article was helpful or not. Your input improves the accuracy and the usefulness of the model that matches articles to Metaculus questions."),(0,a.kt)("p",null,"The article matching model is supported by ",(0,a.kt)("a",{parentName:"p",href:"https://www.improvethenews.org/"},"Improve the News"),", a news aggregator developed by a group of researchers at MIT. Designed to give readers more control over their news consumption, Improve the News helps readers stay informed while encountering a wider variety of viewpoints."),(0,a.kt)("p",null,'Articles in ITN\'s database are matched with relevant Metaculus questions by a transformer-based machine learning model trained to map semantically similar passages to regions in "embedding space." And the embeddings themselves are generated using ',(0,a.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/2004.09297"},"MPNet"),". Once a match is made, it must still be manually approved before it can appear alongside a forecast question."))}p.isMDXComponent=!0}}]);