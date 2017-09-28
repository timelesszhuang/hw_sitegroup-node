/**
 * 公共使用的文件
 */

/**
 * @returns
 */
function changeTheme(themeName) {
    var $theme = $('#theme');
    var url = $theme.attr('href');
    var href = url.substring(0, url.indexOf('css')) + 'css/bootstrap.min.' + themeName + '.css';
    $theme.attr('href', href);
    $.cookie('theme', themeName, {expires: 7});
}


/**
 * 分成两栏的 左边是 链接列表  右边是 显示位置的  ajax 获取数据
 */
function show_byleftlink(id, data) {
    var show_id = 'leftlink_' + id + '_show_div';
    var selecter = 'leftlink_' + id;
    $('#' + selecter + ' a').click(function () {
        var type = $(this).attr('type');
        var url = $(this).attr('r_href');
        $(this).siblings('a').removeClass('list-group-item-success');
        $(this).addClass('list-group-item-success');
        switch (type) {
            case 'dialog':
                //这个地方有问题   打开模态框 参数不足  有一些地方是
                var modal_id = $(this).attr('modal_id');
                open_modal(modal_id, url);
                break;
            case 'page':
                if (url) {
                    get_html_byajax(url, show_id, data);
                }
                break;
            case 'redirect_newwindow':
                //暂时没有使用到
                break;
        }
    });
    //默认选中的模拟点击打开页面
    $('#' + selecter + ' .list-group-item-success').trigger('click');
}


/**
 *   打开模态窗体  操作完成之后没有更新之类的操作
 *   @param {string} pre_modal_id 要打开的modal_id
 *   @param {string} link 链接
 *   @param {int} id 形参的形式
 *   @param {string} 获取到的数据展现到的div show_container_id
 */
function open_modal(pre_modal_id, link) {
    var modal_id = pre_modal_id + '_modal';
    var id = arguments[2] ? arguments[2] : '';
    var datagrid_id = arguments[3] ? arguments[3] : '';
    var show_container_id = arguments[4] ? arguments[4] : '';
    //ajax 获取的页面之后
    var modal_content_id = pre_modal_id + '_content';
    $('#' + modal_id).modal('show');
    //把modal_id存储处在页面的隐藏字段中 以后
    var data = new Array();
    data['modal_id'] = modal_id;
    if (id !== '') {
        data['id'] = id;
    }
    data['datagrid_id'] = datagrid_id;
    var datastring = form_ajax_data_byarray(data)
    var status = false;
    if (is_null_or_empty(show_container_id)) {
        status = get_html_byajax(link, modal_content_id, datastring);
    } else {
        status = get_html_byajax(link, show_container_id, datastring);
    }
    if (status) {
        //这个地方解决 kindeditor 弹出层输入框不能输入框体
        $('#' + modal_id).on('shown.bs.modal', function () {
            $(document).off('focusin.modal');
        });
//        $('#' + modal_id).modal('show');
    } else {
        alert('打开模态框失败。');
        $('#' + modal_id).modal('hide');
    }
}


/**
 *执行ajax 操作 获取 html
 *@param {string}  href  获取html 的链接
 *@param {string}  show_div_id获取道德html 展现到的地方
 *@param {array}   data 要传递的数据
 */
function get_html_byajax(href, show_div_id, data) {
    var status = false;
    var selecter = '#' + show_div_id;
    $.ajax({
        type: "POST",
        dataType: "html",
        //因为如果是异步执行的话  没有返回就执行return 了 但是同步的话还是会有问题的 比如长时间没有相应的话会阻塞
        async: false,
        url: href,
        data: data,
        beforeSend: function (xhr) {
            var img = "<div style='width:50%;margin:0px auto;'><img src='/Public/Home/image/load.gif' /></div>"
            $(selecter).html(img);
        },
        success: function (data) {
            $(selecter).html(data);
            status = true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            parse_ajax_errortype(jqXHR, textStatus, errorThrown);
        }
    });
    return status;
}

