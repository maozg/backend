Ext.define('XMLifeOperating.controller.Shop', {
    extend: 'Ext.app.Controller',

    views: [
        'centralPointManage.shop.ShopList',
        'centralPointManage.shop.ShopAdd',
        'centralPointManage.shop.ShopBanner',
        'centralPointManage.shop.ShopBannerAdd',
        'centralPointManage.shop.ShopEdit',
        'centralPointManage.shop.ShopTab',
        'centralPointManage.shop.ShopShelf',
        'centralPointManage.shop.ShopShelfAdd',
        'centralPointManage.shop.ShopShelfTab',
        'centralPointManage.shop.ShopProduct',
        'centralPointManage.shop.ShopSecondShelf',
        'centralPointManage.shop.ShopSecondShelfAdd',
        'centralPointManage.shop.ShopProductAdd',
        'centralPointManage.shop.ShopProductEdit',
        'centralPointManage.shop.ShopBuyer',
        'centralPointManage.shop.ShopProductSoldOut',
        'centralPointManage.shop.ShopProductOffLine',
        'centralPointManage.shop.ShopProductSearch',
        'centralPointManage.shop.ShopProductSearchEdit'
    ],

    stores: [
        'Shop',
        'Shopper',
        'ShopBannerTemplate',
        'ShopCategories',
        'CategoryRoots',
        'Product',
        'CategorySubs',
        'ProductTemplate',
        'ProductSearch'
        // 'Buyer',
        // 'Shelves',
        // 'Template',
        // 'BuyerSearch'
    ],

    models: [
        'Shop',
        'Shopper',
        'ShopBannerTemplate',
        'ShopCategories',
        'CategoryRoots',
        'Product',
        'CategorySubs',
        'ProductTemplate',
        'ProductSearch'
        // 'Template',
        // 'Buyer',
        // 'Template',
        // 'ShopBannerTemplate',
        // 'BuyerSearch'
    ],
    /*
      @param selector  widget.XX
      @param ref       this.getXXX()
      @param xtype     类型
      */
    refs: [{
            ref: 'shopList',
            selector: 'shoplist',
            xtype: 'shoplist',
            autoCreate: true
        }, {
            ref: 'shopAdd',
            selector: 'shopadd',
            xtype: 'shopadd',
            autoCreate: true
        }, {
            ref: 'contentPanel',
            selector: '#contentPanel',
            xtype: 'panel'
        }, {
            ref: 'shopBanner',
            selector: 'shopbanner',
            xtype: 'shopbanner',
            autoCreate: true
        }, {
            ref: 'shopBannerAdd',
            selector: 'shopbanneradd',
            xtype: 'shopbanneradd',
            autoCreate: true
        }, {
            ref: 'shopEdit',
            selector: 'shopedit',
            xtype: 'shopedit',
            autoCreate: true
        }, {
            ref: 'shopTab',
            selector: 'shoptab',
            xtype: 'shoptab',
            autoCreate: true
        }, {
            ref: 'shopShelfTab',
            selector: 'shopshelftab',
            xtype: 'shopshelftab',
            autoCreate: true
        }, {
            ref: 'shopShelfAdd',
            selector: 'shopshelfadd',
            xtype: 'shopshelfadd',
            autoCreate: true
        }, {

            ref: 'shopSecondShelfAdd',
            selector: 'shopsecondshelfadd',
            xtype: 'shopsecondshelfadd',
            autoCreate: true
        }, {
            ref: 'shopProductAdd',
            selector: 'shopproductadd',
            xtype: 'shopproductadd',
            autoCreate: true
        }, {
            ref: 'shopProductEdit',
            selector: 'shopproductedit',
            xtype: 'shopproductedit',
            autoCreate: true
        }, {
            ref: 'shopBuyer',
            selector: 'shopbuyer',
            xtype: 'shopbuyer',
            autoCreate: true
        }, {
            ref: 'keywordProductTemplate',
            selector: '#keywordProductTemplate',
        }, {
            ref: 'keywordBuyer',
            selector: '#keywordBuyer',
        }, {
            ref: 'shopProductSearch',
            selector: 'shopproductsearch',
            xtype: 'shopproductsearch'
        }, {
            ref: 'shopProductSearchEdit',
            selector: 'shopproductsearchedit',
            xtype: 'shopproductsearchedit',
            autoCreate: true
        }
        // {
        //     ref: 'editWindow',
        //     selector: 'editShopStore',
        //     xtype: 'editShopStore',
        //     autoCreate: true
        // }, {
        //     ref: 'keywordBuyer',
        //     selector: '#keywordBuyer',
        // }
    ],
    init: function() {
        var me = this,
            isSuccess = true;
        this.control({
            'shoplist #shopArea': {
                select: function(combo) {
                    var dstore = me.getShopStore();
                    dstore.getProxy().extraParams = {
                        city: XMLifeOperating.generic.Global.currentCity,
                        areaId: combo.getValue()
                    }
                    dstore.loadPage(1, {
                        params: {
                            start: 0,
                            limit: 25,
                            page: 1
                        }
                    });
                    this.areaId = combo.getValue();
                }
            },
            /*
             *shoplist事件
             */
            'shoplist #add': {
                click: function() {
                    var cClass = this.getShopModel();
                    var shop = new cClass();
                    var win = this.getShopAdd();
                    win.down('#shopeditform').getForm().reset()
                    win.down('#shopeditform').loadRecord(shop);
                    win.show();
                }
            },
            'shoplist #seeBannerBtn': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var tab = this.getShopBanner();
                    var content = this.getContentPanel();
                    content.removeAll(false);
                    var record = view.getRecord(view.findTargetByEvent(e));
                    var shopStoreId = record.get('id');
                    var banners = record.get('banners');
                    var shopStoreBannerStore = this.getShopBannerTemplateStore();
                    shopStoreBannerStore.removeAll();
                    if (banners) {
                        for (var i = 0, length = banners.length; i < length; i++) {
                            shopStoreBannerStore.add(banners[i]);
                        }
                    };
                    content.add(tab);
                    this.shopId = shopStoreId;
                }
            },
            'shoplist #seeCategoryBtn': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var me = this;
                    var tab = this.getShopShelfTab();
                    me.closeAllTabs();
                    tab.setActiveTab('tab2');
                    var content = this.getContentPanel();
                    content.removeAll(false);
                    var record = view.getRecord(view.findTargetByEvent(e));
                    var shopId = record.get('id');
                    tab.getActiveTab().setTitle(record.get('name') + '一级货架');
                    me.showCategoryRootsList(shopId);
                    content.add(tab);
                    this.shopId = shopId;
                    this.tabIdStr = 'tab2_' + shopId;
                }
            },
            'shoplist #closeOrOpenShopStore': {
                click: function(grid, column, rowIndex) {
                    var me = this;
                    var record = grid.getStore().getAt(rowIndex);
                    var status = record.get('status');
                    var shopId = record.get('id');
                    var url = '';
                    var str = '确认要此操作吗？';
                    if (status == 0) {
                        url = 'shop/open';
                        str = '确认要开启该店铺吗？';
                    } else if (status == 1) {
                        url = 'shop/close';
                        str = '确认要关闭该店铺吗？';
                    }
                    Ext.MessageBox.confirm("选择框", str, function(str) {
                        if (str != 'yes') {
                            return;
                        }
                        sendPutRequest(url, {
                            id: shopId
                        }, '店铺开启或关闭', '成功操作店铺', '操作店铺失败', function() {
                            me.showShopList();
                        });

                    });

                }
            },
            'shoplist #shopperCountId': {
                //弹出入住买手window
                click: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(colIndex);
                    var win = this.getShopBuyer();
                    win.down('form').loadRecord(record);
                    win.show();
                    var store = this.getShopperStore();
                    var storeCount = store.getCount();
                    store.removeAll();
                    store.getProxy().extraParams = {
                        shopId: record.get('id')
                    }
                    store.load({
                        callback: function(records) {
                            if ((records.length == 1) && (records[0].get('uid') == '')) {
                                store.remove(store.getAt(0));
                            }
                            //初始化打勾
                            var model = Ext.ComponentQuery.query('#bindShopWithShopper')[0].getSelectionModel();
                            model.deselectAll();
                            for (var i = 0; i < records.length; i++) {
                                var index = store.indexOfId(records[i].get('id'));
                                model.select(index, true);
                            }
                        }
                    });
                }
            },
            'shoplist #modifyShopList': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var tab = this.getShopEdit();
                    var record = view.getRecord(view.findTargetByEvent(e));
                    this.record = record;
                    var shopInfoForm = tab;
                    var form = shopInfoForm.down('form');
                    this.record.set('shopBannerTemplateId', this.record.get('templateName'));
                    var leftOpenTime = Math.floor(this.record.get('openTime') / 60) < 10 ? '0' + Math.floor(this.record.get('openTime') / 60) : Math.floor(this.record.get('openTime') / 60);
                    var rightOpenTime = this.record.get('openTime') % 60 < 10 ? '0' + this.record.get('openTime') % 60 : this.record.get('openTime') % 60;
                    var leftCloseTime = Math.floor(this.record.get('closeTime') / 60) < 10 ? '0' + Math.floor(this.record.get('closeTime') / 60) : Math.floor(this.record.get('closeTime') / 60);
                    var rightCloseTime = this.record.get('closeTime') % 60 < 10 ? '0' + this.record.get('closeTime') % 60 : this.record.get('closeTime') % 60;
                    var openTime = leftOpenTime + ':' + rightOpenTime;
                    var closeTime = leftCloseTime + ':' + rightCloseTime;
                    var autoOnline = this.record.get('autoOnline') ? 'true' : 'false';
                    this.record.set('openTimeText', openTime);
                    this.record.set('closeTimeText', closeTime);
                    this.record.set('autoOnline', autoOnline)
                    form.loadRecord(this.record);
                    this.shopId = this.record.raw.id;
                    tab.show();
                }
            },
            //shopadd 事件
            'shopadd #save-shopStore-edit-btn': {
                click: function(button) {
                    var editWindow;
                    var itemId = button.getItemId();
                    editWindow = this.getShopAdd();
                    var windowEl = editWindow.getEl(),
                        form = editWindow.down('#shopeditform').getForm(),
                        shopStore = form.getRecord(),
                        me = this;
                    var jSting, wString;
                    if (form.isValid()) {
                        form.updateRecord(shopStore);
                        //经纬度检验
                        jString = shopStore.get('lng');
                        wString = shopStore.get('lat');
                        var pattern = /(\d{1,3}\.)\d{1,3}/;
                        if (pattern.test(jString) && pattern.test(wString)) {
                            if (jString > 180 || jString < 0) {
                                alert('经度错误');
                                return;
                            }
                            if (wString > 90 || wString < 0) {
                                alert('纬度错误');
                                return;
                            }
                        } else {
                            alert('经纬度格式错误');
                            return
                        }
                        //开始结束时间点检验
                        var openTime = shopStore.get('openTime').getHours() * 60 + shopStore.get('openTime').getMinutes();
                        var closeTime = shopStore.get('closeTime').getHours() * 60 + shopStore.get('closeTime').getMinutes();
                        if (openTime >= closeTime) {
                            alert('请确认结束时间晚于开始时间！');
                            return;
                        }
                        windowEl.mask('saving');
                        shopStore.set('city', XMLifeOperating.generic.Global.currentCity);
                        //var areaIds = [XMLifeOperating.generic.Global.SERVICECENEERID];
                        var areaIds = [this.areaId];
                        var autoOnline = (shopStore.get('autoOnline') == 'false') ? false : true;
                        shopStore.set('areaIds', areaIds);
                        shopStore.set('beCopyedShopId', '123');
                        shopStore.set('autoOnline', autoOnline);
                        shopStore.set('openTime', (shopStore.get('openTime').getHours() * 60 + shopStore.get('openTime').getMinutes()));
                        shopStore.set('closeTime', (shopStore.get('closeTime').getHours() * 60 + shopStore.get('closeTime').getMinutes()));
                        shopStore.save({
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
                        });
                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }
            },
            /*
             * shopbanner事件
             */
            'shopbanner #returnShopStore': {
                click: function() {
                    var me = this;
                    var tab = me.getShopList();
                    me.showShopList();
                    var content = this.getContentPanel();
                    content.removeAll(false);
                    content.add(tab);
                }
            },
            'shopbanner #add': {
                click: function() {
                    var cClass = me.getShopBannerTemplateModel();
                    var ShopStoreBanner = new cClass();
                    var win = this.getShopBannerAdd();
                    win.down('form').loadRecord(ShopStoreBanner);
                    win.show();
                }
            },
            'shopbanner #editShopStoreBanner': {
                click: me.onShopStoreBannerEdit
            },
            'shopbanner #deleteShopStoreBanner': {
                click: me.onShopStoreBannerDelete
            },
            'shopbanneradd #btnSave': {
                click: me.saveEditShopStoreBannerWin
            },
            'shopbanneradd filefield[name="shopStoreBannerUploadfile"]': {
                change: function(uploadfile) {
                    var form = uploadfile.ownerCt;
                    var hash = uploadfile.previousNode().previousNode();
                    uploadImage(form, hash);
                }
            },


            /*
             *Tab事件
             */
            '#shopStoreInfoTab': {
                tabchange: function(tabPanel, newCard, oldCard, eOpts) {
                    var me = this;
                    var tabIdStr = newCard.getItemId();
                    tabIdArray = tabIdStr.split('_');
                    var tabId = tabIdArray[0];
                    var sstore = this.getCategoryRootsStore();
                    var snstore = this.getCategorySubsStore();
                    var sgstore = this.getProductStore();
                    var shopId = this.shopId;
                    this.tabIdStr = tabIdStr;
                    switch (tabId) {
                        case 'tab1': //form
                            break;
                        case 'tab2': //collection一级货架
                            console.log('tab2 shopId:' + shopId);
                            me.showCategoryRootsList(this.shopId);
                            break;
                        case 'tab3': //次级货架
                            me.showCategorySubsList(this.shopId, tabIdArray[1]);

                            break;
                        case 'tab4':
                            //商品
                            me.showProductList(tabIdArray[1]);
                            break;
                        case 'tab5':
                            me.showProductSoldOutOrOffLineList(this.shopId, tabIdArray[1]);
                            break;
                        case 'tab6':
                            me.showProductSearchList(this.shopId);
                            break;

                    }
                }
            },
            /*
             * shopedit事件
             */
            'shopedit #modifyShopStoreInfo': {
                click: function(button) {
                    var editWindow;
                    var itemId = button.getItemId();
                    editWindow = this.getShopEdit();
                    var windowEl = editWindow.getEl(),
                        form = editWindow.down('#shopeditform').getForm(),
                        shopStore = form.getRecord(),
                        me = this;
                    var jStng, wString;
                    if (form.isValid()) {
                        form.updateRecord(shopStore);
                        jString = shopStore.get('lng');
                        wString = shopStore.get('lat');
                        var pattern = /(\d{1,3}\.)\d{1,3}/;
                        if (pattern.test(jString) && pattern.test(wString)) {
                            if (jString > 180 || jString < 0) {
                                alert('经度错误');
                                return;
                            }
                            if (wString > 90 || wString < 0) {
                                alert('纬度错误');
                                return;
                            }
                        } else {
                            alert('经纬度格式错误');
                            return
                        }
                        //开始结束时间点检验
                        var openTime = shopStore.get('openTimeText').getHours() * 60 + shopStore.get('openTimeText').getMinutes();
                        var closeTime = shopStore.get('closeTimeText').getHours() * 60 + shopStore.get('closeTimeText').getMinutes();
                        if (openTime >= closeTime) {
                            alert('请确认结束时间晚于开始时间！');
                            return;
                        }
                        if (openTime == 0 || closeTime == 0) {
                            alert('开店与关店时间不能为零点');
                            return;
                        }
                        windowEl.mask('saving');
                        shopStore.set('city', XMLifeOperating.generic.Global.currentCity);
                        var areaIds = [shopStore.get('areas')[0].areaId];
                        var templateId = this.getShopBannerTemplateStore().data.items.length ? this.getShopBannerTemplateStore().findRecord('id', shopStore.get('shopBannerTemplateId')).getId() : null;
                        var autoOnline = (shopStore.get('autoOnline') == 'false') ? false : true;
                        shopStore.set('areaIds', areaIds);
                        shopStore.set('beCopyedShopId', '123');
                        shopStore.set('autoOnline', autoOnline);
                        shopStore.set('openTime', openTime);
                        shopStore.set('closeTime', closeTime);

                        var requestparams = {
                            id: shopStore.get('id'),
                            name: shopStore.get('name'),
                            openTime: shopStore.get('openTime'),
                            closeTime: shopStore.get('closeTime'),
                            lng: shopStore.get('lng'),
                            lat: shopStore.get('lat'),
                            areaIds: areaIds,
                            address: shopStore.get('address'),
                            shopBannerTemplateId: templateId ? templateId : shopStore.get('templateId'),
                            city: XMLifeOperating.generic.Global.currentCity,
                            autoOnline: shopStore.get('autoOnline'),
                            desc: shopStore.get('desc')
                        };
                        var modifySuccessCallback = function(task, operation) {
                            windowEl.unmask();
                            editWindow.close();
                            me.showShopList();

                            me.getShopStore().load({
                                params: {
                                    city: XMLifeOperating.generic.Global.currentCity,
                                    areaId: me.areaId
                                }
                            });

                        };
                        var modifyFailureCallback = function(task, operation) {
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
                        sendPutRequest('shop/update', requestparams, '编辑模板', '成功编辑模板', '编辑模板失败', modifySuccessCallback, modifyFailureCallback);
                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }
            },
            'shopedit #returnShopBack': {
                click: function(record) {
                    var shopEditWin = this.getShopEdit();
                    var content = this.getContentPanel();
                    var form = shopEditWin.down('#shopeditform').getForm();
                    form.reset();
                    content.removeAll(false);
                    var tabShopStore = this.getShopList();
                    /*var sstore = this.getShopStore();*/
                    me.showShopList();
                    content.add(tabShopStore);
                }
            },
            /*
             * 一级货架(shopshelf)事件
             */
            'shopshelf,shopsecondshelf': {
                itemdblclick: function(grid, record, item, index, e, eOpts) {
                    var toolbar = Ext.getCmp('toolbar');
                    var tab = me.getShopShelfTab();
                    this.record = record;
                    for (var i = 0; i < toolbar.items.length; i++) {
                        if (toolbar.items.keys[i].split('_')[1] == record.get('id')) {
                            tab.setActiveTab(toolbar.items.keys[i])
                            return;
                        }
                    };
                    if (this.record.raw.leaf == true) {
                        Ext.MessageBox.confirm("选择框", "无次级货架,进入商品添加列表页面", function(str) {
                            if (str == 'no') {
                                return;
                            }
                            toolbar.add({
                                title: record.get('name'),
                                id: 'tab4_' + record.get('id'),
                                layout: 'fit',
                                items: {
                                    xtype: 'shopproduct'
                                },
                                closable: true
                            });
                            tab.setActiveTab('tab4_' + record.get('id'));
                        });
                        return;
                    } else {
                        toolbar.add({
                            title: record.get('name'),
                            id: 'tab3_' + record.get('id'),
                            layout: 'fit',
                            items: {
                                xtype: 'shopsecondshelf'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab3_' + record.get('id'));
                    }
                }
            },
            'shopshelf #saveShelvesOrder': {
                click: function() {
                    var store = this.getCategoryRootsStore();
                    var me = this;
                    var data = {

                        ids: []
                    };
                    var success = function(task, operation) {
                        me.showCategoryRootsList(me.shopId);
                    }
                    var failure = function(task, operation) {
                        var error = operation.getError(),
                            msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                        Ext.MessageBox.show({
                            title: 'Edit Task Failed',
                            msg: msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });

                    }
                    store.each(function(e) {
                        data.ids.push(e.data.id)
                    });
                    sendPutRequest('category/reorder', data, '一级货架排序', '排序成功', '排序失败', success, failure);
                }
            },
            'shopshelf #returnShopStore': {
                click: function() {
                    var me = this;
                    var tab = me.getShopList();
                    var shelfTab = me.getShopShelfTab()
                    var items = shelfTab.items.items;
                    me.showShopList();
                    me.closeAllTabs()
                    /*                    for (var i = 0, len = items.length; i < len; i++) {
                        if (items[i].id.search('tab3') != -1) {
                            shelfTab.remove(items[i].id)
                        }
                    }*/
                    var content = this.getContentPanel();
                    content.removeAll(false);
                    content.add(tab);
                }
            },
            'shopshelf #viewAllSoldOutProduct': {
                click: function() {
                    var me = this,
                        shopId = this.shopId,
                        toolbar = Ext.getCmp('toolbar'),
                        tab = me.getShopShelfTab(),
                        shopStore = me.getShopStore();
                    var shop = shopStore.getById(shopId);
                    //下架商品tab切换
                    if (me.tabIsExist('soldout')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '下架商品',
                            id: 'tab5_soldout',
                            layout: 'fit',
                            items: {
                                xtype: 'shopproductsoldout'
                            },
                            closable: true
                        });
                        // me.showProductSoldOutList(this.shopId);
                        tab.setActiveTab('tab5_soldout');
                    }
                }
            },
            'shopshelf #viewAllHiddenProduct': {
                click: function() {
                    var me = this,
                        shopId = this.shopId,
                        toolbar = Ext.getCmp('toolbar'),
                        tab = me.getShopShelfTab(),
                        shopStore = me.getShopStore();
                    var shop = shopStore.getById(shopId);
                    //雪藏商品tab切换
                    if (me.tabIsExist('offline')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '雪藏商品',
                            id: 'tab5_offline',
                            layout: 'fit',
                            items: {
                                xtype: 'shopproductoffline'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab5_offline');
                    }

                }

            },
            'shopshelf #productSearch': {
                click: function() {
                    var me = this;
                    var toolbar = Ext.getCmp('toolbar');
                    var tab = me.getShopShelfTab();
                    var shopAreaId = this.areaId;
                    var shopId = this.shopId;
                    var shopStore = me.getShopStore();
                    var shop = shopStore.getById(shopId);
                    var keyWords = me.getShopShelfTab().down('#keyword').getValue();
                    if (me.tabIsExist('searchProduct')) {
                        return
                    } else {
                        toolbar.add({
                            title: '搜索商品',
                            id: 'tab6_searchProduct',
                            layout: 'fit',
                            items: {
                                xtype: 'shopproductsearch'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab6_searchProduct');
                    }
                }
            },
            'shopproductsoldout #putawayOrOut': {
                click: function(component, column, rowIndex, colIndex, e) {
                    var me = this;
                    var model = component.getStore().getAt(rowIndex);
                    var className = e.target.className;
                    var url = 'product/online';
                    var status = 0; //让商品上架（目前处于售罄状态）
                    var shopId = this.shopId;
                    var success = function(task, operation) {
                        me.showProductSoldOutOrOffLineList(shopId, 'soldout');
                    };
                    var failure = function(task, operation) {
                        var error = operation.getError(),
                            msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                        Ext.MessageBox.show({
                            title: '商品上架失败',
                            msg: msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    };
                    sendPutRequest(url, {
                        productId: model.get('id')
                    }, '上架商品', '上架商品成功', '创建分类失败', success, failure);
                }
            },
            'shopproductoffline #frozen': {
                click: function(component, column, rowIndex, colIndex, e) {
                    var me = this;
                    var model = component.getStore().getAt(rowIndex);
                    var className = e.target.className;
                    var statusValue = Ext.query("." + className)[rowIndex].getAttribute("statusValue");
                    var url = 'product/soldout';
                    var status = 3; //商品下架（目前处于雪藏）
                    var shopId = this.shopId;
                    var success = function(task, operation) {
                        me.showProductSoldOutOrOffLineList(shopId, 'offline');
                    };
                    var failure = function(task, operation) {
                        var error = operation.getError(),
                            msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                        Ext.MessageBox.show({
                            title: '商品取消雪藏失败',
                            msg: msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    };
                    sendPutRequest(url, {
                        productId: model.get('id')
                    }, '取消雪藏商品', '取消雪藏成功', '取消雪藏失败', success, failure);
                }
            },
            'shopproductsearch #putawayOrOut,shopproductsearch #frozen': {
                click: function(component, column, rowIndex, colIndex, e) {
                    var model = component.getStore().getAt(rowIndex);
                    var className = e.target.className;
                    var statusValue = Ext.query("." + className)[rowIndex].getAttribute("statusValue");
                    var url = 'product/' + statusValue;
                    var status;
                    console.log(statusValue)
                    //statusValue为点击事件后商品的状态
                    switch (statusValue) {
                        case 'soldout': //让商品下架（目前处于上架状态）
                            status = 3;
                            break;
                        case 'offline': //让商品雪藏（目前处于未雪藏）
                            status = 1;
                            break;
                        case 'online': //让商品上架（目前处于售罄状态）
                            status = 0;
                            break;
                    }
                    sendPutRequest(url, {
                        productId: model.get('id')
                    }, '', '成功创建分类', '创建分类失败', function() {
                        //me.fireEvent('refreshView');
                        model.set('status', status);
                    });
                }
            },
            'shopproductsearch #openModifyShelvesGoodsWin': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId();
                    var win = this.getShopProductSearchEdit();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '';
                    form.reset();
                    model = component.getStore().getAt(colIndex);
                    limitType = model.get('limitType');
                    limitCount = model.get('limitCount');
                    name = model.get('name');
                    model.set('facePrice', (Math.abs(model.get('fprice') / 100)));
                    model.set('purchasePrice', (Math.abs(model.get('pprice') / 100)));
                    model.set('discountPrice', (Math.abs(model.get('dprice') / 100)));
                    model.set('name', name);
                    if (limitType == 1) {
                        model.set('dayLimitCount', limitCount);
                    } else if (limitType == 2) {
                        model.set('totalLimitCount', limitCount);
                    } else {
                        model.set('dayLimitCount', '');
                        model.set('totalLimitCount', '');
                    }
                    me.openWin(win, model);
                }
            },
            'shopproductsearchedit #editShelvesGoodsWin': {
                click: function() {
                    var editWindow = this.getShopProductSearchEdit(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelvesGoods = form.getRecord(),
                        me = this;
                    var categoryId = shelvesGoods.data.categoryId,
                        limitType = 0,
                        limitCount = 0;
                    var shopId = me.shopId;

                    if (form.isValid()) {
                        form.updateRecord(shelvesGoods);
                        shopId = this.shopId;
                        limitType = form.getValues()['limitType'];
                        if (limitType == 1) {
                            limitCount = form.getValues()['dayLimitCount'];
                        } else if (limitType == 2) {
                            limitCount = form.getValues()['totalLimitCount'];
                        } else {
                            limitType = 0;
                            limitCount = 0;
                        }
                        if (limitCount == 0 || limitCount == null || limitCount == '') {
                            limitType = 0;
                        }
                        var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice') * 100));
                        var discountPrice = shelvesGoods.get('discountPrice');
                        if (discountPrice != "") {
                            discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice') * 100));
                            if (discountPrice >= facePrice) {
                                Ext.Msg.alert('Invalid Data', '折扣价不能大于等于原价');
                                return;
                            };
                        }
                        shelvesGoods.set('shopId', shopId);
                        shelvesGoods.set('categoryId', categoryId);
                        shelvesGoods.set('facePrice', (Math.abs(parseInt(shelvesGoods.get('facePrice') * 100))));
                        shelvesGoods.set('purchasePrice', (Math.abs(parseInt(shelvesGoods.get('purchasePrice') * 100))));
                        shelvesGoods.set('discountPrice', discountPrice);
                        shelvesGoods.set('limitType', limitType);
                        shelvesGoods.set('limitCount', limitCount);
                        console.log("try saving");
                        windowEl.mask('saving');

                        var id = shelvesGoods.get('id');
                        var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice')));
                        var purchasePrice = Math.abs(parseInt(shelvesGoods.get('purchasePrice')));
                        // var discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice')));
                        sendPutRequest('product/update', {
                            id: id,
                            facePrice: facePrice,
                            purchasePrice: purchasePrice,
                            discountPrice: discountPrice,
                            limitType: limitType,
                            limitCount: limitCount
                        }, '编辑商品', '成功编辑商品', '编辑商品失败', function() {
                            windowEl.unmask();
                            editWindow.close();
                            me.showProductSearchList(shopId);
                        });
                        return;
                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }

            },
            /**
             **店铺买手事件
             **/
            'shopbuyer #reseachBuyer': {
                click: function() {
                    var store = Ext.ComponentQuery.query('shopbuyer #searchBuyerId')[0].getStore();
                    store.getProxy().extraParams = {
                        nameOrPhone: me.getKeywordBuyer().getValue(),
                        isActive: true
                    }
                    store.load();
                }
            },
            'shopbuyer #save-bindShopWithShopper': {
                click: function() {
                    var me = this;
                    var editWindow = this.getShopBuyer(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        buyerStore = form.getRecord();
                    var selectModel = Ext.ComponentQuery.query('#searchBuyerId')[0].getSelectionModel();
                    var selectRecords = selectModel.getSelection();
                    var shopperIds = [];
                    selectRecords.forEach(function(item) {
                        if (item.get("id") != null) {
                            shopperIds.push(item.get("uid"));
                        }
                    });
                    var oldSelectModel = Ext.ComponentQuery.query('#bindShopWithShopper')[0].getSelectionModel();
                    var oldSelectRecords = oldSelectModel.getSelection();
                    oldSelectRecords.forEach(function(item) {
                        if (item.get("uid") != '') {
                            shopperIds.push(item.get("uid"));
                        }
                    });
                    var shopId = buyerStore.get('id');
                    var store = this.getShopStore();
                    sendPutRequest('shopper/bindToShop', {
                        shopId: shopId,
                        shopperIds: shopperIds
                    }, '买手绑定店铺', '成功绑定买手', '绑定买手失败', function() {
                        editWindow.close();
                        me.showShopList();
                    });

                }
            },
            '#openCreateShelvesWin,#openModifyShelvesWin': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId();
                    var win = this.getShopShelfAdd();
                    var model;
                    if (itemId == 'openCreateShelvesWin') {
                        model = this.getCategoryRootsModel();
                        model = new model();
                    } else {
                        model = component.getStore().getAt(colIndex);
                    }
                    me.openWin(win, model);
                }
            },
            'shopshelfadd filefield[name="shopShelfxImageUploadfile"]': {
                change: function(uploadfile) {
                    var form = uploadfile.ownerCt;
                    var hash = uploadfile.previousNode().previousNode();
                    uploadImage(form, hash);
                }
            },
            'shopshelfadd filefield[name="shopShelfvImageUploadfile"]': {
                change: function(uploadfile) {
                    var form = uploadfile.ownerCt;
                    var hash = uploadfile.previousNode().previousNode();
                    uploadImage(form, hash);
                }
            },
            'shopshelfadd #addShelvesWin': { //添加或修改一级货架
                click: function() {
                    var editWindow = this.getShopShelfAdd(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelves = form.getRecord(),
                        me = this;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var parentId = '',
                        parentIdStr = '';
                    if (tabIdstrArray[0] == 'tab3' && tabIdstrArray[1] != undefined) {
                        parentId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelves);
                        shopId = this.shopId;
                        //修改分类
                        if (shelves.get('id') != null && shelves.get('id') != '') {
                            sendPutRequest('category/update', {
                                id: shelves.get('id'),
                                name: shelves.get('name'),
                                xImage: shelves.get('xImage'),
                                vImage: shelves.get('vImage')
                            }, '编辑分类', '成功编辑分类', '编辑分类失败', function() {
                                editWindow.close();
                                if (parentId == '') {
                                    me.showCategoryRootsList(shopId);
                                } else {
                                    me.showCategorySubsList(shopId, parentId);
                                }
                            });
                            return;
                        } else { //添加分类

                            var shelvesName = Ext.getCmp('shelvesName').getValue();
                            var shelvesLeaf = Ext.getCmp('shelvesLeaf').getValue();
                            var xImage = Ext.getCmp('shopShelfxImage').getValue();
                            var vImage = Ext.getCmp('shopShelfvImage').getValue();
                            var jsonStr = {
                                shopId: shopId,
                                name: shelvesName,
                                leaf: shelvesLeaf,
                                xImage: xImage,
                                vImage: vImage
                            };
                            if (parentId != '') {
                                jsonStr["parentId"] = parentId;
                            }
                            sendRequest('category', jsonStr, '创建分类', '成功创建分类', '创建分类失败', function() {
                                editWindow.close();
                                if (parentId == '') {
                                    me.showCategoryRootsList(shopId);
                                } else {
                                    me.showCategorySubsList(shopId, parentId);
                                }

                            });
                        }

                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }
            },
            /*
             * 二级货架(shopsecondshelf)事件
             */
            //二级货架添加修改弹出框
            '#openCreateSecondShelvesWin,#openModifySecondShelvesWin': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId() || {};
                    var win = this.getShopSecondShelfAdd() || {};
                    var model;
                    if (itemId == 'openCreateSecondShelvesWin') {
                        model = this.getCategorySubsModel();
                        model = new model();
                    } else {
                        model = component.getStore().getAt(colIndex);
                    }
                    me.openWin(win, model);
                }

            },
            //保存添加或修改的二级货架
            'shopsecondshelfadd #addShelvesWin': {
                click: function() {
                    var editWindow = this.getShopSecondShelfAdd(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelves = form.getRecord(),
                        me = this;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var parentId = '',
                        parentIdStr = '';
                    if (tabIdstrArray[0] == 'tab3' && tabIdstrArray[1] != undefined) {
                        parentId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelves);
                        shopId = this.shopId;
                        //修改分类
                        if (shelves.get('id') != null && shelves.get('id') != '') {
                            sendPutRequest('category/update', {
                                id: shelves.get('id'),
                                name: shelves.get('name'),
                                vImage: '',
                                xImage: ''
                            }, '编辑分类', '成功编辑分类', '编辑分类失败', function() {
                                editWindow.close();
                                me.showCategorySubsList(shopId, parentId);
                            });
                            return;
                        } else { //添加分类
                            var shelvesName = Ext.getCmp('secondShelvesName').getValue();
                            var shelvesLeaf = Ext.getCmp('secondShelvesLeaf').getValue();
                            var jsonStr = {
                                shopId: shopId,
                                name: shelvesName,
                                leaf: shelvesLeaf
                            };
                            if (parentId != '') {
                                jsonStr["parentId"] = parentId;
                            }
                            sendRequest('category', jsonStr, '创建分类', '成功创建分类', '创建分类失败', function() {
                                editWindow.close();
                                me.showCategorySubsList(shopId, parentId);
                            });
                        }

                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }

            },
            'shopsecondshelf #saveShelvesOrder': {
                click: function() {
                    var me = this;
                    var store = me.getCategorySubsStore() || {};
                    var tab = me.getShopShelfTab() || {};
                    var tabId = tab.getActiveTab().getId().slice(5) || {};

                    var data = {
                        parentId: null,
                        ids: []
                    };
                    var success = function(task, operation) {
                        me.showCategorySubsList(me.shopId, tabId);
                    }
                    var failure = function(task, operation) {
                        var error = operation.getError(),
                            msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                        Ext.MessageBox.show({
                            title: 'Edit Task Failed',
                            msg: msg,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });

                    }
                    data.parentId = tabId;
                    store.each(function(e) {
                        data.ids.push(e.data.id)
                    });
                    sendPutRequest('category/reorder', data, '一级货架排序', '排序成功', '排序失败', success, failure);
                }
            },
            /*
             * 商品事件
             */
            //上下架
            '#ShelvesGoodsList #putawayOrOut,#ShelvesGoodsList #frozen': {
                click: function(component, column, rowIndex, colIndex, e) {

                    var model = component.getStore().getAt(rowIndex);
                    var className = e.target.className;
                    var statusValue = Ext.query("." + className)[rowIndex].getAttribute("statusValue");
                    var url = 'product/' + statusValue;
                    var status;
                    console.log(statusValue)
                    //statusValue为点击事件后商品的状态
                    switch (statusValue) {
                        case 'soldout': //让商品下架（目前处于上架状态）
                            status = 3;
                            break;
                        case 'offline': //让商品雪藏（目前处于未雪藏）
                            status = 1;
                            break;
                        case 'online': //让商品上架（目前处于售罄状态）
                            status = 0;
                            break;
                    }
                    sendPutRequest(url, {
                        productId: model.get('id')
                    }, '', '成功创建分类', '创建分类失败', function() {
                        //me.fireEvent('refreshView');
                        model.set('status', status);
                    });
                }
            },

            //添加商品
            '#openCreateShelvesGoodsWin': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId();
                    var win = this.getShopProductAdd();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '';
                    form.reset();

                    if (itemId == 'openCreateShelvesGoodsWin') {
                        model = this.getProductModel();
                        model = new model();
                    } else {
                        model = component.getStore().getAt(colIndex);
                        limitType = model.get('limitType');
                        limitCount = model.get('limitCount');
                        name = model.get('name');
                        model.set('facePrice', (Math.abs(model.get('fprice') / 100)));
                        model.set('purchasePrice', (Math.abs(model.get('pprice') / 100)));
                        model.set('discountPrice', (Math.abs(model.get('dprice') / 100)));
                        model.set('name', name);
                        if (limitType == 1) {
                            model.set('dayLimitCount', limitCount);
                        } else if (limitType == 2) {
                            model.set('totalLimitCount', limitCount);
                        } else {
                            model.set('dayLimitCount', '');
                            model.set('totalLimitCount', '');
                        }
                    }
                    me.openWin(win, model);
                }
            },
            '#addShelvesGoodsWin': {
                click: function() {
                    var editWindow = this.getShopProductAdd(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelvesGoods = form.getRecord(),
                        me = this;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var categoryId = '',
                        limitType = 0,
                        limitCount = 0;

                    if (tabIdstrArray[0] == 'tab4' && tabIdstrArray[1] != undefined) {
                        categoryId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelvesGoods);
                        console.log(shelvesGoods);
                        shopId = this.shopId;
                        limitType = form.getValues()['limitType'];

                        if (limitType == 1) {
                            limitCount = form.getValues()['dayLimitCount'];
                        } else if (limitType == 2) {
                            limitCount = form.getValues()['totalLimitCount'];
                        } else {
                            limitType = 0;
                            limitCount = 0;
                        }
                        if (limitCount == 0 || limitCount == null || limitCount == '') {
                            limitType = 0;
                        }
                        var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice') * 100));
                        var discountPrice = shelvesGoods.get('discountPrice');
                        if (discountPrice != "") {
                            discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice') * 100));
                            if (discountPrice >= facePrice) {
                                Ext.Msg.alert('Invalid Data', '折扣价不能大于等于原价');
                                return;
                            };
                        }
                        shelvesGoods.set('shopId', shopId);
                        shelvesGoods.set('categoryId', categoryId);
                        shelvesGoods.set('facePrice', (Math.abs(parseInt(shelvesGoods.get('facePrice') * 100))));
                        shelvesGoods.set('purchasePrice', (Math.abs(parseInt(shelvesGoods.get('purchasePrice') * 100))));
                        shelvesGoods.set('discountPrice', discountPrice);
                        shelvesGoods.set('limitType', limitType);
                        shelvesGoods.set('limitCount', limitCount);
                        console.log("try saving");
                        windowEl.mask('saving');
                        if (shelvesGoods.get('id') != null) {
                            console.log('编辑');
                            var id = shelvesGoods.get('id');
                            var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice')));
                            var purchasePrice = Math.abs(parseInt(shelvesGoods.get('purchasePrice')));
                            var discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice')));
                            sendPutRequest('product/update', {
                                id: id,
                                facePrice: facePrice,
                                purchasePrice: purchasePrice,
                                discountPrice: discountPrice,
                                limitType: limitType,
                                limitCount: limitCount
                            }, '编辑商品', '成功编辑商品', '编辑商品失败', function() {
                                windowEl.unmask();
                                editWindow.close();
                                me.showProductList(categoryId);
                            });
                            return;
                        } else {
                            var selectModel = Ext.ComponentQuery.query('#productTemplateId')[0].getSelectionModel();
                            var selectRecords = selectModel.getSelection();
                            if (selectRecords[0] == null) {
                                Ext.Msg.alert('添加商品失败', '请选择添加商品模板');
                                windowEl.unmask();
                                return;
                            }
                            shelvesGoods.set('productTemplateId', selectRecords[0].raw.id);
                            console.log(categoryId);
                            shelvesGoods.save({
                                success: function(task, operation) {
                                    windowEl.unmask();
                                    editWindow.close();
                                    me.showProductList(categoryId);
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
                            });
                        }
                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }
            },
            //修改商品
            '#ShelvesGoodsList #openModifyShelvesGoodsWin': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId();
                    var win = this.getShopProductEdit();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '';
                    form.reset();
                    model = component.getStore().getAt(colIndex);
                    limitType = model.get('limitType');
                    limitCount = model.get('limitCount');
                    name = model.get('name');
                    model.set('facePrice', (Math.abs(model.get('fprice') / 100)));
                    model.set('purchasePrice', (Math.abs(model.get('pprice') / 100)));
                    model.set('discountPrice', (Math.abs(model.get('dprice') / 100)));
                    model.set('name', name);
                    if (limitType == 1) {
                        model.set('dayLimitCount', limitCount);
                    } else if (limitType == 2) {
                        model.set('totalLimitCount', limitCount);
                    } else {
                        model.set('dayLimitCount', '');
                        model.set('totalLimitCount', '');
                    }

                    me.openWin(win, model);
                }
            },
            'shopproductedit #editShelvesGoodsWin': {
                click: function() {
                    var editWindow = this.getShopProductEdit(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelvesGoods = form.getRecord(),
                        me = this;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var categoryId = '',
                        limitType = 0,
                        limitCount = 0;
                    if (tabIdstrArray[0] == 'tab4' && tabIdstrArray[1] != undefined) {
                        categoryId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelvesGoods);
                        console.log(shelvesGoods);
                        shopId = this.shopId;
                        limitType = form.getValues()['limitType'];
                        if (limitType == 1) {
                            limitCount = form.getValues()['dayLimitCount'];
                        } else if (limitType == 2) {
                            limitCount = form.getValues()['totalLimitCount'];
                        } else {
                            limitType = 0;
                            limitCount = 0;
                        }
                        if (limitCount == 0 || limitCount == null || limitCount == '') {
                            limitType = 0;
                        }
                        var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice') * 100));
                        var discountPrice = shelvesGoods.get('discountPrice');
                        if (discountPrice != "") {
                            discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice') * 100));
                            if (discountPrice >= facePrice) {
                                Ext.Msg.alert('Invalid Data', '折扣价不能大于等于原价');
                                return;
                            };
                        }
                        shelvesGoods.set('shopId', shopId);
                        shelvesGoods.set('categoryId', categoryId);
                        shelvesGoods.set('facePrice', (Math.abs(parseInt(shelvesGoods.get('facePrice') * 100))));
                        shelvesGoods.set('purchasePrice', (Math.abs(parseInt(shelvesGoods.get('purchasePrice') * 100))));
                        shelvesGoods.set('discountPrice', discountPrice);
                        shelvesGoods.set('limitType', limitType);
                        shelvesGoods.set('limitCount', limitCount);
                        console.log("try saving");
                        windowEl.mask('saving');
                        if (shelvesGoods.get('id') != null) {
                            console.log('编辑');
                            var id = shelvesGoods.get('id');
                            var facePrice = Math.abs(parseInt(shelvesGoods.get('facePrice')));
                            var purchasePrice = Math.abs(parseInt(shelvesGoods.get('purchasePrice')));
                            // var discountPrice = Math.abs(parseInt(shelvesGoods.get('discountPrice')));
                            sendPutRequest('product/update', {
                                id: id,
                                facePrice: facePrice,
                                purchasePrice: purchasePrice,
                                discountPrice: discountPrice,
                                limitType: limitType,
                                limitCount: limitCount
                            }, '编辑商品', '成功编辑商品', '编辑商品失败', function() {
                                windowEl.unmask();
                                editWindow.close();
                                me.showProductList(categoryId);
                            });
                            return;
                        } else {
                            var selectModel = Ext.ComponentQuery.query('#productTemplateId')[0].getSelectionModel();
                            var selectRecords = selectModel.getSelection();
                            if (selectRecords[0] == null) {
                                Ext.Msg.alert('添加商品失败', '请选择添加商品模板');
                                windowEl.unmask();
                                return;
                            }
                            shelvesGoods.set('productTemplateId', selectRecords[0].raw.id);
                            console.log(categoryId);
                            shelvesGoods.save({
                                success: function(task, operation) {
                                    windowEl.unmask();
                                    editWindow.close();
                                    me.showProductList(categoryId);
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
                            });
                        }
                    } else {
                        Ext.Msg.alert('Invalid Data', 'Please correct form errors');
                    }
                }
            },
            'shopproductadd #reseachProductTemplate': {
                click: function() {
                    var store = me.getProductTemplateStore();
                    store.load({
                        params: {
                            keyword: me.getKeywordProductTemplate().getValue()
                        }
                    });
                }
            }
        });
        Ext.QuickTips.init();
    },
    showShopList: function() {
        var dstore = this.getShopStore();
        dstore.getProxy().extraParams = {
            city: XMLifeOperating.generic.Global.currentCity,
            //areaId: XMLifeOperating.generic.Global.SERVICECENEERID
            areaId: this.areaId
        }
        dstore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showCategoryRootsList: function(shopId) {
        var shopShelfStore = this.getCategoryRootsStore();
        shopShelfStore.removeAll();
        shopShelfStore.getProxy().extraParams = {
            shopId: shopId
        }
        shopShelfStore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showCategorySubsList: function(shopId, parentId) {
        var snstore = this.getCategorySubsStore();
        snstore.getProxy().extraParams = {
            shopId: shopId,
            parentId: parentId
        }
        snstore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showProductList: function(categoryId) {
        var sgstore = this.getProductStore();
        sgstore.getProxy().extraParams = {
            categoryId: categoryId
        }
        sgstore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showProductSoldOutOrOffLineList: function(shopId, value) {
        var me = this,
            shopId = shopId,
            value = value;
        switch (value) {
            case 'soldout':
                me.showProductSoldOutList(shopId);
                break;
            case 'offline':
                me.showProductOffLineList(shopId);
                break;
        }
    },
    showProductSoldOutList: function(shopId) {
        var me = this,
            categoryStore = me.getShopCategoriesStore(); //在货架页，category已经加载
        categoryStore.getProxy().extraParams = {
            shopId: shopId,
            status: 3
        }
        categoryStore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });

    },
    showProductOffLineList: function(shopId) {
        var me = this,
            categoryStore = me.getShopCategoriesStore();
        categoryStore.getProxy().extraParams = {
            shopId: shopId,
            status: 1
        }
        categoryStore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showProductSearchList: function(shopId) {
        var me = this;
        var view = me.getShopProductSearch(),
            keyWords = me.getShopShelfTab().down('#keyword').getValue(),
            store = me.getProductSearchStore();
        if (keyWords == '') {
            return;
        } else {
            store.load({
                params: {
                    shopId: shopId,
                    keyword: keyWords
                }
            });
        }
    },
    openWin: function(win, model, callback) {
        //打开窗口
        var form = win.down('form');
        form.loadRecord(model);
        if (callback) {
            callback();
        };
        win.show();
    },
    onShopStoreBannerEdit: function(view, rowIndex, colIndex, column, e) {
        console.log("start edit");
        var ShopStoreBanner = view.getRecord(view.findTargetByEvent(e));
        var win = this.getShopBannerAdd();
        win.down('form').loadRecord(ShopStoreBanner);
        win.show();
    },
    onShopStoreBannerDelete: function(view, rowIndex, colIndex, column, e) {
        var me = this;
        var windowEl = this.getShopShelfTab().getEl();
        var record = view.getRecord(view.findTargetByEvent(e));
        var store = this.getShopBannerTemplateStore();
        var deleteId = record.get('id');
        var data = {
            id: null,
            bannerIds: [],
            bannerUrls: [],
            titles: []
        }

        if (store.data.items.length <= 1) {
            Ext.MessageBox.show({
                title: '提示',
                msg: '店铺Banner模板数量至少为1',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return
        } else {
            store.each(function(e) {
                if (e.getId() != deleteId) {
                    data.bannerIds.push(e.getId());
                    data.bannerUrls.push(e.url);
                    data.titles.push(e.title);
                }
            });
            data.id = me.shopId;
            var success = function(task, operation) {
                store.remove(record);
            };
            var failure = function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                Ext.MessageBox.show({
                    title: 'Edit Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            };
            var str = '确认删除Banner？';
            Ext.MessageBox.confirm('提示', str, function(str) {
                if (str == 'yes') {
                    sendPutRequest('shop/updatebanners', data, '删除Banner模板', '删除Banner模板成功', '删除Banner模板失败', success, failure);
                    return;
                }

            });
        }

    },
    saveEditShopStoreBannerWin: function() {
        var editWindow = this.getShopBannerAdd(),
            windowEl = editWindow.getEl(),
            form = editWindow.down('form').getForm(),
            me = this;
        var inputs = form.updateRecord().getRecord().data;

        if (inputs.id != null) { //修改
            if (inputs.image == '') {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: '请添加Banner图片！',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                return
            }
            var editBannerId = inputs.id;
            var data = {
                id: null,
                bannerIds: [],
                bannerUrls: [],
                titles: []
            }
            var allbaners = this.getShopBannerTemplateStore().data.items;
            var hash = inputs.image;
            this.getShopBannerTemplateStore().each(function(e) {
                if (e.getId() == editBannerId) {
                    data.bannerIds.push(e.getId());
                    data.bannerUrls.push(inputs.url);
                    data.titles.push(inputs.title);
                } else {
                    data.bannerIds.push(e.getId());
                    data.bannerUrls.push(e.data.url);
                    data.titles.push(e.data.title);
                }
            });
            data.id = me.shopId;

        } else { //添加
            var data = {
                id: null,
                bannerIds: [],
                bannerUrls: [],
                titles: []
            }
            var allbaners = this.getShopBannerTemplateStore().data.items;
            var hash = inputs.image;

            this.getShopBannerTemplateStore().each(function(e) {
                data.bannerIds.push(e.getId());
                data.bannerUrls.push(e.data.url);
                data.titles.push(e.data.title);
            });
            data.id = me.shopId;
            data.bannerIds.push(hash);
            data.bannerUrls.push(inputs.url);
            data.titles.push(inputs.title);
        }
        if (form.isValid()) {
            var success = function(task, operation) {
                windowEl.unmask();
                editWindow.close();
            };
            var failure = function(task, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;
                Ext.MessageBox.show({
                    title: 'Edit Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                windowEl.unmask();
            };
            sendPutRequest('shop/updatebanners', data, '添加Banner模板', '添加Banner模板成功', '添加Banner模板失败', success, failure);
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors');
        }
    },
    tabIsExist: function(id) {
        var me = this,
            toolbar = Ext.getCmp('toolbar'),
            tab = me.getShopShelfTab();
        for (var i = 0; i < toolbar.items.length; i++) {
            if (toolbar.items.keys[i].split('_')[1] == id) {
                tab.setActiveTab(toolbar.items.keys[i])
                return true;
            }
        };
        return false
    },
    closeAllTabs: function() { //实际删除的是一级货架意外的货架
        var me = this;
        var shelfTab = me.getShopShelfTab();
        var items = shelfTab.items.items;
        var deleteIds = []
        me.showShopList();
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i].id.search('tab2') == -1) {
                deleteIds.push(items[i].id);
            }
        }
        for (var j = 0, len = deleteIds.length; j < len; j++) {
            shelfTab.remove(deleteIds[j]);
        }
    }

});

function putawayOrOut(obj) {
    console.log($(obj));
}