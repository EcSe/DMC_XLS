<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
})->name('inicioSesion');

Route::post('/informes',array(
    'as' => 'informes',
    'uses'=> 'usuarioController@LoginUser'
));
Route::post('/logout',array(
    'as'=> 'logout',
    'uses' => 'usuarioController@Logout'
));

Route::get('/listaInformes','informeController@Listar');
Route::post('/AgregarInforme','informeController@Agregar');
Route::post('/EditarInforme','informeController@Actualizar');
Route::post('/eliminar','informeController@Eliminar');
Route::post('/agregarUsuario', 'usuarioController@AgregarUsuario');
Route::get('/informesMes','informeController@InformesUsuarioMes');

Route::post('/descarga',array(
    'as' => 'descargaExcel',
    'uses' => 'informeController@exportInforme'
));