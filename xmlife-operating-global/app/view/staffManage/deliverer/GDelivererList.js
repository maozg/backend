Ext.define('XMLifeOperating.view.staffManage.deliverer.GDelivererList', {
    extend: 'Ext.grid.Panel',
    id: 'gDelivererList',
    xtype: 'gDelivererList',
    store: 'Deliverer',
    title: '配送员管理',
    titleAlign: 'left',
    closable: true,
    forceFit: true,
    dockedItems: [
      {
      xtype : 'pagingtoolbar',
      itemId : 'pagetoll',
      store : 'Deliverer',
      dock : 'bottom',
      displayInfo : true/*,
      items : ['->'],   
      prependButtons: true*/
    }
    ],
    tbar: [{
            xtype: 'button',
            text: '添加快递员',
            itemId: 'add',
            hidden:(XMLifeOperating.generic.Global.operating_type == 'center')
        }, {
            xtype: 'combobox',
            name: 'area',
            itemId: 'shopArea',
            store: 'ShopArea',
            emptyText: '请选择中心',
            editable: false,
            displayField: 'name',
            valueField: 'id',
            hidden:(XMLifeOperating.generic.Global.operating_type == 'center')
        }, {
            xtype: 'button',
            itemId: 'activeSearch',
            text: '查看停单快递员',
            handler: function() {

                if (this.text == '查看停单快递员') {
                    this.setText('查看接单快递员');
                } else {
                    this.setText('查看停单快递员');
                }

            }
        },
        /*{
            xtype:'textfield',
            emptyText:'配送员名字',
            name:'keyword',
            itemId: 'keyword',
            margin:10
        },
        {
            xtype:'button',
            itemId: 'productSearch',
            text:'搜索',
            margin:10,
        }*/
        {
            xtype: 'button',
            itemId: 'activeBind',
            text: '查看未绑定的快递员',
            handler: function() {
                if (this.text == '查看未绑定的快递员') {
                    this.setText('查看已绑定的快递员');
                } else {
                    this.setText('查看未绑定的快递员');
                }
            }
        },
        '->',
        , {
            xtype: 'textfield',
            name: 'searchcourier',
            itemId: 'searchDelivererKeyWords',
            emptyText: '输入手机号',        
        }, {
            xtype: 'button',
            name: 'searchbutton',
            itemId: 'searchButton',
            text: '搜索'
        }
    ],
    columns: [
         {
            text: 'ID',
            dataIndex: 'uid',
            sortable: false,
            align: 'left',
            width: '7%'
        }, {
            text: '姓名',
            dataIndex: 'name',
            sortable: false,
            align: 'left',

        }, {
            text: '职称',
            dataIndex: 'title',
            sortable: false,
            align: 'left'
        }, {
            text: '电话',
            dataIndex: 'phone',
            sortable: false,
            width: '15%',
            align: 'left'
        }, 
        // {
        //     text: '密码',
        //     dataIndex: 'pwd',
        //     sortable: false,
        //     align: 'left'
        // }, 
        {
            text: '头像',
            dataIndex: 'avatar',
            sortable: false,
            align: 'left',
            width: '14%'
        }, {
            text: '所属中心',
            dataIndex: 'areaNames',
            sortable: false,
            align: 'left',
            width: '15%',
            renderer: function(value) {
                var htmlStr = '';
                if (value != null) {

                    value.forEach(function(item, index, value) {
                        htmlStr += item + "<br />";
                    });
                    return htmlStr;
                }
                return htmlStr;
            }
        }, {
            text: '订单数',
            dataIndex: 'deals',
            sortable: false,
            align: 'center'
        }, {
            text: '退单数',
            dataIndex: 'returnDealNum',
            sortable: false,
            align: 'center'
        }, {
            text: '好评数',
            dataIndex: 'goods',
            sortable: false,
            align: 'center'
        }, {
            text: '中评数',
            dataIndex: 'mediums',
            sortable: false,
            align: 'center'
        }, {
            text: '差评数',
            dataIndex: 'bads',
            sortable: false,
            align: 'center'
        }, 
        {
            header: "考勤管理",
            itemId: 'delivererWorkTimeId',
            align: 'center',
            menuDisabled: true,
            sortable: false,
            renderer: function(value, metadata, model, rowIndex, colIndex, store) {
                var seeBtn = '<span style="color:green;cursor:pointer;">查看</span>';
                return seeBtn;
            }
        }, 
        {
            header: "历史订单",
            itemId: 'dealDelivererHistoryId',
            align: 'center',
            menuDisabled: true,
            sortable: false,
            renderer: function(value, metadata, model, rowIndex, colIndex, store) {
                var seeBtn = '<span style="color:green;cursor:pointer;">查看</span>';
                return seeBtn;
            }
        },
        {
            xtype: 'actioncolumn',
            header: "编辑",
            icon: 'resources/images/edit.png',
            tooltip: 'Edit',
            align: 'center',
            width: '7%',
            menuDisabled: true,
            sortable: false,
            itemId: 'delivererEditId',
            hidden:(XMLifeOperating.generic.Global.operating_type == 'center')
        }, 
        {
            header: "操作",
            dataIndex: 'isActive',
            itemId: 'closeOrOpenOrder',
            align: 'center',
            width: '8%',
            menuDisabled: true,
            sortable: false,   
            renderer: function(value) {
                var str='';
                if(value==true){
                    str+='<input type="button" value="关闭" statusValue="open" /><br/>';
                }else{
                    str+='<input type="button" value="开启" statusValue="close"  /><br/>';
                }
                return str;
            }
        },
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorder'
        }
    },
    /*listeners: {
        onShowView: function(view, viewName) {           
            if(XMLifeOperating.generic.Global.operating_type != 'center') {
                return;
            }
            if(XMLifeOperating.generic.Global.current_operating == -1) {
                alert('请先在右上角选择中心');
                return;
            }
            var combo = view.down('#businessArea');
            combo.setValue(XMLifeOperating.generic.Global.current_operating);
            combo.fireEvent('select', combo);
        }
    }*/

});