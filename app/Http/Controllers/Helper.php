<?php

namespace App\Http\Controllers;

class Helper {
    public static function singkatNama($nama, $singkatAfter = 3) {
        $kata = explode(' ', $nama);
        $jumlahKata = count($kata);

        $singkatan = '';
        if ($jumlahKata <= 2) {
            $singkatan = $nama;
        } else {
            for ($i = 0; $i < $jumlahKata; $i++) {
                if ($i >= $singkatAfter) {
                    $singkatan .= $kata[$i][0] . '.';
                } else {
                    $singkatan .= $kata[$i] . ' ';
                }
            }
        }

        return $singkatan;
    }
}
