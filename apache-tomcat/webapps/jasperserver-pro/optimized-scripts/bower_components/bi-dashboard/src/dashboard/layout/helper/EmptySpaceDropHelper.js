define(["require","jquery","underscore","dashboard/dashboardSettings","dashboard/enum/dashboardComponentTypes","common/enum/repositoryResourceTypes","./BasicHelper"],function(e){var t=e("jquery"),i=e("underscore"),o=e("dashboard/dashboardSettings"),r=e("dashboard/enum/dashboardComponentTypes"),s=e("common/enum/repositoryResourceTypes"),n=e("./BasicHelper");return n.extend({init:function(e){this.container=e,this.helper=t("<div>").addClass("helper empty-space-drop").appendTo(e).hide(),this.helper.position={}},drag:function(e,n){var a,d=n?n.componentId:void 0,h=t(e.toElement||e.originalEvent.target);if(!h.is(".content > .body")){if(h.attr(o.COMPONENT_ID_ATTRIBUTE)||h.parents("["+o.COMPONENT_ID_ATTRIBUTE+"]").length)return void this.stop();if(h.hasClass("dashboardLevelPropertiesDialog")||h.parents(".dashboardLevelPropertiesDialog").length)return void this.stop();if(h[0]!==this.helper[0])return h.parents(".dashboardCanvas").length||h.is(".dragHelper")||h.is(".overlay")?void 0:void this.stop();h=h.siblings(".content").find("> .body")}if(n.resourceType===s.INPUT_CONTROL&&this.strategy.model.currentFoundation.components.findWhere({type:r.FILTER_GROUP})){if(!h.parents(".dashboardCanvas").length)return void this.stop();a=this.strategy.model.currentFoundation.components.findWhere({type:r.FILTER_GROUP}).getPositionObject()}else{if(a=h[0].getBoundingClientRect(),a=this.strategy.preciseCoordsToCell(h,e.clientX-a.left,e.clientY-a.top),i.isUndefined(a.x)||i.isUndefined(a.y)||this.helper.position.x===a.x&&this.helper.position.y===a.y)return;if(this.helper.position.x=a.x,this.helper.position.y=a.y,a.width=a.height=1,a=this.strategy.calculateEmptyArea(a,d),!a)return void this.stop()}this.helper.css(this.strategy.cellCSS(a)).show()},stop:function(){this.helper.hide(),this.helper.position.x=void 0,this.helper.position.y=void 0},drop:function(e,t,i){var o=t.helper.data("data")?t.helper.data("data").componentId:void 0,r=this.strategy.calculateEmptyArea(i,o);for(var s in r)r.hasOwnProperty(s)&&(i[s]=r[s])},deinit:function(){this.helper.remove()}})});