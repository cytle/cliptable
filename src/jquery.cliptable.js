/**
*	用于input获取Excel之类有格式的信息
*************************************************************
*	使用： $('.add_input').clipboard(clipboardParse);
*************************************************************
*	@param clipboardParse(clipboard){}: 粘贴框接受粘贴后执行的函数
*		clipboard:粘贴板(textarea)
*		
*************************************************************
*/
jQuery.fn.extend({ clipboard: function(clipboardParse,config){
  if(!config){
   config={};
 }
 this.bind("paste",function(){

  if(config['open']===false){
    return true;
  }
  var popover_id= $(this).attr('aria-describedby');
  $('#'+popover_id).find('.clipboard').focus(); 
  return false;

}).popover({
  html:true,
  title:'在此粘贴',
    delay: { "show": 50, "hide": 50 },   //delay.hide 重要，延迟消失，以使得hide.bs.popover能检查焦点是否在粘贴的textarea
    trigger:'focus',
    template:'<div class="popover" role="tooltip" ><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
    content:function(){
      var text=this;
      return $('<textarea class="clipboard"></textarea>').bind("paste",function(){
        var clipboard=this;
        setTimeout(function(){
          clipboardParse.apply(text,[clipboard]);
        },50);
      }).blur(function(){
        setTimeout(function(){
          if(!$(text).is(":focus"))  $(text).popover('hide'); //检查焦点是否在input
        },50);
      });
    }

  }).on('hide.bs.popover', function () {
    var popover_id= $(this).attr('aria-describedby');
    var clipboard= $('#'+popover_id).find('.clipboard'); //检查焦点是否在粘贴的textarea
    return ! clipboard.is(":focus");
  }).on('show.bs.popover',function(){
    return (config['open']!==false);
  });



  return this;
}});
/**
*	用于复制粘贴，Excel之类有格式的信息
*************************************************************
*	使用： $('#MyTable tbody').cliptable('.add_input');
*************************************************************
*	inputSelector: 绑定输入框的选择语句
*************************************************************
*/
jQuery.fn.extend({ cliptable: function(inputSelector,config){
  var ClipTable=this;
  ClipTable.find('> tr').each(function(row_n,tr){
    $(tr).find('> td').each(function(col_n,td){
      $(td).find(inputSelector).data({col:col_n,row:row_n})	//给每行每列标记行列数
    });
  });
  ClipTable.find(inputSelector).clipboard(function (clipboard) {
    var content=clipboard.value;
    console.log(content);
    content=content.replace(/[^ \.\d\t\n\r]| /g,'');
    console.log(content);
    if (content!=null) {

      var o_row=$(this).data('row');		//当前输入框行数
      var o_col=$(this).data('col');		//当前输入框列数
      var valArray = content.split("\n");
      var trs=ClipTable.find('> tr');
      var row_l=valArray.length<=1?valArray.length:valArray.length-1;
      for(var nRow=0;nRow < row_l;nRow++)
      {
        (function(nRow){ 
          var valArray1 = valArray[nRow].split("\t");

          var tds=trs.eq(nRow+o_row).find('> td');
          for(var nCol=0;nCol < valArray1.length;nCol++)
          {
            tds.eq(nCol+o_col).find(inputSelector).val(valArray1[nCol]);
          }                 
        })(nRow); 
      }
      $(clipboard).blur();
      $(this).popover('hide');
    }
  },config)



  return this;
}});


