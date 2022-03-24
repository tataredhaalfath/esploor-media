const express = require("express");
const router = express.Router();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
const fs = require("fs");
//model
const Model = require("../models");
const { HOSTNAME } = process.env;

router.get("/", async (req, res, next) => {
  try {
    const media = await Model.media.findAll({
      attributes: ["id", "image"],
    });

    const mappedMedia = media.map((m) => {
      m.image = `${HOSTNAME}/${m.image}`;
      return m;
    });

    return res.json({
      status: "success",
      data: mappedMedia,
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

router.post("/", (req, res, next) => {
  try {
    const image = req.body.image;

    if (!isBase64(image, { mimeRequired: true })) {
      return res.status(400).json({
        status: "error",
        message: "invalid base64",
      });
    }

    base64Img.img(
      image,
      "./public/images",
      Date.now(),
      async (err, filePath) => {
        if (err) {
          return res.status(400).json({
            status: "error",
            message: err.message,
          });
        }

        const fileName = filePath.split("/").pop();

        const media = await Model.media.create({
          image: `images/${fileName}`,
        });

        return res.json({
          status: "success",
          data: {
            id: media.id,
            image: `${HOSTNAME}/images/${fileName}`,
          },
        });
      }
    );
  } catch (err) {
    return res.json({
      status: "error",
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const media = await Model.media.findByPk(id);

    if (!media) {
      return res.status(404).json({
        status: "error",
        message: "media not found",
      });
    }

    fs.unlink(`./public/${media.image}`, async (err) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      }
      //hapus media
      await media.destroy();
      return res.json({
        status: "success",
        message: "image deleted",
      });
    });
  } catch (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = router;
