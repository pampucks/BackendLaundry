const ItemBarangService = require("./ItemBarangService");

const ItemBarangController = require("express").Router();

const service = ItemBarangService();

ItemBarangController.get("/:no_faktur", (req, res) => {
  service.show(req).then(({ message, data, status }) => {
    res.status(status).json({ data, message });
  });
});

ItemBarangController.put("/:no_faktur", (req, res) => {
  service.update(req).then(({ message, data, status }) => {
    res.status(status).json({ data, message });
  });
});

ItemBarangController.delete("/:no_faktur", (req, res) => {
  service.delete(req).then(({ message, data, status }) => {
    res.status(status).json({ data, message });
  });
});

ItemBarangController.post("/", (req, res) => {
  service.store(req).then(({ message, data, status }) => {
    res.status(status).json({ data, message });
  });
});

ItemBarangController.get("/", (request, response) => {
  service.list(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});

module.exports = ItemBarangController;