/**
 * 解析ajax error  信息
 */
function parse_ajax_errortype(jqXHR, textStatus, errorThrown) {
    alert(jqXHR.status);
}

/**
 * 获取浏览器可见窗体的宽度信息
 */
function get_browser_widthheightinfo() {
    var height = $(window).height();
    var width = $(window).width();
    var info = {"width": width, "height": height};
    return info;
}

/**
 * 打开窗体 操作完成之后更新 datagrid
 * @param {string} datagrid_id 要刷新的datagrid
 * @param {string} link 获取modal 框体内的内容
 * @param {string} pre_modal_id  标志  获取 1 要弹出的 modal_id  2 要存放数据的
 */
function add_record_modal(datagrid_id, link, pre_modal_id) {
    var modal_id = pre_modal_id + '_modal';
    var modal_content_id = pre_modal_id + '_content';
    //要把datagrid 数据存储处在页面的隐藏字段中
    var data = new Array();
    data['datagrid_id'] = datagrid_id;
    data['modal_id'] = modal_id;
    var datastring = form_ajax_data_byarray(data);
    var status = get_html_byajax(link, modal_content_id, datastring);
    if (status) {
        //这个地方解决 kindeditor 弹出层输入框不能输入框体
        $('#' + modal_id).on('shown.bs.modal', function () {
            $(document).off('focusin.modal');
        });
        $('#' + modal_id).modal('show');
    } else {
        alert('打开模态框失败。');
    }
}

/**
 * 职员录取实现展开 modal 模态框
 */
function employ_interview_modal(record_id, datagrid_id, link, pre_modal_id) {
    var modal_id = pre_modal_id + '_modal';
    var modal_content_id = pre_modal_id + '_content';
    //要把datagrid 数据存储处在页面的隐藏字段中
//    var data = [datagrid_id, modal_id, record_id];
    var data = new Array();
    data['datagrid_id'] = datagrid_id;
    data['modal_id'] = modal_id;
    data['id'] = record_id;
    var datadstring = form_ajax_data_byarray(data);
    var status = get_html_byajax(link, modal_content_id, datadstring);
    if (status) {
        $('#' + modal_id).modal('toggle');
    } else {
        alert('打开模态框失败。');
    }
}


/**
 * 删除单条记录
 */
function delete_single_record(id, link, datagrid_id) {
    $.messager.confirm("操作提示", "您确定要执行删除操作吗？", function (data) {
        if (data) {
            delete_record(id, link, datagrid_id);
        } else {
            return;
        }
    })
}
/**
 * 删除记录
 * @param {int} ids 要删除的数值  数组的形式或者是单个的id
 * @param {string} link 要执行删除操作的链接地址
 * @param {string} datagr_id 选择要删除的datagrid
 */
function delete_record(ids, link, datagrid_id) {
    if (ids == '') {
        $.messager.alert('信息提示', '请选择要操作的项', 'error');
        return false;
    }
    $.ajax({
        url: link,
        type: 'post',
        data: {
            id: ids,
        },
        dataType: 'json',
        success: function (data) {
            exec_complete(data, datagrid_id);
        }
    });
}

/**
 * 编辑记录信息根据id
 * @param {int} id 要编辑的记录的id
 * @param {string} link 要编辑的菜单的地址
 * @param {string} datagrid_id 编辑完成之后要刷新的datagrid
 * @param {string} pre_modal_id 编辑modal 要显示的位置
 */
function edit_record_modal(record_id, link, datagrid_id, pre_modal_id) {
    var modal_id = pre_modal_id + '_modal';
    var modal_content_id = pre_modal_id + '_content';
    $('#' + modal_id).modal('show');
    //要把datagrid 数据存储处在页面的隐藏字段中
    var data = new Array();
    data["datagrid_id"] = datagrid_id;
    data["modal_id"] = modal_id;
    data["id"] = record_id;
    var datastring = form_ajax_data_byarray(data);
    var status = get_html_byajax(link, modal_content_id, datastring);
    if (status) {
        //这个地方解决 kindeditor 弹出层输入框不能输入框体
        $('#' + modal_id).on('shown.bs.modal', function () {
            $(document).off('focusin.modal');
        });
//        $('#' + modal_id).modal('show');
    } else {
        alert('打开模态框失败。');
    }
}

