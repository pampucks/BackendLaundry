const BaseServiceQueryBuilder = require("../base/Services/BaseServiceQueryBuilder");

const ItemBarangRepo = () => {
  const table = "item_barang";
  const payload = { no_faktur: "", kode_barang: "", qty: "" };
  return {
    save: async (data = payload) => {
      return await BaseServiceQueryBuilder(table).insert(data);
    },
    update: async (data = payload) => {
      return await BaseServiceQueryBuilder(table)
        .update(data)
        .where({ no_faktur: data.no_faktur })
        .update(data);
    },
    delete: async (no_faktur) => {
      return await BaseServiceQueryBuilder(table).where({ no_faktur }).del();
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
          .whereLike({ id_item: `%${queryString}%` })
          .orWhereLike({ no_faktur: `%${queryString}%` })
          .orWhereLike({ kode_barang: `%${queryString}%` })
          .orWhereLike({ kode_barang: `%${queryString}%` })
          .orWhereLike({ qty: `%${queryString}%` })
          .limit(limit)
          .offset(offset);
      }
    },
   
  };
};

module.exports = ItemBarangRepo;
