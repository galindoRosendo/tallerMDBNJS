CRUD, Express y MongoDB
CRUD, Express y MongoDB son palabras mayores para una persona que nunca ha tocado ningún tipo de programación del lado del servidor en su vida. Vamos a introducir rápidamente lo que son antes de sumergirse en el tutorial.
Expreso es un marco para la creación de aplicaciones web en la parte superior de Node.js. Se simplifica el proceso de creación del servidor que ya está disponible en el Nodo. En caso de que se preguntan, Nodo permite el uso de JavaScript como su lenguaje de servidor.
MongoDB es una base de datos. Este es el lugar donde almacena la información para sus sitios web o aplicaciones web ().
ABM es un acrónimo para crear, leer, actualizar y eliminar. Se trata de un conjunto de operaciones que obtenemos servidores para ejecutar (POST, GET, PUT y DELETE respectivamente). Esto es lo que hace cada operación:
Crear (POST) - Hacer algo
Leer (GET) - Obtener algo
Actualización (PUT) - cambiar algo
Delete (BORRAR) - Quitar algo
Si ponemos un mantenimiento, Express y MongoDB juntos en un solo diagrama, esto es lo que se vería así:

Empezando
Para comenzar, cree una carpeta para este proyecto. No dude en llamar como quiera. Una vez que navegar en ella, ejecute el npm initcomando.
Este comando crea un package.jsonarchivo que le ayuda a gestionar las dependencias que instalamos más adelante en el tutorial.
$ npm init
Sólo tiene que darle entrar a través de todo lo que aparece. Voy a hablar de los que necesita saber sobre la marcha.
Ejecución de nodo por primera vez en su vida
La forma más sencilla de utilizar nodo es ejecutar el nodecomando y especifique una ruta a un archivo. Vamos a crear un archivo llamado server.jspara funcionar con el nodo.
$ touch server.js
Cuando la ejecute el server.jsarchivo, queremos para asegurarse de que está funcionando correctamente. Para ello, sólo tiene que escribir una console.logdeclaración en server.js:
console.log('May Node be with you')
Ahora, ejecuta node server.jsen la línea de comandos y debería ver la declaración que haber iniciado sesión:

Utilización de Express
Primero tenemos que instalar expreso antes de que podamos usar en nuestra aplicación. Instalación Express es bastante fácil. Todo lo que tenemos que hacer es ejecutar un comando de instalación con el administrador de nodo del paquete (NPM), que se suministra junto con el Nodo.
Ejecutar el npm install express --savecomando en la línea de comandos:

$ npm install express --save
Una vez que haya terminado, usted debe ver que la NGP ha salvado Express como una dependencia en package.json.

A continuación, utilizamos expresarse en server.jspor lo requieran.
const express = require('express');
const app = express();
Lo primero que queremos hacer es crear un servidor en el que los navegadores pueden conectarse. Podemos hacerlo con la ayuda de un listenmétodo proporcionado por expreso:
app.listen(3000, function() {
  console.log('listening on 3000')
})
Ahora, ejecutar node server.jsy navegue hasta localhost:3000en su navegador. Debería ver un mensaje que dice "no se puede obtener /".

Eso es una buena señal. Esto significa que ahora podemos comunicar a nuestro servidor expresa a través del navegador . Aquí es donde comenzamos operaciones CRUD.

CRUD - LEER
El LEER operación se realiza por los navegadores cada vez que visita una página web. Bajo el capó, los navegadores envía un GET solicitud al servidor para realizar una operación de lectura. La razón por la que vemos el error "no se puede obtener /" es porque todavía tenemos que enviar nada de vuelta al navegador de nuestro servidor.
En Expreso, manejamos un GET petición con el getmétodo:
app.get(path, callback)
El primer argumento,path es el camino de la solicitud GET. Es todo lo que viene después de que su nombre de dominio.
Cuando estamos visitando localhost:3000, nuestros navegadores están buscando realmente localhost:3000/. El argumento de la ruta en este caso es /.
El segundo argumento es una función de devolución de llamada que le dice al servidor qué hacer cuando se compara la trayectoria. Toma en dos argumentos, un objeto de petición y respuesta de un objeto:
app.get('/', function (request, response) {
  // do something here
})
Por ahora, vamos a escribir "Hello World" de vuelta al navegador. Lo hacemos mediante el uso de un sendmétodo que viene con el objeto de respuesta:
app.get('/', function(req, res) {
  res.send('Hello World')
})
// Note: request and response are usually written as req and res respectively.
Voy a empezar a escribir en código ES6 y le mostrará cómo convertir a ES6 a lo largo del camino también. En primer lugar, estoy reemplazando el function()con la función de flecha ES6 . El código siguiente es el mismo que el código anterior:
app.get('/', (req, res) => {
  res.send('hello world')
})
Ahora, reinicie el servidor mediante el procedimiento siguiente:
Detener el servidor actual por golpear CTRL + Cen la línea de comandos.
Correr node server.jsde nuevo.
A continuación, vaya a localhost:3000en su navegador. Usted debe ser capaz de ver una cadena que dice "Hello World".

