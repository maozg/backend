Ext.define('XMLifeOperating.view.operationManage.dealCashOnDelivery.DealCashOnDeliveryList', {
    extend: 'Ext.grid.Panel',
    closable: false,
    xtype: 'dealCashOnDeliveryList',

    title: '货到付款管理',

    store: 'DealCashOnDelivery',
    id: 'dealCashOnDeliveryList',
    bbar: [{
        xtype: 'pagingtoolbar',
        itemId: 'pagetool',
        store: 'DealCashOnDelivery',
        displayInfo: true,
        style:'border:none'
    }],
    tbar: [{
        xtype: 'combobox',
        name: 'area',
        itemId: 'shopArea',
        store: 'ShopArea',
        emptyText: '请选择中心',
        // margin: 10,
        editable: false,
        displayField: 'name',
        valueField: 'id',
        hidden: (XMLifeOperating.generic.Global.operating_type == 'center')
    }, {
        xtype: 'radiogroup',
        id: 'sex',
        fieldLabel: '',
        hideLabels: false,
        fieldLabel: '按时间过滤',
        defaults: {
            flex: 2
        },
        layout: 'hbox',
        items: [{
            boxLabel: '今日',
            name: 'dayType',
            inputValue: 0,
            itemId: 'dayType0',
            labelWidth: 75,

        }, {
            boxLabel: '本周',
            name: 'dayType',
            inputValue: 3,
            itemId: 'dayType3',
            labelWidth: 75,
        }, {
            boxLabel: '本月',
            name: 'dayType',
            inputValue: 5,
            itemId: 'dayType5'
        }, {
            boxLabel: '上月',
            name: 'dayType',
            inputValue: 6,
            itemId: 'dayType6'
        }, {
            boxLabel: '全部',
            name: 'dayType',
            inputValue: 7,
            itemId: 'dayType7'
        }]
    }, {
        xtype: 'combo',
        name: 'cashUnderCourierId',
        itemId: 'cashUnderCourierId',
        store: 'Deliverer',
        emptyText: '请选择快递员',
        editable: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'uid'
    }, {
        xtype: 'combo',
        name: 'cashSign',
        itemId: 'cashOnDeliverySignId',
        store: 'DealCashOnDeliverySign',
        value: '',
        // margin:10,
        editable: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value'
    }, {
        xtype: 'combo',
        name: 'cashPaid',
        itemId: 'cashOnDeliveryPaidId',
        store: 'DealCashOnDeliveryPaid',
        value: '',
        // margin:10,
        editable: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'value'
    }],
    columns: [{
            xtype: 'rownumberer',
            width: 50,
            align: 'center'
        }, {
            text: '创建时间',
            dataIndex: 'created',
            width: 80,
            sortable: true,
            align: 'center',
            renderer: function(value) {
                return Ext.util.Format.date(new Date(value), "Y.m.d");
            }
        }, {
            text: '订单号',
            dataIndex: 'shortId',
            width: 60,
            sortable: true,
            align: 'center',
            itemId: 'orderShortId',
            renderer: function(value) {
                return '<a href="javascript:;">' + value + '</a>';
            }
        }, {
            text: '线路',
            dataIndex: 'zoneName',
            width: 60,
            sortable: true,
            align: 'center'
        }, {
            text: '收货人',
            dataIndex: 'customerName',
            width: 80,
            sortable: true,
            align: 'center',
            itemId: 'customerDetailId',
            renderer: function(value) {
                return '<a href="javascript:;">' + value + '</a>';
            }
        }, {
            text: '收货人电话',
            dataIndex: 'customerPhone',
            width: 90,
            sortable: true,
            align: 'center'
        }, {
            text: '分配配送员',
            dataIndex: 'delivererName',
            width: 80,
            sortable: true,
            align: 'center'
        }, {
            text: '支付方式',
            dataIndex: 'flowType',
            width: 60,
            sortable: true,
            align: 'center',
            renderer: function(value) {
                var str='';
                for(var i=0;i<value.length;i++){
                    switch(value[i]){
                        case 'ALIPAY':
                            str +='支付宝支付';
                            break;
                        case 'TENPAY':
                            str += '腾讯支付';
                            break;
                        case 'BALANCE':
                            str += '余额支付';
                            break;
                        case 'COD':
                            str += '货到付款';
                            break;
                    }
                    str += '<br />';
                }
                return str;                
            }
        }, {
            text: '订单金额',
            //dataIndex: 'actualDealPrice',
            dataIndex: 'dealPrice',
            width: 60,
            sortable: true,
            align: 'center',
            /*renderer: function(value) {
                
                return value/100;
            }*/
        }, {
            text: '使用账户余额',
            dataIndex: 'balance',
            width: 90,
            sortable: true,
            align: 'center',
        }, {
            text: '是否取消订单',
            dataIndex: 'hasCancel',
            width: 90,
            sortable: true,
            align: 'center',
            itemId: 'hasCancelId',
            renderer: function(value) {
                return value ? '<a href="javascript:;">是</a>' : '否';
            }
        }, {
            text: '取消金额',
            dataIndex: 'cancelPrice',
            width: 80,
            sortable: true,
            align: 'center'
        }, {
            text: '是否有退货',
            dataIndex: 'hasReturn',
            width: 80,
            sortable: true,
            align: 'center',
            itemId: 'hasReturnId',
            renderer: function(value) {
                return value ? '<a href="javascript:;">是</a>' : '否';
            }
        }, {
            text: '退款金额',
            dataIndex: 'returnPrice',
            width: 60,
            sortable: true,
            align: 'center'
        }, {
            text: '线下应收',
            dataIndex: 'codAmt',
            width: 80,
            sortable: true,
            align: 'center'
            /*renderer: function(value) {
                
                return value/100;
            }*/
        }, {
            text: '是否到账',
            dataIndex: 'codMark',
            width: 80,
            sortable: true,
            align: 'center',
            itemId: 'closeOrOpenCodMark',
            renderer: function(value) {
                if (value == true) {
                    return '<span style="color:blue;cursor:pointer;">已到账</span>';
                }
                return '<span style="color:blue;cursor:pointer;">到账</span>';
            }
        }, {
            text: '标记',
            dataIndex: 'codProblemMark',
            width: 80,
            sortable: true,
            align: 'center',
            itemId: 'closeOrOpenProblemMark',
            renderer: function(value) {
                return value ? '<a href="javascript:;">取消标记</a>' : '<a href="javascript:;">标记</a>';
            }
        }, {
            text: '操作',
            dataIndex: '',
            width: 60,
            sortable: true,
            align: 'center',
            itemId: 'remarkId',
            renderer: function(value) {
                return '<span style="color:blue;cursor:pointer;">备注</span>';
            }
        },
        /*{
            text: '',
            dataIndex: '',
            width: 100,
            sortable: false,
            align: 'center', 
        },*/
        {
            text: '备注',
            dataIndex: 'codMarkContent',
            width: 80,
            sortable: true,
            align: 'center'
        }
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorder'
        }
    },
    listeners: {
        onShowView: function(view, viewName) {
            if (XMLifeOperating.generic.Global.operating_type != 'center') {
                return;
            }
            if (XMLifeOperating.generic.Global.current_operating == -1) {
                alert('请先在右上角选择中心');
                return;
            }
            var combo = view.down('#shopArea');
            combo.setValue(XMLifeOperating.generic.Global.current_operating);
            combo.fireEvent('select', combo);
        }
    },
    columnLines: true
});