const BaseServiceQueryBuilder = require("../base/Services/BaseServiceQueryBuilder");

const TransaksiBarangRepo = () => {
  const table = "transaksi";
  const payload = {};
  return {
    save: async (data = payload) => {
      return await BaseServiceQueryBuilder(table).insert(data);
    },
    update: async (data = payload) => {
      return await BaseServiceQueryBuilder(table)
        .where({ no_faktur: data.no_faktur })
        .update(data);
    },
    delete: async (no_faktur) => {
      return await BaseServiceQueryBuilder(table).where({ no_faktur }).del;
    },
    findByID: async (no_faktur) => {
      const result = await BaseServiceQueryBuilder(table).where({ no_faktur });
      return result[0] ?? null;
    },
    findAll: async (queryString, limit, offset) => {
      if (queryString == "") {
        return await BaseServiceQueryBuilder(table).limit(limit).offset(offset);
      } else {
        return await BaseServiceQueryBuilder(table)
          .whereLike({ no_faktur: `%${queryString}%` })
          .orWhereLike({ tanggal_penerima: `%${queryString}%` })
          .orWhereLike({ no_hp: `%${queryString}%` })
          .orWhereLike({ nama_customer: `%${queryString}%` })
          .orWhereLike({ alamat: `%${queryString}%` })
          .orWhereLike({ berat: `%${queryString}%` })
          .orWhereLike({ total_harga: `%${queryString}%` })
          .orWhereLike({ uang_muka: `%${queryString}%` })
          .orWhereLike({ sisa: `%${queryString}%` })
          .orWhereLike({ kembali: `%${queryString}%` })
          .orWhereLike({ status_cucian: `%${queryString}%` })
          .orWhereLike({ status_pegembalian: `%${queryString}%` })
          .limit(limit)
          .offset(offset);
      }
    },
    getCount:async ()=>{
      return await BaseServiceQueryBuilder(table)
    }
  };
};

module.exports = TransaksiBarangRepo;