Estupendo. Vamos a cambiar nuestra aplicación para que sirve un index.htmlpágina al navegador en su lugar. Para ello, se utiliza el sendFilemétodo que se proporciona por el resobjeto.
```JavaScript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})
```
En el sendFilemétodo anterior, le dijimos Express para servir a un index.htmlarchivo que se encuentra en la raíz de la carpeta del proyecto. No tenemos ese archivo aún. Vamos a hacer ahora.
touch index.html
Vamos a poner un poco de texto en nuestro index.htmlarchivo, así:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>
  May Node and Express be with you.
</body>
</html>
Reinicie el servidor y actualizar su navegador. Usted debe ser capaz de ver los resultados de su archivo HTML ahora.

Así es como expreso maneja un GET solicitud ( LEER operación) en una cáscara de nuez.
En este punto, se habrá dado cuenta de que es necesario reiniciar el servidor cada vez que se realiza un cambio server.js. Este es el proceso es increíblemente tedioso, así que vamos a echar un desvío rápido y hacerlo más eficiente mediante el uso de un paquete llamado nodemon .
Introduzca Nodemon
Nodemon reinicia el servidor automáticamente cada vez que guarde un archivo que utiliza el servidor. Podemos instalar Nodemon utilizando el siguiente comando:
$ npm install nodemon --save-dev
Nota: La razón por la que estamos usando una --save-devbandera aquí es porque sólo estamos utilizando Nodemon cuando estamos desarrollando. Esta bandera se ahorraría Nodemon como devDependencyen su package.jsonarchivo.
Cambiando de tema, Nodemon se comporta exactamente igual que el nodo, lo que significa que podemos ejecutar nuestro servidor llamando nodemon server.js. Sin embargo, no podemos hacerlo en la línea de comandos en este momento porque Nodemon no se instala con una -gbandera.
Hay otra forma de ejecutar Nodemon - podemos ejecutar Nodemon de la node_modulescarpeta. El código es el siguiente:
$ ./node_modules/.bin/nodemon server.js
Eso es un puñado de escribir. Una forma de hacerlo más sencillo es crear una scriptclave en package.json.
{
  // ...
  "scripts": {
    "dev": "nodemon server.js"
  }
  // ...
}
Ahora, puede ejecutar npm run devpara disparar nodemon server.js.
Volviendo al tema principal. Vamos a cubrir el CREATE siguiente operación.


CRUD - CREAR
El CREATE operación se realiza sólo por el navegador si una de POST solicitud se envía al servidor. Esta solicitud POST puede dispararse tanto con JavaScript o a través de un <form>elemento.
Vamos a ver cómo utilizar un <form>elemento para crear nuevas entradas para nuestros guerra de las galaxias citan aplicación de esta parte del tutorial.
Para ello, primero hay que crear un <form>elemento y añadirlo a su index.htmlarchivo. Es necesario tener tres cosas en este elemento forma:
un actionatributo
un methodatributo
y namelos atributos de todos los <input> elementos dentro de la forma
<form action="/quotes" method="POST">
  <input type="text" placeholder="name" name="name">
  <input type="text" placeholder="quote" name="quote">
  <button type="submit">Submit</button>
</form>
El actionatributo indica al navegador dónde navegar en nuestra aplicación Express. En este caso, estamos navegando a /quotes. El methodatributo indica al navegador qué petición de enviar. En este caso, se trata de una solicitud POST.
En nuestro servidor, podemos manejar esta solicitud POST con un postmétodo que proporciona expreso. Toma los mismos argumentos que el método GET:
app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
})
Reinicie el servidor (es de esperar que haya configurado Nodemon por lo que se reinicia automáticamente) y actualice su navegador. A continuación, introduzca algo en su elemento de formulario. Usted debe ser capaz de ver Hellooooooooooooooooo!en la línea de comandos.

