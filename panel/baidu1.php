<?php
/**
 * AppCMS Copyright (c) 2012-2013  
 * AppCMS is a free open source mobile phone APP application download website content management system.
 * Custom development, production BUG report template, please contact loyjers@qq.com
 * Author: chenpeng
 * Editor: chenpeng
 */

/**
 * * 加载核心文件类和公用方法函数*
 */
require_once(dirname(__FILE__) . "/../core/init.php");

$time_start = helper :: getmicrotime(); //开始时间

$dbm = new db_mysql(); //数据库类实例
$c = new common($dbm);

$page['get'] = $_GET; //get参数的 m 和 ajax 参数是默认占用的，一个用来执行动作函数，一个用来判断是否启用模板还是直接输出JSON格式数据
$page['post'] = $_POST;

check_admin(); //判断用户是否登录
/**
 * 页面动作 model 分支选择  
 *            动作函数写在文件末尾，全部以前缀 m__ 开头
 */
$page['get']['m'] = isset($_GET['m'])?$_GET['m']:'list';

if (function_exists("m__" . $page['get']['m'])) {
    call_user_func("m__" . $page['get']['m']);
} 
$time_end = helper :: getmicrotime(); //主程序执行时间，如果要包含模板的输出时间，则可以调用该静态时间方法单独计算
$page['data_fill_time'] = $time_end - $time_start;

/**
 * 模板载入选择
 *            模板页面为PHP+HTML混合编写，如果模板页面中也有区块函数，模板函数以 tpl__ 为前缀
 */
if (!isset($page['get']['ajax']) || $page['get']['ajax'] == null || $page['get']['ajax'] == '') {
    $tpl_filename=str_replace('\\', '', str_replace(dirname(__FILE__), '', __FILE__));
    $tpl_filename=str_replace('/','',$tpl_filename);
    require(dirname(__FILE__) . '/templates/tpl_' . $tpl_filename);
} else {
    if ($page['get']['ajax'] == 'json') {
        echo json_encode($page);
    } 
} 

/**
 * 页面动作函数和其他函数
 */
 function m__list()
 {
 }
// 数据入库
function m__submit() {
    global $dbm, $page, $c;
    $message = array();
	$app_ids=$page['post']['app_ids'];
	$message=explode(',',$app_ids);
	$app_urls=array();
	for ($i = 0; $i < count($message); $i++) {
		$app_result = $dbm->query("select app_id,rewrite_tag from " . TB_PREFIX ."_app_list where app_id=".$message[$i]);
		//if (isset($app_result['list'][0]['rewrite_tag']))
		$app_urls[$i]=SITE_URL.$c->url->encode('content_app', array('host' => SITE_PATH, 'id' => $message[$i], 'rewrite_tag' => @$app_result['list'][0]['rewrite_tag']));
	}
	//die(json_encode($app_urls));
	$result=$c->postbaidu($app_urls);
    die($result);
}
?>