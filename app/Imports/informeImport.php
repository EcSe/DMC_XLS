<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

use App\Models\informeModel;
use Maatwebsite\Excel\Concerns\ToModel;

class informeImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        //
    }
    
    public function model(array $row)
    {
        return new informeModel([
            'DT_FECHA_CREACION' => $row['DIA'],
            'VC_BANDEJA' => $row['CASILLA'],
            'VC_REMITENTE' => $row['REMITENTE'],
            'DT_FECHA_HORA' => $row['FECHA-HORA'],
            'CH_COD_CLIENTE' => $row['COD.ACTUALIZADOS'],
            'CH_COD_CLIENTE' => $row['COD.NUEVOS'],
            'CH_COD_CLIENTE' => $row['WORKFLOW'],
            'VC_ESTADO' => $row[''],
            'CH_ID_USUARIO_CREACION' => $row[''],
            'CH_ID_USUARIO_UPDATE' => $row[''],
            'DT_FECHA_CREACION' => $row[''],
            'DT_FECHA_UPDATE' => $row['']
        ]);
    }
}
