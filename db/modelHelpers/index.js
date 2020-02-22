const crypto = require('crypto');
const config = require('../../config');


module.exports = {

    // used for all mysql_models // example: modelInstance.methodName
    typicalMethods: {
        insert: function (data) {
            let Model = this;

            if(Object.keys(this.schema.paths).includes('creationDate')){
                data['creationDate'] = new Date().getTime();
            }

            let instance = new Model(data);
            return instance.save();
        },
    },

    // used only if added manually
    specialMethods: {
        insertWithPassword: async function (data) {
            let Model = this;

            if (data.password) {
                const salt = this.createPasswordHash(new Date().getTime() + config.server.saltKey);
                data['password'] = (this.createPasswordHash(data.password + salt));
                data['salt'] = salt;
            }

            if(data._id) {
                const elem = await Model.findById(data._id);
                if (elem) {
                    return Model.findByIdAndUpdate(data._id, data, {new: true}).select("-password -salt -__v")
                }

                delete data._id;
            }

            let instance = new Model(data);

            return instance.save();
        },

        changePassword: function (password) {
            this.password = this.createPasswordHash(data.password + this.salt);
            return this.save();
        },

        createPasswordHash: function (data) {
            return crypto.createHash('md5').update(data).digest("hex");
        },

        equalPassword: function (password) {
            return this.password === (this.createPasswordHash(password + this.salt));
        },
    }

};
