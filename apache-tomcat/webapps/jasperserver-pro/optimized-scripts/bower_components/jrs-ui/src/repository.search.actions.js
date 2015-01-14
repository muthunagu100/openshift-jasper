repositorySearch.Action=function(e){Object.isFunction(e)&&(this.invokeAction=e)},repositorySearch.Action.DEFAULT="default-action",repositorySearch.Action.addMethod("invokeAction",doNothing),repositorySearch.folderActionFactory={CreateFolder:function(e){return new repositorySearch.Action(function(){repositorySearch.showCreateFolderConfirm(e)})},CopyFolder:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.copy(e)})},MoveFolder:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.move(e)})},PasteFolder:function(e){return new repositorySearch.Action(function(){{var r,o=e?e:repositorySearch.model.getContextFolder();repositorySearch.CopyMoveController.object}if(repositorySearch.CopyMoveController.isCopyFolder())r=repositorySearch.FolderAction.COPY;else{if(!repositorySearch.CopyMoveController.isMoveFolder())return;r=repositorySearch.FolderAction.MOVE}var t=new repositorySearch.ServerAction.createFolderAction(r,{toFolder:o,folder:repositorySearch.CopyMoveController.object});t.invokeAction()})},PasteResources:function(e){return new repositorySearch.Action(function(){var r,o=e?e:repositorySearch.model.getContextFolder(),t=repositorySearch.CopyMoveController.object,i=repositorySearch.CopyMoveController.isBulkAction()?t:[t];if(repositorySearch.CopyMoveController.isCopyResource())r=repositorySearch.ResourceAction.COPY;else{if(!repositorySearch.CopyMoveController.isMoveResource())return;r=repositorySearch.ResourceAction.MOVE}var n=new repositorySearch.ServerAction.createResourceAction(r,{resources:i,folder:o});n.invokeAction()})},DeleteFolder:function(e){return new repositorySearch.Action(function(){actionModel.hideMenu(),repositorySearch.showDeleteFolderConfirm(e)})},ShowFolderProperties:function(e){return new repositorySearch.Action(function(){repositorySearch.showFolderProperties(e)})},EditFolderProperties:function(e){return new repositorySearch.Action(function(){repositorySearch.editFolderProperties(e)})},AssignPermissions:function(e){return new repositorySearch.Action(function(){repositorySearch.editFolderPermissions(e)})},SetActiveThemeFolder:function(e){return new repositorySearch.Action(function(){var r=new repositorySearch.ServerAction.createFolderAction(repositorySearch.ThemeAction.SETTHEME,{folder:e});r.invokeAction()})},DownloadTheme:function(e){return new repositorySearch.Action(function(){var r=new repositorySearch.ServerAction.createFolderAction(repositorySearch.ThemeAction.DOWNLOAD_THEME,{folder:e});r.initDownload()})},UploadTheme:function(e){return new repositorySearch.Action(function(){repositorySearch.showUploadThemeConfirm(e,!1)})},ReuploadTheme:function(e){return new repositorySearch.Action(function(){repositorySearch.showUploadThemeConfirm(e,!0)})},Export:function(e){return new repositorySearch.Action(function(){JRS.Export&&JRS.Export.App.showDialogFor(e)})}},repositorySearch.resourceActionFactory={Copy:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.copy(e)})},Move:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.move(e)})},Delete:function(e){return new repositorySearch.Action(function(){actionModel.hideMenu(),repositorySearch.showDeleteResourceConfirm(e)})},Export:function(e){return new repositorySearch.Action(function(){JRS.Export&&JRS.Export.App.showDialogFor(e)})},ShowProperties:function(e,r){return new repositorySearch.Action(function(){repositorySearch.showResourceProperties(e,r)})},EditProperties:function(e,r){return new repositorySearch.Action(function(){repositorySearch.editResourceProperties(e,r)})},AssignPermissionsToResourceAction:function(e){return new repositorySearch.Action(function(){repositorySearch.editResourcePermissions(e)})},GenerateResourceAction:function(e){return new repositorySearch.Action(function(){JRS.CreateReport.selectGenerator(e.URIString)})},ConvertResourceAction:function(e){return new repositorySearch.Action(function(){var r=new repositorySearch.ServerAction.createConvertAction(repositorySearch.ResourceAction.CONVERT,{reportUri:e.URIString});r.invokeAction()})}},repositorySearch.bulkActionFactory={Run:function(e){return new repositorySearch.Action(function(){e.each(function(e,r){var o=repositorySearch.RedirectAction.createRunResourceAction(e,0!=r);o.invokeAction()})})},Edit:function(e){return new repositorySearch.Action(function(){e.each(function(e,r){var o=repositorySearch.RedirectAction.createEditResourceAction(e,0!=r);o.invokeAction()})})},Open:function(e){return new repositorySearch.Action(function(){e.each(function(r){var o=repositorySearch.RedirectAction.createOpenResourceAction(r,e.length>1);o.invokeAction()})})},Copy:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.copy(e)})},Move:function(e){return new repositorySearch.Action(function(){repositorySearch.CopyMoveController.move(e)})},Delete:function(e){return new repositorySearch.Action(function(){actionModel.hideMenu(),1==e.length?repositorySearch.showDeleteResourceConfirm(e[0]):repositorySearch.showBulkDeleteResourcesConfirm(e)})},ShowProperties:function(e){return new repositorySearch.Action(function(){e.each(function(r,o){invokeResourceAction("ShowProperties",r,{cascade:!0,position:o,number:e.length})})})},EditProperties:function(e){return new repositorySearch.Action(function(){e.each(function(r,o){invokeResourceAction("EditProperties",r,{cascade:!0,position:o,number:e.length})})})},Export:function(e){return new repositorySearch.Action(function(){JRS.Export&&JRS.Export.App.showDialogFor(e)})}},repositorySearch.ServerAction=function(e,r){this.actionURL="flow.html?_flowExecutionKey="+repositorySearch.flowExecutionKey+"&_eventId="+e,this.data=Object.toQueryString(r.data)},repositorySearch.ServerAction.addMethod("invokeAction",function(){ajaxTargettedUpdate(this.actionURL,{postData:this.data,callback:function(e){"OK"==e.status?this.onSuccess(e.data):this.onError(e.data)}.bind(this),errorHandler:this._serverErrorHandler,mode:AjaxRequester.prototype.EVAL_JSON})}),repositorySearch.ServerAction.addMethod("initDownload",function(){var e=this.actionURL+"&"+this.data;ajaxIframeDownload(e,{onload:function(){var e=$("ajax-download-iframe").contentDocument.body.innerHTML;try{var r=e.evalJSON();alert(r.data)}catch(o){}}})}),repositorySearch.ServerAction.addMethod("_serverErrorHandler",function(e){return baseErrorHandler(e)}),repositorySearch.ServerAction.addMethod("onSuccess",doNothing),repositorySearch.ServerAction.addMethod("onError",doNothing),repositorySearch.ServerAction.createSearchAction=function(e,r){r.mode=repositorySearch.mode;var o=new repositorySearch.ServerAction(e,{data:r});return o.onSuccess=function(o){e==repositorySearch.SearchAction.NEXT?repositorySearch.fire(repositorySearch.Event.RESULT_NEXT,o):e==repositorySearch.SearchAction.GET_RESOURCE_CHILDREN?repositorySearch.fire(repositorySearch.Event.CHILDREN_LOADED,{inputData:r,responseData:o}):(repositorySearch.fire(repositorySearch.Event.RESULT_CHANGED,o),repositorySearch.fire(repositorySearch.Event.STATE_CHANGED,o),repositorySearch.mode==repositorySearch.Mode.SEARCH&&repositorySearch.fire(repositorySearch.Event.FILTER_PATH_CHANGED,o))},o.onError=function(e){repositorySearch.fire(repositorySearch.Event.RESULT_ERROR,e)},o},repositorySearch.ServerAction.createFolderAction=function(e,r){var o,t,i;repositorySearch.FolderAction.DELETE==e?(o={sourceFolderUri:r.folder.URI},t=repositorySearch.FolderEvent.DELETED,i=repositorySearch.FolderEvent.DELETE_ERROR):repositorySearch.FolderAction.CREATE==e?(o={destFolderUri:r.toFolder.URI,folder:Object.toJSON({URI:"",label:r.label.stripScripts().escapeHTML(),desc:r.desc.stripScripts().escapeHTML()})},t=repositorySearch.FolderEvent.CREATED,i=repositorySearch.FolderEvent.CREATE_ERROR):repositorySearch.FolderAction.COPY==e?(o={destFolderUri:r.toFolder.URI,sourceFolderUri:r.folder.URI},t=repositorySearch.FolderEvent.COPIED,i=repositorySearch.FolderEvent.COPY_ERROR):repositorySearch.FolderAction.MOVE==e?(o={destFolderUri:r.toFolder.URI,sourceFolderUri:r.folder.URI},t=repositorySearch.FolderEvent.MOVED,i=repositorySearch.FolderEvent.MOVE_ERROR):repositorySearch.FolderAction.UPDATE==e?(o={folder:Object.toJSON({URI:r.folder.URI,label:r.folder.label.stripScripts().escapeHTML(),desc:r.folder.description.stripScripts().escapeHTML()})},t=repositorySearch.FolderEvent.UPDATED,i=repositorySearch.FolderEvent.UPDATE_ERROR):repositorySearch.ThemeAction.SETTHEME==e?(r.folder?o={folderUri:r.folder.URI}:r.folderUri&&(o={folderUri:r.folderUri}),t=repositorySearch.ThemeEvent.UPDATED):repositorySearch.ThemeAction.DOWNLOAD_THEME==e?(o={folderUri:r.folder.URI},i=repositorySearch.ThemeEvent.THEME_ERROR):repositorySearch.ThemeAction.REUPLOAD==e&&(o={themeName:r.themeName,folderUri:r.folderUri},t=repositorySearch.ThemeEvent.REUPLOADED,i=repositorySearch.ThemeEvent.THEME_ERROR),o&&t&&i||new Error("Unsupported folder action.");var n=new repositorySearch.ServerAction(e,{data:o});return n.onSuccess=function(e){repositorySearch.fire(t,{responseData:e,inputData:r})},n.onError=function(e){repositorySearch.fire(i,{responseData:e,inputData:r})},n},repositorySearch.ServerAction.createResourceAction=function(e,r){function o(o,t){dialogs.dependentResources.show(o,{dependenciesBtnOk:function(){var o=new repositorySearch.ServerAction.createResourceAction(e,{resources:t,folder:r.folder});o.invokeAction()}},{buttons:["ok","cancel"],dialogTitle:repositorySearch.getMessage("dialog.resources.exist.title"),topMessage:repositorySearch.getMessage("dialog.resources.exist"),bottomMessage:repositorySearch.getMessage("dialog.resources.exist.confirm.skip")})}function t(t){var i;if(repositorySearch.ResourceAction.COPY!=e&&repositorySearch.ResourceAction.MOVE!=e)return t;try{i=jQuery.parseJSON(t)}catch(n){return t}if(!i||!i.existingLabels)return t;var c=_.filter(r.resources,function(e){return-1==i.existingLabels.indexOf(e.label)});return 0==c.length?repositorySearch.getMessage(1==i.existingLabels.length?"dialog.resources.one.exists":"dialog.resources.all.exist")+" "+r.folder.URIString:(o(i.existingLabels,c),null)}var i,n,c;if(repositorySearch.ResourceAction.DELETE==e){var a=ResourcesUtils.getResourceUriAndTypeList(r.resources);i={selectedResources:Object.toJSON(a)},n=repositorySearch.ResourceEvent.DELETED,c=repositorySearch.ResourceEvent.DELETE_ERROR}else if(repositorySearch.ResourceAction.COPY==e){var s=ResourcesUtils.getResourceUris(r.resources);i={selectedResources:Object.toJSON(s),destFolderUri:r.folder.URI},n=repositorySearch.ResourceEvent.COPIED,c=repositorySearch.ResourceEvent.COPY_ERROR}else if(repositorySearch.ResourceAction.MOVE==e){var p=ResourcesUtils.getResourceUris(r.resources);i={selectedResources:Object.toJSON(p),destFolderUri:r.folder.URI},n=repositorySearch.ResourceEvent.MOVED,c=repositorySearch.ResourceEvent.MOVE_ERROR}else repositorySearch.ResourceAction.UPDATE==e&&(i={selectedResource:Object.toJSON(r.resource)},n=repositorySearch.ResourceEvent.UPDATED,c=repositorySearch.ResourceEvent.UPDATE_ERROR);i&&n&&c||new Error("Unsupported resource action.");var d=new repositorySearch.ServerAction(e,{data:i});return d.onSuccess=function(o){repositorySearch.ResourceAction.MOVE==e&&repositorySearch.CopyMoveController.cancel(),repositorySearch.fire(n,{responseData:o,inputData:r})},d.onError=function(e){var o=t(e);o&&repositorySearch.fire(c,{responseData:o,inputData:r})},d},repositorySearch.ServerAction.createPermissionAction=function(e,r){var o=new repositorySearch.ServerAction(e,{data:r}),t=e==repositorySearch.PermissionAction.UPDATE?repositorySearch.PermissionEvent.UPDATED:repositorySearch.PermissionEvent.LOADED;return o.onSuccess=function(o){repositorySearch.fire(t,{responseData:o,inputData:r,doSet:e!=repositorySearch.PermissionAction.NEXT})},o.onError=function(e){repositorySearch.fire(repositorySearch.PermissionEvent.ERROR,e)},o},repositorySearch.ServerAction.createGenerateAction=function(e,r){var o=new repositorySearch.ServerAction(e,{data:{data:Object.toJSON(r)}});return o.actionURL="reportGenerator.html?action="+e,o.onSuccess=function(e){repositorySearch.fire(repositorySearch.ResourceEvent.GENERATED,{responseData:e,inputData:r})},o.onError=function(e){repositorySearch.fire(repositorySearch.ResourceEvent.GENERATE_ERROR,{responseData:e,inputData:r})},o},repositorySearch.ServerAction.createConvertAction=function(e,r){var o=new repositorySearch.ServerAction(e,{data:r});return o.actionURL="dataViewConverter.html?action="+e,o.onSuccess=function(e){repositorySearch.fire(repositorySearch.ResourceEvent.CONVERTED,{responseData:e,inputData:r})},o.onError=function(e){repositorySearch.fire(repositorySearch.ResourceEvent.CONVERT_ERROR,{responseData:e,inputData:r})},o},repositorySearch.RedirectAction=function(e,r){this.type=e,this.flowId=r.flowId,this.url=r.url?r.url:this.flowId?this.FLOW_URL:void 0,this.paramsMap=r.paramsMap||{},this.encode=r.encode,this.type!==repositorySearch.RedirectType.FLOW_REDIRECT&&this.url===this.FLOW_URL&&(this.paramsMap._flowId=this.flowId)},repositorySearch.RedirectAction.addMethod("FLOW_URL","flow.html"),repositorySearch.RedirectAction.addMethod("_serializeParams",function(e,r){if(e){var o="";for(var t in e)Object.isUndefined(t)||(o+="&"+t+"="+(r?encodeURIComponent(e[t]):e[t]));return o&&o.length>0?o.substring(1):""}return""}),repositorySearch.RedirectAction.addMethod("invokeAction",function(){if(this.type===repositorySearch.RedirectType.FLOW_REDIRECT){var e=$("redirectForm"),r=$("flowParams");r.setValue(this.flowId+"?"+this._serializeParams(this.paramsMap,this.encode));var o=new repositorySearch.ServerAction("isServerAvailable",{data:{}});o.onSuccess=function(r){"Yes"==r.strip()?(e.submit(),repositorySearch.fire(repositorySearch.Event.FLOW_REDIRECT_RUNNING,r)):repositorySearch.fire(repositorySearch.Event.REDIRECT_ERROR,r)},o.onError=function(e){repositorySearch.fire(repositorySearch.Event.REDIRECT_ERROR,e)},o.invokeAction()}else if(this.type===repositorySearch.RedirectType.LOCATION_REDIRECT){var t=this.url+(jQuery.isEmptyObject(this.paramsMap)?"":"?"+this._serializeParams(this.paramsMap));redirectToUrl(t)}else if(this.type===repositorySearch.RedirectType.WINDOW_REDIRECT){var i=window.open(),n=this._serializeParams(this.paramsMap);i.opener=null,i.document.location=this.url+(n?"?"+n:"")}}),repositorySearch.runActionFactory={ReportUnit:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"flow.html",flowId:"viewReportFlow",paramsMap:{_flowId:"viewReportFlow",reportUnit:r?encodeURIComponent(e.URIString):e.URIString,standAlone:!0,ParentFolderUri:e.parentFolder}})},AdhocReportUnit:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"flow.html",flowId:"viewAdhocReportFlow",paramsMap:{reportUnit:r?encodeURIComponent(e.URIString):e.URIString,standAlone:!0,ParentFolderUri:e.parentFolder}})},OlapUnit:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.LOCATION_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"olap/viewOlap.html",paramsMap:{name:r?encodeURIComponent(e.URIString):e.URIString,"new":!0,parentFlow:"searchFlow",ParentFolderUri:e.parentFolder}})},DashboardResource:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"flow.html",flowId:"dashboardRuntimeFlow",paramsMap:{dashboardResource:r?encodeURIComponent(e.URIString):e.URIString}})},DashboardModelResource:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.LOCATION_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"dashboard/viewer.html#"+encodeURIComponent(e.URIString)})},ReportOptions:function(e,r){var o,t={reportOptionsURI:r?encodeURIComponent(e.URIString):e.URIString,standAlone:!0,ParentFolderUri:e.parentFolder},i=e.parentResource;i&&i.typeEquals(repositorySearch.ResourceType.ADHOC_REPORT_UNIT)?(o="viewAdhocReportFlow",t.reportUnit=r?encodeURIComponent(i.URIString):i.URIString):o="viewReportFlow";var n=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT;return new repositorySearch.RedirectAction(n,{url:"flow.html",flowId:o,paramsMap:t})}},repositorySearch.RedirectAction.createRunResourceAction=function(e,r){e||(e=e?e:repositorySearch.model.getSelectedResources()[0]);var o=repositorySearch.runActionFactory[e.typeSuffix()];return o?o(e,r):new repositorySearch.Action(function(){alert("Run action for resource type '"+e.resourceType+"' is not implemented!")})},repositorySearch.RedirectAction.createRunResourceInNewTabAction=function(e){return repositorySearch.RedirectAction.createRunResourceAction(e,!0)},repositorySearch.editActionFactory={"default-action":function(e,r){return ResourcesUtils.isCustomDataSource(e)?repositorySearch.editActionFactory.JdbcReportDataSource(e,r):new repositorySearch.Action(function(){alert("Edit action for resource type '"+e.resourceType+"' is not implemented!")})},ReportUnit:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"reportUnitFlow",paramsMap:{selectedResource:e.URIString,ParentFolderUri:e.parentFolder}})},AdhocReportUnit:function(e,r){return repositorySearch.editActionFactory.ReportUnit(e,r)},DataDefinerUnit:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"queryBuilderFlow",paramsMap:{uri:e.URIString,ParentFolderUri:e.parentFolder}})},OlapUnit:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"olapUnitFlow",paramsMap:{resource:e.URIString,isEdit:"edit",ParentFolderUri:e.parentFolder}})},DashboardResource:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"dashboardRuntimeFlow",paramsMap:{dashboardResource:e.URIString}})},ReportOptions:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"reportOptionsEditFlow",paramsMap:{reportOptionsURI:e.URIString,ParentFolderUri:e.parentFolder}})},JdbcReportDataSource:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"addDataSourceFlow",paramsMap:{resource:e.URIString,ParentFolderUri:e.parentFolder}})},JndiJdbcReportDataSource:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},CustomReportDataSource:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},BeanReportDataSource:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},VirtualReportDataSource:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},HiveDataSourceService:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},CassandraDataSourceService:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},DiagnosticCustomDataSourceService:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},MongoDbDataSourceService:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},AwsReportDataSource:function(e,r){return repositorySearch.editActionFactory.JdbcReportDataSource(e,r)},Query:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"queryFlow",paramsMap:{currentQuery:e.URIString,isEdit:!0,ParentFolderUri:e.parentFolder}})},InputControl:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"addInputControlFlow",paramsMap:{isEdit:!0,resource:e.URIString,ParentFolderUri:e.parentFolder}})},ListOfValues:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"addListOfValuesFlow",paramsMap:{resource:e.URIString,isEdit:"edit",ParentFolderUri:e.parentFolder}})},DataType:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"dataTypeFlow",paramsMap:{resource:e.URIString,isEdit:"edit",ParentFolderUri:e.parentFolder}})},MondrianConnection:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"olapClientConnectionFlow",paramsMap:{selectedResource:e.URIString,isEdit:"edit",ParentFolderUri:e.parentFolder}})},SecureMondrianConnection:function(e,r){return repositorySearch.editActionFactory.MondrianConnection(e,r)},XMLAConnection:function(e,r){return repositorySearch.editActionFactory.MondrianConnection(e,r)},MondrianXMLADefinition:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"mondrianXmlaSourceFlow",paramsMap:{selectedResource:e.URIString,isEdit:"edit",ParentFolderUri:e.parentFolder}})},FileResource:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"addFileResourceFlow",paramsMap:{selectedResource:e.URIString,ParentFolderUri:e.parentFolder}})},SemanticLayerDataSource:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"createSLDatasourceFlow",paramsMap:{uri:e.URIString,ParentFolderUri:e.parentFolder}})}},repositorySearch.RedirectAction.createEditResourceAction=function(e,r){e||(e=repositorySearch.model.getSelectedResources()[0]);var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT,t=repositorySearch.editActionFactory[e.typeSuffix()];return t?t(e,o):repositorySearch.editActionFactory[repositorySearch.Action.DEFAULT](e,o)},repositorySearch.openActionFactory={ContentResource:function(e,r){return r===repositorySearch.RedirectType.FLOW_REDIRECT&&(r=repositorySearch.RedirectType.LOCATION_REDIRECT),new repositorySearch.RedirectAction(r,{url:"fileview/fileview"+e.URIString,paramsMap:{}})},DashboardResource:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"dashboardDesignerFlow",paramsMap:{resource:e.URIString,ParentFolderUri:e.parentFolder}})},DashboardModelResource:function(e,r){var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.LOCATION_REDIRECT;return new repositorySearch.RedirectAction(o,{url:"dashboard/designer.html#"+encodeURIComponent(e.URIString)})},DataDefinerUnit:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"queryBuilderFlow",paramsMap:{uri:e.URIString,ParentFolderUri:e.parentFolder}})},AdhocReportUnit:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"adhocFlow",paramsMap:{resource:e.URIString,ParentFolderUri:e.parentFolder}})},AdhocDataView:function(e,r){return new repositorySearch.RedirectAction(r,{flowId:"adhocFlow",paramsMap:{resource:e.URIString,ParentFolderUri:e.parentFolder}})}},repositorySearch.RedirectAction.createOpenResourceAction=function(e,r){e||(e=repositorySearch.model.getSelectedResources()[0]);var o=r?repositorySearch.RedirectType.WINDOW_REDIRECT:repositorySearch.RedirectType.FLOW_REDIRECT,t=repositorySearch.openActionFactory[e.typeSuffix()];return t?t(e,o):new repositorySearch.Action(function(){alert("Open action for resource type '"+e.resourceType+"' is not implemented!")})},repositorySearch.RedirectAction.createRunInBackgroundResourceAction=function(){var e=repositorySearch.model.getSelectedResources()[0],r="";return e.resourceType.endsWith(".ReportUnit")||e.resourceType.endsWith(".AdhocReportUnit")||e.resourceType.endsWith(".ReportOptions")?(e.parentResource&&(r="@@parentReportURI="+e.parentResource.URIString+"@@"),new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT,{url:JRS.vars.contextPath+"/scheduler/main.html#create"+e.URIString+"$fast"+r})):void 0},repositorySearch.RedirectAction.createScheduleAction=function(){var e=repositorySearch.model.getSelectedResources()[0],r="";return e.resourceType.endsWith(".ReportUnit")||e.resourceType.endsWith(".AdhocReportUnit")||e.resourceType.endsWith(".ReportOptions")?(e.parentResource&&(r="@@parentReportURI="+e.parentResource.URIString+"@@"),new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT,{url:JRS.vars.contextPath+"/scheduler/main.html#list"+e.URIString+r})):void 0},repositorySearch.createActionFactory={OlapClientConnection:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"olapClientConnectionFlow",paramsMap:{ParentFolderUri:e.URI}})},OlapUnit:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"olapUnitFlow",paramsMap:{ParentFolderUri:e.URI}})},ReportDataSource:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"addDataSourceFlow",paramsMap:{ParentFolderUri:e.URI}})},SemanticLayerDataSource:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"createSLDatasourceFlow",paramsMap:{ParentFolderUri:e.URI}})},FileResource:function(e,r){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"addFileResourceFlow",paramsMap:{expectedFileType:r,parentFolder:e.URI}})},ReportUnit:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"reportUnitFlow",paramsMap:{ParentFolderUri:e.URI}})},Query:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"queryFlow",paramsMap:{ParentFolderUri:e.URI}})},InputControl:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"addInputControlFlow",paramsMap:{ParentFolderUri:e.URI}})},DataType:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"dataTypeFlow",paramsMap:{ParentFolderUri:e.URI}})},ListOfValues:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"addListOfValuesFlow",paramsMap:{ParentFolderUri:e.URI}})},XMLAConnection:function(e){return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT,{flowId:"mondrianXmlaSourceFlow",paramsMap:{ParentFolderUri:e.URI}})}},repositorySearch.RedirectAction.createCreateResourceAction=function(e,r){var o=repositorySearch.model.getContextFolder(),t=repositorySearch.createActionFactory[e];return t?t(o,r):new repositorySearch.Action(function(){alert("Create action for resource type suffix '"+e+"' is not implemented!")})},repositorySearch.confirmAndLeave=function(){return new repositorySearch.Action(function(){return!isPropertiesChanged()&&!isPermissionsChanged()||confirm(repositorySearch.getMessage("RM_CANCEL_EDIT_MESSAGE"))}).invokeAction()};