/**
 * ajax 更新操作完成之后操作
 * @param {string} data 完成请求之后返回的信息
 * @param {string} datagrid_id  执行操作
 */
function exec_complete(data, datagrid_id) {
    if (data.status == 'success') {
        if (datagrid_id) {
            var flag = datagrid_id.indexOf('treegrid');
            if (flag !== -1) {
                $('#' + datagrid_id).treegrid('reload');
            } else {
                $('#' + datagrid_id).datagrid('reload');
            }
        }
        $.messager.show({
            title: data.title,
            msg: data.msg,
            timeout: 1000,
            showType: 'slide'
        });
    } else if (data.status == 'failed') {
        $.messager.alert(data.title, data.msg, 'error');
    }
}

/**
 * 打开新的客户的浏览器窗体
 */
function open_window(id, href) {
    //左右居中操作 宽度合适
    var iWidth = window.screen.availWidth - 100;
    var iHeight = window.screen.availHeight - 100;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;           //获得窗口的水平位置;
    var location = href + '?id=' + id;
    var win_name = 'cus_' + id;
    var win = window.open(location, win_name, 'height=' + iHeight + ',width=' + iWidth + ',top=0,left=' + iLeft + ', toolbar = no, menubar = no, scrollbars = yes, resizable = no, location = no, status = no');
    if (!win || (win.closed || !win.focus) || typeof (win.document) == 'unknown' || typeof (win.document) == 'undefined') {
        alert('您的请求被拦截，请永久允许弹出窗体');
    }
    win.focus();
}


/**
 * 打开地图的浏览器窗体
 */
function open_map_window(id, href) {
    //左右居中操作 宽度合适
    var iWidth = window.screen.availWidth - 100;
    var iHeight = window.screen.availHeight - 100;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;           //获得窗口的水平位置;
    var location = href + '?id=' + id;
    var win_name = 'map_' + id;
    var win = window.open(location, win_name, 'height=' + iHeight + ',width=' + iWidth + ',top=0,left=' + iLeft + ', toolbar = no, menubar = no, scrollbars = yes, resizable = no, location = no, status = no');
    if (!win || (win.closed || !win.focus) || typeof (win.document) == 'unknown' || typeof (win.document) == 'undefined') {
        alert('您的请求被拦截，请永久允许弹出窗体');
    }
    win.focus();
}

/**
 * 打开新的邮箱浏览器窗体
 */
function open_mail_window(location) {
    //左右居中操作 宽度合适
    var iWidth = window.screen.availWidth - 100;
    var iHeight = window.screen.availHeight - 100;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;           //获得窗口的水平位置;
    var win_name = 'mail_entry';
    var win = window.open(location, win_name, 'height=' + iHeight + ',width=' + iWidth + ',top=0,left=' + iLeft + ', toolbar = no, menubar = no, scrollbars = yes, resizable = no, location = no, status = no');
    if (!win || (win.closed || !win.focus) || typeof (win.document) == 'unknown' || typeof (win.document) == 'undefined') {
        alert('您的请求被拦截，请永久允许弹出窗体');
    }
    win.focus();
}


/**
 * 打开新的客户的浏览器窗体
 */
function open_bigdatastatistic_window(id, href) {
    //左右居中操作 宽度合适
    var iWidth = window.screen.availWidth - 100;
    var iHeight = window.screen.availHeight - 100;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;           //获得窗口的水平位置;
    var location = href + '?id=' + id;
    var win_name = 'cus_' + id;
    var win = window.open(location, win_name, 'height=' + iHeight + ',width=' + iWidth + ',top=0,left=' + iLeft + ', toolbar = no, menubar = no, scrollbars = yes, resizable = no, location = no, status = no');
    if (!win || (win.closed || !win.focus) || typeof (win.document) == 'unknown' || typeof (win.document) == 'undefined') {
        alert('您的请求被拦截，请永久允许弹出窗体');
    }
    win.focus();
}


