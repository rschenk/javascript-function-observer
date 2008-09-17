/* 
  Function observation framework by Ryan Schenk, 2008
  rschenk@gmail.com
*/

Function.prototype.observe_with = function(observer) {
  var options = { execute_method: true }; Object.extend(options, arguments[1] || {});
  var __original_method__ = this;  
  var observed_function = function(){
    var observer_return = observer();
    if(options.execute_method){ return __original_method__.apply(this, arguments); } else { return observer_return; }
  };
  observed_function.__observed = this; // store the function definition as an attribute of that function, so we can revert the observer
  return observed_function;
}

Function.prototype.popObserver = function() {
  return this.__observed || this;
}

Function.prototype.unObserve = function() {
  var m = this;
  while(m.__observed){ m = m.popObserver(); }
  return m;
}