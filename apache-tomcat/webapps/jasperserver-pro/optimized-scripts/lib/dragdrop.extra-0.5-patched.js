Draggable.prototype.startDrag=function(t){if(Draggable.isDragging=!0,this.dragging=!0,this.delta||(this.delta=this.currentDelta()),this.options.zindex&&(this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0),this.element.style.zIndex=this.options.zindex),this.options.ghosting&&(this._clone=this.element.cloneNode(!0),this._originallyAbsolute="absolute"==this.element.getStyle("position"),this._originallyAbsolute||Position.absolutize(this.element),this.element.parentNode.insertBefore(this._clone,this.element),"TR"===this.element.parentNode.tagName&&document.body.appendChild(this.element)),this.options.superghosting){Position.prepare();var e=[Event.pointerX(t),Event.pointerY(t)],i=document.getElementsByTagName("body")[0],s=this.element;this._clone=s.cloneNode(!0),Prototype.Browser.IE&&(this._clone.clearAttributes(),this._clone.mergeAttributes(s.cloneNode(!1))),s.parentNode.insertBefore(this._clone,s),s.id="clone_"+s.id,s.hide(),Position.absolutize(s),s.parentNode.removeChild(s),i.appendChild(s),("0px"==s.style.width||"0px"==s.style.height)&&(s.style.width=Element.getWidth(this._clone)+"px",s.style.height=Element.getHeight(this._clone)+"px"),this.originalScrollTop=Element.getHeight(this._clone)/2,this.draw(e),s.show()}if(this.options.scroll)if(this.options.scroll==window){var o=this._getWindowScroll(this.options.scroll);this.originalScrollLeft=o.left,this.originalScrollTop=o.top}else this.originalScrollLeft=this.options.scroll.scrollLeft,this.originalScrollTop=this.options.scroll.scrollTop;Draggables.notify("onStart",this,t),this.options.starteffect&&this.options.starteffect(this.element)},Draggable.prototype.draw=function(t){var e=Position.cumulativeOffset(this.element);if(this.options.ghosting){var i=Position.realOffset(this.element);e[0]+=i[0]-Position.deltaX,e[1]+=i[1]-Position.deltaY}var s=this.currentDelta();e[0]-=s[0],e[1]-=s[1],this.options.scroll&&(e[0]-=this.options.scroll.scrollLeft,e[1]-=this.options.scroll.scrollTop),this.options.scroll&&this.options.scroll!=window&&this._isScrollChild&&(e[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft,e[1]-=this.options.scroll.scrollTop-this.originalScrollTop);var o=[0,1].map(function(i){return t[i]-e[i]-(this.options.mouseOffset?-2:this.offset[i])}.bind(this));this.options.snap&&(o=Object.isFunction(this.options.snap)?this.options.snap(o[0],o[1],this):o.map(Object.isArray(this.options.snap)?function(t,e){return(t/this.options.snap[e]).round()*this.options.snap[e]}.bind(this):function(t){return(t/this.options.snap).round()*this.options.snap}.bind(this))),this.options.superghosting&&("absolute"==this.element.getStyle("position")?o[1]=t[1]-this.originalScrollTop:o[1]-=this.originalScrollTop||10);var n=this.element.style;this.options.constraint&&"horizontal"!=this.options.constraint||(n.left=o[0]+"px"),this.options.constraint&&"vertical"!=this.options.constraint||(n.top=o[1]+"px"),"hidden"==n.visibility&&(n.visibility="")},Draggable.prototype.initDrag=function(t){if((Object.isUndefined(Draggable._dragging[this.element])||!Draggable._dragging[this.element])&&(t.touches&&1==t.touches.length||Event.isLeftClick(t))){var e=Event.element(t),i=e.tagName.toUpperCase();if("INPUT"==i||"SELECT"==i||"OPTION"==i||"BUTTON"==i||"TEXTAREA"==i)return;if(jQuery(this.element).parents("#sortDialog").length>0&&"B"==i)return;var s=[Event.pointerX(t),Event.pointerY(t)],o=Position.cumulativeOffset(this.element);this.offset=[0,1].map(function(t){return s[t]-o[t]}),Draggables.activate(this),this.countdown=Draggables.DEFAULT_TOLERANCE,Event.stop(t),this.element.fire("drag:mousedown",{targetEvent:t})}},Droppables.isAffected=function(t,e,i){var s=jQuery(i.element),o=s.width(),n=s.height(),l=s.offset(),r={left:l.left+o,top:l.top+n},a=t[0]>l.left&&t[0]<r.left&&t[1]>l.top&&t[1]<r.top;return i.element!=e&&(e.parentNode===$(document.body)||!i._containers||this.isContained(e,i))&&(!i.accept||Element.classNames(e).detect(function(t){return i.accept.include(t)}))&&a},Draggable.prototype.finishDrag=function(t,e){if(Draggable.isDragging=!1,this.dragging=!1,isIE()&&(document.body.onmousemove=function(){}),this.options.quiet){Position.prepare();var i=[Event.pointerX(t),Event.pointerY(t)];Droppables.show(i,this.element)}this.options.ghosting&&(this._originallyAbsolute||(Position.relativize(this.element),"TR"===this._clone.parentNode.tagName&&this._clone.parentNode.insertBefore(this.element,this._clone)),delete this._originallyAbsolute,Element.remove(this._clone),this._clone=null);var s=!1;e&&(s=Droppables.fire(t,this.element),s||(s=!1)),s&&this.options.onDropped&&this.options.onDropped(this.element),Draggables.notify("onEnd",this,t);var o=this.options.revert;o&&Object.isFunction(o)&&(o=o(this.element));var n=this.currentDelta();o&&this.options.reverteffect?(0==s||"failure"!=o)&&this.options.reverteffect(this.element,n[1]-this.delta[1],n[0]-this.delta[0]):this.delta=n,this.options.zindex&&(this.element.style.zIndex=this.originalZ,this._clone&&(this._clone.style.zIndex=this.originalZ)),this.options.endeffect&&this.options.endeffect(this.element),this.options.superghosting&&(null==this.element.parentNode&&(Element.hide(this.element),$(document.body).appendChild(this.element)),Element.remove(this.element),new Draggable(this._clone,this.options)),Draggables.deactivate(this),Droppables.reset()},Sortable.defaultOnHover=Sortable.onHover,Sortable.onHover=function(t,e,i){t.hasClassName("dialog")||Sortable.defaultOnHover(t,e,i)},Sortable.defaultOnEmptyHover=Sortable.onEmptyHover,Sortable.onEmptyHover=function(t,e,i){t.hasClassName("dialog")||Sortable.defaultOnEmptyHover(t,e,i)};var SortableObserver=Class.create({initialize:function(t,e){this.element=$(t),this.observer=e,this.lastValue=Sortable.serialize(this.element)},onStart:function(){this.lastValue=Sortable.serialize(this.element)},onEnd:function(t,e){Sortable.unmark(),this.lastValue!=Sortable.serialize(this.element)&&this.observer(this.element,e)}});Droppables.show=function(t,e){if(this.drops.length){var i,s=[];this.drops.each(function(i){Droppables.isAffected(t,e,i)&&(e.hasClassName("sortDialogAvailable")||e.hasClassName("sortDialogSortFields")?("sortDialogAvailable"==i.element.id||"sortDialogSortFields"==i.element.id)&&s.push(i):s.push(i))}),s.length>0&&(i=Droppables.findDeepestChild(s)),this.last_active&&this.last_active!=i&&this.deactivate(this.last_active),i&&(Position.within(i.element,t[0],t[1]),i.onHover&&(e.classNames().include("wrap")&&(e.relativize(),e.classNames().set(e.classNames().include("measure")?"draggable dragging measure"+(e.classNames().include("supportsFilter")?" supportsFilter":""):"draggable dragging dimension"+(e.classNames().include("supportsFilter")?" supportsFilter":"")),e.style.position="relative",e.style.display="inline-block",e.style.width="",e.style.height=""),i.onHover(e,i.element,Position.overlap(i.overlap,i.element))),i!=this.last_active&&Droppables.activate(i))}};