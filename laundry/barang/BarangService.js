const defaultExceptionMessage = require("../base/util/exceptions");
const paging = require("../base/util/paging");
const BarangRepo = require("./BarangRepo");

const BarangService = () => {
  const repo = BarangRepo();

  return {
    show: async (req) => {
      const kode_barang = req.params.kode_barang;
      const barang = await repo.findByID(kode_barang);
      return {
        message: "OK",
        data: barang,
        status: 200,
      };
    },
    store: async (req) => {
      try {
        const { kode_barang, nama_barang } = req.body;
        const data = { kode_barang, nama_barang };
        for (let n in data) {
          if (data[n] == null || data[n] == "" || data[n] == undefined) {
            throw `${n} masih kosong`;
          }
        }
        await repo.save(data);
        return {
          message: "Berhasil",
          data: data,
          status: 200,
        };
      } catch (e) {
        return {
          message: defaultExceptionMessage.systemError,
          data: null,
          status: 400,
        };
      }
    },
    update: async (req) => {
      if (
        req.params.kode_barang == null ||
        req.params.kode_barang == undefined ||
        req.params.kode_barang == ""
      ) {
        return {
          data: null,
          status: 400,
          message: "Update failed: `kode_barang` is mandatory",
        };
      }
      const data = { ...req.body, kode_barang: req.params.kode_barang };
      console.log(req.params);
      const result = await repo.update(data);
      return {
        data: result,
        status: 200,
        message: "Updated",
      };
    },
    delete: async (req) => {
      const data = req.params.kode_barang;
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
          message: "param `page` is mandatory",
        };
      }
      const { limit, offset } = paging(parseInt(req.query.page));
      const queryString = req.query.search ?? "";
      const result = await repo.findAll(queryString, limit, offset);
      return {
        data: { list: result, pagination: { limit, offset } },
        status: 200,
        message: "OK",
      };
    },
  };
};

module.exports = BarangService;
