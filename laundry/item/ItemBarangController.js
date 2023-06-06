const ItemBarangService = require("./ItemBarangService");
const UserServiceTokenAuthentication = require("../user/services/UserServiceTokenAuthentication");

const ItemBarangController = require("express").Router();

const service = ItemBarangService();

ItemBarangController.get(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.show(req).then(({ message, data, status }) => {
      res.status(status).json({ data, message });
    });
  }
);

ItemBarangController.put(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.update(req).then(({ message, data, status }) => {
      res.status(status).json({ data, message });
    });
  }
);

ItemBarangController.delete(
  "/:no_faktur",
  UserServiceTokenAuthentication,
  (req, res) => {
    service.delete(req).then(({ message, data, status }) => {
      res.status(status).json({ data, message });
    });
  }
);

ItemBarangController.post("/", UserServiceTokenAuthentication, (req, res) => {
  service.store(req).then(({ message, data, status }) => {
    res.status(status).json({ data, message });
  });
});

ItemBarangController.get(
  "/",
  UserServiceTokenAuthentication,
  (request, response) => {
    service.list(request).then(({ message, data, status }) => {
      response.status(status).json({ message, data });
    });
  }
);

module.exports = ItemBarangController;
