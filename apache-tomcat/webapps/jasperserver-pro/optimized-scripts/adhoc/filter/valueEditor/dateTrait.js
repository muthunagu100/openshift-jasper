define(["require","common/jquery/extension/timepickerExt","jrs.configs","underscore","common/component/calendar/calendar2"],function(e){var n=e("common/jquery/extension/timepickerExt"),r=e("jrs.configs"),t=e("underscore"),i=e("common/component/calendar/calendar2"),s=/([\s]+$|^[\s]+)/g,a=/[\s]*(\+|\-)[\s]*/g;return{init:function(e){this._calendars=[],this.pickerType=e.pickerType},render:function(){return this._destroyCalendars(),this.$el.html(this.template(this.i18nModel(this.serializeModel()))),this._setupCalendar(this.$(this.inputSelector),this.pickerType),this.trigger("rendered",this),this},valueConverter:function(e){var n=(e||"").toUpperCase().replace(s,"");return n=n.replace(a,"$1"),this._basicValueConverter(n)},removeView:function(){this._destroyCalendars(),this._calendars=null},_setupCalendar:function(e,t){var s=this;e.each(function(){var e=n(this);s._calendars.push(i.instance({inputField:e,calendarType:t,jqueryPickerOptions:r.calendar.timepicker}))})},_destroyCalendars:function(){t.invoke(this._calendars,"destroy"),this._calendars=[]}}});