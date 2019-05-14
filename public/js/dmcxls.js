
//Carga de Usuarios
var btnAgregar = document.getElementById('btnAgregar'),
    btnUpdate = document.getElementById('btnUpdate');
    btnCargaTblMes = document.getElementById('btnCargaMes');
formulario = document.getElementById('formulario'),
    formCargaMes = document.getElementById('formularioCargaMes'),
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
btnCargaTblMes.addEventListener('onclick',function(){
    informesMesUsuario();
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
    cargaAsunto = formulario.asunto.value.trim();

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
        document.getElementById('nroregistros').value = datos.informes.length;
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
        //    console.log(datos);
        if (datos.idPerfil == 1) {
            tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th><th scope="col">ACCIONES</th></tr></thead>';
            for (var i = (page - 1) * 10; i < (page * 10); i++) {
                // for (var i = 0; i < datos.informes.length; i++) {
                var fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");

                var fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getUTCFullYear() + "</td>");

                // fila.innerHTML += ("<td>" + datos[i].DT_FECHA_CREACION + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_BANDEJA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_REMITENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ASUNTO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].DT_FECHA_HORA + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_COD_CLIENTE + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].VC_ESTADO + "</td>");
                fila.innerHTML += ("<td>" + datos.informes[i].CH_ID_USUARIO_CREACION + "</td>");
                fila.innerHTML += ("<td><input type='button' value='U' onclick='EditarFila(this)'><input type='button' value='D' onclick='EliminarFila(this)'>");
                tabla.appendChild(fila);
                //}
            }

            // var inputUserConsulta = document.getElementById('inUsuario');
            // if( inputUserConsulta.value.trim().innerHTML =! ""){
            //     tablaUsuarios.innerHTML = '<thead><tr><th scope="col">USUARIO</th><th scope="col">CANTIDAD</th></tr></thead>';
            // var arrayInformes = datos.informes;
            // function filter(arr, criteria) {
            //     return arr.filter(function(obj) {
            //       return Object.keys(criteria).every(function(c) {
            //         return obj[c] == criteria[c];
            //       });
            //     });
            //   }
            // // for (var i = 0; i < datos.idUsuarios.length; i++) {
                 
            //     var newArray =filter(arrayInformes,{CH_ID_USUARIO_CREACION: "'"+inputUserConsulta.value+"'" })
               
            //     var filaUsuarios = document.createElement('tr');
            //     filaUsuarios.innerHTML += ("<td>" + inputUserConsulta.value.trim()+ "</td>");
            //     filaUsuarios.innerHTML += ("<td>" + newArray.length + "</td>");
            //     tablaUsuarios.appendChild(filaUsuarios);
            //     console.log(newArray);
            //}
            //}
            


        } else {
            tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th></thead>';
            for (var i = (page - 1) * 10; i < (page * 10); i++) {
                var fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");

                var fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getUTCFullYear() + "</td>");

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

        // var array_data = datos.informes;
        // var new_datos = array_data.filter(function (array_data) {
        //     // var mes_data = new Date(array.DT_FECHA_CREACION);
        //     return array_data.CH_ID_USUARIO_CREACION == 'ECSE';
        // });
        // // var new_datos = array_data.filter((array_data) => array_data.CH_ID_USUARIO_CREACION == 'ESALINAS');
        // console.log(new_datos);
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

// function cargarTablaMes(page) {
//     var peticionMes = new XMLHttpRequest();
//     peticionMes.open('post', '/listaInformesMes');
//     loader.style.display = 'block';

//     valorMes = formCargaMes.pickMes.value.trim();
//     var paramCargaListaMes = 'mesSeleccionado=' + valorMes;
//     peticionMes.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     peticionMes.onload = function () {
//         var datosMes = JSON.parse(peticionMes.responseText);
//         var nroPaginasMes = Math.ceil((datosMes.informesMensuales.length) / 10);

//         //validando pagina 
//         if (page < 1) page = 1;
//         if (page > nroPaginasMes) page = nroPaginasMes;
//         //Paginacion javascript
//         var btnAnt = document.getElementById('btnAnterior');
//         var btnSig = document.getElementById('btnSiguiente');
//         spanPage.innerHTML = page;
//         if (page == 1) {
//             btnAnt.style.visibility = "hidden";
//         } else {
//             btnAnt.style.visibility = "visible"
//         }
//         if (page == nroPaginasMes) {
//             btnSig.style.visibility = "hidden";
//         } else {
//             btnSig.style.visibility = "visible";
//         }

//         if (datos.idPerfil == 1) {
//             document.getElementById('liExcels').style.display = "block";
//             document.getElementById('liRegistro').style.display = "block";
//             tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th><th scope="col">ACCIONES</th></thead>';

//             for (var i = (page - 1) * 10; i < (page * 10); i++) {
//                 // for (var i = 0; i < datos.informes.length; i++) {
//                 var fila = document.createElement('tr');
//                 fila.innerHTML += ("<td  style='display:none;'>" + datosMes.informesMensuales[i].IN_ID_INFORME + "</td>");

//                 var fecha = new Date(datosMes.informesMensuales[i].DT_FECHA_CREACION);
//                 fila.innerHTML += ("<td>" + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getUTCFullYear() + "</td>");

//                 // fila.innerHTML += ("<td>" + datos[i].DT_FECHA_CREACION + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].VC_BANDEJA + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].VC_REMITENTE + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].VC_ASUNTO + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].DT_FECHA_HORA + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].CH_COD_CLIENTE + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].VC_ESTADO + "</td>");
//                 fila.innerHTML += ("<td>" + datosMes.informesMensuales[i].CH_ID_USUARIO_CREACION + "</td>");
//                 fila.innerHTML += ("<td><input type='button' value='U' onclick='EditarFila(this)'><input type='button' value='D' onclick='EliminarFila(this)'>");
//                 tabla.appendChild(fila);
//                 //}
//             }


//         }

//     }
//     peticionMes.onreadystatechange = function () {
//         if (peticionMes.readyState == 4 && peticionMes.status == 200) {
//             loader.style.display = "none";
//         }
//     }

//     peticionMes.send(paramCargaListaMes);

// }

function EditarFila(e) {
    var idInforme = e.parentNode.parentElement.cells[0].innerHTML,
        //fechayhora
        bandeja_up = e.parentNode.parentElement.cells[2].innerHTML,
        remitente_up = e.parentNode.parentElement.cells[3].innerHTML,
        asunto_up = e.parentNode.parentElement.cells[4].innerHTML,
        cod_cliente_up = e.parentNode.parentElement.cells[6].innerHTML,
        estado_up = e.parentNode.parentElement.cells[7].innerHTML;

    formulario.inputinforme.value = idInforme;
    formulario.bandeja.value = bandeja_up;
    formulario.remitente.value = remitente_up;
    formulario.asunto.value = asunto_up;
    // formulario.fecha.value = cargaFecha;
    // formulario.hora.value = cargaHora;
    formulario.cod_cliente.value = cod_cliente_up;
    formulario.estado.value = estado_up;

    document.getElementById('btnAgregar').style.display = "none";
    document.getElementById('btnUpdate').style.display = "block";
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
    cargaAsunto = formulario.asunto.value.trim();

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
