-- DDL generated by Postico 1.5.10
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE karyawan (
    id BIGSERIAL PRIMARY KEY,
    no_induk character varying(100) UNIQUE REFERENCES karyawan(no_induk) ON DELETE CASCADE ON UPDATE CASCADE,
    nama character varying(100),
    alamat text,
    tanggal_lahir date,
    tanggal_bergabung date
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX karyawan_pkey ON karyawan(id int8_ops);
CREATE UNIQUE INDEX karyawan_no_induk_key ON karyawan(no_induk text_ops);
