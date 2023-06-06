const BarangService = require("./BarangService");
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");

const BarangController = require("express").Router();

const service = BarangService();

BarangController.get(
  "/:kode_barang",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.show(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);
BarangController.put(
  "/:kode_barang",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.update(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);
BarangController.delete(
  "/:kode_barang",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.delete(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);

BarangController.post(
  "/",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.store(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);
BarangController.get(
  "/",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.list(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);

module.exports = BarangController;
