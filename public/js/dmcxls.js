
//Carga de Usuarios
var btnAgregar = document.getElementById('btnAgregar'),
    btnUpdate = document.getElementById('btnUpdate');
    btnCargaTblMes = document.getElementById('btnCargaMes');
formulario = document.getElementById('formulario'),
    tabla = document.getElementById('tabla'),
    tablaUsuarios = document.getElementById('tablaConteoUsuarios');
loader = document.getElementById('loader'),
    frmUsuario = document.getElementById('formUsuario');

var cargaBandeja, cargaRemitente, cargaFecha, cargaHora,
    cargaCliente, cargaEstado, cargaAsunto;
var paginaActual = 1;


formulario.addEventListener('submit', function (e) {
    AgregarInforme(e)
});

function AgregarInforme(e) {
    e.preventDefault();
    var peticion = new XMLHttpRequest();
    peticion.open('POST', '/AgregarInforme');
    loader.style.display = 'block';

    cargaBandeja = formulario.bandeja.value.trim();
    cargaRemitente = formulario.remitente.value.trim();
    cargaFecha = formulario.fecha.value.trim();
    cargaHora = formulario.hora.value.trim();
    cargaCliente = formulario.cod_cliente.value.trim();
    cargaEstado = formulario.estado.value.trim();
    cargaAsunto = encodeURIComponent(formulario.asunto.value.trim());

    var parametros = 'bandeja=' + cargaBandeja + '&remitente=' + cargaRemitente + '&fecha=' + cargaFecha +
        '&hora=' + cargaHora + '&cod_cliente=' + cargaCliente + '&estado=' + cargaEstado + '&asunto=' + cargaAsunto;
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    peticion.onload = function () {
        cargarTabla(1);
        formulario.remitente.value = "";
        formulario.fecha.value = "";
        formulario.hora.value = "";
        formulario.cod_cliente.value = "";
        formulario.bandeja.selectedIndex = 0;
        formulario.estado.selectedIndex = 0;
        formulario.asunto.value = "";
    }

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.style.display = "none";
        }
    }

    peticion.send(parametros);

};

//Paginacion 
function prevPage() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarTabla(paginaActual);
    }
}

function nextPage() {
    if (paginaActual < 300) {
        paginaActual++;
        cargarTabla(paginaActual);
    }
}

function cargarTabla(page) {
    var peticion = new XMLHttpRequest();
    peticion.open('GET', '/listaInformes');
    loader.style.display = 'block';

    peticion.onload = function () {
        var datos = JSON.parse(peticion.responseText);
        //document.getElementById('nroregistros').value = datos.informes.length;
        //Paginacion en Javascript
        var nroPaginas = Math.ceil((datos.informes.length) / 10);

        //validando pagina 
        if (page < 1) page = 1;
        if (page > nroPaginas) page = nroPaginas;

        //Paginacion javascript
        var btnAnt = document.getElementById('btnAnterior');
        var btnSig = document.getElementById('btnSiguiente');
        spanPage.innerHTML = page;
        if (page == 1) {
            btnAnt.style.visibility = "hidden";
        } else {
            btnAnt.style.visibility = "visible"
        }

        if (page == nroPaginas) {
            btnSig.style.visibility = "hidden";
        } else {
            btnSig.style.visibility = "visible";
        }
        if (datos.idPerfil == 1) {
            document.getElementById('nroregistros').value = datos.informes.length;
            tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th><th scope="col">ACCIONES</th></tr></thead>';
            for (var i = (page - 1) * 100; i < (page * 100); i++) {
                var fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");

                var fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + (fecha.getMonth()+1) + '/' + fecha.getUTCFullYear() + "</td>");

                fila.innerHTML += ("<td>" + datos.informes[i].VC_BANDEJA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_REMITENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ASUNTO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].DT_FECHA_HORA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_COD_CLIENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ESTADO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_ID_USUARIO_CREACION + "</td>");
                fila.innerHTML += ("<td><input type='button' value='U' onclick='EditarFila(this)'><input type='button' value='D' onclick='EliminarFila(this)'>");
                tabla.appendChild(fila);
            }

            


        } else {
            document.getElementById('nroregistros').value = datos.informes.length+' totales y ' + datos.cantInformesDia +' hoy';
            tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th></thead>';
            for (var i = (page - 1) * 100; i < (page * 100); i++) {
                var fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");

                var fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + (fecha.getMonth()+1) + '/' + fecha.getUTCFullYear() + "</td>");

                // fila.innerHTML += ("<td>" + datos[i].DT_FECHA_CREACION + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_BANDEJA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_REMITENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ASUNTO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].DT_FECHA_HORA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_COD_CLIENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ESTADO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_ID_USUARIO_CREACION + "</td>");
                tabla.appendChild(fila);
            }
        }
    }
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.style.display = "none";

        }
    }
    peticion.send();
};

