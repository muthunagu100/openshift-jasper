jaspersoft.components.State=function(t,e,i,s,r){return i.Model.extend(r).extend({name:"export.zip",urlTemplate:"rest_v2/{service}/{id}/state",defaults:{id:null,phase:"not started",message:""},initialize:function(){e.bindAll(this),this.on("change:phase",this.notify)},url:function(){if(!this.has("id"))throw Error("Can't initialize export state without 'id'");return this.urlTemplate.replace("{id}",this.get("id"))},reset:function(){this.name="export.zip",this.set(this.defaults)},notify:function(){this.get("phase")===s.State.FAILED?(this.trigger("error:server",this.attributes),this.reset()):this.get("phase")===s.State.READY&&this.trigger("notification:show",this.attributes)}},{NOT_STARTED:"not started",INPROGRESS:"inprogress",READY:"finished",FAILED:"failed",instance:function(t){var e=new this;return t&&t.urlTemplate&&(e.urlTemplate=t.urlTemplate),e}})}(jQuery,_,Backbone,jaspersoft.components,jaspersoft.components.ServerErrorsBackboneTrait);