<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class perfilModel extends Model
{
    protected $table = 'PERFIL';
    protected $primaryKey = 'IN_ID_PERFIL';
    public $timestamps = false;
    protected $fillable =  [
        'VC_DESCRIPCION'
    ];

    public function Usuario()
    {
        return $this->hasMany('App\Models\usuarioModel');
    }
}
