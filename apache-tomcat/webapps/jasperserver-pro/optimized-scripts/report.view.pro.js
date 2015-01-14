function SaveAsDialog(e,r){function t(e){var r=jQuery(e.templateMatcher);return l.cloneTemplate&&(r=this.dialogElement.clone()),l.elementId&&r.attr("id",e.elementId),jQuery(l.insertAfterMatcher).append(r),r}function o(e){e.name=u.find(l.nameInputMatcher).val(),e.description=u.find(l.descriptionInputMatcher).val();var r=f.getSelectedNode();e.folder=r?r.param.uri:null}function n(e){return e.name?e.folder?!0:(alert(Report.getMessage("jasper.report.view.save.missing.folder")),!1):(alert(Report.getMessage("jasper.report.view.save.missing.name")),!1)}function a(e){o(d),n(d)&&r(d).then(function(){e.stopPropagation(),c.close()})}function s(e){e.stopPropagation(),c.close()}function p(){var e=dynamicTree.createRepositoryTree(l.foldersTreeId,{providerId:"adhocRepositoryTreeFoldersProvider",rootUri:"/",organizationId:Report.organizationId,publicFolderUri:Report.publicFolderUri,urlGetNode:"flow.html?_flowId=adhocTreeFlow&method=getNode",urlGetChildren:"flow.html?_flowId=adhocTreeFlow&method=getChildren",treeErrorHandlerFn:function(){}}),r=e.modifyRootObject,t=e.modifyRootObject=function(e,o,n,a){for(var s=o?e:e.children,p=0,i=s.length;i>p;p++)s[p].extra.isWritable||(s[p].cssClass="readonly"),s[p].children&&t(s[p],!1,s[p],!0);return o?e=s:e.children=s,a?void 0:r.call(this,e,o,n)};return e}var i={templateMatcher:"#saveAs",insertAfterMatcher:"#frame",cloneTemplate:!1,elementId:null,okButtonMatcher:"#saveAsBtnSave",cancelButtonMatcher:"#saveAsBtnCancel",nameInputMatcher:"#saveAsInputName",descriptionInputMatcher:"#saveAsInputDescription",foldersTreeId:"saveAsFoldersTree"},l=jQuery.extend({},i,e),c=this,u=null,d={folder:null,name:null,description:null},f=null;this.open=function(e){e.folder||(e.folder="/"),u=t(l),dialogs.popup.show(u.get(0)),u.find(l.nameInputMatcher).val(e.name),u.find(l.descriptionInputMatcher).val(e.description),u.find(l.nameInputMatcher).focus(),u.find(l.okButtonMatcher).click(a),u.find(l.cancelButtonMatcher).click(s),f=p(),f.observe("node:selected",function(e){try{u.find(l.okButtonMatcher)[0].disabled=!e.memo.node.param.extra.isWritable}catch(r){u.find(l.okButtonMatcher)[0].disabled=!0,console&&console.log("report.view.pro[this.open] - "+r)}}),f.showTreePrefetchNodes(e.folder,function(){f.openAndSelectNode(e.folder)})},this.close=function(){u.find(l.okButtonMatcher).unbind("click",a),u.find(l.cancelButtonMatcher).unbind("click",s),dialogs.popup.hide(u.get(0))}}Report.jsonErrorHandler=function(e){if(!isValidJsonResponse(e)){var r=baseErrorHandler(e);return r||alert("Unexpected response"),!0}return!1},Report.save=function(){if(Report.isUriTmp(Report.reportUnitURI))return Report.saveAs();var e={_flowExecutionKey:Report.reportExecutionKey(),_eventId:"saveReport"};Report.newIcOrder&&(e.inputControlOrder=Report.newIcOrder);var r="flow.html?"+Object.toQueryString(e),t={mode:AjaxRequester.prototype.EVAL_JSON,errorHandler:Report.jsonErrorHandler,callback:function(e){e.flowExecutionKey&&(Report.flowExecutionKeyOutput=e.flowExecutionKey),e.response&&"success"==e.response.status?dialogs.systemConfirm.show(Report.getMessage(e.response.msg),5e3):e.response&&"failure"==e.response.status&&(Report.newIcOrder?dialogs.systemConfirm.show(Report.getMessage(e.response.msg),5e3):"cluster.exception.session.attribute.missing.popup"==e.response.msg?dialogs.clusterErrorPopup.show(e.response.msg):dialogs.errorPopup.show(Report.getMessage(e.response.msg))),Report.savedState=jasperreports.reportviewertoolbar.currentState(),Report.snapshotSaveStatus=null,Report.newIcOrder=!1}};ajaxTargettedUpdate(r,t)},Report.doSaveAs=function(e,r){var t={_flowExecutionKey:Report.reportExecutionKey(),_eventId:"saveReportAs",folder:e.folder,name:e.name,description:e.description,overwrite:r};Report.newIcOrder&&(t.inputControlOrder=Report.newIcOrder);var o={mode:AjaxRequester.prototype.EVAL_JSON,postData:appendPostData("",t),errorHandler:Report.jsonErrorHandler,callback:function(r){var t=r.response.status;switch(t){case"success":r.flowExecutionKey&&(Report.flowExecutionKeyOutput=r.flowExecutionKey);var o=Report.reportLabel;Report.reportUnitURI=r.response.copyURI,Report.reportLabel=e.name,Report.reportDescription=e.description,document.title=Report.replaceSingleOccurrence(document.title,o,Report.reportLabel),jQuery("#reportViewFrame .title").each(function(e,r){var t=jQuery(r),n=t.html(),a=Report.replaceSingleOccurrence(n,o,Report.reportLabel);a!=n&&t.html(a)}),buttonManager.disable("undo"),buttonManager.disable("redo"),buttonManager.disable("undoAll"),dialogs.systemConfirm.show(Report.getMessage(r.response.msg),5e3),Report.savedState=jasperreports.reportviewertoolbar.currentState(),Report.snapshotSaveStatus=null,Report.newIcOrder&&(Report.newIcOrder=!1);break;case"failure":"cluster.exception.session.attribute.missing.popup"==r.response.msg?dialogs.clusterErrorPopup.show(r.response.msg):dialogs.errorPopup.show(Report.getMessage(r.response.msg));break;case"confirmOverwrite":confirm(Report.getMessage(r.response.msg))&&Report.doSaveAs(e,!0)}}},n="flow.html";ajaxTargettedUpdate(n,o)},Report.replaceSingleOccurrence=function(e,r,t){var o=e.indexOf(r);return 0>o||e.indexOf(r,o+1)>=0?e:e.replace(r,t)},Report.uriToParts=function(e){var r={name:null,folder:null},t=e.lastIndexOf("/");return 0>t?r.name=e:1==t?(r.folder="/",r.name=e.substring(1)):(r.folder=e.substring(0,t),r.name=e.substring(t+1)),r},Report.uriToFolder=function(e){var r,t=e.lastIndexOf("/");return r=0>t?null:1==t?"/":e.substring(0,t)},Report.isUriTmp=function(e){var r=0==e.indexOf(Report.tempFolderUri);return r},Report.saveAs=function(){void 0===Report.saveAsDialog&&(Report.saveAsDialog=new SaveAsDialog({},function(e){Report.doSaveAs(e,!1);var r=jQuery.Deferred();return r.resolve(),r}));var e=Report.reportUnitURI;Report.isUriTmp(e)&&Report.allRequestParameters&&Report.allRequestParameters.advUri&&Report.allRequestParameters.advUri[0]&&(e=Report.allRequestParameters.advUri[0]);var r={name:Report.reportLabel,folder:Report.uriToFolder(e),description:Report.reportDescription};Report.saveAsDialog.open(r)},Report.refreshSave=function(){var e=null!=Report.lastPageIndex;e?buttonManager.enable($("fileOptions")):buttonManager.disable($("fileOptions")),e&&"NEW"==Report.snapshotSaveStatus&&!Report.snapshotSaved&&(Report.snapshotSaveStatus=null,Report.snapshotSaved=!0,window.setTimeout(Report.autoSaveSnapshot,200))},Report.confirmExit=function(){return Report.reportRunning?confirm(Report.getMessage("jasper.report.view.in.progress.confirm.leave")):Report.savedState&&Report.savedState!=jasperreports.reportviewertoolbar.currentState()||null!=Report.lastPageIndex&&"UPDATED"==Report.snapshotSaveStatus?confirm(Report.getMessage("jasper.report.view.confirmLeave")):!0},Report.reportRefreshedOrig=Report.reportRefreshed,Report.reportRefreshed=function(){Report.reportRefreshedOrig(),Report.savedState||(Report.savedState=jasperreports.reportviewertoolbar.currentState())},Report.autoSaveSnapshot=function(){var e={_flowExecutionKey:Report.reportExecutionKey(),_eventId:"saveReportDataSnapshot"},r="flow.html?"+Object.toQueryString(e),t={mode:AjaxRequester.prototype.EVAL_JSON,silent:!0,errorHandler:function(e){return!isValidJsonResponse(e)},callback:function(e){e.flowExecutionKey&&(Report.flowExecutionKeyOutput=e.flowExecutionKey)}};ajaxTargettedUpdate(r,t)};