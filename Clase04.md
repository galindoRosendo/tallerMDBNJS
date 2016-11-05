# CRUD,  NodeJS, Express y MongoDB

Express es un framework para la creación de aplicaciones web en la parte superior de Node.js. Se simplifica el proceso de creación del servidor que ya está disponible en Node.

MongoDB es un gestor de base de datos. Este es el lugar donde almacena la información para sus sitios web o aplicaciones web.

CRUD es un acrónimo para crear, leer, actualizar y eliminar. Se trata de un conjunto de operaciones que obtenemos servidores para ejecutar (POST, GET, PUT y DELETE respectivamente). Esto es lo que hace cada operación:

Crear (POST) - Hacer algo
Leer (GET) - Obtener algo
Actualización (PUT) - cambiar algo
Delete (BORRAR) - Quitar algo

Si ponemos CRUD, Express y MongoDB juntos en un solo diagrama, esto es lo que se vería así:
![alt tag](00_resources/img/crud-express-mongo.png)

# Empezando
Para comenzar, cree una carpeta para este proyecto. Una vez que estemos en ella, ejecute el comando npm init.

Este comando crea un archivo package.json que le ayuda a gestionar las dependencias que instalamos más adelante.
```
$ npm init
```

# Ejecución de Node

La forma más sencilla de utilizar node es ejecutar el comando node y especificar una ruta a un archivo. Vamos a crear un archivo llamado server.js para ejectutar con node.
```
$ touch server.js
```

Cuando la ejecute el archivo server.js , queremos para asegurarse de que está funcionando correctamente. Para asegurarnos de esto escribimos una llamada a la funcion log.
```
console.log('Node funciona :D')
```
Ahora, ejecuta node server.js en la línea de comandos y debería ver el mensaje que escribio en la funcion log.

```
$node server.js
```
![alt tag](00_resources/img/proy1.jpg)


# Utilización de Express
Primero tenemos que instalar express antes de que podamos usar en nuestra aplicación. La instalación Express es bastante fácil. Todo lo que tenemos que hacer es ejecutar un comando de instalación con el administrador de paquetes de Node (NPM), que se suministra junto con Node.
Ejecuta npm install express --save en la línea de comandos:
```
$ npm install express --save
```

Una vez que haya terminado, nos podemos dar cuenta que  npm ha guardado Express como una dependencia en package.json.
![alt tag](00_resources/img/proy2.jpg)

A continuación, utilizamos express en el archivo server.js haciendo un require.
``` javascript
const express = require('express');
const app = express();
```
Lo primero que queremos hacer es crear un servidor en el que los navegadores pueden conectarse. Podemos hacerlo con la ayuda de un método listen proporcionado por express:
```javascript
app.listen(3000, function() {
  console.log('listening on 3000')
})
```

Ahora, ejecuta node server.js y navegue hasta localhost:3000 en el navegador. Debería ver un mensaje que dice "no se puede obtener /".

Eso es una buena señal. Esto significa que ahora podemos comunicar a nuestro servidor express a través del navegador .

Aquí es donde comenzamos operaciones CRUD.

# CRUD - LEER

La operación LEER  se realiza por los navegadores cada vez que visita una página web. Bajo el capó, los navegadores envía una solicitud GET al servidor para realizar una operación de lectura. La razón por la que vemos el error "no se puede obtener /" es porque todavía no enviamos nada de vuelta al navegador de nuestro servidor.

En Express, manejamos una peticion GET con el metodo get:
```javascript
app.get(path, callback)
```
**El primer argumento**,path es el camino de la solicitud GET. Es todo lo que viene después de que su nombre de dominio.

Cuando estamos visitando localhost:3000, nuestros navegadores están buscando realmente localhost:3000/. El argumento de la ruta en este caso es /.

**El segundo argumento** es una función de devolución de llamada que le dice al servidor qué hacer cuando se compara la trayectoria. Toma en dos argumentos, un objeto de petición y respuesta de un objeto:
```javascript
app.get('/', function (request, response) {
  // do something here
})
```
Por ahora, vamos a escribir "Hello World" de vuelta al navegador. Lo hacemos mediante el uso de un metodo send que viene con el objeto de respuesta:
```javascript
app.get('/', function(req, res) {
  res.send('Hello World')
})
// Note: request and response are usually written as req and res respectively.
```

