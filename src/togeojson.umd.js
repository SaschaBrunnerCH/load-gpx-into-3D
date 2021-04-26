!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).toGeoJSON={})}(this,(function(e){"use strict";function t(e){return e&&e.normalize&&e.normalize(),e&&e.textContent||""}function n(e,t){const n=e.getElementsByTagName(t);return n.length?n[0]:null}function o(e){const o={};if(e){const s=n(e,"line");if(s){const e=t(n(s,"color")),r=parseFloat(t(n(s,"opacity"))),i=parseFloat(t(n(s,"width")));e&&(o.stroke=e),isNaN(r)||(o["stroke-opacity"]=r),isNaN(i)||(o["stroke-width"]=96*i/25.4)}}return o}function s(e,o){const s={};let r,i;for(i=0;i<o.length;i++)r=n(e,o[i]),r&&(s[o[i]]=t(r));return s}function r(e){const n=s(e,["name","cmt","desc","type","time","keywords"]),o=e.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/GpxExtensions/v3","*");for(let s=0;s<o.length;s++){const r=o[s];r.parentNode.parentNode===e&&(n[r.tagName.replace(":","_")]=t(r))}const r=e.getElementsByTagName("link");r.length&&(n.links=[]);for(let e=0;e<r.length;e++)n.links.push(Object.assign({href:r[e].getAttribute("href")},s(r[e],["text","type"])));return n}function i(e){const o=[parseFloat(e.getAttribute("lon")),parseFloat(e.getAttribute("lat"))],s=n(e,"ele"),r=n(e,"gpxtpx:hr")||n(e,"hr"),i=n(e,"time");let l;s&&(l=parseFloat(t(s)),isNaN(l)||o.push(l));const a={coordinates:o,time:i?t(i):null,extendedValues:[]};r&&a.extendedValues.push(["heartRate",parseFloat(t(r))]);const c=n(e,"extensions");if(null!==c)for(const e of["speed","course","hAcc","vAcc"]){const o=parseFloat(t(n(c,e)));isNaN(o)||a.extendedValues.push([e,o])}return a}function l(e){const t=a(e,"rtept");if(t)return{type:"Feature",properties:Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"rte"}),geometry:{type:"LineString",coordinates:t.line}}}function a(e,t){const n=e.getElementsByTagName(t);if(n.length<2)return;const o=[],s=[],r={};for(let e=0;e<n.length;e++){const t=i(n[e]);o.push(t.coordinates),t.time&&s.push(t.time);for(let o=0;o<t.extendedValues.length;o++){const[s,i]=t.extendedValues[o],l=s+"s";r[l]||(r[l]=Array(n.length).fill(null)),r[l][e]=i}}return{line:o,times:s,extendedValues:r}}function c(e){const t=e.getElementsByTagName("trkseg"),s=[],i=[],l=[];for(let e=0;e<t.length;e++){const n=a(t[e],"trkpt");n&&(l.push(n),n.times&&n.times.length&&i.push(n.times))}if(0===l.length)return;const c=l.length>1,g=Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"trk"},i.length?{coordinateProperties:{times:c?i:i[0]}}:{});for(let e=0;e<l.length;e++){const t=l[e];s.push(t.line);for(const[n,o]of Object.entries(t.extendedValues)){let t=g;"heartRates"===n&&(g.coordinateProperties||(g.coordinateProperties={}),t=g.coordinateProperties),c?(t[n]||(t[n]=l.map((e=>new Array(e.line.length).fill(null)))),t[n][e]=o):t[n]=o}}return{type:"Feature",properties:g,geometry:c?{type:"MultiLineString",coordinates:s}:{type:"LineString",coordinates:s[0]}}}function*g(e){const t=e.getElementsByTagName("trk"),n=e.getElementsByTagName("rte"),o=e.getElementsByTagName("wpt");for(let e=0;e<t.length;e++){const n=c(t[e]);n&&(yield n)}for(let e=0;e<n.length;e++){const t=l(n[e]);t&&(yield t)}for(let e=0;e<o.length;e++)yield(a=o[e],{type:"Feature",properties:Object.assign(r(a),s(a,["sym"])),geometry:{type:"Point",coordinates:i(a).coordinates}});var a}const u=[["heartRate","heartRates"],["Cadence","cadences"],["Speed","speeds"],["Watts","watts"]],p=[["TotalTimeSeconds","totalTimeSeconds"],["DistanceMeters","distanceMeters"],["MaximumSpeed","maxSpeed"],["AverageHeartRateBpm","avgHeartRate"],["MaximumHeartRateBpm","maxHeartRate"],["AvgSpeed","avgSpeed"],["AvgWatts","avgWatts"],["MaxWatts","maxWatts"]];function m(e,o){const s=[];for(const[r,i]of o){let o=n(e,r);if(!o){const t=e.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/ActivityExtension/v2",r);t.length&&(o=t[0])}const l=parseFloat(t(o));isNaN(l)||s.push([i,l])}return s}function f(e){const o=t(n(e,"LongitudeDegrees")),s=t(n(e,"LatitudeDegrees"));if(!o.length||!s.length)return null;const r=[parseFloat(o),parseFloat(s)],i=n(e,"AltitudeMeters"),l=n(e,"HeartRateBpm"),a=n(e,"Time");let c;return i&&(c=parseFloat(t(i)),isNaN(c)||r.push(c)),{coordinates:r,time:a?t(a):null,heartRate:l?parseFloat(t(l)):null,extensions:m(e,u)}}function h(e,t){const n=e.getElementsByTagName(t),o=[],s=[],r=[];if(n.length<2)return null;const i={extendedProperties:{}};for(let e=0;e<n.length;e++){const t=f(n[e]);if(null!==t){o.push(t.coordinates),t.time&&s.push(t.time),t.heartRate&&r.push(t.heartRate);for(const[o,s]of t.extensions)i.extendedProperties[o]||(i.extendedProperties[o]=Array(n.length).fill(null)),i.extendedProperties[o][e]=s}}return Object.assign(i,{line:o,times:s,heartRates:r})}function d(e){const t=e.getElementsByTagName("Track"),n=[],o=[],s=[],r=[];let i;const l=function(e){const t={};for(const[n,o]of e)t[n]=o;return t}(m(e,p));for(let e=0;e<t.length;e++)i=h(t[e],"Trackpoint"),i&&(n.push(i.line),i.times.length&&o.push(i.times),i.heartRates.length&&s.push(i.heartRates),r.push(i.extendedProperties));for(let e=0;e<r.length;e++){const o=r[e];for(const s in o)1===t.length?l[s]=i.extendedProperties[s]:(l[s]||(l[s]=n.map((e=>Array(e.length).fill(null)))),l[s][e]=o[s])}if(0!==n.length)return(o.length||s.length)&&(l.coordinateProperties=Object.assign(o.length?{times:1===n.length?o[0]:o}:{},s.length?{heartRates:1===n.length?s[0]:s}:{})),{type:"Feature",properties:l,geometry:{type:1===n.length?"LineString":"MultiLineString",coordinates:1===n.length?n[0]:n}}}function*y(e){const t=e.getElementsByTagName("Lap");for(let e=0;e<t.length;e++){const n=d(t[e]);n&&(yield n)}}const N=/\s*/g,x=/^\s*|\s*$/g,T=/\s+/;function b(e){if(!e||!e.length)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n)|0;return t}function S(e){return e.replace(N,"").split(",").map(parseFloat)}function k(e){return e.replace(x,"").split(T).map(S)}function A(e){if(void 0!==e.xml)return e.xml;if(e.tagName){let t=e.tagName;for(let n=0;n<e.attributes.length;n++)t+=e.attributes[n].name+e.attributes[n].value;for(let n=0;n<e.childNodes.length;n++)t+=A(e.childNodes[n]);return t}return"#text"===e.nodeName?(e.nodeValue||e.value||"").trim():"#cdata-section"===e.nodeName?e.nodeValue:""}const B=["Polygon","LineString","Point","Track","gx:Track"];function E(e,o,s){let r=t(n(o,"color"))||"";const i="stroke"==s||"fill"===s?s:s+"-color";"#"===r.substr(0,1)&&(r=r.substr(1)),6===r.length||3===r.length?e[i]=r:8===r.length&&(e[s+"-opacity"]=parseInt(r.substr(0,2),16)/255,e[i]="#"+r.substr(6,2)+r.substr(4,2)+r.substr(2,2))}function F(e,o,s,r){const i=parseFloat(t(n(o,s)));isNaN(i)||(e[r]=i)}function P(e){let n=e.getElementsByTagName("coord");const o=[],s=[];0===n.length&&(n=e.getElementsByTagName("gx:coord"));for(let e=0;e<n.length;e++)o.push(t(n[e]).split(" ").map(parseFloat));const r=e.getElementsByTagName("when");for(let e=0;e<r.length;e++)s.push(t(r[e]));return{coords:o,times:s}}function v(e){let o,s,r,i,l;const a=[],c=[];if(n(e,"MultiGeometry"))return v(n(e,"MultiGeometry"));if(n(e,"MultiTrack"))return v(n(e,"MultiTrack"));if(n(e,"gx:MultiTrack"))return v(n(e,"gx:MultiTrack"));for(r=0;r<B.length;r++)if(s=e.getElementsByTagName(B[r]),s)for(i=0;i<s.length;i++)if(o=s[i],"Point"===B[r])a.push({type:"Point",coordinates:S(t(n(o,"coordinates")))});else if("LineString"===B[r])a.push({type:"LineString",coordinates:k(t(n(o,"coordinates")))});else if("Polygon"===B[r]){const e=o.getElementsByTagName("LinearRing"),s=[];for(l=0;l<e.length;l++)s.push(k(t(n(e[l],"coordinates"))));a.push({type:"Polygon",coordinates:s})}else if("Track"===B[r]||"gx:Track"===B[r]){const e=P(o);a.push({type:"LineString",coordinates:e.coords}),e.times.length&&c.push(e.times)}return{geoms:a,coordTimes:c}}function L(e,o,s,r){const i=v(e);let l;const a={},c=t(n(e,"name")),g=t(n(e,"address"));let u=t(n(e,"styleUrl"));const p=t(n(e,"description")),m=n(e,"TimeSpan"),f=n(e,"TimeStamp"),h=n(e,"ExtendedData");let d=n(e,"IconStyle"),y=n(e,"LabelStyle"),N=n(e,"LineStyle"),x=n(e,"PolyStyle");const T=n(e,"visibility");if(c&&(a.name=c),g&&(a.address=g),u){"#"!==u[0]&&(u="#"+u),a.styleUrl=u,o[u]&&(a.styleHash=o[u]),s[u]&&(a.styleMapHash=s[u],a.styleHash=o[s[u].normal]);const e=r[a.styleHash];e&&(d||(d=n(e,"IconStyle")),y||(y=n(e,"LabelStyle")),N||(N=n(e,"LineStyle")),x||(x=n(e,"PolyStyle")))}if(p&&(a.description=p),m){const e=t(n(m,"begin")),o=t(n(m,"end"));a.timespan={begin:e,end:o}}if(f&&(a.timestamp=t(n(f,"when"))),d){E(a,d,"icon"),F(a,d,"scale","icon-scale"),F(a,d,"heading","icon-heading");const e=n(d,"hotSpot");if(e){const t=parseFloat(e.getAttribute("x")),n=parseFloat(e.getAttribute("y"));isNaN(t)||isNaN(n)||(a["icon-offset"]=[t,n])}const o=n(d,"Icon");if(o){const e=t(n(o,"href"));e&&(a.icon=e)}}if(y&&(E(a,y,"label"),F(a,y,"scale","label-scale")),N&&(E(a,N,"stroke"),F(a,N,"width","stroke-width")),x){E(a,x,"fill");const e=t(n(x,"fill")),o=t(n(x,"outline"));e&&(a["fill-opacity"]="1"===e?a["fill-opacity"]||1:0),o&&(a["stroke-opacity"]="1"===o?a["stroke-opacity"]||1:0)}if(h){const e=h.getElementsByTagName("Data"),o=h.getElementsByTagName("SimpleData");for(l=0;l<e.length;l++)a[e[l].getAttribute("name")]=t(n(e[l],"value"));for(l=0;l<o.length;l++)a[o[l].getAttribute("name")]=t(o[l])}T&&(a.visibility=t(T)),i.coordTimes.length&&(a.coordinateProperties={times:1===i.coordTimes.length?i.coordTimes[0]:i.coordTimes});const b={type:"Feature",geometry:0===i.geoms.length?null:1===i.geoms.length?i.geoms[0]:{type:"GeometryCollection",geometries:i.geoms},properties:a};return e.getAttribute("id")&&(b.id=e.getAttribute("id")),b}function*M(e){const o={},s={},r={},i=e.getElementsByTagName("Placemark"),l=e.getElementsByTagName("Style"),a=e.getElementsByTagName("StyleMap");for(let e=0;e<l.length;e++){const t=b(A(l[e])).toString(16);o["#"+l[e].getAttribute("id")]=t,s[t]=l[e]}for(let e=0;e<a.length;e++){o["#"+a[e].getAttribute("id")]=b(A(a[e])).toString(16);const s=a[e].getElementsByTagName("Pair"),i={};for(let e=0;e<s.length;e++)i[t(n(s[e],"key"))]=t(n(s[e],"styleUrl"));r["#"+a[e].getAttribute("id")]=i}for(let e=0;e<i.length;e++){const t=L(i[e],o,r,s);t&&(yield t)}}e.gpx=function(e){return{type:"FeatureCollection",features:Array.from(g(e))}},e.gpxGen=g,e.kml=function(e){return{type:"FeatureCollection",features:Array.from(M(e))}},e.kmlGen=M,e.tcx=function(e){return{type:"FeatureCollection",features:Array.from(y(e))}},e.tcxGen=y,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=togeojson.umd.js.map
