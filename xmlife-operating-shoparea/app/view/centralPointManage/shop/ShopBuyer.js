Ext.define('XMLifeOperating.view.centralPointManage.shop.ShopBuyer', {
    extend: 'Ext.window.Window',
    xtype: 'shopbuyer',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.selection.CheckboxModel'
    ],
    closeAction: 'hide',
    modal: true,
    width: 450,
    height: 550,
    resizable: false,
    layout: 'fit',
    bodyStyle: 'text-align:center;border-style: none;',
    initComponent: function() {
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            border: false,
            frame: true,
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id',
                itemId: 'shopId',
                fieldLabel: 'shopId',
                labelWidth: 90,
                allowBlank: false,
            }, {
                xtype: 'displayfield',
                name: 'name',
                fieldLabel: '店铺名称',
                labelWidth: 90,
                allowBlank: false,
            }, {
                xtype: 'fieldset',
                labelWidth: 90,
                border: false,
                padding: 0,
                items: [

                    {
                        layout: 'column',
                        xtype: 'fieldset',
                        border: false,
                        padding: 0,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: '买手名字',
                            labelWidth: 90,
                            labelAlign: 'left',
                            name: 'keywordBuyer',
                            itemId: 'keywordBuyer',
                        }, {
                            xtype: 'button',
                            text: '搜索',
                            itemId: 'reseachBuyer'
                        }]

                    }
                ]
            }, {
                name: 'searchCourierIds',
                store: Ext.create('XMLifeOperating.store.SuperShopper'),
                allowBlank: false,
                mode: 'remote',
                fieldLabel: '买手',
                xtype: 'gridpanel',
                itemId: 'searchBuyerId',
                height: 150,
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                    mode: "SIMPLE"
                }),
                columns: [{
                    text: 'uid',
                    dataIndex: 'uid'
                }, {
                    text: '买手姓名',
                    dataIndex: 'name'
                }, {
                    text: '手机号',
                    dataIndex: 'phone'
                }]
            }, {
                name: 'shopperIds',
                store: 'SuperShopper',
                mode: 'remote',
                fieldLabel: '买手',
                xtype: 'gridpanel',
                itemId: 'bindShopWithShopper',
                height: 150,
                selModel: Ext.create('Ext.selection.CheckboxModel', {
                    mode: "SIMPLE"
                }),
                columns: [{
                    text: 'uid',
                    dataIndex: 'uid'
                }, {
                    text: '买手姓名',
                    dataIndex: 'name'
                }, {
                    text: '手机号',
                    dataIndex: 'phone'
                }]
            }],
            buttons: [{
                text: '确认',
                itemId: 'save-bindShopWithShopper'
            }, {
                text: '取消',
                handler: function() {
                    //关闭窗口
                   this.up('shopbuyer').close();
                }
            }]
        }]

        this.callParent(arguments);

    }


});