El codigo escrito esta en ES5 y para fines de aprender mas se va convertir a ES6. En primer lugar, se reemplaza la function()con la función de flecha ES6 . El código siguiente es el mismo que el código anterior:
```javascript
app.get('/', (req, res) => {
  res.send('hello world')
})
```
Ahora, reinicie el servidor mediante el procedimiento siguiente:
Detener el servidor actual con CTRL + C en la línea de comandos.
Ejecuta node server.js de nuevo.

A continuación, vaya a localhost:3000en su navegador. Usted debe ser capaz de ver una cadena que dice "Hello World".
![alt tag](00_resources/img/proy3.jpg)

Estupendo. Vamos a cambiar nuestra aplicación para que mande una pagina index.html al navegador en su lugar. Para ello, se utiliza el metodo sendFile que se proporciona por el objeto res.
```JavaScript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
```
En el método sendFile  anterior, le dijimos a Express para enviara un archivo  index.html que se encuentra en la raíz de la carpeta del proyecto. No tenemos ese archivo aún. Vamos a hacerlo ahora.
```
$touch index.html
```
Vamos a poner un poco de texto en nuestro index.htmlarchivo, así:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>
  Probando express.
</body>
</html>
```
Reinicie el servidor y actualice su navegador. Sera capaz de ver los resultados de su archivo HTML ahora.
![alt tag](00_resources/img/proy4.jpg)


En este punto, se habrá dado cuenta de que es necesario reiniciar el servidor cada vez que se realiza un cambio server.js. Este es el proceso es increíblemente tedioso, así que vamos a echar un desvío rápido y hacerlo más eficiente mediante el uso de un paquete llamado nodemon .

# Introduzca Nodemon
Nodemon reinicia el servidor automáticamente cada vez que guarde un archivo que utiliza el servidor. Podemos instalar Nodemon utilizando el siguiente comando:
```
$ npm install nodemon --save-dev
```

Nota: La razón por la que estamos usando una bandera --save-dev  aquí es porque sólo estamos utilizando Nodemon cuando estamos desarrollando.

Nodemon se comporta exactamente igual que Node, lo que significa que podemos ejecutar nuestro servidor llamando nodemon server.js. Sin embargo, no podemos hacerlo en la línea de comandos en este momento porque Nodemon no se instala con una bandera -g.

Hay otra forma de ejecutar Nodemon - podemos ejecutar Nodemon de la carpeta node_modules . El código es el siguiente:
```
$ ./node_modules/.bin/nodemon server.js
```
Eso es un puñado de escribir. Una forma de hacerlo más sencillo es crear una clave script en el archivo package.json.
```javascript
{
  // ...
  "scripts": {
    "dev": "nodemon server.js"
  }
  // ...
}
```
Ahora, puede ejecutar npm run dev para disparar nodemon server.js.
```
$npm run dev
```
![alt tag](00_resources/img/proy5.jpg)

CRUD - CREAR
La operacion CREATE se realiza sólo por el navegador si una solicitud de POST se envía al servidor. Esta solicitud POST puede dispararse tanto con JavaScript o a través de una etiqueta <form>.

Vamos a ver cómo utilizar un etiqueta <form> para crear nuevas entradas para nuestra aplicacion de alumnos.
Para ello, primero hay que crear un <form> y añadirlo al archivo index.html. Es necesario tener tres cosas en este form:
Un atributo action, un atributo method y name.
los atributos de todos los elementos <input>  dentro del form.
```html
<form action="/alumnos" method="POST">
  <input type="text" placeholder="Nombre" name="name">
  <input type="text" placeholder="Numero de control" name="control">
  <button type="submit">Registrar</button>