Gran, sabemos que expreso es el manejo de la forma para nosotros en este momento. La siguiente pregunta es, ¿cómo podemos obtener los valores de entrada con Express?
Resulta que expreso no se ocupa de la lectura de datos desde el <form>elemento por sí mismo. Tenemos que añadir otro paquete llamado cuerpo-analizador para obtener esta funcionalidad.
$ npm install body-parser --save
Expreso nos permite añadir middleware como cuerpo-analizador para nuestra aplicación con el usemétodo. Oirás el término middleware mucho cuando se trata de Express. Estas cosas son básicamente los plugins que cambian la petición o respuesta objeto antes de que sean manejados por nuestra aplicación. Asegúrese de colocar el cuerpo-analizador antes de que sus manipuladores CRUD!
const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...
El urlencodedmétodo dentro del cuerpo-cuerpo-parser dice analizador para extraer los datos del <form>elemento y añadirlos a la bodypropiedad en el requestobjeto.
Ahora, usted debería ser capaz de ver todo en el campo de formulario dentro del req.bodyobjeto. Trate de hacer una console.logy ver lo que es!
app.post('/quotes', (req, res) => {
  console.log(req.body)
})
Usted debe ser capaz de obtener un objeto similar a la siguiente en la línea de comandos:

Hmmm. Maestro Yoda ha hablado! Vamos a asegurarnos de que recordamos las palabras de Yoda. Es importante. Queremos ser capaz de recuperarlo la próxima vez que cargamos nuestra página de índice.
Introduzca la base de datos, MongoDB.
MongoDB
Primero tenemos que instalar MongoDB través de la NGP si queremos usarlo como base de datos.

npm install mongodb --save
Una vez instalado, podemos conectar a MongoDB a través del Mongo.Clientmétodo de 's conectan como se muestra en el siguiente código:
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
})

A continuación, queremos empezar a nuestros servidores sólo cuando está conectada la base de datos. Por lo tanto, vamos a pasar app.listenen el connectmétodo. También vamos a crear una dbvariable que nos permitirá utilizar la base de datos cuando manejamos las solicitudes del navegador.
var db

MongoClient.connect('your-mongodb-url', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
Hemos terminado la configuración de MongoDB. Ahora, vamos a crear una quotescolección para almacenar citas para nuestra aplicación.
Por cierto, una colección es una ubicación con nombre para almacenar cosas . Puede crear tantas colecciones como desee. Puede ser cosas como "productos", "citas", "tienda de comestibles", o cualquier otra etiqueta que usted elija.
Podemos crear la quotescolección mediante la cadena quotesmientras que llama de MongoDB db.collection()método. Durante la creación de la colección de citas, también podemos guardar nuestra primera entrada en MongoDB con el savemétodo de forma simultánea.
Una vez que hemos terminado de guardar, tenemos que redirigir al usuario en algún lugar (o que tendremos que aguantar para siempre a la espera de nuestro servidor de moverse). En este caso, vamos a redirigir de nuevo a /, lo que hace que sus navegadores para recargar.
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
Ahora, si se introduce algo en el <form>elemento, podrás ver una entrada en su colección MongoDB.

Mostrando cotizaciones a los usuarios
Tenemos que hacer dos cosas para mostrar las citas almacenadas en MongoLab a nuestros usuarios.
Obtener las cotizaciones de MongoLab
Use un motor de plantillas para mostrar las citas
Vayamos un paso a la vez.
Podemos obtener las cotizaciones de MongoLab utilizando el findmétodo que está disponible en el collectionmétodo.
app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find()
})
El findmétodo devuelve una cursor(A Mongo Object) que, probablemente, no tiene sentido si console.logse fuera.

La buena noticia es que este cursorobjeto contiene todas las frases de nuestra base de datos. También contiene un montón de otras propiedades y métodos que nos permiten trabajar con datos fácilmente. Uno de tales métodos es el toArraymétodo.
El toArraymétodo toma en una función de devolución de llamada que nos permite hacer cosas con citas que Obtenido de MongoLab. Vamos a tratar de hacer una console.log()para los resultados y ver lo que tenemos!
db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
})

