define(["require","dashboard/Sandbox","underscore"],function(e){var n=e("dashboard/Sandbox"),r=e("underscore");return{get:r.memoize(function(e){return e?new n:null})}});