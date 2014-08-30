Ext.define('XMLifeOperating.view.operationManage.dealCashOnDelivery.DealCashOnDeliveryList', {
    extend: 'Ext.grid.Panel',
    xtype: 'dealCashOnDeliveryList',

    header: false,

    store: 'DealCashOnDelivery',
    id:'dealCashOnDeliveryList',
    tbar: [
        {
            xtype: 'radiogroup',
            id: 'sex',
            fieldLabel : '',
            hideLabels: false,
            defaults: {
                flex: 2
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : '今日',
                    name      : 'dayType',
                    inputValue: '',
                    itemId: 'dayType0',
                    labelWidth : 75,

                }, 
                {
                    boxLabel  : '本周',
                    name      : 'dayType',
                    inputValue: '',
                    itemId: 'dayType3',
                    labelWidth : 75,
                },
                {
                    boxLabel  : '本月',
                    name      : 'dayType',
                    inputValue: '',
                    itemId: 'dayType5'
                },
                {
                    boxLabel  : '上月',
                    name      : 'dayType',
                    inputValue: '',
                    itemId: 'dayType6'
                },
                {
                    boxLabel  : '全部',
                    name      : 'dayType',
                    inputValue: '',
                    itemId: 'dayType7'
                },
            ]
        },
        /*{
            xtype: 'radio',
            fieldLabel:'今日',
            name:'dayType',
            itemId: 'dayType0'
        },
        {

            xtype: 'radio',
            fieldLabel:'本周',
            name:'dayType',
            itemId: 'dayType3'
        },
        {

            xtype: 'radio',
            fieldLabel:'本月',
            name:'dayType',
            itemId: 'dayType5'
        },
        {

            xtype: 'radio',
            fieldLabel:'上月',
            name:'dayType',
            itemId: 'dayType6'
        },
        {

            xtype: 'radio',
            fieldLabel:'全部',
            name:'dayType',
            itemId: 'dayType7'
        },*/
        {
            xtype:'combo',
            name:'cashUnderCourierId',
            itemId:'cashUnderCourierId',
            store:'Deliverer',
            emptyText:'请选择快递员',
            margin:10,
            editable: false,
            queryMode:'local',
            displayField:'name',
            valueField:'uid',
        },
        {
            xtype:'combo',
            name:'cashSign',
            itemId:'cashOnDeliverySignId',
            store:'DealCashOnDeliverySign',
            value:'',
            margin:10,
            editable: false,
            queryMode:'local',
            displayField:'name',
            valueField:'value',
        },
        {
            xtype:'combo',
            name:'cashPaid',
            itemId:'cashOnDeliveryPaidId',
            store:'DealCashOnDeliveryPaid',
            value:'',
            margin:10,
            editable: false,
            queryMode:'local',
            displayField:'name',
            valueField:'value',
        },


    ],

    columns: [
       
        {
            text: '创建时间',
            dataIndex: 'created',
            width: 100,
            sortable: false,
            align: 'center', 
            renderer: function (value) {
                var date = new Date(value);
                return date.getFullYear()+'.'+(date.getMonth()+1)+'.'+date.getDate();
            }
        },
        {
            text: '订单号',
            dataIndex: 'shortId',
            width: 60,
            sortable: false,
            align: 'center', 
            itemId:'orderShortId',
            renderer: function (value) {
                return '<span style="color:blue;cursor:pointer;">'+value+'</span>';
            }
        },
        {
            text: '中心点',
            dataIndex: 'shopAreaName',
            width: 60,
            sortable: false,
            align: 'center', 
        },
        {
            text: '线路',
            dataIndex: 'zoneName',
            width: 60,
            sortable: false,
            align: 'center', 
        },
        {
            text: '中心点',
            dataIndex: 'shopAreaName',
            width: 60,
            sortable: false,
            align: 'center', 
        },
        {
            text: '顾客',
            dataIndex: 'customerName',
            width: 100,
            sortable: false,
            align: 'center', 
            itemId:'customerDetailId',
            renderer: function (value) {
                return '<span style="color:blue;cursor:pointer;">'+value+'</span>';
            }
        },
        {
            text: '顾客电话',
            dataIndex: 'customerPhone',
            width: 60,
            sortable: false,
            align: 'center', 

        },
        {
            text: '分配配送员',
            dataIndex: 'delivererName',
            width: 100,
            sortable: false,
            align: 'center', 
        },
        {
            text: '支付方式',
            dataIndex: 'shopAreaName',
            width: 100,
            sortable: false,
            align: 'center', 
        },
        {
            text: '订单金额',
            dataIndex: 'actualDealPrice',
            width: 60,
            sortable: false,
            align: 'center', 
        },
        {
            text: '使用账户余额',
            dataIndex: 'balance',
            width: 60,
            sortable: false,
            align: 'center', 
        },
        {
            text: '是否取消订单',
            dataIndex: 'hasCancel',
            width: 100,
            sortable: false,
            align: 'center',
            itemId:'hasCancelId',
            renderer: function (value) {
                if(value==true){
                    return '<span style="color:blue;cursor:pointer;">是</span>';
                }
                return '否';
            }
        },
        
        {
            text: '取消金额',
            dataIndex: 'cancelPrice',
            width: 100,
            sortable: false,
            align: 'center', 
        },
        {
            text: '是否有退货',
            dataIndex: 'hasReturn',
            width: 100,
            sortable: false,
            align: 'center',
            itemId:'hasReturnId', 
            renderer: function (value) {
                if(value==true){
                    return '<span style="color:blue;cursor:pointer;">是</span>';
                }
                return '否';
            }
        },
        {
            text: '退款金额',
            dataIndex: 'returnPrice',
            width: 80,
            sortable: false,
            align: 'center', 
        },
        {
            text: '线下应收',
            dataIndex: 'codAmt',
            width: 80,
            sortable: false,
            align: 'center', 
        },
        {
            text: '',
            dataIndex: 'codMark',
            width: 80,
            sortable: false,
            align: 'center', 
            itemId: 'closeOrOpenCodMark',
            renderer: function (value) {
                if(value==true){
                    return '<span style="color:blue;cursor:pointer;">已到账</span>';
                }
                return '<span style="color:blue;cursor:pointer;">到账</span>';
            }
        },
        {
            text: '',
            dataIndex: 'codProblemMark',
            width: 80,
            sortable: false,
            align: 'center', 
            itemId: 'closeOrOpenProblemMark',
            renderer: function (value) {
                if(value==true){
                    return '<span style="color:blue;cursor:pointer;">取消标记</span>';
                }
                return '<span style="color:blue;cursor:pointer;">标记</span>';
            }
        },
        {
            text: '',
            dataIndex: '',
            width: 80,
            sortable: false,
            align: 'center',
            itemId:'remarkId',
            renderer: function (value) {
                
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
            width: 100,
            sortable: false,
            align: 'center', 
        },
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorder'
        }
    }
});