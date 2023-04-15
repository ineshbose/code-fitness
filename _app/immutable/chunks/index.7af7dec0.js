const le=function(){if(typeof globalThis<"u")return globalThis;if(typeof global<"u")return global;if(typeof self<"u")return self;if(typeof window<"u")return window;try{return new Function("return this")()}catch{return{}}}();le.trustedTypes===void 0&&(le.trustedTypes={createPolicy:(i,e)=>e});const Ni={configurable:!1,enumerable:!1,writable:!1};le.FAST===void 0&&Reflect.defineProperty(le,"FAST",Object.assign({value:Object.create(null)},Ni));const Qe=le.FAST;if(Qe.getById===void 0){const i=Object.create(null);Reflect.defineProperty(Qe,"getById",Object.assign({value(e,t){let s=i[e];return s===void 0&&(s=t?i[e]=t():null),s}},Ni))}const ge=Object.freeze([]);function zi(){const i=new WeakMap;return function(e){let t=i.get(e);if(t===void 0){let s=Reflect.getPrototypeOf(e);for(;t===void 0&&s!==null;)t=i.get(s),s=Reflect.getPrototypeOf(s);t=t===void 0?[]:t.slice(0),i.set(e,t)}return t}}const It=le.FAST.getById(1,()=>{const i=[],e=[];function t(){if(e.length)throw e.shift()}function s(r){try{r.call()}catch(a){e.push(a),setTimeout(t,0)}}function n(){let a=0;for(;a<i.length;)if(s(i[a]),a++,a>1024){for(let c=0,d=i.length-a;c<d;c++)i[c]=i[c+a];i.length-=a,a=0}i.length=0}function o(r){i.length<1&&le.requestAnimationFrame(n),i.push(r)}return Object.freeze({enqueue:o,process:n})}),_i=le.trustedTypes.createPolicy("fast-html",{createHTML:i=>i});let Tt=_i;const qe=`fast-${Math.random().toString(36).substring(2,8)}`,ji=`${qe}{`,Gt=`}${qe}`,y=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(i){if(Tt!==_i)throw new Error("The HTML policy can only be set once.");Tt=i},createHTML(i){return Tt.createHTML(i)},isMarker(i){return i&&i.nodeType===8&&i.data.startsWith(qe)},extractDirectiveIndexFromMarker(i){return parseInt(i.data.replace(`${qe}:`,""))},createInterpolationPlaceholder(i){return`${ji}${i}${Gt}`},createCustomAttributePlaceholder(i,e){return`${i}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder(i){return`<!--${qe}:${i}-->`},queueUpdate:It.enqueue,processUpdates:It.process,nextUpdate(){return new Promise(It.enqueue)},setAttribute(i,e,t){t==null?i.removeAttribute(e):i.setAttribute(e,t)},setBooleanAttribute(i,e,t){t?i.setAttribute(e,""):i.removeAttribute(e)},removeChildNodes(i){for(let e=i.firstChild;e!==null;e=i.firstChild)i.removeChild(e)},createTemplateWalker(i){return document.createTreeWalker(i,133,null,!1)}});class ut{constructor(e,t){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=e,this.sub1=t}has(e){return this.spillover===void 0?this.sub1===e||this.sub2===e:this.spillover.indexOf(e)!==-1}subscribe(e){const t=this.spillover;if(t===void 0){if(this.has(e))return;if(this.sub1===void 0){this.sub1=e;return}if(this.sub2===void 0){this.sub2=e;return}this.spillover=[this.sub1,this.sub2,e],this.sub1=void 0,this.sub2=void 0}else t.indexOf(e)===-1&&t.push(e)}unsubscribe(e){const t=this.spillover;if(t===void 0)this.sub1===e?this.sub1=void 0:this.sub2===e&&(this.sub2=void 0);else{const s=t.indexOf(e);s!==-1&&t.splice(s,1)}}notify(e){const t=this.spillover,s=this.source;if(t===void 0){const n=this.sub1,o=this.sub2;n!==void 0&&n.handleChange(s,e),o!==void 0&&o.handleChange(s,e)}else for(let n=0,o=t.length;n<o;++n)t[n].handleChange(s,e)}}class qi{constructor(e){this.subscribers={},this.sourceSubscribers=null,this.source=e}notify(e){var t;const s=this.subscribers[e];s!==void 0&&s.notify(e),(t=this.sourceSubscribers)===null||t===void 0||t.notify(e)}subscribe(e,t){var s;if(t){let n=this.subscribers[t];n===void 0&&(this.subscribers[t]=n=new ut(this.source)),n.subscribe(e)}else this.sourceSubscribers=(s=this.sourceSubscribers)!==null&&s!==void 0?s:new ut(this.source),this.sourceSubscribers.subscribe(e)}unsubscribe(e,t){var s;if(t){const n=this.subscribers[t];n!==void 0&&n.unsubscribe(e)}else(s=this.sourceSubscribers)===null||s===void 0||s.unsubscribe(e)}}const v=Qe.getById(2,()=>{const i=/(:|&&|\|\||if)/,e=new WeakMap,t=y.queueUpdate;let s,n=d=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function o(d){let h=d.$fastController||e.get(d);return h===void 0&&(Array.isArray(d)?h=n(d):e.set(d,h=new qi(d))),h}const r=zi();class a{constructor(h){this.name=h,this.field=`_${h}`,this.callback=`${h}Changed`}getValue(h){return s!==void 0&&s.watch(h,this.name),h[this.field]}setValue(h,p){const g=this.field,$=h[g];if($!==p){h[g]=p;const C=h[this.callback];typeof C=="function"&&C.call(h,$,p),o(h).notify(this.name)}}}class c extends ut{constructor(h,p,g=!1){super(h,p),this.binding=h,this.isVolatileBinding=g,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(h,p){this.needsRefresh&&this.last!==null&&this.disconnect();const g=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const $=this.binding(h,p);return s=g,$}disconnect(){if(this.last!==null){let h=this.first;for(;h!==void 0;)h.notifier.unsubscribe(this,h.propertyName),h=h.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(h,p){const g=this.last,$=o(h),C=g===null?this.first:{};if(C.propertySource=h,C.propertyName=p,C.notifier=$,$.subscribe(this,p),g!==null){if(!this.needsRefresh){let D;s=void 0,D=g.propertySource[g.propertyName],s=this,h===D&&(this.needsRefresh=!0)}g.next=C}this.last=C}handleChange(){this.needsQueue&&(this.needsQueue=!1,t(this))}call(){this.last!==null&&(this.needsQueue=!0,this.notify(this))}records(){let h=this.first;return{next:()=>{const p=h;return p===void 0?{value:void 0,done:!0}:(h=h.next,{value:p,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(d){n=d},getNotifier:o,track(d,h){s!==void 0&&s.watch(d,h)},trackVolatile(){s!==void 0&&(s.needsRefresh=!0)},notify(d,h){o(d).notify(h)},defineProperty(d,h){typeof h=="string"&&(h=new a(h)),r(d).push(h),Reflect.defineProperty(d,h.name,{enumerable:!0,get:function(){return h.getValue(this)},set:function(p){h.setValue(this,p)}})},getAccessors:r,binding(d,h,p=this.isVolatileBinding(d)){return new c(d,h,p)},isVolatileBinding(d){return i.test(d.toString())}})});function b(i,e){v.defineProperty(i,e)}function Os(i,e,t){return Object.assign({},t,{get:function(){return v.trackVolatile(),t.get.apply(this)}})}const ci=Qe.getById(3,()=>{let i=null;return{get(){return i},set(e){i=e}}});class Xe{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return ci.get()}get isEven(){return this.index%2===0}get isOdd(){return this.index%2!==0}get isFirst(){return this.index===0}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(e){ci.set(e)}}v.defineProperty(Xe.prototype,"index");v.defineProperty(Xe.prototype,"length");const Ue=Object.seal(new Xe);class mt{constructor(){this.targetIndex=0}}class Ui extends mt{constructor(){super(...arguments),this.createPlaceholder=y.createInterpolationPlaceholder}}class Wt extends mt{constructor(e,t,s){super(),this.name=e,this.behavior=t,this.options=s}createPlaceholder(e){return y.createCustomAttributePlaceholder(this.name,e)}createBehavior(e){return new this.behavior(e,this.options)}}function As(i,e){this.source=i,this.context=e,this.bindingObserver===null&&(this.bindingObserver=v.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(i,e))}function Rs(i,e){this.source=i,this.context=e,this.target.addEventListener(this.targetName,this)}function Ds(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function Es(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const i=this.target.$fastView;i!==void 0&&i.isComposed&&(i.unbind(),i.needsBindOnly=!0)}function Bs(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function Ps(i){y.setAttribute(this.target,this.targetName,i)}function Fs(i){y.setBooleanAttribute(this.target,this.targetName,i)}function Ls(i){if(i==null&&(i=""),i.create){this.target.textContent="";let e=this.target.$fastView;e===void 0?e=i.create():this.target.$fastTemplate!==i&&(e.isComposed&&(e.remove(),e.unbind()),e=i.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=i)}else{const e=this.target.$fastView;e!==void 0&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=i}}function Hs(i){this.target[this.targetName]=i}function Vs(i){const e=this.classVersions||Object.create(null),t=this.target;let s=this.version||0;if(i!=null&&i.length){const n=i.split(/\s+/);for(let o=0,r=n.length;o<r;++o){const a=n[o];a!==""&&(e[a]=s,t.classList.add(a))}}if(this.classVersions=e,this.version=s+1,s!==0){s-=1;for(const n in e)e[n]===s&&t.classList.remove(n)}}class Qt extends Ui{constructor(e){super(),this.binding=e,this.bind=As,this.unbind=Ds,this.updateTarget=Ps,this.isBindingVolatile=v.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(e){if(this.originalTargetName=e,e!==void 0)switch(e[0]){case":":if(this.cleanedTargetName=e.substr(1),this.updateTarget=Hs,this.cleanedTargetName==="innerHTML"){const t=this.binding;this.binding=(s,n)=>y.createHTML(t(s,n))}break;case"?":this.cleanedTargetName=e.substr(1),this.updateTarget=Fs;break;case"@":this.cleanedTargetName=e.substr(1),this.bind=Rs,this.unbind=Bs;break;default:this.cleanedTargetName=e,e==="class"&&(this.updateTarget=Vs);break}}targetAtContent(){this.updateTarget=Ls,this.unbind=Es}createBehavior(e){return new Ms(e,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class Ms{constructor(e,t,s,n,o,r,a){this.source=null,this.context=null,this.bindingObserver=null,this.target=e,this.binding=t,this.isBindingVolatile=s,this.bind=n,this.unbind=o,this.updateTarget=r,this.targetName=a}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(e){Xe.setEvent(e);const t=this.binding(this.source,this.context);Xe.setEvent(null),t!==!0&&e.preventDefault()}}let St=null;class Xt{addFactory(e){e.targetIndex=this.targetIndex,this.behaviorFactories.push(e)}captureContentBinding(e){e.targetAtContent(),this.addFactory(e)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){St=this}static borrow(e){const t=St||new Xt;return t.directives=e,t.reset(),St=null,t}}function Ns(i){if(i.length===1)return i[0];let e;const t=i.length,s=i.map(r=>typeof r=="string"?()=>r:(e=r.targetName||e,r.binding)),n=(r,a)=>{let c="";for(let d=0;d<t;++d)c+=s[d](r,a);return c},o=new Qt(n);return o.targetName=e,o}const zs=Gt.length;function Gi(i,e){const t=e.split(ji);if(t.length===1)return null;const s=[];for(let n=0,o=t.length;n<o;++n){const r=t[n],a=r.indexOf(Gt);let c;if(a===-1)c=r;else{const d=parseInt(r.substring(0,a));s.push(i.directives[d]),c=r.substring(a+zs)}c!==""&&s.push(c)}return s}function di(i,e,t=!1){const s=e.attributes;for(let n=0,o=s.length;n<o;++n){const r=s[n],a=r.value,c=Gi(i,a);let d=null;c===null?t&&(d=new Qt(()=>a),d.targetName=r.name):d=Ns(c),d!==null&&(e.removeAttributeNode(r),n--,o--,i.addFactory(d))}}function _s(i,e,t){const s=Gi(i,e.textContent);if(s!==null){let n=e;for(let o=0,r=s.length;o<r;++o){const a=s[o],c=o===0?e:n.parentNode.insertBefore(document.createTextNode(""),n.nextSibling);typeof a=="string"?c.textContent=a:(c.textContent=" ",i.captureContentBinding(a)),n=c,i.targetIndex++,c!==e&&t.nextNode()}i.targetIndex--}}function js(i,e){const t=i.content;document.adoptNode(t);const s=Xt.borrow(e);di(s,i,!0);const n=s.behaviorFactories;s.reset();const o=y.createTemplateWalker(t);let r;for(;r=o.nextNode();)switch(s.targetIndex++,r.nodeType){case 1:di(s,r);break;case 3:_s(s,r,o);break;case 8:y.isMarker(r)&&s.addFactory(e[y.extractDirectiveIndexFromMarker(r)])}let a=0;(y.isMarker(t.firstChild)||t.childNodes.length===1&&e.length)&&(t.insertBefore(document.createComment(""),t.firstChild),a=-1);const c=s.behaviorFactories;return s.release(),{fragment:t,viewBehaviorFactories:c,hostBehaviorFactories:n,targetOffset:a}}const Ot=document.createRange();class Wi{constructor(e,t){this.fragment=e,this.behaviors=t,this.source=null,this.context=null,this.firstChild=e.firstChild,this.lastChild=e.lastChild}appendTo(e){e.appendChild(this.fragment)}insertBefore(e){if(this.fragment.hasChildNodes())e.parentNode.insertBefore(this.fragment,e);else{const t=this.lastChild;if(e.previousSibling===t)return;const s=e.parentNode;let n=this.firstChild,o;for(;n!==t;)o=n.nextSibling,s.insertBefore(n,e),n=o;s.insertBefore(t,e)}}remove(){const e=this.fragment,t=this.lastChild;let s=this.firstChild,n;for(;s!==t;)n=s.nextSibling,e.appendChild(s),s=n;e.appendChild(t)}dispose(){const e=this.firstChild.parentNode,t=this.lastChild;let s=this.firstChild,n;for(;s!==t;)n=s.nextSibling,e.removeChild(s),s=n;e.removeChild(t);const o=this.behaviors,r=this.source;for(let a=0,c=o.length;a<c;++a)o[a].unbind(r)}bind(e,t){const s=this.behaviors;if(this.source!==e)if(this.source!==null){const n=this.source;this.source=e,this.context=t;for(let o=0,r=s.length;o<r;++o){const a=s[o];a.unbind(n),a.bind(e,t)}}else{this.source=e,this.context=t;for(let n=0,o=s.length;n<o;++n)s[n].bind(e,t)}}unbind(){if(this.source===null)return;const e=this.behaviors,t=this.source;for(let s=0,n=e.length;s<n;++s)e[s].unbind(t);this.source=null}static disposeContiguousBatch(e){if(e.length!==0){Ot.setStartBefore(e[0].firstChild),Ot.setEndAfter(e[e.length-1].lastChild),Ot.deleteContents();for(let t=0,s=e.length;t<s;++t){const n=e[t],o=n.behaviors,r=n.source;for(let a=0,c=o.length;a<c;++a)o[a].unbind(r)}}}}class hi{constructor(e,t){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=e,this.directives=t}create(e){if(this.fragment===null){let d;const h=this.html;if(typeof h=="string"){d=document.createElement("template"),d.innerHTML=y.createHTML(h);const g=d.content.firstElementChild;g!==null&&g.tagName==="TEMPLATE"&&(d=g)}else d=h;const p=js(d,this.directives);this.fragment=p.fragment,this.viewBehaviorFactories=p.viewBehaviorFactories,this.hostBehaviorFactories=p.hostBehaviorFactories,this.targetOffset=p.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const t=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,n=new Array(this.behaviorCount),o=y.createTemplateWalker(t);let r=0,a=this.targetOffset,c=o.nextNode();for(let d=s.length;r<d;++r){const h=s[r],p=h.targetIndex;for(;c!==null;)if(a===p){n[r]=h.createBehavior(c);break}else c=o.nextNode(),a++}if(this.hasHostBehaviors){const d=this.hostBehaviorFactories;for(let h=0,p=d.length;h<p;++h,++r)n[r]=d[h].createBehavior(e)}return new Wi(t,n)}render(e,t,s){typeof t=="string"&&(t=document.getElementById(t)),s===void 0&&(s=t);const n=this.create(s);return n.bind(e,Ue),n.appendTo(t),n}}const qs=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function w(i,...e){const t=[];let s="";for(let n=0,o=i.length-1;n<o;++n){const r=i[n];let a=e[n];if(s+=r,a instanceof hi){const c=a;a=()=>c}if(typeof a=="function"&&(a=new Qt(a)),a instanceof Ui){const c=qs.exec(r);c!==null&&(a.targetName=c[2])}a instanceof mt?(s+=a.createPlaceholder(t.length),t.push(a)):s+=a}return s+=i[i.length-1],new hi(s,t)}class _{constructor(){this.targets=new WeakSet}addStylesTo(e){this.targets.add(e)}removeStylesFrom(e){this.targets.delete(e)}isAttachedTo(e){return this.targets.has(e)}withBehaviors(...e){return this.behaviors=this.behaviors===null?e:this.behaviors.concat(e),this}}_.create=(()=>{if(y.supportsAdoptedStyleSheets){const i=new Map;return e=>new Us(e,i)}return i=>new Qs(i)})();function Yt(i){return i.map(e=>e instanceof _?Yt(e.styles):[e]).reduce((e,t)=>e.concat(t),[])}function Qi(i){return i.map(e=>e instanceof _?e.behaviors:null).reduce((e,t)=>t===null?e:(e===null&&(e=[]),e.concat(t)),null)}class Us extends _{constructor(e,t){super(),this.styles=e,this.styleSheetCache=t,this._styleSheets=void 0,this.behaviors=Qi(e)}get styleSheets(){if(this._styleSheets===void 0){const e=this.styles,t=this.styleSheetCache;this._styleSheets=Yt(e).map(s=>{if(s instanceof CSSStyleSheet)return s;let n=t.get(s);return n===void 0&&(n=new CSSStyleSheet,n.replaceSync(s),t.set(s,n)),n})}return this._styleSheets}addStylesTo(e){e.adoptedStyleSheets=[...e.adoptedStyleSheets,...this.styleSheets],super.addStylesTo(e)}removeStylesFrom(e){const t=this.styleSheets;e.adoptedStyleSheets=e.adoptedStyleSheets.filter(s=>t.indexOf(s)===-1),super.removeStylesFrom(e)}}let Gs=0;function Ws(){return`fast-style-class-${++Gs}`}class Qs extends _{constructor(e){super(),this.styles=e,this.behaviors=null,this.behaviors=Qi(e),this.styleSheets=Yt(e),this.styleClass=Ws()}addStylesTo(e){const t=this.styleSheets,s=this.styleClass;e=this.normalizeTarget(e);for(let n=0;n<t.length;n++){const o=document.createElement("style");o.innerHTML=t[n],o.className=s,e.append(o)}super.addStylesTo(e)}removeStylesFrom(e){e=this.normalizeTarget(e);const t=e.querySelectorAll(`.${this.styleClass}`);for(let s=0,n=t.length;s<n;++s)e.removeChild(t[s]);super.removeStylesFrom(e)}isAttachedTo(e){return super.isAttachedTo(this.normalizeTarget(e))}normalizeTarget(e){return e===document?document.body:e}}const pt=Object.freeze({locate:zi()}),Xi={toView(i){return i?"true":"false"},fromView(i){return!(i==null||i==="false"||i===!1||i===0)}},J={toView(i){if(i==null)return null;const e=i*1;return isNaN(e)?null:e.toString()},fromView(i){if(i==null)return null;const e=i*1;return isNaN(e)?null:e}};class ft{constructor(e,t,s=t.toLowerCase(),n="reflect",o){this.guards=new Set,this.Owner=e,this.name=t,this.attribute=s,this.mode=n,this.converter=o,this.fieldName=`_${t}`,this.callbackName=`${t}Changed`,this.hasCallback=this.callbackName in e.prototype,n==="boolean"&&o===void 0&&(this.converter=Xi)}setValue(e,t){const s=e[this.fieldName],n=this.converter;n!==void 0&&(t=n.fromView(t)),s!==t&&(e[this.fieldName]=t,this.tryReflectToAttribute(e),this.hasCallback&&e[this.callbackName](s,t),e.$fastController.notify(this.name))}getValue(e){return v.track(e,this.name),e[this.fieldName]}onAttributeChangedCallback(e,t){this.guards.has(e)||(this.guards.add(e),this.setValue(e,t),this.guards.delete(e))}tryReflectToAttribute(e){const t=this.mode,s=this.guards;s.has(e)||t==="fromView"||y.queueUpdate(()=>{s.add(e);const n=e[this.fieldName];switch(t){case"reflect":const o=this.converter;y.setAttribute(e,this.attribute,o!==void 0?o.toView(n):n);break;case"boolean":y.setBooleanAttribute(e,this.attribute,n);break}s.delete(e)})}static collect(e,...t){const s=[];t.push(pt.locate(e));for(let n=0,o=t.length;n<o;++n){const r=t[n];if(r!==void 0)for(let a=0,c=r.length;a<c;++a){const d=r[a];typeof d=="string"?s.push(new ft(e,d)):s.push(new ft(e,d.property,d.attribute,d.mode,d.converter))}}return s}}function u(i,e){let t;function s(n,o){arguments.length>1&&(t.property=o),pt.locate(n.constructor).push(t)}if(arguments.length>1){t={},s(i,e);return}return t=i===void 0?{}:i,s}const ui={mode:"open"},pi={},Nt=Qe.getById(4,()=>{const i=new Map;return Object.freeze({register(e){return i.has(e.type)?!1:(i.set(e.type,e),!0)},getByType(e){return i.get(e)}})});class vt{constructor(e,t=e.definition){typeof t=="string"&&(t={name:t}),this.type=e,this.name=t.name,this.template=t.template;const s=ft.collect(e,t.attributes),n=new Array(s.length),o={},r={};for(let a=0,c=s.length;a<c;++a){const d=s[a];n[a]=d.attribute,o[d.name]=d,r[d.attribute]=d}this.attributes=s,this.observedAttributes=n,this.propertyLookup=o,this.attributeLookup=r,this.shadowOptions=t.shadowOptions===void 0?ui:t.shadowOptions===null?void 0:Object.assign(Object.assign({},ui),t.shadowOptions),this.elementOptions=t.elementOptions===void 0?pi:Object.assign(Object.assign({},pi),t.elementOptions),this.styles=t.styles===void 0?void 0:Array.isArray(t.styles)?_.create(t.styles):t.styles instanceof _?t.styles:_.create([t.styles])}get isDefined(){return!!Nt.getByType(this.type)}define(e=customElements){const t=this.type;if(Nt.register(this)){const s=this.attributes,n=t.prototype;for(let o=0,r=s.length;o<r;++o)v.defineProperty(n,s[o]);Reflect.defineProperty(t,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return e.get(this.name)||e.define(this.name,t,this.elementOptions),this}}vt.forType=Nt.getByType;const Yi=new WeakMap,Xs={bubbles:!0,composed:!0,cancelable:!0};function At(i){return i.shadowRoot||Yi.get(i)||null}class Jt extends qi{constructor(e,t){super(e),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=e,this.definition=t;const s=t.shadowOptions;if(s!==void 0){const o=e.attachShadow(s);s.mode==="closed"&&Yi.set(e,o)}const n=v.getAccessors(e);if(n.length>0){const o=this.boundObservables=Object.create(null);for(let r=0,a=n.length;r<a;++r){const c=n[r].name,d=e[c];d!==void 0&&(delete e[c],o[c]=d)}}}get isConnected(){return v.track(this,"isConnected"),this._isConnected}setIsConnected(e){this._isConnected=e,v.notify(this,"isConnected")}get template(){return this._template}set template(e){this._template!==e&&(this._template=e,this.needsInitialization||this.renderTemplate(e))}get styles(){return this._styles}set styles(e){this._styles!==e&&(this._styles!==null&&this.removeStyles(this._styles),this._styles=e,!this.needsInitialization&&e!==null&&this.addStyles(e))}addStyles(e){const t=At(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)t.append(e);else if(!e.isAttachedTo(t)){const s=e.behaviors;e.addStylesTo(t),s!==null&&this.addBehaviors(s)}}removeStyles(e){const t=At(this.element)||this.element.getRootNode();if(e instanceof HTMLStyleElement)t.removeChild(e);else if(e.isAttachedTo(t)){const s=e.behaviors;e.removeStylesFrom(t),s!==null&&this.removeBehaviors(s)}}addBehaviors(e){const t=this.behaviors||(this.behaviors=new Map),s=e.length,n=[];for(let o=0;o<s;++o){const r=e[o];t.has(r)?t.set(r,t.get(r)+1):(t.set(r,1),n.push(r))}if(this._isConnected){const o=this.element;for(let r=0;r<n.length;++r)n[r].bind(o,Ue)}}removeBehaviors(e,t=!1){const s=this.behaviors;if(s===null)return;const n=e.length,o=[];for(let r=0;r<n;++r){const a=e[r];if(s.has(a)){const c=s.get(a)-1;c===0||t?s.delete(a)&&o.push(a):s.set(a,c)}}if(this._isConnected){const r=this.element;for(let a=0;a<o.length;++a)o[a].unbind(r)}}onConnectedCallback(){if(this._isConnected)return;const e=this.element;this.needsInitialization?this.finishInitialization():this.view!==null&&this.view.bind(e,Ue);const t=this.behaviors;if(t!==null)for(const[s]of t)s.bind(e,Ue);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const e=this.view;e!==null&&e.unbind();const t=this.behaviors;if(t!==null){const s=this.element;for(const[n]of t)n.unbind(s)}}onAttributeChangedCallback(e,t,s){const n=this.definition.attributeLookup[e];n!==void 0&&n.onAttributeChangedCallback(this.element,s)}emit(e,t,s){return this._isConnected?this.element.dispatchEvent(new CustomEvent(e,Object.assign(Object.assign({detail:t},Xs),s))):!1}finishInitialization(){const e=this.element,t=this.boundObservables;if(t!==null){const n=Object.keys(t);for(let o=0,r=n.length;o<r;++o){const a=n[o];e[a]=t[a]}this.boundObservables=null}const s=this.definition;this._template===null&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),this._template!==null&&this.renderTemplate(this._template),this._styles===null&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),this._styles!==null&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(e){const t=this.element,s=At(t)||t;this.view!==null?(this.view.dispose(),this.view=null):this.needsInitialization||y.removeChildNodes(s),e&&(this.view=e.render(t,s,t))}static forCustomElement(e){const t=e.$fastController;if(t!==void 0)return t;const s=vt.forType(e.constructor);if(s===void 0)throw new Error("Missing FASTElement definition.");return e.$fastController=new Jt(e,s)}}function fi(i){return class extends i{constructor(){super(),Jt.forCustomElement(this)}$emit(e,t,s){return this.$fastController.emit(e,t,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(e,t,s){this.$fastController.onAttributeChangedCallback(e,t,s)}}}const yt=Object.assign(fi(HTMLElement),{from(i){return fi(i)},define(i,e){return new vt(i,e).define().type}});class Ji{createCSS(){return""}createBehavior(){}}function Ys(i,e){const t=[];let s="";const n=[];for(let o=0,r=i.length-1;o<r;++o){s+=i[o];let a=e[o];if(a instanceof Ji){const c=a.createBehavior();a=a.createCSS(),c&&n.push(c)}a instanceof _||a instanceof CSSStyleSheet?(s.trim()!==""&&(t.push(s),s=""),t.push(a)):s+=a}return s+=i[i.length-1],s.trim()!==""&&t.push(s),{styles:t,behaviors:n}}function O(i,...e){const{styles:t,behaviors:s}=Ys(i,e),n=_.create(t);return s.length&&n.withBehaviors(...s),n}function Y(i,e,t){return{index:i,removed:e,addedCount:t}}const Zi=0,Ki=1,zt=2,_t=3;function Js(i,e,t,s,n,o){const r=o-n+1,a=t-e+1,c=new Array(r);let d,h;for(let p=0;p<r;++p)c[p]=new Array(a),c[p][0]=p;for(let p=0;p<a;++p)c[0][p]=p;for(let p=1;p<r;++p)for(let g=1;g<a;++g)i[e+g-1]===s[n+p-1]?c[p][g]=c[p-1][g-1]:(d=c[p-1][g]+1,h=c[p][g-1]+1,c[p][g]=d<h?d:h);return c}function Zs(i){let e=i.length-1,t=i[0].length-1,s=i[e][t];const n=[];for(;e>0||t>0;){if(e===0){n.push(zt),t--;continue}if(t===0){n.push(_t),e--;continue}const o=i[e-1][t-1],r=i[e-1][t],a=i[e][t-1];let c;r<a?c=r<o?r:o:c=a<o?a:o,c===o?(o===s?n.push(Zi):(n.push(Ki),s=o),e--,t--):c===r?(n.push(_t),e--,s=r):(n.push(zt),t--,s=a)}return n.reverse(),n}function Ks(i,e,t){for(let s=0;s<t;++s)if(i[s]!==e[s])return s;return t}function en(i,e,t){let s=i.length,n=e.length,o=0;for(;o<t&&i[--s]===e[--n];)o++;return o}function tn(i,e,t,s){return e<t||s<i?-1:e===t||s===i?0:i<t?e<s?e-t:s-t:s<e?s-i:e-i}function es(i,e,t,s,n,o){let r=0,a=0;const c=Math.min(t-e,o-n);if(e===0&&n===0&&(r=Ks(i,s,c)),t===i.length&&o===s.length&&(a=en(i,s,c-r)),e+=r,n+=r,t-=a,o-=a,t-e===0&&o-n===0)return ge;if(e===t){const C=Y(e,[],0);for(;n<o;)C.removed.push(s[n++]);return[C]}else if(n===o)return[Y(e,[],t-e)];const d=Zs(Js(i,e,t,s,n,o)),h=[];let p,g=e,$=n;for(let C=0;C<d.length;++C)switch(d[C]){case Zi:p!==void 0&&(h.push(p),p=void 0),g++,$++;break;case Ki:p===void 0&&(p=Y(g,[],0)),p.addedCount++,g++,p.removed.push(s[$]),$++;break;case zt:p===void 0&&(p=Y(g,[],0)),p.addedCount++,g++;break;case _t:p===void 0&&(p=Y(g,[],0)),p.removed.push(s[$]),$++;break}return p!==void 0&&h.push(p),h}const bi=Array.prototype.push;function sn(i,e,t,s){const n=Y(e,t,s);let o=!1,r=0;for(let a=0;a<i.length;a++){const c=i[a];if(c.index+=r,o)continue;const d=tn(n.index,n.index+n.removed.length,c.index,c.index+c.addedCount);if(d>=0){i.splice(a,1),a--,r-=c.addedCount-c.removed.length,n.addedCount+=c.addedCount-d;const h=n.removed.length+c.removed.length-d;if(!n.addedCount&&!h)o=!0;else{let p=c.removed;if(n.index<c.index){const g=n.removed.slice(0,c.index-n.index);bi.apply(g,p),p=g}if(n.index+n.removed.length>c.index+c.addedCount){const g=n.removed.slice(c.index+c.addedCount-n.index);bi.apply(p,g)}n.removed=p,c.index<n.index&&(n.index=c.index)}}else if(n.index<c.index){o=!0,i.splice(a,0,n),a++;const h=n.addedCount-n.removed.length;c.index+=h,r+=h}}o||i.push(n)}function nn(i){const e=[];for(let t=0,s=i.length;t<s;t++){const n=i[t];sn(e,n.index,n.removed,n.addedCount)}return e}function on(i,e){let t=[];const s=nn(e);for(let n=0,o=s.length;n<o;++n){const r=s[n];if(r.addedCount===1&&r.removed.length===1){r.removed[0]!==i[r.index]&&t.push(r);continue}t=t.concat(es(i,r.index,r.index+r.addedCount,r.removed,0,r.removed.length))}return t}let gi=!1;function Rt(i,e){let t=i.index;const s=e.length;return t>s?t=s-i.addedCount:t<0&&(t=s+i.removed.length+t-i.addedCount),t<0&&(t=0),i.index=t,i}class rn extends ut{constructor(e){super(e),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(e,"$fastController",{value:this,enumerable:!1})}subscribe(e){this.flush(),super.subscribe(e)}addSplice(e){this.splices===void 0?this.splices=[e]:this.splices.push(e),this.needsQueue&&(this.needsQueue=!1,y.queueUpdate(this))}reset(e){this.oldCollection=e,this.needsQueue&&(this.needsQueue=!1,y.queueUpdate(this))}flush(){const e=this.splices,t=this.oldCollection;if(e===void 0&&t===void 0)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const s=t===void 0?on(this.source,e):es(this.source,0,this.source.length,t,0,t.length);this.notify(s)}}function an(){if(gi)return;gi=!0,v.setArrayObserverFactory(c=>new rn(c));const i=Array.prototype;if(i.$fastPatch)return;Reflect.defineProperty(i,"$fastPatch",{value:1,enumerable:!1});const e=i.pop,t=i.push,s=i.reverse,n=i.shift,o=i.sort,r=i.splice,a=i.unshift;i.pop=function(){const c=this.length>0,d=e.apply(this,arguments),h=this.$fastController;return h!==void 0&&c&&h.addSplice(Y(this.length,[d],0)),d},i.push=function(){const c=t.apply(this,arguments),d=this.$fastController;return d!==void 0&&d.addSplice(Rt(Y(this.length-arguments.length,[],arguments.length),this)),c},i.reverse=function(){let c;const d=this.$fastController;d!==void 0&&(d.flush(),c=this.slice());const h=s.apply(this,arguments);return d!==void 0&&d.reset(c),h},i.shift=function(){const c=this.length>0,d=n.apply(this,arguments),h=this.$fastController;return h!==void 0&&c&&h.addSplice(Y(0,[d],0)),d},i.sort=function(){let c;const d=this.$fastController;d!==void 0&&(d.flush(),c=this.slice());const h=o.apply(this,arguments);return d!==void 0&&d.reset(c),h},i.splice=function(){const c=r.apply(this,arguments),d=this.$fastController;return d!==void 0&&d.addSplice(Rt(Y(+arguments[0],c,arguments.length>2?arguments.length-2:0),this)),c},i.unshift=function(){const c=a.apply(this,arguments),d=this.$fastController;return d!==void 0&&d.addSplice(Rt(Y(0,[],arguments.length),this)),c}}class ln{constructor(e,t){this.target=e,this.propertyName=t}bind(e){e[this.propertyName]=this.target}unbind(){}}function M(i){return new Wt("fast-ref",ln,i)}function bt(i,e){const t=typeof e=="function"?e:()=>e;return(s,n)=>i(s,n)?t(s,n):null}function cn(i,e,t,s){i.bind(e[t],s)}function dn(i,e,t,s){const n=Object.create(s);n.index=t,n.length=e.length,i.bind(e[t],n)}class hn{constructor(e,t,s,n,o,r){this.location=e,this.itemsBinding=t,this.templateBinding=n,this.options=r,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=cn,this.itemsBindingObserver=v.binding(t,this,s),this.templateBindingObserver=v.binding(n,this,o),r.positioning&&(this.bindView=dn)}bind(e,t){this.source=e,this.originalContext=t,this.childContext=Object.create(t),this.childContext.parent=e,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(e,this.originalContext),this.template=this.templateBindingObserver.observe(e,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,this.itemsObserver!==null&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(e,t){e===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):e===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(t)}observeItems(e=!1){if(!this.items){this.items=ge;return}const t=this.itemsObserver,s=this.itemsObserver=v.getNotifier(this.items),n=t!==s;n&&t!==null&&t.unsubscribe(this),(n||e)&&s.subscribe(this)}updateViews(e){const t=this.childContext,s=this.views,n=this.bindView,o=this.items,r=this.template,a=this.options.recycle,c=[];let d=0,h=0;for(let p=0,g=e.length;p<g;++p){const $=e[p],C=$.removed;let D=0,X=$.index;const Ve=X+$.addedCount,oe=s.splice($.index,C.length),Ts=h=c.length+oe.length;for(;X<Ve;++X){const li=s[X],Ss=li?li.firstChild:this.location;let we;a&&h>0?(D<=Ts&&oe.length>0?(we=oe[D],D++):(we=c[d],d++),h--):we=r.create(),s.splice(X,0,we),n(we,o,X,t),we.insertBefore(Ss)}oe[D]&&c.push(...oe.slice(D))}for(let p=d,g=c.length;p<g;++p)c[p].dispose();if(this.options.positioning)for(let p=0,g=s.length;p<g;++p){const $=s[p].context;$.length=g,$.index=p}}refreshAllViews(e=!1){const t=this.items,s=this.childContext,n=this.template,o=this.location,r=this.bindView;let a=t.length,c=this.views,d=c.length;if((a===0||e||!this.options.recycle)&&(Wi.disposeContiguousBatch(c),d=0),d===0){this.views=c=new Array(a);for(let h=0;h<a;++h){const p=n.create();r(p,t,h,s),c[h]=p,p.insertBefore(o)}}else{let h=0;for(;h<a;++h)if(h<d){const g=c[h];r(g,t,h,s)}else{const g=n.create();r(g,t,h,s),c.push(g),g.insertBefore(o)}const p=c.splice(h,d-h);for(h=0,a=p.length;h<a;++h)p[h].dispose()}}unbindAllViews(){const e=this.views;for(let t=0,s=e.length;t<s;++t)e[t].unbind()}}class ts extends mt{constructor(e,t,s){super(),this.itemsBinding=e,this.templateBinding=t,this.options=s,this.createPlaceholder=y.createBlockPlaceholder,an(),this.isItemsBindingVolatile=v.isVolatileBinding(e),this.isTemplateBindingVolatile=v.isVolatileBinding(t)}createBehavior(e){return new hn(e,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function Zt(i){return i?function(e,t,s){return e.nodeType===1&&e.matches(i)}:function(e,t,s){return e.nodeType===1}}class is{constructor(e,t){this.target=e,this.options=t,this.source=null}bind(e){const t=this.options.property;this.shouldUpdate=v.getAccessors(e).some(s=>s.name===t),this.source=e,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(ge),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let e=this.getNodes();return this.options.filter!==void 0&&(e=e.filter(this.options.filter)),e}updateTarget(e){this.source[this.options.property]=e}}class un extends is{constructor(e,t){super(e,t)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function W(i){return typeof i=="string"&&(i={property:i}),new Wt("fast-slotted",un,i)}class pn extends is{constructor(e,t){super(e,t),this.observer=null,t.childList=!0}observe(){this.observer===null&&(this.observer=new MutationObserver(this.handleEvent.bind(this))),this.observer.observe(this.target,this.options)}disconnect(){this.observer.disconnect()}getNodes(){return"subtree"in this.options?Array.from(this.target.querySelectorAll(this.options.selector)):Array.from(this.target.childNodes)}}function ss(i){return typeof i=="string"&&(i={property:i}),new Wt("fast-children",pn,i)}class De{handleStartContentChange(){this.startContainer.classList.toggle("start",this.start.assignedNodes().length>0)}handleEndContentChange(){this.endContainer.classList.toggle("end",this.end.assignedNodes().length>0)}}const Ee=(i,e)=>w`
    <span
        part="end"
        ${M("endContainer")}
        class=${t=>e.end?"end":void 0}
    >
        <slot name="end" ${M("end")} @slotchange="${t=>t.handleEndContentChange()}">
            ${e.end||""}
        </slot>
    </span>
`,Be=(i,e)=>w`
    <span
        part="start"
        ${M("startContainer")}
        class="${t=>e.start?"start":void 0}"
    >
        <slot
            name="start"
            ${M("start")}
            @slotchange="${t=>t.handleStartContentChange()}"
        >
            ${e.start||""}
        </slot>
    </span>
`;w`
    <span part="end" ${M("endContainer")}>
        <slot
            name="end"
            ${M("end")}
            @slotchange="${i=>i.handleEndContentChange()}"
        ></slot>
    </span>
`;w`
    <span part="start" ${M("startContainer")}>
        <slot
            name="start"
            ${M("start")}
            @slotchange="${i=>i.handleStartContentChange()}"
        ></slot>
    </span>
`;/*! *****************************************************************************
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
***************************************************************************** */function l(i,e,t,s){var n=arguments.length,o=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,e,t,s);else for(var a=i.length-1;a>=0;a--)(r=i[a])&&(o=(n<3?r(o):n>3?r(e,t,o):r(e,t))||o);return n>3&&o&&Object.defineProperty(e,t,o),o}const Dt=new Map;"metadata"in Reflect||(Reflect.metadata=function(i,e){return function(t){Reflect.defineMetadata(i,e,t)}},Reflect.defineMetadata=function(i,e,t){let s=Dt.get(t);s===void 0&&Dt.set(t,s=new Map),s.set(i,e)},Reflect.getOwnMetadata=function(i,e){const t=Dt.get(e);if(t!==void 0)return t.get(i)});class fn{constructor(e,t){this.container=e,this.key=t}instance(e){return this.registerResolver(0,e)}singleton(e){return this.registerResolver(1,e)}transient(e){return this.registerResolver(2,e)}callback(e){return this.registerResolver(3,e)}cachedCallback(e){return this.registerResolver(3,os(e))}aliasTo(e){return this.registerResolver(5,e)}registerResolver(e,t){const{container:s,key:n}=this;return this.container=this.key=void 0,s.registerResolver(n,new G(n,e,t))}}function Me(i){const e=i.slice(),t=Object.keys(i),s=t.length;let n;for(let o=0;o<s;++o)n=t[o],rs(n)||(e[n]=i[n]);return e}const bn=Object.freeze({none(i){throw Error(`${i.toString()} not registered, did you forget to add @singleton()?`)},singleton(i){return new G(i,1,i)},transient(i){return new G(i,2,i)}}),Et=Object.freeze({default:Object.freeze({parentLocator:()=>null,responsibleForOwnerRequests:!1,defaultResolver:bn.singleton})}),mi=new Map;function vi(i){return e=>Reflect.getOwnMetadata(i,e)}let yi=null;const S=Object.freeze({createContainer(i){return new Ge(null,Object.assign({},Et.default,i))},findResponsibleContainer(i){const e=i.$$container$$;return e&&e.responsibleForOwnerRequests?e:S.findParentContainer(i)},findParentContainer(i){const e=new CustomEvent(ns,{bubbles:!0,composed:!0,cancelable:!0,detail:{container:void 0}});return i.dispatchEvent(e),e.detail.container||S.getOrCreateDOMContainer()},getOrCreateDOMContainer(i,e){return i?i.$$container$$||new Ge(i,Object.assign({},Et.default,e,{parentLocator:S.findParentContainer})):yi||(yi=new Ge(null,Object.assign({},Et.default,e,{parentLocator:()=>null})))},getDesignParamtypes:vi("design:paramtypes"),getAnnotationParamtypes:vi("di:paramtypes"),getOrCreateAnnotationParamTypes(i){let e=this.getAnnotationParamtypes(i);return e===void 0&&Reflect.defineMetadata("di:paramtypes",e=[],i),e},getDependencies(i){let e=mi.get(i);if(e===void 0){const t=i.inject;if(t===void 0){const s=S.getDesignParamtypes(i),n=S.getAnnotationParamtypes(i);if(s===void 0)if(n===void 0){const o=Object.getPrototypeOf(i);typeof o=="function"&&o!==Function.prototype?e=Me(S.getDependencies(o)):e=[]}else e=Me(n);else if(n===void 0)e=Me(s);else{e=Me(s);let o=n.length,r;for(let d=0;d<o;++d)r=n[d],r!==void 0&&(e[d]=r);const a=Object.keys(n);o=a.length;let c;for(let d=0;d<o;++d)c=a[d],rs(c)||(e[c]=n[c])}}else e=Me(t);mi.set(i,e)}return e},defineProperty(i,e,t,s=!1){const n=`$di_${e}`;Reflect.defineProperty(i,e,{get:function(){let o=this[n];if(o===void 0&&(o=(this instanceof HTMLElement?S.findResponsibleContainer(this):S.getOrCreateDOMContainer()).get(t),this[n]=o,s&&this instanceof yt)){const a=this.$fastController,c=()=>{const h=S.findResponsibleContainer(this).get(t),p=this[n];h!==p&&(this[n]=o,a.notify(e))};a.subscribe({handleChange:c},"isConnected")}return o}})},createInterface(i,e){const t=typeof i=="function"?i:e,s=typeof i=="string"?i:i&&"friendlyName"in i&&i.friendlyName||Ci,n=typeof i=="string"?!1:i&&"respectConnection"in i&&i.respectConnection||!1,o=function(r,a,c){if(r==null||new.target!==void 0)throw new Error(`No registration for interface: '${o.friendlyName}'`);if(a)S.defineProperty(r,a,o,n);else{const d=S.getOrCreateAnnotationParamTypes(r);d[c]=o}};return o.$isInterface=!0,o.friendlyName=s??"(anonymous)",t!=null&&(o.register=function(r,a){return t(new fn(r,a??o))}),o.toString=function(){return`InterfaceSymbol<${o.friendlyName}>`},o},inject(...i){return function(e,t,s){if(typeof s=="number"){const n=S.getOrCreateAnnotationParamTypes(e),o=i[0];o!==void 0&&(n[s]=o)}else if(t)S.defineProperty(e,t,i[0]);else{const n=s?S.getOrCreateAnnotationParamTypes(s.value):S.getOrCreateAnnotationParamTypes(e);let o;for(let r=0;r<i.length;++r)o=i[r],o!==void 0&&(n[r]=o)}}},transient(i){return i.register=function(t){return Ye.transient(i,i).register(t)},i.registerInRequestor=!1,i},singleton(i,e=mn){return i.register=function(s){return Ye.singleton(i,i).register(s)},i.registerInRequestor=e.scoped,i}}),gn=S.createInterface("Container");S.inject;const mn={scoped:!1};class G{constructor(e,t,s){this.key=e,this.strategy=t,this.state=s,this.resolving=!1}get $isResolver(){return!0}register(e){return e.registerResolver(this.key,this)}resolve(e,t){switch(this.strategy){case 0:return this.state;case 1:{if(this.resolving)throw new Error(`Cyclic dependency found: ${this.state.name}`);return this.resolving=!0,this.state=e.getFactory(this.state).construct(t),this.strategy=0,this.resolving=!1,this.state}case 2:{const s=e.getFactory(this.state);if(s===null)throw new Error(`Resolver for ${String(this.key)} returned a null factory`);return s.construct(t)}case 3:return this.state(e,t,this);case 4:return this.state[0].resolve(e,t);case 5:return t.get(this.state);default:throw new Error(`Invalid resolver strategy specified: ${this.strategy}.`)}}getFactory(e){var t,s,n;switch(this.strategy){case 1:case 2:return e.getFactory(this.state);case 5:return(n=(s=(t=e.getResolver(this.state))===null||t===void 0?void 0:t.getFactory)===null||s===void 0?void 0:s.call(t,e))!==null&&n!==void 0?n:null;default:return null}}}function xi(i){return this.get(i)}function vn(i,e){return e(i)}class yn{constructor(e,t){this.Type=e,this.dependencies=t,this.transformers=null}construct(e,t){let s;return t===void 0?s=new this.Type(...this.dependencies.map(xi,e)):s=new this.Type(...this.dependencies.map(xi,e),...t),this.transformers==null?s:this.transformers.reduce(vn,s)}registerTransformer(e){(this.transformers||(this.transformers=[])).push(e)}}const xn={$isResolver:!0,resolve(i,e){return e}};function ct(i){return typeof i.register=="function"}function wn(i){return ct(i)&&typeof i.registerInRequestor=="boolean"}function wi(i){return wn(i)&&i.registerInRequestor}function $n(i){return i.prototype!==void 0}const Cn=new Set(["Array","ArrayBuffer","Boolean","DataView","Date","Error","EvalError","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Number","Object","Promise","RangeError","ReferenceError","RegExp","Set","SharedArrayBuffer","String","SyntaxError","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","URIError","WeakMap","WeakSet"]),ns="__DI_LOCATE_PARENT__",Bt=new Map;class Ge{constructor(e,t){this.owner=e,this.config=t,this._parent=void 0,this.registerDepth=0,this.context=null,e!==null&&(e.$$container$$=this),this.resolvers=new Map,this.resolvers.set(gn,xn),e instanceof Node&&e.addEventListener(ns,s=>{s.composedPath()[0]!==this.owner&&(s.detail.container=this,s.stopImmediatePropagation())})}get parent(){return this._parent===void 0&&(this._parent=this.config.parentLocator(this.owner)),this._parent}get depth(){return this.parent===null?0:this.parent.depth+1}get responsibleForOwnerRequests(){return this.config.responsibleForOwnerRequests}registerWithContext(e,...t){return this.context=e,this.register(...t),this.context=null,this}register(...e){if(++this.registerDepth===100)throw new Error("Unable to autoregister dependency");let t,s,n,o,r;const a=this.context;for(let c=0,d=e.length;c<d;++c)if(t=e[c],!!ki(t))if(ct(t))t.register(this,a);else if($n(t))Ye.singleton(t,t).register(this);else for(s=Object.keys(t),o=0,r=s.length;o<r;++o)n=t[s[o]],ki(n)&&(ct(n)?n.register(this,a):this.register(n));return--this.registerDepth,this}registerResolver(e,t){st(e);const s=this.resolvers,n=s.get(e);return n==null?s.set(e,t):n instanceof G&&n.strategy===4?n.state.push(t):s.set(e,new G(e,4,[n,t])),t}registerTransformer(e,t){const s=this.getResolver(e);if(s==null)return!1;if(s.getFactory){const n=s.getFactory(this);return n==null?!1:(n.registerTransformer(t),!0)}return!1}getResolver(e,t=!0){if(st(e),e.resolve!==void 0)return e;let s=this,n;for(;s!=null;)if(n=s.resolvers.get(e),n==null){if(s.parent==null){const o=wi(e)?this:s;return t?this.jitRegister(e,o):null}s=s.parent}else return n;return null}has(e,t=!1){return this.resolvers.has(e)?!0:t&&this.parent!=null?this.parent.has(e,!0):!1}get(e){if(st(e),e.$isResolver)return e.resolve(this,this);let t=this,s;for(;t!=null;)if(s=t.resolvers.get(e),s==null){if(t.parent==null){const n=wi(e)?this:t;return s=this.jitRegister(e,n),s.resolve(t,this)}t=t.parent}else return s.resolve(t,this);throw new Error(`Unable to resolve key: ${e}`)}getAll(e,t=!1){st(e);const s=this;let n=s,o;if(t){let r=ge;for(;n!=null;)o=n.resolvers.get(e),o!=null&&(r=r.concat($i(o,n,s))),n=n.parent;return r}else for(;n!=null;)if(o=n.resolvers.get(e),o==null){if(n=n.parent,n==null)return ge}else return $i(o,n,s);return ge}getFactory(e){let t=Bt.get(e);if(t===void 0){if(kn(e))throw new Error(`${e.name} is a native function and therefore cannot be safely constructed by DI. If this is intentional, please use a callback or cachedCallback resolver.`);Bt.set(e,t=new yn(e,S.getDependencies(e)))}return t}registerFactory(e,t){Bt.set(e,t)}createChild(e){return new Ge(null,Object.assign({},this.config,e,{parentLocator:()=>this}))}jitRegister(e,t){if(typeof e!="function")throw new Error(`Attempted to jitRegister something that is not a constructor: '${e}'. Did you forget to register this dependency?`);if(Cn.has(e.name))throw new Error(`Attempted to jitRegister an intrinsic type: ${e.name}. Did you forget to add @inject(Key)`);if(ct(e)){const s=e.register(t);if(!(s instanceof Object)||s.resolve==null){const n=t.resolvers.get(e);if(n!=null)return n;throw new Error("A valid resolver was not returned from the static register method")}return s}else{if(e.$isInterface)throw new Error(`Attempted to jitRegister an interface: ${e.friendlyName}`);{const s=this.config.defaultResolver(e,t);return t.resolvers.set(e,s),s}}}}const Pt=new WeakMap;function os(i){return function(e,t,s){if(Pt.has(s))return Pt.get(s);const n=i(e,t,s);return Pt.set(s,n),n}}const Ye=Object.freeze({instance(i,e){return new G(i,0,e)},singleton(i,e){return new G(i,1,e)},transient(i,e){return new G(i,2,e)},callback(i,e){return new G(i,3,e)},cachedCallback(i,e){return new G(i,3,os(e))},aliasTo(i,e){return new G(e,5,i)}});function st(i){if(i==null)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}function $i(i,e,t){if(i instanceof G&&i.strategy===4){const s=i.state;let n=s.length;const o=new Array(n);for(;n--;)o[n]=s[n].resolve(e,t);return o}return[i.resolve(e,t)]}const Ci="(anonymous)";function ki(i){return typeof i=="object"&&i!==null||typeof i=="function"}const kn=function(){const i=new WeakMap;let e=!1,t="",s=0;return function(n){return e=i.get(n),e===void 0&&(t=n.toString(),s=t.length,e=s>=29&&s<=100&&t.charCodeAt(s-1)===125&&t.charCodeAt(s-2)<=32&&t.charCodeAt(s-3)===93&&t.charCodeAt(s-4)===101&&t.charCodeAt(s-5)===100&&t.charCodeAt(s-6)===111&&t.charCodeAt(s-7)===99&&t.charCodeAt(s-8)===32&&t.charCodeAt(s-9)===101&&t.charCodeAt(s-10)===118&&t.charCodeAt(s-11)===105&&t.charCodeAt(s-12)===116&&t.charCodeAt(s-13)===97&&t.charCodeAt(s-14)===110&&t.charCodeAt(s-15)===88,i.set(n,e)),e}}(),nt={};function rs(i){switch(typeof i){case"number":return i>=0&&(i|0)===i;case"string":{const e=nt[i];if(e!==void 0)return e;const t=i.length;if(t===0)return nt[i]=!1;let s=0;for(let n=0;n<t;++n)if(s=i.charCodeAt(n),n===0&&s===48&&t>1||s<48||s>57)return nt[i]=!1;return nt[i]=!0}default:return!1}}function Ii(i){return`${i.toLowerCase()}:presentation`}const ot=new Map,as=Object.freeze({define(i,e,t){const s=Ii(i);ot.get(s)===void 0?ot.set(s,e):ot.set(s,!1),t.register(Ye.instance(s,e))},forTag(i,e){const t=Ii(i),s=ot.get(t);return s===!1?S.findResponsibleContainer(e).get(t):s||null}});class In{constructor(e,t){this.template=e||null,this.styles=t===void 0?null:Array.isArray(t)?_.create(t):t instanceof _?t:_.create([t])}applyTo(e){const t=e.$fastController;t.template===null&&(t.template=this.template),t.styles===null&&(t.styles=this.styles)}}class I extends yt{constructor(){super(...arguments),this._presentation=void 0}get $presentation(){return this._presentation===void 0&&(this._presentation=as.forTag(this.tagName,this)),this._presentation}templateChanged(){this.template!==void 0&&(this.$fastController.template=this.template)}stylesChanged(){this.styles!==void 0&&(this.$fastController.styles=this.styles)}connectedCallback(){this.$presentation!==null&&this.$presentation.applyTo(this),super.connectedCallback()}static compose(e){return(t={})=>new Tn(this===I?class extends I{}:this,e,t)}}l([b],I.prototype,"template",void 0);l([b],I.prototype,"styles",void 0);function Ne(i,e,t){return typeof i=="function"?i(e,t):i}class Tn{constructor(e,t,s){this.type=e,this.elementDefinition=t,this.overrideDefinition=s,this.definition=Object.assign(Object.assign({},this.elementDefinition),this.overrideDefinition)}register(e,t){const s=this.definition,n=this.overrideDefinition,r=`${s.prefix||t.elementPrefix}-${s.baseName}`;t.tryDefineElement({name:r,type:this.type,baseClass:this.elementDefinition.baseClass,callback:a=>{const c=new In(Ne(s.template,a,s),Ne(s.styles,a,s));a.definePresentation(c);let d=Ne(s.shadowOptions,a,s);a.shadowRootMode&&(d?n.shadowOptions||(d.mode=a.shadowRootMode):d!==null&&(d={mode:a.shadowRootMode})),a.defineElement({elementOptions:Ne(s.elementOptions,a,s),shadowOptions:d,attributes:Ne(s.attributes,a,s)})}})}}function q(i,...e){const t=pt.locate(i);e.forEach(s=>{Object.getOwnPropertyNames(s.prototype).forEach(o=>{o!=="constructor"&&Object.defineProperty(i.prototype,o,Object.getOwnPropertyDescriptor(s.prototype,o))}),pt.locate(s).forEach(o=>t.push(o))})}const Kt={horizontal:"horizontal",vertical:"vertical"};function Sn(i,e){let t=i.length;for(;t--;)if(e(i[t],t,i))return t;return-1}function On(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}function An(...i){return i.every(e=>e instanceof HTMLElement)}function Rn(){const i=document.querySelector('meta[property="csp-nonce"]');return i?i.getAttribute("content"):null}let pe;function Dn(){if(typeof pe=="boolean")return pe;if(!On())return pe=!1,pe;const i=document.createElement("style"),e=Rn();e!==null&&i.setAttribute("nonce",e),document.head.appendChild(i);try{i.sheet.insertRule("foo:focus-visible {color:inherit}",0),pe=!0}catch{pe=!1}finally{document.head.removeChild(i)}return pe}const Ti="focus",Si="focusin",Oe="focusout",Ae="keydown";var Oi;(function(i){i[i.alt=18]="alt",i[i.arrowDown=40]="arrowDown",i[i.arrowLeft=37]="arrowLeft",i[i.arrowRight=39]="arrowRight",i[i.arrowUp=38]="arrowUp",i[i.back=8]="back",i[i.backSlash=220]="backSlash",i[i.break=19]="break",i[i.capsLock=20]="capsLock",i[i.closeBracket=221]="closeBracket",i[i.colon=186]="colon",i[i.colon2=59]="colon2",i[i.comma=188]="comma",i[i.ctrl=17]="ctrl",i[i.delete=46]="delete",i[i.end=35]="end",i[i.enter=13]="enter",i[i.equals=187]="equals",i[i.equals2=61]="equals2",i[i.equals3=107]="equals3",i[i.escape=27]="escape",i[i.forwardSlash=191]="forwardSlash",i[i.function1=112]="function1",i[i.function10=121]="function10",i[i.function11=122]="function11",i[i.function12=123]="function12",i[i.function2=113]="function2",i[i.function3=114]="function3",i[i.function4=115]="function4",i[i.function5=116]="function5",i[i.function6=117]="function6",i[i.function7=118]="function7",i[i.function8=119]="function8",i[i.function9=120]="function9",i[i.home=36]="home",i[i.insert=45]="insert",i[i.menu=93]="menu",i[i.minus=189]="minus",i[i.minus2=109]="minus2",i[i.numLock=144]="numLock",i[i.numPad0=96]="numPad0",i[i.numPad1=97]="numPad1",i[i.numPad2=98]="numPad2",i[i.numPad3=99]="numPad3",i[i.numPad4=100]="numPad4",i[i.numPad5=101]="numPad5",i[i.numPad6=102]="numPad6",i[i.numPad7=103]="numPad7",i[i.numPad8=104]="numPad8",i[i.numPad9=105]="numPad9",i[i.numPadDivide=111]="numPadDivide",i[i.numPadDot=110]="numPadDot",i[i.numPadMinus=109]="numPadMinus",i[i.numPadMultiply=106]="numPadMultiply",i[i.numPadPlus=107]="numPadPlus",i[i.openBracket=219]="openBracket",i[i.pageDown=34]="pageDown",i[i.pageUp=33]="pageUp",i[i.period=190]="period",i[i.print=44]="print",i[i.quote=222]="quote",i[i.scrollLock=145]="scrollLock",i[i.shift=16]="shift",i[i.space=32]="space",i[i.tab=9]="tab",i[i.tilde=192]="tilde",i[i.windowsLeft=91]="windowsLeft",i[i.windowsOpera=219]="windowsOpera",i[i.windowsRight=92]="windowsRight"})(Oi||(Oi={}));const me="ArrowDown",Je="ArrowLeft",Ze="ArrowRight",ve="ArrowUp",Ke="Enter",xt="Escape",Pe="Home",Fe="End",En="F2",Bn="PageDown",Pn="PageUp",et=" ",ei="Tab",Fn={ArrowDown:me,ArrowLeft:Je,ArrowRight:Ze,ArrowUp:ve};var Re;(function(i){i.ltr="ltr",i.rtl="rtl"})(Re||(Re={}));function Ln(i,e,t){return t<i?e:t>e?i:t}function rt(i,e,t=0){return[e,t]=[e,t].sort((s,n)=>s-n),e<=i&&i<t}let Hn=0;function gt(i=""){return`${i}${Hn++}`}const Vn=(i,e)=>w`
    <a
        class="control"
        part="control"
        download="${t=>t.download}"
        href="${t=>t.href}"
        hreflang="${t=>t.hreflang}"
        ping="${t=>t.ping}"
        referrerpolicy="${t=>t.referrerpolicy}"
        rel="${t=>t.rel}"
        target="${t=>t.target}"
        type="${t=>t.type}"
        aria-atomic="${t=>t.ariaAtomic}"
        aria-busy="${t=>t.ariaBusy}"
        aria-controls="${t=>t.ariaControls}"
        aria-current="${t=>t.ariaCurrent}"
        aria-describedby="${t=>t.ariaDescribedby}"
        aria-details="${t=>t.ariaDetails}"
        aria-disabled="${t=>t.ariaDisabled}"
        aria-errormessage="${t=>t.ariaErrormessage}"
        aria-expanded="${t=>t.ariaExpanded}"
        aria-flowto="${t=>t.ariaFlowto}"
        aria-haspopup="${t=>t.ariaHaspopup}"
        aria-hidden="${t=>t.ariaHidden}"
        aria-invalid="${t=>t.ariaInvalid}"
        aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
        aria-label="${t=>t.ariaLabel}"
        aria-labelledby="${t=>t.ariaLabelledby}"
        aria-live="${t=>t.ariaLive}"
        aria-owns="${t=>t.ariaOwns}"
        aria-relevant="${t=>t.ariaRelevant}"
        aria-roledescription="${t=>t.ariaRoledescription}"
        ${M("control")}
    >
        ${Be(i,e)}
        <span class="content" part="content">
            <slot ${W("defaultSlottedContent")}></slot>
        </span>
        ${Ee(i,e)}
    </a>
`;class T{}l([u({attribute:"aria-atomic"})],T.prototype,"ariaAtomic",void 0);l([u({attribute:"aria-busy"})],T.prototype,"ariaBusy",void 0);l([u({attribute:"aria-controls"})],T.prototype,"ariaControls",void 0);l([u({attribute:"aria-current"})],T.prototype,"ariaCurrent",void 0);l([u({attribute:"aria-describedby"})],T.prototype,"ariaDescribedby",void 0);l([u({attribute:"aria-details"})],T.prototype,"ariaDetails",void 0);l([u({attribute:"aria-disabled"})],T.prototype,"ariaDisabled",void 0);l([u({attribute:"aria-errormessage"})],T.prototype,"ariaErrormessage",void 0);l([u({attribute:"aria-flowto"})],T.prototype,"ariaFlowto",void 0);l([u({attribute:"aria-haspopup"})],T.prototype,"ariaHaspopup",void 0);l([u({attribute:"aria-hidden"})],T.prototype,"ariaHidden",void 0);l([u({attribute:"aria-invalid"})],T.prototype,"ariaInvalid",void 0);l([u({attribute:"aria-keyshortcuts"})],T.prototype,"ariaKeyshortcuts",void 0);l([u({attribute:"aria-label"})],T.prototype,"ariaLabel",void 0);l([u({attribute:"aria-labelledby"})],T.prototype,"ariaLabelledby",void 0);l([u({attribute:"aria-live"})],T.prototype,"ariaLive",void 0);l([u({attribute:"aria-owns"})],T.prototype,"ariaOwns",void 0);l([u({attribute:"aria-relevant"})],T.prototype,"ariaRelevant",void 0);l([u({attribute:"aria-roledescription"})],T.prototype,"ariaRoledescription",void 0);class Z extends I{constructor(){super(...arguments),this.handleUnsupportedDelegatesFocus=()=>{var e;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((e=this.$fastController.definition.shadowOptions)===null||e===void 0)&&e.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}connectedCallback(){super.connectedCallback(),this.handleUnsupportedDelegatesFocus()}}l([u],Z.prototype,"download",void 0);l([u],Z.prototype,"href",void 0);l([u],Z.prototype,"hreflang",void 0);l([u],Z.prototype,"ping",void 0);l([u],Z.prototype,"referrerpolicy",void 0);l([u],Z.prototype,"rel",void 0);l([u],Z.prototype,"target",void 0);l([u],Z.prototype,"type",void 0);l([b],Z.prototype,"defaultSlottedContent",void 0);class ti{}l([u({attribute:"aria-expanded"})],ti.prototype,"ariaExpanded",void 0);q(ti,T);q(Z,De,ti);const Mn=i=>{const e=i.closest("[dir]");return e!==null&&e.dir==="rtl"?Re.rtl:Re.ltr},ls=(i,e)=>w`
    <template class="${t=>t.circular?"circular":""}">
        <div class="control" part="control" style="${t=>t.generateBadgeStyle()}">
            <slot></slot>
        </div>
    </template>
`;let tt=class extends I{constructor(){super(...arguments),this.generateBadgeStyle=()=>{if(!this.fill&&!this.color)return;const e=`background-color: var(--badge-fill-${this.fill});`,t=`color: var(--badge-color-${this.color});`;return this.fill&&!this.color?e:this.color&&!this.fill?t:`${t} ${e}`}}};l([u({attribute:"fill"})],tt.prototype,"fill",void 0);l([u({attribute:"color"})],tt.prototype,"color",void 0);l([u({mode:"boolean"})],tt.prototype,"circular",void 0);const Nn=(i,e)=>w`
    <button
        class="control"
        part="control"
        ?autofocus="${t=>t.autofocus}"
        ?disabled="${t=>t.disabled}"
        form="${t=>t.formId}"
        formaction="${t=>t.formaction}"
        formenctype="${t=>t.formenctype}"
        formmethod="${t=>t.formmethod}"
        formnovalidate="${t=>t.formnovalidate}"
        formtarget="${t=>t.formtarget}"
        name="${t=>t.name}"
        type="${t=>t.type}"
        value="${t=>t.value}"
        aria-atomic="${t=>t.ariaAtomic}"
        aria-busy="${t=>t.ariaBusy}"
        aria-controls="${t=>t.ariaControls}"
        aria-current="${t=>t.ariaCurrent}"
        aria-describedby="${t=>t.ariaDescribedby}"
        aria-details="${t=>t.ariaDetails}"
        aria-disabled="${t=>t.ariaDisabled}"
        aria-errormessage="${t=>t.ariaErrormessage}"
        aria-expanded="${t=>t.ariaExpanded}"
        aria-flowto="${t=>t.ariaFlowto}"
        aria-haspopup="${t=>t.ariaHaspopup}"
        aria-hidden="${t=>t.ariaHidden}"
        aria-invalid="${t=>t.ariaInvalid}"
        aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
        aria-label="${t=>t.ariaLabel}"
        aria-labelledby="${t=>t.ariaLabelledby}"
        aria-live="${t=>t.ariaLive}"
        aria-owns="${t=>t.ariaOwns}"
        aria-pressed="${t=>t.ariaPressed}"
        aria-relevant="${t=>t.ariaRelevant}"
        aria-roledescription="${t=>t.ariaRoledescription}"
        ${M("control")}
    >
        ${Be(i,e)}
        <span class="content" part="content">
            <slot ${W("defaultSlottedContent")}></slot>
        </span>
        ${Ee(i,e)}
    </button>
`,Ai="form-associated-proxy",Ri="ElementInternals",Di=Ri in window&&"setFormValue"in window[Ri].prototype,Ei=new WeakMap;function it(i){const e=class extends i{constructor(...t){super(...t),this.dirtyValue=!1,this.disabled=!1,this.proxyEventsToBlock=["change","click"],this.proxyInitialized=!1,this.required=!1,this.initialValue=this.initialValue||"",this.elementInternals||(this.formResetCallback=this.formResetCallback.bind(this))}static get formAssociated(){return Di}get validity(){return this.elementInternals?this.elementInternals.validity:this.proxy.validity}get form(){return this.elementInternals?this.elementInternals.form:this.proxy.form}get validationMessage(){return this.elementInternals?this.elementInternals.validationMessage:this.proxy.validationMessage}get willValidate(){return this.elementInternals?this.elementInternals.willValidate:this.proxy.willValidate}get labels(){if(this.elementInternals)return Object.freeze(Array.from(this.elementInternals.labels));if(this.proxy instanceof HTMLElement&&this.proxy.ownerDocument&&this.id){const t=this.proxy.labels,s=Array.from(this.proxy.getRootNode().querySelectorAll(`[for='${this.id}']`)),n=t?s.concat(Array.from(t)):s;return Object.freeze(n)}else return ge}valueChanged(t,s){this.dirtyValue=!0,this.proxy instanceof HTMLElement&&(this.proxy.value=this.value),this.currentValue=this.value,this.setFormValue(this.value),this.validate()}currentValueChanged(){this.value=this.currentValue}initialValueChanged(t,s){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}disabledChanged(t,s){this.proxy instanceof HTMLElement&&(this.proxy.disabled=this.disabled),y.queueUpdate(()=>this.classList.toggle("disabled",this.disabled))}nameChanged(t,s){this.proxy instanceof HTMLElement&&(this.proxy.name=this.name)}requiredChanged(t,s){this.proxy instanceof HTMLElement&&(this.proxy.required=this.required),y.queueUpdate(()=>this.classList.toggle("required",this.required)),this.validate()}get elementInternals(){if(!Di)return null;let t=Ei.get(this);return t||(t=this.attachInternals(),Ei.set(this,t)),t}connectedCallback(){super.connectedCallback(),this.addEventListener("keypress",this._keypressHandler),this.value||(this.value=this.initialValue,this.dirtyValue=!1),this.elementInternals||(this.attachProxy(),this.form&&this.form.addEventListener("reset",this.formResetCallback))}disconnectedCallback(){this.proxyEventsToBlock.forEach(t=>this.proxy.removeEventListener(t,this.stopPropagation)),!this.elementInternals&&this.form&&this.form.removeEventListener("reset",this.formResetCallback)}checkValidity(){return this.elementInternals?this.elementInternals.checkValidity():this.proxy.checkValidity()}reportValidity(){return this.elementInternals?this.elementInternals.reportValidity():this.proxy.reportValidity()}setValidity(t,s,n){this.elementInternals?this.elementInternals.setValidity(t,s,n):typeof s=="string"&&this.proxy.setCustomValidity(s)}formDisabledCallback(t){this.disabled=t}formResetCallback(){this.value=this.initialValue,this.dirtyValue=!1}attachProxy(){var t;this.proxyInitialized||(this.proxyInitialized=!0,this.proxy.style.display="none",this.proxyEventsToBlock.forEach(s=>this.proxy.addEventListener(s,this.stopPropagation)),this.proxy.disabled=this.disabled,this.proxy.required=this.required,typeof this.name=="string"&&(this.proxy.name=this.name),typeof this.value=="string"&&(this.proxy.value=this.value),this.proxy.setAttribute("slot",Ai),this.proxySlot=document.createElement("slot"),this.proxySlot.setAttribute("name",Ai)),(t=this.shadowRoot)===null||t===void 0||t.appendChild(this.proxySlot),this.appendChild(this.proxy)}detachProxy(){var t;this.removeChild(this.proxy),(t=this.shadowRoot)===null||t===void 0||t.removeChild(this.proxySlot)}validate(t){this.proxy instanceof HTMLElement&&this.setValidity(this.proxy.validity,this.proxy.validationMessage,t)}setFormValue(t,s){this.elementInternals&&this.elementInternals.setFormValue(t,s||t)}_keypressHandler(t){switch(t.key){case Ke:if(this.form instanceof HTMLFormElement){const s=this.form.querySelector("[type=submit]");s==null||s.click()}break}}stopPropagation(t){t.stopPropagation()}};return u({mode:"boolean"})(e.prototype,"disabled"),u({mode:"fromView",attribute:"value"})(e.prototype,"initialValue"),u({attribute:"current-value"})(e.prototype,"currentValue"),u(e.prototype,"name"),u({mode:"boolean"})(e.prototype,"required"),b(e.prototype,"value"),e}function cs(i){class e extends it(i){}class t extends e{constructor(...n){super(n),this.dirtyChecked=!1,this.checkedAttribute=!1,this.checked=!1,this.dirtyChecked=!1}checkedAttributeChanged(){this.defaultChecked=this.checkedAttribute}defaultCheckedChanged(){this.dirtyChecked||(this.checked=this.defaultChecked,this.dirtyChecked=!1)}checkedChanged(n,o){this.dirtyChecked||(this.dirtyChecked=!0),this.currentChecked=this.checked,this.updateForm(),this.proxy instanceof HTMLInputElement&&(this.proxy.checked=this.checked),n!==void 0&&this.$emit("change"),this.validate()}currentCheckedChanged(n,o){this.checked=this.currentChecked}updateForm(){const n=this.checked?this.value:null;this.setFormValue(n,n)}connectedCallback(){super.connectedCallback(),this.updateForm()}formResetCallback(){super.formResetCallback(),this.checked=!!this.checkedAttribute,this.dirtyChecked=!1}}return u({attribute:"checked",mode:"boolean"})(t.prototype,"checkedAttribute"),u({attribute:"current-checked",converter:Xi})(t.prototype,"currentChecked"),b(t.prototype,"defaultChecked"),b(t.prototype,"checked"),t}class zn extends I{}class _n extends it(zn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let K=class extends _n{constructor(){super(...arguments),this.handleClick=e=>{var t;this.disabled&&((t=this.defaultSlottedContent)===null||t===void 0?void 0:t.length)<=1&&e.stopPropagation()},this.handleSubmission=()=>{if(!this.form)return;const e=this.proxy.isConnected;e||this.attachProxy(),typeof this.form.requestSubmit=="function"?this.form.requestSubmit(this.proxy):this.proxy.click(),e||this.detachProxy()},this.handleFormReset=()=>{var e;(e=this.form)===null||e===void 0||e.reset()},this.handleUnsupportedDelegatesFocus=()=>{var e;window.ShadowRoot&&!window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus")&&(!((e=this.$fastController.definition.shadowOptions)===null||e===void 0)&&e.delegatesFocus)&&(this.focus=()=>{this.control.focus()})}}formactionChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formAction=this.formaction)}formenctypeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formEnctype=this.formenctype)}formmethodChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formMethod=this.formmethod)}formnovalidateChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formNoValidate=this.formnovalidate)}formtargetChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.formTarget=this.formtarget)}typeChanged(e,t){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type),t==="submit"&&this.addEventListener("click",this.handleSubmission),e==="submit"&&this.removeEventListener("click",this.handleSubmission),t==="reset"&&this.addEventListener("click",this.handleFormReset),e==="reset"&&this.removeEventListener("click",this.handleFormReset)}validate(){super.validate(this.control)}connectedCallback(){var e;super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.handleUnsupportedDelegatesFocus();const t=Array.from((e=this.control)===null||e===void 0?void 0:e.children);t&&t.forEach(s=>{s.addEventListener("click",this.handleClick)})}disconnectedCallback(){var e;super.disconnectedCallback();const t=Array.from((e=this.control)===null||e===void 0?void 0:e.children);t&&t.forEach(s=>{s.removeEventListener("click",this.handleClick)})}};l([u({mode:"boolean"})],K.prototype,"autofocus",void 0);l([u({attribute:"form"})],K.prototype,"formId",void 0);l([u],K.prototype,"formaction",void 0);l([u],K.prototype,"formenctype",void 0);l([u],K.prototype,"formmethod",void 0);l([u({mode:"boolean"})],K.prototype,"formnovalidate",void 0);l([u],K.prototype,"formtarget",void 0);l([u],K.prototype,"type",void 0);l([b],K.prototype,"defaultSlottedContent",void 0);class wt{}l([u({attribute:"aria-expanded"})],wt.prototype,"ariaExpanded",void 0);l([u({attribute:"aria-pressed"})],wt.prototype,"ariaPressed",void 0);q(wt,T);q(K,De,wt);const at={none:"none",default:"default",sticky:"sticky"},re={default:"default",columnHeader:"columnheader",rowHeader:"rowheader"},We={default:"default",header:"header",stickyHeader:"sticky-header"};let P=class extends I{constructor(){super(...arguments),this.rowType=We.default,this.rowData=null,this.columnDefinitions=null,this.isActiveRow=!1,this.cellsRepeatBehavior=null,this.cellsPlaceholder=null,this.focusColumnIndex=0,this.refocusOnLoad=!1,this.updateRowStyle=()=>{this.style.gridTemplateColumns=this.gridTemplateColumns}}gridTemplateColumnsChanged(){this.$fastController.isConnected&&this.updateRowStyle()}rowTypeChanged(){this.$fastController.isConnected&&this.updateItemTemplate()}rowDataChanged(){if(this.rowData!==null&&this.isActiveRow){this.refocusOnLoad=!0;return}}cellItemTemplateChanged(){this.updateItemTemplate()}headerCellItemTemplateChanged(){this.updateItemTemplate()}connectedCallback(){super.connectedCallback(),this.cellsRepeatBehavior===null&&(this.cellsPlaceholder=document.createComment(""),this.appendChild(this.cellsPlaceholder),this.updateItemTemplate(),this.cellsRepeatBehavior=new ts(e=>e.columnDefinitions,e=>e.activeCellItemTemplate,{positioning:!0}).createBehavior(this.cellsPlaceholder),this.$fastController.addBehaviors([this.cellsRepeatBehavior])),this.addEventListener("cell-focused",this.handleCellFocus),this.addEventListener(Oe,this.handleFocusout),this.addEventListener(Ae,this.handleKeydown),this.updateRowStyle(),this.refocusOnLoad&&(this.refocusOnLoad=!1,this.cellElements.length>this.focusColumnIndex&&this.cellElements[this.focusColumnIndex].focus())}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cell-focused",this.handleCellFocus),this.removeEventListener(Oe,this.handleFocusout),this.removeEventListener(Ae,this.handleKeydown)}handleFocusout(e){this.contains(e.target)||(this.isActiveRow=!1,this.focusColumnIndex=0)}handleCellFocus(e){this.isActiveRow=!0,this.focusColumnIndex=this.cellElements.indexOf(e.target),this.$emit("row-focused",this)}handleKeydown(e){if(e.defaultPrevented)return;let t=0;switch(e.key){case Je:t=Math.max(0,this.focusColumnIndex-1),this.cellElements[t].focus(),e.preventDefault();break;case Ze:t=Math.min(this.cellElements.length-1,this.focusColumnIndex+1),this.cellElements[t].focus(),e.preventDefault();break;case Pe:e.ctrlKey||(this.cellElements[0].focus(),e.preventDefault());break;case Fe:e.ctrlKey||(this.cellElements[this.cellElements.length-1].focus(),e.preventDefault());break}}updateItemTemplate(){this.activeCellItemTemplate=this.rowType===We.default&&this.cellItemTemplate!==void 0?this.cellItemTemplate:this.rowType===We.default&&this.cellItemTemplate===void 0?this.defaultCellItemTemplate:this.headerCellItemTemplate!==void 0?this.headerCellItemTemplate:this.defaultHeaderCellItemTemplate}};l([u({attribute:"grid-template-columns"})],P.prototype,"gridTemplateColumns",void 0);l([u({attribute:"row-type"})],P.prototype,"rowType",void 0);l([b],P.prototype,"rowData",void 0);l([b],P.prototype,"columnDefinitions",void 0);l([b],P.prototype,"cellItemTemplate",void 0);l([b],P.prototype,"headerCellItemTemplate",void 0);l([b],P.prototype,"rowIndex",void 0);l([b],P.prototype,"isActiveRow",void 0);l([b],P.prototype,"activeCellItemTemplate",void 0);l([b],P.prototype,"defaultCellItemTemplate",void 0);l([b],P.prototype,"defaultHeaderCellItemTemplate",void 0);l([b],P.prototype,"cellElements",void 0);function jn(i){const e=i.tagFor(P);return w`
    <${e}
        :rowData="${t=>t}"
        :cellItemTemplate="${(t,s)=>s.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(t,s)=>s.parent.headerCellItemTemplate}"
    ></${e}>
`}const qn=(i,e)=>{const t=jn(i),s=i.tagFor(P);return w`
        <template
            role="grid"
            tabindex="0"
            :rowElementTag="${()=>s}"
            :defaultRowItemTemplate="${t}"
            ${ss({property:"rowElements",filter:Zt("[role=row]")})}
        >
            <slot></slot>
        </template>
    `};let F=class jt extends I{constructor(){super(),this.noTabbing=!1,this.generateHeader=at.default,this.rowsData=[],this.columnDefinitions=null,this.focusRowIndex=0,this.focusColumnIndex=0,this.rowsPlaceholder=null,this.generatedHeader=null,this.isUpdatingFocus=!1,this.pendingFocusUpdate=!1,this.rowindexUpdateQueued=!1,this.columnDefinitionsStale=!0,this.generatedGridTemplateColumns="",this.focusOnCell=(e,t,s)=>{if(this.rowElements.length===0){this.focusRowIndex=0,this.focusColumnIndex=0;return}const n=Math.max(0,Math.min(this.rowElements.length-1,e)),r=this.rowElements[n].querySelectorAll('[role="cell"], [role="gridcell"], [role="columnheader"], [role="rowheader"]'),a=Math.max(0,Math.min(r.length-1,t)),c=r[a];s&&this.scrollHeight!==this.clientHeight&&(n<this.focusRowIndex&&this.scrollTop>0||n>this.focusRowIndex&&this.scrollTop<this.scrollHeight-this.clientHeight)&&c.scrollIntoView({block:"center",inline:"center"}),c.focus()},this.onChildListChange=(e,t)=>{e&&e.length&&(e.forEach(s=>{s.addedNodes.forEach(n=>{n.nodeType===1&&n.getAttribute("role")==="row"&&(n.columnDefinitions=this.columnDefinitions)})}),this.queueRowIndexUpdate())},this.queueRowIndexUpdate=()=>{this.rowindexUpdateQueued||(this.rowindexUpdateQueued=!0,y.queueUpdate(this.updateRowIndexes))},this.updateRowIndexes=()=>{let e=this.gridTemplateColumns;if(e===void 0){if(this.generatedGridTemplateColumns===""&&this.rowElements.length>0){const t=this.rowElements[0];this.generatedGridTemplateColumns=new Array(t.cellElements.length).fill("1fr").join(" ")}e=this.generatedGridTemplateColumns}this.rowElements.forEach((t,s)=>{const n=t;n.rowIndex=s,n.gridTemplateColumns=e,this.columnDefinitionsStale&&(n.columnDefinitions=this.columnDefinitions)}),this.rowindexUpdateQueued=!1,this.columnDefinitionsStale=!1}}static generateTemplateColumns(e){let t="";return e.forEach(s=>{t=`${t}${t===""?"":" "}1fr`}),t}noTabbingChanged(){this.$fastController.isConnected&&(this.noTabbing?this.setAttribute("tabIndex","-1"):this.setAttribute("tabIndex",this.contains(document.activeElement)||this===document.activeElement?"-1":"0"))}generateHeaderChanged(){this.$fastController.isConnected&&this.toggleGeneratedHeader()}gridTemplateColumnsChanged(){this.$fastController.isConnected&&this.updateRowIndexes()}rowsDataChanged(){this.columnDefinitions===null&&this.rowsData.length>0&&(this.columnDefinitions=jt.generateColumns(this.rowsData[0])),this.$fastController.isConnected&&this.toggleGeneratedHeader()}columnDefinitionsChanged(){if(this.columnDefinitions===null){this.generatedGridTemplateColumns="";return}this.generatedGridTemplateColumns=jt.generateTemplateColumns(this.columnDefinitions),this.$fastController.isConnected&&(this.columnDefinitionsStale=!0,this.queueRowIndexUpdate())}headerCellItemTemplateChanged(){this.$fastController.isConnected&&this.generatedHeader!==null&&(this.generatedHeader.headerCellItemTemplate=this.headerCellItemTemplate)}focusRowIndexChanged(){this.$fastController.isConnected&&this.queueFocusUpdate()}focusColumnIndexChanged(){this.$fastController.isConnected&&this.queueFocusUpdate()}connectedCallback(){super.connectedCallback(),this.rowItemTemplate===void 0&&(this.rowItemTemplate=this.defaultRowItemTemplate),this.rowsPlaceholder=document.createComment(""),this.appendChild(this.rowsPlaceholder),this.toggleGeneratedHeader(),this.rowsRepeatBehavior=new ts(e=>e.rowsData,e=>e.rowItemTemplate,{positioning:!0}).createBehavior(this.rowsPlaceholder),this.$fastController.addBehaviors([this.rowsRepeatBehavior]),this.addEventListener("row-focused",this.handleRowFocus),this.addEventListener(Ti,this.handleFocus),this.addEventListener(Ae,this.handleKeydown),this.addEventListener(Oe,this.handleFocusOut),this.observer=new MutationObserver(this.onChildListChange),this.observer.observe(this,{childList:!0}),this.noTabbing&&this.setAttribute("tabindex","-1"),y.queueUpdate(this.queueRowIndexUpdate)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("row-focused",this.handleRowFocus),this.removeEventListener(Ti,this.handleFocus),this.removeEventListener(Ae,this.handleKeydown),this.removeEventListener(Oe,this.handleFocusOut),this.observer.disconnect(),this.rowsPlaceholder=null,this.generatedHeader=null}handleRowFocus(e){this.isUpdatingFocus=!0;const t=e.target;this.focusRowIndex=this.rowElements.indexOf(t),this.focusColumnIndex=t.focusColumnIndex,this.setAttribute("tabIndex","-1"),this.isUpdatingFocus=!1}handleFocus(e){this.focusOnCell(this.focusRowIndex,this.focusColumnIndex,!0)}handleFocusOut(e){(e.relatedTarget===null||!this.contains(e.relatedTarget))&&this.setAttribute("tabIndex",this.noTabbing?"-1":"0")}handleKeydown(e){if(e.defaultPrevented)return;let t;const s=this.rowElements.length-1,n=this.offsetHeight+this.scrollTop,o=this.rowElements[s];switch(e.key){case ve:e.preventDefault(),this.focusOnCell(this.focusRowIndex-1,this.focusColumnIndex,!0);break;case me:e.preventDefault(),this.focusOnCell(this.focusRowIndex+1,this.focusColumnIndex,!0);break;case Pn:if(e.preventDefault(),this.rowElements.length===0){this.focusOnCell(0,0,!1);break}if(this.focusRowIndex===0){this.focusOnCell(0,this.focusColumnIndex,!1);return}for(t=this.focusRowIndex-1,t;t>=0;t--){const r=this.rowElements[t];if(r.offsetTop<this.scrollTop){this.scrollTop=r.offsetTop+r.clientHeight-this.clientHeight;break}}this.focusOnCell(t,this.focusColumnIndex,!1);break;case Bn:if(e.preventDefault(),this.rowElements.length===0){this.focusOnCell(0,0,!1);break}if(this.focusRowIndex>=s||o.offsetTop+o.offsetHeight<=n){this.focusOnCell(s,this.focusColumnIndex,!1);return}for(t=this.focusRowIndex+1,t;t<=s;t++){const r=this.rowElements[t];if(r.offsetTop+r.offsetHeight>n){let a=0;this.generateHeader===at.sticky&&this.generatedHeader!==null&&(a=this.generatedHeader.clientHeight),this.scrollTop=r.offsetTop-a;break}}this.focusOnCell(t,this.focusColumnIndex,!1);break;case Pe:e.ctrlKey&&(e.preventDefault(),this.focusOnCell(0,0,!0));break;case Fe:e.ctrlKey&&this.columnDefinitions!==null&&(e.preventDefault(),this.focusOnCell(this.rowElements.length-1,this.columnDefinitions.length-1,!0));break}}queueFocusUpdate(){this.isUpdatingFocus&&(this.contains(document.activeElement)||this===document.activeElement)||this.pendingFocusUpdate===!1&&(this.pendingFocusUpdate=!0,y.queueUpdate(()=>this.updateFocus()))}updateFocus(){this.pendingFocusUpdate=!1,this.focusOnCell(this.focusRowIndex,this.focusColumnIndex,!0)}toggleGeneratedHeader(){if(this.generatedHeader!==null&&(this.removeChild(this.generatedHeader),this.generatedHeader=null),this.generateHeader!==at.none&&this.rowsData.length>0){const e=document.createElement(this.rowElementTag);this.generatedHeader=e,this.generatedHeader.columnDefinitions=this.columnDefinitions,this.generatedHeader.gridTemplateColumns=this.gridTemplateColumns,this.generatedHeader.rowType=this.generateHeader===at.sticky?We.stickyHeader:We.header,(this.firstChild!==null||this.rowsPlaceholder!==null)&&this.insertBefore(e,this.firstChild!==null?this.firstChild:this.rowsPlaceholder);return}}};F.generateColumns=i=>Object.getOwnPropertyNames(i).map((e,t)=>({columnDataKey:e,gridColumn:`${t}`}));l([u({attribute:"no-tabbing",mode:"boolean"})],F.prototype,"noTabbing",void 0);l([u({attribute:"generate-header"})],F.prototype,"generateHeader",void 0);l([u({attribute:"grid-template-columns"})],F.prototype,"gridTemplateColumns",void 0);l([b],F.prototype,"rowsData",void 0);l([b],F.prototype,"columnDefinitions",void 0);l([b],F.prototype,"rowItemTemplate",void 0);l([b],F.prototype,"cellItemTemplate",void 0);l([b],F.prototype,"headerCellItemTemplate",void 0);l([b],F.prototype,"focusRowIndex",void 0);l([b],F.prototype,"focusColumnIndex",void 0);l([b],F.prototype,"defaultRowItemTemplate",void 0);l([b],F.prototype,"rowElementTag",void 0);l([b],F.prototype,"rowElements",void 0);const Un=w`
    <template>
        ${i=>i.rowData===null||i.columnDefinition===null||i.columnDefinition.columnDataKey===null?null:i.rowData[i.columnDefinition.columnDataKey]}
    </template>
`,Gn=w`
    <template>
        ${i=>i.columnDefinition===null?null:i.columnDefinition.title===void 0?i.columnDefinition.columnDataKey:i.columnDefinition.title}
    </template>
`;let de=class extends I{constructor(){super(...arguments),this.cellType=re.default,this.rowData=null,this.columnDefinition=null,this.isActiveCell=!1,this.customCellView=null,this.updateCellStyle=()=>{this.style.gridColumn=this.gridColumn}}cellTypeChanged(){this.$fastController.isConnected&&this.updateCellView()}gridColumnChanged(){this.$fastController.isConnected&&this.updateCellStyle()}columnDefinitionChanged(e,t){this.$fastController.isConnected&&this.updateCellView()}connectedCallback(){var e;super.connectedCallback(),this.addEventListener(Si,this.handleFocusin),this.addEventListener(Oe,this.handleFocusout),this.addEventListener(Ae,this.handleKeydown),this.style.gridColumn=`${((e=this.columnDefinition)===null||e===void 0?void 0:e.gridColumn)===void 0?0:this.columnDefinition.gridColumn}`,this.updateCellView(),this.updateCellStyle()}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(Si,this.handleFocusin),this.removeEventListener(Oe,this.handleFocusout),this.removeEventListener(Ae,this.handleKeydown),this.disconnectCellView()}handleFocusin(e){if(!this.isActiveCell){switch(this.isActiveCell=!0,this.cellType){case re.columnHeader:if(this.columnDefinition!==null&&this.columnDefinition.headerCellInternalFocusQueue!==!0&&typeof this.columnDefinition.headerCellFocusTargetCallback=="function"){const t=this.columnDefinition.headerCellFocusTargetCallback(this);t!==null&&t.focus()}break;default:if(this.columnDefinition!==null&&this.columnDefinition.cellInternalFocusQueue!==!0&&typeof this.columnDefinition.cellFocusTargetCallback=="function"){const t=this.columnDefinition.cellFocusTargetCallback(this);t!==null&&t.focus()}break}this.$emit("cell-focused",this)}}handleFocusout(e){this!==document.activeElement&&!this.contains(document.activeElement)&&(this.isActiveCell=!1)}handleKeydown(e){if(!(e.defaultPrevented||this.columnDefinition===null||this.cellType===re.default&&this.columnDefinition.cellInternalFocusQueue!==!0||this.cellType===re.columnHeader&&this.columnDefinition.headerCellInternalFocusQueue!==!0))switch(e.key){case Ke:case En:if(this.contains(document.activeElement)&&document.activeElement!==this)return;switch(this.cellType){case re.columnHeader:if(this.columnDefinition.headerCellFocusTargetCallback!==void 0){const t=this.columnDefinition.headerCellFocusTargetCallback(this);t!==null&&t.focus(),e.preventDefault()}break;default:if(this.columnDefinition.cellFocusTargetCallback!==void 0){const t=this.columnDefinition.cellFocusTargetCallback(this);t!==null&&t.focus(),e.preventDefault()}break}break;case xt:this.contains(document.activeElement)&&document.activeElement!==this&&(this.focus(),e.preventDefault());break}}updateCellView(){if(this.disconnectCellView(),this.columnDefinition!==null)switch(this.cellType){case re.columnHeader:this.columnDefinition.headerCellTemplate!==void 0?this.customCellView=this.columnDefinition.headerCellTemplate.render(this,this):this.customCellView=Gn.render(this,this);break;case void 0:case re.rowHeader:case re.default:this.columnDefinition.cellTemplate!==void 0?this.customCellView=this.columnDefinition.cellTemplate.render(this,this):this.customCellView=Un.render(this,this);break}}disconnectCellView(){this.customCellView!==null&&(this.customCellView.dispose(),this.customCellView=null)}};l([u({attribute:"cell-type"})],de.prototype,"cellType",void 0);l([u({attribute:"grid-column"})],de.prototype,"gridColumn",void 0);l([b],de.prototype,"rowData",void 0);l([b],de.prototype,"columnDefinition",void 0);function Wn(i){const e=i.tagFor(de);return w`
    <${e}
        cell-type="${t=>t.isRowHeader?"rowheader":void 0}"
        grid-column="${(t,s)=>s.index+1}"
        :rowData="${(t,s)=>s.parent.rowData}"
        :columnDefinition="${t=>t}"
    ></${e}>
`}function Qn(i){const e=i.tagFor(de);return w`
    <${e}
        cell-type="columnheader"
        grid-column="${(t,s)=>s.index+1}"
        :columnDefinition="${t=>t}"
    ></${e}>
`}const Xn=(i,e)=>{const t=Wn(i),s=Qn(i);return w`
        <template
            role="row"
            class="${n=>n.rowType!=="default"?n.rowType:""}"
            :defaultCellItemTemplate="${t}"
            :defaultHeaderCellItemTemplate="${s}"
            ${ss({property:"cellElements",filter:Zt('[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]')})}
        >
            <slot ${W("slottedCellElements")}></slot>
        </template>
    `},Yn=(i,e)=>w`
        <template
            tabindex="-1"
            role="${t=>!t.cellType||t.cellType==="default"?"gridcell":t.cellType}"
            class="
            ${t=>t.cellType==="columnheader"?"column-header":t.cellType==="rowheader"?"row-header":""}
            "
        >
            <slot></slot>
        </template>
    `,Jn=(i,e)=>w`
    <template
        role="checkbox"
        aria-checked="${t=>t.checked}"
        aria-required="${t=>t.required}"
        aria-disabled="${t=>t.disabled}"
        aria-readonly="${t=>t.readOnly}"
        tabindex="${t=>t.disabled?null:0}"
        @keypress="${(t,s)=>t.keypressHandler(s.event)}"
        @click="${(t,s)=>t.clickHandler(s.event)}"
        class="${t=>t.readOnly?"readonly":""} ${t=>t.checked?"checked":""} ${t=>t.indeterminate?"indeterminate":""}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${e.checkedIndicator||""}
            </slot>
            <slot name="indeterminate-indicator">
                ${e.indeterminateIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${t=>t.defaultSlottedNodes&&t.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${W("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Zn extends I{}class Kn extends cs(Zn){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let $t=class extends Kn{constructor(){super(),this.initialValue="on",this.indeterminate=!1,this.keypressHandler=e=>{if(!this.readOnly)switch(e.key){case et:this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked;break}},this.clickHandler=e=>{!this.disabled&&!this.readOnly&&(this.indeterminate&&(this.indeterminate=!1),this.checked=!this.checked)},this.proxy.setAttribute("type","checkbox")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}};l([u({attribute:"readonly",mode:"boolean"})],$t.prototype,"readOnly",void 0);l([b],$t.prototype,"defaultSlottedNodes",void 0);l([b],$t.prototype,"indeterminate",void 0);function ds(i){return An(i)&&(i.getAttribute("role")==="option"||i instanceof HTMLOptionElement)}class se extends I{constructor(e,t,s,n){super(),this.defaultSelected=!1,this.dirtySelected=!1,this.selected=this.defaultSelected,this.dirtyValue=!1,e&&(this.textContent=e),t&&(this.initialValue=t),s&&(this.defaultSelected=s),n&&(this.selected=n),this.proxy=new Option(`${this.textContent}`,this.initialValue,this.defaultSelected,this.selected),this.proxy.disabled=this.disabled}checkedChanged(e,t){if(typeof t=="boolean"){this.ariaChecked=t?"true":"false";return}this.ariaChecked=null}contentChanged(e,t){this.proxy instanceof HTMLOptionElement&&(this.proxy.textContent=this.textContent),this.$emit("contentchange",null,{bubbles:!0})}defaultSelectedChanged(){this.dirtySelected||(this.selected=this.defaultSelected,this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.defaultSelected))}disabledChanged(e,t){this.ariaDisabled=this.disabled?"true":"false",this.proxy instanceof HTMLOptionElement&&(this.proxy.disabled=this.disabled)}selectedAttributeChanged(){this.defaultSelected=this.selectedAttribute,this.proxy instanceof HTMLOptionElement&&(this.proxy.defaultSelected=this.defaultSelected)}selectedChanged(){this.ariaSelected=this.selected?"true":"false",this.dirtySelected||(this.dirtySelected=!0),this.proxy instanceof HTMLOptionElement&&(this.proxy.selected=this.selected)}initialValueChanged(e,t){this.dirtyValue||(this.value=this.initialValue,this.dirtyValue=!1)}get label(){var e;return(e=this.value)!==null&&e!==void 0?e:this.text}get text(){var e,t;return(t=(e=this.textContent)===null||e===void 0?void 0:e.replace(/\s+/g," ").trim())!==null&&t!==void 0?t:""}set value(e){const t=`${e??""}`;this._value=t,this.dirtyValue=!0,this.proxy instanceof HTMLOptionElement&&(this.proxy.value=t),v.notify(this,"value")}get value(){var e;return v.track(this,"value"),(e=this._value)!==null&&e!==void 0?e:this.text}get form(){return this.proxy?this.proxy.form:null}}l([b],se.prototype,"checked",void 0);l([b],se.prototype,"content",void 0);l([b],se.prototype,"defaultSelected",void 0);l([u({mode:"boolean"})],se.prototype,"disabled",void 0);l([u({attribute:"selected",mode:"boolean"})],se.prototype,"selectedAttribute",void 0);l([b],se.prototype,"selected",void 0);l([u({attribute:"value",mode:"fromView"})],se.prototype,"initialValue",void 0);class Le{}l([b],Le.prototype,"ariaChecked",void 0);l([b],Le.prototype,"ariaPosInSet",void 0);l([b],Le.prototype,"ariaSelected",void 0);l([b],Le.prototype,"ariaSetSize",void 0);q(Le,T);q(se,De,Le);class V extends I{constructor(){super(...arguments),this._options=[],this.selectedIndex=-1,this.selectedOptions=[],this.shouldSkipFocus=!1,this.typeaheadBuffer="",this.typeaheadExpired=!0,this.typeaheadTimeout=-1}get firstSelectedOption(){var e;return(e=this.selectedOptions[0])!==null&&e!==void 0?e:null}get hasSelectableOptions(){return this.options.length>0&&!this.options.every(e=>e.disabled)}get length(){var e,t;return(t=(e=this.options)===null||e===void 0?void 0:e.length)!==null&&t!==void 0?t:0}get options(){return v.track(this,"options"),this._options}set options(e){this._options=e,v.notify(this,"options")}get typeAheadExpired(){return this.typeaheadExpired}set typeAheadExpired(e){this.typeaheadExpired=e}clickHandler(e){const t=e.target.closest("option,[role=option]");if(t&&!t.disabled)return this.selectedIndex=this.options.indexOf(t),!0}focusAndScrollOptionIntoView(e=this.firstSelectedOption){this.contains(document.activeElement)&&e!==null&&(e.focus(),requestAnimationFrame(()=>{e.scrollIntoView({block:"nearest"})}))}focusinHandler(e){!this.shouldSkipFocus&&e.target===e.currentTarget&&(this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}getTypeaheadMatches(){const e=this.typeaheadBuffer.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&"),t=new RegExp(`^${e}`,"gi");return this.options.filter(s=>s.text.trim().match(t))}getSelectableIndex(e=this.selectedIndex,t){const s=e>t?-1:e<t?1:0,n=e+s;let o=null;switch(s){case-1:{o=this.options.reduceRight((r,a,c)=>!r&&!a.disabled&&c<n?a:r,o);break}case 1:{o=this.options.reduce((r,a,c)=>!r&&!a.disabled&&c>n?a:r,o);break}}return this.options.indexOf(o)}handleChange(e,t){switch(t){case"selected":{V.slottedOptionFilter(e)&&(this.selectedIndex=this.options.indexOf(e)),this.setSelectedOptions();break}}}handleTypeAhead(e){this.typeaheadTimeout&&window.clearTimeout(this.typeaheadTimeout),this.typeaheadTimeout=window.setTimeout(()=>this.typeaheadExpired=!0,V.TYPE_AHEAD_TIMEOUT_MS),!(e.length>1)&&(this.typeaheadBuffer=`${this.typeaheadExpired?"":this.typeaheadBuffer}${e}`)}keydownHandler(e){if(this.disabled)return!0;this.shouldSkipFocus=!1;const t=e.key;switch(t){case Pe:{e.shiftKey||(e.preventDefault(),this.selectFirstOption());break}case me:{e.shiftKey||(e.preventDefault(),this.selectNextOption());break}case ve:{e.shiftKey||(e.preventDefault(),this.selectPreviousOption());break}case Fe:{e.preventDefault(),this.selectLastOption();break}case ei:return this.focusAndScrollOptionIntoView(),!0;case Ke:case xt:return!0;case et:if(this.typeaheadExpired)return!0;default:return t.length===1&&this.handleTypeAhead(`${t}`),!0}}mousedownHandler(e){return this.shouldSkipFocus=!this.contains(document.activeElement),!0}multipleChanged(e,t){this.ariaMultiSelectable=t?"true":null}selectedIndexChanged(e,t){var s;if(!this.hasSelectableOptions){this.selectedIndex=-1;return}if(!((s=this.options[this.selectedIndex])===null||s===void 0)&&s.disabled&&typeof e=="number"){const n=this.getSelectableIndex(e,t),o=n>-1?n:e;this.selectedIndex=o,t===o&&this.selectedIndexChanged(t,o);return}this.setSelectedOptions()}selectedOptionsChanged(e,t){var s;const n=t.filter(V.slottedOptionFilter);(s=this.options)===null||s===void 0||s.forEach(o=>{const r=v.getNotifier(o);r.unsubscribe(this,"selected"),o.selected=n.includes(o),r.subscribe(this,"selected")})}selectFirstOption(){var e,t;this.disabled||(this.selectedIndex=(t=(e=this.options)===null||e===void 0?void 0:e.findIndex(s=>!s.disabled))!==null&&t!==void 0?t:-1)}selectLastOption(){this.disabled||(this.selectedIndex=Sn(this.options,e=>!e.disabled))}selectNextOption(){!this.disabled&&this.selectedIndex<this.options.length-1&&(this.selectedIndex+=1)}selectPreviousOption(){!this.disabled&&this.selectedIndex>0&&(this.selectedIndex=this.selectedIndex-1)}setDefaultSelectedOption(){var e,t;this.selectedIndex=(t=(e=this.options)===null||e===void 0?void 0:e.findIndex(s=>s.defaultSelected))!==null&&t!==void 0?t:-1}setSelectedOptions(){var e,t,s;!((e=this.options)===null||e===void 0)&&e.length&&(this.selectedOptions=[this.options[this.selectedIndex]],this.ariaActiveDescendant=(s=(t=this.firstSelectedOption)===null||t===void 0?void 0:t.id)!==null&&s!==void 0?s:"",this.focusAndScrollOptionIntoView())}slottedOptionsChanged(e,t){this.options=t.reduce((n,o)=>(ds(o)&&n.push(o),n),[]);const s=`${this.options.length}`;this.options.forEach((n,o)=>{n.id||(n.id=gt("option-")),n.ariaPosInSet=`${o+1}`,n.ariaSetSize=s}),this.$fastController.isConnected&&(this.setSelectedOptions(),this.setDefaultSelectedOption())}typeaheadBufferChanged(e,t){if(this.$fastController.isConnected){const s=this.getTypeaheadMatches();if(s.length){const n=this.options.indexOf(s[0]);n>-1&&(this.selectedIndex=n)}this.typeaheadExpired=!1}}}V.slottedOptionFilter=i=>ds(i)&&!i.hidden;V.TYPE_AHEAD_TIMEOUT_MS=1e3;l([u({mode:"boolean"})],V.prototype,"disabled",void 0);l([b],V.prototype,"selectedIndex",void 0);l([b],V.prototype,"selectedOptions",void 0);l([b],V.prototype,"slottedOptions",void 0);l([b],V.prototype,"typeaheadBuffer",void 0);class ye{}l([b],ye.prototype,"ariaActiveDescendant",void 0);l([b],ye.prototype,"ariaDisabled",void 0);l([b],ye.prototype,"ariaExpanded",void 0);l([b],ye.prototype,"ariaMultiSelectable",void 0);q(ye,T);q(V,ye);const Ft={above:"above",below:"below"};function qt(i){const e=i.parentElement;if(e)return e;{const t=i.getRootNode();if(t.host instanceof HTMLElement)return t.host}return null}function eo(i,e){let t=e;for(;t!==null;){if(t===i)return!0;t=qt(t)}return!1}const te=document.createElement("div");function to(i){return i instanceof yt}class ii{setProperty(e,t){y.queueUpdate(()=>this.target.setProperty(e,t))}removeProperty(e){y.queueUpdate(()=>this.target.removeProperty(e))}}class io extends ii{constructor(e){super();const t=new CSSStyleSheet;this.target=t.cssRules[t.insertRule(":host{}")].style,e.$fastController.addStyles(_.create([t]))}}class so extends ii{constructor(){super();const e=new CSSStyleSheet;this.target=e.cssRules[e.insertRule(":root{}")].style,document.adoptedStyleSheets=[...document.adoptedStyleSheets,e]}}class no extends ii{constructor(){super(),this.style=document.createElement("style"),document.head.appendChild(this.style);const{sheet:e}=this.style;if(e){const t=e.insertRule(":root{}",e.cssRules.length);this.target=e.cssRules[t].style}}}class hs{constructor(e){this.store=new Map,this.target=null;const t=e.$fastController;this.style=document.createElement("style"),t.addStyles(this.style),v.getNotifier(t).subscribe(this,"isConnected"),this.handleChange(t,"isConnected")}targetChanged(){if(this.target!==null)for(const[e,t]of this.store.entries())this.target.setProperty(e,t)}setProperty(e,t){this.store.set(e,t),y.queueUpdate(()=>{this.target!==null&&this.target.setProperty(e,t)})}removeProperty(e){this.store.delete(e),y.queueUpdate(()=>{this.target!==null&&this.target.removeProperty(e)})}handleChange(e,t){const{sheet:s}=this.style;if(s){const n=s.insertRule(":host{}",s.cssRules.length);this.target=s.cssRules[n].style}else this.target=null}}l([b],hs.prototype,"target",void 0);class oo{constructor(e){this.target=e.style}setProperty(e,t){y.queueUpdate(()=>this.target.setProperty(e,t))}removeProperty(e){y.queueUpdate(()=>this.target.removeProperty(e))}}class R{setProperty(e,t){R.properties[e]=t;for(const s of R.roots.values())Ce.getOrCreate(R.normalizeRoot(s)).setProperty(e,t)}removeProperty(e){delete R.properties[e];for(const t of R.roots.values())Ce.getOrCreate(R.normalizeRoot(t)).removeProperty(e)}static registerRoot(e){const{roots:t}=R;if(!t.has(e)){t.add(e);const s=Ce.getOrCreate(this.normalizeRoot(e));for(const n in R.properties)s.setProperty(n,R.properties[n])}}static unregisterRoot(e){const{roots:t}=R;if(t.has(e)){t.delete(e);const s=Ce.getOrCreate(R.normalizeRoot(e));for(const n in R.properties)s.removeProperty(n)}}static normalizeRoot(e){return e===te?document:e}}R.roots=new Set;R.properties={};const Lt=new WeakMap,ro=y.supportsAdoptedStyleSheets?io:hs,Ce=Object.freeze({getOrCreate(i){if(Lt.has(i))return Lt.get(i);let e;return i===te?e=new R:i instanceof Document?e=y.supportsAdoptedStyleSheets?new so:new no:to(i)?e=new ro(i):e=new oo(i),Lt.set(i,e),e}});class H extends Ji{constructor(e){super(),this.subscribers=new WeakMap,this._appliedTo=new Set,this.name=e.name,e.cssCustomPropertyName!==null&&(this.cssCustomProperty=`--${e.cssCustomPropertyName}`,this.cssVar=`var(${this.cssCustomProperty})`),this.id=H.uniqueId(),H.tokensById.set(this.id,this)}get appliedTo(){return[...this._appliedTo]}static from(e){return new H({name:typeof e=="string"?e:e.name,cssCustomPropertyName:typeof e=="string"?e:e.cssCustomPropertyName===void 0?e.name:e.cssCustomPropertyName})}static isCSSDesignToken(e){return typeof e.cssCustomProperty=="string"}static isDerivedDesignTokenValue(e){return typeof e=="function"}static getTokenById(e){return H.tokensById.get(e)}getOrCreateSubscriberSet(e=this){return this.subscribers.get(e)||this.subscribers.set(e,new Set)&&this.subscribers.get(e)}createCSS(){return this.cssVar||""}getValueFor(e){const t=A.getOrCreate(e).get(this);if(t!==void 0)return t;throw new Error(`Value could not be retrieved for token named "${this.name}". Ensure the value is set for ${e} or an ancestor of ${e}.`)}setValueFor(e,t){return this._appliedTo.add(e),t instanceof H&&(t=this.alias(t)),A.getOrCreate(e).set(this,t),this}deleteValueFor(e){return this._appliedTo.delete(e),A.existsFor(e)&&A.getOrCreate(e).delete(this),this}withDefault(e){return this.setValueFor(te,e),this}subscribe(e,t){const s=this.getOrCreateSubscriberSet(t);t&&!A.existsFor(t)&&A.getOrCreate(t),s.has(e)||s.add(e)}unsubscribe(e,t){const s=this.subscribers.get(t||this);s&&s.has(e)&&s.delete(e)}notify(e){const t=Object.freeze({token:this,target:e});this.subscribers.has(this)&&this.subscribers.get(this).forEach(s=>s.handleChange(t)),this.subscribers.has(e)&&this.subscribers.get(e).forEach(s=>s.handleChange(t))}alias(e){return t=>e.getValueFor(t)}}H.uniqueId=(()=>{let i=0;return()=>(i++,i.toString(16))})();H.tokensById=new Map;class ao{startReflection(e,t){e.subscribe(this,t),this.handleChange({token:e,target:t})}stopReflection(e,t){e.unsubscribe(this,t),this.remove(e,t)}handleChange(e){const{token:t,target:s}=e;this.add(t,s)}add(e,t){Ce.getOrCreate(t).setProperty(e.cssCustomProperty,this.resolveCSSValue(A.getOrCreate(t).get(e)))}remove(e,t){Ce.getOrCreate(t).removeProperty(e.cssCustomProperty)}resolveCSSValue(e){return e&&typeof e.createCSS=="function"?e.createCSS():e}}class lo{constructor(e,t,s){this.source=e,this.token=t,this.node=s,this.dependencies=new Set,this.observer=v.binding(e,this,!1),this.observer.handleChange=this.observer.call,this.handleChange()}disconnect(){this.observer.disconnect()}handleChange(){this.node.store.set(this.token,this.observer.observe(this.node.target,Ue))}}class co{constructor(){this.values=new Map}set(e,t){this.values.get(e)!==t&&(this.values.set(e,t),v.getNotifier(this).notify(e.id))}get(e){return v.track(this,e.id),this.values.get(e)}delete(e){this.values.delete(e)}all(){return this.values.entries()}}const ze=new WeakMap,_e=new WeakMap;class A{constructor(e){this.target=e,this.store=new co,this.children=[],this.assignedValues=new Map,this.reflecting=new Set,this.bindingObservers=new Map,this.tokenValueChangeHandler={handleChange:(t,s)=>{const n=H.getTokenById(s);if(n&&(n.notify(this.target),H.isCSSDesignToken(n))){const o=this.parent,r=this.isReflecting(n);if(o){const a=o.get(n),c=t.get(n);a!==c&&!r?this.reflectToCSS(n):a===c&&r&&this.stopReflectToCSS(n)}else r||this.reflectToCSS(n)}}},ze.set(e,this),v.getNotifier(this.store).subscribe(this.tokenValueChangeHandler),e instanceof yt?e.$fastController.addBehaviors([this]):e.isConnected&&this.bind()}static getOrCreate(e){return ze.get(e)||new A(e)}static existsFor(e){return ze.has(e)}static findParent(e){if(te!==e.target){let t=qt(e.target);for(;t!==null;){if(ze.has(t))return ze.get(t);t=qt(t)}return A.getOrCreate(te)}return null}static findClosestAssignedNode(e,t){let s=t;do{if(s.has(e))return s;s=s.parent?s.parent:s.target!==te?A.getOrCreate(te):null}while(s!==null);return null}get parent(){return _e.get(this)||null}has(e){return this.assignedValues.has(e)}get(e){const t=this.store.get(e);if(t!==void 0)return t;const s=this.getRaw(e);if(s!==void 0)return this.hydrate(e,s),this.get(e)}getRaw(e){var t;return this.assignedValues.has(e)?this.assignedValues.get(e):(t=A.findClosestAssignedNode(e,this))===null||t===void 0?void 0:t.getRaw(e)}set(e,t){H.isDerivedDesignTokenValue(this.assignedValues.get(e))&&this.tearDownBindingObserver(e),this.assignedValues.set(e,t),H.isDerivedDesignTokenValue(t)?this.setupBindingObserver(e,t):this.store.set(e,t)}delete(e){this.assignedValues.delete(e),this.tearDownBindingObserver(e);const t=this.getRaw(e);t?this.hydrate(e,t):this.store.delete(e)}bind(){const e=A.findParent(this);e&&e.appendChild(this);for(const t of this.assignedValues.keys())t.notify(this.target)}unbind(){this.parent&&_e.get(this).removeChild(this)}appendChild(e){e.parent&&_e.get(e).removeChild(e);const t=this.children.filter(s=>e.contains(s));_e.set(e,this),this.children.push(e),t.forEach(s=>e.appendChild(s)),v.getNotifier(this.store).subscribe(e);for(const[s,n]of this.store.all())e.hydrate(s,this.bindingObservers.has(s)?this.getRaw(s):n)}removeChild(e){const t=this.children.indexOf(e);return t!==-1&&this.children.splice(t,1),v.getNotifier(this.store).unsubscribe(e),e.parent===this?_e.delete(e):!1}contains(e){return eo(this.target,e.target)}reflectToCSS(e){this.isReflecting(e)||(this.reflecting.add(e),A.cssCustomPropertyReflector.startReflection(e,this.target))}stopReflectToCSS(e){this.isReflecting(e)&&(this.reflecting.delete(e),A.cssCustomPropertyReflector.stopReflection(e,this.target))}isReflecting(e){return this.reflecting.has(e)}handleChange(e,t){const s=H.getTokenById(t);s&&this.hydrate(s,this.getRaw(s))}hydrate(e,t){if(!this.has(e)){const s=this.bindingObservers.get(e);H.isDerivedDesignTokenValue(t)?s?s.source!==t&&(this.tearDownBindingObserver(e),this.setupBindingObserver(e,t)):this.setupBindingObserver(e,t):(s&&this.tearDownBindingObserver(e),this.store.set(e,t))}}setupBindingObserver(e,t){const s=new lo(t,e,this);return this.bindingObservers.set(e,s),s}tearDownBindingObserver(e){return this.bindingObservers.has(e)?(this.bindingObservers.get(e).disconnect(),this.bindingObservers.delete(e),!0):!1}}A.cssCustomPropertyReflector=new ao;l([b],A.prototype,"children",void 0);function ho(i){return H.from(i)}const us=Object.freeze({create:ho,notifyConnection(i){return!i.isConnected||!A.existsFor(i)?!1:(A.getOrCreate(i).bind(),!0)},notifyDisconnection(i){return i.isConnected||!A.existsFor(i)?!1:(A.getOrCreate(i).unbind(),!0)},registerRoot(i=te){R.registerRoot(i)},unregisterRoot(i=te){R.unregisterRoot(i)}}),Ht=Object.freeze({definitionCallbackOnly:null,ignoreDuplicate:Symbol()}),Vt=new Map,dt=new Map;let Ie=null;const je=S.createInterface(i=>i.cachedCallback(e=>(Ie===null&&(Ie=new fs(null,e)),Ie))),ps=Object.freeze({tagFor(i){return dt.get(i)},responsibleFor(i){const e=i.$$designSystem$$;return e||S.findResponsibleContainer(i).get(je)},getOrCreate(i){if(!i)return Ie===null&&(Ie=S.getOrCreateDOMContainer().get(je)),Ie;const e=i.$$designSystem$$;if(e)return e;const t=S.getOrCreateDOMContainer(i);if(t.has(je,!1))return t.get(je);{const s=new fs(i,t);return t.register(Ye.instance(je,s)),s}}});function uo(i,e,t){return typeof i=="string"?{name:i,type:e,callback:t}:i}class fs{constructor(e,t){this.owner=e,this.container=t,this.designTokensInitialized=!1,this.prefix="fast",this.shadowRootMode=void 0,this.disambiguate=()=>Ht.definitionCallbackOnly,e!==null&&(e.$$designSystem$$=this)}withPrefix(e){return this.prefix=e,this}withShadowRootMode(e){return this.shadowRootMode=e,this}withElementDisambiguation(e){return this.disambiguate=e,this}withDesignTokenRoot(e){return this.designTokenRoot=e,this}register(...e){const t=this.container,s=[],n=this.disambiguate,o=this.shadowRootMode,r={elementPrefix:this.prefix,tryDefineElement(a,c,d){const h=uo(a,c,d),{name:p,callback:g,baseClass:$}=h;let{type:C}=h,D=p,X=Vt.get(D),Ve=!0;for(;X;){const oe=n(D,C,X);switch(oe){case Ht.ignoreDuplicate:return;case Ht.definitionCallbackOnly:Ve=!1,X=void 0;break;default:D=oe,X=Vt.get(D);break}}Ve&&((dt.has(C)||C===I)&&(C=class extends C{}),Vt.set(D,C),dt.set(C,D),$&&dt.set($,D)),s.push(new po(t,D,C,o,g,Ve))}};this.designTokensInitialized||(this.designTokensInitialized=!0,this.designTokenRoot!==null&&us.registerRoot(this.designTokenRoot)),t.registerWithContext(r,...e);for(const a of s)a.callback(a),a.willDefine&&a.definition!==null&&a.definition.define();return this}}class po{constructor(e,t,s,n,o,r){this.container=e,this.name=t,this.type=s,this.shadowRootMode=n,this.callback=o,this.willDefine=r,this.definition=null}definePresentation(e){as.define(this.name,e,this.container)}defineElement(e){this.definition=new vt(this.type,Object.assign(Object.assign({},e),{name:this.name}))}tagFor(e){return ps.tagFor(e)}}const fo=(i,e)=>w`
    <template role="${t=>t.role}" aria-orientation="${t=>t.orientation}"></template>
`,bo={separator:"separator",presentation:"presentation"};let si=class extends I{constructor(){super(...arguments),this.role=bo.separator,this.orientation=Kt.horizontal}};l([u],si.prototype,"role",void 0);l([u],si.prototype,"orientation",void 0);const go=(i,e)=>w`
    <template
        aria-checked="${t=>t.ariaChecked}"
        aria-disabled="${t=>t.ariaDisabled}"
        aria-posinset="${t=>t.ariaPosInSet}"
        aria-selected="${t=>t.ariaSelected}"
        aria-setsize="${t=>t.ariaSetSize}"
        class="${t=>[t.checked&&"checked",t.selected&&"selected",t.disabled&&"disabled"].filter(Boolean).join(" ")}"
        role="option"
    >
        ${Be(i,e)}
        <span class="content" part="content">
            <slot ${W("content")}></slot>
        </span>
        ${Ee(i,e)}
    </template>
`;class Ct extends V{constructor(){super(...arguments),this.activeIndex=-1,this.rangeStartIndex=-1}get activeOption(){return this.options[this.activeIndex]}get checkedOptions(){var e;return(e=this.options)===null||e===void 0?void 0:e.filter(t=>t.checked)}get firstSelectedOptionIndex(){return this.options.indexOf(this.firstSelectedOption)}activeIndexChanged(e,t){var s,n;this.ariaActiveDescendant=(n=(s=this.options[t])===null||s===void 0?void 0:s.id)!==null&&n!==void 0?n:"",this.focusAndScrollOptionIntoView()}checkActiveIndex(){if(!this.multiple)return;const e=this.activeOption;e&&(e.checked=!0)}checkFirstOption(e=!1){e?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex+1),this.options.forEach((t,s)=>{t.checked=rt(s,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex=0,this.checkActiveIndex()}checkLastOption(e=!1){e?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((t,s)=>{t.checked=rt(s,this.rangeStartIndex,this.options.length)})):this.uncheckAllOptions(),this.activeIndex=this.options.length-1,this.checkActiveIndex()}connectedCallback(){super.connectedCallback(),this.addEventListener("focusout",this.focusoutHandler)}disconnectedCallback(){this.removeEventListener("focusout",this.focusoutHandler),super.disconnectedCallback()}checkNextOption(e=!1){e?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.options.forEach((t,s)=>{t.checked=rt(s,this.rangeStartIndex,this.activeIndex+1)})):this.uncheckAllOptions(),this.activeIndex+=this.activeIndex<this.options.length-1?1:0,this.checkActiveIndex()}checkPreviousOption(e=!1){e?(this.rangeStartIndex===-1&&(this.rangeStartIndex=this.activeIndex),this.checkedOptions.length===1&&(this.rangeStartIndex+=1),this.options.forEach((t,s)=>{t.checked=rt(s,this.activeIndex,this.rangeStartIndex)})):this.uncheckAllOptions(),this.activeIndex-=this.activeIndex>0?1:0,this.checkActiveIndex()}clickHandler(e){var t;if(!this.multiple)return super.clickHandler(e);const s=(t=e.target)===null||t===void 0?void 0:t.closest("[role=option]");if(!(!s||s.disabled))return this.uncheckAllOptions(),this.activeIndex=this.options.indexOf(s),this.checkActiveIndex(),this.toggleSelectedForAllCheckedOptions(),!0}focusAndScrollOptionIntoView(){super.focusAndScrollOptionIntoView(this.activeOption)}focusinHandler(e){if(!this.multiple)return super.focusinHandler(e);!this.shouldSkipFocus&&e.target===e.currentTarget&&(this.uncheckAllOptions(),this.activeIndex===-1&&(this.activeIndex=this.firstSelectedOptionIndex!==-1?this.firstSelectedOptionIndex:0),this.checkActiveIndex(),this.setSelectedOptions(),this.focusAndScrollOptionIntoView()),this.shouldSkipFocus=!1}focusoutHandler(e){this.multiple&&this.uncheckAllOptions()}keydownHandler(e){if(!this.multiple)return super.keydownHandler(e);if(this.disabled)return!0;const{key:t,shiftKey:s}=e;switch(this.shouldSkipFocus=!1,t){case Pe:{this.checkFirstOption(s);return}case me:{this.checkNextOption(s);return}case ve:{this.checkPreviousOption(s);return}case Fe:{this.checkLastOption(s);return}case ei:return this.focusAndScrollOptionIntoView(),!0;case xt:return this.uncheckAllOptions(),this.checkActiveIndex(),!0;case et:if(e.preventDefault(),this.typeAheadExpired){this.toggleSelectedForAllCheckedOptions();return}default:return t.length===1&&this.handleTypeAhead(`${t}`),!0}}mousedownHandler(e){if(e.offsetX>=0&&e.offsetX<=this.scrollWidth)return super.mousedownHandler(e)}multipleChanged(e,t){var s;this.ariaMultiSelectable=t?"true":null,(s=this.options)===null||s===void 0||s.forEach(n=>{n.checked=t?!1:void 0}),this.setSelectedOptions()}setSelectedOptions(){if(!this.multiple){super.setSelectedOptions();return}this.$fastController.isConnected&&this.options&&(this.selectedOptions=this.options.filter(e=>e.selected),this.focusAndScrollOptionIntoView())}sizeChanged(e,t){var s;const n=Math.max(0,parseInt((s=t==null?void 0:t.toFixed())!==null&&s!==void 0?s:"",10));n!==t&&y.queueUpdate(()=>{this.size=n})}toggleSelectedForAllCheckedOptions(){const e=this.checkedOptions.filter(s=>!s.disabled),t=!e.every(s=>s.selected);e.forEach(s=>s.selected=t),this.selectedIndex=this.options.indexOf(e[e.length-1]),this.setSelectedOptions()}typeaheadBufferChanged(e,t){if(!this.multiple){super.typeaheadBufferChanged(e,t);return}if(this.$fastController.isConnected){const s=this.getTypeaheadMatches(),n=this.options.indexOf(s[0]);n>-1&&(this.activeIndex=n,this.uncheckAllOptions(),this.checkActiveIndex()),this.typeAheadExpired=!1}}uncheckAllOptions(e=!1){this.options.forEach(t=>t.checked=this.multiple?!1:void 0),e||(this.rangeStartIndex=-1)}}l([b],Ct.prototype,"activeIndex",void 0);l([u({mode:"boolean"})],Ct.prototype,"multiple",void 0);l([u({converter:J})],Ct.prototype,"size",void 0);class mo extends I{}class vo extends it(mo){constructor(){super(...arguments),this.proxy=document.createElement("input")}}const yo={email:"email",password:"password",tel:"tel",text:"text",url:"url"};let U=class extends vo{constructor(){super(...arguments),this.type=yo.text}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly,this.validate())}autofocusChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.autofocus=this.autofocus,this.validate())}placeholderChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.placeholder=this.placeholder)}typeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.type=this.type,this.validate())}listChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.setAttribute("list",this.list),this.validate())}maxlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.maxLength=this.maxlength,this.validate())}minlengthChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.minLength=this.minlength,this.validate())}patternChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.pattern=this.pattern,this.validate())}sizeChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.size=this.size)}spellcheckChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.spellcheck=this.spellcheck)}connectedCallback(){super.connectedCallback(),this.proxy.setAttribute("type",this.type),this.validate(),this.autofocus&&y.queueUpdate(()=>{this.focus()})}select(){this.control.select(),this.$emit("select")}handleTextInput(){this.value=this.control.value}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};l([u({attribute:"readonly",mode:"boolean"})],U.prototype,"readOnly",void 0);l([u({mode:"boolean"})],U.prototype,"autofocus",void 0);l([u],U.prototype,"placeholder",void 0);l([u],U.prototype,"type",void 0);l([u],U.prototype,"list",void 0);l([u({converter:J})],U.prototype,"maxlength",void 0);l([u({converter:J})],U.prototype,"minlength",void 0);l([u],U.prototype,"pattern",void 0);l([u({converter:J})],U.prototype,"size",void 0);l([u({mode:"boolean"})],U.prototype,"spellcheck",void 0);l([b],U.prototype,"defaultSlottedNodes",void 0);class ni{}q(ni,T);q(U,De,ni);const Bi=44,xo=(i,e)=>w`
    <template
        role="progressbar"
        aria-valuenow="${t=>t.value}"
        aria-valuemin="${t=>t.min}"
        aria-valuemax="${t=>t.max}"
        class="${t=>t.paused?"paused":""}"
    >
        ${bt(t=>typeof t.value=="number",w`
                <svg
                    class="progress"
                    part="progress"
                    viewBox="0 0 16 16"
                    slot="determinate"
                >
                    <circle
                        class="background"
                        part="background"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                    <circle
                        class="determinate"
                        part="determinate"
                        style="stroke-dasharray: ${t=>Bi*t.percentComplete/100}px ${Bi}px"
                        cx="8px"
                        cy="8px"
                        r="7px"
                    ></circle>
                </svg>
            `)}
        ${bt(t=>typeof t.value!="number",w`
                <slot name="indeterminate" slot="indeterminate">
                    ${e.indeterminateIndicator||""}
                </slot>
            `)}
    </template>
`;class He extends I{constructor(){super(...arguments),this.percentComplete=0}valueChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}minChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}maxChanged(){this.$fastController.isConnected&&this.updatePercentComplete()}connectedCallback(){super.connectedCallback(),this.updatePercentComplete()}updatePercentComplete(){const e=typeof this.min=="number"?this.min:0,t=typeof this.max=="number"?this.max:100,s=typeof this.value=="number"?this.value:0,n=t-e;this.percentComplete=n===0?0:Math.fround((s-e)/n*100)}}l([u({converter:J})],He.prototype,"value",void 0);l([u({converter:J})],He.prototype,"min",void 0);l([u({converter:J})],He.prototype,"max",void 0);l([u({mode:"boolean"})],He.prototype,"paused",void 0);l([b],He.prototype,"percentComplete",void 0);const wo=(i,e)=>w`
    <template
        role="radiogroup"
        aria-disabled="${t=>t.disabled}"
        aria-readonly="${t=>t.readOnly}"
        @click="${(t,s)=>t.clickHandler(s.event)}"
        @keydown="${(t,s)=>t.keydownHandler(s.event)}"
        @focusout="${(t,s)=>t.focusOutHandler(s.event)}"
    >
        <slot name="label"></slot>
        <div
            class="positioning-region ${t=>t.orientation===Kt.horizontal?"horizontal":"vertical"}"
            part="positioning-region"
        >
            <slot
                ${W({property:"slottedRadioButtons",filter:Zt("[role=radio]")})}
            ></slot>
        </div>
    </template>
`;let he=class extends I{constructor(){super(...arguments),this.orientation=Kt.horizontal,this.radioChangeHandler=e=>{const t=e.target;t.checked&&(this.slottedRadioButtons.forEach(s=>{s!==t&&(s.checked=!1,this.isInsideFoundationToolbar||s.setAttribute("tabindex","-1"))}),this.selectedRadio=t,this.value=t.value,t.setAttribute("tabindex","0"),this.focusedRadio=t),e.stopPropagation()},this.moveToRadioByIndex=(e,t)=>{const s=e[t];this.isInsideToolbar||(s.setAttribute("tabindex","0"),s.readOnly?this.slottedRadioButtons.forEach(n=>{n!==s&&n.setAttribute("tabindex","-1")}):(s.checked=!0,this.selectedRadio=s)),this.focusedRadio=s,s.focus()},this.moveRightOffGroup=()=>{var e;(e=this.nextElementSibling)===null||e===void 0||e.focus()},this.moveLeftOffGroup=()=>{var e;(e=this.previousElementSibling)===null||e===void 0||e.focus()},this.focusOutHandler=e=>{const t=this.slottedRadioButtons,s=e.target,n=s!==null?t.indexOf(s):0,o=this.focusedRadio?t.indexOf(this.focusedRadio):-1;return(o===0&&n===o||o===t.length-1&&o===n)&&(this.selectedRadio?(this.focusedRadio=this.selectedRadio,this.isInsideFoundationToolbar||(this.selectedRadio.setAttribute("tabindex","0"),t.forEach(r=>{r!==this.selectedRadio&&r.setAttribute("tabindex","-1")}))):(this.focusedRadio=t[0],this.focusedRadio.setAttribute("tabindex","0"),t.forEach(r=>{r!==this.focusedRadio&&r.setAttribute("tabindex","-1")}))),!0},this.clickHandler=e=>{const t=e.target;if(t){const s=this.slottedRadioButtons;t.checked||s.indexOf(t)===0?(t.setAttribute("tabindex","0"),this.selectedRadio=t):(t.setAttribute("tabindex","-1"),this.selectedRadio=null),this.focusedRadio=t}e.preventDefault()},this.shouldMoveOffGroupToTheRight=(e,t,s)=>e===t.length&&this.isInsideToolbar&&s===Ze,this.shouldMoveOffGroupToTheLeft=(e,t)=>(this.focusedRadio?e.indexOf(this.focusedRadio)-1:0)<0&&this.isInsideToolbar&&t===Je,this.checkFocusedRadio=()=>{this.focusedRadio!==null&&!this.focusedRadio.readOnly&&!this.focusedRadio.checked&&(this.focusedRadio.checked=!0,this.focusedRadio.setAttribute("tabindex","0"),this.focusedRadio.focus(),this.selectedRadio=this.focusedRadio)},this.moveRight=e=>{const t=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?t.indexOf(this.focusedRadio)+1:1,this.shouldMoveOffGroupToTheRight(s,t,e.key)){this.moveRightOffGroup();return}else s===t.length&&(s=0);for(;s<t.length&&t.length>1;)if(t[s].disabled){if(this.focusedRadio&&s===t.indexOf(this.focusedRadio))break;if(s+1>=t.length){if(this.isInsideToolbar)break;s=0}else s+=1}else{this.moveToRadioByIndex(t,s);break}},this.moveLeft=e=>{const t=this.slottedRadioButtons;let s=0;if(s=this.focusedRadio?t.indexOf(this.focusedRadio)-1:0,s=s<0?t.length-1:s,this.shouldMoveOffGroupToTheLeft(t,e.key)){this.moveLeftOffGroup();return}for(;s>=0&&t.length>1;)if(t[s].disabled){if(this.focusedRadio&&s===t.indexOf(this.focusedRadio))break;s-1<0?s=t.length-1:s-=1}else{this.moveToRadioByIndex(t,s);break}},this.keydownHandler=e=>{const t=e.key;if(t in Fn&&this.isInsideFoundationToolbar)return!0;switch(t){case Ke:{this.checkFocusedRadio();break}case Ze:case me:{this.direction===Re.ltr?this.moveRight(e):this.moveLeft(e);break}case Je:case ve:{this.direction===Re.ltr?this.moveLeft(e):this.moveRight(e);break}default:return!0}}}readOnlyChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(e=>{this.readOnly?e.readOnly=!0:e.readOnly=!1})}disabledChanged(){this.slottedRadioButtons!==void 0&&this.slottedRadioButtons.forEach(e=>{this.disabled?e.disabled=!0:e.disabled=!1})}nameChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(e=>{e.setAttribute("name",this.name)})}valueChanged(){this.slottedRadioButtons&&this.slottedRadioButtons.forEach(e=>{e.value===this.value&&(e.checked=!0,this.selectedRadio=e)}),this.$emit("change")}slottedRadioButtonsChanged(e,t){this.slottedRadioButtons&&this.slottedRadioButtons.length>0&&this.setupRadioButtons()}get parentToolbar(){return this.closest('[role="toolbar"]')}get isInsideToolbar(){var e;return(e=this.parentToolbar)!==null&&e!==void 0?e:!1}get isInsideFoundationToolbar(){var e;return!!(!((e=this.parentToolbar)===null||e===void 0)&&e.$fastController)}connectedCallback(){super.connectedCallback(),this.direction=Mn(this),this.setupRadioButtons()}disconnectedCallback(){this.slottedRadioButtons.forEach(e=>{e.removeEventListener("change",this.radioChangeHandler)})}setupRadioButtons(){const e=this.slottedRadioButtons.filter(n=>n.hasAttribute("checked")),t=e?e.length:0;if(t>1){const n=e[t-1];n.checked=!0}let s=!1;if(this.slottedRadioButtons.forEach(n=>{this.name!==void 0&&n.setAttribute("name",this.name),this.disabled&&(n.disabled=!0),this.readOnly&&(n.readOnly=!0),this.value&&this.value===n.value?(this.selectedRadio=n,this.focusedRadio=n,n.checked=!0,n.setAttribute("tabindex","0"),s=!0):(this.isInsideFoundationToolbar||n.setAttribute("tabindex","-1"),n.checked=!1),n.addEventListener("change",this.radioChangeHandler)}),this.value===void 0&&this.slottedRadioButtons.length>0){const n=this.slottedRadioButtons.filter(r=>r.hasAttribute("checked")),o=n!==null?n.length:0;if(o>0&&!s){const r=n[o-1];r.checked=!0,this.focusedRadio=r,r.setAttribute("tabindex","0")}else this.slottedRadioButtons[0].setAttribute("tabindex","0"),this.focusedRadio=this.slottedRadioButtons[0]}}};l([u({attribute:"readonly",mode:"boolean"})],he.prototype,"readOnly",void 0);l([u({attribute:"disabled",mode:"boolean"})],he.prototype,"disabled",void 0);l([u],he.prototype,"name",void 0);l([u],he.prototype,"value",void 0);l([u],he.prototype,"orientation",void 0);l([b],he.prototype,"childItems",void 0);l([b],he.prototype,"slottedRadioButtons",void 0);const $o=(i,e)=>w`
    <template
        role="radio"
        class="${t=>t.checked?"checked":""} ${t=>t.readOnly?"readonly":""}"
        aria-checked="${t=>t.checked}"
        aria-required="${t=>t.required}"
        aria-disabled="${t=>t.disabled}"
        aria-readonly="${t=>t.readOnly}"
        @keypress="${(t,s)=>t.keypressHandler(s.event)}"
        @click="${(t,s)=>t.clickHandler(s.event)}"
    >
        <div part="control" class="control">
            <slot name="checked-indicator">
                ${e.checkedIndicator||""}
            </slot>
        </div>
        <label
            part="label"
            class="${t=>t.defaultSlottedNodes&&t.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${W("defaultSlottedNodes")}></slot>
        </label>
    </template>
`;class Co extends I{}class ko extends cs(Co){constructor(){super(...arguments),this.proxy=document.createElement("input")}}let kt=class extends ko{constructor(){super(),this.initialValue="on",this.keypressHandler=e=>{switch(e.key){case et:!this.checked&&!this.readOnly&&(this.checked=!0);return}return!0},this.proxy.setAttribute("type","radio")}readOnlyChanged(){this.proxy instanceof HTMLInputElement&&(this.proxy.readOnly=this.readOnly)}defaultCheckedChanged(){var e;this.$fastController.isConnected&&!this.dirtyChecked&&(this.isInsideRadioGroup()||(this.checked=(e=this.defaultChecked)!==null&&e!==void 0?e:!1,this.dirtyChecked=!1))}connectedCallback(){var e,t;super.connectedCallback(),this.validate(),((e=this.parentElement)===null||e===void 0?void 0:e.getAttribute("role"))!=="radiogroup"&&this.getAttribute("tabindex")===null&&(this.disabled||this.setAttribute("tabindex","0")),this.checkedAttribute&&(this.dirtyChecked||this.isInsideRadioGroup()||(this.checked=(t=this.defaultChecked)!==null&&t!==void 0?t:!1,this.dirtyChecked=!1))}isInsideRadioGroup(){return this.closest("[role=radiogroup]")!==null}clickHandler(e){!this.disabled&&!this.readOnly&&!this.checked&&(this.checked=!0)}};l([u({attribute:"readonly",mode:"boolean"})],kt.prototype,"readOnly",void 0);l([b],kt.prototype,"name",void 0);l([b],kt.prototype,"defaultSlottedNodes",void 0);function Io(i,e,t){return i.nodeType!==Node.TEXT_NODE?!0:typeof i.nodeValue=="string"&&!!i.nodeValue.trim().length}class To extends Ct{}class So extends it(To){constructor(){super(...arguments),this.proxy=document.createElement("select")}}class ue extends So{constructor(){super(...arguments),this.open=!1,this.forcedPosition=!1,this.listboxId=gt("listbox-"),this.maxHeight=0}openChanged(e,t){if(this.collapsible){if(this.open){this.ariaControls=this.listboxId,this.ariaExpanded="true",this.setPositioning(),this.focusAndScrollOptionIntoView(),this.indexWhenOpened=this.selectedIndex,y.queueUpdate(()=>this.focus());return}this.ariaControls="",this.ariaExpanded="false"}}get collapsible(){return!(this.multiple||typeof this.size=="number")}get value(){return v.track(this,"value"),this._value}set value(e){var t,s,n,o,r,a,c;const d=`${this._value}`;if(!((t=this._options)===null||t===void 0)&&t.length){const h=this._options.findIndex($=>$.value===e),p=(n=(s=this._options[this.selectedIndex])===null||s===void 0?void 0:s.value)!==null&&n!==void 0?n:null,g=(r=(o=this._options[h])===null||o===void 0?void 0:o.value)!==null&&r!==void 0?r:null;(h===-1||p!==g)&&(e="",this.selectedIndex=h),e=(c=(a=this.firstSelectedOption)===null||a===void 0?void 0:a.value)!==null&&c!==void 0?c:e}d!==e&&(this._value=e,super.valueChanged(d,e),v.notify(this,"value"),this.updateDisplayValue())}updateValue(e){var t,s;this.$fastController.isConnected&&(this.value=(s=(t=this.firstSelectedOption)===null||t===void 0?void 0:t.value)!==null&&s!==void 0?s:""),e&&(this.$emit("input"),this.$emit("change",this,{bubbles:!0,composed:void 0}))}selectedIndexChanged(e,t){super.selectedIndexChanged(e,t),this.updateValue()}positionChanged(e,t){this.positionAttribute=t,this.setPositioning()}setPositioning(){const e=this.getBoundingClientRect(),s=window.innerHeight-e.bottom;this.position=this.forcedPosition?this.positionAttribute:e.top>s?Ft.above:Ft.below,this.positionAttribute=this.forcedPosition?this.positionAttribute:this.position,this.maxHeight=this.position===Ft.above?~~e.top:~~s}get displayValue(){var e,t;return v.track(this,"displayValue"),(t=(e=this.firstSelectedOption)===null||e===void 0?void 0:e.text)!==null&&t!==void 0?t:""}disabledChanged(e,t){super.disabledChanged&&super.disabledChanged(e,t),this.ariaDisabled=this.disabled?"true":"false"}formResetCallback(){this.setProxyOptions(),super.setDefaultSelectedOption(),this.selectedIndex===-1&&(this.selectedIndex=0)}clickHandler(e){if(!this.disabled){if(this.open){const t=e.target.closest("option,[role=option]");if(t&&t.disabled)return}return super.clickHandler(e),this.open=this.collapsible&&!this.open,!this.open&&this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0),!0}}focusoutHandler(e){var t;if(super.focusoutHandler(e),!this.open)return!0;const s=e.relatedTarget;if(this.isSameNode(s)){this.focus();return}!((t=this.options)===null||t===void 0)&&t.includes(s)||(this.open=!1,this.indexWhenOpened!==this.selectedIndex&&this.updateValue(!0))}handleChange(e,t){super.handleChange(e,t),t==="value"&&this.updateValue()}slottedOptionsChanged(e,t){this.options.forEach(s=>{v.getNotifier(s).unsubscribe(this,"value")}),super.slottedOptionsChanged(e,t),this.options.forEach(s=>{v.getNotifier(s).subscribe(this,"value")}),this.setProxyOptions(),this.updateValue()}mousedownHandler(e){var t;return e.offsetX>=0&&e.offsetX<=((t=this.listbox)===null||t===void 0?void 0:t.scrollWidth)?super.mousedownHandler(e):this.collapsible}multipleChanged(e,t){super.multipleChanged(e,t),this.proxy&&(this.proxy.multiple=t)}selectedOptionsChanged(e,t){var s;super.selectedOptionsChanged(e,t),(s=this.options)===null||s===void 0||s.forEach((n,o)=>{var r;const a=(r=this.proxy)===null||r===void 0?void 0:r.options.item(o);a&&(a.selected=n.selected)})}setDefaultSelectedOption(){var e;const t=(e=this.options)!==null&&e!==void 0?e:Array.from(this.children).filter(V.slottedOptionFilter),s=t==null?void 0:t.findIndex(n=>n.hasAttribute("selected")||n.selected||n.value===this.value);if(s!==-1){this.selectedIndex=s;return}this.selectedIndex=0}setProxyOptions(){this.proxy instanceof HTMLSelectElement&&this.options&&(this.proxy.options.length=0,this.options.forEach(e=>{const t=e.proxy||(e instanceof HTMLOptionElement?e.cloneNode():null);t&&this.proxy.options.add(t)}))}keydownHandler(e){super.keydownHandler(e);const t=e.key||e.key.charCodeAt(0);switch(t){case et:{e.preventDefault(),this.collapsible&&this.typeAheadExpired&&(this.open=!this.open);break}case Pe:case Fe:{e.preventDefault();break}case Ke:{e.preventDefault(),this.open=!this.open;break}case xt:{this.collapsible&&this.open&&(e.preventDefault(),this.open=!1);break}case ei:return this.collapsible&&this.open&&(e.preventDefault(),this.open=!1),!0}return!this.open&&this.indexWhenOpened!==this.selectedIndex&&(this.updateValue(!0),this.indexWhenOpened=this.selectedIndex),!(t===me||t===ve)}connectedCallback(){super.connectedCallback(),this.forcedPosition=!!this.positionAttribute,this.addEventListener("contentchange",this.updateDisplayValue)}disconnectedCallback(){this.removeEventListener("contentchange",this.updateDisplayValue),super.disconnectedCallback()}sizeChanged(e,t){super.sizeChanged(e,t),this.proxy&&(this.proxy.size=t)}updateDisplayValue(){this.collapsible&&v.notify(this,"displayValue")}}l([u({attribute:"open",mode:"boolean"})],ue.prototype,"open",void 0);l([Os],ue.prototype,"collapsible",null);l([b],ue.prototype,"control",void 0);l([u({attribute:"position"})],ue.prototype,"positionAttribute",void 0);l([b],ue.prototype,"position",void 0);l([b],ue.prototype,"maxHeight",void 0);class oi{}l([b],oi.prototype,"ariaControls",void 0);q(oi,ye);q(ue,De,oi);const Oo=(i,e)=>w`
    <template
        class="${t=>[t.collapsible&&"collapsible",t.collapsible&&t.open&&"open",t.disabled&&"disabled",t.collapsible&&t.position].filter(Boolean).join(" ")}"
        aria-activedescendant="${t=>t.ariaActiveDescendant}"
        aria-controls="${t=>t.ariaControls}"
        aria-disabled="${t=>t.ariaDisabled}"
        aria-expanded="${t=>t.ariaExpanded}"
        aria-haspopup="${t=>t.collapsible?"listbox":null}"
        aria-multiselectable="${t=>t.ariaMultiSelectable}"
        ?open="${t=>t.open}"
        role="combobox"
        tabindex="${t=>t.disabled?null:"0"}"
        @click="${(t,s)=>t.clickHandler(s.event)}"
        @focusin="${(t,s)=>t.focusinHandler(s.event)}"
        @focusout="${(t,s)=>t.focusoutHandler(s.event)}"
        @keydown="${(t,s)=>t.keydownHandler(s.event)}"
        @mousedown="${(t,s)=>t.mousedownHandler(s.event)}"
    >
        ${bt(t=>t.collapsible,w`
                <div
                    class="control"
                    part="control"
                    ?disabled="${t=>t.disabled}"
                    ${M("control")}
                >
                    ${Be(i,e)}
                    <slot name="button-container">
                        <div class="selected-value" part="selected-value">
                            <slot name="selected-value">${t=>t.displayValue}</slot>
                        </div>
                        <div aria-hidden="true" class="indicator" part="indicator">
                            <slot name="indicator">
                                ${e.indicator||""}
                            </slot>
                        </div>
                    </slot>
                    ${Ee(i,e)}
                </div>
            `)}
        <div
            class="listbox"
            id="${t=>t.listboxId}"
            part="listbox"
            role="listbox"
            ?disabled="${t=>t.disabled}"
            ?hidden="${t=>t.collapsible?!t.open:!1}"
            ${M("listbox")}
        >
            <slot
                ${W({filter:V.slottedOptionFilter,flatten:!0,property:"slottedOptions"})}
            ></slot>
        </div>
    </template>
`,Ao=(i,e)=>w`
    <template slot="tabpanel" role="tabpanel">
        <slot></slot>
    </template>
`;class Ro extends I{}const Do=(i,e)=>w`
    <template slot="tab" role="tab" aria-disabled="${t=>t.disabled}">
        <slot></slot>
    </template>
`;class bs extends I{}l([u({mode:"boolean"})],bs.prototype,"disabled",void 0);const Eo=(i,e)=>w`
    <template class="${t=>t.orientation}">
        ${Be(i,e)}
        <div class="tablist" part="tablist" role="tablist">
            <slot class="tab" name="tab" part="tab" ${W("tabs")}></slot>

            ${bt(t=>t.showActiveIndicator,w`
                    <div
                        ${M("activeIndicatorRef")}
                        class="activeIndicator"
                        part="activeIndicator"
                    ></div>
                `)}
        </div>
        ${Ee(i,e)}
        <div class="tabpanel">
            <slot name="tabpanel" part="tabpanel" ${W("tabpanels")}></slot>
        </div>
    </template>
`,Ut={vertical:"vertical",horizontal:"horizontal"};class ne extends I{constructor(){super(...arguments),this.orientation=Ut.horizontal,this.activeindicator=!0,this.showActiveIndicator=!0,this.prevActiveTabIndex=0,this.activeTabIndex=0,this.ticking=!1,this.change=()=>{this.$emit("change",this.activetab)},this.isDisabledElement=e=>e.getAttribute("aria-disabled")==="true",this.isFocusableElement=e=>!this.isDisabledElement(e),this.setTabs=()=>{const e="gridColumn",t="gridRow",s=this.isHorizontal()?e:t;this.activeTabIndex=this.getActiveIndex(),this.showActiveIndicator=!1,this.tabs.forEach((n,o)=>{if(n.slot==="tab"){const r=this.activeTabIndex===o&&this.isFocusableElement(n);this.activeindicator&&this.isFocusableElement(n)&&(this.showActiveIndicator=!0);const a=this.tabIds[o],c=this.tabpanelIds[o];n.setAttribute("id",a),n.setAttribute("aria-selected",r?"true":"false"),n.setAttribute("aria-controls",c),n.addEventListener("click",this.handleTabClick),n.addEventListener("keydown",this.handleTabKeyDown),n.setAttribute("tabindex",r?"0":"-1"),r&&(this.activetab=n)}n.style[e]="",n.style[t]="",n.style[s]=`${o+1}`,this.isHorizontal()?n.classList.remove("vertical"):n.classList.add("vertical")})},this.setTabPanels=()=>{this.tabpanels.forEach((e,t)=>{const s=this.tabIds[t],n=this.tabpanelIds[t];e.setAttribute("id",n),e.setAttribute("aria-labelledby",s),this.activeTabIndex!==t?e.setAttribute("hidden",""):e.removeAttribute("hidden")})},this.handleTabClick=e=>{const t=e.currentTarget;t.nodeType===1&&this.isFocusableElement(t)&&(this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=this.tabs.indexOf(t),this.setComponent())},this.handleTabKeyDown=e=>{if(this.isHorizontal())switch(e.key){case Je:e.preventDefault(),this.adjustBackward(e);break;case Ze:e.preventDefault(),this.adjustForward(e);break}else switch(e.key){case ve:e.preventDefault(),this.adjustBackward(e);break;case me:e.preventDefault(),this.adjustForward(e);break}switch(e.key){case Pe:e.preventDefault(),this.adjust(-this.activeTabIndex);break;case Fe:e.preventDefault(),this.adjust(this.tabs.length-this.activeTabIndex-1);break}},this.adjustForward=e=>{const t=this.tabs;let s=0;for(s=this.activetab?t.indexOf(this.activetab)+1:1,s===t.length&&(s=0);s<t.length&&t.length>1;)if(this.isFocusableElement(t[s])){this.moveToTabByIndex(t,s);break}else{if(this.activetab&&s===t.indexOf(this.activetab))break;s+1>=t.length?s=0:s+=1}},this.adjustBackward=e=>{const t=this.tabs;let s=0;for(s=this.activetab?t.indexOf(this.activetab)-1:0,s=s<0?t.length-1:s;s>=0&&t.length>1;)if(this.isFocusableElement(t[s])){this.moveToTabByIndex(t,s);break}else s-1<0?s=t.length-1:s-=1},this.moveToTabByIndex=(e,t)=>{const s=e[t];this.activetab=s,this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=t,s.focus(),this.setComponent()}}orientationChanged(){this.$fastController.isConnected&&(this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}activeidChanged(e,t){this.$fastController.isConnected&&this.tabs.length<=this.tabpanels.length&&(this.prevActiveTabIndex=this.tabs.findIndex(s=>s.id===e),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}tabsChanged(){this.$fastController.isConnected&&this.tabs.length<=this.tabpanels.length&&(this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}tabpanelsChanged(){this.$fastController.isConnected&&this.tabpanels.length<=this.tabs.length&&(this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.setTabs(),this.setTabPanels(),this.handleActiveIndicatorPosition())}getActiveIndex(){return this.activeid!==void 0?this.tabIds.indexOf(this.activeid)===-1?0:this.tabIds.indexOf(this.activeid):0}getTabIds(){return this.tabs.map(e=>{var t;return(t=e.getAttribute("id"))!==null&&t!==void 0?t:`tab-${gt()}`})}getTabPanelIds(){return this.tabpanels.map(e=>{var t;return(t=e.getAttribute("id"))!==null&&t!==void 0?t:`panel-${gt()}`})}setComponent(){this.activeTabIndex!==this.prevActiveTabIndex&&(this.activeid=this.tabIds[this.activeTabIndex],this.focusTab(),this.change())}isHorizontal(){return this.orientation===Ut.horizontal}handleActiveIndicatorPosition(){this.showActiveIndicator&&this.activeindicator&&this.activeTabIndex!==this.prevActiveTabIndex&&(this.ticking?this.ticking=!1:(this.ticking=!0,this.animateActiveIndicator()))}animateActiveIndicator(){this.ticking=!0;const e=this.isHorizontal()?"gridColumn":"gridRow",t=this.isHorizontal()?"translateX":"translateY",s=this.isHorizontal()?"offsetLeft":"offsetTop",n=this.activeIndicatorRef[s];this.activeIndicatorRef.style[e]=`${this.activeTabIndex+1}`;const o=this.activeIndicatorRef[s];this.activeIndicatorRef.style[e]=`${this.prevActiveTabIndex+1}`;const r=o-n;this.activeIndicatorRef.style.transform=`${t}(${r}px)`,this.activeIndicatorRef.classList.add("activeIndicatorTransition"),this.activeIndicatorRef.addEventListener("transitionend",()=>{this.ticking=!1,this.activeIndicatorRef.style[e]=`${this.activeTabIndex+1}`,this.activeIndicatorRef.style.transform=`${t}(0px)`,this.activeIndicatorRef.classList.remove("activeIndicatorTransition")})}adjust(e){this.prevActiveTabIndex=this.activeTabIndex,this.activeTabIndex=Ln(0,this.tabs.length-1,this.activeTabIndex+e),this.setComponent()}focusTab(){this.tabs[this.activeTabIndex].focus()}connectedCallback(){super.connectedCallback(),this.tabIds=this.getTabIds(),this.tabpanelIds=this.getTabPanelIds(),this.activeTabIndex=this.getActiveIndex()}}l([u],ne.prototype,"orientation",void 0);l([u],ne.prototype,"activeid",void 0);l([b],ne.prototype,"tabs",void 0);l([b],ne.prototype,"tabpanels",void 0);l([u({mode:"boolean"})],ne.prototype,"activeindicator",void 0);l([b],ne.prototype,"activeIndicatorRef",void 0);l([b],ne.prototype,"showActiveIndicator",void 0);q(ne,De);class Bo extends I{}class Po extends it(Bo){constructor(){super(...arguments),this.proxy=document.createElement("textarea")}}const gs={none:"none",both:"both",horizontal:"horizontal",vertical:"vertical"};let z=class extends Po{constructor(){super(...arguments),this.resize=gs.none,this.cols=20,this.handleTextInput=()=>{this.value=this.control.value}}readOnlyChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.readOnly=this.readOnly)}autofocusChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.autofocus=this.autofocus)}listChanged(){this.proxy instanceof HTMLTextAreaElement&&this.proxy.setAttribute("list",this.list)}maxlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.maxLength=this.maxlength)}minlengthChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.minLength=this.minlength)}spellcheckChanged(){this.proxy instanceof HTMLTextAreaElement&&(this.proxy.spellcheck=this.spellcheck)}select(){this.control.select(),this.$emit("select")}handleChange(){this.$emit("change")}validate(){super.validate(this.control)}};l([u({mode:"boolean"})],z.prototype,"readOnly",void 0);l([u],z.prototype,"resize",void 0);l([u({mode:"boolean"})],z.prototype,"autofocus",void 0);l([u({attribute:"form"})],z.prototype,"formId",void 0);l([u],z.prototype,"list",void 0);l([u({converter:J})],z.prototype,"maxlength",void 0);l([u({converter:J})],z.prototype,"minlength",void 0);l([u],z.prototype,"name",void 0);l([u],z.prototype,"placeholder",void 0);l([u({converter:J,mode:"fromView"})],z.prototype,"cols",void 0);l([u({converter:J,mode:"fromView"})],z.prototype,"rows",void 0);l([u({mode:"boolean"})],z.prototype,"spellcheck",void 0);l([b],z.prototype,"defaultSlottedNodes",void 0);q(z,ni);const Fo=(i,e)=>w`
    <template
        class="
            ${t=>t.readOnly?"readonly":""}
            ${t=>t.resize!==gs.none?`resize-${t.resize}`:""}"
    >
        <label
            part="label"
            for="control"
            class="${t=>t.defaultSlottedNodes&&t.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot ${W("defaultSlottedNodes")}></slot>
        </label>
        <textarea
            part="control"
            class="control"
            id="control"
            ?autofocus="${t=>t.autofocus}"
            cols="${t=>t.cols}"
            ?disabled="${t=>t.disabled}"
            form="${t=>t.form}"
            list="${t=>t.list}"
            maxlength="${t=>t.maxlength}"
            minlength="${t=>t.minlength}"
            name="${t=>t.name}"
            placeholder="${t=>t.placeholder}"
            ?readonly="${t=>t.readOnly}"
            ?required="${t=>t.required}"
            rows="${t=>t.rows}"
            ?spellcheck="${t=>t.spellcheck}"
            :value="${t=>t.value}"
            aria-atomic="${t=>t.ariaAtomic}"
            aria-busy="${t=>t.ariaBusy}"
            aria-controls="${t=>t.ariaControls}"
            aria-current="${t=>t.ariaCurrent}"
            aria-describedby="${t=>t.ariaDescribedby}"
            aria-details="${t=>t.ariaDetails}"
            aria-disabled="${t=>t.ariaDisabled}"
            aria-errormessage="${t=>t.ariaErrormessage}"
            aria-flowto="${t=>t.ariaFlowto}"
            aria-haspopup="${t=>t.ariaHaspopup}"
            aria-hidden="${t=>t.ariaHidden}"
            aria-invalid="${t=>t.ariaInvalid}"
            aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
            aria-label="${t=>t.ariaLabel}"
            aria-labelledby="${t=>t.ariaLabelledby}"
            aria-live="${t=>t.ariaLive}"
            aria-owns="${t=>t.ariaOwns}"
            aria-relevant="${t=>t.ariaRelevant}"
            aria-roledescription="${t=>t.ariaRoledescription}"
            @input="${(t,s)=>t.handleTextInput()}"
            @change="${t=>t.handleChange()}"
            ${M("control")}
        ></textarea>
    </template>
`,Lo=(i,e)=>w`
    <template
        class="
            ${t=>t.readOnly?"readonly":""}
        "
    >
        <label
            part="label"
            for="control"
            class="${t=>t.defaultSlottedNodes&&t.defaultSlottedNodes.length?"label":"label label__hidden"}"
        >
            <slot
                ${W({property:"defaultSlottedNodes",filter:Io})}
            ></slot>
        </label>
        <div class="root" part="root">
            ${Be(i,e)}
            <input
                class="control"
                part="control"
                id="control"
                @input="${t=>t.handleTextInput()}"
                @change="${t=>t.handleChange()}"
                ?autofocus="${t=>t.autofocus}"
                ?disabled="${t=>t.disabled}"
                list="${t=>t.list}"
                maxlength="${t=>t.maxlength}"
                minlength="${t=>t.minlength}"
                pattern="${t=>t.pattern}"
                placeholder="${t=>t.placeholder}"
                ?readonly="${t=>t.readOnly}"
                ?required="${t=>t.required}"
                size="${t=>t.size}"
                ?spellcheck="${t=>t.spellcheck}"
                :value="${t=>t.value}"
                type="${t=>t.type}"
                aria-atomic="${t=>t.ariaAtomic}"
                aria-busy="${t=>t.ariaBusy}"
                aria-controls="${t=>t.ariaControls}"
                aria-current="${t=>t.ariaCurrent}"
                aria-describedby="${t=>t.ariaDescribedby}"
                aria-details="${t=>t.ariaDetails}"
                aria-disabled="${t=>t.ariaDisabled}"
                aria-errormessage="${t=>t.ariaErrormessage}"
                aria-flowto="${t=>t.ariaFlowto}"
                aria-haspopup="${t=>t.ariaHaspopup}"
                aria-hidden="${t=>t.ariaHidden}"
                aria-invalid="${t=>t.ariaInvalid}"
                aria-keyshortcuts="${t=>t.ariaKeyshortcuts}"
                aria-label="${t=>t.ariaLabel}"
                aria-labelledby="${t=>t.ariaLabelledby}"
                aria-live="${t=>t.ariaLive}"
                aria-owns="${t=>t.ariaOwns}"
                aria-relevant="${t=>t.ariaRelevant}"
                aria-roledescription="${t=>t.ariaRoledescription}"
                ${M("control")}
            />
            ${Ee(i,e)}
        </div>
    </template>
`,ce="not-allowed",Ho=":host([hidden]){display:none}";function L(i){return`${Ho}:host{display:${i}}`}const B=Dn()?"focus-visible":"focus";function Ca(i){return ps.getOrCreate(i).withPrefix("vscode")}function Vo(i){window.addEventListener("load",()=>{new MutationObserver(()=>{Pi(i)}).observe(document.body,{attributes:!0,attributeFilter:["class"]}),Pi(i)})}function Pi(i){const e=getComputedStyle(document.body),t=document.querySelector("body");if(t){const s=t.getAttribute("data-vscode-theme-kind");for(const[n,o]of i){let r=e.getPropertyValue(n).toString();if(s==="vscode-high-contrast")r.length===0&&o.name.includes("background")&&(r="transparent"),o.name==="button-icon-hover-background"&&(r="transparent");else if(s==="vscode-high-contrast-light"){if(r.length===0&&o.name.includes("background"))switch(o.name){case"button-primary-hover-background":r="#0F4A85";break;case"button-secondary-hover-background":r="transparent";break;case"button-icon-hover-background":r="transparent";break}}else o.name==="contrast-active-border"&&(r="transparent");o.setValueFor(t,r)}}}const Fi=new Map;let Li=!1;function f(i,e){const t=us.create(i);if(e){if(e.includes("--fake-vscode-token")){const s="id"+Math.random().toString(16).slice(2);e=`${e}-${s}`}Fi.set(e,t)}return Li||(Vo(Fi),Li=!0),t}const Mo=f("background","--vscode-editor-background").withDefault("#1e1e1e"),x=f("border-width").withDefault(1),ms=f("contrast-active-border","--vscode-contrastActiveBorder").withDefault("#f38518");f("contrast-border","--vscode-contrastBorder").withDefault("#6fc3df");const ie=f("corner-radius").withDefault(0),m=f("design-unit").withDefault(4),xe=f("disabled-opacity").withDefault(.4),k=f("focus-border","--vscode-focusBorder").withDefault("#007fd4"),Q=f("font-family","--vscode-font-family").withDefault("-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol");f("font-weight","--vscode-font-weight").withDefault("400");const E=f("foreground","--vscode-foreground").withDefault("#cccccc"),ht=f("input-height").withDefault("26"),ri=f("input-min-width").withDefault("100px"),N=f("type-ramp-base-font-size","--vscode-font-size").withDefault("13px"),j=f("type-ramp-base-line-height").withDefault("normal"),vs=f("type-ramp-minus1-font-size").withDefault("11px"),ys=f("type-ramp-minus1-line-height").withDefault("16px");f("type-ramp-minus2-font-size").withDefault("9px");f("type-ramp-minus2-line-height").withDefault("16px");f("type-ramp-plus1-font-size").withDefault("16px");f("type-ramp-plus1-line-height").withDefault("24px");const No=f("scrollbarWidth").withDefault("10px"),zo=f("scrollbarHeight").withDefault("10px"),_o=f("scrollbar-slider-background","--vscode-scrollbarSlider-background").withDefault("#79797966"),jo=f("scrollbar-slider-hover-background","--vscode-scrollbarSlider-hoverBackground").withDefault("#646464b3"),qo=f("scrollbar-slider-active-background","--vscode-scrollbarSlider-activeBackground").withDefault("#bfbfbf66"),xs=f("badge-background","--vscode-badge-background").withDefault("#4d4d4d"),ws=f("badge-foreground","--vscode-badge-foreground").withDefault("#ffffff"),ai=f("button-border","--vscode-button-border").withDefault("transparent"),Hi=f("button-icon-background").withDefault("transparent"),Uo=f("button-icon-corner-radius").withDefault("5px"),Go=f("button-icon-outline-offset").withDefault(0),Vi=f("button-icon-hover-background","--fake-vscode-token").withDefault("rgba(90, 93, 94, 0.31)"),Wo=f("button-icon-padding").withDefault("3px"),Te=f("button-primary-background","--vscode-button-background").withDefault("#0e639c"),$s=f("button-primary-foreground","--vscode-button-foreground").withDefault("#ffffff"),Cs=f("button-primary-hover-background","--vscode-button-hoverBackground").withDefault("#1177bb"),Mt=f("button-secondary-background","--vscode-button-secondaryBackground").withDefault("#3a3d41"),Qo=f("button-secondary-foreground","--vscode-button-secondaryForeground").withDefault("#ffffff"),Xo=f("button-secondary-hover-background","--vscode-button-secondaryHoverBackground").withDefault("#45494e"),Yo=f("button-padding-horizontal").withDefault("11px"),Jo=f("button-padding-vertical").withDefault("4px"),ee=f("checkbox-background","--vscode-checkbox-background").withDefault("#3c3c3c"),ke=f("checkbox-border","--vscode-checkbox-border").withDefault("#3c3c3c"),Zo=f("checkbox-corner-radius").withDefault(3);f("checkbox-foreground","--vscode-checkbox-foreground").withDefault("#f0f0f0");const fe=f("list-active-selection-background","--vscode-list-activeSelectionBackground").withDefault("#094771"),Se=f("list-active-selection-foreground","--vscode-list-activeSelectionForeground").withDefault("#ffffff"),Ko=f("list-hover-background","--vscode-list-hoverBackground").withDefault("#2a2d2e"),er=f("divider-background","--vscode-settings-dropdownListBorder").withDefault("#454545"),lt=f("dropdown-background","--vscode-dropdown-background").withDefault("#3c3c3c"),ae=f("dropdown-border","--vscode-dropdown-border").withDefault("#3c3c3c");f("dropdown-foreground","--vscode-dropdown-foreground").withDefault("#f0f0f0");const tr=f("dropdown-list-max-height").withDefault("200px"),be=f("input-background","--vscode-input-background").withDefault("#3c3c3c"),ks=f("input-foreground","--vscode-input-foreground").withDefault("#cccccc");f("input-placeholder-foreground","--vscode-input-placeholderForeground").withDefault("#cccccc");const Mi=f("link-active-foreground","--vscode-textLink-activeForeground").withDefault("#3794ff"),ir=f("link-foreground","--vscode-textLink-foreground").withDefault("#3794ff"),sr=f("progress-background","--vscode-progressBar-background").withDefault("#0e70c0"),nr=f("panel-tab-active-border","--vscode-panelTitle-activeBorder").withDefault("#e7e7e7"),$e=f("panel-tab-active-foreground","--vscode-panelTitle-activeForeground").withDefault("#e7e7e7"),or=f("panel-tab-foreground","--vscode-panelTitle-inactiveForeground").withDefault("#e7e7e799");f("panel-view-background","--vscode-panel-background").withDefault("#1e1e1e");f("panel-view-border","--vscode-panel-border").withDefault("#80808059");const rr=f("tag-corner-radius").withDefault("2px"),ar=(i,e)=>O`
	${L("inline-block")} :host {
		box-sizing: border-box;
		font-family: ${Q};
		font-size: ${vs};
		line-height: ${ys};
		text-align: center;
	}
	.control {
		align-items: center;
		background-color: ${xs};
		border: calc(${x} * 1px) solid ${ai};
		border-radius: 11px;
		box-sizing: border-box;
		color: ${ws};
		display: flex;
		height: calc(${m} * 4px);
		justify-content: center;
		min-width: calc(${m} * 4px + 2px);
		min-height: calc(${m} * 4px + 2px);
		padding: 3px 6px;
	}
`;class lr extends tt{connectedCallback(){super.connectedCallback(),this.circular||(this.circular=!0)}}const cr=lr.compose({baseName:"badge",template:ls,styles:ar}),dr=O`
	${L("inline-flex")} :host {
		outline: none;
		font-family: ${Q};
		font-size: ${N};
		line-height: ${j};
		color: ${$s};
		background: ${Te};
		border-radius: 2px;
		fill: currentColor;
		cursor: pointer;
	}
	.control {
		background: transparent;
		height: inherit;
		flex-grow: 1;
		box-sizing: border-box;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: ${Jo} ${Yo};
		white-space: wrap;
		outline: none;
		text-decoration: none;
		border: calc(${x} * 1px) solid ${ai};
		color: inherit;
		border-radius: inherit;
		fill: inherit;
		cursor: inherit;
		font-family: inherit;
	}
	:host(:hover) {
		background: ${Cs};
	}
	:host(:active) {
		background: ${Te};
	}
	.control:${B} {
		outline: calc(${x} * 1px) solid ${k};
		outline-offset: calc(${x} * 2px);
	}
	.control::-moz-focus-inner {
		border: 0;
	}
	:host([disabled]) {
		opacity: ${xe};
		background: ${Te};
		cursor: ${ce};
	}
	.content {
		display: flex;
	}
	.start {
		display: flex;
	}
	::slotted(svg),
	::slotted(span) {
		width: calc(${m} * 4px);
		height: calc(${m} * 4px);
	}
	.start {
		margin-inline-end: 8px;
	}
`,hr=O`
	:host([appearance='primary']) {
		background: ${Te};
		color: ${$s};
	}
	:host([appearance='primary']:hover) {
		background: ${Cs};
	}
	:host([appearance='primary']:active) .control:active {
		background: ${Te};
	}
	:host([appearance='primary']) .control:${B} {
		outline: calc(${x} * 1px) solid ${k};
		outline-offset: calc(${x} * 2px);
	}
	:host([appearance='primary'][disabled]) {
		background: ${Te};
	}
`,ur=O`
	:host([appearance='secondary']) {
		background: ${Mt};
		color: ${Qo};
	}
	:host([appearance='secondary']:hover) {
		background: ${Xo};
	}
	:host([appearance='secondary']:active) .control:active {
		background: ${Mt};
	}
	:host([appearance='secondary']) .control:${B} {
		outline: calc(${x} * 1px) solid ${k};
		outline-offset: calc(${x} * 2px);
	}
	:host([appearance='secondary'][disabled]) {
		background: ${Mt};
	}
`,pr=O`
	:host([appearance='icon']) {
		background: ${Hi};
		border-radius: ${Uo};
		color: ${E};
	}
	:host([appearance='icon']:hover) {
		background: ${Vi};
		outline: 1px dotted ${ms};
		outline-offset: -1px;
	}
	:host([appearance='icon']) .control {
		padding: ${Wo};
		border: none;
	}
	:host([appearance='icon']:active) .control:active {
		background: ${Vi};
	}
	:host([appearance='icon']) .control:${B} {
		outline: calc(${x} * 1px) solid ${k};
		outline-offset: ${Go};
	}
	:host([appearance='icon'][disabled]) {
		background: ${Hi};
	}
`,fr=(i,e)=>O`
	${dr}
	${hr}
	${ur}
	${pr}
`;class Is extends K{connectedCallback(){if(super.connectedCallback(),!this.appearance){const e=this.getAttribute("appearance");this.appearance=e}}attributeChangedCallback(e,t,s){e==="appearance"&&s==="icon"&&(this.getAttribute("aria-label")||(this.ariaLabel="Icon Button")),e==="aria-label"&&(this.ariaLabel=s),e==="disabled"&&(this.disabled=s!==null)}}l([u],Is.prototype,"appearance",void 0);const br=Is.compose({baseName:"button",template:Nn,styles:fr,shadowOptions:{delegatesFocus:!0}}),gr=(i,e)=>O`
	${L("inline-flex")} :host {
		align-items: center;
		outline: none;
		margin: calc(${m} * 1px) 0;
		user-select: none;
		font-size: ${N};
		line-height: ${j};
	}
	.control {
		position: relative;
		width: calc(${m} * 4px + 2px);
		height: calc(${m} * 4px + 2px);
		box-sizing: border-box;
		border-radius: calc(${Zo} * 1px);
		border: calc(${x} * 1px) solid ${ke};
		background: ${ee};
		outline: none;
		cursor: pointer;
	}
	.label {
		font-family: ${Q};
		color: ${E};
		padding-inline-start: calc(${m} * 2px + 2px);
		margin-inline-end: calc(${m} * 2px + 2px);
		cursor: pointer;
	}
	.label__hidden {
		display: none;
		visibility: hidden;
	}
	.checked-indicator {
		width: 100%;
		height: 100%;
		display: block;
		fill: ${E};
		opacity: 0;
		pointer-events: none;
	}
	.indeterminate-indicator {
		border-radius: 2px;
		background: ${E};
		position: absolute;
		top: 50%;
		left: 50%;
		width: 50%;
		height: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
	}
	:host(:enabled) .control:hover {
		background: ${ee};
		border-color: ${ke};
	}
	:host(:enabled) .control:active {
		background: ${ee};
		border-color: ${k};
	}
	:host(:${B}) .control {
		border: calc(${x} * 1px) solid ${k};
	}
	:host(.disabled) .label,
	:host(.readonly) .label,
	:host(.readonly) .control,
	:host(.disabled) .control {
		cursor: ${ce};
	}
	:host(.checked:not(.indeterminate)) .checked-indicator,
	:host(.indeterminate) .indeterminate-indicator {
		opacity: 1;
	}
	:host(.disabled) {
		opacity: ${xe};
	}
`;class mr extends $t{connectedCallback(){super.connectedCallback(),this.textContent?this.setAttribute("aria-label",this.textContent):this.setAttribute("aria-label","Checkbox")}}const vr=mr.compose({baseName:"checkbox",template:Jn,styles:gr,checkedIndicator:`
		<svg 
			part="checked-indicator"
			class="checked-indicator"
			width="16" 
			height="16" 
			viewBox="0 0 16 16" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor"
		>
			<path 
				fill-rule="evenodd" 
				clip-rule="evenodd" 
				d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z"
			/>
		</svg>
	`,indeterminateIndicator:`
		<div part="indeterminate-indicator" class="indeterminate-indicator"></div>
	`}),yr=(i,e)=>O`
	:host {
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100%;
	}
`,xr=(i,e)=>O`
	:host {
		display: grid;
		padding: calc((${m} / 4) * 1px) 0;
		box-sizing: border-box;
		width: 100%;
		background: transparent;
	}
	:host(.header) {
	}
	:host(.sticky-header) {
		background: ${Mo};
		position: sticky;
		top: 0;
	}
	:host(:hover) {
		background: ${Ko};
		outline: 1px dotted ${ms};
		outline-offset: -1px;
	}
`,wr=(i,e)=>O`
	:host {
		padding: calc(${m} * 1px) calc(${m} * 3px);
		color: ${E};
		opacity: 1;
		box-sizing: border-box;
		font-family: ${Q};
		font-size: ${N};
		line-height: ${j};
		font-weight: 400;
		border: solid calc(${x} * 1px) transparent;
		border-radius: calc(${ie} * 1px);
		white-space: wrap;
		overflow-wrap: anywhere;
	}
	:host(.column-header) {
		font-weight: 600;
	}
	:host(:${B}),
	:host(:focus),
	:host(:active) {
		background: ${fe};
		border: solid calc(${x} * 1px) ${k};
		color: ${Se};
		outline: none;
	}
	:host(:${B}) ::slotted(*),
	:host(:focus) ::slotted(*),
	:host(:active) ::slotted(*) {
		color: ${Se} !important;
	}
`;class $r extends F{connectedCallback(){super.connectedCallback(),this.getAttribute("aria-label")||this.setAttribute("aria-label","Data Grid")}}const Cr=$r.compose({baseName:"data-grid",baseClass:F,template:qn,styles:yr});class kr extends P{}const Ir=kr.compose({baseName:"data-grid-row",baseClass:P,template:Xn,styles:xr});class Tr extends de{}const Sr=Tr.compose({baseName:"data-grid-cell",baseClass:de,template:Yn,styles:wr}),Or=(i,e)=>O`
	${L("block")} :host {
		border: none;
		border-top: calc(${x} * 1px) solid ${er};
		box-sizing: content-box;
		height: 0;
		margin: calc(${m} * 1px) 0;
		width: 100%;
	}
`;class Ar extends si{}const Rr=Ar.compose({baseName:"divider",template:fo,styles:Or}),Dr=(i,e)=>O`
	${L("inline-flex")} :host {
		background: ${lt};
		box-sizing: border-box;
		color: ${E};
		contain: contents;
		font-family: ${Q};
		height: calc(${ht} * 1px);
		position: relative;
		user-select: none;
		min-width: ${ri};
		outline: none;
		vertical-align: top;
	}
	.control {
		align-items: center;
		box-sizing: border-box;
		border: calc(${x} * 1px) solid ${ae};
		border-radius: calc(${ie} * 1px);
		cursor: pointer;
		display: flex;
		font-family: inherit;
		font-size: ${N};
		line-height: ${j};
		min-height: 100%;
		padding: 2px 6px 2px 8px;
		width: 100%;
	}
	.listbox {
		background: ${lt};
		border: calc(${x} * 1px) solid ${k};
		border-radius: calc(${ie} * 1px);
		box-sizing: border-box;
		display: inline-flex;
		flex-direction: column;
		left: 0;
		max-height: ${tr};
		padding: 0 0 calc(${m} * 1px) 0;
		overflow-y: auto;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
	.listbox[hidden] {
		display: none;
	}
	:host(:${B}) .control {
		border-color: ${k};
	}
	:host(:not([disabled]):hover) {
		background: ${lt};
		border-color: ${ae};
	}
	:host(:${B}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
		background: ${fe};
		border: calc(${x} * 1px) solid ${k};
		color: ${Se};
	}
	:host([disabled]) {
		cursor: ${ce};
		opacity: ${xe};
	}
	:host([disabled]) .control {
		cursor: ${ce};
		user-select: none;
	}
	:host([disabled]:hover) {
		background: ${lt};
		color: ${E};
		fill: currentcolor;
	}
	:host(:not([disabled])) .control:active {
		border-color: ${k};
	}
	:host(:empty) .listbox {
		display: none;
	}
	:host([open]) .control {
		border-color: ${k};
	}
	:host([open][position='above']) .listbox,
	:host([open][position='below']) .control {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	:host([open][position='above']) .control,
	:host([open][position='below']) .listbox {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}
	:host([open][position='above']) .listbox {
		bottom: calc(${ht} * 1px);
	}
	:host([open][position='below']) .listbox {
		top: calc(${ht} * 1px);
	}
	.selected-value {
		flex: 1 1 auto;
		font-family: inherit;
		overflow: hidden;
		text-align: start;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.indicator {
		flex: 0 0 auto;
		margin-inline-start: 1em;
	}
	slot[name='listbox'] {
		display: none;
		width: 100%;
	}
	:host([open]) slot[name='listbox'] {
		display: flex;
		position: absolute;
	}
	.end {
		margin-inline-start: auto;
	}
	.start,
	.end,
	.indicator,
	.select-indicator,
	::slotted(svg),
	::slotted(span) {
		fill: currentcolor;
		height: 1em;
		min-height: calc(${m} * 4px);
		min-width: calc(${m} * 4px);
		width: 1em;
	}
	::slotted([role='option']),
	::slotted(option) {
		flex: 0 0 auto;
	}
`;class Er extends ue{}const Br=Er.compose({baseName:"dropdown",template:Oo,styles:Dr,indicator:`
		<svg 
			class="select-indicator"
			part="select-indicator"
			width="16" 
			height="16" 
			viewBox="0 0 16 16" 
			xmlns="http://www.w3.org/2000/svg" 
			fill="currentColor"
		>
			<path 
				fill-rule="evenodd" 
				clip-rule="evenodd" 
				d="M7.976 10.072l4.357-4.357.62.618L8.284 11h-.618L3 6.333l.619-.618 4.357 4.357z"
			/>
		</svg>
	`}),Pr=(i,e)=>O`
	${L("inline-flex")} :host {
		background: transparent;
		box-sizing: border-box;
		color: ${ir};
		cursor: pointer;
		fill: currentcolor;
		font-family: ${Q};
		font-size: ${N};
		line-height: ${j};
		outline: none;
	}
	.control {
		background: transparent;
		border: calc(${x} * 1px) solid transparent;
		border-radius: calc(${ie} * 1px);
		box-sizing: border-box;
		color: inherit;
		cursor: inherit;
		fill: inherit;
		font-family: inherit;
		height: inherit;
		padding: 0;
		outline: none;
		text-decoration: none;
		word-break: break-word;
	}
	.control::-moz-focus-inner {
		border: 0;
	}
	:host(:hover) {
		color: ${Mi};
	}
	:host(:hover) .content {
		text-decoration: underline;
	}
	:host(:active) {
		background: transparent;
		color: ${Mi};
	}
	:host(:${B}) .control,
	:host(:focus) .control {
		border: calc(${x} * 1px) solid ${k};
	}
`;class Fr extends Z{}const Lr=Fr.compose({baseName:"link",template:Vn,styles:Pr,shadowOptions:{delegatesFocus:!0}}),Hr=(i,e)=>O`
	${L("inline-flex")} :host {
		font-family: var(--body-font);
		border-radius: ${ie};
		border: calc(${x} * 1px) solid transparent;
		box-sizing: border-box;
		color: ${E};
		cursor: pointer;
		fill: currentcolor;
		font-size: ${N};
		line-height: ${j};
		margin: 0;
		outline: none;
		overflow: hidden;
		padding: 0 calc((${m} / 2) * 1px)
			calc((${m} / 4) * 1px);
		user-select: none;
		white-space: nowrap;
	}
	:host(:${B}) {
		border-color: ${k};
		background: ${fe};
		color: ${E};
	}
	:host([aria-selected='true']) {
		background: ${fe};
		border: calc(${x} * 1px) solid ${k};
		color: ${Se};
	}
	:host(:active) {
		background: ${fe};
		color: ${Se};
	}
	:host(:not([aria-selected='true']):hover) {
		background: ${fe};
		border: calc(${x} * 1px) solid ${k};
		color: ${Se};
	}
	:host(:not([aria-selected='true']):active) {
		background: ${fe};
		color: ${E};
	}
	:host([disabled]) {
		cursor: ${ce};
		opacity: ${xe};
	}
	:host([disabled]:hover) {
		background-color: inherit;
	}
	.content {
		grid-column-start: 2;
		justify-self: start;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;let Vr=class extends se{connectedCallback(){super.connectedCallback(),this.textContent?this.setAttribute("aria-label",this.textContent):this.setAttribute("aria-label","Option")}};const Mr=Vr.compose({baseName:"option",template:go,styles:Hr}),Nr=(i,e)=>O`
	${L("grid")} :host {
		box-sizing: border-box;
		font-family: ${Q};
		font-size: ${N};
		line-height: ${j};
		color: ${E};
		grid-template-columns: auto 1fr auto;
		grid-template-rows: auto 1fr;
		overflow-x: auto;
	}
	.tablist {
		display: grid;
		grid-template-rows: auto auto;
		grid-template-columns: auto;
		column-gap: calc(${m} * 8px);
		position: relative;
		width: max-content;
		align-self: end;
		padding: calc(${m} * 1px) calc(${m} * 1px) 0;
		box-sizing: border-box;
	}
	.start,
	.end {
		align-self: center;
	}
	.activeIndicator {
		grid-row: 2;
		grid-column: 1;
		width: 100%;
		height: calc((${m} / 4) * 1px);
		justify-self: center;
		background: ${$e};
		margin: 0;
		border-radius: calc(${ie} * 1px);
	}
	.activeIndicatorTransition {
		transition: transform 0.01s linear;
	}
	.tabpanel {
		grid-row: 2;
		grid-column-start: 1;
		grid-column-end: 4;
		position: relative;
	}
