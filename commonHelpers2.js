import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as m}from"./assets/vendor-77e16229.js";const l=document.querySelector(".form");let a={delay:0,state:""};const c=e=>{const o=e.target.name,s=e.target.value;a[o]=s,localStorage.setItem("form-data",JSON.stringify(a))},f=e=>{e.preventDefault();const o=JSON.parse(localStorage.getItem("form-data")),s=new Promise((t,n)=>{const r=o.state,i=o.delay;return r==="fulfilled"?t(i):r==="rejected"&&n(i),s});s.then(t=>{setTimeout(()=>{m.success({title:"Fulfilled",message:`Fulfilled promise in ${t}ms`,position:"topRight"})},t*1e3)}).catch(t=>{setTimeout(()=>{m.error({title:"Rejected",message:`Rejected promise in ${t}ms`,position:"topRight"})},t*1e3)}),e.target.reset(),localStorage.removeItem("form-data"),a={delay:0,state:""}};l.addEventListener("change",c);l.addEventListener("submit",f);
//# sourceMappingURL=commonHelpers2.js.map
