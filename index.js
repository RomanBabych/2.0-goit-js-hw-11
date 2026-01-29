import{a as u,i as n,S as f}from"./assets/vendor-BPYGh_14.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();u.defaults.baseURL="https://pixabay.com/api/";const h="43800208-301c21487611dae4b6f535cf2",g=a=>u.get("",{params:{key:h,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}),p=document.querySelector(".loader"),y=document.querySelector(".gallery"),L=a=>a.map(({largeImageURL:r,webformatURL:s,tags:i,likes:e,views:t,comments:o,downloads:m})=>`<li class="gallery-item">
      <a href="${r}">
      <div class="image-wrapper">
      <img class="gallery-item-photo" src="${s}" alt="${i}">
      </div>
      </a>
      <div class="stats">
      <span class="stats-item">
      <p>Likes</p>
      <p>${e}</p>
      </span>
      <span class="stats-item">
      <p>Views</p>
      <p>${t}</p>
      </span>
      <span class="stats-item">
      <p>Comments</p>
      <p>${o}</p>
      </span>
      <span class="stats-item">
      <p>Downloads</p>
      <p>${m}</p>
      </span>
      </div>
    </li>`).join(""),b=()=>{y.innerHTML=""},O=()=>{p.classList.remove("is-hidden")},S=()=>{p.classList.add("is-hidden")},v=document.querySelector(".gallery"),d=document.querySelector(".search-form"),l=d.querySelector('button[type="submit"]');let c;const I=a=>{a.preventDefault(),b();const r=a.target.elements.searchText.value.trim();if(!r){n.warning({message:"Please enter a search term!",position:"topRight",transitionIn:"fadeInLeft",transitionOut:"fadeOutRight",timeout:3e3});return}l.disabled=!0,O(),g(r).then(s=>s.data.hits.length?s.data.hits:Promise.reject(new Error("Sorry, there are no images matching your search query. Please try again!"))).then(s=>{n.success({message:"Successfully found images!",position:"topRight",transitionIn:"fadeInLeft",transitionOut:"fadeOutRight",timeout:3e3}),v.insertAdjacentHTML("beforeend",L(s)),c||(c=new f(".gallery a",{captionsData:"alt",captionsDelay:250})),c.refresh()}).catch(s=>{n.error({message:s.message,position:"topRight",transitionIn:"fadeInLeft",transitionOut:"fadeOutRight",timeout:3e3}),console.error("Axios error:",s)}).finally(()=>{l.disabled=!1,S()})};d.addEventListener("submit",I);
//# sourceMappingURL=index.js.map
