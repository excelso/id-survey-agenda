<?php

    namespace App\Models\Transaksi;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    /**
     * @method static create(array $all)
     * @method static where(string $string, string $id)
     * @method static get()
     */
    class JadwalTeams extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 't_jadwal_teams';

    }
