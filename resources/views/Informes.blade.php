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

<body onload="cargarTabla(1)">
    @php $usuarioActual = session('usu'); @endphp
    <div id="navbar-example">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabCarga" role="tab">INFORMES</a>
            </li>
            @if($usuarioActual->IN_ID_PERFIL == 1)
            <li class="nav-item" name="liExcels" id="liExcels">
                <a class="nav-link" data-toggle="tab" href="#tabDescarga" role="tab">EXCELS</a>
            </li>
            <li class="nav-item" name="liRegistro" id="liRegistro">
                <a class="nav-link" data-toggle="tab" href="#tabRegistro">REGISTRO USUARIOS</a>
            </li>
            @endif
        </ul>
        <div>
            <form action="{{ route('logout') }}" method="POST">
                <input type="submit" value="Salir" class="btnSalida btn btn-danger">
            </form>
        </div>
        <div class="tab-content">
            <div class="tab-pane fade show active" id="tabCarga" name="tabCarga" role="tabpanel">
                <div>
                    <h1>INFORMES </h1>
                </div>
                <div class="container-fluid">
                    <form action="" method="POST" id="formulario">
                        <div class="divMensaje" id="divMensaje">
                            <p></p>
                        </div>
                        <input type="hidden" id="inputinforme" name="inputinforme">
                        <div class="row">
                            <div class="col-md-12 form-group d-flex justify-content-between">
                                <div class="col-md-4">
                                    <select name="bandeja" id="bandeja" class="custom-select" required>
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
                                <div class="col-md-4">
                                    <select name="estado" id="estado" class="custom-select" onchange="chkOpciones()" required>
                                        <option value="" selected disabled>--Elegir Estado--</option>
                                        <option value="ACTUALIZACION">ACTUALIZACION</option>
                                        <option value="NUEVO INGRESO">NUEVO INGRESO</option>
                                        <option value="DEVUELTO">DEVUELTO</option>
                                        <option value="VERIFICADO">VERIFICADO</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <input type="email" id="remitente" name="remitente" placeholder="Ingrese Remitente" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group d-flex justify-content-between">
                                <div class="col col-md-4">
                                    <input type="text" id="cod_cliente" name="cod_cliente" placeholder="Ingrese Cod Cliente" maxlength="14" required>
                                </div>
                                <div class="col col-md-4">
                                    <span style="float:left">Escoger Fecha &nbsp;: </span>
                                    <input type="date" id="fecha" name="fecha" required style="float: right;" required>
                                </div>
                                <div class="col col-md-4">
                                    <span style="float:left">Escoger Hora&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <input type="time" name="hora" id="hora" required>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="chkControles" style="display: none;">
                            <div class="col-md-12 form-group" style="display: inline-flex">
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkNombres" value="Nombres||">
                                    <label for="chkNombres">Nombres</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkDirecciones" value="Direcciones||">
                                    <label for="chkDirecciones">Direcciones</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkMails" value="Mails||">
                                    <label for="chkMails">Mails</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkTelefonos" value="Telefonos||">
                                    <label for="chkTelefonos">Telefonos</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkFechaNac" value="FechaNac||">
                                    <label for="chkFechaNac">Fecha Nacimiento</label>
                                </div>
                            </div>
                        </div>
                        <div class="row" id="chkControles2" style="display: none;">
                            <div class="col-md-12 form-group" style="display: inline-flex">
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkTipoDoc" value="TipoDocumento||">
                                    <label for="chkTipoDoc">Tipo Documento</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkAgenciamiento" value="Agenciamiento||">
                                    <label for="chkAgenciamiento">Agenciamiento</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkSexo" value="Sexo||">
                                    <label for="chkSexo">Sexo</label>
                                </div>
                                <div class="col col-md-2">
                                    <input type="checkbox" id="chkGenero" value="Genero||">
                                    <label for="chkGenero">Genero</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group d-flex justify-content-between">
                                <div class="col col-md-4">
                                    <textarea name="asunto" cols="40" rows="3" style="resize:none;" placeholder="  Ingresar asunto" id="asunto" required></textarea>
                                </div>
                                <div class="col col-md-4">
                                    <input type="text" name="producto" id="producto" placeholder="Ingresar Producto" maxlength="4" required>
                                </div>
                                <div class="col-md-4">
                                    <input type="text" name="nroTramite" id="nroTramite" placeholder="Nro Tramite" maxlength="10" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group d-flex justify-content-between">
                                <div class="col col-md-6">
                                    <input class="inputbusqueda" type="text" placeholder="Buscar por Codigo Cliente..." id="buscarCliente" name="buscarCliente" onkeyup="BuscarCliente()">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 form-group" style="display: inline-flex;">
                                <div class="col-md-4">
                                    <button type="submit" id="btnAgregar" class="btn btn-success">Agregar</button>
                                </div>
                                <div class="col-md-4" style="display: inline-flex;">
                                    <button type="button" id="btnUpdate" onclick="EditarInforme()" style="display:none; float:left;" class="btn btn-success">Actualizar</button>
                                    <button type="button" id="btnCancelar" onclick="cancelUpdate()" style="display:none;float: right;" class="btn btn-danger">Cancelar</button>
                                </div>
                                <div class="col-md-4">
                                    <label>Nro Registros</label>
                                    <input type="text" id="nroregistros" name="nroregistros" readonly>
                                </div>
                            </div>
                        </div>
                    </form>
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
                <h1>EXCELS</h1>
                <div class="container-fluid">
                    <form action="{{ route('descargaExcel') }}" method="POST" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-md-12 form-group" style="display: inline-flex;">
                                <div class="col-md-4">
                                    <select name="mesInforme" id="mesInforme" class="custom-select">
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
                                <div class="col-md-4">
                                    <button type="submit" class="btn btn-primary">Descargar Excel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <input type="button" name="btnCargaMes" id="btnCargaMes" onclick="informesMesUsuario(this)" value="Cargar Tabla" style="display: block;margin:auto" class="btn btn-success">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <table id="tblCantidadxUser">
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            <table id="tblCantidadxEstado"></table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="tabRegistro" name="tabRegistro" role="tabpanel">
                <h1>REGISTRO USUARIOS</h1>
                <form id="formUsuario" action="" method="">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12 form-group" style="display:inline-flex">
                                <div class="col col-md-4">
                                    <input type="text" name="idUsuario" id="idUsuario" placeholder="Ingresar Usuario ID" style="display: inline">
                                </div>
                                <div class="col col-md-4">
                                    <input type="password" name="password" id="password" placeholder="Ingrese Contraseña">
                                </div>
                                <div class="col col-md-4 ">
                                    <input type="text" name="nombre" id="nombre" placeholder="Ingresar Nombre" style="display: inline">
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
                            <div class="col-md-12 form-group">
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