`,zr=(i,e)=>O`
	${L("inline-flex")} :host {
		box-sizing: border-box;
		font-family: ${Q};
		font-size: ${N};
		line-height: ${j};
		height: calc(${m} * 7px);
		padding: calc(${m} * 1px) 0;
		color: ${or};
		fill: currentcolor;
		border-radius: calc(${ie} * 1px);
		border: solid calc(${x} * 1px) transparent;
		align-items: center;
		justify-content: center;
		grid-row: 1;
		cursor: pointer;
	}
	:host(:hover) {
		color: ${$e};
		fill: currentcolor;
	}
	:host(:active) {
		color: ${$e};
		fill: currentcolor;
	}
	:host([aria-selected='true']) {
		background: transparent;
		color: ${$e};
		fill: currentcolor;
	}
	:host([aria-selected='true']:hover) {
		background: transparent;
		color: ${$e};
		fill: currentcolor;
	}
	:host([aria-selected='true']:active) {
		background: transparent;
		color: ${$e};
		fill: currentcolor;
	}
	:host(:${B}) {
		outline: none;
		border: solid calc(${x} * 1px) ${nr};
	}
	:host(:focus) {
		outline: none;
	}
	::slotted(vscode-badge) {
		margin-inline-start: calc(${m} * 2px);
	}
