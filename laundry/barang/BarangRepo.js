const BaseServiceQueryBuilder = require("../base/Services/BaseServiceQueryBuilder");

const BarangRepo = () => {
  const table = "barang";
  const payload = { kode_barang: "", nama_barang: "" };
  return {
    save: async (data = payload) => {
      return await BaseServiceQueryBuilder(table).insert(data);
    },
    update: async (data = payload) => {
      return await BaseServiceQueryBuilder(table)
        .where({ kode_barang: data.kode_barang })
        .update(data);
    },
    delete: async (kode_barang) => {
      return await BaseServiceQueryBuilder(table).where({ kode_barang }).del();
    },
    findByID: async (kode_barang) => {
      const result = await BaseServiceQueryBuilder(table).where({
        kode_barang,
      });
      return result[0] ?? null;
    },
    findAll: async (queryString, limit, offset) => {
      if (queryString == "") {
        return await BaseServiceQueryBuilder(table).limit(limit).offset(offset);
      } else {
        return await BaseServiceQueryBuilder(table)
          .whereLike({ kode_barang: `%${queryString}%` })
          .orWhereLike({ nama_barang: `%${queryString}%` })
          .limit(limit)
          .offset(offset);
      }
    },
  };
};

module.exports = BarangRepo;
