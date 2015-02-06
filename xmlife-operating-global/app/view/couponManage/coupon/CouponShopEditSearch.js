Ext.define('XMLifeOperating.view.couponManage.coupon.CouponShopEditSearch', {
    extend: 'Ext.window.Window',
    xtype: 'couponShopEditSearch',
    id:'couponShopEditSearch',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.form.FieldSet',
        'Ext.layout.container.Column',
        'Ext.draw.Text'
    ],
    closeAction: 'hide',
    modal: true,
    width: 450,
    resizable: false,
    layout: 'fit',
    title:'搜索店铺',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            border: false,
            items: [
                
                {
                    xtype: 'displayfield',
                    value:'选择店铺'
                },{
                    name: 'searchShopList',
                    // store:'ResidentalDistrict',
                    allowBlank: false,
                    fieldLabel: '店铺list',
                    xtype: 'gridpanel',
                    itemId: 'searchShopList',
                    height: 350,
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        mode: 'MULTI'
                    }),
                    columns: [{
                        text: '店铺名',
                        dataIndex: 'name',
                        width:200,
                        renderer: function(value,grid) {
                            
                            value = grid.record.get('cityName')+'-'+value;
                            return value;
                        }
                    }, {
                        text: 'shopId',
                        dataIndex: 'id',
                        width:200
                    }],
                }

            ],
            buttons: [
                {
                    text: '确认',
                    itemId: 'searchShopSure-btn'
                },
                {
                    text: 'Cancel',
                    handler:function(){
                        //关闭窗口
                        Ext.ComponentQuery.query('#couponShopEditSearch')[0].close();
                    }
                }
            ]
        }]

        this.callParent(arguments);

    }

        
});