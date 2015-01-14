dd.calculatedFields={PAGE:"calsFields",getValidationPostData:function(){return{page:this.PAGE}},fillForm:function(){$("unsavedChangesPresent").writeAttribute("value",dd.isUnsavedChangesPresent().toString())},init:function(e){dd.formDomId="calculatedFieldsForm",dd_calcFields.fields.init(),dd_calcFields.editor.init(e)}};var dd_calcFields=dd.calculatedFields;dd_calcFields.fields={ITEMS_TREE_DOM_ID:"fieldsTreeRoot",TREE_DATA_PROVIDER:"joinTreeDataProviderForCalcFields",itemsTree:null,init:function(){this.itemsTree=domain.createItemsTree({treeId:this.ITEMS_TREE_DOM_ID,providerId:this.TREE_DATA_PROVIDER,templateDomId:"list_responsive_collapsible_type_tables",nodeClass:domain.TablesNode,selectOnMousedown:!0}),this.itemsTree.showTree(1,this.initTreeEvents.bind(this),domain.treeErrorHandler),domain.resetTreeSelectionHandler.init(["#"+this.ITEMS_TREE_DOM_ID],function(){return[this.itemsTree]}.bind(this))},treeEventFactory:{"leaf:dblclick":function(e){var t=e.memo.node;if(Event.stop(e),t){var i=dd_calcFields.editor,d=new dd_calcFields.CalculatedField(t);i.insertFieldReference(d),i.mode===i.EMPTY_MODE&&i.edit(d)}}},initTreeEvents:function(){for(var e in this.treeEventFactory)this.itemsTree.observe(e,this.treeEventFactory[e].bind(this))},refreshTree:function(e){this.itemsTree.showTree(2,function(){if(e){var t=this.itemsTree.findNodeById(e);this.itemsTree.openAndSelectNode(t.param.uri)}}.bind(this))}},dd_calcFields.editor={FIELD_NAME_ELEMENT_ID:"fieldName",DATA_TYPE_ELEMENT_ID:"dataType",EXPRESSION_ELEMENT_ID:"expression",SAVE_BUTTON_ID:"saveField",CANCEL_BUTTON_ID:"cancelField",DELETE_BUTTON_ID:"deleteField",CONFIRM_DIALOG_ID:"editFieldConfirmMessage",EMPTY_MODE:"empty",EDIT_MODE:"edit",EDIT_ALLOWED:!0,init:function(e){this.calculatedField=null,this.mode=this.EMPTY_MODE,this._setFieldsUsedByFilters(e.fieldsUsedByFilters[e.dataSourceId]),this._initControls(),this._updateViewState(),this._initHandlers()},edit:function(e){this.calculatedField=e,this.mode=this.EDIT_MODE,this.EDIT_ALLOWED=!0,this.calculatedField.isEdit()?this._validateDeletion(function(e){e&&e.length>0&&(domain.enableButton(this._saveButton,!1),domain.enableButton(this._deleteButton,!1),dialogs.systemConfirm.show(domain._messages.cannot_edit_field),this.EDIT_ALLOWED=!1)}.bind(this)):this.calculatedField.resetName(),this._updateViewState(),this._nameInput.activate()},insertFieldReference:function(e){dd.insertAtCaret(this._expressionInput,e.getExpressionId(),this.selectionRange)},_initControls:function(){this._saveButton=$(this.SAVE_BUTTON_ID),this._cancelButton=$(this.CANCEL_BUTTON_ID),this._deleteButton=$(this.DELETE_BUTTON_ID),this._nameInput=$(this.FIELD_NAME_ELEMENT_ID),this._dataTypeInput=$(this.DATA_TYPE_ELEMENT_ID),this._expressionInput=$(this.EXPRESSION_ELEMENT_ID),this.selectionRange=null,this._elementTypesMap=$H({name:this._nameInput,expression:this._expressionInput})},_setFieldsUsedByFilters:function(e){this.fieldsUsedByFilters=$H(e||{})},_updateViewState:function(){this._modelToTemplate(),this._updateButtonsState()},_updateButtonsState:function(){switch(this.mode){case this.EMPTY_MODE:[this._saveButton,this._cancelButton,this._deleteButton].each(function(e){domain.enableButton(e,!1)});break;case this.EDIT_MODE:domain.enableButton(this._cancelButton,!0),this.EDIT_ALLOWED===!0&&(domain.enableButton(this._saveButton,!0),domain.enableButton(this._deleteButton,this.calculatedField&&this.calculatedField.isEdit()));break;default:throw"Unexpected Calculated Field editor's state: [#{mode}]".interpolate({mode:this.mode})}},_discardPreviousEditing:function(){this.mode=this.EMPTY_MODE,this.calculatedField=null,this._updateViewState(),this._clearAllErrors()},_modelToTemplate:function(){this._nameInput.setValue(this.calculatedField?this.calculatedField.name:""),this._dataTypeInput.setValue(this.calculatedField?this.calculatedField.type:"java.lang.String"),this._expressionInput.setValue(this.calculatedField?this.calculatedField.expression:"")},_templateToModel:function(){this.calculatedField?(this.calculatedField.setName(this._nameInput.getValue()),this.calculatedField.setType(this._dataTypeInput.getValue()),this.calculatedField.setExpression(this._expressionInput.getValue())):this.calculatedField=new dd_calcFields.CalculatedField(this._nameInput.getValue(),this._dataTypeInput.getValue(),this._expressionInput.getValue())},_save:function(){this._templateToModel(),this._clearAllErrors(),this._validate()&&(this._isFieldNotUsedByFilter()?this._sendValidationRequest():this._showWarningDialog(domain.getMessage("confirm_filter_delete"),this._sendValidationRequest.bind(this)))},_validate:function(){return ValidationModule.validate([{validator:function(e){return domain.stringIdValidator(e,domain.getMessage("wrong_name_format"))},element:this._nameInput}])},_isFieldNotUsedByFilter:function(){return!this.fieldsUsedByFilters.any(function(e){return this.calculatedField.oldName===e.value.itemId},this)},_sendValidationRequest:function(){var e={calculateField:Object.toJSON(this.calculatedField)};this.calculatedField.isEdit()&&(e.oldCalcFieldName=this.calculatedField.getExpressionId()),dd_calcFields.sendAjaxRequest({eventId:"validateCalcField",flowExecutionKey:dd.flowExecutionKey},e,function(e){var t=e.down("#validationSuccess"),i=e.down("#validationWarning"),d=e.down("#validationFailed");return i?this._showWarningDialog(i.innerHTML,t&&this._doSave.bind(this,t.innerHTML)):t?this._doSave(t.innerHTML.replace(/\&amp;/g,"&")):d?this._handleValidationFailure(d.innerHTML,d.readAttribute("for")):void 0}.bind(this))},_doSave:function(e){var t=e.evalJSON()[0];this.calculatedField.isEdit()?this._removeField(function(){var e=this.calculatedField.getExpressionId();t.oldCalcFieldName=e,this._addCalculatedField(t)}.bind(this)):this._addCalculatedField(t)},_handleValidationFailure:function(e,t){this._showError(this._elementTypesMap.get(t),e)},_showWarningDialog:function(e,t){$(this.CONFIRM_DIALOG_ID).down(".message").update(e);var i=function(){domain.confirmDialog.hideForDetails()};domain.confirmDialog.show(this.CONFIRM_DIALOG_ID,t||i,i,null,domain.confirmDialog.MODE_YES_NO)},_addCalculatedField:function(e){dd.setUnsavedChangesPresent(!0),e.calculateField=Object.toJSON(this.calculatedField),dd_calcFields.sendAjaxRequest({eventId:"createCalcField",flowExecutionKey:dd.flowExecutionKey},e,this._saveFieldHandler.bind(this))},_saveFieldHandler:function(e){var t=e.innerHTML.replace(/\&amp;/g,"&").evalJSON()[0];dd_calcFields.fields.refreshTree(t.id);var i=this.calculatedField.isEdit()?"calculated_field_edited":"calculated_field_added";dialogs.systemConfirm.show(domain.getMessage(i,{field:t.id})),this._discardPreviousEditing()},_cancel:function(){this._discardPreviousEditing()},_remove:function(){var e=function(){this._validateDeletion(function(){this._removeField(function(){dd_calcFields.fields.refreshTree(),dialogs.systemConfirm.show(domain.getMessage("calculated_field_removed",{field:this.calculatedField.getExpressionId()})),this._discardPreviousEditing()}.bind(this))}.bind(this))}.bind(this);this._isFieldNotUsedByFilter()?e():this._showWarningDialog(domain.getMessage("confirm_filter_delete"),e)},_validateDeletion:function(e){dd_calcFields.sendAjaxRequest({eventId:"validateCalculateFieldDeletion",flowExecutionKey:dd.flowExecutionKey},{calculateField:this.calculatedField.getExpressionId()},function(){var t=["involvedFieldsIds","involvedFieldsExpressionIds"].collect(function(e){var t=$$("#ajaxbuffer #"+e)[0];return t?t.innerHTML.evalJSON():null});e.apply(this,t)}.bind(this))},_removeField:function(e){dd.setUnsavedChangesPresent(!0),dd_calcFields.sendAjaxRequest({eventId:"deleteCalculatedField",flowExecutionKey:dd.flowExecutionKey},{fieldsToDelete:Object.toJSON([this.calculatedField.getExpressionId()])},e)},_initHandlers:function(){this.buttonHandlersMap=this._buttonHandlersFactory(),domain.registerClickHandlers([this._clickHandler.bind(this)]),[this._nameInput,this._dataTypeInput,this._expressionInput].each(function(e){e.observe("change",function(){this.mode=""===this._nameInput.getValue()&&""===this._expressionInput.getValue()?this.EMPTY_MODE:this.EDIT_MODE,this._updateButtonsState()}.bind(this))},this),this._expressionInput.observe("mouseup",this._saveSelection.bind(this))},_clickHandler:function(e){domain.basicClickHandler(e,this.buttonHandlersMap)},_buttonHandlersFactory:function(){return $H({"#saveField":this._save.bind(this),"#cancelField":this._cancel.bind(this),"#deleteField":this._remove.bind(this)})},_saveSelection:function(){document.selection&&(this.selectionRange=document.selection.createRange())},_showError:function(e,t){e&&ValidationModule.showError(e,t)},_clearAllErrors:function(){this._elementTypesMap.each(function(e){ValidationModule.hideError(e.value)})}},dd_calcFields.CalculatedField=function(){if(0===arguments.length)return this;if(1===arguments.length){var e=arguments[0];this.expression=e.param.extra.expression,this.expression&&(this.expression=this.expression.unescapeHTML(),this.setIsEdit(!0)),this.oldName=this.name=e.param.extra.itemId,this.type=e.param.extra.JavaType,this.parentName=e.parent.param.extra.itemId}else 3===arguments.length&&(this.setName(arguments[0]),this.setType(arguments[1]),this.setExpression(arguments[2]))},dd_calcFields.CalculatedField.addMethod("setName",function(e){this.name=e}),dd_calcFields.CalculatedField.addMethod("resetName",function(){this.oldName=this.name=""}),dd_calcFields.CalculatedField.addMethod("setType",function(e){this.type=e}),dd_calcFields.CalculatedField.addMethod("setExpression",function(e){this.expression=e.unescapeHTML()}),dd_calcFields.CalculatedField.addMethod("toJSON",function(){return{name:this.name,type:this.type,expression:dd_calcFields.normalizeLt(this.expression)}}),dd_calcFields.CalculatedField.addMethod("setIsEdit",function(e){this.isEditMode=e}),dd_calcFields.CalculatedField.addMethod("isEdit",function(){return!!this.isEditMode}),dd_calcFields.CalculatedField.addMethod("getExpressionId",function(){return[this.parentName,this.oldName||this.name].join(".").replace(/'/g,"''")}),dd_calcFields.sendAjaxRequest=function(e,t,i){domain.sendAjaxRequest(e,t,i,{mode:AjaxRequester.prototype.TARGETTED_REPLACE_UPDATE,fillLocation:"ajaxbuffer"})},dd_calcFields.normalizeLt=function(e){return e.replace(/\s*([<])\s*([^=])/g," $1 $2")},"undefined"==typeof require&&document.observe("dom:loaded",dd.initialize.bind(dd));