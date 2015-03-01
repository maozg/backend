Ext.define('XMLifeOperating.controller.ProductTemplate', {
    extend: 'Ext.app.Controller',

    views: [
        'templateManage.productTemplate.ProductTemplateList',
        'templateManage.productTemplate.ProductTemplateEdit',
        'templateManage.productTemplate.batchModifiWindow',
        'templateManage.productTemplate.batchAddWindow'
    ],

    stores: [
        'ProductTemplatePageSearch',
        'ProductUnit',
        'ProductTemplateRoots',
        'ProductTemplateSubs',
        'ProductTemplateGetByCategoryId'
    ],

    models: [
        'ProductTemplatePageSearch',
        'ProductUnit',
        'ProductTemplateRoots',
        'ProductTemplateSubs',
        'ProductTemplateGetByCategoryId'
    ],

    refs: [{
        ref: 'productTemplateList',
        selector: 'productTemplateList',
        xtype: 'productTemplateList',
        autoCreate: true
    }, {
        ref: 'editWindow',
        selector: 'productTemplateEdit',
        xtype: 'productTemplateEdit',
        autoCreate: true
    }, {
        ref: 'batchModifiWindow',
        selector: 'batchModifiWindow',
        xtype: 'batchModifiWindow',
        autoCreate: true
    }, {
        ref: 'batchAddWindow',
        selector: 'batchAddWindow',
        xtype: 'batchAddWindow',
        autoCreate: true
    }, {
        ref: 'keyword',
        selector: '#keyword'
    }, {
        ref: 'dataview',
        selector: '#dataview'
    }],

    init: function() {
        var me = this;
        //创建新的数据类型
        this.control({
            'productTemplateList': {
                show: function() {
                    var me = this;
                    var rootStore = me.getProductTemplateRootsStore();
                    var tabpanel = me.getProductTemplateList().down('tabpanel');
                    var callback = function(records) {
                        var len = records ? records.length : 0;
                        var tabs = tabpanel.items;

                        if (!len) {
                            return;
                        }

                        for (var i = 0; i < len; i++) {
                            var id = records[i].get('id');

                            if (tabs.findIndex('id', id) === -1) {
                                tabpanel.add({
                                    title: records[i].get('name'),
                                    id: id,
                                    closable: true,
                                    listeners: {
                                        beforeclose: function(tab) {
                                            var categoryId = tab.id;
                                            var success = function() {
                                                var tabpanel = tab.getRefOwner();
                                                if (tabpanel) {
                                                    tabpanel.fireEvent('removeTab', tabpanel, tab);
                                                }
                                            };
                                            var failure = function() {
                                                Ext.MessageBox.show({
                                                    title: '提示',
                                                    msg: '删除分类失败',
                                                    icon: Ext.Msg.ERROR,
                                                    buttons: Ext.Msg.OK
                                                });
                                            };
                                            sendDeleteRequest('producttemplate/deleteCategory', {
                                                categoryId: categoryId
                                            }, '删除分类', '删除分类成功', '删除分类失败', success, failure);
                                            return false;
                                        }
                                    }
                                });
                            }
                        }

                        tabpanel.setActiveTab(0);
                    };
                    //清空原tab列表
                    tabpanel.removeAll();
                    rootStore.load({
                        callback: callback
                    });
                }
            },
            'productTemplateList #productTemplateTabs': {
                tabchange: function(tabpanel, newCard) {
                    var me = this;
                    var rootId = newCard.id;
                    var categoryStore = me.getProductTemplateSubsStore();

                    categoryStore.load({
                        params: {
                            parentId: rootId
                        }
                    });
                },
                removeTab: function(tabpanel, tab) {
                    var me = this;
                    var rootStore = me.getProductTemplateRootsStore();
                    var subStore = me.getProductTemplateSubsStore();
                    var tempStore = me.getProductTemplateGetByCategoryIdStore();

                    //删除tab视图、数据
                    tabpanel.remove(tab);
                    rootStore.removeAt(rootStore.findExact('id', tab.id));

                    //无tab时删除tree store数据
                    if (tabpanel.items.length === 0 && rootStore.data.items.length === 0) {
                        subStore.getRootNode().removeAll();
                        tempStore.removeAll();
                    }
                }
            },
            'productTemplateList #batchModifi': {
                click: function() {
                    this.getBatchModifiWindow().show();
                }
            },
            'productTemplateList #batchAdd': {
                click: function() {
                    this.getBatchAddWindow().show();
                }
            },
            'productTemplateList #add': {
                click: function() {
                    var cClass = this.getProductTemplatePageSearchModel();
                    var productTemplate = new cClass();
                    var win = this.getEditWindow();
                    win.down('#barCodeId').setDisabled(false);
                    win.down('#skuIdId').setDisabled(false);
                    win.down('form').loadRecord(productTemplate);
                    win.down('form').getForm().reset();
                    win.show();
                }
            },
            'productTemplateList #productTemplateTree': {
                //view tree视图，record 节点数据， item节点dom ，index 节点顺序 ，e 事件响应， opts view事件
                itemclick: function(view, record) {
                    var me = this;
                    var leaf = record.get('leaf'),
                        grid = me.getProductTemplateList().down('#productTemplateGrid'),
                        picView = me.getProductTemplateList().down('#productTemplatePicView'),
                        pageTool = me.getProductTemplateList().down('#pagetoll');
                    if (leaf) {
                        //叶子
                        var store = me.getProductTemplateGetByCategoryIdStore();
                        var categoryId = record.get('id');

                        if (grid.getStore().storeId != store.storeId) {
                            grid.bindStore(store);
                            picView.bindStore(store);
                            pageTool.bindStore(store);
                        }
                        store.getProxy().extraParams = {
                            categoryId: categoryId
                        };
                        store.loadPage(1, {
                            page: 1,
                            limit: 25,
                            start: 0
                        });
                    } else {
                        return false;
                    }
                }
            },
            '#productSearch': {
                click: function() {
                    var me = this,
                        store = me.getProductTemplatePageSearchStore(),
                        grid = me.getProductTemplateList().down('#productTemplateGrid'),
                        picView = me.getProductTemplateList().down('#productTemplatePicView'),
                        pageTool = me.getProductTemplateList().down('#pagetoll'),
                        typeradio = me.getProductTemplateList().down('#searchtype'),
                        keyType = 1;
                    if (typeradio.checked) {
                        keyType = 2;
                    }
                    if (grid.getStore().storeId != store.storeId) {
                        grid.bindStore(store);
                        picView.bindStore(store);
                        pageTool.bindStore(store);
                    }
                    store.getProxy().extraParams = {
                        keyword: me.getKeyword().getValue(),
                        keyType: keyType
                    };
                    store.loadPage(1, {
                        page: 1,
                        limit: 25,
                        start: 0
                    });
                }
            },
            'productTemplateList #editProductTemplate': {
                click: me.onEdit
            },
            'productTemplateList #detailViewBtn': {
                click: function() {
                    me.switchView(0);
                }
            },
            'productTemplateList #picViewBtn': {
                click: function() {
                    me.switchView(1);
                }
            },
            // dataView内事件
            'productTemplateList #productTemplatePicView': {
                viewready: function(view) {
                    // 快速编辑rank
                    view.mon(view.getEl(), {
                        delegate: 'input',
                        mouseover: function(e) {
                            Ext.fly(e.target).setStyle('border', '1px solid #eee');
                        }
                    });
                    view.mon(view.getEl(), {
                        delegate: 'input',
                        mouseout: function(e) {
                            Ext.fly(e.target).setStyle('border', '1px solid #fff');
                        }
                    });
                    view.mon(view.getEl(), {
                        delegate: 'input',
                        change: function(e) {
                            me.saveRank(view, e, Ext.fly(e.target).getValue());
                        }
                    });
                    // 修改
                    view.mon(view.getEl(), {
                        delegate: 'img.x-action-col-icon',
                        click: function(e) {
                            me.onEdit(view, undefined, undefined, undefined, e);
                        }
                    });
                }
            },
            'productTemplateEdit #btnSave': {
                click: me.saveEditWindow
            },
            'productTemplateEdit #menuitem': {
                click: function() {}
            },
            'batchAddWindow #addProduct': {
                click: function(gird) {
                    me.subForm(gird);
                }
            },
            'batchModifiWindow button': {
                click: function(gird) {
                    me.subForm(gird);
                }
            }
        });
    },
    switchView: function(nth) {
        Ext.getCmp('productTemplateContent').getLayout().setActiveItem(nth);
    },
    subForm: function(gird) {
        var form = gird.up('form').getForm();
        var sessionId = localStorage.getItem('sessionId') || '';
        if (form.isValid()) {
            if (form.url.indexOf('sessionId') < 0) {
                form.url = form.url + '?sessionId=' + sessionId;
            }
            form.submit({
                params: {
                    sessionId: sessionId
                },
                waitMsg: '正在上传您的文件......',
                success: function(form, action) {
                    var data = action.response.responseText;
                    console.log(data);
                    this.form.getFields().items[0].fileInputEl.set({
                        multiple: 'multiple'
                    });
                },
                failure: function(form, action) {
                    var data = action.response.responseText;
                    console.log(data);
                    this.form.getFields().items[0].fileInputEl.set({
                        multiple: 'multiple'
                    });
                }
            });
        }
    },
    onEdit: function(view, rowIndex, colIndex, column, e) {
        var productTemplate = view.getRecord(view.findTargetByEvent(e));
        var win = this.getEditWindow();
        var names = [];

        if (productTemplate.get('name').indexOf('\n')) {
            names = productTemplate.get('name').split('\n');
        }

        productTemplate.set('name1', names[0]);
        productTemplate.set('name2', names[1]);
        productTemplate.set('name3', names[2]);
        /*win.down('#barCodeId').setDisabled(true);*/
        win.down('#skuIdId').setDisabled(true);
        win.down('form').loadRecord(productTemplate);
        win.show();
    },
    saveRank: function(view, e, rank) {
        var record = view.getRecord(view.findTargetByEvent(e));
        record.set('rank', rank);

        var names = [];
        if (record.get('name').indexOf('\n')) {
            names = record.get('name').split('\n');
        }
        record.set('names', names);

        sendPutRequest('producttemplate/update', record.data, '编辑商品', '成功编辑商品', '编辑商品失败', function() {});
    },
    saveEditWindow: function() {
        var editWindow = this.getEditWindow(),
            windowEl = editWindow.getEl(),
            view = editWindow.down('form'),
            form = view.getForm(),
            fileInput = editWindow.down('filefield'),
            productTemplate = form.getRecord(),
            me = this;

        if (form.isValid()) {
            windowEl.mask('saving');
            form.updateRecord(productTemplate);

            //获取当前视图store（存在多个切换）
            var store = me.getProductTemplateList().down('#productTemplateGrid').getStore(),
                storeId = store.storeId;
            var names = [];
            names.push(productTemplate.get('name1'));
            names.push(productTemplate.get('name2'));
            names.push(productTemplate.get('name3'));
            productTemplate.set('names', names);

            if (productTemplate.get('id') !== '' && productTemplate.get('id') != null) {

                var id = productTemplate.get('id');
                //var name = productTemplate.get('name');
                var desc = productTemplate.get('desc');
                var picture = productTemplate.get('picture');
                var unit = productTemplate.get('unit');
                var tag = productTemplate.get('tag');
                var barcode = productTemplate.get('barCode');
                var rank = productTemplate.get('rank');
                var rank2 = productTemplate.get('rank2');
                var sessionId = localStorage.getItem('sessionId') || '';
                var pkgSkuId = productTemplate.get('pkgSkuId');
                var pkgCount = productTemplate.get('pkgCount');
                var returnEnable = productTemplate.get('returnEnable');
                var weight = productTemplate.get('weight');
                var extraServiceCharge = productTemplate.get('extraServiceCharge');

                form.submit({
                    url: XMLifeOperating.generic.Global.URL.biz + 'producttemplate/update?sessionId=' + sessionId,
                    params: {
                        id: id,
                        sessionId: sessionId,
                        name: names.join('\n')
                    },
                    waitMsg: '正在提交数据',
                    waitTitle: '提示',
                    success: function(form, action) {
                        var resid = action.response.responseText;
                        store.loadPage(1);
                        editWindow.close();
                        windowEl.unmask();
                        fileInput.fileInputEl.set({
                            multiple: 'multiple'
                        });
                    },
                    failure: function(form, action) {
                        var resid = action.response.responseText;
                        editWindow.close();
                        fileInput.fileInputEl.set({
                            multiple: 'multiple'
                        });
                        if (resid == -99) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '图片命名为:SKUID+"-"+一位数字',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            windowEl.unmask();
                            return;
                        } else if (resid == 175) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '模板命名过长',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            windowEl.unmask();
                            return;
                        } else if (resid == 1) {
                            Ext.Msg.alert('提示', '修改商品模板成功！');
                            editWindow.close();
                            store.loadPage(1);
                        }
                        store.loadPage(1);
                        windowEl.unmask();
                    }
                });
            } else {
                var treeSelected = me.getProductTemplateList().down('#productTemplateTree').getSelectionModel().selected;
                var id = productTemplate.get('id');
                //var name = productTemplate.get('name');
                var desc = productTemplate.get('desc');
                var picture = productTemplate.get('picture');
                var unit = productTemplate.get('unit');
                var tag = productTemplate.get('tag');
                var barCode = productTemplate.get('barCode');
                var skuId = productTemplate.get('skuId');
                var rank = productTemplate.get('rank');
                var rank2 = productTemplate.get('rank2');
                var sessionId = localStorage.getItem('sessionId') || '';
                var pkgSkuId = productTemplate.get('pkgSkuId');
                var pkgCount = productTemplate.get('pkgCount');
                var returnEnable = productTemplate.get('returnEnable');
                var weight = productTemplate.get('weight');
                var extraServiceCharge = productTemplate.get('extraServiceCharge');

                if (treeSelected.length == 1) {
                    if (treeSelected.items[0].get('leaf') !== false) {
                        var categoryId = treeSelected.items[0].get('id');
                    } else {
                        Ext.MessageBox.show({
                            title: '提示',
                            msg: '请选择一个叶子分类',
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                        windowEl.unmask();
                        return;
                    }
                } else {
                    Ext.MessageBox.show({
                        title: '提示',
                        msg: '添加商品模板请的选择分类',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                    windowEl.unmask();
                    return;
                }

                form.submit({
                    url: XMLifeOperating.generic.Global.URL.biz + 'producttemplate?sessionId=' + sessionId,
                    params: {
                        categoryId: categoryId,
                        sessionId: sessionId,
                        name: names.join('\r')
                    },
                    waitMsg: '正在提交数据',
                    waitTitle: '提示',
                    success: function(form, action) {
                        var resid = action.response.responseText;
                        store.loadPage(1);
                        editWindow.close();
                        windowEl.unmask();
                        fileInput.fileInputEl.set({
                            multiple: 'multiple'
                        });
                    },
                    failure: function(form, action) {
                        var resid = action.response.responseText;
                        editWindow.close();
                        fileInput.fileInputEl.set({
                            multiple: 'multiple'
                        });
                        if (resid == -99) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '图片命名为:SKUID+"-"+一位数字',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            windowEl.unmask();
                            return;
                        } else if (resid == 175) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '模板命名过长',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                            windowEl.unmask();
                            return;
                        } else if (resid == 1) {
                            Ext.Msg.alert('提示', '添加商品模板成功！');
                            editWindow.close();
                            store.loadPage(1);
                        }
                        store.loadPage(1);
                        windowEl.unmask();
                    }
                });
            }
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors');
        }
    }
});
