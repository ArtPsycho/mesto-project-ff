(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.addEventListener("click",r),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",r),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.currentTarget&&t(e.currentTarget)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"02d618db-a613-41d9-960e-ca9498e313c1","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function a(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0);c.querySelector(".card__title").textContent=e.name;var a=c.querySelector(".card__image");a.src=e.link,a.alt=e.name;var i=c.querySelector(".card__delete-button");i.addEventListener("click",(function(t){return n(t,e)})),e.owner._id!==t&&i.remove();var l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count");return l.addEventListener("click",(function(n){return r(n,e,t)})),e.likes.length>0?s.textContent=e.likes.length:s.textContent="0",u(e,t)?l.classList.add("card__like-button_is-active"):l.classList.remove("card__like-button_is-active"),a.addEventListener("click",(function(){o(e)})),c}function i(e,t){var n,r=e.target.closest(".card");(n=t._id,fetch("".concat(o.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(){r.remove()})).catch((function(e){console.log(e)}))}function u(e,t){return e.likes.some((function(e){return e._id===t}))}function l(e,t,n){var r,a=e.target,i=a.closest(".card__like").querySelector(".card__like-count");u(t,n)?(r=t._id,fetch("".concat(o.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(e){t.likes=e.likes,a.classList.remove("card__like-button_is-active"),i.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))}(t._id).then((function(e){t.likes=e.likes,a.classList.add("card__like-button_is-active"),i.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function s(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}var d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)};function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,r,t)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".content");var m,v=document.querySelector(".places__list"),_={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},y=document.querySelector(".popup_type_edit"),h=document.querySelector(".profile__edit-button"),S=y.querySelector(".popup__close"),b=document.forms["edit-profile"],k=b.elements.name,g=b.elements.description,q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=b.querySelector(".popup__button");h.addEventListener("click",(function(){e(y),k.value=q.textContent,g.value=E.textContent,f(b,_)})),S.addEventListener("click",(function(){t(y)})),b.addEventListener("submit",(function(e){e.preventDefault(),C.textContent="Сохранение...",function(e,t){return fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return c(e)}))}(k.value,g.value).then((function(){q.textContent=k.value,E.textContent=g.value,t(y)})).catch((function(e){console.log(e)})).finally((function(){C.textContent="Сохранение"}))}));var L=document.querySelector(".popup_type_avatar"),x=document.querySelector(".profile__image"),A=document.forms["new-avatar"],T=A.elements.link,w=L.querySelector(".popup__close"),U=A.querySelector(".popup__button");x.addEventListener("click",(function(){A.reset(),e(L),f(A,_)})),w.addEventListener("click",(function(){t(L)})),A.addEventListener("submit",(function(e){e.preventDefault(),U.textContent="Сохранение...",function(e){return fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e})}).then((function(e){return c(e)}))}(T.value).then((function(){x.style="background-image: url('".concat(T.value,"')"),t(L)})).catch((function(e){console.log(e)})).finally((function(){U.textContent="Сохранение"}))}));var j=document.querySelector(".popup_type_new-card"),O=document.querySelector(".profile__add-button"),B=j.querySelector(".popup__close"),D=document.forms["new-place"],P=D.elements["place-name"],M=D.elements.link,N=D.querySelector(".popup__button");console.log(N),O.addEventListener("click",(function(){D.reset(),e(j),f(D,_)})),B.addEventListener("click",(function(){t(j)})),D.addEventListener("submit",(function(e){var n,r;e.preventDefault(),N.textContent="Сохранение...",(n=P.value,r=M.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return c(e)}))).then((function(e){v.prepend(a(e,m,i,l,V)),D.reset(),t(j)})).catch((function(e){console.log(e)})).finally((function(){N.textContent="Сохранить"}))}));var I=document.querySelector(".popup_type_image"),J=I.querySelector(".popup__close"),G=I.querySelector(".popup__image"),H=I.querySelector(".popup__caption");function V(t){H.textContent=t.name,G.src=t.link,G.alt=t.name,e(I)}J.addEventListener("click",(function(){t(I)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)})(e,o,t),d(n,r,t)}))}))}(t,e)}))}(_),Promise.all([fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then((function(e){return c(e)})),fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];m=c._id,q.textContent=c.name,E.textContent=c.about,x.style="background-image: url('".concat(c.avatar,"')"),o.forEach((function(e){v.append(a(e,m,i,l,V))}))})).catch((function(e){console.log(e)}))})();