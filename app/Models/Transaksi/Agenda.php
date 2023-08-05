<?php

    namespace App\Models\Transaksi;

    use App\Models\Master\Karyawan\User;
    use App\Models\Master\KategoriAgenda;
    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    /**
     * @method static create(array $all)
     * @method static where(string $string, string $id)
     * @method static get()
     * @method static dataAgenda()
     * @method static find(mixed $agenda_id)
     */
    class Agenda extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 't_agenda';

        public function user(): BelongsTo {
            return $this->belongsTo(User::class, 'user_id', 'id');
        }

        public function kategori(): BelongsTo {
            return $this->belongsTo(KategoriAgenda::class, 'kategori_id', 'id');
        }

        public function scopeDataAgenda(Builder $builder): void {
            $builder->select('*');
        }

    }
