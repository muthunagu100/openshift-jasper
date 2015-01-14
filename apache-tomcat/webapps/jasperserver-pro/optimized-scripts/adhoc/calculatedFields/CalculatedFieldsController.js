define(["require","underscore","backbone","adhoc/calculatedFields/view/CalculatedFieldView"],function(i){var e=i("underscore"),s=i("backbone"),t=i("adhoc/calculatedFields/view/CalculatedFieldView");return s.View.extend({initialize:function(i){this.service=i.service,this.view=new t({el:i.element}),this.view.listenTo(this.view.model,"validate:expression",e.bind(this._validateExpression,this)),this.view.listenTo(this.view.model,"validate:summaryExpression",e.bind(this._validateCustomSummary,this))},start:function(i){i=i||{},this.view.isEdit=i.editingMode,this.view.render(),this._fetchFieldsAndFunctions(),this._setFieldMetadata(i)},stop:function(){this.view.stopListening(this.view.model),this.view.undelegateEvents()},applyField:function(){if(this.view.model.isValidField()){var i=this.view.isEdit?this.service.update.bind(this.service):this.service.add.bind(this.service);return i(this.view.model.toRequest(),this.view.model.get("fieldName")).done(e.bind(function(i){this.trigger("field:applied",i)},this)).fail(e.bind(this._handleServerError,this))}},_setFieldMetadata:function(i){this.view.isEdit&&i.selectedFieldName?this.service.get(i.selectedFieldName).done(e.bind(function(i){var e=i;this.view.model.populateFromField(e),this.trigger("field:loaded","MEASURE"===e.kind,!0)},this)):(this.view.model.set("kind",i.kind),this.trigger("field:loaded","MEASURE"===i.kind,!1))},_fetchFieldsAndFunctions:function(){this.service.fetchFieldsList().done(e.bind(function(i){this.view.model.set("availableFields",i)},this)),this.service.fetchFunctionsList().done(e.bind(function(i){this.view.model.set("availableFunctions",i)},this))},_handleServerError:function(i){if(500!==i.status){var e=JSON.parse(i.responseText);if(e&&e.parameters&&e.parameters[0]){var s=e.parameters[0];s="label"==s?"fieldLabel":s,this.view.model.trigger("invalid:"+s,{errorMessage:e.message})}}},_validateExpression:function(i){if(this.view.model.isExpressionValid("expression")){var s={expression:this.view.model.get("expression"),kind:this.view.model.get("kind")};this.service.validate(s).done(e.bind(function(e){this.view.model.set("availableSummaryFunctions",e.availableSummaries),this.view.model.isSummaryFunctionValid()||this.view.model.set("summaryFunction",e.summaryFunction),i&&i()},this)).fail(e.bind(function(i){this._handleServerError(i)},this))}},_validateCustomSummary:function(i){if(this.view.model.isExpressionValid("summaryExpression")){var s={expression:this.view.model.get("expression"),summaryFunction:this.view.model.get("summaryFunction"),summaryExpression:this.view.model.get("summaryExpression")};this.service.validate(s).done(e.bind(function(e){i&&i(e)},this)).fail(e.bind(function(i){this._handleServerError(i)},this))}}})});