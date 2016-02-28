(function(){

// tab panel
var tabPanel = function(el){
  var targetId = el.find("a").attr('href');
  return $(targetId);
};

$.fn.tabs = function(){
    $.each(this, function(i, ul){
       var $ul = $([ul]);
       $.each($ul.children(), function(i, li){
           var $li = $([li]);
           if(i===0){
               // set active
               // hide tab
           }
           else {
               // hide tab
               var $div = tabPanel($li);
               $div.hide();
           }
       });
        
    });
};
})();