`,_r=(i,e)=>O`
	${L("flex")} :host {
		color: inherit;
		background-color: transparent;
		border: solid calc(${x} * 1px) transparent;
		box-sizing: border-box;
		font-size: ${N};
		line-height: ${j};
		padding: 10px calc((${m} + 2) * 1px);
	}
`;class jr extends ne{connectedCallback(){super.connectedCallback(),this.orientation&&(this.orientation=Ut.horizontal),this.getAttribute("aria-label")||this.setAttribute("aria-label","Panels")}}const qr=jr.compose({baseName:"panels",template:Eo,styles:Nr});class Ur extends bs{connectedCallback(){super.connectedCallback(),this.disabled&&(this.disabled=!1),this.textContent&&this.setAttribute("aria-label",this.textContent)}}const Gr=Ur.compose({baseName:"panel-tab",template:Do,styles:zr});class Wr extends Ro{}const Qr=Wr.compose({baseName:"panel-view",template:Ao,styles:_r}),Xr=(i,e)=>O`
	${L("flex")} :host {
		align-items: center;
		outline: none;
		height: calc(${m} * 7px);
		width: calc(${m} * 7px);
		margin: 0;
	}
	.progress {
		height: 100%;
		width: 100%;
	}
	.background {
		fill: none;
		stroke: transparent;
		stroke-width: calc(${m} / 2 * 1px);
	}
	.indeterminate-indicator-1 {
		fill: none;
		stroke: ${sr};
		stroke-width: calc(${m} / 2 * 1px);
		stroke-linecap: square;
		transform-origin: 50% 50%;
		transform: rotate(-90deg);
		transition: all 0.2s ease-in-out;
		animation: spin-infinite 2s linear infinite;
	}
	@keyframes spin-infinite {
		0% {
			stroke-dasharray: 0.01px 43.97px;
			transform: rotate(0deg);
		}
		50% {
			stroke-dasharray: 21.99px 21.99px;
			transform: rotate(450deg);
		}
		100% {
			stroke-dasharray: 0.01px 43.97px;
			transform: rotate(1080deg);
		}
	}
