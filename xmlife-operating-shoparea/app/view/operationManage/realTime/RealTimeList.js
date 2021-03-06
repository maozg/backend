Ext.define('XMLifeOperating.view.operationManage.realTime.RealTimeList', {
    extend: 'Ext.grid.Panel',
    closable: false,
    xtype: 'realTimeList',
    title: '数据中心',
    store: 'RealTime',
    id: 'realTimeList',
    tbar: [{
        xtype: 'combobox',
        name: 'shopArea',
        itemId: 'shopArea',
        store: 'ShopArea',
        emptyText: '请选择中心',
        margin: 10,
        editable: false,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        hidden: (XMLifeOperating.generic.Global.operating_type == 'center')
    }, ],

    columns: [{
            xtype: 'rownumberer',
            width: 50,
            align: 'center'
        }, {
            text: '线路名称',
            dataIndex: 'zoneName',
            width: 100,
            sortable: true,
            align: 'center'
        }, {
            text: '等待取货',
            dataIndex: 'waitPickUps',
            width: 100,
            sortable: true,
            align: 'center'
        }, {
            text: '问题订单',
            dataIndex: 'problemDeals',
            width: 100,
            sortable: true,
            align: 'center'
        }
    ],
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: 'Drag and drop to reorder'
        }
    },
    listeners: {
        onShowView: function(view, viewName) {
            if (XMLifeOperating.generic.Global.operating_type != 'center') {
                return;
            }
            if (XMLifeOperating.generic.Global.current_operating == -1) {
                alert('请先在右上角选择中心');
                return;
            }
            var combo = view.down('#shopArea');
            combo.setValue(XMLifeOperating.generic.Global.current_operating);
            combo.fireEvent('select', combo);
        }
    },
    columnLines: true
});