¡Estupendo! Ahora puede ver una serie de citas (sólo tengo uno ahora mismo). Hemos completado la primera parte - datos obtenidos de MongoLab. La siguiente parte es generar un código HTML que contiene todas nuestras cotizaciones.
No podemos servir a nuestro index.htmlarchivo y esperar que aparecen mágicamente entre comillas porque no hay manera de añadir contenido dinámico a un archivo HTML. Lo que podemos hacer en su lugar, es el uso de motores de plantilla a ayudarnos. Algunos motores de plantilla populares incluyen Jade, JavaScript incrustado y Nunjucks.
He escrito extensamente sobre el cómo y por qué de los motores de plantilla en un post aparte . Es posible que desee comprobar hacia fuera si usted no tiene idea de lo que son los motores de plantilla. Yo personalmente uso (y recomiendo) Nunjucks como mi motor de plantillas de elección. Siéntase libre de visitar el post para averiguar por qué.
Para este tutorial, vamos a utilizar Embedded JavaScript ( ejs) como nuestro motor de plantillas porque es el más fácil para empezar. Usted encontrará que es familiar de el primer momento ya que usted ya sabe HTML y JavaScript.
Podemos usar EJS por primera instalarlo, y después colocar el view enginein exprés a ejs.
$ npm install ejs --save
app.set('view engine', 'ejs')
Una vez que el view enginese establece, podemos empezar a generar el código HTML con nuestras cotizaciones. Este proceso también se denomina prestación . Podemos utilizar el renderobjeto construido en el responseobjeto renderpara hacerlo. Tiene la siguiente sintaxis:
res.render(view, locals)
El primer parámetro,views es el nombre del archivo que estamos representación. Este archivo debe ser colocado dentro de una viewscarpeta.
El segundo parámetro, los locales , es un objeto que pasa los datos a la vista.
Primero vamos a crear un index.ejsarchivo dentro de la viewscarpeta para que podamos comenzar a rellenar datos.
mkdir views
touch views/index.ejs
Ahora, coloque el siguiente código dentro index.ejs.
<ul class="quotes">
  <% for(var i=0; i<quotes.length; i++) {%>
    <li class="quote">
      <span><%= quotes[i].name %></span>
      <span><%= quotes[i].quote %></span>
    </li>
  <% } %>
</ul>
Véase lo que quiero decir cuando digo que lo encontrará familiar? En EJS, puede escribir JavaScript dentro <%y %>etiquetas. Puede también la salida de JavaScript como cadenas si se utiliza el <%=y %>etiquetas.
Aquí, se puede ver que estamos básicamente bucle a través de la quotesmatriz y crear cadenas con quotes[i].namey quotes[i].quote.
Una cosa más que hacer antes de pasar desde el index.ejsarchivo. Recuerde que debe copiar el <form>elemento del index.htmlarchivo en este archivo también. La completa index.ejsde archivos hasta ahora debe ser:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MY APP</title>
</head>
<body>
  May Node and Express be with you.

  <ul class="quotes">
  <% for(var i=0; i<quotes.length; i++) {%>
    <li class="quote">
      <span><%= quotes[i].name %></span>
      <span><%= quotes[i].quote %></span>
    </li>
  <% } %>
  </ul>

  <form action="/quotes" method="POST">
    <input type="text" placeholder="name" name="name">
    <input type="text" placeholder="quote" name="quote">
    <button type="submit">Submit</button>
  </form>
</body>
</html>
Por último, tenemos que hacer que este index.ejsarchivo al manipular el GET petición. Aquí, estamos estableciendo los resultados (una matriz) como la quotesmatriz que usamos en index.ejsanteriormente.
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
Ahora, actualizar su navegador y usted debería ser capaz de ver las citas del Maestro Yoda.

