<?php

    namespace App\Models\Transaksi;

    use Illuminate\Database\Eloquent\Builder;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    /**
     * @method static create(array $all)
     * @method static where(string $string, string $id)
     * @method static get()
     * @method static dataAgenda()
     */
    class Agenda extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 't_agenda';

        public function scopeDataAgenda(Builder $builder): void {
            $builder->select('*');
        }

    }
