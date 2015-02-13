Ext.define('XMLifeOperating.model.HomePage', {
    extend: 'Ext.data.Model',
    fields: [
        'areaId', 'status', 'id', 'layoutId', 'renterId', 'order', 'index',
        'version', 'enable', 'type', 'items', 'name', 'image', 'urlType',
        'url', 'shopId', 'cid', 'pid', 'default', 'needLine', 'transitional',
        {
            name: 'titles',
            convert: function(v) {
                if (typeof(v) == 'object' && v.length > 0) {
                    return v.join(';');
                } else {
                    return v;
                }
            }
        }, {
            name: 'startTime',
            convert: function(v) {
                if (v) {
                    return Ext.Date.format(new Date(v), 'Y-m-d H:i:s');
                } else {
                    return '';
                }
            }
        }, {
            name: 'endTime',
            convert: function(v) {
                if (v) {
                    return Ext.Date.format(new Date(v), 'Y-m-d H:i:s');
                } else {
                    return '';
                }
            }
        },
        // fixed combo 有回车符时取值的bug
        {
            name: 'name',
            convert: function(v) {
                return v.replace(/\n/g, ' ');
            }
        }
    ]
});
