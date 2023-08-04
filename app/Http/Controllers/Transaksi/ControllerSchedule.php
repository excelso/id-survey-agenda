<?php

    namespace App\Http\Controllers\Transaksi;

    use App\Http\Controllers\Controller;
    use App\Models\Master\Karyawan\User;
    use App\Models\Master\Karyawan\UserRole;
    use App\Models\Transaksi\Agenda;
    use Carbon\Carbon;
    use Exception;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\View\View;

    class ControllerSchedule extends Controller {
        protected string $viewPath;

        public function __construct() {
            $this->viewPath = 'main/transaksi/data-schedule';
        }

        public function index(Request $request): View {
            if (Auth::user()->role_id != 1) {
                abort(403, 'Halaman ini hanya untuk Administrator!');
            }

            $data = Agenda::dataAgenda();
            return view($this->viewPath . '/index', [
                'items' => $data->paginate(20),
            ]);
        }

        public function loadAgenda(Request $request): JsonResponse {
            try {

                $data = Agenda::dataAgenda();
                return response()->json([
                    'message' => 'Load Success!',
                    'data' => $data->get(),
                    'responseTime' => Carbon::now()
                ], 200, [], JSON_PRETTY_PRINT);

            } catch (Exception $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'responseTime' => Carbon::now()
                ], 500);
            }
        }

        public function store(Request $request): JsonResponse {
            DB::beginTransaction();
            try {

                $validate = Validator::make($request->all(), [
                    'judul' => 'required',
                    'tanggal_start' => 'required',
                    'tanggal_until' => 'required',
                    'detail' => 'required',
                    'lokasi' => 'required',
                    'prioritas' => 'required',
                ], [
                    'judul.required' => 'Judul tidak boleh kosong!',
                    'tanggal_start.required' => 'Tanggal Mulai tidak boleh kosong!',
                    'tanggal_until.required' => 'Tanggal Selesai boleh kosong!',
                    'detail.required' => 'Detail Jadwal tidak boleh kosong!',
                    'lokasi.required' => 'Lokasi tidak boleh kosong!',
                    'prioritas.required' => 'Lokasi NDVI tidak boleh kosong!',
                ]);

                if ($validate->fails()) {
                    return response()->json([
                        'errorValidation' => $validate->errors(),
                        'responseTime' => Carbon::now()
                    ], 401);
                }

                Agenda::create([
                    'judul' => $request->input('judul'),
                    'tanggal_start' => $request->input('tanggal_start'),
                    'tanggal_until' => $request->input('tanggal_until'),
                    'detail' => $request->input('detail'),
                    'lokasi' => $request->input('lokasi'),
                    'notes' => $request->input('notes'),
                    'prioritas' => $request->input('prioritas'),
                ]);

                DB::commit();
                return response()->json([
                    'message' => 'Agenda baru Berhasil disimpan!',
                    'responseTime' => Carbon::now()
                ], 200, [], JSON_PRETTY_PRINT);

            } catch (Exception $exception) {
                DB::rollBack();
                return response()->json([
                    'message' => $exception->getMessage(),
                    'responseTime' => Carbon::now()
                ], 500);
            }
        }

    }
