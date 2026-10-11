//#region \0rolldown/runtime.js
var __defProp$3 = Object.defineProperty;
var __exportAll$1 = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp$3(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp$3(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@vue/shared/dist/shared.esm-bundler.js
/**
* @vue/shared v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
	const map = /* @__PURE__ */ Object.create(null);
	for (const key of str.split(",")) map[key] = 1;
	return (val) => val in map;
}
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var NOOP = () => {};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
	const i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
};
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
var isArray$3 = Array.isArray;
var isMap$1 = (val) => toTypeString(val) === "[object Map]";
var isSet$1 = (val) => toTypeString(val) === "[object Set]";
var isDate$1 = (val) => toTypeString(val) === "[object Date]";
var isFunction = (val) => typeof val === "function";
var isString$2 = (val) => typeof val === "string";
var isSymbol$1 = (val) => typeof val === "symbol";
var isObject$1 = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
	return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
	return toTypeString(value).slice(8, -1);
};
var isPlainObject$3 = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString$2(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
var cacheStringFunction$1 = (fn) => {
	const cache = /* @__PURE__ */ Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
};
var camelizeRE$1 = /-\w/g;
var camelize$1 = cacheStringFunction$1((str) => {
	return str.replace(camelizeRE$1, (c) => c.slice(1).toUpperCase());
});
var hyphenateRE$1 = /\B([A-Z])/g;
var hyphenate$1 = cacheStringFunction$1((str) => str.replace(hyphenateRE$1, "-$1").toLowerCase());
var capitalize = cacheStringFunction$1((str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction$1((str) => {
	return str ? `on${capitalize(str)}` : ``;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, ...arg) => {
	for (let i = 0; i < fns.length; i++) fns[i](...arg);
};
var def = (obj, key, value, writable = false) => {
	Object.defineProperty(obj, key, {
		configurable: true,
		enumerable: false,
		writable,
		value
	});
};
var looseToNumber = (val) => {
	const n = parseFloat(val);
	return isNaN(n) ? val : n;
};
var toNumber = (val) => {
	const n = isString$2(val) ? Number(val) : NaN;
	return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
	return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
	if (isArray$3(value)) {
		const res = {};
		for (let i = 0; i < value.length; i++) {
			const item = value[i];
			const normalized = isString$2(item) ? parseStringStyle(item) : normalizeStyle(item);
			if (normalized) for (const key in normalized) res[key] = normalized[key];
		}
		return res;
	} else if (isString$2(value) || isObject$1(value)) return value;
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
	const ret = {};
	cssText.replace(styleCommentRE, (match) => match.startsWith("/*") ? "" : match).split(listDelimiterRE).forEach((item) => {
		if (item) {
			const tmp = item.split(propertyDelimiterRE);
			tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
		}
	});
	return ret;
}
function stringifyStyle(styles) {
	if (!styles) return "";
	if (isString$2(styles)) return styles;
	let ret = "";
	for (const key in styles) {
		const value = styles[key];
		if (isString$2(value) || typeof value === "number") {
			const normalizedKey = key.startsWith(`--`) ? key : hyphenate$1(key);
			ret += `${normalizedKey}:${value};`;
		}
	}
	return ret;
}
function normalizeClass(value) {
	let res = "";
	if (isString$2(value)) res = value;
	else if (isArray$3(value)) for (let i = 0; i < value.length; i++) {
		const normalized = normalizeClass(value[i]);
		if (normalized) res += normalized + " ";
	}
	else if (isObject$1(value)) {
		for (const name in value) if (value[name]) res += name + " ";
	}
	return res.trim();
}
function normalizeProps(props) {
	if (!props) return null;
	let { class: klass, style } = props;
	if (klass && !isString$2(klass)) props.class = normalizeClass(klass);
	if (style) props.style = normalizeStyle(style);
	return props;
}
var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
var isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
	return !!value || value === "";
}
var isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
var isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function isRenderableAttrValue(value) {
	if (value == null) return false;
	const type = typeof value;
	return type === "string" || type === "number" || type === "boolean";
}
var cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function getEscapedCssVarName(key, doubleEscape) {
	return key.replace(cssVarNameEscapeSymbolsRE, (s) => doubleEscape ? s === "\"" ? "\\\\\\\"" : `\\\\${s}` : `\\${s}`);
}
function looseCompareArrays(a, b, seen) {
	if (a.length !== b.length) return false;
	let equal = true;
	for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i], seen);
	return equal;
}
function looseCompareCollections(a, b, seen) {
	if (a.size !== b.size) return false;
	const candidates = Array.from(b);
	const matched = new Uint8Array(candidates.length);
	for (const item of a) {
		let index = -1;
		for (let i = 0; i < candidates.length; i++) if (!matched[i] && looseEqual(item, candidates[i], seen)) {
			index = i;
			break;
		}
		if (index < 0) return false;
		matched[index] = 1;
	}
	return true;
}
function looseCompareObjects(a, b, seen) {
	let aValidType = isMap$1(a);
	let bValidType = isMap$1(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
	aValidType = isSet$1(a);
	bValidType = isSet$1(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) {
		const aHasKey = a.hasOwnProperty(key);
		const bHasKey = b.hasOwnProperty(key);
		if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key], seen)) return false;
	}
	return String(a) === String(b);
}
function looseCompareNested(a, b, seen, compare) {
	if (!seen) seen = [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map()];
	const [seenA, seenB] = seen;
	if (seenA.has(a) || seenB.has(b)) return seenA.get(a) === b && seenB.get(b) === a;
	seenA.set(a, b);
	seenB.set(b, a);
	const equal = compare(a, b, seen);
	seenA.delete(a);
	seenB.delete(b);
	return equal;
}
function looseEqual(a, b, seen) {
	if (a === b) return true;
	let aValidType = isDate$1(a);
	let bValidType = isDate$1(b);
	if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
	aValidType = isSymbol$1(a);
	bValidType = isSymbol$1(b);
	if (aValidType || bValidType) return a === b;
	aValidType = isArray$3(a);
	bValidType = isArray$3(b);
	if (aValidType || bValidType) return aValidType && bValidType ? looseCompareNested(a, b, seen, looseCompareArrays) : false;
	aValidType = isObject$1(a);
	bValidType = isObject$1(b);
	if (aValidType || bValidType) {
		if (!aValidType || !bValidType) return false;
		return looseCompareNested(a, b, seen, looseCompareObjects);
	}
	return String(a) === String(b);
}
var isRef$2 = (val) => {
	return !!(val && val["__v_isRef"] === true);
};
var toDisplayString = (val) => {
	return isString$2(val) ? val : val == null ? "" : isArray$3(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$2(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
	if (isRef$2(val)) return replacer(_key, val.value);
	else if (isMap$1(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
		entries[stringifySymbol(key, i) + " =>"] = val2;
		return entries;
	}, {}) };
	else if (isSet$1(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
	else if (isSymbol$1(val)) return stringifySymbol(val);
	else if (isObject$1(val) && !isArray$3(val) && !isPlainObject$3(val)) return String(val);
	return val;
};
var stringifySymbol = (v, i = "") => {
	var _a;
	return isSymbol$1(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
function normalizeCssVarValue(value) {
	if (value == null) return "initial";
	if (typeof value === "string") return value === "" ? " " : value;
	if (typeof value !== "number" || !Number.isFinite(value)) console.warn("[Vue warn] Invalid value used for CSS binding. Expected a string or a finite number but received:", value);
	return String(value);
}
//#endregion
//#region node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
/**
* @vue/reactivity v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
	console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;
var EffectScope = class {
	constructor(detached = false) {
		this.detached = detached;
		/**
		* @internal
		*/
		this._active = true;
		/**
		* @internal track `on` calls, allow `on` call multiple times
		*/
		this._on = 0;
		/**
		* @internal
		*/
		this.effects = [];
		/**
		* @internal
		*/
		this.cleanups = [];
		this._isPaused = false;
		this._warnOnRun = true;
		this.__v_skip = true;
		if (!detached && activeEffectScope) {
			if (activeEffectScope.active) {
				this.parent = activeEffectScope;
				this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
			} else {
				this._active = false;
				this._warnOnRun = false;
			}
		}
	}
	get active() {
		return this._active;
	}
	pause() {
		if (this._active) {
			this._isPaused = true;
			let i, l;
			if (this.scopes) {
				const scopes = this.scopes.slice();
				for (i = 0, l = scopes.length; i < l; i++) scopes[i].pause();
			}
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
		}
	}
	/**
	* Resumes the effect scope, including all child scopes and effects.
	*/
	resume() {
		if (this._active) {
			if (this._isPaused) {
				this._isPaused = false;
				let i, l;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].resume();
				}
				const effects = this.effects.slice();
				for (i = 0, l = effects.length; i < l; i++) effects[i].resume();
			}
		}
	}
	run(fn) {
		if (this._active) {
			const currentEffectScope = activeEffectScope;
			try {
				activeEffectScope = this;
				return fn();
			} finally {
				activeEffectScope = currentEffectScope;
			}
		} else if (this._warnOnRun) warn$2(`cannot run an inactive effect scope.`);
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	on() {
		if (++this._on === 1) {
			this.prevScope = activeEffectScope;
			activeEffectScope = this;
		}
	}
	/**
	* This should only be called on non-detached scopes
	* @internal
	*/
	off() {
		if (this._on > 0 && --this._on === 0) {
			if (activeEffectScope === this) activeEffectScope = this.prevScope;
			else {
				let current = activeEffectScope;
				while (current) {
					if (current.prevScope === this) {
						current.prevScope = this.prevScope;
						break;
					}
					current = current.prevScope;
				}
			}
			this.prevScope = void 0;
		}
	}
	stop(fromParent) {
		if (this._active) {
			this._active = false;
			let i, l;
			for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
			this.effects.length = 0;
			for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
			this.cleanups.length = 0;
			if (this.scopes) {
				const scopes = this.scopes.slice();
				for (i = 0, l = scopes.length; i < l; i++) scopes[i].stop(true);
				this.scopes.length = 0;
			}
			if (!this.detached && this.parent && !fromParent) {
				const last = this.parent.scopes.pop();
				if (last && last !== this) {
					this.parent.scopes[this.index] = last;
					last.index = this.index;
				}
			}
			this.parent = void 0;
		}
	}
};
function getCurrentScope() {
	return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
	if (activeEffectScope) activeEffectScope.cleanups.push(fn);
	else if (!failSilently) warn$2(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
	constructor(fn) {
		this.fn = fn;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 5;
		/**
		* @internal
		*/
		this.next = void 0;
		/**
		* @internal
		*/
		this.cleanup = void 0;
		this.scheduler = void 0;
		if (activeEffectScope) {
			if (activeEffectScope.active) activeEffectScope.effects.push(this);
			else this.flags &= -2;
		}
	}
	pause() {
		this.flags |= 64;
	}
	resume() {
		if (this.flags & 64) {
			this.flags &= -65;
			if (pausedQueueEffects.has(this)) {
				pausedQueueEffects.delete(this);
				this.trigger();
			}
		}
	}
	/**
	* @internal
	*/
	notify() {
		if (this.flags & 2 && !(this.flags & 32)) return;
		if (!(this.flags & 8)) batch(this);
	}
	run() {
		if (!(this.flags & 1)) return this.fn();
		this.flags |= 2;
		cleanupEffect(this);
		prepareDeps(this);
		const prevEffect = activeSub;
		const prevShouldTrack = shouldTrack;
		activeSub = this;
		shouldTrack = true;
		try {
			return this.fn();
		} finally {
			if (activeSub !== this) warn$2("Active effect was not restored correctly - this is likely a Vue internal bug.");
			cleanupDeps(this);
			activeSub = prevEffect;
			shouldTrack = prevShouldTrack;
			this.flags &= -3;
		}
	}
	stop() {
		if (this.flags & 1) {
			for (let link = this.deps; link; link = link.nextDep) removeSub(link);
			this.deps = this.depsTail = void 0;
			cleanupEffect(this);
			this.onStop && this.onStop();
			this.flags &= -2;
		}
	}
	trigger() {
		if (this.flags & 64) pausedQueueEffects.add(this);
		else if (this.scheduler) this.scheduler();
		else this.runIfDirty();
	}
	/**
	* @internal
	*/
	runIfDirty() {
		if (isDirty(this)) this.run();
	}
	get dirty() {
		return isDirty(this);
	}
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
	sub.flags |= 8;
	if (isComputed) {
		sub.next = batchedComputed;
		batchedComputed = sub;
		return;
	}
	sub.next = batchedSub;
	batchedSub = sub;
}
function startBatch() {
	batchDepth++;
}
function endBatch() {
	if (--batchDepth > 0) return;
	if (batchedComputed) {
		let e = batchedComputed;
		batchedComputed = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			e = next;
		}
	}
	let error;
	while (batchedSub) {
		let e = batchedSub;
		batchedSub = void 0;
		while (e) {
			const next = e.next;
			e.next = void 0;
			e.flags &= -9;
			if (e.flags & 1) try {
				e.trigger();
			} catch (err) {
				if (!error) error = err;
			}
			e = next;
		}
	}
	if (error) throw error;
}
function prepareDeps(sub) {
	for (let link = sub.deps; link; link = link.nextDep) {
		link.version = -1;
		link.prevActiveLink = link.dep.activeLink;
		link.dep.activeLink = link;
	}
}
function cleanupDeps(sub) {
	let head;
	let tail = sub.depsTail;
	let link = tail;
	while (link) {
		const prev = link.prevDep;
		if (link.version === -1) {
			if (link === tail) tail = prev;
			removeSub(link);
			removeDep(link);
		} else head = link;
		link.dep.activeLink = link.prevActiveLink;
		link.prevActiveLink = void 0;
		link = prev;
	}
	sub.deps = head;
	sub.depsTail = tail;
}
function isDirty(sub) {
	for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
	if (sub._dirty) return true;
	return false;
}
function refreshComputed(computed) {
	if (computed.flags & 4 && !(computed.flags & 16)) return;
	computed.flags &= -17;
	if (computed.globalVersion === globalVersion) return;
	computed.globalVersion = globalVersion;
	if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) return;
	computed.flags |= 2;
	const dep = computed.dep;
	const prevSub = activeSub;
	const prevShouldTrack = shouldTrack;
	activeSub = computed;
	shouldTrack = true;
	try {
		prepareDeps(computed);
		const value = computed.fn(computed._value);
		if (dep.version === 0 || hasChanged(value, computed._value)) {
			computed.flags |= 128;
			computed._value = value;
			dep.version++;
		}
	} catch (err) {
		dep.version++;
		throw err;
	} finally {
		activeSub = prevSub;
		shouldTrack = prevShouldTrack;
		cleanupDeps(computed);
		computed.flags &= -3;
	}
}
function removeSub(link, soft = false) {
	const { dep, prevSub, nextSub } = link;
	if (prevSub) {
		prevSub.nextSub = nextSub;
		link.prevSub = void 0;
	}
	if (nextSub) {
		nextSub.prevSub = prevSub;
		link.nextSub = void 0;
	}
	if (dep.subsHead === link) dep.subsHead = nextSub;
	if (dep.subs === link) {
		dep.subs = prevSub;
		if (!prevSub && dep.computed) {
			dep.computed.flags &= -5;
			for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, true);
		}
	}
	if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
}
function removeDep(link) {
	const { prevDep, nextDep } = link;
	if (prevDep) {
		prevDep.nextDep = nextDep;
		link.prevDep = void 0;
	}
	if (nextDep) {
		nextDep.prevDep = prevDep;
		link.nextDep = void 0;
	}
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
	trackStack.push(shouldTrack);
	shouldTrack = false;
}
function resetTracking() {
	const last = trackStack.pop();
	shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
	const { cleanup } = e;
	e.cleanup = void 0;
	if (cleanup) {
		const prevSub = activeSub;
		activeSub = void 0;
		try {
			cleanup();
		} finally {
			activeSub = prevSub;
		}
	}
}
var globalVersion = 0;
var Link = class {
	constructor(sub, dep) {
		this.sub = sub;
		this.dep = dep;
		this.version = dep.version;
		this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
	}
};
var Dep = class {
	constructor(computed) {
		this.computed = computed;
		this.version = 0;
		/**
		* Link between this dep and the current active effect
		*/
		this.activeLink = void 0;
		/**
		* Doubly linked list representing the subscribing effects (tail)
		*/
		this.subs = void 0;
		/**
		* For object property deps cleanup
		*/
		this.map = void 0;
		this.key = void 0;
		/**
		* Subscriber counter
		*/
		this.sc = 0;
		/**
		* @internal
		*/
		this.__v_skip = true;
		this.subsHead = void 0;
	}
	track(debugInfo) {
		if (!activeSub || !shouldTrack || activeSub === this.computed) return;
		let link = this.activeLink;
		if (link === void 0 || link.sub !== activeSub) {
			link = this.activeLink = new Link(activeSub, this);
			if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
			else {
				link.prevDep = activeSub.depsTail;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
			}
			addSub(link);
		} else if (link.version === -1) {
			link.version = this.version;
			if (link.nextDep) {
				const next = link.nextDep;
				next.prevDep = link.prevDep;
				if (link.prevDep) link.prevDep.nextDep = next;
				link.prevDep = activeSub.depsTail;
				link.nextDep = void 0;
				activeSub.depsTail.nextDep = link;
				activeSub.depsTail = link;
				if (activeSub.deps === link) activeSub.deps = next;
			}
		}
		if (activeSub.onTrack) activeSub.onTrack(extend({ effect: activeSub }, debugInfo));
		return link;
	}
	trigger(debugInfo) {
		this.version++;
		globalVersion++;
		this.notify(debugInfo);
	}
	notify(debugInfo) {
		startBatch();
		try {
			for (let head = this.subsHead; head; head = head.nextSub) if (head.sub.onTrigger && !(head.sub.flags & 8)) head.sub.onTrigger(extend({ effect: head.sub }, debugInfo));
			for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
		} finally {
			endBatch();
		}
	}
};
function addSub(link) {
	link.dep.sc++;
	if (link.sub.flags & 4) {
		const computed = link.dep.computed;
		if (computed && !link.dep.subs) {
			computed.flags |= 20;
			for (let l = computed.deps; l; l = l.nextDep) addSub(l);
		}
		const currentTail = link.dep.subs;
		if (currentTail !== link) {
			link.prevSub = currentTail;
			if (currentTail) currentTail.nextSub = link;
		}
		if (link.dep.subsHead === void 0) link.dep.subsHead = link;
		link.dep.subs = link;
	}
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol("Object iterate");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("Map keys iterate");
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("Array iterate");
function track(target, type, key) {
	if (shouldTrack && activeSub) {
		let depsMap = targetMap.get(target);
		if (!depsMap) targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
		let dep = depsMap.get(key);
		if (!dep) {
			depsMap.set(key, dep = new Dep());
			dep.map = depsMap;
			dep.key = key;
		}
		dep.track({
			target,
			type,
			key
		});
	}
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
	const depsMap = targetMap.get(target);
	if (!depsMap) {
		globalVersion++;
		return;
	}
	const run = (dep) => {
		if (dep) dep.trigger({
			target,
			type,
			key,
			newValue,
			oldValue,
			oldTarget
		});
	};
	startBatch();
	if (type === "clear") depsMap.forEach(run);
	else {
		const targetIsArray = isArray$3(target);
		const isArrayIndex = targetIsArray && isIntegerKey(key);
		if (targetIsArray && key === "length") {
			const newLength = Number(newValue);
			depsMap.forEach((dep, key2) => {
				if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol$1(key2) && key2 >= newLength) run(dep);
			});
		} else {
			if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
			if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
			switch (type) {
				case "add":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap$1(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					} else if (isArrayIndex) run(depsMap.get("length"));
					break;
				case "delete":
					if (!targetIsArray) {
						run(depsMap.get(ITERATE_KEY));
						if (isMap$1(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
					}
					break;
				case "set": if (isMap$1(target)) run(depsMap.get(ITERATE_KEY));
			}
		}
	}
	endBatch();
}
function getDepFromReactive(object, key) {
	const depMap = targetMap.get(object);
	return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
	const raw = /* @__PURE__ */ toRaw(array);
	if (raw === array) return raw;
	track(raw, "iterate", ARRAY_ITERATE_KEY);
	if (/* @__PURE__ */ isShallow(array)) return raw;
	if (!/* @__PURE__ */ isReadonly$1(array)) return raw.map(toReactive);
	return /* @__PURE__ */ isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
}
function shallowReadArray(arr) {
	track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
	return arr;
}
function toWrapped(target, item) {
	if (/* @__PURE__ */ isReadonly$1(target)) return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
	return toReactive(item);
}
var arrayInstrumentations = {
	__proto__: null,
	[Symbol.iterator]() {
		return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
	},
	concat(...args) {
		return reactiveReadArray(this).concat(...args.map((x) => isArray$3(x) ? reactiveReadArray(x) : x));
	},
	entries() {
		return iterator(this, "entries", (value) => {
			value[1] = toWrapped(this, value[1]);
			return value;
		});
	},
	every(fn, thisArg) {
		return apply(this, "every", fn, thisArg, void 0, arguments);
	},
	filter(fn, thisArg) {
		return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
	},
	find(fn, thisArg) {
		return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findIndex(fn, thisArg) {
		return apply(this, "findIndex", fn, thisArg, void 0, arguments);
	},
	findLast(fn, thisArg) {
		return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
	},
	findLastIndex(fn, thisArg) {
		return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
	},
	forEach(fn, thisArg) {
		return apply(this, "forEach", fn, thisArg, void 0, arguments);
	},
	includes(...args) {
		return searchProxy(this, "includes", args);
	},
	indexOf(...args) {
		return searchProxy(this, "indexOf", args);
	},
	join(separator) {
		return reactiveReadArray(this).join(separator);
	},
	lastIndexOf(...args) {
		return searchProxy(this, "lastIndexOf", args);
	},
	map(fn, thisArg) {
		return apply(this, "map", fn, thisArg, void 0, arguments);
	},
	pop() {
		return noTracking(this, "pop");
	},
	push(...args) {
		return noTracking(this, "push", args);
	},
	reduce(fn, ...args) {
		return reduce(this, "reduce", fn, args);
	},
	reduceRight(fn, ...args) {
		return reduce(this, "reduceRight", fn, args);
	},
	shift() {
		return noTracking(this, "shift");
	},
	some(fn, thisArg) {
		return apply(this, "some", fn, thisArg, void 0, arguments);
	},
	splice(...args) {
		return noTracking(this, "splice", args);
	},
	toReversed() {
		return reactiveReadArray(this).toReversed();
	},
	toSorted(comparer) {
		return reactiveReadArray(this).toSorted(comparer);
	},
	toSpliced(...args) {
		return reactiveReadArray(this).toSpliced(...args);
	},
	unshift(...args) {
		return noTracking(this, "unshift", args);
	},
	values() {
		return iterator(this, "values", (item) => toWrapped(this, item));
	}
};
function iterator(self, method, wrapValue) {
	const arr = shallowReadArray(self);
	const iter = arr[method]();
	if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
		iter._next = iter.next;
		iter.next = () => {
			const result = iter._next();
			if (!result.done) result.value = wrapValue(result.value);
			return result;
		};
	}
	return iter;
}
var arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	const methodFn = arr[method];
	if (methodFn !== arrayProto[method]) {
		const result2 = methodFn.apply(self, args);
		return needsWrap ? toReactive(result2) : result2;
	}
	let wrappedFn = fn;
	if (arr !== self) {
		if (needsWrap) wrappedFn = function(item, index) {
			return fn.call(this, toWrapped(self, item), index, self);
		};
		else if (fn.length > 2) wrappedFn = function(item, index) {
			return fn.call(this, item, index, self);
		};
	}
	const result = methodFn.call(arr, wrappedFn, thisArg);
	return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
	const arr = shallowReadArray(self);
	const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
	let wrappedFn = fn;
	let wrapInitialAccumulator = false;
	if (arr !== self) {
		if (needsWrap) {
			wrapInitialAccumulator = args.length === 0;
			wrappedFn = function(acc, item, index) {
				if (wrapInitialAccumulator) {
					wrapInitialAccumulator = false;
					acc = toWrapped(self, acc);
				}
				return fn.call(this, acc, toWrapped(self, item), index, self);
			};
		} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
			return fn.call(this, acc, item, index, self);
		};
	}
	const result = arr[method](wrappedFn, ...args);
	return wrapInitialAccumulator ? toWrapped(self, result) : result;
}
function searchProxy(self, method, args) {
	const arr = /* @__PURE__ */ toRaw(self);
	track(arr, "iterate", ARRAY_ITERATE_KEY);
	const res = arr[method](...args);
	if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
		args[0] = /* @__PURE__ */ toRaw(args[0]);
		return arr[method](...args);
	}
	return res;
}
function noTracking(self, method, args = []) {
	pauseTracking();
	startBatch();
	const res = (/* @__PURE__ */ toRaw(self))[method].apply(self, args);
	endBatch();
	resetTracking();
	return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol$1));
function hasOwnProperty(key) {
	if (!isSymbol$1(key)) key = String(key);
	const obj = /* @__PURE__ */ toRaw(this);
	track(obj, "has", key);
	return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
	constructor(_isReadonly = false, _isShallow = false) {
		this._isReadonly = _isReadonly;
		this._isShallow = _isShallow;
	}
	get(target, key, receiver) {
		if (key === "__v_skip") return target["__v_skip"];
		const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_isShallow") return isShallow2;
		else if (key === "__v_raw") {
			if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
			return;
		}
		const targetIsArray = isArray$3(target);
		if (!isReadonly2) {
			let fn;
			if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
			if (key === "hasOwnProperty") return hasOwnProperty;
		}
		const res = Reflect.get(target, key, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (isSymbol$1(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
		if (!isReadonly2) track(target, "get", key);
		if (isShallow2) return res;
		if (/* @__PURE__ */ isRef(res)) {
			const value = targetIsArray && isIntegerKey(key) ? res : res.value;
			return isReadonly2 && isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
		}
		if (isObject$1(res)) return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
		return res;
	}
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(false, isShallow2);
	}
	set(target, key, value, receiver) {
		let oldValue = target[key];
		const isArrayWithIntegerKey = isArray$3(target) && isIntegerKey(key);
		if (!this._isShallow) {
			const isOldValueReadonly = /* @__PURE__ */ isReadonly$1(oldValue);
			if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly$1(value)) {
				oldValue = /* @__PURE__ */ toRaw(oldValue);
				value = /* @__PURE__ */ toRaw(value);
			}
			if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
				if (isOldValueReadonly) {
					warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target[key]);
					return true;
				} else {
					oldValue.value = value;
					return true;
				}
			}
		}
		const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
		const result = Reflect.set(target, key, value, /* @__PURE__ */ isRef(target) ? target : receiver);
		if (target === /* @__PURE__ */ toRaw(receiver) && result) {
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
		}
		return result;
	}
	deleteProperty(target, key) {
		const hadKey = hasOwn(target, key);
		const oldValue = target[key];
		const result = Reflect.deleteProperty(target, key);
		if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
		return result;
	}
	has(target, key) {
		const result = Reflect.has(target, key);
		if (!isSymbol$1(key) || !builtInSymbols.has(key)) track(target, "has", key);
		return result;
	}
	ownKeys(target) {
		track(target, "iterate", isArray$3(target) ? "length" : ITERATE_KEY);
		return Reflect.ownKeys(target);
	}
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
	constructor(isShallow2 = false) {
		super(true, isShallow2);
	}
	set(target, key) {
		warn$2(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
		return true;
	}
	deleteProperty(target, key) {
		warn$2(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
		return true;
	}
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
	return function(...args) {
		const target = this["__v_raw"];
		const rawTarget = /* @__PURE__ */ toRaw(target);
		const targetIsMap = isMap$1(rawTarget);
		const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
		const isKeyOnly = method === "keys" && targetIsMap;
		const innerIterator = target[method](...args);
		const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
		!isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
		return extend(Object.create(innerIterator), { next() {
			const { value, done } = innerIterator.next();
			return done ? {
				value,
				done
			} : {
				value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
				done
			};
		} });
	};
}
function createReadonlyMethod(type) {
	return function(...args) {
		{
			const key = args[0] ? `on key "${args[0]}" ` : ``;
			warn$2(`${capitalize(type)} operation ${key}failed: target is readonly.`, /* @__PURE__ */ toRaw(this));
		}
		return type === "delete" ? false : type === "clear" ? void 0 : this;
	};
}
function createInstrumentations(readonly, shallow) {
	const instrumentations = {
		get(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
				track(rawTarget, "get", rawKey);
			}
			const { has } = getProto(rawTarget);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			if (has.call(rawTarget, key)) return wrap(target.get(key));
			else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
			else if (target !== rawTarget) target.get(key);
		},
		get size() {
			const target = this["__v_raw"];
			!readonly && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
			return target.size;
		},
		has(key) {
			const target = this["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const rawKey = /* @__PURE__ */ toRaw(key);
			if (!readonly) {
				if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
				track(rawTarget, "has", rawKey);
			}
			return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
		},
		forEach(callback, thisArg) {
			const observed = this;
			const target = observed["__v_raw"];
			const rawTarget = /* @__PURE__ */ toRaw(target);
			const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
			!readonly && track(rawTarget, "iterate", ITERATE_KEY);
			return target.forEach((value, key) => {
				return callback.call(thisArg, wrap(value), wrap(key), observed);
			});
		}
	};
	extend(instrumentations, readonly ? {
		add: createReadonlyMethod("add"),
		set: createReadonlyMethod("set"),
		delete: createReadonlyMethod("delete"),
		clear: createReadonlyMethod("clear")
	} : {
		add(value) {
			const target = /* @__PURE__ */ toRaw(this);
			const proto = getProto(target);
			const rawValue = /* @__PURE__ */ toRaw(value);
			const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly$1(value) ? rawValue : value;
			if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
				target.add(valueToAdd);
				trigger(target, "add", valueToAdd, valueToAdd);
			}
			return this;
		},
		set(key, value) {
			if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly$1(value)) value = /* @__PURE__ */ toRaw(value);
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			} else checkIdentityKeys(target, has, key);
			const oldValue = get.call(target, key);
			target.set(key, value);
			if (!hadKey) trigger(target, "add", key, value);
			else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			return this;
		},
		delete(key) {
			const target = /* @__PURE__ */ toRaw(this);
			const { has, get } = getProto(target);
			let hadKey = has.call(target, key);
			if (!hadKey) {
				key = /* @__PURE__ */ toRaw(key);
				hadKey = has.call(target, key);
			} else checkIdentityKeys(target, has, key);
			const oldValue = get ? get.call(target, key) : void 0;
			const result = target.delete(key);
			if (hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		},
		clear() {
			const target = /* @__PURE__ */ toRaw(this);
			const hadItems = target.size !== 0;
			const oldTarget = isMap$1(target) ? new Map(target) : new Set(target);
			const result = target.clear();
			if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
			return result;
		}
	});
	[
		"keys",
		"values",
		"entries",
		Symbol.iterator
	].forEach((method) => {
		instrumentations[method] = createIterableMethod(method, readonly, shallow);
	});
	return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
	const instrumentations = createInstrumentations(isReadonly2, shallow);
	return (target, key, receiver) => {
		if (key === "__v_isReactive") return !isReadonly2;
		else if (key === "__v_isReadonly") return isReadonly2;
		else if (key === "__v_raw") return target;
		return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
	};
}
var mutableCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, false) };
var shallowCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(false, true) };
var readonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, false) };
var shallowReadonlyCollectionHandlers = { get: /* @__PURE__ */ createInstrumentationGetter(true, true) };
function checkIdentityKeys(target, has, key) {
	const rawKey = /* @__PURE__ */ toRaw(key);
	if (rawKey !== key && has.call(target, rawKey)) {
		const type = toRawType(target);
		warn$2(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
	}
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
	switch (rawType) {
		case "Object":
		case "Array": return 1;
		case "Map":
		case "Set":
		case "WeakMap":
		case "WeakSet": return 2;
		default: return 0;
	}
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
	if (/* @__PURE__ */ isReadonly$1(target)) return target;
	return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
	return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
	return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
	return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
	if (!isObject$1(target)) {
		warn$2(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
		return target;
	}
	if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
	if (target["__v_skip"] || !Object.isExtensible(target)) return target;
	const existingProxy = proxyMap.get(target);
	if (existingProxy) return existingProxy;
	const targetType = targetTypeMap(toRawType(target));
	if (targetType === 0) return target;
	const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
	proxyMap.set(target, proxy);
	return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
	if (/* @__PURE__ */ isReadonly$1(value)) return /* @__PURE__ */ isReactive(value["__v_raw"]);
	return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly$1(value) {
	return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
	return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
	return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
	const raw = observed && observed["__v_raw"];
	return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
	if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
	return value;
}
var toReactive = (value) => isObject$1(value) ? /* @__PURE__ */ reactive(value) : value;
var toReadonly = (value) => isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
	return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
	return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
	return createRef(value, true);
}
function createRef(rawValue, shallow) {
	if (/* @__PURE__ */ isRef(rawValue)) return rawValue;
	return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
	constructor(value, isShallow2) {
		this.dep = new Dep();
		this["__v_isRef"] = true;
		this["__v_isShallow"] = false;
		this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
		this._value = isShallow2 ? value : toReactive(value);
		this["__v_isShallow"] = isShallow2;
	}
	get value() {
		this.dep.track({
			target: this,
			type: "get",
			key: "value"
		});
		return this._value;
	}
	set value(newValue) {
		const oldValue = this._rawValue;
		const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly$1(newValue);
		newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
		if (hasChanged(newValue, oldValue)) {
			this._rawValue = newValue;
			this._value = useDirectValue ? newValue : toReactive(newValue);
			this.dep.trigger({
				target: this,
				type: "set",
				key: "value",
				newValue,
				oldValue
			});
		}
	}
};
function unref(ref2) {
	return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
	return isFunction(source) ? source() : unref(source);
}
var shallowUnwrapHandlers = {
	get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
	set: (target, key, value, receiver) => {
		const oldValue = target[key];
		if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
			oldValue.value = value;
			return true;
		} else return Reflect.set(target, key, value, receiver);
	}
};
function proxyRefs(objectWithRefs) {
	return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var CustomRefImpl = class {
	constructor(factory) {
		this["__v_isRef"] = true;
		this._value = void 0;
		const dep = this.dep = new Dep();
		const { get, set } = factory(dep.track.bind(dep), dep.trigger.bind(dep));
		this._get = get;
		this._set = set;
	}
	get value() {
		return this._value = this._get();
	}
	set value(newVal) {
		this._set(newVal);
	}
};
function customRef(factory) {
	return new CustomRefImpl(factory);
}
var ObjectRefImpl = class {
	constructor(_object, key, _defaultValue) {
		this._object = _object;
		this._defaultValue = _defaultValue;
		this["__v_isRef"] = true;
		this._value = void 0;
		this._key = isSymbol$1(key) ? key : String(key);
		this._raw = /* @__PURE__ */ toRaw(_object);
		let shallow = true;
		let obj = _object;
		if (!isArray$3(_object) || isSymbol$1(this._key) || !isIntegerKey(this._key)) do
			shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
		while (shallow && (obj = obj["__v_raw"]));
		this._shallow = shallow;
	}
	get value() {
		let val = this._object[this._key];
		if (this._shallow) val = unref(val);
		return this._value = val === void 0 ? this._defaultValue : val;
	}
	set value(newVal) {
		if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
			const nestedRef = this._object[this._key];
			if (/* @__PURE__ */ isRef(nestedRef)) {
				nestedRef.value = newVal;
				return;
			}
		}
		this._object[this._key] = newVal;
	}
	get dep() {
		return getDepFromReactive(this._raw, this._key);
	}
};
var GetterRefImpl = class {
	constructor(_getter) {
		this._getter = _getter;
		this["__v_isRef"] = true;
		this["__v_isReadonly"] = true;
		this._value = void 0;
	}
	get value() {
		return this._value = this._getter();
	}
};
// @__NO_SIDE_EFFECTS__
function toRef$1(source, key, defaultValue) {
	if (/* @__PURE__ */ isRef(source)) return source;
	else if (isFunction(source)) return new GetterRefImpl(source);
	else if (isObject$1(source) && arguments.length > 1) return propertyToRef(source, key, defaultValue);
	else return /* @__PURE__ */ ref(source);
}
function propertyToRef(source, key, defaultValue) {
	return new ObjectRefImpl(source, key, defaultValue);
}
var ComputedRefImpl = class {
	constructor(fn, setter, isSSR) {
		this.fn = fn;
		this.setter = setter;
		/**
		* @internal
		*/
		this._value = void 0;
		/**
		* @internal
		*/
		this.dep = new Dep(this);
		/**
		* @internal
		*/
		this.__v_isRef = true;
		/**
		* @internal
		*/
		this.deps = void 0;
		/**
		* @internal
		*/
		this.depsTail = void 0;
		/**
		* @internal
		*/
		this.flags = 16;
		/**
		* @internal
		*/
		this.globalVersion = globalVersion - 1;
		/**
		* @internal
		*/
		this.next = void 0;
		this.effect = this;
		this["__v_isReadonly"] = !setter;
		this.isSSR = isSSR;
	}
	/**
	* @internal
	*/
	notify() {
		this.flags |= 16;
		if (!(this.flags & 8) && activeSub !== this) {
			batch(this, true);
			return true;
		}
	}
	get value() {
		const link = this.dep.track({
			target: this,
			type: "get",
			key: "value"
		});
		refreshComputed(this);
		if (link) link.version = this.dep.version;
		return this._value;
	}
	set value(newValue) {
		if (this.setter) this.setter(newValue);
		else warn$2("Write operation failed: computed value is readonly");
	}
};
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
	let getter;
	let setter;
	if (isFunction(getterOrOptions)) getter = getterOrOptions;
	else {
		getter = getterOrOptions.get;
		setter = getterOrOptions.set;
	}
	const cRef = new ComputedRefImpl(getter, setter, isSSR);
	if (debugOptions && !isSSR) {
		cRef.onTrack = debugOptions.onTrack;
		cRef.onTrigger = debugOptions.onTrigger;
	}
	return cRef;
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
	if (owner) {
		let cleanups = cleanupMap.get(owner);
		if (!cleanups) cleanupMap.set(owner, cleanups = []);
		cleanups.push(cleanupFn);
	} else if (!failSilently) warn$2(`onWatcherCleanup() was called when there was no active watcher to associate with.`);
}
function watch$1(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, once, scheduler, augmentJob, call } = options;
	const warnInvalidSource = (s) => {
		(options.onWarn || warn$2)(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
	};
	const reactiveGetter = (source2) => {
		if (deep) return source2;
		if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0) return traverse$1(source2, 1);
		return traverse$1(source2);
	};
	let effect;
	let getter;
	let cleanup;
	let boundCleanup;
	let forceTrigger = false;
	let isMultiSource = false;
	if (/* @__PURE__ */ isRef(source)) {
		getter = () => source.value;
		forceTrigger = /* @__PURE__ */ isShallow(source);
	} else if (/* @__PURE__ */ isReactive(source)) {
		getter = () => reactiveGetter(source);
		forceTrigger = true;
	} else if (isArray$3(source)) {
		isMultiSource = true;
		forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
		getter = () => source.map((s) => {
			if (/* @__PURE__ */ isRef(s)) return s.value;
			else if (/* @__PURE__ */ isReactive(s)) return reactiveGetter(s);
			else if (isFunction(s)) return call ? call(s, 2) : s();
			else warnInvalidSource(s);
		});
	} else if (isFunction(source)) {
		if (cb) getter = call ? () => call(source, 2) : source;
		else getter = () => {
			if (cleanup) {
				pauseTracking();
				try {
					cleanup();
				} finally {
					resetTracking();
				}
			}
			const currentEffect = activeWatcher;
			activeWatcher = effect;
			try {
				return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
			} finally {
				activeWatcher = currentEffect;
			}
		};
	} else {
		getter = NOOP;
		warnInvalidSource(source);
	}
	if (cb && deep) {
		const baseGetter = getter;
		const depth = deep === true ? Infinity : deep;
		getter = () => traverse$1(baseGetter(), depth);
	}
	const scope = getCurrentScope();
	const watchHandle = () => {
		effect.stop();
		if (scope && scope.active) remove(scope.effects, effect);
	};
	if (once && cb) {
		const _cb = cb;
		cb = (...args) => {
			const res = _cb(...args);
			watchHandle();
			return res;
		};
	}
	let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
	const job = (immediateFirstRun) => {
		if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
		if (cb) {
			const newValue = effect.run();
			if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
				if (cleanup) cleanup();
				const currentWatcher = activeWatcher;
				activeWatcher = effect;
				try {
					const args = [
						newValue,
						oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
						boundCleanup
					];
					oldValue = newValue;
					call ? call(cb, 3, args) : cb(...args);
				} finally {
					activeWatcher = currentWatcher;
				}
			}
		} else effect.run();
	};
	if (augmentJob) augmentJob(job);
	effect = new ReactiveEffect(getter);
	effect.scheduler = scheduler ? () => scheduler(job, false) : job;
	boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
	cleanup = effect.onStop = () => {
		const cleanups = cleanupMap.get(effect);
		if (cleanups) {
			if (call) call(cleanups, 4);
			else for (const cleanup2 of cleanups) cleanup2();
			cleanupMap.delete(effect);
		}
	};
	effect.onTrack = options.onTrack;
	effect.onTrigger = options.onTrigger;
	if (cb) {
		if (immediate) job(true);
		else oldValue = effect.run();
	} else if (scheduler) scheduler(job.bind(null, true), true);
	else effect.run();
	watchHandle.pause = effect.pause.bind(effect);
	watchHandle.resume = effect.resume.bind(effect);
	watchHandle.stop = watchHandle;
	return watchHandle;
}
function traverse$1(value, depth = Infinity, seen) {
	if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) return value;
	seen = seen || /* @__PURE__ */ new Map();
	if ((seen.get(value) || 0) >= depth) return value;
	seen.set(value, depth);
	depth--;
	if (/* @__PURE__ */ isRef(value)) traverse$1(value.value, depth, seen);
	else if (isArray$3(value)) for (let i = 0; i < value.length; i++) traverse$1(value[i], depth, seen);
	else if (isSet$1(value) || isMap$1(value)) value.forEach((v) => {
		traverse$1(v, depth, seen);
	});
	else if (isPlainObject$3(value)) {
		for (const key in value) traverse$1(value[key], depth, seen);
		for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse$1(value[key], depth, seen);
	}
	return value;
}
//#endregion
//#region node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
/**
* @vue/runtime-core v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var stack = [];
function pushWarningContext(vnode) {
	stack.push(vnode);
}
function popWarningContext() {
	stack.pop();
}
var isWarning = false;
function warn$1(msg, ...args) {
	if (isWarning) return;
	isWarning = true;
	pauseTracking();
	const instance = stack.length ? stack[stack.length - 1].component : null;
	const appWarnHandler = instance && instance.appContext.config.warnHandler;
	const trace = getComponentTrace();
	if (appWarnHandler) callWithErrorHandling(appWarnHandler, instance, 11, [
		msg + args.map((a) => {
			var _a, _b;
			return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
		}).join(""),
		instance && instance.proxy,
		trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
		trace
	]);
	else {
		const warnArgs = [`[Vue warn]: ${msg}`, ...args];
		if (trace.length && true) warnArgs.push(`
`, ...formatTrace(trace));
		console.warn(...warnArgs);
	}
	resetTracking();
	isWarning = false;
}
function getComponentTrace() {
	let currentVNode = stack[stack.length - 1];
	if (!currentVNode) return [];
	const normalizedStack = [];
	while (currentVNode) {
		const last = normalizedStack[0];
		if (last && last.vnode === currentVNode) last.recurseCount++;
		else normalizedStack.push({
			vnode: currentVNode,
			recurseCount: 0
		});
		const parentInstance = currentVNode.component && currentVNode.component.parent;
		currentVNode = parentInstance && parentInstance.vnode;
	}
	return normalizedStack;
}
function formatTrace(trace) {
	const logs = [];
	trace.forEach((entry, i) => {
		logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
	});
	return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
	const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
	const isRoot = vnode.component ? vnode.component.parent == null : false;
	const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
	const close = `>` + postfix;
	return vnode.props ? [
		open,
		...formatProps(vnode.props),
		close
	] : [open + close];
}
function formatProps(props) {
	const res = [];
	const keys = Object.keys(props);
	keys.slice(0, 3).forEach((key) => {
		res.push(...formatProp(key, props[key]));
	});
	if (keys.length > 3) res.push(` ...`);
	return res;
}
function formatProp(key, value, raw) {
	if (isString$2(value)) {
		value = JSON.stringify(value);
		return raw ? value : [`${key}=${value}`];
	} else if (typeof value === "number" || typeof value === "boolean" || value == null) return raw ? value : [`${key}=${value}`];
	else if (/* @__PURE__ */ isRef(value)) {
		value = formatProp(key, /* @__PURE__ */ toRaw(value.value), true);
		return raw ? value : [
			`${key}=Ref<`,
			value,
			`>`
		];
	} else if (isFunction(value)) return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
	else {
		value = /* @__PURE__ */ toRaw(value);
		return raw ? value : [`${key}=`, value];
	}
}
function assertNumber(val, type) {
	if (val === void 0) return;
	else if (typeof val !== "number") warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
	else if (isNaN(val)) warn$1(`${type} is NaN - the duration expression might be incorrect.`);
}
var ErrorTypeStrings$1 = {
	["sp"]: "serverPrefetch hook",
	["bc"]: "beforeCreate hook",
	["c"]: "created hook",
	["bm"]: "beforeMount hook",
	["m"]: "mounted hook",
	["bu"]: "beforeUpdate hook",
	["u"]: "updated",
	["bum"]: "beforeUnmount hook",
	["um"]: "unmounted hook",
	["a"]: "activated hook",
	["da"]: "deactivated hook",
	["ec"]: "errorCaptured hook",
	["rtc"]: "renderTracked hook",
	["rtg"]: "renderTriggered hook",
	[0]: "setup function",
	[1]: "render function",
	[2]: "watcher getter",
	[3]: "watcher callback",
	[4]: "watcher cleanup function",
	[5]: "native event handler",
	[6]: "component event handler",
	[7]: "vnode hook",
	[8]: "directive hook",
	[9]: "transition hook",
	[10]: "app errorHandler",
	[11]: "app warnHandler",
	[12]: "ref function",
	[13]: "async component loader",
	[14]: "scheduler flush",
	[15]: "component update",
	[16]: "app unmount cleanup function"
};
function callWithErrorHandling(fn, instance, type, args) {
	try {
		return args ? fn(...args) : fn();
	} catch (err) {
		handleError(err, instance, type);
	}
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
	if (isFunction(fn)) {
		const res = callWithErrorHandling(fn, instance, type, args);
		if (res && isPromise(res)) res.catch((err) => {
			handleError(err, instance, type);
		});
		return res;
	}
	if (isArray$3(fn)) {
		const values = [];
		for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
		return values;
	} else warn$1(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
}
function handleError(err, instance, type, throwInDev = true) {
	const contextVNode = instance ? instance.vnode : null;
	const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
	if (instance) {
		let cur = instance.parent;
		const exposedInstance = instance.proxy;
		const errorInfo = ErrorTypeStrings$1[type];
		while (cur) {
			const errorCapturedHooks = cur.ec;
			if (errorCapturedHooks) {
				for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
			}
			cur = cur.parent;
		}
		if (errorHandler) {
			pauseTracking();
			callWithErrorHandling(errorHandler, null, 10, [
				err,
				exposedInstance,
				errorInfo
			]);
			resetTracking();
			return;
		}
	}
	logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
	{
		const info = ErrorTypeStrings$1[type];
		if (contextVNode) pushWarningContext(contextVNode);
		warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
		if (contextVNode) popWarningContext();
		if (throwInDev) throw err;
		else console.error(err);
	}
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
function nextTick(fn) {
	const p = currentFlushPromise || resolvedPromise;
	return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex$1(id) {
	let start = flushIndex + 1;
	let end = queue.length;
	while (start < end) {
		const middle = start + end >>> 1;
		const middleJob = queue[middle];
		const middleJobId = getId(middleJob);
		if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
		else end = middle;
	}
	return start;
}
function queueJob(job) {
	if (!(job.flags & 1)) {
		const jobId = getId(job);
		const lastJob = queue[queue.length - 1];
		if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
		else queue.splice(findInsertionIndex$1(jobId), 0, job);
		job.flags |= 1;
		queueFlush();
	}
}
function queueFlush() {
	if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
}
function queuePostFlushCb(cb) {
	if (!isArray$3(cb)) {
		if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
		else if (!(cb.flags & 1)) {
			pendingPostFlushCbs.push(cb);
			cb.flags |= 1;
		}
	} else for (let i = 0; i < cb.length; i++) pendingPostFlushCbs.push(cb[i]);
	queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
	seen = seen || /* @__PURE__ */ new Map();
	for (; i < queue.length; i++) {
		const cb = queue[i];
		if (cb && cb.flags & 2) {
			if (instance && cb.id !== instance.uid) continue;
			if (checkRecursiveUpdates(seen, cb)) continue;
			queue.splice(i, 1);
			i--;
			if (cb.flags & 4) cb.flags &= -2;
			cb();
			if (!(cb.flags & 4)) cb.flags &= -2;
		}
	}
}
function flushPostFlushCbs(seen) {
	if (pendingPostFlushCbs.length) {
		const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
		pendingPostFlushCbs.length = 0;
		if (activePostFlushCbs) {
			for (let i = 0; i < deduped.length; i++) activePostFlushCbs.push(deduped[i]);
			return;
		}
		activePostFlushCbs = deduped;
		seen = seen || /* @__PURE__ */ new Map();
		for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
			const cb = activePostFlushCbs[postFlushIndex];
			if (checkRecursiveUpdates(seen, cb)) continue;
			if (cb.flags & 4) cb.flags &= -2;
			if (!(cb.flags & 8)) cb();
			cb.flags &= -2;
		}
		activePostFlushCbs = null;
		postFlushIndex = 0;
	}
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
	seen = seen || /* @__PURE__ */ new Map();
	const check = (job) => checkRecursiveUpdates(seen, job);
	try {
		for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job && !(job.flags & 8)) {
				if (check(job)) continue;
				if (job.flags & 4) job.flags &= -2;
				callWithErrorHandling(job, job.i, job.i ? 15 : 14);
				if (!(job.flags & 4)) job.flags &= -2;
			}
		}
	} finally {
		for (; flushIndex < queue.length; flushIndex++) {
			const job = queue[flushIndex];
			if (job) job.flags &= -2;
		}
		flushIndex = -1;
		queue.length = 0;
		flushPostFlushCbs(seen);
		currentFlushPromise = null;
		if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
	}
}
function checkRecursiveUpdates(seen, fn) {
	const count = seen.get(fn) || 0;
	if (count > RECURSION_LIMIT) {
		const instance = fn.i;
		const componentName = instance && getComponentName(instance.type);
		handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
		return true;
	}
	seen.set(fn, count + 1);
	return false;
}
var isHmrUpdating = false;
var setHmrUpdating = (v) => {
	try {
		return isHmrUpdating;
	} finally {
		isHmrUpdating = v;
	}
};
var hmrDirtyComponents = /* @__PURE__ */ new Map();
getGlobalThis().__VUE_HMR_RUNTIME__ = {
	createRecord: tryWrap(createRecord),
	rerender: tryWrap(rerender),
	reload: tryWrap(reload)
};
var map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
	const id = instance.type.__hmrId;
	let record = map.get(id);
	if (!record) {
		createRecord(id, instance.type);
		record = map.get(id);
	}
	record.instances.add(instance);
}
function unregisterHMR(instance) {
	map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
	if (map.has(id)) return false;
	map.set(id, {
		initialDef: normalizeClassComponent(initialDef),
		instances: /* @__PURE__ */ new Set()
	});
	return true;
}
function normalizeClassComponent(component) {
	return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
	const record = map.get(id);
	if (!record) return;
	record.initialDef.render = newRender;
	[...record.instances].forEach((instance) => {
		if (newRender) {
			instance.render = newRender;
			normalizeClassComponent(instance.type).render = newRender;
		}
		instance.renderCache = [];
		isHmrUpdating = true;
		if (!(instance.job.flags & 8)) instance.update();
		isHmrUpdating = false;
	});
}
function reload(id, newComp) {
	const record = map.get(id);
	if (!record) return;
	newComp = normalizeClassComponent(newComp);
	updateComponentDef(record.initialDef, newComp);
	const instances = [...record.instances];
	for (let i = 0; i < instances.length; i++) {
		const instance = instances[i];
		const oldComp = normalizeClassComponent(instance.type);
		let dirtyInstances = hmrDirtyComponents.get(oldComp);
		if (!dirtyInstances) {
			if (oldComp !== record.initialDef) updateComponentDef(oldComp, newComp);
			hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set());
		}
		dirtyInstances.add(instance);
		instance.appContext.propsCache.delete(instance.type);
		instance.appContext.emitsCache.delete(instance.type);
		instance.appContext.optionsCache.delete(instance.type);
		if (instance.ceReload) {
			dirtyInstances.add(instance);
			instance.ceReload(newComp.styles);
			dirtyInstances.delete(instance);
		} else if (instance.parent) queueJob(() => {
			if (!(instance.job.flags & 8)) {
				isHmrUpdating = true;
				instance.parent.update();
				isHmrUpdating = false;
				dirtyInstances.delete(instance);
			}
		});
		else if (instance.appContext.reload) instance.appContext.reload();
		else if (typeof window !== "undefined") window.location.reload();
		else console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
		if (instance.root.ce && instance !== instance.root) instance.root.ce._removeChildStyle(oldComp);
	}
	queuePostFlushCb(() => {
		hmrDirtyComponents.clear();
	});
}
function updateComponentDef(oldComp, newComp) {
	extend(oldComp, newComp);
	for (const key in oldComp) if (key !== "__file" && !(key in newComp)) delete oldComp[key];
}
function tryWrap(fn) {
	return (id, arg) => {
		try {
			return fn(id, arg);
		} catch (e) {
			console.error(e);
			console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
		}
	};
}
var devtools$1;
var buffer = [];
var devtoolsNotInstalled = false;
function emit$1(event, ...args) {
	if (devtools$1) devtools$1.emit(event, ...args);
	else if (!devtoolsNotInstalled) buffer.push({
		event,
		args
	});
}
function setDevtoolsHook$1(hook, target) {
	var _a, _b;
	devtools$1 = hook;
	if (devtools$1) {
		devtools$1.enabled = true;
		buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
		buffer = [];
	} else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))) {
		(target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((newHook) => {
			setDevtoolsHook$1(newHook, target);
		});
		setTimeout(() => {
			if (!devtools$1) {
				target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
				devtoolsNotInstalled = true;
				buffer = [];
			}
		}, 3e3);
	} else {
		devtoolsNotInstalled = true;
		buffer = [];
	}
}
function devtoolsInitApp(app, version) {
	emit$1("app:init", app, version, {
		Fragment,
		Text,
		Comment,
		Static
	});
}
function devtoolsUnmountApp(app) {
	emit$1("app:unmount", app);
}
var devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
var devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
var _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
var devtoolsComponentRemoved = (component) => {
	if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && !devtools$1.cleanupBuffer(component)) _devtoolsComponentRemoved(component);
};
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
	return (component) => {
		emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : void 0, component);
	};
}
var devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
var devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
function createDevtoolsPerformanceHook(hook) {
	return (component, type, time) => {
		emit$1(hook, component.appContext.app, component.uid, component, type, time);
	};
}
function devtoolsComponentEmit(component, event, params) {
	emit$1("component:emit", component.appContext.app, component, event, params);
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
	const prev = currentRenderingInstance;
	currentRenderingInstance = instance;
	currentScopeId = instance && instance.type.__scopeId || null;
	return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
	if (!ctx) return fn;
	if (fn._n) return fn;
	const renderFnWithContext = (...args) => {
		if (renderFnWithContext._d) setBlockTracking(-1);
		const prevInstance = setCurrentRenderingInstance(ctx);
		const prevStackSize = blockStack.length;
		let res;
		try {
			res = fn(...args);
		} finally {
			for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
			setCurrentRenderingInstance(prevInstance);
			if (renderFnWithContext._d) setBlockTracking(1);
		}
		devtoolsComponentUpdated(ctx);
		return res;
	};
	renderFnWithContext._n = true;
	renderFnWithContext._c = true;
	renderFnWithContext._d = true;
	return renderFnWithContext;
}
function validateDirectiveName(name) {
	if (isBuiltInDirective(name)) warn$1("Do not use built-in directive ids as custom directive id: " + name);
}
function withDirectives(vnode, directives) {
	if (currentRenderingInstance === null) {
		warn$1(`withDirectives can only be used inside render functions.`);
		return vnode;
	}
	const instance = getComponentPublicInstance(currentRenderingInstance);
	const bindings = vnode.dirs || (vnode.dirs = []);
	for (let i = 0; i < directives.length; i++) {
		let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
		if (dir) {
			if (isFunction(dir)) dir = {
				mounted: dir,
				updated: dir
			};
			if (dir.deep) traverse$1(value);
			bindings.push({
				dir,
				instance,
				value,
				oldValue: void 0,
				arg,
				modifiers
			});
		}
	}
	return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
	const bindings = vnode.dirs;
	const oldBindings = prevVNode && prevVNode.dirs;
	for (let i = 0; i < bindings.length; i++) {
		const binding = bindings[i];
		if (oldBindings) binding.oldValue = oldBindings[i].value;
		let hook = binding.dir[name];
		if (hook) {
			pauseTracking();
			callWithAsyncErrorHandling(hook, instance, 8, [
				vnode.el,
				binding,
				vnode,
				prevVNode
			]);
			resetTracking();
		}
	}
}
function provide(key, value) {
	if (!currentInstance || currentInstance.isMounted) warn$1(`provide() can only be used inside setup().`);
	if (currentInstance) {
		let provides = currentInstance.provides;
		const parentProvides = currentInstance.parent && currentInstance.parent.provides;
		if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
		provides[key] = value;
	}
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
	const instance = getCurrentInstance();
	if (instance || currentApp) {
		let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
		if (provides && key in provides) return provides[key];
		else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
		else warn$1(`injection "${String(key)}" not found.`);
	} else warn$1(`inject() can only be used inside setup() or functional components.`);
}
function hasInjectionContext() {
	return !!(getCurrentInstance() || currentApp);
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = () => {
	{
		const ctx = inject(ssrContextKey);
		if (!ctx) warn$1(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
		return ctx;
	}
};
function watchEffect(effect, options) {
	return doWatch(effect, null, options);
}
function watch(source, cb, options) {
	if (!isFunction(cb)) warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
	return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
	const { immediate, deep, flush, once } = options;
	if (!cb) {
		if (immediate !== void 0) warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
		if (deep !== void 0) warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
		if (once !== void 0) warn$1(`watch() "once" option is only respected when using the watch(source, callback, options?) signature.`);
	}
	const baseWatchOptions = extend({}, options);
	baseWatchOptions.onWarn = warn$1;
	const runsImmediately = cb && immediate || !cb && flush !== "post";
	let ssrCleanup;
	if (isInSSRComponentSetup) {
		if (flush === "sync") {
			const ctx = useSSRContext();
			ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
		} else if (!runsImmediately) {
			const watchStopHandle = () => {};
			watchStopHandle.stop = NOOP;
			watchStopHandle.resume = NOOP;
			watchStopHandle.pause = NOOP;
			return watchStopHandle;
		}
	}
	const instance = currentInstance;
	baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
	let isPre = false;
	if (flush === "post") baseWatchOptions.scheduler = (job) => {
		queuePostRenderEffect(job, instance && instance.suspense);
	};
	else if (flush !== "sync") {
		isPre = true;
		baseWatchOptions.scheduler = (job, isFirstRun) => {
			if (isFirstRun) job();
			else queueJob(job);
		};
	}
	baseWatchOptions.augmentJob = (job) => {
		if (cb) job.flags |= 4;
		if (isPre) {
			job.flags |= 2;
			if (instance) {
				job.id = instance.uid;
				job.i = instance;
			}
		}
	};
	const watchHandle = watch$1(source, cb, baseWatchOptions);
	if (isInSSRComponentSetup) {
		if (ssrCleanup) ssrCleanup.push(watchHandle);
		else if (runsImmediately) watchHandle();
	}
	return watchHandle;
}
function instanceWatch(source, value, options) {
	const publicThis = this.proxy;
	const getter = isString$2(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
	let cb;
	if (isFunction(value)) cb = value;
	else {
		cb = value.handler;
		options = value;
	}
	const reset = setCurrentInstance(this);
	const res = doWatch(getter, cb.bind(publicThis), options);
	reset();
	return res;
}
function createPathGetter(ctx, path) {
	const segments = path.split(".");
	return () => {
		let cur = ctx;
		for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
		return cur;
	};
}
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
var enterCbKey$1 = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
	const state = {
		isMounted: false,
		isLeaving: false,
		isUnmounting: false,
		leavingVNodes: /* @__PURE__ */ new Map()
	};
	onMounted(() => {
		state.isMounted = true;
	});
	onBeforeUnmount(() => {
		state.isUnmounting = true;
	});
	return state;
}
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
	mode: String,
	appear: Boolean,
	persisted: Boolean,
	onBeforeEnter: TransitionHookValidator,
	onEnter: TransitionHookValidator,
	onAfterEnter: TransitionHookValidator,
	onEnterCancelled: TransitionHookValidator,
	onBeforeLeave: TransitionHookValidator,
	onLeave: TransitionHookValidator,
	onAfterLeave: TransitionHookValidator,
	onLeaveCancelled: TransitionHookValidator,
	onBeforeAppear: TransitionHookValidator,
	onAppear: TransitionHookValidator,
	onAfterAppear: TransitionHookValidator,
	onAppearCancelled: TransitionHookValidator
};
var recursiveGetSubtree = (instance) => {
	const subTree = instance.subTree;
	return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
var BaseTransitionImpl = {
	name: `BaseTransition`,
	props: BaseTransitionPropsValidators,
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		return () => {
			const children = slots.default && getTransitionRawChildren(slots.default(), true);
			const child = children && children.length ? findNonCommentChild(children) : instance.subTree ? createCommentVNode() : void 0;
			if (!child) return;
			const rawProps = /* @__PURE__ */ toRaw(props);
			const { mode } = rawProps;
			if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") warn$1(`invalid <transition> mode: ${mode}`);
			if (state.isLeaving) return emptyPlaceholder(child);
			const innerChild = getInnerChild$1(child);
			if (!innerChild) return emptyPlaceholder(child);
			let enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance, (hooks) => enterHooks = hooks);
			if (innerChild.type !== Comment) setTransitionHooks(innerChild, enterHooks);
			let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
			if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
				let leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
				setTransitionHooks(oldInnerChild, leavingHooks);
				if (mode === "out-in" && innerChild.type !== Comment) {
					state.isLeaving = true;
					leavingHooks.afterLeave = () => {
						state.isLeaving = false;
						if (!(instance.job.flags & 8)) instance.update();
						delete leavingHooks.afterLeave;
						oldInnerChild = void 0;
					};
					return emptyPlaceholder(child);
				} else if (mode === "in-out" && innerChild.type !== Comment) leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
					const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
					leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
					el[leaveCbKey] = () => {
						earlyRemove();
						el[leaveCbKey] = void 0;
						delete enterHooks.delayedLeave;
						oldInnerChild = void 0;
					};
					enterHooks.delayedLeave = () => {
						delayedLeave();
						delete enterHooks.delayedLeave;
						oldInnerChild = void 0;
					};
				};
				else oldInnerChild = void 0;
			} else if (oldInnerChild) oldInnerChild = void 0;
			return child;
		};
	}
};
function findNonCommentChild(children) {
	let child = children[0];
	if (children.length > 1) {
		let hasFound = false;
		for (const c of children) if (c.type !== Comment) {
			if (hasFound) {
				warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
				break;
			}
			child = c;
			hasFound = true;
		}
	}
	return child;
}
var BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
	const { leavingVNodes } = state;
	let leavingVNodesCache = leavingVNodes.get(vnode.type);
	if (!leavingVNodesCache) {
		leavingVNodesCache = /* @__PURE__ */ Object.create(null);
		leavingVNodes.set(vnode.type, leavingVNodesCache);
	}
	return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
	const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
	const key = String(vnode.key);
	const leavingVNodesCache = getLeavingNodesForType(state, vnode);
	const callHook = (hook, args) => {
		hook && callWithAsyncErrorHandling(hook, instance, 9, args);
	};
	const callAsyncHook = (hook, args) => {
		const done = args[1];
		callHook(hook, args);
		if (isArray$3(hook)) {
			if (hook.every((hook2) => hook2.length <= 1)) done();
		} else if (hook.length <= 1) done();
	};
	const hooks = {
		mode,
		persisted,
		beforeEnter(el) {
			let hook = onBeforeEnter;
			if (!state.isMounted) {
				if (appear) hook = onBeforeAppear || onBeforeEnter;
				else return;
			}
			if (el[leaveCbKey]) el[leaveCbKey](true);
			const leavingVNode = leavingVNodesCache[key];
			if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) leavingVNode.el[leaveCbKey]();
			callHook(hook, [el]);
		},
		enter(el) {
			if (!isHmrUpdating && leavingVNodesCache[key] === vnode) return;
			let hook = onEnter;
			let afterHook = onAfterEnter;
			let cancelHook = onEnterCancelled;
			if (!state.isMounted) {
				if (appear) {
					hook = onAppear || onEnter;
					afterHook = onAfterAppear || onAfterEnter;
					cancelHook = onAppearCancelled || onEnterCancelled;
				} else return;
			}
			let called = false;
			el[enterCbKey$1] = (cancelled) => {
				if (called) return;
				called = true;
				if (cancelled) callHook(cancelHook, [el]);
				else callHook(afterHook, [el]);
				if (hooks.delayedLeave) hooks.delayedLeave();
				el[enterCbKey$1] = void 0;
			};
			const done = el[enterCbKey$1].bind(null, false);
			if (hook) callAsyncHook(hook, [el, done]);
			else done();
		},
		leave(el, remove) {
			const key2 = String(vnode.key);
			if (el[enterCbKey$1]) el[enterCbKey$1](true);
			if (state.isUnmounting) return remove();
			callHook(onBeforeLeave, [el]);
			let called = false;
			el[leaveCbKey] = (cancelled) => {
				if (called) return;
				called = true;
				remove();
				if (cancelled) callHook(onLeaveCancelled, [el]);
				else callHook(onAfterLeave, [el]);
				el[leaveCbKey] = void 0;
				if (leavingVNodesCache[key2] === vnode) delete leavingVNodesCache[key2];
			};
			const done = el[leaveCbKey].bind(null, false);
			leavingVNodesCache[key2] = vnode;
			if (onLeave) callAsyncHook(onLeave, [el, done]);
			else done();
		},
		clone(vnode2) {
			const hooks2 = resolveTransitionHooks(vnode2, props, state, instance, postClone);
			if (postClone) postClone(hooks2);
			return hooks2;
		}
	};
	return hooks;
}
function emptyPlaceholder(vnode) {
	if (isKeepAlive(vnode)) {
		vnode = cloneVNode(vnode);
		vnode.children = null;
		return vnode;
	}
}
function getInnerChild$1(vnode) {
	if (!isKeepAlive(vnode)) {
		if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
		return vnode;
	}
	if (vnode.component) return vnode.component.subTree;
	const { shapeFlag, children } = vnode;
	if (children) {
		if (shapeFlag & 16) return children[0];
		if (shapeFlag & 32 && isFunction(children.default)) return children.default();
	}
}
function setTransitionHooks(vnode, hooks) {
	if (vnode.shapeFlag & 6 && vnode.component) {
		vnode.transition = hooks;
		const subTree = vnode.component.subTree;
		setTransitionHooks(isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree, hooks);
	} else if (vnode.shapeFlag & 128) {
		vnode.ssContent.transition = hooks.clone(vnode.ssContent);
		vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
	} else vnode.transition = hooks;
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
	let ret = [];
	let keyedFragmentCount = 0;
	for (let i = 0; i < children.length; i++) {
		let child = children[i];
		const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
		if (child.type === Fragment) {
			if (child.patchFlag & 128) keyedFragmentCount++;
			ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
		} else if (keepComment || child.type !== Comment) ret.push(key != null ? cloneVNode(child, { key }) : child);
	}
	if (keyedFragmentCount > 1) for (let i = 0; i < ret.length; i++) ret[i].patchFlag = -2;
	return ret;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
	return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
function useId() {
	const i = getCurrentInstance();
	if (i) return (i.appContext.config.idPrefix || "v") + "-" + i.ids[0] + i.ids[1]++;
	else warn$1(`useId() is called when there is no active component instance to be associated with.`);
	return "";
}
function markAsyncBoundary(instance) {
	instance.ids = [
		instance.ids[0] + instance.ids[2]++ + "-",
		0,
		0
	];
}
var knownTemplateRefs = /* @__PURE__ */ new WeakSet();
function useTemplateRef(key) {
	const i = getCurrentInstance();
	const r = /* @__PURE__ */ shallowRef(null);
	if (i) {
		const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
		if (isTemplateRefKey(refs, key)) warn$1(`useTemplateRef('${key}') already exists.`);
		else Object.defineProperty(refs, key, {
			enumerable: true,
			get: () => r.value,
			set: (val) => r.value = val
		});
	} else warn$1(`useTemplateRef() is called when there is no active component instance to be associated with.`);
	const ret = /* @__PURE__ */ readonly(r);
	knownTemplateRefs.add(ret);
	return ret;
}
function isTemplateRefKey(refs, key) {
	let desc;
	return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
	if (isArray$3(rawRef)) {
		rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$3(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
		return;
	}
	if (isAsyncWrapper(vnode) && !isUnmount) {
		if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
		return;
	}
	const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
	const value = isUnmount ? null : refValue;
	const { i: owner, r: ref } = rawRef;
	if (!owner) {
		warn$1(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
		return;
	}
	const oldRef = oldRawRef && oldRawRef.r;
	const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
	const setupState = owner.setupState;
	const rawSetupState = /* @__PURE__ */ toRaw(setupState);
	const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
		if (hasOwn(rawSetupState, key) && !/* @__PURE__ */ isRef(rawSetupState[key])) warn$1(`Template ref "${key}" used on a non-ref value. It will not work in the production build.`);
		if (knownTemplateRefs.has(rawSetupState[key])) return false;
		if (isTemplateRefKey(refs, key)) return false;
		return hasOwn(rawSetupState, key);
	};
	const canSetRef = (ref2, key) => {
		if (knownTemplateRefs.has(ref2)) return false;
		if (key && isTemplateRefKey(refs, key)) return false;
		return true;
	};
	if (oldRef != null && oldRef !== ref) {
		invalidatePendingSetRef(oldRawRef);
		if (isString$2(oldRef)) {
			refs[oldRef] = null;
			if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
		} else if (/* @__PURE__ */ isRef(oldRef)) {
			const oldRawRefAtom = oldRawRef;
			if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
			if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
		}
	}
	if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
	else {
		const _isString = isString$2(ref);
		const _isRef = /* @__PURE__ */ isRef(ref);
		if (_isString || _isRef) {
			const doSet = () => {
				if (rawRef.f) {
					const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
					if (isUnmount) isArray$3(existing) && remove(existing, refValue);
					else if (!isArray$3(existing)) {
						if (_isString) {
							refs[ref] = [refValue];
							if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
						} else {
							const newVal = [refValue];
							if (canSetRef(ref, rawRef.k)) ref.value = newVal;
							if (rawRef.k) refs[rawRef.k] = newVal;
						}
					} else if (!existing.includes(refValue)) existing.push(refValue);
				} else if (_isString) {
					refs[ref] = value;
					if (canSetSetupRef(ref)) setupState[ref] = value;
				} else if (_isRef) {
					if (canSetRef(ref, rawRef.k)) ref.value = value;
					if (rawRef.k) refs[rawRef.k] = value;
				} else warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
			};
			if (value) {
				const job = () => {
					doSet();
					pendingSetRefMap.delete(rawRef);
				};
				job.id = -1;
				pendingSetRefMap.set(rawRef, job);
				queuePostRenderEffect(job, parentSuspense);
			} else {
				invalidatePendingSetRef(rawRef);
				doSet();
			}
		} else warn$1("Invalid template ref type:", ref, `(${typeof ref})`);
	}
}
function invalidatePendingSetRef(rawRef) {
	const pendingSetRef = pendingSetRefMap.get(rawRef);
	if (pendingSetRef) {
		pendingSetRef.flags |= 8;
		pendingSetRefMap.delete(rawRef);
	}
}
var hasLoggedMismatchError = false;
var logMismatchError = () => {
	if (hasLoggedMismatchError) return;
	console.error("Hydration completed but contains mismatches.");
	hasLoggedMismatchError = true;
};
var isSVGContainer = (container) => container.namespaceURI.includes("svg") && container.tagName !== "foreignObject";
var isMathMLContainer = (container) => container.namespaceURI.includes("MathML");
var getContainerType = (container) => {
	if (container.nodeType !== 1) return void 0;
	if (isSVGContainer(container)) return "svg";
	if (isMathMLContainer(container)) return "mathml";
};
var isComment = (node) => node.nodeType === 8;
function createHydrationFunctions(rendererInternals) {
	const { mt: mountComponent, p: patch, o: { patchProp, createText, nextSibling, parentNode, remove, insert, createComment } } = rendererInternals;
	const hydrate = (vnode, container) => {
		if (!container.hasChildNodes()) {
			warn$1(`Attempting to hydrate existing markup but container is empty. Performing full mount instead.`);
			patch(null, vnode, container);
			flushPostFlushCbs();
			container._vnode = vnode;
			return;
		}
		hydrateNode(container.firstChild, vnode, null, null, null);
		flushPostFlushCbs();
		container._vnode = vnode;
	};
	const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
		optimized = optimized || !!vnode.dynamicChildren;
		const isFragmentStart = isComment(node) && node.data === "[";
		const onMismatch = () => handleMismatch(node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragmentStart);
		const { type, ref, shapeFlag, patchFlag } = vnode;
		let domType = node.nodeType;
		vnode.el = node;
		def(node, "__vnode", vnode, true);
		def(node, "__vueParentComponent", parentComponent, true);
		if (patchFlag === -2) {
			optimized = false;
			vnode.dynamicChildren = null;
		}
		let nextNode = null;
		switch (type) {
			case Text:
				if (domType !== 3) {
					if (vnode.children === "") {
						insert(vnode.el = createText(""), parentNode(node), node);
						nextNode = node;
					} else nextNode = onMismatch();
				} else {
					if (node.data !== vnode.children) {
						warn$1(`Hydration text mismatch in`, node.parentNode, `
  - rendered on server: ${JSON.stringify(node.data)}
  - expected on client: ${JSON.stringify(vnode.children)}`);
						logMismatchError();
						node.data = vnode.children;
					}
					nextNode = nextSibling(node);
				}
				break;
			case Comment:
				if (isTemplateNode(node)) {
					nextNode = nextSibling(node);
					replaceNode(vnode.el = node.content.firstChild, node, parentComponent);
				} else if (domType !== 8 || isFragmentStart) nextNode = onMismatch();
				else nextNode = nextSibling(node);
				break;
			case Static:
				if (isFragmentStart) {
					node = nextSibling(node);
					domType = node.nodeType;
				}
				if (domType === 1 || domType === 3) {
					nextNode = node;
					const needToAdoptContent = !vnode.children.length;
					for (let i = 0; i < vnode.staticCount; i++) {
						if (needToAdoptContent) vnode.children += nextNode.nodeType === 1 ? nextNode.outerHTML : nextNode.data;
						if (i === vnode.staticCount - 1) vnode.anchor = nextNode;
						nextNode = nextSibling(nextNode);
					}
					return isFragmentStart ? nextSibling(nextNode) : nextNode;
				} else onMismatch();
				break;
			case Fragment:
				if (!isFragmentStart) nextNode = onMismatch();
				else nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
				break;
			default: if (shapeFlag & 1) {
				if ((domType !== 1 || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) nextNode = onMismatch();
				else nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
			} else if (shapeFlag & 6) {
				vnode.slotScopeIds = slotScopeIds;
				const container = parentNode(node);
				if (isFragmentStart) nextNode = locateClosingAnchor(node);
				else if (isComment(node) && node.data === "teleport start") nextNode = locateClosingAnchor(node, node.data, "teleport end");
				else nextNode = nextSibling(node);
				mountComponent(vnode, container, null, parentComponent, parentSuspense, getContainerType(container), optimized);
				if ((isAsyncWrapper(vnode) || vnode.component.asyncDep) && !vnode.component.subTree) {
					let subTree;
					if (isFragmentStart) {
						subTree = createVNode(Static);
						subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
					} else subTree = node.nodeType === 3 ? createTextVNode("") : createVNode(node.nodeType === 8 ? Comment : "div");
					subTree.el = node;
					vnode.component.subTree = subTree;
				}
			} else if (shapeFlag & 64) {
				if (domType !== 8) nextNode = onMismatch();
				else nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, rendererInternals, hydrateChildren);
			} else if (shapeFlag & 128) nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, getContainerType(parentNode(node)), slotScopeIds, optimized, rendererInternals, hydrateNode);
			else warn$1("Invalid HostVNode type:", type, `(${typeof type})`);
		}
		if (ref != null) setRef(ref, null, parentSuspense, vnode);
		return nextNode;
	};
	const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		optimized = optimized || !!vnode.dynamicChildren;
		const { type, dynamicProps, props, patchFlag, shapeFlag, dirs, transition } = vnode;
		const forcePatch = type === "input" || type === "option";
		{
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
			let needCallTransitionHooks = false;
			if (isTemplateNode(el)) {
				needCallTransitionHooks = needTransition(null, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
				const content = el.content.firstChild;
				if (needCallTransitionHooks) {
					const cls = content.getAttribute("class");
					if (cls) content.$cls = cls;
					transition.beforeEnter(content);
				}
				replaceNode(content, el, parentComponent);
				vnode.el = el = content;
			}
			if (shapeFlag & 16 && !(props && (props.innerHTML || props.textContent))) {
				let next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, slotScopeIds, optimized);
				if (next && !isMismatchAllowed(el, 1)) {
					warn$1(`Hydration children mismatch on`, el, `
Server rendered element contains more child nodes than client vdom.`);
					logMismatchError();
				}
				while (next) {
					const cur = next;
					next = next.nextSibling;
					remove(cur);
				}
			} else if (shapeFlag & 8) {
				let clientText = vnode.children;
				if (clientText[0] === "\n" && (el.tagName === "PRE" || el.tagName === "TEXTAREA")) clientText = clientText.slice(1);
				const { textContent } = el;
				if (textContent !== clientText && textContent !== clientText.replace(/\r\n|\r/g, "\n")) {
					if (!isMismatchAllowed(el, 0)) {
						warn$1(`Hydration text content mismatch on`, el, `
  - rendered on server: ${textContent}
  - expected on client: ${clientText}`);
						logMismatchError();
					}
					el.textContent = vnode.children;
				}
			}
			if (props) {
				const isCustomElement = el.tagName.includes("-");
				const namespace = el.namespaceURI.includes("svg") ? "svg" : el.namespaceURI.includes("MathML") ? "mathml" : void 0;
				for (const key in props) {
					if (!(dirs && dirs.some((d) => d.dir.created)) && propHasMismatch(el, key, props[key], vnode, parentComponent)) logMismatchError();
					if (forcePatch && (key.endsWith("value") || key === "indeterminate") || isOn(key) && !isReservedProp(key) || key[0] === "." || isCustomElement && !isReservedProp(key) || dynamicProps && dynamicProps.includes(key)) {
						if (isUnchangedResourceProp(el, key, props[key])) continue;
						patchProp(el, key, null, props[key], namespace, parentComponent);
					}
				}
			}
			let vnodeHooks;
			if (vnodeHooks = props && props.onVnodeBeforeMount) invokeVNodeHook(vnodeHooks, parentComponent, vnode);
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
			if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) queueEffectWithSuspense(() => {
				vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
				needCallTransitionHooks && transition.enter(el);
				dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
			}, parentSuspense);
		}
		return el.nextSibling;
	};
	const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		optimized = optimized || !!parentVNode.dynamicChildren;
		const children = parentVNode.children;
		const l = children.length;
		let hasCheckedMismatch = false;
		for (let i = 0; i < l; i++) {
			const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
			const isText = vnode.type === Text;
			if (node) {
				if (isText && !optimized) {
					if (i + 1 < l && normalizeVNode(children[i + 1]).type === Text) {
						insert(createText(node.data.slice(vnode.children.length)), container, nextSibling(node));
						node.data = vnode.children;
					}
				}
				node = hydrateNode(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized);
			} else if (isText && !vnode.children) insert(vnode.el = createText(""), container);
			else {
				if (!hasCheckedMismatch) {
					hasCheckedMismatch = true;
					if (!isMismatchAllowed(container, 1)) {
						warn$1(`Hydration children mismatch on`, container, `
Server rendered element contains fewer child nodes than client vdom.`);
						logMismatchError();
					}
				}
				patch(null, vnode, container, null, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
			}
		}
		return node;
	};
	const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
		const { slotScopeIds: fragmentSlotScopeIds } = vnode;
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		const container = parentNode(node);
		const next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, slotScopeIds, optimized);
		if (next && isComment(next) && next.data === "]") return nextSibling(vnode.anchor = next);
		else {
			logMismatchError();
			insert(vnode.anchor = createComment(`]`), container, next);
			return next;
		}
	};
	const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
		if (!isNodeMismatchAllowed(node, vnode)) {
			warn$1(`Hydration node mismatch:
- rendered on server:`, node, node.nodeType === 3 ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``, `
- expected on client:`, vnode.type);
			logMismatchError();
		}
		vnode.el = null;
		if (isFragment) {
			const end = locateClosingAnchor(node);
			while (true) {
				const next2 = nextSibling(node);
				if (next2 && next2 !== end) remove(next2);
				else break;
			}
		}
		const next = nextSibling(node);
		const container = parentNode(node);
		remove(node);
		patch(null, vnode, container, next, parentComponent, parentSuspense, getContainerType(container), slotScopeIds);
		if (parentComponent) {
			parentComponent.vnode.el = vnode.el;
			updateHOCHostEl(parentComponent, vnode.el);
		}
		return next;
	};
	const locateClosingAnchor = (node, open = "[", close = "]") => {
		let match = 0;
		while (node) {
			node = nextSibling(node);
			if (node && isComment(node)) {
				if (node.data === open) match++;
				if (node.data === close) {
					if (match === 0) return nextSibling(node);
					else match--;
				}
			}
		}
		return node;
	};
	const replaceNode = (newNode, oldNode, parentComponent) => {
		const parentNode2 = oldNode.parentNode;
		if (parentNode2) parentNode2.replaceChild(newNode, oldNode);
		let parent = parentComponent;
		while (parent) {
			if (parent.vnode.el === oldNode) parent.vnode.el = parent.subTree.el = newNode;
			parent = parent.parent;
		}
	};
	const isTemplateNode = (node) => {
		return node.nodeType === 1 && node.tagName === "TEMPLATE";
	};
	return [hydrate, hydrateNode];
}
var resourceProps = /* @__PURE__ */ new Set([
	"src",
	"srcset",
	"href",
	"poster"
]);
function isUnchangedResourceProp(el, key, clientValue) {
	if (!resourceProps.has(key)) return false;
	return el.getAttribute(key) === (clientValue == null ? null : `${clientValue}`);
}
function propHasMismatch(el, key, clientValue, vnode, instance) {
	let mismatchType;
	let mismatchKey;
	let actual;
	let expected;
	if (key === "class") {
		if (el.$cls) {
			actual = el.$cls;
			delete el.$cls;
		} else actual = el.getAttribute("class");
		expected = normalizeClass(clientValue);
		if (!isSetEqual(toClassSet(actual || ""), toClassSet(expected))) {
			mismatchType = 2;
			mismatchKey = `class`;
		}
	} else if (key === "style") {
		actual = el.getAttribute("style") || "";
		expected = isString$2(clientValue) ? clientValue : stringifyStyle(normalizeStyle(clientValue));
		const actualMap = toStyleMap(actual);
		const expectedMap = toStyleMap(expected);
		if (vnode.dirs) {
			for (const { dir, value } of vnode.dirs) if (dir.name === "show" && !value) expectedMap.set("display", "none");
		}
		if (instance) resolveCssVars(instance, vnode, expectedMap);
		if (!isMapEqual(actualMap, expectedMap)) {
			mismatchType = 3;
			mismatchKey = "style";
		}
	} else if (el instanceof SVGElement && isKnownSvgAttr(key) || el instanceof HTMLElement && (isBooleanAttr(key) || isKnownHtmlAttr(key))) {
		if (key === "hidden") {
			actual = normalizeHiddenValue(el.getAttribute(key));
			expected = normalizeHiddenValue(clientValue);
		} else if (isBooleanAttr(key)) {
			actual = el.hasAttribute(key);
			expected = includeBooleanAttr(clientValue);
		} else if (clientValue == null) {
			actual = el.hasAttribute(key);
			expected = false;
		} else {
			if (el.hasAttribute(key)) actual = el.getAttribute(key);
			else if (key === "value" && el.tagName === "TEXTAREA") actual = el.value;
			else actual = false;
			expected = isRenderableAttrValue(clientValue) ? String(clientValue) : false;
		}
		if (actual !== expected) {
			mismatchType = 4;
			mismatchKey = key;
		}
	}
	if (mismatchType != null && !isMismatchAllowed(el, mismatchType)) {
		const format = (v) => v === false ? `(not rendered)` : `${mismatchKey}="${v}"`;
		warn$1(`Hydration ${MismatchTypeString[mismatchType]} mismatch on`, el, `
  - rendered on server: ${format(actual)}
  - expected on client: ${format(expected)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`);
		return true;
	}
	return false;
}
function normalizeHiddenValue(value) {
	if (!isRenderableAttrValue(value)) return false;
	if (isString$2(value)) return value.toLowerCase() === "until-found" ? "until-found" : "";
	return includeBooleanAttr(value) ? "" : false;
}
function toClassSet(str) {
	return new Set(str.trim().split(/\s+/));
}
function isSetEqual(a, b) {
	if (a.size !== b.size) return false;
	for (const s of a) if (!b.has(s)) return false;
	return true;
}
function toStyleMap(str) {
	const styleMap = /* @__PURE__ */ new Map();
	for (const item of str.split(";")) {
		let [key, value] = item.split(":");
		key = key.trim();
		value = value && value.trim();
		if (key && value) styleMap.set(key, value);
	}
	return styleMap;
}
function isMapEqual(a, b) {
	if (a.size !== b.size) return false;
	for (const [key, value] of a) if (value !== b.get(key)) return false;
	return true;
}
function resolveCssVars(instance, vnode, expectedMap) {
	const root = instance.subTree;
	if (instance.getCssVars && (vnode === root || root && root.type === Fragment && root.children.includes(vnode))) {
		const cssVars = instance.getCssVars();
		for (const key in cssVars) {
			const value = normalizeCssVarValue(cssVars[key]);
			expectedMap.set(`--${getEscapedCssVarName(key, false)}`, value);
		}
	}
	if (vnode === root && instance.parent) resolveCssVars(instance.parent, instance.vnode, expectedMap);
}
var allowMismatchAttr = "data-allow-mismatch";
var MismatchTypeString = {
	[0]: "text",
	[1]: "children",
	[2]: "class",
	[3]: "style",
	[4]: "attribute"
};
function isMismatchAllowed(el, allowedType) {
	if (allowedType === 0 || allowedType === 1) while (el && !el.hasAttribute(allowMismatchAttr)) el = el.parentElement;
	return isMismatchAllowedByAttr(el && el.getAttribute(allowMismatchAttr), allowedType);
}
function isMismatchAllowedByAttr(allowedAttr, allowedType) {
	if (allowedAttr == null) return false;
	else if (allowedAttr === "") return true;
	else {
		const list = allowedAttr.split(",");
		if (allowedType === 0 && list.includes("children")) return true;
		return list.includes(MismatchTypeString[allowedType]);
	}
}
function isNodeMismatchAllowed(node, vnode) {
	return isMismatchAllowed(node.parentElement, 1) || isMismatchAllowedByNode(node) || isMismatchAllowedByVNode(vnode);
}
function isMismatchAllowedByNode(node) {
	return node.nodeType === 1 && isMismatchAllowedByAttr(node.getAttribute(allowMismatchAttr), 1);
}
function isMismatchAllowedByVNode({ props }) {
	const allowedAttr = props && props[allowMismatchAttr];
	return typeof allowedAttr === "string" && isMismatchAllowedByAttr(allowedAttr, 1);
}
getGlobalThis().requestIdleCallback;
getGlobalThis().cancelIdleCallback;
function forEachElement(node, cb) {
	if (isComment(node) && node.data === "[") {
		let depth = 1;
		let next = node.nextSibling;
		while (next) {
			if (next.nodeType === 1) {
				if (cb(next) === false) break;
			} else if (isComment(next)) {
				if (next.data === "]") {
					if (--depth === 0) break;
				} else if (next.data === "[") depth++;
			}
			next = next.nextSibling;
		}
	} else cb(node);
}
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
	if (isFunction(source)) source = { loader: source };
	const { loader, loadingComponent, errorComponent, delay = 200, hydrate: hydrateStrategy, timeout, suspensible = true, onError: userOnError } = source;
	let pendingRequest = null;
	let resolvedComp;
	let retries = 0;
	const retry = () => {
		retries++;
		pendingRequest = null;
		return load();
	};
	const load = () => {
		let thisRequest;
		return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
			err = err instanceof Error ? err : new Error(String(err));
			if (userOnError) return new Promise((resolve, reject) => {
				const userRetry = () => resolve(retry());
				const userFail = () => reject(err);
				userOnError(err, userRetry, userFail, retries + 1);
			});
			else throw err;
		}).then((comp) => {
			if (thisRequest !== pendingRequest && pendingRequest) return pendingRequest;
			if (!comp) warn$1(`Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`);
			if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) comp = comp.default;
			if (comp && !isObject$1(comp) && !isFunction(comp)) throw new Error(`Invalid async component load result: ${comp}`);
			resolvedComp = comp;
			return comp;
		}));
	};
	return /* @__PURE__ */ defineComponent({
		name: "AsyncComponentWrapper",
		__asyncLoader: load,
		__asyncHydrate(el, instance, hydrate) {
			const wasConnected = el.isConnected;
			let patched = false;
			(instance.bu || (instance.bu = [])).push(() => patched = true);
			const performHydrate = () => {
				if (patched) {
					warn$1(`Skipping lazy hydration for component '${getComponentName(resolvedComp) || resolvedComp.__file}': it was updated before lazy hydration performed.`);
					return;
				}
				if (!el.parentNode || wasConnected && !el.isConnected) return;
				hydrate();
			};
			const doHydrate = hydrateStrategy ? () => {
				const teardown = hydrateStrategy(performHydrate, (cb) => forEachElement(el, cb));
				if (teardown) (instance.bum || (instance.bum = [])).push(teardown);
			} : performHydrate;
			if (resolvedComp) doHydrate();
			else load().then(() => !instance.isUnmounted && doHydrate());
		},
		get __asyncResolved() {
			return resolvedComp;
		},
		setup() {
			const instance = currentInstance;
			markAsyncBoundary(instance);
			if (resolvedComp) return () => createInnerComp(resolvedComp, instance);
			const onError = (err) => {
				pendingRequest = null;
				handleError(err, instance, 13, !errorComponent);
			};
			if (suspensible && instance.suspense || isInSSRComponentSetup) return load().then((comp) => {
				return () => createInnerComp(comp, instance);
			}).catch((err) => {
				onError(err);
				return () => errorComponent ? createVNode(errorComponent, { error: err }) : null;
			});
			const loaded = /* @__PURE__ */ ref(false);
			const error = /* @__PURE__ */ ref();
			const delayed = /* @__PURE__ */ ref(!!delay);
			let timeoutTimer;
			let delayTimer;
			onUnmounted(() => {
				if (timeoutTimer != null) clearTimeout(timeoutTimer);
				if (delayTimer != null) clearTimeout(delayTimer);
			});
			if (delay) delayTimer = setTimeout(() => {
				if (instance.isUnmounted) return;
				delayed.value = false;
			}, delay);
			if (timeout != null) timeoutTimer = setTimeout(() => {
				if (instance.isUnmounted) return;
				if (!loaded.value && !error.value) {
					const err = /* @__PURE__ */ new Error(`Async component timed out after ${timeout}ms.`);
					onError(err);
					error.value = err;
				}
			}, timeout);
			load().then(() => {
				if (instance.isUnmounted) return;
				loaded.value = true;
				if (instance.parent && isKeepAlive(instance.parent.vnode)) instance.parent.update();
			}).catch((err) => {
				if (instance.isUnmounted) {
					pendingRequest = null;
					return;
				}
				onError(err);
				error.value = err;
			});
			return () => {
				if (loaded.value && resolvedComp) return createInnerComp(resolvedComp, instance);
				else if (error.value && errorComponent) return createVNode(errorComponent, { error: error.value });
				else if (loadingComponent && !delayed.value) return createInnerComp(loadingComponent, instance);
			};
		}
	});
}
function createInnerComp(comp, parent) {
	const { ref: ref2, props, children, ce } = parent.vnode;
	const vnode = createVNode(comp, props, children);
	vnode.ref = ref2;
	vnode.ce = ce;
	delete parent.vnode.ce;
	return vnode;
}
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
	registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
	registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
	const wrappedHook = hook.__wdc || (hook.__wdc = () => {
		let current = target;
		while (current) {
			if (current.isDeactivated) return;
			current = current.parent;
		}
		return hook();
	});
	injectHook(type, wrappedHook, target);
	if (target) {
		let current = target.parent;
		while (current && current.parent) {
			if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
			current = current.parent;
		}
	}
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
	const injected = injectHook(type, hook, keepAliveRoot, true);
	onUnmounted(() => {
		remove(keepAliveRoot[type], injected);
	}, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
	if (target) {
		const hooks = target[type] || (target[type] = []);
		const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
			pauseTracking();
			const reset = setCurrentInstance(target);
			const res = callWithAsyncErrorHandling(hook, target, type, args);
			reset();
			resetTracking();
			return res;
		});
		if (prepend) hooks.unshift(wrappedHook);
		else hooks.push(wrappedHook);
		return wrappedHook;
	} else warn$1(`${toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""))} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
	if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
	injectHook("ec", hook, target);
}
var COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
	return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
	const instance = currentRenderingInstance || currentInstance;
	if (instance) {
		const Component = instance.type;
		if (type === COMPONENTS) {
			const selfName = getComponentName(Component, false);
			if (selfName && (selfName === name || selfName === camelize$1(name) || selfName === capitalize(camelize$1(name)))) return Component;
		}
		const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
		if (!res && maybeSelfReference) return Component;
		if (warnMissing && !res) {
			const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
			warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
		}
		return res;
	} else warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
}
function resolve(registry, name) {
	return registry && (registry[name] || registry[camelize$1(name)] || registry[capitalize(camelize$1(name))]);
}
function renderList(source, renderItem, cache, index) {
	let ret;
	const cached = cache && cache[index];
	const sourceIsArray = isArray$3(source);
	if (sourceIsArray || isString$2(source)) {
		const sourceIsReactiveArray = sourceIsArray && /* @__PURE__ */ isReactive(source);
		let needsWrap = false;
		let isReadonlySource = false;
		if (sourceIsReactiveArray) {
			needsWrap = !/* @__PURE__ */ isShallow(source);
			isReadonlySource = /* @__PURE__ */ isReadonly$1(source);
			source = shallowReadArray(source);
		}
		ret = new Array(source.length);
		for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
	} else if (typeof source === "number") {
		if (!Number.isInteger(source) || source < 0) {
			warn$1(`The v-for range expects a positive integer value but got ${source}.`);
			ret = [];
		} else {
			ret = new Array(source);
			for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
		}
	} else if (isObject$1(source)) {
		if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
		else {
			const keys = Object.keys(source);
			ret = new Array(keys.length);
			for (let i = 0, l = keys.length; i < l; i++) {
				const key = keys[i];
				ret[i] = renderItem(source[key], key, i, cached && cached[i]);
			}
		}
	} else ret = [];
	if (cache) cache[index] = ret;
	return ret;
}
function createSlots(slots, dynamicSlots) {
	for (let i = 0; i < dynamicSlots.length; i++) {
		const slot = dynamicSlots[i];
		if (isArray$3(slot)) for (let j = 0; j < slot.length; j++) slots[slot[j].name] = slot[j].fn;
		else if (slot) slots[slot.name] = slot.key ? (...args) => {
			const res = slot.fn(...args);
			if (res) res.key = slot.key;
			return res;
		} : slot.fn;
	}
	return slots;
}
function renderSlot(slots, name, props, fallback, noSlotted, branchKey) {
	if (props == null) props = {};
	if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
		const slotProps = branchKey != null && props.key == null ? extend({}, props, { key: branchKey }) : props;
		const hasProps = Object.keys(slotProps).length > 0;
		if (name !== "default") slotProps.name = name;
		return openBlock(), createBlock(Fragment, null, [createVNode("slot", slotProps, fallback && fallback())], hasProps ? -2 : 64);
	}
	let slot = slots[name];
	if (slot && slot.length > 1) {
		warn$1(`SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`);
		slot = () => [];
	}
	if (slot && slot._c) slot._d = false;
	const prevStackSize = blockStack.length;
	openBlock();
	let rendered;
	try {
		const validSlotContent = slot && ensureValidVNode(slot(props));
		const slotKey = props.key || branchKey || validSlotContent && validSlotContent.key;
		rendered = createBlock(Fragment, { key: (slotKey && !isSymbol$1(slotKey) ? slotKey : `_${name}`) + (!validSlotContent && fallback ? "_fb" : "") }, validSlotContent || (fallback ? fallback() : []), validSlotContent && slots._ === 1 ? 64 : -2);
	} catch (err) {
		for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
		throw err;
	} finally {
		if (slot && slot._c) slot._d = true;
	}
	if (!noSlotted && rendered.scopeId) rendered.slotScopeIds = [rendered.scopeId + "-s"];
	return rendered;
}
function ensureValidVNode(vnodes) {
	return vnodes.some((child) => {
		if (!isVNode(child)) return true;
		if (child.type === Comment) return false;
		if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
		return true;
	}) ? vnodes : null;
}
var getPublicInstance = (i) => {
	if (!i) return null;
	if (isStatefulComponent(i)) return getComponentPublicInstance(i);
	return getPublicInstance(i.parent);
};
var resolveDevRootEl = (vnode) => {
	let found = false;
	while (true) {
		if (vnode.patchFlag > 0 && vnode.patchFlag & 2048) {
			const root = filterSingleRoot(vnode.children);
			if (!root) return;
			vnode = root;
			found = true;
			continue;
		}
		const component = vnode.component;
		if (component && component.subTree) {
			vnode = component.subTree;
			continue;
		}
		const suspense = vnode.suspense;
		if (suspense && suspense.activeBranch) {
			vnode = suspense.activeBranch;
			continue;
		}
		return found ? vnode.el : void 0;
	}
};
var getDevRootFragmentEl = (i) => {
	const el = i.subTree && resolveDevRootEl(i.subTree);
	return el === void 0 ? i.vnode.el : el;
};
var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
	$: (i) => i,
	$el: (i) => getDevRootFragmentEl(i),
	$data: (i) => i.data,
	$props: (i) => /* @__PURE__ */ shallowReadonly(i.props),
	$attrs: (i) => /* @__PURE__ */ shallowReadonly(i.attrs),
	$slots: (i) => /* @__PURE__ */ shallowReadonly(i.slots),
	$refs: (i) => /* @__PURE__ */ shallowReadonly(i.refs),
	$parent: (i) => getPublicInstance(i.parent),
	$root: (i) => getPublicInstance(i.root),
	$host: (i) => i.ce,
	$emit: (i) => i.emit,
	$options: (i) => resolveMergedOptions(i),
	$forceUpdate: (i) => i.f || (i.f = () => {
		queueJob(i.update);
	}),
	$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
	$watch: (i) => instanceWatch.bind(i)
});
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
	get({ _: instance }, key) {
		if (key === "__v_skip") return true;
		const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
		if (key === "__isVue") return true;
		if (key[0] !== "$") {
			const n = accessCache[key];
			if (n !== void 0) switch (n) {
				case 1: return setupState[key];
				case 2: return data[key];
				case 4: return ctx[key];
				case 3: return props[key];
			}
			else if (hasSetupBinding(setupState, key)) {
				accessCache[key] = 1;
				return setupState[key];
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				accessCache[key] = 2;
				return data[key];
			} else if (hasOwn(props, key)) {
				accessCache[key] = 3;
				return props[key];
			} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (shouldCacheAccess) accessCache[key] = 0;
		}
		const publicGetter = publicPropertiesMap[key];
		let cssModule, globalProperties;
		if (publicGetter) {
			if (key === "$attrs") {
				track(instance.attrs, "get", "");
				markAttrsAccessed();
			} else if (key === "$slots") track(instance, "get", key);
			return publicGetter(instance);
		} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
		else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
			accessCache[key] = 4;
			return ctx[key];
		} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
		else if (currentRenderingInstance && (!isString$2(key) || key.indexOf("__v") !== 0)) {
			if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
			else if (instance === currentRenderingInstance) warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
		}
	},
	set({ _: instance }, key, value) {
		const { data, setupState, ctx } = instance;
		if (hasSetupBinding(setupState, key)) {
			setupState[key] = value;
			return true;
		} else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
			warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
			return false;
		} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
			data[key] = value;
			return true;
		} else if (hasOwn(instance.props, key)) {
			warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
			return false;
		}
		if (key[0] === "$" && key.slice(1) in instance) {
			warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
			return false;
		} else if (key in instance.appContext.config.globalProperties) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			value
		});
		else ctx[key] = value;
		return true;
	},
	has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
		let cssModules;
		return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
	},
	defineProperty(target, key, descriptor) {
		if (descriptor.get != null) target._.accessCache[key] = 0;
		else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
		return Reflect.defineProperty(target, key, descriptor);
	}
};
PublicInstanceProxyHandlers.ownKeys = (target) => {
	warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
	return Reflect.ownKeys(target);
};
function createDevRenderContext(instance) {
	const target = {};
	Object.defineProperty(target, `_`, {
		configurable: true,
		enumerable: false,
		get: () => instance
	});
	Object.keys(publicPropertiesMap).forEach((key) => {
		Object.defineProperty(target, key, {
			configurable: true,
			enumerable: false,
			get: () => publicPropertiesMap[key](instance),
			set: NOOP
		});
	});
	return target;
}
function exposePropsOnRenderContext(instance) {
	const { ctx, propsOptions: [propsOptions] } = instance;
	if (propsOptions) Object.keys(propsOptions).forEach((key) => {
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => instance.props[key],
			set: NOOP
		});
	});
}
function exposeSetupStateOnRenderContext(instance) {
	const { ctx, setupState } = instance;
	Object.keys(/* @__PURE__ */ toRaw(setupState)).forEach((key) => {
		if (!setupState.__isScriptSetup) {
			if (isReservedPrefix(key[0])) {
				warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
				return;
			}
			Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => setupState[key],
				set: NOOP
			});
		}
	});
}
function normalizePropsOrEmits(props) {
	return isArray$3(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
}
function createDuplicateChecker() {
	const cache = /* @__PURE__ */ Object.create(null);
	return (type, key) => {
		if (cache[key]) warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
		else cache[key] = type;
	};
}
var shouldCacheAccess = true;
function applyOptions(instance) {
	const options = resolveMergedOptions(instance);
	const publicThis = instance.proxy;
	const ctx = instance.ctx;
	shouldCacheAccess = false;
	if (options.beforeCreate) callHook$1(options.beforeCreate, instance, "bc");
	const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
	const checkDuplicateProperties = createDuplicateChecker();
	{
		const [propsOptions] = instance.propsOptions;
		if (propsOptions) for (const key in propsOptions) checkDuplicateProperties("Props", key);
	}
	if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
	if (methods) for (const key in methods) {
		const methodHandler = methods[key];
		if (isFunction(methodHandler)) {
			Object.defineProperty(ctx, key, {
				value: methodHandler.bind(publicThis),
				configurable: true,
				enumerable: true,
				writable: true
			});
			checkDuplicateProperties("Methods", key);
		} else warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
	}
	if (dataOptions) {
		if (!isFunction(dataOptions)) warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
		const data = dataOptions.call(publicThis, publicThis);
		if (isPromise(data)) warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
		if (!isObject$1(data)) warn$1(`data() should return an object.`);
		else {
			instance.data = /* @__PURE__ */ reactive(data);
			for (const key in data) {
				checkDuplicateProperties("Data", key);
				if (!isReservedPrefix(key[0])) Object.defineProperty(ctx, key, {
					configurable: true,
					enumerable: true,
					get: () => data[key],
					set: NOOP
				});
			}
		}
	}
	shouldCacheAccess = true;
	if (computedOptions) for (const key in computedOptions) {
		const opt = computedOptions[key];
		const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
		if (get === NOOP) warn$1(`Computed property "${key}" has no getter.`);
		const c = computed({
			get,
			set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
				warn$1(`Write operation failed: computed property "${key}" is readonly.`);
			}
		});
		Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => c.value,
			set: (v) => c.value = v
		});
		checkDuplicateProperties("Computed", key);
	}
	if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
	if (provideOptions) {
		const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
		Reflect.ownKeys(provides).forEach((key) => {
			provide(key, provides[key]);
		});
	}
	if (created) callHook$1(created, instance, "c");
	function registerLifecycleHook(register, hook) {
		if (isArray$3(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
		else if (hook) register(hook.bind(publicThis));
	}
	registerLifecycleHook(onBeforeMount, beforeMount);
	registerLifecycleHook(onMounted, mounted);
	registerLifecycleHook(onBeforeUpdate, beforeUpdate);
	registerLifecycleHook(onUpdated, updated);
	registerLifecycleHook(onActivated, activated);
	registerLifecycleHook(onDeactivated, deactivated);
	registerLifecycleHook(onErrorCaptured, errorCaptured);
	registerLifecycleHook(onRenderTracked, renderTracked);
	registerLifecycleHook(onRenderTriggered, renderTriggered);
	registerLifecycleHook(onBeforeUnmount, beforeUnmount);
	registerLifecycleHook(onUnmounted, unmounted);
	registerLifecycleHook(onServerPrefetch, serverPrefetch);
	if (isArray$3(expose)) {
		if (expose.length) {
			const exposed = instance.exposed || (instance.exposed = {});
			expose.forEach((key) => {
				Object.defineProperty(exposed, key, {
					get: () => publicThis[key],
					set: (val) => publicThis[key] = val,
					enumerable: true
				});
			});
		} else if (!instance.exposed) instance.exposed = {};
	}
	if (render && instance.render === NOOP) instance.render = render;
	if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
	if (components) instance.components = components;
	if (directives) instance.directives = directives;
	if (serverPrefetch) markAsyncBoundary(instance);
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
	if (isArray$3(injectOptions)) injectOptions = normalizeInject(injectOptions);
	for (const key in injectOptions) {
		const opt = injectOptions[key];
		let injected;
		if (isObject$1(opt)) {
			if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
			else injected = inject(opt.from || key);
		} else injected = inject(opt);
		if (/* @__PURE__ */ isRef(injected)) Object.defineProperty(ctx, key, {
			enumerable: true,
			configurable: true,
			get: () => injected.value,
			set: (v) => injected.value = v
		});
		else ctx[key] = injected;
		checkDuplicateProperties("Inject", key);
	}
}
function callHook$1(hook, instance, type) {
	callWithAsyncErrorHandling(isArray$3(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
	let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
	if (isString$2(raw)) {
		const handler = ctx[raw];
		if (isFunction(handler)) watch(getter, handler);
		else warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
	} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
	else if (isObject$1(raw)) {
		if (isArray$3(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
		else {
			const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
			if (isFunction(handler)) watch(getter, handler, raw);
			else warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
		}
	} else warn$1(`Invalid watch option: "${key}"`, raw);
}
function resolveMergedOptions(instance) {
	const base = instance.type;
	const { mixins, extends: extendsOptions } = base;
	const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
	const cached = cache.get(base);
	let resolved;
	if (cached) resolved = cached;
	else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
	else {
		resolved = {};
		if (globalMixins.length) globalMixins.forEach((m) => mergeOptions$1(resolved, m, optionMergeStrategies, true));
		mergeOptions$1(resolved, base, optionMergeStrategies);
	}
	if (isObject$1(base)) cache.set(base, resolved);
	return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
	const { mixins, extends: extendsOptions } = from;
	if (extendsOptions) mergeOptions$1(to, extendsOptions, strats, true);
	if (mixins) mixins.forEach((m) => mergeOptions$1(to, m, strats, true));
	for (const key in from) if (asMixin && key === "expose") warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
	else {
		const strat = internalOptionMergeStrats[key] || strats && strats[key];
		to[key] = strat ? strat(to[key], from[key]) : from[key];
	}
	return to;
}
var internalOptionMergeStrats = {
	data: mergeDataFn,
	props: mergeEmitsOrPropsOptions,
	emits: mergeEmitsOrPropsOptions,
	methods: mergeObjectOptions,
	computed: mergeObjectOptions,
	beforeCreate: mergeAsArray,
	created: mergeAsArray,
	beforeMount: mergeAsArray,
	mounted: mergeAsArray,
	beforeUpdate: mergeAsArray,
	updated: mergeAsArray,
	beforeDestroy: mergeAsArray,
	beforeUnmount: mergeAsArray,
	destroyed: mergeAsArray,
	unmounted: mergeAsArray,
	activated: mergeAsArray,
	deactivated: mergeAsArray,
	errorCaptured: mergeAsArray,
	serverPrefetch: mergeAsArray,
	components: mergeObjectOptions,
	directives: mergeObjectOptions,
	watch: mergeWatchOptions,
	provide: mergeDataFn,
	inject: mergeInject
};
function mergeDataFn(to, from) {
	if (!from) return to;
	if (!to) return from;
	return function mergedDataFn() {
		return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
	};
}
function mergeInject(to, from) {
	return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
	if (isArray$3(raw)) {
		const res = {};
		for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
		return res;
	}
	return raw;
}
function mergeAsArray(to, from) {
	return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
	return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
	if (to) {
		if (isArray$3(to) && isArray$3(from)) return [.../* @__PURE__ */ new Set([...to, ...from])];
		return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
	} else return from;
}
function mergeWatchOptions(to, from) {
	if (!to) return from;
	if (!from) return to;
	const merged = extend(/* @__PURE__ */ Object.create(null), to);
	for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
	return merged;
}
function createAppContext() {
	return {
		app: null,
		config: {
			isNativeTag: NO,
			performance: false,
			globalProperties: {},
			optionMergeStrategies: {},
			errorHandler: void 0,
			warnHandler: void 0,
			compilerOptions: {}
		},
		mixins: [],
		components: {},
		directives: {},
		provides: /* @__PURE__ */ Object.create(null),
		optionsCache: /* @__PURE__ */ new WeakMap(),
		propsCache: /* @__PURE__ */ new WeakMap(),
		emitsCache: /* @__PURE__ */ new WeakMap()
	};
}
var uid$1 = 0;
function createAppAPI(render, hydrate) {
	return function createApp(rootComponent, rootProps = null) {
		if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
		if (rootProps != null && !isObject$1(rootProps)) {
			warn$1(`root props passed to app.mount() must be an object.`);
			rootProps = null;
		}
		const context = createAppContext();
		const installedPlugins = /* @__PURE__ */ new WeakSet();
		const pluginCleanupFns = [];
		let isMounted = false;
		const app = context.app = {
			_uid: uid$1++,
			_component: rootComponent,
			_props: rootProps,
			_container: null,
			_context: context,
			_instance: null,
			version,
			get config() {
				return context.config;
			},
			set config(v) {
				warn$1(`app.config cannot be replaced. Modify individual options instead.`);
			},
			use(plugin, ...options) {
				if (installedPlugins.has(plugin)) warn$1(`Plugin has already been applied to target app.`);
				else if (plugin && isFunction(plugin.install)) {
					installedPlugins.add(plugin);
					plugin.install(app, ...options);
				} else if (isFunction(plugin)) {
					installedPlugins.add(plugin);
					plugin(app, ...options);
				} else warn$1(`A plugin must either be a function or an object with an "install" function.`);
				return app;
			},
			mixin(mixin) {
				if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
				else warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
				return app;
			},
			component(name, component) {
				validateComponentName(name, context.config);
				if (!component) return context.components[name];
				if (context.components[name]) warn$1(`Component "${name}" has already been registered in target app.`);
				context.components[name] = component;
				return app;
			},
			directive(name, directive) {
				validateDirectiveName(name);
				if (!directive) return context.directives[name];
				if (context.directives[name]) warn$1(`Directive "${name}" has already been registered in target app.`);
				context.directives[name] = directive;
				return app;
			},
			mount(rootContainer, isHydrate, namespace) {
				if (!isMounted) {
					if (rootContainer.__vue_app__) warn$1(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
					const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
					vnode.appContext = context;
					if (namespace === true) namespace = "svg";
					else if (namespace === false) namespace = void 0;
					context.reload = () => {
						const cloned = cloneVNode(vnode);
						cloned.el = null;
						render(cloned, rootContainer, namespace);
					};
					if (isHydrate && hydrate) hydrate(vnode, rootContainer);
					else render(vnode, rootContainer, namespace);
					isMounted = true;
					app._container = rootContainer;
					rootContainer.__vue_app__ = app;
					app._instance = vnode.component;
					devtoolsInitApp(app, version);
					return getComponentPublicInstance(vnode.component);
				} else warn$1(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
			},
			onUnmount(cleanupFn) {
				if (typeof cleanupFn !== "function") warn$1(`Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`);
				pluginCleanupFns.push(cleanupFn);
			},
			unmount() {
				if (isMounted) {
					callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
					render(null, app._container);
					app._instance = null;
					devtoolsUnmountApp(app);
					delete app._container.__vue_app__;
				} else warn$1(`Cannot unmount an app that is not mounted.`);
			},
			provide(key, value) {
				if (key in context.provides) {
					if (hasOwn(context.provides, key)) warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
					else warn$1(`App already provides property with key "${String(key)}" inherited from its parent element. It will be overwritten with the new value.`);
				}
				context.provides[key] = value;
				return app;
			},
			runWithContext(fn) {
				const lastApp = currentApp;
				currentApp = app;
				try {
					return fn();
				} finally {
					currentApp = lastApp;
				}
			}
		};
		return app;
	};
}
var currentApp = null;
var getModelModifiers = (props, modelName) => {
	return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize$1(modelName)}Modifiers`] || props[`${hyphenate$1(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
	if (instance.isUnmounted) return;
	const props = instance.vnode.props || EMPTY_OBJ;
	{
		const { emitsOptions, propsOptions: [propsOptions] } = instance;
		if (emitsOptions) {
			if (!(event in emitsOptions) && true) {
				if (!propsOptions || !(toHandlerKey(camelize$1(event)) in propsOptions)) warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize$1(event))}" prop.`);
			} else {
				const validator = emitsOptions[event];
				if (isFunction(validator)) {
					if (!validator(...rawArgs)) warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
				}
			}
		}
	}
	let args = rawArgs;
	const isModelListener = event.startsWith("update:");
	const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
	if (modifiers) {
		if (modifiers.trim) args = rawArgs.map((a) => isString$2(a) ? a.trim() : a);
		if (modifiers.number) args = args.map(looseToNumber);
	}
	devtoolsComponentEmit(instance, event, args);
	{
		const lowerCaseEvent = event.toLowerCase();
		if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate$1(event)}" instead of "${event}".`);
	}
	let handlerName;
	let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize$1(event))];
	if (!handler && isModelListener) handler = props[handlerName = toHandlerKey(hyphenate$1(event))];
	if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
	const onceHandler = props[handlerName + `Once`];
	if (onceHandler) {
		if (!instance.emitted) instance.emitted = {};
		else if (instance.emitted[handlerName]) return;
		instance.emitted[handlerName] = true;
		callWithAsyncErrorHandling(onceHandler, instance, 6, args);
	}
}
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
	const cached = cache.get(comp);
	if (cached !== void 0) return cached;
	const raw = comp.emits;
	let normalized = {};
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendEmits = (raw2) => {
			const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
			if (normalizedFromExtend) {
				hasExtends = true;
				extend(normalized, normalizedFromExtend);
			}
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
		if (comp.extends) extendEmits(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendEmits);
	}
	if (!raw && !hasExtends) {
		if (isObject$1(comp)) cache.set(comp, null);
		return null;
	}
	if (isArray$3(raw)) raw.forEach((key) => normalized[key] = null);
	else extend(normalized, raw);
	if (isObject$1(comp)) cache.set(comp, normalized);
	return normalized;
}
function isEmitListener(options, key) {
	if (!options || !isOn(key)) return false;
	key = key.slice(2);
	key = key === "Once" ? key : key.replace(/Once$/, "");
	return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate$1(key)) || hasOwn(options, key);
}
var accessedAttrs = false;
function markAttrsAccessed() {
	accessedAttrs = true;
}
function renderComponentRoot(instance) {
	const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
	const prev = setCurrentRenderingInstance(instance);
	let result;
	let fallthroughAttrs;
	accessedAttrs = false;
	try {
		if (vnode.shapeFlag & 4) {
			const proxyToUse = withProxy || proxy;
			const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, { get(target, key, receiver) {
				warn$1(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
				return Reflect.get(target, key, receiver);
			} }) : proxyToUse;
			result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, /* @__PURE__ */ shallowReadonly(props), setupState, data, ctx));
			fallthroughAttrs = attrs;
		} else {
			const render2 = Component;
			if (attrs === props) markAttrsAccessed();
			result = normalizeVNode(render2.length > 1 ? render2(/* @__PURE__ */ shallowReadonly(props), {
				get attrs() {
					markAttrsAccessed();
					return /* @__PURE__ */ shallowReadonly(attrs);
				},
				slots,
				emit
			}) : render2(/* @__PURE__ */ shallowReadonly(props), null));
			fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
		}
	} catch (err) {
		blockStack.length = 0;
		handleError(err, instance, 1);
		result = createVNode(Comment);
	}
	let root = result;
	let setRoot = void 0;
	if (result.patchFlag > 0 && result.patchFlag & 2048) [root, setRoot] = getChildRoot(result);
	if (fallthroughAttrs && inheritAttrs !== false) {
		const keys = Object.keys(fallthroughAttrs);
		const { shapeFlag } = root;
		if (keys.length) {
			if (shapeFlag & 7) {
				if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
				root = cloneVNode(root, fallthroughAttrs, false, true);
			} else if (!accessedAttrs && root.type !== Comment) {
				const allAttrs = Object.keys(attrs);
				const eventAttrs = [];
				const extraAttrs = [];
				for (let i = 0, l = allAttrs.length; i < l; i++) {
					const key = allAttrs[i];
					if (isOn(key)) {
						if (!isModelListener(key)) eventAttrs.push(key[2].toLowerCase() + key.slice(3));
					} else extraAttrs.push(key);
				}
				if (extraAttrs.length) warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`);
				if (eventAttrs.length) warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
			}
		}
	}
	if (vnode.dirs) {
		if (!isElementRoot(root)) warn$1(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
		root = cloneVNode(root, null, false, true);
		root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
	}
	if (vnode.transition) {
		const child = isTeleport(root.type) ? getInnerChild$1(root) || root : root;
		if (!isElementRoot(child)) warn$1(`Component inside <Transition> renders non-element root node that cannot be animated.`);
		setTransitionHooks(child, vnode.transition);
	}
	if (setRoot) setRoot(root);
	else result = root;
	setCurrentRenderingInstance(prev);
	return result;
}
var getChildRoot = (vnode) => {
	const rawChildren = vnode.children;
	const dynamicChildren = vnode.dynamicChildren;
	const childRoot = filterSingleRoot(rawChildren, false);
	if (!childRoot) return [vnode, void 0];
	else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) return getChildRoot(childRoot);
	const index = rawChildren.indexOf(childRoot);
	const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
	const setRoot = (updatedRoot) => {
		rawChildren[index] = updatedRoot;
		if (dynamicChildren) {
			if (dynamicIndex > -1) dynamicChildren[dynamicIndex] = updatedRoot;
			else if (updatedRoot.patchFlag > 0) vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
		}
	};
	return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children, recurse = true) {
	let singleRoot;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (isVNode(child)) {
			if (child.type !== Comment || child.children === "v-if") {
				if (singleRoot) return;
				else {
					singleRoot = child;
					if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) return filterSingleRoot(singleRoot.children);
				}
			}
		} else return;
	}
	return singleRoot;
}
var getFunctionalFallthrough = (attrs) => {
	let res;
	for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
	return res;
};
var filterModelListeners = (attrs, props) => {
	const res = {};
	for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
	return res;
};
var isElementRoot = (vnode) => {
	return vnode.shapeFlag & 7 || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
	const { props: prevProps, children: prevChildren, component } = prevVNode;
	const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
	const emits = component.emitsOptions;
	if ((prevChildren || nextChildren) && isHmrUpdating) return true;
	if (nextVNode.dirs || nextVNode.transition) return true;
	if (optimized && patchFlag >= 0) {
		if (patchFlag & 1024) return true;
		if (patchFlag & 16) {
			if (!prevProps) return !!nextProps;
			return hasPropsChanged(prevProps, nextProps, emits);
		} else if (patchFlag & 8) {
			const dynamicProps = nextVNode.dynamicProps;
			for (let i = 0; i < dynamicProps.length; i++) {
				const key = dynamicProps[i];
				if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
			}
		}
	} else {
		if (prevChildren || nextChildren) {
			if (!nextChildren || !nextChildren.$stable) return true;
		}
		if (prevProps === nextProps) return false;
		if (!prevProps) return !!nextProps;
		if (!nextProps) return true;
		return hasPropsChanged(prevProps, nextProps, emits);
	}
	return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
	const nextKeys = Object.keys(nextProps);
	if (nextKeys.length !== Object.keys(prevProps).length) return true;
	for (let i = 0; i < nextKeys.length; i++) {
		const key = nextKeys[i];
		if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
	}
	return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
	const nextProp = nextProps[key];
	const prevProp = prevProps[key];
	if (key === "style" && isObject$1(nextProp) && isObject$1(prevProp)) return !looseEqual(nextProp, prevProp);
	return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
	while (parent) {
		const root = parent.subTree;
		if (root.suspense && root.suspense.activeBranch === vnode) {
			root.suspense.vnode.el = root.el = el;
			vnode = root;
		}
		if (root === vnode) {
			(vnode = parent.vnode).el = el;
			parent = parent.parent;
		} else break;
	}
	if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
}
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
	const props = {};
	const attrs = createInternalObject();
	instance.propsDefaults = /* @__PURE__ */ Object.create(null);
	setFullProps(instance, rawProps, props, attrs);
	for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
	validateProps(rawProps || {}, props, instance);
	if (isStateful) instance.props = isSSR ? props : /* @__PURE__ */ shallowReactive(props);
	else if (!instance.type.props) instance.props = attrs;
	else instance.props = props;
	instance.attrs = attrs;
}
function isInHmrContext(instance) {
	while (instance) {
		if (instance.type.__hmrId) return true;
		instance = instance.parent;
	}
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
	const { props, attrs, vnode: { patchFlag } } = instance;
	const rawCurrentProps = /* @__PURE__ */ toRaw(props);
	const [options] = instance.propsOptions;
	let hasAttrsChanged = false;
	if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
		if (patchFlag & 8) {
			const propsToUpdate = instance.vnode.dynamicProps;
			for (let i = 0; i < propsToUpdate.length; i++) {
				let key = propsToUpdate[i];
				if (isEmitListener(instance.emitsOptions, key)) continue;
				const value = rawProps[key];
				if (options) {
					if (hasOwn(attrs, key)) {
						if (value !== attrs[key]) {
							attrs[key] = value;
							hasAttrsChanged = true;
						}
					} else {
						const camelizedKey = camelize$1(key);
						props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
					}
				} else if (value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
	} else {
		if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
		let kebabKey;
		for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate$1(key)) === key || !hasOwn(rawProps, kebabKey))) {
			if (options) {
				if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
			} else delete props[key];
		}
		if (attrs !== rawCurrentProps) {
			for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
				delete attrs[key];
				hasAttrsChanged = true;
			}
		}
	}
	if (hasAttrsChanged) trigger(instance.attrs, "set", "");
	validateProps(rawProps || {}, props, instance);
}
function setFullProps(instance, rawProps, props, attrs) {
	const [options, needCastKeys] = instance.propsOptions;
	let hasAttrsChanged = false;
	let rawCastValues;
	if (rawProps) for (let key in rawProps) {
		if (isReservedProp(key)) continue;
		const value = rawProps[key];
		let camelKey;
		if (options && hasOwn(options, camelKey = camelize$1(key))) {
			if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
			else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
		} else if (!isEmitListener(instance.emitsOptions, key)) {
			if (!(key in attrs) || value !== attrs[key]) {
				attrs[key] = value;
				hasAttrsChanged = true;
			}
		}
	}
	if (needCastKeys) {
		const rawCurrentProps = /* @__PURE__ */ toRaw(props);
		const castValues = rawCastValues || EMPTY_OBJ;
		for (let i = 0; i < needCastKeys.length; i++) {
			const key = needCastKeys[i];
			props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
		}
	}
	return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
	const opt = options[key];
	if (opt != null) {
		const hasDefault = hasOwn(opt, "default");
		if (hasDefault && value === void 0) {
			const defaultValue = opt.default;
			if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
				const { propsDefaults } = instance;
				if (key in propsDefaults) value = propsDefaults[key];
				else {
					const reset = setCurrentInstance(instance);
					value = propsDefaults[key] = defaultValue.call(null, props);
					reset();
				}
			} else value = defaultValue;
			if (instance.ce) instance.ce._setProp(key, value);
		}
		if (opt[0]) {
			if (isAbsent && !hasDefault) value = false;
			else if (opt[1] && (value === "" || value === hyphenate$1(key))) value = true;
		}
	}
	return value;
}
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
	const cache = asMixin ? mixinPropsCache : appContext.propsCache;
	const cached = cache.get(comp);
	if (cached) return cached;
	const raw = comp.props;
	const normalized = {};
	const needCastKeys = [];
	let hasExtends = false;
	if (!isFunction(comp)) {
		const extendProps = (raw2) => {
			hasExtends = true;
			const [props, keys] = normalizePropsOptions(raw2, appContext, true);
			extend(normalized, props);
			if (keys) needCastKeys.push(...keys);
		};
		if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
		if (comp.extends) extendProps(comp.extends);
		if (comp.mixins) comp.mixins.forEach(extendProps);
	}
	if (!raw && !hasExtends) {
		if (isObject$1(comp)) cache.set(comp, EMPTY_ARR);
		return EMPTY_ARR;
	}
	if (isArray$3(raw)) for (let i = 0; i < raw.length; i++) {
		if (!isString$2(raw[i])) warn$1(`props must be strings when using array syntax.`, raw[i]);
		const normalizedKey = camelize$1(raw[i]);
		if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
	}
	else if (raw) {
		if (!isObject$1(raw)) warn$1(`invalid props options`, raw);
		for (const key in raw) {
			const normalizedKey = camelize$1(key);
			if (validatePropName(normalizedKey)) {
				const opt = raw[key];
				const prop = normalized[normalizedKey] = isArray$3(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
				const propType = prop.type;
				let shouldCast = false;
				let shouldCastTrue = true;
				if (isArray$3(propType)) for (let index = 0; index < propType.length; ++index) {
					const type = propType[index];
					const typeName = isFunction(type) && type.name;
					if (typeName === "Boolean") {
						shouldCast = true;
						break;
					} else if (typeName === "String") shouldCastTrue = false;
				}
				else shouldCast = isFunction(propType) && propType.name === "Boolean";
				prop[0] = shouldCast;
				prop[1] = shouldCastTrue;
				if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
			}
		}
	}
	const res = [normalized, needCastKeys];
	if (isObject$1(comp)) cache.set(comp, res);
	return res;
}
function validatePropName(key) {
	if (key[0] !== "$" && !isReservedProp(key)) return true;
	else warn$1(`Invalid prop name: "${key}" is a reserved property.`);
	return false;
}
function getType$2(ctor) {
	if (ctor === null) return "null";
	if (typeof ctor === "function") return ctor.name || "";
	else if (typeof ctor === "object") return ctor.constructor && ctor.constructor.name || "";
	return "";
}
function validateProps(rawProps, props, instance) {
	const resolvedValues = /* @__PURE__ */ toRaw(props);
	const options = instance.propsOptions[0];
	const camelizePropsKey = Object.keys(rawProps).map((key) => camelize$1(key));
	for (const key in options) {
		let opt = options[key];
		if (opt == null) continue;
		validateProp(key, resolvedValues[key], opt, /* @__PURE__ */ shallowReadonly(resolvedValues), !camelizePropsKey.includes(key));
	}
}
function validateProp(name, value, prop, props, isAbsent) {
	const { type, required, validator, skipCheck } = prop;
	if (required && isAbsent) {
		warn$1("Missing required prop: \"" + name + "\"");
		return;
	}
	if (value == null && !required) return;
	if (type != null && type !== true && !skipCheck) {
		let isValid = false;
		const types = isArray$3(type) ? type : [type];
		const expectedTypes = [];
		for (let i = 0; i < types.length && !isValid; i++) {
			const { valid, expectedType } = assertType(value, types[i]);
			expectedTypes.push(expectedType || "");
			isValid = valid;
		}
		if (!isValid) {
			warn$1(getInvalidTypeMessage(name, value, expectedTypes));
			return;
		}
	}
	if (validator && !validator(value, props)) warn$1("Invalid prop: custom validator check failed for prop \"" + name + "\".");
}
var isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
	let valid;
	const expectedType = getType$2(type);
	if (expectedType === "null") valid = value === null;
	else if (isSimpleType(expectedType)) {
		const t = typeof value;
		valid = t === expectedType.toLowerCase();
		if (!valid && t === "object") valid = value instanceof type;
	} else if (expectedType === "Object") valid = isObject$1(value);
	else if (expectedType === "Array") valid = isArray$3(value);
	else valid = value instanceof type;
	return {
		valid,
		expectedType
	};
}
function getInvalidTypeMessage(name, value, expectedTypes) {
	if (expectedTypes.length === 0) return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
	let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
	const expectedType = expectedTypes[0];
	const receivedType = toRawType(value);
	const expectedValue = styleValue(value, expectedType);
	const receivedValue = styleValue(value, receivedType);
	if (expectedTypes.length === 1 && isExplicable(expectedType) && isCoercible(expectedType, receivedType)) message += ` with value ${expectedValue}`;
	message += `, got ${receivedType} `;
	if (isExplicable(receivedType)) message += `with value ${receivedValue}.`;
	return message;
}
function styleValue(value, type) {
	if (isSymbol$1(value)) return value.toString();
	else if (type === "String") return `"${value}"`;
	else if (type === "Number") return `${Number(value)}`;
	else return `${value}`;
}
function isExplicable(type) {
	return [
		"string",
		"number",
		"boolean"
	].some((elem) => type.toLowerCase() === elem);
}
function isCoercible(...args) {
	return args.every((elem) => {
		const value = elem.toLowerCase();
		return value !== "boolean" && value !== "symbol";
	});
}
var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
var normalizeSlotValue = (value) => isArray$3(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot$1 = (key, rawSlot, ctx) => {
	if (rawSlot._n) return rawSlot;
	const normalized = withCtx((...args) => {
		if (currentInstance && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
		return normalizeSlotValue(rawSlot(...args));
	}, ctx);
	normalized._c = false;
	return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
	const ctx = rawSlots._ctx;
	for (const key in rawSlots) {
		if (isInternalKey(key)) continue;
		const value = rawSlots[key];
		if (isFunction(value)) slots[key] = normalizeSlot$1(key, value, ctx);
		else if (value != null) {
			warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
			const normalized = normalizeSlotValue(value);
			slots[key] = () => normalized;
		}
	}
};
var normalizeVNodeSlots = (instance, children) => {
	if (!isKeepAlive(instance.vnode) && true) warn$1(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
	const normalized = normalizeSlotValue(children);
	instance.slots.default = () => normalized;
};
var assignSlots = (slots, children, optimized) => {
	for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
};
var initSlots = (instance, children, optimized) => {
	const slots = instance.slots = createInternalObject();
	if (instance.vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			assignSlots(slots, children, optimized);
			if (optimized) def(slots, "_", type, true);
		} else normalizeObjectSlots(children, slots);
	} else if (children) normalizeVNodeSlots(instance, children);
};
var updateSlots = (instance, children, optimized) => {
	const { vnode, slots } = instance;
	let needDeletionCheck = true;
	let deletionComparisonTarget = EMPTY_OBJ;
	if (vnode.shapeFlag & 32) {
		const type = children._;
		if (type) {
			if (isHmrUpdating) {
				assignSlots(slots, children, optimized);
				trigger(instance, "set", "$slots");
			} else if (optimized && type === 1) needDeletionCheck = false;
			else assignSlots(slots, children, optimized);
		} else {
			needDeletionCheck = !children.$stable;
			normalizeObjectSlots(children, slots);
		}
		deletionComparisonTarget = children;
	} else if (children) {
		normalizeVNodeSlots(instance, children);
		deletionComparisonTarget = { default: 1 };
	}
	if (needDeletionCheck) {
		for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
	}
};
var supported;
var perf;
function startMeasure(instance, type) {
	if (instance.appContext.config.performance && isSupported$1()) perf.mark(`vue-${type}-${instance.uid}`);
	devtoolsPerfStart(instance, type, isSupported$1() ? perf.now() : Date.now());
}
function endMeasure(instance, type) {
	if (instance.appContext.config.performance && isSupported$1()) {
		const startTag = `vue-${type}-${instance.uid}`;
		const endTag = startTag + `:end`;
		const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
		perf.mark(endTag);
		perf.measure(measureName, startTag, endTag);
		perf.clearMeasures(measureName);
		perf.clearMarks(startTag);
		perf.clearMarks(endTag);
	}
	devtoolsPerfEnd(instance, type, isSupported$1() ? perf.now() : Date.now());
}
function isSupported$1() {
	if (supported !== void 0) return supported;
	if (typeof window !== "undefined" && window.performance) {
		supported = true;
		perf = window.performance;
	} else supported = false;
	return supported;
}
function initFeatureFlags() {
	const needWarn = [];
	if (needWarn.length) {
		const multi = needWarn.length > 1;
		console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
	}
}
var queuePostRenderEffect = queueEffectWithSuspense;
function createHydrationRenderer(options) {
	return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
	initFeatureFlags();
	const target = getGlobalThis();
	target.__VUE__ = true;
	setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
	const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
	const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
		if (n1 === n2) return;
		if (n1 && !isSameVNodeType(n1, n2)) {
			anchor = getNextHostNode(n1);
			unmount(n1, parentComponent, parentSuspense, true);
			n1 = null;
		}
		if (n2.patchFlag === -2) {
			optimized = false;
			n2.dynamicChildren = null;
		}
		if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
			if (n2.dynamicChildren === EMPTY_ARR) n2.dynamicChildren = [];
			n2.dynamicChildren.hasOnce = true;
		}
		const { type, ref, shapeFlag } = n2;
		switch (type) {
			case Text:
				processText(n1, n2, container, anchor);
				break;
			case Comment:
				processCommentNode(n1, n2, container, anchor);
				break;
			case Static:
				if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
				else patchStaticNode(n1, n2, container, namespace);
				break;
			case Fragment:
				processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				break;
			default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			else warn$1("Invalid VNode type:", type, `(${typeof type})`);
		}
		if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
		else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
	};
	const processText = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
		else {
			const el = n2.el = n1.el;
			if (n2.children !== n1.children) hostSetText(el, n2.children);
		}
	};
	const processCommentNode = (n1, n2, container, anchor) => {
		if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
		else n2.el = n1.el;
	};
	const mountStaticNode = (n2, container, anchor, namespace) => {
		[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
	};
	const patchStaticNode = (n1, n2, container, namespace) => {
		if (n2.children !== n1.children) {
			const anchor = hostNextSibling(n1.anchor);
			removeStaticNode(n1);
			[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
		} else {
			n2.el = n1.el;
			n2.anchor = n1.anchor;
		}
	};
	const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostInsert(el, container, nextSibling);
			el = next;
		}
		hostInsert(anchor, container, nextSibling);
	};
	const removeStaticNode = ({ el, anchor }) => {
		let next;
		while (el && el !== anchor) {
			next = hostNextSibling(el);
			hostRemove(el);
			el = next;
		}
		hostRemove(anchor);
	};
	const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		if (n2.type === "svg") namespace = "svg";
		else if (n2.type === "math") namespace = "mathml";
		if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		else {
			const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
			try {
				if (customElement) customElement._beginPatch();
				patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} finally {
				if (customElement) customElement._endPatch();
			}
		}
	};
	const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let el;
		let vnodeHook;
		const { props, shapeFlag, transition, dirs } = vnode;
		el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
		if (shapeFlag & 8) hostSetElementText(el, vnode.children);
		else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
		setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
		if (props) {
			for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
			if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
			if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		}
		def(el, "__vnode", vnode, true);
		def(el, "__vueParentComponent", parentComponent, true);
		if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
		const needCallTransitionHooks = needTransition(parentSuspense, transition);
		if (needCallTransitionHooks) transition.beforeEnter(el);
		hostInsert(el, container, anchor);
		if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
			const isHmr = isHmrUpdating;
			queuePostRenderEffect(() => {
				let prev;
				prev = setHmrUpdating(isHmr);
				try {
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
					needCallTransitionHooks && transition.enter(el);
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
				} finally {
					setHmrUpdating(prev);
				}
			}, parentSuspense);
		}
	};
	const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
		if (scopeId) hostSetScopeId(el, scopeId);
		if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
		if (parentComponent) {
			let subTree = parentComponent.subTree;
			if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) subTree = filterSingleRoot(subTree.children) || subTree;
			if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
				const parentVNode = parentComponent.vnode;
				setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
			}
		}
	};
	const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
		for (let i = start; i < children.length; i++) {
			const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
			patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const el = n2.el = n1.el;
		el.__vnode = n2;
		let { patchFlag, dynamicChildren, dirs } = n2;
		patchFlag |= n1.patchFlag & 16;
		const oldProps = n1.props || EMPTY_OBJ;
		const newProps = n2.props || EMPTY_OBJ;
		let vnodeHook;
		parentComponent && toggleRecurse(parentComponent, false);
		if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
		if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
		parentComponent && toggleRecurse(parentComponent, true);
		if (isHmrUpdating || dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
		if (dynamicChildren) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			traverseStaticChildren(n1, n2);
		} else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
		if (patchFlag > 0) {
			if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
			else {
				if (patchFlag & 2) {
					if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
				}
				if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
				if (patchFlag & 8) {
					const propsToUpdate = n2.dynamicProps;
					for (let i = 0; i < propsToUpdate.length; i++) {
						const key = propsToUpdate[i];
						const prev = oldProps[key];
						const next = newProps[key];
						if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
					}
				}
			}
			if (patchFlag & 1) {
				if (n1.children !== n2.children) hostSetElementText(el, n2.children);
			}
		} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
		if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
		}, parentSuspense);
	};
	const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
		for (let i = 0; i < newChildren.length; i++) {
			const oldVNode = oldChildren[i];
			const newVNode = newChildren[i];
			const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldVNode.el) : fallbackContainer;
			patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
		}
	};
	const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
		if (oldProps !== newProps) {
			if (oldProps !== EMPTY_OBJ) {
				for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
			}
			for (const key in newProps) {
				if (isReservedProp(key)) continue;
				const next = newProps[key];
				const prev = oldProps[key];
				if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
			}
			if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
		}
	};
	const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
		const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
		let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
		if (isHmrUpdating || patchFlag & 2048) {
			patchFlag = 0;
			optimized = false;
			dynamicChildren = null;
		}
		if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
		if (n1 == null) {
			hostInsert(fragmentStartAnchor, container, anchor);
			hostInsert(fragmentEndAnchor, container, anchor);
			mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
			patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
			traverseStaticChildren(n1, n2);
		} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
	};
	const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		n2.slotScopeIds = slotScopeIds;
		if (n1 == null) {
			if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
			else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
		} else updateComponent(n1, n2, optimized);
	};
	const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
		const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
		if (instance.type.__hmrId) registerHMR(instance);
		pushWarningContext(initialVNode);
		startMeasure(instance, `mount`);
		if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
		startMeasure(instance, `init`);
		setupComponent(instance, false, optimized);
		endMeasure(instance, `init`);
		if (isHmrUpdating) initialVNode.el = null;
		if (instance.asyncDep) {
			parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
			if (!initialVNode.el) {
				const placeholder = instance.subTree = createVNode(Comment);
				processCommentNode(null, placeholder, container, anchor);
				initialVNode.placeholder = placeholder.el;
			}
		} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		popWarningContext();
		endMeasure(instance, `mount`);
	};
	const updateComponent = (n1, n2, optimized) => {
		const instance = n2.component = n1.component;
		if (shouldUpdateComponent(n1, n2, optimized)) {
			if (instance.asyncDep && !instance.asyncResolved) {
				pushWarningContext(n2);
				n2.el = n1.el;
				updateComponentPreRender(instance, n2, optimized);
				popWarningContext();
				return;
			} else {
				instance.next = n2;
				instance.update();
			}
		} else {
			n2.el = n1.el;
			instance.vnode = n2;
		}
	};
	const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
		const componentUpdateFn = () => {
			if (!instance.isMounted) {
				let vnodeHook;
				const { el, props } = initialVNode;
				const { bm, m, parent, root, type } = instance;
				const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
				toggleRecurse(instance, false);
				if (bm) invokeArrayFns(bm);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
				toggleRecurse(instance, true);
				if (el && hydrateNode) {
					const hydrateSubTree = () => {
						startMeasure(instance, `render`);
						instance.subTree = renderComponentRoot(instance);
						endMeasure(instance, `render`);
						startMeasure(instance, `hydrate`);
						hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						endMeasure(instance, `hydrate`);
					};
					if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
					else hydrateSubTree();
				} else {
					if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
					startMeasure(instance, `render`);
					const subTree = instance.subTree = renderComponentRoot(instance);
					endMeasure(instance, `render`);
					startMeasure(instance, `patch`);
					patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
					endMeasure(instance, `patch`);
					initialVNode.el = subTree.el;
				}
				if (m) queuePostRenderEffect(m, parentSuspense);
				if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
					const scopedInitialVNode = initialVNode;
					queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
				}
				if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
				instance.isMounted = true;
				devtoolsComponentAdded(instance);
				initialVNode = container = anchor = null;
			} else {
				let { next, bu, u, parent, vnode } = instance;
				{
					const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
					if (nonHydratedAsyncRoot) {
						if (next) {
							next.el = vnode.el;
							updateComponentPreRender(instance, next, optimized);
						}
						nonHydratedAsyncRoot.asyncDep.then(() => {
							queuePostRenderEffect(() => {
								if (!instance.isUnmounted) update();
							}, parentSuspense);
						});
						return;
					}
				}
				let originNext = next;
				let vnodeHook;
				pushWarningContext(next || instance.vnode);
				toggleRecurse(instance, false);
				if (next) {
					next.el = vnode.el;
					updateComponentPreRender(instance, next, optimized);
				} else next = vnode;
				if (bu) invokeArrayFns(bu);
				if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
				toggleRecurse(instance, true);
				startMeasure(instance, `render`);
				const nextTree = renderComponentRoot(instance);
				endMeasure(instance, `render`);
				const prevTree = instance.subTree;
				instance.subTree = nextTree;
				startMeasure(instance, `patch`);
				patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
				endMeasure(instance, `patch`);
				next.el = nextTree.el;
				if (originNext === null) updateHOCHostEl(instance, nextTree.el);
				if (u) queuePostRenderEffect(u, parentSuspense);
				if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
				devtoolsComponentUpdated(instance);
				popWarningContext();
			}
		};
		instance.scope.on();
		const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
		instance.scope.off();
		const update = instance.update = effect.run.bind(effect);
		const job = instance.job = effect.runIfDirty.bind(effect);
		job.i = instance;
		job.id = instance.uid;
		effect.scheduler = () => queueJob(job);
		toggleRecurse(instance, true);
		effect.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
		effect.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
		update();
	};
	const updateComponentPreRender = (instance, nextVNode, optimized) => {
		nextVNode.component = instance;
		const prevProps = instance.vnode.props;
		instance.vnode = nextVNode;
		instance.next = null;
		updateProps(instance, nextVNode.props, prevProps, optimized);
		updateSlots(instance, nextVNode.children, optimized);
		pauseTracking();
		flushPreFlushCbs(instance);
		resetTracking();
	};
	const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
		const c1 = n1 && n1.children;
		const prevShapeFlag = n1 ? n1.shapeFlag : 0;
		const c2 = n2.children;
		const { patchFlag, shapeFlag } = n2;
		if (patchFlag > 0) {
			if (patchFlag & 128) {
				patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			} else if (patchFlag & 256) {
				patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				return;
			}
		}
		if (shapeFlag & 8) {
			if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
			if (c2 !== c1) hostSetElementText(container, c2);
		} else if (prevShapeFlag & 16) {
			if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else unmountChildren(c1, parentComponent, parentSuspense, true);
		} else {
			if (prevShapeFlag & 8) hostSetElementText(container, "");
			if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
	};
	const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		c1 = c1 || EMPTY_ARR;
		c2 = c2 || EMPTY_ARR;
		const oldLength = c1.length;
		const newLength = c2.length;
		const commonLength = Math.min(oldLength, newLength);
		let i = 0;
		for (; i < commonLength; i++) {
			const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		}
		if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
		else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
	};
	const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
		let i = 0;
		const l2 = c2.length;
		let e1 = c1.length - 1;
		let e2 = l2 - 1;
		while (i <= e1 && i <= e2) {
			const n1 = c1[i];
			const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			i++;
		}
		while (i <= e1 && i <= e2) {
			const n1 = c1[e1];
			const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
			if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else break;
			e1--;
			e2--;
		}
		if (i > e1) {
			if (i <= e2) {
				const nextPos = e2 + 1;
				const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
				while (i <= e2) {
					patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					i++;
				}
			}
		} else if (i > e2) while (i <= e1) {
			unmount(c1[i], parentComponent, parentSuspense, true);
			i++;
		}
		else {
			const s1 = i;
			const s2 = i;
			const keyToNewIndexMap = /* @__PURE__ */ new Map();
			for (i = s2; i <= e2; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (nextChild.key != null) {
					if (keyToNewIndexMap.has(nextChild.key)) warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
					keyToNewIndexMap.set(nextChild.key, i);
				}
			}
			let j;
			let patched = 0;
			const toBePatched = e2 - s2 + 1;
			let moved = false;
			let maxNewIndexSoFar = 0;
			const newIndexToOldIndexMap = new Array(toBePatched);
			for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
			for (i = s1; i <= e1; i++) {
				const prevChild = c1[i];
				if (patched >= toBePatched) {
					unmount(prevChild, parentComponent, parentSuspense, true);
					continue;
				}
				let newIndex;
				if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
				else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
					newIndex = j;
					break;
				}
				if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
				else {
					newIndexToOldIndexMap[newIndex - s2] = i + 1;
					if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
					else moved = true;
					patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					patched++;
				}
			}
			const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
			j = increasingNewIndexSequence.length - 1;
			for (i = toBePatched - 1; i >= 0; i--) {
				const nextIndex = s2 + i;
				const nextChild = c2[nextIndex];
				const anchorVNode = c2[nextIndex + 1];
				const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
				if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (moved) {
					if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
					else j--;
				}
			}
		}
	};
	const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
		const { el, type, transition, children, shapeFlag } = vnode;
		if (shapeFlag & 6) {
			move(vnode.component.subTree, container, anchor, moveType);
			return;
		}
		if (shapeFlag & 128) {
			vnode.suspense.move(container, anchor, moveType);
			return;
		}
		if (shapeFlag & 64) {
			type.move(vnode, container, anchor, internals);
			return;
		}
		if (type === Fragment) {
			hostInsert(el, container, anchor);
			for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
			hostInsert(vnode.anchor, container, anchor);
			return;
		}
		if (type === Static) {
			moveStaticNode(vnode, container, anchor);
			return;
		}
		if (moveType !== 2 && shapeFlag & 1 && transition) {
			if (moveType === 0) {
				if (transition.persisted && !el[leaveCbKey]) hostInsert(el, container, anchor);
				else {
					transition.beforeEnter(el);
					hostInsert(el, container, anchor);
					queuePostRenderEffect(() => transition.enter(el), parentSuspense);
				}
			} else {
				const { leave, delayLeave, afterLeave } = transition;
				const remove2 = () => {
					if (vnode.ctx.isUnmounted) hostRemove(el);
					else hostInsert(el, container, anchor);
				};
				const performLeave = () => {
					const wasLeaving = el._isLeaving || !!el[leaveCbKey];
					if (el._isLeaving) el[leaveCbKey](true);
					if (transition.persisted && !wasLeaving) remove2();
					else leave(el, () => {
						remove2();
						afterLeave && afterLeave();
					});
				};
				if (delayLeave) delayLeave(el, remove2, performLeave);
				else performLeave();
			}
		} else hostInsert(el, container, anchor);
	};
	const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
		const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
		if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) optimized = false;
		if (ref != null) {
			pauseTracking();
			setRef(ref, null, parentSuspense, vnode, true);
			resetTracking();
		}
		if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) parentComponent.renderCache[cacheIndex] = void 0;
		if (shapeFlag & 256) {
			parentComponent.ctx.deactivate(vnode);
			return;
		}
		const shouldInvokeDirs = shapeFlag & 1 && dirs;
		const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
		let vnodeHook;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
		if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
		else {
			if (shapeFlag & 128) {
				vnode.suspense.unmount(parentSuspense, doRemove);
				return;
			}
			if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
			if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
			else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
			else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
			if (doRemove) remove(vnode);
		}
		const shouldInvalidateMemo = memo != null && cacheIndex == null;
		if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
			vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
			shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
			if (shouldInvalidateMemo) vnode.el = null;
		}, parentSuspense);
	};
	const remove = (vnode) => {
		const { type, el, anchor, transition } = vnode;
		if (type === Fragment) {
			if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) vnode.children.forEach((child) => {
				if (child.type === Comment) hostRemove(child.el);
				else remove(child);
			});
			else removeFragment(el, anchor);
			return;
		}
		if (type === Static) {
			removeStaticNode(vnode);
			if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
			return;
		}
		const performRemove = () => {
			hostRemove(el);
			if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
		};
		if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
			const { leave, delayLeave } = transition;
			const performLeave = () => leave(el, performRemove);
			if (delayLeave) delayLeave(vnode.el, performRemove, performLeave);
			else performLeave();
		} else performRemove();
	};
	const removeFragment = (cur, end) => {
		let next;
		while (cur !== end) {
			next = hostNextSibling(cur);
			hostRemove(cur);
			cur = next;
		}
		hostRemove(end);
	};
	const unmountComponent = (instance, parentSuspense, doRemove) => {
		if (instance.type.__hmrId) unregisterHMR(instance);
		const { bum, scope, job, subTree, um, m, a } = instance;
		invalidateMount(m);
		invalidateMount(a);
		if (bum) invokeArrayFns(bum);
		scope.stop();
		if (job) {
			job.flags |= 8;
			unmount(subTree, instance, parentSuspense, doRemove);
		} else if (instance.vnode.el && subTree) {
			subTree.transition = instance.vnode.transition;
			unmount(subTree, instance, parentSuspense, doRemove);
		}
		if (um) queuePostRenderEffect(um, parentSuspense);
		queuePostRenderEffect(() => {
			instance.isUnmounted = true;
		}, parentSuspense);
		devtoolsComponentRemoved(instance);
	};
	const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
		for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
	};
	const getNextHostNode = (vnode) => {
		if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
		if (vnode.shapeFlag & 128) return vnode.suspense.next();
		const el = hostNextSibling(vnode.anchor || vnode.el);
		const teleportEnd = el && el[TeleportEndKey];
		return teleportEnd ? hostNextSibling(teleportEnd) : el;
	};
	let isFlushing = false;
	const render = (vnode, container, namespace) => {
		let instance;
		if (vnode == null) {
			if (container._vnode) {
				unmount(container._vnode, null, null, true);
				instance = container._vnode.component;
			}
		} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
		container._vnode = vnode;
		if (!isFlushing) {
			isFlushing = true;
			flushPreFlushCbs(instance);
			flushPostFlushCbs();
			isFlushing = false;
		}
	};
	const internals = {
		p: patch,
		um: unmount,
		m: move,
		r: remove,
		mt: mountComponent,
		mc: mountChildren,
		pc: patchChildren,
		pbc: patchBlockChildren,
		n: getNextHostNode,
		o: options
	};
	let hydrate;
	let hydrateNode;
	if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
	return {
		render,
		hydrate,
		createApp: createAppAPI(render, hydrate)
	};
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
	return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect, job }, allowed) {
	if (allowed) {
		effect.flags |= 32;
		job.flags |= 4;
	} else {
		effect.flags &= -33;
		job.flags &= -5;
	}
}
function needTransition(parentSuspense, transition) {
	return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
	const ch1 = n1.children;
	const ch2 = n2.children;
	if (isArray$3(ch1) && isArray$3(ch2)) for (let i = 0; i < ch1.length; i++) {
		const c1 = ch1[i];
		let c2 = ch2[i];
		if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
			if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
				c2 = ch2[i] = cloneIfMounted(ch2[i]);
				c2.el = c1.el;
			}
			if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
		}
		if (c2.type === Text) {
			if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
			c2.el = c1.el;
		}
		if (c2.type === Comment && !c2.el) c2.el = c1.el;
		c2.el && (c2.el.__vnode = c2);
	}
}
function getSequence(arr) {
	const p = arr.slice();
	const result = [0];
	let i, j, u, v, c;
	const len = arr.length;
	for (i = 0; i < len; i++) {
		const arrI = arr[i];
		if (arrI !== 0) {
			j = result[result.length - 1];
			if (arr[j] < arrI) {
				p[i] = j;
				result.push(i);
				continue;
			}
			u = 0;
			v = result.length - 1;
			while (u < v) {
				c = u + v >> 1;
				if (arr[result[c]] < arrI) u = c + 1;
				else v = c;
			}
			if (arrI < arr[result[u]]) {
				if (u > 0) p[i] = result[u - 1];
				result[u] = i;
			}
		}
	}
	u = result.length;
	v = result[u - 1];
	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}
	return result;
}
function locateNonHydratedAsyncRoot(instance) {
	const subComponent = instance.subTree.component;
	if (subComponent) {
		if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
		else return locateNonHydratedAsyncRoot(subComponent);
	}
}
function invalidateMount(hooks) {
	if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
	if (anchorVnode.placeholder) return anchorVnode.placeholder;
	const instance = anchorVnode.component;
	if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
	return null;
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
	if (suspense && suspense.pendingBranch) {
		if (isArray$3(fn)) suspense.effects.push(...fn);
		else suspense.effects.push(fn);
	} else queuePostFlushCb(fn);
}
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
var Text = /* @__PURE__ */ Symbol.for("v-txt");
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
var Static = /* @__PURE__ */ Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
	blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
	blockStack.pop();
	currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
	isBlockTreeEnabled += value;
	if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
}
function setupBlock(vnode) {
	vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
	closeBlock();
	if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
	return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
	return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
	return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
}
function isVNode(value) {
	return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
	if (n2.shapeFlag & 6 && n1.component) {
		const dirtyInstances = hmrDirtyComponents.get(n2.type);
		if (dirtyInstances && dirtyInstances.has(n1.component)) {
			n1.shapeFlag &= -257;
			n2.shapeFlag &= -513;
			return false;
		}
	}
	return n1.type === n2.type && n1.key === n2.key;
}
var createVNodeWithArgsTransform = (...args) => {
	return _createVNode(...args);
};
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({ ref, ref_key, ref_for }) => {
	if (typeof ref === "number") ref = "" + ref;
	return ref != null ? isString$2(ref) || /* @__PURE__ */ isRef(ref) || isFunction(ref) ? {
		i: currentRenderingInstance,
		r: ref,
		k: ref_key,
		f: !!ref_for
	} : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
	const vnode = {
		__v_isVNode: true,
		__v_skip: true,
		type,
		props,
		key: props && normalizeKey(props),
		ref: props && normalizeRef(props),
		scopeId: currentScopeId,
		slotScopeIds: null,
		children,
		component: null,
		suspense: null,
		ssContent: null,
		ssFallback: null,
		dirs: null,
		transition: null,
		el: null,
		anchor: null,
		target: null,
		targetStart: null,
		targetAnchor: null,
		staticCount: 0,
		shapeFlag,
		patchFlag,
		dynamicProps,
		dynamicChildren: null,
		appContext: null,
		ctx: currentRenderingInstance
	};
	if (needFullChildrenNormalization) {
		normalizeChildren(vnode, children);
		if (shapeFlag & 128) type.normalize(vnode);
	} else if (children) vnode.shapeFlag |= isString$2(children) ? 8 : 16;
	if (vnode.key !== vnode.key) warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
	if (props && vnode.shapeFlag & 1) {
		const overwritingProp = props.innerHTML != null ? "innerHTML" : props.textContent != null ? "textContent" : null;
		if (overwritingProp && hasContentChildren(vnode.children)) warn$1(`The \`${overwritingProp}\` prop on <${vnode.type}> will override its children. Remove either the \`${overwritingProp}\` prop or the children.`);
	}
	if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
	return vnode;
}
function hasContentChildren(children) {
	if (isString$2(children)) return children !== "";
	if (isArray$3(children)) return children.length > 0;
	return false;
}
var createVNode = createVNodeWithArgsTransform;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
	if (!type || type === NULL_DYNAMIC_COMPONENT) {
		if (!type) warn$1(`Invalid vnode type when creating vnode: ${type}.`);
		type = Comment;
	}
	if (isVNode(type)) {
		const cloned = cloneVNode(type, props, true);
		if (children) normalizeChildren(cloned, children);
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
			if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
			else currentBlock.push(cloned);
		}
		cloned.patchFlag = -2;
		return cloned;
	}
	if (isClassComponent(type)) type = type.__vccOpts;
	if (props) {
		props = guardReactiveProps(props);
		let { class: klass, style } = props;
		if (klass && !isString$2(klass)) props.class = normalizeClass(klass);
		if (isObject$1(style)) {
			if (/* @__PURE__ */ isProxy(style) && !isArray$3(style)) style = extend({}, style);
			props.style = normalizeStyle(style);
		}
	}
	const shapeFlag = isString$2(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
	if (shapeFlag & 4 && /* @__PURE__ */ isProxy(type)) {
		type = /* @__PURE__ */ toRaw(type);
		warn$1(`Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
	}
	return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
}
function guardReactiveProps(props) {
	if (!props) return null;
	return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
	const { props, ref, patchFlag, children, transition } = vnode;
	const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
	const cloned = {
		__v_isVNode: true,
		__v_skip: true,
		type: vnode.type,
		props: mergedProps,
		key: mergedProps && normalizeKey(mergedProps),
		ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray$3(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
		scopeId: vnode.scopeId,
		slotScopeIds: vnode.slotScopeIds,
		children: patchFlag === -1 && isArray$3(children) ? children.map(deepCloneVNode) : children,
		target: vnode.target,
		targetStart: vnode.targetStart,
		targetAnchor: vnode.targetAnchor,
		staticCount: vnode.staticCount,
		shapeFlag: vnode.shapeFlag,
		patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
		dynamicProps: vnode.dynamicProps,
		dynamicChildren: vnode.dynamicChildren,
		appContext: vnode.appContext,
		dirs: vnode.dirs,
		transition,
		component: vnode.component,
		suspense: vnode.suspense,
		ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
		ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
		placeholder: vnode.placeholder,
		el: vnode.el,
		anchor: vnode.anchor,
		ctx: vnode.ctx,
		ce: vnode.ce,
		cacheIndex: vnode.cacheIndex
	};
	if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
	return cloned;
}
function deepCloneVNode(vnode) {
	const cloned = cloneVNode(vnode);
	if (isArray$3(vnode.children)) cloned.children = vnode.children.map(deepCloneVNode);
	return cloned;
}
function createTextVNode(text = " ", flag = 0) {
	return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
	const vnode = createVNode(Static, null, content);
	vnode.staticCount = numberOfNodes;
	return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
	return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
	if (child == null || typeof child === "boolean") return createVNode(Comment);
	else if (isArray$3(child)) return createVNode(Fragment, null, child.slice());
	else if (isVNode(child)) return cloneIfMounted(child);
	else return createVNode(Text, null, String(child));
}
function cloneIfMounted(child) {
	return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
	let type = 0;
	const { shapeFlag } = vnode;
	if (children == null) children = null;
	else if (isArray$3(children)) type = 16;
	else if (typeof children === "object") {
		if (shapeFlag & 65) {
			const slot = children.default;
			if (slot) {
				slot._c && (slot._d = false);
				normalizeChildren(vnode, slot());
				slot._c && (slot._d = true);
			}
			return;
		} else {
			type = 32;
			const slotFlag = children._;
			if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
			else if (slotFlag === 3 && currentRenderingInstance) {
				if (currentRenderingInstance.slots._ === 1) children._ = 1;
				else {
					children._ = 2;
					vnode.patchFlag |= 1024;
				}
			}
		}
	} else if (isFunction(children)) {
		if (shapeFlag & 65) {
			normalizeChildren(vnode, { default: children });
			return;
		}
		children = {
			default: children,
			_ctx: currentRenderingInstance
		};
		type = 32;
	} else {
		children = String(children);
		if (shapeFlag & 64) {
			type = 16;
			children = [createTextVNode(children)];
		} else type = 8;
	}
	vnode.children = children;
	vnode.shapeFlag |= type;
}
function mergeProps(...args) {
	const ret = {};
	for (let i = 0; i < args.length; i++) {
		const toMerge = args[i];
		for (const key in toMerge) if (key === "class") {
			if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
		} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
		else if (isOn(key)) {
			const existing = ret[key];
			const incoming = toMerge[key];
			if (incoming && existing !== incoming && !(isArray$3(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
			else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
		} else if (key !== "") ret[key] = toMerge[key];
	}
	return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
	callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
	const type = vnode.type;
	const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
	const instance = {
		uid: uid++,
		vnode,
		type,
		parent,
		appContext,
		root: null,
		next: null,
		subTree: null,
		effect: null,
		update: null,
		job: null,
		scope: new EffectScope(true),
		render: null,
		proxy: null,
		exposed: null,
		exposeProxy: null,
		withProxy: null,
		provides: parent ? parent.provides : Object.create(appContext.provides),
		ids: parent ? parent.ids : [
			"",
			0,
			0
		],
		accessCache: null,
		renderCache: [],
		components: null,
		directives: null,
		propsOptions: normalizePropsOptions(type, appContext),
		emitsOptions: normalizeEmitsOptions(type, appContext),
		emit: null,
		emitted: null,
		propsDefaults: EMPTY_OBJ,
		inheritAttrs: type.inheritAttrs,
		ctx: EMPTY_OBJ,
		data: EMPTY_OBJ,
		props: EMPTY_OBJ,
		attrs: EMPTY_OBJ,
		slots: EMPTY_OBJ,
		refs: EMPTY_OBJ,
		setupState: EMPTY_OBJ,
		setupContext: null,
		suspense,
		suspenseId: suspense ? suspense.pendingId : 0,
		asyncDep: null,
		asyncResolved: false,
		isMounted: false,
		isUnmounted: false,
		isDeactivated: false,
		bc: null,
		c: null,
		bm: null,
		m: null,
		bu: null,
		u: null,
		um: null,
		bum: null,
		da: null,
		a: null,
		rtg: null,
		rtc: null,
		ec: null,
		sp: null
	};
	instance.ctx = createDevRenderContext(instance);
	instance.root = parent ? parent.root : instance;
	instance.emit = emit.bind(null, instance);
	if (vnode.ce) vnode.ce(instance);
	return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
	const g = getGlobalThis();
	const registerGlobalSetter = (key, setter) => {
		let setters;
		if (!(setters = g[key])) setters = g[key] = [];
		setters.push(setter);
		return (v) => {
			if (setters.length > 1) setters.forEach((set) => set(v));
			else setters[0](v);
		};
	};
	internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
	setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
var setCurrentInstance = (instance) => {
	const prev = currentInstance;
	internalSetCurrentInstance(instance);
	instance.scope.on();
	return () => {
		instance.scope.off();
		internalSetCurrentInstance(prev);
	};
};
var unsetCurrentInstance = () => {
	currentInstance && currentInstance.scope.off();
	internalSetCurrentInstance(null);
};
var isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
	if (isBuiltInTag(name) || isNativeTag(name)) warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
}
function isStatefulComponent(instance) {
	return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
	isSSR && setInSSRSetupState(isSSR);
	const { props, children } = instance.vnode;
	const isStateful = isStatefulComponent(instance);
	initProps(instance, props, isStateful, isSSR);
	initSlots(instance, children, optimized || isSSR);
	const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
	isSSR && setInSSRSetupState(false);
	return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
	const Component = instance.type;
	if (Component.name) validateComponentName(Component.name, instance.appContext.config);
	if (Component.components) {
		const names = Object.keys(Component.components);
		for (let i = 0; i < names.length; i++) validateComponentName(names[i], instance.appContext.config);
	}
	if (Component.directives) {
		const names = Object.keys(Component.directives);
		for (let i = 0; i < names.length; i++) validateDirectiveName(names[i]);
	}
	if (Component.compilerOptions && isRuntimeOnly()) warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
	instance.accessCache = /* @__PURE__ */ Object.create(null);
	instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
	exposePropsOnRenderContext(instance);
	const { setup } = Component;
	if (setup) {
		pauseTracking();
		const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
		const reset = setCurrentInstance(instance);
		const setupResult = callWithErrorHandling(setup, instance, 0, [/* @__PURE__ */ shallowReadonly(instance.props), setupContext]);
		const isAsyncSetup = isPromise(setupResult);
		resetTracking();
		reset();
		if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
		if (isAsyncSetup) {
			setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
			if (isSSR) return setupResult.then((resolvedResult) => {
				setInSSRSetupState(true);
				try {
					handleSetupResult(instance, resolvedResult, isSSR);
				} finally {
					setInSSRSetupState(false);
				}
			}).catch((e) => {
				handleError(e, instance, 0);
			});
			else {
				instance.asyncDep = setupResult;
				if (!instance.suspense) warn$1(`Component <${formatComponentName(instance, Component)}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
			}
		} else handleSetupResult(instance, setupResult, isSSR);
	} else finishComponentSetup(instance, isSSR);
}
function handleSetupResult(instance, setupResult, isSSR) {
	if (isFunction(setupResult)) {
		if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
		else instance.render = setupResult;
	} else if (isObject$1(setupResult)) {
		if (isVNode(setupResult)) warn$1(`setup() should not return VNodes directly - return a render function instead.`);
		instance.devtoolsRawSetupState = setupResult;
		instance.setupState = proxyRefs(setupResult);
		exposeSetupStateOnRenderContext(instance);
	} else if (setupResult !== void 0) warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
	finishComponentSetup(instance, isSSR);
}
var isRuntimeOnly = () => true;
function finishComponentSetup(instance, isSSR, skipOptions) {
	const Component = instance.type;
	if (!instance.render) instance.render = Component.render || NOOP;
	{
		const reset = setCurrentInstance(instance);
		pauseTracking();
		try {
			applyOptions(instance);
		} finally {
			resetTracking();
			reset();
		}
	}
	if (!Component.render && instance.render === NOOP && !isSSR) {
		if (Component.template) warn$1("Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\".");
		else warn$1(`Component is missing template or render function: `, Component);
	}
}
var attrsProxyHandlers = {
	get(target, key) {
		markAttrsAccessed();
		track(target, "get", "");
		return target[key];
	},
	set() {
		warn$1(`setupContext.attrs is readonly.`);
		return false;
	},
	deleteProperty() {
		warn$1(`setupContext.attrs is readonly.`);
		return false;
	}
};
function getSlotsProxy(instance) {
	return new Proxy(instance.slots, { get(target, key) {
		track(instance, "get", "$slots");
		return target[key];
	} });
}
function createSetupContext(instance) {
	const expose = (exposed) => {
		if (instance.exposed) warn$1(`expose() should be called only once per setup().`);
		if (exposed != null) {
			let exposedType = typeof exposed;
			if (exposedType === "object") {
				if (isArray$3(exposed)) exposedType = "array";
				else if (/* @__PURE__ */ isRef(exposed)) exposedType = "ref";
			}
			if (exposedType !== "object") warn$1(`expose() should be passed a plain object, received ${exposedType}.`);
		}
		instance.exposed = exposed || {};
	};
	{
		let attrsProxy;
		let slotsProxy;
		return Object.freeze({
			get attrs() {
				return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
			},
			get slots() {
				return slotsProxy || (slotsProxy = getSlotsProxy(instance));
			},
			get emit() {
				return (event, ...args) => instance.emit(event, ...args);
			},
			expose
		});
	}
}
function getComponentPublicInstance(instance) {
	if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
		get(target, key) {
			if (key in target) return target[key];
			else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
		},
		has(target, key) {
			return key in target || key in publicPropertiesMap;
		}
	}));
	else return instance.proxy;
}
var classifyRE$1 = /(?:^|[-_])\w/g;
var classify$1 = (str) => str.replace(classifyRE$1, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
	return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
	let name = getComponentName(Component);
	if (!name && Component.__file) {
		const match = Component.__file.match(/([^/\\]+)\.\w+$/);
		if (match) name = match[1];
	}
	if (!name && instance) {
		const inferFromRegistry = (registry) => {
			for (const key in registry) if (registry[key] === Component) return key;
		};
		name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
	}
	return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
	return isFunction(value) && "__vccOpts" in value;
}
var computed = (getterOrOptions, debugOptions) => {
	const c = /* @__PURE__ */ computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
	{
		const i = getCurrentInstance();
		if (i && i.appContext.config.warnRecursiveComputed) c._warnRecursive = true;
	}
	return c;
};
function h$1(type, propsOrChildren, children) {
	try {
		setBlockTracking(-1);
		const l = arguments.length;
		if (l === 2) {
			if (isObject$1(propsOrChildren) && !isArray$3(propsOrChildren)) {
				if (isVNode(propsOrChildren)) return createVNode(type, null, [propsOrChildren]);
				return createVNode(type, propsOrChildren);
			} else return createVNode(type, null, propsOrChildren);
		} else {
			if (l > 3) children = Array.prototype.slice.call(arguments, 2);
			else if (l === 3 && isVNode(children)) children = [children];
			return createVNode(type, propsOrChildren, children);
		}
	} finally {
		setBlockTracking(1);
	}
}
function initCustomFormatter() {
	if (typeof window === "undefined") return;
	const vueStyle = { style: "color:#3ba776" };
	const numberStyle = { style: "color:#1677ff" };
	const stringStyle = { style: "color:#f5222d" };
	const keywordStyle = { style: "color:#eb2f96" };
	const formatter = {
		__vue_custom_formatter: true,
		header(obj) {
			if (!isObject$1(obj)) return null;
			if (obj.__isVue) return [
				"div",
				vueStyle,
				`VueInstance`
			];
			else if (/* @__PURE__ */ isRef(obj)) {
				pauseTracking();
				const value = obj.value;
				resetTracking();
				return [
					"div",
					{},
					[
						"span",
						vueStyle,
						genRefFlag(obj)
					],
					"<",
					formatValue(value),
					`>`
				];
			} else if (/* @__PURE__ */ isReactive(obj)) return [
				"div",
				{},
				[
					"span",
					vueStyle,
					/* @__PURE__ */ isShallow(obj) ? "ShallowReactive" : "Reactive"
				],
				"<",
				formatValue(obj),
				`>${/* @__PURE__ */ isReadonly$1(obj) ? ` (readonly)` : ``}`
			];
			else if (/* @__PURE__ */ isReadonly$1(obj)) return [
				"div",
				{},
				[
					"span",
					vueStyle,
					/* @__PURE__ */ isShallow(obj) ? "ShallowReadonly" : "Readonly"
				],
				"<",
				formatValue(obj),
				">"
			];
			return null;
		},
		hasBody(obj) {
			return obj && obj.__isVue;
		},
		body(obj) {
			if (obj && obj.__isVue) return [
				"div",
				{},
				...formatInstance(obj.$)
			];
		}
	};
	function formatInstance(instance) {
		const blocks = [];
		if (instance.type.props && instance.props) blocks.push(createInstanceBlock("props", /* @__PURE__ */ toRaw(instance.props)));
		if (instance.setupState !== EMPTY_OBJ) blocks.push(createInstanceBlock("setup", instance.setupState));
		if (instance.data !== EMPTY_OBJ) blocks.push(createInstanceBlock("data", /* @__PURE__ */ toRaw(instance.data)));
		const computed = extractKeys(instance, "computed");
		if (computed) blocks.push(createInstanceBlock("computed", computed));
		const injected = extractKeys(instance, "inject");
		if (injected) blocks.push(createInstanceBlock("injected", injected));
		blocks.push([
			"div",
			{},
			[
				"span",
				{ style: keywordStyle.style + ";opacity:0.66" },
				"$ (internal): "
			],
			["object", { object: instance }]
		]);
		return blocks;
	}
	function createInstanceBlock(type, target) {
		target = extend({}, target);
		if (!Object.keys(target).length) return ["span", {}];
		return [
			"div",
			{ style: "line-height:1.25em;margin-bottom:0.6em" },
			[
				"div",
				{ style: "color:#476582" },
				type
			],
			[
				"div",
				{ style: "padding-left:1.25em" },
				...Object.keys(target).map((key) => {
					return [
						"div",
						{},
						[
							"span",
							keywordStyle,
							key + ": "
						],
						formatValue(target[key], false)
					];
				})
			]
		];
	}
	function formatValue(v, asRaw = true) {
		if (typeof v === "number") return [
			"span",
			numberStyle,
			v
		];
		else if (typeof v === "string") return [
			"span",
			stringStyle,
			JSON.stringify(v)
		];
		else if (typeof v === "boolean") return [
			"span",
			keywordStyle,
			v
		];
		else if (isObject$1(v)) return ["object", { object: asRaw ? /* @__PURE__ */ toRaw(v) : v }];
		else return [
			"span",
			stringStyle,
			String(v)
		];
	}
	function extractKeys(instance, type) {
		const Comp = instance.type;
		if (isFunction(Comp)) return;
		const extracted = {};
		for (const key in instance.ctx) if (isKeyOfType(Comp, key, type)) extracted[key] = instance.ctx[key];
		return extracted;
	}
	function isKeyOfType(Comp, key, type) {
		const opts = Comp[type];
		if (isArray$3(opts) && opts.includes(key) || isObject$1(opts) && key in opts) return true;
		if (Comp.extends && isKeyOfType(Comp.extends, key, type)) return true;
		if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) return true;
	}
	function genRefFlag(v) {
		if (/* @__PURE__ */ isShallow(v)) return `ShallowRef`;
		if (v.effect) return `ComputedRef`;
		return `Ref`;
	}
	if (window.devtoolsFormatters) window.devtoolsFormatters.push(formatter);
	else window.devtoolsFormatters = [formatter];
}
var version = "3.5.43";
var warn = warn$1;
//#endregion
//#region node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
/**
* @vue/runtime-dom v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) try {
	policy = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (val) => val });
} catch (e) {
	warn(`Error creating trusted types policy: ${e}`);
}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
	insert: (child, parent, anchor) => {
		parent.insertBefore(child, anchor || null);
	},
	remove: (child) => {
		const parent = child.parentNode;
		if (parent) parent.removeChild(child);
	},
	createElement: (tag, namespace, is, props) => {
		const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
		if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
		return el;
	},
	createText: (text) => doc.createTextNode(text),
	createComment: (text) => doc.createComment(text),
	setText: (node, text) => {
		node.nodeValue = text;
	},
	setElementText: (el, text) => {
		el.textContent = text;
	},
	parentNode: (node) => node.parentNode,
	nextSibling: (node) => node.nextSibling,
	querySelector: (selector) => doc.querySelector(selector),
	setScopeId(el, id) {
		el.setAttribute(id, "");
	},
	insertStaticContent(content, parent, anchor, namespace, start, end) {
		const before = anchor ? anchor.previousSibling : parent.lastChild;
		if (start && (start === end || start.nextSibling)) while (true) {
			parent.insertBefore(start.cloneNode(true), anchor);
			if (start === end || !(start = start.nextSibling)) break;
		}
		else {
			templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
			const template = templateContainer.content;
			if (namespace === "svg" || namespace === "mathml") {
				const wrapper = template.firstChild;
				while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
				template.removeChild(wrapper);
			}
			parent.insertBefore(template, anchor);
		}
		return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
	}
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
var DOMTransitionPropsValidators = {
	name: String,
	type: String,
	css: {
		type: Boolean,
		default: true
	},
	duration: [
		String,
		Number,
		Object
	],
	enterFromClass: String,
	enterActiveClass: String,
	enterToClass: String,
	appearFromClass: String,
	appearActiveClass: String,
	appearToClass: String,
	leaveFromClass: String,
	leaveActiveClass: String,
	leaveToClass: String
};
var TransitionPropsValidators = /* @__PURE__ */ extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var decorate$1 = (t) => {
	t.displayName = "Transition";
	t.props = TransitionPropsValidators;
	return t;
};
var Transition = /* @__PURE__ */ decorate$1((props, { slots }) => h$1(BaseTransition, resolveTransitionProps(props), slots));
var callHook = (hook, args = []) => {
	if (isArray$3(hook)) hook.forEach((h2) => h2(...args));
	else if (hook) hook(...args);
};
var hasExplicitCallback = (hook) => {
	return hook ? isArray$3(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
	const baseProps = {};
	for (const key in rawProps) if (!(key in DOMTransitionPropsValidators)) baseProps[key] = rawProps[key];
	if (rawProps.css === false) return baseProps;
	const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
	const durations = normalizeDuration(duration);
	const enterDuration = durations && durations[0];
	const leaveDuration = durations && durations[1];
	const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
	const finishEnter = (el, isAppear, done, isCancelled) => {
		el._enterCancelled = isCancelled;
		removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
		removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
		done && done();
	};
	const finishLeave = (el, done) => {
		el._isLeaving = false;
		removeTransitionClass(el, leaveFromClass);
		removeTransitionClass(el, leaveToClass);
		removeTransitionClass(el, leaveActiveClass);
		done && done();
	};
	const makeEnterHook = (isAppear) => {
		return (el, done) => {
			const hook = isAppear ? onAppear : onEnter;
			const resolve = () => finishEnter(el, isAppear, done);
			callHook(hook, [el, resolve]);
			nextFrame(() => {
				removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
				addTransitionClass(el, isAppear ? appearToClass : enterToClass);
				if (!hasExplicitCallback(hook)) whenTransitionEnds(el, type, enterDuration, resolve);
			});
		};
	};
	return extend(baseProps, {
		onBeforeEnter(el) {
			callHook(onBeforeEnter, [el]);
			addTransitionClass(el, enterFromClass);
			addTransitionClass(el, enterActiveClass);
		},
		onBeforeAppear(el) {
			callHook(onBeforeAppear, [el]);
			addTransitionClass(el, appearFromClass);
			addTransitionClass(el, appearActiveClass);
		},
		onEnter: makeEnterHook(false),
		onAppear: makeEnterHook(true),
		onLeave(el, done) {
			el._isLeaving = true;
			const resolve = () => finishLeave(el, done);
			addTransitionClass(el, leaveFromClass);
			if (!el._enterCancelled) {
				forceReflow(el);
				addTransitionClass(el, leaveActiveClass);
			} else {
				addTransitionClass(el, leaveActiveClass);
				forceReflow(el);
			}
			nextFrame(() => {
				if (!el._isLeaving) return;
				removeTransitionClass(el, leaveFromClass);
				addTransitionClass(el, leaveToClass);
				if (!hasExplicitCallback(onLeave)) whenTransitionEnds(el, type, leaveDuration, resolve);
			});
			callHook(onLeave, [el, resolve]);
		},
		onEnterCancelled(el) {
			finishEnter(el, false, void 0, true);
			callHook(onEnterCancelled, [el]);
		},
		onAppearCancelled(el) {
			finishEnter(el, true, void 0, true);
			callHook(onAppearCancelled, [el]);
		},
		onLeaveCancelled(el) {
			finishLeave(el);
			callHook(onLeaveCancelled, [el]);
		}
	});
}
function normalizeDuration(duration) {
	if (duration == null) return null;
	else if (isObject$1(duration)) return [NumberOf(duration.enter), NumberOf(duration.leave)];
	else {
		const n = NumberOf(duration);
		return [n, n];
	}
}
function NumberOf(val) {
	const res = toNumber(val);
	assertNumber(res, "<transition> explicit duration");
	return res;
}
function addTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
	(el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
	cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
	const _vtc = el[vtcKey];
	if (_vtc) {
		_vtc.delete(cls);
		if (!_vtc.size) el[vtcKey] = void 0;
	}
}
function nextFrame(cb) {
	requestAnimationFrame(() => {
		requestAnimationFrame(cb);
	});
}
var endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
	const id = el._endId = ++endId;
	const resolveIfNotStale = () => {
		if (id === el._endId) resolve();
	};
	if (explicitTimeout != null) return setTimeout(resolveIfNotStale, explicitTimeout);
	const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
	if (!type) return resolve();
	const endEvent = type + "end";
	let ended = 0;
	const end = () => {
		el.removeEventListener(endEvent, onEnd);
		resolveIfNotStale();
	};
	const onEnd = (e) => {
		if (e.target === el && ++ended >= propCount) end();
	};
	setTimeout(() => {
		if (ended < propCount) end();
	}, timeout + 1);
	el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
	const styles = window.getComputedStyle(el);
	const getStyleProperties = (key) => (styles[key] || "").split(", ");
	const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
	const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
	const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
	const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
	const animationTimeout = getTimeout(animationDelays, animationDurations);
	let type = null;
	let timeout = 0;
	let propCount = 0;
	if (expectedType === TRANSITION) {
		if (transitionTimeout > 0) {
			type = TRANSITION;
			timeout = transitionTimeout;
			propCount = transitionDurations.length;
		}
	} else if (expectedType === ANIMATION) {
		if (animationTimeout > 0) {
			type = ANIMATION;
			timeout = animationTimeout;
			propCount = animationDurations.length;
		}
	} else {
		timeout = Math.max(transitionTimeout, animationTimeout);
		type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
		propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
	}
	const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
	return {
		type,
		timeout,
		propCount,
		hasTransform
	};
}
function getTimeout(delays, durations) {
	while (delays.length < durations.length) delays = delays.concat(delays);
	return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
	if (s === "auto") return 0;
	return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
	return (el ? el.ownerDocument : document).body.offsetHeight;
}
function patchClass(el, value, isSVG) {
	const transitionClasses = el[vtcKey];
	if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
	if (value == null) el.removeAttribute("class");
	else if (isSVG) el.setAttribute("class", value);
	else el.className = value;
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
	name: "show",
	beforeMount(el, { value }, { transition }) {
		el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
		if (transition && value) transition.beforeEnter(el);
		else setDisplay(el, value);
	},
	mounted(el, { value }, { transition }) {
		if (transition && value) transition.enter(el);
	},
	updated(el, { value, oldValue }, { transition }) {
		if (!value === !oldValue) return;
		if (transition) {
			if (value) {
				transition.beforeEnter(el);
				setDisplay(el, true);
				transition.enter(el);
			} else transition.leave(el, () => {
				setDisplay(el, false);
			});
		} else setDisplay(el, value);
	},
	beforeUnmount(el, { value }) {
		setDisplay(el, value);
	}
};
function setDisplay(el, value) {
	el.style.display = value ? el[vShowOriginalDisplay] : "none";
	el[vShowHidden] = !value;
}
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("CSS_VAR_TEXT");
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
	const style = el.style;
	const isCssString = isString$2(next);
	let hasControlledDisplay = false;
	if (next && !isCssString) {
		if (prev) {
			if (!isString$2(prev)) {
				for (const key in prev) if (next[key] == null) setStyle(style, key, "");
			} else for (const prevStyle of prev.split(";")) {
				const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
				if (next[key] == null) setStyle(style, key, "");
			}
		}
		for (const key in next) {
			if (key === "display") hasControlledDisplay = true;
			const value = next[key];
			if (value != null) {
				if (!shouldPreserveTextareaResizeStyle(el, key, !isString$2(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
			} else setStyle(style, key, "");
		}
	} else if (isCssString) {
		if (prev !== next) {
			const cssVarText = style[CSS_VAR_TEXT];
			if (cssVarText) next += ";" + cssVarText;
			style.cssText = next;
			hasControlledDisplay = displayRE.test(next);
		}
	} else if (prev) el.removeAttribute("style");
	if (vShowOriginalDisplay in el) {
		el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
		if (el[vShowHidden]) style.display = "none";
	}
}
var semicolonRE = /[^\\];\s*$/;
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
	if (isArray$3(val)) val.forEach((v) => setStyle(style, name, v));
	else {
		if (val == null) val = "";
		if (semicolonRE.test(val)) warn(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
		if (name.startsWith("--")) {
			if (importantRE.test(val)) style.setProperty(name, val.replace(importantRE, ""), "important");
			else style.setProperty(name, val);
		} else {
			const prefixed = autoPrefix(style, name);
			if (importantRE.test(val)) style.setProperty(hyphenate$1(prefixed), val.replace(importantRE, ""), "important");
			else style[prefixed] = val;
		}
	}
}
var prefixes = [
	"Webkit",
	"Moz",
	"ms"
];
var prefixCache = {};
function autoPrefix(style, rawName) {
	const cached = prefixCache[rawName];
	if (cached) return cached;
	let name = camelize$1(rawName);
	if (name !== "filter" && name in style) return prefixCache[rawName] = name;
	name = capitalize(name);
	for (let i = 0; i < prefixes.length; i++) {
		const prefixed = prefixes[i] + name;
		if (prefixed in style) return prefixCache[rawName] = prefixed;
	}
	return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
	return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString$2(next) && prev === next;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
	if (isSVG && key.startsWith("xlink:")) {
		if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
		else el.setAttributeNS(xlinkNS, key, value);
	} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
	else el.setAttribute(key, isBoolean ? "" : isSymbol$1(value) ? String(value) : value);
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
	if (key === "innerHTML" || key === "textContent") {
		if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
		return;
	}
	const tag = el.tagName;
	if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
		const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
		const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
		if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
		if (value == null) el.removeAttribute(key);
		el._value = value;
		return;
	}
	let needRemove = false;
	if (value === "" || value == null) {
		const type = typeof el[key];
		if (type === "boolean") value = includeBooleanAttr(value);
		else if (value == null && type === "string") {
			value = "";
			needRemove = true;
		} else if (type === "number") {
			value = 0;
			needRemove = true;
		}
	}
	try {
		el[key] = value;
	} catch (e) {
		if (!needRemove) warn(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
	}
	needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
	el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
	el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
	const invokers = el[veiKey] || (el[veiKey] = {});
	const existingInvoker = invokers[rawName];
	if (nextValue && existingInvoker) existingInvoker.value = sanitizeEventValue(nextValue, rawName);
	else {
		const [name, options] = parseName(rawName);
		if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(sanitizeEventValue(nextValue, rawName), instance), options);
		else if (existingInvoker) {
			removeEventListener(el, name, existingInvoker, options);
			invokers[rawName] = void 0;
		}
	}
}
var optionsModifierRE = /(Once|Passive|Capture)$/;
var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
function parseName(name) {
	let options;
	let m;
	while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
		if (!options) options = {};
		name = name.slice(0, name.length - m[1].length);
		options[m[1].toLowerCase()] = true;
	}
	return [name[2] === ":" ? name.slice(3) : hyphenate$1(name.slice(2)), options];
}
var cachedNow = 0;
var p$6 = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p$6.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
	const invoker = (e) => {
		if (!e._vts) e._vts = Date.now();
		else if (e._vts <= invoker.attached) return;
		const value = invoker.value;
		if (isArray$3(value)) {
			const originalStop = e.stopImmediatePropagation;
			e.stopImmediatePropagation = () => {
				originalStop.call(e);
				e._stopped = true;
			};
			const handlers = value.slice();
			const args = [e];
			for (let i = 0; i < handlers.length; i++) {
				if (e._stopped) break;
				const handler = handlers[i];
				if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
			}
		} else callWithAsyncErrorHandling(value, instance, 5, [e]);
	};
	invoker.value = initialValue;
	invoker.attached = getNow();
	return invoker;
}
function sanitizeEventValue(value, propName) {
	if (isFunction(value) || isArray$3(value)) return value;
	warn(`Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`);
	return NOOP;
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
	const isSVG = namespace === "svg";
	if (key === "class") patchClass(el, nextValue, isSVG);
	else if (key === "style") patchStyle(el, prevValue, nextValue);
	else if (isOn(key)) {
		if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
	} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
		patchDOMProp(el, key, nextValue);
		if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
	} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString$2(nextValue)))) patchDOMProp(el, camelize$1(key), nextValue, parentComponent, key);
	else {
		if (key === "true-value") el._trueValue = nextValue;
		else if (key === "false-value") el._falseValue = nextValue;
		patchAttr(el, key, nextValue, isSVG);
	}
};
function shouldSetAsProp(el, key, value, isSVG) {
	if (isSVG) {
		if (key === "innerHTML" || key === "textContent") return true;
		if (key in el && isNativeOn(key) && isFunction(value)) return true;
		return false;
	}
	if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
	if (key === "sandbox" && el.tagName === "IFRAME") return false;
	if (key === "form") return false;
	if (key === "list" && el.tagName === "INPUT") return false;
	if (key === "type" && el.tagName === "TEXTAREA") return false;
	if (key === "width" || key === "height") {
		const tag = el.tagName;
		if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
	}
	if (isNativeOn(key) && isString$2(value)) return false;
	return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
	const props = el._def.props;
	if (!props) return false;
	const camelKey = camelize$1(key);
	return Array.isArray(props) ? props.some((prop) => camelize$1(prop) === camelKey) : Object.keys(props).some((prop) => camelize$1(prop) === camelKey);
}
var positionMap = /* @__PURE__ */ new WeakMap();
var newPositionMap = /* @__PURE__ */ new WeakMap();
var moveCbKey = /* @__PURE__ */ Symbol("_moveCb");
var enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
var decorate = (t) => {
	delete t.props.mode;
	return t;
};
var TransitionGroup = /* @__PURE__ */ decorate({
	name: "TransitionGroup",
	props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
		tag: String,
		moveClass: String
	}),
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const state = useTransitionState();
		let prevChildren;
		let children;
		onUpdated(() => {
			if (!prevChildren.length) return;
			const moveClass = props.moveClass || `${props.name || "v"}-move`;
			if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
				prevChildren = [];
				return;
			}
			prevChildren.forEach(callPendingCbs);
			prevChildren.forEach(recordPosition);
			const movedChildren = prevChildren.filter(applyTranslation);
			forceReflow(instance.vnode.el);
			movedChildren.forEach((c) => {
				const el = c.el;
				const style = el.style;
				addTransitionClass(el, moveClass);
				style.transform = style.webkitTransform = style.transitionDuration = "";
				const cb = el[moveCbKey] = (e) => {
					if (e && e.target !== el) return;
					if (!e || e.propertyName.endsWith("transform")) {
						el.removeEventListener("transitionend", cb);
						el[moveCbKey] = null;
						removeTransitionClass(el, moveClass);
					}
				};
				el.addEventListener("transitionend", cb);
			});
			prevChildren = [];
		});
		return () => {
			const rawProps = /* @__PURE__ */ toRaw(props);
			const cssTransitionProps = resolveTransitionProps(rawProps);
			let tag = rawProps.tag || Fragment;
			prevChildren = [];
			if (children) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.el && child.el instanceof Element && !child.el[vShowHidden]) {
					prevChildren.push(child);
					setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
					positionMap.set(child, getPosition(child.el));
				}
			}
			children = slots.default ? getTransitionRawChildren(slots.default()) : [];
			for (let i = 0; i < children.length; i++) {
				const child = children[i];
				if (child.key != null) setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
				else if (child.type !== Text) warn(`<TransitionGroup> children must be keyed.`);
			}
			return createVNode(tag, null, children);
		};
	}
});
function callPendingCbs(c) {
	const el = c.el;
	if (el[moveCbKey]) el[moveCbKey]();
	if (el[enterCbKey]) el[enterCbKey]();
}
function recordPosition(c) {
	newPositionMap.set(c, getPosition(c.el));
}
function applyTranslation(c) {
	const oldPos = positionMap.get(c);
	const newPos = newPositionMap.get(c);
	const dx = oldPos.left - newPos.left;
	const dy = oldPos.top - newPos.top;
	if (dx || dy) {
		const el = c.el;
		const s = el.style;
		const rect = el.getBoundingClientRect();
		let scaleX = 1;
		let scaleY = 1;
		if (el.offsetWidth) scaleX = rect.width / el.offsetWidth;
		if (el.offsetHeight) scaleY = rect.height / el.offsetHeight;
		if (!Number.isFinite(scaleX) || scaleX === 0) scaleX = 1;
		if (!Number.isFinite(scaleY) || scaleY === 0) scaleY = 1;
		if (Math.abs(scaleX - 1) < .01) scaleX = 1;
		if (Math.abs(scaleY - 1) < .01) scaleY = 1;
		s.transform = s.webkitTransform = `translate(${dx / scaleX}px,${dy / scaleY}px)`;
		s.transitionDuration = "0s";
		return c;
	}
}
function getPosition(el) {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left,
		top: rect.top
	};
}
function hasCSSTransform(el, root, moveClass) {
	const clone = el.cloneNode();
	const _vtc = el[vtcKey];
	if (_vtc) _vtc.forEach((cls) => {
		cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
	});
	moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
	clone.style.display = "none";
	const container = root.nodeType === 1 ? root : root.parentNode;
	container.appendChild(clone);
	const { hasTransform } = getTransitionInfo(clone);
	container.removeChild(clone);
	return hasTransform;
}
var keyNames = {
	esc: "escape",
	space: " ",
	up: "arrow-up",
	left: "arrow-left",
	right: "arrow-right",
	down: "arrow-down",
	delete: "backspace"
};
var withKeys = (fn, modifiers) => {
	const cache = fn._withKeys || (fn._withKeys = {});
	const cacheKey = modifiers.join(".");
	return cache[cacheKey] || (cache[cacheKey] = ((event) => {
		if (!("key" in event)) return;
		const eventKey = hyphenate$1(event.key);
		if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
	}));
};
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
var enabledHydration = false;
function ensureHydrationRenderer() {
	renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
	enabledHydration = true;
	return renderer;
}
var createSSRApp = ((...args) => {
	const app = ensureHydrationRenderer().createApp(...args);
	injectNativeTagCheck(app);
	injectCompilerOptionsCheck(app);
	const { mount } = app;
	app.mount = (containerOrSelector) => {
		const container = normalizeContainer(containerOrSelector);
		if (container) return mount(container, true, resolveRootNamespace(container));
	};
	return app;
});
function resolveRootNamespace(container) {
	if (container instanceof SVGElement) return "svg";
	if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
}
function injectNativeTagCheck(app) {
	Object.defineProperty(app.config, "isNativeTag", {
		value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
		writable: false
	});
}
function injectCompilerOptionsCheck(app) {
	if (isRuntimeOnly()) {
		const isCustomElement = app.config.isCustomElement;
		Object.defineProperty(app.config, "isCustomElement", {
			get() {
				return isCustomElement;
			},
			set() {
				warn(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
			}
		});
		const compilerOptions = app.config.compilerOptions;
		const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
		Object.defineProperty(app.config, "compilerOptions", {
			get() {
				warn(msg);
				return compilerOptions;
			},
			set() {
				warn(msg);
			}
		});
	}
}
function normalizeContainer(container) {
	if (isString$2(container)) {
		const res = document.querySelector(container);
		if (!res) warn(`Failed to mount app: mount target selector "${container}" returned null.`);
		return res;
	}
	if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") warn(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
	return container;
}
//#endregion
//#region node_modules/vue/dist/vue.runtime.esm-bundler.js
/**
* vue v3.5.43
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function initDev() {
	initCustomFormatter();
}
initDev();
//#endregion
//#region node_modules/@vuepress/shared/dist/index.js
/**
* Determine a link has protocol or not
*/
var isLinkWithProtocol = (link) => /^[a-z][a-z0-9+.-]*:/.test(link) || link.startsWith("//");
var markdownLinkRegexp = /.md((\?|#).*)?$/;
/**
* Determine a link is external or not
*/
var isLinkExternal = (link, base = "/") => isLinkWithProtocol(link) || link.startsWith("/") && !link.startsWith(base) && !markdownLinkRegexp.test(link);
/**
* Determine a link is http link or not
*
* - http://github.com
* - https://github.com
* - //github.com
*/
var isLinkHttp = (link) => /^(https?:)?\/\//.test(link);
/**
* Infer route path of the given raw path
*/
var inferRoutePath = (rawPath) => {
	if (!rawPath || rawPath.endsWith("/")) return rawPath;
	let routePath = rawPath.replace(/(^|\/)README.md$/i, "$1index.html");
	if (routePath.endsWith(".md")) routePath = `${routePath.substring(0, routePath.length - 3)}.html`;
	else if (!routePath.endsWith(".html")) routePath = `${routePath}.html`;
	if (routePath.endsWith("/index.html")) routePath = routePath.substring(0, routePath.length - 10);
	return routePath;
};
var FAKE_HOST = "http://.";
/**
* Normalize the given pathname path to the final route path
*/
var normalizeRoutePath = (pathname, current) => {
	if (!pathname.startsWith("/") && current) {
		const loc = current.slice(0, current.lastIndexOf("/"));
		return inferRoutePath(new URL(`${loc}/${pathname}`, FAKE_HOST).pathname);
	}
	return inferRoutePath(pathname);
};
/**
* Resolve the matched locale path of route path
*/
var resolveLocalePath = (locales, routePath) => {
	const localePaths = Object.keys(locales).sort((a, b) => {
		const levelDelta = b.split("/").length - a.split("/").length;
		if (levelDelta !== 0) return levelDelta;
		return b.length - a.length;
	});
	for (const localePath of localePaths) if (routePath.startsWith(localePath)) return localePath;
	return "/";
};
var SPLIT_CHAR_REGEXP = /(#|\?)/;
/**
* Split a path into pathname and hashAndQueries
*/
var splitPath = (path) => {
	const [pathname, ...hashAndQueries] = path.split(SPLIT_CHAR_REGEXP);
	return {
		pathname,
		hashAndQueries: hashAndQueries.join("")
	};
};
var TAGS_ALLOWED = [
	"link",
	"meta",
	"script",
	"style",
	"noscript",
	"template"
];
var TAGS_UNIQUE = ["title", "base"];
/**
* Resolve identifier of a tag, to avoid duplicated tags in `<head>`
*/
var resolveHeadIdentifier = ([tag, attrs, content]) => {
	if (TAGS_UNIQUE.includes(tag)) return tag;
	if (!TAGS_ALLOWED.includes(tag)) return null;
	if (tag === "meta" && attrs.name) return `${tag}.${attrs.name}`;
	if (tag === "template" && attrs.id) return `${tag}.${attrs.id}`;
	return JSON.stringify([
		tag,
		Object.entries(attrs).map(([key, value]) => {
			if (typeof value === "boolean") return value ? [key, ""] : null;
			return [key, value];
		}).filter((item) => item != null).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)),
		content
	]);
};
/**
* Dedupe head config with identifier
*
* Items that appear earlier have higher priority
*/
var dedupeHead = (head) => {
	const identifierSet = /* @__PURE__ */ new Set();
	const result = [];
	head.forEach((item) => {
		const identifier = resolveHeadIdentifier(item);
		if (identifier && !identifierSet.has(identifier)) {
			identifierSet.add(identifier);
			result.push(item);
		}
	});
	return result;
};
/**
* Ensure a url string to have ending slash /
*/
var ensureEndingSlash = (str) => str.endsWith("/") || str.endsWith(".html") ? str : `${str}/`;
/**
* Remove ending slash / from a string
*/
var removeEndingSlash = (str) => str.endsWith("/") ? str.slice(0, -1) : str;
/**
* Remove leading slash / from a string
*/
var removeLeadingSlash = (str) => str.startsWith("/") ? str.slice(1) : str;
/**
* Check if a value is plain object, with generic type support
*/
var isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
/**
* Check if a value is a string
*/
var isString$1 = (val) => typeof val === "string";
//#endregion
//#region node_modules/nostics/dist/index.mjs
/**
* Renders a diagnostic into a multi-line, unicode-decorated string suitable
* for terminal output. The first line is `[<name>] <message>`; optional
* details (`fix`, `sources`, `docs`) follow with `├▶`/`╰▶` connectors.
*/
function formatDiagnostic(diagnostic) {
	const header = `[${diagnostic.name}] ${diagnostic.message}`;
	const details = [];
	if (diagnostic.fix) details.push(`fix: ${diagnostic.fix}`);
	if (diagnostic.sources?.length) details.push(`sources: ${diagnostic.sources.join(", ")}`);
	if (diagnostic.docs) details.push(`see: ${diagnostic.docs}`);
	if (details.length === 0) return header;
	return [header, ...details.map((detail, i) => {
		return `${i < details.length - 1 ? "├▶" : "╰▶"} ${detail}`;
	})].join("\n");
}
/**
* Transforms a value or a function that returns a value to a value.
*
* @param valFn either a value or a function that returns a value
* @param args  arguments to pass to the function if `valFn` is a function
*
* @internal
*/
function toValueWithArgs(valFn, ...args) {
	return typeof valFn === "function" ? valFn(...args) : valFn;
}
/**
* Creates a console reporter that renders each diagnostic with `formatter` and
* prints the result via `console[method]`. Both default sensibly (`'warn'` and
* {@link formatDiagnostic}); `method` can also be overridden per call through
* the reporter options.
*/
/* @__NO_SIDE_EFFECTS__ */
function createConsoleReporter({ method: defaultMethod = "warn", formatter = formatDiagnostic } = {}) {
	return (diagnostic, { method = defaultMethod } = {}) => {
		console[method](formatter(diagnostic));
	};
}
var captureStackTrace = Error.captureStackTrace;
var Diagnostic = class Diagnostic extends Error {
	name;
	/**
	* The diagnostic code, e.g. `MATH_E001`.
	* Also appears as the `name` property.
	*/
	code;
	/**
	* URL to extended documentation for this diagnostic code.
	* Auto-generated from {@link DefineDiagnosticsOptions.docsBase}.
	*/
	docs;
	/**
	* Optional actionable instructions on how to resolve the problem.
	*/
	fix;
	/**
	* Locations in user code that contributed to this diagnostic, in
	* `file:line:column` format. Relevant when the stack trace doesn't reflect
	* the user's source (e.g. compilers, bundlers), otherwise redundant with the
	* stack and should be omitted.
	*/
	sources;
	/**
	* Structured information associated with this diagnostic code.
	*/
	data;
	/**
	* Alias for {@link Error.message}: the reason this diagnostic was raised.
	*/
	get why() {
		return this.message;
	}
	/**
	* @param init        structured initializer; `why` is required
	* @param captureFrom V8 stack-cutoff frame. Defaults to {@link Diagnostic}
	* so the top of the trace is the `new Diagnostic(...)` call site.
	* `defineDiagnostics` passes its action method to strip its own frames too.
	* Ignored on engines without `Error.captureStackTrace`.
	*/
	constructor(init, captureFrom = Diagnostic) {
		super(init.why, { cause: init.cause });
		this.code = this.name = init.code;
		this.fix = init.fix;
		this.docs = init.docs;
		this.sources = init.sources;
		this.data = init.data;
		captureStackTrace?.(this, captureFrom);
	}
	/**
	* Converts the diagnostic into a serializable structured object.
	*/
	toJSON() {
		return {
			name: this.name,
			why: this.why,
			fix: this.fix,
			docs: this.docs,
			sources: this.sources,
			cause: this.cause,
			data: this.data,
			stack: this.stack
		};
	}
};
/**
* Resolves the docs URL for a code from a `docsBase` (string template or
* resolver function). Shared by {@link defineDiagnostics} and
* {@link defineProdDiagnostics}. Per-code `docs` overrides are handled by the
* caller; this only covers the `docsBase`-derived case.
*
* @internal
*/
function deriveDocs(docsBase, code) {
	return typeof docsBase === "string" ? `${docsBase}/${code.toLowerCase()}` : docsBase?.(code);
}
/**
* Creates a typed diagnostics object from a set of code definitions. Each
* code becomes a callable {@link DiagnosticHandle}: invoke to report, or
* `throw` the result to raise. No `new` required, no proxy.
*/
/* @__NO_SIDE_EFFECTS__ */
function defineDiagnostics(options) {
	const reporters = options.reporters ?? [];
	const result = {};
	const { docsBase } = options;
	for (const code of Object.keys(options.codes)) {
		const def = options.codes[code];
		const docs = def.docs === false ? void 0 : def.docs || deriveDocs(docsBase, code);
		const handle = (params = {}, reporterOptions = {}) => {
			const diagnostic = new Diagnostic({
				code,
				why: toValueWithArgs(def.why, params),
				fix: toValueWithArgs(def.fix, params),
				docs,
				cause: params.cause,
				sources: params.sources,
				data: toValueWithArgs(def.data, params)
			}, handle);
			for (const reporter of reporters) reporter(diagnostic, reporterOptions);
			return diagnostic;
		};
		result[code] = handle;
	}
	return result;
}
//#endregion
//#region node_modules/vue-router/dist/useApi-BPuI6ZR9.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
/**
* Checks if a path is absolute, meaning it starts with a `/`.
*
* @param path - path to check
*
* @internal
*/
var isAbsolutePath = (path) => path.startsWith("/");
/**
* Allows differentiating lazy components from functional components and vue-class-component
* @internal
*
* @param component
*/
function isRouteComponent(component) {
	return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
	return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
var assign = Object.assign;
function applyToParams(fn, params) {
	const newParams = {};
	for (const key in params) {
		const value = params[key];
		newParams[key] = isArray(value) ? value.map(fn) : fn(value);
	}
	return newParams;
}
var noop$1 = () => {};
/**
* Typesafe alternative to Array.isArray
* https://github.com/microsoft/TypeScript/pull/48228
*
* @internal
*/
var isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
	const options = {};
	for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	return options;
}
var NavigationFailureSymbol = Symbol("navigation failure");
var ErrorTypeMessages = {
	[1]({ location, currentLocation }) {
		return `No match for\n ${JSON.stringify(location)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
	},
	[2]({ from, to }) {
		return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
	},
	[4]({ from, to }) {
		return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
	},
	[8]({ from, to }) {
		return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
	},
	[16]({ from, to: _to }) {
		return `Avoided redundant navigation to current location: "${from.fullPath}".`;
	}
};
/**
* Creates a typed NavigationFailure object.
* @internal
* @param type - NavigationFailureType
* @param params - { from, to }
*/
function createRouterError(type, params) {
	return assign(new Error(ErrorTypeMessages[type](params)), {
		type,
		[NavigationFailureSymbol]: true
	}, params);
}
function isNavigationFailure(error, type) {
	return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
var propertiesToLog = [
	"params",
	"query",
	"hash"
];
/**
* Stringifies a raw location for display in dev warnings.
*
* @internal
*/
function stringifyRoute(to) {
	if (!to || typeof to === "string") return to;
	if (to.path != null) return to.path;
	const location = {};
	for (const key of propertiesToLog) if (key in to) location[key] = to[key];
	return JSON.stringify(location, null, 2);
}
/**
* Runtime diagnostics catalog for Vue Router.
*
* Every entry has a stable `VUE_ROUTER_R####` code, a `why` that states the problem
* (the diagnosis only, never the remedy) and a `fix` that states the remedy
* (only, never the diagnosis). They are complementary: the reporter prints
* both, so neither repeats the other. The diagnosis substrings asserted by the
* warning tests stay in `why`. All call sites stay behind the existing `__DEV__` (or
* `process.env.NODE_ENV !== 'production'`) guards and remain bare expression
* statements so they tree-shake out of production builds.
*
* Codes are permanent: never rename or reuse one.
* - `VUE_ROUTER_R0###` core runtime warnings
* - `VUE_ROUTER_R1###` experimental data-loaders
*/
var diagnostics = /*#__PURE__*/ defineDiagnostics({
	reporters: [/*#__PURE__*/ createConsoleReporter()],
	codes: {
		VUE_ROUTER_R0001: {
			why: (p) => `Parent route "${p.name}" not found when adding child route`,
			fix: "Add the parent route before its children, or check the parent name for typos.",
			docs: "https://router.vuejs.org/guide/advanced/dynamic-routing.html#Adding-nested-routes"
		},
		VUE_ROUTER_R0002: {
			why: (p) => `Cannot remove non-existent route "${p.name}"`,
			fix: "Check the route name; it may already have been removed or was never added.",
			docs: "https://router.vuejs.org/guide/advanced/dynamic-routing.html#Removing-routes"
		},
		VUE_ROUTER_R0003: {
			why: (p) => `Location "${stringifyRoute(p.location)}" resolved to "${p.href}". A resolved location cannot start with multiple slashes.`,
			fix: "Remove the leading slashes from the location or fix the route configuration."
		},
		VUE_ROUTER_R0004: {
			why: (p) => `No match found for location with path "${stringifyRoute(p.path)}"`,
			fix: "Add a route matching this path or check for typos in the location.",
			docs: "https://router.vuejs.org/guide/essentials/dynamic-matching.html#Catch-all-404-Not-found-Route"
		},
		VUE_ROUTER_R0005: {
			why: (p) => `router.resolve() was passed an invalid location. This will fail in production.\nLocation: ${stringifyRoute(p.rawLocation)}`,
			fix: "Pass a valid route location: a string path or an object with `path` or `name`."
		},
		VUE_ROUTER_R0006: {
			why: (p) => `Path "${p.path}" was passed with params but they will be ignored because a "path" was passed.`,
			fix: "Use a named route `{ name, params }` instead of `{ path, params }`.",
			docs: "https://router.vuejs.org/guide/essentials/navigation.html#Navigate-to-a-different-location"
		},
		VUE_ROUTER_R0007: {
			why: (p) => `A \`hash\` should always start with the character "#" but received "${p.hash}".`,
			fix: (p) => `Prepend "#" to the hash in your route location: use "#${p.hash}".`
		},
		VUE_ROUTER_R0008: {
			why: (p) => `Invalid redirect found:\n${p.target}\n when navigating to "${p.to}".\nThis will break in production.`,
			fix: "A redirect must resolve to a location with a `name` or `path`; return one of those (or a string path) from `redirect`.",
			docs: "https://router.vuejs.org/guide/essentials/redirect-and-alias.html#Redirect"
		},
		VUE_ROUTER_R0009: {
			why: (p) => `Detected a possibly infinite redirection in a navigation guard when going from "${p.from}" to "${p.to}". Aborting to avoid a Stack Overflow. This might break in production if not fixed.`,
			fix: "A guard is returning a new location on every call; make that return conditional so it only redirects when actually needed.",
			docs: "https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-Before-Guards"
		},
		VUE_ROUTER_R0010: {
			why: "Uncaught error during route navigation",
			fix: "Register an error handler with `router.onError()` to handle navigation errors."
		},
		VUE_ROUTER_R0011: {
			why: "Unexpected error when starting the router:",
			fix: "Inspect the actual cause; a navigation guard or async component likely threw during the initial navigation."
		},
		VUE_ROUTER_R0020: {
			why: (p) => `No active route record was found when calling \`${p.fn}()\`. Maybe you called it inside of App.vue?`,
			fix: "Call it from a component rendered inside <router-view> (a page component or one of its children), not from App.vue.",
			docs: "https://router.vuejs.org/guide/advanced/composition-api.html#Navigation-Guards"
		},
		VUE_ROUTER_R0021: {
			why: "No active route record was found when reactivating component with navigation guard. This is likely a bug in vue-router.",
			fix: "Report with a minimal reproduction at https://github.com/vuejs/router/issues/new/choose."
		},
		VUE_ROUTER_R0022: {
			why: (p) => `${p.fn}() was called outside of component setup but it must be called at the top of a setup function`,
			fix: "Call it synchronously at the top of `setup()`, before any `await`.",
			docs: "https://router.vuejs.org/guide/advanced/composition-api.html#Navigation-Guards"
		},
		VUE_ROUTER_R0023: {
			why: (p) => `The "next" callback was never called inside of ${p.name ? `"${p.name}"` : ""}:\n${p.guard}`,
			fix: "Make sure `next()` runs on every branch, including early returns and async paths, or drop the `next` parameter and return the value instead.",
			docs: "https://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next"
		},
		VUE_ROUTER_R0024: {
			why: (p) => `The "next" callback was called more than once in one navigation guard when going from "${p.from}" to "${p.to}". This will fail in production.`,
			fix: "Call `next()` exactly once per guard: remove the extra call, or migrate to returning the value you passed to `next()`.",
			docs: "https://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next"
		},
		VUE_ROUTER_R0025: {
			why: "The `next()` callback in navigation guards is deprecated.",
			fix: "Return the value instead: `next()` becomes `return`, `next(false)` becomes `return false`, `next(\"/path\")` becomes `return \"/path\"`.",
			docs: "https://router.vuejs.org/guide/advanced/navigation-guards.html#Optional-third-argument-next"
		},
		VUE_ROUTER_R0026: {
			why: (p) => `Record with path "${p.path}" is either missing a "component(s)" or "children" property.`,
			fix: "Add a `component`, `components`, or `children` to the route record.",
			docs: "https://router.vuejs.org/guide/essentials/nested-routes.html"
		},
		VUE_ROUTER_R0027: {
			why: (p) => `Component "${p.name}" in record with path "${p.path}" is not a valid component. Received "${p.received}".`,
			fix: "Pass a component or a function returning a Promise that resolves to one."
		},
		VUE_ROUTER_R0028: {
			why: (p) => `Component "${p.name}" in record with path "${p.path}" is a Promise instead of a function that returns a Promise. This will break in production if not fixed.`,
			fix: `Defer the import in an arrow function so it loads lazily: write "() => import('./MyPage.vue')", not "import('./MyPage.vue')".`,
			docs: "https://router.vuejs.org/guide/advanced/lazy-loading.html"
		},
		VUE_ROUTER_R0029: {
			why: (p) => `Component "${p.name}" in record with path "${p.path}" is defined using "defineAsyncComponent()".`,
			fix: `Drop the wrapper and pass "() => import('./MyPage.vue')" directly; the router handles lazy components itself.`,
			docs: "https://router.vuejs.org/guide/advanced/lazy-loading.html#Relationship-to-async-components"
		},
		VUE_ROUTER_R0030: {
			why: (p) => `Component "${p.name}" in record with path "${p.path}" is a function that does not return a Promise. This will break in production if not fixed.`,
			fix: "Return a dynamic import (`() => import(\"./MyPage.vue\")`) from the function, or add a `displayName` if it is a functional component.",
			docs: "https://router.vuejs.org/guide/advanced/lazy-loading.html"
		},
		VUE_ROUTER_R0040: {
			why: (p) => `Because "${p.el}" starts with "#", scrollBehavior resolves it as an element id via document.getElementById("${p.el.slice(1)}"), not as a CSS selector. No element has that id, but "${p.el}" does match an element with document.querySelector().`,
			fix: (p) => `Resolve the element yourself and return the node: el: document.querySelector('${p.el}').`,
			docs: "https://router.vuejs.org/guide/advanced/scroll-behavior.html"
		},
		VUE_ROUTER_R0041: {
			why: (p) => `The selector "${p.el}" is invalid. See https://mathiasbynens.be/notes/css-escapes or CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape) for the escaping rules.`,
			fix: "Build an id selector as `#${CSS.escape(id)}` so special characters in the id are escaped.",
			docs: "https://router.vuejs.org/guide/advanced/scroll-behavior.html"
		},
		VUE_ROUTER_R0042: {
			why: (p) => `Couldn't find element using selector "${p.el}" returned by scrollBehavior.`,
			fix: "Return a selector that matches an existing element, or guard against missing elements.",
			docs: "https://router.vuejs.org/guide/advanced/scroll-behavior.html"
		},
		VUE_ROUTER_R0050: {
			why: (p) => {
				let to;
				try {
					to = p.to === void 0 ? "undefined" : JSON.stringify(p.to);
				} catch {
					to = String(p.to);
				}
				return `Invalid value for prop "to" in useLink()\n- to: ${to}`;
			},
			fix: "Pass a valid route location (a string path or an object) to the \"to\" prop."
		},
		VUE_ROUTER_R0060: {
			why: (p) => `<router-view> can no longer be used directly inside <${p.comp}>.`,
			fix: (p) => `Wrap the slot's resolved component with <${p.comp}> instead of nesting <router-view> in it:\n\n<router-view v-slot="{ Component }">\n  <${p.comp}>\n    <component :is="Component" />\n  </${p.comp}>\n</router-view>`,
			docs: "https://router.vuejs.org/guide/advanced/router-view-slot.html#KeepAlive-Transition"
		},
		VUE_ROUTER_R0070: {
			why: (p) => `Cannot resolve a relative location without an absolute path. Trying to resolve "${p.to}" from "${p.from}".`,
			fix: (p) => `Resolve from an absolute \`from\` path that starts with "/", e.g. "/${p.from}".`
		},
		VUE_ROUTER_R0080: {
			why: (p) => `Error decoding "${p.text}". Using original value`,
			fix: "Ensure the value is correctly percent-encoded."
		},
		VUE_ROUTER_R0090: {
			why: (p) => `Found duplicated params with name "${p.name}" for path "${p.path}". Only the last one will be available on "$route.params".`,
			fix: "Give each param a unique name within the path.",
			docs: "https://router.vuejs.org/guide/essentials/route-matching-syntax.html"
		},
		VUE_ROUTER_R0100: {
			why: (p) => `Discarded invalid param(s) "${p.params}" when navigating.` + p.inherited + ` See https://github.com/vuejs/router/commit/e887570 for more details.`,
			fix: "Only pass params that exist on the target route."
		},
		VUE_ROUTER_R0101: {
			why: (p) => `The Matcher cannot resolve relative paths but received "${p.path}". Unless you directly called \`matcher.resolve("${p.path}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`,
			fix: "Pass an absolute path (starting with \"/\") to the matcher."
		},
		VUE_ROUTER_R0102: {
			why: (p) => `Alias "${p.alias}" and the original record: "${p.original}" must have the exact same param named "${p.name}"`,
			fix: "Use the same param names in the alias as in the original route.",
			docs: "https://router.vuejs.org/guide/essentials/redirect-and-alias.html#Alias"
		},
		VUE_ROUTER_R0103: {
			why: (p) => `The route named "${p.name}" has a child without a name, an empty path, and no children. Using that name won't render the empty path child, so this is probably a mistake.`,
			fix: "Move the `name` onto the empty-path child; or, if intentional, give the child its own name to silence this.",
			docs: "https://router.vuejs.org/guide/essentials/nested-routes.html#Nested-Named-Routes"
		},
		VUE_ROUTER_R0104: {
			why: (p) => `Absolute path "${p.path}" must have the exact same param named "${p.name}" as its parent "${p.parent}".`,
			fix: "Include the parent route params in the absolute child path.",
			docs: "https://router.vuejs.org/guide/essentials/nested-routes.html"
		},
		VUE_ROUTER_R0105: {
			why: (p) => `Finding ancestor route "${p.ancestor}" failed for "${p.record}"`,
			fix: "Report a reproduction at https://github.com/vuejs/router/issues/new/choose."
		},
		VUE_ROUTER_R0110: {
			why: `A hash base must end with a "#"`,
			fix: (p) => `Append "#" to the "base" argument passed to "createWebHashHistory()": "${p.base}" should be "${p.suggestion}".`
		},
		VUE_ROUTER_R0120: {
			why: "Error with push/replace State",
			fix: "The browser rejected the history API call; check for cross-origin or rate-limit issues."
		},
		VUE_ROUTER_R0121: {
			why: "history.state seems to have been manually replaced without preserving the necessary values.\nYou can find more information at https://router.vuejs.org/guide/migration/#Usage-of-history-state",
			fix: "Merge the router's state into your own when calling it manually: `history.replaceState({ ...history.state, ...yourState }, '', url)`.",
			docs: "https://router.vuejs.org/guide/migration.html#Usage-of-history-state"
		},
		VUE_ROUTER_R1001: {
			why: (p) => `Data loader "${String(p.key)}" has a different parent than the current context. This shouldn't be happening.`,
			fix: "Report a bug with a minimal reproduction at https://github.com/vuejs/router/."
		},
		VUE_ROUTER_R1002: {
			why: "Returning a NavigationResult is deprecated.",
			fix: "Replace `return new NavigationResult(to)` with `reroute(to)`, which throws internally to reroute.",
			docs: "https://router.vuejs.org/data-loaders/navigation-aware.html#Controlling-the-navigation-with-reroute-"
		},
		VUE_ROUTER_R1003: {
			why: (p) => `Loader "${p.key}"'s "commit()" was called but there is no staged data.`,
			fix: "Ensure the loader resolved before calling `commit()`.",
			docs: "https://router.vuejs.org/data-loaders/defining-loaders.html#Delaying-data-updates-with-commit"
		},
		VUE_ROUTER_R1004: {
			why: (p) => "A loader returned a NavigationResult but is not registered on the route." + p.key,
			fix: "Export the loader from the page component so it gets registered, e.g. `export const useUserData = defineLoader(...)`.",
			docs: "https://router.vuejs.org/data-loaders/organization.html"
		},
		VUE_ROUTER_R1005: {
			why: (p) => `Data loader "${p.key}" has itself as parent. This shouldn't be happening.`,
			fix: "Report a bug with a minimal reproduction at https://github.com/vuejs/router/."
		},
		VUE_ROUTER_R1006: {
			why: (p) => `A query was defined with the same key as the loader "[${p.key}]".\nSee https://pinia-colada.esm.dev/#TODO`,
			fix: "If the key is meant to match, use the data loader directly; otherwise rename the `useQuery()` key so it no longer collides.",
			docs: "https://router.vuejs.org/data-loaders/colada.html"
		},
		VUE_ROUTER_R1007: {
			why: "Data Loader was setup twice.",
			fix: "Register `DataLoaderPlugin` a single time via `app.use()`.",
			docs: "https://router.vuejs.org/data-loaders.html#Installation"
		},
		VUE_ROUTER_R1008: {
			why: "Data Loader is experimental and subject to breaking changes in the future.",
			docs: "https://router.vuejs.org/data-loaders.html"
		},
		VUE_ROUTER_R1009: {
			why: "Returning a NavigationResult from a loader is deprecated.",
			fix: "Call `reroute(to)` inside the loader instead of returning `new NavigationResult(to)`; it throws internally to reroute.",
			docs: "https://router.vuejs.org/data-loaders/navigation-aware.html#Controlling-the-navigation-with-reroute-"
		}
	}
});
/**
* RouteRecord being rendered by the closest ancestor Router View. Used for
* `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
* Location Matched
*
* @internal
*/
var matchedRouteKey = Symbol("router view location matched");
/**
* Allows overriding the router view depth to control which component in
* `matched` is rendered. rvd stands for Router View Depth
*
* @internal
*/
var viewDepthKey = Symbol("router view depth");
/**
* Allows overriding the router instance returned by `useRouter` in tests. r
* stands for router
*
* @internal
*/
var routerKey = Symbol("router");
/**
* Allows overriding the current route returned by `useRoute` in tests. rl
* stands for route location
*
* @internal
*/
var routeLocationKey = Symbol("route location");
/**
* Allows overriding the current route used by router-view. Internally this is
* used when the `route` prop is passed.
*
* @internal
*/
var routerViewLocationKey = Symbol("router view location");
/**
* Returns the router instance. Equivalent to using `$router` inside
* templates.
*/
function useRouter() {
	return inject(routerKey);
}
/**
* Returns the current route location. Equivalent to using `$route` inside
* templates.
*/
function useRoute(_name) {
	return inject(routeLocationKey);
}
//#endregion
//#region node_modules/@vue/devtools-shared/dist/index.js
var __create$1 = Object.create;
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJSMin$1 = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames$1(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$2(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$2(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var isBrowser$1 = typeof navigator !== "undefined";
var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
typeof target.chrome !== "undefined" && target.chrome.devtools;
isBrowser$1 && (target.self, target.top);
typeof navigator !== "undefined" && navigator.userAgent?.toLowerCase().includes("electron");
typeof window !== "undefined" && window.__NUXT__;
var import_rfdc = /* @__PURE__ */ __toESM$1((/* @__PURE__ */ __commonJSMin$1(((exports, module) => {
	module.exports = rfdc;
	function copyBuffer(cur) {
		if (cur instanceof Buffer) return Buffer.from(cur);
		return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
	}
	function rfdc(opts) {
		opts = opts || {};
		if (opts.circles) return rfdcCircles(opts);
		const constructorHandlers = /* @__PURE__ */ new Map();
		constructorHandlers.set(Date, (o) => new Date(o));
		constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
		constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
		if (opts.constructorHandlers) for (const handler of opts.constructorHandlers) constructorHandlers.set(handler[0], handler[1]);
		let handler = null;
		return opts.proto ? cloneProto : clone;
		function cloneArray(a, fn) {
			const keys = Object.keys(a);
			const a2 = new Array(keys.length);
			for (let i = 0; i < keys.length; i++) {
				const k = keys[i];
				const cur = a[k];
				if (typeof cur !== "object" || cur === null) a2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) a2[k] = handler(cur, fn);
				else if (ArrayBuffer.isView(cur)) a2[k] = copyBuffer(cur);
				else a2[k] = fn(cur);
			}
			return a2;
		}
		function clone(o) {
			if (typeof o !== "object" || o === null) return o;
			if (Array.isArray(o)) return cloneArray(o, clone);
			if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, clone);
			const o2 = {};
			for (const k in o) {
				if (Object.hasOwnProperty.call(o, k) === false) continue;
				const cur = o[k];
				if (typeof cur !== "object" || cur === null) o2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, clone);
				else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
				else o2[k] = clone(cur);
			}
			return o2;
		}
		function cloneProto(o) {
			if (typeof o !== "object" || o === null) return o;
			if (Array.isArray(o)) return cloneArray(o, cloneProto);
			if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, cloneProto);
			const o2 = {};
			for (const k in o) {
				const cur = o[k];
				if (typeof cur !== "object" || cur === null) o2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, cloneProto);
				else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
				else o2[k] = cloneProto(cur);
			}
			return o2;
		}
	}
	function rfdcCircles(opts) {
		const refs = [];
		const refsNew = [];
		const constructorHandlers = /* @__PURE__ */ new Map();
		constructorHandlers.set(Date, (o) => new Date(o));
		constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
		constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
		if (opts.constructorHandlers) for (const handler of opts.constructorHandlers) constructorHandlers.set(handler[0], handler[1]);
		let handler = null;
		return opts.proto ? cloneProto : clone;
		function cloneArray(a, fn) {
			const keys = Object.keys(a);
			const a2 = new Array(keys.length);
			for (let i = 0; i < keys.length; i++) {
				const k = keys[i];
				const cur = a[k];
				if (typeof cur !== "object" || cur === null) a2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) a2[k] = handler(cur, fn);
				else if (ArrayBuffer.isView(cur)) a2[k] = copyBuffer(cur);
				else {
					const index = refs.indexOf(cur);
					if (index !== -1) a2[k] = refsNew[index];
					else a2[k] = fn(cur);
				}
			}
			return a2;
		}
		function clone(o) {
			if (typeof o !== "object" || o === null) return o;
			if (Array.isArray(o)) return cloneArray(o, clone);
			if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, clone);
			const o2 = {};
			refs.push(o);
			refsNew.push(o2);
			for (const k in o) {
				if (Object.hasOwnProperty.call(o, k) === false) continue;
				const cur = o[k];
				if (typeof cur !== "object" || cur === null) o2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, clone);
				else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
				else {
					const i = refs.indexOf(cur);
					if (i !== -1) o2[k] = refsNew[i];
					else o2[k] = clone(cur);
				}
			}
			refs.pop();
			refsNew.pop();
			return o2;
		}
		function cloneProto(o) {
			if (typeof o !== "object" || o === null) return o;
			if (Array.isArray(o)) return cloneArray(o, cloneProto);
			if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) return handler(o, cloneProto);
			const o2 = {};
			refs.push(o);
			refsNew.push(o2);
			for (const k in o) {
				const cur = o[k];
				if (typeof cur !== "object" || cur === null) o2[k] = cur;
				else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) o2[k] = handler(cur, cloneProto);
				else if (ArrayBuffer.isView(cur)) o2[k] = copyBuffer(cur);
				else {
					const i = refs.indexOf(cur);
					if (i !== -1) o2[k] = refsNew[i];
					else o2[k] = cloneProto(cur);
				}
			}
			refs.pop();
			refsNew.pop();
			return o2;
		}
	}
})))(), 1);
var classifyRE = /(?:^|[-_/])(\w)/g;
function toUpper(_, c) {
	return c ? c.toUpperCase() : "";
}
function classify(str) {
	return str && `${str}`.replace(classifyRE, toUpper);
}
function basename(filename, ext) {
	let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
	if (normalizedFilename.endsWith(`index${ext}`)) normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
	const lastSlashIndex = normalizedFilename.lastIndexOf("/");
	const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
	if (ext) {
		const extIndex = baseNameWithExt.lastIndexOf(ext);
		return baseNameWithExt.substring(0, extIndex);
	}
	return "";
}
/**
* @copyright [rfdc](https://github.com/davidmarkclements/rfdc)
* @description A really fast deep clone alternative
*/
var deepClone = (0, import_rfdc.default)({ circles: true });
//#endregion
//#region node_modules/perfect-debounce/dist/index.mjs
var DEBOUNCE_DEFAULTS = { trailing: true };
/**
Debounce functions
@param fn - Promise-returning/async function to debounce.
@param wait - Milliseconds to wait before calling `fn`. Default value is 25ms
@returns A function that delays calling `fn` until after `wait` milliseconds have elapsed since the last time it was called.
@example
```
import { debounce } from 'perfect-debounce';
const expensiveCall = async input => input;
const debouncedFn = debounce(expensiveCall, 200);
for (const number of [1, 2, 3]) {
console.log(await debouncedFn(number));
}
//=> 1
//=> 2
//=> 3
```
*/
function debounce(fn, wait = 25, options = {}) {
	options = {
		...DEBOUNCE_DEFAULTS,
		...options
	};
	if (!Number.isFinite(wait)) throw new TypeError("Expected `wait` to be a finite number");
	let leadingValue;
	let timeout;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		currentPromise = _applyPromised(fn, _this, args);
		currentPromise.finally(() => {
			currentPromise = null;
			if (options.trailing && trailingArgs && !timeout) {
				const promise = applyFn(_this, trailingArgs);
				trailingArgs = null;
				return promise;
			}
		});
		return currentPromise;
	};
	const debounced = function(...args) {
		if (options.trailing) trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = !timeout && options.leading;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				timeout = null;
				const promise = options.leading ? leadingValue : applyFn(this, args);
				trailingArgs = null;
				for (const _resolve of resolveList) _resolve(promise);
				resolveList = [];
			}, wait);
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
	const _clearTimeout = (timer) => {
		if (timer) {
			clearTimeout(timer);
			timeout = null;
		}
	};
	debounced.isPending = () => !!timeout;
	debounced.cancel = () => {
		_clearTimeout(timeout);
		resolveList = [];
		trailingArgs = null;
	};
	debounced.flush = () => {
		_clearTimeout(timeout);
		if (!trailingArgs || currentPromise) return;
		const args = trailingArgs;
		trailingArgs = null;
		return applyFn(this, args);
	};
	return debounced;
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
//#endregion
//#region node_modules/hookable/dist/index.mjs
function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
var defaultTask = { run: (function_) => function_() };
var _createTask = () => defaultTask;
var createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
	const task = createTask(args.shift());
	return hooks.reduce((promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))), Promise.resolve());
}
function parallelTaskCaller(hooks, args) {
	const task = createTask(args.shift());
	return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		if (this._hooks[name]) {
			const index = this._hooks[name].indexOf(function_);
			if (index !== -1) this._hooks[name].splice(index, 1);
			if (this._hooks[name].length === 0) delete this._hooks[name];
		}
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		delete this._hooks[name];
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		Object.assign(this._deprecatedHooks, deprecatedHooks);
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns.splice(0, removeFns.length)) unreg();
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		for (const key in this._hooks) delete this._hooks[key];
	}
	callHook(name, ...arguments_) {
		arguments_.unshift(name);
		return this.callHookWith(serialTaskCaller, name, ...arguments_);
	}
	callHookParallel(name, ...arguments_) {
		arguments_.unshift(name);
		return this.callHookWith(parallelTaskCaller, name, ...arguments_);
	}
	callHookWith(caller, name, ...arguments_) {
		const event = this._before || this._after ? {
			name,
			args: arguments_,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(name in this._hooks ? [...this._hooks[name]] : [], arguments_);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}
var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
function getComponentTypeName(options) {
	if (typeof options === "function") return options.displayName || options.name || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || "";
	const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
	if (name === "index" && options.__file?.endsWith("index.vue")) return "";
	return name;
}
function getComponentFileName(options) {
	const file = options.__file;
	if (file) return classify(basename(file, ".vue"));
}
function saveComponentGussedName(instance, name) {
	instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
	return name;
}
function getAppRecord(instance) {
	if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__) return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
	else if (instance.root) return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
}
function isFragment(instance) {
	const subTreeType = instance.subTree?.type;
	const appRecord = getAppRecord(instance);
	if (appRecord) return appRecord?.types?.Fragment === subTreeType;
	return false;
}
/**
* Get the appropriate display name for an instance.
*
* @param {Vue} instance
* @return {string}
*/
function getInstanceName(instance) {
	const name = getComponentTypeName(instance?.type || {});
	if (name) return name;
	if (instance?.root === instance) return "Root";
	for (const key in instance.parent?.type?.components) if (instance.parent.type.components[key] === instance?.type) return saveComponentGussedName(instance, key);
	for (const key in instance.appContext?.components) if (instance.appContext.components[key] === instance?.type) return saveComponentGussedName(instance, key);
	const fileName = getComponentFileName(instance?.type || {});
	if (fileName) return fileName;
	return "Anonymous Component";
}
/**
* Returns a devtools unique id for instance.
* @param {Vue} instance
*/
function getUniqueComponentId(instance) {
	return `${instance?.appContext?.app?.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__ ?? 0}:${instance === instance?.root ? "root" : instance.uid}`;
}
function getComponentInstance(appRecord, instanceId) {
	instanceId = instanceId || `${appRecord.id}:root`;
	return appRecord.instanceMap.get(instanceId) || appRecord.instanceMap.get(":root");
}
function createRect() {
	const rect = {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		get width() {
			return rect.right - rect.left;
		},
		get height() {
			return rect.bottom - rect.top;
		}
	};
	return rect;
}
var range;
function getTextRect(node) {
	if (!range) range = document.createRange();
	range.selectNode(node);
	return range.getBoundingClientRect();
}
function getFragmentRect(vnode) {
	const rect = createRect();
	if (!vnode.children) return rect;
	for (let i = 0, l = vnode.children.length; i < l; i++) {
		const childVnode = vnode.children[i];
		let childRect;
		if (childVnode.component) childRect = getComponentBoundingRect(childVnode.component);
		else if (childVnode.el) {
			const el = childVnode.el;
			if (el.nodeType === 1 || el.getBoundingClientRect) childRect = el.getBoundingClientRect();
			else if (el.nodeType === 3 && el.data.trim()) childRect = getTextRect(el);
		}
		if (childRect) mergeRects(rect, childRect);
	}
	return rect;
}
function mergeRects(a, b) {
	if (!a.top || b.top < a.top) a.top = b.top;
	if (!a.bottom || b.bottom > a.bottom) a.bottom = b.bottom;
	if (!a.left || b.left < a.left) a.left = b.left;
	if (!a.right || b.right > a.right) a.right = b.right;
	return a;
}
var DEFAULT_RECT = {
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: 0,
	height: 0
};
function getComponentBoundingRect(instance) {
	const el = instance.subTree.el;
	if (typeof window === "undefined") return DEFAULT_RECT;
	if (isFragment(instance)) return getFragmentRect(instance.subTree);
	else if (el?.nodeType === 1) return el?.getBoundingClientRect();
	else if (instance.subTree.component) return getComponentBoundingRect(instance.subTree.component);
	else return DEFAULT_RECT;
}
function getRootElementsFromComponentInstance(instance) {
	if (isFragment(instance)) return getFragmentRootElements(instance.subTree);
	if (!instance.subTree) return [];
	return [instance.subTree.el];
}
function getFragmentRootElements(vnode) {
	if (!vnode.children) return [];
	const list = [];
	vnode.children.forEach((childVnode) => {
		if (childVnode.component) list.push(...getRootElementsFromComponentInstance(childVnode.component));
		else if (childVnode?.el) list.push(childVnode.el);
	});
	return list;
}
var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
var containerStyles = {
	display: "block",
	zIndex: 2147483640,
	position: "fixed",
	backgroundColor: "#42b88325",
	border: "1px solid #42b88350",
	borderRadius: "5px",
	transition: "all 0.1s ease-in",
	pointerEvents: "none"
};
var cardStyles = {
	fontFamily: "Arial, Helvetica, sans-serif",
	padding: "5px 8px",
	borderRadius: "4px",
	textAlign: "left",
	position: "absolute",
	left: 0,
	color: "#e9e9e9",
	fontSize: "14px",
	fontWeight: 600,
	lineHeight: "24px",
	backgroundColor: "#42b883",
	boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
};
var indicatorStyles = {
	display: "inline-block",
	fontWeight: 400,
	fontStyle: "normal",
	fontSize: "12px",
	opacity: .7
};
function getContainerElement() {
	return document.getElementById(CONTAINER_ELEMENT_ID);
}
function getCardElement() {
	return document.getElementById(CARD_ELEMENT_ID);
}
function getIndicatorElement() {
	return document.getElementById(INDICATOR_ELEMENT_ID);
}
function getNameElement() {
	return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
}
function getStyles(bounds) {
	return {
		left: `${Math.round(bounds.left * 100) / 100}px`,
		top: `${Math.round(bounds.top * 100) / 100}px`,
		width: `${Math.round(bounds.width * 100) / 100}px`,
		height: `${Math.round(bounds.height * 100) / 100}px`
	};
}
function create(options) {
	const containerEl = document.createElement("div");
	containerEl.id = options.elementId ?? CONTAINER_ELEMENT_ID;
	Object.assign(containerEl.style, {
		...containerStyles,
		...getStyles(options.bounds),
		...options.style
	});
	const cardEl = document.createElement("span");
	cardEl.id = CARD_ELEMENT_ID;
	Object.assign(cardEl.style, {
		...cardStyles,
		top: options.bounds.top < 35 ? 0 : "-35px"
	});
	const nameEl = document.createElement("span");
	nameEl.id = COMPONENT_NAME_ELEMENT_ID;
	nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
	const indicatorEl = document.createElement("i");
	indicatorEl.id = INDICATOR_ELEMENT_ID;
	indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
	Object.assign(indicatorEl.style, indicatorStyles);
	cardEl.appendChild(nameEl);
	cardEl.appendChild(indicatorEl);
	containerEl.appendChild(cardEl);
	document.body.appendChild(containerEl);
	return containerEl;
}
function update(options) {
	const containerEl = getContainerElement();
	const cardEl = getCardElement();
	const nameEl = getNameElement();
	const indicatorEl = getIndicatorElement();
	if (containerEl) {
		Object.assign(containerEl.style, {
			...containerStyles,
			...getStyles(options.bounds)
		});
		Object.assign(cardEl.style, { top: options.bounds.top < 35 ? 0 : "-35px" });
		nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
		indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
	}
}
function highlight(instance) {
	const bounds = getComponentBoundingRect(instance);
	if (!bounds.width && !bounds.height) return;
	const name = getInstanceName(instance);
	getContainerElement() ? update({
		bounds,
		name
	}) : create({
		bounds,
		name
	});
}
function unhighlight() {
	const el = getContainerElement();
	if (el) el.style.display = "none";
}
var inspectInstance = null;
function inspectFn(e) {
	const target = e.target;
	if (target) {
		const instance = target.__vueParentComponent;
		if (instance) {
			inspectInstance = instance;
			if (instance.vnode.el) {
				const bounds = getComponentBoundingRect(instance);
				const name = getInstanceName(instance);
				getContainerElement() ? update({
					bounds,
					name
				}) : create({
					bounds,
					name
				});
			}
		}
	}
}
function selectComponentFn(e, cb) {
	e.preventDefault();
	e.stopPropagation();
	if (inspectInstance) cb(getUniqueComponentId(inspectInstance));
}
var inspectComponentHighLighterSelectFn = null;
function cancelInspectComponentHighLighter() {
	unhighlight();
	window.removeEventListener("mouseover", inspectFn);
	window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
	inspectComponentHighLighterSelectFn = null;
}
function inspectComponentHighLighter() {
	window.addEventListener("mouseover", inspectFn);
	return new Promise((resolve) => {
		function onSelect(e) {
			e.preventDefault();
			e.stopPropagation();
			selectComponentFn(e, (id) => {
				window.removeEventListener("click", onSelect, true);
				inspectComponentHighLighterSelectFn = null;
				window.removeEventListener("mouseover", inspectFn);
				const el = getContainerElement();
				if (el) el.style.display = "none";
				resolve(JSON.stringify({ id }));
			});
		}
		inspectComponentHighLighterSelectFn = onSelect;
		window.addEventListener("click", onSelect, true);
	});
}
function scrollToComponent(options) {
	const instance = getComponentInstance(activeAppRecord.value, options.id);
	if (instance) {
		const [el] = getRootElementsFromComponentInstance(instance);
		if (typeof el.scrollIntoView === "function") el.scrollIntoView({ behavior: "smooth" });
		else {
			const bounds = getComponentBoundingRect(instance);
			const scrollTarget = document.createElement("div");
			const styles = {
				...getStyles(bounds),
				position: "absolute"
			};
			Object.assign(scrollTarget.style, styles);
			document.body.appendChild(scrollTarget);
			scrollTarget.scrollIntoView({ behavior: "smooth" });
			setTimeout(() => {
				document.body.removeChild(scrollTarget);
			}, 2e3);
		}
		setTimeout(() => {
			const bounds = getComponentBoundingRect(instance);
			if (bounds.width || bounds.height) {
				const name = getInstanceName(instance);
				const el = getContainerElement();
				el ? update({
					...options,
					name,
					bounds
				}) : create({
					...options,
					name,
					bounds
				});
				setTimeout(() => {
					if (el) el.style.display = "none";
				}, 1500);
			}
		}, 1200);
	}
}
target.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ ??= true;
function waitForInspectorInit(cb) {
	let total = 0;
	const timer = setInterval(() => {
		if (target.__VUE_INSPECTOR__) {
			clearInterval(timer);
			total += 30;
			cb();
		}
		if (total >= 5e3) clearInterval(timer);
	}, 30);
}
function setupInspector() {
	const inspector = target.__VUE_INSPECTOR__;
	const _openInEditor = inspector.openInEditor;
	inspector.openInEditor = async (...params) => {
		inspector.disable();
		_openInEditor(...params);
	};
}
function getComponentInspector() {
	return new Promise((resolve) => {
		function setup() {
			setupInspector();
			resolve(target.__VUE_INSPECTOR__);
		}
		if (!target.__VUE_INSPECTOR__) waitForInspectorInit(() => {
			setup();
		});
		else setup();
	});
}
/**
* To prevent include a **HUGE** vue package in the final bundle of chrome ext / electron
* we stub the necessary vue module.
* This implementation is based on the 1c3327a0fa5983aa9078e3f7bb2330f572435425 commit
*/
/**
* @from [@vue/reactivity](https://github.com/vuejs/core/blob/1c3327a0fa5983aa9078e3f7bb2330f572435425/packages/reactivity/src/constants.ts#L17-L23)
*/
var ReactiveFlags = /* @__PURE__ */ function(ReactiveFlags) {
	ReactiveFlags["SKIP"] = "__v_skip";
	ReactiveFlags["IS_REACTIVE"] = "__v_isReactive";
	ReactiveFlags["IS_READONLY"] = "__v_isReadonly";
	ReactiveFlags["IS_SHALLOW"] = "__v_isShallow";
	ReactiveFlags["RAW"] = "__v_raw";
	return ReactiveFlags;
}({});
/**
* @from [@vue/reactivity](https://github.com/vuejs/core/blob/1c3327a0fa5983aa9078e3f7bb2330f572435425/packages/reactivity/src/reactive.ts#L330-L332)
*/
function isReadonly(value) {
	return !!(value && value[ReactiveFlags.IS_READONLY]);
}
/**
* @from [@vue/reactivity](https://github.com/vuejs/core/blob/1c3327a0fa5983aa9078e3f7bb2330f572435425/packages/reactivity/src/reactive.ts#L312-L317)
*/
function isReactive$1(value) {
	if (isReadonly(value)) return isReactive$1(value[ReactiveFlags.RAW]);
	return !!(value && value[ReactiveFlags.IS_REACTIVE]);
}
function isRef$1(r) {
	return !!(r && r.__v_isRef === true);
}
/**
* @from [@vue/reactivity](https://github.com/vuejs/core/blob/1c3327a0fa5983aa9078e3f7bb2330f572435425/packages/reactivity/src/reactive.ts#L372-L375)
*/
function toRaw$1(observed) {
	const raw = observed && observed[ReactiveFlags.RAW];
	return raw ? toRaw$1(raw) : observed;
}
var StateEditor = class {
	constructor() {
		this.refEditor = new RefStateEditor();
	}
	set(object, path, value, cb) {
		const sections = Array.isArray(path) ? path : path.split(".");
		while (sections.length > 1) {
			const section = sections.shift();
			if (object instanceof Map) object = object.get(section);
			else if (object instanceof Set) object = Array.from(object.values())[section];
			else object = object[section];
			if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
		}
		const field = sections[0];
		const item = this.refEditor.get(object)[field];
		if (cb) cb(object, field, value);
		else if (this.refEditor.isRef(item)) this.refEditor.set(item, value);
		else object[field] = value;
	}
	get(object, path) {
		const sections = Array.isArray(path) ? path : path.split(".");
		for (let i = 0; i < sections.length; i++) {
			if (object instanceof Map) object = object.get(sections[i]);
			else object = object[sections[i]];
			if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
			if (!object) return void 0;
		}
		return object;
	}
	has(object, path, parent = false) {
		if (typeof object === "undefined") return false;
		const sections = Array.isArray(path) ? path.slice() : path.split(".");
		const size = !parent ? 1 : 2;
		while (object && sections.length > size) {
			const section = sections.shift();
			object = object[section];
			if (this.refEditor.isRef(object)) object = this.refEditor.get(object);
		}
		return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
	}
	createDefaultSetCallback(state) {
		return (object, field, value) => {
			if (state.remove || state.newKey) if (Array.isArray(object)) object.splice(field, 1);
			else if (toRaw$1(object) instanceof Map) object.delete(field);
			else if (toRaw$1(object) instanceof Set) object.delete(Array.from(object.values())[field]);
			else Reflect.deleteProperty(object, field);
			if (!state.remove) {
				const target = object[state.newKey || field];
				if (this.refEditor.isRef(target)) this.refEditor.set(target, value);
				else if (toRaw$1(object) instanceof Map) object.set(state.newKey || field, value);
				else if (toRaw$1(object) instanceof Set) object.add(value);
				else object[state.newKey || field] = value;
			}
		};
	}
};
var RefStateEditor = class {
	set(ref, value) {
		if (isRef$1(ref)) ref.value = value;
		else {
			if (ref instanceof Set && Array.isArray(value)) {
				ref.clear();
				value.forEach((v) => ref.add(v));
				return;
			}
			const currentKeys = Object.keys(value);
			if (ref instanceof Map) {
				const previousKeysSet = new Set(ref.keys());
				currentKeys.forEach((key) => {
					ref.set(key, Reflect.get(value, key));
					previousKeysSet.delete(key);
				});
				previousKeysSet.forEach((key) => ref.delete(key));
				return;
			}
			const previousKeysSet = new Set(Object.keys(ref));
			currentKeys.forEach((key) => {
				Reflect.set(ref, key, Reflect.get(value, key));
				previousKeysSet.delete(key);
			});
			previousKeysSet.forEach((key) => Reflect.deleteProperty(ref, key));
		}
	}
	get(ref) {
		return isRef$1(ref) ? ref.value : ref;
	}
	isRef(ref) {
		return isRef$1(ref) || isReactive$1(ref);
	}
};
new StateEditor();
var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
function getTimelineLayersStateFromStorage() {
	if (typeof window === "undefined" || !isBrowser$1 || typeof localStorage === "undefined" || localStorage === null) return {
		recordingState: false,
		mouseEventEnabled: false,
		keyboardEventEnabled: false,
		componentEventEnabled: false,
		performanceEventEnabled: false,
		selected: ""
	};
	const state = typeof localStorage.getItem !== "undefined" ? localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID) : null;
	return state ? JSON.parse(state) : {
		recordingState: false,
		mouseEventEnabled: false,
		keyboardEventEnabled: false,
		componentEventEnabled: false,
		performanceEventEnabled: false,
		selected: ""
	};
}
target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS ??= [];
var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, { get(target, prop, receiver) {
	return Reflect.get(target, prop, receiver);
} });
function addTimelineLayer(options, descriptor) {
	devtoolsState.timelineLayersState[descriptor.id] = false;
	devtoolsTimelineLayers.push({
		...options,
		descriptorId: descriptor.id,
		appRecord: getAppRecord(descriptor.app)
	});
}
target.__VUE_DEVTOOLS_KIT_INSPECTOR__ ??= [];
var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, { get(target, prop, receiver) {
	return Reflect.get(target, prop, receiver);
} });
var callInspectorUpdatedHook = debounce(() => {
	devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.SEND_INSPECTOR_TO_CLIENT, getActiveInspectors());
});
function addInspector(inspector, descriptor) {
	devtoolsInspector.push({
		options: inspector,
		descriptor,
		treeFilterPlaceholder: inspector.treeFilterPlaceholder ?? "Search tree...",
		stateFilterPlaceholder: inspector.stateFilterPlaceholder ?? "Search state...",
		treeFilter: "",
		selectedNodeId: "",
		appRecord: getAppRecord(descriptor.app)
	});
	callInspectorUpdatedHook();
}
function getActiveInspectors() {
	return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
		const descriptor = inspector.descriptor;
		const options = inspector.options;
		return {
			id: options.id,
			label: options.label,
			logo: descriptor.logo,
			icon: `custom-ic-baseline-${options?.icon?.replace(/_/g, "-")}`,
			packageName: descriptor.packageName,
			homepage: descriptor.homepage,
			pluginId: descriptor.id
		};
	});
}
function getInspector(id, app) {
	return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
}
var DevToolsV6PluginAPIHookKeys = /* @__PURE__ */ function(DevToolsV6PluginAPIHookKeys) {
	DevToolsV6PluginAPIHookKeys["VISIT_COMPONENT_TREE"] = "visitComponentTree";
	DevToolsV6PluginAPIHookKeys["INSPECT_COMPONENT"] = "inspectComponent";
	DevToolsV6PluginAPIHookKeys["EDIT_COMPONENT_STATE"] = "editComponentState";
	DevToolsV6PluginAPIHookKeys["GET_INSPECTOR_TREE"] = "getInspectorTree";
	DevToolsV6PluginAPIHookKeys["GET_INSPECTOR_STATE"] = "getInspectorState";
	DevToolsV6PluginAPIHookKeys["EDIT_INSPECTOR_STATE"] = "editInspectorState";
	DevToolsV6PluginAPIHookKeys["INSPECT_TIMELINE_EVENT"] = "inspectTimelineEvent";
	DevToolsV6PluginAPIHookKeys["TIMELINE_CLEARED"] = "timelineCleared";
	DevToolsV6PluginAPIHookKeys["SET_PLUGIN_SETTINGS"] = "setPluginSettings";
	return DevToolsV6PluginAPIHookKeys;
}({});
var DevToolsContextHookKeys = /* @__PURE__ */ function(DevToolsContextHookKeys) {
	DevToolsContextHookKeys["ADD_INSPECTOR"] = "addInspector";
	DevToolsContextHookKeys["SEND_INSPECTOR_TREE"] = "sendInspectorTree";
	DevToolsContextHookKeys["SEND_INSPECTOR_STATE"] = "sendInspectorState";
	DevToolsContextHookKeys["CUSTOM_INSPECTOR_SELECT_NODE"] = "customInspectorSelectNode";
	DevToolsContextHookKeys["TIMELINE_LAYER_ADDED"] = "timelineLayerAdded";
	DevToolsContextHookKeys["TIMELINE_EVENT_ADDED"] = "timelineEventAdded";
	DevToolsContextHookKeys["GET_COMPONENT_INSTANCES"] = "getComponentInstances";
	DevToolsContextHookKeys["GET_COMPONENT_BOUNDS"] = "getComponentBounds";
	DevToolsContextHookKeys["GET_COMPONENT_NAME"] = "getComponentName";
	DevToolsContextHookKeys["COMPONENT_HIGHLIGHT"] = "componentHighlight";
	DevToolsContextHookKeys["COMPONENT_UNHIGHLIGHT"] = "componentUnhighlight";
	return DevToolsContextHookKeys;
}({});
var DevToolsMessagingHookKeys = /* @__PURE__ */ function(DevToolsMessagingHookKeys) {
	DevToolsMessagingHookKeys["SEND_INSPECTOR_TREE_TO_CLIENT"] = "sendInspectorTreeToClient";
	DevToolsMessagingHookKeys["SEND_INSPECTOR_STATE_TO_CLIENT"] = "sendInspectorStateToClient";
	DevToolsMessagingHookKeys["SEND_TIMELINE_EVENT_TO_CLIENT"] = "sendTimelineEventToClient";
	DevToolsMessagingHookKeys["SEND_INSPECTOR_TO_CLIENT"] = "sendInspectorToClient";
	DevToolsMessagingHookKeys["SEND_ACTIVE_APP_UNMOUNTED_TO_CLIENT"] = "sendActiveAppUpdatedToClient";
	DevToolsMessagingHookKeys["DEVTOOLS_STATE_UPDATED"] = "devtoolsStateUpdated";
	DevToolsMessagingHookKeys["DEVTOOLS_CONNECTED_UPDATED"] = "devtoolsConnectedUpdated";
	DevToolsMessagingHookKeys["ROUTER_INFO_UPDATED"] = "routerInfoUpdated";
	return DevToolsMessagingHookKeys;
}({});
function createDevToolsCtxHooks() {
	const hooks = createHooks();
	hooks.hook(DevToolsContextHookKeys.ADD_INSPECTOR, ({ inspector, plugin }) => {
		addInspector(inspector, plugin.descriptor);
	});
	const debounceSendInspectorTree = debounce(async ({ inspectorId, plugin }) => {
		if (!inspectorId || !plugin?.descriptor?.app || devtoolsState.highPerfModeEnabled) return;
		const inspector = getInspector(inspectorId, plugin.descriptor.app);
		const _payload = {
			app: plugin.descriptor.app,
			inspectorId,
			filter: inspector?.treeFilter || "",
			rootNodes: []
		};
		await new Promise((resolve) => {
			hooks.callHookWith(async (callbacks) => {
				await Promise.all(callbacks.map((cb) => cb(_payload)));
				resolve();
			}, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE);
		});
		hooks.callHookWith(async (callbacks) => {
			await Promise.all(callbacks.map((cb) => cb({
				inspectorId,
				rootNodes: _payload.rootNodes
			})));
		}, DevToolsMessagingHookKeys.SEND_INSPECTOR_TREE_TO_CLIENT);
	}, 120);
	hooks.hook(DevToolsContextHookKeys.SEND_INSPECTOR_TREE, debounceSendInspectorTree);
	const debounceSendInspectorState = debounce(async ({ inspectorId, plugin }) => {
		if (!inspectorId || !plugin?.descriptor?.app || devtoolsState.highPerfModeEnabled) return;
		const inspector = getInspector(inspectorId, plugin.descriptor.app);
		const _payload = {
			app: plugin.descriptor.app,
			inspectorId,
			nodeId: inspector?.selectedNodeId || "",
			state: null
		};
		const ctx = { currentTab: `custom-inspector:${inspectorId}` };
		if (_payload.nodeId) await new Promise((resolve) => {
			hooks.callHookWith(async (callbacks) => {
				await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
				resolve();
			}, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE);
		});
		hooks.callHookWith(async (callbacks) => {
			await Promise.all(callbacks.map((cb) => cb({
				inspectorId,
				nodeId: _payload.nodeId,
				state: _payload.state
			})));
		}, DevToolsMessagingHookKeys.SEND_INSPECTOR_STATE_TO_CLIENT);
	}, 120);
	hooks.hook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, debounceSendInspectorState);
	hooks.hook(DevToolsContextHookKeys.CUSTOM_INSPECTOR_SELECT_NODE, ({ inspectorId, nodeId, plugin }) => {
		const inspector = getInspector(inspectorId, plugin.descriptor.app);
		if (!inspector) return;
		inspector.selectedNodeId = nodeId;
	});
	hooks.hook(DevToolsContextHookKeys.TIMELINE_LAYER_ADDED, ({ options, plugin }) => {
		addTimelineLayer(options, plugin.descriptor);
	});
	hooks.hook(DevToolsContextHookKeys.TIMELINE_EVENT_ADDED, ({ options, plugin }) => {
		if (devtoolsState.highPerfModeEnabled || !devtoolsState.timelineLayersState?.[plugin.descriptor.id] && ![
			"performance",
			"component-event",
			"keyboard",
			"mouse"
		].includes(options.layerId)) return;
		hooks.callHookWith(async (callbacks) => {
			await Promise.all(callbacks.map((cb) => cb(options)));
		}, DevToolsMessagingHookKeys.SEND_TIMELINE_EVENT_TO_CLIENT);
	});
	hooks.hook(DevToolsContextHookKeys.GET_COMPONENT_INSTANCES, async ({ app }) => {
		const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
		if (!appRecord) return null;
		const appId = appRecord.id.toString();
		return [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
	});
	hooks.hook(DevToolsContextHookKeys.GET_COMPONENT_BOUNDS, async ({ instance }) => {
		return getComponentBoundingRect(instance);
	});
	hooks.hook(DevToolsContextHookKeys.GET_COMPONENT_NAME, ({ instance }) => {
		return getInstanceName(instance);
	});
	hooks.hook(DevToolsContextHookKeys.COMPONENT_HIGHLIGHT, ({ uid }) => {
		const instance = activeAppRecord.value.instanceMap.get(uid);
		if (instance) highlight(instance);
	});
	hooks.hook(DevToolsContextHookKeys.COMPONENT_UNHIGHLIGHT, () => {
		unhighlight();
	});
	return hooks;
}
target.__VUE_DEVTOOLS_KIT_APP_RECORDS__ ??= [];
target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ ??= {};
target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ ??= "";
target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ ??= [];
target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ ??= [];
var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
function initStateFactory() {
	return {
		connected: false,
		clientConnected: false,
		vitePluginDetected: true,
		appRecords: [],
		activeAppRecordId: "",
		tabs: [],
		commands: [],
		highPerfModeEnabled: true,
		devtoolsClientDetected: {},
		perfUniqueGroupId: 0,
		timelineLayersState: getTimelineLayersStateFromStorage()
	};
}
target[STATE_KEY] ??= initStateFactory();
var callStateUpdatedHook = debounce((state) => {
	devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.DEVTOOLS_STATE_UPDATED, { state });
});
debounce((state, oldState) => {
	devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.DEVTOOLS_CONNECTED_UPDATED, {
		state,
		oldState
	});
});
var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, { get(_target, prop, receiver) {
	if (prop === "value") return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
	return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
} });
var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, { get(_target, prop, receiver) {
	if (prop === "value") return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
	else if (prop === "id") return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
	return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
} });
function updateAllStates() {
	callStateUpdatedHook({
		...target[STATE_KEY],
		appRecords: devtoolsAppRecords.value,
		activeAppRecordId: activeAppRecord.id,
		tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
		commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
	});
}
function setActiveAppRecord(app) {
	target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
	updateAllStates();
}
function setActiveAppRecordId(id) {
	target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
	updateAllStates();
}
var devtoolsState = new Proxy(target[STATE_KEY], {
	get(target$3, property) {
		if (property === "appRecords") return devtoolsAppRecords;
		else if (property === "activeAppRecordId") return activeAppRecord.id;
		else if (property === "tabs") return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
		else if (property === "commands") return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
		return target[STATE_KEY][property];
	},
	deleteProperty(target, property) {
		delete target[property];
		return true;
	},
	set(target$4, property, value) {
		target$4[property] = value;
		target[STATE_KEY][property] = value;
		return true;
	}
});
function openInEditor(options = {}) {
	const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
	if (file) {
		if (host === "chrome-extension") {
			const fileName = file.replace(/\\/g, "\\\\");
			const _baseUrl = window.VUE_DEVTOOLS_CONFIG?.openInEditorHost ?? "/";
			fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
				if (!response.ok) {
					const msg = `Opening component ${fileName} failed`;
					console.log(`%c${msg}`, "color:red");
				}
			});
		} else if (devtoolsState.vitePluginDetected) {
			const _baseUrl = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__ ?? baseUrl;
			target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
		}
	}
}
target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ ??= [];
var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, { get(target, prop, receiver) {
	return Reflect.get(target, prop, receiver);
} });
function _getSettings(settings) {
	const _settings = {};
	Object.keys(settings).forEach((key) => {
		_settings[key] = settings[key].defaultValue;
	});
	return _settings;
}
function getPluginLocalKey(pluginId) {
	return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId}__`;
}
function getPluginSettingsOptions(pluginId) {
	return (devtoolsPluginBuffer.find((item) => item[0].id === pluginId && !!item[0]?.settings)?.[0] ?? null)?.settings ?? null;
}
function getPluginSettings(pluginId, fallbackValue) {
	const localKey = getPluginLocalKey(pluginId);
	if (localKey) {
		const localSettings = localStorage.getItem(localKey);
		if (localSettings) return JSON.parse(localSettings);
	}
	if (pluginId) return _getSettings((devtoolsPluginBuffer.find((item) => item[0].id === pluginId)?.[0] ?? null)?.settings ?? {});
	return _getSettings(fallbackValue);
}
function initPluginSettings(pluginId, settings) {
	const localKey = getPluginLocalKey(pluginId);
	if (!localStorage.getItem(localKey)) localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
}
function setPluginSettings(pluginId, key, value) {
	const localKey = getPluginLocalKey(pluginId);
	const localSettings = localStorage.getItem(localKey);
	const parsedLocalSettings = JSON.parse(localSettings || "{}");
	const updated = {
		...parsedLocalSettings,
		[key]: value
	};
	localStorage.setItem(localKey, JSON.stringify(updated));
	devtoolsContext.hooks.callHookWith((callbacks) => {
		callbacks.forEach((cb) => cb({
			pluginId,
			key,
			oldValue: parsedLocalSettings[key],
			newValue: value,
			settings: updated
		}));
	}, DevToolsV6PluginAPIHookKeys.SET_PLUGIN_SETTINGS);
}
var DevToolsHooks = /* @__PURE__ */ function(DevToolsHooks) {
	DevToolsHooks["APP_INIT"] = "app:init";
	DevToolsHooks["APP_UNMOUNT"] = "app:unmount";
	DevToolsHooks["COMPONENT_UPDATED"] = "component:updated";
	DevToolsHooks["COMPONENT_ADDED"] = "component:added";
	DevToolsHooks["COMPONENT_REMOVED"] = "component:removed";
	DevToolsHooks["COMPONENT_EMIT"] = "component:emit";
	DevToolsHooks["PERFORMANCE_START"] = "perf:start";
	DevToolsHooks["PERFORMANCE_END"] = "perf:end";
	DevToolsHooks["ADD_ROUTE"] = "router:add-route";
	DevToolsHooks["REMOVE_ROUTE"] = "router:remove-route";
	DevToolsHooks["RENDER_TRACKED"] = "render:tracked";
	DevToolsHooks["RENDER_TRIGGERED"] = "render:triggered";
	DevToolsHooks["APP_CONNECTED"] = "app:connected";
	DevToolsHooks["SETUP_DEVTOOLS_PLUGIN"] = "devtools-plugin:setup";
	return DevToolsHooks;
}({});
var devtoolsHooks = target.__VUE_DEVTOOLS_HOOK ??= createHooks();
var hook = {
	on: {
		vueAppInit(fn) {
			devtoolsHooks.hook(DevToolsHooks.APP_INIT, fn);
		},
		vueAppUnmount(fn) {
			devtoolsHooks.hook(DevToolsHooks.APP_UNMOUNT, fn);
		},
		vueAppConnected(fn) {
			devtoolsHooks.hook(DevToolsHooks.APP_CONNECTED, fn);
		},
		componentAdded(fn) {
			return devtoolsHooks.hook(DevToolsHooks.COMPONENT_ADDED, fn);
		},
		componentEmit(fn) {
			return devtoolsHooks.hook(DevToolsHooks.COMPONENT_EMIT, fn);
		},
		componentUpdated(fn) {
			return devtoolsHooks.hook(DevToolsHooks.COMPONENT_UPDATED, fn);
		},
		componentRemoved(fn) {
			return devtoolsHooks.hook(DevToolsHooks.COMPONENT_REMOVED, fn);
		},
		setupDevtoolsPlugin(fn) {
			devtoolsHooks.hook(DevToolsHooks.SETUP_DEVTOOLS_PLUGIN, fn);
		},
		perfStart(fn) {
			return devtoolsHooks.hook(DevToolsHooks.PERFORMANCE_START, fn);
		},
		perfEnd(fn) {
			return devtoolsHooks.hook(DevToolsHooks.PERFORMANCE_END, fn);
		}
	},
	setupDevToolsPlugin(pluginDescriptor, setupFn) {
		return devtoolsHooks.callHook(DevToolsHooks.SETUP_DEVTOOLS_PLUGIN, pluginDescriptor, setupFn);
	}
};
var DevToolsV6PluginAPI = class {
	constructor({ plugin, ctx }) {
		this.hooks = ctx.hooks;
		this.plugin = plugin;
	}
	get on() {
		return {
			visitComponentTree: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.VISIT_COMPONENT_TREE, handler);
			},
			inspectComponent: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.INSPECT_COMPONENT, handler);
			},
			editComponentState: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.EDIT_COMPONENT_STATE, handler);
			},
			getInspectorTree: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE, handler);
			},
			getInspectorState: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE, handler);
			},
			editInspectorState: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.EDIT_INSPECTOR_STATE, handler);
			},
			inspectTimelineEvent: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.INSPECT_TIMELINE_EVENT, handler);
			},
			timelineCleared: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.TIMELINE_CLEARED, handler);
			},
			setPluginSettings: (handler) => {
				this.hooks.hook(DevToolsV6PluginAPIHookKeys.SET_PLUGIN_SETTINGS, handler);
			}
		};
	}
	notifyComponentUpdate(instance) {
		if (devtoolsState.highPerfModeEnabled) return;
		const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
		if (inspector?.id) {
			if (instance) {
				const args = [
					instance.appContext.app,
					instance.uid,
					instance.parent?.uid,
					instance
				];
				devtoolsHooks.callHook(DevToolsHooks.COMPONENT_UPDATED, ...args);
			} else devtoolsHooks.callHook(DevToolsHooks.COMPONENT_UPDATED);
			this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
				inspectorId: inspector.id,
				plugin: this.plugin
			});
		}
	}
	addInspector(options) {
		this.hooks.callHook(DevToolsContextHookKeys.ADD_INSPECTOR, {
			inspector: options,
			plugin: this.plugin
		});
		if (this.plugin.descriptor.settings) initPluginSettings(options.id, this.plugin.descriptor.settings);
	}
	sendInspectorTree(inspectorId) {
		if (devtoolsState.highPerfModeEnabled) return;
		this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_TREE, {
			inspectorId,
			plugin: this.plugin
		});
	}
	sendInspectorState(inspectorId) {
		if (devtoolsState.highPerfModeEnabled) return;
		this.hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
			inspectorId,
			plugin: this.plugin
		});
	}
	selectInspectorNode(inspectorId, nodeId) {
		this.hooks.callHook(DevToolsContextHookKeys.CUSTOM_INSPECTOR_SELECT_NODE, {
			inspectorId,
			nodeId,
			plugin: this.plugin
		});
	}
	visitComponentTree(payload) {
		return this.hooks.callHook(DevToolsV6PluginAPIHookKeys.VISIT_COMPONENT_TREE, payload);
	}
	now() {
		if (devtoolsState.highPerfModeEnabled) return 0;
		return Date.now();
	}
	addTimelineLayer(options) {
		this.hooks.callHook(DevToolsContextHookKeys.TIMELINE_LAYER_ADDED, {
			options,
			plugin: this.plugin
		});
	}
	addTimelineEvent(options) {
		if (devtoolsState.highPerfModeEnabled) return;
		this.hooks.callHook(DevToolsContextHookKeys.TIMELINE_EVENT_ADDED, {
			options,
			plugin: this.plugin
		});
	}
	getSettings(pluginId) {
		return getPluginSettings(pluginId ?? this.plugin.descriptor.id, this.plugin.descriptor.settings);
	}
	getComponentInstances(app) {
		return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_INSTANCES, { app });
	}
	getComponentBounds(instance) {
		return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_BOUNDS, { instance });
	}
	getComponentName(instance) {
		return this.hooks.callHook(DevToolsContextHookKeys.GET_COMPONENT_NAME, { instance });
	}
	highlightElement(instance) {
		const uid = instance.__VUE_DEVTOOLS_NEXT_UID__;
		return this.hooks.callHook(DevToolsContextHookKeys.COMPONENT_HIGHLIGHT, { uid });
	}
	unhighlightElement() {
		return this.hooks.callHook(DevToolsContextHookKeys.COMPONENT_UNHIGHLIGHT);
	}
};
var DevToolsPluginAPI = DevToolsV6PluginAPI;
var UNDEFINED = "__vue_devtool_undefined__";
var INFINITY = "__vue_devtool_infinity__";
var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
var NAN = "__vue_devtool_nan__";
Object.entries({
	[UNDEFINED]: "undefined",
	[NAN]: "NaN",
	[INFINITY]: "Infinity",
	[NEGATIVE_INFINITY]: "-Infinity"
}).reduce((acc, [key, value]) => {
	acc[value] = key;
	return acc;
}, {});
target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ ??= /* @__PURE__ */ new Set();
function setupDevToolsPlugin(pluginDescriptor, setupFn) {
	return hook.setupDevToolsPlugin(pluginDescriptor, setupFn);
}
function callDevToolsPluginSetupFn(plugin, app) {
	const [pluginDescriptor, setupFn] = plugin;
	if (pluginDescriptor.app !== app) return;
	const api = new DevToolsPluginAPI({
		plugin: {
			setupFn,
			descriptor: pluginDescriptor
		},
		ctx: devtoolsContext
	});
	if (pluginDescriptor.packageName === "vuex") api.on.editInspectorState((payload) => {
		api.sendInspectorState(payload.inspectorId);
	});
	setupFn(api);
}
function registerDevToolsPlugin(app, options) {
	if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app)) return;
	if (devtoolsState.highPerfModeEnabled && !options?.inspectingComponent) return;
	target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
	devtoolsPluginBuffer.forEach((plugin) => {
		callDevToolsPluginSetupFn(plugin, app);
	});
}
var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
target[ROUTER_INFO_KEY] ??= {
	currentRoute: null,
	routes: []
};
target[ROUTER_KEY] ??= {};
new Proxy(target[ROUTER_INFO_KEY], { get(target$1, property) {
	return target[ROUTER_INFO_KEY][property];
} });
new Proxy(target[ROUTER_KEY], { get(target$2, property) {
	if (property === "value") return target[ROUTER_KEY];
} });
function getRoutes(router) {
	const routesMap = /* @__PURE__ */ new Map();
	return (router?.getRoutes() || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
}
function filterRoutes(routes) {
	return routes.map((item) => {
		let { path, name, children, meta } = item;
		if (children?.length) children = filterRoutes(children);
		return {
			path,
			name,
			children,
			meta
		};
	});
}
function filterCurrentRoute(route) {
	if (route) {
		const { fullPath, hash, href, path, name, matched, params, query } = route;
		return {
			fullPath,
			hash,
			href,
			path,
			name,
			params,
			query,
			matched: filterRoutes(matched)
		};
	}
	return route;
}
function normalizeRouterInfo(appRecord, activeAppRecord) {
	function init() {
		const router = appRecord.app?.config.globalProperties.$router;
		const currentRoute = filterCurrentRoute(router?.currentRoute.value);
		const routes = filterRoutes(getRoutes(router));
		const c = console.warn;
		console.warn = () => {};
		target[ROUTER_INFO_KEY] = {
			currentRoute: currentRoute ? deepClone(currentRoute) : {},
			routes: deepClone(routes)
		};
		target[ROUTER_KEY] = router;
		console.warn = c;
	}
	init();
	hook.on.componentUpdated(debounce(() => {
		if (activeAppRecord.value?.app !== appRecord.app) return;
		init();
		if (devtoolsState.highPerfModeEnabled) return;
		devtoolsContext.hooks.callHook(DevToolsMessagingHookKeys.ROUTER_INFO_UPDATED, { state: target[ROUTER_INFO_KEY] });
	}, 200));
}
function createDevToolsApi(hooks) {
	return {
		async getInspectorTree(payload) {
			const _payload = {
				...payload,
				app: activeAppRecord.value.app,
				rootNodes: []
			};
			await new Promise((resolve) => {
				hooks.callHookWith(async (callbacks) => {
					await Promise.all(callbacks.map((cb) => cb(_payload)));
					resolve();
				}, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_TREE);
			});
			return _payload.rootNodes;
		},
		async getInspectorState(payload) {
			const _payload = {
				...payload,
				app: activeAppRecord.value.app,
				state: null
			};
			const ctx = { currentTab: `custom-inspector:${payload.inspectorId}` };
			await new Promise((resolve) => {
				hooks.callHookWith(async (callbacks) => {
					await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
					resolve();
				}, DevToolsV6PluginAPIHookKeys.GET_INSPECTOR_STATE);
			});
			return _payload.state;
		},
		editInspectorState(payload) {
			const stateEditor = new StateEditor();
			const _payload = {
				...payload,
				app: activeAppRecord.value.app,
				set: (obj, path = payload.path, value = payload.state.value, cb) => {
					stateEditor.set(obj, path, value, cb || stateEditor.createDefaultSetCallback(payload.state));
				}
			};
			hooks.callHookWith((callbacks) => {
				callbacks.forEach((cb) => cb(_payload));
			}, DevToolsV6PluginAPIHookKeys.EDIT_INSPECTOR_STATE);
		},
		sendInspectorState(inspectorId) {
			const inspector = getInspector(inspectorId);
			hooks.callHook(DevToolsContextHookKeys.SEND_INSPECTOR_STATE, {
				inspectorId,
				plugin: {
					descriptor: inspector.descriptor,
					setupFn: () => ({})
				}
			});
		},
		inspectComponentInspector() {
			return inspectComponentHighLighter();
		},
		cancelInspectComponentInspector() {
			return cancelInspectComponentHighLighter();
		},
		getComponentRenderCode(id) {
			const instance = getComponentInstance(activeAppRecord.value, id);
			if (instance) return !(typeof instance?.type === "function") ? instance.render.toString() : instance.type.toString();
		},
		scrollToComponent(id) {
			return scrollToComponent({ id });
		},
		openInEditor,
		getVueInspector: getComponentInspector,
		toggleApp(id, options) {
			const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
			if (appRecord) {
				setActiveAppRecordId(id);
				setActiveAppRecord(appRecord);
				normalizeRouterInfo(appRecord, activeAppRecord);
				callInspectorUpdatedHook();
				registerDevToolsPlugin(appRecord.app, options);
			}
		},
		inspectDOM(instanceId) {
			const instance = getComponentInstance(activeAppRecord.value, instanceId);
			if (instance) {
				const [el] = getRootElementsFromComponentInstance(instance);
				if (el) target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
			}
		},
		updatePluginSettings(pluginId, key, value) {
			setPluginSettings(pluginId, key, value);
		},
		getPluginSettings(pluginId) {
			return {
				options: getPluginSettingsOptions(pluginId),
				values: getPluginSettings(pluginId)
			};
		}
	};
}
target.__VUE_DEVTOOLS_ENV__ ??= { vitePluginDetected: false };
var hooks = createDevToolsCtxHooks();
target.__VUE_DEVTOOLS_KIT_CONTEXT__ ??= {
	hooks,
	get state() {
		return {
			...devtoolsState,
			activeAppRecordId: activeAppRecord.id,
			activeAppRecord: activeAppRecord.value,
			appRecords: devtoolsAppRecords.value
		};
	},
	api: createDevToolsApi(hooks)
};
var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;
var require_speakingurl$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root) {
		"use strict";
		/**
		* charMap
		* @type {Object}
		*/
		var charMap = {
			"À": "A",
			"Á": "A",
			"Â": "A",
			"Ã": "A",
			"Ä": "Ae",
			"Å": "A",
			"Æ": "AE",
			"Ç": "C",
			"È": "E",
			"É": "E",
			"Ê": "E",
			"Ë": "E",
			"Ì": "I",
			"Í": "I",
			"Î": "I",
			"Ï": "I",
			"Ð": "D",
			"Ñ": "N",
			"Ò": "O",
			"Ó": "O",
			"Ô": "O",
			"Õ": "O",
			"Ö": "Oe",
			"Ő": "O",
			"Ø": "O",
			"Ù": "U",
			"Ú": "U",
			"Û": "U",
			"Ü": "Ue",
			"Ű": "U",
			"Ý": "Y",
			"Þ": "TH",
			"ß": "ss",
			"à": "a",
			"á": "a",
			"â": "a",
			"ã": "a",
			"ä": "ae",
			"å": "a",
			"æ": "ae",
			"ç": "c",
			"è": "e",
			"é": "e",
			"ê": "e",
			"ë": "e",
			"ì": "i",
			"í": "i",
			"î": "i",
			"ï": "i",
			"ð": "d",
			"ñ": "n",
			"ò": "o",
			"ó": "o",
			"ô": "o",
			"õ": "o",
			"ö": "oe",
			"ő": "o",
			"ø": "o",
			"ù": "u",
			"ú": "u",
			"û": "u",
			"ü": "ue",
			"ű": "u",
			"ý": "y",
			"þ": "th",
			"ÿ": "y",
			"ẞ": "SS",
			"ا": "a",
			"أ": "a",
			"إ": "i",
			"آ": "aa",
			"ؤ": "u",
			"ئ": "e",
			"ء": "a",
			"ب": "b",
			"ت": "t",
			"ث": "th",
			"ج": "j",
			"ح": "h",
			"خ": "kh",
			"د": "d",
			"ذ": "th",
			"ر": "r",
			"ز": "z",
			"س": "s",
			"ش": "sh",
			"ص": "s",
			"ض": "dh",
			"ط": "t",
			"ظ": "z",
			"ع": "a",
			"غ": "gh",
			"ف": "f",
			"ق": "q",
			"ك": "k",
			"ل": "l",
			"م": "m",
			"ن": "n",
			"ه": "h",
			"و": "w",
			"ي": "y",
			"ى": "a",
			"ة": "h",
			"ﻻ": "la",
			"ﻷ": "laa",
			"ﻹ": "lai",
			"ﻵ": "laa",
			"گ": "g",
			"چ": "ch",
			"پ": "p",
			"ژ": "zh",
			"ک": "k",
			"ی": "y",
			"َ": "a",
			"ً": "an",
			"ِ": "e",
			"ٍ": "en",
			"ُ": "u",
			"ٌ": "on",
			"ْ": "",
			"٠": "0",
			"١": "1",
			"٢": "2",
			"٣": "3",
			"٤": "4",
			"٥": "5",
			"٦": "6",
			"٧": "7",
			"٨": "8",
			"٩": "9",
			"۰": "0",
			"۱": "1",
			"۲": "2",
			"۳": "3",
			"۴": "4",
			"۵": "5",
			"۶": "6",
			"۷": "7",
			"۸": "8",
			"۹": "9",
			"က": "k",
			"ခ": "kh",
			"ဂ": "g",
			"ဃ": "ga",
			"င": "ng",
			"စ": "s",
			"ဆ": "sa",
			"ဇ": "z",
			"စျ": "za",
			"ည": "ny",
			"ဋ": "t",
			"ဌ": "ta",
			"ဍ": "d",
			"ဎ": "da",
			"ဏ": "na",
			"တ": "t",
			"ထ": "ta",
			"ဒ": "d",
			"ဓ": "da",
			"န": "n",
			"ပ": "p",
			"ဖ": "pa",
			"ဗ": "b",
			"ဘ": "ba",
			"မ": "m",
			"ယ": "y",
			"ရ": "ya",
			"လ": "l",
			"ဝ": "w",
			"သ": "th",
			"ဟ": "h",
			"ဠ": "la",
			"အ": "a",
			"ြ": "y",
			"ျ": "ya",
			"ွ": "w",
			"ြွ": "yw",
			"ျွ": "ywa",
			"ှ": "h",
			"ဧ": "e",
			"၏": "-e",
			"ဣ": "i",
			"ဤ": "-i",
			"ဉ": "u",
			"ဦ": "-u",
			"ဩ": "aw",
			"သြော": "aw",
			"ဪ": "aw",
			"၀": "0",
			"၁": "1",
			"၂": "2",
			"၃": "3",
			"၄": "4",
			"၅": "5",
			"၆": "6",
			"၇": "7",
			"၈": "8",
			"၉": "9",
			"္": "",
			"့": "",
			"း": "",
			"č": "c",
			"ď": "d",
			"ě": "e",
			"ň": "n",
			"ř": "r",
			"š": "s",
			"ť": "t",
			"ů": "u",
			"ž": "z",
			"Č": "C",
			"Ď": "D",
			"Ě": "E",
			"Ň": "N",
			"Ř": "R",
			"Š": "S",
			"Ť": "T",
			"Ů": "U",
			"Ž": "Z",
			"ހ": "h",
			"ށ": "sh",
			"ނ": "n",
			"ރ": "r",
			"ބ": "b",
			"ޅ": "lh",
			"ކ": "k",
			"އ": "a",
			"ވ": "v",
			"މ": "m",
			"ފ": "f",
			"ދ": "dh",
			"ތ": "th",
			"ލ": "l",
			"ގ": "g",
			"ޏ": "gn",
			"ސ": "s",
			"ޑ": "d",
			"ޒ": "z",
			"ޓ": "t",
			"ޔ": "y",
			"ޕ": "p",
			"ޖ": "j",
			"ޗ": "ch",
			"ޘ": "tt",
			"ޙ": "hh",
			"ޚ": "kh",
			"ޛ": "th",
			"ޜ": "z",
			"ޝ": "sh",
			"ޞ": "s",
			"ޟ": "d",
			"ޠ": "t",
			"ޡ": "z",
			"ޢ": "a",
			"ޣ": "gh",
			"ޤ": "q",
			"ޥ": "w",
			"ަ": "a",
			"ާ": "aa",
			"ި": "i",
			"ީ": "ee",
			"ު": "u",
			"ޫ": "oo",
			"ެ": "e",
			"ޭ": "ey",
			"ޮ": "o",
			"ޯ": "oa",
			"ް": "",
			"ა": "a",
			"ბ": "b",
			"გ": "g",
			"დ": "d",
			"ე": "e",
			"ვ": "v",
			"ზ": "z",
			"თ": "t",
			"ი": "i",
			"კ": "k",
			"ლ": "l",
			"მ": "m",
			"ნ": "n",
			"ო": "o",
			"პ": "p",
			"ჟ": "zh",
			"რ": "r",
			"ს": "s",
			"ტ": "t",
			"უ": "u",
			"ფ": "p",
			"ქ": "k",
			"ღ": "gh",
			"ყ": "q",
			"შ": "sh",
			"ჩ": "ch",
			"ც": "ts",
			"ძ": "dz",
			"წ": "ts",
			"ჭ": "ch",
			"ხ": "kh",
			"ჯ": "j",
			"ჰ": "h",
			"α": "a",
			"β": "v",
			"γ": "g",
			"δ": "d",
			"ε": "e",
			"ζ": "z",
			"η": "i",
			"θ": "th",
			"ι": "i",
			"κ": "k",
			"λ": "l",
			"μ": "m",
			"ν": "n",
			"ξ": "ks",
			"ο": "o",
			"π": "p",
			"ρ": "r",
			"σ": "s",
			"τ": "t",
			"υ": "y",
			"φ": "f",
			"χ": "x",
			"ψ": "ps",
			"ω": "o",
			"ά": "a",
			"έ": "e",
			"ί": "i",
			"ό": "o",
			"ύ": "y",
			"ή": "i",
			"ώ": "o",
			"ς": "s",
			"ϊ": "i",
			"ΰ": "y",
			"ϋ": "y",
			"ΐ": "i",
			"Α": "A",
			"Β": "B",
			"Γ": "G",
			"Δ": "D",
			"Ε": "E",
			"Ζ": "Z",
			"Η": "I",
			"Θ": "TH",
			"Ι": "I",
			"Κ": "K",
			"Λ": "L",
			"Μ": "M",
			"Ν": "N",
			"Ξ": "KS",
			"Ο": "O",
			"Π": "P",
			"Ρ": "R",
			"Σ": "S",
			"Τ": "T",
			"Υ": "Y",
			"Φ": "F",
			"Χ": "X",
			"Ψ": "PS",
			"Ω": "O",
			"Ά": "A",
			"Έ": "E",
			"Ί": "I",
			"Ό": "O",
			"Ύ": "Y",
			"Ή": "I",
			"Ώ": "O",
			"Ϊ": "I",
			"Ϋ": "Y",
			"ā": "a",
			"ē": "e",
			"ģ": "g",
			"ī": "i",
			"ķ": "k",
			"ļ": "l",
			"ņ": "n",
			"ū": "u",
			"Ā": "A",
			"Ē": "E",
			"Ģ": "G",
			"Ī": "I",
			"Ķ": "k",
			"Ļ": "L",
			"Ņ": "N",
			"Ū": "U",
			"Ќ": "Kj",
			"ќ": "kj",
			"Љ": "Lj",
			"љ": "lj",
			"Њ": "Nj",
			"њ": "nj",
			"Тс": "Ts",
			"тс": "ts",
			"ą": "a",
			"ć": "c",
			"ę": "e",
			"ł": "l",
			"ń": "n",
			"ś": "s",
			"ź": "z",
			"ż": "z",
			"Ą": "A",
			"Ć": "C",
			"Ę": "E",
			"Ł": "L",
			"Ń": "N",
			"Ś": "S",
			"Ź": "Z",
			"Ż": "Z",
			"Є": "Ye",
			"І": "I",
			"Ї": "Yi",
			"Ґ": "G",
			"є": "ye",
			"і": "i",
			"ї": "yi",
			"ґ": "g",
			"ă": "a",
			"Ă": "A",
			"ș": "s",
			"Ș": "S",
			"ț": "t",
			"Ț": "T",
			"ţ": "t",
			"Ţ": "T",
			"а": "a",
			"б": "b",
			"в": "v",
			"г": "g",
			"д": "d",
			"е": "e",
			"ё": "yo",
			"ж": "zh",
			"з": "z",
			"и": "i",
			"й": "i",
			"к": "k",
			"л": "l",
			"м": "m",
			"н": "n",
			"о": "o",
			"п": "p",
			"р": "r",
			"с": "s",
			"т": "t",
			"у": "u",
			"ф": "f",
			"х": "kh",
			"ц": "c",
			"ч": "ch",
			"ш": "sh",
			"щ": "sh",
			"ъ": "",
			"ы": "y",
			"ь": "",
			"э": "e",
			"ю": "yu",
			"я": "ya",
			"А": "A",
			"Б": "B",
			"В": "V",
			"Г": "G",
			"Д": "D",
			"Е": "E",
			"Ё": "Yo",
			"Ж": "Zh",
			"З": "Z",
			"И": "I",
			"Й": "I",
			"К": "K",
			"Л": "L",
			"М": "M",
			"Н": "N",
			"О": "O",
			"П": "P",
			"Р": "R",
			"С": "S",
			"Т": "T",
			"У": "U",
			"Ф": "F",
			"Х": "Kh",
			"Ц": "C",
			"Ч": "Ch",
			"Ш": "Sh",
			"Щ": "Sh",
			"Ъ": "",
			"Ы": "Y",
			"Ь": "",
			"Э": "E",
			"Ю": "Yu",
			"Я": "Ya",
			"ђ": "dj",
			"ј": "j",
			"ћ": "c",
			"џ": "dz",
			"Ђ": "Dj",
			"Ј": "j",
			"Ћ": "C",
			"Џ": "Dz",
			"ľ": "l",
			"ĺ": "l",
			"ŕ": "r",
			"Ľ": "L",
			"Ĺ": "L",
			"Ŕ": "R",
			"ş": "s",
			"Ş": "S",
			"ı": "i",
			"İ": "I",
			"ğ": "g",
			"Ğ": "G",
			"ả": "a",
			"Ả": "A",
			"ẳ": "a",
			"Ẳ": "A",
			"ẩ": "a",
			"Ẩ": "A",
			"đ": "d",
			"Đ": "D",
			"ẹ": "e",
			"Ẹ": "E",
			"ẽ": "e",
			"Ẽ": "E",
			"ẻ": "e",
			"Ẻ": "E",
			"ế": "e",
			"Ế": "E",
			"ề": "e",
			"Ề": "E",
			"ệ": "e",
			"Ệ": "E",
			"ễ": "e",
			"Ễ": "E",
			"ể": "e",
			"Ể": "E",
			"ỏ": "o",
			"ọ": "o",
			"Ọ": "o",
			"ố": "o",
			"Ố": "O",
			"ồ": "o",
			"Ồ": "O",
			"ổ": "o",
			"Ổ": "O",
			"ộ": "o",
			"Ộ": "O",
			"ỗ": "o",
			"Ỗ": "O",
			"ơ": "o",
			"Ơ": "O",
			"ớ": "o",
			"Ớ": "O",
			"ờ": "o",
			"Ờ": "O",
			"ợ": "o",
			"Ợ": "O",
			"ỡ": "o",
			"Ỡ": "O",
			"Ở": "o",
			"ở": "o",
			"ị": "i",
			"Ị": "I",
			"ĩ": "i",
			"Ĩ": "I",
			"ỉ": "i",
			"Ỉ": "i",
			"ủ": "u",
			"Ủ": "U",
			"ụ": "u",
			"Ụ": "U",
			"ũ": "u",
			"Ũ": "U",
			"ư": "u",
			"Ư": "U",
			"ứ": "u",
			"Ứ": "U",
			"ừ": "u",
			"Ừ": "U",
			"ự": "u",
			"Ự": "U",
			"ữ": "u",
			"Ữ": "U",
			"ử": "u",
			"Ử": "ư",
			"ỷ": "y",
			"Ỷ": "y",
			"ỳ": "y",
			"Ỳ": "Y",
			"ỵ": "y",
			"Ỵ": "Y",
			"ỹ": "y",
			"Ỹ": "Y",
			"ạ": "a",
			"Ạ": "A",
			"ấ": "a",
			"Ấ": "A",
			"ầ": "a",
			"Ầ": "A",
			"ậ": "a",
			"Ậ": "A",
			"ẫ": "a",
			"Ẫ": "A",
			"ắ": "a",
			"Ắ": "A",
			"ằ": "a",
			"Ằ": "A",
			"ặ": "a",
			"Ặ": "A",
			"ẵ": "a",
			"Ẵ": "A",
			"⓪": "0",
			"①": "1",
			"②": "2",
			"③": "3",
			"④": "4",
			"⑤": "5",
			"⑥": "6",
			"⑦": "7",
			"⑧": "8",
			"⑨": "9",
			"⑩": "10",
			"⑪": "11",
			"⑫": "12",
			"⑬": "13",
			"⑭": "14",
			"⑮": "15",
			"⑯": "16",
			"⑰": "17",
			"⑱": "18",
			"⑲": "18",
			"⑳": "18",
			"⓵": "1",
			"⓶": "2",
			"⓷": "3",
			"⓸": "4",
			"⓹": "5",
			"⓺": "6",
			"⓻": "7",
			"⓼": "8",
			"⓽": "9",
			"⓾": "10",
			"⓿": "0",
			"⓫": "11",
			"⓬": "12",
			"⓭": "13",
			"⓮": "14",
			"⓯": "15",
			"⓰": "16",
			"⓱": "17",
			"⓲": "18",
			"⓳": "19",
			"⓴": "20",
			"Ⓐ": "A",
			"Ⓑ": "B",
			"Ⓒ": "C",
			"Ⓓ": "D",
			"Ⓔ": "E",
			"Ⓕ": "F",
			"Ⓖ": "G",
			"Ⓗ": "H",
			"Ⓘ": "I",
			"Ⓙ": "J",
			"Ⓚ": "K",
			"Ⓛ": "L",
			"Ⓜ": "M",
			"Ⓝ": "N",
			"Ⓞ": "O",
			"Ⓟ": "P",
			"Ⓠ": "Q",
			"Ⓡ": "R",
			"Ⓢ": "S",
			"Ⓣ": "T",
			"Ⓤ": "U",
			"Ⓥ": "V",
			"Ⓦ": "W",
			"Ⓧ": "X",
			"Ⓨ": "Y",
			"Ⓩ": "Z",
			"ⓐ": "a",
			"ⓑ": "b",
			"ⓒ": "c",
			"ⓓ": "d",
			"ⓔ": "e",
			"ⓕ": "f",
			"ⓖ": "g",
			"ⓗ": "h",
			"ⓘ": "i",
			"ⓙ": "j",
			"ⓚ": "k",
			"ⓛ": "l",
			"ⓜ": "m",
			"ⓝ": "n",
			"ⓞ": "o",
			"ⓟ": "p",
			"ⓠ": "q",
			"ⓡ": "r",
			"ⓢ": "s",
			"ⓣ": "t",
			"ⓤ": "u",
			"ⓦ": "v",
			"ⓥ": "w",
			"ⓧ": "x",
			"ⓨ": "y",
			"ⓩ": "z",
			"“": "\"",
			"”": "\"",
			"‘": "'",
			"’": "'",
			"∂": "d",
			"ƒ": "f",
			"™": "(TM)",
			"©": "(C)",
			"œ": "oe",
			"Œ": "OE",
			"®": "(R)",
			"†": "+",
			"℠": "(SM)",
			"…": "...",
			"˚": "o",
			"º": "o",
			"ª": "a",
			"•": "*",
			"၊": ",",
			"။": ".",
			"$": "USD",
			"€": "EUR",
			"₢": "BRN",
			"₣": "FRF",
			"£": "GBP",
			"₤": "ITL",
			"₦": "NGN",
			"₧": "ESP",
			"₩": "KRW",
			"₪": "ILS",
			"₫": "VND",
			"₭": "LAK",
			"₮": "MNT",
			"₯": "GRD",
			"₱": "ARS",
			"₲": "PYG",
			"₳": "ARA",
			"₴": "UAH",
			"₵": "GHS",
			"¢": "cent",
			"¥": "CNY",
			"元": "CNY",
			"円": "YEN",
			"﷼": "IRR",
			"₠": "EWE",
			"฿": "THB",
			"₨": "INR",
			"₹": "INR",
			"₰": "PF",
			"₺": "TRY",
			"؋": "AFN",
			"₼": "AZN",
			"лв": "BGN",
			"៛": "KHR",
			"₡": "CRC",
			"₸": "KZT",
			"ден": "MKD",
			"zł": "PLN",
			"₽": "RUB",
			"₾": "GEL"
		};
		/**
		* special look ahead character array
		* These characters form with consonants to become 'single'/consonant combo
		* @type [Array]
		*/
		var lookAheadCharArray = ["်", "ް"];
		/**
		* diatricMap for languages where transliteration changes entirely as more diatrics are added
		* @type {Object}
		*/
		var diatricMap = {
			"ာ": "a",
			"ါ": "a",
			"ေ": "e",
			"ဲ": "e",
			"ိ": "i",
			"ီ": "i",
			"ို": "o",
			"ု": "u",
			"ူ": "u",
			"ေါင်": "aung",
			"ော": "aw",
			"ော်": "aw",
			"ေါ": "aw",
			"ေါ်": "aw",
			"်": "်",
			"က်": "et",
			"ိုက်": "aik",
			"ောက်": "auk",
			"င်": "in",
			"ိုင်": "aing",
			"ောင်": "aung",
			"စ်": "it",
			"ည်": "i",
			"တ်": "at",
			"ိတ်": "eik",
			"ုတ်": "ok",
			"ွတ်": "ut",
			"ေတ်": "it",
			"ဒ်": "d",
			"ိုဒ်": "ok",
			"ုဒ်": "ait",
			"န်": "an",
			"ာန်": "an",
			"ိန်": "ein",
			"ုန်": "on",
			"ွန်": "un",
			"ပ်": "at",
			"ိပ်": "eik",
			"ုပ်": "ok",
			"ွပ်": "ut",
			"န်ုပ်": "nub",
			"မ်": "an",
			"ိမ်": "ein",
			"ုမ်": "on",
			"ွမ်": "un",
			"ယ်": "e",
			"ိုလ်": "ol",
			"ဉ်": "in",
			"ံ": "an",
			"ိံ": "ein",
			"ုံ": "on",
			"ައް": "ah",
			"ަށް": "ah"
		};
		/**
		* langCharMap language specific characters translations
		* @type   {Object}
		*/
		var langCharMap = {
			"en": {},
			"az": {
				"ç": "c",
				"ə": "e",
				"ğ": "g",
				"ı": "i",
				"ö": "o",
				"ş": "s",
				"ü": "u",
				"Ç": "C",
				"Ə": "E",
				"Ğ": "G",
				"İ": "I",
				"Ö": "O",
				"Ş": "S",
				"Ü": "U"
			},
			"cs": {
				"č": "c",
				"ď": "d",
				"ě": "e",
				"ň": "n",
				"ř": "r",
				"š": "s",
				"ť": "t",
				"ů": "u",
				"ž": "z",
				"Č": "C",
				"Ď": "D",
				"Ě": "E",
				"Ň": "N",
				"Ř": "R",
				"Š": "S",
				"Ť": "T",
				"Ů": "U",
				"Ž": "Z"
			},
			"fi": {
				"ä": "a",
				"Ä": "A",
				"ö": "o",
				"Ö": "O"
			},
			"hu": {
				"ä": "a",
				"Ä": "A",
				"ö": "o",
				"Ö": "O",
				"ü": "u",
				"Ü": "U",
				"ű": "u",
				"Ű": "U"
			},
			"lt": {
				"ą": "a",
				"č": "c",
				"ę": "e",
				"ė": "e",
				"į": "i",
				"š": "s",
				"ų": "u",
				"ū": "u",
				"ž": "z",
				"Ą": "A",
				"Č": "C",
				"Ę": "E",
				"Ė": "E",
				"Į": "I",
				"Š": "S",
				"Ų": "U",
				"Ū": "U"
			},
			"lv": {
				"ā": "a",
				"č": "c",
				"ē": "e",
				"ģ": "g",
				"ī": "i",
				"ķ": "k",
				"ļ": "l",
				"ņ": "n",
				"š": "s",
				"ū": "u",
				"ž": "z",
				"Ā": "A",
				"Č": "C",
				"Ē": "E",
				"Ģ": "G",
				"Ī": "i",
				"Ķ": "k",
				"Ļ": "L",
				"Ņ": "N",
				"Š": "S",
				"Ū": "u",
				"Ž": "Z"
			},
			"pl": {
				"ą": "a",
				"ć": "c",
				"ę": "e",
				"ł": "l",
				"ń": "n",
				"ó": "o",
				"ś": "s",
				"ź": "z",
				"ż": "z",
				"Ą": "A",
				"Ć": "C",
				"Ę": "e",
				"Ł": "L",
				"Ń": "N",
				"Ó": "O",
				"Ś": "S",
				"Ź": "Z",
				"Ż": "Z"
			},
			"sv": {
				"ä": "a",
				"Ä": "A",
				"ö": "o",
				"Ö": "O"
			},
			"sk": {
				"ä": "a",
				"Ä": "A"
			},
			"sr": {
				"љ": "lj",
				"њ": "nj",
				"Љ": "Lj",
				"Њ": "Nj",
				"đ": "dj",
				"Đ": "Dj"
			},
			"tr": {
				"Ü": "U",
				"Ö": "O",
				"ü": "u",
				"ö": "o"
			}
		};
		/**
		* symbolMap language specific symbol translations
		* translations must be transliterated already
		* @type   {Object}
		*/
		var symbolMap = {
			"ar": {
				"∆": "delta",
				"∞": "la-nihaya",
				"♥": "hob",
				"&": "wa",
				"|": "aw",
				"<": "aqal-men",
				">": "akbar-men",
				"∑": "majmou",
				"¤": "omla"
			},
			"az": {},
			"ca": {
				"∆": "delta",
				"∞": "infinit",
				"♥": "amor",
				"&": "i",
				"|": "o",
				"<": "menys que",
				">": "mes que",
				"∑": "suma dels",
				"¤": "moneda"
			},
			"cs": {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "nebo",
				"<": "mensi nez",
				">": "vetsi nez",
				"∑": "soucet",
				"¤": "mena"
			},
			"de": {
				"∆": "delta",
				"∞": "unendlich",
				"♥": "Liebe",
				"&": "und",
				"|": "oder",
				"<": "kleiner als",
				">": "groesser als",
				"∑": "Summe von",
				"¤": "Waehrung"
			},
			"dv": {
				"∆": "delta",
				"∞": "kolunulaa",
				"♥": "loabi",
				"&": "aai",
				"|": "noonee",
				"<": "ah vure kuda",
				">": "ah vure bodu",
				"∑": "jumula",
				"¤": "faisaa"
			},
			"en": {
				"∆": "delta",
				"∞": "infinity",
				"♥": "love",
				"&": "and",
				"|": "or",
				"<": "less than",
				">": "greater than",
				"∑": "sum",
				"¤": "currency"
			},
			"es": {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "y",
				"|": "u",
				"<": "menos que",
				">": "mas que",
				"∑": "suma de los",
				"¤": "moneda"
			},
			"fa": {
				"∆": "delta",
				"∞": "bi-nahayat",
				"♥": "eshgh",
				"&": "va",
				"|": "ya",
				"<": "kamtar-az",
				">": "bishtar-az",
				"∑": "majmooe",
				"¤": "vahed"
			},
			"fi": {
				"∆": "delta",
				"∞": "aarettomyys",
				"♥": "rakkaus",
				"&": "ja",
				"|": "tai",
				"<": "pienempi kuin",
				">": "suurempi kuin",
				"∑": "summa",
				"¤": "valuutta"
			},
			"fr": {
				"∆": "delta",
				"∞": "infiniment",
				"♥": "Amour",
				"&": "et",
				"|": "ou",
				"<": "moins que",
				">": "superieure a",
				"∑": "somme des",
				"¤": "monnaie"
			},
			"ge": {
				"∆": "delta",
				"∞": "usasruloba",
				"♥": "siqvaruli",
				"&": "da",
				"|": "an",
				"<": "naklebi",
				">": "meti",
				"∑": "jami",
				"¤": "valuta"
			},
			"gr": {},
			"hu": {
				"∆": "delta",
				"∞": "vegtelen",
				"♥": "szerelem",
				"&": "es",
				"|": "vagy",
				"<": "kisebb mint",
				">": "nagyobb mint",
				"∑": "szumma",
				"¤": "penznem"
			},
			"it": {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amore",
				"&": "e",
				"|": "o",
				"<": "minore di",
				">": "maggiore di",
				"∑": "somma",
				"¤": "moneta"
			},
			"lt": {
				"∆": "delta",
				"∞": "begalybe",
				"♥": "meile",
				"&": "ir",
				"|": "ar",
				"<": "maziau nei",
				">": "daugiau nei",
				"∑": "suma",
				"¤": "valiuta"
			},
			"lv": {
				"∆": "delta",
				"∞": "bezgaliba",
				"♥": "milestiba",
				"&": "un",
				"|": "vai",
				"<": "mazak neka",
				">": "lielaks neka",
				"∑": "summa",
				"¤": "valuta"
			},
			"my": {
				"∆": "kwahkhyaet",
				"∞": "asaonasme",
				"♥": "akhyait",
				"&": "nhin",
				"|": "tho",
				"<": "ngethaw",
				">": "kyithaw",
				"∑": "paungld",
				"¤": "ngwekye"
			},
			"mk": {},
			"nl": {
				"∆": "delta",
				"∞": "oneindig",
				"♥": "liefde",
				"&": "en",
				"|": "of",
				"<": "kleiner dan",
				">": "groter dan",
				"∑": "som",
				"¤": "valuta"
			},
			"pl": {
				"∆": "delta",
				"∞": "nieskonczonosc",
				"♥": "milosc",
				"&": "i",
				"|": "lub",
				"<": "mniejsze niz",
				">": "wieksze niz",
				"∑": "suma",
				"¤": "waluta"
			},
			"pt": {
				"∆": "delta",
				"∞": "infinito",
				"♥": "amor",
				"&": "e",
				"|": "ou",
				"<": "menor que",
				">": "maior que",
				"∑": "soma",
				"¤": "moeda"
			},
			"ro": {
				"∆": "delta",
				"∞": "infinit",
				"♥": "dragoste",
				"&": "si",
				"|": "sau",
				"<": "mai mic ca",
				">": "mai mare ca",
				"∑": "suma",
				"¤": "valuta"
			},
			"ru": {
				"∆": "delta",
				"∞": "beskonechno",
				"♥": "lubov",
				"&": "i",
				"|": "ili",
				"<": "menshe",
				">": "bolshe",
				"∑": "summa",
				"¤": "valjuta"
			},
			"sk": {
				"∆": "delta",
				"∞": "nekonecno",
				"♥": "laska",
				"&": "a",
				"|": "alebo",
				"<": "menej ako",
				">": "viac ako",
				"∑": "sucet",
				"¤": "mena"
			},
			"sr": {},
			"tr": {
				"∆": "delta",
				"∞": "sonsuzluk",
				"♥": "ask",
				"&": "ve",
				"|": "veya",
				"<": "kucuktur",
				">": "buyuktur",
				"∑": "toplam",
				"¤": "para birimi"
			},
			"uk": {
				"∆": "delta",
				"∞": "bezkinechnist",
				"♥": "lubov",
				"&": "i",
				"|": "abo",
				"<": "menshe",
				">": "bilshe",
				"∑": "suma",
				"¤": "valjuta"
			},
			"vn": {
				"∆": "delta",
				"∞": "vo cuc",
				"♥": "yeu",
				"&": "va",
				"|": "hoac",
				"<": "nho hon",
				">": "lon hon",
				"∑": "tong",
				"¤": "tien te"
			}
		};
		var uricChars = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			",",
			"/"
		].join("");
		var uricNoSlashChars = [
			";",
			"?",
			":",
			"@",
			"&",
			"=",
			"+",
			"$",
			","
		].join("");
		var markChars = [
			".",
			"!",
			"~",
			"*",
			"'",
			"(",
			")"
		].join("");
		/**
		* getSlug
		* @param  {string} input input string
		* @param  {object|string} opts config object or separator string/char
		* @api    public
		* @return {string}  sluggified string
		*/
		var getSlug = function getSlug(input, opts) {
			var separator = "-";
			var result = "";
			var diatricString = "";
			var convertSymbols = true;
			var customReplacements = {};
			var maintainCase;
			var titleCase;
			var truncate;
			var uricFlag;
			var uricNoSlashFlag;
			var markFlag;
			var symbol;
			var langChar;
			var lucky;
			var i;
			var ch;
			var l;
			var lastCharWasSymbol;
			var lastCharWasDiatric;
			var allowedChars = "";
			if (typeof input !== "string") return "";
			if (typeof opts === "string") separator = opts;
			symbol = symbolMap.en;
			langChar = langCharMap.en;
			if (typeof opts === "object") {
				maintainCase = opts.maintainCase || false;
				customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
				truncate = +opts.truncate > 1 && opts.truncate || false;
				uricFlag = opts.uric || false;
				uricNoSlashFlag = opts.uricNoSlash || false;
				markFlag = opts.mark || false;
				convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
				separator = opts.separator || separator;
				if (uricFlag) allowedChars += uricChars;
				if (uricNoSlashFlag) allowedChars += uricNoSlashChars;
				if (markFlag) allowedChars += markChars;
				symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
				langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
				if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
					opts.titleCase.forEach(function(v) {
						customReplacements[v + ""] = v + "";
					});
					titleCase = true;
				} else titleCase = !!opts.titleCase;
				if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) opts.custom.forEach(function(v) {
					customReplacements[v + ""] = v + "";
				});
				Object.keys(customReplacements).forEach(function(v) {
					var r;
					if (v.length > 1) r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
					else r = new RegExp(escapeChars(v), "gi");
					input = input.replace(r, customReplacements[v]);
				});
				for (ch in customReplacements) allowedChars += ch;
			}
			allowedChars += separator;
			allowedChars = escapeChars(allowedChars);
			input = input.replace(/(^\s+|\s+$)/g, "");
			lastCharWasSymbol = false;
			lastCharWasDiatric = false;
			for (i = 0, l = input.length; i < l; i++) {
				ch = input[i];
				if (isReplacedCustomChar(ch, customReplacements)) lastCharWasSymbol = false;
				else if (langChar[ch]) {
					ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
					lastCharWasSymbol = false;
				} else if (ch in charMap) {
					if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
						diatricString += ch;
						ch = "";
					} else if (lastCharWasDiatric === true) {
						ch = diatricMap[diatricString] + charMap[ch];
						diatricString = "";
					} else ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
					lastCharWasSymbol = false;
					lastCharWasDiatric = false;
				} else if (ch in diatricMap) {
					diatricString += ch;
					ch = "";
					if (i === l - 1) ch = diatricMap[diatricString];
					lastCharWasDiatric = true;
				} else if (symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)) {
					ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
					ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
					lastCharWasSymbol = true;
				} else {
					if (lastCharWasDiatric === true) {
						ch = diatricMap[diatricString] + ch;
						diatricString = "";
						lastCharWasDiatric = false;
					} else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) ch = " " + ch;
					lastCharWasSymbol = false;
				}
				result += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
			}
			if (titleCase) result = result.replace(/(\w)(\S*)/g, function(_, i, r) {
				var j = i.toUpperCase() + (r !== null ? r : "");
				return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
			});
			result = result.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
			if (truncate && result.length > truncate) {
				lucky = result.charAt(truncate) === separator;
				result = result.slice(0, truncate);
				if (!lucky) result = result.slice(0, result.lastIndexOf(separator));
			}
			if (!maintainCase && !titleCase) result = result.toLowerCase();
			return result;
		};
		/**
		* createSlug curried(opts)(input)
		* @param   {object|string} opts config object or input string
		* @return  {Function} function getSlugWithConfig()
		**/
		var createSlug = function createSlug(opts) {
			/**
			* getSlugWithConfig
			* @param   {string} input string
			* @return  {string} slug string
			*/
			return function getSlugWithConfig(input) {
				return getSlug(input, opts);
			};
		};
		/**
		* escape Chars
		* @param   {string} input string
		*/
		var escapeChars = function escapeChars(input) {
			return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
		};
		/**
		* check if the char is an already converted char from custom list
		* @param   {char} ch character to check
		* @param   {object} customReplacements custom translation map
		*/
		var isReplacedCustomChar = function(ch, customReplacements) {
			for (var c in customReplacements) if (customReplacements[c] === ch) return true;
		};
		if (typeof module !== "undefined" && module.exports) {
			module.exports = getSlug;
			module.exports.createSlug = createSlug;
		} else if (typeof define !== "undefined" && define.amd) define([], function() {
			return getSlug;
		});
		else try {
			if (root.getSlug || root.createSlug) throw "speakingurl: globals exists /(getSlug|createSlug)/";
			else {
				root.getSlug = getSlug;
				root.createSlug = createSlug;
			}
		} catch (e) {}
	})(exports);
}));
(/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_speakingurl$1();
})))();
target.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ ??= {
	id: 0,
	appIds: /* @__PURE__ */ new Set()
};
function toggleHighPerfMode(state) {
	devtoolsState.highPerfModeEnabled = state ?? !devtoolsState.highPerfModeEnabled;
	if (!state && activeAppRecord.value) registerDevToolsPlugin(activeAppRecord.value.app);
}
function updateDevToolsClientDetected(params) {
	devtoolsState.devtoolsClientDetected = {
		...devtoolsState.devtoolsClientDetected,
		...params
	};
	toggleHighPerfMode(!Object.values(devtoolsState.devtoolsClientDetected).some(Boolean));
}
target.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ ??= updateDevToolsClientDetected;
var DoubleIndexedKV = class {
	constructor() {
		this.keyToValue = /* @__PURE__ */ new Map();
		this.valueToKey = /* @__PURE__ */ new Map();
	}
	set(key, value) {
		this.keyToValue.set(key, value);
		this.valueToKey.set(value, key);
	}
	getByKey(key) {
		return this.keyToValue.get(key);
	}
	getByValue(value) {
		return this.valueToKey.get(value);
	}
	clear() {
		this.keyToValue.clear();
		this.valueToKey.clear();
	}
};
var Registry = class {
	constructor(generateIdentifier) {
		this.generateIdentifier = generateIdentifier;
		this.kv = new DoubleIndexedKV();
	}
	register(value, identifier) {
		if (this.kv.getByValue(value)) return;
		if (!identifier) identifier = this.generateIdentifier(value);
		this.kv.set(identifier, value);
	}
	clear() {
		this.kv.clear();
	}
	getIdentifier(value) {
		return this.kv.getByValue(value);
	}
	getValue(identifier) {
		return this.kv.getByKey(identifier);
	}
};
var ClassRegistry = class extends Registry {
	constructor() {
		super((c) => c.name);
		this.classToAllowedProps = /* @__PURE__ */ new Map();
	}
	register(value, options) {
		if (typeof options === "object") {
			if (options.allowProps) this.classToAllowedProps.set(value, options.allowProps);
			super.register(value, options.identifier);
		} else super.register(value, options);
	}
	getAllowedProps(value) {
		return this.classToAllowedProps.get(value);
	}
};
function valuesOfObj(record) {
	if ("values" in Object) return Object.values(record);
	const values = [];
	for (const key in record) if (record.hasOwnProperty(key)) values.push(record[key]);
	return values;
}
function find(record, predicate) {
	const values = valuesOfObj(record);
	if ("find" in values) return values.find(predicate);
	const valuesNotNever = values;
	for (let i = 0; i < valuesNotNever.length; i++) {
		const value = valuesNotNever[i];
		if (predicate(value)) return value;
	}
}
function forEach(record, run) {
	Object.entries(record).forEach(([key, value]) => run(value, key));
}
function includes(arr, value) {
	return arr.indexOf(value) !== -1;
}
function findArr(record, predicate) {
	for (let i = 0; i < record.length; i++) {
		const value = record[i];
		if (predicate(value)) return value;
	}
}
var CustomTransformerRegistry = class {
	constructor() {
		this.transfomers = {};
	}
	register(transformer) {
		this.transfomers[transformer.name] = transformer;
	}
	findApplicable(v) {
		return find(this.transfomers, (transformer) => transformer.isApplicable(v));
	}
	findByName(name) {
		return this.transfomers[name];
	}
};
var getType$1 = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
var isUndefined$1 = (payload) => typeof payload === "undefined";
var isNull$1 = (payload) => payload === null;
var isPlainObject$2 = (payload) => {
	if (typeof payload !== "object" || payload === null) return false;
	if (payload === Object.prototype) return false;
	if (Object.getPrototypeOf(payload) === null) return true;
	return Object.getPrototypeOf(payload) === Object.prototype;
};
var isEmptyObject = (payload) => isPlainObject$2(payload) && Object.keys(payload).length === 0;
var isArray$2 = (payload) => Array.isArray(payload);
var isString = (payload) => typeof payload === "string";
var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
var isBoolean = (payload) => typeof payload === "boolean";
var isRegExp = (payload) => payload instanceof RegExp;
var isMap = (payload) => payload instanceof Map;
var isSet = (payload) => payload instanceof Set;
var isSymbol = (payload) => getType$1(payload) === "Symbol";
var isDate = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
var isError = (payload) => payload instanceof Error;
var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
var isPrimitive = (payload) => isBoolean(payload) || isNull$1(payload) || isUndefined$1(payload) || isNumber(payload) || isString(payload) || isSymbol(payload);
var isBigint = (payload) => typeof payload === "bigint";
var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
var isURL = (payload) => payload instanceof URL;
var escapeKey = (key) => key.replace(/\./g, "\\.");
var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
var parsePath = (string) => {
	const result = [];
	let segment = "";
	for (let i = 0; i < string.length; i++) {
		let char = string.charAt(i);
		if (char === "\\" && string.charAt(i + 1) === ".") {
			segment += ".";
			i++;
			continue;
		}
		if (char === ".") {
			result.push(segment);
			segment = "";
			continue;
		}
		segment += char;
	}
	const lastSegment = segment;
	result.push(lastSegment);
	return result;
};
function simpleTransformation(isApplicable, annotation, transform, untransform) {
	return {
		isApplicable,
		annotation,
		transform,
		untransform
	};
}
var simpleRules = [
	simpleTransformation(isUndefined$1, "undefined", () => null, () => void 0),
	simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
		if (typeof BigInt !== "undefined") return BigInt(v);
		console.error("Please add a BigInt polyfill.");
		return v;
	}),
	simpleTransformation(isDate, "Date", (v) => v.toISOString(), (v) => new Date(v)),
	simpleTransformation(isError, "Error", (v, superJson) => {
		const baseError = {
			name: v.name,
			message: v.message
		};
		superJson.allowedErrorProps.forEach((prop) => {
			baseError[prop] = v[prop];
		});
		return baseError;
	}, (v, superJson) => {
		const e = new Error(v.message);
		e.name = v.name;
		e.stack = v.stack;
		superJson.allowedErrorProps.forEach((prop) => {
			e[prop] = v[prop];
		});
		return e;
	}),
	simpleTransformation(isRegExp, "regexp", (v) => "" + v, (regex) => {
		const body = regex.slice(1, regex.lastIndexOf("/"));
		const flags = regex.slice(regex.lastIndexOf("/") + 1);
		return new RegExp(body, flags);
	}),
	simpleTransformation(isSet, "set", (v) => [...v.values()], (v) => new Set(v)),
	simpleTransformation(isMap, "map", (v) => [...v.entries()], (v) => new Map(v)),
	simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
		if (isNaNValue(v)) return "NaN";
		if (v > 0) return "Infinity";
		else return "-Infinity";
	}, Number),
	simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
		return "-0";
	}, Number),
	simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
];
function compositeTransformation(isApplicable, annotation, transform, untransform) {
	return {
		isApplicable,
		annotation,
		transform,
		untransform
	};
}
var symbolRule = compositeTransformation((s, superJson) => {
	if (isSymbol(s)) return !!superJson.symbolRegistry.getIdentifier(s);
	return false;
}, (s, superJson) => {
	return ["symbol", superJson.symbolRegistry.getIdentifier(s)];
}, (v) => v.description, (_, a, superJson) => {
	const value = superJson.symbolRegistry.getValue(a[1]);
	if (!value) throw new Error("Trying to deserialize unknown symbol");
	return value;
});
var constructorToName = [
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array,
	Uint8ClampedArray
].reduce((obj, ctor) => {
	obj[ctor.name] = ctor;
	return obj;
}, {});
var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
	const ctor = constructorToName[a[1]];
	if (!ctor) throw new Error("Trying to deserialize unknown typed array");
	return new ctor(v);
});
function isInstanceOfRegisteredClass(potentialClass, superJson) {
	if (potentialClass?.constructor) return !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
	return false;
}
var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
	return ["class", superJson.classRegistry.getIdentifier(clazz.constructor)];
}, (clazz, superJson) => {
	const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
	if (!allowedProps) return { ...clazz };
	const result = {};
	allowedProps.forEach((prop) => {
		result[prop] = clazz[prop];
	});
	return result;
}, (v, a, superJson) => {
	const clazz = superJson.classRegistry.getValue(a[1]);
	if (!clazz) throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
	return Object.assign(Object.create(clazz.prototype), v);
});
var customRule = compositeTransformation((value, superJson) => {
	return !!superJson.customTransformerRegistry.findApplicable(value);
}, (value, superJson) => {
	return ["custom", superJson.customTransformerRegistry.findApplicable(value).name];
}, (value, superJson) => {
	return superJson.customTransformerRegistry.findApplicable(value).serialize(value);
}, (v, a, superJson) => {
	const transformer = superJson.customTransformerRegistry.findByName(a[1]);
	if (!transformer) throw new Error("Trying to deserialize unknown custom value");
	return transformer.deserialize(v);
});
var compositeRules = [
	classRule,
	symbolRule,
	customRule,
	typedArrayRule
];
var transformValue = (value, superJson) => {
	const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
	if (applicableCompositeRule) return {
		value: applicableCompositeRule.transform(value, superJson),
		type: applicableCompositeRule.annotation(value, superJson)
	};
	const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
	if (applicableSimpleRule) return {
		value: applicableSimpleRule.transform(value, superJson),
		type: applicableSimpleRule.annotation
	};
};
var simpleRulesByAnnotation = {};
simpleRules.forEach((rule) => {
	simpleRulesByAnnotation[rule.annotation] = rule;
});
var untransformValue = (json, type, superJson) => {
	if (isArray$2(type)) switch (type[0]) {
		case "symbol": return symbolRule.untransform(json, type, superJson);
		case "class": return classRule.untransform(json, type, superJson);
		case "custom": return customRule.untransform(json, type, superJson);
		case "typed-array": return typedArrayRule.untransform(json, type, superJson);
		default: throw new Error("Unknown transformation: " + type);
	}
	else {
		const transformation = simpleRulesByAnnotation[type];
		if (!transformation) throw new Error("Unknown transformation: " + type);
		return transformation.untransform(json, superJson);
	}
};
var getNthKey = (value, n) => {
	if (n > value.size) throw new Error("index out of bounds");
	const keys = value.keys();
	while (n > 0) {
		keys.next();
		n--;
	}
	return keys.next().value;
};
function validatePath(path) {
	if (includes(path, "__proto__")) throw new Error("__proto__ is not allowed as a property");
	if (includes(path, "prototype")) throw new Error("prototype is not allowed as a property");
	if (includes(path, "constructor")) throw new Error("constructor is not allowed as a property");
}
var getDeep = (object, path) => {
	validatePath(path);
	for (let i = 0; i < path.length; i++) {
		const key = path[i];
		if (isSet(object)) object = getNthKey(object, +key);
		else if (isMap(object)) {
			const row = +key;
			const type = +path[++i] === 0 ? "key" : "value";
			const keyOfRow = getNthKey(object, row);
			switch (type) {
				case "key":
					object = keyOfRow;
					break;
				case "value": object = object.get(keyOfRow);
			}
		} else object = object[key];
	}
	return object;
};
var setDeep = (object, path, mapper) => {
	validatePath(path);
	if (path.length === 0) return mapper(object);
	let parent = object;
	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i];
		if (isArray$2(parent)) {
			const index = +key;
			parent = parent[index];
		} else if (isPlainObject$2(parent)) parent = parent[key];
		else if (isSet(parent)) {
			const row = +key;
			parent = getNthKey(parent, row);
		} else if (isMap(parent)) {
			if (i === path.length - 2) break;
			const row = +key;
			const type = +path[++i] === 0 ? "key" : "value";
			const keyOfRow = getNthKey(parent, row);
			switch (type) {
				case "key":
					parent = keyOfRow;
					break;
				case "value": parent = parent.get(keyOfRow);
			}
		}
	}
	const lastKey = path[path.length - 1];
	if (isArray$2(parent)) parent[+lastKey] = mapper(parent[+lastKey]);
	else if (isPlainObject$2(parent)) parent[lastKey] = mapper(parent[lastKey]);
	if (isSet(parent)) {
		const oldValue = getNthKey(parent, +lastKey);
		const newValue = mapper(oldValue);
		if (oldValue !== newValue) {
			parent.delete(oldValue);
			parent.add(newValue);
		}
	}
	if (isMap(parent)) {
		const row = +path[path.length - 2];
		const keyToRow = getNthKey(parent, row);
		switch (+lastKey === 0 ? "key" : "value") {
			case "key": {
				const newKey = mapper(keyToRow);
				parent.set(newKey, parent.get(keyToRow));
				if (newKey !== keyToRow) parent.delete(keyToRow);
				break;
			}
			case "value": parent.set(keyToRow, mapper(parent.get(keyToRow)));
		}
	}
	return object;
};
function traverse(tree, walker, origin = []) {
	if (!tree) return;
	if (!isArray$2(tree)) {
		forEach(tree, (subtree, key) => traverse(subtree, walker, [...origin, ...parsePath(key)]));
		return;
	}
	const [nodeValue, children] = tree;
	if (children) forEach(children, (child, key) => {
		traverse(child, walker, [...origin, ...parsePath(key)]);
	});
	walker(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
	traverse(annotations, (type, path) => {
		plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
	});
	return plain;
}
function applyReferentialEqualityAnnotations(plain, annotations) {
	function apply(identicalPaths, path) {
		const object = getDeep(plain, parsePath(path));
		identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
			plain = setDeep(plain, identicalObjectPath, () => object);
		});
	}
	if (isArray$2(annotations)) {
		const [root, other] = annotations;
		root.forEach((identicalPath) => {
			plain = setDeep(plain, parsePath(identicalPath), () => plain);
		});
		if (other) forEach(other, apply);
	} else forEach(annotations, apply);
	return plain;
}
var isDeep = (object, superJson) => isPlainObject$2(object) || isArray$2(object) || isMap(object) || isSet(object) || isInstanceOfRegisteredClass(object, superJson);
function addIdentity(object, path, identities) {
	const existingSet = identities.get(object);
	if (existingSet) existingSet.push(path);
	else identities.set(object, [path]);
}
function generateReferentialEqualityAnnotations(identitites, dedupe) {
	const result = {};
	let rootEqualityPaths = void 0;
	identitites.forEach((paths) => {
		if (paths.length <= 1) return;
		if (!dedupe) paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
		const [representativePath, ...identicalPaths] = paths;
		if (representativePath.length === 0) rootEqualityPaths = identicalPaths.map(stringifyPath);
		else result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
	});
	if (rootEqualityPaths) if (isEmptyObject(result)) return [rootEqualityPaths];
	else return [rootEqualityPaths, result];
	else return isEmptyObject(result) ? void 0 : result;
}
var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map()) => {
	const primitive = isPrimitive(object);
	if (!primitive) {
		addIdentity(object, path, identities);
		const seen = seenObjects.get(object);
		if (seen) return dedupe ? { transformedValue: null } : seen;
	}
	if (!isDeep(object, superJson)) {
		const transformed = transformValue(object, superJson);
		const result = transformed ? {
			transformedValue: transformed.value,
			annotations: [transformed.type]
		} : { transformedValue: object };
		if (!primitive) seenObjects.set(object, result);
		return result;
	}
	if (includes(objectsInThisPath, object)) return { transformedValue: null };
	const transformationResult = transformValue(object, superJson);
	const transformed = transformationResult?.value ?? object;
	const transformedValue = isArray$2(transformed) ? [] : {};
	const innerAnnotations = {};
	forEach(transformed, (value, index) => {
		if (index === "__proto__" || index === "constructor" || index === "prototype") throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
		const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
		transformedValue[index] = recursiveResult.transformedValue;
		if (isArray$2(recursiveResult.annotations)) innerAnnotations[index] = recursiveResult.annotations;
		else if (isPlainObject$2(recursiveResult.annotations)) forEach(recursiveResult.annotations, (tree, key) => {
			innerAnnotations[escapeKey(index) + "." + key] = tree;
		});
	});
	const result = isEmptyObject(innerAnnotations) ? {
		transformedValue,
		annotations: !!transformationResult ? [transformationResult.type] : void 0
	} : {
		transformedValue,
		annotations: !!transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
	};
	if (!primitive) seenObjects.set(object, result);
	return result;
};
function getType(payload) {
	return Object.prototype.toString.call(payload).slice(8, -1);
}
function isArray$1(payload) {
	return getType(payload) === "Array";
}
function isPlainObject$1(payload) {
	if (getType(payload) !== "Object") return false;
	const prototype = Object.getPrototypeOf(payload);
	return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
}
function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
	const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
	if (propType === "enumerable") carry[key] = newVal;
	if (includeNonenumerable && propType === "nonenumerable") Object.defineProperty(carry, key, {
		value: newVal,
		enumerable: false,
		writable: true,
		configurable: true
	});
}
function copy(target, options = {}) {
	if (isArray$1(target)) return target.map((item) => copy(item, options));
	if (!isPlainObject$1(target)) return target;
	const props = Object.getOwnPropertyNames(target);
	const symbols = Object.getOwnPropertySymbols(target);
	return [...props, ...symbols].reduce((carry, key) => {
		if (isArray$1(options.props) && !options.props.includes(key)) return carry;
		const val = target[key];
		assignProp(carry, key, copy(val, options), target, options.nonenumerable);
		return carry;
	}, {});
}
var SuperJSON = class {
	/**
	* @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
	*/
	constructor({ dedupe = false } = {}) {
		this.classRegistry = new ClassRegistry();
		this.symbolRegistry = new Registry((s) => s.description ?? "");
		this.customTransformerRegistry = new CustomTransformerRegistry();
		this.allowedErrorProps = [];
		this.dedupe = dedupe;
	}
	serialize(object) {
		const identities = /* @__PURE__ */ new Map();
		const output = walker(object, identities, this, this.dedupe);
		const res = { json: output.transformedValue };
		if (output.annotations) res.meta = {
			...res.meta,
			values: output.annotations
		};
		const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
		if (equalityAnnotations) res.meta = {
			...res.meta,
			referentialEqualities: equalityAnnotations
		};
		return res;
	}
	deserialize(payload) {
		const { json, meta } = payload;
		let result = copy(json);
		if (meta?.values) result = applyValueAnnotations(result, meta.values, this);
		if (meta?.referentialEqualities) result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
		return result;
	}
	stringify(object) {
		return JSON.stringify(this.serialize(object));
	}
	parse(string) {
		return this.deserialize(JSON.parse(string));
	}
	registerClass(v, options) {
		this.classRegistry.register(v, options);
	}
	registerSymbol(v, identifier) {
		this.symbolRegistry.register(v, identifier);
	}
	registerCustom(transformer, name) {
		this.customTransformerRegistry.register({
			name,
			...transformer
		});
	}
	allowErrorProps(...props) {
		this.allowedErrorProps.push(...props);
	}
};
SuperJSON.defaultInstance = new SuperJSON();
SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
SuperJSON.serialize;
SuperJSON.deserialize;
SuperJSON.stringify;
SuperJSON.parse;
SuperJSON.registerClass;
SuperJSON.registerCustom;
SuperJSON.registerSymbol;
SuperJSON.allowErrorProps;
target.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ ??= [];
target.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ ??= null;
target.__VUE_DEVTOOLS_KIT_RPC_SERVER__ ??= null;
target.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ ??= null;
target.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ ??= null;
target.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ ??= null;
//#endregion
//#region node_modules/vue-router/dist/devtools-CN5uWJaH.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
var isBrowser = typeof document !== "undefined";
/**
* Encoding Rules (␣ = Space)
* - Path: ␣ " < > # ? { }
* - Query: ␣ " < > # & =
* - Hash: ␣ " < > `
*
* On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
* defines some extra characters to be encoded. Most browsers do not encode them
* in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
* also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
* plus `-._~`. This extra safety should be applied to query by patching the
* string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
* should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
* into a `/` if directly typed in. The _backtick_ (`````) should also be
* encoded everywhere because some browsers like FF encode it when directly
* written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
*/
var HASH_RE = /#/g;
var AMPERSAND_RE = /&/g;
var SLASH_RE = /\//g;
var EQUAL_RE = /=/g;
var IM_RE = /\?/g;
var PLUS_RE = /\+/g;
/**
* NOTE: It's not clear to me if we should encode the + symbol in queries, it
* seems to be less flexible than not doing so and I can't find out the legacy
* systems requiring this for regular requests like text/html. In the standard,
* the encoding of the plus character is only mentioned for
* application/x-www-form-urlencoded
* (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
* leave the plus character as is in queries. To be more flexible, we allow the
* plus character on the query, but it can also be manually encoded by the user.
*
* Resources:
* - https://url.spec.whatwg.org/#urlencoded-parsing
* - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
*/
var ENC_BRACKET_OPEN_RE = /%5B/g;
var ENC_BRACKET_CLOSE_RE = /%5D/g;
var ENC_CARET_RE = /%5E/g;
var ENC_BACKTICK_RE = /%60/g;
var ENC_CURLY_OPEN_RE = /%7B/g;
var ENC_PIPE_RE = /%7C/g;
var ENC_CURLY_CLOSE_RE = /%7D/g;
var ENC_SPACE_RE = /%20/g;
/**
* Encode characters that need to be encoded on the path, search and hash
* sections of the URL.
*
* @internal
* @param text - string to encode
* @returns encoded string
*/
function commonEncode(text) {
	return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
/**
* Encode characters that need to be encoded on the hash section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeHash(text) {
	return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Encode characters that need to be encoded query values on the query
* section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeQueryValue(text) {
	return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
/**
* Like `encodeQueryValue` but also encodes the `=` character.
*
* @param text - string to encode
*/
function encodeQueryKey(text) {
	return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
/**
* Encode characters that need to be encoded on the path section of the URL.
*
* @param text - string to encode
* @returns encoded string
*/
function encodePath(text) {
	return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
/**
* Encode characters that need to be encoded on the path section of the URL as a
* param. This function encodes everything {@link encodePath} does plus the
* slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
* string instead.
*
* @param text - string to encode
* @returns encoded string
*/
function encodeParam(text) {
	return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
	if (text == null) return null;
	try {
		return decodeURIComponent("" + text);
	} catch {
		diagnostics.VUE_ROUTER_R0080({ text: "" + text });
	}
	return "" + text;
}
var TRAILING_SLASH_RE = /\/$/;
var removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
/**
* Transforms a URI into a normalized history location
*
* @param parseQuery
* @param location - URI to normalize
* @param currentLocation - current absolute location. Allows resolving relative
* paths. Must start with `/`. Defaults to `/`
* @returns a normalized history location
*/
function parseURL(parseQuery, location, currentLocation = "/") {
	let path, query = {}, searchString = "", hash = "";
	const hashPos = location.indexOf("#");
	let searchPos = location.indexOf("?");
	searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
	if (searchPos >= 0) {
		path = location.slice(0, searchPos);
		searchString = location.slice(searchPos, hashPos > 0 ? hashPos : location.length);
		query = parseQuery(searchString.slice(1));
	}
	if (hashPos >= 0) {
		path = path || location.slice(0, hashPos);
		hash = location.slice(hashPos, location.length);
	}
	path = resolveRelativePath(path != null ? path : location, currentLocation);
	return {
		fullPath: path + searchString + hash,
		path,
		query,
		hash: decode(hash)
	};
}
/**
* Stringifies a URL object
*
* @param stringifyQuery
* @param location
*/
function stringifyURL(stringifyQuery, location) {
	const query = location.query ? stringifyQuery(location.query) : "";
	return location.path + (query && "?") + query + (location.hash || "");
}
/**
* Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
*
* @param pathname - location.pathname
* @param base - base to strip off
*/
function stripBase(pathname, base) {
	if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
	return pathname.slice(base.length) || "/";
}
/**
* Checks if two RouteLocation are equal. This means that both locations are
* pointing towards the same {@link RouteRecord} and that all `params`, `query`
* parameters and `hash` are the same
*
* @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
* @param a - first {@link RouteLocation}
* @param b - second {@link RouteLocation}
*/
function isSameRouteLocation(stringifyQuery, a, b) {
	const aLastIndex = a.matched.length - 1;
	const bLastIndex = b.matched.length - 1;
	return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery(a.query) === stringifyQuery(b.query) && a.hash === b.hash;
}
/**
* Check if two `RouteRecords` are equal. Takes into account aliases: they are
* considered equal to the `RouteRecord` they are aliasing.
*
* @param a - first {@link RouteRecord}
* @param b - second {@link RouteRecord}
*/
function isSameRouteRecord(a, b) {
	return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
	if (Object.keys(a).length !== Object.keys(b).length) return false;
	for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
	return true;
}
function isSameRouteLocationParamsValue(a, b) {
	return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : (a && a.valueOf()) === (b && b.valueOf());
}
/**
* Check if two arrays are the same or if an array with one single entry is the
* same as another primitive value. Used to check query and parameters
*
* @param a - array of values
* @param b - array of values or a single value
*/
function isEquivalentArray(a, b) {
	return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
/**
* Resolves a relative path that starts with `.`.
*
* @param to - path location we are resolving
* @param from - currentLocation.path, should start with `/`
*/
function resolveRelativePath(to, from) {
	if (isAbsolutePath(to)) return to;
	if (!isAbsolutePath(from)) {
		diagnostics.VUE_ROUTER_R0070({
			to,
			from
		});
		return to;
	}
	if (!to) return from;
	const fromSegments = from.split("/");
	const toSegments = to.split("/");
	const lastToSegment = toSegments[toSegments.length - 1];
	if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
	let position = fromSegments.length - 1;
	let toPosition;
	let segment;
	for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
		segment = toSegments[toPosition];
		if (segment === ".") continue;
		if (segment === "..") {
			if (position > 1) position--;
		} else break;
	}
	return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
/**
* Initial route location where the router is. Can be used in navigation guards
* to differentiate the initial navigation.
*
* @example
* ```js
* import { START_LOCATION } from 'vue-router'
*
* router.beforeEach((to, from) => {
*   if (from === START_LOCATION) {
*     // initial navigation
*   }
* })
* ```
*/
var START_LOCATION_NORMALIZED = {
	path: "/",
	name: void 0,
	params: {},
	query: {},
	hash: "",
	fullPath: "/",
	matched: [],
	meta: {},
	redirectedFrom: void 0
};
/**
* Normalizes a base by removing any trailing slash and reading the base tag if
* present.
*
* @param base - base to normalize
*/
function normalizeBase(base) {
	if (!base) {
		if (isBrowser) {
			const baseEl = document.querySelector("base");
			base = baseEl && baseEl.getAttribute("href") || "/";
			base = base.replace(/^\w+:\/\/[^/]+/, "");
		} else base = "/";
	}
	if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
	return removeTrailingSlash(base);
}
var BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
	return base.replace(BEFORE_HASH_RE, "#") + location;
}
function getElementPosition(el, offset) {
	const docRect = document.documentElement.getBoundingClientRect();
	const elRect = el.getBoundingClientRect();
	return {
		behavior: offset.behavior,
		left: elRect.left - docRect.left - (offset.left || 0),
		top: elRect.top - docRect.top - (offset.top || 0)
	};
}
var computeScrollPosition = () => history.scrollRestoration === "manual" ? {
	left: window.scrollX,
	top: window.scrollY
} : null;
function scrollToPosition(position) {
	let scrollToOptions;
	if ("el" in position) {
		const positionEl = position.el;
		const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
		/**
		* `id`s can accept pretty much any characters, including CSS combinators
		* like `>` or `~`. It's still possible to retrieve elements using
		* `document.getElementById('~')` but it needs to be escaped when using
		* `document.querySelector('#\\~')` for it to be valid. The only
		* requirements for `id`s are them to be unique on the page and to not be
		* empty (`id=""`). Because of that, when passing an id selector, it should
		* be properly escaped for it to work with `querySelector`. We could check
		* for the id selector to be simple (no CSS combinators `+ >~`) but that
		* would make things inconsistent since they are valid characters for an
		* `id` but would need to be escaped when using `querySelector`, breaking
		* their usage and ending up in no selector returned. Selectors need to be
		* escaped:
		*
		* - `#1-thing` becomes `#\31 -thing`
		* - `#with~symbols` becomes `#with\\~symbols`
		*
		* - More information about  the topic can be found at
		*   https://mathiasbynens.be/notes/html5-id-class.
		* - Practical example: https://mathiasbynens.be/demo/html5-id
		*/
		if (typeof position.el === "string") {
			if (!isIdSelector || !document.getElementById(position.el.slice(1))) try {
				const foundEl = document.querySelector(position.el);
				if (isIdSelector && foundEl) {
					diagnostics.VUE_ROUTER_R0040({ el: position.el });
					return;
				}
			} catch {
				diagnostics.VUE_ROUTER_R0041({ el: position.el });
				return;
			}
		}
		const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
		if (!el) {
			diagnostics.VUE_ROUTER_R0042({ el: position.el });
			return;
		}
		scrollToOptions = getElementPosition(el, position);
	} else scrollToOptions = position;
	if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
	else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
	return (history.state ? history.state.position - delta : -1) + path;
}
var scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key) {
	scrollPositions.set(key, computeScrollPosition());
}
function getSavedScrollPosition(key) {
	const scroll = scrollPositions.get(key);
	scrollPositions.delete(key);
	return scroll;
}
/**
* ScrollBehavior instance used by the router to compute and restore the scroll
* position when navigating.
*/
function isRouteLocation(route) {
	return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
	return typeof name === "string" || typeof name === "symbol";
}
/**
* Transforms a queryString into a {@link LocationQuery} object. Accept both, a
* version with the leading `?` and without Should work as URLSearchParams

* @internal
*
* @param search - search string to parse
* @returns a query object
*/
function parseQuery(search) {
	const query = {};
	if (search === "" || search === "?") return query;
	const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
	for (let i = 0; i < searchParams.length; ++i) {
		const searchParam = searchParams[i].replace(PLUS_RE, " ");
		const eqPos = searchParam.indexOf("=");
		const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
		const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
		if (key in query) {
			let currentValue = query[key];
			if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
			currentValue.push(value);
		} else query[key] = value;
	}
	return query;
}
/**
* Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
* doesn't prepend a `?`
*
* @internal
*
* @param query - query object to stringify
* @returns string version of the query without the leading `?`
*/
function stringifyQuery(query) {
	let search = "";
	for (let key in query) {
		const value = query[key];
		key = encodeQueryKey(key);
		if (value == null) {
			if (value !== void 0) search += (search.length ? "&" : "") + key;
			continue;
		}
		(isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value) => {
			if (value !== void 0) {
				search += (search.length ? "&" : "") + key;
				if (value != null) search += "=" + value;
			}
		});
	}
	return search;
}
/**
* Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
* numbers into strings, removing keys with an undefined value and replacing
* undefined with null in arrays
*
* @param query - query object to normalize
* @returns a normalized query object
*/
function normalizeQuery(query) {
	const normalizedQuery = {};
	for (const key in query) {
		const value = query[key];
		if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
	}
	return normalizedQuery;
}
/**
* Create a list of callbacks that can be reset. Used to create before and after navigation guards list
*/
function useCallbacks() {
	let handlers = [];
	function add(handler) {
		handlers.push(handler);
		return () => {
			const i = handlers.indexOf(handler);
			if (i > -1) handlers.splice(i, 1);
		};
	}
	function reset() {
		handlers = [];
	}
	return {
		add,
		list: () => handlers.slice(),
		reset
	};
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
	const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	return () => new Promise((resolve, reject) => {
		const next = (valid) => {
			if (valid === false) reject(createRouterError(4, {
				from,
				to
			}));
			else if (valid instanceof Error) reject(valid);
			else if (isRouteLocation(valid)) reject(createRouterError(2, {
				from: to,
				to: valid
			}));
			else {
				if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
				resolve();
			}
		};
		const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, withDeprecationWarning(canOnlyBeCalledOnce(next, to, from))));
		let guardCall = Promise.resolve(guardReturn);
		if (guard.length < 3) guardCall = guardCall.then(next);
		if (guard.length > 2) {
			const guardInfo = {
				name: guard.name,
				guard: guard.toString()
			};
			if (typeof guardReturn === "object" && "then" in guardReturn) guardCall = guardCall.then((resolvedValue) => {
				if (!next._called) {
					diagnostics.VUE_ROUTER_R0023(guardInfo);
					return Promise.reject(/* @__PURE__ */ new Error("Invalid navigation guard"));
				}
				return resolvedValue;
			});
			else if (guardReturn !== void 0) {
				if (!next._called) {
					diagnostics.VUE_ROUTER_R0023(guardInfo);
					reject(/* @__PURE__ */ new Error("Invalid navigation guard"));
					return;
				}
			}
		}
		guardCall.catch((err) => reject(err));
	});
}
/**
* Wraps the next callback to warn when it is used. Dev-only: when __DEV__ is
* false (production builds), this branch is dead code and is stripped from the
* bundle.
*
* @internal
*/
function withDeprecationWarning(next) {
	let warned = false;
	return function() {
		if (!warned) {
			warned = true;
			diagnostics.VUE_ROUTER_R0025();
		}
		return next.apply(this, arguments);
	};
}
function canOnlyBeCalledOnce(next, to, from) {
	let called = 0;
	return function() {
		if (called++ === 1) diagnostics.VUE_ROUTER_R0024({
			from: from.fullPath,
			to: to.fullPath
		});
		next._called = true;
		if (called === 1) next.apply(null, arguments);
	};
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
	const guards = [];
	for (const record of matched) {
		if (!record.components && record.children && !record.children.length) diagnostics.VUE_ROUTER_R0026({ path: record.path });
		for (const name in record.components) {
			let rawComponent = record.components[name];
			if (!rawComponent || typeof rawComponent !== "object" && typeof rawComponent !== "function") {
				diagnostics.VUE_ROUTER_R0027({
					name,
					path: record.path,
					received: String(rawComponent)
				});
				throw new Error("Invalid route component");
			} else if ("then" in rawComponent) {
				diagnostics.VUE_ROUTER_R0028({
					name,
					path: record.path
				});
				const promise = rawComponent;
				rawComponent = () => promise;
			} else if (rawComponent.__asyncLoader && !rawComponent.__warnedDefineAsync) {
				rawComponent.__warnedDefineAsync = true;
				diagnostics.VUE_ROUTER_R0029({
					name,
					path: record.path
				});
			}
			if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
			if (isRouteComponent(rawComponent)) {
				const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
				guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
			} else {
				let componentPromise = rawComponent();
				if (!("catch" in componentPromise)) {
					diagnostics.VUE_ROUTER_R0030({
						name,
						path: record.path
					});
					componentPromise = Promise.resolve(componentPromise);
				}
				guards.push(() => componentPromise.then((resolved) => {
					if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
					const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
					record.mods[name] = resolved;
					record.components[name] = resolvedComponent;
					const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
					return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
				}));
			}
		}
	}
	return guards;
}
/**
* Split the leaving, updating, and entering records.
* @internal
*
* @param  to - Location we are navigating to
* @param from - Location we are navigating from
*/
function extractChangingRecords(to, from) {
	const leavingRecords = [];
	const updatingRecords = [];
	const enteringRecords = [];
	const len = Math.max(from.matched.length, to.matched.length);
	for (let i = 0; i < len; i++) {
		const recordFrom = from.matched[i];
		if (recordFrom) {
			if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
			else leavingRecords.push(recordFrom);
		}
		const recordTo = to.matched[i];
		if (recordTo) {
			if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
		}
	}
	return [
		leavingRecords,
		updatingRecords,
		enteringRecords
	];
}
/**
* Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
*
* @param routeLocation - routeLocation to format
* @param tooltip - optional tooltip
* @returns a copy of the routeLocation
*/
function formatRouteLocation(routeLocation, tooltip) {
	const copy = assign({}, routeLocation, { matched: routeLocation.matched.map((matched) => omit(matched, [
		"instances",
		"children",
		"aliasOf"
	])) });
	return { _custom: {
		type: null,
		readOnly: true,
		display: routeLocation.fullPath,
		tooltip,
		value: copy
	} };
}
function formatDisplay(display) {
	return { _custom: { display } };
}
var routerId = 0;
function addDevtools(app, router, matcher) {
	if (router.__hasDevtools) return;
	router.__hasDevtools = true;
	const id = routerId++;
	setupDevToolsPlugin({
		id: "org.vuejs.router" + (id ? "." + id : ""),
		label: "Vue Router",
		packageName: "vue-router",
		homepage: "https://router.vuejs.org",
		logo: "https://router.vuejs.org/logo.png",
		componentStateTypes: ["Routing"],
		app
	}, (api) => {
		api.on.inspectComponent((payload) => {
			if (payload.instanceData) payload.instanceData.state.push({
				type: "Routing",
				key: "$route",
				editable: false,
				value: formatRouteLocation(router.currentRoute.value, "Current Route")
			});
		});
		api.on.visitComponentTree(({ treeNode: node, componentInstance }) => {
			if (componentInstance.__vrv_devtools) {
				const info = componentInstance.__vrv_devtools;
				node.tags.push({
					label: (info.name ? `${info.name.toString()}: ` : "") + info.path,
					textColor: 0,
					tooltip: "This component is rendered by &lt;router-view&gt;",
					backgroundColor: PINK_500
				});
			}
			if (isArray(componentInstance.__vrl_devtools)) {
				componentInstance.__devtoolsApi = api;
				componentInstance.__vrl_devtools.forEach((devtoolsData) => {
					let label = devtoolsData.route.path;
					let backgroundColor = ORANGE_400;
					let tooltip = "";
					let textColor = 0;
					if (devtoolsData.error) {
						label = devtoolsData.error;
						backgroundColor = RED_100;
						textColor = RED_700;
					} else if (devtoolsData.isExactActive) {
						backgroundColor = LIME_500;
						tooltip = "This is exactly active";
					} else if (devtoolsData.isActive) {
						backgroundColor = BLUE_600;
						tooltip = "This link is active";
					}
					node.tags.push({
						label,
						textColor,
						tooltip,
						backgroundColor
					});
				});
			}
		});
		watch(router.currentRoute, () => {
			refreshRoutesView();
			api.notifyComponentUpdate();
			api.sendInspectorTree(routerInspectorId);
			api.sendInspectorState(routerInspectorId);
		});
		const navigationsLayerId = "router:navigations:" + id;
		api.addTimelineLayer({
			id: navigationsLayerId,
			label: `Router${id ? " " + id : ""} Navigations`,
			color: 4237508
		});
		router.onError((error, to) => {
			api.addTimelineEvent({
				layerId: navigationsLayerId,
				event: {
					title: "Error during Navigation",
					subtitle: to.fullPath,
					logType: "error",
					time: api.now(),
					data: { error },
					groupId: to.meta.__navigationId
				}
			});
		});
		let navigationId = 0;
		router.beforeEach((to, from) => {
			const data = {
				guard: formatDisplay("beforeEach"),
				from: formatRouteLocation(from, "Current Location during this navigation"),
				to: formatRouteLocation(to, "Target location")
			};
			Object.defineProperty(to.meta, "__navigationId", { value: navigationId++ });
			api.addTimelineEvent({
				layerId: navigationsLayerId,
				event: {
					time: api.now(),
					title: "Start of navigation",
					subtitle: to.fullPath,
					data,
					groupId: to.meta.__navigationId
				}
			});
		});
		router.afterEach((to, from, failure) => {
			const data = { guard: formatDisplay("afterEach") };
			if (failure) {
				data.failure = { _custom: {
					type: Error,
					readOnly: true,
					display: failure ? failure.message : "",
					tooltip: "Navigation Failure",
					value: failure
				} };
				data.status = formatDisplay("❌");
			} else data.status = formatDisplay("✅");
			data.from = formatRouteLocation(from, "Current Location during this navigation");
			data.to = formatRouteLocation(to, "Target location");
			api.addTimelineEvent({
				layerId: navigationsLayerId,
				event: {
					title: "End of navigation",
					subtitle: to.fullPath,
					time: api.now(),
					data,
					logType: failure ? "warning" : "default",
					groupId: to.meta.__navigationId
				}
			});
		});
		/**
		* Inspector of Existing routes
		*/
		const routerInspectorId = "router-inspector:" + id;
		api.addInspector({
			id: routerInspectorId,
			label: "Routes" + (id ? " " + id : ""),
			icon: "book",
			treeFilterPlaceholder: "Search routes"
		});
		function refreshRoutesView() {
			if (!activeRoutesPayload) return;
			const payload = activeRoutesPayload;
			let routes = matcher.getRoutes().filter((route) => !route.parent || !route.parent.record.components);
			routes.forEach(resetMatchStateOnRouteRecord);
			if (payload.filter) routes = routes.filter((route) => isRouteMatching(route, payload.filter.toLowerCase()));
			routes.forEach((route) => markRouteRecordActive(route, router.currentRoute.value));
			payload.rootNodes = routes.map(formatRouteRecordForInspector);
		}
		let activeRoutesPayload;
		api.on.getInspectorTree((payload) => {
			activeRoutesPayload = payload;
			if (payload.app === app && payload.inspectorId === routerInspectorId) refreshRoutesView();
		});
		/**
		* Display information about the currently selected route record
		*/
		api.on.getInspectorState((payload) => {
			if (payload.app === app && payload.inspectorId === routerInspectorId) {
				const route = matcher.getRoutes().find((route) => route.record.__vd_id === payload.nodeId);
				if (route) payload.state = { options: formatRouteRecordMatcherForStateInspector(route) };
			}
		});
		api.sendInspectorTree(routerInspectorId);
		api.sendInspectorState(routerInspectorId);
	});
}
function modifierForKey(key) {
	if (key.optional) return key.repeatable ? "*" : "?";
	else return key.repeatable ? "+" : "";
}
function formatRouteRecordMatcherForStateInspector(route) {
	const { record } = route;
	const fields = [{
		editable: false,
		key: "path",
		value: record.path
	}];
	if (record.name != null) fields.push({
		editable: false,
		key: "name",
		value: record.name
	});
	fields.push({
		editable: false,
		key: "regexp",
		value: route.re
	});
	if (route.keys.length) fields.push({
		editable: false,
		key: "keys",
		value: { _custom: {
			type: null,
			readOnly: true,
			display: route.keys.map((key) => `${key.name}${modifierForKey(key)}`).join(" "),
			tooltip: "Param keys",
			value: route.keys
		} }
	});
	if (record.redirect != null) fields.push({
		editable: false,
		key: "redirect",
		value: record.redirect
	});
	if (route.alias.length) fields.push({
		editable: false,
		key: "aliases",
		value: route.alias.map((alias) => alias.record.path)
	});
	if (Object.keys(route.record.meta).length) fields.push({
		editable: false,
		key: "meta",
		value: route.record.meta
	});
	fields.push({
		key: "score",
		editable: false,
		value: { _custom: {
			type: null,
			readOnly: true,
			display: route.score.map((score) => score.join(", ")).join(" | "),
			tooltip: "Score used to sort routes",
			value: route.score
		} }
	});
	return fields;
}
/**
* Extracted from tailwind palette
*/
var PINK_500 = 15485081;
var BLUE_600 = 2450411;
var LIME_500 = 8702998;
var CYAN_400 = 2282478;
var ORANGE_400 = 16486972;
var DARK = 6710886;
var RED_100 = 16704226;
var RED_700 = 12131356;
function formatRouteRecordForInspector(route) {
	const tags = [];
	const { record } = route;
	if (record.name != null) tags.push({
		label: String(record.name),
		textColor: 0,
		backgroundColor: CYAN_400
	});
	if (record.aliasOf) tags.push({
		label: "alias",
		textColor: 0,
		backgroundColor: ORANGE_400
	});
	if (route.__vd_match) tags.push({
		label: "matches",
		textColor: 0,
		backgroundColor: PINK_500
	});
	if (route.__vd_exactActive) tags.push({
		label: "exact",
		textColor: 0,
		backgroundColor: LIME_500
	});
	if (route.__vd_active) tags.push({
		label: "active",
		textColor: 0,
		backgroundColor: BLUE_600
	});
	if (record.redirect) tags.push({
		label: typeof record.redirect === "string" ? `redirect: ${record.redirect}` : "redirects",
		textColor: 16777215,
		backgroundColor: DARK
	});
	let id = record.__vd_id;
	if (id == null) {
		id = String(routeRecordId++);
		record.__vd_id = id;
	}
	return {
		id,
		label: record.path,
		tags,
		children: route.children.map(formatRouteRecordForInspector)
	};
}
var routeRecordId = 0;
var EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
	const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
	route.__vd_exactActive = route.__vd_active = isExactActive;
	if (!isExactActive) route.__vd_active = currentRoute.matched.some((match) => isSameRouteRecord(match, route.record));
	route.children.forEach((childRoute) => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
	route.__vd_match = false;
	route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
	const found = String(route.re).match(EXTRACT_REGEXP_RE);
	route.__vd_match = false;
	if (!found || found.length < 3) return false;
	if (new RegExp(found[1].replace(/\$$/, ""), found[2]).test(filter)) {
		route.children.forEach((child) => isRouteMatching(child, filter));
		if (route.record.path !== "/" || filter === "/") {
			route.__vd_match = route.re.test(filter);
			return true;
		}
		return false;
	}
	const path = route.record.path.toLowerCase();
	const decodedPath = decode(path);
	if (!isAbsolutePath(filter) && (decodedPath.includes(filter) || path.includes(filter))) return true;
	if (decodedPath.startsWith(filter) || path.startsWith(filter)) return true;
	if (route.record.name && String(route.record.name).includes(filter)) return true;
	return route.children.some((child) => isRouteMatching(child, filter));
}
function omit(obj, keys) {
	const ret = {};
	for (const key in obj) if (!keys.includes(key)) ret[key] = obj[key];
	return ret;
}
//#endregion
//#region node_modules/vue-router/dist/vue-router.js
/*!
* vue-router v5.3.1
* (c) 2026 Eduardo San Martin Morote
* @license MIT
*/
var createBaseLocation = () => location.protocol + "//" + location.host;
/**
* Creates a normalized history location from a window.location object
* @param base - The base path
* @param location - The window.location object
*/
function createCurrentLocation(base, location) {
	const { pathname, search, hash } = location;
	const hashPos = base.indexOf("#");
	if (hashPos > -1) {
		let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
		let pathFromHash = hash.slice(slicePos);
		if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
		return stripBase(pathFromHash, "");
	}
	return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
	let listeners = [];
	let teardowns = [];
	let pauseState = null;
	const popStateHandler = ({ state }) => {
		const to = createCurrentLocation(base, location);
		const from = currentLocation.value;
		const fromState = historyState.value;
		let delta = 0;
		if (state) {
			currentLocation.value = to;
			historyState.value = state;
			if (pauseState && pauseState === from) {
				pauseState = null;
				return;
			}
			delta = fromState ? state.position - fromState.position : 0;
		} else replace(to);
		listeners.forEach((listener) => {
			listener(currentLocation.value, from, {
				delta,
				type: "pop",
				direction: delta ? delta > 0 ? "forward" : "back" : ""
			});
		});
	};
	function pauseListeners() {
		pauseState = currentLocation.value;
	}
	function listen(callback) {
		listeners.push(callback);
		const teardown = () => {
			const index = listeners.indexOf(callback);
			if (index > -1) listeners.splice(index, 1);
		};
		teardowns.push(teardown);
		return teardown;
	}
	function beforeUnloadListener() {
		const { history } = window;
		if (!history.state) return;
		history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), "");
	}
	function destroy() {
		for (const teardown of teardowns) teardown();
		teardowns = [];
		window.removeEventListener("popstate", popStateHandler);
		window.removeEventListener("pagehide", beforeUnloadListener);
	}
	window.addEventListener("popstate", popStateHandler);
	window.addEventListener("pagehide", beforeUnloadListener);
	return {
		pauseListeners,
		listen,
		destroy
	};
}
/**
* Creates a state object
*/
function buildState(back, current, forward, replaced = false) {
	return {
		back,
		current,
		forward,
		replaced,
		position: window.history.length,
		scroll: null
	};
}
function useHistoryStateNavigation(base) {
	const { history, location } = window;
	const currentLocation = { value: createCurrentLocation(base, location) };
	const historyState = { value: history.state };
	if (!historyState.value) changeLocation(currentLocation.value, {
		back: null,
		current: currentLocation.value,
		forward: null,
		position: history.length - 1,
		replaced: true,
		scroll: null
	}, true);
	function changeLocation(to, state, replace) {
		/**
		* if a base tag is provided, and we are on a normal domain, we have to
		* respect the provided `base` attribute because pushState() will use it and
		* potentially erase anything before the `#` like at
		* https://github.com/vuejs/router/issues/685 where a base of
		* `/folder/#` but a base of `/` would erase the `/folder/` section. If
		* there is no host, the `<base>` tag makes no sense and if there isn't a
		* base tag we can just use everything after the `#`.
		*/
		const hashIndex = base.indexOf("#");
		const url = hashIndex > -1 ? (location.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
		try {
			history[replace ? "replaceState" : "pushState"](state, "", url);
			historyState.value = state;
		} catch (err) {
			diagnostics.VUE_ROUTER_R0120({ cause: err });
			location[replace ? "replace" : "assign"](url);
		}
	}
	function replace(to, data) {
		changeLocation(to, assign({}, history.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
		currentLocation.value = to;
	}
	function push(to, data) {
		const currentState = assign({}, historyState.value, history.state, {
			forward: to,
			scroll: computeScrollPosition()
		});
		if (!history.state) diagnostics.VUE_ROUTER_R0121();
		changeLocation(currentState.current, currentState, true);
		changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
		currentLocation.value = to;
	}
	return {
		location: currentLocation,
		state: historyState,
		push,
		replace
	};
}
/**
* Creates an HTML5 history. Most common history for single page applications.
*
* @param base -
*/
function createWebHistory(base) {
	base = normalizeBase(base);
	const historyNavigation = useHistoryStateNavigation(base);
	const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
	function go(delta, triggerListeners = true) {
		if (!triggerListeners) historyListeners.pauseListeners();
		history.go(delta);
	}
	const routerHistory = assign({
		location: "",
		base,
		go,
		createHref: createHref.bind(null, base)
	}, historyNavigation, historyListeners);
	Object.defineProperty(routerHistory, "location", {
		enumerable: true,
		get: () => historyNavigation.location.value
	});
	Object.defineProperty(routerHistory, "state", {
		enumerable: true,
		get: () => historyNavigation.state.value
	});
	return routerHistory;
}
var ROOT_TOKEN = {
	type: 0,
	value: ""
};
var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
	if (!path) return [[]];
	if (path === "/") return [[ROOT_TOKEN]];
	if (!isAbsolutePath(path)) throw new Error(`Route paths should start with a "/": "${path}" should be "/${path}".`);
	function crash(message) {
		throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	}
	let state = 0;
	let previousState = state;
	const tokens = [];
	let segment;
	function finalizeSegment() {
		if (segment) tokens.push(segment);
		segment = [];
	}
	let i = 0;
	let char;
	let buffer = "";
	let customRe = "";
	function consumeBuffer() {
		if (!buffer) return;
		if (state === 0) segment.push({
			type: 0,
			value: buffer
		});
		else if (state === 1 || state === 2 || state === 3) {
			if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
			segment.push({
				type: 1,
				value: buffer,
				regexp: customRe,
				repeatable: char === "*" || char === "+",
				optional: char === "*" || char === "?"
			});
		} else crash("Invalid state to consume buffer");
		buffer = "";
	}
	function addCharToBuffer() {
		buffer += char;
	}
	while (i < path.length) {
		char = path[i++];
		switch (state) {
			case 0:
				if (char === "\\") {
					previousState = state;
					state = 4;
				} else if (char === "/") {
					if (buffer) consumeBuffer();
					finalizeSegment();
				} else if (char === ":") {
					consumeBuffer();
					state = 1;
				} else addCharToBuffer();
				break;
			case 4:
				addCharToBuffer();
				state = previousState;
				break;
			case 1:
				if (char === "(") state = 2;
				else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
				else {
					consumeBuffer();
					state = 0;
					if (char !== "*" && char !== "?" && char !== "+") i--;
				}
				break;
			case 2:
				if (char === ")") {
					if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
					else state = 3;
				} else customRe += char;
				break;
			case 3:
				consumeBuffer();
				state = 0;
				if (char !== "*" && char !== "?" && char !== "+") i--;
				customRe = "";
				break;
			default: crash("Unknown state");
		}
	}
	if (state === 2) crash(`Unfinished custom RegExp for param "${buffer}"`);
	consumeBuffer();
	finalizeSegment();
	return tokens;
}
var BASE_PARAM_PATTERN = "[^/]+?";
var BASE_PATH_PARSER_OPTIONS = {
	sensitive: false,
	strict: false,
	start: true,
	end: true
};
var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
* Creates a path parser from an array of Segments (a segment is an array of Tokens)
*
* @param segments - array of segments returned by tokenizePath
* @param extraOptions - optional options for the regexp
* @returns a PathParser
*/
function tokensToParser(segments, extraOptions) {
	const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	const score = [];
	let pattern = options.start ? "^" : "";
	const keys = [];
	for (const segment of segments) {
		const segmentScores = segment.length ? [] : [90];
		if (options.strict && !segment.length) pattern += "/";
		for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
			const token = segment[tokenIndex];
			let subSegmentScore = 40 + (options.sensitive ? .25 : 0);
			if (token.type === 0) {
				if (!tokenIndex) pattern += "/";
				pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
				subSegmentScore += 40;
			} else if (token.type === 1) {
				const { value, repeatable, optional, regexp } = token;
				keys.push({
					name: value,
					repeatable,
					optional
				});
				const re = regexp ? regexp : BASE_PARAM_PATTERN;
				if (re !== BASE_PARAM_PATTERN) {
					subSegmentScore += 10;
					try {
						new RegExp(`(${re})`);
					} catch (err) {
						throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` + err.message);
					}
				}
				let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
				if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
				if (optional) subPattern += "?";
				pattern += subPattern;
				subSegmentScore += 20;
				if (optional) subSegmentScore += -8;
				if (repeatable) subSegmentScore += -20;
				if (re === ".*") subSegmentScore += -50;
			}
			segmentScores.push(subSegmentScore);
		}
		score.push(segmentScores);
	}
	if (options.strict && options.end) {
		const i = score.length - 1;
		score[i][score[i].length - 1] += .7000000000000001;
	}
	if (!options.strict) pattern += "/?";
	if (options.end) pattern += "$";
	else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
	const re = new RegExp(pattern, options.sensitive ? "" : "i");
	function parse(path) {
		const match = path.match(re);
		const params = {};
		if (!match) return null;
		for (let i = 1; i < match.length; i++) {
			const value = match[i] || "";
			const key = keys[i - 1];
			params[key.name] = value && key.repeatable ? value.split("/") : value;
		}
		return params;
	}
	function stringify(params) {
		let path = "";
		let avoidDuplicatedSlash = false;
		for (const segment of segments) {
			if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
			avoidDuplicatedSlash = false;
			for (const token of segment) if (token.type === 0) path += token.value;
			else if (token.type === 1) {
				const { value, repeatable, optional } = token;
				const param = value in params ? params[value] : "";
				if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
				const text = isArray(param) ? param.join("/") : param;
				if (!text) {
					if (optional) {
						if (segment.length < 2) {
							if (path.endsWith("/")) path = path.slice(0, -1);
							else avoidDuplicatedSlash = true;
						}
					} else throw new Error(`Missing required param "${value}"`);
				}
				path += text;
			}
		}
		return path || "/";
	}
	return {
		re,
		score,
		keys,
		parse,
		stringify
	};
}
/**
* Compares an array of numbers as used in PathParser.score and returns a
* number. This function can be used to `sort` an array
*
* @param a - first array of numbers
* @param b - second array of numbers
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
* should be sorted first
*/
function compareScoreArray(a, b) {
	let i = 0;
	while (i < a.length && i < b.length) {
		const diff = b[i] - a[i];
		if (diff) return diff;
		i++;
	}
	if (a.length < b.length) return a.length === 1 && a[0] === 80 ? -1 : 1;
	else if (a.length > b.length) return b.length === 1 && b[0] === 80 ? 1 : -1;
	return 0;
}
/**
* Compare function that can be used with `sort` to sort an array of PathParser
*
* @param a - first PathParser
* @param b - second PathParser
* @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
*/
function comparePathParserScore(a, b) {
	let i = 0;
	const aScore = a.score;
	const bScore = b.score;
	while (i < aScore.length && i < bScore.length) {
		const comp = compareScoreArray(aScore[i], bScore[i]);
		if (comp) return comp;
		i++;
	}
	if (Math.abs(bScore.length - aScore.length) === 1) {
		if (isLastScoreNegative(aScore)) return 1;
		if (isLastScoreNegative(bScore)) return -1;
	}
	return bScore.length - aScore.length;
}
/**
* This allows detecting splats at the end of a path: /home/:id(.*)*
*
* @param score - score to check
* @returns true if the last entry is negative
*/
function isLastScoreNegative(score) {
	const last = score[score.length - 1];
	return score.length > 0 && last[last.length - 1] < 0;
}
var PATH_PARSER_OPTIONS_DEFAULTS = {
	strict: false,
	end: true,
	sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
	const parser = tokensToParser(tokenizePath(record.path), options);
	{
		const existingKeys = /* @__PURE__ */ new Set();
		for (const key of parser.keys) {
			if (existingKeys.has(key.name)) diagnostics.VUE_ROUTER_R0090({
				name: key.name,
				path: record.path
			});
			existingKeys.add(key.name);
		}
	}
	const matcher = assign(parser, {
		record,
		parent,
		children: [],
		alias: []
	});
	if (parent) {
		if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
	}
	return matcher;
}
/**
* Creates a Router Matcher.
*
* @internal
* @param routes - array of initial routes
* @param globalOptions - global route options
*/
function createRouterMatcher(routes, globalOptions) {
	const matchers = [];
	const matcherMap = /* @__PURE__ */ new Map();
	globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
	function getRecordMatcher(name) {
		return matcherMap.get(name);
	}
	function addRoute(record, parent, originalRecord) {
		const isRootAdd = !originalRecord;
		const mainNormalizedRecord = normalizeRouteRecord(record);
		checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
		mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
		const options = mergeOptions(globalOptions, record);
		const normalizedRecords = [mainNormalizedRecord];
		if ("alias" in record) {
			const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
			for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
				components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
				path: alias,
				aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
			})));
		}
		let matcher;
		let originalMatcher;
		for (const normalizedRecord of normalizedRecords) {
			const { path } = normalizedRecord;
			if (parent && !isAbsolutePath(path)) {
				const parentPath = parent.record.path;
				const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
				normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
			}
			if (normalizedRecord.path === "*") throw new Error("Catch all routes (\"*\") must now be defined using a param with a custom regexp.\nSee more at https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes.");
			matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
			if (parent && isAbsolutePath(path)) checkMissingParamsInAbsolutePath(matcher, parent);
			if (originalRecord) {
				originalRecord.alias.push(matcher);
				checkSameParams(originalRecord, matcher);
			} else {
				originalMatcher = originalMatcher || matcher;
				if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
				if (isRootAdd && record.name && !isAliasRecord(matcher)) {
					checkSameNameAsAncestor(record, parent);
					removeRoute(record.name);
				}
			}
			if (isMatchable(matcher)) insertMatcher(matcher);
			if (mainNormalizedRecord.children) {
				const children = mainNormalizedRecord.children;
				for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
			}
			originalRecord = originalRecord || matcher;
		}
		return originalMatcher ? () => {
			removeRoute(originalMatcher);
		} : noop$1;
	}
	function removeRoute(matcherRef) {
		if (isRouteName(matcherRef)) {
			const matcher = matcherMap.get(matcherRef);
			if (matcher) {
				matcherMap.delete(matcherRef);
				matchers.splice(matchers.indexOf(matcher), 1);
				matcher.children.forEach(removeRoute);
				matcher.alias.forEach(removeRoute);
			}
		} else {
			const index = matchers.indexOf(matcherRef);
			if (index > -1) {
				matchers.splice(index, 1);
				if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
				matcherRef.children.forEach(removeRoute);
				matcherRef.alias.forEach(removeRoute);
			}
		}
	}
	function getRoutes() {
		return matchers;
	}
	function insertMatcher(matcher) {
		const index = findInsertionIndex(matcher, matchers);
		matchers.splice(index, 0, matcher);
		if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
	}
	function resolve(location, currentLocation) {
		let matcher;
		let params = {};
		let path;
		let name;
		if ("name" in location && location.name) {
			matcher = matcherMap.get(location.name);
			if (!matcher) throw createRouterError(1, { location });
			{
				const invalidParams = Object.keys(location.params || {}).filter((paramName) => !matcher.keys.find((k) => k.name === paramName));
				if (invalidParams.length) {
					const isInherited = !matcher.keys.length && invalidParams.some((name) => name in currentLocation.params);
					diagnostics.VUE_ROUTER_R0100({
						params: invalidParams.join("\", \""),
						inherited: isInherited ? ` If you are using a catch-all route with a named redirect, pass an empty \`params\` object: \`redirect: { name: '...', params: {} }\`.` : ""
					});
				}
			}
			name = matcher.record.name;
			params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location.params && pickParams(location.params, matcher.keys.map((k) => k.name)));
			path = matcher.stringify(params);
		} else if (location.path != null) {
			path = location.path;
			if (!isAbsolutePath(path)) diagnostics.VUE_ROUTER_R0101({ path });
			matcher = matchers.find((m) => m.re.test(path));
			if (matcher) {
				params = matcher.parse(path);
				name = matcher.record.name;
				matcher.keys.forEach((key) => {
					if (key.optional && !params[key.name]) delete params[key.name];
				});
			}
		} else {
			matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
			if (!matcher) throw createRouterError(1, {
				location,
				currentLocation
			});
			name = matcher.record.name;
			params = assign({}, currentLocation.params, location.params);
			path = matcher.stringify(params);
		}
		const matched = [];
		let parentMatcher = matcher;
		while (parentMatcher) {
			matched.unshift(parentMatcher.record);
			parentMatcher = parentMatcher.parent;
		}
		return {
			name,
			path,
			params,
			matched,
			meta: mergeMetaFields(matched)
		};
	}
	routes.forEach((route) => addRoute(route));
	function clearRoutes() {
		matchers.length = 0;
		matcherMap.clear();
	}
	return {
		addRoute,
		resolve,
		removeRoute,
		clearRoutes,
		getRoutes,
		getRecordMatcher
	};
}
/**
* Picks an object param to contain only specified keys.
*
* @param params - params object to pick from
* @param keys - keys to pick
*/
function pickParams(params, keys) {
	const newParams = {};
	for (const key of keys) if (key in params) newParams[key] = params[key];
	return newParams;
}
/**
* Normalizes a RouteRecordRaw. Creates a copy
*
* @param record
* @returns the normalized version
*/
function normalizeRouteRecord(record) {
	const normalized = {
		path: record.path,
		redirect: record.redirect,
		name: record.name,
		meta: record.meta || {},
		aliasOf: record.aliasOf,
		beforeEnter: record.beforeEnter,
		props: normalizeRecordProps(record),
		children: record.children || [],
		instances: {},
		leaveGuards: /* @__PURE__ */ new Set(),
		updateGuards: /* @__PURE__ */ new Set(),
		enterCallbacks: {},
		components: "components" in record ? record.components || null : record.component && { default: record.component }
	};
	Object.defineProperty(normalized, "mods", { value: {} });
	return normalized;
}
/**
* Normalize the optional `props` in a record to always be an object similar to
* components. Also accept a boolean for components.
* @param record
*/
function normalizeRecordProps(record) {
	const propsObject = {};
	const props = record.props || false;
	if ("component" in record) propsObject.default = props;
	else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
	return propsObject;
}
/**
* Checks if a record or any of its parent is an alias
* @param record
*/
function isAliasRecord(record) {
	while (record) {
		if (record.record.aliasOf) return true;
		record = record.parent;
	}
	return false;
}
/**
* Merge meta fields of an array of records
*
* @param matched - array of matched records
*/
function mergeMetaFields(matched) {
	return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function isSameParam(a, b) {
	return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
/**
* Check if a path and its alias have the same required params
*
* @param a - original record
* @param b - alias record
*/
function checkSameParams(a, b) {
	for (const key of a.keys) if (!key.optional && !b.keys.find(isSameParam.bind(null, key))) {
		diagnostics.VUE_ROUTER_R0102({
			alias: b.record.path,
			original: a.record.path,
			name: key.name
		});
		return;
	}
	for (const key of b.keys) if (!key.optional && !a.keys.find(isSameParam.bind(null, key))) {
		diagnostics.VUE_ROUTER_R0102({
			alias: b.record.path,
			original: a.record.path,
			name: key.name
		});
		return;
	}
}
/**
* A route with a name and a child with an empty path without a name should warn when adding the route
*
* @param mainNormalizedRecord - RouteRecordNormalized
* @param parent - RouteRecordMatcher
*/
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
	if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path && mainNormalizedRecord.children.length === 0) diagnostics.VUE_ROUTER_R0103({ name: String(parent.record.name) });
}
function checkSameNameAsAncestor(record, parent) {
	for (let ancestor = parent; ancestor; ancestor = ancestor.parent) if (ancestor.record.name === record.name) throw new Error(`A route named "${String(record.name)}" has been added as a ${parent === ancestor ? "child" : "descendant"} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
}
function checkMissingParamsInAbsolutePath(record, parent) {
	for (const key of parent.keys) if (!record.keys.find(isSameParam.bind(null, key))) {
		diagnostics.VUE_ROUTER_R0104({
			path: record.record.path,
			name: key.name,
			parent: parent.record.path
		});
		return;
	}
}
/**
* Performs a binary search to find the correct insertion index for a new matcher.
*
* Matchers are primarily sorted by their score. If scores are tied then we also consider parent/child relationships,
* with descendants coming before ancestors. If there's still a tie, new routes are inserted after existing routes.
*
* @param matcher - new matcher to be inserted
* @param matchers - existing matchers
*/
function findInsertionIndex(matcher, matchers) {
	let lower = 0;
	let upper = matchers.length;
	while (lower !== upper) {
		const mid = lower + upper >> 1;
		if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
		else lower = mid + 1;
	}
	const insertionAncestor = getInsertionAncestor(matcher);
	if (insertionAncestor) {
		upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
		if (upper < 0) diagnostics.VUE_ROUTER_R0105({
			ancestor: insertionAncestor.record.path,
			record: matcher.record.path
		});
	}
	return upper;
}
function getInsertionAncestor(matcher) {
	let ancestor = matcher;
	while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
/**
* Checks if a matcher can be reachable. This means if it's possible to reach it as a route. For example, routes without
* a component, or name, or redirect, are just used to group other routes.
* @param matcher
* @param matcher.record record of the matcher
* @returns
*/
function isMatchable({ record }) {
	return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
/**
* Returns the internal behavior of a {@link RouterLink} without the rendering part.
*
* @param props - a `to` location and an optional `replace` flag
*/
function useLink(props) {
	const router = inject(routerKey);
	const currentRoute = inject(routeLocationKey);
	let hasPrevious = false;
	let previousTo = null;
	const route = computed(() => {
		const to = unref(props.to);
		if (!hasPrevious || to !== previousTo) {
			if (!isRouteLocation(to)) diagnostics.VUE_ROUTER_R0050({ to });
			previousTo = to;
			hasPrevious = true;
		}
		return router.resolve(to);
	});
	const activeRecordIndex = computed(() => {
		const { matched } = route.value;
		const { length } = matched;
		const routeMatched = matched[length - 1];
		const currentMatched = currentRoute.matched;
		if (!routeMatched || !currentMatched.length) return -1;
		const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
		if (index > -1) return index;
		const parentRecordPath = getOriginalPath(matched[length - 2]);
		return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
	});
	const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
	const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
	function navigate(e = {}) {
		if (guardEvent$1(e)) {
			const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop$1);
			if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
			return p;
		}
		return Promise.resolve();
	}
	if (isBrowser) {
		const instance = getCurrentInstance();
		if (instance) {
			const linkContextDevtools = {
				route: route.value,
				isActive: isActive.value,
				isExactActive: isExactActive.value,
				error: null
			};
			instance.__vrl_devtools = instance.__vrl_devtools || [];
			instance.__vrl_devtools.push(linkContextDevtools);
			watchEffect(() => {
				linkContextDevtools.route = route.value;
				linkContextDevtools.isActive = isActive.value;
				linkContextDevtools.isExactActive = isExactActive.value;
				linkContextDevtools.error = isRouteLocation(unref(props.to)) ? null : "Invalid \"to\" value";
			}, { flush: "post" });
		}
	}
	/**
	* NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
	*/
	return {
		route,
		href: computed(() => route.value.href),
		isActive,
		isExactActive,
		navigate
	};
}
function preferSingleVNode(vnodes) {
	return vnodes.length === 1 ? vnodes[0] : vnodes;
}
/**
* Component to render a link that triggers a navigation on click.
*/
var RouterLink = /* @__PURE__ */ defineComponent({
	name: "RouterLink",
	compatConfig: { MODE: 3 },
	props: {
		to: {
			type: [String, Object],
			required: true
		},
		replace: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
		ariaCurrentValue: {
			type: String,
			default: "page"
		},
		viewTransition: Boolean
	},
	useLink,
	setup(props, { slots }) {
		const link = /* @__PURE__ */ reactive(useLink(props));
		const { options } = inject(routerKey);
		const elClass = computed(() => ({
			[getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
			[getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
		}));
		return () => {
			const children = slots.default && preferSingleVNode(slots.default(link));
			return props.custom ? children : h$1("a", {
				"aria-current": link.isExactActive ? props.ariaCurrentValue : null,
				href: link.href,
				onClick: link.navigate,
				class: elClass.value
			}, children);
		};
	}
});
function guardEvent$1(e) {
	if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
	if (e.defaultPrevented) return;
	if (e.button !== void 0 && e.button !== 0) return;
	if (e.currentTarget && e.currentTarget.getAttribute) {
		const target = e.currentTarget.getAttribute("target");
		if (/\b_blank\b/i.test(target)) return;
	}
	if (e.preventDefault) e.preventDefault();
	return true;
}
function includesParams(outer, inner) {
	for (const key in inner) {
		const innerValue = inner[key];
		const outerValue = outer[key];
		if (isArray(innerValue)) {
			if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
		} else if (innerValue !== outerValue) return false;
	}
	return true;
}
/**
* Get the original path value of a record by following its aliasOf
* @param record
*/
function getOriginalPath(record) {
	return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
/**
* Utility class to get the active class based on defaults.
* @param propClass
* @param globalClass
* @param defaultClass
*/
var getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
var RouterViewImpl = /*#__PURE__*/ defineComponent({
	name: "RouterView",
	inheritAttrs: false,
	props: {
		name: {
			type: String,
			default: "default"
		},
		route: Object
	},
	compatConfig: { MODE: 3 },
	setup(props, { attrs, slots }) {
		warnDeprecatedUsage();
		const injectedRoute = inject(routerViewLocationKey);
		const routeToDisplay = computed(() => props.route || injectedRoute.value);
		const injectedDepth = inject(viewDepthKey, 0);
		const depth = computed(() => {
			let initialDepth = unref(injectedDepth);
			const { matched } = routeToDisplay.value;
			let matchedRoute;
			while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
			return initialDepth;
		});
		const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
		provide(viewDepthKey, computed(() => depth.value + 1));
		provide(matchedRouteKey, matchedRouteRef);
		provide(routerViewLocationKey, routeToDisplay);
		const viewRef = /* @__PURE__ */ ref();
		watch(() => [
			viewRef.value,
			matchedRouteRef.value,
			props.name
		], ([instance, to, name], [oldInstance, from, _oldName]) => {
			if (to) {
				to.instances[name] = instance;
				if (from && from !== to && instance && instance === oldInstance) {
					if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
					if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
				}
			}
			if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
		}, { flush: "post" });
		return () => {
			const route = routeToDisplay.value;
			const currentName = props.name;
			const matchedRoute = matchedRouteRef.value;
			const ViewComponent = matchedRoute && matchedRoute.components[currentName];
			if (!ViewComponent) return normalizeSlot(slots.default, {
				Component: ViewComponent,
				route
			});
			const routePropsOption = matchedRoute.props[currentName];
			const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
			const onVnodeUnmounted = (vnode) => {
				if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
			};
			const component = h$1(ViewComponent, assign({}, routeProps, attrs, {
				onVnodeUnmounted,
				ref: viewRef
			}));
			if (isBrowser && component.ref) {
				const info = {
					depth: depth.value,
					name: matchedRoute.name,
					path: matchedRoute.path,
					meta: matchedRoute.meta
				};
				(isArray(component.ref) ? component.ref.map((r) => r.i) : [component.ref.i]).forEach((instance) => {
					if (instance) instance.__vrv_devtools = info;
				});
			}
			return normalizeSlot(slots.default, {
				Component: component,
				route
			}) || component;
		};
	}
});
function normalizeSlot(slot, data) {
	if (!slot) return null;
	const slotContent = slot(data);
	return slotContent.length === 1 ? slotContent[0] : slotContent;
}
/**
* Component to display the current route the user is at.
*/
var RouterView = RouterViewImpl;
function warnDeprecatedUsage() {
	const instance = getCurrentInstance();
	const parentName = instance.parent && instance.parent.type.name;
	const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
	if (parentName && (parentName === "KeepAlive" || parentName.includes("Transition")) && typeof parentSubTreeType === "object" && parentSubTreeType.name === "RouterView") {
		const comp = parentName === "KeepAlive" ? "keep-alive" : "transition";
		diagnostics.VUE_ROUTER_R0060({ comp });
	}
}
/**
* Creates a Router instance that can be used by a Vue app.
*
* @param options - {@link RouterOptions}
*/
function createRouter(options) {
	const matcher = createRouterMatcher(options.routes, options);
	const parseQuery$1 = options.parseQuery || parseQuery;
	const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	const routerHistory = options.history;
	if (!routerHistory) throw new Error("Provide the \"history\" option when calling \"createRouter()\": https://router.vuejs.org/api/interfaces/RouterOptions.html#history");
	const beforeGuards = useCallbacks();
	const beforeResolveGuards = useCallbacks();
	const afterGuards = useCallbacks();
	const currentRoute = /* @__PURE__ */ shallowRef(START_LOCATION_NORMALIZED);
	const routesVersion = /* @__PURE__ */ shallowRef(0);
	let pendingLocation = START_LOCATION_NORMALIZED;
	if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
	const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
	const encodeParams = applyToParams.bind(null, encodeParam);
	const decodeParams = applyToParams.bind(null, decode);
	function addRoute(parentOrRoute, route) {
		let parent;
		let record;
		if (isRouteName(parentOrRoute)) {
			parent = matcher.getRecordMatcher(parentOrRoute);
			if (!parent) diagnostics.VUE_ROUTER_R0001({ name: String(parentOrRoute) });
			record = route;
		} else record = parentOrRoute;
		const removeRoute = matcher.addRoute(record, parent);
		routesVersion.value++;
		return () => {
			removeRoute();
			routesVersion.value++;
		};
	}
	function removeRoute(name) {
		const recordMatcher = matcher.getRecordMatcher(name);
		if (recordMatcher) {
			matcher.removeRoute(recordMatcher);
			routesVersion.value++;
		} else diagnostics.VUE_ROUTER_R0002({ name: String(name) });
	}
	function clearRoutes() {
		matcher.clearRoutes();
		routesVersion.value++;
	}
	function getRoutes() {
		return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
	}
	function hasRoute(name) {
		return !!matcher.getRecordMatcher(name);
	}
	function resolve(rawLocation, currentLocation) {
		routesVersion.value;
		if (typeof rawLocation === "string") {
			currentLocation = currentLocation || (rawLocation.startsWith("/") ? START_LOCATION_NORMALIZED : currentRoute.value);
			const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
			const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
			const href = routerHistory.createHref(locationNormalized.fullPath);
			if (href.startsWith("//")) diagnostics.VUE_ROUTER_R0003({
				location: rawLocation,
				href
			});
			else if (!matchedRoute.matched.length) diagnostics.VUE_ROUTER_R0004({ path: rawLocation });
			return assign(locationNormalized, matchedRoute, {
				params: decodeParams(matchedRoute.params),
				redirectedFrom: void 0,
				href
			});
		}
		if (!isRouteLocation(rawLocation)) {
			diagnostics.VUE_ROUTER_R0005({ rawLocation });
			return resolve({});
		}
		currentLocation = assign({}, currentLocation || (rawLocation.path != null && rawLocation.path.startsWith("/") && !("name" in rawLocation && rawLocation.name) ? START_LOCATION_NORMALIZED : currentRoute.value));
		let matcherLocation;
		if (rawLocation.path != null) {
			if ("params" in rawLocation && !("name" in rawLocation) && Object.keys(rawLocation.params).length) diagnostics.VUE_ROUTER_R0006({ path: rawLocation.path });
			matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
		} else {
			const targetParams = assign({}, rawLocation.params);
			for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
			matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
			currentLocation.params = encodeParams(currentLocation.params);
		}
		const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
		const hash = rawLocation.hash || "";
		if (hash && !hash.startsWith("#")) diagnostics.VUE_ROUTER_R0007({ hash });
		matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
		const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
			hash: encodeHash(hash),
			path: matchedRoute.path
		}));
		const href = routerHistory.createHref(fullPath);
		if (href.startsWith("//")) diagnostics.VUE_ROUTER_R0003({
			location: rawLocation,
			href
		});
		else if (!matchedRoute.matched.length) diagnostics.VUE_ROUTER_R0004({ path: rawLocation.path != null ? rawLocation.path : rawLocation });
		return assign({
			fullPath,
			hash,
			query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
		}, matchedRoute, {
			redirectedFrom: void 0,
			href
		});
	}
	function locationAsObject(to) {
		return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
	}
	function checkCanceledNavigation(to, from) {
		if (pendingLocation !== to) return createRouterError(8, {
			from,
			to
		});
	}
	function push(to) {
		return pushWithRedirect(to);
	}
	function replace(to) {
		return push(assign(locationAsObject(to), { replace: true }));
	}
	function handleRedirectRecord(to, from) {
		const lastMatched = to.matched[to.matched.length - 1];
		if (lastMatched && lastMatched.redirect) {
			const { redirect } = lastMatched;
			let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
			if (typeof newTargetLocation === "string") {
				newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
				newTargetLocation.params = {};
			}
			if (newTargetLocation.path == null && !("name" in newTargetLocation)) {
				diagnostics.VUE_ROUTER_R0008({
					target: JSON.stringify(newTargetLocation, null, 2),
					to: to.fullPath
				});
				throw new Error("Invalid redirect");
			}
			return assign({
				query: to.query,
				hash: to.hash,
				params: newTargetLocation.path != null ? {} : to.params
			}, newTargetLocation);
		}
	}
	function pushWithRedirect(to, redirectedFrom) {
		const targetLocation = pendingLocation = resolve(to);
		const from = currentRoute.value;
		const data = to.state;
		const force = to.force;
		const replace = to.replace === true;
		const shouldRedirect = handleRedirectRecord(targetLocation, from);
		if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
			state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
			force,
			replace
		}), redirectedFrom || targetLocation);
		const toLocation = targetLocation;
		toLocation.redirectedFrom = redirectedFrom;
		let failure;
		if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
			failure = createRouterError(16, {
				to: toLocation,
				from
			});
			handleScroll(from, from, true, false);
		}
		return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure) => {
			if (failure) {
				if (isNavigationFailure(failure, 2)) {
					if (isSameRouteLocation(stringifyQuery$1, resolve(failure.to), toLocation) && redirectedFrom && (redirectedFrom._count = redirectedFrom._count ? redirectedFrom._count + 1 : 1) > 30) {
						diagnostics.VUE_ROUTER_R0009({
							from: from.fullPath,
							to: toLocation.fullPath
						});
						return Promise.reject(/* @__PURE__ */ new Error("Infinite redirect in navigation guard"));
					}
					return pushWithRedirect(assign({ replace }, locationAsObject(failure.to), {
						state: typeof failure.to === "object" ? assign({}, data, failure.to.state) : data,
						force
					}), redirectedFrom || toLocation);
				}
			} else failure = finalizeNavigation(toLocation, from, true, replace, data);
			triggerAfterEach(toLocation, from, failure);
			return failure;
		});
	}
	/**
	* Helper to reject and skip all navigation guards if a new navigation happened
	* @param to
	* @param from
	*/
	function checkCanceledNavigationAndReject(to, from) {
		const error = checkCanceledNavigation(to, from);
		return error ? Promise.reject(error) : Promise.resolve();
	}
	function runWithContext(fn) {
		const app = installedApps.values().next().value;
		return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
	}
	function navigate(to, from) {
		let guards;
		const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
		guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
		for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
			guards.push(guardToPromiseFn(guard, to, from));
		});
		const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
		guards.push(canceledNavigationCheck);
		return runGuardQueue(guards).then(() => {
			guards = [];
			for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
			for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
				guards.push(guardToPromiseFn(guard, to, from));
			});
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const record of enteringRecords) if (record.beforeEnter) {
				if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
				else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
			}
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			to.matched.forEach((record) => record.enterCallbacks = {});
			guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).then(() => {
			guards = [];
			for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
			guards.push(canceledNavigationCheck);
			return runGuardQueue(guards);
		}).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
	}
	function triggerAfterEach(to, from, failure) {
		afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
	}
	/**
	* - Cleans up any navigation guards
	* - Changes the url if necessary
	* - Calls the scrollBehavior
	*/
	function finalizeNavigation(toLocation, from, isPush, replace, data) {
		const error = checkCanceledNavigation(toLocation, from);
		if (error) return error;
		const isFirstNavigation = from === START_LOCATION_NORMALIZED;
		const state = !isBrowser ? {} : history.state;
		if (isPush) {
			if (replace || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
			else routerHistory.push(toLocation.fullPath, data);
		}
		currentRoute.value = toLocation;
		handleScroll(toLocation, from, isPush, isFirstNavigation);
		markAsReady();
	}
	let removeHistoryListener;
	function setupListeners() {
		if (removeHistoryListener) return;
		removeHistoryListener = routerHistory.listen((to, _from, info) => {
			if (!router.listening) return;
			const toLocation = resolve(to);
			const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
			if (shouldRedirect) {
				pushWithRedirect(assign(shouldRedirect, {
					replace: true,
					force: true
				}), toLocation).catch(noop$1);
				return;
			}
			pendingLocation = toLocation;
			const from = currentRoute.value;
			if (isBrowser && info.delta) saveScrollPosition(getScrollKey(from.fullPath, info.delta));
			navigate(toLocation, from).catch((error) => {
				if (isNavigationFailure(error, 12)) return error;
				if (isNavigationFailure(error, 2)) {
					pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
						if (isNavigationFailure(failure, 20) && !info.delta && info.type === "pop") routerHistory.go(-1, false);
					}).catch(noop$1);
					return Promise.reject();
				}
				if (info.delta) routerHistory.go(-info.delta, false);
				return triggerError(error, toLocation, from);
			}).then((failure) => {
				failure = failure || finalizeNavigation(toLocation, from, false);
				if (failure) {
					if (info.delta && !isNavigationFailure(failure, 8)) routerHistory.go(-info.delta, false);
					else if (info.type === "pop" && isNavigationFailure(failure, 20)) routerHistory.go(-1, false);
				}
				triggerAfterEach(toLocation, from, failure);
			}).catch(noop$1);
		});
	}
	let readyHandlers = useCallbacks();
	let errorListeners = useCallbacks();
	let ready;
	/**
	* Trigger errorListeners added via onError and throws the error as well
	*
	* @param error - error to throw
	* @param to - location we were navigating to when the error happened
	* @param from - location we were navigating from when the error happened
	* @returns the error as a rejected promise
	*/
	function triggerError(error, to, from) {
		markAsReady(error);
		const list = errorListeners.list();
		if (list.length) list.forEach((handler) => handler(error, to, from));
		else {
			diagnostics.VUE_ROUTER_R0010();
			console.error(error);
		}
		return Promise.reject(error);
	}
	function isReady() {
		if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
		return new Promise((resolve, reject) => {
			readyHandlers.add([resolve, reject]);
		});
	}
	function markAsReady(err) {
		if (!ready) {
			ready = !err;
			setupListeners();
			readyHandlers.list().forEach(([resolve, reject]) => err ? reject(err) : resolve());
			readyHandlers.reset();
		}
		return err;
	}
	function handleScroll(to, from, isPush, isFirstNavigation) {
		const { scrollBehavior } = options;
		if (!isBrowser || !scrollBehavior) return Promise.resolve();
		const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
		return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => to === currentRoute.value && position && scrollToPosition(position)).catch((err) => to === currentRoute.value && triggerError(err, to, from));
	}
	const go = (delta) => routerHistory.go(delta);
	let started;
	const installedApps = /* @__PURE__ */ new Set();
	const router = {
		currentRoute,
		listening: true,
		addRoute,
		removeRoute,
		clearRoutes,
		hasRoute,
		getRoutes,
		resolve,
		options,
		push,
		replace,
		go,
		back: () => go(-1),
		forward: () => go(1),
		beforeEach: beforeGuards.add,
		beforeResolve: beforeResolveGuards.add,
		afterEach: afterGuards.add,
		onError: errorListeners.add,
		isReady,
		install(app) {
			app.component("RouterLink", RouterLink);
			app.component("RouterView", RouterView);
			app.config.globalProperties.$router = router;
			Object.defineProperty(app.config.globalProperties, "$route", {
				enumerable: true,
				get: () => unref(currentRoute)
			});
			if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
				started = true;
				push(routerHistory.location).catch((err) => {
					diagnostics.VUE_ROUTER_R0011({ cause: err });
				});
			}
			const reactiveRoute = {};
			for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
				get: () => currentRoute.value[key],
				enumerable: true
			});
			app.provide(routerKey, router);
			app.provide(routeLocationKey, /* @__PURE__ */ shallowReactive(reactiveRoute));
			app.provide(routerViewLocationKey, currentRoute);
			const unmountApp = app.unmount;
			installedApps.add(app);
			app.unmount = function() {
				installedApps.delete(app);
				if (installedApps.size < 1) {
					pendingLocation = START_LOCATION_NORMALIZED;
					removeHistoryListener && removeHistoryListener();
					removeHistoryListener = null;
					currentRoute.value = START_LOCATION_NORMALIZED;
					started = false;
					ready = false;
				}
				unmountApp();
			};
			if (isBrowser && true) addDevtools(app, router, matcher);
		}
	};
	function runGuardQueue(guards) {
		return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
	}
	return router;
}
//#endregion
//#region \0vite/preload-helper.js
var scriptRel = "modulepreload";
var assetsURL = function(dep) {
	return "/catpod/" + dep;
};
var seen = {};
var isCssPreloadUrl = function isCssPreloadUrl(url) {
	return url.pathname.endsWith(".css");
};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		let preloadedHrefs;
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return new URL(import.meta.resolve(specifier));
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			);
		}
		promise = allSettled(deps.map((depString) => {
			depString = assetsURL(depString, importerUrl);
			const dep = importMetaResolve(depString);
			if (dep.href in seen) return;
			seen[dep.href] = true;
			const isCss = isCssPreloadUrl(dep);
			if (preloadedHrefs === void 0) {
				preloadedHrefs = {
					all: /* @__PURE__ */ new Set(),
					styles: /* @__PURE__ */ new Set()
				};
				const links = document.getElementsByTagName("link");
				for (let i = links.length - 1; i >= 0; i--) {
					const link = links[i];
					preloadedHrefs.all.add(link.href);
					if (link.rel === "stylesheet") preloadedHrefs.styles.add(link.href);
				}
			}
			if ((isCss ? preloadedHrefs.styles : preloadedHrefs.all).has(dep.href)) return;
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep.href;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}).filter((p) => p !== void 0));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region docs/.vuepress/.temp/internal/routes.js
var redirects = JSON.parse("{}");
var routes = Object.fromEntries([
	["/how-to-use.html", {
		loader: () => __vitePreload(() => import(
			/* webpackChunkName: "how-to-use.html" */
			"./how-to-use-DlkQvRzl.js"
), []),
		meta: { "title": "How to Use" }
	}],
	["/", {
		loader: () => __vitePreload(() => import(
			/* webpackChunkName: "index.html" */
			"./docs-C79B2Yqq.js"
), []),
		meta: { "title": "What is CATPOD?" }
	}],
	["/resources.html", {
		loader: () => __vitePreload(() => import(
			/* webpackChunkName: "resources.html" */
			"./resources-Cl2Us4HV.js"
), []),
		meta: { "title": "Resources Used" }
	}],
	["/use-cases.html", {
		loader: () => __vitePreload(() => import(
			/* webpackChunkName: "use-cases.html" */
			"./use-cases-DIcbfDnQ.js"
), []),
		meta: { "title": "Use Cases" }
	}],
	["/404.html", {
		loader: () => __vitePreload(() => import(
			/* webpackChunkName: "404.html" */
			"./404.html-CM5evzfE.js"
), []),
		meta: { "title": "" }
	}]
]);
//#endregion
//#region node_modules/@vuepress/client/dist/utils-jFeCv-dX.js
/**
* The problem only occurs during hot updates in the development environment,
* It only needs to be processed in the development environment.
* (see vuepress/core#1715)
*/
var clientDataSymbol = Symbol("");
/**
* Returns client data
*/
var useClientData = () => {
	const clientData = inject(clientDataSymbol);
	if (!clientData) throw new Error("useClientData() is called without provider.");
	return clientData;
};
var usePageComponent = () => useClientData().pageComponent;
var usePageFrontmatter = () => useClientData().pageFrontmatter;
var usePageHead = () => useClientData().pageHead;
var usePageLang = () => useClientData().pageLang;
var usePageLayout = () => useClientData().pageLayout;
var useRouteLocale = () => useClientData().routeLocale;
var useRoutePath = () => useClientData().routePath;
var useRoutes = () => useClientData().routes;
var useSiteData = () => useClientData().siteData;
var useData = useClientData;
var useFrontmatter = usePageFrontmatter;
/**
* Global content updated callbacks
*/
var contentUpdatedCallbacks = /* @__PURE__ */ new Set();
/**
* Register callback that is called every time the markdown content is updated
* in the DOM.
*/
var onContentUpdated = (fn) => {
	contentUpdatedCallbacks.add(fn);
	onUnmounted(() => {
		contentUpdatedCallbacks.delete(fn);
	});
};
/**
* Injection key for `updateHead` util
*/
var updateHeadSymbol = Symbol("");
/**
* Global redirects ref
*/
var redirects$1 = /* @__PURE__ */ shallowRef(redirects);
/**
* Global routes ref
*/
var routes$1 = /* @__PURE__ */ shallowRef(routes);
/**
* Resolve route path with given raw path
*/
var resolveRoutePath = (pathname, currentPath) => {
	const normalizedRoutePath = normalizeRoutePath(pathname, currentPath);
	if (routes$1.value[normalizedRoutePath]) return normalizedRoutePath;
	const encodedRoutePath = encodeURI(normalizedRoutePath);
	if (routes$1.value[encodedRoutePath]) return encodedRoutePath;
	const redirectedRoutePath = redirects$1.value[normalizedRoutePath] || redirects$1.value[encodedRoutePath];
	if (redirectedRoutePath) return redirectedRoutePath;
	return normalizedRoutePath;
};
/**
* Resolve route with given path
*/
var resolveRoute = (path, currentPath) => {
	const { pathname, hashAndQueries } = splitPath(path);
	const routePath = resolveRoutePath(pathname, currentPath);
	const routeFullPath = routePath + hashAndQueries;
	if (!routes$1.value[routePath]) return {
		...routes$1.value["/404.html"],
		path: routeFullPath,
		notFound: true
	};
	return {
		...routes$1.value[routePath],
		path: routeFullPath,
		notFound: false
	};
};
/**
* Resolve route full path with given raw path
*/
var resolveRouteFullPath = (path, currentPath) => {
	const { pathname, hashAndQueries } = splitPath(path);
	return resolveRoutePath(pathname, currentPath) + hashAndQueries;
};
/**
* Forked from https://github.com/vuejs/router/blob/941b2131e80550009e5221d4db9f366b1fea3fd5/packages/router/src/RouterLink.ts#L293
*/
var guardEvent = (event) => {
	if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
	if (event.defaultPrevented) return;
	if (event.button !== void 0 && event.button !== 0) return;
	if (event.currentTarget) {
		if (event.currentTarget.getAttribute("target")?.match(/\b_blank\b/i)) return;
	}
	event.preventDefault();
	return true;
};
/**
* Component to render a link to another route.
*
* It's similar to `RouterLink` in `vue-router`, but more lightweight.
*
* It's recommended to use `RouteLink` in VuePress.
*/
var RouteLink = /* @__PURE__ */ defineComponent({
	name: "RouteLink",
	props: {
		/**
		* The route path to link to
		*/
		to: {
			type: String,
			required: true
		},
		/**
		* Whether the link is active to have an active class
		*
		* Notice that the active status is not automatically determined according to the current route.
		*/
		active: Boolean,
		/**
		* The class to add when the link is active
		*/
		activeClass: {
			type: String,
			default: "route-link-active"
		}
	},
	slots: Object,
	setup(props, { slots }) {
		const router = useRouter();
		const route = useRoute();
		const path = computed(() => props.to.startsWith("#") || props.to.startsWith("?") ? props.to : `/catpod/${resolveRouteFullPath(props.to, route.path).substring(1)}`);
		return () => h$1("a", {
			class: ["route-link", { [props.activeClass]: props.active }],
			href: path.value,
			onClick: (event = {}) => {
				if (guardEvent(event)) router.push(props.to).catch();
			}
		}, slots.default());
	}
});
/**
* Component to render a link automatically according to the link type
*
* - If the link is internal, it will be rendered as a `<RouteLink>`
* - If the link is external, it will be rendered as a normal `<a>` tag
*/
var AutoLink = /* @__PURE__ */ defineComponent({
	name: "AutoLink",
	props: { config: {
		type: Object,
		required: true
	} },
	slots: Object,
	setup(props, { slots }) {
		const config = /* @__PURE__ */ toRef$1(props, "config");
		const route = useRoute();
		const siteData = useSiteData();
		const withProtocol = computed(() => isLinkWithProtocol(config.value.link));
		const linkTarget = computed(() => config.value.target || (withProtocol.value ? "_blank" : void 0));
		const isBlankTarget = computed(() => linkTarget.value === "_blank");
		const isInternal = computed(() => !withProtocol.value && !isBlankTarget.value);
		const linkRel = computed(() => config.value.rel || (isBlankTarget.value ? "noopener noreferrer" : null));
		const linkAriaLabel = computed(() => config.value.ariaLabel ?? config.value.text);
		const shouldBeActiveInSubpath = computed(() => {
			if (config.value.exact) return false;
			const localePaths = Object.keys(siteData.value.locales);
			return localePaths.length ? localePaths.every((key) => key !== config.value.link) : config.value.link !== "/";
		});
		const isActive = computed(() => {
			if (!isInternal.value) return false;
			if (config.value.activeMatch) return (config.value.activeMatch instanceof RegExp ? config.value.activeMatch : new RegExp(config.value.activeMatch, "u")).test(route.path);
			if (shouldBeActiveInSubpath.value) return route.path.startsWith(config.value.link);
			return route.path === config.value.link;
		});
		return () => {
			const { before, after, default: defaultSlot } = slots;
			const content = defaultSlot?.(config.value) ?? [
				before?.(config.value),
				config.value.text,
				after?.(config.value)
			];
			return isInternal.value ? h$1(RouteLink, {
				"class": "auto-link",
				"to": config.value.link,
				"active": isActive.value,
				"aria-label": linkAriaLabel.value
			}, () => content) : h$1("a", {
				"class": "auto-link external-link",
				"href": config.value.link,
				"aria-label": linkAriaLabel.value,
				"rel": linkRel.value,
				"target": linkTarget.value
			}, content);
		};
	}
});
/**
* Wrapper component that only renders its content on the client side and skips server side rendering
*
* Since vue 3.5, you can try the new `data-allow-mismatch` attribute instead of `<ClientOnly>` component in some cases to avoid hydration mismatch.
*
* @see https://blog.vuejs.org/posts/vue-3-5#data-allow-mismatch
*/
var ClientOnly = /* @__PURE__ */ defineComponent({
	name: "ClientOnly",
	setup(_, ctx) {
		const isMounted = /* @__PURE__ */ ref(false);
		onMounted(() => {
			isMounted.value = true;
		});
		return () => isMounted.value ? ctx.slots.default?.() : null;
	}
});
/**
* Execute all callbacks registered via `onContentUpdated`.
*
* @internal
*/
var runContentUpdatedCallbacks = (reason) => {
	contentUpdatedCallbacks.forEach((fn) => fn(reason));
};
/**
* Markdown rendered content
*/
var Content = /* @__PURE__ */ defineComponent({
	name: "Content",
	props: { path: {
		type: String,
		required: false,
		default: ""
	} },
	setup(props) {
		const pageComponent = usePageComponent();
		const ContentComponent = computed(() => {
			if (!props.path) return pageComponent.value;
			const route = resolveRoute(props.path);
			return /* @__PURE__ */ defineAsyncComponent(async () => route.loader().then((m) => m.default));
		});
		return () => h$1(ContentComponent.value, {
			onVnodeMounted: () => {
				runContentUpdatedCallbacks("mounted");
			},
			onVnodeUpdated: () => {
				runContentUpdatedCallbacks("updated");
			},
			onVnodeBeforeUnmount: () => {
				runContentUpdatedCallbacks("beforeUnmount");
			}
		});
	}
});
/**
* Name of the default layout
*/
var LAYOUT_NAME_DEFAULT = "Layout";
/**
* Resolver methods to get global computed
*
* Users can override corresponding method for advanced customization
*
* @experimental - This is an experimental API and may be changed in minor versions
*/
var resolvers = /* @__PURE__ */ reactive({
	/**
	* Resolve layouts component map
	*/
	resolveLayouts: (clientConfigs) => clientConfigs.reduce((prev, item) => ({
		...prev,
		...item.layouts
	}), {}),
	/**
	* Merge the head config in frontmatter and site locale
	*
	* Frontmatter should take priority over site locale
	*/
	resolvePageHead: (pageHeadTitle, pageFrontmatter, siteLocaleDate) => {
		const description = isString$1(pageFrontmatter.description) ? pageFrontmatter.description : siteLocaleDate.description;
		return dedupeHead([
			...Array.isArray(pageFrontmatter.head) ? pageFrontmatter.head : [],
			...siteLocaleDate.head,
			[
				"title",
				{},
				pageHeadTitle
			],
			["meta", {
				name: "description",
				content: description
			}]
		]);
	},
	/**
	* Resolve the content of page head title
	*
	* It would be used as the content of the `<title>` tag
	*/
	resolvePageHeadTitle: (pageData, siteLocaleDate) => [pageData.title, siteLocaleDate.title].filter((item) => !!item).join(" | "),
	/**
	* Resolve page language from page data
	*
	* It would be used as the `lang` attribute of `<html>` tag
	*/
	resolvePageLang: (pageData, siteLocaleData) => pageData.lang || siteLocaleData.lang || "en-US",
	/**
	* Resolve layout component of current page
	*/
	resolvePageLayout: (pageData, layouts) => {
		const layoutName = isString$1(pageData.frontmatter.layout) ? pageData.frontmatter.layout : LAYOUT_NAME_DEFAULT;
		if (!layouts[layoutName]) throw new Error(`[vuepress] Cannot resolve layout: ${layoutName}`);
		return layouts[layoutName];
	},
	/**
	* Resolve locale path according to route path and locales config
	*/
	resolveRouteLocale: (locales, routePath) => resolveLocalePath(locales, decodeURI(routePath)),
	/**
	* Resolve site data for specific locale
	*
	* It would merge the locales fields to the root fields
	*/
	resolveSiteLocaleData: ({ base, locales, ...siteData }, routeLocale) => ({
		...siteData,
		...locales[routeLocale],
		head: [...locales[routeLocale]?.head ?? [], ...siteData.head]
	})
});
/**
* Prefix url with site base
*/
var withBase = (url) => {
	if (isLinkHttp(url)) return url;
	return `/catpod/${removeLeadingSlash(url)}`;
};
//#endregion
//#region node_modules/@vueuse/shared/dist/index.js
/**
* Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
*
* @param fn
*/
function tryOnScopeDispose(fn, failSilently) {
	if (getCurrentScope()) {
		onScopeDispose(fn, failSilently);
		return true;
	}
	return false;
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
/**
* On the basis of `inject`, it is allowed to directly call inject to obtain the value after call provide in the same component.
*
* @example
* ```ts
* injectLocal('MyInjectionKey', 1)
* const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
* ```
*
* @NO_SIDE_EFFECTS
*/
var injectLocal = /* @__NO_SIDE_EFFECTS__ */ (...args) => {
	var _getCurrentInstance;
	const key = args[0];
	const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
	const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
	if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
	if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
	return inject(...args);
};
/**
* On the basis of `provide`, it is allowed to directly call inject to obtain the value after call provide in the same component.
*
* @example
* ```ts
* provideLocal('MyInjectionKey', 1)
* const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
* ```
*/
function provideLocal(key, value) {
	var _getCurrentInstance;
	const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
	const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
	if (owner == null) throw new Error("provideLocal must be called in setup");
	if (!localProvidedStateMap.has(owner)) localProvidedStateMap.set(owner, Object.create(null));
	const localProvidedState = localProvidedStateMap.get(owner);
	localProvidedState[key] = value;
	return provide(key, value);
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {};
function toRef(...args) {
	if (args.length !== 1) return /* @__PURE__ */ toRef$1(...args);
	const r = args[0];
	return typeof r === "function" ? /* @__PURE__ */ readonly(customRef(() => ({
		get: r,
		set: noop
	}))) : /* @__PURE__ */ ref(r);
}
function createFilterWrapper(filter, fn) {
	function wrapper(...args) {
		return new Promise((resolve, reject) => {
			Promise.resolve(filter(() => fn.apply(this, args), {
				fn,
				thisArg: this,
				args
			})).then(resolve).catch(reject);
		});
	}
	if ("cancel" in filter) Object.assign(wrapper, {
		cancel: filter.cancel,
		flush: filter.flush,
		isPending: filter.isPending
	});
	return wrapper;
}
var bypassFilter = (invoke) => {
	return invoke();
};
/**
* Create an EventFilter that debounce the events
*/
function debounceFilter(ms, options = {}) {
	let timer;
	let maxTimer;
	let lastRejector = noop;
	let lastResolve = noop;
	const _pending = /* @__PURE__ */ shallowRef(false);
	const _clearTimeout = (timer) => {
		clearTimeout(timer);
		lastRejector();
		lastRejector = noop;
	};
	let lastInvoker;
	const handler = (invoke) => {
		const duration = toValue(ms);
		const maxDuration = toValue(options.maxWait);
		if (timer) _clearTimeout(timer);
		if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			return Promise.resolve(invoke());
		}
		_pending.value = true;
		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve;
			lastResolve = resolve;
			lastInvoker = invoke;
			if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
				if (timer) _clearTimeout(timer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(lastInvoker());
			}, maxDuration);
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(invoke());
			}, duration);
		});
	};
	return Object.assign(handler, {
		cancel: () => {
			if (timer) {
				_clearTimeout(timer);
				timer = void 0;
			}
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			lastResolve = noop;
		},
		flush: () => {
			if (_pending.value) {
				if (timer) {
					clearTimeout(timer);
					timer = void 0;
				}
				if (maxTimer) {
					clearTimeout(maxTimer);
					maxTimer = void 0;
				}
				_pending.value = false;
				const resolve = lastResolve;
				lastRejector = noop;
				lastResolve = noop;
				resolve(lastInvoker());
			}
		},
		isPending: /* @__PURE__ */ shallowReadonly(_pending)
	});
}
function throttleFilter(...args) {
	let lastExec = 0;
	let timer;
	let isLeading = true;
	let lastRejector = noop;
	let lastValue;
	let ms;
	let trailing;
	let leading;
	let rejectOnCancel;
	if (!/* @__PURE__ */ isRef(args[0]) && typeof args[0] === "object") ({delay: ms, trailing = true, leading = true, rejectOnCancel = false} = args[0]);
	else [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
			lastRejector();
			lastRejector = noop;
		}
	};
	const filter = (_invoke) => {
		const duration = toValue(ms);
		const elapsed = Date.now() - lastExec;
		const invoke = () => {
			return lastValue = _invoke();
		};
		clear();
		if (duration <= 0) {
			lastExec = Date.now();
			return invoke();
		}
		if (elapsed > duration) {
			lastExec = Date.now();
			if (leading || !isLeading) invoke();
		} else if (trailing) lastValue = new Promise((resolve, reject) => {
			lastRejector = rejectOnCancel ? reject : resolve;
			timer = setTimeout(() => {
				lastExec = Date.now();
				isLeading = true;
				resolve(invoke());
				clear();
			}, Math.max(0, duration - elapsed));
		});
		if (!leading && !timer) timer = setTimeout(() => isLeading = true, duration);
		isLeading = false;
		return lastValue;
	};
	return filter;
}
/**
* EventFilter that gives extra controls to pause and resume the filter
*
* @param extendFilter  Extra filter to apply when the PausableFilter is active, default to none
* @param options Options to configure the filter
*/
function pausableFilter(extendFilter = bypassFilter, options = {}) {
	const { initialState = "active" } = options;
	const isActive = toRef(initialState === "active");
	function pause() {
		isActive.value = false;
	}
	function resume() {
		isActive.value = true;
	}
	const eventFilter = (...args) => {
		if (isActive.value) extendFilter(...args);
	};
	return {
		isActive: /* @__PURE__ */ shallowReadonly(isActive),
		pause,
		resume,
		eventFilter
	};
}
/**
* Create singleton promise function
*
* @example
* ```
* const promise = createSingletonPromise(async () => { ... })
*
* await promise()
* await promise() // all of them will be bind to a single promise instance
* await promise() // and be resolved together
* ```
*/
function createSingletonPromise(fn) {
	let _promise;
	function wrapper() {
		if (!_promise) _promise = fn();
		return _promise;
	}
	wrapper.reset = async () => {
		const _prev = _promise;
		_promise = void 0;
		if (_prev) await _prev;
	};
	return wrapper;
}
/**
* Get a px value for SSR use, do not rely on this method outside of SSR as REM unit is assumed at 16px, which might not be the case on the client
*/
function pxValue(px) {
	return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
function getLifeCycleTarget(target) {
	return target || getCurrentInstance();
}
/**
* Debounce execution of a function.
*
* @see https://vueuse.org/useDebounceFn
* @param  fn          A function to be executed after delay milliseconds debounced.
* @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
* @param  options     Options
*
* @return A new, debounced, function with isPending, cancel, and flush properties.
*/
function useDebounceFn(fn, ms = 200, options = {}) {
	return createFilterWrapper(debounceFilter(ms, options), fn);
}
/**
* Throttle execution of a function. Especially useful for rate limiting
* execution of handlers on events like resize and scroll.
*
* @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
*                                    to `callback` when the throttled-function is executed.
* @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
*                                    (default value: 200)
*
* @param [trailing] if true, call fn again after the time is up (default value: true)
*
* @param [leading] if true, call fn on the leading edge of the ms timeout (default value: true)
*
* @param [rejectOnCancel] if true, reject the last call if it's been cancel (default value: false)
*
* @return  A new, throttled, function.
*
* @__NO_SIDE_EFFECTS__
*/
function useThrottleFn(fn, ms = 200, trailing = true, leading = true, rejectOnCancel = false) {
	return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function watchWithFilter(source, cb, options = {}) {
	const { eventFilter = bypassFilter, ...watchOptions } = options;
	return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
/** @deprecated Use Vue's built-in `watch` instead. This function will be removed in future version. */
function watchPausable(source, cb, options = {}) {
	const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
	const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
	return {
		stop: watchWithFilter(source, cb, {
			...watchOptions,
			eventFilter
		}),
		pause,
		resume,
		isActive
	};
}
/**
* Call onMounted() if it's inside a component lifecycle, if not, just call the function
*
* @param fn
* @param sync if set to false, it will run in the nextTick() of Vue
* @param target
*/
function tryOnMounted(fn, sync = true, target) {
	if (getLifeCycleTarget(target)) onMounted(fn, target);
	else if (sync) fn();
	else nextTick(fn);
}
/**
* Wrapper for `setTimeout` with controls.
*
* @param cb
* @param interval
* @param options
*/
function useTimeoutFn(cb, interval, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	const isPending = /* @__PURE__ */ shallowRef(false);
	let timer;
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
		}
	}
	function stop() {
		isPending.value = false;
		clear();
	}
	function start(...args) {
		if (immediateCallback) cb();
		clear();
		isPending.value = true;
		timer = setTimeout(() => {
			isPending.value = false;
			timer = void 0;
			cb(...args);
		}, toValue(interval));
	}
	if (immediate) {
		isPending.value = true;
		if (isClient) start();
	}
	tryOnScopeDispose(stop);
	return {
		isPending: /* @__PURE__ */ shallowReadonly(isPending),
		start,
		stop
	};
}
/**
* A boolean ref with a toggler
*
* @see https://vueuse.org/useToggle
* @param [initialValue]
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useToggle(initialValue = false, options = {}) {
	const { truthyValue = true, falsyValue = false } = options;
	const valueIsRef = /* @__PURE__ */ isRef(initialValue);
	const _value = /* @__PURE__ */ shallowRef(initialValue);
	function toggle(value) {
		if (arguments.length) {
			_value.value = value;
			return _value.value;
		} else {
			const truthy = toValue(truthyValue);
			_value.value = _value.value === truthy ? toValue(falsyValue) : truthy;
			return _value.value;
		}
	}
	if (valueIsRef) return toggle;
	else return [_value, toggle];
}
/**
* Shorthand for watching value with {immediate: true}
*
* @see https://vueuse.org/watchImmediate
*/
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}
//#endregion
//#region node_modules/@vueuse/core/dist/index.js
var defaultWindow = isClient ? window : void 0;
isClient && window.document;
var defaultNavigator = isClient ? window.navigator : void 0;
isClient && window.location;
/**
* Get the dom element of a ref of element or Vue component instance
*
* @param elRef
*/
function unrefElement(elRef) {
	var _$el;
	const plain = toValue(elRef);
	return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	return watchImmediate(() => {
		var _firstParamTargets$va, _firstParamTargets$va2;
		return [
			(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
			toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
		if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
		const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
		onCleanup(() => {
			cleanups.forEach((fn) => fn());
		});
	}, { flush: "post" });
}
/**
* Mounted state in ref.
*
* @see https://vueuse.org/useMounted
*
* @__NO_SIDE_EFFECTS__
*/
function useMounted() {
	const isMounted = /* @__PURE__ */ shallowRef(false);
	const instance = getCurrentInstance();
	if (instance) onMounted(() => {
		isMounted.value = true;
	}, instance);
	return isMounted;
}
/* @__NO_SIDE_EFFECTS__ */
function useSupported(callback) {
	const isMounted = useMounted();
	return computed(() => {
		isMounted.value;
		return Boolean(callback());
	});
}
/**
* Watch for changes being made to the DOM tree.
*
* @see https://vueuse.org/useMutationObserver
* @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
* @param target
* @param callback
* @param options
*/
function useMutationObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...mutationOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "MutationObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const items = toArray(toValue(target)).map(unrefElement).filter(notNullish);
		return new Set(items);
	}), (newTargets) => {
		cleanup();
		if (isSupported.value && newTargets.size) {
			observer = new MutationObserver(callback);
			newTargets.forEach((el) => observer.observe(el, mutationOptions));
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const takeRecords = () => {
		return observer === null || observer === void 0 ? void 0 : observer.takeRecords();
	};
	const stop = () => {
		stopWatch();
		cleanup();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop,
		takeRecords
	};
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function useSSRWidth() {
	const ssrWidth = hasInjectionContext() ? /* @__PURE__ */ injectLocal(ssrWidthSymbol, null) : null;
	return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
/**
* Reactive Media Query.
*
* @see https://vueuse.org/useMediaQuery
* @param query
* @param options
*/
function useMediaQuery(query, options = {}) {
	const { window = defaultWindow, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "matchMedia" in window && typeof window.matchMedia === "function");
	const ssrSupport = /* @__PURE__ */ shallowRef(typeof ssrWidth === "number");
	const mediaQuery = /* @__PURE__ */ shallowRef();
	const matches = /* @__PURE__ */ shallowRef(false);
	const handler = (event) => {
		matches.value = event.matches;
	};
	watchEffect(() => {
		if (ssrSupport.value) {
			ssrSupport.value = !isSupported.value;
			const queryStrings = toValue(query).split(",");
			matches.value = queryStrings.some((queryString) => {
				const not = queryString.includes("not all");
				const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				let res = Boolean(minWidth || maxWidth);
				if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
				if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
				return not ? !res : res;
			});
			return;
		}
		if (!isSupported.value) return;
		mediaQuery.value = window.matchMedia(toValue(query));
		matches.value = mediaQuery.value.matches;
	});
	useEventListener(mediaQuery, "change", handler, { passive: true });
	return computed(() => matches.value);
}
/* @__NO_SIDE_EFFECTS__ */
function usePermission(permissionDesc, options = {}) {
	const { controls = false, navigator = defaultNavigator } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => navigator && "permissions" in navigator);
	const permissionStatus = /* @__PURE__ */ shallowRef();
	const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
	const state = /* @__PURE__ */ shallowRef();
	const update = () => {
		var _permissionStatus$val, _permissionStatus$val2;
		state.value = (_permissionStatus$val = (_permissionStatus$val2 = permissionStatus.value) === null || _permissionStatus$val2 === void 0 ? void 0 : _permissionStatus$val2.state) !== null && _permissionStatus$val !== void 0 ? _permissionStatus$val : "prompt";
	};
	useEventListener(permissionStatus, "change", update, { passive: true });
	const query = createSingletonPromise(async () => {
		if (!isSupported.value) return;
		if (!permissionStatus.value) try {
			permissionStatus.value = await navigator.permissions.query(desc);
		} catch (_unused) {
			permissionStatus.value = void 0;
		} finally {
			update();
		}
		if (controls) return /* @__PURE__ */ toRaw(permissionStatus.value);
	});
	query();
	if (controls) return {
		state,
		isSupported,
		query
	};
	else return state;
}
/* @__NO_SIDE_EFFECTS__ */
function useClipboard(options = {}) {
	const { navigator = defaultNavigator, read = false, source, copiedDuring = 1500, legacy = false } = options;
	const isClipboardApiSupported = /* @__PURE__ */ useSupported(() => navigator && "clipboard" in navigator);
	const permissionRead = /* @__PURE__ */ usePermission("clipboard-read");
	const permissionWrite = /* @__PURE__ */ usePermission("clipboard-write");
	const isSupported = computed(() => isClipboardApiSupported.value || legacy);
	const text = /* @__PURE__ */ shallowRef("");
	const copied = /* @__PURE__ */ shallowRef(false);
	const copyPending = /* @__PURE__ */ shallowRef(false);
	const timeout = useTimeoutFn(() => copied.value = false, copiedDuring, { immediate: false });
	let lastLegacyId = 0;
	async function updateText() {
		let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionRead.value));
		if (!useLegacy) try {
			text.value = await navigator.clipboard.readText();
		} catch (_unused) {
			useLegacy = true;
		}
		if (useLegacy) text.value = legacyRead();
	}
	if (isSupported.value && read) useEventListener(["copy", "cut"], updateText, { passive: true });
	async function copy(value) {
		const resolvedValue = value !== null && value !== void 0 ? value : toValue(source);
		if (isSupported.value && resolvedValue != null) {
			copyPending.value = true;
			let useLegacy = !(isClipboardApiSupported.value && isAllowed(permissionWrite.value));
			if (!useLegacy) try {
				const clipboardItem = createClipboardItem(resolvedValue);
				await navigator.clipboard.write([clipboardItem]);
			} catch (_unused2) {
				useLegacy = true;
			}
			if (useLegacy) {
				if (typeof resolvedValue === "string") {
					text.value = resolvedValue;
					legacyCopy(resolvedValue);
				} else {
					const currentId = ++lastLegacyId;
					const resolvedText = await resolvedValue();
					if (resolvedText != null && currentId === lastLegacyId) {
						text.value = resolvedText;
						legacyCopy(resolvedText);
					}
				}
			}
			copied.value = true;
			timeout.start();
			copyPending.value = false;
		}
	}
	function createClipboardItem(value) {
		if (typeof value === "string") {
			text.value = value;
			return new ClipboardItem({ "text/plain": value });
		} else return new ClipboardItem({ "text/plain": value().then((resolvedText = "") => {
			text.value = resolvedText;
			return new Blob([resolvedText], { type: "text/plain" });
		}) });
	}
	function legacyCopy(value) {
		const ta = document.createElement("textarea");
		ta.value = value;
		ta.style.position = "absolute";
		ta.style.opacity = "0";
		ta.setAttribute("readonly", "");
		document.body.appendChild(ta);
		ta.select();
		document.execCommand("copy");
		ta.remove();
	}
	function legacyRead() {
		var _document$getSelectio, _document, _document$getSelectio2;
		return (_document$getSelectio = (_document = document) === null || _document === void 0 || (_document$getSelectio2 = _document.getSelection) === null || _document$getSelectio2 === void 0 || (_document$getSelectio2 = _document$getSelectio2.call(_document)) === null || _document$getSelectio2 === void 0 ? void 0 : _document$getSelectio2.toString()) !== null && _document$getSelectio !== void 0 ? _document$getSelectio : "";
	}
	function isAllowed(status) {
		return status === "granted" || status === "prompt";
	}
	return {
		copyPending: /* @__PURE__ */ shallowReadonly(copyPending),
		isSupported,
		text: /* @__PURE__ */ shallowReadonly(text),
		copied: /* @__PURE__ */ shallowReadonly(copied),
		copy
	};
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = /* #__PURE__ */ getHandlers();
function getHandlers() {
	if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
	return _global[globalKey];
}
function getSSRHandler(key, fallback) {
	return handlers[key] || fallback;
}
/**
* Reactive dark theme preference.
*
* @see https://vueuse.org/usePreferredDark
* @param [options]
*
* @__NO_SIDE_EFFECTS__
*/
function usePreferredDark(options) {
	return useMediaQuery("(prefers-color-scheme: dark)", options);
}
function guessSerializerType(rawInit) {
	return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
	boolean: {
		read: (v) => v === "true",
		write: (v) => String(v)
	},
	object: {
		read: (v) => JSON.parse(v),
		write: (v) => JSON.stringify(v)
	},
	number: {
		read: (v) => Number.parseFloat(v),
		write: (v) => String(v)
	},
	any: {
		read: (v) => v,
		write: (v) => String(v)
	},
	string: {
		read: (v) => v,
		write: (v) => String(v)
	},
	map: {
		read: (v) => new Map(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v.entries()))
	},
	set: {
		read: (v) => new Set(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v))
	},
	date: {
		read: (v) => new Date(v),
		write: (v) => v.toISOString()
	}
};
var customStorageEventName = "vueuse-storage";
/**
* Reactive LocalStorage/SessionStorage.
*
* @see https://vueuse.org/useStorage
*/
function useStorage(key, defaults, storage, options = {}) {
	var _options$serializer;
	const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window = defaultWindow, eventFilter, onError = (e) => {
		console.error(e);
	}, initOnMounted } = options;
	const data = (shallow ? shallowRef : ref)(typeof defaults === "function" ? defaults() : defaults);
	const keyComputed = computed(() => toValue(key));
	if (!storage) try {
		storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
	} catch (e) {
		onError(e);
	}
	if (!storage) return data;
	const rawInit = toValue(defaults);
	const type = guessSerializerType(rawInit);
	const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
	const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
		flush,
		deep,
		eventFilter
	});
	watch(keyComputed, () => update(), { flush });
	let firstMounted = false;
	const onStorageEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		update(ev);
	};
	const onStorageCustomEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		updateFromCustomEvent(ev);
	};
	/**
	* The custom event is needed for same-document syncing when using custom
	* storage backends, but it doesn't work across different documents.
	*
	* TODO: Consider implementing a BroadcastChannel-based solution that fixes this.
	*/
	if (window && listenToStorageChanges) {
		if (storage instanceof Storage) useEventListener(window, "storage", onStorageEvent, { passive: true });
		else useEventListener(window, customStorageEventName, onStorageCustomEvent);
	}
	if (initOnMounted) tryOnMounted(() => {
		firstMounted = true;
		update();
	});
	else update();
	function dispatchWriteEvent(oldValue, newValue) {
		if (window) {
			const payload = {
				key: keyComputed.value,
				oldValue,
				newValue,
				storageArea: storage
			};
			window.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
		}
	}
	function write(v) {
		try {
			const oldValue = storage.getItem(keyComputed.value);
			if (v == null) {
				dispatchWriteEvent(oldValue, null);
				storage.removeItem(keyComputed.value);
			} else {
				const serialized = serializer.write(v);
				if (oldValue !== serialized) {
					storage.setItem(keyComputed.value, serialized);
					dispatchWriteEvent(oldValue, serialized);
				}
			}
		} catch (e) {
			onError(e);
		}
	}
	function read(event) {
		const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
		if (rawValue == null) {
			if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
			return rawInit;
		} else if (!event && mergeDefaults) {
			const value = serializer.read(rawValue);
			if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
			else if (type === "object" && !Array.isArray(value)) return {
				...rawInit,
				...value
			};
			return value;
		} else if (typeof rawValue !== "string") return rawValue;
		else return serializer.read(rawValue);
	}
	function update(event) {
		if (event && event.storageArea !== storage) return;
		if (event && event.key == null) {
			data.value = rawInit;
			return;
		}
		if (event && event.key !== keyComputed.value) return;
		pauseWatch();
		try {
			const serializedData = serializer.write(data.value);
			if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
		} catch (e) {
			onError(e);
		} finally {
			if (event) nextTick(resumeWatch);
			else resumeWatch();
		}
	}
	function updateFromCustomEvent(event) {
		update(event.detail);
	}
	return data;
}
/**
* Reports changes to the dimensions of an Element's content or the border-box
*
* @see https://vueuse.org/useResizeObserver
* @param target
* @param callback
* @param options
*/
function useResizeObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...observerOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "ResizeObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const _targets = toValue(target);
		return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
	}), (els) => {
		cleanup();
		if (isSupported.value && window) {
			observer = new ResizeObserver(callback);
			for (const _el of els) if (_el instanceof Element) observer.observe(_el, observerOptions);
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const stop = () => {
		cleanup();
		stopWatch();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop
	};
}
/**
* Reactive size of an HTML element.
*
* @see https://vueuse.org/useElementSize
*/
function useElementSize(target, initialSize = {
	width: 0,
	height: 0
}, options = {}) {
	const { window = defaultWindow, box = "content-box" } = options;
	const isSVG = computed(() => {
		var _unrefElement;
		return (_unrefElement = unrefElement(target)) === null || _unrefElement === void 0 || (_unrefElement = _unrefElement.namespaceURI) === null || _unrefElement === void 0 ? void 0 : _unrefElement.includes("svg");
	});
	const width = /* @__PURE__ */ shallowRef(initialSize.width);
	const height = /* @__PURE__ */ shallowRef(initialSize.height);
	const { stop: stop1 } = useResizeObserver(target, ([entry]) => {
		const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
		if (window && isSVG.value) {
			const $elem = unrefElement(target);
			if ($elem) {
				const rect = $elem.getBoundingClientRect();
				width.value = rect.width;
				height.value = rect.height;
			}
		} else if (boxSize) {
			const formatBoxSize = toArray(boxSize);
			width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
			height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
		} else {
			width.value = entry.contentRect.width;
			height.value = entry.contentRect.height;
		}
	}, options);
	tryOnMounted(() => {
		const ele = unrefElement(target);
		if (ele && "offsetWidth" in ele) {
			if (box === "content-box" && window) {
				const cs = window.getComputedStyle(ele);
				const padX = Number.parseFloat(cs.paddingLeft) + Number.parseFloat(cs.paddingRight);
				const padY = Number.parseFloat(cs.paddingTop) + Number.parseFloat(cs.paddingBottom);
				const bdX = Number.parseFloat(cs.borderLeftWidth) + Number.parseFloat(cs.borderRightWidth);
				const bdY = Number.parseFloat(cs.borderTopWidth) + Number.parseFloat(cs.borderBottomWidth);
				width.value = ele.offsetWidth - padX - bdX;
				height.value = ele.offsetHeight - padY - bdY;
			} else {
				width.value = ele.offsetWidth;
				height.value = ele.offsetHeight;
			}
		} else if (ele) {
			width.value = initialSize.width;
			height.value = initialSize.height;
		}
	});
	const stop2 = watch(() => unrefElement(target), (ele) => {
		width.value = ele ? initialSize.width : 0;
		height.value = ele ? initialSize.height : 0;
	});
	function stop() {
		stop1();
		stop2();
	}
	return {
		width,
		height,
		stop
	};
}
/**
* We have to check if the scroll amount is close enough to some threshold in order to
* more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
* numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
* https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
*/
var ARRIVED_STATE_THRESHOLD_PIXELS = 1;
/**
* Reactive scroll.
*
* @see https://vueuse.org/useScroll
* @param element
* @param options
*/
function useScroll(element, options = {}) {
	const { throttle = 0, idle = 200, onStop = noop, onScroll = noop, offset = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, observe: _observe = { mutation: false }, eventListenerOptions = {
		capture: false,
		passive: true
	}, behavior = "auto", window = defaultWindow, onError = (e) => {
		console.error(e);
	} } = options;
	const observe = typeof _observe === "boolean" ? { mutation: _observe } : _observe;
	const internalX = /* @__PURE__ */ shallowRef(0);
	const internalY = /* @__PURE__ */ shallowRef(0);
	const x = computed({
		get() {
			return internalX.value;
		},
		set(x) {
			scrollTo(x, void 0);
		}
	});
	const y = computed({
		get() {
			return internalY.value;
		},
		set(y) {
			scrollTo(void 0, y);
		}
	});
	function scrollTo(_x, _y) {
		var _ref, _toValue, _toValue2, _document;
		if (!window) return;
		const _element = toValue(element);
		if (!_element) return;
		(_ref = _element instanceof Document ? window.document.body : _element) === null || _ref === void 0 || _ref.scrollTo({
			top: (_toValue = toValue(_y)) !== null && _toValue !== void 0 ? _toValue : y.value,
			left: (_toValue2 = toValue(_x)) !== null && _toValue2 !== void 0 ? _toValue2 : x.value,
			behavior: toValue(behavior)
		});
		const scrollContainer = (_element === null || _element === void 0 || (_document = _element.document) === null || _document === void 0 ? void 0 : _document.documentElement) || (_element === null || _element === void 0 ? void 0 : _element.documentElement) || _element;
		if (x != null) internalX.value = scrollContainer.scrollLeft;
		if (y != null) internalY.value = scrollContainer.scrollTop;
	}
	const isScrolling = /* @__PURE__ */ shallowRef(false);
	const arrivedState = /* @__PURE__ */ reactive({
		left: true,
		right: false,
		top: true,
		bottom: false
	});
	const directions = /* @__PURE__ */ reactive({
		left: false,
		right: false,
		top: false,
		bottom: false
	});
	const onScrollEnd = (e) => {
		if (!isScrolling.value) return;
		isScrolling.value = false;
		directions.left = false;
		directions.right = false;
		directions.top = false;
		directions.bottom = false;
		onStop(e);
	};
	const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle);
	const setArrivedState = (target) => {
		var _document2;
		if (!window) return;
		const el = (target === null || target === void 0 || (_document2 = target.document) === null || _document2 === void 0 ? void 0 : _document2.documentElement) || (target === null || target === void 0 ? void 0 : target.documentElement) || unrefElement(target);
		const { display, flexDirection, direction } = window.getComputedStyle(el);
		const directionMultipler = direction === "rtl" ? -1 : 1;
		const scrollLeft = el.scrollLeft;
		directions.left = scrollLeft < internalX.value;
		directions.right = scrollLeft > internalX.value;
		const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
		const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		if (display === "flex" && flexDirection === "row-reverse") {
			arrivedState.left = right;
			arrivedState.right = left;
		} else {
			arrivedState.left = left;
			arrivedState.right = right;
		}
		internalX.value = scrollLeft;
		let scrollTop = el.scrollTop;
		if (target === window.document && !scrollTop) scrollTop = window.document.body.scrollTop;
		directions.top = scrollTop < internalY.value;
		directions.bottom = scrollTop > internalY.value;
		const top = Math.abs(scrollTop) <= (offset.top || 0);
		const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		/**
		* reverse columns and rows behave exactly the other way around,
		* bottom is treated as top and top is treated as the negative version of bottom
		*/
		if (display === "flex" && flexDirection === "column-reverse") {
			arrivedState.top = bottom;
			arrivedState.bottom = top;
		} else {
			arrivedState.top = top;
			arrivedState.bottom = bottom;
		}
		internalY.value = scrollTop;
	};
	const onScrollHandler = (e) => {
		var _documentElement;
		if (!window) return;
		const eventTarget = (_documentElement = e.target.documentElement) !== null && _documentElement !== void 0 ? _documentElement : e.target;
		setArrivedState(eventTarget);
		isScrolling.value = true;
		onScrollEndDebounced(e);
		onScroll(e);
	};
	useEventListener(element, "scroll", throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler, eventListenerOptions);
	tryOnMounted(() => {
		try {
			const _element = toValue(element);
			if (!_element) return;
			setArrivedState(_element);
		} catch (e) {
			onError(e);
		}
	});
	if ((observe === null || observe === void 0 ? void 0 : observe.mutation) && element != null && element !== window && element !== document) useMutationObserver(element, () => {
		const _element = toValue(element);
		if (!_element) return;
		setArrivedState(_element);
	}, {
		attributes: true,
		childList: true,
		subtree: true
	});
	useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
	return {
		x,
		y,
		isScrolling,
		arrivedState,
		directions,
		measure() {
			const _element = toValue(element);
			if (window && _element) setArrivedState(_element);
		}
	};
}
/**
* Reactive window scroll.
*
* @see https://vueuse.org/useWindowScroll
* @param options
*/
function useWindowScroll(options = {}) {
	const { window = defaultWindow, ...rest } = options;
	return useScroll(window, rest);
}
/**
* Reactive window size.
*
* @see https://vueuse.org/useWindowSize
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useWindowSize(options = {}) {
	const { window = defaultWindow, initialWidth = Number.POSITIVE_INFINITY, initialHeight = Number.POSITIVE_INFINITY, listenOrientation = true, includeScrollbar = true, type = "inner" } = options;
	const width = /* @__PURE__ */ shallowRef(initialWidth);
	const height = /* @__PURE__ */ shallowRef(initialHeight);
	const update = () => {
		if (window) {
			if (type === "outer") {
				width.value = window.outerWidth;
				height.value = window.outerHeight;
			} else if (type === "visual" && window.visualViewport) {
				const { width: visualViewportWidth, height: visualViewportHeight, scale } = window.visualViewport;
				width.value = Math.round(visualViewportWidth * scale);
				height.value = Math.round(visualViewportHeight * scale);
			} else if (includeScrollbar) {
				width.value = window.innerWidth;
				height.value = window.innerHeight;
			} else {
				width.value = window.document.documentElement.clientWidth;
				height.value = window.document.documentElement.clientHeight;
			}
		}
	};
	update();
	tryOnMounted(update);
	const listenerOptions = { passive: true };
	useEventListener("resize", update, listenerOptions);
	if (window && type === "visual" && window.visualViewport) useEventListener(window.visualViewport, "resize", update, listenerOptions);
	if (listenOrientation) watch(useMediaQuery("(orientation: portrait)"), () => update());
	return {
		width,
		height
	};
}
//#endregion
//#region node_modules/@vuepress/client/dist/rolldown-runtime-D7D4PA-g.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@vuepress/client/dist/constants-CWVu3aBh.js
var constants_exports = /* @__PURE__ */ __exportAll({
	COMPONENT_STATE_TYPE: () => COMPONENT_STATE_TYPE,
	INSPECTOR_ID: () => INSPECTOR_ID,
	INSPECTOR_LABEL: () => INSPECTOR_LABEL,
	INSPECTOR_NODES: () => INSPECTOR_NODES,
	INSPECTOR_STATE_SECTION_NAME: () => INSPECTOR_STATE_SECTION_NAME,
	PLUGIN_ID: () => PLUGIN_ID,
	PLUGIN_LABEL: () => PLUGIN_LABEL
});
var PLUGIN_ID = "org.vuejs.vuepress";
var PLUGIN_LABEL = "VuePress";
var COMPONENT_STATE_TYPE = PLUGIN_LABEL;
var INSPECTOR_ID = PLUGIN_ID;
var INSPECTOR_LABEL = PLUGIN_LABEL;
var INSPECTOR_NODE_INTERNAL = {
	id: "INTERNAL",
	label: "Internal",
	keys: [
		"layouts",
		"routes",
		"redirects"
	]
};
var INSPECTOR_NODE_SITE = {
	id: "SITE",
	label: "Site",
	keys: ["siteData", "siteLocaleData"]
};
var INSPECTOR_NODE_ROUTE = {
	id: "ROUTE",
	label: "Route",
	keys: ["routePath", "routeLocale"]
};
var INSPECTOR_NODE_PAGE = {
	id: "PAGE",
	label: "Page",
	keys: [
		"pageData",
		"pageFrontmatter",
		"pageLang",
		"pageHead",
		"pageHeadTitle",
		"pageLayout",
		"pageComponent"
	]
};
var INSPECTOR_NODES = {
	[INSPECTOR_NODE_INTERNAL.id]: INSPECTOR_NODE_INTERNAL,
	[INSPECTOR_NODE_SITE.id]: INSPECTOR_NODE_SITE,
	[INSPECTOR_NODE_ROUTE.id]: INSPECTOR_NODE_ROUTE,
	[INSPECTOR_NODE_PAGE.id]: INSPECTOR_NODE_PAGE
};
var INSPECTOR_STATE_SECTION_NAME = "State";
//#endregion
//#region node_modules/@vuepress/client/dist/index.js
/**
* A helper function to help you define vuepress client config file
*/
var defineClientConfig = (clientConfig = {}) => clientConfig;
//#endregion
//#region node_modules/@vuepress/plugin-active-header-links/dist/useActiveHeaderLinks-Cj1jzYVL.js
var r$7 = async (e, t) => {
	let { path: n, query: r } = e.currentRoute.value, { scrollBehavior: i } = e.options;
	e.options.scrollBehavior = void 0, await e.replace({
		path: n,
		query: r,
		hash: t
	}), e.options.scrollBehavior = i;
};
var i$8 = ({ headerLinkSelector: i, headerAnchorSelector: a, delay: o, offset: s = 5 }) => {
	let c = useRouter();
	useEventListener(`scroll`, useDebounceFn(() => {
		let e = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop);
		if (Math.abs(e) < s) {
			r$7(c, ``);
			return;
		}
		let t = window.innerHeight + e, n = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), o = Math.abs(n - t) < s, l = [...document.querySelectorAll(i)], u = [...document.querySelectorAll(a)].filter((e) => l.some((t) => t.hash === e.hash));
		for (let t = 0; t < u.length; t++) {
			let n = u[t], i = u[t + 1], a = e >= (n.parentElement?.offsetTop ?? 0) - s, l = !i || e < (i.parentElement?.offsetTop ?? 0) - s;
			if (!(a && l)) continue;
			let d = decodeURIComponent(c.currentRoute.value.hash), f = decodeURIComponent(n.hash);
			if (d === f) return;
			if (o) {
				for (let e = t + 1; e < u.length; e++) if (d === decodeURIComponent(u[e].hash)) return;
			}
			r$7(c, f);
			return;
		}
	}, o));
};
//#endregion
//#region node_modules/@vuepress/plugin-active-header-links/dist/client/config.js
var config_exports$10 = /* @__PURE__ */ __exportAll$1({ default: () => o$6 });
var n$7 = "a.vp-sidebar-item";
var r$6 = ".header-anchor";
var i$7 = 300;
var a$5 = 5;
var o$6 = defineClientConfig({ setup() {
	i$8({
		headerLinkSelector: n$7,
		headerAnchorSelector: r$6,
		delay: i$7,
		offset: a$5
	});
} });
//#endregion
//#region node_modules/fflate/esm/browser.js
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0,
	0,
	0,
	0
]);
var fdeb = new u8([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13,
	0,
	0
]);
new u8([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]);
var freb = function(eb, start) {
	var b = new u16(31);
	for (var i = 0; i < 31; ++i) b[i] = start += 1 << eb[i - 1];
	var r = new i32(b[30]);
	for (var i = 1; i < 30; ++i) for (var j = b[i]; j < b[i + 1]; ++j) r[j] = j - b[i] << 5 | i;
	return {
		b,
		r
	};
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
_b.b;
_b.r;
var rev = new u16(32768);
for (var i$6 = 0; i$6 < 32768; ++i$6) {
	var x$2 = (i$6 & 43690) >> 1 | (i$6 & 21845) << 1;
	x$2 = (x$2 & 52428) >> 2 | (x$2 & 13107) << 2;
	x$2 = (x$2 & 61680) >> 4 | (x$2 & 3855) << 4;
	rev[i$6] = ((x$2 & 65280) >> 8 | (x$2 & 255) << 8) >> 1;
}
var flt = new u8(288);
for (var i$6 = 0; i$6 < 144; ++i$6) flt[i$6] = 8;
for (var i$6 = 144; i$6 < 256; ++i$6) flt[i$6] = 9;
for (var i$6 = 256; i$6 < 280; ++i$6) flt[i$6] = 7;
for (var i$6 = 280; i$6 < 288; ++i$6) flt[i$6] = 8;
var fdt = new u8(32);
for (var i$6 = 0; i$6 < 32; ++i$6) fdt[i$6] = 5;
var et = /*#__PURE__*/ new u8(0);
var td = typeof TextDecoder != "undefined" && /*#__PURE__*/ new TextDecoder();
try {
	td.decode(et, { stream: true });
} catch (e) {}
var y$1 = (e) => e !== void 0, w = (e, t) => isString$1(e) && e.startsWith(t), { entries: E } = Object, { fromEntries: D } = Object, O = (e) => Object.keys(e), { values: k } = Object, N = (e) => w(e, `/`) && e[1] !== `/`, P = (e) => !isLinkExternal(e) && !isLinkWithProtocol(e), F = /#.*$/u, I = (e, t = !1) => (t ? e.replace(F, ``) : e).replace(/\/(?:README\.md)?$/iu, `/index.html`).replace(/(?:\.(?:md|html))?$/iu, `.html`);
//#endregion
//#region node_modules/@vuepress/helper/dist/client/index.js
var M = (e) => {
	let t = e.replaceAll(`<br>`, `<br />`).replaceAll(`%`, `%25`).replaceAll(`"`, `%22`).replaceAll(`'`, `%27`).replaceAll(`&`, `%26`).replaceAll(`#`, `%23`).replaceAll(`{`, `%7B`).replaceAll(`}`, `%7D`).replaceAll(`<`, `%3C`).replaceAll(`>`, `%3E`);
	return e.includes(`xmlns`) || (t = t.replace(`<svg`, `<svg xmlns="http://www.w3.org/2000/svg"`)), `data:image/svg+xml;charset=utf8,${t}`;
};
var z = () => document.documentElement.dataset.theme === `dark`;
var B = Array.from({ length: 6 }, (e, t) => `[vp-content] h${t + 1}`).join(`,`);
var V = (e, t = 2) => {
	if (t === !1) return [];
	let [n, r] = typeof t == `number` ? [t, t] : t === `deep` ? [2, 6] : t, i = e.filter((e) => e.level >= n && e.level <= r), a = [];
	outer: for (let e = 0; e < i.length; e++) {
		let t = i[e];
		if (e !== 0) for (let n = e - 1; n >= 0; n--) {
			let e = i[n];
			if (e.level < t.level) {
				e.children.push(t);
				continue outer;
			}
		}
		a.push(t);
	}
	return a;
};
var ye = (e, t = []) => {
	let n;
	if (t.length > 0) {
		let r = e.cloneNode(!0);
		r.querySelectorAll(t.join(`,`)).forEach((e) => {
			e.remove();
		}), n = r.textContent || ``;
	} else n = e.textContent || ``;
	return n.trim();
};
var H = (e = B, t = []) => [...document.querySelectorAll(e)].filter((e) => e.id && e.hasChildNodes()).map((e) => ({
	element: e,
	title: ye(e, t),
	link: `#${e.id}`,
	slug: e.id,
	level: Number(e.tagName[1]),
	children: []
}));
var U = ({ selector: e = B, levels: t = 2, ignore: n = [] } = {}) => V(H(e, n), t);
var xe = (e, t) => {
	let n = (t?._instance ?? getCurrentInstance())?.appContext.components;
	return n ? e in n || camelize$1(e) in n || capitalize(camelize$1(e)) in n : !1;
};
var q = `message-container`;
var Se = class e {
	elements;
	constructor() {
		this.elements = {};
	}
	static get containerElement() {
		let e = document.querySelector(`#${q}`);
		return e || (e = document.createElement(`div`), e.id = q, document.body.append(e), e);
	}
	getElement(e) {
		return this.elements[e];
	}
	pop(t, n = 2e3, r = !0) {
		let i = Date.now(), a = document.createElement(`div`);
		return a.className = `message-item move-in`, a.innerHTML = t, e.containerElement.append(a), this.elements[i] = a, r && a.addEventListener(`click`, () => {
			this.close(i);
		}), n > 0 && setTimeout(() => {
			this.close(i);
		}, n), i;
	}
	close(e) {
		if (e == null) O(this.elements).forEach((e) => {
			this.close(Number(e));
		});
		else {
			let t = this.elements[e];
			t.classList.remove(`move-in`), t.classList.add(`move-out`), t.addEventListener(`animationend`, () => {
				t.remove(), delete this.elements[e];
			});
		}
	}
	destroy() {
		document.querySelector(`#${q}`)?.remove(), this.elements = {};
	}
};
var J = (e) => typeof e == `number` ? `${e}px` : e;
var Y = ({ size: e = 48, stroke: t = 4, wrapper: n = !0, height: r = 2 * e }) => {
	let a = h$1(`span`, { style: `\
--loading-icon: url("${M(`<svg preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="${t}" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg>`)}");\
--icon-size: ${J(e)};\
display: inline-block;\
width: var(--icon-size);\
height: var(--icon-size);\
background-color: currentcolor;\
-webkit-mask-image: var(--loading-icon);\
mask-image: var(--loading-icon)\
` });
	return n ? h$1(`div`, { style: `\
display: flex;\
align-items: center;\
justify-content: center;\
height: ${J(r)}\
` }, a) : a;
};
Y.displayName = `LoadingIcon`;
var we = /* @__PURE__ */ defineComponent({
	name: `FadeInExpandTransition`,
	props: {
		group: Boolean,
		appear: Boolean,
		width: Boolean,
		mode: String,
		onLeave: Function,
		onAfterLeave: Function,
		onAfterEnter: Function
	},
	setup(e, { slots: t }) {
		let n = (t) => {
			t.style[e.width ? `maxWidth` : `maxHeight`] = `${t.offsetHeight}px`, t.offsetWidth;
		}, r = (t) => {
			t.style[e.width ? `maxWidth` : `maxHeight`] = `0`, t.offsetWidth, e.onLeave?.();
		}, i = (t) => {
			t.style[e.width ? `maxWidth` : `maxHeight`] = ``, e.onAfterLeave?.();
		}, a = (t) => {
			if (t.style.transition = `none`, e.width) {
				let e = t.offsetWidth;
				t.style.maxWidth = `0`, t.offsetWidth, t.style.transition = ``, t.style.maxWidth = `${e}px`;
			} else {
				let e = t.offsetHeight;
				t.style.maxHeight = `0`, t.offsetWidth, t.style.transition = ``, t.style.maxHeight = `${e}px`;
			}
			t.offsetWidth;
		}, o = (t) => {
			t.style[e.width ? `maxWidth` : `maxHeight`] = ``, e.onAfterEnter?.();
		};
		return () => h$1(e.group ? TransitionGroup : Transition, {
			name: e.width ? `fade-in-width-expand` : `fade-in-height-expand`,
			appear: e.appear,
			onEnter: a,
			onAfterEnter: o,
			onBeforeLeave: n,
			onLeave: r,
			onAfterLeave: i,
			...e.group ? void 0 : { mode: e.mode }
		}, t);
	}
});
var Z = Symbol(``);
var Q = /* @__PURE__ */ ref(!1);
typeof document < `u` && (Q.value = z(), new MutationObserver(() => {
	Q.value = z();
}).observe(document.documentElement, {
	attributeFilter: [`data-theme`],
	attributes: !0
}));
var $ = (e) => {
	let t = useRouteLocale();
	return computed(() => {
		let n = toValue(e);
		return n[t.value] ?? n[`/`] ?? Object.values(n)[0];
	});
};
var De = $;
var ke = () => {
	let e = useRoutes();
	return computed(() => Object.keys(e.value));
};
//#endregion
//#region node_modules/@vuepress/plugin-back-to-top/dist/BackToTop-CJ-V9Qgf.js
var d$5 = /* @__PURE__ */ defineComponent({
	name: `BackToTop`,
	setup() {
		let s = useFrontmatter(), d = De({ "/": { "backToTop": "Back to top" } }), f = /* @__PURE__ */ shallowRef(), { height: p } = useElementSize(f), { height: m } = useWindowSize(), { y: h } = useWindowScroll(), g = computed(() => (s.value.backToTop ?? !0) && h.value > 100), _ = computed(() => h.value / (p.value - m.value) * 100);
		return onMounted(() => {
			f.value = document.body;
		}), () => h$1(Transition, { name: `fade-in` }, () => g.value ? h$1(`button`, {
			type: `button`,
			class: `vp-back-to-top-button`,
			"aria-label": d.value.backToTop,
			onClick: () => {
				window.scrollTo({
					top: 0,
					behavior: `smooth`
				});
			}
		}, [h$1(`span`, {
			class: `vp-scroll-progress`,
			role: `progressbar`,
			"aria-labelledby": `loadinglabel`,
			"aria-valuenow": _.value
		}, h$1(`svg`, h$1(`circle`, {
			cx: `26`,
			cy: `26`,
			r: `24`,
			fill: `none`,
			stroke: `currentColor`,
			"stroke-width": `4`,
			"stroke-dasharray": `${Math.PI * _.value * .48} ${Math.PI * (100 - _.value) * .48}`
		}))), h$1(`div`, { class: `back-to-top-icon` })]) : null);
	}
});
//#endregion
//#region node_modules/@vuepress/plugin-back-to-top/dist/client/config.js
var config_exports$9 = /* @__PURE__ */ __exportAll$1({ default: () => n$6 });
var n$6 = defineClientConfig({ rootComponents: [d$5] });
//#endregion
//#region node_modules/@vuepress/plugin-copy-code/dist/copyCode-BaV1UMP3.js
var o$5 = /* @__PURE__ */ ref({});
var s$7 = (e, t = ``) => Array.isArray(e) ? e.join(`,`) : e ?? t;
var c$7 = (e) => Array.isArray(e) ? e.join(`,`) : typeof e == `string` ? e : e ? `[vp-content] :not(pre) > code` : ``;
var u$5 = (e) => computed(() => {
	let t = toValue(e), n = o$5.value, r = n.inline ?? t.inline;
	return {
		selector: s$7(n.selector ?? t.selector, `[vp-content] div[class*="language-"] pre`),
		ignoreSelector: s$7(n.ignoreSelector ?? t.ignoreSelector),
		inlineSelector: c$7(r),
		duration: n.duration ?? t.duration ?? 2e3,
		showInMobile: n.showInMobile ?? t.showInMobile ?? !1,
		transform: n.transform ?? t.transform
	};
});
//#endregion
//#region node_modules/@vuepress/plugin-copy-code/dist/client/config.js
var config_exports$8 = /* @__PURE__ */ __exportAll$1({ default: () => p$5 });
var d$4 = /language-(?:shellscript|shell|bash|sh|zsh)/u;
var f$4 = ({ options: t, locales: f }) => {
	let p = useMediaQuery(`(max-width: 419px)`), m = u$5(t), h = computed(() => !p.value || m.value.showInMobile), g = De(f), _ = (e) => {
		if (e.hasAttribute(`copy-code`)) return;
		let t = document.createElement(`button`);
		t.type = `button`, t.classList.add(`vp-copy-code-button`), t.setAttribute(`aria-label`, g.value.copy), t.dataset.copied = g.value.copied, e.parentElement?.insertBefore(t, e), e.setAttribute(`copy-code`, ``);
	}, v = () => {
		document.body.classList.toggle(`no-copy-code`, !h.value), h.value && document.querySelectorAll(m.value.selector).forEach((e) => {
			_(e);
		});
	};
	watchImmediate([h, m], () => nextTick(v), { flush: `post` }), onContentUpdated((e) => {
		e !== `beforeUnmount` && v();
	});
	let { copy: y } = /* @__PURE__ */ useClipboard({ legacy: !0 }), b = /* @__PURE__ */ new WeakMap(), x = null, S = async (e, t, n) => {
		let { duration: r, ignoreSelector: i, transform: a } = m.value, o = t.cloneNode(!0);
		i && o.querySelectorAll(i).forEach((e) => {
			e.remove();
		}), a && a(o);
		let s = o.textContent || ``;
		if (d$4.test(e.className) && (s = s.replaceAll(/^ *(?:\$|>) /gmu, ``)), await y(s), r <= 0) return;
		n.classList.add(`copied`), clearTimeout(b.get(n));
		let c = setTimeout(() => {
			n.classList.remove(`copied`), n.blur(), b.delete(n);
		}, r);
		b.set(n, c);
	};
	useEventListener(`click`, (e) => {
		let t = e.target;
		if (h.value && t.matches(`div[class*="language-"] > button.vp-copy-code-button`)) {
			let e = t.parentElement, n = t.nextElementSibling;
			if (!e || !n) return;
			S(e, n, t);
		}
	}, { passive: !0 }), useEventListener(`dblclick`, (e) => {
		let t = e.target, { duration: n, inlineSelector: i } = m.value;
		if (!h.value || !i || !t.matches(i)) return;
		let a = window.getSelection();
		a && (t.contains(a.anchorNode) || t.contains(a.focusNode)) && a.removeAllRanges(), y(t.textContent || ``), (x ??= new Se()).pop(`<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg><span>${g.value.copied} </span>`, n);
	}, { passive: !0 });
};
var p$5 = defineClientConfig({ setup: () => {
	f$4({
		options: {},
		locales: { "/": {
			"copy": "Copy code",
			"copied": "Copied"
		} }
	});
} });
//#endregion
//#region node_modules/@vuepress/plugin-markdown-hint/dist/client/config.js
var config_exports$7 = /* @__PURE__ */ __exportAll$1({ default: () => n$5 });
var n$5 = defineClientConfig({ setup() {
	useEventListener(`beforeprint`, () => {
		document.querySelectorAll(`details`).forEach((e) => {
			e.open = !0;
		});
	}, { passive: !0 });
} });
//#endregion
//#region node_modules/@vuepress/plugin-git/dist/VPHeader-D3qaJHvA.js
var n$4 = { "/": {
	"contributors": "Contributors",
	"changelog": "Changelog",
	"timeOn": "on",
	"viewChangelog": "View All Changelog",
	"latestUpdateAt": "Last Updated"
} };
var r$5 = () => De(n$4);
var i$5 = ({ level: t = 2, text: n, anchor: r }) => h$1(`h${t || 2}`, {
	id: r,
	tabindex: `-1`
}, h$1(`a`, {
	href: `#${r}`,
	class: `header-anchor`
}, h$1(`span`, n)));
//#endregion
//#region node_modules/@vuepress/plugin-git/dist/GitContributors-BiR-YbYa.js
var s$6 = (e = !0) => {
	let { frontmatter: t, page: r } = useData();
	return computed(() => t.value.contributors === !1 || !toValue(e) ? [] : r.value.git.contributors ?? []);
};
var c$6 = ({ name: e, url: t, avatar: n }) => h$1(t ? `a` : `span`, {
	href: t,
	target: `_blank`,
	rel: `noreferrer`,
	class: `vp-contributor`
}, [n ? h$1(`img`, {
	src: n,
	alt: ``,
	class: `vp-contributor-avatar`
}) : null, h$1(`span`, { class: `vp-contributor-name` }, e)]);
var l$8 = /* @__PURE__ */ defineComponent({
	name: `GitContributors`,
	props: {
		title: String,
		headerLevel: {
			type: Number,
			default: 2
		}
	},
	setup(n) {
		let r = s$6(), a = r$5();
		return () => r.value.length > 0 ? [h$1(i$5, {
			level: n.headerLevel,
			anchor: `doc-contributors`,
			text: n.title || a.value.contributors
		}), h$1(`div`, { class: `vp-contributors` }, r.value.map((e) => h$1(c$6, e)))] : null;
	}
});
//#endregion
//#region node_modules/@vuepress/plugin-git/dist/GitChangelog-Do7jXfkp.js
var l$7 = {
	"provider": "github",
	"pattern": {
		"commit": ":repo/commit/:hash",
		"issue": ":repo/issues/:issue",
		"tag": ":repo/releases/tag/:tag"
	},
	"repo": ""
};
var u$4 = (e, t) => !e || isLinkHttp(e) ? e : t === `github` ? `https://github.com/${e}` : t === `gitee` ? `https://gitee.com/${e}` : e;
var d$3 = /#(?<issue>\d+)/gu;
var f$3 = (e = !0) => {
	let { frontmatter: t, lang: r, page: i } = useData(), { pattern: s = {}, provider: c } = l$7, f = u$4(l$7.repo, c);
	return computed(() => {
		if (t.value.changelog === !1 || !toValue(e)) return [];
		let n = new Intl.DateTimeFormat(r.value, { dateStyle: `short` });
		return (i.value.git?.changelog ?? []).map((e) => {
			let t = Object.assign({ date: n.format(e.time) }, e), r = e.submodule?.repoUrl ?? f;
			return s.issue && r && (t.message = t.message.replace(d$3, (e, t) => `<a href="${s.issue.replace(`:issue`, t).replace(`:repo`, r)}" target="_blank" rel="noopener noreferrer">${e}</a>`)), s.commit && r && (t.commitUrl = s.commit.replace(`:hash`, t.hash).replace(`:repo`, r)), s.tag && r && t.tag && (t.tagUrl = s.tag.replace(`:tag`, t.tag).replace(`:repo`, r)), t;
		});
	});
};
var p$4 = (t = !0) => {
	let { lang: r, page: i } = useData(), s = r$5();
	return computed(() => {
		if (!toValue(t)) return null;
		let e = i.value.git?.updatedTime ?? i.value.git?.changelog?.[0].time;
		if (!e) return null;
		let n = new Date(e);
		return {
			date: n,
			text: new Intl.DateTimeFormat(r.value, {
				dateStyle: `short`,
				timeStyle: `short`
			}).format(e),
			iso: n.toISOString(),
			locale: s.value.latestUpdateAt
		};
	});
};
var m$2 = /* @__PURE__ */ defineComponent({
	name: `GitChangelog`,
	props: {
		title: String,
		headerLevel: {
			type: Number,
			default: 2
		}
	},
	setup(n) {
		let r = f$3(), a = r$5(), o = p$4(), [s, l] = useToggle(), u = () => h$1(`div`, {
			class: `vp-changelog-header`,
			onClick: () => l()
		}, [h$1(`div`, { class: `vp-latest-updated` }, [h$1(`span`, { class: `vp-changelog-icon` }), h$1(`span`, { "data-allow-mismatch": `` }, o.value.text)]), h$1(`div`, [h$1(`span`, { class: `vp-changelog-menu-icon` }), h$1(`span`, a.value.viewChangelog)])]), d = ({ item: e }) => h$1(`li`, { class: `vp-changelog-item-tag` }, h$1(`div`, [h$1(`a`, { class: `vp-changelog-tag` }, h$1(`code`, e.tag)), h$1(`span`, {
			class: `vp-changelog-date`,
			"data-allow-mismatch": ``
		}, [
			a.value.timeOn,
			` `,
			h$1(`time`, { datetime: new Date(e.time).toISOString() }, e.date)
		])])), m = ({ item: e }) => h$1(`li`, { class: `vp-changelog-item-commit` }, [
			h$1(e.commitUrl ? `a` : `span`, {
				class: `vp-changelog-hash`,
				href: e.commitUrl,
				target: `_blank`,
				rel: `noreferrer`
			}, [h$1(`code`, e.hash.slice(0, 5))]),
			h$1(`span`, { class: `vp-changelog-divider` }, `-`),
			h$1(`span`, {
				class: `vp-changelog-message`,
				innerHTML: e.message
			}),
			h$1(`span`, {
				class: `vp-changelog-date`,
				"data-allow-mismatch": ``
			}, [
				a.value.timeOn || `on`,
				` `,
				h$1(`time`, { datetime: new Date(e.time).toISOString() }, e.date)
			])
		]);
		return () => r.value.length > 0 ? [h$1(i$5, {
			level: n.headerLevel,
			anchor: `doc-changelog`,
			text: n.title || a.value.changelog
		}), h$1(`div`, { class: [`vp-changelog-wrapper`, { active: s.value }] }, [h$1(u), h$1(`ul`, { class: `vp-changelog-list` }, [r.value.map((e) => e.tag ? h$1(d, {
			item: e,
			key: e.tag
		}) : h$1(m, {
			item: e,
			key: e.hash
		}))])])] : null;
	}
});
//#endregion
//#region docs/.vuepress/.temp/git/config.js
var config_exports$6 = /* @__PURE__ */ __exportAll$1({ default: () => config_default$1 });
var config_default$1 = { enhance: ({ app }) => {
	app.component("GitContributors", l$8);
	app.component("GitChangelog", m$2);
} };
//#endregion
//#region node_modules/@vuepress/plugin-medium-zoom/dist/useMediumZoom-B2cO3M6s.js
var t$4 = Symbol(`mediumZoom`);
var n$3 = () => {
	let n = inject(t$4);
	if (!n) throw Error(`useMediumZoom() is called without provider.`);
	return n;
};
//#endregion
//#region node_modules/medium-zoom/dist/medium-zoom.esm.js
/*! medium-zoom 1.1.0 | MIT License | https://github.com/francoischalifour/medium-zoom */
var _extends = Object.assign || function(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];
		for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
	}
	return target;
};
var isSupported = function isSupported(node) {
	return node.tagName === "IMG";
};
var isNodeList = function isNodeList(selector) {
	return NodeList.prototype.isPrototypeOf(selector);
};
var isNode = function isNode(selector) {
	return selector && selector.nodeType === 1;
};
var isSvg = function isSvg(image) {
	return (image.currentSrc || image.src).substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector(selector) {
	try {
		if (Array.isArray(selector)) return selector.filter(isSupported);
		if (isNodeList(selector)) return [].slice.call(selector).filter(isSupported);
		if (isNode(selector)) return [selector].filter(isSupported);
		if (typeof selector === "string") return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
		return [];
	} catch (err) {
		throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
	}
};
var createOverlay = function createOverlay(background) {
	var overlay = document.createElement("div");
	overlay.classList.add("medium-zoom-overlay");
	overlay.style.background = background;
	return overlay;
};
var cloneTarget = function cloneTarget(template) {
	var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
	var clone = template.cloneNode();
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
	clone.removeAttribute("id");
	clone.style.position = "absolute";
	clone.style.top = top + scrollTop + "px";
	clone.style.left = left + scrollLeft + "px";
	clone.style.width = width + "px";
	clone.style.height = height + "px";
	clone.style.transform = "";
	return clone;
};
var createCustomEvent = function createCustomEvent(type, params) {
	var eventParams = _extends({
		bubbles: false,
		cancelable: false,
		detail: void 0
	}, params);
	if (typeof window.CustomEvent === "function") return new CustomEvent(type, eventParams);
	var customEvent = document.createEvent("CustomEvent");
	customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
	return customEvent;
};
var mediumZoom = function mediumZoom(selector) {
	var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	/**
	* Ensure the compatibility with IE11 if no Promise polyfill are used.
	*/
	var Promise = window.Promise || function Promise(fn) {
		function noop() {}
		fn(noop, noop);
	};
	var _handleClick = function _handleClick(event) {
		var target = event.target;
		if (target === overlay) {
			close();
			return;
		}
		if (images.indexOf(target) === -1) return;
		toggle({ target });
	};
	var _handleScroll = function _handleScroll() {
		if (isAnimating || !active.original) return;
		var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) setTimeout(close, 150);
	};
	var _handleKeyUp = function _handleKeyUp(event) {
		var key = event.key || event.keyCode;
		if (key === "Escape" || key === "Esc" || key === 27) close();
	};
	var update = function update() {
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var newOptions = options;
		if (options.background) overlay.style.background = options.background;
		if (options.container && options.container instanceof Object) newOptions.container = _extends({}, zoomOptions.container, options.container);
		if (options.template) newOptions.template = isNode(options.template) ? options.template : document.querySelector(options.template);
		zoomOptions = _extends({}, zoomOptions, newOptions);
		images.forEach(function(image) {
			image.dispatchEvent(createCustomEvent("medium-zoom:update", { detail: { zoom } }));
		});
		return zoom;
	};
	var clone = function clone() {
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		return mediumZoom(_extends({}, zoomOptions, options));
	};
	var attach = function attach() {
		for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) selectors[_key] = arguments[_key];
		var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
			return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
		}, []);
		newImages.filter(function(newImage) {
			return images.indexOf(newImage) === -1;
		}).forEach(function(newImage) {
			images.push(newImage);
			newImage.classList.add("medium-zoom-image");
		});
		eventListeners.forEach(function(_ref) {
			var type = _ref.type, listener = _ref.listener, options = _ref.options;
			newImages.forEach(function(image) {
				image.addEventListener(type, listener, options);
			});
		});
		return zoom;
	};
	var detach = function detach() {
		for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) selectors[_key2] = arguments[_key2];
		if (active.zoomed) close();
		var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
			return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
		}, []) : images;
		imagesToDetach.forEach(function(image) {
			image.classList.remove("medium-zoom-image");
			image.dispatchEvent(createCustomEvent("medium-zoom:detach", { detail: { zoom } }));
		});
		images = images.filter(function(image) {
			return imagesToDetach.indexOf(image) === -1;
		});
		return zoom;
	};
	var on = function on(type, listener) {
		var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		images.forEach(function(image) {
			image.addEventListener("medium-zoom:" + type, listener, options);
		});
		eventListeners.push({
			type: "medium-zoom:" + type,
			listener,
			options
		});
		return zoom;
	};
	var off = function off(type, listener) {
		var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
		images.forEach(function(image) {
			image.removeEventListener("medium-zoom:" + type, listener, options);
		});
		eventListeners = eventListeners.filter(function(eventListener) {
			return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
		});
		return zoom;
	};
	var open = function open() {
		var target = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).target;
		var _animate = function _animate() {
			var container = {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight,
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			};
			var viewportWidth = void 0;
			var viewportHeight = void 0;
			if (zoomOptions.container) {
				if (zoomOptions.container instanceof Object) {
					container = _extends({}, container, zoomOptions.container);
					viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
					viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
				} else {
					var _zoomContainer$getBou = (isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container)).getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
					container = _extends({}, container, {
						width: _width,
						height: _height,
						left: _left,
						top: _top
					});
				}
			}
			viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
			viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
			var zoomTarget = active.zoomedHd || active.original;
			var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
			var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
			var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
			var scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
			var scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
			var scale = Math.min(scaleX, scaleY);
			var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
			var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
			var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
			active.zoomed.style.transform = transform;
			if (active.zoomedHd) active.zoomedHd.style.transform = transform;
		};
		return new Promise(function(resolve) {
			if (target && images.indexOf(target) === -1) {
				resolve(zoom);
				return;
			}
			var _handleOpenEnd = function _handleOpenEnd() {
				isAnimating = false;
				active.zoomed.removeEventListener("transitionend", _handleOpenEnd);
				active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", { detail: { zoom } }));
				resolve(zoom);
			};
			if (active.zoomed) {
				resolve(zoom);
				return;
			}
			if (target) active.original = target;
			else if (images.length > 0) active.original = images[0];
			else {
				resolve(zoom);
				return;
			}
			active.original.dispatchEvent(createCustomEvent("medium-zoom:open", { detail: { zoom } }));
			scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			isAnimating = true;
			active.zoomed = cloneTarget(active.original);
			document.body.appendChild(overlay);
			if (zoomOptions.template) {
				var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
				active.template = document.createElement("div");
				active.template.appendChild(template.content.cloneNode(true));
				document.body.appendChild(active.template);
			}
			if (active.original.parentElement && active.original.parentElement.tagName === "PICTURE" && active.original.currentSrc) active.zoomed.src = active.original.currentSrc;
			document.body.appendChild(active.zoomed);
			window.requestAnimationFrame(function() {
				document.body.classList.add("medium-zoom--opened");
			});
			active.original.classList.add("medium-zoom-image--hidden");
			active.zoomed.classList.add("medium-zoom-image--opened");
			active.zoomed.addEventListener("click", close);
			active.zoomed.addEventListener("transitionend", _handleOpenEnd);
			if (active.original.getAttribute("data-zoom-src")) {
				active.zoomedHd = active.zoomed.cloneNode();
				active.zoomedHd.removeAttribute("srcset");
				active.zoomedHd.removeAttribute("sizes");
				active.zoomedHd.removeAttribute("loading");
				active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
				active.zoomedHd.onerror = function() {
					clearInterval(getZoomTargetSize);
					console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
					active.zoomedHd = null;
					_animate();
				};
				var getZoomTargetSize = setInterval(function() {
					if (active.zoomedHd.complete) {
						clearInterval(getZoomTargetSize);
						active.zoomedHd.classList.add("medium-zoom-image--opened");
						active.zoomedHd.addEventListener("click", close);
						document.body.appendChild(active.zoomedHd);
						_animate();
					}
				}, 10);
			} else if (active.original.hasAttribute("srcset")) {
				active.zoomedHd = active.zoomed.cloneNode();
				active.zoomedHd.removeAttribute("sizes");
				active.zoomedHd.removeAttribute("loading");
				var loadEventListener = active.zoomedHd.addEventListener("load", function() {
					active.zoomedHd.removeEventListener("load", loadEventListener);
					active.zoomedHd.classList.add("medium-zoom-image--opened");
					active.zoomedHd.addEventListener("click", close);
					document.body.appendChild(active.zoomedHd);
					_animate();
				});
			} else _animate();
		});
	};
	var close = function close() {
		return new Promise(function(resolve) {
			if (isAnimating || !active.original) {
				resolve(zoom);
				return;
			}
			var _handleCloseEnd = function _handleCloseEnd() {
				active.original.classList.remove("medium-zoom-image--hidden");
				document.body.removeChild(active.zoomed);
				if (active.zoomedHd) document.body.removeChild(active.zoomedHd);
				document.body.removeChild(overlay);
				active.zoomed.classList.remove("medium-zoom-image--opened");
				if (active.template) document.body.removeChild(active.template);
				isAnimating = false;
				active.zoomed.removeEventListener("transitionend", _handleCloseEnd);
				active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", { detail: { zoom } }));
				active.original = null;
				active.zoomed = null;
				active.zoomedHd = null;
				active.template = null;
				resolve(zoom);
			};
			isAnimating = true;
			document.body.classList.remove("medium-zoom--opened");
			active.zoomed.style.transform = "";
			if (active.zoomedHd) active.zoomedHd.style.transform = "";
			if (active.template) {
				active.template.style.transition = "opacity 150ms";
				active.template.style.opacity = 0;
			}
			active.original.dispatchEvent(createCustomEvent("medium-zoom:close", { detail: { zoom } }));
			active.zoomed.addEventListener("transitionend", _handleCloseEnd);
		});
	};
	var toggle = function toggle() {
		var target = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}).target;
		if (active.original) return close();
		return open({ target });
	};
	var getOptions = function getOptions() {
		return zoomOptions;
	};
	var getImages = function getImages() {
		return images;
	};
	var getZoomedImage = function getZoomedImage() {
		return active.original;
	};
	var images = [];
	var eventListeners = [];
	var isAnimating = false;
	var scrollTop = 0;
	var zoomOptions = options;
	var active = {
		original: null,
		zoomed: null,
		zoomedHd: null,
		template: null
	};
	if (Object.prototype.toString.call(selector) === "[object Object]") zoomOptions = selector;
	else if (selector || typeof selector === "string") attach(selector);
	zoomOptions = _extends({
		margin: 0,
		background: "#fff",
		scrollOffset: 40,
		container: null,
		template: null
	}, zoomOptions);
	var overlay = createOverlay(zoomOptions.background);
	document.addEventListener("click", _handleClick);
	document.addEventListener("keyup", _handleKeyUp);
	document.addEventListener("scroll", _handleScroll);
	window.addEventListener("resize", close);
	var zoom = {
		open,
		close,
		toggle,
		update,
		clone,
		attach,
		detach,
		on,
		off,
		getOptions,
		getImages,
		getZoomedImage
	};
	return zoom;
};
function styleInject(css, ref) {
	if (ref === void 0) ref = {};
	var insertAt = ref.insertAt;
	if (!css || typeof document === "undefined") return;
	var head = document.head || document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = "text/css";
	if (insertAt === "top") {
		if (head.firstChild) head.insertBefore(style, head.firstChild);
		else head.appendChild(style);
	} else head.appendChild(style);
	if (style.styleSheet) style.styleSheet.cssText = css;
	else style.appendChild(document.createTextNode(css));
}
styleInject(".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}");
//#endregion
//#region node_modules/@vuepress/plugin-medium-zoom/dist/client/config.js
var config_exports$5 = /* @__PURE__ */ __exportAll$1({ default: () => s$5 });
var a$4 = "[vp-content] > img, [vp-content] :not(a) > img";
var o$4 = {};
var s$5 = defineClientConfig({
	enhance({ app: e }) {
		let r = mediumZoom(o$4);
		r.refresh = (e = a$4) => {
			r.detach(), r.attach(e);
		}, e.provide(t$4, r);
	},
	setup() {
		let t = n$3();
		onContentUpdated((e) => {
			e !== `beforeUnmount` && t.refresh();
		});
	}
});
//#endregion
//#region node_modules/@vuepress/plugin-nprogress/dist/useNprogress-GlcbTqVm.js
/**
* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
* @license MIT
*/
var i$4 = (e, t) => {
	e.classList.add(t);
};
var a$3 = (e, t) => {
	e.classList.remove(t);
};
var o$3 = (e) => {
	e?.remove();
};
var s$4 = (e, t, n) => e < t ? t : e > n ? n : e;
var c$5 = (e) => (-1 + e) * 100;
var l$6 = (() => {
	let e = [], t = () => {
		let n = e.shift();
		n && n(t);
	};
	return (n) => {
		e.push(n), e.length === 1 && t();
	};
})();
var u$3 = (e) => e.replace(/^-ms-/u, `ms-`).replaceAll(/-(?<letter>[\da-z])/giu, (e, t) => t.toUpperCase());
var d$2 = (() => {
	let e = [
		`Webkit`,
		`O`,
		`Moz`,
		`ms`
	], t = {}, i = (t) => {
		let { style: n } = document.body;
		if (t in n) return t;
		let r = t.charAt(0).toUpperCase() + t.slice(1), i = e.length;
		for (; i--;) {
			let t = `${e[i]}${r}`;
			if (t in n) return t;
		}
		return t;
	}, a = (e) => {
		let n = u$3(e);
		return t[n] ??= i(n);
	}, o = (e, t, n) => {
		e.style[a(t)] = n;
	};
	return (e, t) => {
		for (let [i, a] of E(t)) y$1(a) && o(e, i, a);
	};
})();
var f$2 = {
	minimum: .08,
	easing: `ease`,
	speed: 200,
	trickle: !0,
	trickleRate: .02,
	trickleSpeed: 800,
	barSelector: `[role="bar"]`,
	parent: `body`,
	template: `<div class="bar" role="bar"></div>`
};
var p$3 = {
	percent: null,
	isRendered: () => !!document.querySelector(`#nprogress`),
	set: (e) => {
		let { speed: t, easing: n } = f$2, r = p$3.isStarted(), i = s$4(e, f$2.minimum, 1);
		p$3.percent = i === 1 ? null : i;
		let a = p$3.render(!r), o = a.querySelector(f$2.barSelector);
		return a.offsetWidth, l$6((e) => {
			d$2(o, {
				transform: `translate3d(${c$5(i)}%,0,0)`,
				transition: `all ${t}ms ${n}`
			}), i === 1 ? (d$2(a, {
				transition: `none`,
				opacity: `1`
			}), a.offsetWidth, setTimeout(() => {
				d$2(a, {
					transition: `all ${t}ms linear`,
					opacity: `0`
				}), setTimeout(() => {
					p$3.remove(), e();
				}, t);
			}, t)) : setTimeout(() => {
				e();
			}, t);
		}), p$3;
	},
	isStarted: () => typeof p$3.percent == `number`,
	start: () => {
		p$3.percent || p$3.set(0);
		let e = () => {
			setTimeout(() => {
				p$3.percent && (p$3.trickle(), e());
			}, f$2.trickleSpeed);
		};
		return f$2.trickle && e(), p$3;
	},
	done: (e) => !e && !p$3.percent ? p$3 : p$3.increase(.3 + .5 * Math.random()).set(1),
	increase: (e) => {
		let { percent: t } = p$3;
		return t ? (t = s$4(t + (typeof e == `number` ? e : (1 - t) * s$4(Math.random() * t, .1, .95)), 0, .994), p$3.set(t)) : p$3.start();
	},
	trickle: () => p$3.increase(Math.random() * f$2.trickleRate),
	render: (e) => {
		if (p$3.isRendered()) return document.querySelector(`#nprogress`);
		i$4(document.documentElement, `nprogress-busy`);
		let t = document.createElement(`div`);
		t.id = `nprogress`, t.innerHTML = f$2.template;
		let n = t.querySelector(f$2.barSelector), r = document.querySelector(f$2.parent);
		return d$2(n, {
			transition: `all 0 linear`,
			transform: `translate3d(${e ? `-100` : c$5(p$3.percent ?? 0)}%,0,0)`
		}), r && (r !== document.body && i$4(r, `nprogress-custom-parent`), r.append(t)), t;
	},
	remove: () => {
		a$3(document.documentElement, `nprogress-busy`), a$3(document.querySelector(f$2.parent), `nprogress-custom-parent`), o$3(document.querySelector(`#nprogress`));
	}
};
var m$1 = () => {
	onMounted(() => {
		let t = useRouter(), n = /* @__PURE__ */ new Set();
		n.add(t.currentRoute.value.path), t.beforeEach((e) => {
			n.has(e.path) || p$3.start();
		}), t.afterEach((e) => {
			n.add(e.path), p$3.done();
		});
	});
};
//#endregion
//#region node_modules/@vuepress/plugin-nprogress/dist/client/config.js
var config_exports$4 = /* @__PURE__ */ __exportAll$1({ default: () => n$2 });
var n$2 = defineClientConfig({ setup() {
	m$1();
} });
//#endregion
//#region docs/.vuepress/.temp/prismjs/config.js
var config_exports$3 = /* @__PURE__ */ __exportAll$1({});
//#endregion
//#region node_modules/@vuepress/plugin-markdown-tab/dist/client/components/VPCodeTabs.js
var c$4 = useStorage(`VUEPRESS_CODE_TAB_STORE`, {});
var l$5 = /* @__PURE__ */ defineComponent({
	name: `VPCodeTabs`,
	props: {
		active: {
			type: Number,
			default: 0
		},
		data: {
			type: Array,
			required: !0
		},
		tabId: String
	},
	slots: Object,
	setup(e, { slots: t }) {
		let l = e.data.map(() => useId()), u = /* @__PURE__ */ ref(e.active), d = /* @__PURE__ */ shallowRef([]), f = () => {
			e.tabId && (c$4.value[e.tabId] = e.data[u.value].id);
		}, p = (e = u.value) => {
			u.value = e < d.value.length - 1 ? e + 1 : 0, d.value[u.value].focus();
		}, m = (e = u.value) => {
			u.value = e > 0 ? e - 1 : d.value.length - 1, d.value[u.value].focus();
		}, h = (t, n) => {
			t.key === ` ` || t.key === `Enter` ? (t.preventDefault(), u.value = n) : t.key === `ArrowRight` ? (t.preventDefault(), p()) : t.key === `ArrowLeft` && (t.preventDefault(), m()), e.tabId && (c$4.value[e.tabId] = e.data[u.value].id);
		}, g = () => {
			if (e.tabId) {
				let t = e.data.findIndex(({ id: t }) => c$4.value[e.tabId] === t);
				if (t !== -1) return t;
			}
			return e.active;
		};
		return onMounted(() => {
			u.value = g(), watch(() => e.tabId && c$4.value[e.tabId], (t, n) => {
				if (e.tabId && t !== n) {
					let n = e.data.findIndex(({ id: e }) => e === t);
					n !== -1 && (u.value = n);
				}
			});
		}), () => e.data.length ? h$1(`div`, { class: `vp-code-tabs` }, [h$1(`div`, {
			class: `vp-code-tabs-nav`,
			role: `tablist`
		}, e.data.map(({ id: e }, r) => {
			let i = r === u.value;
			return h$1(`button`, {
				type: `button`,
				ref: (e) => {
					e && (d.value[r] = e);
				},
				class: [`vp-code-tab-nav`, { active: i }],
				role: `tab`,
				"aria-controls": l[r],
				"aria-selected": i,
				onClick: () => {
					u.value = r, f();
				},
				onKeydown: (e) => {
					h(e, r);
				}
			}, t[`title${r}`]({
				value: e,
				isActive: i
			}));
		})), e.data.map(({ id: e }, r) => {
			let i = r === u.value;
			return h$1(`div`, {
				class: [`vp-code-tab`, { active: i }],
				id: l[r],
				role: `tabpanel`,
				"aria-expanded": i
			}, [h$1(`div`, { class: `vp-code-tab-title` }, t[`title${r}`]({
				value: e,
				isActive: i
			})), t[`tab${r}`]({
				value: e,
				isActive: i
			})]);
		})]) : null;
	}
});
//#endregion
//#region node_modules/@vuepress/plugin-markdown-tab/dist/client/components/VPTabs.js
var c$3 = useStorage(`VUEPRESS_TAB_STORE`, {});
var l$4 = /* @__PURE__ */ defineComponent({
	name: `VPTabs`,
	props: {
		active: {
			type: Number,
			default: 0
		},
		data: {
			type: Array,
			required: !0
		},
		tabId: String
	},
	slots: Object,
	setup(e, { slots: t }) {
		let l = e.data.map(() => useId()), u = /* @__PURE__ */ ref(e.active), d = /* @__PURE__ */ shallowRef([]), f = () => {
			e.tabId && (c$3.value[e.tabId] = e.data[u.value].id);
		}, p = (e = u.value) => {
			u.value = e < d.value.length - 1 ? e + 1 : 0, d.value[u.value].focus();
		}, m = (e = u.value) => {
			u.value = e > 0 ? e - 1 : d.value.length - 1, d.value[u.value].focus();
		}, h = (e, t) => {
			e.key === ` ` || e.key === `Enter` ? (e.preventDefault(), u.value = t) : e.key === `ArrowRight` ? (e.preventDefault(), p()) : e.key === `ArrowLeft` && (e.preventDefault(), m()), f();
		}, g = () => {
			if (e.tabId) {
				let t = e.data.findIndex(({ id: t }) => c$3.value[e.tabId] === t);
				if (t !== -1) return t;
			}
			return e.active;
		};
		return onMounted(() => {
			u.value = g(), watch(() => e.tabId && c$3.value[e.tabId], (t, n) => {
				if (e.tabId && t !== n) {
					let n = e.data.findIndex(({ id: e }) => e === t);
					n !== -1 && (u.value = n);
				}
			});
		}), () => e.data.length ? h$1(`div`, { class: `vp-tabs` }, [h$1(`div`, {
			class: `vp-tabs-nav`,
			role: `tablist`
		}, e.data.map(({ id: e }, r) => {
			let i = r === u.value;
			return h$1(`button`, {
				type: `button`,
				ref: (e) => {
					e && (d.value[r] = e);
				},
				class: [`vp-tab-nav`, { active: i }],
				role: `tab`,
				"aria-controls": l[r],
				"aria-selected": i,
				onClick: () => {
					u.value = r, f();
				},
				onKeydown: (e) => {
					h(e, r);
				}
			}, t[`title${r}`]({
				value: e,
				isActive: i
			}));
		})), e.data.map(({ id: e }, r) => {
			let i = r === u.value;
			return h$1(`div`, {
				class: [`vp-tab`, { active: i }],
				id: l[r],
				role: `tabpanel`,
				"aria-expanded": i
			}, [h$1(`div`, { class: `vp-tab-title` }, t[`title${r}`]({
				value: e,
				isActive: i
			})), t[`tab${r}`]({
				value: e,
				isActive: i
			})]);
		})]) : null;
	}
});
//#endregion
//#region docs/.vuepress/.temp/markdown-tab/config.js
var config_exports$2 = /* @__PURE__ */ __exportAll$1({ default: () => config_default });
var config_default = { enhance: ({ app }) => {
	app.component("VPCodeTabs", l$5);
	app.component("VPTabs", l$4);
} };
//#endregion
//#region docs/.vuepress/.temp/internal/themeData.js
var themeData = JSON.parse("{\"sidebar\":[\"/\",\"/how-to-use.md\",\"/use-cases.md\",\"/resources.md\"],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}");
//#endregion
//#region node_modules/@vuepress/plugin-theme-data/dist/useThemeLocaleData-QKw21zSn.js
var o$2 = `THEME_DATA`;
var s$3 = `Theme Data`;
var c$2 = (e, t, a) => {
	setupDevToolsPlugin({
		app: e,
		id: `org.vuejs.vuepress.plugin-theme-data`,
		label: `VuePress Theme Data`,
		packageName: `@vuepress/plugin-theme-data`,
		homepage: `https://vuepress.vuejs.org`,
		logo: `https://vuepress.vuejs.org/images/hero.png`,
		componentStateTypes: [constants_exports.COMPONENT_STATE_TYPE]
	}, (e) => {
		e.on.inspectComponent((e) => {
			e.instanceData.state.push({
				type: `VuePress`,
				key: `themeData`,
				editable: !1,
				value: t.value
			}, {
				type: `VuePress`,
				key: `themeLocaleData`,
				editable: !1,
				value: a.value
			});
		}), e.addInspector({
			id: constants_exports.INSPECTOR_ID,
			label: constants_exports.INSPECTOR_LABEL,
			icon: `article`
		}), e.on.getInspectorTree((e) => {
			e.inspectorId === constants_exports.INSPECTOR_ID && e.rootNodes.push({
				id: o$2,
				label: s$3,
				children: [{
					id: `themeData`,
					label: `themeData`
				}, {
					id: `themeLocaleData`,
					label: `themeLocaleData`
				}]
			});
		}), e.on.getInspectorState((e) => {
			e.inspectorId === constants_exports.INSPECTOR_ID && (e.nodeId === o$2 && e.state[s$3].push({
				key: `themeData`,
				value: t.value
			}, {
				key: `themeLocaleData`,
				value: a.value
			}), [`themeData`, `themeLocaleData`].includes(e.nodeId) && (e.state = { [constants_exports.INSPECTOR_STATE_SECTION_NAME]: [{
				key: e.nodeId,
				value: e.nodeId === `themeData` ? t.value : a.value
			}] }));
		}), watch([t, a], () => {
			e.notifyComponentUpdate(), e.sendInspectorState(constants_exports.INSPECTOR_ID);
		});
	});
};
var l$3 = /* @__PURE__ */ ref(themeData);
var u$2 = () => l$3;
var d$1 = Symbol(``);
var f$1 = () => {
	let t = inject(d$1);
	if (!t) throw Error(`useThemeLocaleData() is called without provider.`);
	return t;
};
var p$2 = (e, t) => {
	let { locales: n, ...r } = e;
	return {
		...r,
		...n?.[t]
	};
};
//#endregion
//#region node_modules/@vuepress/plugin-theme-data/dist/client/config.js
var config_exports$1 = /* @__PURE__ */ __exportAll$1({ default: () => s$2 });
var s$2 = defineClientConfig({ enhance({ app: o }) {
	let s = u$2(), c = o._context.provides[clientDataSymbol], l = computed(() => p$2(s.value, c.routeLocale.value));
	o.provide(d$1, l), Object.defineProperties(o.config.globalProperties, {
		$theme: { get() {
			return s.value;
		} },
		$themeLocale: { get() {
			return l.value;
		} }
	}), c$2(o, s, l);
} });
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useData-nv4hwlgW.js
var r$4 = () => ({
	...useData(),
	theme: u$2(),
	themeLocale: f$1()
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useDarkMode-BfKvIN6K.js
var u$1 = (e) => {
	let t = globalThis.document.documentElement;
	t.dataset.theme = e ? `dark` : `light`;
};
var d = (e) => {
	onMounted(() => {
		watchImmediate(e, u$1);
	}), onUnmounted(() => {
		u$1(e.value);
	});
};
var f = () => {
	let t = inject(Z);
	if (!t) throw Error(`useDarkMode() is called without provider.`);
	return t;
};
var p$1 = () => {
	let { themeLocale: r } = r$4(), a = usePreferredDark(), o = useStorage(`vuepress-color-scheme`, r.value.colorMode), s = computed({
		get() {
			return r.value.colorModeSwitch ? o.value === `auto` ? a.value : o.value === `dark` : r.value.colorMode === `dark`;
		},
		set(e) {
			e === a.value ? o.value = `auto` : o.value = e ? `dark` : `light`;
		}
	});
	provide(Z, s), d(s);
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/composables/useHeaders.js
var s$1 = Symbol(`headers`);
var c$1 = () => {
	let e = /* @__PURE__ */ injectLocal(s$1);
	if (!e) throw Error(`useHeaders() is called without provider.`);
	return e;
};
var l$2 = () => {
	let { frontmatter: n, themeLocale: c } = r$4(), l = /* @__PURE__ */ ref([]), u = computed(() => n.value.sidebarDepth ?? c.value.sidebarDepth ?? 2), d = () => {
		if (u.value <= 0) {
			l.value = [];
			return;
		}
		l.value = U({
			levels: [2, u.value + 1],
			ignore: [`.vp-badge`]
		});
	};
	provideLocal(s$1, l), onContentUpdated((e) => {
		e === `beforeUnmount` ? l.value = [] : d();
	});
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useScrollPromise-CB6ZLciv.js
var e = null;
var t$3 = null;
var n$1 = {
	wait: () => e,
	pending: () => {
		e = new Promise((e) => {
			t$3 = e;
		});
	},
	resolve: () => {
		t$3?.(), e = null, t$3 = null;
	}
};
var r$3 = () => n$1;
//#endregion
//#region node_modules/@vuepress/theme-default/dist/resolveAutoLink-XUJwl3Kb.js
var t$2 = (t, n) => {
	let { notFound: r, meta: i, path: a } = resolveRoute(t, n);
	return r ? {
		text: a,
		link: a
	} : {
		text: i.title || a,
		link: a
	};
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/resolvePrefix-CQnTmTk4.js
var r$2 = (r = ``, i = ``) => N(i) || isLinkWithProtocol(i) ? i : `${ensureEndingSlash(r)}${i}`;
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useSidebarItems-D1vD1QQp.js
var p = (e) => ({
	text: e.title,
	link: e.link,
	children: m(e.children)
});
var m = (e) => e ? e.map((e) => p(e)) : [];
var h = (e, t) => [{
	text: e.title,
	children: m(t)
}];
var g = (e, r, i, a = ``) => {
	let o = (e, a) => {
		let s = isString$1(e) ? t$2(r$2(a, e)) : isString$1(e.link) ? {
			...e,
			link: P(e.link) ? t$2(r$2(a, e.link)).link : e.link
		} : e;
		if (`children` in s) return {
			...s,
			children: s.children.map((e) => o(e, r$2(a, s.prefix)))
		};
		if (s.link === i) {
			let e = r[0]?.level === 1 ? r[0].children : r;
			return {
				...s,
				children: m(e)
			};
		}
		return s;
	};
	return e.map((e) => o(e, a));
};
var _ = (e, t, n, a) => {
	let o = O(e).sort((e, t) => t.length - e.length);
	for (let r of o) if (w(decodeURI(a), r)) {
		let i = e[r];
		return i === !1 ? [] : i === `heading` ? h(t, n) : g(i, n, a, r);
	}
	return console.warn(`${decodeURI(a)} is missing sidebar config.`), [];
};
var v = Symbol(`sidebarItems`);
var y = () => {
	let e = inject(v);
	if (!e) throw Error(`useSidebarItems() is called without provider.`);
	return e;
};
var b = (t, n, r, i, a) => t === !1 ? [] : t === `heading` ? h(n, a) : Array.isArray(t) ? g(t, a, r, i) : isPlainObject(t) ? _(t, n, a, r) : [];
var x = () => {
	let { frontmatter: e, page: t, routeLocale: n, themeLocale: r } = r$4(), i = c$1(), c = useRoutePath(), d = computed(() => !e.value.home && (e.value.sidebar ?? r.value.sidebar ?? `heading`));
	provide(v, computed(() => b(d.value, t.value, c.value, n.value, i.value)));
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/global/Badge.vue?vue&type=script&setup=true&lang.ts
var Badge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Badge",
	props: {
		type: { default: "tip" },
		text: { default: "" },
		vertical: { default: "" }
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/global/Badge.vue
function _sfc_render$24(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("span", {
		class: normalizeClass(["vp-badge", $props.type]),
		style: normalizeStyle($props.vertical ? { verticalAlign: $props.vertical } : "")
	}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString($props.text), 1)])], 6);
}
var Badge_default = /*#__PURE__*/ _plugin_vue_export_helper_default(Badge_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$24], ["__file", "Badge.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPFadeSlideYTransition.vue?vue&type=script&setup=true&lang.ts
var VPFadeSlideYTransition_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPFadeSlideYTransition",
	emits: ["beforeEnter", "beforeLeave"],
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPFadeSlideYTransition.vue
function _sfc_render$23(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(Transition, {
		name: "fade-in-down",
		mode: "out-in",
		onBeforeEnter: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("beforeEnter")),
		onBeforeLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("beforeLeave"))
	}, {
		default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
		_: 3
	});
}
var VPFadeSlideYTransition_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPFadeSlideYTransition_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$23], ["__file", "VPFadeSlideYTransition.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeFeatures.vue?vue&type=script&setup=true&lang.ts
var VPHomeFeatures_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeFeatures",
	setup(__props, { expose: __expose }) {
		__expose();
		const { frontmatter } = r$4();
		const __returned__ = {
			frontmatter,
			features: computed(() => frontmatter.value.features ?? [])
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeFeatures.vue
var _hoisted_1$19 = {
	key: 0,
	class: "vp-features"
};
function _sfc_render$22(_ctx, _cache, $props, $setup, $data, $options) {
	return $setup.features.length ? (openBlock(), createElementBlock("div", _hoisted_1$19, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.features, (feature) => {
		return openBlock(), createElementBlock("div", {
			key: feature.title,
			class: "vp-feature"
		}, [createBaseVNode("h2", null, toDisplayString(feature.title), 1), createBaseVNode("p", null, toDisplayString(feature.details), 1)]);
	}), 128))])) : createCommentVNode("", true);
}
var VPHomeFeatures_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHomeFeatures_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$22], ["__file", "VPHomeFeatures.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeFooter.vue?vue&type=script&setup=true&lang.ts
var VPHomeFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeFooter",
	setup(__props, { expose: __expose }) {
		__expose();
		const frontmatter = useFrontmatter();
		const __returned__ = {
			frontmatter,
			footer: computed(() => frontmatter.value.footer),
			footerHtml: computed(() => frontmatter.value.footerHtml)
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeFooter.vue
var _hoisted_1$18 = ["innerHTML"];
var _hoisted_2$8 = ["textContent"];
function _sfc_render$21(_ctx, _cache, $props, $setup, $data, $options) {
	return $setup.footer ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [$setup.footerHtml ? (openBlock(), createElementBlock("div", {
		key: 0,
		class: "vp-footer",
		"vp-footer": "",
		innerHTML: $setup.footer
	}, null, 8, _hoisted_1$18)) : (openBlock(), createElementBlock("div", {
		key: 1,
		class: "vp-footer",
		"vp-footer": "",
		textContent: toDisplayString($setup.footer)
	}, null, 8, _hoisted_2$8))], 64)) : createCommentVNode("", true);
}
var VPHomeFooter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHomeFooter_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$21], ["__file", "VPHomeFooter.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPAutoLink.vue?vue&type=script&setup=true&lang.ts
var VPAutoLink_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPAutoLink",
	props: { config: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = { get AutoLink() {
			return AutoLink;
		} };
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPAutoLink.vue
function _sfc_render$20(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock($setup["AutoLink"], { config: $props.config }, createSlots({
		before: withCtx(() => [renderSlot(_ctx.$slots, "before", normalizeProps(guardReactiveProps($props.config)))]),
		after: withCtx(() => [renderSlot(_ctx.$slots, "after", normalizeProps(guardReactiveProps($props.config)))]),
		_: 2
	}, [_ctx.$slots.default ? {
		name: "default",
		fn: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps($props.config)))]),
		key: "0"
	} : void 0]), 1032, ["config"]);
}
var VPAutoLink_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPAutoLink_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$20], ["__file", "VPAutoLink.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeHero.vue?vue&type=script&setup=true&lang.ts
var VPHomeHero_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHomeHero",
	setup(__props, { expose: __expose }) {
		__expose();
		const { frontmatter, siteLocale } = r$4();
		const isDarkMode = f();
		const heroText = computed(() => {
			if (frontmatter.value.heroText === null) return null;
			return frontmatter.value.heroText || siteLocale.value.title || "Hello";
		});
		const tagline = computed(() => {
			if (frontmatter.value.tagline === null) return null;
			return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
		});
		const heroImage = computed(() => {
			if (isDarkMode.value && frontmatter.value.heroImageDark !== void 0) return frontmatter.value.heroImageDark;
			return frontmatter.value.heroImage;
		});
		const heroAlt = computed(() => frontmatter.value.heroAlt || heroText.value || "hero");
		const heroHeight = computed(() => frontmatter.value.heroHeight ?? 280);
		const actions = computed(() => {
			if (!Array.isArray(frontmatter.value.actions)) return [];
			return frontmatter.value.actions.map(({ type = "primary", ...rest }) => ({
				type,
				...rest
			}));
		});
		const HomeHeroImage = () => {
			if (!heroImage.value) return null;
			const img = h$1("img", {
				class: "vp-hero-image",
				src: withBase(heroImage.value),
				alt: heroAlt.value,
				height: heroHeight.value
			});
			if (frontmatter.value.heroImageDark === void 0) return img;
			return h$1(ClientOnly, () => img);
		};
		const __returned__ = {
			frontmatter,
			siteLocale,
			isDarkMode,
			heroText,
			tagline,
			heroImage,
			heroAlt,
			heroHeight,
			actions,
			HomeHeroImage,
			VPAutoLink: VPAutoLink_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHomeHero.vue
var _hoisted_1$17 = { class: "vp-hero" };
var _hoisted_2$7 = {
	key: 0,
	id: "main-title"
};
var _hoisted_3$4 = {
	key: 1,
	class: "vp-hero-description"
};
var _hoisted_4$3 = {
	key: 2,
	class: "vp-hero-actions"
};
function _sfc_render$19(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("header", _hoisted_1$17, [
		createVNode($setup["HomeHeroImage"]),
		$setup.heroText ? (openBlock(), createElementBlock("h1", _hoisted_2$7, toDisplayString($setup.heroText), 1)) : createCommentVNode("", true),
		$setup.tagline ? (openBlock(), createElementBlock("p", _hoisted_3$4, toDisplayString($setup.tagline), 1)) : createCommentVNode("", true),
		$setup.actions.length ? (openBlock(), createElementBlock("p", _hoisted_4$3, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.actions, (action) => {
			return openBlock(), createBlock($setup["VPAutoLink"], {
				key: action.text,
				class: normalizeClass(["vp-hero-action-button", [action.type]]),
				config: action
			}, null, 8, ["class", "config"]);
		}), 128))])) : createCommentVNode("", true)
	]);
}
var VPHomeHero_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHomeHero_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$19], ["__file", "VPHomeHero.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHome.vue?vue&type=script&setup=true&lang.ts
var VPHome_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPHome",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			get Content() {
				return Content;
			},
			VPHomeFeatures: VPHomeFeatures_default,
			VPHomeFooter: VPHomeFooter_default,
			VPHomeHero: VPHomeHero_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPHome.vue
var _hoisted_1$16 = { class: "vp-home" };
var _hoisted_2$6 = { "vp-content": "" };
function _sfc_render$18(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("main", _hoisted_1$16, [
		createVNode($setup["VPHomeHero"]),
		createVNode($setup["VPHomeFeatures"]),
		createBaseVNode("div", _hoisted_2$6, [createVNode($setup["Content"])]),
		createVNode($setup["VPHomeFooter"])
	]);
}
var VPHome_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPHome_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$18], ["__file", "VPHome.vue"]]);
var _variables_module_default = { mobile: "719px" };
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useUpdateDeviceStatus-eEm3JFFI.js
var r$1 = /* @__PURE__ */ function(e) {
	return e.Mobile = `mobile`, e;
}({});
var i$3 = { mobile: Number(_variables_module_default.mobile.replace(`px`, ``)) };
var a$2 = (n, r) => {
	let a = i$3[n];
	if (!Number.isInteger(a)) return;
	useEventListener(`orientationchange`, () => {
		r(a);
	}), useEventListener(`resize`, () => {
		r(a);
	}), onMounted(() => {
		r(a);
	});
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarBrand.vue?vue&type=script&setup=true&lang.ts
var VPNavbarBrand_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavbarBrand",
	setup(__props, { expose: __expose }) {
		__expose();
		const { routeLocale, siteLocale, themeLocale } = r$4();
		const isDarkMode = f();
		const navbarBrandLink = computed(() => themeLocale.value.home || routeLocale.value);
		const navbarBrandTitle = computed(() => siteLocale.value.title);
		const navbarBrandLogo = computed(() => {
			if (isDarkMode.value && themeLocale.value.logoDark !== void 0) return themeLocale.value.logoDark;
			return themeLocale.value.logo;
		});
		const navbarBrandLogoAlt = computed(() => themeLocale.value.logoAlt ?? navbarBrandTitle.value);
		const navBarLogoAltMatchesTitle = computed(() => navbarBrandTitle.value.toLocaleUpperCase().trim() === navbarBrandLogoAlt.value.toLocaleUpperCase().trim());
		const NavbarBrandLogo = () => {
			if (!navbarBrandLogo.value) return null;
			const img = h$1("img", {
				class: "vp-site-logo",
				src: withBase(navbarBrandLogo.value),
				alt: navbarBrandLogoAlt.value
			});
			if (themeLocale.value.logoDark === void 0) return img;
			return h$1(ClientOnly, () => img);
		};
		const __returned__ = {
			routeLocale,
			siteLocale,
			themeLocale,
			isDarkMode,
			navbarBrandLink,
			navbarBrandTitle,
			navbarBrandLogo,
			navbarBrandLogoAlt,
			navBarLogoAltMatchesTitle,
			NavbarBrandLogo,
			get RouteLink() {
				return RouteLink;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarBrand.vue
var _hoisted_1$15 = ["aria-hidden"];
function _sfc_render$17(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock($setup["RouteLink"], { to: $setup.navbarBrandLink }, {
		default: withCtx(() => [createVNode($setup["NavbarBrandLogo"]), $setup.navbarBrandTitle ? (openBlock(), createElementBlock("span", {
			key: 0,
			class: normalizeClass(["vp-site-name", { "vp-hide-mobile": $setup.navbarBrandLogo }]),
			"aria-hidden": $setup.navBarLogoAltMatchesTitle
		}, toDisplayString($setup.navbarBrandTitle), 11, _hoisted_1$15)) : createCommentVNode("", true)]),
		_: 1
	}, 8, ["to"]);
}
var VPNavbarBrand_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavbarBrand_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$17], ["__file", "VPNavbarBrand.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useNavbarConfig-CxVplYul.js
var o$1 = (n, r = ``) => isString$1(n) ? t$2(r$2(r, n)) : `children` in n ? {
	...n,
	children: n.children.map((e) => o$1(e, r$2(r, n.prefix)))
} : {
	...n,
	link: P(n.link) ? t$2(r$2(r, n.link)).link : n.link
};
var s = () => {
	let { themeLocale: e } = r$4();
	return computed(() => (e.value.navbar || []).map((e) => o$1(e)));
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/resolveRepoType-BfcHRhpi.js
var t$1 = (t) => !isLinkHttp(t) || /^(?:https?:)?\/\/github\.com\//u.test(t) ? `GitHub` : /^(?:https?:)?\/\/bitbucket\.org\//u.test(t) ? `Bitbucket` : /^(?:https?:)?\/\/gitlab\.com\//u.test(t) ? `GitLab` : /^(?:https?:)?\/\/gitee\.com\//u.test(t) ? `Gitee` : null;
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useNavbarRepo-BScd94be.js
var i$2 = () => {
	let { themeLocale: i } = r$4(), a = computed(() => i.value.repo), o = computed(() => a.value ? t$1(a.value) : null), s = computed(() => a.value && !isLinkHttp(a.value) ? `https://github.com/${a.value}` : a.value), c = computed(() => s.value ? i.value.repoLabel ? i.value.repoLabel : o.value == null ? `Source` : o.value : null);
	return computed(() => !s.value || !c.value ? [] : [{
		text: c.value,
		link: s.value
	}]);
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useNavbarSelectLanguage-FHyzHFEW.js
var a$1 = () => {
	let a = useRoute(), o = ke(), { routeLocale: s, site: c, siteLocale: l, theme: u, themeLocale: d } = r$4(), f = useMounted();
	return computed(() => {
		let e = Object.keys(c.value.locales);
		if (e.length < 2) return [];
		let t = a.path, n = a.fullPath;
		return [{
			text: `${d.value.selectLanguageText}`,
			ariaLabel: `${d.value.selectLanguageAriaLabel ?? d.value.selectLanguageText}`,
			children: e.map((e) => {
				let r = c.value.locales?.[e] ?? {}, i = u.value.locales?.[e] ?? {}, a = `${r.lang}`, d = i.selectLanguageName ?? a;
				if (a === l.value.lang) return {
					text: d,
					activeMatch: `.`,
					link: f.value ? n : t
				};
				let p = t.replace(s.value, e);
				return {
					text: d,
					link: o.value.some((e) => e === p) ? f.value ? n.replace(t, p) : p : i.home ?? e
				};
			})
		}];
	});
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarDropdown.vue?vue&type=script&setup=true&lang.ts
var VPNavbarDropdown_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavbarDropdown",
	props: { config: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const [open, toggleOpen] = useToggle();
		const dropdownAriaLabel = computed(() => __props.config.ariaLabel || __props.config.text);
		const isLastItemOfArray = (arrayItem, array) => array[array.length - 1] === arrayItem;
		/**
		* Open the dropdown when user tab and click from keyboard.
		*
		* Use event.detail to detect tab and click from keyboard. The Tab + Click is
		* UIEvent > KeyboardEvent, so the detail is 0.
		*
		* @param event - The UIEvent triggered by the click
		* @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
		*/
		const handleDropdown = (event) => {
			if (event.detail === 0) toggleOpen();
			else toggleOpen(false);
		};
		onContentUpdated(() => {
			toggleOpen(false);
		});
		const __returned__ = {
			open,
			toggleOpen,
			dropdownAriaLabel,
			isLastItemOfArray,
			handleDropdown,
			get FadeInExpandTransition() {
				return we;
			},
			VPAutoLink: VPAutoLink_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarDropdown.vue
var _hoisted_1$14 = ["aria-label"];
var _hoisted_2$5 = { class: "title" };
var _hoisted_3$3 = ["aria-label"];
var _hoisted_4$2 = { class: "title" };
var _hoisted_5$2 = { class: "vp-navbar-dropdown" };
var _hoisted_6$2 = { class: "vp-navbar-dropdown-subtitle" };
var _hoisted_7$2 = { key: 1 };
var _hoisted_8$1 = { class: "vp-navbar-dropdown-subitem-wrapper" };
function _sfc_render$16(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", { class: normalizeClass(["vp-navbar-dropdown-wrapper", { open: $setup.open }]) }, [
		createBaseVNode("button", {
			class: "vp-navbar-dropdown-title",
			type: "button",
			"aria-label": $setup.dropdownAriaLabel,
			onClick: $setup.handleDropdown
		}, [createBaseVNode("span", _hoisted_2$5, toDisplayString($props.config.text), 1), _cache[1] || (_cache[1] = createBaseVNode("span", { class: "arrow down" }, null, -1))], 8, _hoisted_1$14),
		createBaseVNode("button", {
			class: "vp-navbar-dropdown-title-mobile",
			type: "button",
			"aria-label": $setup.dropdownAriaLabel,
			onClick: _cache[0] || (_cache[0] = () => $setup.toggleOpen())
		}, [createBaseVNode("span", _hoisted_4$2, toDisplayString($props.config.text), 1), createBaseVNode("span", { class: normalizeClass(["arrow", $setup.open ? "down" : "right"]) }, null, 2)], 8, _hoisted_3$3),
		createVNode($setup["FadeInExpandTransition"], null, {
			default: withCtx(() => [withDirectives(createBaseVNode("ul", _hoisted_5$2, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.config.children, (child) => {
				return openBlock(), createElementBlock("li", {
					key: child.text,
					class: "vp-navbar-dropdown-item"
				}, ["children" in child ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("h4", _hoisted_6$2, [child.link ? (openBlock(), createBlock($setup["VPAutoLink"], {
					key: 0,
					config: child,
					onFocusout: () => {
						if ($setup.isLastItemOfArray(child, $props.config.children) && child.children.length === 0) $setup.open = false;
					}
				}, null, 8, ["config", "onFocusout"])) : (openBlock(), createElementBlock("span", _hoisted_7$2, toDisplayString(child.text), 1))]), createBaseVNode("ul", _hoisted_8$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(child.children, (grandchild) => {
					return openBlock(), createElementBlock("li", {
						key: grandchild.link,
						class: "vp-navbar-dropdown-subitem"
					}, [createVNode($setup["VPAutoLink"], {
						config: grandchild,
						onFocusout: () => {
							if ($setup.isLastItemOfArray(grandchild, child.children) && $setup.isLastItemOfArray(child, $props.config.children)) $setup.toggleOpen(false);
						}
					}, null, 8, ["config", "onFocusout"])]);
				}), 128))])], 64)) : (openBlock(), createBlock($setup["VPAutoLink"], {
					key: 1,
					config: child,
					onFocusout: () => {
						if ($setup.isLastItemOfArray(child, $props.config.children)) $setup.toggleOpen(false);
					}
				}, null, 8, ["config", "onFocusout"]))]);
			}), 128))], 512), [[vShow, $setup.open]])]),
			_: 1
		})
	], 2);
}
var VPNavbarDropdown_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavbarDropdown_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$16], ["__file", "VPNavbarDropdown.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarItems.vue?vue&type=script&setup=true&lang.ts
var VPNavbarItems_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavbarItems",
	setup(__props, { expose: __expose }) {
		__expose();
		const { themeLocale } = r$4();
		const navbarConfig = s();
		const navbarSelectLanguage = a$1();
		const navbarRepo = i$2();
		const isMobile = /* @__PURE__ */ ref(false);
		const navbarLabel = computed(() => themeLocale.value.navbarLabel ?? "site navigation");
		const navbarLinks = computed(() => [
			...navbarConfig.value,
			...navbarSelectLanguage.value,
			...navbarRepo.value
		]);
		a$2(r$1.Mobile, (mobileDesktopBreakpoint) => {
			isMobile.value = window.innerWidth < mobileDesktopBreakpoint;
		});
		const __returned__ = {
			themeLocale,
			navbarConfig,
			navbarSelectLanguage,
			navbarRepo,
			isMobile,
			navbarLabel,
			navbarLinks,
			VPAutoLink: VPAutoLink_default,
			VPNavbarDropdown: VPNavbarDropdown_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbarItems.vue
var _hoisted_1$13 = ["aria-label"];
function _sfc_render$15(_ctx, _cache, $props, $setup, $data, $options) {
	return $setup.navbarLinks.length ? (openBlock(), createElementBlock("nav", {
		key: 0,
		class: "vp-navbar-items",
		"aria-label": $setup.navbarLabel
	}, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.navbarLinks, (item) => {
		return openBlock(), createElementBlock("div", {
			key: item.text,
			class: "vp-navbar-item"
		}, ["children" in item ? (openBlock(), createBlock($setup["VPNavbarDropdown"], {
			key: 0,
			class: normalizeClass({ mobile: $setup.isMobile }),
			config: item
		}, null, 8, ["class", "config"])) : (openBlock(), createBlock($setup["VPAutoLink"], {
			key: 1,
			config: item
		}, null, 8, ["config"]))]);
	}), 128))], 8, _hoisted_1$13)) : createCommentVNode("", true);
}
var VPNavbarItems_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavbarItems_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$15], ["__file", "VPNavbarItems.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPDarkIcon.vue
var _sfc_main$2 = {};
var _hoisted_1$12 = {
	class: "dark-icon",
	viewBox: "0 0 32 32"
};
function _sfc_render$14(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$12, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
		d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z",
		fill: "currentColor"
	}, null, -1)])]);
}
var VPDarkIcon_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["render", _sfc_render$14], ["__file", "VPDarkIcon.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPLightIcon.vue
var _sfc_main$1 = {};
var _hoisted_1$11 = {
	class: "light-icon",
	viewBox: "0 0 32 32"
};
function _sfc_render$13(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$11, [..._cache[0] || (_cache[0] = [createStaticVNode("<path d=\"M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z\" fill=\"currentColor\"></path><path d=\"M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z\" fill=\"currentColor\"></path><path d=\"M2 15.005h5v2H2z\" fill=\"currentColor\"></path><path d=\"M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z\" fill=\"currentColor\"></path><path d=\"M15 25.005h2v5h-2z\" fill=\"currentColor\"></path><path d=\"M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z\" fill=\"currentColor\"></path><path d=\"M25 15.005h5v2h-5z\" fill=\"currentColor\"></path><path d=\"M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z\" fill=\"currentColor\"></path><path d=\"M15 2.005h2v5h-2z\" fill=\"currentColor\"></path>", 9)])]);
}
var VPLightIcon_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["render", _sfc_render$13], ["__file", "VPLightIcon.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPToggleColorModeButton.vue?vue&type=script&setup=true&lang.ts
var VPToggleColorModeButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPToggleColorModeButton",
	setup(__props, { expose: __expose }) {
		__expose();
		const { themeLocale } = r$4();
		const isDarkMode = f();
		const toggleColorMode = () => {
			isDarkMode.value = !isDarkMode.value;
		};
		const __returned__ = {
			themeLocale,
			isDarkMode,
			toggleColorMode,
			VPDarkIcon: VPDarkIcon_default,
			VPLightIcon: VPLightIcon_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPToggleColorModeButton.vue
var _hoisted_1$10 = ["title"];
function _sfc_render$12(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("button", {
		type: "button",
		class: "vp-toggle-color-mode-button",
		title: $setup.themeLocale.toggleColorMode,
		onClick: $setup.toggleColorMode
	}, [withDirectives(createVNode($setup["VPLightIcon"], null, null, 512), [[vShow, !$setup.isDarkMode]]), withDirectives(createVNode($setup["VPDarkIcon"], null, null, 512), [[vShow, $setup.isDarkMode]])], 8, _hoisted_1$10);
}
var VPToggleColorModeButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPToggleColorModeButton_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$12], ["__file", "VPToggleColorModeButton.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPToggleSidebarButton.vue?vue&type=script&setup=true&lang.ts
var VPToggleSidebarButton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPToggleSidebarButton",
	emits: ["toggle"],
	setup(__props, { expose: __expose }) {
		__expose();
		const { themeLocale } = r$4();
		const __returned__ = { themeLocale };
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPToggleSidebarButton.vue
var _hoisted_1$9 = ["title"];
function _sfc_render$11(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		class: "vp-toggle-sidebar-button",
		title: $setup.themeLocale.toggleSidebar,
		"aria-expanded": "false",
		role: "button",
		tabindex: "0",
		onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle"))
	}, [..._cache[1] || (_cache[1] = [createBaseVNode("div", {
		class: "icon",
		"aria-hidden": "true"
	}, [
		createBaseVNode("span"),
		createBaseVNode("span"),
		createBaseVNode("span")
	], -1)])], 8, _hoisted_1$9);
}
var VPToggleSidebarButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPToggleSidebarButton_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$11], ["__file", "VPToggleSidebarButton.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbar.vue?vue&type=script&setup=true&lang.ts
var VPNavbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPNavbar",
	emits: ["toggleSidebar"],
	setup(__props, { expose: __expose }) {
		__expose();
		const SearchBox = xe("SearchBox") ? resolveComponent("SearchBox") : () => null;
		const { themeLocale } = r$4();
		const navbar = useTemplateRef("navbar");
		const navbarBrand = useTemplateRef("navbar-brand");
		const linksWrapperMaxWidth = /* @__PURE__ */ ref(0);
		const linksWrapperStyle = computed(() => {
			if (!linksWrapperMaxWidth.value) return {};
			return { maxWidth: `${linksWrapperMaxWidth.value}px` };
		});
		const getCssValue = (el, property) => {
			const val = el?.ownerDocument.defaultView?.getComputedStyle(el, null)[property];
			const num = Number.parseInt(val, 10);
			return Number.isNaN(num) ? 0 : num;
		};
		a$2(r$1.Mobile, (mobileDesktopBreakpoint) => {
			const navbarHorizontalPadding = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
			linksWrapperMaxWidth.value = window.innerWidth < mobileDesktopBreakpoint ? 0 : navbar.value.offsetWidth - navbarHorizontalPadding - (navbarBrand.value?.offsetWidth ?? 0);
		});
		const __returned__ = {
			SearchBox,
			themeLocale,
			navbar,
			navbarBrand,
			linksWrapperMaxWidth,
			linksWrapperStyle,
			getCssValue,
			VPNavbarBrand: VPNavbarBrand_default,
			VPNavbarItems: VPNavbarItems_default,
			VPToggleColorModeButton: VPToggleColorModeButton_default,
			VPToggleSidebarButton: VPToggleSidebarButton_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPNavbar.vue
var _hoisted_1$8 = {
	ref: "navbar",
	class: "vp-navbar",
	"vp-navbar": ""
};
var _hoisted_2$4 = { ref: "navbar-brand" };
function _sfc_render$10(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("header", _hoisted_1$8, [
		createVNode($setup["VPToggleSidebarButton"], { onToggle: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggleSidebar")) }),
		createBaseVNode("span", _hoisted_2$4, [createVNode($setup["VPNavbarBrand"])], 512),
		createBaseVNode("div", {
			class: "vp-navbar-items-wrapper",
			style: normalizeStyle($setup.linksWrapperStyle)
		}, [
			renderSlot(_ctx.$slots, "before"),
			createVNode($setup["VPNavbarItems"], { class: "vp-hide-mobile" }),
			renderSlot(_ctx.$slots, "after"),
			$setup.themeLocale.colorModeSwitch ? (openBlock(), createBlock($setup["VPToggleColorModeButton"], { key: 0 })) : createCommentVNode("", true),
			createVNode($setup["SearchBox"])
		], 4)
	], 512);
}
var VPNavbar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPNavbar_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$10], ["__file", "VPNavbar.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/resolveEditLink-lteF0-Mv.js
var i$1 = {
	GitHub: `:repo/edit/:branch/:path`,
	GitLab: `:repo/-/edit/:branch/:path`,
	Gitee: `:repo/edit/:branch/:path`,
	Bitbucket: `:repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default`
};
var a = ({ docsRepo: e, editLinkPattern: t }) => {
	if (t) return t;
	let n = t$1(e);
	return n == null ? null : i$1[n];
};
var o = ({ docsRepo: r, docsBranch: i, docsDir: o, filePathRelative: s, editLinkPattern: c }) => {
	if (!s) return null;
	let l = a({
		docsRepo: r,
		editLinkPattern: c
	});
	return l ? l.replace(/:repo/u, isLinkHttp(r) ? r : `https://github.com/${r}`).replace(/:branch/u, i).replace(/:path/u, removeLeadingSlash(`${removeEndingSlash(o)}/${s}`)) : null;
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useEditLink-BmoW42FE.js
var r = () => {
	let { frontmatter: r, page: i, themeLocale: a } = r$4();
	return computed(() => {
		if (!(r.value.editLink ?? a.value.editLink ?? !0)) return null;
		let { repo: e, docsRepo: t = e, docsBranch: o$7 = `main`, docsDir: s = ``, editLinkText: c } = a.value;
		if (!t) return null;
		let l = o({
			docsRepo: t,
			docsBranch: o$7,
			docsDir: s,
			filePathRelative: i.value.filePathRelative,
			editLinkPattern: r.value.editLinkPattern ?? a.value.editLinkPattern
		});
		return l ? {
			text: c ?? `Edit this page`,
			link: l
		} : null;
	});
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPEditIcon.vue
var _sfc_main = {};
var _hoisted_1$7 = {
	class: "edit-icon",
	viewBox: "0 0 1024 1024"
};
function _sfc_render$9(_ctx, _cache) {
	return openBlock(), createElementBlock("svg", _hoisted_1$7, [..._cache[0] || (_cache[0] = [createBaseVNode("g", { fill: "currentColor" }, [createBaseVNode("path", { d: "M430.818 653.65a60.46 60.46 0 0 1-50.96-93.281l71.69-114.012 7.773-10.365L816.038 80.138A60.46 60.46 0 0 1 859.225 62a60.46 60.46 0 0 1 43.186 18.138l43.186 43.186a60.46 60.46 0 0 1 0 86.373L588.879 565.55l-8.637 8.637-117.466 68.234a60.46 60.46 0 0 1-31.958 11.229z" }), createBaseVNode("path", { d: "M728.802 962H252.891A190.883 190.883 0 0 1 62.008 771.98V296.934a190.883 190.883 0 0 1 190.883-192.61h267.754a60.46 60.46 0 0 1 0 120.92H252.891a69.962 69.962 0 0 0-69.098 69.099V771.98a69.962 69.962 0 0 0 69.098 69.098h475.911A69.962 69.962 0 0 0 797.9 771.98V503.363a60.46 60.46 0 1 1 120.922 0V771.98A190.883 190.883 0 0 1 728.802 962z" })], -1)])]);
}
var VPEditIcon_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render$9], ["__file", "VPEditIcon.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPageMeta.vue?vue&type=script&setup=true&lang.ts
var VPPageMeta_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPPageMeta",
	setup(__props, { expose: __expose }) {
		__expose();
		const { frontmatter, themeLocale } = r$4();
		const __returned__ = {
			frontmatter,
			themeLocale,
			contributors: s$6(() => frontmatter.value.contributors ?? themeLocale.value.contributors ?? true),
			editLink: r(),
			lastUpdated: p$4(() => frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true),
			VPAutoLink: VPAutoLink_default,
			VPEditIcon: VPEditIcon_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPageMeta.vue
var _hoisted_1$6 = { class: "vp-page-meta" };
var _hoisted_2$3 = {
	key: 0,
	class: "vp-meta-item edit-link"
};
var _hoisted_3$2 = { class: "vp-meta-item git-info" };
var _hoisted_4$1 = {
	key: 0,
	class: "vp-meta-item last-updated"
};
var _hoisted_5$1 = { class: "meta-item-label" };
var _hoisted_6$1 = ["datetime"];
var _hoisted_7$1 = {
	key: 1,
	class: "vp-meta-item contributors"
};
var _hoisted_8 = { class: "meta-item-label" };
var _hoisted_9 = { class: "meta-item-info" };
var _hoisted_10 = ["title"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("footer", _hoisted_1$6, [$setup.editLink ? (openBlock(), createElementBlock("div", _hoisted_2$3, [createVNode($setup["VPAutoLink"], {
		class: "label",
		config: $setup.editLink
	}, {
		before: withCtx(() => [createVNode($setup["VPEditIcon"])]),
		_: 1
	}, 8, ["config"])])) : createCommentVNode("", true), createBaseVNode("div", _hoisted_3$2, [$setup.lastUpdated ? (openBlock(), createElementBlock("div", _hoisted_4$1, [createBaseVNode("span", _hoisted_5$1, toDisplayString($setup.themeLocale.lastUpdatedText ?? $setup.lastUpdated.locale) + ": ", 1), createBaseVNode("time", {
		class: "meta-item-info",
		datetime: $setup.lastUpdated.iso,
		"data-allow-mismatch": ""
	}, toDisplayString($setup.lastUpdated.text), 9, _hoisted_6$1)])) : createCommentVNode("", true), $setup.contributors.length ? (openBlock(), createElementBlock("div", _hoisted_7$1, [createBaseVNode("span", _hoisted_8, toDisplayString($setup.themeLocale.contributorsText) + ": ", 1), createBaseVNode("span", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.contributors, (contributor, index) => {
		return openBlock(), createElementBlock(Fragment, { key: index }, [createBaseVNode("span", {
			class: "contributor",
			title: `email: ${contributor.email}`
		}, toDisplayString(contributor.name), 9, _hoisted_10), index !== $setup.contributors.length - 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(", ")], 64)) : createCommentVNode("", true)], 64);
	}), 128))])])) : createCommentVNode("", true)])]);
}
var VPPageMeta_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPPageMeta_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$8], ["__file", "VPPageMeta.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useNavigate-mlFey3ew.js
var i = () => {
	let i = useRouter(), a = useRoute();
	return (n) => {
		n && (N(n) ? a.fullPath !== n && i.push(n) : isLinkWithProtocol(n) ? window.open(n) : i.push(encodeURI(n)));
	};
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/useRelatedLinks-BwsPumn1.js
var c = (n, r) => n === !1 ? !1 : isString$1(n) ? t$2(n, r) : isPlainObject(n) ? {
	...n,
	link: t$2(n.link, r).link
} : null;
var l$1 = (e, t, r) => {
	let i = e.findIndex((e) => e.link === t);
	if (i !== -1) {
		let t = e[i + r];
		return t ? t.link ? t : `prefix` in t && !resolveRoute(t.prefix).notFound ? {
			...t,
			link: t.prefix
		} : null : null;
	}
	for (let n of e) if (`children` in n) {
		let e = l$1(n.children, t, r);
		if (e) return e;
	}
	let a = e.findIndex((e) => `prefix` in e && e.prefix === t);
	if (a !== -1) {
		let t = e[a + r];
		return t ? t.link ? t : `prefix` in t && !resolveRoute(t.prefix).notFound ? {
			...t,
			link: t.prefix
		} : null : null;
	}
	return null;
};
var u = () => {
	let { frontmatter: e, themeLocale: t } = r$4(), n = y(), s = useRoutePath();
	return {
		prevLink: computed(() => {
			let r = c(e.value.prev, s.value);
			return r === !1 ? null : r ?? (t.value.prev === !1 ? null : l$1(n.value, s.value, -1));
		}),
		nextLink: computed(() => {
			let r = c(e.value.next, s.value);
			return r === !1 ? null : r ?? (t.value.next === !1 ? null : l$1(n.value, s.value, 1));
		})
	};
};
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPageNav.vue?vue&type=script&setup=true&lang.ts
var VPPageNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPPageNav",
	setup(__props, { expose: __expose }) {
		__expose();
		const { themeLocale } = r$4();
		const navigate = i();
		const { prevLink, nextLink } = u();
		const navbarLabel = computed(() => themeLocale.value.pageNavbarLabel ?? "page navigation");
		useEventListener("keydown", (event) => {
			if (event.altKey) {
				if (event.key === "ArrowRight") {
					if (nextLink.value) {
						navigate(nextLink.value.link);
						event.preventDefault();
					}
				} else if (event.key === "ArrowLeft" && prevLink.value) {
					navigate(prevLink.value.link);
					event.preventDefault();
				}
			}
		});
		const __returned__ = {
			themeLocale,
			navigate,
			prevLink,
			nextLink,
			navbarLabel,
			VPAutoLink: VPAutoLink_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPageNav.vue
var _hoisted_1$5 = ["aria-label"];
var _hoisted_2$2 = { class: "hint" };
var _hoisted_3$1 = { class: "link" };
var _hoisted_4 = { class: "external-link" };
var _hoisted_5 = { class: "hint" };
var _hoisted_6 = { class: "link" };
var _hoisted_7 = { class: "external-link" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
	return $setup.prevLink || $setup.nextLink ? (openBlock(), createElementBlock("nav", {
		key: 0,
		class: "vp-page-nav",
		"aria-label": $setup.navbarLabel
	}, [$setup.prevLink ? (openBlock(), createBlock($setup["VPAutoLink"], {
		key: 0,
		class: "prev",
		config: $setup.prevLink
	}, {
		default: withCtx(() => [createBaseVNode("div", _hoisted_2$2, [_cache[0] || (_cache[0] = createBaseVNode("span", { class: "arrow left" }, null, -1)), createTextVNode(" " + toDisplayString($setup.themeLocale.prev ?? "Prev"), 1)]), createBaseVNode("div", _hoisted_3$1, [createBaseVNode("span", _hoisted_4, toDisplayString($setup.prevLink.text), 1)])]),
		_: 1
	}, 8, ["config"])) : createCommentVNode("", true), $setup.nextLink ? (openBlock(), createBlock($setup["VPAutoLink"], {
		key: 1,
		class: "next",
		config: $setup.nextLink
	}, {
		default: withCtx(() => [createBaseVNode("div", _hoisted_5, [createTextVNode(toDisplayString($setup.themeLocale.next ?? "Next") + " ", 1), _cache[1] || (_cache[1] = createBaseVNode("span", { class: "arrow right" }, null, -1))]), createBaseVNode("div", _hoisted_6, [createBaseVNode("span", _hoisted_7, toDisplayString($setup.nextLink.text), 1)])]),
		_: 1
	}, 8, ["config"])) : createCommentVNode("", true)], 8, _hoisted_1$5)) : createCommentVNode("", true);
}
var VPPageNav_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPPageNav_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$7], ["__file", "VPPageNav.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPage.vue?vue&type=script&setup=true&lang.ts
var VPPage_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPPage",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			get Content() {
				return Content;
			},
			VPPageMeta: VPPageMeta_default,
			VPPageNav: VPPageNav_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPPage.vue
var _hoisted_1$4 = { class: "vp-page" };
var _hoisted_2$1 = { "vp-content": "" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("main", _hoisted_1$4, [
		renderSlot(_ctx.$slots, "top"),
		createBaseVNode("div", _hoisted_2$1, [
			renderSlot(_ctx.$slots, "content-top"),
			createVNode($setup["Content"], { id: "content" }),
			renderSlot(_ctx.$slots, "content-bottom")
		]),
		createVNode($setup["VPPageMeta"]),
		createVNode($setup["VPPageNav"]),
		renderSlot(_ctx.$slots, "bottom")
	]);
}
var VPPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPPage_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$6], ["__file", "VPPage.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/isActiveSidebarItem-CdmUcp0l.js
var t = (t, n) => n.hash === t || I(decodeURI(n.path), !0) === I(decodeURI(t), !0);
var n = (e, r) => e.link && t(e.link, r) ? !0 : `children` in e && e.children.some((e) => n(e, r));
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPDropdownTransition.vue?vue&type=script&setup=true&lang.ts
var VPDropdownTransition_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPDropdownTransition",
	setup(__props, { expose: __expose }) {
		__expose();
		const setHeight = (item) => {
			item.style.height = `${item.scrollHeight}px`;
		};
		const unsetHeight = (item) => {
			item.style.height = "";
		};
		const __returned__ = {
			setHeight,
			unsetHeight
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPDropdownTransition.vue
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createBlock(Transition, {
		name: "vp-dropdown",
		onEnter: $setup.setHeight,
		onAfterEnter: $setup.unsetHeight,
		onBeforeLeave: $setup.setHeight
	}, {
		default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
		_: 3
	});
}
var VPDropdownTransition_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPDropdownTransition_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$5], ["__file", "VPDropdownTransition.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebarItem.vue?vue&type=script&setup=true&lang.ts
var VPSidebarItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebarItem",
	props: {
		item: {},
		depth: { default: 0 }
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const route = useRoute();
		const router = useRouter();
		const collapsible = computed(() => __props.item.collapsible);
		const isActive = computed(() => n(__props.item, route));
		const itemClass = computed(() => ({
			"vp-sidebar-item": true,
			"vp-sidebar-heading": __props.depth === 0,
			"active": isActive.value,
			"collapsible": collapsible.value
		}));
		const isOpenDefault = computed(() => collapsible.value ? isActive.value : true);
		const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value);
		const onClick = (event) => {
			if (collapsible.value) {
				event.preventDefault();
				toggleIsOpen();
			}
		};
		const unregisterRouterHook = router.afterEach(() => {
			nextTick().then(() => {
				isOpen.value = isOpenDefault.value;
			});
		});
		onBeforeUnmount(() => {
			unregisterRouterHook();
		});
		const __returned__ = {
			route,
			router,
			collapsible,
			isActive,
			itemClass,
			isOpenDefault,
			isOpen,
			toggleIsOpen,
			onClick,
			unregisterRouterHook,
			VPAutoLink: VPAutoLink_default,
			VPDropdownTransition: VPDropdownTransition_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebarItem.vue
var _hoisted_1$3 = { class: "vp-sidebar-children" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
	const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
	return openBlock(), createElementBlock("li", null, [$props.item.link ? (openBlock(), createBlock($setup["VPAutoLink"], {
		key: 0,
		class: normalizeClass($setup.itemClass),
		config: $props.item
	}, {
		after: withCtx(() => [$setup.collapsible ? (openBlock(), createElementBlock("span", {
			key: 0,
			class: normalizeClass(["arrow", $setup.isOpen ? "down" : "right"])
		}, null, 2)) : createCommentVNode("", true)]),
		_: 1
	}, 8, ["class", "config"])) : (openBlock(), createElementBlock("p", {
		key: 1,
		tabindex: "0",
		class: normalizeClass($setup.itemClass),
		onClick: $setup.onClick,
		onKeydown: withKeys($setup.onClick, ["enter"])
	}, [createTextVNode(toDisplayString($props.item.text) + " ", 1), $setup.collapsible ? (openBlock(), createElementBlock("span", {
		key: 0,
		class: normalizeClass(["arrow", $setup.isOpen ? "down" : "right"])
	}, null, 2)) : createCommentVNode("", true)], 34)), "children" in $props.item && $props.item.children.length ? (openBlock(), createBlock($setup["VPDropdownTransition"], { key: 2 }, {
		default: withCtx(() => [withDirectives(createBaseVNode("ul", _hoisted_1$3, [(openBlock(true), createElementBlock(Fragment, null, renderList($props.item.children, (child) => {
			return openBlock(), createBlock(_component_VPSidebarItem, {
				key: `${$props.depth}${child.text}${child.link}`,
				item: child,
				depth: $props.depth + 1
			}, null, 8, ["item", "depth"]);
		}), 128))], 512), [[vShow, $setup.isOpen]])]),
		_: 1
	})) : createCommentVNode("", true)]);
}
var VPSidebarItem_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebarItem_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$4], ["__file", "VPSidebarItem.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebarItems.vue?vue&type=script&setup=true&lang.ts
var VPSidebarItems_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebarItems",
	setup(__props, { expose: __expose }) {
		__expose();
		const route = useRoute();
		const sidebarItems = y();
		onMounted(() => {
			watch(() => route.hash, (hash) => {
				const sidebar = document.querySelector(".vp-sidebar");
				if (!sidebar) return;
				const activeSidebarItem = document.querySelector(`.vp-sidebar .vp-sidebar-item.auto-link[href="${route.path}${hash}"]`);
				if (!activeSidebarItem) return;
				const { top: sidebarTop, height: sidebarHeight } = sidebar.getBoundingClientRect();
				const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
				if (activeSidebarItemTop < sidebarTop) activeSidebarItem.scrollIntoView(true);
				else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight) activeSidebarItem.scrollIntoView(false);
			});
		});
		const __returned__ = {
			route,
			sidebarItems,
			VPSidebarItem: VPSidebarItem_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebarItems.vue
var _hoisted_1$2 = {
	key: 0,
	class: "vp-sidebar-items"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
	return $setup.sidebarItems.length ? (openBlock(), createElementBlock("ul", _hoisted_1$2, [(openBlock(true), createElementBlock(Fragment, null, renderList($setup.sidebarItems, (item) => {
		return openBlock(), createBlock($setup["VPSidebarItem"], {
			key: `${item.text}${item.link}`,
			item
		}, null, 8, ["item"]);
	}), 128))])) : createCommentVNode("", true);
}
var VPSidebarItems_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebarItems_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$3], ["__file", "VPSidebarItems.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebar.vue?vue&type=script&setup=true&lang.ts
var VPSidebar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "VPSidebar",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			VPNavbarItems: VPNavbarItems_default,
			VPSidebarItems: VPSidebarItems_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/components/VPSidebar.vue
var _hoisted_1$1 = {
	class: "vp-sidebar",
	"vp-sidebar": ""
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("aside", _hoisted_1$1, [
		createVNode($setup["VPNavbarItems"]),
		renderSlot(_ctx.$slots, "top"),
		createVNode($setup["VPSidebarItems"]),
		renderSlot(_ctx.$slots, "bottom")
	]);
}
var VPSidebar_default = /*#__PURE__*/ _plugin_vue_export_helper_default(VPSidebar_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$2], ["__file", "VPSidebar.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/layouts/Layout.vue?vue&type=script&setup=true&lang.ts
var Layout_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Layout",
	setup(__props, { expose: __expose }) {
		__expose();
		const { frontmatter, page, themeLocale } = r$4();
		const shouldShowNavbar = computed(() => frontmatter.value.navbar ?? themeLocale.value.navbar ?? true);
		const sidebarItems = y();
		const isSidebarOpen = /* @__PURE__ */ ref(false);
		const toggleSidebar = (to) => {
			isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
		};
		const touchStart = {
			x: 0,
			y: 0
		};
		const onTouchStart = ({ changedTouches }) => {
			touchStart.x = changedTouches[0].clientX;
			touchStart.y = changedTouches[0].clientY;
		};
		const onTouchEnd = ({ changedTouches }) => {
			const dx = changedTouches[0].clientX - touchStart.x;
			const dy = changedTouches[0].clientY - touchStart.y;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
				if (dx > 0 && touchStart.x <= 80) toggleSidebar(true);
				else toggleSidebar(false);
			}
		};
		const enableExternalLinkIcon = computed(() => frontmatter.value.externalLinkIcon ?? themeLocale.value.externalLinkIcon ?? true);
		const containerClass = computed(() => [{
			"no-navbar": !shouldShowNavbar.value,
			"no-sidebar": sidebarItems.value.length === 0,
			"sidebar-open": isSidebarOpen.value,
			"external-link-icon": enableExternalLinkIcon.value
		}, frontmatter.value.pageClass]);
		onContentUpdated(() => {
			toggleSidebar(false);
		});
		const scrollPromise = r$3();
		const __returned__ = {
			frontmatter,
			page,
			themeLocale,
			shouldShowNavbar,
			sidebarItems,
			isSidebarOpen,
			toggleSidebar,
			touchStart,
			onTouchStart,
			onTouchEnd,
			enableExternalLinkIcon,
			containerClass,
			scrollPromise,
			onBeforeEnter: scrollPromise.resolve,
			onBeforeLeave: scrollPromise.pending,
			VPFadeSlideYTransition: VPFadeSlideYTransition_default,
			VPHome: VPHome_default,
			VPNavbar: VPNavbar_default,
			VPPage: VPPage_default,
			VPSidebar: VPSidebar_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/layouts/Layout.vue
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", {
		class: normalizeClass(["vp-theme-container", $setup.containerClass]),
		"vp-container": "",
		onTouchstart: $setup.onTouchStart,
		onTouchend: $setup.onTouchEnd
	}, [
		renderSlot(_ctx.$slots, "navbar", {}, () => [$setup.shouldShowNavbar ? (openBlock(), createBlock($setup["VPNavbar"], {
			key: 0,
			onToggleSidebar: $setup.toggleSidebar
		}, {
			before: withCtx(() => [renderSlot(_ctx.$slots, "navbar-before")]),
			after: withCtx(() => [renderSlot(_ctx.$slots, "navbar-after")]),
			_: 3
		})) : createCommentVNode("", true)]),
		createBaseVNode("div", {
			class: "vp-sidebar-mask",
			onClick: _cache[0] || (_cache[0] = ($event) => $setup.toggleSidebar(false))
		}),
		renderSlot(_ctx.$slots, "sidebar", {}, () => [createVNode($setup["VPSidebar"], null, {
			top: withCtx(() => [renderSlot(_ctx.$slots, "sidebar-top")]),
			bottom: withCtx(() => [renderSlot(_ctx.$slots, "sidebar-bottom")]),
			_: 3
		})]),
		renderSlot(_ctx.$slots, "page", {}, () => [createVNode($setup["VPFadeSlideYTransition"], {
			onBeforeEnter: $setup.onBeforeEnter,
			onBeforeLeave: $setup.onBeforeLeave
		}, {
			default: withCtx(() => [$setup.frontmatter.home ? (openBlock(), createBlock($setup["VPHome"], { key: 0 })) : (openBlock(), createBlock($setup["VPPage"], { key: $setup.page.path }, {
				top: withCtx(() => [renderSlot(_ctx.$slots, "page-top")]),
				"content-top": withCtx(() => [renderSlot(_ctx.$slots, "page-content-top")]),
				"content-bottom": withCtx(() => [renderSlot(_ctx.$slots, "page-content-bottom")]),
				bottom: withCtx(() => [renderSlot(_ctx.$slots, "page-bottom")]),
				_: 3
			}))]),
			_: 3
		}, 8, ["onBeforeEnter", "onBeforeLeave"])])
	], 34);
}
var Layout_default = /*#__PURE__*/ _plugin_vue_export_helper_default(Layout_vue_vue_type_script_setup_true_lang_default, [["render", _sfc_render$1], ["__file", "Layout.vue"]]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/layouts/NotFound.vue?vue&type=script&setup=true&lang.ts
var NotFound_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NotFound",
	setup(__props, { expose: __expose }) {
		__expose();
		const { routeLocale, theme, themeLocale } = r$4();
		const isMounted = useMounted();
		const expectedRouteLocale = computed(() => isMounted.value ? routeLocale.value : "/");
		const expectedThemeLocale = computed(() => {
			if (isMounted.value) return themeLocale.value;
			const { locales, ...baseOptions } = theme.value;
			return {
				...baseOptions,
				...locales?.["/"]
			};
		});
		const homeLink = computed(() => expectedThemeLocale.value.home ?? expectedRouteLocale.value);
		const homeText = computed(() => expectedThemeLocale.value.backToHome ?? "Back to home");
		const messages = computed(() => expectedThemeLocale.value.notFound ?? ["Not Found"]);
		const __returned__ = {
			routeLocale,
			theme,
			themeLocale,
			isMounted,
			expectedRouteLocale,
			expectedThemeLocale,
			homeLink,
			homeText,
			messages,
			notFoundMsg: computed(() => {
				if (isMounted.value) return messages.value[Math.floor(Math.random() * messages.value.length)];
				return messages.value[0];
			}),
			get RouteLink() {
				return RouteLink;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/layouts/NotFound.vue
var _hoisted_1 = {
	class: "vp-theme-container",
	"vp-container": ""
};
var _hoisted_2 = { class: "page" };
var _hoisted_3 = { "vp-content": "" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
	return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("main", _hoisted_2, [createBaseVNode("div", _hoisted_3, [
		_cache[0] || (_cache[0] = createBaseVNode("h1", null, "404", -1)),
		createBaseVNode("blockquote", null, toDisplayString($setup.notFoundMsg), 1),
		createVNode($setup["RouteLink"], { to: $setup.homeLink }, {
			default: withCtx(() => [createTextVNode(toDisplayString($setup.homeText), 1)]),
			_: 1
		}, 8, ["to"])
	])])]);
}
var NotFound_default = /*#__PURE__*/ _plugin_vue_export_helper_default(NotFound_vue_vue_type_script_setup_true_lang_default, [
	["render", _sfc_render],
	["__scopeId", "data-v-3fac1c72"],
	["__file", "NotFound.vue"]
]);
//#endregion
//#region node_modules/@vuepress/theme-default/dist/client/config.js
var config_exports = /* @__PURE__ */ __exportAll$1({
	clientConfig: () => l,
	default: () => l
});
var l = defineClientConfig({
	enhance({ app: t, router: n }) {
		xe(`Badge`) || t.component(`Badge`, Badge_default);
		let r = n.options.scrollBehavior;
		n.options.scrollBehavior = async (...e) => (await r$3().wait(), r(...e));
	},
	setup() {
		p$1(), l$2(), x();
	},
	layouts: {
		Layout: Layout_default,
		NotFound: NotFound_default
	}
});
//#endregion
//#region docs/.vuepress/.temp/internal/clientConfigs.js
var clientConfigs = [
	config_exports$10,
	config_exports$9,
	config_exports$8,
	config_exports$7,
	config_exports$6,
	config_exports$5,
	config_exports$4,
	config_exports$3,
	config_exports$2,
	config_exports$1,
	config_exports
].map((m) => m.default).filter(Boolean);
//#endregion
//#region node_modules/@vuepress/client/dist/app.js
/**
* Global site data ref
*/
var siteData$1 = /* @__PURE__ */ shallowRef(JSON.parse("{\"base\":\"/catpod/\",\"lang\":\"en-GB\",\"title\":\"CATPOD Docs\",\"description\":\"Documentation and manual for the CATPOD container.\",\"head\":[],\"locales\":{\"/\":{\"lang\":\"en-GB\",\"title\":\"CATPOD Docs\",\"description\":\"Documentation and manual for the CATPOD container.\"}}}"));
/**
* - use `createWebHistory` in dev mode and build mode client bundle
* - use `createMemoryHistory` in build mode server bundle
*/
var historyCreator = createWebHistory;
/**
* Create router instance
*/
var createVueRouter = () => {
	const router = createRouter({
		history: historyCreator(removeEndingSlash("/catpod/")),
		routes: [{
			name: "vuepress-route",
			path: "/:catchAll(.*)",
			components: {}
		}],
		scrollBehavior: (to, _from, savedPosition) => {
			if (savedPosition) return savedPosition;
			if (to.hash) return { el: to.hash };
			return { top: 0 };
		}
	});
	router.beforeResolve(async (to, from) => {
		if (to.path !== from.path || from === START_LOCATION_NORMALIZED) {
			const route = resolveRoute(to.fullPath);
			if (route.path !== to.fullPath) return route.path;
			const pageChunk = await route.loader();
			to.meta = {
				...route.meta,
				_pageChunk: pageChunk
			};
		} else if (to.path === from.path) to.meta = from.meta;
	});
	return router;
};
/**
* Register global built-in components
*/
var setupGlobalComponents = (app) => {
	app.component("ClientOnly", ClientOnly);
	app.component("Content", Content);
	app.component("RouteLink", RouteLink);
};
/**
* Create and provide global computed
*/
var setupGlobalComputed = (app, router, clientConfigs) => {
	const routePath = computed(() => router.currentRoute.value.path);
	const pageChunk = customRef((track, trigger) => ({
		get() {
			track();
			return router.currentRoute.value.meta._pageChunk;
		},
		set(value) {
			router.currentRoute.value.meta._pageChunk = value;
			trigger();
		}
	}));
	const layouts = computed(() => resolvers.resolveLayouts(clientConfigs));
	const routeLocale = computed(() => resolvers.resolveRouteLocale(siteData$1.value.locales, routePath.value));
	const siteLocaleData = computed(() => resolvers.resolveSiteLocaleData(siteData$1.value, routeLocale.value));
	const pageComponent = computed(() => pageChunk.value.default);
	const pageData = computed(() => pageChunk.value._pageData);
	const pageFrontmatter = computed(() => pageData.value.frontmatter);
	const pageHeadTitle = computed(() => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value));
	const pageHead = computed(() => resolvers.resolvePageHead(pageHeadTitle.value, pageFrontmatter.value, siteLocaleData.value));
	const pageLang = computed(() => resolvers.resolvePageLang(pageData.value, siteLocaleData.value));
	const clientData = {
		layouts,
		pageData,
		pageComponent,
		pageFrontmatter,
		pageHead,
		pageHeadTitle,
		pageLang,
		pageLayout: computed(() => resolvers.resolvePageLayout(pageData.value, layouts.value)),
		redirects: redirects$1,
		routeLocale,
		routePath,
		routes: routes$1,
		siteData: siteData$1,
		siteLocaleData,
		frontmatter: pageFrontmatter,
		head: pageHead,
		headTitle: pageHeadTitle,
		lang: pageLang,
		page: pageData,
		site: siteData$1,
		siteLocale: siteLocaleData
	};
	app.provide(clientDataSymbol, clientData);
	Object.defineProperties(app.config.globalProperties, {
		$pageFrontmatter: { get: () => pageFrontmatter.value },
		$pageHead: { get: () => pageHead.value },
		$pageHeadTitle: { get: () => pageHeadTitle.value },
		$pageLang: { get: () => pageLang.value },
		$pageData: { get: () => pageData.value },
		$routeLocale: { get: () => routeLocale.value },
		$withBase: { get: () => withBase },
		$frontmatter: { get: () => pageFrontmatter.value },
		$head: { get: () => pageHead.value },
		$headTitle: { get: () => pageHeadTitle.value },
		$lang: { get: () => pageLang.value },
		$page: { get: () => pageData.value },
		$site: { get: () => siteData$1.value },
		$siteLocale: { get: () => siteLocaleData.value }
	});
	return clientData;
};
/**
* Query the matched head element of head config
*/
var queryHeadElement = ([tagName, attrs, content = ""]) => {
	const selector = `head > ${tagName}${Object.entries(attrs).map(([key, value]) => {
		if (isString$1(value)) return `[${key}=${JSON.stringify(value)}]`;
		if (value) return `[${key}]`;
		return "";
	}).join("")}`;
	return Array.from(document.querySelectorAll(selector)).find((item) => item.innerText === content) ?? null;
};
/**
* Create head element from head config
*/
var createHeadElement = ([tagName, attrs, content]) => {
	if (!isString$1(tagName)) return null;
	const headElement = document.createElement(tagName);
	if (isPlainObject(attrs)) Object.entries(attrs).forEach(([key, value]) => {
		if (isString$1(value)) headElement.setAttribute(key, value);
		else if (value) headElement.setAttribute(key, "");
	});
	if (isString$1(content)) headElement.appendChild(document.createTextNode(content));
	return headElement;
};
/**
* Auto update head and provide as global util
*/
var setupUpdateHead = () => {
	const head = usePageHead();
	const lang = usePageLang();
	let managedHeadElements = [];
	/**
	* Take over the existing head elements
	*/
	const takeOverHeadElements = () => {
		head.value.forEach((item) => {
			const headElement = queryHeadElement(item);
			if (headElement) managedHeadElements.push(headElement);
		});
	};
	/**
	* Generate head elements from current head config
	*/
	const generateHeadElements = () => {
		const result = [];
		head.value.forEach((item) => {
			const headElement = createHeadElement(item);
			if (headElement) result.push(headElement);
		});
		return result;
	};
	/**
	* Update head elements
	*/
	const updateHead = () => {
		document.documentElement.lang = lang.value;
		const newHeadElements = generateHeadElements();
		managedHeadElements.forEach((oldEl, oldIndex) => {
			const matchedIndex = newHeadElements.findIndex((newEl) => oldEl.isEqualNode(newEl));
			if (matchedIndex === -1) {
				oldEl.remove();
				delete managedHeadElements[oldIndex];
			} else newHeadElements.splice(matchedIndex, 1);
		});
		newHeadElements.forEach((el) => document.head.appendChild(el));
		managedHeadElements = [...managedHeadElements.filter((item) => !!item), ...newHeadElements];
	};
	provide(updateHeadSymbol, updateHead);
	onMounted(() => {
		takeOverHeadElements();
		watch(head, updateHead, { immediate: false });
	});
};
/**
* - use `createApp` in dev mode
* - use `createSSRApp` in build mode
*/
var appCreator = createSSRApp;
var createVueApp = async () => {
	const app = appCreator({
		name: "Vuepress",
		setup() {
			setupUpdateHead();
			for (const clientConfig of clientConfigs) clientConfig.setup?.();
			const clientRootComponents = clientConfigs.flatMap(({ rootComponents = [] }) => rootComponents.map((component) => h$1(component)));
			const pageLayout = usePageLayout();
			return () => [h$1(pageLayout.value), clientRootComponents];
		}
	});
	const router = createVueRouter();
	setupGlobalComponents(app);
	const globalComputed = setupGlobalComputed(app, router, clientConfigs);
	{
		const { setupDevtools } = await __vitePreload(async () => {
			const { setupDevtools } = await import("./setupDevtools-DJemw8CK-BtwjToLC.js");
			return { setupDevtools };
		}, []);
		setupDevtools(app, globalComputed);
	}
	for (const clientConfig of clientConfigs) await clientConfig.enhance?.({
		app,
		router,
		siteData: siteData$1
	});
	app.use(router);
	return {
		app,
		router
	};
};
createVueApp().then(({ app, router }) => {
	router.isReady().then(() => {
		app.mount("#app");
	});
});
//#endregion
export { watch as _, INSPECTOR_NODES as a, PLUGIN_LABEL as c, createVueApp, createElementBlock as d, createStaticVNode as f, resolveComponent as g, openBlock as h, INSPECTOR_LABEL as i, setupDevToolsPlugin as l, createVNode as m, COMPONENT_STATE_TYPE as n, INSPECTOR_STATE_SECTION_NAME as o, createTextVNode as p, INSPECTOR_ID as r, PLUGIN_ID as s, _plugin_vue_export_helper_default as t, createBaseVNode as u, withCtx as v };
