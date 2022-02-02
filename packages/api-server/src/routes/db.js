const DB_NOT_FOUND_ERR = 'DB_NOT_FOUND_ERR';
const DB_UPDATE_ERR = 'DB_UPDATE_ERR';
const DB_CREATE_ERR = 'DB_CREATE_ERR';
const DB_DELETE_ERR = 'DB_DELETE_ERR';

const UNEXPECTED_ERROR = 'An unexpected error has occurred';

// Error handling
const getDbErrMsg = (errType) => {
    switch (errType) {
        case DB_NOT_FOUND_ERR:
            return 'Error finding item.';
        case DB_UPDATE_ERR:
            return 'Error updating item.';
        case DB_CREATE_ERR:
            return 'Error creating item.';
        case DB_DELETE_ERR:
            return 'Error deleting item.';
        default:
            return UNEXPECTED_ERROR;
    }
};

const getSqlErr = (err) => {
    if (!err.original && !err.dbErrorType) {
        return UNEXPECTED_ERROR;
    }
    if (err.original) {
        return err.original.sqlMessage ? err.original.sqlMessage : getDbErrMsg(err.dbErrorType);
    }
    return getDbErrMsg(err.dbErrorType);
};

// DB Calls
const getModelFromName = (fastify, modelName) => fastify.sequelize.models[modelName];

const create = async (fastify, modelName, data) => {
    try {
        return await getModelFromName(fastify, modelName).create(data);
    } catch (err) {
        err.dbErrorType = DB_CREATE_ERR;
        throw err;
    }
};

const findAll = async (fastify, modelName, attributes) => {
    try {
        return await getModelFromName(fastify, modelName).findAll(attributes);
    } catch (err) {
        err.dbErrorType = DB_NOT_FOUND_ERR;
        throw err;
    }
};

const findOneById = async (fastify, modelName, id) => {
    try {
        const obj = await getModelFromName(fastify, modelName).findOne({
            where: { id },
        });
        if (!obj) {
            throw { dbErrorType: DB_NOT_FOUND_ERR };
        }
        return obj;
    } catch (err) {
        err.dbErrorType = DB_NOT_FOUND_ERR;
        throw err;
    }
};

const queryByProperty = async (fastify, modelName, propertyMap) => {
    try {
        const obj = await getModelFromName(fastify, modelName).findOne({
            where: propertyMap,
        });
        if (!obj) {
            return null;
        }
        return obj;
    } catch (err) {
        err.dbErrorType = DB_NOT_FOUND_ERR;
        throw err;
    }
};

const update = async (fastify, modelName, id, updatedParams) => {
    const obj = await findOneById(fastify, modelName, id);

    try {
        if (Object.keys(updatedParams).length === 1) {
            await obj.update(updatedParams);
        } else {
            await obj.set(updatedParams);
        }

        return await obj.save();
    } catch (err) {
        err.dbErrorType = DB_UPDATE_ERR;
        throw err;
    }
};

const deleteById = async (fastify, modelName, id) => {
    const obj = await findOneById(fastify, modelName, id);
    try {
        return await obj.destroy();
    } catch (err) {
        err.dbErrorType = DB_DELETE_ERR;
        throw err;
    }
};

module.exports = {
    getSqlErr,
    findAll,
    findOneById,
    queryByProperty,
    update,
    deleteById,
    create,
};