CRUD - ACTUALIZACIÓN
El ACTUALIZACIÓN operación se utiliza cuando se quiere cambiar algo. Sólo puede ser desencadenada por los navegadores a través de un PUT petición. Al igual que el POSTE solicitud, el PUT solicitud ya sea puede ser activado a través de JavaScript oa través de un <form>elemento.
Vamos a tratar de desencadenar una PUT solicitud a través de JavaScript en esta ocasión puesto que ya hemos aprendido cómo activar una solicitud a través de un <form>elemento al pasar por el POSTE petición en el artículo anterior.
A los efectos de este tutorial, vamos a crear un botón que, cuando se hace clic, se sustituirá la última cotización por escrito por el Maestro Yoda con una cita escrita por Darth Vader.
Para ello, primero se añade una buttonen el index.ejsarchivo:
<div>
  <h2>Replace last quote written by Master Yoda with a quote written by Darth Vadar</h2>
  <button id="update"> Darth Vadar invades! </button>
</div>
También vamos a crear un archivo JavaScript externo para ejecutar el PUT petición cuando se hace clic en el botón. De acuerdo con las convenciones Express, este archivo se coloca en una carpeta llamadapublic
$ mkdir public
$ touch public/main.js
Entonces, tenemos que decirle Express para hacer esta publiccarpeta accesible al público mediante el uso de un middleware incorporado llamadaexpress.static
app.use(express.static('public'))
Una vez hecho esto, podemos añadir el main.jsarchivo al index.ejsarchivo:
<!-- ... -->
<script src="main.js"></script>
</body>
A continuación, vamos a enviar el PUT petición cuando se hace clic en el botón:
// main.js
var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
})
La forma más fácil de activar un PUT solicitud en los navegadores modernos es utilizar la API de Fetch . Sólo es compatible con Firefox, Chrome y Opera , por lo que es posible que desee utilizar un polyfill si desea utilizar la herramienta Explorar en un proyecto real.
Vamos a enviar la siguiente petición de recuperación al servidor. Tener un rápido vistazo a ella y voy a explicar qué significa todo esto:
fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Darth Vader',
    'quote': 'I find your lack of faith disturbing.'
  })
})
Listo para entender por qué la petición Fetch está escrito de esta manera? :)
Fetch toma en dos parámetros. El primer parámetro es un camino. En este caso, estamos enviando la solicitud a /quote, que será manejado en nuestro servidor.
El segundo parámetro, options, es un objeto opcional que le permite controlar una serie de situaciones diferentes. Los que usamos anteriormente son method, headersy body.
methodes sencillo. Hemos establecido el methodque putya estamos enviando una solicitud PUT.
headersaquí se refiere a Encabezados HTTP que desea enviar al servidor. Es un objeto con varios pares de valores clave.
body se refiere al contenido que usted envíe al servidor.
Una cosa que usted puede notar es que hemos cambiado la Content-Typea application/json. Nosotros también hemos convertido la cita de Darth Vader en JSON en el cuerpo con JSON.stringify. Estamos haciendo estos pasos, ya que estamos enviando cotización de Darth Vader en el formato JSON (un formato estándar para el envío de información en la web) en el servidor.
Por desgracia, nuestro servidor no lee datos JSON todavía. Podemos enseñar a leer los datos JSON utilizando el bodyparser.json()middleware:
app.use(bodyParser.json())
Una vez que hemos hecho todo lo anterior, vamos a ser capaces de manejar este PUT solicitud utilizando el putmétodo:
app.put('/quotes', (req, res) => {
  // Handle put request
})
El próximo paso, entonces, es aprender a mirar por última cotización por el Maestro Yoda y el cambio a una cita de Darth Vader en MongoDB.
Actualización de una colección en MongoDB
MongoDB Colecciones vienen con un método llamado findOneAndUpdateque nos permite cambiar un elemento de la base de datos. Toma en cuatro parámetros - query, update, optionsy callback.
db.collections('quotes').findOneAndUpdate(
  query,
  update,
  options,
  callback
)
El primer parámetro,query , nos permite filtrar la colección a través de pares de clave y valor dado a la misma. Podemos filtrar la quotescolección para las cotizaciones del Maestro Yoda ajustando el nameque Yoda.
{
  name: 'Yoda'
}
El segundo parámetro, update, dice MongoDB qué hacer con la solicitud de actualización. Utiliza de MongoDB operadores de actualización como $set, $incy $push. Vamos a utilizar el $setoperador ya que estamos cambiando las frases de Yoda en las cotizaciones de Darth Vadar:
{
  $set: {
    name: req.body.name,
    quote: req.body.quote
  }
}
El tercer parámetro, options, es un parámetro opcional que le permite definir las cosas adicionales. Ya que estamos en busca de la última cita de Yoda, vamos a establecer sortdentro de las opciones a {_id: -1}. Esto permite MongoDB para buscar a través de la base de datos, a partir de la entrada más reciente.
{
  sort: {_id:-1}
}
Hay una posibilidad de que no hay citas de maestro Yoda en nuestra base de datos. MongoDB no hace nada por defecto cuando esto sucede. Podemos obligarlo a crear una nueva entrada si fijamos la upsertopción, lo que significa insertar (o guardar) si no se encuentran entradas, como true:
{
  sort: {_id: -1},
  upsert: true
}
El último parámetro es una función de devolución de llamada que le permite hacer algo una vez MongoDB ha sustituido a la cita final de Yoda con una cita de Darth Vader. En este caso, podemos enviar los resultados a la solicitud de obtención de información.
(err, result) => {
  if (err) return res.send(err)
  res.send(result)
}
Aquí está todo el findOneAndUpdatecomando que hemos escrito en los dos pasos anteriores:
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
Ahora, cada vez que alguien hace clic en el botón de actualización, el navegador enviará un PUT solicitud a través de Fetch a nuestro servidor Express. A continuación, el servidor responde enviando la cita cambia de nuevo a buscar. Entonces podemos manejar la respuesta dentro de encadenando fetchcon un thenmétodo. Esto es posible porque captación devuelve una promesa objeto.
La forma correcta de comprobar si zona de alcance resuelto con éxito es utilizar el okmétodo en el objeto respuesta. A continuación, puede return res.json(), si desea leer los datos que se envían desde el servidor:
fetch({ /* request * /  })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
})

Si está trabajando en una aplicación web de fantasía, esta es la parte en la que utiliza JavaScript para actualizar el DOM para que los usuarios puedan ver los nuevos cambios de forma inmediata. Actualizar el DOM está fuera del alcance de este artículo, por lo que sólo vamos a actualizar el navegador para ver los cambios.
fetch({ /* request * / })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
Eso es todo por el CREATE operación! Vamos a pasar a la final - BORRAR .
CRUD - BORRAR
El DELETE operación sólo puede ser activado a través de un DELETE petición. Es similar a la ACTUALIZACIÓN pedido, por lo que es simple si usted entiende lo que hemos hecho anteriormente.
Para esta parte, vamos a aprender a eliminar la primera cita de Darth Vader. Para hacerlo, primero tenemos que añadir un botón para el index.ejsarchivo.
<div>
  <h2>Delete Darth Vadar's first quote</h2>
  <button id="delete"> Delete first Darth Vadar quote </button>
</div>
A continuación, vamos a desencadenar una BORRAR solicitud a través de Fetch cada vez que se hace clic en el botón de borrar:
var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
A continuación, podemos controlar el evento en nuestro lado del servidor con el deletemétodo:
app.delete('/quotes', (req, res) => {
  // Handle delete event here
})
Eliminación de una entrada en MongoDB
MongoDB Colecciones vienen con un método llamado findOneAndDeleteque nos permite eliminar un elemento de la base de datos. Toma en tres parámetros - query, optionsy un callback. Estos parámetros son exactamente los mismos que los que se utilizó en findOneAndUpdatela hora de actualizar una entrada en MongoDB. La única diferencia aquí es que no hay upsertdentro options.
db.collections('quotes').findOneAndDelete(
  query,
  options,
  callback
)
Recuerde, estamos tratando de eliminar la primera cita de Darth Vader. Para ello, vamos a filtrar la quotescolección por el nombre, "Darth Vader". El queryparámetro es por lo tanto:
{
  name: req.body.name
}
Podemos omitir el optionsparámetro ya que no tenemos que invertir el orden de clasificación. Entonces, podemos enviar una copia de la respuesta a la solicitud Fetch en la función de devolución de llamada.
(err, result) => {
  if (err) return res.send(500, err)
  res.send('A darth vadar quote got deleted')
})
El código completo para el manejador de eliminación es la siguiente:
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})
Ahora, cada vez que alguien hace clic en el botón de borrar, el navegador enviará una BORRAR solicitud a través de Fetch a nuestro servidor Express. A continuación, el servidor responde enviando ya sea un error o un mensaje de vuelta.
Al igual que antes, podemos recargar la página web cuando la zona de alcance se ha completado con éxito.
fetch({ /* request * / })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
Eso es todo por el DELETE operación!
