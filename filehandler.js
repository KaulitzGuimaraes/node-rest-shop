const f = require('fs')


module.exports = class FileHandler {

    readFile(fileName) {
        var content =  f.readFileSync(fileName, 'utf8')
        return content
    }
}