Ext.define('XMLifeOperating.controller.login', {
    extend: 'Ext.app.Controller',
    views: ['admin.login', 'Toolbar', 'Navigation'],
    stores: ['Navigation', 'AdminGetInfo'],
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
    }],
    init: function() {
        var self = this;
        var sessionId = localStorage.getItem('sessionId'),
            username = localStorage.getItem('username'),
            navigationStore = self.getNavigationStore();

        /*navigationStore.on('load',function(){
          this.getRootNode().appendChild({text:'员工考核',id : 'ShopperCheckList',leaf: true});
        });*/
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
                    } else {
                        this.getUserInfor();
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
            self.getLogin().show();
        } else {
            //self.getCurrentUsername().setText(username);
            Ext.Ajax.defaultHeaders = {
                'auth-token': sessionId
            };
            self.getNavigationStore().load({
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
            this.getUserInfor();
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
                        self.getUserInfor();
                    } else {
                        Ext.Msg.alert('失败', '更新' + username + '账户时失败');
                    }
                }
            });
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
                        /*更改页头*/
                        Ext.Ajax.defaultHeaders = {
                            'auth-token': data.sessionId
                        };
                        /*设置用户名字*/
                        self.getCurrentUsername().setText(username);
                        /*加载tree*/
                        self.getNavigationStore().load({
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
                        self.getUserInfor();
                        view.hide();
                    }
                },
                failure: function(response) {
                    if (response.status == 401 || response.status == 0) {
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
    getUserInfor: function() {
        var self = this;
        var store = self.getAdminGetInfoStore();
        var callback = function(records, proxy, e) {
            if (proxy.response.status == 200) {
                var data = Ext.decode(proxy.response.responseText);
                XMLifeOperating.generic.Global.currentAdminInfor = data;
                self.application.fireEvent('admin/getInfo', data);
            }
        };

        store.load({
            callback: callback
        });
    }
});
