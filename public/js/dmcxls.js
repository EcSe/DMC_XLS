//Carga de Usuarios
let btnAgregar = document.getElementById('btnAgregar'),
    btnUpdate = document.getElementById('btnUpdate'),
    btnCargaTblMes = document.getElementById('btnCargaMes'),
    formulario = document.getElementById('formulario'),
    tabla = document.getElementById('tabla'),
    loader = document.getElementById('loader'),
    frmUsuario = document.getElementById('formUsuario'),
    divControles = document.getElementById('chkControles'),
    divControles2 = document.getElementById('chkControles2');

let cargaBandeja, cargaRemitente, cargaFecha, cargaHora,
    cargaCliente, cargaEstado, cargaAsunto;
let paginaActual = 1;


formulario.addEventListener('submit', (e) => {
    AgregarInforme(e)
});

let AgregarInforme = (e) => {
    e.preventDefault();
    let peticion = new XMLHttpRequest();
    peticion.open('POST', '/AgregarInforme');
    loader.style.display = 'block';

    //Comprobando checkbox
    formulario.chkNombres.checked ? chkNombresVal = formulario.chkNombres.value : chkNombresVal = '';
    formulario.chkDirecciones.checked ? chkDireccionesVal = formulario.chkDirecciones.value : chkDireccionesVal = '';
    formulario.chkMails.checked ? chkMailsVal = formulario.chkMails.value : chkMailsVal = '';
    formulario.chkTelefonos.checked ? chkTelefonosVal = formulario.chkTelefonos.value : chkTelefonosVal = '';
    formulario.chkFechaNac.checked ? chkFechaNacVal = formulario.chkFechaNac.value : chkFechaNacVal = '';

    //Controles2
    formulario.chkTipoDoc.checked ? chkTipoDocVal = formulario.chkTipoDoc.value : chkTipoDocVal = '';
    formulario.chkAgenciamiento.checked ? chkAgenciamientoVal = formulario.chkAgenciamiento.value : chkAgenciamientoVal = '';
    formulario.chkSexo.checked ? chkSexoVal = formulario.chkSexo.value : chkSexoVal = '';
    formulario.chkGenero.checked ? chkGeneroVal = formulario.chkGenero.value : chkGeneroVal = '';

    cargaBandeja = formulario.bandeja.value.trim();
    cargaRemitente = formulario.remitente.value.trim();
    cargaFecha = formulario.fecha.value.trim();
    cargaHora = formulario.hora.value.trim();
    cargaCliente = formulario.cod_cliente.value.trim();
    cargaEstado = formulario.estado.value.trim();
    cargaAsunto = encodeURIComponent(formulario.asunto.value.trim());
    cargaEditados = chkNombresVal.concat(chkDireccionesVal, chkMailsVal, chkTelefonosVal, chkFechaNacVal,
        chkTipoDocVal, chkAgenciamientoVal, chkSexoVal, chkGeneroVal);

    let parametros = 'bandeja=' + cargaBandeja + '&remitente=' + cargaRemitente + '&fecha=' + cargaFecha +
        '&hora=' + cargaHora + '&cod_cliente=' + cargaCliente + '&estado=' + cargaEstado + '&asunto=' + cargaAsunto +
        '&editados=' + cargaEditados;
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    peticion.onload = () => {

    }

    peticion.onreadystatechange = () => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            divMensaje.style.display = "none";
            cargarTabla(1);
            formulario.remitente.value = "";
            formulario.fecha.value = "";
            formulario.hora.value = "";
            formulario.cod_cliente.value = "";
            formulario.bandeja.selectedIndex = 0;
            formulario.estado.selectedIndex = 0;
            formulario.asunto.value = "";
            loader.style.display = "none";
            divControles.style.display = "none";
            divControles2.style.display = "none";
            formulario.chkNombres.checked = false;
            formulario.chkDirecciones.checked = false;
            formulario.chkMails.checked = false;
            formulario.chkTelefonos.checked = false;
            formulario.chkFechaNac.checked = false;
            formulario.chkTipoDoc.checked = false;
            formulario.chkAgenciamiento.checked = false;
            formulario.chkSexo.checked = false;
            formulario.chkGenero.checked = false;

        } else if (peticion.readyState != 4 && peticion.status != 200) {
            divMensaje.innerHTML = 'Ha ocurrido un problema vuelva a intentarlo';
            divMensaje.style.backgroundColor = "red"
            divMensaje.style.display = "block";
        }
    }

    peticion.send(parametros);

};

