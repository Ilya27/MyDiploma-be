module.exports = function(request, response, next) {

    const CorsAllowHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Set-Cookies, Access-Token'
    };

    Object.keys(CorsAllowHeaders).forEach((item) => {
        response.setHeader(item, CorsAllowHeaders[item]);
    });

    if (request.method === 'OPTIONS') {
        response.json({});
        return;
    }

    next();
};
