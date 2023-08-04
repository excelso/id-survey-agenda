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
            // if (Auth::user()->role_id != 1) {
            //     abort(403, 'Halaman ini hanya untuk Administrator!');
            // }

            $data = Agenda::dataAgenda();
            return view($this->viewPath . '/index', [
                'items' => $data->paginate(20),
            ]);
        }

        public function loadAgenda(Request $request): JsonResponse {
            try {

                $data = Agenda::with('user')->dataAgenda();
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

                $agenda = Agenda::create([
                    'user_id' => Auth::user()->id,
                    'judul' => $request->input('judul'),
                    'tanggal_start' => $request->input('tanggal_start'),
                    'tanggal_until' => $request->input('tanggal_until'),
                    'detail' => $request->input('detail'),
                    'lokasi' => $request->input('lokasi'),
                    'notes' => $request->input('notes'),
                    'sambutan' => $request->input('sambutan'),
                    'protokoler' => $request->input('protokoler'),
                    'prioritas' => $request->input('prioritas'),
                ]);

                $data_user = (new User)->find(Auth::user()->id);

                DB::commit();
                return response()->json([
                    'message' => 'Agenda baru Berhasil disimpan!',
                    'jadwal_id' => $agenda->id,
                    'user' => $data_user,
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

        public function update(Request $request): JsonResponse {
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

                $agenda_id = $request->input('id');
                $agenda = Agenda::find($agenda_id);
                $agenda->judul = $request->input('judul');
                $agenda->tanggal_start = $request->input('tanggal_start');
                $agenda->tanggal_until = $request->input('tanggal_until');
                $agenda->detail = $request->input('detail');
                $agenda->lokasi = $request->input('lokasi');
                $agenda->notes = $request->input('notes');
                $agenda->sambutan = $request->input('sambutan');
                $agenda->protokoler = $request->input('protokoler');
                $agenda->prioritas = $request->input('prioritas');
                $agenda->save();

                $data_user = (new User)->find($agenda->user_id);

                DB::commit();
                return response()->json([
                    'message' => 'Perubahan Agenda Berhasil disimpan!',
                    'data' => $agenda,
                    'user' => $data_user,
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
