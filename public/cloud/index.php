<?php require 'common.php'?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--    <script type="text/javascript" src='http://commonjs.salesman.cc/common.js'></script>-->
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
<title>企业上云</title>
<link href="css/home.css" rel="stylesheet" type="text/css" />
</head>

<body>
	<div class="ttop_pc"><img src="images/ttop_bg.jpg"></div>
    
    <div class="ttop_sj"><img src="images/ttop_bg02.jpg"></div>
    
    
<div class="hdbd">
<div class="hdbdnr">
<div class="shenqing">
        	<h1>亲爱的用户，请填写以下信息参加活动</h1>
             <form id="theform_bottom" name="theform_bottom">
            <input type="hidden" name="shuaidan_type" value="5">
            <div>
                <label>公司名称：</label>
                <input type="text" name="company" id="company" placeholder="请输入公司名称">
                
            </div>
            <div>
                <label>联系电话：</label>
                <input type="text" name="phone" id="userphoneSales"placeholder="请输入联系电话">
           
            </div>
            <div>
                <label>职位：</label>
                <input type="text"name="job" id="userNameSales"placeholder="请输入职位">
            
            </div>
            <div class="you_xq">
                <label>你的需求：</label>
                <select id="email" name="shuaidan_type_name">
                    <option value="云服务器">云服务器</option>
                    <option value="有道云协作">有道云协作</option>
                    <option value="企业云邮箱" selected>企业云邮箱</option>
                    <option value="云营销系统">云营销系统</option>
                    <option value="视频云">视频云</option>
                    <option value="通讯云">通讯云</option>
                </select>
            
            </div>
            <div>
                <label>其他需求：</label>
<!--                <textarea -->
                <textarea class="xuqiu"name="otherdemand" placeholder="请输入其他需求" ></textarea>

                <input type="hidden"  value="<?php echo $ip; ?>" name="ip"/>
                <input type="hidden"  value="<?php echo $query_string; ?>" name="query_string"/>
                <!--这个参数是从搜索引擎中来-->
                <input type="hidden" value="<?php echo $key_word; ?>" name="key_word"/>
                <!--搜索引擎-->
                <input type="hidden" value="<?php echo $search_engine; ?>" name="search_engine"/>
                <!--搜索引擎传递过来的地域信息-->
                <input type="hidden" value="<?php echo $s_val; ?>" name="s_val"/>
                <!--表示是谁的客户 表示salesmen 中的 职员的id-->
                <input type="hidden" value="<?php echo $s?>" name="s">
            </div>
              <input class="btn" name="submit_bottom" type="button" id="submit_bottom" value="马上参加" style="display:block; margin:0 auto">
              <h2>* 我们会在24小时以内进行回访，谢谢合作 * <br /> 咨询电话：<font style="color:#e60012;">4006-360-163</font></h2>
    </form></div>
</div>
</div>
    <script>
        $(function () {
            $('#submit_bottom').click(function () {
                var data = $('#theform_bottom').serialize();
                var url = 'http://salesman.cc/index.php/Shuaidan_ceshi/Cloud/index';
//                $('#theform_bottom')[0].reset();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    //因为如果是异步执行的话  没有返回就执行return 了 但是同步的话还是会有问题的 比如长时间没有相应的话会阻塞
                    async: true,
                    url: url,
                    data: data,
                    success: function (data) {
                        alert(data.msg);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('尊敬的用户，我们已经收到您的请求，稍后会有专属客服为您服务。');
                    }
                });
            });
            //--------
            $('#submit_bottoms').click(function () {
                var data = $('#theform_bottoms').serialize();
                var url = 'http://salesman.cc/index.php/Shuaidan_ceshi/Cloud/index';
                $('#theform_bottoms')[0].reset();
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    //因为如果是异步执行的话  没有返回就执行return 了 但是同步的话还是会有问题的 比如长时间没有相应的话会阻塞
                    async: true,
                    url: url,
                    data: data,
                    success: function (data) {
                        alert(data.msg);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('尊敬的用户，我们已经收到您的请求，稍后会有专属客服为您服务。');
                    }
                });
            });
        })

    </script>


