<?php

namespace App\Services;

use App\Models\LoginHistory;

class LoginHistoryService
{
    public function log($user, $request)
    {
        $loginData = [
            'user_id'    => $user->id,
            'ip_address' => $request->ip(),
        ];

        if ($request->has(['latitude', 'longitude'])) {
            $loginData['latitude'] = $request->latitude;
            $loginData['longitude'] = $request->longitude;
        } else {
            $loginData['geolocation'] = "IP: " . $request->ip();
        }

        LoginHistory::create($loginData);
    }
}
