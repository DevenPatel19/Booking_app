module.exports.createError = (status, message) => {
    const err = new Error(`Authentication Error: ${message}`);
    err.status = status;
    return err;
};
