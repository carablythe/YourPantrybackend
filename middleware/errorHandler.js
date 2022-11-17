const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents (`${err.name}: ${err.message}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    console.log(err.stack)

    const status = res.statusCode ? res.statusCode : 500 // server error

    res.status(status)

    res.json({ message: err.message })
}

module.exports = errorHandler


//The above code was learned from the MERN stack project tutorial by Dave Gray:
//https://www.youtube.com/watch?v=CvCiNeLnZ00&list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&index=14