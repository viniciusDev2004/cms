<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastrarUsuarioRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Login(LoginRequest $request)
    {
        $credenciais = $request->validated();
        if(Auth::attempt($credenciais))
        {
            return response([
               'message' => 'Usuário e/ou senha incorretos '
            ]);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }
    public function CadastrarUsuario(CadastrarUsuarioRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['nome'],
            'email' => $data['email'],
            'password' => bcrypt($data['senha']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }
    public function Logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
