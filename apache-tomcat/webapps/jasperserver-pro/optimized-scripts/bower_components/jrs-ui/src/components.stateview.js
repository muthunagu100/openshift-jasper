jaspersoft.components.StateView=function(e,n,o,t,s){return o.View.extend({initialize:function(){n.bindAll(this),this.model&&(this.model.on("change:phase",this.handleStateChanges),this.model.on("error:server",this.handleError))},handleStateChanges:function(e,n){n===s.INPROGRESS?this.handleInprogressPhase(e):n===s.READY?this.dialogDfd.resolve():n===s.FAILED&&this.dialogDfd.resolve()},handleInprogressPhase:function(e){e.previous("phase")===s.NOT_STARTED&&(this.dialogDfd=this.createDeferredDialog())},createDeferredDialog:function(){var n=new e.Deferred;return t.showLoadingDialogOn(n,500,!0),n},handleError:function(){this.dialogDfd&&this.dialogDfd.resolve()}})}(jQuery,_,Backbone,jaspersoft.components.utils,jaspersoft.components.State);