define(["require","requirejs.plugin.text","underscore","common/transport/request"],function(e){var t=e("requirejs.plugin.text"),n=e("underscore"),r=e("common/transport/request"),o=t.createXhr,s=t.load;return n.extend(t,{useXhr:function(){return!0},createXhr:function(){var e=o.apply(t,arguments),s={},u={response:void 0,responseBody:void 0,responseText:void 0,responseType:void 0,responseXML:void 0,status:void 0,statusText:void 0};for(var i in e)-1==i.indexOf("response")&&-1==i.indexOf("status")&&(u[i]=e[i]);return n.extend(u,{open:function(e,t){s.url=t,u.status=1},send:function(){r(s).done(function(e,t,n){u.readyState=n.readyState,u.status=n.status,u.responseText=n.responseText,u.onreadystatechange()}).fail(function(e){u.onerror(e)})}})},load:function(e,t,r,o){return o.isBuild&&o.excludeText&&n.indexOf(o.excludeText,e)>=0?void r():s(e,t,r,o)}})});