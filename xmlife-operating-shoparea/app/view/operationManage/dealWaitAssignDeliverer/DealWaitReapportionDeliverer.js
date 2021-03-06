Ext.define('XMLifeOperating.view.operationManage.dealWaitAssignDeliverer.DealWaitReapportionDeliverer', {
    extend: 'Ext.window.Window',
    xtype: 'dealWaitReapportionDeliverer',
    id: 'dealWaitReapportionDeliverer',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
    ],
    closeAction: 'hide',
    modal: true,
    width: 500,
    height: 600,
    resizable: false,
    layout: 'fit',

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            title:'分配配送员',
            layout: 'anchor',
            bodyPadding: 5,
            border: false,
            
            defaults:{
                anchor: '100%'
            },


            items: [
                {
                    name: 'reapportionDeliverers',
                    store:'Deliverer',
                    fieldLabel: '重新分配配送员',
                    xtype:'gridpanel',
                    itemId:'reapportionDeliverers',
                    height:500,
                    columns:[
                        {
                            text:'配送员姓名',
                            sortable: true,
                            dataIndex:'name'
                        },
                        {
                            text:'联系电话',
                            sortable: true,
                            dataIndex:'phone'
                        },
                        {
                            text:'线路',
                            sortable: true,
                            dataIndex:'zoneName',
                        },
                        {
                            text:'当前订单数',
                            width: 80,
                            align: 'center',
                            sortable: true,
                            dataIndex:'activeDealNum'
                        },
                        {
                            text: '操作',
                            sortable: true,
                            align: 'center',
                            itemId: 'putReapportionDeliverer',
                            renderer: function (value) {
                                return Ext.String.format('<a>分单</a>', value, value);
                            }
                        },
                    ],
                },
            ],
        }]

        this.callParent(arguments);

    }

        
});

