const errorMiddeware = (err, req, res, next) => {
    console.log('haha')
    res.status(err.status || 500).json({
        message: err.message
    });
}

module.exports = errorMiddeware;
