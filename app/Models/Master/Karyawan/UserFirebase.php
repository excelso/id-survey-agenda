<?php

    namespace App\Models\Master\Karyawan;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class UserFirebase extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 'users_firebase';
    }