function informesMesUsuario(){
    var tblInformesUsuario = document.getElementById('tblCantidadxUser');
    var peticionMes = new XMLHttpRequest();
    peticionMes.open('GET','/informesMes');

    peticionMes.onload = function (){
        var datosInformeMes = JSON.parse(peticionMes.responseText);
        tblInformesUsuario.innerHTML = '<thead><tr><th scope="col">ID USUARIO</th><th scope="col">CANTIDAD</th></tr></thead>';
        for (var i = 0 ; i < datosInformeMes.length; i++){
            var filatblMes = document.createElement('tr');
            filatblMes.innerHTML += ("<td>" + datosInformeMes[i].ID_USUARIO + "</td>" );
            filatblMes.innerHTML += ("<td>" + datosInformeMes[i].CANTIDAD + "</td>");
            tblInformesUsuario.appendChild(filatblMes);
        }
        peticionMes.onreadystatechange = function(){
            if(peticionMes.readyState == 4 && peticionMes.status == 200){

            }
        }
    }
    peticionMes.send();

}

function EditarFila(e) {
    var idInforme = e.parentNode.parentElement.cells[0].innerHTML,
        bandeja_up = e.parentNode.parentElement.cells[2].innerHTML,
        remitente_up = e.parentNode.parentElement.cells[3].innerHTML,
        asunto_up = e.parentNode.parentElement.cells[4].innerHTML,
        fechaHora_up = e.parentNode.parentElement.cells[5].innerHTML,
        cod_cliente_up = e.parentNode.parentElement.cells[6].innerHTML,
        estado_up = e.parentNode.parentElement.cells[7].innerHTML;

    //Obteniendo Fechas y Horas para actualizacion
    var fechaUp = new Date(fechaHora_up),
        dia = fechaUp.getDate(),
        mes = fechaUp.getMonth() + 1,
        Year = fechaUp.getFullYear(),
        hora = fechaUp.getHours(),
        minutos = fechaUp.getMinutes();

        dia<10 ? dia = ("0" + dia).slice(-2) : dia;
        mes<10 ? mes = ('0' + mes).slice(-2) :mes;
        hora<10 ? hora = ('0' + hora).slice(-2) : hora;
        minutos<10 ? minutos = ('0' + minutos).slice(-2) : minutos;

        fechaEdit = Year+'-'+mes+'-'+dia;
        horaEdit = hora + ':' + minutos; 

    formulario.inputinforme.value = idInforme;
    formulario.bandeja.value = bandeja_up;
    formulario.remitente.value = remitente_up;
    formulario.asunto.value = (asunto_up).replace(/&amp;/g, "&");
    formulario.fecha.value = fechaEdit;
    formulario.hora.value = horaEdit;
    formulario.cod_cliente.value = cod_cliente_up;
    formulario.estado.value = estado_up;

    document.getElementById('btnAgregar').style.display = "none";
    document.getElementById('btnUpdate').style.display = "block";
    document.getElementById('btnCancelar').style.display = 'block';
    document.getElementById('cod_cliente').disabled = true;
}

