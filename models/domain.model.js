const { Schema, model } = require("mongoose");

const DNSRecordSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    proxy: { type: Boolean, required: true },
});

const DomainSchema = new Schema({
    address: { type: String },
    IPAddress: { type: String, required: true },
    DNSRecords: {
        type: [DNSRecordSchema],
        default: []
    },
})

const DomainModel = model('domains', DomainSchema);

module.exports = {
    DomainModel
}
