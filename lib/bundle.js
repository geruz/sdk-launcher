!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(((e="undefined"!=typeof globalThis?globalThis:e||self)["getid-launcher"]=e["getid-launcher"]||{},e["getid-launcher"].js={}))}(this,(function(e){"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function n(e,n,t,o){return new(t||(t=Promise))((function(i,r){function c(e){try{s(o.next(e))}catch(e){r(e)}}function d(e){try{s(o.throw(e))}catch(e){r(e)}}function s(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(c,d)}s((o=o.apply(e,n||[])).next())}))}let t=e=>n(void 0,void 0,void 0,(function*(){let o={responseCode:400};try{const i={"x-web-sdk-launcher-version":"2.4.3"};o=yield fetch(`${e}/sdk/v2/script-link`,{headers:i}).then((e=>e.json())),o.scriptLink&&(t=()=>n(void 0,void 0,void 0,(function*(){return o})))}catch(e){console.error(e)}return o}));e.createPublicTokenProvider=(e,t)=>()=>n(void 0,void 0,void 0,(function*(){if(!e)throw new Error("Missing api url");if(!t)throw new Error("Missing api key");return(yield fetch(`${e}/sdk/v2/token`,{method:"POST",body:JSON.stringify({}),headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","x-sdk-key":t}})).json()})),e.init=function(e,n="v6"){const o=`https://cdn.getid.cloud/sdk/getid-web-sdk-${n}.min.js`;return new Promise(((n,i)=>{t(e.apiUrl).then((({scriptLink:t=o})=>{const r=document.createElement("script");r.setAttribute("async",""),r.src=t,document.getElementsByTagName("body")[0].appendChild(r),r.onload=()=>{window.getidWebSdk&&window.getidWebSdk.init(e).then((e=>n(e))).catch((e=>i(e)))},r.onerror=e=>i(e)})).catch((e=>{console.log(e),i(e)}))}))},Object.defineProperty(e,"__esModule",{value:!0})}));