Ext.define('XMLifeOperating.view.couponManage.coupon.CouponEditStep1', {
    extend: 'Ext.window.Window',
    xtype: 'couponEditStep1',

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
    width: 480,
    resizable: false,
    layout: 'fit',
    title: '创建优惠券step1',
    initComponent: function() {
        var couponTypeStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'type'],
            data: [{
                "value": 1,
                "type": '满减券'
            }, {
                "value": 2,
                "type": '打折券'
            }, {
                "value": 3,
                "type": '免运费券'
            }],
        });
        this.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            border: false,
            /*defaults:{
                anchor: '100%'
            },*/
            items: [{
                    xtype: 'textfield',
                    name: 'name',
                    fieldLabel: '名称',
                    labelWidth: 80,
                    allowBlank: false,
                }, {
                    xtype: 'textfield',
                    name: 'desc',
                    fieldLabel: '描述',
                    labelWidth: 80,
                    allowBlank: false,
                }, {
                    fieldLabel: '优惠券类型',
                    labelWidth: 80,
                    itemId: 'couponTypeId',
                    store: couponTypeStore,
                    name: 'type',
                    allowBlank: false,
                    xtype: 'combo',
                    editable: false,
                    queryMode: 'local',
                    triggerAction: 'all',
                    displayField: 'type',
                    valueField: 'value',
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'column',
                    style: 'margin-top:3px;margin-bottom:5px;',
                    items: [{
                        xtype: 'displayfield',
                        value: '满',
                        itemId: 'couponCost_m',
                        style: 'margin-right:5px'
                    }, {
                        xtype: 'textfield',
                        name: 'benchMark',
                        width: 50,
                        labelWidth: 90,
                        itemId: 'couponCost_my'
                    }, {
                        xtype: 'displayfield',
                        value: '元',
                        style: 'margin-left:5px',
                        itemId: 'couponCost_y'

                    }, {
                        xtype: 'displayfield',
                        value: '打',
                        style: 'margin:0 5px',
                        itemId: 'couponCost_d'
                    }, {
                        xtype: 'textfield',
                        name: 'discountValue',
                        width: 50,
                        labelWidth: 90,
                        itemId: 'couponCost_dz'
                    }, {
                        xtype: 'displayfield',
                        value: '折',
                        style: 'margin:0 10px',
                        itemId: 'couponCost_z'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '优惠券价值',
                        name: 'value',
                        width: 200,
                        labelWidth: 80,
                        allowBlank: false,
                        labelAlign: 'left',
                        itemId: 'couponCost_v'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'column',
                    style: 'margin-top:3px;margin-bottom:5px;',
                    itemId: 'maxDiscountTextId',
                    items: [{
                        xtype: 'displayfield',
                        value: '最多优惠',
                        style: 'margin-right:5px'
                    }, {
                        xtype: 'numberfield',
                        width: 50,
                        name: 'maxDiscount',
                        value: 50,
                        maxValue: 300,
                        minValue: 0
                    }, {
                        xtype: 'displayfield',
                        value: '元',
                        style: 'margin-left:5px'
                    }, {
                        xtype: 'displayfield',
                        value: '默认50，上限300',
                        style: 'margin:0 5px'
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'id',
                    fieldLabel: '优惠券ID',
                    labelWidth: 80,
                    readOnly: true,
                    value: '121212',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'groupId',
                    fieldLabel: '所属卡包',
                    labelWidth: 80,
                    readOnly: true,
                    value: '杭州奇怪大礼包9',
                    hidden: true
                }, {
                    layout: 'hbox',
                    xtype: 'fieldset',
                    border: false,
                    padding: 0,
                    items: [{
                        xtype: 'checkbox',
                        itemId: 'isNewId',
                        name: 'isNew',
                        allowBlank: false,
                        disabled: false,
                        style: 'margin:2px 10px 0 0',
                        handler: function(value, record) {
                            var existAtSameTime = Ext.ComponentQuery.query('#existAtSameTime')[0];
                            var existAtSameTimeUnit = Ext.ComponentQuery.query('#existAtSameTimeUnit')[0];
                            var globalUserCouponNumHold = Ext.ComponentQuery.query('[name=globalUserCouponNumHold]')[0];
                            var userDailyCouponNumHold = Ext.ComponentQuery.query('[name=userDailyCouponNumHold]')[0];
                            if (value.getValue()) {
                                existAtSameTime.setVisible(false);
                                existAtSameTimeUnit.setVisible(false);
                                existAtSameTime.allowBlank = true;
                                existAtSameTime.setValue(1);
                                globalUserCouponNumHold.setDisabled(true);
                                globalUserCouponNumHold.setValue(1);
                                userDailyCouponNumHold.setDisabled(true);
                                userDailyCouponNumHold.setValue(1);
                            } else {
                                existAtSameTime.setVisible(true);
                                existAtSameTimeUnit.setVisible(true);
                                existAtSameTime.allowBlank = false;
                                existAtSameTime.setValue('');
                                globalUserCouponNumHold.setValue('');
                                globalUserCouponNumHold.setDisabled(false);
                                userDailyCouponNumHold.setDisabled(false);
                                userDailyCouponNumHold.setValue('');
                            }
                        }
                    }, {
                        xtype: 'text',
                        text: '标记为新手优惠券',
                        textAlign: 'left',
                        style: 'margin:5px 10px 0 8px'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'column',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'existAtSameTime',
                        name: 'maxCouponNumHold',
                        fieldLabel: '可同时存在',
                        labelSeparator: '',
                        style: 'margin-left:7px',
                        labelWidth: 60,
                        minWidth: 120,
                        maxWidth: 120,
                        allowBlank: false,
                        style: 'line-height:25px;'
                    }, {
                        xtype: 'text',
                        itemId: 'existAtSameTimeUnit',
                        text: '张',
                        textAlign: 'left',
                        style: 'margin:5px 0 0 8px'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'column',
                    style: 'margin-top:3px;margin-bottom:5px;',
                    items: [{
                        xtype: 'displayfield',
                        value: '全局有效期:',
                        width: 80,
                    }, {
                        xtype: 'datefield',
                        name: 'expireStartDate',
                        emptyText: '开始时间',
                        value: new Date(),
                        format: 'Y-m-d H:i:s',
                        width: 150,
                        allowBlank: false,
                    }, {
                        xtype: 'displayfield',
                        value: '到',
                        style: 'margin:0 5px'
                    }, {
                        xtype: 'datefield',
                        name: 'expireEndDate',
                        emptyText: '结束时间',
                        value: new Date(),
                        format: 'Y-m-d H:i:s',
                        width: 150,
                        allowBlank: false,
                        listeners: {
                            select: function () {
                                this.setValue(new Date(arguments[1].getTime()+  86399000 ));
                            }
                        }
                    }]
                }, {
                    xtype: 'displayfield',
                    value: '生效时间',
                }, {
                    xtype: 'container',
                    layout: 'column',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '获得后',
                        name: 'delayUseStartHours',
                        width: 120,
                        labelWidth: 60,
                    }, {
                        xtype: 'displayfield',
                        value: '小时',
                        style: 'margin:0 5px'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '到获得后',
                        name: 'delayUseEndHours',
                        width: 120,
                        labelWidth: 60,
                        style: 'margin-left:10px;',
                    }, {
                        xtype: 'displayfield',
                        value: '小时',
                        style: 'margin:0 5px'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'column',
                    style: 'margin-top:10px;',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '全局总共可领',
                        name: 'globalCouponNum',
                        width: 150,
                        labelWidth: 80,
                        allowBlank: false,
                    }, {
                        xtype: 'text',
                        text: '张',
                        textAlign: 'left',
                        style: 'margin:5px 0 0 8px'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '全局每天可领',
                        name: 'globalDailyCouponNum',
                        width: 150,
                        labelWidth: 80,
                        allowBlank: false,
                        style: 'margin-left:10px;',
                    }, {
                        xtype: 'text',

                        text: '张',
                        textAlign: 'left',
                        style: 'margin:5px 0 0 8px'
                    }]
                }, {
                    xtype: 'container',
                    layout: 'column',
                    style: 'margin-top:10px;',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '每人终身可领',
                        name: 'globalUserCouponNumHold',
                        width: 150,
                        labelWidth: 80,
                        allowBlank: false,
                    }, {
                        xtype: 'text',

                        text: '张',
                        textAlign: 'left',
                        style: 'margin:5px 0 0 8px'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '每人每天可领',
                        name: 'userDailyCouponNumHold',
                        width: 150,
                        labelWidth: 80,
                        allowBlank: false,
                        style: 'margin-left:10px;',
                    }, {
                        xtype: 'text',

                        text: '张',
                        textAlign: 'left',
                        style: 'margin:5px 0 0 8px'
                    }]
                },





            ],
            buttons: [{
                    text: '下一步',
                    itemId: 'nextButton'
                },

            ]
        }]

        this.callParent(arguments);

    }


});
