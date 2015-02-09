Ext.define('XMLifeOperating.view.operationManage.refund.RefundList', {
    extend: 'Ext.grid.Panel',
    id: 'RefundList',
    xtype: 'RefundList',
    alias: 'widget.RefundList',
    autoScroll: true,
    store: 'Refund',
    title: '退款列表',
    closable: false,
    forceFit: true,
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    requires: [
        'Ext.panel.Panel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.ux.RowExpander',
        'Ext.selection.CheckboxModel'
    ],
    tbar: [
        '查询范围', {
            xtype: 'datefield',
            name: 'beginTime',
            emptyText: '开始时间',
            maxValue: new Date(),
            value: new Date(),
            format: 'Y-m-d'
        },
        '到', {
            xtype: 'datefield',
            name: 'endTime',
            emptyText: '结束时间',
            maxValue: new Date(),
            value: new Date(),
            format: 'Y-m-d'
        }, {
            xtype: 'button',
            name: 'today',
            text: '今天',
            style: {
                border: '1px solid #99bce8'
            }
        }, {
            xtype: 'button',
            name: 'yesterday',
            text: '昨天',
            style: {
                border: '1px solid #99bce8'
            }
        }, {
            xtype: 'button',
            name: 'oldSevenDay',
            text: '最近7天',
            style: {
                border: '1px solid #99bce8'
            }
        }, {
            xtype: 'button',
            name: 'oldMonth',
            style: {
                border: '1px solid #99bce8'
            },
            text: '最近30天'
        }, {
            xtype: 'combo',
            name: 'refundType',
            itemId: 'refundTypeCombo',
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '根据付款类型筛选',
            displayField: 'type',
            width: 120,
            margin: '0 5 0 5',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'type'],
                data: [{
                    "value": 'ALIPAY-TENPAY-BALANCE',
                    "type": '所有方式'
                }, {
                    "value": 'ALIPAY',
                    "type": '支付宝'
                }, {
                    "value": 'TENPAY',
                    "type": '财付通'
                }, {
                    "value": 'BALANCE',
                    "type": '余额付款'
                }],
            })
        }, {
            xtype: 'combo',
            name: 'status',
            itemId: 'statusCombo',
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '根据状态判断',
            displayField: 'type',
            width: 120,
            margin: '0 5 0 5',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'type'],
                data: [{
                    "value": '0-1-2',
                    "type": '所有方式'
                }, {
                    "value": '0',
                    "type": '待处理'
                }, {
                    "value": '1',
                    "type": '完成退款'
                }, {
                    "value": '2',
                    "type": '退款不成功'
                }],
            })
        },
        '->', {
            xtype: 'combo',
            name: 'refundTypeSearch',
            itemId: 'refundTypeSearch',
            queryMode: 'local',
            triggerAction: 'all',
            emptyText: '订单',
            displayField: 'type',
            width: 80,
            margin: '0 5 0 5',
            valueField: 'value',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'type'],
                data: [{
                    "value": 'dealId',
                    "type": '订单'
                }, {
                    "value": 'mobile',
                    "type": '手机号码'
                }]
            })
        }, {
            xtype: 'textfield',
            emptyText: '请输入号码',
            name: 'mobileSearch',
            allowBlank: false,
            margin: '0 5 0 5'
        }, {
            xtype: 'button',
            name: 'searchDeal',
            style: {
                border: '1px solid #99bce8'
            },
            text: '搜索'
        }
    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        itemId: 'pagetoll',
        store: 'Refund',
        dock: 'bottom',
        displayInfo: true
    }],
    columns: [{
        xtype: 'rownumberer',
        width: 50,
        align: 'center'
    }, {
        header: '日期',
        dataIndex: 'createTime',
        width: 130
    }, {
        header: '订单编号',
        dataIndex: 'shortId',
        itemId: 'dealDetailRefund',
        renderer: function(v) {
            return '<a href="javascript:;">' + v + '</a>';
        }
    }, {
        header: '订单状态',
        dataIndex: 'status',
        width: 70,
        renderer: function(v) {
            var data = {
                '0': '待处理',
                '1': '完成退款',
                '2': '退款不成功'
            }
            return data[v];
        }
    }, {
        header: '顾客名称',
        dataIndex: 'userName'
    }, {
        header: '顾客电话',
        dataIndex: 'userPhone'
    }, {
        header: '总退款次数',
        dataIndex: 'refundCount',
        width: 60
    }, {
        header: '订单金额',
        dataIndex: 'dealPrice',
        renderer: function(value) {
            return value / 100;
        }
    }, {
        header: '退款金额',
        dataIndex: 'amount',
        renderer: function(value) {
            return value / 100;
        }
    }, {
        header: '退款去处',
        dataIndex: 'refundType',
        renderer: function(v) {
            var data = {
                "ALIPAY": '支付宝',
                "TENPAY": '财付通',
                "BALANCE": '余额退款'
            };
            return data[v];
        }
    }, {
        header: '我方处理时间',
        width: 150,
        align: 'center',
        dataIndex: 'auditTime',
        renderer: function(v) {
            if (v == null) {
                return '未处理';
            }
            return v;
        }
    }],
    columnLines: true
});