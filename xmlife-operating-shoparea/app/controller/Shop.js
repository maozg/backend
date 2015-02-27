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
        'centralPointManage.shop.ShopProductStatusEdit',
        'centralPointManage.shop.ShopBuyer',
        'centralPointManage.shop.ShopManager',
        'centralPointManage.shop.ShopProductSoldOut',
        'centralPointManage.shop.ShopProductOffLine',
        'centralPointManage.shop.ShopProductOnline',
        'centralPointManage.shop.ShopProductAbandoned',
        'centralPointManage.shop.ShopProductSearch',
        'centralPointManage.shop.ShopProductSearchEdit',
        'centralPointManage.shop.ChangePriceRecordList'
    ],
    stores: [
        'Shop',
        'SuperShopper',
        'ShopBannerTemplate',
        'ShopCategories',
        'CategoryRoots',
        'Product',
        'CategorySubs',
        'ProductTemplate',
        'ProductSearch',
        'CategoryLeafCategorys',
        'ChangePriceRecordMyRecords',
        'ProductStatus',
        'AdminAdminShopType',
        'Manager'
    ],
    models: [
        'Shop',
        'SuperShopper',
        'ShopBannerTemplate',
        'ShopCategories',
        'CategoryRoots',
        'Product',
        'CategorySubs',
        'ProductTemplate',
        'ProductSearch',
        'CategoryLeafCategorys',
        'ChangePriceRecord',
        'ProductStatus',
        'AdminAdminShopType',
        'Manager'
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
        ref: 'shopShelf',
        selector: 'shopshelf',
        xtype: 'shopshelf',
        autoCreate: true
    }, {
        ref: 'shopShelfAdd',
        selector: 'shopshelfadd',
        xtype: 'shopshelfadd',
        autoCreate: true
    }, {
        ref: 'shopProductSoldOut',
        selector: 'shopProductSoldOut',
        xtype: 'shopProductSoldOut',
        autoCreate: true
    }, {
        ref: 'shopProductOnline',
        selector: 'shopProductOnline',
        xtype: 'shopProductOnline',
        autoCreate: true
    }, {
        ref: 'shopProductOffLine',
        selector: 'shopProductOffLine',
        xtype: 'shopProductOffLine',
        autoCreate: true
    }, {
        ref: 'shopProductAbandoned',
        selector: 'shopProductAbandoned',
        xtype: 'shopProductAbandoned',
        autoCreate: true
    }, {
        ref: 'shopSecondShelfAdd',
        selector: 'shopsecondshelfadd',
        xtype: 'shopsecondshelfadd',
        autoCreate: true
    }, {
        ref: 'shopProductList',
        selector: '#ShelvesGoodsList',
        xtype: 'shopproduct',
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
        ref: 'shopProductStatusEdit',
        selector: 'shopProductStatusEdit',
        xtype: 'shopProductStatusEdit',
        autoCreate: true
    }, {
        ref: 'shopBuyer',
        selector: 'shopbuyer',
        xtype: 'shopbuyer',
        autoCreate: true
    }, {
        ref: 'shopManager',
        selector: 'shopManager',
        xtype: 'shopManager',
        autoCreate: true
    }, {
        ref: 'keywordProductTemplate',
        selector: '#keywordProductTemplate'
    }, {
        ref: 'keywordBuyer',
        selector: '#keywordBuyer'
    }, {
        ref: 'shopProductSearch',
        selector: 'shopProductSearch',
        xtype: 'shopProductSearch'
    }, {
        ref: 'shopProductSearchEdit',
        selector: 'shopproductsearchedit',
        xtype: 'shopproductsearchedit',
        autoCreate: true
    }, {
        ref: 'changePriceRecordList',
        selector: 'changePriceRecordList',
        xtype: 'changePriceRecordList',
        autoCreate: true
    }],
    init: function() {
        var me = this,
            isSuccess = true,
            shopStore = this.getShopStore();
        shopStore.on('load', function() {
            this.clearFilter(true);
            return;
        });
        this.control({
            /*
             *shoplist事件
             */
            'shoplist #shopArea': {
                select: function(combo) {
                    var dstore = me.getShopStore();
                    dstore.getProxy().extraParams = {
                        city: XMLifeOperating.generic.Global.currentCity,
                        areaId: combo.getValue()
                    };
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
            'shoplist #add': {
                click: function() {
                    var cClass = this.getShopModel();
                    var shop = new cClass();
                    var win = this.getShopAdd();
                    win.down('#shopeditform').getForm().reset();
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
                    }
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
            'shoplist #storeLimitEnableBtn': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var me = this;
                    var record = view.getRecord(view.findTargetByEvent(e));
                    this.record = record; //赋值给视图变量
                    var id = record.get('id');
                    var storeLimitEnable = record.get('storeLimitEnable');
                    var success = function(response) {
                        me.showShopList();
                    };
                    var failure = function(response) {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '请求失败',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    };
                    if (storeLimitEnable) { //已开启库存管理，关闭库存管理

                        sendPutRequest('shop/closeStoreLimit', {
                            id: id
                        }, '操作库存管理', '操作库存管理成功', '操作库存管理失败', success, failure);

                    } else { //未开启库存管理，开启库存管理

                        sendPutRequest('shop/openStoreLimit', {
                            id: id
                        }, '操作库存管理', '操作库存管理成功', '操作库存管理失败', success, failure);
                    }
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
            'shoplist #managerCountId': {
                // 弹出入驻掌柜
                click: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(colIndex);
                    var win = this.getShopManager();
                    win.down('form').loadRecord(record);

                    win.down('[name=keywordManager]').setValue('');
                    win.down('#searchManagerIds').store.removeAll();

                    win.show();

                    var store = this.getManagerStore();
                    var storeCount = store.getCount();
                    store.removeAll();
                    store.load({
                        params: {
                            shopId: record.get('id')
                        },
                        callback: function(records) {
                            if ((records.length == 1) && (records[0].get('uid') == '')) {
                                store.remove(store.getAt(0));
                            }
                            // 初始化打勾
                            var model = Ext.ComponentQuery.query('#bindShopWithManager')[0].getSelectionModel();
                            model.deselectAll();
                            for (var i = 0; i < records.length; i++) {
                                var index = store.indexOfId(records[i].get('id'));
                                model.select(index, true);
                            }
                        }
                    });
                }
            },
            'shoplist #shopperCountId': {
                // 弹出入住买手window
                click: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(colIndex);
                    var win = this.getShopBuyer();
                    win.down('form').loadRecord(record);

                    win.down('[name=keywordBuyer]').setValue('');
                    win.down('#searchBuyerId').store.removeAll();

                    win.show();
                    var store = this.getSuperShopperStore();
                    var storeCount = store.getCount();
                    store.removeAll();
                    store.getProxy().extraParams = {
                        shopId: record.get('id')
                    };
                    store.load({
                        callback: function(records) {
                            if ((records.length == 1) && (records[0].get('uid') == '')) {
                                store.remove(store.getAt(0));
                            }
                            // 初始化打勾
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
                    var autoOnline = (this.record.get('autoOnline') == true || this.record.get('autoOnline') == 'true') ? 'true' : 'false';
                    var showAllProducts = (this.record.get('showAllProducts') == true || this.record.get('showAllProducts') == 'true') ? 'true' : 'false';
                    var needAuditPrice = (this.record.get('needAuditPrice') == true || this.record.get('needAuditPrice') == 'true') ? 'true' : 'false';
                    var needUserCollection = (this.record.get('needUserCollection') == true || this.record.get('needUserCollection') == 'true') ? 'true' : 'false';

                    this.record.set('openTimeText', openTime);
                    this.record.set('closeTimeText', closeTime);
                    this.record.set('autoOnline', autoOnline);
                    this.record.set('showAllProducts', showAllProducts);
                    this.record.set('needAuditPrice', needAuditPrice);
                    this.record.set('needUserCollection', needUserCollection);
                    form.loadRecord(this.record);

                    // 因为使用了store.update()提交表单修改，所以对如下几个字段，在store里需要保持其值为“服务器友好”的值
                    // 也即是所显示的人民币/公里数＊100之后的值。鉴于此，这里不能将显示用值写回record。
                    // 另外由于numberfiled不支持renderer方法，这里显式地将显示用值set到form。
                    // 另一个可选方案是给numberfield指定applyValue方法，但其会影响所有setValue()调用，难免误伤。
                    // 待1.5过后这个文件大规模整理时再考虑重构方案。
                    var freightValues = {};
                    Ext.Array.each(['initShippingFee', 'minPrice', 'minOrderForFreeShipping', 'minDistance', 'shippingFeePerKM'], function(field) {
                        var value = this.record.get(field);
                        if (Ext.isNumeric(value)) {
                            freightValues[field] = value / 100;
                        }
                    }, this);

                    form.getForm().setValues(freightValues);

                    this.shopId = this.record.raw.id;
                    tab.show();
                }
            },
            'shoplist #seeChangePriceRecord': {
                click: function(view, column, rowIndex, colIndex, e) {
                    var me = this;
                    var tab = this.getChangePriceRecordList();
                    var content = this.getContentPanel();
                    content.removeAll(false);
                    var record = view.getRecord(view.findTargetByEvent(e));
                    var shopId = record.get('id');
                    this.shopId = shopId;
                    var changePriceRecordMyRecordsStore = this.getChangePriceRecordMyRecordsStore();
                    changePriceRecordMyRecordsStore.removeAll();
                    changePriceRecordMyRecordsStore.getProxy().extraParams = {
                        shopId: shopId
                    }
                    changePriceRecordMyRecordsStore.loadPage(1, {
                        params: {
                            start: 0,
                            limit: 25,
                            page: 1
                        }
                    });
                    content.add(tab);
                    tab.down('#isverifyCombo').setValue('');
                    tab.down('[name=goodsSkuId]').setValue('');
                }
            },
            /*
             *changePriceRecordList 改价审核事件
             */
            'changePriceRecordList #isverifyCombo': {
                change: function() {
                    me.changePriceRecordList(this.getChangePriceRecordList());
                }
            },
            // 改价审核搜索商品
            'changePriceRecordList button[name=skuIdSearch]': {
                click: me.skuIdSearch
            },
            // shopadd事件
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
                        // 经纬度检验
                        jString = shopStore.get('lng');
                        wString = shopStore.get('lat');
                        var pattern = /(\d{1,3}\.)\d{1,3}/;
                        if (pattern.test(jString) && pattern.test(wString)) {
                            if (jString > 180 || jString < -180) {
                                alert('经度错误');
                                return;
                            }
                            if (wString > 90 || wString < 0) {
                                alert('纬度错误');
                                return;
                            }
                        } else {
                            alert('经纬度格式错误');
                            return;
                        }
                        // 开始结束时间点检验
                        var openTime = shopStore.get('openTime').getHours() * 60 + shopStore.get('openTime').getMinutes();
                        var closeTime = shopStore.get('closeTime').getHours() * 60 + shopStore.get('closeTime').getMinutes();
                        if (openTime >= closeTime) {
                            alert('请确认结束时间晚于开始时间！');
                            return;
                        }

                        // 展开所有商品判断
                        var showAllProducts = form.getValues()['showAllProducts'];
                        shopStore.set('showAllProducts', showAllProducts);
                        // 改价审核判断
                        var needAuditPrice = form.getValues()['needAuditPrice'];
                        shopStore.set('needAuditPrice', needAuditPrice);
                        // 是否显示购买过的商品
                        var needUserCollection = form.getValues()['needUserCollection'];
                        shopStore.set('needUserCollection', needUserCollection);
                        // 复制店铺
                        if (form.getValues()['copyShopCheckbox'] && form.getValues()['copyShopCheckbox'] == 'on' && form.getValues()['copyShop'] != '') {
                            shopStore.set('beCopyedShopId', form.getValues()['copyShop']);
                        }
                        windowEl.mask('saving');
                        shopStore.set('city', XMLifeOperating.generic.Global.currentCity);

                        var areaIds = [this.areaId];
                        var autoOnline = (shopStore.get('autoOnline') == 'false') ? false : true;
                        shopStore.set('areaIds', areaIds);
                        shopStore.set('autoOnline', autoOnline);
                        shopStore.set('openTime', (shopStore.get('openTime').getHours() * 60 + shopStore.get('openTime').getMinutes()));
                        shopStore.set('closeTime', (shopStore.get('closeTime').getHours() * 60 + shopStore.get('closeTime').getMinutes()));

                        Ext.Array.each(['initShippingFee', 'minPrice', 'minOrderForFreeShipping', 'minDistance', 'shippingFeePerKM'], function(field) {
                            var value = shopStore.get(field);
                            if (Ext.isNumeric(value)) {
                                value = me.priceTransform(value);
                                shopStore.set(field, value);
                            }
                        });
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
                        Ext.Msg.alert('提示', '无效数据，请更正！');
                    }
                }
            },
            // shopedit事件
            'shopedit #modifyShopStoreInfo': {
                click: function(button) {
                    var editWindow = this.getShopEdit();
                    var itemId = button.getItemId();
                    var shopBannerTemplateStore = this.getShopBannerTemplateStore();
                    var windowEl = editWindow.getEl(),
                        form = editWindow.down('#shopeditform').getForm(),
                        shopStore = form.getRecord(),
                        combo = editWindow.down('combo[name="shopBannerTemplateId"]');
                    me = this;
                    var jStng, wString;
                    if (form.isValid()) {
                        form.updateRecord(shopStore);
                        jString = shopStore.get('lng');
                        wString = shopStore.get('lat');
                        var pattern = /(\d{1,3}\.)\d{1,3}/;
                        if (pattern.test(jString) && pattern.test(wString)) {
                            if (jString > 180 || jString < -180) {
                                alert('经度错误');
                                return;
                            }
                            if (wString > 90 || wString < 0) {
                                alert('纬度错误');
                                return;
                            }
                        } else {
                            alert('经纬度格式错误');
                            return;
                        }
                        // 开始结束时间点检验
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
                        var autoOnline = (shopStore.get('autoOnline') == 'false') ? false : true;
                        var showAllProducts = (shopStore.get('showAllProducts') == 'false') ? false : true;
                        var needAuditPrice = (shopStore.get('needAuditPrice') == 'false') ? false : true;
                        var needUserCollection = (shopStore.get('needUserCollection') == 'false') ? false : true;
                        var templateId = null;

                        if (shopBannerTemplateStore.data.items.length) {
                            //combo加载，用户选择下拉框。
                            if (shopStore.get('shopBannerTemplateId') !== shopStore.get('templateName')) {
                                templateId = shopBannerTemplateStore.findRecord('id', shopStore.get('shopBannerTemplateId')).getId();
                            }
                        }

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
                            showAllProducts: showAllProducts,
                            needAuditPrice: needAuditPrice,
                            needUserCollection: needUserCollection,
                            mergeType: shopStore.get('mergeType')
                        };

                        Ext.Array.each(['initShippingFee', 'minPrice', 'minOrderForFreeShipping', 'minDistance', 'shippingFeePerKM'], function(field) {
                            var value = shopStore.get(field);
                            if (Ext.isNumeric(value)) {
                                value = me.priceTransform(value);
                                shopStore.set(field, value);
                                requestparams[field] = value;
                            }
                        });

                        var modifySuccessCallback = function(response) {
                            windowEl.unmask();
                            editWindow.close();
                            me.showShopList();
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
                        };
                        sendPutRequest('shop/update', requestparams, '编辑模板', '成功编辑模板', '编辑模板失败', modifySuccessCallback, modifyFailureCallback);
                    } else {
                        Ext.Msg.alert('提示', '无效数据，请更正！');
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
                    me.showShopList();
                    content.add(tabShopStore);
                }
            },
            // shopbanner事件
            'shopbanner #returnShopStore,changePriceRecordList #returnShopStore': {
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
             *tab事件
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
             * shopshelf事件
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
                    me.closeAllTabs()
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
                    // 下架商品tab切换
                    if (me.tabIsExist('soldout')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '-下架商品',
                            id: 'tab5_soldout',
                            layout: 'fit',
                            items: {
                                xtype: 'shopProductSoldOut'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab5_soldout');
                    }
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductSoldOut());
                }
            },
            'shopshelf #viewAllOnlineProduct': {
                click: function() {
                    var me = this,
                        shopId = this.shopId,
                        toolbar = Ext.getCmp('toolbar'),
                        tab = me.getShopShelfTab(),
                        shopStore = me.getShopStore();
                    var shop = shopStore.getById(shopId);
                    // 下架商品tab切换
                    if (me.tabIsExist('online')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '-上架商品',
                            id: 'tab5_online',
                            layout: 'fit',
                            items: {
                                xtype: 'shopProductOnline'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab5_online');
                    }
                }
            },
            'shopshelf #viewAllHiddenProduct': {
                click: function() {
                    var me = this,
                        shopId = this.shopId,
                        toolbar = Ext.getCmp('toolbar'),
                        tab = me.getShopShelfTab(),
                        shopStore = me.getShopStore(),
                        shop = shopStore.getById(shopId);
                    // 雪藏商品tab切换
                    if (me.tabIsExist('offline')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '-雪藏商品',
                            id: 'tab5_offline',
                            layout: 'fit',
                            items: {
                                xtype: 'shopProductOffLine'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab5_offline');
                    }
                }
            },
            'shopshelf #viewAllAbandonedProduct': {
                click: function() {
                    var me = this,
                        shopId = this.shopId,
                        toolbar = Ext.getCmp('toolbar'),
                        tab = me.getShopShelfTab(),
                        shopStore = me.getShopStore();
                    var shop = shopStore.getById(shopId);
                    // 雪藏商品tab切换
                    if (me.tabIsExist('abandoned')) {
                        return
                    } else {
                        toolbar.add({
                            title: shop.get('name') + '-废弃商品',
                            id: 'tab5_abandoned',
                            layout: 'fit',
                            items: {
                                xtype: 'shopProductAbandoned'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab5_abandoned');
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
                        return;
                    } else {
                        toolbar.add({
                            title: '搜索商品',
                            id: 'tab6_searchProduct',
                            layout: 'fit',
                            items: {
                                xtype: 'shopProductSearch'
                            },
                            closable: true
                        });
                        tab.setActiveTab('tab6_searchProduct');
                    }
                }
            },
            'shopshelf #openCreateShelvesWin,shopshelf #openModifyShelvesWin': {
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
            // shopshelf 删除事件
            'shopshelf #delete': {
                click: function(view, rowIndex, colIndex, column, e) {
                    var self = this,
                        shopId = self.shopId,
                        shopshelf = view.getRecord(view.findTargetByEvent(e));
                    Ext.MessageBox.confirm('提示', '确定删除该货架吗?', function(result) {
                        if (result == 'yes') {
                            var id = shopshelf.data.id,
                                param = {
                                    id: id
                                },
                                url = 'category/delete';
                            sendDeleteRequest(url, param, '', '', '', function(response) {
                                if (response.responseText == '1') {
                                    Ext.Msg.alert('成功', '成功删除该货架');
                                }
                                self.showCategoryRootsList(shopId);
                            }, function(response) {
                                if (response.responseText == '-1') {
                                    Ext.Msg.alert('失败', '分类中有商品，无法删除');
                                } else if (response.responseText == '-2') {
                                    Ext.Msg.alert('失败', '分类中包含次级分类，无法删除');
                                } else {
                                    Ext.Msg.alert('失败', '删除失败');
                                }
                            })
                        }
                    })
                }
            },
            'shopshelf #showOrHide': {
                click: function(view, column, rowIndex, colIndex, e, record) {
                    var me = this;
                    var status = record.get('status');
                    var id = record.get('id');
                    var url = null;
                    var shopId = this.shopId;
                    if (status === 0) { //隐藏，准备显示
                        url = 'category/online';
                    } else if (status == 1) { //显示，准备隐藏
                        url = 'category/offline';
                    }
                    if (url) {
                        var success = function(response) {

                            var json = eval('(' + response.responseText + ')');
                            if (json.success === false) {
                                var items = json.items,
                                    len = items.length;
                                var nameStr = [];
                                for (var i = 0; i < len; i++) {
                                    var item = items[i];
                                    nameStr.push(item.name.join('') + '(' + item.skuId + ');');
                                }
                                nameStr.push('还存在于其它分类，无法设置状态');
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: nameStr.join('<br/>'),
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                            me.showCategoryRootsList(shopId);
                        };
                        var failure = function(response) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '货架状态操作失败！',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        };
                        sendPutRequest(url, {
                            id: id
                        }, '货架显示隐藏', '货架显示隐藏操作成功', '货架显示隐藏操作失败', success, failure);
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '货架初始状态错误！',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            // shopshelf add事件
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
                        parentIdStr = '',
                        inputs = null,
                        shelfId = null;
                    if (tabIdstrArray[0] == 'tab3' && tabIdstrArray[1] !== undefined) {
                        parentId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        inputs = form.getValues();
                        shopId = this.shopId;
                        shelfId = shelves.get('id');
                        // 修改分类
                        if (shelfId != null && shelfId !== '') {
                            sendPutRequest('category/update', {
                                id: shelfId,
                                name: inputs.name,
                                xImage: inputs.xImage,
                                vImage: inputs.vImage,
                                leaf: inputs.leaf
                            }, '编辑分类', '成功编辑分类', '编辑分类失败', function() {
                                editWindow.close();
                                if (parentId === '') {
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
                            if (parentId !== '') {
                                jsonStr["parentId"] = parentId;
                            }
                            sendRequest('category', jsonStr, '创建分类', '成功创建分类', '创建分类失败', function() {
                                editWindow.close();
                                if (parentId === '') {
                                    me.showCategoryRootsList(shopId);
                                } else {
                                    me.showCategorySubsList(shopId, parentId);
                                }
                            });
                        }
                    } else {
                        Ext.Msg.alert('提示', '无效数据，请更正！');
                    }
                }
            },
            /*
             * shopsecondshelf 事件
             */
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
                    data.parentId = tabId;
                    store.each(function(e) {
                        data.ids.push(e.data.id);
                    });
                    sendPutRequest('category/reorder', data, '一级货架排序', '排序成功', '排序失败', success, failure);
                }
            },
            'shopsecondshelf #openCreateSecondShelvesWin, shopsecondshelf #openModifySecondShelvesWin': {
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
            'shopsecondshelf #showOrHide': {
                click: function(view, column, rowIndex, colIndex, e, record) {
                    var me = this;
                    var status = record.get('status');
                    var id = record.get('id');
                    var url = null;
                    var shopId = this.shopId;
                    var parentId = this.tabIdStr.split('_')[1];
                    if (status === 0) { //隐藏，准备显示
                        url = 'category/online';
                    } else if (status == 1) { //显示，准备隐藏
                        url = 'category/offline';
                    }
                    if (url) {
                        var success = function(response) {
                            var json = eval('(' + response.responseText + ')');
                            if (json.success == false) {
                                var items = json.items,
                                    len = items.length;
                                var nameStr = [];
                                for (var i = 0; i < len; i++) {
                                    var item = items[i];
                                    nameStr.push(item.name.join('') + '(' + item.skuId + ');');
                                }
                                nameStr.push('还存在于其它分类，无法设置状态');
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: nameStr.join('<br/>'),
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                            me.showCategorySubsList(shopId, parentId);
                        };
                        var failure = function(response) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '货架状态操作失败！',
                                textAlign: 'left',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        };
                        sendPutRequest(url, {
                            id: id
                        }, '货架显示隐藏', '货架显示隐藏操作成功', '货架显示隐藏操作失败', success, failure);
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '货架初始状态错误！',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            // shopsecondshelf 删除事件
            'shopsecondshelf #delete': {
                click: function(view, rowIndex, colIndex, column, e) {
                    var self = this,
                        shopshelf = view.getRecord(view.findTargetByEvent(e)),
                        shopId = self.shopId,
                        parentId = self.tabIdStr.split('_')[1];
                    Ext.MessageBox.confirm('提示', '确定删除该货架吗?', function(result) {
                        if (result == 'yes') {
                            var id = shopshelf.data.id,
                                param = {
                                    id: id
                                },
                                url = 'category/delete';
                            sendDeleteRequest(url, param, '', '', '', function(response) {
                                if (response.responseText == '1') {
                                    Ext.Msg.alert('成功', '成功删除该货架');
                                }
                                self.showCategorySubsList(shopId, parentId);
                            }, function(response) {
                                if (response.responseText == '-1') {
                                    Ext.Msg.alert('失败', '分类中有商品，无法删除');
                                } else if (response.responseText == '-2') {
                                    Ext.Msg.alert('失败', '分类中包含次级分类，无法删除');
                                } else {
                                    Ext.Msg.alert('失败', '删除失败');
                                }
                            });
                        }
                    });
                }
            },
            // shopsecondshelf add &edit 事件
            'shopsecondshelfadd #addShelvesWin': {
                click: function() {
                    var editWindow = this.getShopSecondShelfAdd(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelves = form.getRecord(),
                        me = this,
                        shopId;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var parentId = '',
                        parentIdStr = '';
                    if (tabIdstrArray[0] == 'tab3' && tabIdstrArray[1] !== undefined) {
                        parentId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelves);
                        shopId = this.shopId;
                        // 修改分类
                        if (shelves.get('id') != null && shelves.get('id') !== '') {
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
                            if (parentId !== '') {
                                jsonStr["parentId"] = parentId;
                            }
                            sendRequest('category', jsonStr, '创建分类', '成功创建分类', '创建分类失败', function() {
                                editWindow.close();
                                me.showCategorySubsList(shopId, parentId);
                            });
                        }
                    } else {
                        Ext.Msg.alert('提示', '无效数据，请更正！');
                    }
                }
            },
            /*
             * soldout、offline、online、abandon查看事件
             */
            'shopProductSoldOut': {

                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductSoldOut());
                }
            },
            'shopProductSoldOut #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: 3
                    });
                    win.show();
                }
            },
            'shopProductOffLine': {
                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductOffLine());
                }
            },
            'shopProductOffLine #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: 1
                    });
                    win.show();
                }
            },
            'shopProductOnline': {

                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductOnline());
                }
            },
            'shopProductOnline #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: 0
                    });
                    win.show();
                }
            },

            'shopProductAbandoned': {
                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductAbandoned());
                }
            },
            'shopProductAbandoned #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: 2
                    });
                    win.show();
                }
            },
            'shopProductSearch': {
                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductSearch(), me.getShopProductSearchEdit());
                }
            },
            'shopProductSearch #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: 2
                    });
                    win.show();
                }
            },
            'shopProductSearch #openModifyShelvesGoodsWin': {
                click: function(component, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var itemId = component.getItemId();
                    var win = this.getShopProductSearchEdit();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '',
                        productLimitCount = '';
                    var categorySelectionStore = me.getShopProductSearchEdit().down('#belngShelf').getStore();
                    var categoryId = component.getRecord(component.findTargetByEvent(e)).get('categoryId');
                    var categoryStore = me.getCategoryRootsStore().getById(categoryId);
                    var categoryType = categoryStore ? categoryStore.get('type') : 1;

                    form.reset();
                    model = component.getStore().getAt(rowIndex);
                    limitType = model.get('limitType');
                    limitCount = model.get('limitCount');
                    productLimitCount = model.get('productLimitCount');
                    name = model.get('name');
                    model.set('facePrice', (Math.abs(model.get('fprice') / 100)));
                    model.set('purchasePrice', (Math.abs(model.get('pprice') / 100)));
                    model.set('discountPrice', (Math.abs(model.get('dprice') / 100)));
                    model.set('name', name);
                    if (limitType == 1) {
                        model.set('dayLimitCount', limitCount);
                        model.set('dayTodayLimitCount', productLimitCount);
                    } else if (limitType == 2) {
                        model.set('totalLimitCount', limitCount);
                        model.set('totalTodayLimitCount', productLimitCount);
                    } else {
                        model.set('dayLimitCount', '');
                        model.set('totalLimitCount', '');
                        model.set('dayTodayLimitCount', '');
                        model.set('totalTodayLimitCount', '');
                    }
                    // 库存判断
                    var stockEnable = this.getShopStore().getById(this.shopId).data.storeLimitEnable;
                    var stockCmp = win.down('#editstock');
                    if (!stockEnable) { //库存关闭
                        if (!stockCmp.isDisabled()) { //有权限
                            stockCmp.setDisabled(true);
                        }
                    }
                    if (model.get('stock') == -1) {
                        model.set('stock', '无限制');
                    }
                    categorySelectionStore.getProxy().extraParams = {
                        shopId: me.shopId
                    };
                    categorySelectionStore.load();
                    me.openWin(win, model);
                }
            },
            'shopproductsearchedit #editShelvesGoodsWin': {
                click: function() {
                    var me = this;
                    var editWindow = me.getShopProductSearchEdit(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        record = form.getRecord(),
                        adminShopTypeStore = me.getAdminAdminShopTypeStore(),
                        userInfo = adminShopTypeStore.getAt(0).getData();
                    var flags = [];
                    var count = 0;

                    if (form.isValid()) {
                        for (var pro in userInfo) {
                            if (pro == 'frozen') {
                                continue;
                            }
                            if (!me.isDisabledCmp(editWindow.down('form'), pro)) {
                                count += 1;
                            }
                        }
                        var clock = setInterval(function() {
                            if (flags.indexOf(0) == -1 && flags.length == count) {
                                me.showProductList(record.get('categoryId'));
                                editWindow.close();
                                clearInterval(clock);
                            }
                        }, 500);
                        for (var pro in userInfo) {
                            if (pro == 'frozen') {
                                return;
                            }
                            if (!me.isDisabledCmp(editWindow.down('form'), pro)) {
                                flags.push(0);
                                me[pro].call(me, form, record.get('id'), flags);
                            }
                        }
                    } else {
                        Ext.Msg.alert('无效数据', '请更正表单数据！');
                    }
                }
            },
            'shopProductSearch #setProductTop': {
                click: function(component, rowIndex, colIndex) {
                    var me = this;
                    var model = component.getStore().getAt(colIndex);
                    var productId = model.get('id');
                    var status = model.get('top');
                    var requestStr = null;
                    var categoryId = null;
                    var tabIdstrArray = this.tabIdStr.split('_');

                    if (status) {
                        requestStr = 'product/canceltop';

                    } else {
                        requestStr = 'product/top';
                    }
                    var success = function(response) {
                        me.showProductSearchList(me.shopId);
                    };
                    var failure = function() {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '修改置顶失败',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    };
                    sendPutRequest(requestStr, {
                        productId: productId
                    }, '修改置顶', '修改置顶成功', '修改置顶失败', success, failure);
                }
            },
            /*
             *shopManager事件
             */
            'shopManager #reseachManager': {
                click: function(button, e) {
                    var me = this;
                    var store = me.getShopManager().down('#searchManagerIds').getStore();
                    var keyWords = button.previousSibling().getValue();
                    if (keyWords === '') {
                        Ext.Msg.alert('提示', '请输入搜索关键字！');
                    } else {
                        store.load({
                            params: {
                                nameOrPhone: keyWords,
                                isActive: true
                            }
                        });
                    }
                }
            },
            'shopManager #save-bindShopWithManager': {
                click: function(button, e) {
                    var me = this;
                    var editWindow = this.getShopManager(),
                        form = editWindow.down('form').getForm(),
                        shopRecord = form.getRecord();
                    var selectModel = editWindow.down('#searchManagerIds').getSelectionModel();
                    var selectRecords = selectModel.getSelection();
                    var managerIds = [];
                    selectRecords.forEach(function(item) {
                        if (item.get("id") != null) {
                            managerIds.push(item.get("uid"));
                        }
                    });
                    var oldSelectModel = editWindow.down('#bindShopWithManager').getSelectionModel();
                    var oldSelectRecords = oldSelectModel.getSelection();
                    oldSelectRecords.forEach(function(item) {
                        if (item.get("uid") !== '') {
                            managerIds.push(item.get("uid"));
                        }
                    });
                    var shopId = shopRecord.get('id');
                    var store = this.getShopStore();
                    sendPutRequest('manager/bindToShop', {
                        shopId: shopId,
                        managerIds: managerIds
                    }, '掌柜绑定店铺', '成功绑定掌柜', '绑定掌柜失败', function() {
                        editWindow.close();
                        me.showShopList();
                    });
                }
            },
            /*
             *shopbuyer事件
             */
            'shopbuyer #reseachBuyer': {
                click: function() {
                    var store = Ext.ComponentQuery.query('shopbuyer #searchBuyerId')[0].getStore();
                    store.getProxy().extraParams = {
                        nameOrPhone: me.getKeywordBuyer().getValue(),
                        isActive: true
                    };
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
                        if (item.get("uid") !== '') {
                            shopperIds.push(item.get("uid"));
                        }
                    });
                    var shopId = buyerStore.get('id');
                    var store = this.getShopStore();
                    sendPutRequest('superShopper/bindToShop', {
                        shopId: shopId,
                        superShopperIds: shopperIds
                    }, '买手绑定店铺', '成功绑定买手', '绑定买手失败', function() {
                        editWindow.close();
                        me.showShopList();
                    });
                }
            },
            /*
             * product事件
             */
            'shopproduct': {
                added: function() {
                    var me = this;
                    me.disableUnAuthorityCmp(me.shopId, me.getShopProductList(), me.getShopProductEdit());
                }
            },
            'shopproduct #putawayOrOut': {
                click: function(grid, cell, rowIndex, colIndex, e, record, row) {
                    var me = this;
                    var win = me.getShopProductStatusEdit();
                    var form = win.down('form').getForm();
                    form.reset();
                    form.setValues({
                        id: record.get('id'),
                        status: record.get('status')
                    });
                    win.show();
                }
            },
            'shopproduct #setProductTop': {
                click: function(component, rowIndex, colIndex) {
                    var me = this;
                    var model = component.getStore().getAt(colIndex);
                    var productId = model.get('id');
                    var status = model.get('top');
                    var requestStr = null;
                    var categoryId = null;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    if (tabIdstrArray[0] == 'tab4' && tabIdstrArray[1] !== undefined) {
                        categoryId = tabIdstrArray[1];
                    }
                    if (status) {
                        requestStr = 'product/canceltop';
                    } else {
                        requestStr = 'product/top';
                    }
                    var success = function(response) {
                        me.showProductList(categoryId);
                    };
                    var failure = function() {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '修改置顶失败',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    };
                    sendPutRequest(requestStr, {
                        productId: productId
                    }, '修改置顶', '修改置顶成功', '修改置顶失败', success, failure);
                }
            },
            'shopproduct #increaseProduct': {
                click: function(component, rowIndex, colIndex) {
                    var itemId = component.getItemId();
                    var win = this.getShopProductAdd();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '';
                    form.reset();
                    var stockEnable = this.getShopStore().getById(this.shopId).data.storeLimitEnable;
                    var productAddWin = this.getShopProductAdd();
                    if (stockEnable) {
                        productAddWin.down('#stock').setDisabled(false);
                    } else {
                        productAddWin.down('#stock').setDisabled(true);
                    }
                    model = this.getProductModel();
                    model = new model();
                    me.openWin(win, model);
                }
            },
            'shopproduct #openModifyShelvesGoodsWin': {
                click: function(component, dom, rowIndex, colIndex, e, store) {
                    var me = this;
                    var itemId = component.getItemId();
                    var win = this.getShopProductEdit();
                    var model, form = win.down('form').getForm();
                    var name = '',
                        productTemplateId = '',
                        limitType = '',
                        limitCount = '',
                        productLimitCount = '';
                    var categorySelectionStore = me.getShopProductEdit().down('#belngShelf').getStore();
                    var categoryId = component.getRecord(component.findTargetByEvent(e)).get('categoryId');
                    var categoryStore = me.getCategoryRootsStore().getById(categoryId);
                    var categoryType = categoryStore ? categoryStore.get('type') : 1;

                    form.reset();

                    model = component.getStore().getAt(rowIndex);
                    limitType = model.get('limitType');
                    limitCount = model.get('limitCount');
                    productLimitCount = model.get('productLimitCount');
                    name = model.get('name');
                    model.set('facePrice', (Math.abs(model.get('fprice') / 100)));
                    model.set('purchasePrice', (Math.abs(model.get('pprice') / 100)));
                    model.set('discountPrice', (Math.abs(model.get('dprice') / 100)));
                    model.set('name', name);
                    if (limitType == 1) {
                        model.set('dayLimitCount', limitCount);
                        model.set('dayTodayLimitCount', productLimitCount);
                    } else if (limitType == 2) {
                        model.set('totalLimitCount', limitCount);
                        model.set('totalTodayLimitCount', productLimitCount);
                    } else {
                        model.set('dayLimitCount', '');
                        model.set('totalLimitCount', '');
                        model.set('dayTodayLimitCount', '');
                        model.set('totalTodayLimitCount', '');
                    }

                    // 库存判断
                    var stockEnable = this.getShopStore().getById(this.shopId).data.storeLimitEnable;
                    var stockCmp = win.down('#editstock');
                    if (!stockEnable) { //库存关闭
                        if (!stockCmp.isDisabled()) { //有权限
                            stockCmp.setDisabled(true);
                        }
                    }
                    if (model.get('stock') == -1) {
                        model.set('stock', '无限制');
                    }
                    categorySelectionStore.getProxy().extraParams = {
                        shopId: me.shopId
                    };
                    categorySelectionStore.load();

                    me.openWin(win, model);
                }
            },
            // product add & edit事件
            'shopproductadd #reseachProductTemplate': {
                click: function() {
                    var store = me.getProductTemplateStore();
                    var keyType = 1;
                    if (me.getShopProductAdd().down('#searchtype').checked) {
                        keyType = 2;
                    }
                    store.load({
                        params: {
                            keyword: me.getKeywordProductTemplate().getValue(),
                            keyType: keyType
                        }
                    });
                }
            },
            'shopproductadd #addShelvesGoodsWin': {
                click: function() {
                    var editWindow = this.getShopProductAdd(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        shelvesGoods = form.getRecord(),
                        me = this;
                    var tabIdstrArray = this.tabIdStr.split('_');
                    var shopId = null,
                        proCategoryId = null,
                        categoryId = '',
                        limitType = 0,
                        limitCount = 0,
                        productLimitCount = 0,
                        stock = null;
                    // 获取商品类目id
                    if (tabIdstrArray[0] == 'tab4' && tabIdstrArray[1] != undefined) {
                        categoryId = tabIdstrArray[1];
                    }
                    if (form.isValid()) {
                        form.updateRecord(shelvesGoods);
                        // 店铺id赋值
                        shopId = this.shopId;
                        // 限购类型赋值
                        // 价格判断
                        var facePrice = me.priceTransform(shelvesGoods.get('facePrice'));
                        var discountPrice = me.priceTransform(shelvesGoods.get('discountPrice'));
                        var purchasePrice = me.priceTransform(shelvesGoods.get('purchasePrice'));
                        if (discountPrice != "") {
                            if (discountPrice > facePrice) {
                                Ext.Msg.alert('提示', '折扣价不能大于原价');
                                return;
                            };
                        }
                        // 库存判断
                        var stockEnable = me.getShopProductAdd().down('#stock');
                        if (!stockEnable.isDisabled()) {
                            stock = form.getValues()['stock'];
                            if (stock == '') {
                                stock = -1;
                            } else if (stock == 0 || stock < -1) {
                                Ext.MessageBox.show({
                                    title: '提示',
                                    msg: '库存输入错误！',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                                return
                            }
                            shelvesGoods.set('stock', stock);
                        }
                        // 模板赋值
                        var selectModel = Ext.ComponentQuery.query('#productTemplateId')[0].getSelectionModel();
                        var selectRecords = selectModel.getSelection();
                        if (selectRecords[0] == null) {
                            Ext.Msg.alert('添加商品失败', '请选择添加商品模板');
                            windowEl.unmask();
                            return;
                        }
                        // 添加参数
                        shelvesGoods.set('shopId', shopId);
                        shelvesGoods.set('categoryId', categoryId);
                        shelvesGoods.set('facePrice', facePrice);
                        shelvesGoods.set('purchasePrice', purchasePrice);
                        shelvesGoods.set('discountPrice', discountPrice);
                        shelvesGoods.set('productTemplateId', selectRecords[0].raw.id);
                        // 开始保存
                        windowEl.mask('saving');
                        shelvesGoods.save({
                            success: function(task, operation) {
                                var responseText = operation.response.responseText;
                                if (responseText == '-100') {
                                    Ext.MessageBox.show({
                                        title: '提示',
                                        msg: '添加错误：-100，请联系开发人员！',
                                        icon: Ext.Msg.ERROR,
                                        buttons: Ext.Msg.OK
                                    });
                                }
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
                    } else {
                        Ext.Msg.alert('提示', '无效数据，请更正！');
                    }
                }
            },
            'shopproductedit #editShelvesGoodsWin': {
                click: function() {
                    var me = this;
                    var editWindow = me.getShopProductEdit(),
                        windowEl = editWindow.getEl(),
                        form = editWindow.down('form').getForm(),
                        record = form.getRecord(),
                        adminShopTypeStore = me.getAdminAdminShopTypeStore(),
                        userInfo = adminShopTypeStore.getAt(0).getData();
                    var flags = [];
                    var count = 0;

                    if (form.isValid()) {
                        for (var pro in userInfo) {
                            if (pro == 'frozen') {
                                continue
                            }
                            if (!me.isDisabledCmp(editWindow.down('form'), pro)) {
                                count += 1;
                            }
                        }
                        var clock = setInterval(function() {
                            if (flags.indexOf(0) == -1 && flags.length == count) {
                                me.showProductList(record.get('categoryId'));
                                editWindow.close();
                                clearInterval(clock);
                            }
                        }, 500);
                        for (var pro in userInfo) {
                            if (pro == 'frozen') {
                                return
                            }
                            if (!me.isDisabledCmp(editWindow.down('form'), pro)) {

                                flags.push(0);
                                me[pro].call(me, form, record.get('id'), flags);
                            }
                        }
                    } else {
                        Ext.Msg.alert('无效数据', '请更正表单数据！');
                    }
                }
            },
            'shopProductStatusEdit #saveStatusChange': {
                click: function(button, e) {
                    var me = this;
                    me.productStatusValidate(button, e);
                }
            }
        });
        Ext.QuickTips.init();
    },
    showShopList: function() {
        var dstore = this.getShopStore();
        dstore.getProxy().extraParams = {
            city: XMLifeOperating.generic.Global.currentCity,
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
        var me = this;
        var shopShelfStore = this.getCategoryRootsStore();
        var view = me.getShopShelf();
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
            case 'online':
                me.showProductOnlineList(shopId);
                break;
            case 'abandoned':
                me.showProductAbandonedList(shopId);
                break;
        }
    },
    showProductAbandonedList: function(shopId) {
        var me = this,
            categoryStore = me.getShopCategoriesStore(); //在货架页，category已经加载
        categoryStore.getProxy().extraParams = {
            shopId: shopId,
            status: 2
        }
        categoryStore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    showProductOnlineList: function(shopId) {
        var me = this,
            categoryStore = me.getShopCategoriesStore(); //在货架页，category已经加载
        categoryStore.getProxy().extraParams = {
            shopId: shopId,
            status: 0
        }
        categoryStore.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
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
            shelf = me.getShopShelf(),
            keyWords = shelf.down('#keyword').getValue(),
            searchtype = shelf.down('#searchtype'),
            keyType = 1,
            store = me.getProductSearchStore();
        if (keyWords == '') {
            return;
        } else {
            if (searchtype.checked) {
                keyType = 2;
            }
            store.load({
                params: {
                    shopId: shopId,
                    keyword: keyWords,
                    keyType: keyType
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
        var inputs = form.getValues();
        var data = {
            id: null,
            bannerIds: [],
            bannerUrls: [],
            titles: []
        }
        inputs.id = form.getRecord().get('id');
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
            Ext.Msg.alert('提示', '无效数据，请更正！');
        }
    },
    changePriceRecordList: function(grid) {
        var status = grid.down('#isverifyCombo').getValue();
        var shopId = this.shopId;
        store = grid.store;
        store.getProxy().extraParams = {
            shopId: shopId,
            status: status || ''
        }
        store.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    skuIdSearch: function() {
        var changePriceRecordList = this.getChangePriceRecordList(),
            goodsSkuIdObj = changePriceRecordList.down('[name=goodsSkuId]');
        var shopId = this.shopId;
        goodsSkuId = goodsSkuIdObj.getValue();
        store = changePriceRecordList.store;
        store.getProxy().extraParams = {
            shopId: shopId,
            skuId: goodsSkuId || ''
        }
        store.loadPage(1, {
            params: {
                start: 0,
                limit: 25,
                page: 1
            }
        });
    },
    priceTransform: function(value) {
        return parseInt((value * 100).toFixed());
    },
    disableUnAuthorityCmp: function(shopId, listview, editview) {
        var me = this;
        var shopStore = me.getShopStore(),
            adminShopTypeStore = me.getAdminAdminShopTypeStore(),
            currentShop = shopStore.getById(shopId),
            currentShopType = currentShop.get('type'),
            userInfo = adminShopTypeStore.getAt(0).getData(), //获取第一位
            listview = listview || me.getShopProductList(),
            editview = editview || me.getShopProductEdit(),
            statusview = statusview || me.getShopProductStatusEdit();

        for (var properName in userInfo) {
            var properArray = userInfo[properName];
            var itemId = '#' + properName;
            if (properArray == '' || (properArray instanceof Array && properArray.indexOf(currentShopType) == -1)) { //没有权限
                if (editview.down(itemId)) { //在ProductEdit中的操作
                    editview.down(itemId).setDisabled(true);
                } else if (listview.down(itemId)) { //在ProductList中的操作
                    listview.down(itemId).setDisabled(true);
                } else { //状态下拉框禁用
                    var editor = statusview.down('#status');
                    if (editor.findRecord('itemId', properName)) {
                        editor.findRecord('itemId', properName).set('disabled', true);
                    }
                }
            } else {
                if (editview.down(itemId)) {
                    editview.down(itemId).setDisabled(false);
                } else if (listview.down(itemId)) {
                    listview.down(itemId).setDisabled(false);
                } else {
                    var editor = statusview.down('#status');
                    if (editor.findRecord('itemId', properName)) {
                        editor.findRecord('itemId', properName).set('disabled', false);
                    }
                }
            }
        }
    },
    isDisabledCmp: function(view, cmpId) {
        var me = this,
            cmp = view.down('#' + cmpId);
        if (cmp) {
            if (!cmp.isDisabled()) { //未被禁用
                if (cmp.down && cmp.down('#belngShelf')) { //移动货架
                    return cmp.down('#belngShelf').isDisabled()
                } else {
                    return false
                }
            } else {
                return true
            }
        } else {
            return true
        }
    },
    //商品信息修改
    editprice: function(formData, productId, flags) {
        var me = this;
        var form = formData,
            id = productId,
            record = form.getRecord(),
            values = form.getValues(),
            facePrice = me.priceTransform(values['facePrice']),
            discountPrice = me.priceTransform(values['discountPrice']),
            purchasePrice = me.priceTransform(values['purchasePrice']),
            editWindow = me.getShopProductEdit(),
            flagIdx = flags.length - 1,
            data = {};
        var success = function(response) {
            flags[flagIdx] = true;
            if (response.responseText == 2) {
                var message = Ext.MessageBox.show({
                    title: '提示',
                    msg: '价格修改成功，等待审核…',
                    buttons: Ext.Msg.OK
                });
                setTimeout(function() {
                    message.close();
                }, 1000);
            }
        }
        var failure = function(response) {
            flags[flagIdx] = false;
            Ext.MessageBox.show({
                title: '提示',
                msg: '限购库存失败',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
        if (discountPrice != "") {
            data.discountPrice = discountPrice;
            if (discountPrice > facePrice) {
                Ext.Msg.alert('提示', '折扣价不能大于原价');
                return;
            }
        }
        data.id = id;
        data.facePrice = facePrice;
        data.purchasePrice = purchasePrice;
        sendPutRequest('product/updatePrice', data, '修改商品价格', '修改商品价格成功', '修改商品价格失败', success, failure);
    },
    editlimit: function(formData, productId, flags) {
        var me = this;
        var form = formData,
            id = productId,
            record = form.getRecord(),
            limitType = form.getValues()['limitType'],
            flagIdx = flags.length - 1,
            editWindow = me.getShopProductEdit(),
            data = {};
        var success = function(response) {
            flags[flagIdx] = true;
        }
        var failure = function(response) {
            flags[flagIdx] = false;
            Ext.MessageBox.show({
                title: '提示',
                msg: '限购修改失败',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
        if (limitType == 1) {
            data.limitCount = form.getValues()['dayLimitCount'];
            data.productLimitCount = form.getValues()['dayTodayLimitCount'];
        } else if (limitType == 2) {
            data.limitCount = form.getValues()['totalLimitCount'];
            data.productLimitCount = form.getValues()['totalTodayLimitCount'];
        } else {
            data.limitType = 0;
            data.limitCount = 0;
            data.productLimitCount = 0;
        }
        if (data.limitCount == 0 || data.limitCount == null || data.limitCount == '') {
            data.limitType = 0;
        }
        data.limitType = limitType;
        data.id = id;
        sendPutRequest('product/updateLimit', data, '修改商品限购', '修改商品限购成功', '修改商品限购失败', success, failure);
    },
    editstock: function(formData, productId, flags) {
        var me = this;
        var form = formData,
            id = productId,
            record = form.getRecord(),
            stock = form.getValues()['stock'],
            flagIdx = flags.length - 1,
            editWindow = me.getShopProductEdit(),
            data = {};
        var success = function(response) {
            //record.set('stock', stock);
            flags[flagIdx] = true;
        }
        var failure = function(response) {
            flags[flagIdx] = false;
            Ext.MessageBox.show({
                title: '提示',
                msg: '设置库存失败',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
        if (stock == '') {
            stock = -1;
        } else if (stock == 0 || stock < -1) {
            Ext.MessageBox.show({
                title: '提示',
                msg: '库存输入错误！',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return
        }
        data.stock = stock;
        data.id = id;
        sendPutRequest('product/updateStock', data, '修改商品库存', '修改商品库存成功', '修改商品库存失败', success, failure);
    },
    changeStorageRack: function(formData, productId, flags) {
        var me = this;
        var form = formData,
            id = productId,
            record = form.getRecord(),
            flagIdx = flags.length - 1,
            editWindow = me.getShopProductEdit(),
            data = {};
        var success = function() {
            flags[flagIdx] = true;
        }
        var failure = function() {
            flags[flagIdx] = false;
            Ext.MessageBox.show({
                title: '提示',
                msg: '移动货架失败',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
        if (form.getValues()['changeBelongShelf'] && form.getValues()['changeBelongShelf'] == 'on') {
            data.newCategory = form.getValues()['belngShelf'];
            data.proCategoryId = record.data.categoryId;
            data.id = id;
            sendPutRequest('product/changeCategory', data, '修改商品货架', '修改商品货架成功', '修改商品货架失败', success, failure);
        } else {
            return
        }
    },
    closeAllTabs: function() { //实际删除的是一级货架以外的货架
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
    productStatusValidate: function(button, e) {

        var me = this;
        var win = me.getShopProductStatusEdit();
        var form = button.up('form');

        if (form.isValid()) {
            var values = form.getValues();
            var shopId = me.shopId;
            var tabIdArr = me.tabIdStr.split('_');
            var panelKind = tabIdArr[0];
            var panelId = tabIdArr[1];
            var status = values.status;
            var id = values.id;
            var url = ['product'];
            var reason = values.stchangereason ? (function(reasons) { //二进制转换为十进制
                var sum = 0;
                var len = reasons.length;
                if (len) {
                    for (var i = 0; i < len; i++) {
                        sum += reasons[i];
                    }
                } else {
                    sum += reasons;
                }

                return parseInt(sum, 2);

            }(values.stchangereason)) : undefined;
            var fn = function(env, kind, panelId, shopId) {
                switch (kind) {
                    case 'tab4':
                        //商品
                        env.showProductList(panelId);
                        break;
                    case 'tab5':
                        env.showProductSoldOutOrOffLineList(shopId, panelId);
                        break;
                    case 'tab6':
                        env.showProductSearchList(shopId);
                        break;
                    default:
                        break;
                }
            }

            var success = (function(env, kind, panelId, shopId) {
                return function() {
                    fn(env, kind, panelId, shopId);
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '改变商品状态成功',
                        buttons: Ext.Msg.OK
                    });
                    win.close();
                    return true;
                }
            }(me, panelKind, panelId, shopId));
            var failure = function() {
                Ext.MessageBox.show({
                    title: '提示',
                    msg: '改变商品状态失败',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                return false;
            }

            var data = {
                productId: id
            }
            if (reason) {
                data.reason = reason;
            }

            switch (status) {
                case 0: //上架
                    url.push('/online');
                    break;
                case 1: //雪藏
                    url.push('/offline');
                    break;
                case 2: //废弃
                    url.push('/remove');
                    break;
                case 3: //下架
                    url.push('/soldout');
                    break;
                default:
                    return;
                    break;
            }
            sendPutRequest(url.join(''), data, '改变商品状态', '改变商品状态成功', '改变商品状态失败', success, failure);
        } else {
            Ext.Msg.alert('提示', '请勾选修改原因！');
        }
    }
});
