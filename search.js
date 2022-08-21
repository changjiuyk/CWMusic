(()=>{var ee=Object.create;var q=Object.defineProperty;var te=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ie=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty;var se=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oe=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of re(e))!ne.call(t,n)&&n!==r&&q(t,n,{get:()=>e[n],enumerable:!(i=te(e,n))||i.enumerable});return t};var ae=(t,e,r)=>(r=t!=null?ee(ie(t)):{},oe(e||!t||!t.__esModule?q(r,"default",{value:t,enumerable:!0}):r,t));var J=se((U,H)=>{(function(){var t=function(e){var r=new t.Builder;return r.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),r.searchPipeline.add(t.stemmer),e.call(r,r),r.build()};t.version="2.3.9";t.utils={},t.utils.warn=function(e){return function(r){e.console&&console.warn&&console.warn(r)}}(this),t.utils.asString=function(e){return e==null?"":e.toString()},t.utils.clone=function(e){if(e==null)return e;for(var r=Object.create(null),i=Object.keys(e),n=0;n<i.length;n++){var s=i[n],o=e[s];if(Array.isArray(o)){r[s]=o.slice();continue}if(typeof o=="string"||typeof o=="number"||typeof o=="boolean"){r[s]=o;continue}throw new TypeError("clone is not deep and does not support nested objects")}return r},t.FieldRef=function(e,r,i){this.docRef=e,this.fieldName=r,this._stringValue=i},t.FieldRef.joiner="/",t.FieldRef.fromString=function(e){var r=e.indexOf(t.FieldRef.joiner);if(r===-1)throw"malformed field ref string";var i=e.slice(0,r),n=e.slice(r+1);return new t.FieldRef(n,i,e)},t.FieldRef.prototype.toString=function(){return this._stringValue==null&&(this._stringValue=this.fieldName+t.FieldRef.joiner+this.docRef),this._stringValue};t.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length;for(var r=0;r<this.length;r++)this.elements[e[r]]=!0}else this.length=0},t.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},t.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},t.Set.prototype.contains=function(e){return!!this.elements[e]},t.Set.prototype.intersect=function(e){var r,i,n,s=[];if(e===t.Set.complete)return this;if(e===t.Set.empty)return e;this.length<e.length?(r=this,i=e):(r=e,i=this),n=Object.keys(r.elements);for(var o=0;o<n.length;o++){var a=n[o];a in i.elements&&s.push(a)}return new t.Set(s)},t.Set.prototype.union=function(e){return e===t.Set.complete?t.Set.complete:e===t.Set.empty?this:new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},t.idf=function(e,r){var i=0;for(var n in e)n!="_index"&&(i+=Object.keys(e[n]).length);var s=(r-i+.5)/(i+.5);return Math.log(1+Math.abs(s))},t.Token=function(e,r){this.str=e||"",this.metadata=r||{}},t.Token.prototype.toString=function(){return this.str},t.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},t.Token.prototype.clone=function(e){return e=e||function(r){return r},new t.Token(e(this.str,this.metadata),this.metadata)};t.tokenizer=function(e,r){if(e==null||e==null)return[];if(Array.isArray(e))return e.map(function(f){return new t.Token(t.utils.asString(f).toLowerCase(),t.utils.clone(r))});for(var i=e.toString().toLowerCase(),n=i.length,s=[],o=0,a=0;o<=n;o++){var l=i.charAt(o),u=o-a;if(l.match(t.tokenizer.separator)||o==n){if(u>0){var h=t.utils.clone(r)||{};h.position=[a,u],h.index=s.length,s.push(new t.Token(i.slice(a,o),h))}a=o+1}}return s},t.tokenizer.separator=/[\s\-]+/;t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions=Object.create(null),t.Pipeline.registerFunction=function(e,r){r in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+r),e.label=r,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var r=e.label&&e.label in this.registeredFunctions;r||t.utils.warn(`Function is not registered with pipeline. This may cause problems when serialising the index.
`,e)},t.Pipeline.load=function(e){var r=new t.Pipeline;return e.forEach(function(i){var n=t.Pipeline.registeredFunctions[i];if(n)r.add(n);else throw new Error("Cannot load unregistered function: "+i)}),r},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(r){t.Pipeline.warnIfFunctionNotRegistered(r),this._stack.push(r)},this)},t.Pipeline.prototype.after=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var i=this._stack.indexOf(e);if(i==-1)throw new Error("Cannot find existingFn");i=i+1,this._stack.splice(i,0,r)},t.Pipeline.prototype.before=function(e,r){t.Pipeline.warnIfFunctionNotRegistered(r);var i=this._stack.indexOf(e);if(i==-1)throw new Error("Cannot find existingFn");this._stack.splice(i,0,r)},t.Pipeline.prototype.remove=function(e){var r=this._stack.indexOf(e);r!=-1&&this._stack.splice(r,1)},t.Pipeline.prototype.run=function(e){for(var r=this._stack.length,i=0;i<r;i++){for(var n=this._stack[i],s=[],o=0;o<e.length;o++){var a=n(e[o],o,e);if(!(a==null||a===""))if(Array.isArray(a))for(var l=0;l<a.length;l++)s.push(a[l]);else s.push(a)}e=s}return e},t.Pipeline.prototype.runString=function(e,r){var i=new t.Token(e,r);return this.run([i]).map(function(n){return n.toString()})},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})};t.Vector=function(e){this._magnitude=0,this.elements=e||[]},t.Vector.prototype.positionForIndex=function(e){if(this.elements.length==0)return 0;for(var r=0,i=this.elements.length/2,n=i-r,s=Math.floor(n/2),o=this.elements[s*2];n>1&&(o<e&&(r=s),o>e&&(i=s),o!=e);)n=i-r,s=r+Math.floor(n/2),o=this.elements[s*2];if(o==e||o>e)return s*2;if(o<e)return(s+1)*2},t.Vector.prototype.insert=function(e,r){this.upsert(e,r,function(){throw"duplicate index"})},t.Vector.prototype.upsert=function(e,r,i){this._magnitude=0;var n=this.positionForIndex(e);this.elements[n]==e?this.elements[n+1]=i(this.elements[n+1],r):this.elements.splice(n,0,e,r)},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var e=0,r=this.elements.length,i=1;i<r;i+=2){var n=this.elements[i];e+=n*n}return this._magnitude=Math.sqrt(e)},t.Vector.prototype.dot=function(e){for(var r=0,i=this.elements,n=e.elements,s=i.length,o=n.length,a=0,l=0,u=0,h=0;u<s&&h<o;)a=i[u],l=n[h],a<l?u+=2:a>l?h+=2:a==l&&(r+=i[u+1]*n[h+1],u+=2,h+=2);return r},t.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},t.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),r=1,i=0;r<this.elements.length;r+=2,i++)e[i]=this.elements[r];return e},t.Vector.prototype.toJSON=function(){return this.elements};t.stemmer=function(){var e={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[^aeiou]",n="[aeiouy]",s=i+"[^aeiouy]*",o=n+"[aeiou]*",a="^("+s+")?"+o+s,l="^("+s+")?"+o+s+"("+o+")?$",u="^("+s+")?"+o+s+o+s,h="^("+s+")?"+n,f=new RegExp(a),p=new RegExp(u),S=new RegExp(l),g=new RegExp(h),L=/^(.+?)(ss|i)es$/,y=/^(.+?)([^s])s$/,v=/^(.+?)eed$/,P=/^(.+?)(ed|ing)$/,b=/.$/,E=/(at|bl|iz)$/,_=new RegExp("([^aeiouylsz])\\1$"),j=new RegExp("^"+s+n+"[^aeiouwxy]$"),F=/^(.+?[^aeiou])y$/,V=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,N=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,C=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,B=/^(.+?)(s|t)(ion)$/,w=/^(.+?)e$/,z=/ll$/,M=new RegExp("^"+s+n+"[^aeiouwxy]$"),D=function(c){var x,T,k,d,m,O,R;if(c.length<3)return c;if(k=c.substr(0,1),k=="y"&&(c=k.toUpperCase()+c.substr(1)),d=L,m=y,d.test(c)?c=c.replace(d,"$1$2"):m.test(c)&&(c=c.replace(m,"$1$2")),d=v,m=P,d.test(c)){var Q=d.exec(c);d=f,d.test(Q[1])&&(d=b,c=c.replace(d,""))}else if(m.test(c)){var Q=m.exec(c);x=Q[1],m=g,m.test(x)&&(c=x,m=E,O=_,R=j,m.test(c)?c=c+"e":O.test(c)?(d=b,c=c.replace(d,"")):R.test(c)&&(c=c+"e"))}if(d=F,d.test(c)){var Q=d.exec(c);x=Q[1],c=x+"i"}if(d=V,d.test(c)){var Q=d.exec(c);x=Q[1],T=Q[2],d=f,d.test(x)&&(c=x+e[T])}if(d=N,d.test(c)){var Q=d.exec(c);x=Q[1],T=Q[2],d=f,d.test(x)&&(c=x+r[T])}if(d=C,m=B,d.test(c)){var Q=d.exec(c);x=Q[1],d=p,d.test(x)&&(c=x)}else if(m.test(c)){var Q=m.exec(c);x=Q[1]+Q[2],m=p,m.test(x)&&(c=x)}if(d=w,d.test(c)){var Q=d.exec(c);x=Q[1],d=p,m=S,O=M,(d.test(x)||m.test(x)&&!O.test(x))&&(c=x)}return d=z,m=p,d.test(c)&&m.test(c)&&(d=b,c=c.replace(d,"")),k=="y"&&(c=k.toLowerCase()+c.substr(1)),c};return function(I){return I.update(D)}}(),t.Pipeline.registerFunction(t.stemmer,"stemmer");t.generateStopWordFilter=function(e){var r=e.reduce(function(i,n){return i[n]=n,i},{});return function(i){if(i&&r[i.toString()]!==i.toString())return i}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter");t.trimmer=function(e){return e.update(function(r){return r.replace(/^\W+/,"").replace(/\W+$/,"")})},t.Pipeline.registerFunction(t.trimmer,"trimmer");t.TokenSet=function(){this.final=!1,this.edges={},this.id=t.TokenSet._nextId,t.TokenSet._nextId+=1},t.TokenSet._nextId=1,t.TokenSet.fromArray=function(e){for(var r=new t.TokenSet.Builder,i=0,n=e.length;i<n;i++)r.insert(e[i]);return r.finish(),r.root},t.TokenSet.fromClause=function(e){return"editDistance"in e?t.TokenSet.fromFuzzyString(e.term,e.editDistance):t.TokenSet.fromString(e.term)},t.TokenSet.fromFuzzyString=function(e,r){for(var i=new t.TokenSet,n=[{node:i,editsRemaining:r,str:e}];n.length;){var s=n.pop();if(s.str.length>0){var o=s.str.charAt(0),a;o in s.node.edges?a=s.node.edges[o]:(a=new t.TokenSet,s.node.edges[o]=a),s.str.length==1&&(a.final=!0),n.push({node:a,editsRemaining:s.editsRemaining,str:s.str.slice(1)})}if(s.editsRemaining!=0){if("*"in s.node.edges)var l=s.node.edges["*"];else{var l=new t.TokenSet;s.node.edges["*"]=l}if(s.str.length==0&&(l.final=!0),n.push({node:l,editsRemaining:s.editsRemaining-1,str:s.str}),s.str.length>1&&n.push({node:s.node,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)}),s.str.length==1&&(s.node.final=!0),s.str.length>=1){if("*"in s.node.edges)var u=s.node.edges["*"];else{var u=new t.TokenSet;s.node.edges["*"]=u}s.str.length==1&&(u.final=!0),n.push({node:u,editsRemaining:s.editsRemaining-1,str:s.str.slice(1)})}if(s.str.length>1){var h=s.str.charAt(0),f=s.str.charAt(1),p;f in s.node.edges?p=s.node.edges[f]:(p=new t.TokenSet,s.node.edges[f]=p),s.str.length==1&&(p.final=!0),n.push({node:p,editsRemaining:s.editsRemaining-1,str:h+s.str.slice(2)})}}}return i},t.TokenSet.fromString=function(e){for(var r=new t.TokenSet,i=r,n=0,s=e.length;n<s;n++){var o=e[n],a=n==s-1;if(o=="*")r.edges[o]=r,r.final=a;else{var l=new t.TokenSet;l.final=a,r.edges[o]=l,r=l}}return i},t.TokenSet.prototype.toArray=function(){for(var e=[],r=[{prefix:"",node:this}];r.length;){var i=r.pop(),n=Object.keys(i.node.edges),s=n.length;i.node.final&&(i.prefix.charAt(0),e.push(i.prefix));for(var o=0;o<s;o++){var a=n[o];r.push({prefix:i.prefix.concat(a),node:i.node.edges[a]})}}return e},t.TokenSet.prototype.toString=function(){if(this._str)return this._str;for(var e=this.final?"1":"0",r=Object.keys(this.edges).sort(),i=r.length,n=0;n<i;n++){var s=r[n],o=this.edges[s];e=e+s+o.id}return e},t.TokenSet.prototype.intersect=function(e){for(var r=new t.TokenSet,i=void 0,n=[{qNode:e,output:r,node:this}];n.length;){i=n.pop();for(var s=Object.keys(i.qNode.edges),o=s.length,a=Object.keys(i.node.edges),l=a.length,u=0;u<o;u++)for(var h=s[u],f=0;f<l;f++){var p=a[f];if(p==h||h=="*"){var S=i.node.edges[p],g=i.qNode.edges[h],L=S.final&&g.final,y=void 0;p in i.output.edges?(y=i.output.edges[p],y.final=y.final||L):(y=new t.TokenSet,y.final=L,i.output.edges[p]=y),n.push({qNode:g,output:y,node:S})}}}return r},t.TokenSet.Builder=function(){this.previousWord="",this.root=new t.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},t.TokenSet.Builder.prototype.insert=function(e){var r,i=0;if(e<this.previousWord)throw new Error("Out of order word insertion");for(var n=0;n<e.length&&n<this.previousWord.length&&e[n]==this.previousWord[n];n++)i++;this.minimize(i),this.uncheckedNodes.length==0?r=this.root:r=this.uncheckedNodes[this.uncheckedNodes.length-1].child;for(var n=i;n<e.length;n++){var s=new t.TokenSet,o=e[n];r.edges[o]=s,this.uncheckedNodes.push({parent:r,char:o,child:s}),r=s}r.final=!0,this.previousWord=e},t.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},t.TokenSet.Builder.prototype.minimize=function(e){for(var r=this.uncheckedNodes.length-1;r>=e;r--){var i=this.uncheckedNodes[r],n=i.child.toString();n in this.minimizedNodes?i.parent.edges[i.char]=this.minimizedNodes[n]:(i.child._str=n,this.minimizedNodes[n]=i.child),this.uncheckedNodes.pop()}};t.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},t.Index.prototype.search=function(e){return this.query(function(r){var i=new t.QueryParser(e,r);i.parse()})},t.Index.prototype.query=function(e){for(var r=new t.Query(this.fields),i=Object.create(null),n=Object.create(null),s=Object.create(null),o=Object.create(null),a=Object.create(null),l=0;l<this.fields.length;l++)n[this.fields[l]]=new t.Vector;e.call(r,r);for(var l=0;l<r.clauses.length;l++){var u=r.clauses[l],h=null,f=t.Set.empty;u.usePipeline?h=this.pipeline.runString(u.term,{fields:u.fields}):h=[u.term];for(var p=0;p<h.length;p++){var S=h[p];u.term=S;var g=t.TokenSet.fromClause(u),L=this.tokenSet.intersect(g).toArray();if(L.length===0&&u.presence===t.Query.presence.REQUIRED){for(var y=0;y<u.fields.length;y++){var v=u.fields[y];o[v]=t.Set.empty}break}for(var P=0;P<L.length;P++)for(var b=L[P],E=this.invertedIndex[b],_=E._index,y=0;y<u.fields.length;y++){var v=u.fields[y],j=E[v],F=Object.keys(j),V=b+"/"+v,N=new t.Set(F);if(u.presence==t.Query.presence.REQUIRED&&(f=f.union(N),o[v]===void 0&&(o[v]=t.Set.complete)),u.presence==t.Query.presence.PROHIBITED){a[v]===void 0&&(a[v]=t.Set.empty),a[v]=a[v].union(N);continue}if(n[v].upsert(_,u.boost,function(Z,K){return Z+K}),!s[V]){for(var C=0;C<F.length;C++){var B=F[C],w=new t.FieldRef(B,v),z=j[B],M;(M=i[w])===void 0?i[w]=new t.MatchData(b,v,z):M.add(b,v,z)}s[V]=!0}}}if(u.presence===t.Query.presence.REQUIRED)for(var y=0;y<u.fields.length;y++){var v=u.fields[y];o[v]=o[v].intersect(f)}}for(var D=t.Set.complete,I=t.Set.empty,l=0;l<this.fields.length;l++){var v=this.fields[l];o[v]&&(D=D.intersect(o[v])),a[v]&&(I=I.union(a[v]))}var c=Object.keys(i),x=[],T=Object.create(null);if(r.isNegated()){c=Object.keys(this.fieldVectors);for(var l=0;l<c.length;l++){var w=c[l],k=t.FieldRef.fromString(w);i[w]=new t.MatchData}}for(var l=0;l<c.length;l++){var k=t.FieldRef.fromString(c[l]),d=k.docRef;if(!!D.contains(d)&&!I.contains(d)){var m=this.fieldVectors[k],O=n[k.fieldName].similarity(m),R;if((R=T[d])!==void 0)R.score+=O,R.matchData.combine(i[k]);else{var Q={ref:d,score:O,matchData:i[k]};T[d]=Q,x.push(Q)}}}return x.sort(function(X,Y){return Y.score-X.score})},t.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map(function(i){return[i,this.invertedIndex[i]]},this),r=Object.keys(this.fieldVectors).map(function(i){return[i,this.fieldVectors[i].toJSON()]},this);return{version:t.version,fields:this.fields,fieldVectors:r,invertedIndex:e,pipeline:this.pipeline.toJSON()}},t.Index.load=function(e){var r={},i={},n=e.fieldVectors,s=Object.create(null),o=e.invertedIndex,a=new t.TokenSet.Builder,l=t.Pipeline.load(e.pipeline);e.version!=t.version&&t.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+t.version+"' does not match serialized index '"+e.version+"'");for(var u=0;u<n.length;u++){var h=n[u],f=h[0],p=h[1];i[f]=new t.Vector(p)}for(var u=0;u<o.length;u++){var h=o[u],S=h[0],g=h[1];a.insert(S),s[S]=g}return a.finish(),r.fields=e.fields,r.fieldVectors=i,r.invertedIndex=s,r.tokenSet=a.root,r.pipeline=l,new t.Index(r)};t.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=t.tokenizer,this.pipeline=new t.Pipeline,this.searchPipeline=new t.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},t.Builder.prototype.ref=function(e){this._ref=e},t.Builder.prototype.field=function(e,r){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'");this._fields[e]=r||{}},t.Builder.prototype.b=function(e){e<0?this._b=0:e>1?this._b=1:this._b=e},t.Builder.prototype.k1=function(e){this._k1=e},t.Builder.prototype.add=function(e,r){var i=e[this._ref],n=Object.keys(this._fields);this._documents[i]=r||{},this.documentCount+=1;for(var s=0;s<n.length;s++){var o=n[s],a=this._fields[o].extractor,l=a?a(e):e[o],u=this.tokenizer(l,{fields:[o]}),h=this.pipeline.run(u),f=new t.FieldRef(i,o),p=Object.create(null);this.fieldTermFrequencies[f]=p,this.fieldLengths[f]=0,this.fieldLengths[f]+=h.length;for(var S=0;S<h.length;S++){var g=h[S];if(p[g]==null&&(p[g]=0),p[g]+=1,this.invertedIndex[g]==null){var L=Object.create(null);L._index=this.termIndex,this.termIndex+=1;for(var y=0;y<n.length;y++)L[n[y]]=Object.create(null);this.invertedIndex[g]=L}this.invertedIndex[g][o][i]==null&&(this.invertedIndex[g][o][i]=Object.create(null));for(var v=0;v<this.metadataWhitelist.length;v++){var P=this.metadataWhitelist[v],b=g.metadata[P];this.invertedIndex[g][o][i][P]==null&&(this.invertedIndex[g][o][i][P]=[]),this.invertedIndex[g][o][i][P].push(b)}}}},t.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),r=e.length,i={},n={},s=0;s<r;s++){var o=t.FieldRef.fromString(e[s]),a=o.fieldName;n[a]||(n[a]=0),n[a]+=1,i[a]||(i[a]=0),i[a]+=this.fieldLengths[o]}for(var l=Object.keys(this._fields),s=0;s<l.length;s++){var u=l[s];i[u]=i[u]/n[u]}this.averageFieldLength=i},t.Builder.prototype.createFieldVectors=function(){for(var e={},r=Object.keys(this.fieldTermFrequencies),i=r.length,n=Object.create(null),s=0;s<i;s++){for(var o=t.FieldRef.fromString(r[s]),a=o.fieldName,l=this.fieldLengths[o],u=new t.Vector,h=this.fieldTermFrequencies[o],f=Object.keys(h),p=f.length,S=this._fields[a].boost||1,g=this._documents[o.docRef].boost||1,L=0;L<p;L++){var y=f[L],v=h[y],P=this.invertedIndex[y]._index,b,E,_;n[y]===void 0?(b=t.idf(this.invertedIndex[y],this.documentCount),n[y]=b):b=n[y],E=b*((this._k1+1)*v)/(this._k1*(1-this._b+this._b*(l/this.averageFieldLength[a]))+v),E*=S,E*=g,_=Math.round(E*1e3)/1e3,u.insert(P,_)}e[o]=u}this.fieldVectors=e},t.Builder.prototype.createTokenSet=function(){this.tokenSet=t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},t.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new t.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},t.Builder.prototype.use=function(e){var r=Array.prototype.slice.call(arguments,1);r.unshift(this),e.apply(this,r)},t.MatchData=function(e,r,i){for(var n=Object.create(null),s=Object.keys(i||{}),o=0;o<s.length;o++){var a=s[o];n[a]=i[a].slice()}this.metadata=Object.create(null),e!==void 0&&(this.metadata[e]=Object.create(null),this.metadata[e][r]=n)},t.MatchData.prototype.combine=function(e){for(var r=Object.keys(e.metadata),i=0;i<r.length;i++){var n=r[i],s=Object.keys(e.metadata[n]);this.metadata[n]==null&&(this.metadata[n]=Object.create(null));for(var o=0;o<s.length;o++){var a=s[o],l=Object.keys(e.metadata[n][a]);this.metadata[n][a]==null&&(this.metadata[n][a]=Object.create(null));for(var u=0;u<l.length;u++){var h=l[u];this.metadata[n][a][h]==null?this.metadata[n][a][h]=e.metadata[n][a][h]:this.metadata[n][a][h]=this.metadata[n][a][h].concat(e.metadata[n][a][h])}}}},t.MatchData.prototype.add=function(e,r,i){if(!(e in this.metadata)){this.metadata[e]=Object.create(null),this.metadata[e][r]=i;return}if(!(r in this.metadata[e])){this.metadata[e][r]=i;return}for(var n=Object.keys(i),s=0;s<n.length;s++){var o=n[s];o in this.metadata[e][r]?this.metadata[e][r][o]=this.metadata[e][r][o].concat(i[o]):this.metadata[e][r][o]=i[o]}},t.Query=function(e){this.clauses=[],this.allFields=e},t.Query.wildcard=new String("*"),t.Query.wildcard.NONE=0,t.Query.wildcard.LEADING=1,t.Query.wildcard.TRAILING=2,t.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},t.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=t.Query.wildcard.NONE),e.wildcard&t.Query.wildcard.LEADING&&e.term.charAt(0)!=t.Query.wildcard&&(e.term="*"+e.term),e.wildcard&t.Query.wildcard.TRAILING&&e.term.slice(-1)!=t.Query.wildcard&&(e.term=""+e.term+"*"),"presence"in e||(e.presence=t.Query.presence.OPTIONAL),this.clauses.push(e),this},t.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=t.Query.presence.PROHIBITED)return!1;return!0},t.Query.prototype.term=function(e,r){if(Array.isArray(e))return e.forEach(function(n){this.term(n,t.utils.clone(r))},this),this;var i=r||{};return i.term=e.toString(),this.clause(i),this},t.QueryParseError=function(e,r,i){this.name="QueryParseError",this.message=e,this.start=r,this.end=i},t.QueryParseError.prototype=new Error,t.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},t.QueryLexer.prototype.run=function(){for(var e=t.QueryLexer.lexText;e;)e=e(this)},t.QueryLexer.prototype.sliceString=function(){for(var e=[],r=this.start,i=this.pos,n=0;n<this.escapeCharPositions.length;n++)i=this.escapeCharPositions[n],e.push(this.str.slice(r,i)),r=i+1;return e.push(this.str.slice(r,this.pos)),this.escapeCharPositions.length=0,e.join("")},t.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},t.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},t.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return t.QueryLexer.EOS;var e=this.str.charAt(this.pos);return this.pos+=1,e},t.QueryLexer.prototype.width=function(){return this.pos-this.start},t.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},t.QueryLexer.prototype.backup=function(){this.pos-=1},t.QueryLexer.prototype.acceptDigitRun=function(){var e,r;do e=this.next(),r=e.charCodeAt(0);while(r>47&&r<58);e!=t.QueryLexer.EOS&&this.backup()},t.QueryLexer.prototype.more=function(){return this.pos<this.length},t.QueryLexer.EOS="EOS",t.QueryLexer.FIELD="FIELD",t.QueryLexer.TERM="TERM",t.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",t.QueryLexer.BOOST="BOOST",t.QueryLexer.PRESENCE="PRESENCE",t.QueryLexer.lexField=function(e){return e.backup(),e.emit(t.QueryLexer.FIELD),e.ignore(),t.QueryLexer.lexText},t.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(t.QueryLexer.TERM)),e.ignore(),e.more())return t.QueryLexer.lexText},t.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.EDIT_DISTANCE),t.QueryLexer.lexText},t.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(t.QueryLexer.BOOST),t.QueryLexer.lexText},t.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(t.QueryLexer.TERM)},t.QueryLexer.termSeparator=t.tokenizer.separator,t.QueryLexer.lexText=function(e){for(;;){var r=e.next();if(r==t.QueryLexer.EOS)return t.QueryLexer.lexEOS;if(r.charCodeAt(0)==92){e.escapeCharacter();continue}if(r==":")return t.QueryLexer.lexField;if(r=="~")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexEditDistance;if(r=="^")return e.backup(),e.width()>0&&e.emit(t.QueryLexer.TERM),t.QueryLexer.lexBoost;if(r=="+"&&e.width()===1||r=="-"&&e.width()===1)return e.emit(t.QueryLexer.PRESENCE),t.QueryLexer.lexText;if(r.match(t.QueryLexer.termSeparator))return t.QueryLexer.lexTerm}},t.QueryParser=function(e,r){this.lexer=new t.QueryLexer(e),this.query=r,this.currentClause={},this.lexemeIdx=0},t.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes;for(var e=t.QueryParser.parseClause;e;)e=e(this);return this.query},t.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},t.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme();return this.lexemeIdx+=1,e},t.QueryParser.prototype.nextClause=function(){var e=this.currentClause;this.query.clause(e),this.currentClause={}},t.QueryParser.parseClause=function(e){var r=e.peekLexeme();if(r!=null)switch(r.type){case t.QueryLexer.PRESENCE:return t.QueryParser.parsePresence;case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var i="expected either a field or a term, found "+r.type;throw r.str.length>=1&&(i+=" with value '"+r.str+"'"),new t.QueryParseError(i,r.start,r.end)}},t.QueryParser.parsePresence=function(e){var r=e.consumeLexeme();if(r!=null){switch(r.str){case"-":e.currentClause.presence=t.Query.presence.PROHIBITED;break;case"+":e.currentClause.presence=t.Query.presence.REQUIRED;break;default:var i="unrecognised presence operator'"+r.str+"'";throw new t.QueryParseError(i,r.start,r.end)}var n=e.peekLexeme();if(n==null){var i="expecting term or field, found nothing";throw new t.QueryParseError(i,r.start,r.end)}switch(n.type){case t.QueryLexer.FIELD:return t.QueryParser.parseField;case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var i="expecting term or field, found '"+n.type+"'";throw new t.QueryParseError(i,n.start,n.end)}}},t.QueryParser.parseField=function(e){var r=e.consumeLexeme();if(r!=null){if(e.query.allFields.indexOf(r.str)==-1){var i=e.query.allFields.map(function(o){return"'"+o+"'"}).join(", "),n="unrecognised field '"+r.str+"', possible fields: "+i;throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.fields=[r.str];var s=e.peekLexeme();if(s==null){var n="expecting term, found nothing";throw new t.QueryParseError(n,r.start,r.end)}switch(s.type){case t.QueryLexer.TERM:return t.QueryParser.parseTerm;default:var n="expecting term, found '"+s.type+"'";throw new t.QueryParseError(n,s.start,s.end)}}},t.QueryParser.parseTerm=function(e){var r=e.consumeLexeme();if(r!=null){e.currentClause.term=r.str.toLowerCase(),r.str.indexOf("*")!=-1&&(e.currentClause.usePipeline=!1);var i=e.peekLexeme();if(i==null){e.nextClause();return}switch(i.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+i.type+"'";throw new t.QueryParseError(n,i.start,i.end)}}},t.QueryParser.parseEditDistance=function(e){var r=e.consumeLexeme();if(r!=null){var i=parseInt(r.str,10);if(isNaN(i)){var n="edit distance must be numeric";throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.editDistance=i;var s=e.peekLexeme();if(s==null){e.nextClause();return}switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+s.type+"'";throw new t.QueryParseError(n,s.start,s.end)}}},t.QueryParser.parseBoost=function(e){var r=e.consumeLexeme();if(r!=null){var i=parseInt(r.str,10);if(isNaN(i)){var n="boost must be numeric";throw new t.QueryParseError(n,r.start,r.end)}e.currentClause.boost=i;var s=e.peekLexeme();if(s==null){e.nextClause();return}switch(s.type){case t.QueryLexer.TERM:return e.nextClause(),t.QueryParser.parseTerm;case t.QueryLexer.FIELD:return e.nextClause(),t.QueryParser.parseField;case t.QueryLexer.EDIT_DISTANCE:return t.QueryParser.parseEditDistance;case t.QueryLexer.BOOST:return t.QueryParser.parseBoost;case t.QueryLexer.PRESENCE:return e.nextClause(),t.QueryParser.parsePresence;default:var n="Unexpected lexeme type '"+s.type+"'";throw new t.QueryParseError(n,s.start,s.end)}}},function(e,r){typeof define=="function"&&define.amd?define(r):typeof U=="object"?H.exports=r():e.lunr=r()}(this,function(){return t})})()});var A=ae(J()),G=["album","artist","title"];A.default.Pipeline.registerFunction(W,"Remove parentheses from token");var $;self.onmessage=t=>{switch(t.data.action){case"PERFORM_SEARCH":le(t.data.data);break;case"UPDATE_SEARCH_INDEX":ce(t.data.data);break}};var ue=t=>({id:t.id,album:t.tags.album,artist:t.tags.artist,title:t.tags.title});function le(t){let e=[],r=t.replace(/-\s+/g,"-").replace(/\+\s+/g,"+").split(/ +/).reduce(([n,s,o],a)=>{let l=(g=>g&&g[0])(a.match(/^(\+|-)/)),u=a.replace(/^(\+|-)/,"").replace(/\*$/,"").trim(),h=(g=>g&&g[1])(u.match(/^([^:]+:)/)),f=u.replace(/^([^:]+:)/,"");h&&!G.includes(h.slice(0,-1))?(h=null,f=u.replace(":","\\:"),u=f):h&&f.includes(":")&&(f=f.replace(":","\\:"),u=h+f);let p=l||s,S=h||l?"":o;return f.trim().length>0?[[...n,p+S+u],p,h||S]:[n,s,o]},[[],"+",""])[0].join(" "),i=r.split(" ").map(n=>n.startsWith("-")?n:n+"*").join(" ");$&&(e=$.search(r).map(n=>n.ref).concat($.search(i).map(n=>n.ref))),self.postMessage({action:"PERFORM_SEARCH",data:e})}function ce(t){let e=typeof t=="string"?JSON.parse(t):t;$=he(function(){G.forEach(r=>this.field(r)),(e||[]).map(ue).forEach(r=>this.add(r))})}function he(t){let e=new A.default.Builder;return e.pipeline.add(W,A.default.stemmer),e.searchPipeline.add(W,A.default.stemmer),t.call(e,e),e.build()}function W(t){return t.update(e=>e.replace(/\(|\)/,""))}})();
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
