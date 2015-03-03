Ext.define('XMLifeOperating.model.Refund', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'useId', 'userPhone', 'amount', 'auditTime', 'auditor', 'createTime',
        'description', 'dealId', 'dealBackendId', 'shortId', 'refRecordId', 'refundCount',
        'refundType', 'status', 'dealPrice', 'userName', 'onThirdFeedBack', 'auditTime',
        'returnCode', 'contacts', 'contactsPhone', 'address', 'areaName','dealIdType'
    ],
    proxy: new XMLifeOperating.generic.BaseProxy('refund')
});