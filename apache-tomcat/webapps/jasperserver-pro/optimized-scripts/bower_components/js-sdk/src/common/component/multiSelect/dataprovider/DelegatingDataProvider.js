define(["require","underscore"],function(t){var e=t("underscore"),a=function(t){e.bindAll(this,"getData"),this._getData=t&&t.getData};return e.extend(a.prototype,{getData:function(t){return this._getData(t)},setGetData:function(t){this._getData=t}}),a});