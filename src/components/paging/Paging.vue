<template>
<!-- 公共功能按钮 -->
{{if !empty($paging.actions)}}
<div class="clearfix">
{{foreach from=$paging.actions item=action key=action_code}}
{{if $action_code eq "fastAdd"}}
    <a class=" pull-right fastAddBtn" href="javascript:return void(0);" data-url="{{$action.url}}">{{$action.name}}</a>
    {{else}}
    <a class="btn-ajax pull-right" href="{{$action.url}}">{{$action.name}}</a>
    {{/if}}
{{/foreach}}
</div>
{{/if}}


<!-- 搜索框 -->
{{if !empty($paging.search.fields)}}
{{include file="widgets/list_search.html" search=$paging.search}}
{{/if}}


<!-- 列表内容 -->
{{if !empty($paging.list)}}
    {{include file="widgets/list_table.html" list=$paging.list}}

    {{if !empty($paging.selectActions)}}
    {{include file="widgets/list_checkbox_actions.html" actions=$paging.selectActions}}
    {{/if}}
    <!-- 分页 -->
    {{if $paging.paging.total > 1}}
    {{include file="widgets/list_paging.html" paging=$paging.paging}}
    {{/if}}
{{else}}
暂无内容
{{/if}}

<!-- 自定义动作弹框 -->
<div class="modal fade" id="action-modal" tabindex="-1" role="dialog" aria-labelledby="action-modal" >
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="padding: 50px 30px;">
            <div class="form-horizontal">
                <div id="action-modal-box"></div>
                <div class="form-group">
                    <div class="col-sm-offset-5 col-sm-10">
                        <button id="action-do">操作</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    function actionAjax(url, id, data)
    {

    }
    function generateForm(params)
    {
        var html = '';
        params = params.split('\\"').join('"');
        params = JSON.parse(params);
        for (var i in params) {
            html += '<div class="form-group"><label class="col-sm-2 control-label">' +params[i]['name'] +'</label>';
            if (params[i]['type'] == 'text') {
                html += '<div class="col-sm-7">' +
                        '<textarea key="'+params[i]['key']+'"  class="action-input" style="width: 450px;height:320px;"></textarea></div>';
            }
            else if ('select' in params[i]) {
                html += '<div class="col-sm-7"><select class="action-input" key="'+params[i]['key']+'">';
                for (var j in params[i]['select']) {
                    html += '<option value="'+params[i]['select'][j]['value']+'">'
                            +params[i]['select'][j]['name']+'</option>';
                }
                html += '</select></div>';
            } else {
                html += '<div class="col-sm-7">' +
                        '<input type="text" class="action-input" key="'+params[i]['key']+'"></div>';
            }
            html += '</div>';
        }
        return html;
    }

    $(function(){
        $('.btn-ajax').on('click', function(e){
            e.preventDefault();
            var id = $(this).attr('itemId');
            var url = $(this).attr('url');
            var params = $(this).attr('params');
            var clickType = $(this).attr('click');

            // new page
            if(clickType === 'page') {
                document.location.href = url;
            }

            // 直接ajax
            else if(clickType === 'ajax') {
                var message = $(this).attr('message');
                if (message.length > 0) {
                    message = message.replace(/@id@/, id);
                    if (!confirm(message)) {
                        return false;
                    }
                }
                $.get(url, {}, function(response){
                    if (response.status === 1) {
                        response.data === true ? alert('操作成功') : alert(response.data);
                        document.location.reload();
                    } else {
                        alert(response.msg);
                    }

                }, 'json');
            }

            // 表单ajax
            else if (clickType === 'dialog') {
                $('#action-modal-box').html(generateForm(params));
                $('#action-modal').modal();
                $('#action-do').on('click', function(){
                    var data = {};
                    var filed,value;
                    var object = $('.action-input');
                    for(var i =0;i<object.length;i++) {
                        field = object.eq(i).attr('key');
                        value = object.eq(i).val();
                        if (value.length <= 0) {
                            alert('有内容为空！');
                            return false;
                        }
                        data[field] = value;
                    }
                    $.post(url, {'data':data}, function(response){
                        alert('操作成功');
                        document.location.reload();
                    });
                });
            }

        });

        $('.fastAddBtn').on('click', function(){
            $('.fast-add-container').toggle();
        });
        $('.fast-add-cancel').on('click', function(){
            $('.fast-add-container').hide();
        });
        $('.fast-add-submit').on('click', function(){
            var post = {};
            var input_dom = $(this).parents('.fast-add-container').find('.fast-edit-text');
            for (var i = 0; i < input_dom.length; i++) {
                var field = input_dom.eq(i).attr('data-field');
                post[field] = input_dom.eq(i).val();
            }
            var url = $('.fastAddBtn').attr('data-url');
            admin.http.post(url, {"data":post}, function(){
                alert('添加成功');
                document.location.reload();
            });
        });
        $('.fast-edit-field').on('click', function(){
            var content,input;
            var is_edit = parseInt($(this).attr('is_edit'));
            if (!is_edit) {
                content = $(this).html().replace(/(^\s*)|(\s*$)/g,"");
                input = '<input type="text" value="'+content+'"><a class="fast-edit-field-change" style="color: red;">修改</a>  |  <a class="fast-edit-field-cancel">取消</a>';
                input += '<div style="display:none;" class="hidden-default-content">'+content+'</div>';
                $(this).html(input);
                $(this).attr('is_edit', 1);
            }
        });
        $(document).on('click', '.fast-edit-field-change', function(){
            var _this = $(this);
            var content = $(this).parents('td').find('input').val();
            var field = $(this).parents('td').attr('data-field');
            var id = $(this).parents('tr').attr('data-id');
            admin.http.post('{{$paging.list.fastEditUrl}}', {'{{$paging.list.idField}}':id, "field":field,"content":content}, function(){
                _this.parents('td').html(content).attr('is_edit', 0);
                alert('修改成功');
            });
        });
        $(document).on('click', '.fast-edit-field-cancel', function(){
            var content = $(this).parents('td').find('.hidden-default-content').html(); //返回默认值
            $(this).parents('td').html(content).attr('is_edit', 0);
        });
    });
</script>