//Paginacion 
let prevPage = () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarTabla(paginaActual);
    }
}

let nextPage = () => {
    if (paginaActual < 300) {
        paginaActual++;
        cargarTabla(paginaActual);
    }
}

let cargarTabla = (page) => {
    let peticion = new XMLHttpRequest();
    peticion.open('GET', '/listaInformes');
    loader.style.display = 'block';

    peticion.onload = () => {
        let datos = JSON.parse(peticion.responseText);
        //document.getElementById('nroregistros').value = datos.informes.length;
        //Paginacion en Javascript
        let nroPaginas = Math.ceil((datos.informes.length) / 10);

        //validando pagina 
        if (page < 1) page = 1;
        if (page > nroPaginas) page = nroPaginas;

        //Paginacion javascript
        let btnAnt = document.getElementById('btnAnterior');
        let btnSig = document.getElementById('btnSiguiente');
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
            for (let i = (page - 1) * 100; i < (page * 100); i++) {
                let fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");
                fila.innerHTML += ("<td style='display:none;'>" + datos.informes[i].VC_EDITADOS + "</td>");

                let fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getUTCFullYear() + "</td>");

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
            document.getElementById('nroregistros').value = datos.informes.length + ' totales y ' + datos.cantInformesDia + ' hoy';
            tabla.innerHTML = '<thead><tr><th scope="col">DIA</th><th scope="col">CASILLA</th><th scope="col">REMITENTE</th><th scope="col">ASUNTO</th><th scope="col">FECHA_HORA</th><th scope="col">CLIENTE</th><th scope="col">ESTADO</th><th scope="col">USUARIO</th></thead>';
            for (let i = (page - 1) * 100; i < (page * 100); i++) {
                let fila = document.createElement('tr');
                fila.innerHTML += ("<td  style='display:none;'>" + datos.informes[i].IN_ID_INFORME + "</td>");

                let fecha = new Date(datos.informes[i].DT_FECHA_CREACION);
                fila.innerHTML += ("<td>" + fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getUTCFullYear() + "</td>");

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
    peticion.onreadystatechange = () => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            loader.style.display = "none";

        }
    }
    peticion.send();
};

let informesMesUsuario = () => {
    let tblInformesUsuario = document.getElementById('tblCantidadxUser'),
        tblConteoEstado = document.getElementById('tblCantidadxEstado');
    let peticionMes = new XMLHttpRequest();
    peticionMes.open('GET', '/informesMes');

    peticionMes.onload = () => {
        let datosInformeMes = JSON.parse(peticionMes.responseText);
        tblInformesUsuario.innerHTML = '<thead><tr><th scope="col">ID USUARIO</th><th scope="col">CANTIDAD</th></tr></thead>';
        for (let i = 0; i < datosInformeMes.datosMes.length; i++) {
            let filatblMes = document.createElement('tr');
            filatblMes.innerHTML += ("<td>" + datosInformeMes.datosMes[i].ID_USUARIO + "</td>");
            filatblMes.innerHTML += ("<td>" + datosInformeMes.datosMes[i].CANTIDAD + "</td>");
            tblInformesUsuario.appendChild(filatblMes);
        }
        tblConteoEstado.innerHTML = '<thead><tr><th scope="col">ID USUARIO</th><th scope="col">ESTADO</th><th>CANTIDAD</th></tr></thead>';
        for (let j = 0; j < datosInformeMes.datosEstado.length; j++) {
            let filatblConteo = document.createElement('tr');
            filatblConteo.innerHTML += ("<td>" + datosInformeMes.datosEstado[j].CH_ID_USUARIO_CREACION + "</td>");
            filatblConteo.innerHTML += ("<td>" + datosInformeMes.datosEstado[j].VC_ESTADO + "</td>")
            filatblConteo.innerHTML += ("<td>" + datosInformeMes.datosEstado[j].CANTIDAD + "</td>");
            tblConteoEstado.appendChild(filatblConteo);
        }
    };

    peticionMes.onreadystatechange = () => {
        if (peticionMes.readyState == 4 && peticionMes.status == 200) {

        }
    }
    peticionMes.send();

}

