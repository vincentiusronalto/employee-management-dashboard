const db = require('../db');
const xssFilters = require('xss-filters');

const logger = require('../lib/logger');
module.exports = {
    async getAllUser(){
        try{
            let data = await db.query(`SELECT 
        k.nama, k.no_induk, k.alamat,
        to_char( tanggal_lahir, 'DD-MON-YYYY') as tanggal_lahir ,
        to_char( tanggal_bergabung, 'DD-MON-YYYY') as tanggal_bergabung,
        COALESCE(c.total_cuti, 0) AS total_cuti,
        COALESCE((12-c.total_cuti), 12) AS sisa_cuti
         
        FROM karyawan k
        LEFT JOIN
        (SELECT no_induk, SUM(lama_cuti) AS total_cuti FROM cuti GROUP BY no_induk) AS c
        ON c.no_induk = k.no_induk`);
        let result = data.rows;
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async searchUser(searchKey){
        try{
            searchKey = xssFilters.inHTMLData(searchKey);
        console.log(searchKey)
        if(searchKey == '-'){
            
            let data = await db.query(`SELECT 
        k.nama, k.no_induk, k.alamat,
        to_char( tanggal_lahir, 'DD-MON-YYYY') as tanggal_lahir ,
        to_char( tanggal_bergabung, 'DD-MON-YYYY') as tanggal_bergabung,
        COALESCE(c.total_cuti, 0) AS total_cuti,
        COALESCE((12-c.total_cuti), 12) AS sisa_cuti
         
        FROM karyawan k
        LEFT JOIN
        (SELECT no_induk, SUM(lama_cuti) AS total_cuti FROM cuti GROUP BY no_induk) AS c
        ON c.no_induk = k.no_induk`);
        let result = data.rows;
        
        return result;

        }
        let keyWord = `%${searchKey}%`;
        
        
        let data = await db.query(`
        SELECT 
        k.nama, k.no_induk, k.alamat,
        to_char( tanggal_lahir, 'DD-MON-YYYY') as tanggal_lahir ,
        to_char( tanggal_bergabung, 'DD-MON-YYYY') as tanggal_bergabung,
        COALESCE(c.total_cuti, 0) AS total_cuti,
        COALESCE((12-c.total_cuti), 12) AS sisa_cuti
         
        FROM karyawan k
        LEFT JOIN
        (SELECT no_induk, SUM(lama_cuti) AS total_cuti FROM cuti GROUP BY no_induk) AS c
        ON c.no_induk = k.no_induk

        
        WHERE k.nama iLIKE $1 OR alamat iLIKE $1 OR k.no_induk iLIKE $1
        
        `,[keyWord])
        let result = data.rows;
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async getSpecificUserBeforeUpdate(no_induk){
        try{
            let data = await db.query(`
        SELECT no_induk, nama, alamat,
        to_char( tanggal_lahir, 'YYYY-MM-DD') as tanggal_lahir2,
        to_char( tanggal_bergabung, 'YYYY-MM-DD') as tanggal_bergabung2 FROM karyawan WHERE no_induk = $1 LIMIT 1
        `,[no_induk]);
        let result = data.rows[0];
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async updateUser(input){
        try{
            let fixed = xssFilters.inHTMLData(input.fixed_noinduk);
            let nama = xssFilters.inHTMLData(input.input_nama);
        let alamat = xssFilters.inHTMLData(input.input_alamat);
        let no_induk = xssFilters.inHTMLData(input.input_no_induk);
        let tanggal_lahir = xssFilters.inHTMLData(input.input_tanggal_lahir);
        let tanggal_bergabung = xssFilters.inHTMLData(input.input_tanggal_bergabung);
        console.log([no_induk,nama,alamat,tanggal_lahir,tanggal_bergabung])
        let data = await db.query(`
        UPDATE karyawan 
        SET no_induk = $1, nama = $2, alamat = $3, 
        tanggal_lahir = $4, tanggal_bergabung = $5 WHERE no_induk = $6`,[no_induk,nama,alamat,tanggal_lahir,tanggal_bergabung,fixed]);
        let result = data.rows;
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async insertUser(input){
        try{
            let nama = xssFilters.inHTMLData(input.input_nama);
        let alamat = xssFilters.inHTMLData(input.input_alamat);
        let no_induk = xssFilters.inHTMLData(input.input_no_induk);
        let tanggal_lahir = xssFilters.inHTMLData(input.input_tanggal_lahir);
        let tanggal_bergabung = xssFilters.inHTMLData(input.input_tanggal_bergabung);

        let data = await db.query(`
        INSERT INTO karyawan
        (no_induk,nama,alamat,tanggal_lahir, tanggal_bergabung)
        VALUES ($1,$2,$3,$4,$5)
        `,[no_induk,nama,alamat,tanggal_lahir,tanggal_bergabung]);
        let result = data.rows;
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async removeUser(input){
        try{
            let noinduk = xssFilters.inHTMLData(input.remove_delete_noinduk);
        let data = await db.query(`
        DELETE FROM karyawan 
        WHERE no_induk = $1`,[noinduk]);
        let result = data.rows;
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async karyawan3(req, res, next){
        try{
            let data = await db.query(`
        SELECT 
        k.nama, k.no_induk, k.alamat,
        to_char( tanggal_lahir, 'DD-MON-YYYY') as tanggal_lahir2 ,
        to_char( tanggal_bergabung, 'DD-MON-YYYY') as tanggal_bergabung2,
        COALESCE(c.total_cuti, 0) AS total_cuti,
        COALESCE((12-c.total_cuti), 12) AS sisa_cuti
         
        FROM karyawan k
        LEFT JOIN
        (SELECT no_induk, SUM(lama_cuti) AS total_cuti FROM cuti GROUP BY no_induk) AS c
        ON c.no_induk = k.no_induk ORDER BY tanggal_bergabung ASC LIMIT 3`)
        ;
        

        let result = data.rows;

        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },


    async pernahCuti(){
        try{
            let data = await db.query(`
        SELECT nama, cc.no_induk , cc.cuti_berapa_kali 
        FROM karyawan k INNER JOIN
        (SELECT c.no_induk AS no_induk,  COUNT(*) AS cuti_berapa_kali
        FROM cuti c
        GROUP BY no_induk
        ORDER BY COUNT(*) DESC) AS cc ON cc.no_induk = k.no_induk
        `);
        let result = data.rows;

        for(let i = 0; i < result.length; i++){
            let info = await db.query(
                `
                SELECT 
                to_char( tanggal_cuti, 'DD-MON-YYYY') as tanggal_cuti2, 
                keterangan FROM cuti WHERE no_induk = $1
                `,[result[i].no_induk]
            )
            let data_cuti = info.rows;
            result[i].data_cuti = data_cuti;
        }
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    },

    async cutiLebihDari1(){
        try{
            let data = await db.query(`
        SELECT nama, cc.no_induk , 
        cc.cuti_berapa_kali FROM karyawan k INNER JOIN       
        (SELECT no_induk AS no_induk,  
        (COUNT(*)) AS cuti_berapa_kali
        FROM cuti
        GROUP BY no_induk
        HAVING  COUNT(*) > 1
        ORDER BY COUNT(*) DESC) AS cc ON cc.no_induk = k.no_induk`);
        let result = data.rows;
        for(let i = 0; i < result.length; i++){
            let info = await db.query(
                `
                SELECT to_char( tanggal_cuti, 'DD-MON-YYYY') as tanggal_cuti2, 
                keterangan FROM cuti WHERE no_induk = $1
                `,[result[i].no_induk]
            )
            let data_cuti = info.rows;
            result[i].data_cuti = data_cuti;
        }
        
        return result;
        }catch(err){
        
            logger.error(err.stack);
        }
        
    }

    
}