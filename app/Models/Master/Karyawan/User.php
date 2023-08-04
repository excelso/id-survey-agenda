<?php

namespace App\Models\Master\Karyawan;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Master\Jabatan;
use App\Models\Master\Job;
use App\Models\Master\Kantor;
use App\Models\Master\Organisasi;
use App\Models\Master\UnitKerja;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @mixin Builder
 * @mixin \Illuminate\Database\Query\Builder
 * @method static user(array $array)
 */
class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'role_id',
        'npp',
        'name',
        'email',
        'password',
        'timezone',
        'status_user'
    ];

    protected $hidden = [
        // 'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $rememberTokenName = 'remember_token';

    public function role(): BelongsTo {
        return $this->belongsTo(UserRole::class, 'role_id', 'id');
    }

    public function scopeUser(Builder $query, $option = []): void {
        $search = [];
        if (count($option) != 0)
            $search = $option['search'];

        if (count($search) != 0) {

            if (isset($search['npp']) && $search['npp'] != '') {
                $query->where('users.npp', 'LIKE', '%' . $search['npp'] . '%');
            }

            if (isset($search['nama_karyawan']) && $search['nama_karyawan'] != '') {
                $query->where('users.name', 'LIKE', '%' . $search['nama_karyawan'] . '%');
            }

            if (isset($search['email']) && $search['email'] != '') {
                $query->where('users.email', 'LIKE', '%' . $search['email'] . '%');
            }

            if (isset($search['timezone']) && $search['timezone'] != '') {
                $query->where('users.timezone', '=', $search['timezone']);
            }

            if (isset($search['role']) && $search['role'] != '') {
                $query->where('users.role_id', '=', $search['role']);
            }

            if (isset($search['status']) && $search['status'] != '') {
                $query->where('users.status_user', '=', $search['status']);
            }
        }

    }
}
