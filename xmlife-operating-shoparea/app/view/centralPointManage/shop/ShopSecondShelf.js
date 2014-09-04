 Ext.define('XMLifeOperating.view.centralPointManage.shop.ShopSecondShelf', {
    extend: 'Ext.grid.Panel',
    xtype: 'shopsecondshelf',

    header: false,
    store:'CategorySubs',
    itemId:'ShelvesNextList',
    columns: [
    	{ text: 'id',dataIndex:'id'},
        { text: 'shopId',dataIndex:'shopId'},
        { text: '货架名称',dataIndex:'name'},
        { 
            text: '是否有次级货架',
            dataIndex:'leaf',
            align: 'center',
            renderer : function(value, metadata, model, rowIndex, colIndex, store) { 
                if(value){
                    return '无';
                }
                return '有';
                
            } 
        },
        {
            text:'编辑',

            xtype: 'actioncolumn',       
            width: 50,
            icon: 'resources/images/edit.png',         
            tooltip: 'Edit',
            menuDisabled: true,
            sortable: false,
            itemId:'openModifyShelvesWin',
        
        },
    ],
    tbar:[
        {text:'添加货架',itemId:'openCreateShelvesWin'}
    ]
});