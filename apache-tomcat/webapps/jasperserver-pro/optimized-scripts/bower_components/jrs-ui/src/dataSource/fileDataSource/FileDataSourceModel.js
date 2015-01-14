define(["require","underscore","dataSource/model/CustomDataSourceModel","dataSource/fileDataSource/enum/characterEncodings","dataSource/fileDataSource/enum/fileSourceTypes","jrs.configs","bundle!jasperserver_messages"],function(e){var r=e("underscore"),i=e("dataSource/model/CustomDataSourceModel"),n=(e("dataSource/fileDataSource/enum/characterEncodings"),e("dataSource/fileDataSource/enum/fileSourceTypes")),t=e("jrs.configs"),o=e("bundle!jasperserver_messages");return i.extend({fileTypes:[],validation:function(){var e={};return r.extend(e,i.prototype.validation,{repositoryFileName:[{fn:function(e,i,n){return"repository"===n.fileSourceType&&(r.isNull(e)||r.isUndefined(e)||r.isString(e)&&""===e)?o["fillParameters.error.mandatoryField"]:null}},{fn:function(e,i,n){return"repository"!==n.fileSourceType||r.isString(e)&&""!==e&&-1!==e.lastIndexOf(".")&&-1!==r.indexOf(this.fileTypes,e.substr(e.lastIndexOf(".")+1))?null:o["resource.file.extension"]}}],serverFileName:[{fn:function(e,i,n){return"serverFileSystem"===n.fileSourceType&&(r.isNull(e)||r.isUndefined(e)||r.isString(e)&&""===e)?o["fillParameters.error.mandatoryField"]:null}}],serverAddress:[{fn:function(e,i,n){return"ftpServer"===n.fileSourceType&&(r.isNull(e)||r.isUndefined(e)||r.isString(e)&&""===e)?o["fillParameters.error.mandatoryField"]:null}}],serverPath:[{fn:function(e,i,n){return"ftpServer"===n.fileSourceType&&(r.isNull(e)||r.isUndefined(e)||r.isString(e)&&""===e)?o["fillParameters.error.mandatoryField"]:null}}],ftpsPort:[{fn:function(e,i,n){return"ftpServer"===n.fileSourceType&&(r.isNull(e)||r.isUndefined(e)||r.isString(e)&&""===e)?o["fillParameters.error.mandatoryField"]:null}}]}),e}(),parse:function(){var e=i.prototype.parse.apply(this,arguments);if(r.isString(e.fileName)){var t=e.fileName.split(":");e.repositoryFileName=t[1],delete e.fileName,"repo"===t[0]&&(e.fileSourceType=n.REPOSITORY.name)}return e.useFirstRowAsHeader="true"===e.useFirstRowAsHeader,e},customFieldsToJSON:function(e,r){var o=e.repositoryFileName;return e.fileSourceType===n.REPOSITORY.name&&(e.fileName="repo:"+o+(t.organizationId?"|"+t.organizationId:"")),delete e.repositoryFileName,i.prototype.customFieldsToJSON.call(this,e,r)}})});