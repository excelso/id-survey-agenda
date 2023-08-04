<?php

    namespace App\Http\Controllers\Pengaturan;

    use App\Http\Controllers\Controller;
    use App\Models\Master\Karyawan\User;
    use Carbon\Carbon;
    use Exception;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\View\View;

    class ControllerGantiPassword extends Controller {
        protected string $viewPath;

        public function __construct() {
            $this->viewPath = 'main/pengaturan/ganti-password';
        }

        public function index(): View {
            return view($this->viewPath . '/index');
        }

        public function updatePassword(Request $request): JsonResponse {
            try {

                $validate = Validator::make($request->all(), [
                    'password_lama' => 'required', 'password_baru' => 'required|min:8',
                    're_password_baru' => 'required|same:password_baru',
                ], [
                    'password_lama.required' => 'Password Lama tidak boleh kosong',
                    'password_baru.required' => 'Password Baru tidak boleh kosong',
                    'password_baru.min' => 'Password Baru minimal 8 Karakter',
                    're_password_baru.required' => 'Konfirmasi Password Baru tidak boleh kosong',
                    're_password_baru.same' => 'Password tidak sama',
                ]);

                if ($validate->fails()) {
                    return response()->json([
                        'errorValidation' => $validate->errors(), 'responseTime' => Carbon::now(),
                    ], 401);
                }

                $userExist = User::where('npp', Auth::user()->npp)->get()->first();
                if ($userExist) {
                    if (!Hash::check($request->input('password_lama'), $userExist->password)) {
                        return response()->json([
                            'errorValidation' => ['password_lama' => ['Password lama tidak sesuai']],
                            'responseTime' => Carbon::now(),
                        ], 401);
                    }
                }

                User::where('npp', Auth::user()->npp)->update(['password' => Hash::make($request->input('re_password_baru'))]);

                return response()->json([
                    'message' => 'Perubahan Password berhasil disimpan',
                    'responseTime' => Carbon::now(),
                ]);

            } catch (Exception $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'responseTime' => Carbon::now(),
                ], 500);
            }
        }

    }