<div class="two_box">
	<div class="two">
    	<div class="title_box"><div class="title">企业上云<font style="color:#0883d2; font-size:24px; font-weight:bold;">势在必行</font></div></div>
               为深入推进“智慧泉城”建设，加快新旧动能接续转换，<font style="color:#0883d2;">推动“互联网+”向“云+”时代迈进，</font>提升新型智慧城市建设水平，结合落实《〈中国制造2025〉济
               南行动计划》(济政发〔2016〕4号)，制定本行动计划。<br />
       <font style="color:#0883d2;">推动“企业上云”是抢抓大数据、云计算带来的重大发展机遇，推动“互联网+”向“云+”迈进，培育企业发展新动能，加快产业转型升级的重要途径，也是落实市委市政府加快建设济南新旧动能转换先行区的重大举措。</font>坚持创新
       、协调、绿色、开放、共享发展理念，紧紧围绕“打造四个中心，建设现代泉城”中心任务和我市信息化发展实际状况，全面把握信息化发展大趋势，发挥省会优势，担当省会使命，以云计算技术和平台为支撑，以云计算产业链
       合作和生态体系建设为途径，以构建云计算应用服务体系为保障，<font style="color:#0883d2;">加快推动“企业上云”，着力培育企业发展新动能，</font>不断提升企业竞争力，努力将我市率先建成全国云计算应用标杆市和新型智慧城市试点市，打造“企业上云”新
       旧动能转换示范区。<font style="color:#0883d2;">重构企业核心竞争力，释放企业更大价值链。</font>
    </div>
</div>

<div class="three">
	<div class="title_box"><div class="title">企业上云<font style="color:#0883d2; font-size:24px; font-weight:bold;">服务内容</font></div></div>
    <div class="three_img"><img src="images/three.png"></div>
    <div class="three_column">
    	<div class="three_col"><img src="images/three01.png"></div>
        <div class="three_col"><img src="images/three02.png"></div>
        <div class="three_col"><img src="images/three03.png"></div>
        <div class="three_col"><img src="images/three04.png"></div>
        <div class="three_col"><img src="images/three05.png"></div>
        <div class="three_col"><img src="images/three06.png"></div>
        <div class="three_col"><img src="images/three07.png"></div>
    </div>
</div>

<div class="four_box">
<div class="four">
	<div class="title_box"><div class="title">企业上云<font style="color:#0883d2; font-size:24px; font-weight:bold;">授权服务商</font></div></div>
    <div class="four_col"><img src="images/four01.png"></div>
    <div class="four_col"><img src="images/four02.png"></div>
    <div class="four_col"><img src="images/four03.png"></div>
    <div class="four_col"><img src="images/four04.png"></div>
</div>
</div>
<div class="five">
	<div class="title_box"><div class="title">强比科技<font style="color:#0883d2; font-size:24px; font-weight:bold;">云服务</font>专业提供商</div></div>
    山东强比信息技术有限公司，致力于企业云产品服务十余年，积累了丰富的企业云产品服务经验，作为企业上云计划综合授权服务商，将秉承“上云一家，成功一家”的原则，服务于企业的信息化
    建设全面上云工作，为企业创造效率最大化的内外管理云服务。
</div>
<div class="six">
	<div class="title_box"><div class="title">重构企业核心<font style="color:#0883d2; font-size:24px; font-weight:bold;">竞争力</font>，
    释放企业更大<font style="color:#0883d2; font-size:24px; font-weight:bold;">价值链</font></div></div>
    <div class="six_col">
    	<div class="six_bt">济南企业上云计划</div>
        <div class="six_nr">工业企业、科技企业、物流企业、服务业企业上云、农业企业上云、建筑业企业上云、个体工商户。
企业上云之后更安全，服务器集群化管理，保证数据安全不丢失。更稳定，更稳定的数据计算，存储服务和网络环境。更便捷，随时随地掌控管理，降低维护的复杂程度。
</div>
    </div>
    <div class="six_col">
    	<div class="six_bt">软件全面上云</div>
        <div class="six_nr">企业邮件，办公协同，会议系统，营销管理，IT资源，安全防护，人力资源管理，行政管理，财务管理，信息管理，研发设计，供应链，生产管理。
</div>
    </div>
</div>
<div class="seven_box">
	<div class="seven">注册立享10%-40%优惠返利</div>
</div>
<div class="footer_box">
<div class="footer">
	<div class="foot_left"><img src="images/di_img.png"></div>
    <div class="foot_right">
    	<div class="foot_tel">4006-360-163</div>
        <div class="foot_xj">公司地址：山东省济南市山大路47号数码港大厦C座810</div>
        <div class="foot_xj">企业邮箱：kf@cio.club</div>
    </div>	
</div>    
</div>
</body>
</html>
