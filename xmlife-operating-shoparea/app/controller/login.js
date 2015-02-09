Ext.define('XMLifeOperating.controller.login', {
    extend: 'Ext.app.Controller',
    views: ['admin.login', 'Toolbar', 'Navigation'],
    stores: ['ShopArea', 'Navigation', 'AdminAdminShopType'],
    models: ['ShopArea', 'AdminAdminShopType'],
    refs: [{
        ref: 'login',
        selector: 'login',
        xtype: 'login',
        autoCreate: true
    }, {
        ref: 'headerToolbar',
        selector: 'headerToolbar',
        xtype: 'headerToolbar',
        autoCreate: true
    }, {
        ref: 'currentUsername',
        selector: '#txtUserName'
    }, {
        ref: 'cmbGlobalCity',
        selector: '#cmbGlobalCity'
    }, {
        ref: 'cmbGlobalCenter',
        selector: 'headerToolbar #cmbGlobalCenter',
    }, {
        ref: 'txtShopAreaName',
        selector: 'headerToolbar #txtShopAreaName'
    }],
    init: function() {
        var self = this;
        var sessionId = localStorage.getItem('sessionId');
        var areaId = localStorage.getItem('areaId');

        if (areaId) {
            XMLifeOperating.generic.Global.current_operating = areaId;
        }

        this.control({
            'login': {
                show: function(panel) {
                    var ele = panel.getEl();

                    self.bindKeyMap(ele);
                }
            },
            '#login-bt': {
                click: self.login
            },
            'headerToolbar #txtUserName': {
                click: function() {
                    var sessionId = localStorage.getItem('sessionId');

                    if (!sessionId) {
                        this.getLogin().show();
                    }
                }
            },
            'headerToolbar #editAdmin': {
                click: function() {
                    var loginView = this.getLogin(),
                        form = loginView.down('form'),
                        formEl = form.getForm(),
                        username = localStorage.getItem('username'),
                        nickField = loginView.down('[name=nick]'),
                        usernameField = loginView.down('[name=username]'),
                        passwordField = loginView.down('[name=password]'),
                        newPasswordField = loginView.down('[name=newPassword]'),
                        reNewPasswordField = loginView.down('[name=reNewPassword]'),
                        loginBt = loginView.down('#login-bt');

                    formEl.reset();
                    Ext.Ajax.request({
                        url: XMLifeOperating.generic.Global.URL.biz + 'admin/getInfo',
                        success: function(result) {
                            var data = Ext.decode(result.responseText);
                            nickField.show().setValue(data.name).setDisabled(true);
                            usernameField.setValue(data.account).setDisabled(true);
                        }
                    });

                    newPasswordField.show();
                    reNewPasswordField.show();
                    passwordField.setFieldLabel('旧密码');
                    loginBt.setText('确定');
                    self.edit = true;
                    loginView.show();
                }
            },
            'headerToolbar #btnSignOut': {
                click: function() {
                    var loginOutUrl = XMLifeOperating.generic.Global.URL.biz + 'admin/logout',
                        sessionId = localStorage.getItem('sessionId');

                    localStorage.removeItem('sessionId');
                    localStorage.removeItem('username');
                    Ext.Ajax.request({
                        url: loginOutUrl,
                        method: 'post',
                        success: function(response) {
                            if (response.responseText) {
                                localStorage.removeItem('sessionId');
                                localStorage.removeItem('username');
                                window.location.reload();
                            }
                        },
                        failure: function(response) {
                            Ext.MessageBox.show({
                                title: '注销失败',
                                msg: '您现在已经注销了!',
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            }
        });

        if (!sessionId) {
            this.getLogin().show();

        } else { //有session
            Ext.Ajax.defaultHeaders = {
                'auth-token': sessionId
            };
            self.detectAccount();
        }
    },
    login: function() {

        var self = this,
            view = this.getLogin(),
            username = view.down('[name=username]').getValue(),
            password = view.down('[name=password]').getValue(),
            newPassword = view.down('[name=newPassword]').getValue(),
            reNewPassword = view.down('[name=reNewPassword]').getValue(),
            loginUrl = XMLifeOperating.generic.Global.URL.biz + 'admin/login',
            updateUrl = XMLifeOperating.generic.Global.URL.biz + 'admin/update/ownAccount';

        if (self.edit) {
            var name = view.down('[name=nick]').getValue();

            Ext.Ajax.request({
                url: updateUrl,
                params: {
                    account: username,
                    name: name,
                    oldPwd: password,
                    newPwd: newPassword
                },
                method: 'put',
                success: function(response) {
                    if (response.responseText == 1) {
                        self.getLogin().hide();
                        Ext.Msg.alert('成功', '成功更新' + username + '账户');
                    } else {
                        Ext.Msg.alert('失败', '更新' + username + '账户时失败');
                    }
                }
            })
        } else {
            Ext.Ajax.request({
                url: loginUrl,
                params: {
                    user: username,
                    pwd: password
                },
                method: 'post',
                success: function(response) {
                    if (response.responseText) {
                        var data = Ext.JSON.decode(response.responseText);

                        /*本地储存信息*/
                        localStorage.setItem("sessionId", data.sessionId);
                        localStorage.setItem("username", username);
                        //saveUidAndSession(username + "@c", data.sessionId);

                        /*更改页头*/
                        Ext.Ajax.defaultHeaders = {
                            'auth-token': data.sessionId
                        };
                        /*设置用户名字*/
                        self.getCurrentUsername().setText(username);
                        /*加载tree*/
                        self.detectAccount();
                        /*self.getNavigationStore().setRootNode({expanded:true});*/
                        view.hide();
                    }
                },
                failure: function(response) {
                    if (response.status == 401) {
                        var data = {
                            '401': '对不起，你登录失败了，请重新登录'
                        };

                        Ext.MessageBox.show({
                            title: '登录失败',
                            msg: data[response.status],
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            });
        }

    },
    bindKeyMap: function(ele) {
        new Ext.util.KeyMap({
            target: ele,
            binding: [{
                key: 13,
                fn: function() {
                    this.login();
                },
                scope: this,
                defaultEventAction: 'preventDefault'
            }]
        });
    },
    detectAccount: function() {
        var me = this;
        var store = me.getNavigationStore();
        var shopAreaStore = me.getShopAreaStore();

        var success = function(response) {
            var obj = eval('(' + response.responseText + ')');
            var type = obj.adminType;
            var account = obj.account,
                areaId = obj.areaId,
                filterFunArr = [];

            if (Ext.isArray(areaId)) {
                Ext.each(areaId, function(id) {
                    filterFunArr.push(function(v) {
                        return v.get('id') == id;
                    });
                }, this);
            } else if (areaId == 0) {
                shopAreaStore.clearFilter(true);
            } else {
                filterFunArr.push(function(v) {
                    return v.get('id') == areaId;
                });
            }
            if (type == 'Area') { //中心长账号登陆
                store.setProxy(new XMLifeOperating.generic.BaseProxy('module/getUserModulesTree'));
                XMLifeOperating.generic.Global.current_operating = obj.areaId;
                store.load({
                    callback: function(records, e) {
                        var errorMsg = e.response.getAllResponseHeaders()['errormsg'];
                        if (errorMsg) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '账号权限未更新：' + errorMsg,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                });
            } else if (type == 'City' || type == 'Global') { //高级权限账号登陆
                store.setProxy(new XMLifeOperating.generic.BaseProxy('module/getPlatModulesTree'));
                me.getCmbGlobalCenter().show();
                store.getProxy().extraParams = {
                    type: 'Area'
                };
                store.load({
                    callback: function(records, e) {
                        var errorMsg = e.response.getAllResponseHeaders()['errormsg'];
                        if (errorMsg) {
                            Ext.MessageBox.show({
                                title: '提示',
                                msg: '账号权限未更新：' + errorMsg,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                });
                shopAreaStore.clearFilter(true);
                shopAreaStore.filter(filterFunArr);
                shopAreaStore.load({
                    callback: function() {
                        this.filter();
                        if (this.data.items[0]) { //若存在符合筛选的中心
                            XMLifeOperating.generic.Global.current_operating = this.data.items[0].get('id');
                        } else { //若不存在符合筛选的中心,默认为0，无法加载（基本上不存在此情况）
                            XMLifeOperating.generic.Global.current_operating = 0;
                        }
                    }
                });
            }
            me.getAdminAdminShopTypeStore().load();
            //推送
            saveUidAndSession(account + "@a", localStorage.getItem("sessionId"));
            rpc.ServerConfig.setUrls("IM", [XMLifeOperating.generic.Global.URL.IM]);
            rpc.ServerConfig.setUrls("Long", [XMLifeOperating.generic.Global.URL.ws]);
            rpc.IMClientManager.createClient(getCurrentUid(), new rpc.XMLifeIMClient());

            var NotificationCls = window.Notification || window.webkitNotification || window.mozNotification || window.msNotification;
            if (!window.cordova && NotificationCls) {
                if (NotificationCls.permission !== 'denied') {
                    NotificationCls.requestPermission(function(permission) {
                        if (!('permission' in NotificationCls)) {
                            NotificationCls.permission = permission;
                        }
                    });
                }
            }
        };
        var failure = function(response) {
            Ext.MessageBox.show({
                title: '账号检测失败',
                msg: data[responseText.statusText],
                buttons: Ext.Msg.OK
            });
        };
        sendGetRequest('admin/getInfo', null, '检测账号', '检测账号成功', '检测账号失败', success, failure);
    }
});
