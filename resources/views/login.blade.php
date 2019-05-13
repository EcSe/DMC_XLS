<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/login.css">
    <title>Document</title>
</head>

<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->
            <h2 class="inactive underlineHover">Iniciar Sesion </h2>

            <!-- Icon -->
            <!-- <div class="fadeIn first">
                <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
            </div> -->

            <!-- Login Form -->
            <form action="{{ route('informes') }}" method="POST">
                <input type="text" id="idusuario" class="fadeIn second" name="idusuario" placeholder="Ingresar Usuario">
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="Ingresar Contraseña">
                <input type="submit" class="fadeIn fourth" id="btnIngresar" name="btnIngresar" value="Ingresar">
            </form>
        </div>
    </div>
</body>

</html>