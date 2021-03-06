Ext.define('XMLifeOperating.view.rechargeableCardManage.onlineCard.addOnlineCard', {
    extend: 'Ext.window.Window',
    id: 'addOnlineCard',
    xtype: 'addOnlineCard',
    alias: 'widget.addOnlineCard',
    title: '生成新充值卡',
    closeAction: 'destroy',
    modal: true,
    layout: 'fit',
    resizable: false,
    items: [{
        xtype: 'form',
        edit: false,
        url: XMLifeOperating.generic.Global.URL.biz + 'cardBatch/create?bizType=1',
        editUrl: XMLifeOperating.generic.Global.URL.biz + 'cardBatch/update',
        bodyPadding: '15 20',
        items: [{
            xtype: 'fieldcontainer',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                width: 430
            },
            items: [{
                xtype: 'combo',
                fieldLabel: '模板',
                name: 'tid',
                itemId: 'templeteCombo',
                queryMode: 'local',
                emptyText: '请选择模板',
                displayField: 'name',
                valueField: 'id',
                store: 'CardTemplate'
            }, {
                fieldLabel: '名称',
                name: 'batchName',
                itemId: 'batchName'
            }, {
                fieldLabel: 'id',
                hidden: true,
                name: 'id'
            }, {
                fieldLabel: '短描述',
                name: 'simpleDesc'
            }, {
                fieldLabel: '长描述',
                xtype: 'textarea',
                name: 'desc'
            }, {
                fieldLabel: '零售价',
                name: 'soldPrice',
                itemId: 'soldPrice'
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: '有效日期',
                defaultType: 'datefield',
                defaults: {
                    altFormats: 'Y-m-d H:i:s',
                    format: 'Y-m-d H:i:s'
                },
                layout: 'hbox',
                items: [{
                    name: 'startTime',
                    itemId: 'startTime',
                    allowBlank: false,
                    width: '48%',
                    listeners: {
                        change: function(field, v) {
                            var form = this.up('form'),
                                displayStartTime = form.down('#displayStartTime'),
                                endTime = form.down('#endTime');
                            displayStartTime.setValue(v);
                            endTime.setMinValue(v);
                        }
                    }
                }, {
                    text: '至',
                    xtype: 'text'
                }, {
                    name: 'endTime',
                    itemId: 'endTime',
                    allowBlank: false,
                    width: '48%',
                    listeners: {
                        change: function(field, v) {
                            var form = this.up('form'),
                                displayEndTime = form.down('#displayEndTime');
                            displayEndTime.setValue(v);
                        }
                    }

                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: '开始展示日期',
                defaultType: 'datefield',
                defaults: {
                    altFormats: 'Y-m-d H:i:s',
                    format: 'Y-m-d H:i:s'
                },
                layout: 'hbox',
                items: [{
                    name: 'displayStartTime',
                    itemId: 'displayStartTime',
                    allowBlank: false,
                    width: '48%',
                    listeners: {
                        change: function(field, v) {
                            var form = this.up('form'),
                                startTime = new Date(form.down('#startTime').getValue());
                            if (v > startTime) {
                                Ext.Msg.confirm('请注意', '该卡的开始展示时间，晚于有效日期的起始时间，确定这样吗?', function(isYes) {
                                    if (isYes == 'yes') {
                                        return false;
                                    } else {
                                        this.setValue('');
                                    }
                                }, this);
                            }
                        }
                    }
                }, {
                    text: '至',
                    xtype: 'text'
                }, {
                    name: 'displayEndTime',
                    itemId: 'displayEndTime',
                    width: '48%'
                }]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            hidden: true,
            itemId: 'templeteWorp',
            style: {
                borderTop: '1px #ddd solid',
                paddingTop: '5px'
            },
            items: [{
                html: '<strong>充值卡模板介绍:</strong>'
            }, {
                itemId: 'templeteCon',
                bodyPadding: '0 5',
                tpl: '<div>' +
                    '<p>类型: {type} 编号: {id}</p>' +
                    '<p>总价: {amount}</p>' +
                    '<tpl if="rule != null">' +
                    '<p>即时到账: {rule.immediatelyAmount}</p>' +
                    '<p>返现总额 : {rule.batchAmount} 返现次数 : {rule.count} </p>' +
                    '</tpl>' +
                    '<p>是否新手卡 : {newAccount} </p>' +
                    '</div>'
            }]
        }]
    }],
    buttons: [{
        text: '取消',
        handler: function() {
            this.up('window').close();
        }
    }, {
        itemId: 'submit',
        text: '确定'
    }]
});
