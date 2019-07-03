<?php

namespace App\Exports;

use App\Models\informeModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class informeExport implements FromQuery,WithHeadings
{
    use Exportable;

    public function __construct(int $dato)
    {
        $this->dato = $dato;
    }

    public function headings(): array
    {
        return [
            'ID_INFORME','CASILLA','REMITENTE','FECHA-HORA','COD_CLIENTE','ESTADO','ASUNTO','EDITADOS',
            'PRODUCTO','NRO_TRAMITE','USUARIO CREACION',
            'USUARIO ACTUALIZACION','FECHA CREACION','FECHA ACTUALIZACION'

        ];
    }

    public function query()
    {
        return informeModel::query()->whereMonth('DT_FECHA_CREACION',$this->dato);
    }
}
