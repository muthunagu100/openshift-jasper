define(["require","adhoc/designer","jquery","underscore","common/model/RepositoryResourceModel","common/util/identityUtil","common/enum/repositoryResourceTypes"],function(e){var t=e("adhoc/designer"),n=e("jquery"),r=e("underscore"),o=e("common/model/RepositoryResourceModel"),i=e("common/util/identityUtil"),a=e("common/enum/repositoryResourceTypes");return t.handleBack=function(){var e=t.buildSaveRequestData();t.filtersController.hasNotAppliedFilters()?t.showSaveConfirmationDialog(function(){n(document).trigger("adhocDesigner:save",t.buildResourceMetadata(e))}):n(document).trigger("adhocDesigner:save",t.buildResourceMetadata(e))},t.handleCancel=function(){n(document).trigger("adhocDesigner:cancel")},t.buildSaveRequestData=function(){var e=!!saveUri,t=e?saveFolder:"/temp",n=e?saveLabel:i.generateUniqueName("tmpAdv_"),r=e?saveDesc:"Dashboard visualization.",a=e;return window.embeddedSaveAsUri&&(t=o.getParentFolderFromUri(embeddedSaveAsUri),n=o.getNameFromUri(embeddedSaveAsUri)),window.embeddedSaveAsOverwrite&&(a=embeddedSaveAsOverwrite),window.embeddedSaveAsUri&&(t=o.getParentFolderFromUri(embeddedSaveAsUri),n=o.getNameFromUri(embeddedSaveAsUri)),window.embeddedSaveAsOverwrite&&(a=embeddedSaveAsOverwrite),{aruLabel:n,aruFolder:t,aruDesc:r,allOverwrite:a}},t.buildResourceMetadata=function(e){var t=!!saveUri,n={uri:[e.aruFolder,e.aruLabel].join("/"),resourceType:a.ADHOC_DATA_VIEW,type:localContext.mode,label:e.aruLabel,version:1};return t||(n.dataSourceUri=reportUnitURI),n},t.saveEmbedded=function(){var e=t.buildSaveRequestData();designerBase.sendRequest(designerBase.getControllerPrefix()+"_save",e,function(o){var i=r.clone(e);i.viewType=o.viewType,n(document).trigger("adhocDesigner:saved",t.buildResourceMetadata(i))})},t.crossDocumentListener=function(e){"adhocDesigner:save"==e.data&&t.saveEmbedded()},t.saveAndRun=function(){windowPopUp=window.open("","jr"),buttonManager.disable(n("execute"));var e=function(e){t.render(e),windowPopUp.location="flow.html?_flowId=viewAdhocReportFlow&clientKey="+clientKey+"&reportUnit="+localContext.state.tempAruName+"&noReturn=true"};designerBase.sendRequest("co_saveTemp",[],e)},t.applyAdhocTheme=function(e,t){var r=null,o=e.element(),i=null;if(t){var a=t.childElements();r=matchAny(o,["li.button"],!0),r&&(i=r.identify(),a.each(function(e){buttonManager.unSelect(e)}),buttonManager.select(r)),i!==selectedThemeId&&(selectedThemeId=i,n(this.CANVAS_PARENT_ID)&&selectedThemeId&&(n(this.CANVAS_PARENT_ID).writeAttribute("class",i),this.toggleAdhocTheme()))}},t.orientationSelected=function(e){t.setPageOrientation(e),designerBase.unSelectAll()},t.getOrientation=function(){return localContext.state.pageOrientation},t.orientationEquals=function(e){return t.getOrientation()==e},t.getPaperSize=function(){return localContext.state.paperSize},t.paperSizeEquals=function(e){return t.getPaperSize()==e},t.paperSizeSelected=function(e,n){t.setPaperSize(e),designerBase.unSelectAll(n)},t.goToDesignView=function(){var e=document.location.href.parseQuery();delete e._flowId,delete e.viewReport,delete e.fromDesigner,primaryNavModule.setNewLocation("designer",Object.toQueryString(e))},t.goToPresentationView=function(){var e=document.location.href.parseQuery();delete e._flowId,e.viewReport=!0,e.fromDesigner=!0,primaryNavModule.setNewLocation("designer",Object.toQueryString(e))},t.getAllAvailableFolders=function(e){var t=new Array;if(!e){if(!this.availableTree)return t;e=this.availableTree.rootNode,t.push(e)}if(e.param.type===this.FOLDER_TYPE)for(var n=0;n<e.childs.length;n++){var r=e.childs[n];r.param.type===this.FOLDER_TYPE&&(t.push(r),t=t.concat(this.getAllAvailableFolders(r)))}return t},t.togglePagePropsRoller=function(){selectionObject.pagePropsRollDown=!selectionObject.pagePropsRollDown},t.setFieldValuesOnColumnSelection=function(){},t.setFieldValuesOnGroupSelection=function(){},t.selectReport=function(){designerBase.unSelectAll(),this.activateReportSelectionObject()},t.activateReportSelectionObject=function(){this.selectSingleObject(titleBar),selectionCategory.area=designerBase.TITLE_SELECT_AREA},t.isSingleFieldSelected=function(){return 1==designerBase.getSelectedObject().length},t.isInColumns=function(e){for(var t=0;t<localContext.state.columns.length;t++)if(e==localContext.state.columns[t])return!0;return!1},t.setPageOrientation=function(e){designerBase.sendRequest("co_setPageOrientation",["o="+e])},t.setPaperSize=function(e){designerBase.sendRequest("co_setPaperSize",["s="+e])},t});