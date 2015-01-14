function invokeServerAction(e,t){var i=orgModule.serverActionFactory[e];if(!i)throw new Error("No server action found for action name '"+e+"'");var n=i.call(orgModule.serverActionFactory,t);n.invokeAction()}function invokeClientAction(e,t){var i=orgModule.clientActionFactory[e];if(i){var n=i.call(orgModule.clientActionFactory,t);return n.invokeAction()}throw new Error("No client action found for action name '"+e+"'")}orgModule.confirmAndLeave=function(){var e=orgModule.entityList.getSelectedEntities();return invokeClientAction("cancelIfEdit",{entity:e[0]})},orgModule.manager={initialize:function(e){this.options=e,this.state=e.state,isProVersion()&&(this.tree=orgModule.createOrganizationsTree(),this.tree.showOrganizations(this.state.tenantUri)),orgModule.observe("org:browse",function(){var e;if(this.tree&&(e=this.tree.getOrganization()),!this.lastSelectedOrg||this.lastSelectedOrg.id!=e.id){var t=orgModule.entityList.getSelectedEntities();invokeClientAction("cancelIfEdit",{entity:t[0]})?(invokeServerAction(orgModule.ActionMap.BROWSE,{tenantId:e?e.id:null}),this.lastSelectedOrg=e):this.lastSelectedOrg&&this.tree.selectOrganization(this.lastSelectedOrg)}}.bindAsEventListener(this)),orgModule.observe("entity:search",function(e){var t=orgModule.entityList.getSelectedEntities(),i=e.memo.text;invokeClientAction("cancelIfEdit",{entity:t[0]})?(invokeServerAction(orgModule.ActionMap.SEARCH,{text:i}),this.lastSearchText=i):0==i.length&&this.lastSearchText&&0!=this.lastSearchText.length&&orgModule.entityList.setSearchText(this.lastSearchText)}.bindAsEventListener(this)),orgModule.observe("entity:next",function(){invokeServerAction(orgModule.ActionMap.NEXT,{})}.bindAsEventListener(this)),orgModule.observe("entity:selectAndGetDetails",function(e){invokeServerAction(orgModule.ActionMap.SELECT_AND_GET_DETAILS,{entity:e.memo.entity.getNameWithTenant()})}.bindAsEventListener(this)),orgModule.observe("result:changed",function(t){var i=t.memo.responseData;orgModule.entityList.setEntities(i.entities.collect(this.entityJsonToObject)),orgModule.entityList.restoreSelectedEntity(e.defaultEntity)}.bindAsEventListener(this)),orgModule.observe("result:next",function(e){var t=e.memo.responseData;t.entities.length>0&&orgModule.entityList.addEntities(t.entities.collect(this.entityJsonToObject))}.bindAsEventListener(this)),orgModule.observe("entity:detailsLoaded",function(e){var t=this.entityJsonToObject(e.memo.responseData);orgModule.entityList.update(t.getNameWithTenant(),t),orgModule.properties.show(t),orgModule.properties.setProperties(t)}.bindAsEventListener(this)),orgModule.observe("searchAvailable:loaded",function(e){var t=e.memo.responseData;t&&t.entities&&orgModule.properties.setAvailableEntities(t.entities.collect(this.relatedEntityJsonToObject))}.bindAsEventListener(this)),orgModule.observe("searchAssigned:loaded",function(e){var t=e.memo.responseData;t&&t.entities&&t.entities.length>0&&orgModule.properties.setAssignedEntities(t.entities.collect(this.relatedEntityJsonToObject))}.bindAsEventListener(this)),orgModule.observe("nextAvailable:loaded",function(e){var t=e.memo.responseData;t&&t.entities&&t.entities.length>0&&orgModule.properties.addAvailableEntities(t.entities.collect(this.relatedEntityJsonToObject))}.bindAsEventListener(this)),orgModule.observe("nextAssigned:loaded",function(e){var t=e.memo.responseData;t&&t.entities&&t.entities.length>0&&orgModule.properties.addAssignedEntities(t.entities.collect(this.relatedEntityJsonToObject))}.bindAsEventListener(this)),orgModule.observe("server:error",function(e){var t=e.memo.responseData;t&&alert(t.message+"\n\n"+t.description?t.description:"")}),orgModule.observe("entity:created",function(e){orgModule.addDialog.hide();var t=e.memo.inputData.entity;if(t){var i=this.entityJsonToObject(t.evalJSON());orgModule.entityList.addEntities([i]),orgModule.entityList.selectEntity(i.getNameWithTenant())}}.bindAsEventListener(this)),orgModule.observe("entity:updated",function(e){var t=e.memo.inputData.entityName,i=e.memo.responseData;if(i.roles||(i=e.memo.unencryptedEntity),i||(i=e.memo.inputData.entity),orgModule.properties.isEditMode&&orgModule.properties.changeMode(!1),i){var n=this.entityJsonToObject(i.evalJSON?i.evalJSON():i);orgModule.entityList.update(t,n),orgModule.entityList.selectEntity(n.getNameWithTenant?n.getNameWithTenant():t)}}.bindAsEventListener(this)),orgModule.observe("entity:deleted",function(e){var t=e.memo.inputData.entity;orgModule.entityList.remove(t)}.bindAsEventListener(this)),orgModule.observe("entities:deleted",function(e){var t=e.memo.inputData.entities;t&&orgModule.entityList.remove(t.evalJSON())}.bindAsEventListener(this))},entityJsonToObject:function(){},relatedEntityJsonToObject:function(){},reloadEntities:function(){orgModule.fire(orgModule.Event.ORG_BROWSE,{})},isUserSuperuser:function(){var e=isProVersion()?orgModule.Configuration.superuserRole:orgModule.Configuration.adminRole,t=this.options.currentUserRoles;return null!=t.detect(function(t){return t.roleName==e&&!t.tenantId})}};