function invokeOrgAction(e,t){var n=orgModule.orgActionFactory[e](t);n.invokeAction()}function invokeOrgManagerAction(e,t){var n=orgModule.orgManager.actionFactory[e](t);n.invokeAction()}function canAddOrg(){return null!=orgModule.manager.tree.getOrganization()}function canDeleteAll(){return orgModule.entityList.getSelectedEntities().length>0}function canDeleteUser(){return orgModule.entityList.getSelectedEntities().length>0}orgModule.orgManager={NAME_REG_EXP:null,ID_REG_EXP:null,ID_REG_EXP_FOR_REPLACEMENT:null,ALIAS_REG_EXP:null,ALIAS_REG_EXP_FOR_REPLACEMENT:null,Event:{},Action:{ALIAS_EXIST:"aliasExist"},initialize:function(){layoutModule.resizeOnClient("folders","organizations","properties"),webHelpModule.setCurrentContext("admin");var e=localContext.orgMngInitOptions;this.NAME_REG_EXP=new RegExp(orgModule.Configuration.tenantNameNotSupportedSymbols),this.ID_REG_EXP=new RegExp(orgModule.Configuration.tenantIdNotSupportedSymbols),this.ID_REG_EXP_FOR_REPLACEMENT=new RegExp(orgModule.Configuration.tenantIdNotSupportedSymbols,"g"),this.ALIAS_REG_EXP=new RegExp(orgModule.Configuration.tenantIdNotSupportedSymbols),this.ALIAS_REG_EXP_FOR_REPLACEMENT=new RegExp(orgModule.Configuration.tenantIdNotSupportedSymbols,"g"),orgModule.manager.initialize(e),orgModule.manager.entityJsonToObject=function(e){return new orgModule.Organization(e)},this.orgList.initialize({toolbarModel:this.actionModel,text:orgModule.manager.state.text}),orgModule.addDialog.show=function(e){this.addDialog.show(e)}.bind(this),orgModule.addDialog.hide=function(e){this.addDialog.hide(e)}.bind(this),this.properties.initialize(),this.addDialog.initialize(),orgModule.observe("entity:created",function(){orgModule.manager.tree.updateSubOrganizations(orgModule.orgManager.addDialog.organization)}.bindAsEventListener(this)),orgModule.observe("entity:updated",function(e){var t=e.memo.inputData.entity;if(t){var n=orgModule.manager.entityJsonToObject(t.evalJSON()),o=orgModule.manager.tree;o.updateOrganization(n,o.getOrganization())}}.bindAsEventListener(this)),orgModule.observe("searchAssigned:loaded",function(e){var t=e.memo.responseData;this.properties.setAssigned(t.usersCount,t.rolesCount)}.bindAsEventListener(this)),orgModule.observe("entity:detailsLoaded",function(){invokeServerAction(orgModule.ActionMap.SEARCH_ASSIGNED,{text:""})}.bindAsEventListener(this)),orgModule.observe("entity:deleted",function(){var e=orgModule.manager.tree;e.updateSubOrganizations(e.getOrganization())}.bindAsEventListener(this)),orgModule.observe("entities:deleted",function(){var e=orgModule.manager.tree;e.updateSubOrganizations(e.getOrganization())}.bindAsEventListener(this)),orgModule.observe("server:unavailable",function(){var e=orgModule.manager.tree,t=e?e.getOrganization().id:null;new orgModule.Organization({tenantId:t}).navigateToManager()}.bindAsEventListener(this))},actionModel:{ADD:{buttonId:"addNewOrgBtn",action:invokeClientAction,actionArgs:"create",test:canAddOrg},DELETE:{buttonId:"deleteAllOrgsBtn",action:invokeClientAction,actionArgs:"deleteAll",test:canDeleteAll}}},"undefined"==typeof require&&document.observe("dom:loaded",orgModule.orgManager.initialize.bind(orgModule.orgManager));