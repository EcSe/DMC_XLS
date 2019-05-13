<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\usuarioModel;
use Illuminate\Support\Facades\DB;

class usuarioController extends Controller
{
    public function LoginUser(Request $request)
    {
        $usuario_bd = new usuarioModel();
        $usuario = $request->input('idusuario');
        $password = $request->input('password');

       $usuario = DB::table('USUARIO')->where('CH_ID_USUARIO',$usuario)
                                      ->where('VC_PASSWORD',$password)     
                                      ->first(); /*Si usabas el ->get() tenias que usar un 
                                        foreach para recorrer el array*/
       if(count($usuario) == 0)
       {
        // return redirect()->route('logueo')->with(array(
        //     'avisousuario' =>'Usuario y/o Contraseña Incorrectos'
        // ));
       } 
        else return view('informes',array(
                session(['usu'=>$usuario])
        ));   
        
        // return response()->json($usuario);
    }

    public function Logout(Request $request)
    {
        $request->session()->flush();
        return view('login');
    }

    public function AgregarUsuario(Request $request)
    {
        $new_user = new usuarioModel();

        $new_user->CH_ID_USUARIO = $_POST['idUsuario'];
        $new_user->VC_NOMBRE     = $_POST['nombre'];   
        $new_user->VC_APELLIDOS  = $_POST['apellidos'];
        $new_user->IN_ID_PERFIL  = $_POST['idPerfil'];
        $new_user->VC_PASSWORD   = $_POST['password'];
        $new_user->VC_EMAIL      = $_POST['email'];

        $new_user->save();
    }
}
