<?php

namespace App\Exports;

use App\Models\informeModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class informeExport implements FromCollection,FromQuery,WithHeadings
{
    use Exportable;

    public function __construct(int $dato)
    {
        $this->dato = $dato;
    }

    public function headings(): array
    {
        return [
            'ID_INFORME','CASILLA','REMITENTE','FECHA-HORA','COD_CLIENTE','ESTADO','USUARIO CREACION',
            'USUARIO ACTUALIZADO','FECHA CREACION','FECHA ACTUALIZACION'

        ];
    }

    public function query()
    {
        return informeModel::query()->whereMonth('DT_FECHA_CREACION',$this->dato);
    }
    public function collection()
    {
        return informeModel::all();
    }

}
