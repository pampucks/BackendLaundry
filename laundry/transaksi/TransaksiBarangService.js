const BarangRepo = require("../barang/BarangRepo");
const defaultExceptionMessage = require("../base/util/exceptions");
const paging = require("../base/util/paging");
const NomorFakturService = require("./NomorFakturService");
const TransaksiBarangRepo = require("./TransaksiBarangRepo");

const TransaksiBarangService = (fakturGenerator =NomorFakturService()) => {
  const repo = TransaksiBarangRepo();
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
      const {
        tanggal_terima,
        no_hp,
        nama_customer,
        alamat,
        berat,
        total_harga,
        uang_muka,
        sisa,
        kembali,
        status_cucian,
        status_pengembalian,
      } = req.body;
      console.log("tanggal_terima",tanggal_terima);
      const no_faktur = await fakturGenerator.GenerateNoFaktur()
      const data = {
        no_faktur,
        tanggal_terima,
        no_hp,
        nama_customer,
        alamat,
        berat,
        total_harga,
        uang_muka,
        sisa,
        kembali,
        status_cucian,
        status_pengembalian,
      };
      for (let n in data) {
        if (data[n] == null || data[n] == null || data[n] == undefined) {
          return {
            message: "Konsong dong datanya",
            data: data,
            status: 400,
          };
        }
        
        await repo.save(data);
        return {
          message: "",
          data: data,
          status: 200,
        };
      }
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
        message: "Deleted",
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
          message: "Parma `page` is mandatory",
        };
      }
      const { limit, offset } = paging(parseInt(req.query.page));
      const queryString = req.query.searcrh ?? "";
      const result = await repo.findAll(queryString, limit, offset);
      return {
        data: { list: result, pagination: { limit, offset } },
        status: 200,
        message: "Ok",
      };
    },
  };
};

module.exports = TransaksiBarangService;
