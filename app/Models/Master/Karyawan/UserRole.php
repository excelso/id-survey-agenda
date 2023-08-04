<?php

    namespace App\Models\Master\Karyawan;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    /**
     * @method static create(array $all)
     * @method static where(string $string, string $id)
     * @method static get()
     */
    class UserRole extends Model {
        use HasFactory;

        protected $table = 'user_role';
        protected $fillable = [
            'role',
        ];

    }
