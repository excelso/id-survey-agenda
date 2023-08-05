<?php

    namespace App\Models\Master;

    use App\Models\Master\Customer;
    use App\Models\Master\Kantor;
    use App\Models\Master\LeadsStatusLog;
    use App\Models\Master\Portofolio;
    use App\Models\Master\PortofolioDetail;
    use App\Models\Master\Status;
    use App\Models\Master\UnitKerja;
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\HasMany;
    use Illuminate\Database\Eloquent\SoftDeletes;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Support\Collection;
    use Illuminate\Support\Facades\DB;

    /**
     * @method static paginate(int $paging)
     * @method static find(mixed $id)
     * @method where(string $string, string $string1)
     * @method orderBy(string $string, string $string1)
     * @method static create(array $array)
     */
    class KategoriAgenda extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 't_agenda_kategori';

    }
