var dataProxy = new XMLifeOperating.generic.BaseProxy('category/roots');
Ext.define('XMLifeOperating.model.CategoryRoots', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name','shopId','leaf'],
    proxy: dataProxy,
});