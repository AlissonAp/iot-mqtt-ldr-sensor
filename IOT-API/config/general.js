const configs = {
    api : {
        PORT: 3333
    },
    db : {
        // URL : "mongodb://easyinove-apis01:schlosser2019@mongodb.easyinove-apis.tk:27017/easyinove-apis01"
        URL : "mongodb://localhost:27017/iot-mqtt"
    },

    jwt : {
        __SECRET : "af6157b2ac7f86de91b7b6e4b60ca273"
    }
}

module.exports = configs
