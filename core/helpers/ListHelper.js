class ListHelper {

    static pagination({request}) {
        const config = request.app_config;
        let {page, limit} = request.query;

        page = Number(page || 1);
        limit = Number(limit || config.listing.limit);

        limit = limit < config.listing.limitMax ? limit : config.listing.limitMax;
        let offset = (page - 1) * limit;

        return {limit, offset, page}
    }

    static listItems({result, pagination = null, total}) {

        if (!pagination) {
            pagination = ListHelper.pagination({total});
        }
        const totalPages = Math.ceil(total / pagination.limit);

        return {
            total,
            totalPages,
            limit: pagination.limit,
            page: pagination.page,
            result
        };
    }
}

module.exports = ListHelper;
