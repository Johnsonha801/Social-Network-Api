// Format date
// Returned format example = Jun 15th, 2020 at 03:45 pm
const moment = require('moment');

module.exports = (timestamp) => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
}