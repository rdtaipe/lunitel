import _ from 'lodash';

class Sort {
    static request(data, request = {}) {
        if (!_.isArray(data)) {
            return { success: false, message: 'Formato de datos inválido' };
        }

        let processedData = [...data];

        // 1. Filtrado condicional
        if (_.isObject(request.filter) && !_.isEmpty(request.filter)) {
            processedData = this.applyFilters(processedData, request.filter);
        }

        // 2. Ordenamiento condicional
        if (_.isObject(request.sort) && !_.isEmpty(request.sort)) {
            processedData = this.customOrderBy(processedData, request.sort);
        }

        // 3. Agrupamiento condicional
        let groupedResult = null;
        if (request.groupBy && _.isString(request.groupBy)) {
            groupedResult = this.applyGroupBy(processedData, request.groupBy);
        }

        // 4. Paginación condicional
        const finalData = this.applyPagination(
            groupedResult || processedData,
            _.pick(request, ['limit', 'skip'])
        );

        return {
            success: true,
            count: processedData.length,
            ...(groupedResult && { groups: _.size(groupedResult) }),
            data: finalData,
            pagination: {
                total: processedData.length,
                ..._.pick(request, ['limit', 'skip'])
            }
        };
    }

    static applyFilters(data, filters) {
        return _.filter(data, item =>
            _.every(filters, (value, key) => {
                const itemValue = _.get(item, key);
                return this.matchFilter(itemValue, value);
            })
        );
    }

    static matchFilter(itemValue, filterValue) {
        // Soporta: valor directo, objeto de operadores, o array
        if (_.isPlainObject(filterValue)) {
            return _.every(filterValue, (val, operator) =>
                this.applyOperator(itemValue, operator, val)
            );
        }

        if (_.isArray(filterValue)) {
            return _.includes(filterValue, itemValue);
        }

        return _.isEqual(itemValue, filterValue);
    }

    static applyOperator(value, operator, operand) {
        const operators = {
            $eq: (a, b) => a === b,
            $ne: (a, b) => a !== b,
            $gt: (a, b) => a > b,
            $gte: (a, b) => a >= b,
            $lt: (a, b) => a < b,
            $lte: (a, b) => a <= b,
            $in: (a, b) => _.includes(b, a),
            $nin: (a, b) => !_.includes(b, a),
            $regex: (a, b) => new RegExp(b.pattern, b.flags || '').test(a),
            $exists: (a, b) => (b ? !_.isNil(a) : _.isNil(a))
        };

        return operators[operator]?.(value, operand) ?? false;
    }

    static customOrderBy(data, sortSchema) {
        const sortConfig = _.transform(sortSchema, (result, order, field) => {
            if (['asc', 'desc'].includes(_.toLower(order))) {
                result.fields.push(field);
                result.orders.push(_.toLower(order));
            }
        }, { fields: [], orders: [] });

        return _.orderBy(data, sortConfig.fields, sortConfig.orders);
    }

    static applyGroupBy(data, field) {
        return _.groupBy(data, item => _.get(item, field, 'undefined'));
    }

    static applyPagination(data, { limit, skip = 0 } = {}) {
        if (!_.isFinite(limit) || limit < 0) return data;
        return _.slice(data, skip, _.isFinite(limit) ? skip + limit : undefined);
    }
}

export default Sort;



// input data = {
//     filter: {
//       price: { $gte: 100, $lte: 500 },
//       key: str,
//       name: { $regex: 'phone', $options: 'i' }
//     },
//     sort: {
//       price: 'desc',
//       rating: 'asc'
//     },
//     groupBy: 'brand',
//     limit: 20,
//     skip: 0
//   }