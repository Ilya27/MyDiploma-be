module.exports = async (request, response, search) => {
    // get offers by accountId
    const {accountId, ..._search} = search;
    return {accountId: request.session.account._id, ..._search};
};
