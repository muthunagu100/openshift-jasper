JRS.CreateReport=function(e,r){var n=null;return getDialog=function(e){return n||(n=new JRS.GeneratorPropertiesDialog({advUri:e,okHandler:JRS.CreateReport.showGeneratedReport,messages:r})),n},{showGeneratedReport:function(r){var n=e("#reportGeneratorForm");n.find("input[name=advUri]").val(r.sourceURI),n.find("input[name=template]").val(r.template||""),n.find("input[name=generator]").val(r.generator||""),n.submit()},selectADV:function(){getDialog().show()},selectGenerator:function(e){getDialog(e).show()}}}(jQuery,__jrsConfigs__),jQuery(function(){0==jQuery("#ajaxbuffer").length&&jQuery("body").append(jQuery('<div id="ajaxbuffer" style="display:none"></div>'))});