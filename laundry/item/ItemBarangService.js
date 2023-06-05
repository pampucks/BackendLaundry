const BarangRepo = require("../barang/BarangRepo");
const defaultExceptionMessage = require("../base/util/exceptions");
const paging = require("../base/util/paging");
const ItemBarangRepo = require("../item/ItemBarangRepo");

const ItemBarangService = () => {
  const repo = ItemBarangRepo();
  const barangRepo = BarangRepo();
  return {
    show: async (req) => {
      const no_faktur = req.parmas.no_faktur;
      const item = await repo.findByID(no_faktur);
      return {
        message: "OK",
        data: item,
        status: 200,
      };
    },
    store: async (req) => {
      const { no_faktur, kode_barang, qty } = req.body;
      const cariBrg = await barangRepo.findByID(kode_barang);
      if (cariBrg == null) {
        return {
          message: "Barang ga ditemuin",
          data: null,
          status: 400,
        };
      }
      const data = { no_faktur, kode_barang, qty };
      for (let n in data) {
        if (data[n] == null || data[n] == null || data[n] == undefined) {
          return {
            message: "Konsong dong datanya",
            data: data,
            status: 400,
          };
        }
      }
      await repo.save(data);
      return {
        message: "Berhasil",
        data: data,
        status: 200,
      };
    },
    update: async (req) => {
      if (
        req.params.no_faktur == null ||
        req.params.no_faktur == undefined ||
        req.params.no_faktur == ""
      ) {
        return {
          data: null,
          status: 400,
          message: "Update failed: `no_faktur` is mandatory",
        };
      }
      const data = { ...req.body, no_faktur: req.params.no_faktur };
      console.log(req.params);
      const result = await repo.update(data);
      return {
        data: result,
        status: 200,
        message: "Updated",
      };
    },
    delete: async (req) => {
      const data = req.params.no_faktur;
      await repo.delete(data);
      return {
        data: null,
        status: 200,
        message: "deleted",
      };
    },
    list: async (req) => {
      if (
        req.query.page == undefined ||
        req.query.page == null ||
        req.query.page == ""
      ) {
        return {
          data: null,
          status: 400,
          message: "Param `page` is mandatory",
        };
      }
      const { limit, offset } = paging(parseInt(req.query.page));
      const queryString = req.query.searcrh ?? "";
      const result = await repo.findAll(queryString, limit, offset);
      return {
        data: { list: result, pagination: { limit, offset } },
        status: 200,
        message: "OK",
      };
    },
  };
};

module.exports = ItemBarangService;
