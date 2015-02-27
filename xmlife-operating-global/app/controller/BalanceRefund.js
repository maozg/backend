Ext.define('XMLifeOperating.controller.BalanceRefund', {
    extend: 'Ext.app.Controller',

    views: ['refundManage.balanceRefund.BalanceRefundList'],

    stores: ['BalanceRefund'],

    models: ['Refund'],

    refs: [{
        ref: 'balanceRefundList',
        selector: 'balanceRefundList',
        xtype: 'balanceRefundList',
        autoCreate: true
    }],

    init: function() {
        var self = this;
        this.selectObjList = [];

        self.control({
            'balanceRefundList': {
                added: self.rendenBalanceRefundList,
                afterrender: function(thisObj) {
                    sm = thisObj.getSelectionModel();
                    self.sm = sm;
                    sm.on('selectionchange', self.selectChange, self);
                }
            },
            'balanceRefundList button[name=today]': {
                click: function(ele) {
                    var RefundList = this.getBalanceRefundList(),
                        beginTime = RefundList.down('[name=beginTime]'),
                        endTime = RefundList.down('[name=endTime]'),
                        date = new Date();
                    beginTime.setValue(date);
                    endTime.setValue(date);
                    self.onCleanSearch(RefundList);
                }
            },
            'balanceRefundList button[name=yesterday]': {
                click: function(ele) {
                    var RefundList = this.getBalanceRefundList(),
                        beginTime = RefundList.down('[name=beginTime]'),
                        endTime = RefundList.down('[name=endTime]');
                    beginTime.setValue(new Date(+new Date() - 86400000));
                    endTime.setValue(new Date(+new Date() - 86400000));
                    self.onCleanSearch(RefundList);
                }
            },
            'balanceRefundList button[name=oldSevenDay]': {
                click: function(ele) {
                    var RefundList = this.getBalanceRefundList(),
                        beginTime = RefundList.down('[name=beginTime]'),
                        endTime = RefundList.down('[name=endTime]');
                    beginTime.setValue(new Date(+new Date() - 604800000));
                    endTime.setValue(new Date());
                    self.onCleanSearch(RefundList);
                }
            },
            'balanceRefundList button[name=oldMonth]': {
                click: function(ele) {
                    var RefundList = this.getBalanceRefundList(),
                        beginTime = RefundList.down('[name=beginTime]'),
                        endTime = RefundList.down('[name=endTime]');
                    beginTime.setValue(new Date(+new Date() - 2592000000));
                    endTime.setValue(new Date());
                    self.onCleanSearch(RefundList);
                }
            },
            'balanceRefundList #gStatusCombo': {
                change: function(grid, value) {
                    self.onCleanSearch(this.getBalanceRefundList());
                    self.rendenBalanceRefundList(this.getBalanceRefundList());
                }
            },
            'balanceRefundList datefield': {
                change: function() {
                    self.onCleanSearch(this.getBalanceRefundList());
                    self.rendenBalanceRefundList(this.getBalanceRefundList());
                }
            },
            'balanceRefundList #dealDetailRefund': {
                click: function() {
                    // 这里引用了订单管理的control方法
                    var ctrlGDealList = this.getController('GDealList');
                    ctrlGDealList.onDealDetail.apply(ctrlGDealList, arguments);
                }
            },
            'balanceRefundList button[name=allSelect]': {
                click: function() {
                    self.sm.selectAll();
                }
            },
            'balanceRefundList button[name=reverseAllSelect]': {
                click: function() {
                    self.sm.deselectAll();
                }
            },
            'balanceRefundList button[name=reverseSelect]': {
                click: function() {}
            },
            'balanceRefundList button[name=disAgreeRefund]': {
                click: function() {
                    var idObj = self.getBalanceRefundIdList({
                        type: 'disagree'
                    });
                    if(idObj){
                        Ext.MessageBox.confirm(
                            '拒绝退款',
                            Ext.String.format("共选中'{0}'笔退款总金额'{1}'元", self.sm.getCount(),idObj.amountTotal),
                            function(result) {
                                if (result == 'yes') {
                                   sendPutRequest('refund/refuse', {
                                        ids: idObj.idList
                                    }, '', '', '', function(response) {
                                        if (response.responseText == 1) {
                                            Ext.Msg.alert('提示', '成功拒绝' + self.sm.getCount() + '条退款记录');
                                        }
                                        self.rendenBalanceRefundList(self.getBalanceRefundList());
                                    }, function() {});
                                }
                            }
                        );
                    }
                }
            },
            'balanceRefundList button[name=agreeRefund]': {
                click: function() {
                    var idObj = self.getBalanceRefundIdList({
                        type: 'agree'
                    });
                    if(idObj){
                        Ext.MessageBox.confirm(
                            '同意退款',
                            Ext.String.format("共选中'{0}'笔退款总金额'{1}'元", self.sm.getCount(),idObj.amountTotal),
                            function(result) {
                                if (result == 'yes') {
                                    sendPutRequest('refund/' + idObj.refundType, {
                                        ids: idObj.idList
                                    }, '', '', '', function(response) {
                                        if (response.responseText == 1) {
                                            Ext.Msg.alert('提示', '成功同意' + self.sm.getCount() + '条退款记录');
                                            self.rendenBalanceRefundList(self.getBalanceRefundList());
                                        }
                                    }, function() {});
                                   
                                }
                            }
                        );
                    }
                }
            },

            'balanceRefundList button[name=searchDeal]': {
                click: function() {
                    self.onSearchDeal();
                }
            }
        });
    },
    rendenBalanceRefundList: function(grid) {
        var beginTime = grid.down('[name=beginTime]').rawValue,
            endTime = grid.down('[name=endTime]').rawValue,
            //refundType = grid.down('#refundTypeCombo').getValue(),
            refundType = 'BALANCE',
            status = grid.down('#gStatusCombo').getValue(),
            store = grid.store;
        store.getProxy().extraParams = {
            beginTime: beginTime,
            endTime: endTime,
            refundType: refundType || '',
            status: status || 0
        };
        //this.storeFilter();
        store.loadPage(1);
        switch (status) {
            case '0':
                grid.down('#manualHandingId').setVisible(false);
                grid.down('#refundFailureId').setVisible(false);
                grid.down('#pengdingId').setVisible(true);
                grid.down('#manualHandingIntrId').setVisible(false);
                grid.down('#handledId').setVisible(false);
                grid.down('#checkAllId').setVisible(true);
                break;
            case '1-4':
                grid.down('#manualHandingId').setVisible(false);
                grid.down('#refundFailureId').setVisible(false);
                grid.down('#pengdingId').setVisible(false);
                grid.down('#manualHandingIntrId').setVisible(false);
                grid.down('#handledId').setVisible(true);
                break;
            case '2':
                grid.down('#manualHandingId').setVisible(false);
                grid.down('#refundFailureId').setVisible(true);
                grid.down('#pengdingId').setVisible(false);
                grid.down('#manualHandingIntrId').setVisible(false);
                grid.down('#handledId').setVisible(false);
                grid.down('#checkAllId').setVisible(true);
                break;
            case '3':
                grid.down('#manualHandingId').setVisible(true);
                grid.down('#refundFailureId').setVisible(false);
                grid.down('#pengdingId').setVisible(false);
                grid.down('#manualHandingIntrId').setVisible(true);
                grid.down('#handledId').setVisible(false);
                break;
            default:
                grid.down('#manualHandingId').setVisible(false);
                grid.down('#refundFailureId').setVisible(false);
                grid.down('#pengdingId').setVisible(true);
                grid.down('#manualHandingIntrId').setVisible(false);
                grid.down('#handledId').setVisible(false);
                grid.down('#checkAllId').setVisible(true);
                break;
        }
    },
    selectChange: function(obj, objList) {
        this.selectObjList = objList;
    },
    getBalanceRefundIdList: function(typeObj) {
        var list = this.selectObjList,
            idObj = {},
            idList = [],
            isSameType = true,
            oldRefundType = '',
            amountTotal = 0;

        if(this.sm.getCount() === 0){
            Ext.Msg.alert('提示', '很抱歉，没有退款记录，请选择！');
            return;
        } 

        Ext.Array.each(list, function(v, k) {
            if (k === 0) {
                oldRefundType = v.data.refundType;
            }
            if (v.data.refundType != oldRefundType) {
                isSameType = false;
            }
            idList.push(v.data.id);
            amountTotal += v.data.amount;
        });

        idObj.refundType = oldRefundType.toLowerCase();
        idObj.idList = idList;
        idObj.amountTotal = amountTotal/100;

        if (!isSameType) {
            Ext.Msg.alert('提示', '批量退款时<br/>请选择相同类型的退款方式');
        }
        if (typeObj.type == 'agree') {
            return isSameType ? idObj : isSameType;
        } else if (typeObj.type == 'disagree') {
            return idObj;
        } else {
            return idObj;
        }
    },

    onSearchDeal: function() {
        var self = this,
            RefundList = this.getBalanceRefundList(),
            SearchInput = RefundList.down('[name=mobileSearch]'),
            mobileOrDealId = SearchInput.getValue(),
            store = self.getBalanceRefundStore(),
            refundTypeSearch = RefundList.down('[name=refundTypeSearch]').getValue(),
            params = {
                dealId: mobileOrDealId,
                refundType: 'BALANCE'
            };
        if (refundTypeSearch == 'mobile') {
            params = {
                mobile: mobileOrDealId,
                refundType: 'BALANCE'
            };
        }
        store.getProxy().extraParams = params;
        store.load();
    },

    onCleanSearch: function(grid) {
        grid.down('[name=mobileSearch]').setValue('');
        grid.down('[name=refundTypeSearch]').setValue('');
    }
});
