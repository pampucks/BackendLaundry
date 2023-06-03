const express = require("express");
const BarangController = require("./laundry/barang/BarangController");

const xRouter = express.Router();
const app = express();
app.use(express.json());
xRouter.use("/barang", BarangController);
app.use("/api/v1", xRouter);
app.get("/", (req, resp) => {
  resp.status(200).json({
    message: "Selamat Datang di laundry",
    data: null,
  });
});
app.listen(18080, "localhost", () => {
  console.log("APP Ready http://localhost:18080");
});
