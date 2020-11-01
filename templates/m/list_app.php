<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<title><?php echo $c->categories[$cid]['cname'].'安卓应用下载 - '.SITE_NAME;?></title>
<link rel="stylesheet"  href="<?php echo SITE_PATH;?>templates/m/css/style.css"  type="text/css" />
<script type="text/javascript" src="<?php echo SITE_PATH;?>templates/m/css/js/comm.js"></script>
</head>
<body>
	<div class="box wrap">
		<!-- 头部内容 开始 -->
			<?php require_once ('inc_head.php');?>
		<!-- 头部内容 结束 -->
		<!-- 导航 开始 -->
			<?php
				$nav = "";
				$cates = $c->cate_father($cid);
				if(!(count($cates) == 1)){
					echo '<p class="line-t-10"></p><div class="box box-tit"><div>';
				foreach($cates as $k=>$n){
                 $nav .= '<a href="'.$n['surl'].'">'.$n['cname'];
				 if($k != (count($cates)-1)){$nav .='</a>&nbsp;»&nbsp';}
				}
				echo($nav);
				echo '</div></div>';
				}
			?>
		<!-- 导航 结束 -->
		<p class="line-t-10"></p>
		<div class="box wrap-content">
			<div class="box app-area">
				<ul class="app-list" id="app_url">
					<?php
					$a = $c->get_list(array('pagesize'=>PAGESIZE,'count'=>1,'cate_id'=>$cid,'rewrite'=>SITE_REWRITEURL,'p'=>$p));
					?>
					<?php if(!empty($a['list'])){foreach($a['list'] as $k=> $v){?>
					<li class="box"  url="<?php echo 'http://'.$_SERVER['HTTP_HOST'].$v['surl'];?>" onclick="locaUrl(this)">
						<a class="app-img" href="<?php echo $v['surl'];?>">
							<img src="<?php echo $v['app_logo'];?>" border="0">
						</a>
						<div class="app-info">
							<span class="app-name">
								<a href="<?php echo $v['surl'];?>" title="<?php echo $v['app_title'];?>"><?php echo $v['app_title'];?></a>
							</span>
							<span class="b-v">大小：<?php echo $v['app_size'];?> &nbsp;&nbsp; 版本：<?php echo $v['app_version'];?></span>
							<div class="l level"><span class="<?php echo "l".ceil($v['app_recomment']/2); ?>"></span></div>
						</div>
					</li>
					<?php } }else{ echo '<div class="h788"><span>没有找到数据</span></div>';}?>
				</ul>
			</div>
			<div class="pager">
				<?php if(!empty($a['list']))echo $a['pagebar']['pagecode']?>
			</div>
		</div>
		<!-- 底部内容 开始 -->
			<?php require_once ('inc_foot.php');?>
		<!-- 底部内容 结束 -->
	</div>
</body>
</html>