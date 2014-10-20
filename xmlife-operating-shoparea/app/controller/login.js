Ext.define('XMLifeOperating.controller.login', {
  extend: 'Ext.app.Controller',
  views: ['admin.login', 'Toolbar', 'Navigation'],
  stores: ['ShopArea', 'Navigation'],
  models: ['ShopArea'],
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
          '#login-bt' : {
            click : self.login
          },
          'headerToolbar #txtUserName' : {
          click : function(){
            var sessionId = localStorage.getItem('sessionId');
            if(!sessionId){
              this.getLogin().show();
            }
          }
        },
        'headerToolbar #editAdmin' : {
          click : function(){
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
                  url : XMLifeOperating.generic.Global.URL.biz +'admin/getInfo',
                  success : function(result){
                    var data = Ext.decode(result.responseText);
                    nickField.show().setValue(data.name).setDisabled(true);
                    usernameField.setValue(data.account).setDisabled(true);
                  }
                })

                newPasswordField.show();
                reNewPasswordField.show()

                passwordField.setFieldLabel('旧密码');
                loginBt.setText('确定');
                self.edit = true;
                loginView.show();

          }
        },
        'headerToolbar #btnSignOut' : {
          click : function(){
              var loginOutUrl = XMLifeOperating.generic.Global.URL.biz + 'admin/logout',
                  sessionId = localStorage.getItem('sessionId');
                  Ext.Ajax.request({
                      url: loginOutUrl,
                      method: 'post',
                      success : function(response){
                        if(response.responseText){
                          localStorage.removeItem('sessionId');
                          localStorage.removeItem('username');
                          window.location.reload();
                        }
                      },
                      failure : function(response){
                          Ext.MessageBox.show({
                            title: '注销失败',
                            msg: '您现在已经注销了!',
                            buttons: Ext.Msg.OK
                         });
                        
                      }
                    })
                              
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
      this.getShopAreaStore().load();
      //Ext.getCmp('cmbGlobalCenter').setValue(areaId);
      /*      self.getNavigationStore().setRootNode({
        expanded: true
      });*/
    }
  },
  login: function() {
    var self = this,
      view = this.getLogin(),
      username = view.down('[name=username]').getValue(),
      password = view.down('[name=password]').getValue(),
      loginUrl = XMLifeOperating.generic.Global.URL.biz + 'admin/login';
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
          localStorage.setItem("sessionId", data.sessionId);
          localStorage.setItem("username", username);
          if (data.areaId) {
            localStorage.setItem("areaId", data.areaId);
            XMLifeOperating.generic.Global.current_operating = data.areaId
          }
          if (data.areaName) {
            localStorage.setItem("areaName", data.areaName);
          }

          Ext.Ajax.defaultHeaders = {
            'auth-token': data.sessionId
          };
          self.getCurrentUsername().setText(username);
          /*加载tree*/
          /*self.getNavigationStore().setRootNode({
            expanded: true
          });*/
          self.detectAccount();
          view.hide();
          self.getShopAreaStore().load();
          //Ext.getCmp('cmbGlobalCenter').setValue(data.areaId);
          self.getTxtShopAreaName().setText(data.areaName);
        }
      },
      failure: function(response) {
        if (response.status == 401) {
          var data = {
            'Unauthorized': '对不起，你登录失败了，请重新登录'
          }
          Ext.MessageBox.show({
            title: '登录失败',
            msg: data[response.statusText],
            buttons: Ext.Msg.OK
          });
        }
      }
    });
  },
  detectAccount: function() {
    var me = this;
    var store = me.getNavigationStore();
    var success = function(response) {
      var obj = eval('(' + response.responseText + ')');
      var type = obj.adminType;
      if (type == 'Area') { //中心长账号登陆
        store.setProxy(new XMLifeOperating.generic.BaseProxy('module/getUserModulesTree'));
        XMLifeOperating.generic.Global.current_operating = obj.areaId;
        store.setRootNode({
          expanded: true
        });
      } else if (type == 'City' || type == 'Global') { //高级权限账号登陆
        store.setProxy(new XMLifeOperating.generic.BaseProxy('module/getPlatModulesTree'));
        me.getCmbGlobalCenter().show();
        store.getProxy().extraParams = {
          type: 'Area'
        };
        store.setRootNode({
          expanded: true
        });
      }
    }
    var failure = function(response) {
      Ext.MessageBox.show({
        title: '账号检测失败',
        msg: data[responseText.statusText],
        buttons: Ext.Msg.OK
      });
    }
    sendGetRequest('admin/getInfo', null, '检测账号', '检测账号成功', '检测账号失败', success, failure);
  }
});