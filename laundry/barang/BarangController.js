const BarangService = require("./BarangService");

const BarangController = require("express").Router();

const service = BarangService();

BarangController.get("/:kode_barang", (request, response) => {
  service.show(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});
BarangController.put("/:kode_barang", (request, response) => {
  service.update(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});
BarangController.delete("/:kode_barang", (request, response) => {
  service.delete(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});

BarangController.post("/", (request, response) => {
  service.store(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});
BarangController.get("/", (request, response) => {
  service.list(request).then(({ message, data, status }) => {
    response.status(status).json({ message, data });
  });
});

module.exports = BarangController;
