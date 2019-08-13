<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\informeModel;
use Illuminate\Support\Facades\DB;

use App\Exports\informeExport;
use App\Exports\informeDiario;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class informeController extends Controller
{
    public function Agregar(Request $request)
    {
        $informe_model = new informeModel();
        $usuario = session('usu');

        $informe_model->VC_BANDEJA = $_POST['bandeja'];
        $informe_model->VC_REMITENTE = $_POST['remitente'];
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];
        $informe_model->DT_FECHA_HORA = $fecha.' '.$hora;
        $informe_model->CH_COD_CLIENTE = $_POST['cod_cliente'];
        $informe_model->VC_ESTADO = $_POST['estado'];
        $informe_model->VC_ASUNTO = $_POST['asunto'];
        $informe_model->VC_EDITADOS = $_POST['editados'];
        $informe_model->VC_PRODUCTO = $_POST['producto'];
        $informe_model->VC_NRO_TRAMITE = $_POST['nroTramite'];
        $informe_model->CH_ID_USUARIO_CREACION = $usuario->CH_ID_USUARIO;
        $informe_model->DT_FECHA_CREACION = now();

        $informe_model->save();

    }

    public function Actualizar(Request $request)
    {
        $id_inf_update = $_POST['idInforme'];
        $informe_update = informeModel::where('IN_ID_INFORME',$id_inf_update)->first();

        $usuario = session('usu');
        $informe_update->VC_BANDEJA = $_POST['bandeja'];
        $informe_update->VC_REMITENTE = $_POST['remitente'];
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];
        $informe_update->DT_FECHA_HORA = $fecha.' '.$hora;
        $informe_update->CH_COD_CLIENTE = $_POST['cod_cliente'];
        $informe_update->VC_ESTADO = $_POST['estado'];
        $informe_update->VC_ASUNTO = $_POST['asunto'];
        $informe_update->VC_EDITADOS = $_POST['editados'];
        $informe_update->VC_PRODUCTO = $_POST['producto'];
        $informe_update->VC_NRO_TRAMITE = $_POST['nroTramite'];
        $informe_update->CH_ID_USUARIO_UPDATE = $usuario->CH_ID_USUARIO;
        $informe_update->DT_FECHA_UPDATE = now();

        $informe_update->save();
    }

    public function Eliminar()
    {
        $id = $_POST['idInforme'];
        $informe = informeModel::where('IN_ID_INFORME',$id)->first();
        if(count((array)$informe) != 0)
        {
            $informe->delete();
            $mensaje = "El Usuario ha sido eliminado correctamente";
        }else
        {
            $mensaje = "No existe informe con ese ID";
        }
        return response()->json([
            'mensaje' => $mensaje
        ]);
    }

    public function Listar()
    {
        $usuario = session('usu');
        $informe_model = new informeModel();
        $id_usuarios = DB::table('USUARIO')->select('CH_ID_USUARIO')
                                            // ->where('IN_ID_PERFIL',2)
                                            ->get();
        $fecha_actual = now();
        $dia_actual = date('d',strtotime($fecha_actual));
        $mes_actual = date('m',strtotime($fecha_actual));
        $ano_actual = date('Y',strtotime($fecha_actual));
        if($usuario->IN_ID_PERFIL == 1)
        {
            $informes = DB::table('INFORME')->whereMonth('DT_FECHA_CREACION',$mes_actual)
                                            ->whereYear('DT_FECHA_CREACION',$ano_actual)
                                            ->orderBy('DT_FECHA_CREACION','desc')->get();
            return response()->json([
                'informes' => $informes,
                'idPerfil' => $usuario->IN_ID_PERFIL,
                'idUsuarios' => $id_usuarios
                ]);
        }
        else{
          
            $informes = DB::table('INFORME')->where('CH_ID_USUARIO_CREACION','=',$usuario->CH_ID_USUARIO)
                                            ->whereMonth('DT_FECHA_CREACION',$mes_actual)
                                            ->whereYear('DT_FECHA_CREACION',$ano_actual)
                                            ->orderBy('DT_FECHA_CREACION','desc')
                                            ->get();
            $informesDia = DB::table('INFORME')->where('CH_ID_USUARIO_CREACION','=',$usuario->CH_ID_USUARIO)
                                                ->whereDay('DT_FECHA_CREACION',$dia_actual)
                                                ->whereMonth('DT_FECHA_CREACION',$mes_actual)
                                                ->whereYear('DT_FECHA_CREACION',$ano_actual)
                                                ->get()->count();
            //$conteoInformes = $informesDia->count();
        return response()->json([
            'informes' => $informes,
            'idPerfil' => $usuario->IN_ID_PERFIL,
            'cantInformesDia' => $informesDia
            ]);
        }   
      
    }

    public function InformesUsuarioMes()
    {
       $datosMes = DB::select('CALL USP_REGISTROS_MES');
       $datosEstadoMes = DB::select('CALL USP_REGISTROS_ESTADO_MES');
       return response()->json([
           'datosMes' => $datosMes,
           'datosEstado' => $datosEstadoMes
       ]);
    }

    public function exportInforme(Request $request)
    {
        //$mes = $_POST['mesDescarga'];
        $mes = $request->input('mesInforme');
        return (new informeExport($mes))->download('ProduccionMes'.$mes.'.xlsx'); 
    }

    public function exportInformeDiario()
    {
        $hoy = date("d-m-Y",strtotime(now()));
        return (new informeDiario())->store('ProduccionDia '.$hoy.'.xlsx','reportes');
    }

}
