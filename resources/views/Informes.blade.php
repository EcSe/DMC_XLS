<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/dmcxls.css">
    <title>Informes</title>
</head>

<body onload=cargarTabla(1)>
    <div id="navbar-example">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabCarga" role="tab">INFORMES</a>
            </li>
            <li class="nav-item" name="liExcels" id="liExcels" style="display:none">
                <a class="nav-link" data-toggle="tab" href="#tabDescarga" role="tab">EXCELS</a>
            </li>
            <li class="nav-item" name="liRegistro" id="liRegistro" style="display:none">
                <a class="nav-link" data-toggle="tab" href="#tabRegistro">REGISTRO USUARIOS</a>
            </li>
        </ul>
        <div>
            <form action="{{ route('logout') }}" method="POST">
                <input type="submit" value="Salir" class="btnSalida btn btn-danger">
            </form>
        </div>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tabCarga" name="tabCarga" role="tabpanel">
                <div>
                    <h1>Informes </h1>
                </div>
                <div class="container-fluid">
                    <form action="" method="POST" id="formulario">
                        <div class="row">
                            <input type="hidden" id="inputinforme" name="inputinforme">
                            <div class="col-12 col-md-4 form-group">
                                <div class="col-6 col-md-2" style="display:inline;">
                                    <select name="bandeja" id="bandeja">
                                        <option value="" selected disabled>--Elegir Bandeja--</option>
                                        <option value="CNT">CNT</option>
                                        <option value="EMISION RAPIDA">EMISION RAPIDA</option>
                                        <option value="EXPRESS">EXPRESS</option>
                                        <option value="FFVV">FFVV</option>
                                        <option value="FRONTING">FRONTING</option>
                                        <option value="JLT">JLT</option>
                                        <option value="PROVINCIAS">PROVINCIAS</option>
                                        <option value="REPROCESOS">REPROCESOS</option>
                                    </select>
                                </div>
                                <div class="col-6 col-md-2" style="display:inline;">
                                    <select name="estado" id="estado">
                                        <option value="" selected disabled>--Elegir Estado--</option>
                                        <option value="ACTUALIZACION">ACTUALIZACION</option>
                                        <option value="NUEVO INGRESO">NUEVO INGRESO</option>
                                        <option value="DEVUELTO">DEVUELTO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input type="email" id="remitente" name="remitente" placeholder="Ingrese Remitente"
                                    required>
                            </div>
                            <div class="col-12 col-md-4 form-group">
                                <div class="col-6" style="display:inline">
                                    <input type="date" id="fecha" name="fecha" required>
                                </div>
                                <div class="col-6" style="display:inline">
                                    <input type="time" name="hora" id="hora" required>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group container">
                            <div class="col-md-4">
                                <input type="text" id="cod_cliente" name="cod_cliente" placeholder="Ingrese Cod Cliente"
                                    required>
                            </div>
                            <div class="col-md-8">
                                <textarea name="asunto" cols="40" rows="3" style="resize:none"
                                    placeholder="  Ingresar asunto" id="asunto"></textarea>
                            </div>
                        </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6">
                                    <input class="inputbusqueda" type="text" placeholder="Buscar por Codigo Cliente..."
                                        id="buscarCliente" name="buscarCliente" onkeyup="BuscarCliente()">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <button type="submit" id="btnAgregar" class="btn btn-success">Agregar</button>
                            </div>
                            <div class="col-md-4">
                                <button type="button" id="btnUpdate" onclick="EditarInforme()" style="display:none"
                                    class="btn btn-success">Actualizar</button>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" style="float: right;margin-right: 50px;">
                                    <label>Nro Registros</label>
                                    <input type="text" id="nroregistros" name="nroregistros" readonly>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="container-fluid">
                        <form action="" method="" id="formularioCargaMes">
                            <!-- <div class="row">
                                <div class="col-12 col-md-6 form-group">
                                    <div class="col-6 col-md-3" style="display:inline;float: left;">
                                        <select name="pickMes" id="pickMes">
                                            <option value="0" selected disabled>--Elegir Mes--</option>
                                            <option value="01">Enero</option>
                                            <option value="02">Febrero</option>
                                            <option value="03">Marzo</option>
                                            <option value="04">Abril</option>
                                            <option value="05">Mayo</option>
                                            <option value="06">Junio</option>
                                            <option value="07">Julio</option>
                                            <option value="08">Agosto</option>
                                            <option value="09">Setiembre</option>
                                            <option value="10">Octubre</option>
                                            <option value="11">Noviembre</option>
                                            <option value="12">Diciembre</option>
                                        </select>
                                    </div>
                                    <div class="col-6 col-md-3" style="display:inline;float:right;">
                                        <input type="submit" value="Cargar">
                                    </div>
                                </div>
                            </div> -->
                        </form>
                    </div>
                    <div class="row">
                        <div class="col-md-12" id="listarTabla">
                            <table id="tabla">
                            </table>
                        </div>
                        <div class="sk-folding-cube" id="loader">
                            <div class="sk-cube1 sk-cube"></div>
                            <div class="sk-cube2 sk-cube"></div>
                            <div class="sk-cube4 sk-cube"></div>
                            <div class="sk-cube3 sk-cube"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 divPrev">
                            <a href="javascript:prevPage()" id="btnAnterior" class="pag previus">Anterior</a>
                        </div>
                        <div class="col-md-4 divNroPagina">
                            Pagina: <span id="spanPage"></span>
                        </div>
                        <div class="col-md-4 divNext">
                            <a href="javascript:nextPage()" id="btnSiguiente" class="pag next">Siguiente</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="tabDescarga" name="tabDescarga" role="tabpanel">
                <h1>Excels</h1>
                <div class="container-fluid">
                    <form action="{{ route('descargaExcel') }}" method="POST" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-4">
                                <p>Seleccionar Mes</p>
                            </div>
                            <div class="col-md-4">
                                <select name="mesInforme" id="mesInforme">
                                    <option value="01">Enero</option>
                                    <option value="02">Febrero</option>
                                    <option value="03">Marzo</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Mayo</option>
                                    <option value="06">Junio</option>
                                    <option value="07">Julio</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit">Descargar Excel</button>
                    </form>
                </div>
                <!-- <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <input type="text" placeholder="Usuario Consulta" name="inUsuario" id="inUsuario">
                        </div>
                        <div>
                            <button id="btnConsultar" onclick="cargarTabla(1)">Consultar</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" id="listarTabla">
                            <table id="tablaConteoUsuarios">
                            </table>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="tab-pane fade" id="tabRegistro" name="tabRegistro" role="tabpanel">
                <h1>Registro Usuarios</h1>
                <form id="formUsuario" action="" method="">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 form-group" style="display:inline-flex">
                                <div class="col col-md-4">
                                    <input type="text" name="idUsuario" id="idUsuario" placeholder="Ingresar Usuario ID"
                                        style="display: inline">
                                </div>
                                <div class="col col-md-4">
                                    <input type="password" name="password" id="password"
                                        placeholder="Ingrese Contraseña">
                                </div>
                                <div class="col col-md-4 ">
                                    <input type="text" name="nombre" id="nombre" placeholder="Ingresar Nombre"
                                        style="display: inline">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group" style="display:inline-flex">
                                <div class="col-md-4">
                                    <input type="text" name="apellidos" id="apellidos" placeholder="Ingresar Apellidos">
                                </div>
                                <div class="col-md-4">
                                    <select name="idPerfil" id="idPerfil" class="custom-select">
                                        <option value="" selected disabled>--Elegir Perfil--</option>
                                        <option value="1">Administrador</option>
                                        <option value="2">Usuario</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="email" name="email" id="email" placeholder="Ingrese Email">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group" >
                                <input type="submit" class="btn btn-success" value="Agregar" style="display: block;margin:auto">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <script src="js/app.js" charset="utf-8"></script>
    <script src="js/dmcxls.js" type="text/javascript"></script>
</body>

</html>