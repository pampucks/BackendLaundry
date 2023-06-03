const BaseServiceQueryBuilder = require("../base/Services/BaseServiceQueryBuilder");

const ItemBarangRepo = () => {
  const table = "item_barang";
  const payload = { id_item: "", no_faktur: "", kode_barang: "", qty: "" };
  return {
    save: async (data = payload) => {
      return await BaseServiceQueryBuilder(table).insert(data);
    },
  };
};
