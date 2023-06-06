const TransaksiBarangService = require("./TransaksiBarangService");
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");

const TransaksiBarangController = require("express").Router();

const service = TransaksiBarangService();

TransaksiBarangController.get(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.show(req).then(({ message, data, status }) => {
      res.status(status).json({ message, data });
    });
  }
);

TransaksiBarangController.put(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.update(req).then(({ message, data, status }) => {
      res.status(status).json({ message, data });
    });
  }
);

TransaksiBarangController.delete(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.delete(req).then(({ message, data, status }) => {
      res.status(status).json({ message, data });
    });
  }
);

TransaksiBarangController.post(
  "/",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.store(req).then(({ message, data, status }) => {
      res.status(status).json({ message, data });
    });
  }
);

TransaksiBarangController.get(
  "/",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.list(req).then(({ message, data, status }) => {
      res.status(status).json({ message, data });
    });
  }
);

module.exports = TransaksiBarangController;
