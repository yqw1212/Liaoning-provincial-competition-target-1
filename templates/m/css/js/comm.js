//һ������ ����Ӧ��
window.onload = function(){
   var obj = getObj("nav-stair").getElementsByTagName('a');
   var aSize = obj.length;
   var aWidth = Math.floor(100/aSize);
   for(var i=0; i< aSize; i++){
       obj[i].style.width = aWidth + '%';
   }
}

//li�����������
function locaUrl(obj){
	window.location.href = obj.getAttribute('url');
}

//js���¼�
function bindEvent(obj, name, fn)
{
	if(obj.addEventListener){
		obj.addEventListener(name, fn);
	}else if(obj.attachEvent){
		obj.attachEvent(name, fn);
	}
}

//����ID�������л�
function tab_info(obj){
	var val = obj.substring(obj.indexOf('-') + 1);
	getObj(obj).className = 't-sel';
	var indexVla = val == 1 ? 2 : (val == 2 ? 1 : 1);
	getObj('item-'+indexVla).className = '';
	getObj('tab-'+ val +'').style.display ='block';
	getObj('tab-'+indexVla).style.display ='none';
}
//��ȡ����
function getObj(id){
	return document.getElementById(id);
}