`;class Yr extends He{connectedCallback(){super.connectedCallback(),this.paused&&(this.paused=!1),this.setAttribute("aria-label","Loading"),this.setAttribute("aria-live","assertive"),this.setAttribute("role","alert")}attributeChangedCallback(e,t,s){e==="value"&&this.removeAttribute("value")}}const Jr=Yr.compose({baseName:"progress-ring",template:xo,styles:Xr,indeterminateIndicator:`
		<svg class="progress" part="progress" viewBox="0 0 16 16">
			<circle
				class="background"
				part="background"
				cx="8px"
				cy="8px"
				r="7px"
			></circle>
			<circle
				class="indeterminate-indicator-1"
				part="indeterminate-indicator-1"
				cx="8px"
				cy="8px"
				r="7px"
			></circle>
		</svg>
	`}),Zr=(i,e)=>O`
	${L("flex")} :host {
		align-items: flex-start;
		margin: calc(${m} * 1px) 0;
		flex-direction: column;
	}
	.positioning-region {
		display: flex;
		flex-wrap: wrap;
	}
	:host([orientation='vertical']) .positioning-region {
		flex-direction: column;
	}
	:host([orientation='horizontal']) .positioning-region {
		flex-direction: row;
	}
	::slotted([slot='label']) {
		color: ${E};
		font-size: ${N};
		margin: calc(${m} * 1px) 0;
	}
