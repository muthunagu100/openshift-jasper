jaspersoft||(jaspersoft={components:{}}),jaspersoft.components||(jaspersoft.components={}),jaspersoft.components.AjaxUploader=function(e,t){function o(e){var t;if(e.firstChild.innerText&&""!==e.firstChild.innerText)if(e.body){var t=new ActiveXObject("Microsoft.XMLDOM");t.async=!1,t.loadXML(e.firstChild.innerText.replace("\r\n-","\r\n"))}else t=e;else t=e;var o=null;return t.firstChild&&(o=t.firstChild.nodeName.toLowerCase()),o&&"html"!==o&&"#comment"!==o?r("xml"===t.firstChild.nodeName.toLowerCase()?t.firstChild.nextSibling:t.firstChild):{errorCode:"unexpected.error"}}function r(e){var t;if(e.children)t=e.children;else{t=[];for(var o=0,i=e.childNodes.length;i>o;o++)null===e.childNodes[o].nodeValue&&t.push(e.childNodes[o])}if(0===t.length&&1===e.childNodes.length)return e.childNodes[0].nodeValue;var n;if(t.length>1&&t[0].nodeName===t[1].nodeName){n=[];for(var o=0,i=t.length;i>o;o++)n[o]=r(t[o])}else{n={};for(var o=0,i=t.length;i>o;o++)n[t[o].nodeName]=r(t[o])}return n}var i=function(r,i,n){this.name=_.uniqueId("uploadTarget"),n&&(this.timeout=n);var s=t.createTemplate("ajaxUploadTemplate");s||(s=t.createTemplateFromText("<iframe class='hidden' name='{{name}}'></iframe>")),this.iframe=e(s({name:this.name})),e(r).append(this.iframe).attr("target",this.name),function(e,t){e.iframe.load(function(){if(e.isTimeout())t({errorCode:"error.timeout"});else if(jQuery(this.contentWindow.document).text())try{t(o(this.contentWindow.document))}catch(r){t({errorCode:"error.invalid.response"})}e.stopTimeoutLookup()})}(this,i),this.parceXmlDocToObject=o};return i.prototype.startTimeoutLookup=function(e){if(this.timeout){var t=1e3,o=0,r=function(){o+=t,o>=this.timeout&&(this.stopTimeoutLookup(),e({errorCode:"error.timeout"}))};this._intervalId=setInterval(_.bind(r,this),t)}},i.prototype.stopTimeoutLookup=function(){this.timeout&&(clearInterval(this._intervalId),this._intervalId=-1)},i.prototype.isTimeout=function(){return-1===this._intervalId},i}(jQuery,jaspersoft.components.templateEngine);