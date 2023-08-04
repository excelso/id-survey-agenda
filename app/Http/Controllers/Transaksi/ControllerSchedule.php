<?php

    namespace App\Http\Controllers\Transaksi;

    use App\Http\Controllers\Controller;
    use App\Models\Master\Karyawan\User;
    use App\Models\Master\Karyawan\UserRole;
    use App\Models\Transaksi\Jadwal;
    use Exception;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
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

            $data = Jadwal::dataJadwal();

            return view($this->viewPath . '/index', [
                'items' => $data->paginate(20),
            ]);
        }

    }