`;class Kr extends he{connectedCallback(){super.connectedCallback();const e=this.querySelector("label");if(e){const t="radio-group-"+Math.random().toString(16).slice(2);e.setAttribute("id",t),this.setAttribute("aria-labelledby",t)}}}const ea=Kr.compose({baseName:"radio-group",template:wo,styles:Zr}),ta=(i,e)=>O`
	${L("inline-flex")} :host {
		align-items: center;
		flex-direction: row;
		font-size: ${N};
		line-height: ${j};
		margin: calc(${m} * 1px) 0;
		outline: none;
		position: relative;
		transition: all 0.2s ease-in-out;
		user-select: none;
	}
	.control {
		background: ${ee};
		border-radius: 999px;
		border: calc(${x} * 1px) solid ${ke};
		box-sizing: border-box;
		cursor: pointer;
		height: calc(${m} * 4px);
		position: relative;
		outline: none;
		width: calc(${m} * 4px);
	}
	.label {
		color: ${E};
		cursor: pointer;
		font-family: ${Q};
		margin-inline-end: calc(${m} * 2px + 2px);
		padding-inline-start: calc(${m} * 2px + 2px);
	}
	.label__hidden {
		display: none;
		visibility: hidden;
	}
	.control,
	.checked-indicator {
		flex-shrink: 0;
	}
	.checked-indicator {
		background: ${E};
		border-radius: 999px;
		display: inline-block;
		inset: calc(${m} * 1px);
		opacity: 0;
		pointer-events: none;
		position: absolute;
	}
	:host(:not([disabled])) .control:hover {
		background: ${ee};
		border-color: ${ke};
	}
	:host(:not([disabled])) .control:active {
		background: ${ee};
		border-color: ${k};
	}
	:host(:${B}) .control {
		border: calc(${x} * 1px) solid ${k};
	}
	:host([aria-checked='true']) .control {
		background: ${ee};
		border: calc(${x} * 1px) solid ${ke};
	}
	:host([aria-checked='true']:not([disabled])) .control:hover {
		background: ${ee};
		border: calc(${x} * 1px) solid ${ke};
	}
	:host([aria-checked='true']:not([disabled])) .control:active {
		background: ${ee};
		border: calc(${x} * 1px) solid ${k};
	}
	:host([aria-checked="true"]:${B}:not([disabled])) .control {
		border: calc(${x} * 1px) solid ${k};
	}
	:host([disabled]) .label,
	:host([readonly]) .label,
	:host([readonly]) .control,
	:host([disabled]) .control {
		cursor: ${ce};
	}
	:host([aria-checked='true']) .checked-indicator {
		opacity: 1;
	}
	:host([disabled]) {
		opacity: ${xe};
	}
