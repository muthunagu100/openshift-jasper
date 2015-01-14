define(["require","home/model/BaseModel","home/enum/mediaTypes","underscore"],function(e){function t(e,t){return r.find(e,function(e){return e.type==t})}var n=e("home/model/BaseModel"),o=e("home/enum/mediaTypes"),r=e("underscore");return n.extend({initialize:function(){n.prototype.initialize.apply(this,arguments)},linkToControl:function(e){return{label:e.title,action:e.relation,href:e.href}},embeddedToControl:function(e,t){return{label:t.title,action:e,entity:t}},linksToControls:function(e){var n=this.get("_links"),i=this,l=o.TEXT_HTML;return e&&e.type&&(l=e.type),r.chain(n).map(function(e,n){var o,u;return r.isArray(e)||(e=[e]),u=t(e,l),u&&(o=[n,i.linkToControl(u)]),o}).compact().object().value()},embeddedToControls:function(){var e=this.get("_embedded"),t=this;return r.chain(e).map(function(e,n){var o;return e&&(o=[n,t.embeddedToControl(n,e)]),o}).compact().object().value()},getControls:function(e){return r.extend(this.linksToControls(e),this.embeddedToControls())},toJSON:function(){var e=n.prototype.toJSON.apply(this,arguments);return e.controls=this.getControls(),e}})});