define(["require","underscore"],function(e){var r=e("underscore");return{deepDefaults:function(e,n){return r.reduce(n,function(n,u,t){return n[t]=e[t]?r.defaults(e[t],u):u,n},{})}}});