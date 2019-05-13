<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class informeModel extends Model
{
    protected $table = 'INFORME';
    protected $primaryKey = 'IN_ID_INFORME';
    public $timestamps = false;
    protected $fillable = [
        'DT_FECHA_CREACION','VC_BANDEJA','VC_REMITENTE','DT_FECHA_HORA',
        'CH_COD_CLIENTE','VC_ESTADO','VC_ASUNTO','CH_ID_USUARIO_CREACION',
        'CH_ID_USUARIO_UPDATE','DT_FECHA_UPDATE'
    ];


}
