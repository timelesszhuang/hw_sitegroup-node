<?php

function get_real_ip() {
    $ip = false;
    if (!empty($_SERVER["HTTP_CLIENT_IP"])) {
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
        if ($ip) {
            array_unshift($ips, $ip);
            $ip = FALSE;
        }
        for ($i = 0; $i < count($ips); $i++) {
            if (!eregi("^(10|172\.16|192\.168)\.", $ips[$i])) {
                $ip = $ips[$i];
                break;
            }
        }
    }
    return ($ip ? $ip : $_SERVER['REMOTE_ADDR']);
}

//随即展现公司的联系方式
function get_seophone(){
    $conn=mysql_connect('rdsfjnifbfjnifbo.mysql.rds.aliyuncs.com','salesmen','qiangbi123') or die("error connecting") ; //连接数据
    mysql_query("set names 'utf8'"); 
    mysql_select_db('salesmenbeta2'); 
    $sql ="select user_id_str from sm_comparision where id=8"; //SQL语句
    $result = mysql_query($sql,$conn); //查询
    while($row = mysql_fetch_array($result))
    {
        $user_id_str=$row['user_id_str'];
    }
    if($user_id_str){
        $user_id_arr=explode(',', $user_id_str);
    }
    $user_id=$user_id_arr[array_rand($user_id_arr,1)];
    if(!$user_id){
        return '';
    }
    $get_phone_sql='select pri_mobilenum from sm_user_info where user_id='.$user_id;
    $result = mysql_query($get_phone_sql,$conn); //查询
    while($row = mysql_fetch_array($result))
    {
        return $row['pri_mobilenum'];
    }
    return '';
}



//根据ip 获取区域信息
function get_region_by_ip($ip){
        $curl = curl_init(); //这是curl的handle
        //下面是设置curl参数
        $url = "http://ip.taobao.com/service/getIpInfo.php?ip=$ip";
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 2);
        curl_setopt($curl, CURLOPT_HEADER, 0); //don't show header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //相当关键，这句话是让curl_exec($ch)返回的结果可以进行赋值给其他的变量进行，json的数据操作，如果没有这句话，则curl返回的数据不可以进行人为的去操作（如json_decode等格式操作）
        curl_setopt($curl, CURLOPT_TIMEOUT, 2);
        //这个就是超时时间了
        $data = curl_exec($curl);
        return json_decode($data, true);
}


//获取客户的 搜索引擎来源  //表示不是第一次进入这个页面 dier
//从搜索引擎第一次进入的时候分析数据参数第二次的时候传递已经分析好的数据
//搜索引擎
$search_engine = '';
//关键词
$s_val = '';
//ip
$ip = '';
//关键词
$key_word = '';
//地域
$pos = '';
if (!array_key_exists("search_engine", $_GET)) {
    if (array_key_exists('B', $_GET)) {
        $search_engine = 'baidu';
        $s_val = $_GET['B'];
    } else if (array_key_exists('h', $_GET)) {
        $search_engine = 'haosou';
        $s_val = $_GET['h'];
    } else if (array_key_exists('sg', $_GET)) {
        $search_engine = 'sougou';
        $s_val = $_GET['sg'];
    } else if (array_key_exists('Y', $_GET)) {
        $search_engine = 'youdao';
        $s_val = $_GET['y'];
    } else if (array_key_exists('G', $_GET)) {
        $search_engine = 'google';
        $s_val = $_GET['g'];
    }
    //地域信息
    if (array_key_exists("k", $_GET)) {
        $key_word = $_GET['k'];
    }
    //如果get 没有获取到的则表示来自直接输入   这个参数是什么
    //这个是获取数据查询来源
    if (array_key_exists('HTTP_REFERER', $_SERVER)) {
        $query_string = $_SERVER['HTTP_REFERER'];
    }
    if (empty($query_string)) {
        $query_string = 'input';
    }
    // $pos='qiangbi';
    // //第一次 进来 获取下 ip的地址
    // $ip = get_real_ip();
    // $region_info=get_region_by_ip($ip);
    // if(array_key_exists('code', $region_info)){
    //     if($region_info['code']==0){
    //         switch ($region_info['data']['region']) {
    //             case '河南省':
    //             case '山西省':
    //             case '陕西省':
    //             case '安徽省':
    //             case '湖北省':
    //             $pos = 'shengtu';
    //             break;
    //             case '河北省':
    //             case '北京市':
    //             case '黑龙江省':
    //             case '吉林省':
    //             case '辽宁省':
    //             case '天津市':
    //             case '内蒙古自治区':
    //             $pos = 'yizhixin';
    //             break;
    //             default:
    //             $pos = 'qiangbi';
    //         }
    //     }
    // }
    $query_string = urlencode($query_string);
    $key_word = urlencode($key_word);
    $search_engine = urlencode($search_engine);
    $s_val = urlencode($s_val);
    $ip = urlencode($ip);
} else {
    $query_string = urlencode($_GET['query_string']);
    $key_word = urlencode($_GET['key_word']);
    $search_engine = urlencode($_GET['search_engine']);
    $s_val = urlencode($_GET['s_val']);
    $ip = urlencode($_GET['ip']);
}

//表示是谁推广的
if(array_key_exists('s', $_GET)){
    $s=$_GET['s'];
}else{
    $s= 0;
}
$phone='';
if($pos=='qiangbi'||$pos=='yizhixin'){
    $phone = get_seophone();
}
$get_string = "?query_string=$query_string&key_word=$key_word&search_engine=$search_engine&s_val=$s_val&ip=$ip&pos=$pos&s=$s";
?>