let EditarFila = (e) => {
    let idInforme = e.parentNode.parentElement.cells[0].innerHTML,
        editados_up = e.parentNode.parentElement.cells[1].innerHTML,
        bandeja_up = e.parentNode.parentElement.cells[3].innerHTML,
        remitente_up = e.parentNode.parentElement.cells[4].innerHTML,
        asunto_up = e.parentNode.parentElement.cells[5].innerHTML,
        fechaHora_up = e.parentNode.parentElement.cells[6].innerHTML,
        cod_cliente_up = e.parentNode.parentElement.cells[7].innerHTML,
        estado_up = e.parentNode.parentElement.cells[8].innerHTML;

    //Llenando los checkbox para actualizar
    if (estado_up == 'ACTUALIZACION' || estado_up == 'DEVUELTO') {
        divControles.style.display = 'block';
        divControles2.style.display = 'block';

        let arrayEditados = editados_up.split("||");
        let indexNombres = arrayEditados.indexOf('Nombres');
        indexNombres >= 0 ? document.getElementById('chkNombres').checked = true : document.getElementById('chkNombres').checked = false;
        let indexDirecciones = arrayEditados.indexOf('Direcciones');
        indexDirecciones >= 0 ? document.getElementById('chkDirecciones').checked = true : document.getElementById('chkDirecciones').checked = false;
        let indexMails = arrayEditados.indexOf('Mails');
        indexMails >= 0 ? document.getElementById('chkMails').checked = true : document.getElementById('chkMails').checked = false;
        let indexTelefonos = arrayEditados.indexOf('Telefonos');
        indexTelefonos >= 0 ? document.getElementById('chkTelefonos').checked = true : document.getElementById('chkTelefonos').checked = false;
        let indexFechaNac = arrayEditados.indexOf('FechaNac');
        indexFechaNac >= 0 ? document.getElementById('chkFechaNac').checked = true : document.getElementById('chkFechaNac').checked = false;
        let indexTipoDocumento = arrayEditados.indexOf('TipoDocumento');
        indexTipoDocumento >= 0 ? document.getElementById('chkTipoDoc').checked = true : document.getElementById('chkTipoDoc').checked = false;
        let indexAgenciamiento = arrayEditados.indexOf('Agenciamiento');
        indexAgenciamiento >= 0 ? document.getElementById('chkAgenciamiento').checked = true : document.getElementById('chkAgenciamiento').checked = false;
        let indexSexo = arrayEditados.indexOf('Sexo');
        indexSexo >= 0 ? document.getElementById('chkSexo').checked = true : document.getElementById('chkSexo').checked = false;
        let indexGenero = arrayEditados.indexOf('Genero');
        indexGenero >= 0 ? document.getElementById('chkGenero').checked = true : document.getElementById('chkGenero').checked = false;
    }

    //Obteniendo Fechas y Horas para actualizacion
    let fechaUp = new Date(fechaHora_up),
        dia = fechaUp.getDate(),
        mes = fechaUp.getMonth() + 1,
        Year = fechaUp.getFullYear(),
        hora = fechaUp.getHours(),
        minutos = fechaUp.getMinutes();

    dia < 10 ? dia = ("0" + dia).slice(-2) : dia;
    mes < 10 ? mes = ('0' + mes).slice(-2) : mes;
    hora < 10 ? hora = ('0' + hora).slice(-2) : hora;
    minutos < 10 ? minutos = ('0' + minutos).slice(-2) : minutos;

    fechaEdit = Year + '-' + mes + '-' + dia;
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

let EditarInforme = () => {
    // e.preventDefault();

    //Agregando los nuevos valores
    let peticion = new XMLHttpRequest();
    peticion.open('POST', '/EditarInforme');

    //Valorando checkbox
    formulario.chkNombres.checked ? chkNombresVal = formulario.chkNombres.value : chkNombresVal = '';
    formulario.chkDirecciones.checked ? chkDireccionesVal = formulario.chkDirecciones.value : chkDireccionesVal = '';
    formulario.chkMails.checked ? chkMailsVal = formulario.chkMails.value : chkMailsVal = '';
    formulario.chkTelefonos.checked ? chkTelefonosVal = formulario.chkTelefonos.value : chkTelefonosVal = '';
    formulario.chkFechaNac.checked ? chkFechaNacVal = formulario.chkFechaNac.value : chkFechaNacVal = '';

    //Controles2
    formulario.chkTipoDoc.checked ? chkTipoDocVal = formulario.chkTipoDoc.value : chkTipoDocVal = '';
    formulario.chkAgenciamiento.checked ? chkAgenciamientoVal = formulario.chkAgenciamiento.value : chkAgenciamientoVal = '';
    formulario.chkSexo.checked ? chkSexoVal = formulario.chkSexo.value : chkSexoVal = '';
    formulario.chkGenero.checked ? chkGeneroVal = formulario.chkGenero.value : chkGeneroVal = '';

    idInforme = formulario.inputinforme.value.trim();
    cargaBandeja = formulario.bandeja.value.trim();
    cargaRemitente = formulario.remitente.value.trim();
    cargaFecha = formulario.fecha.value.trim();
    cargaHora = formulario.hora.value.trim();
    cargaCliente = formulario.cod_cliente.value.trim();
    cargaEstado = formulario.estado.value.trim();
    cargaAsunto = encodeURIComponent(formulario.asunto.value.trim());
    cargaEditados = chkNombresVal.concat(chkDireccionesVal, chkMailsVal, chkTelefonosVal, chkFechaNacVal,
        chkTipoDocVal, chkAgenciamientoVal, chkSexoVal, chkGeneroVal);

    let parametros = 'idInforme=' + idInforme + '&bandeja=' + cargaBandeja + '&remitente=' + cargaRemitente + '&fecha=' + cargaFecha +
        '&hora=' + cargaHora + '&cod_cliente=' + cargaCliente + '&estado=' + cargaEstado + '&asunto=' + cargaAsunto +
        '&editados=' + cargaEditados;
    peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    peticion.onload = () => {

    }
    peticion.onreadystatechange = () => {
        if (peticion.readyState == 4 && peticion.status == 200) {
            divMensaje.style.display = "none";
            divControles.style.display = 'none';
            divControles2.style.display = "none";
            cargarTabla(1);
            formulario.remitente.value = "";
            formulario.fecha.value = "";
            formulario.hora.value = "";
            formulario.cod_cliente.value = "";
            formulario.bandeja.selectedIndex = 0;
            formulario.estado.selectedIndex = 0;
            formulario.asunto.value = "";
            loader.style.display = "none";
            formulario.chkNombres.checked = false;
            formulario.chkDirecciones.checked = false;
            formulario.chkMails.checked = false;
            formulario.chkTelefonos.checked = false;
            formulario.chkFechaNac.checked = false;
            formulario.chkTipoDoc.checked = false;
            formulario.chkAgenciamiento.checked = false;
            formulario.chkSexo.checked = false;
            formulario.chkGenero.checked = false;

            document.getElementById('btnAgregar').style.display = "block";
            document.getElementById('btnUpdate').style.display = "none";
            document.getElementById('btnCancelar').style.display = 'none';
            document.getElementById('cod_cliente').disabled = false;
        } else if (peticion.readyState != 4 && peticion.status != 200) {
            divMensaje.innerHTML = 'Ha ocurrido un problema vuelva a intentarlo';
            divMensaje.style.backgroundColor = "red"
            divMensaje.style.display = "block";
        }
    };
    peticion.send(parametros);

};

let EliminarFila = (r) => {
    let question = confirm('Esta seguro que desea eliminar esta flila?');
    if (question) {
        let i = r.parentNode.parentNode.rowIndex;
        let id = r.parentNode.parentElement.cells[0].innerHTML;
        document.getElementById("tabla").deleteRow(i);

        let peticion = new XMLHttpRequest();
        peticion.open('POST', '/eliminar');
        let parametos = 'idInforme=' + id;
        peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        peticion.onload = () => {
            cargarTabla(1);
        }
        peticion.onreadystatechange = () => {
            if (peticion.readyState == 4 && peticion.status == 200) {
                loader.style.display = "none";
            }
        }
        peticion.send(parametos);
    }
}

frmUsuario.addEventListener('submit', (e) => {
    AgregarUsuario(e);
});

let AgregarUsuario = (e) => {
    e.preventDefault();
    let peticion = new XMLHttpRequest();
    peticion.open('POST', '/agregarUsuario');

    cargaIdUsuario = frmUsuario.idUsuario.value.trim();
    cargaNombre = frmUsuario.nombre.value.trim();
    cargaApellidos = frmUsuario.apellidos.value.trim();
    cargaIdPerfil = frmUsuario.idPerfil.value.trim();
    cargaPassword = frmUsuario.password.value.trim();
    cargaEmail = frmUsuario.email.value.trim();

    let paramUser = 'idUsuario=' + cargaIdUsuario + '&nombre=' + cargaNombre + '&apellidos=' + cargaApellidos +
        '&idPerfil=' + cargaIdPerfil + '&password=' + cargaPassword + '&email=' + cargaEmail;

    peticion.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    peticion.onload = () => {
        frmUsuario.idUsuario.value = "";
        frmUsuario.nombre.value = "";
        frmUsuario.apellidos.value = "";
        frmUsuario.idPerfil.value = "";
        frmUsuario.password.value = "";
        frmUsuario.email.value = "";
    }

    peticion.onreadystatechange = () => {
        if (peticion.readyState == 4 && peticion.status == 200) {}
    }
    peticion.send(paramUser);
}

//Buscar en la tabla
let BuscarCliente = () => {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('buscarCliente');
    filter = input.value.toUpperCase();
    table = document.getElementById('tabla');
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[7];
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

let cancelUpdate = () => {
    formulario.remitente.value = "";
    formulario.fecha.value = "";
    formulario.hora.value = "";
    formulario.cod_cliente.value = "";
    formulario.bandeja.selectedIndex = 0;
    formulario.estado.selectedIndex = 0;
    formulario.asunto.value = "";
    divControles.style.display = 'none'
    divControles2.style.display = "none";
    document.getElementById('chkNombres').checked = false;
    document.getElementById('chkDirecciones').checked = false;
    document.getElementById('chkMails').checked = false;
    document.getElementById('chkTelefonos').checked = false;
    document.getElementById('chkFechaNac').checked = false;
    document.getElementById('chkTipoDoc').checked = false;
    document.getElementById('chkAgenciamiento').checked = false;
    document.getElementById('chkSexo').checked = false;
    document.getElementById('chkGenero').checked = false;
    document.getElementById('btnAgregar').style.display = "block";
    document.getElementById('btnUpdate').style.display = "none";
    document.getElementById('btnCancelar').style.display = 'none';
    document.getElementById('cod_cliente').disabled = false;
}

let chkOpciones = () => {
    let cboEstado = document.getElementById('estado');
    if (cboEstado.value == 'ACTUALIZACION' || cboEstado.value == 'DEVUELTO') {
        divControles.style.display = 'block';
        divControles2.style.display = 'block';
    } else {
        divControles.style.display = 'none';
        divControles2.style.display = 'none';
        document.getElementById('chkNombres').checked = false;
        document.getElementById('chkDirecciones').checked = false;
        document.getElementById('chkMails').checked = false;
        document.getElementById('chkTelefonos').checked = false;
        document.getElementById('chkFechaNac').checked = false;
    }
}