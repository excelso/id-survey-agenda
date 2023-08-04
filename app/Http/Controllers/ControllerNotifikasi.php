<?php

namespace App\Http\Controllers;

use App\Models\Master\Karyawan\User;
use App\Models\Master\Karyawan\UserFirebase;
use App\Models\Notifikasi;
use App\Models\NotifikasiRead;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class ControllerNotifikasi extends Controller {

    protected Notifikasi $notifikasi;
    protected NotifikasiRead $notifikasi_read;

    public function __construct() {
        $this->notifikasi = new Notifikasi();
        $this->notifikasi_read = new NotifikasiRead();
    }

    public function getDataNotifikasi(): JsonResponse {
        try {
            $dataNotifikasi = $this->notifikasi->getDataNotifikasi(Auth::user()->id);
            $data = [];
            foreach ($dataNotifikasi as $item) {
                $parseDataNotif = json_decode($item->data_notif, false);
                $link = '';
                if (isset($parseDataNotif->id)) {
                    if ($parseDataNotif->modul == 'account_planning') {
                        if ($parseDataNotif->type == 'request_approval') {
                            if (in_array(Auth::user()->role_id, [1, 2])) {
                                $link = '/account-planning/process/' . Crypt::encrypt($parseDataNotif->id);
                            } else {
                                $link = '/account-planning/show/' . Crypt::encrypt($parseDataNotif->id);
                            }
                        } else {
                            $link = '/account-planning/show/' . Crypt::encrypt($parseDataNotif->id);
                        }
                    } else if ($parseDataNotif->modul == 'leads') {
                        $link = '/sales/leads/show/' . Crypt::encrypt($parseDataNotif->id);
                    } else if ($parseDataNotif->modul == 'opportunity') {
                        $link = '/sales/opportunity/show/' . Crypt::encrypt($parseDataNotif->id);
                    } else if ($parseDataNotif->modul == 'bid_bond') {
                        $link = '/bank-guaranty/bid-bond/show/' . Crypt::encrypt($parseDataNotif->id);
                    }
                }

                $data[] = [
                    'id' => $item->id,
                    'title' => $item->title,
                    'detail' => $item->detail,
                    'link' => $link,
                    'kategori' => $item->kategori,
                    'readed' => $item->readed,
                    'nama_pengirim' => $item->nama_pengirim,
                ];
            }

            $dataNotifikasiUnread = $this->notifikasi->getDataNotifikasiUnread(Auth::user()->id);
            foreach ($dataNotifikasiUnread as $item) {
                $dataNotifRead = $this->notifikasi_read->where('notifikasi_id', $item->id)->get();
                if (count($dataNotifRead) == 0) {
                    NotifikasiRead::create([
                        'notifikasi_id' => $item->id,
                        'user_id' => Auth::user()->id,
                        'opened' => 1
                    ]);
                }
            }
            return response()->json([
                'message' => 'Notifikasi Ditemukan',
                'dataResponse' => $data,
                'responseTime' => now()
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'responseTime' => now()
            ], 500);
        }
    }

    public function getCountNotifikasi(): JsonResponse {
        try {
            $dataNotifikasi = $this->notifikasi->getCountNotifikasi(Auth::user()->id);
            return response()->json([
                'message' => 'Notifikasi Ditemukan',
                'dataResponse' => $dataNotifikasi->first()->totalRows,
                'responseTime' => now()
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'responseTime' => now()
            ], 500);
        }
    }

    public function markAllReadNotifikasi(): JsonResponse {
        try {
            $dataNotifikasiUnread = $this->notifikasi->getDataNotifikasiReaded(Auth::user()->id);
            foreach ($dataNotifikasiUnread as $item) {
                $dataNotifRead = $this->notifikasi_read->where('notifikasi_id', $item->id)->get();
                if (count($dataNotifRead) != 0) {
                    foreach ($dataNotifRead as $itemRead) {
                        NotifikasiRead::where('notifikasi_id', $itemRead->notifikasi_id)->update([
                            'readed' => 1
                        ]);
                    }
                }
            }

            return response()->json([
                'message' => 'Mark all as Read Notification Success!',
                'responseTime' => now()
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'responseTime' => now()
            ], 500);
        }
    }

    public function readNotifikasi(Request $request): JsonResponse {
        try {
            $dataNotifRead = $this->notifikasi_read
                ->where('notifikasi_id', $request->input('notifikasi_id'))
                ->where('user_id', Auth::user()->id)
                ->get();

            if (count($dataNotifRead) != 0) {
                NotifikasiRead::where('notifikasi_id', $request->input('notifikasi_id'))->update([
                    'readed' => 1
                ]);
            } else {
                NotifikasiRead::create([
                    'notifikasi_id' => $request->input('notifikasi_id'),
                    'user_id' => Auth::user()->id,
                    'opened' => 1,
                    'readed' => 1
                ]);
            }

            return response()->json([
                'message' => 'Read Notification Success!',
                'responseTime' => now()
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'responseTime' => now()
            ], 500);
        }
    }

    public function saveFirebaseRegToken(Request $request): JsonResponse {
        DB::beginTransaction();
        try {

            $exsitToken = UserFirebase::where('reg_token', $request->input('firebaseReqToken'))->where('user_id', Auth::user()->id)->first();
            if ($exsitToken == null) {
                $userFirebase = UserFirebase::create([
                    'reg_token' => $request->input('firebaseReqToken'),
                    'user_id' => Auth::user()->id,
                    'user_agent' => $request->header('User-Agent')
                ]);

                User::where('id', Auth::user()->id)->update([
                    'user_firebase_token' => $userFirebase->id
                ]);
            } else {
                $userFirebase = UserFirebase::where('reg_token', $request->input('firebaseReqToken'))->where('user_id', Auth::user()->id)->first();
                UserFirebase::find($userFirebase->id)->update([
                    'user_agent' => $request->header('User-Agent')
                ]);

                User::where('id', Auth::user()->id)->update([
                    'user_firebase_token' => $userFirebase->id
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Save Token Success!',
                'responseTime' => now()
            ]);
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage(),
                'responseTime' => now()
            ], 500);
        }
    }

    public function sendMessage($options = []): bool {
        $to = $options['to'];
        $title = $options['title'];
        $body = $options['body'];
        $payload = $options['payload'];

        $sendMessage = Http::withToken(env('FIREBASE_SERVER_KEY', ''))
            ->timeout(30)
            ->post(env('FIREBASE_SEND_URL', ''), [
                'to' => $to,
                'data' => array_merge([
                    'notification' => [
                        'title' => $title,
                        'body' => $body
                    ],
                ], $payload)
            ]);

        if ($sendMessage->failed()) return false;
        return true;
    }

    public function testSendMessage(): bool {
        $to = 'fQY5UsXx6cRfdOYZE6XVPw:APA91bFqfGhoEYIRh1NUhYsRQGPT9OrRHncAHti3x59k6KGOW_nG6jvBECukTTwoQRNhnbgyUwR49Av8flSzd5HbC4G4U0WzSMmnGC6mBDsXwKesuqtNeAj1kUt8o_QKYwA6758K38cX';
        $title = 'xxx';
        $body = 'xxxxxxx';
        $payload = [
            'modul' => 'account_planning',
            'id' => 1,
            'type' => 'request_approved',
            'user_receiver_id' => 14643
        ];

        $sendMessage = Http::withToken(env('FIREBASE_SERVER_KEY', ''))
            ->timeout(30)
            ->post(env('FIREBASE_SEND_URL', ''), [
                'to' => $to,
                'data' => array_merge([
                    'notification' => [
                        'title' => $title,
                        'body' => $body
                    ],
                ], $payload)
            ]);

        if ($sendMessage->failed()) return false;
        return true;
    }

}
