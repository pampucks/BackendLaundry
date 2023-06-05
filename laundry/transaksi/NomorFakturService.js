const moment = require("moment/moment");
const TransaksiBarangRepo = require("./TransaksiBarangRepo");

const NomorFakturService=(tbarangRepo = TransaksiBarangRepo())=>{
    return {
        GenerateNoFaktur:async ()=>{
            let r = await tbarangRepo.getCount()
            let count = r.length+1//7

            const dateTime = moment().format("YYYY") //2023
            let isCanBeUsed = false
            while( ! isCanBeUsed){ //isCanBeUsed nilainya false kalau iya maka masuk ke line 13
                const numFormat = String(count).padStart(4,"0") // 0007
                const defaultFakturNumber = `${dateTime}${numFormat}` // 20230007
                const cek = await tbarangRepo.findByID(defaultFakturNumber) //cek 20230007 ada ga di database
                if(cek==null){
                    return defaultFakturNumber
                }else{
                    count+=1
                }// setelah barisini maka akan kembali ke line 12
            }
        }
    }
}

module.exports = NomorFakturService