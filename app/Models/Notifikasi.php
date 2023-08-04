<?php

    namespace App\Models;

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
    class Notifikasi extends Model {
        use HasFactory;

        protected $guarded = [];
        protected $table = 't_notifikasi';

        public function getDataNotifikasi($user_id): Collection {
            $dataTable = DB::table($this->table)
                ->select(
                    't_notifikasi.*',
                    'notifikasi_read.readed',
                    'user_sender.name as nama_pengirim'
                )
                ->leftJoin(
                    DB::raw('
                        (
                            SELECT
                                t_notifikasi_read.*
                            FROM
                                t_notifikasi_read
                                WHERE t_notifikasi_read.user_id = "' . $user_id . '"
                        ) as notifikasi_read
                    '), function ($join) {
                    $join->on('notifikasi_read.notifikasi_id', '=', 't_notifikasi.id');
                })
                ->leftJoin('users as user_sender', 't_notifikasi.sender_id', '=', 'user_sender.id')
                ->where(function ($query) use ($user_id) {
                    $query->where('t_notifikasi.receiver_id', '=', $user_id);
                    $query->orWhereNull('t_notifikasi.receiver_id');
                })
                ->where('t_notifikasi.status_kirim', 'terkirim')
                ->orderBy('t_notifikasi.created_at', 'DESC')
                ->limit(20);

            return $dataTable->get();
        }

        public function getDataNotifikasiUnread($user_id): Collection {
            $dataTable = DB::table($this->table)
                ->select('t_notifikasi.id')
                ->leftJoin(
                    DB::raw('
                        (
                            SELECT
                                t_notifikasi_read.*
                            FROM
                                t_notifikasi_read
                                WHERE t_notifikasi_read.user_id = "' . $user_id . '"
                        ) as notifikasi_read
                    '), function ($join) {
                    $join->on('notifikasi_read.notifikasi_id', '=', 't_notifikasi.id');
                })
                ->where(function ($query) use ($user_id) {
                    $query->where('t_notifikasi.receiver_id', '=', $user_id);
                    $query->orWhereNull('t_notifikasi.receiver_id');
                })
                ->whereNull('notifikasi_read.user_id')
                ->where('t_notifikasi.status_kirim', 'terkirim')
                ->orderBy('t_notifikasi.created_at', 'DESC');

            return $dataTable->get();
        }

        public function getDataNotifikasiReaded($user_id): Collection {
            $dataTable = DB::table($this->table)
                ->select('t_notifikasi.id')
                ->leftJoin(
                    DB::raw('
                        (
                            SELECT
                                t_notifikasi_read.*
                            FROM
                                t_notifikasi_read
                                WHERE t_notifikasi_read.user_id = "' . $user_id . '"
                        ) as notifikasi_read
                    '), function ($join) {
                    $join->on('notifikasi_read.notifikasi_id', '=', 't_notifikasi.id');
                })
                ->where(function ($query) use ($user_id) {
                    $query->where('t_notifikasi.receiver_id', '=', $user_id);
                    $query->orWhereNull('t_notifikasi.receiver_id');
                })
                ->whereNotNull('notifikasi_read.user_id')
                ->where('t_notifikasi.status_kirim', 'terkirim')
                ->orderBy('t_notifikasi.created_at', 'DESC');

            return $dataTable->get();
        }

        public function getCountNotifikasi($user_id): Collection {
            $dataTable = DB::table($this->table)
                ->select(DB::raw('COUNT(t_notifikasi.id) as totalRows'))
                ->leftJoin(
                    DB::raw('
                        (
                            SELECT
                                t_notifikasi_read.*
                            FROM
                                t_notifikasi_read
                                WHERE t_notifikasi_read.user_id = "' . $user_id . '"
                                AND t_notifikasi_read.opened IS NOT NULL
                        ) as notifikasi_read
                    '), function ($join) {
                    $join->on('notifikasi_read.notifikasi_id', '=', 't_notifikasi.id');
                })
                ->leftJoin('users as user_sender', 't_notifikasi.sender_id', '=', 'user_sender.id')
                ->where(function ($query) use ($user_id) {
                    $query->where('t_notifikasi.receiver_id', '=', $user_id);
                    $query->orWhereNull('t_notifikasi.receiver_id');
                })
                ->whereNull('notifikasi_read.user_id')
                ->where('t_notifikasi.status_kirim', 'terkirim');

            return $dataTable->get();
        }

    }
