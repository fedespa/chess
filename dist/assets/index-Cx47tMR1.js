(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(t){if(t.ep)return;t.ep=!0;const l=s(t);fetch(t.href,l)}})();const f=document,p=f.getElementById("chessBoard"),m=f.querySelector(".alert");let i=[],w="";const C={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙"},M=[["R","N","B","Q","K","B","N","R"],["P","P","P","P","P","P","P","P"],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["","","","","","","",""],["P","P","P","P","P","P","P","P"],["R","N","B","Q","K","B","N","R"]];function B(){i=[];let e,c;for(let s=0;s<8;s++){e=[];for(let o=0;o<8;o++)s<2||s>5?c={position:{row:0,col:0},color:"",type:""}:c=null,e.push(c);i.push(e)}}function O(){for(let e=0;e<8;e++)for(let c=0;c<8;c++)if(M[e][c]&&i[e]&&i[e][c]){const s=i[e][c],o=M[e][c];(o==="K"||o==="Q"||o==="R"||o==="B"||o==="N"||o==="P")&&s&&(s.type=C[o],s.position={row:e,col:c},s.color=e<2?"black":"white")}}function A(){const e=f.createDocumentFragment();i.forEach((c,s)=>{c.forEach((o,t)=>{const l=f.createElement("square");if(l.dataset.row=s.toString(),l.dataset.col=t.toString(),o){const r=f.createElement("piece");r.draggable=!0,r.innerHTML=o.type,r.className=`piece ${o.color}-piece `,r.dataset.row=o.position.row.toString(),r.dataset.col=o.position.col.toString(),r.dataset.team=o.color,l.appendChild(r)}e.appendChild(l)})}),p.appendChild(e),w="black"}function D(){p.querySelectorAll("square").forEach(c=>{const s=c;Number(s.dataset.row)%2===0?Number(s.dataset.col)%2===0?s.classList.add("white-square"):s.classList.add("black-square"):Number(s.dataset.col)%2!==0?s.classList.add("white-square"):s.classList.add("black-square")})}function b(){w=w==="white"?"black":"white";const e=w==="white"?"black":"white";f.querySelectorAll("piece").forEach(s=>{const o=s,t=o.dataset.team;o.draggable=!0,o.classList.remove("disable"),t===e&&(o.draggable=!1,o.classList.add("disable"))})}function x(){f.querySelectorAll("square").forEach(c=>{const s=c;s.addEventListener("dragover",o=>{I(o)}),s.addEventListener("drop",o=>{R(o)})})}function R(e){var t,l;e.preventDefault();const c=e.currentTarget,s=(t=e.dataTransfer)==null?void 0:t.getData("possibleMoves"),o=(l=e.dataTransfer)==null?void 0:l.getData("position");if(s&&o&&c){const r=JSON.parse(s),n=JSON.parse(o),a=E(c);if(a){const u={from:n,to:a};if(z(u,r)){m.classList.remove("show-alert"),v(u,i),X(i),Q();const h=w==="white"?"black":"white",d=y(i,h);if(d){if(q(i,h,d))if(H(i,h,d)||K(i,h))m.classList.add("show-alert"),m.innerHTML=`Cuidado! El equipo ${h} está en jaque`,setTimeout(()=>{m.classList.remove("show-alert")},2e3);else{$(w,"hubo jaque mate");return}}else{$(w,"el rey fue capturado");return}b()}}}}function L(e,c){let s=[];for(const o of c)for(const t of o)t&&t.color===e&&(s=s.concat(g(t.type,t.position,t.color,c)));return s}function $(e,c){const s=f.querySelector(".result");s.classList.add("show"),s.innerHTML=`
  <p>El equipo ${e} gano, ${c}</p>
  <button>Restart Game</button>
  `,f.querySelectorAll("piece").forEach(t=>{const l=t;l.classList.add("disable"),l.draggable=!1})}function K(e,c){const s=L(c,e);for(const o of s){let t=k(e);v(o,t);const l=y(t,c);if(l&&!q(t,c,l))return!0}return!1}function H(e,c,s){const o=g("♕",s,c,e);let t=o.length;return o.forEach(l=>{let r=k(e);v(l,r);const n=l.to;q(r,c,n)&&t--}),!(t<=0)}function k(e){return structuredClone(e)}function q(e,c,s){const t=L(c==="white"?"black":"white",e);for(const l of t)if(s.col===l.to.col&&s.row===l.to.row)return!0;return!1}function y(e,c){for(const s of e)for(const o of s)if((o==null?void 0:o.color)===c&&o.type==="♕")return o.position}function Q(){f.querySelectorAll("square").forEach(c=>{c.classList.remove("possible")})}function I(e){e.preventDefault()}function J(e){var s,o;const c=e.target;if(c){const t=c.textContent,l=E(c),r=w;if(t&&l){let n=g(t,l,r,i);(s=e.dataTransfer)==null||s.setData("possibleMoves",JSON.stringify(n)),(o=e.dataTransfer)==null||o.setData("position",JSON.stringify(l)),j(n)}}}function j(e){e.forEach(c=>{const s={row:c.to.row,col:c.to.col},o=P(s);o&&o.classList.add("possible")})}function P(e){const c=e.col,s=e.row,o=Array.from(f.querySelectorAll("square"));for(let t of o){const l=t,r=Number(l.dataset.row),n=Number(l.dataset.col);if(c===n&&s===r)return l}}function E(e){if(e){const c=Number(e.dataset.row),s=Number(e.dataset.col);return{row:c,col:s}}}function F(){f.querySelectorAll("square").forEach(c=>{c.classList.remove("possible")})}function z(e,c){for(let s of c)if(s.to.col===e.to.col&&s.to.row===e.to.row)return!0;return!1}function v(e,c){let s=c[e.from.row][e.from.col];c[e.to.row][e.to.col],s&&(s.position.row=e.to.row,s.position.col=e.to.col,c[e.to.row][e.to.col]=s,c[e.from.row][e.from.col]=null),f.querySelectorAll("piece").forEach(t=>{t.classList.remove("possible")})}function g(e,c,s,o){let t=[];switch(e){case"♙":t=V(c,s,o);break;case"♖":t=N(c,s,o);break;case"♘":t=G(c,s,o);break;case"♗":t=S(c,s,o);break;case"♔":t=U(c,s,o);break;case"♕":t=W(c,s,o);break}return t}function S(e,c,s){let o=[];if(e.col>0&&e.row>0){let t=e.row-1;for(let l=e.col-1;l>=0;l--){const r={row:t,col:l};if(r.row<0)break;const n=s[r.row][r.col],a={from:e,to:r};if(n){n.color!==c&&o.push(a);break}o.push(a),t--}}if(e.col<7&&e.row>0){let t=e.row-1;for(let l=e.col+1;l<=7;l++){const r={row:t,col:l};if(r.row<0)break;const n=s[r.row][r.col],a={from:e,to:r};if(n){n.color!==c&&o.push(a);break}o.push(a),t--}}if(e.col<7&&e.row<7){let t=e.row+1;for(let l=e.col+1;l<=7;l++){const r={row:t,col:l};if(r.row>7)break;const n=s[r.row][r.col],a={from:e,to:r};if(n){n.color!==c&&o.push(a);break}o.push(a),t++}}if(e.col>0&&e.row<7){let t=e.row+1;for(let l=e.col-1;l>=0;l--){const r={row:t,col:l};if(r.row>7)break;const n=s[r.row][r.col],a={from:e,to:r};if(n){n.color!==c&&o.push(a);break}o.push(a),t++}}return o}function G(e,c,s){let o=[];if(e.row>1){const t={row:e.row-2,col:e.col+1},l={row:e.row-2,col:e.col-1};if(t.col<=7){const r=s[t.row][t.col],n={from:e,to:t};r?r&&r.color!==c&&o.push(n):o.push(n)}if(l.col>=0){const r=s[l.row][l.col],n={from:e,to:l};r?r&&r.color!==c&&o.push(n):o.push(n)}}if(e.row<6){const t={row:e.row+2,col:e.col+1},l={row:e.row+2,col:e.col-1};if(t.col<=7){const r=s[t.row][t.col],n={from:e,to:t};r?r&&r.color!==c&&o.push(n):o.push(n)}if(l.col>=0){const r=s[l.row][l.col],n={from:e,to:l};r?r&&r.color!==c&&o.push(n):o.push(n)}}if(e.col<6){const t={row:e.row+1,col:e.col+2},l={row:e.row-1,col:e.col+2};if(t.row<=7){const r=s[t.row][t.col],n={from:e,to:t};r?r&&r.color!==c&&o.push(n):o.push(n)}if(l.row>=0){const r=s[l.row][l.col],n={from:e,to:l};r?r&&r.color!==c&&o.push(n):o.push(n)}}if(e.col>1){const t={row:e.row+1,col:e.col-2},l={row:e.row-1,col:e.col-2};if(t.row<=7){const r=s[t.row][t.col],n={from:e,to:t};r?r&&r.color!==c&&o.push(n):o.push(n)}if(l.row>=0){const r=s[l.row][l.col],n={from:e,to:l};r?r&&r.color!==c&&o.push(n):o.push(n)}}return o}function V(e,c,s){let o=[];if(c==="white"&&e.row>0){if(e.col>0){const r={row:e.row-1,col:e.col-1},n=s[r.row][r.col];if(n&&n.color!==c){const a={from:e,to:r};o.push(a)}}const t={row:e.row-1,col:e.col};if(!s[t.row][t.col]){const r={from:e,to:t};o.push(r)}if(e.col<7){const r={row:e.row-1,col:e.col+1},n=s[r.row][r.col];if(n&&n.color!==c){const a={from:e,to:r};o.push(a)}}}else if(c==="black"&&e.row<7){if(e.col>0){const r={row:e.row+1,col:e.col-1},n=s[r.row][r.col];if(n&&n.color!==c){const a={from:e,to:r};o.push(a)}}const t={row:e.row+1,col:e.col};if(!s[t.row][t.col]){const r={from:e,to:t};o.push(r)}if(e.col<7){const r={row:e.row+1,col:e.col+1},n=s[r.row][r.col];if(n&&n.color!==c){const a={from:e,to:r};o.push(a)}}}return o}function N(e,c,s){let o=[];if(e.row>0)for(let t=e.row-1;t>=0;t--){const l={row:t,col:e.col},r=s[l.row][l.col],n={from:e,to:l};if(r){r.color!==c&&o.push(n);break}o.push(n)}if(e.row<7)for(let t=e.row+1;t<=7;t++){const l={row:t,col:e.col},r=s[l.row][l.col],n={from:e,to:l};if(r){r.color!==c&&o.push(n);break}o.push(n)}if(e.col<7)for(let t=e.col+1;t<=7;t++){const l={row:e.row,col:t},r=s[l.row][l.col],n={from:e,to:l};if(r){r.color!==c&&o.push(n);break}o.push(n)}if(e.col>0)for(let t=e.col-1;t>=0;t--){const l={row:e.row,col:t},r=s[l.row][l.col],n={from:e,to:l};if(r){r.color!==c&&o.push(n);break}o.push(n)}return o}function U(e,c,s){let o=[];return o=N(e,c,s),o.push(...S(e,c,s)),o}function W(e,c,s){let o=[];if(e.row>0){if(e.col>0){const n={row:e.row-1,col:e.col-1},a=s[n.row][n.col],u={from:e,to:n};a?a&&a.color!==c&&o.push(u):o.push(u)}const t={row:e.row-1,col:e.col},l=s[t.row][t.col],r={from:e,to:t};if(l?l&&l.color!==c&&o.push(r):o.push(r),e.col<7){const n={row:e.row-1,col:e.col+1},a=s[n.row][n.col],u={from:e,to:n};a?a&&a.color!==c&&o.push(u):o.push(u)}}if(e.col>0){const t={row:e.row,col:e.col-1},l=s[t.row][t.col],r={from:e,to:t};l?l&&l.color!==c&&o.push(r):o.push(r)}if(e.col<7){const t={row:e.row,col:e.col+1},l=s[t.row][t.col],r={from:e,to:t};l?l&&l.color!==c&&o.push(r):o.push(r)}if(e.row<7){if(e.col>0){const n={row:e.row+1,col:e.col-1},a=s[n.row][n.col],u={from:e,to:n};a?a&&a.color!==c&&o.push(u):o.push(u)}const t={row:e.row+1,col:e.col},l=s[t.row][t.col],r={from:e,to:t};if(l?l&&l.color!==c&&o.push(r):o.push(r),e.col<7){const n={row:e.row+1,col:e.col+1},a=s[n.row][n.col],u={from:e,to:n};a?a&&a.color!==c&&o.push(u):o.push(u)}}return o}function X(e){e.forEach((c,s)=>{c.forEach((o,t)=>{const r=P({row:s,col:t});if(r){if(r.innerHTML="",!e[s][t])r.innerHTML="";else if(o){const n=f.createElement("piece");n.className=`piece ${o.color}-piece`,o.color===w?n.draggable=!0:(n.draggable=!1,n.classList.add("disable")),n.dataset.row=o.position.row.toString(),n.dataset.col=o.position.col.toString(),n.dataset.team=o.color,n.innerHTML=o.type,r.classList.remove("possible"),r.appendChild(n)}}})})}function T(){p.innerHTML="",B(),O(),A(),D(),x(),b()}f.addEventListener("DOMContentLoaded",()=>{T()});f.addEventListener("dragstart",e=>{const c=e.target;c&&c.matches("piece")&&J(e)});f.addEventListener("dragend",e=>{const c=e.target;c&&c.matches("piece")&&F()});f.addEventListener("click",e=>{const c=e.target;c&&c.matches(".result button")&&(f.querySelector(".result").classList.remove("show"),T())});