`;class ia extends kt{connectedCallback(){super.connectedCallback(),this.textContent?this.setAttribute("aria-label",this.textContent):this.setAttribute("aria-label","Radio")}}const sa=ia.compose({baseName:"radio",template:$o,styles:ta,checkedIndicator:`
		<div part="checked-indicator" class="checked-indicator"></div>
	`}),na=(i,e)=>O`
	${L("inline-block")} :host {
		box-sizing: border-box;
		font-family: ${Q};
		font-size: ${vs};
		line-height: ${ys};
	}
	.control {
		background-color: ${xs};
		border: calc(${x} * 1px) solid ${ai};
		border-radius: ${rr};
		color: ${ws};
		padding: calc(${m} * 0.5px) calc(${m} * 1px);
		text-transform: uppercase;
	}
`;class oa extends tt{connectedCallback(){super.connectedCallback(),this.circular&&(this.circular=!1)}}const ra=oa.compose({baseName:"tag",template:ls,styles:na}),aa=(i,e)=>O`
	${L("inline-block")} :host {
		font-family: ${Q};
		outline: none;
		user-select: none;
	}
	.control {
		box-sizing: border-box;
		position: relative;
		color: ${ks};
		background: ${be};
		border-radius: calc(${ie} * 1px);
		border: calc(${x} * 1px) solid ${ae};
		font: inherit;
		font-size: ${N};
		line-height: ${j};
		padding: calc(${m} * 2px + 1px);
		width: 100%;
		min-width: ${ri};
		resize: none;
	}
	.control:hover:enabled {
		background: ${be};
		border-color: ${ae};
	}
	.control:active:enabled {
		background: ${be};
		border-color: ${k};
	}
	.control:hover,
	.control:${B},
	.control:disabled,
	.control:active {
		outline: none;
	}
	.control::-webkit-scrollbar {
		width: ${No};
		height: ${zo};
	}
	.control::-webkit-scrollbar-corner {
		background: ${be};
	}
	.control::-webkit-scrollbar-thumb {
		background: ${_o};
	}
	.control::-webkit-scrollbar-thumb:hover {
		background: ${jo};
	}
	.control::-webkit-scrollbar-thumb:active {
		background: ${qo};
	}
	:host(:focus-within:not([disabled])) .control {
		border-color: ${k};
	}
	:host([resize='both']) .control {
		resize: both;
	}
	:host([resize='horizontal']) .control {
		resize: horizontal;
	}
	:host([resize='vertical']) .control {
		resize: vertical;
	}
	.label {
		display: block;
		color: ${E};
		cursor: pointer;
		font-size: ${N};
		line-height: ${j};
		margin-bottom: 2px;
	}
	.label__hidden {
		display: none;
		visibility: hidden;
	}
	:host([disabled]) .label,
	:host([readonly]) .label,
	:host([readonly]) .control,
	:host([disabled]) .control {
		cursor: ${ce};
	}
	:host([disabled]) {
		opacity: ${xe};
	}
	:host([disabled]) .control {
		border-color: ${ae};
	}