/**
 *ajax 提交表单信息   数据是序列化的表单   或者是组装的数据   提交完成之后会 刷新datagrid treegrid等信息  失败之后会 重新展现页面
 *@param {string} action url提交的地方
 *@param {serialize} data 序列化之后的表单信息
 *@param {string} modal_id 正在操作的表单的modal_id
 *@param {string} datagrid  要刷新的datagrid  这个参数通过 arguments 参数获得
 */
function submit_form(action, data) {
    var modal_id = arguments[2] ? arguments[2] : '';
    var datagrid_id = arguments[3] ? arguments[3] : '';
    var open_cus_window_fag = arguments[4] ? arguments[4] : '';
    var open_window_href = arguments[5] ? arguments[5] : '';
    var cus_id = 0;
    $('#' + modal_id).modal('hide');
    //表单序列化的
    $.ajax({
        type: "POST",
        dataType: "json",
        //因为如果是异步执行的话  没有返回就执行return 了 但是同步的话还是会有问题的 比如长时间没有相应的话会阻塞
        async: false,
        url: action,
        data: data,
        success: function (data) {
            if (data.status == 'success') {
                //应当调用treegrid 还是 datagrid
                if (datagrid_id != '') {
                    var flag = datagrid_id.indexOf('treegrid');
                    if (flag !== -1) {
                        $('#' + datagrid_id).treegrid('reload');
                    } else {
                        $('#' + datagrid_id).datagrid('reload');
                    }
                }
                if (modal_id != '') {
                    $.messager.show({
                        title: data.title,
                        msg: data.msg,
                        timeout: 1000,
                        showType: 'slide'
                    });
                } else {
                    $.messager.alert(data.title, data.msg, 'info');
                }
                cus_id = data.id;
            } else if (data.status == 'failed') {
                if (modal_id != '') {
                    $.messager.alert(data.title, data.msg, 'error', function () {
                        $('#' + modal_id).modal('toggle');
                    });
                } else {
                    $.messager.alert(data.title, data.msg, 'error');
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            parse_ajax_errortype(jqXHR, textStatus, errorThrown);
        }
    });
    //打开客户视图
    if (!is_null_or_empty(cus_id) && open_cus_window_fag) {
        //是不是要打开客户视图窗体
        open_window(cus_id, open_window_href);
    }
}

/**
 *ajax 提交表单信息   数据是序列化的表单   或者是组装的数据   提交完成之后会有   刷新datagrid treegrid等信息 选择是不是要关闭 modal
 *@param {string} action url提交的地方
 *@param {serialize} data 序列化之后的表单信息
 *@param {string} modal_id 正在操作的表单的modal_id
 *@param {string} datagrid  要刷新的datagrid  这个参数通过 arguments 参数获得
 */
function submit_comfim_form(action, data) {
    var modal_id = arguments[2] ? arguments[2] : '';
    var datagrid_id = arguments[3] ? arguments[3] : '';
    //表单序列化的
    $.ajax({
        type: "POST",
        dataType: "json",
        //因为如果是异步执行的话  没有返回就执行return 了 但是同步的话还是会有问题的 比如长时间没有相应的话会阻塞
        async: false,
        url: action,
        data: data,
        success: function (data) {
            if (data.status == 'success') {
                //应当调用treegrid 还是 datagrid
                if (datagrid_id != '') {
                    var flag = datagrid_id.indexOf('treegrid');
                    if (flag !== -1) {
                        $('#' + datagrid_id).treegrid('reload');
                    } else {
                        $('#' + datagrid_id).datagrid('reload');
                    }
                }
                if (modal_id != '') {
                    confirm_closemodal(data, modal_id);
                } else {
                    $.messager.alert(data.title, data.msg, 'info');
                }
            } else if (data.status == 'failed') {
//                if (modal_id != '') {
                //出现问题之后的操作
//                    confirm_closemodal(data, modal_id);
//                } else {
                $.messager.alert(data.title, data.msg, 'error');
//                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            parse_ajax_errortype(jqXHR, textStatus, errorThrown);
        }
    });
}

/**
 * 确认是不是要关闭modal
 */
function confirm_closemodal(data, modal_id) {
    $.messager.confirm(data.title, data.msg, function (status) {
        if (status) {
            $('#' + modal_id).modal('toggle');
        }
    });
}

/**
 *根据关联的数组生成ajax 提交的数据
 *@param {array} data 一维关联数组
 */
function form_ajax_data_byarray(data) {
    var datastring = '';
    for (key in data) {
        val = data[key];
        if (datastring == '') {
            datastring = key + '=' + val;
        } else {
            datastring = datastring + '&' + key + '=' + val;
        }
    }
    return datastring;
}

/**
 * 某一个框体在加载数据的时候显示load。。。。
 * @param {string} show_div_id 要展示在的div 的id
 */
function load_info_gif(show_div_id) {
    var img = "__PUBLIC__/Home/image/load.gif";
    $('#' + show_div_id).html('<img src="' + img + '" tag="加载中">');
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var provinceData = {
    0: ['请选择'],
    '山东': ['济南', '滨州', '德州', '东营', '菏泽', '济宁', '莱芜', '聊城', '临沂', '青岛', '日照', '泰安', '潍坊', '威海', '烟台', '枣庄', '淄博'],
    '山西': ['太原', '长治', '大同', '候马', '晋城', '离石', '临汾', '宁武', '朔州', '忻州', '阳泉', '榆次', '运城'],
    '河南': ['郑州', '安阳', '鹤壁', '潢川', '焦作', '济源', '开封', '漯河', '洛阳', '南阳', '平顶山', '濮阳', '三门峡', '商丘', '新乡', '信阳', '许昌', '周口', '驻马店'],
    '北京': ['东城', '西城', '崇文', '宣武', '朝阳', '丰台', '石景山', '海淀', '门头沟', '房山', '通州', '顺义', '昌平', '大兴', '平谷', '怀柔', '密云', '延庆'],
    '重庆': ['万州', '涪陵', '渝中', '大渡口', '江北', '沙坪坝', '九龙坡', '南岸', '北碚', '万盛', '双挢', '渝北', '巴南', '黔江', '长寿', '綦江', '潼南', '铜梁', '大足', '荣昌', '壁山', '梁平', '城口', '丰都', '垫江', '武隆', '忠县', '开县', '云阳', '奉节', '巫山', '巫溪', '石柱', '秀山', '酉阳', '彭水', '江津', '合川', '永川', '南川'],
    '福建': ['福州', '福安', '龙岩', '南平', '宁德', '莆田', '泉州', '三明', '邵武', '石狮', '永安', '武夷山', '厦门', '漳州'],
    '甘肃': ['兰州', '白银', '定西', '敦煌', '甘南', '金昌', '酒泉', '临夏', '平凉', '天水', '武都', '武威', '西峰', '张掖'],
    '广东': ['广州', '潮阳', '潮州', '澄海', '东莞', '佛山', '河源', '惠州', ' 江门', '揭阳', '开平', '茂名', '梅州', '清远', '汕头', '汕尾', '韶关', '深圳', '顺德', '阳江', '英德', '云浮', '增城', '湛江', '肇庆', '中山', '珠海'],
    '广西': ['南宁', '百色', '北海', '桂林', '防城港', '河池', '贺州', '柳州', '钦州', '梧州', '玉林'],
    '贵州': ['贵阳', '安顺', '毕节', '都匀', '凯里', '六盘水', '铜仁', '兴义', '玉屏', '遵义'],
    '海南': ['海口', '儋县', '陵水', '琼海', '三亚', '通什', '万宁'],
    '河北': ['石家庄', '保定', '北戴河', '沧州', '承德', '丰润', '邯郸', '衡水', '廊坊', '南戴河', '秦皇岛', '唐山', '新城', '邢台', '张家口'],
    '黑龙江': ['哈尔滨', '北安', '大庆', '大兴安岭', '鹤岗', '黑河', '佳木斯', '鸡西', '牡丹江', '齐齐哈尔', '七台河', '双鸭山', '绥化', '伊春'],
    //  '香港' : ['香港','九龙','新界'],
    '安徽': ['合肥', '安庆', '蚌埠', '亳州', '巢湖', '滁州', '阜阳', '贵池', '淮北', '淮化', '淮南', '黄山', '九华山', '六安', '马鞍山', '宿州', '铜陵', '芜湖', '宣城'],
    '湖北': ['武汉', '恩施', '鄂州', '黄冈', '黄石', '荆门', '荆州', '潜江', '十堰', '随州', '武穴', '仙桃', '咸宁', '襄阳', '襄樊', '孝感', '宜昌'],
    '湖南': ['长沙', '常德', '郴州', '衡阳', '怀化', '吉首', '娄底', '邵阳', '湘潭', '益阳', '岳阳', '永州', '张家界', '株洲'],
    '江苏': ['南京', '常熟', '常州', '海门', '淮安', '江都', '江阴', '昆山', ' 连云港', '南通', '启东', '沭阳', '宿迁', '苏州', '太仓', '泰州', '同里', '无锡', '徐州', '盐城', '扬州', '宜兴', '仪征', '张家港', '镇江', '周庄'],
    '江西': ['南昌', '抚州', '赣州', '吉安', '景德镇', '井冈山', '九江', '庐山', '萍乡', '上饶', '新余', '宜春', '鹰潭'],
    '吉林': ['长春', '白城', '白山', '珲春', '辽源', '梅河', '吉林', '四平', '松原', '通化', '延吉'],
    '辽宁': ['沈阳', '鞍山', '本溪', '朝阳', '大连', '丹东', '抚顺', '阜新', '葫芦岛', '锦州', '辽阳', '盘锦', '铁岭', '营口'],
    //  '澳门' : ['澳门'],
    '内蒙古': ['呼和浩特', '阿拉善盟', '包头', '赤峰', '东胜', '海拉尔', '集宁', '临河', '通辽', '乌海', '乌兰浩特', '锡林浩特'],
    '宁夏': ['银川', '固源', '石嘴山', '吴忠'],
    '青海': ['西宁', '德令哈', '格尔木', '共和', '海东', '海晏', '玛沁', '同仁', '玉树'],
    '上海': ['崇明', '黄浦', '卢湾', '徐汇', '长宁', '静安', '普陀', '闸北', '虹口', '杨浦', '闵行', '宝山', '嘉定', '浦东', '金山', '松江', '青浦', '南汇', '奉贤'],
    '陕西': ['西安', '安康', '宝鸡', '汉中', '渭南', '商州', '绥德', '铜川', '咸阳', '延安', '榆林'],
    '四川': ['成都', '巴中', '达川', '德阳', '都江堰', '峨眉山', '涪陵', '广安', '广元', '九寨沟', '康定', '乐山', '泸州', '马尔康', '绵阳', '眉山', '南充', '内江', '攀枝花', '遂宁', '汶川', ' 西昌', '雅安', '宜宾', '自贡', '资阳'],
    //  '台湾' : ['台北','基隆','台南','台中','高雄','屏东','南投','云林','新竹','彰化','苗栗','嘉义','花莲','桃园','宜兰','台东','金门','马祖','澎湖'],
    '天津': ['天津', '和平', '东丽', '河东', '西青', '河西', '津南', '南开', '北辰', '河北', '武清', '红挢', '塘沽', '汉沽', '大港', '宁河', '静海', '宝坻', '蓟县'],
    '新疆': ['乌鲁木齐', '阿克苏', '阿勒泰', '阿图什', '博乐', '昌吉', '东山', '哈密', '和田', '喀什', '克拉玛依', '库车', '库尔勒', '奎屯', '石河子', '塔城', '吐鲁番', '伊宁'],
    '西藏': ['拉萨', '阿里', '昌都', '林芝', '那曲', '日喀则', '山南'],
    '云南': ['昆明', '大理', '保山', '楚雄', '大理', '东川', '个旧', '景洪', '开远', '临沧', '丽江', '六库', '潞西', '曲靖', '思茅', '文山', '西双版纳', '玉溪', '中甸', '昭通'],
    '浙江': ['杭州', '安吉', '慈溪', '定海', '奉化', '海盐', '黄岩', '湖州', ' 嘉兴', '金华', '临安', '临海', '丽水', '宁波', '瓯海', '平湖', '千岛湖', '衢州', '江山', '瑞安', '绍兴', '嵊州', '台州', '温岭', '温州', '余姚', '舟山']
};

/**
 * 获取省的信息
 */
function get_provice_json(provinceData) {
    var province = new Array();
    for (var p in provinceData) {
        var perdata = new Array();
        if (p != 0) {
            perdata['id'] = p;
            perdata['text'] = p;
        } else {
            perdata['id'] = p;
            perdata['text'] = '请选择省';
        }
        province.push(perdata);
    }
    return province;
}

/**
 * 获取省市的信息
 * 20160801 修改 隋国珍
 */
function get_city_byprovince(province, provinceData) {
    var arr = provinceData[province];
    if (!arr) {
        return;
    }
    var city = new Array();
    city.push({'id': '0', 'text': '请选择市/区'});
    for (var i = 0; arr[i]; i++) {
        var perdata = new Array();
        perdata['id'] = arr[i];
        perdata['text'] = arr[i];
        city.push(perdata);
    }
    return city;
}

/**
 *验证是否为空
 *@return boolean 空或者没有设置
 *@param {boolean}  是否为空
 */
function is_null_or_empty(val) {
    if (val === null || val === undefined || val === '' || val === 0 || val === '0' || val === '0.00') {
        return true;
    } else {
        return false;
    }
}


/**
 *根据 cus_id 查询 cus_name
 *@param {string} href 表示链接
 *@param {string} cus_id_id 表示 客户id隐藏表单的id
 *@param {string} cus_name_id 表示客户的name的隐藏表单的id
 *@param cus_id_flag  表示 cus_id字段 是 html 还是 val 方式赋值
 *@param cus_name_flag 表示 cus_name字段 是 html 还是 val 方式赋值
 */
function open_querycus_small_window(href, cus_id_id, cus_name_id) {
    var cus_id_flag = arguments[3] ? arguments[3] : 'val';
    var cus_name_flag = arguments[4] ? arguments[4] : 'val';
    //左右居中操作 宽度合适
    var iWidth = window.screen.availWidth - 300;
    var iHeight = window.screen.availHeight - 300;
    var iLeft = (window.screen.availWidth - 30 - iWidth) / 2;  //获得窗口的水平位置;
    var win_name = '客户查找';
    href = href + '?cus_id_id=' + cus_id_id + '&cus_name_id=' + cus_name_id + '&cus_id_flag=' + cus_id_flag + '&cus_name_flag=' + cus_name_flag;
    var win = window.open(href, win_name, 'height=' + iHeight + ',width=' + iWidth + ',top=0,left=' + iLeft + ', toolbar = no, menubar = no, scrollbars = yes, resizable = no, location = no, status = no');
    if (!win || (win.closed || !win.focus) || typeof (win.document) == 'unknown' || typeof (win.document) == 'undefined') {
        alert('您的请求被拦截，请永久允许弹出窗体');
    }
    win.focus();
}
