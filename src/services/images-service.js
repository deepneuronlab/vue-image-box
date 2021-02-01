var parseString = require('xml2js').parseString;

export default {
  fetchCovers(id) {
    return fetch(`data/${id}.xml`).then(res => res.text())
      .then(xml => {
        let covers = null
        parseString(xml, (err, result) => {
          covers = result.annotation.object.map((i, index) => {
            return {
              'key': `${i.name[0]}${-index}`,
              'label': i.name[0],
              'w': Math.ceil((i.bndbox[0].xmax[0] - i.bndbox[0].xmin[0]) / 3.78),
              'h': Math.ceil((i.bndbox[0].ymax[0] - i.bndbox[0].ymin[0]) / 3.78),
              'x': Math.ceil(i.bndbox[0].xmin[0] / 3.78),
              'y': Math.ceil(i.bndbox[0].ymin[0] / 3.78),
            }
          })
        })
        return covers
      }).catch(e => console.log(e))
  }
}
