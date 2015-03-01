Ext.define('XMLifeOperating.view.operationManage.dealProblemDeals.DealProblemDealsReapportionDeliverer', {
    extend: 'Ext.window.Window',
    xtype: 'reapportionDealTasksDeliverer',
    id: 'reapportionDealTasksDeliverer',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden'
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
            title: '重新分配配送员',
            layout: 'anchor',
            bodyPadding: 5,
            border: false,
            defaults: {
                anchor: '100%'
            },
            items: [{
                name: 'reapportionDeliverers',
                store: 'Deliverer',
                fieldLabel: '重新分配配送员',
                xtype: 'gridpanel',
                itemId: 'reapportionDeliverers',
                height: 500,
                columns: [{
                    text: '配送员姓名',
                    dataIndex: 'name'
                }, {
                    text: '联系电话',
                    dataIndex: 'phone'
                }, {
                    text: '线路',
                    dataIndex: 'zoneName'
                }, {
                    text: '当前订单数',
                    width: 80,
                    align: 'center',
                    dataIndex: 'activeDealNum'
                }, {
                    text: '操作',
                    sortable: false,
                    align: 'center',
                    itemId: 'putReapportionDeliverer',
                    renderer: function(value) {
                        return Ext.String.format('<a>分单</a>', value, value);
                    }
                }]
            }]
        }];
        this.callParent(arguments);
    }
});