`;class la extends z{connectedCallback(){super.connectedCallback(),this.textContent?this.setAttribute("aria-label",this.textContent):this.setAttribute("aria-label","Text area")}}const ca=la.compose({baseName:"text-area",template:Fo,styles:aa,shadowOptions:{delegatesFocus:!0}}),da=(i,e)=>O`
	${L("inline-block")} :host {
		font-family: ${Q};
		outline: none;
		user-select: none;
	}
	.root {
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: row;
		color: ${ks};
		background: ${be};
		border-radius: calc(${ie} * 1px);
		border: calc(${x} * 1px) solid ${ae};
		height: calc(${ht} * 1px);
		min-width: ${ri};
	}
	.control {
		-webkit-appearance: none;
		font: inherit;
		background: transparent;
		border: 0;
		color: inherit;
		height: calc(100% - (${m} * 1px));
		width: 100%;
		margin-top: auto;
		margin-bottom: auto;
		border: none;
		padding: 0 calc(${m} * 2px + 1px);
		font-size: ${N};
		line-height: ${j};
	}
	.control:hover,
	.control:${B},
	.control:disabled,
	.control:active {
		outline: none;
	}
	.label {
		display: block;
		color: ${E};
		cursor: pointer;
		font-size: ${N};
		line-height: ${j};
		margin-bottom: 2px;
	}
	.label__hidden {
		display: none;
		visibility: hidden;
	}
	.start,
	.end {
		display: flex;
		margin: auto;
		fill: currentcolor;
	}
	::slotted(svg),
	::slotted(span) {
		width: calc(${m} * 4px);
		height: calc(${m} * 4px);
	}
	.start {
		margin-inline-start: calc(${m} * 2px);
	}
	.end {
		margin-inline-end: calc(${m} * 2px);
	}
	:host(:hover:not([disabled])) .root {
		background: ${be};
		border-color: ${ae};
	}
	:host(:active:not([disabled])) .root {
		background: ${be};
		border-color: ${k};
	}
	:host(:focus-within:not([disabled])) .root {
		border-color: ${k};
	}
	:host([disabled]) .label,
	:host([readonly]) .label,
	:host([readonly]) .control,
	:host([disabled]) .control {
		cursor: ${ce};
	}
	:host([disabled]) {
		opacity: ${xe};
	}
	:host([disabled]) .control {
		border-color: ${ae};
	}