</form>
```
El atributo action indica al navegador dónde navegar en nuestra aplicación Express. En este caso, estamos navegando a /alumnos. El atributo method  indica al navegador qué petición de enviar. En este caso, se trata de una solicitud POST.
En nuestro servidor, podemos manejar esta solicitud POST con un método post  que proporciona express. Toma los mismos argumentos que el método GET:
```javascript
app.post('/alumnos', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})
```
Reinicie el servidor (es de esperar que haya configurado Nodemon por lo que se reinicia automáticamente) y actualice su navegador. A continuación, introduzca algo en el formulario y presione registrar. Usted debe ser capaz de ver Hellooooooooooooooooo!en la línea de comandos.

Hasta ahora sabemos que express maneja el formulario por nosotros. La siguiente pregunta es, ¿cómo podemos obtener los valores de entrada con Express?

Resulta que express no se ocupa de la lectura de datos desde el elemento <form> por sí mismo. Tenemos que añadir otro paquete llamado boy-parser para obtener esta funcionalidad.
```
$ npm install body-parser --save
```

Express nos permite añadir middleware como body-parser para nuestra aplicación con el método use . Oirás el término middleware mucho cuando se trata de Express. Estas cosas son básicamente los plugins que cambian la petición o respuesta objeto antes de que sean manejados por nuestra aplicación. Asegúrese de colocar el body-parser al principio del archivo server.js  antes de que cualquier  manipulador CRUD!
```javascript
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...
```

El método urlencoded  dentro del body-parser es para extraer los datos del elemento <form> y añadirlos a la propiedad body  en el objeto request.

Ahora, usted debería ser capaz de ver todo en el campo de formulario dentro del objeto req.body. Intenten hacer un console.log y ver lo que es!
```javascript
app.post('/alumnos', (req, res) => {
  console.log(req.body)
})
```
Usted debe ser capaz de obtener un objeto similar a la siguiente en la línea de comandos:
//Imagen Rosendoynumero de control

Ahora vamos a almacenar la informacion que se envia por el formulario en una base de datos de MongoDB

# MongoDB
Primero tenemos que instalar el driver de MongoDB través de la npm si queremos usarlo como base de datos.
```
$npm install mongodb --save
```
Una vez instalado, podemos conectar a MongoDB a través del método Mongo.Client como se muestra en el siguiente código:
```javascript
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://direccionIp:puerto/baseDeDatos', (err, database) => {
  // ... start the server
})
```

A continuación, queremos empezar nuestros servidores de NodeJS sólo cuando está conectada la base de datos. Por lo tanto, vamos a pasar app.listen en el método connect . También vamos a crear una variable db  que nos permitirá utilizar la base de datos cuando manejamos las solicitudes del navegador.

```javascript
var db;

