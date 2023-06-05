const TransaksiBarangService = require("./TransaksiBarangService");

const TransaksiBarangController = require("express").Router();

const service = TransaksiBarangService();

TransaksiBarangController.get("/:no_faktur", (req, res) => {
  service.show(req).then(({ message, data, status }) => {
    res.status(status).json({ message, data });
  });
});

TransaksiBarangController.put("/:no_faktur", (req, res) => {
  service.update(req).then(({ message, data, status }) => {
    res.status(status).json({ message, data });
  });
});

TransaksiBarangController.delete("/:no_faktur", (req, res) => {
  service.delete(req).then(({ message, data, status }) => {
    res.status(status).json({ message, data });
  });
});

TransaksiBarangController.post("/", (req, res) => {
  service.store(req).then(({ message, data, status }) => {
    res.status(status).json({ message, data });
  });
});

TransaksiBarangController.get("/", (req, res) => {
  service.list(req).then(({ message, data, status }) => {
    res.status(status).json({ message, data });
  });
});

module.exports = TransaksiBarangController;