`;class ha extends U{connectedCallback(){super.connectedCallback(),this.textContent?this.setAttribute("aria-label",this.textContent):this.setAttribute("aria-label","Text field")}}const ua=ha.compose({baseName:"text-field",template:Lo,styles:da,shadowOptions:{delegatesFocus:!0}}),Ia={vsCodeBadge:cr,vsCodeButton:br,vsCodeCheckbox:vr,vsCodeDataGrid:Cr,vsCodeDataGridCell:Sr,vsCodeDataGridRow:Ir,vsCodeDivider:Rr,vsCodeDropdown:Br,vsCodeLink:Lr,vsCodeOption:Mr,vsCodePanels:qr,vsCodePanelTab:Gr,vsCodePanelView:Qr,vsCodeProgressRing:Jr,vsCodeRadioGroup:ea,vsCodeRadio:sa,vsCodeTag:ra,vsCodeTextArea:ca,vsCodeTextField:ua,register(i,...e){if(i)for(const t in this)t!=="register"&&this[t]().register(i,...e)}};export{lr as Badge,Is as Button,mr as Checkbox,$r as DataGrid,Tr as DataGridCell,re as DataGridCellTypes,kr as DataGridRow,We as DataGridRowTypes,Ar as Divider,bo as DividerRole,Er as Dropdown,Ft as DropdownPosition,at as GenerateHeaderOptions,Fr as Link,Vr as Option,Ur as PanelTab,Wr as PanelView,jr as Panels,Yr as ProgressRing,ia as Radio,Kr as RadioGroup,Kt as RadioGroupOrientation,oa as Tag,la as TextArea,gs as TextAreaResize,ha as TextField,yo as TextFieldType,Ia as allComponents,Ca as provideVSCodeDesignSystem,cr as vsCodeBadge,br as vsCodeButton,vr as vsCodeCheckbox,Cr as vsCodeDataGrid,Sr as vsCodeDataGridCell,Ir as vsCodeDataGridRow,Rr as vsCodeDivider,Br as vsCodeDropdown,Lr as vsCodeLink,Mr as vsCodeOption,Gr as vsCodePanelTab,Qr as vsCodePanelView,qr as vsCodePanels,Jr as vsCodeProgressRing,sa as vsCodeRadio,ea as vsCodeRadioGroup,ra as vsCodeTag,ca as vsCodeTextArea,ua as vsCodeTextField};
