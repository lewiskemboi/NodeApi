export const paginate = (data, req, res) => {

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    };

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    };

    results.results = data.slice(startIndex, endIndex);
    // dataFound(res, results, "Message.")
    res.status(200).json(results);
};

export const orderData = (data, order) => {
    /***
     * Orders data according to the id property in the data objects
     */

    if (order === 'asc') {
        return data.sort((a,b) => a.id - b.id);
    } else if (order === 'desc') {
        return data.sort((a,b) => b.id - a.id);
    };
}