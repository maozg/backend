Ext.define('XMLifeOperating.view.msgManage.SmsList', {
    extend: 'Ext.grid.Panel',
    xtype: 'smsList',
    id: 'smsList',
    itemId: 'smsList',
    title: '短信',
    closable: true,
    store: 'Message',

    tbar: [{
            xtype: 'textfield',
            itemId: 'msgType',
            value: 2,
            hidden: true
        }, {
            xtype: 'button',
            text: '新增短信',
            itemId: 'addBtn'
        },
        '->', {
            xtype: 'combo',
            itemId: 'statusCombo',
            fieldLabel: '状态',
            labelAlign: 'right',
            editable: false,
            store: 'MessageStatus',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            value: 0
        }
    ],

    columns: [{
        text: '编号',
        dataIndex: 'id',
        width: 80,
        align: 'center'
    }, {
        text: '文字',
        dataIndex: 'content',
        sortable: false,
        width: 200,
        align: 'left'
    }, {
        text: '发布时间',
        dataIndex: 'startTime',
        sortable: false,
        width: 150,
        align: 'center'
    }, {
        text: '发布者',
        dataIndex: 'adminName',
        sortable: false,
        align: 'center'
    }, {
        text: '消息url',
        dataIndex: 'url',
        width: 200,
        sortable: false,
        hidden: true
    }, {
        text: 'uid文件',
        dataIndex: 'file',
        width: 150,
        sortable: false,
        hidden: true
    }, {
        text: '编辑',
        itemId: 'editBtn',
        dataIndex: 'status',
        width: 100,
        align: 'center',
        renderer: function(value) {
            return value === 0 ? '<img src="resources/images/edit.png" class="x-action-col-icon" />' : '';
        }
    }]
});
