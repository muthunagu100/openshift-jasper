define(["require","adhoc/filter/valueEditor/MultiSelectValueEditorAdapter","common/component/multiSelect/view/new/MultiSelectWithTrueAllNew","adhoc/filter/format/OlapFilterValueFormatter","adhoc/filter/format/filterValueFormatter"],function(e){var t=e("adhoc/filter/valueEditor/MultiSelectValueEditorAdapter"),l=e("common/component/multiSelect/view/new/MultiSelectWithTrueAllNew"),i=e("adhoc/filter/format/OlapFilterValueFormatter"),r=e("adhoc/filter/format/filterValueFormatter");return t.extend({createList:function(){return new l({getData:_.bind(this.model.dataProvider.getData,this.model),formatValue:this.model.isOlap?new i(this.model.get("isFirstLevelInHierarchyAll")).format:r})},_setValueToList:function(e){this.model.get("isAnyValue")?this.list.setTrueAll(!0):this.list.setValue(this.getValue(),e)}})});