MongoClient.connect('your-mongodb-url', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
```

Hemos terminado la configuración de MongoDB. Ahora, vamos a crear una colección alumnos para almacenar la informacion que manejamos.
**Nota:** una colección es una ubicación con nombre para almacenar cosas, como una table de mysql, sqlServer, oracle, postgre, etc.

Podemos crear la colección alumnos mediante la cadena alumnos cuanto llamamos al método MongoDB db.collection(). Durante la creación de la colección de alumnos, también podemos guardar nuestra primera entrada en MongoDB con el método save de forma simultánea.

Una vez que hemos terminado de guardar, tenemos que redirigir al usuario en algún lugar (o que tendremos que aguantar para siempre a la espera de nuestro servidor de moverse). En este caso, vamos a redirigir de nuevo a /, lo que hace que el navegador recargue la pagina.
```javascript
app.post('/alumnos', (req, res) => {
  db.collection('alumnos').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
```

Ahora, si se introduce algo en el elemento <form>, podrás ver una entrada en su colección MongoDB.

# Mostrando los alumnos a los usuarios

Tenemos que hacer dos cosas para mostrar la informacion almacenada en MongoLab a nuestros usuarios.

Obtener los documentos de MongoDB
Usat un motor de plantillas para mostrar los documentos

## Vayamos un paso a la vez.
Podemos obtener las cotizaciones de MongoLab utilizando el método find  que está disponible en el método collection .
```javascript
app.get('/', (req, res) => {
  var cursor = db.collection('alumnos').find();
})
```
El método find devuelve un cursor(Un Objecto de Mongo ) que, probablemente, no tiene sentido si lo imprimimos con console.log.

La buena noticia es que este objeto cursor contiene todos los documentos de nuestra base de datos. También contiene un montón de otras propiedades y métodos que nos permiten trabajar con datos fácilmente. Uno de tales métodos es el método toArray .

El método toArray toma en una función de callback que nos permite hacer cosas con los documentos que se obtengan de MongoDB. Vamos a tratar de hacer un console.log() para los resultados y ver lo que tenemos!
```javascript
db.collection('alumnos').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with students here
})
```
Ahora puede ver una serie de alumnos (sólo tengo uno ahora mismo). Hemos completado la primera parte - datos obtenidos de MongoDB. La siguiente parte es generar un código HTML que contiene todos nuestros documentos.

No podemos servir a nuestro archivo index.html  y esperar que aparecen mágicamente entre comillas porque no hay manera de añadir contenido dinámico a un archivo HTML. Lo que podemos hacer en su lugar, es ayudarnos con el uso de motores de plantillas . Algunos motores de plantilla populares incluyen Jade, JavaScript incrustado y Nunjucks.

Vamos a utilizar Embedded JavaScript ( ejs) como nuestro motor de plantillas porque es el más fácil para empezar. Encontrarás que es familiar de el primer momento si tienes conocimientos de HTML y JavaScript.

Para usar EJS primero necesitamos instalarlo y despues configurar express para que use como motor de plantillas a EJS.
```
$ npm install ejs --save
```
```javascript
app.set('view engine', 'ejs');
```

Una vez que el view engine se establece, podemos empezar a generar el código HTML con nuestros alumnos.
 Este proceso también se denomina prestación . Podemos utilizar la funcion render del objeto response . Tiene la siguiente sintaxis:
```javascript
res.render(view, locals);
```
El primer parámetro,views es el nombre del archivo que estaremos monstrando la informacion. Este archivo debe ser colocado dentro de una carpeta views [Segun la estandarizacion de express].
El segundo parámetro, los locals , es un objeto que pasa los datos a la vista.

Primero vamos a crear un archivo index.html.ejs  dentro de la carpeta views  para que podamos comenzar a rellenar datos.
```
mkdir views
touch views/index.ejs
```
Ahora, coloque el siguiente código dentro index.html.ejs.
```html
<ul class="alumnos">
  <% for(var i=0; i<alumnos.length; i++) {%>
    <li class="alumno">
      <span><%= alumnos[i].name %></span>
      <span><%= alumnos[i].control %></span>
    </li>
  <% } %>
</ul>
```
Véase lo que quiero decir cuando digo que lo encontrará familiar? En EJS, puede escribir JavaScript dentro de las etiquetas <%y %>. Puede también imprimir variables de JavaScript como cadenas si se utilizan las etiquetas <%=y %>.
Aquí, se puede ver que estamos básicamente haciendo  un bucle a través de la matriz alumnos y crear cadenas con alumnos[i].name y alumnos[i].control.

Una cosa más que hacer antes de pasar desde el archivo index.html.ejs . Recuerde que debe copiar el elemento <form> del archivo index.html  en este archivo también. El archivo index.html.ejs hasta ahora debe ser:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>

  <ul class="alumnos">
  <% for(var i=0; i<alumnos.length; i++) {%>
    <li class="alumno">
      <span><%= alumnos[i].name %></span>
      <span><%= alumnos[i].control %></span>
    </li>
  <% } %>
  </ul>

  <form action="/alumnos" method="POST">
    <input type="text" placeholder="Nombre" name="name">
    <input type="text" placeholder="Numero de control" name="control">
    <button type="submit">Registrar</button>
  </form>
</body>
</html>
```
Por último, tenemos que hacer que este archivo index.html.ejs manipule la petición GET . Aquí, estamos estableciendo los resultados (una matriz) como la matriz alumnos que usamos en index.html.ejs anteriormente.
```javascript
app.get('/', (req, res) => {
  db.collection('alumnos').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.html.ejs', {alumnos: result})
  })
})
```