function EditarInforme() {
    // e.preventDefault();

    //Agregando los nuevos valores
    var peticion = new XMLHttpRequest();
    peticion.open('POST', '/EditarInforme');

    idInforme = formulario.inputinforme.value.trim();
    cargaBandeja = formulario.bandeja.value.trim();
    cargaRemitente = formulario.remitente.value.trim();
    cargaFecha = formulario.fecha.value.trim();
    cargaHora = formulario.hora.value.trim();
    cargaCliente = formulario.cod_cliente.value.trim();
    cargaEstado = formulario.estado.value.trim();
    cargaAsunto = encodeURIComponent(formulario.asunto.value.trim());

    var parametros = 'idInforme=' + idInforme + '&bandeja=' + cargaBandeja + '&remitente=' + cargaRemitente + '&fecha=' + cargaFecha +
        '&hora=' + cargaHora + '&cod_cliente=' + cargaCliente + '&estado=' + cargaEstado + '&asunto=' + cargaAsunto;
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    peticion.onload = function () {
        cargarTabla(1);
        formulario.remitente.value = "";
        formulario.fecha.value = "";
        formulario.hora.value = "";
        formulario.cod_cliente.value = "";
        formulario.bandeja.selectedIndex = 0;
        formulario.estado.selectedIndex = 0;
        formulario.asunto.value = "";
    }
    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.style.display = "none";
            document.getElementById('btnAgregar').style.display = "block";
            document.getElementById('btnUpdate').style.display = "none";
            document.getElementById('btnCancelar').style.display = 'none';
            document.getElementById('cod_cliente').disabled = false;

        }
    }
    peticion.send(parametros);

}

function EliminarFila(r) {
    var question = confirm('Esta seguro que desea eliminar esta flila?');
    if (question) {
        var i = r.parentNode.parentNode.rowIndex;
        var id = r.parentNode.parentElement.cells[0].innerHTML;
        document.getElementById("tabla").deleteRow(i);

        var peticion = new XMLHttpRequest();
        peticion.open('POST', '/eliminar');
        var parametos = 'idInforme=' + id;
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        peticion.onload = function () {
            cargarTabla(1);
        }
        peticion.onreadystatechange = function () {
            if (peticion.readyState == 4 && peticion.status == 200) {
                loader.style.display = "none";
            }
        }
        peticion.send(parametos);
    }
}

frmUsuario.addEventListener('submit', function (e) {
    AgregarUsuario(e);
});

function AgregarUsuario(e) {
    e.preventDefault();
    var peticion = new XMLHttpRequest();
    peticion.open('POST', '/agregarUsuario');

    cargaIdUsuario = frmUsuario.idUsuario.value.trim();
    cargaNombre = frmUsuario.nombre.value.trim();
    cargaApellidos = frmUsuario.apellidos.value.trim();
    cargaIdPerfil = frmUsuario.idPerfil.value.trim();
    cargaPassword = frmUsuario.password.value.trim();
    cargaEmail = frmUsuario.email.value.trim();

    var paramUser = 'idUsuario=' + cargaIdUsuario + '&nombre=' + cargaNombre + '&apellidos=' + cargaApellidos +
        '&idPerfil=' + cargaIdPerfil + '&password=' + cargaPassword + '&email=' + cargaEmail;

    peticion.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    peticion.onload = function () {
        frmUsuario.idUsuario.value = "";
        frmUsuario.nombre.value = "";
        frmUsuario.apellidos.value = "";
        frmUsuario.idPerfil.value = "";
        frmUsuario.password.value = "";
        frmUsuario.email.value = "";
    }

    peticion.onreadystatechange = function () {
        if (peticion.readyState == 4 && peticion.status == 200) {
        }
    }
    peticion.send(paramUser);
}

//Buscar en la tabla
function BuscarCliente() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('buscarCliente');
    filter = input.value.toUpperCase();
    table = document.getElementById('tabla');
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[6];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function cancelUpdate(){
    formulario.remitente.value = "";
    formulario.fecha.value = "";
    formulario.hora.value = "";
    formulario.cod_cliente.value = "";
    formulario.bandeja.selectedIndex = 0;
    formulario.estado.selectedIndex = 0;
    formulario.asunto.value = "";
    document.getElementById('btnAgregar').style.display = "block";
    document.getElementById('btnUpdate').style.display = "none";
    document.getElementById('btnCancelar').style.display = 'none';
    document.getElementById('cod_cliente').disabled = false;
}