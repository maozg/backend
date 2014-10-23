var dataProxy = new XMLifeOperating.generic.BaseProxy('product/search');
Ext.define('XMLifeOperating.model.ProductSearch', {
    extend: 'Ext.data.Model',
    	fields: [
		'id',
		'name',
		'shopId',
		'shopname',
		'unitname',
		'pprice',
		'fprice',
		'dprice',
		'status',
		'top',
		'productTemplateId',
		'purchasePrice',
		'facePrice', 
		'discountPrice',
		'categoryId',
		'limitType',
		'limitCount',
		'productLimitCount',
		'dayLimitCount',
		'totalLimitCount',
		'barCode',
		'skuId',
		'rank',
		'rank2',
		'dayTodayLimitCount',
		'totalTodayLimitCount'
	],
    proxy: dataProxy,
});
//barCode 