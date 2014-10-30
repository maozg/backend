Ext.define('XMLifeOperating.view.freightManage.FreightSet', {
        extend: 'Ext.window.Window',
        xtype: 'freightSet',
        id:'freightSet',
        closeAction: 'hide',
        model: true,
        width: 400,
        height: 240,
        resizable: false,
        layout: 'fit',
        title: '运费设置',
        initComponent: function() {
            this.items = [{
                    xtype: 'form',
                    itemId: 'dealForm',
                    layout: 'anchor',
                    bodyPadding: 5,
                    border: false,
                    frame: true,
                    style: 'border:none;padding:10px',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                            xtype: 'displayfield',
                            name: 'name',
                            fieldLabel: '城市',
                            allowBlank: false,
                            minWidth: 200,
                            maxWidth: 200,
                            labelWidth: 100,
                            labelAlign: 'left'
                        }, {
                            xtype: 'textfield',
                            itemId:'shipfee',
                            name: 'shipfee',
                            fieldLabel: '运费',
                            allowBlank: false,
                            labelAlign: 'left',
                            minWidth: 138,
                            maxWidth: 138,
                            labelWidth: 100,
                            disabled:false,

                        }, {
                            xtype: 'label',
                            text: '元',
                            textAlign: 'left',
                            cls: 'user-text-label'
                        }, {
                            layout: 'hbox',
                            xtype: 'fieldset',
                            border: false,
                            padding: 0,
                            items: [{
                                xtype: 'checkbox',
                                itemId:'amount',
                                name: 'amount',
                                allowBlank: false,
                                disabled:false,
                                style:'margin-left:40px',
                                handler:function(value,record){                                                                  
                                   if(value.getValue()){
                                        var deduct = Ext.ComponentQuery.query('#deductd')[0];
                                        deduct.setDisabled(false);
                                    }else{
                                        var deduct = Ext.ComponentQuery.query('#deductd')[0];
                                        deduct.setDisabled(true);
                                    }                                   
                                }
                            }, {
                                xtype: 'textfield',
                                itemId:'deductd',
                                name: 'deductd',
                                fieldLabel: '满',
                                labelSeparator: '',
                                labelWidth: 40,
                                minWidth: 88,
                                maxWidth: 88,
                                disabled:true,
                                allowBlank: true
                            }, {
                                xtype: 'text',
                                text: '免运费',
                                textAlign: 'left',
                            }]
                        }
                ],
                buttons: [{
                    text: '确定',
                    itemId: 'submitId'
                }, {
                    text: '取消',
                    handler: function() {
                        //关闭窗口
                        Ext.ComponentQuery.query('freightSet')[0].close();
                    }
                }]
            }]

        this.callParent(arguments);

    }


});