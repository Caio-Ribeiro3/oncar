module.exports = async function paginatedEntities(payload) {

    const { ormEntity, args, limit = 10, page = 1 } = payload

    const [data, count] = await Promise.all([
        ormEntity.findMany({
            take: limit,
            skip: (page - 1) * limit,
            ...args,
        }),
        ormEntity.count({
            where: args?.where
        })
    ])

    return {
        page,
        count,
        limit,
        data
    }
}