var index = 0;    //�ؼ����б�������
var count = 0;    //�ؼ����б�����
var status =false;
var v = null;
function setText(x,obj){
	$(obj).val(x);
	if($("#searchLayer").length > 0 ){ $("#searchLayer").remove(); }
	
}
function reSearch(obj){
    if($(obj).val() != ""){                       //����û�¼��Ĺؼ��ֲ�Ϊ��
      $.get("index.php?q="+encodeURI($.trim($(obj).val()), "utf-8"),function(data){
                                                          //ͨ��jQuery�����������GET����
            if($.trim(data) == ""){                       //�����������Ϊ�գ������������б��
				 $("#searchLayer").remove();
            }else{
				var json = eval("("+data+")");
				v = obj;
				var html = '';
				for(var i=0;i< json.length;i++) {
					html +='<div id="listItem_' + i + '" style="height:30px; clear:both; background-color:#FFFFFF; cursor:pointer;padding:0 20px;" onmouseover="this.style.backgroundColor=\'#1E9AE0\';this.style.color=\'#fff\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';this.style.color=\'#000\';" onclick="setText(\'' +json[i].app_title + '\',v); window.location.href=\'index.php?tpl=search&q=\'+$(v).val();">';;
					html +='    <li  style="width:100%; height:30px; line-height:30px; text-align:left; float:left;"><span id="listItem_li_' + i + '" style="text-align:left; float:left;display:inline-block; overflow:hidden; width:'+ parseInt((v.width- 42)/2,10)  +'px;height:30px;">' + json[i].app_title + '</span><span style="text-align:right; float:right;display:inline-block;height:30px;  overflow:hidden; width:'+ parseInt((v.width- 42)/2,10)  +'px;">' + json[i].app_down + '</span></li>';
					html +='</div>'; 
				}
				//ɾ���Ѵ��ڵ�DIV
				if($("#searchLayer").length >= 0) {
					$("#searchLayer").remove();
				} 
				//������DIV
				CreateDiv(obj);
				$("#searchLayer").html(html);             //����������ݲ�Ϊ������ʾ�����б�
				moveOutHide();
            	count = parseInt(json.length);   //��ȡ�б��йؼ��ָ���
            }
        });
    }
}
function moveOutHide(){
	if($("#searchLayer").length>0){
		$("#searchLayer").bind('mouseleave',function(){
			$(this).remove();

		});
	}
}
function CPos(x, y){
    this.x = x;
    this.y = y;
}
//��̬����div
function CreateDiv(obj) {
	//��ȡ��ǰ���󸸽ڵ�
	var p = obj.parentNode;
	p.style.position = "relative";
	p.style.zIndex="9999";
	var target = obj;
    var pos = new CPos(target.offsetLeft, target.offsetTop);
    var target = target.offsetParent;
    while (target) {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent
    }
	
	var box = document.createElement("div");
	box.style.backgroundColor = "#FBFCFC";
	box.style.position="absolute";
	box.style.display = "block";
	box.style.left = "0";
	box.style.border="1px solid #ccc";
	box.style.borderWidth="0 1px 1px 1px";
    box.style.top= obj.clientHeight+3+"px";
    box.style.width=obj.offsetWidth - 2 +"px" ;
	box.id = "searchLayer";
	if(obj.style.marginLeft != null && obj.style.marginLeft != ""){
		box.style.marginLeft = obj.style.marginLeft;
	}
    p.appendChild(box);
	return box;
}
/*
function search_skip(obj){
	CreateDiv(obj);
	moveOutHide();
}*/
//������Ϊ���������ʾ15�����Ѵ�
function show_hot(obj){
	if($("#searchLayer").length <= 0) {
		CreateDiv(obj);
	}
	if($.trim($(obj).val()) == '') {
	    var q = $.trim($(obj).val());
		$.get("index.php?act=hot",{q:q},function(data){
			var json = eval("("+data+")");
			var html = "";
			v = obj;
			
			for (var i=0;i<json.length;i++){
				html +='<div id="listItem_' + i + '" style="height:30px; clear:both; background-color:#FFFFFF; cursor:pointer;padding:0 20px;" onmouseover="this.style.backgroundColor=\'#1E9AE0\';this.style.color=\'#fff\';" onmouseout="this.style.backgroundColor=\'#FFFFFF\';this.style.color=\'#000\';" onclick="setText(\'' + json[i]['q'] + '\',v); window.location.href=\'index.php?tpl=search&q=\'+$(v).val();">';
				html +='    <li  style="width:100%; height:30px; line-height:30px; text-align:left; float:left;"><span id="listItem_li_' + i + '" style="text-align:left; float:left; display:inline-block; overflow:hidden; width:'+ parseInt((v.width- 42)/2,10)  +'px;height:30px;">' + json[i]['q'] +'</span><span style="text-align:right; float:right;display:inline-block; overflow:hidden; height:30px; width:'+ parseInt((v.width- 42)/2,10)  +'px;">'+ json[i]['qnum'] +'</span></li>';
				html += '</div>';
			}
			$("#searchLayer").html(html);
			$("#searchLayer").mouseleave(function(){
				$("#searchLayer").remove();
			});
		});
	}
}

//�ı�����������
function search_up(obj,e){
		var evt = e || window.event; 
		//13�س���  40���¼�  38���ϼ�
		if (evt.keyCode == 40 || evt.keyCode == 38) return false;
		if	(evt.keyCode == 13) {
			$("#searchLayer").remove();
			do_search();
		}
			index = 0; 
			$("#searchLayer").remove();
			v = obj;
			
			if ($(obj).val() == '' || $.trim($(obj).val()) == '') {
				$("#searchLayer").remove();
				return false;
			} else {
				setTimeout("reSearch(v)", 150);//����ÿ��150�������һ��reSearch()����	
			}			
}
//�����¼�ѡ��
function search_down(obj,e){
		var e = e || window.event; 
		var keycode = e.keyCode;                   //��ȡ�û�¼���ַ���ASCII
		if(keycode == 40){                        //����û������·����
			if (status && index == 0) {
				index++; 
			}
			//���ĵ�ǰ��ѡ��ı���ɫ
			//���ĵ�ǰ��ѡ���ǰ��ɫ
			$("#listItem_"+index).css({ color: "#fff", background: "#1E9AE0" });
			$(obj).val($.trim($("#listItem_li_"+index).html())); //����ǰ��ѡ����ʾ���ı�����
			if(index >0){                   
				$("#listItem_"+parseInt(index-1)).css("background", "#fff");//���ĵ�ǰ��ǰһ��ı���ɫ
				$("#listItem_"+parseInt(index-1)).css("color", "#333333");//���ĵ�ǰ��ǰһ���ǰ��ɫ
				status = true;
			} 
			if(index < count-1){//�����ǰ����С���ܹؼ�������1
				index++;       //��������1
			}
		}else if(keycode == 38){//����û������Ϸ����	
			if(index < count){
				$("#listItem_"+parseInt(index)).css("background", "#fff");//���ĵ�ǰ��ǰһ���ǰ��ɫ
				$("#listItem_"+parseInt(index)).css("color", "#333333"); //���ĵ�ǰ��ǰһ���ǰ��ɫ
			} 
			if(index > 0){//�����ǰ����С���ܹؼ�������1
				index--; //��������1
			}
			$(obj).val($.trim($("#listItem_li_"+index).html())); //����ǰ��ѡ����ʾ���ı�����
			$("#listItem_"+parseInt(index)).css({ color: "#fff"});
			$("#listItem_"+parseInt(index)).css("background", "#1E9AE0");	
		}

}





