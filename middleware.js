const bodyParser = require("body-parser"),
  fs = require("fs"),
  xml2js = require("xml2js");
const { v4: uuidv4 } = require("uuid");
const jsonParser = bodyParser.json({ limit: "1mb" });
const parser = new xml2js.Parser();

module.exports.SERVER_SETUP = (app) => {
  app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
  });

  app.get("/images/:file", jsonParser, (req, res) => {
    fs.readFile(`${__dirname}/data/${req.params.file}.png`, (err, data) => {
      if (err) {
        res.status(404).end();
        return;
      }
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(data);
    });
  });

  app.get("/pages", jsonParser, (req, res) => {
    const dataFolder = `${__dirname}/data/`;
    const fs = require("fs");

    const files = fs
      .readdirSync(dataFolder)
      .filter((file) => {
        return file.endsWith(".xml") ? file : false;
      })
      .map((file) => {
        return {
          id: uuidv4(),
          link: file.split(".xml")[0],
          coords: [],
        };
      });
    res.send({
      data: {
        links: files,
      },
      error: null,
    });
  });

  app.post("/page/", jsonParser, (req, res) => {
    const { page } = req.body;
    const filePath = `${__dirname}/data/${page}.xml`;

    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        const response = {
          data: null,
          error: err,
        };
        res.status(404).send(response);
        return;
      }
      fs.readFile(filePath, (err, data) => {
        parser.parseString(data, (err, result) => {
          const coords = result.annotation.object.map((i, k) => {
            return {
              key: k,
              w: Math.ceil((i.bndbox[0].xmax[0] - i.bndbox[0].xmin[0]) / 3.78),
              h: Math.ceil((i.bndbox[0].ymax[0] - i.bndbox[0].ymin[0]) / 3.78),
              x: Math.ceil(i.bndbox[0].xmin[0] / 3.78),
              y: Math.ceil(i.bndbox[0].ymin[0] / 3.78),
            };
          });

          res.send({
            data: {
              coords: coords,
            },
            error: null,
          });
        });
      });
    });
  });
};
