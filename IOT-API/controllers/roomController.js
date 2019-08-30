const Room = require("../models/Room");

module.exports = {
  async index(req, res) {
    const query = {};

    const iniData = new Date(req.params.iniDate);
    const fimData = new Date(req.params.endDate);

    console.log(iniData)
    console.log(fimData)

    if (req.params.id) query._id = req.params.id;

    const rooms = await Room.find({
        "createdAt" : { $gte : iniData, $lte : fimData}
    });

    const groupBy = key => array =>
      array.reduce(
        (objectsByKeyValue, obj) => ({
          ...objectsByKeyValue,
          [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
        }),
        {}
      );

    const groupByBrand = groupBy('processId');

    const grouped = groupByBrand(rooms);

    console.log(grouped)

    const data = Object.keys(grouped).map(item => {
        console.log(item)
        let newItem = {
            item :grouped[item],
            minutos : grouped[item].reduce((a, c) => subtract(c, a))
        }
        return newItem;
    })

    return res.send(data);

    function subtract(r1, r2) {
        return Object.keys(r1).reduce((total) => {
            total = millisToMinutesAndSeconds(r1.createdAt - r2.createdAt);
            return total;
        }, {});
      }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
     

  },

  async create(data) {
    const room = await Room.create(data);
    console.log(room);
  }
};
