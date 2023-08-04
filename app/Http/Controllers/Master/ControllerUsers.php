<?php

    namespace App\Http\Controllers\Master;

    use App\Http\Controllers\Controller;
    use App\Models\Master\Karyawan\User;
    use App\Models\Master\Karyawan\UserRole;
    use Exception;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\View\View;

    class ControllerUsers extends Controller {
        protected string $viewPath;

        public function __construct() {
            $this->viewPath = 'main/master/data-karyawan';
        }

        public function index(Request $request): View {
            if (Auth::user()->role_id != 1) {
                abort(403, 'Halaman ini hanya untuk Administrator!');
            }

            $dataRole = UserRole::get();
            $dataKaryawan = User::user([
                'search' => $request->input()
            ]);

            return view($this->viewPath . '/index', [
                'items' => $dataKaryawan->paginate(20),
                'roles' => $dataRole,
            ]);
        }

        public function store(Request $request): JsonResponse {
            try {

                $validator = Validator::make($request->all(), [
                    'npp' => 'required',
                    'name' => 'required',
                    'email' => 'required',
                    'timezone' => 'required',
                    'role_id' => 'required',
                ], [
                    'npp.required' => 'NPP Tidak boleh kosong',
                    'name.required' => 'Nama Karyawan tidak boleh kosong',
                    'email.required' => 'Email tidak boleh kosong',
                    'timezone.required' => 'Timezone tidak boleh kosong',
                    'role_id.required' => 'Role tidak boleh kosong',
                ]);

                $passwordError = [];
                $rePasswordError = [];
                if ($request->input('password') == '') {
                    $passwordError = ['password' => ['Password minimal 8 karakter']];
                } else {
                    if (strlen($request->input('password')) < 8) {
                        $passwordError = ['password' => ['Password minimal 8 karakter']];
                    }
                }

                if ($request->input('re_password') == '') {
                    $rePasswordError = ['re_password' => ['Password minimal 8 karakter']];
                } else {
                    if (strlen($request->input('re_password')) < 8) {
                        $rePasswordError = ['re_password' => ['Password minimal 8 karakter']];
                    } else {
                        if ($request->input('re_password') != $request->input('password')) {
                            $rePasswordError = ['re_password' => ['Password yang dimasukan tidak sama']];
                        }
                    }
                }

                if ($validator->fails() || count($passwordError) != 0 || count($rePasswordError) != 0) {
                    return response()->json([
                        'errorValidation' => array_merge($validator->errors()->toArray(), $passwordError, $rePasswordError),
                        'responseTime' => now()
                    ], 400);
                }

                $nppExist = User::where('npp', $request->input('npp'))->get()->first();
                if ($nppExist) {
                    return response()->json([
                        'message' => 'NPP Tersebut sudah terdaftar untuk ' . $nppExist->name,
                        'responseTime' => now()
                    ], 400);
                }

                $emailExist = User::where('email', $request->input('email'))->get()->first();
                if ($emailExist) {
                    return response()->json([
                        'message' => 'Email Tersebut sudah terdaftar untuk ' . $emailExist->name,
                        'responseTime' => now()
                    ], 400);
                }

                User::create([
                    'npp' => $request->input('npp'),
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'password' => Hash::make($request->input('re_password')),
                    'timezone' => $request->input('timezone'),
                    'role_id' => $request->input('role_id'),
                    'status_user' => $request->input('status_user'),
                ]);

                return response()->json([
                    'message' => 'Karyawan Baru berhasil disimpan',
                    'responseTime' => now()
                ]);

            } catch (Exception $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode(),
                    'responseTime' => now()
                ], 500);
            }
        }

        public function update(Request $request): JsonResponse {
            try {

                $validator = Validator::make($request->all(), [
                    'npp' => 'required',
                    'name' => 'required',
                    'email' => 'required',
                    'timezone' => 'required',
                    'role_id' => 'required',
                ], [
                    'npp.required' => 'NPP Tidak boleh kosong',
                    'name.required' => 'Nama Karyawan tidak boleh kosong',
                    'email.required' => 'Email tidak boleh kosong',
                    'timezone.required' => 'Timezone tidak boleh kosong',
                    'role_id.required' => 'Role tidak boleh kosong',
                ]);

                $userExist = User::where('npp', $request->input('npp'))->get()->first();
                $passwordError = [];
                $rePasswordError = [];
                if (strlen($request->input('password')) != 0) {
                    if (strlen($request->input('password')) < 8) {
                        $passwordError = ['password' => ['Password minimal 8 karakter']];
                    } else {
                        if (!Hash::check(Hash::make($request->input('password')), $userExist->password)) {
                            if (strlen($request->input('re_password')) < 8) {
                                $rePasswordError = ['re_password' => ['Password minimal 8 karakter']];
                            } else {
                                if ($request->input('re_password') != $request->input('password')) {
                                    $rePasswordError = ['re_password' => ['Password yang dimasukan tidak sama']];
                                }
                            }
                        }
                    }
                }

                if ($validator->fails() || count($passwordError) != 0 || count($rePasswordError) != 0) {
                    return response()->json([
                        'errorValidation' => array_merge($validator->errors()->toArray(), $passwordError, $rePasswordError)
                    ], 400);
                }

                if ($request->input('email') != $request->input('email_old')) {
                    $emailExist = User::where('email', $request->input('email'))->get()->first();
                    if ($emailExist) {
                        return response()->json([
                            'message' => 'Email Tersebut sudah terdaftar untuk ' . $emailExist->name,
                            'responseTime' => now()
                        ], 400);
                    }
                }

                User::where('id', $request->input('user_id'))->update([
                    'npp' => $request->input('npp'),
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'timezone' => $request->input('timezone'),
                    'role_id' => $request->input('role_id'),
                    'status_user' => $request->input('status_user'),
                ]);

                if (strlen($request->input('re_password')) != 0) {
                    if (!Hash::check(Hash::make($request->input('re_password')), $userExist->password)) {
                        User::where('npp', $request->input('npp'))->update([
                            'password' => Hash::make($request->input('re_password')),
                        ]);
                    }
                }

                return response()->json([
                    'message' => 'Perubahan data Karyawan berhasil disimpan',
                    'responseTime' => now()
                ]);

            } catch (Exception $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode(),
                    'responseTime' => now()
                ], 500);
            }
        }

        public function delete(Request $request): JsonResponse {
            try {

                $validator = Validator::make($request->all(), [
                    'user_id' => 'required',
                ], [
                    'user_id.required' => 'User Id Tidak boleh kosong',
                ]);

                if ($validator->passes()) {

                    User::where('id', $request->input('user_id'))->delete();

                    return response()->json([
                        'message' => 'Data Karyawan berhasil dihapus',
                        'responseTime' => now()
                    ]);
                } else {
                    return response()->json([
                        'errorValidation' => $validator->errors()
                    ], 400);
                }

            } catch (Exception $exception) {
                return response()->json([
                    'message' => $exception->getMessage(),
                    'responseTime' => now()
                ], 500);
            }
        }
    }
