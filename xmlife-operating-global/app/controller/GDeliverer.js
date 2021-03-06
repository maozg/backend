Ext.define('XMLifeOperating.controller.GDeliverer', {
    extend: 'Ext.app.Controller',
    views: ['staffManage.deliverer.GDelivererList',
        'staffManage.deliverer.GDelivererEdit',
        'staffManage.deliverer.GDealDelivererHistoryList',
        'staffManage.deliverer.GDelivererWorkTimeList',
        'staffManage.deliverer.GDealItemsListDeliverer'
    ],

    stores: ['Deliverer',
        'ShopArea',
        'DealDelivererHistory',
        'DelivererWorkTime'
    ],

    models: ['Deliverer',
        'ShopArea',
        'DealDelivererHistory',
        'DelivererWorkTime'
    ],

    refs: [{
            ref: 'gDelivererList',
            selector: 'gDelivererList',
            xtype: 'gDelivererList',
            autoCreate: true
        }, {
            ref: 'gDelivererEdit',
            selector: 'gDelivererEdit',
            xtype: 'gDelivererEdit',
            autoCreate: true
        }, {
            ref: 'shopArea',
            selector: '#shopArea'
        }, {
            ref: 'gDealDelivererHistoryList',
            selector: 'gDealDelivererHistoryList',
            xtype: 'gDealDelivererHistoryList',
            autoCreate: true
        }, {
            ref: 'gDelivererWorkTimeList',
            selector: 'gDelivererWorkTimeList',
            xtype: 'gDelivererWorkTimeList',
            autoCreate: true
        }, {
            ref: 'gDealItemsListDeliverer',
            selector: 'gDealItemsListDeliverer',
            xtype: 'gDealItemsListDeliverer',
            autoCreate: true
        },{
            ref: 'contentPanel',
            selector: '#contentPanel',
            xtype: 'panel'
        }
    ],
    
    init: function() {
        var me = this,
            isActive = true,
            isUnbind = true,
            activeTab = null;

        this.control({
            'gDelivererList': {
                added: me.onShow,
                // 接收自定义事件，处理进入或关闭二级面板时显示
                setActive: function() {
                    var content = this.getContentPanel(),
                        isExist = false;
                        
                    Ext.each(content.items.items, function(item) {
                        if (activeTab.id === item.id) {
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        content.add(activeTab);
                    }
                    content.setActiveTab(activeTab);
                }
            },
            'gDelivererList #shopArea': {
                select: function(combo) {
                    var store = this.getDelivererStore();
                    var activeSearch = Ext.getCmp('gDelivererList').down('#activeSearch').getText();
                    if (activeSearch == '查看停单买手') {
                        isActive = true;
                    } else if (activeSearch == '查看接单买手') {
                        isActive = false;
                    }
                    isUnbind = true;
                    store.getProxy().extraParams = {
                        city: XMLifeOperating.generic.Global.currentCity,
                        area: combo.getValue(),
                        isActive: isActive
                    };
                    store.on('load', function() {
                        Ext.getCmp('gDelivererList').down('#activeBind').setText('查看未绑定的快递员');
                    })
                    store.loadPage(1);
                }
            },
            //查看中心下暂停或接单快递员
            'gDelivererList #activeSearch': {
                click: function() {
                    var activeSearch = Ext.getCmp('gDelivererList').down('#activeSearch').getText();
                    if (activeSearch == '查看停单快递员') {
                        activeSearch = '查看接单快递员';
                        isActive = false;
                        isUnbind = '';
                    } else if (activeSearch == '查看接单快递员') {
                        activeSearch = '查看停单快递员';
                        isActive = true;
                        isUnbind = true;
                    }
                    var store = me.getDelivererStore();
                    store.getProxy().extraParams = {
                        city: XMLifeOperating.generic.Global.currentCity,
                        area: me.getShopArea().getValue(),
                        isActive: isActive
                    };
                    store.loadPage(1);
                    store.on('load', function() {
                        Ext.getCmp('gDelivererList').down('#activeSearch').setText(activeSearch);
                        Ext.getCmp('gDelivererList').down('#activeBind').setText('查看未绑定的快递员');
                        me.getGDelivererList().down('#searchDelivererKeyWords').setValue('');
                    })
                }
            },
            'gDelivererList #activeBind': {
                click: function(grid) {
                    //Ext.getCmp('communityList').down('#lineId').setValue('');
                    var activeBindText = Ext.getCmp('gDelivererList').down('#activeBind').getText();
                    if (activeBindText == '查看已绑定的快递员') {
                        activeBindText = '查看未绑定的快递员';
                        isUnbind = '';
                    } else if (activeBindText == '查看未绑定的快递员') {
                        activeBindText = '查看已绑定的快递员';
                        isUnbind = true;
                        Ext.getCmp('gDelivererList').down('#shopArea').setValue('');
                    }
                    var store = this.getDelivererStore();

                    store.getProxy().extraParams = {
                        unbind: isUnbind
                    };
                    store.loadPage(1);
                    store.on('load', function() {
                        Ext.getCmp('gDelivererList').down('#activeBind').setText(activeBindText);
                        Ext.getCmp('gDelivererList').down('#activeSearch').setText('查看停单快递员');
                        me.getGDelivererList().down('#searchDelivererKeyWords').setValue('');
                    })
                }
            },
            'gDelivererList #add': {
                click: me.onAdd
            },
            'gDelivererList #delivererEditId': {
                click: me.onEdit
            },
            'gDelivererEdit #save-deliverer-edit-btn': {
                click: me.saveEditWindow
            },
            'gDelivererEdit filefield[name="delivererUploadfile"]': {
                change: function(uploadfile) {
                    var form = uploadfile.ownerCt;

                    var hash = uploadfile.previousNode().previousNode();

                    uploadImage(form, hash);
                }
            },
            //历史订单
            'gDelivererList #dealDelivererHistoryId': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var deliverer = view.getRecord(view.findTargetByEvent(e)),
                        delivererId = deliverer.get('uid'),
                        dealDelivererHistoryStroe = this.getDealDelivererHistoryStore();

                    dealDelivererHistoryStroe.getProxy().extraParams = {
                        deliverer: delivererId,
                        dayType: 0
                    }
                    dealDelivererHistoryStroe.loadPage(1);

                    var content = this.getContentPanel(),
                        newTab = this.getGDealDelivererHistoryList();

                    content.remove(content.activeTab, false);
                    content.add(newTab);
                    content.setActiveTab(newTab);
                    activeTab = newTab;

                    this.delivererId = delivererId;
                }
            },
            //当关掉子级，变量应重新定位到父级
            'gDealDelivererHistoryList': {
                close: function() {
                    activeTab = this.getGDelivererList();
                }
            },
            'gDealDelivererHistoryList radio[name="dayType"]': {
                change: function(record, newV, oldV) {
                    if (newV == true) {
                        var itemId = record.itemId,
                            str;
                        switch (itemId) {
                            case 'dayType0':
                                str = 0;
                                break;
                            case 'dayType1':
                                str = 1;
                                break;
                            case 'dayType2':
                                str = 2;
                                break;
                            case 'dayType3':
                                str = 3;
                                break;
                            case 'dayType4':
                                str = 4;
                                break;
                            case 'dayType5':
                                str = 5;
                                break;
                            case 'dayType6':
                                str = 6;
                                break;
                            default:
                                str = -1;
                                break;
                        }
                        var dealDelivererHistoryStroe = this.getDealDelivererHistoryStore();
                        var delivererId = this.delivererId;

                        dealDelivererHistoryStroe.getProxy().extraParams = {
                            dayType: str,
                            deliverer: delivererId
                        };
                        dealDelivererHistoryStroe.loadPage(1);

                        this.dayType = str;

                    }
                }
            },
            //返回配送员清单
            'gDealDelivererHistoryList #delivererReturn,gDelivererWorkTimeList #delivererReturn': {
                click: function() {
                    var content = this.getContentPanel(),
                        newTab = this.getGDelivererList();
                        
                    content.remove(content.activeTab, true);
                    content.add(newTab);
                    content.setActiveTab(newTab);
                    activeTab = newTab;
                }
            },
            //考勤管理
            'gDelivererList #delivererWorkTimeId': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var deliverer = view.getRecord(view.findTargetByEvent(e)),
                        delivererId = deliverer.get('uid'),
                        delivererWorkTimeStore = this.getDelivererWorkTimeStore();

                    delivererWorkTimeStore.getProxy().extraParams = {
                        deliverer: delivererId,
                        dayType: 1
                    }
                    delivererWorkTimeStore.loadPage(1);

                    var content = this.getContentPanel(),
                        newTab = this.getGDelivererWorkTimeList();
                        
                    content.remove(content.activeTab, false);
                    content.add(newTab);
                    content.setActiveTab(newTab);
                    activeTab = newTab;

                    this.deliverer = delivererId;
                }
            },
            //当关掉子级，变量应重新定位到父级
            'gDelivererWorkTimeList': {
                close: function() {
                    activeTab = this.getGDelivererList();
                }
            },
            'gDelivererWorkTimeList radio[name="dayType"]': {
                change: function(record, newV, oldV) {
                    if (newV == true) {
                        var itemId = record.itemId,
                            str;
                        switch (itemId) {
                            /* case 'dayType0':
                                str=0;
                                break;
                            case 'dayType1':
                                str=1;
                                break;
                            case 'dayType2':
                                str=2;
                                break;*/
                            case 'dayType3':
                                str = 3;
                                break;
                            case 'dayType4':
                                str = 4;
                                break;
                            case 'dayType5':
                                str = 5;
                                break;
                            case 'dayType6':
                                str = 6;
                                break;
                            default:
                                str = -1;
                                break;
                        }
                        var delivererWorkTimeStore = this.getDelivererWorkTimeStore();
                        var delivererId = this.delivererId;

                        delivererWorkTimeStore.getProxy().extraParams = {
                            deliverer: delivererId,
                            dayType: str
                        }
                        delivererWorkTimeStore.loadPage(1);
                        this.dayType = str;
                    }
                }
            },
            //订单详情
            'gDealDelivererHistoryList #dealItemsId': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var deal = view.getRecord(view.findTargetByEvent(e));
                    var dealBackendId = deal.get('dealBackendId')

                    var dealItemsStore = this.getDealItemsStore();
                    dealItemsStore.load({
                        params: {
                            deal: dealBackendId,
                            dayType: 0
                        }
                    });

                    var content = this.getContentPanel(),
                        newTab = this.getGDealItemsListDeliverer();
                        
                    content.remove(content.activeTab, false);
                    content.add(newTab);
                    content.setActiveTab(newTab);
                    activeTab = newTab;
                }
            },
            //当关掉子级，变量应重新定位到父级
            'gDealItemsListDeliverer': {
                close: function() {
                    activeTab = this.getGDealDelivererHistoryList();
                }
            },
            ///返回历史订单
            'gDealItemsListDeliverer #dealDelivererHistoryListReturn': {
                click: function() {
                    var content = this.getContentPanel(),
                        newTab = this.getGDealDelivererHistoryList();
                        
                    content.remove(content.activeTab, true);
                    content.add(newTab);
                    content.setActiveTab(newTab);
                    activeTab = newTab;
                }
            },
            'gDelivererList #closeOrOpenOrder': {
                click: function(grid, column, rowIndex) {
                    var record = grid.getStore().getAt(rowIndex);

                    var deliverer = record.get('uid');
                    var isActive = record.get('isActive');
                    var url = '';
                    var str = '确认要此操作吗？';
                    if (isActive == true) {
                        str = '确认要暂停配送员接单吗？';
                        isActive = false;
                    } else {
                        str = '确认要恢复配送员接单吗？';
                        isActive = true;
                    }
                    url = 'deliverer/enable';
                    Ext.MessageBox.confirm("选择框", str, function(str) {
                        if (str == 'no') {
                            return;
                        }
                        sendPutRequest(url, {
                            deliverer: deliverer,
                            isActive: isActive
                        }, '操作恢复或暂停配送员接单', '成功操作配送员接单', '操作配送员接单失败', function() {
                            var store = me.getDelivererStore();
                            var activeBindText = Ext.getCmp('gDelivererList').down('#activeBind').getText();
                            var params = '';
                            var searchDelivererKeyWords = me.getGDelivererList().down('#searchDelivererKeyWords').getValue();
                            if (activeBindText == '查看已绑定的快递员' || searchDelivererKeyWords != '') {
                                record.set('isActive', isActive);
                                return;
                            } else {
                                me.fireEvent('refreshView');
                                // var activeSearch = Ext.getCmp('gShopperList').down('#activeSearch').getText();
                                // if (activeSearch == '查看停单买手') {
                                //     isActive=true;
                                // } else if (activeSearch == '查看接单买手') {
                                //     isActive=false;
                                // }
                                // store.load({
                                //     params: {
                                //         city: XMLifeOperating.generic.Global.currentCity,
                                //         area: me.getShopArea().getValue(),
                                //         isActive: isActive
                                //     },
                                //     callback: function() {
                                //         Ext.getCmp('gShopperList').down('#activeBind').setText('查看未绑定的买手');
                                //     }
                                // });
                            }
                        });
                    });
                }
            },
            'gDelivererList #searchButton': {
                click: me.searchDeliverer
            }

        });
    },
    searchDeliverer: function() {
        var me = this,
            keyWords = me.getGDelivererList().down('#searchDelivererKeyWords').getValue(),
            store = this.getDelivererStore(),
            view = this.getGDelivererList();

        var activeBindText = Ext.getCmp('gDelivererList').down('#activeBind').getText();
        if (activeBindText == '查看已绑定的快递员') {
            isUnbind = true
        } else if (activeBindText == '查看未绑定的快递员') {
            isUnbind = ' ';
        }
        if (keyWords == '') {
            store.getProxy().extraParams = {
                unbind: isUnbind
            };
        } else {
            store.getProxy().extraParams = {
                nameOrPhone: keyWords
            };
        }
        store.loadPage(1);
    },
    onShow: function() {
        /*var store = this.getDelivererStore();
        store.load({
            params: {
                unbind: true
            },
            callback: function() {
                Ext.getCmp('gDelivererList').down('#activeBind').setText('查看已绑定的快递员');
                Ext.getCmp('gDelivererList').down('#shopArea').setValue('');
            }
        });*/

    },
    onAdd: function() {
        var cClass = this.getDelivererModel();
        var deliverer = new cClass();
        var win = this.getGDelivererEdit();
        win.down('form').loadRecord(deliverer);
        win.show();
    },
    onEdit: function(view, rowIndex, colIndex, column, e) {

        var deliverer = view.getRecord(view.findTargetByEvent(e));
        var win = this.getGDelivererEdit();
        var record = deliverer;
        var leftOnlineTime = Math.floor(record.get('onlineTime') / 60) < 10 ? '0' + Math.floor(record.get('onlineTime') / 60) : Math.floor(record.get('onlineTime') / 60);
        var rightOnlineTime = record.get('onlineTime') % 60 < 10 ? '0' + record.get('onlineTime') % 60 : record.get('onlineTime') % 60;
        var leftOfflineTime = Math.floor(record.get('offlineTime') / 60) < 10 ? '0' + Math.floor(record.get('offlineTime') / 60) : Math.floor(record.get('offlineTime') / 60);
        var rightOfflineTime = record.get('offlineTime') % 60 < 10 ? '0' + record.get('offlineTime') % 60 : record.get('offlineTime') % 60;
        var onlineTime = leftOnlineTime + ':' + rightOnlineTime;
        var offlineTime = leftOfflineTime + ':' + rightOfflineTime;
        // record.set('onlineTime', onlineTime);
        // record.set('offlineTime', offlineTime);
        win.down('form').loadRecord(record);
        win.down('[name=onlineTime]').setValue(onlineTime);
        win.down('[name=offlineTime]').setValue(offlineTime);
        win.down('[name=pwd]').setValue('');
        win.show();
    },
    saveEditWindow: function() {
        var editWindow = this.getGDelivererEdit(),
            windowEl = editWindow.getEl(),
            form = editWindow.down('form').getForm(),
            deliverer = form.getRecord(),
            me = this;
        if (form.isValid()) {

            windowEl.mask('saving');
            form.updateRecord(deliverer);

            deliverer.set('onlineTime', (deliverer.get('onlineTime').getHours() * 60 + deliverer.get('onlineTime').getMinutes()));
            deliverer.set('offlineTime', (deliverer.get('offlineTime').getHours() * 60 + deliverer.get('offlineTime').getMinutes()));
            var pwd = editWindow.down('[name=pwd]').getValue();
            pwd = pwd.replace(/(^\s+)|(\s+$)/g,"");
            if(pwd!=''){
                deliverer.set('pwd', hex_md5(pwd));
            }
            

            if (deliverer.get('id') != null && deliverer.get('id') != '') {
                var url = 'deliverer/' + deliverer.get('uid')
                sendPutRequest(url, {
                    name: deliverer.get('name'),
                    pwd: deliverer.get('pwd'),
                    title: deliverer.get('title'),
                    gender: deliverer.get('gender'),
                    idcard: deliverer.get('idcard'),
                    phone: deliverer.get('phone'),
                    onlineTime: deliverer.get('onlineTime'),
                    offlineTime: deliverer.get('offlineTime'),
                    avatar: deliverer.get('avatar'),
                }, '编辑配送员', '成功编辑配送员', '编辑配送员失败', function() {
                    windowEl.unmask();
                    editWindow.close();
                    me.fireEvent('refreshView');
                });
                return;
            }
            deliverer.save({
                success: function(task, operation) {
                    windowEl.unmask();
                    editWindow.close();
                    me.fireEvent('refreshView');
                },
                failure: function(task, operation) {

                    var error = operation.getError(),
                        msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                    Ext.MessageBox.show({
                        title: 'Edit Task Failed',
                        msg: msg,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                    windowEl.unmask();
                }
            })
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors');
        }
    },
});