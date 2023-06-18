const errorMiddeware = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        err.status = 400;
        err.message = 'Password is required!';
    }

    res.status(err.status || 500).json({
        message: err.message
    });
}

module.exports = errorMiddeware;
