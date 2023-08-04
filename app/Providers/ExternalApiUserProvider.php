<?php

namespace App\Providers;

use App\Models\Master\Karyawan\User;
use Exception;
use Illuminate\Auth\GenericUser;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ExternalApiUserProvider implements UserProvider {

    /**
     * @inheritDoc
     */
    public function retrieveById($identifier): ?Authenticatable {
        return User::where('users.id', $identifier)
            ->select(
                'users.*',
                'users_firebase.reg_token as firebase_reg_token'
            )
            ->leftJoin('users_firebase', 'users.user_firebase_token', '=', 'users_firebase.id')
            ->where('users.status_user', 1)
            ->get()->first();
    }

    /**
     * @inheritDoc
     */
    public function retrieveByToken($identifier, $token): ?Authenticatable {
        $userExist = User::where('users.id', $identifier)->where('remember_token', $token);
        if ($userExist->count() > 0){
            return $userExist->select(
                    'users.*',
                    'users_firebase.reg_token as firebase_reg_token'
                )
                ->leftJoin('users_firebase', 'users.user_firebase_token', '=', 'users_firebase.id')
                ->where('users.status_user', 1)
                ->get()->first();
        }
        return null;
    }

    /**
     * @inheritDoc
     */
    public function updateRememberToken(Authenticatable $user, $token): void {
        $user->setRememberToken($token);
        $user->save();
    }

    /**
     * @inheritDoc
     */
    public function retrieveByCredentials(array $credentials): GenericUser|Authenticatable|null {
        if (!array_key_exists('email', $credentials)) {
            return null;
        }

        $userExist = User::where('email', $credentials['email']);
        if ($userExist->count() > 0){
            return $userExist->select(
                    'users.*',
                    'users_firebase.reg_token as firebase_reg_token'
                )
                ->leftJoin('users_firebase', 'users.user_firebase_token', '=', 'users_firebase.id')
                ->where('users.status_user', 1)
                ->get()->first();
        }
        return null;

        // return new GenericUser([
        //     'id' => $credentials['email'],
        //     'email' => $credentials['email'],
        //     'remember_token' => '',
        // ]);
    }

    /**
     * @inheritDoc
     */
    public function validateCredentials(Authenticatable $user, array $credentials): string|bool {
        try {
            if (Hash::check($credentials['password'], $user->getAuthPassword())) {
                return true;
            }
            return false;
        } catch (Exception $exception) {
            Log::error($exception->getMessage());
            return false;
        }

    }
}
