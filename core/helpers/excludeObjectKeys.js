module.exports = (obj, keys = []) => {

    let exclude = {};

    keys.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            exclude[key] = null;
        }
    });

    let clone = Object.assign({}, obj, exclude);

    Object.keys(clone).forEach(key => {
        if (!clone[key]) {
            delete clone[key];
        }
    });

    return clone;
};