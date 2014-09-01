Ext.define('XMLifeOperating.view.operationManage.refund.refundList', {
    extend: 'Ext.grid.Panel',
    xtype: 'refundList',
    alias:  'widget.refundList',
    autoScroll: true,
    store: 'refundStore',
    title: '退款列表',
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    requires:[
            'Ext.panel.Panel',
    		'Ext.grid.*',
			  'Ext.data.*',
			  'Ext.ux.RowExpander',
			  'Ext.selection.CheckboxModel'],
    tbar :[
	    	'查询范围',
	    	{
	    		xtype : 'datefield',
	    		name : 'beginTime',
	    		emptyText : '开始时间',
	    		maxValue: new Date(),
	    		value: new Date(),
	    		format : 'Y-m-d'
	    	},
	    	'到',
	    	{
				xtype : 'datefield',
	    		name : 'endTime',
	    		emptyText : '结束时间',
	    		maxValue: new Date(),
	    		value: new Date(),
	    		format : 'Y-m-d'
	    	},
	    	{
	    		xtype : 'button',
	    		name : 'today',
	    		text : '今天',
	    		style : {
	    			border:'1px solid #99bce8'
	    		}

	    	},
	    	{
	    		xtype : 'button',
	    		name : 'yesterday',
	    		text : '昨天',
	    		style : {
	    			border:'1px solid #99bce8'
	    		}
	    	},
	    	{
	    		xtype : 'button',
	    		name :'oldSevenDay',
	    		text : '最近7天',
	    		style : {
	    			border:'1px solid #99bce8'
	    		}

	    	},
	    	{
	    		xtype : 'button',
	    		name :'oldMonth',
	    		style : {
	    			border:'1px solid #99bce8'
	    		},
	    		text : '最近30天'	
	    	},
	    	{
	    		xtype : 'combo',
	    		name : 'refundType',
	    		queryMode: 'local',
	            triggerAction : 'all',
	    		emptyText : '根据付款类型筛选',
	            displayField: 'type',
	    		margin : '0 5 0 5',
	            valueField: 'value',
	    		store : Ext.create('Ext.data.Store', {
				            fields: ['value','type'],
				            data : [
				                {"value": 'all', "type": '所有方式'},
				                {"value": 'ALIPAY', "type": '支付宝'},
				                {"value": 'TENPAY', "type": '财付通'},
				                {"value": 'BALANCE', "type": '余额付款'}
				            ],
				        })
	    	},
	    	'->',
	    	{
	    		xtype : 'textfield',
	    		emptyText : '请输入订单号或手机号',
	    		name : 'mobileSearch',
	    		allowBlank: false,
	    		margin : '0 5 0 5',
	    		blankText : '不能为空'
	    	},
	    	{
				xtype : 'button',
	    		name :'searchDeal',
	    		style : {
	    			border:'1px solid #99bce8'
	    		},
	    		text : '搜索订单'	

	    	}
    ],
    bbar: [
		{
			xtype : 'button',
			name :'allSelect',
			text : '全选'
		},
		{
			xtype : 'button',
			name :'reverseAllSelect',
			text : '全选取消选择'
		},
		{
			xtype : 'button',
			name :'reverseSelect',
			text : '反向选择'
		},
		'->',
		,
		{
				xtype : 'button',
				name :'agreeRefund',
				text : '同意退款',
				align : 'right'
			},
			{
				xtype : 'button',
				name :'disAgreeRefund',
				text : '驳回退款'
			}],
        columns: [
        { header: '日期', dataIndex: 'createTime'},
        { header: '订单别号',dataIndex:'dealId'},
        { header: '订单状态',dataIndex:'status',
        	renderer : function(v){
        		var data = {
        			'0' : '待处理',
        			'1' : '完成退款',
        			'2' : '退款不成功'
        		}
        		return data[v];
        	}
    	},
        { header: '顾客名称',dataIndex: 'userName'},
        { header: '顾客电话', dataIndex: 'mobile'},
        { header: '总退款次数', dataIndex: 'refundCount'},
        { header: '订单金额', dataIndex: 'refundCount'},
        { header: '退款金额', dataIndex: 'amount'},
        { header: '退款去处', dataIndex: 'refundType',
        	renderer : function(v){
        		var data ={
        					"ALIPAY": '支付宝',
        				   	"TENPAY": '财付通',
        				   	"BALANCE": '余额退款'
        				   };
        			return data[v];
        	}
    }
    ],

    forceFit : true,
    columnLines: true,
    frame: true,
    iconCls: 'icon-grid'
});