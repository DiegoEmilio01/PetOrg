# <font size="7">[**PetOrg**](https://pet-org.herokuapp.com/)</font>


## <font size="5">**Contenido**</font>

- [About](#about)
- [Documentación PetOrg](#documentacion)
    - [Arquitectura](#arquitectura)
    - [Modelo de datos](#model)
    - [Funcionalidades y detalles](#funcionalidades)
    - [API](#api)
        - [Rutas públicas](#publicas)
        - [Rutas privadas](#privadas)
- [Entregas](#entregas)
    - [Entrega 2](#entrega2)
    - [Entrega 3](#entrega3)
    - [Entrega 4](#entrega4)
    - [Entrega 5](#entrega5)
    - [Entrega 6](#entrega6)
- [Documentación PetOrg Console](#documentacion-console)

<div id='about'/>

## <font size="5">**About**</font>

Proyecto para el curso [Tecnologías y Aplicaciones WEB](https://github.com/IIC2513-2020-2/syllabus) del grupo デルラブ (DEL Labs).


| Profesor            | Ayudante      | Estudiantes
| -------------       | ------------- | -------------
| [Sebastián Vicencio](https://github.com/sivicencio)  | [Jorge Becerra](https://github.com/JorgeBdelaT) | [Lucas Muñoz](https://github.com/Luckbox314)
|                     |               | [Elías Sabja](https://github.com/EliasSabja)
|                     |               |[Diego Bustamante](https://github.com/DiegoEmilio01)

### <font size="4">Deploy</font>

- La [Aplicación](https://pet-org.herokuapp.com/) se encuentra corriendo en Heroku.


### <font size="4">Credenciales en seed</font>

- Usuario: diego@uc.cl - Contraseña: 'admin'

- Coordinador: diegobustama@uc.cl - Contraseña: 'admin'

<div id='documentacion'/>

## <font size="5">**Documentación PetOrg**</font>

<div id='arquitectura'/>

### <font size="4">Arquitectura</font>

- La arquitectura de [PetOrg](https://pet-org.herokuapp.com/) consiste en un monolito con deployment en [Heroku](https://www.heroku.com/). El monolito está construído sobre el framework [Koa](https://koajs.com/).

- La base de datos corresponde a un modelo relacional utilizando [PostgreSQL](https://www.postgresql.org/).

- Las fotos están almacenadas en una base de datos alojada en un servicio externo llamado [Cloudinary](https://cloudinary.com/).

- Una [API](#api) cuyas rutas están especidicadas en esta documentación.

<div id='model'/>

### <font size="4">Modelo de datos</font>

- El diagrama entidad relación actualizado se encuentra en [docs/ER_Model.pdf](docs/ER_Model.pdf) (click para ir).

<div id='funcionalidades'/>

### <font size="4">Funcionalidades y detalles</font>

- Todos los CRUD del modelo implementados. Con sus validaciones respectivas (a nivel de ORM y client-side). Además, todas las relaciones que hacen posibles las funcionalidades y una semilla básica para la aplicación.

- Toda la lógica de sesiones implementada. Se permite multidispositivo.

- Se contruye un framework *CSS* propio de la aplicación. Este está separado de las vistas.

- El flujo de la aplicación no es complejo. Por eso, tanto el coordinador como los usuarios pueden acceder a todo mediante un dropdown menu.

- El dorpdown menu, los filtros y el carrito de compra están implementados en *React JS*. Estos componentes están en carpetas aparte (`assets/js`).

- Se implementan fotos persistentes en la aplicación. Se utiliza el servicio externo *Cloudinary*. La imagen por default es el logo de la aplicación. Los modelos que tienen fotos son: `Pet`, `Product`, `Newsitem` y `Event`.

- Se implementaron guards en todas las vistas (estos están en su propio archivo en `routes/guards.js`). Botones, links y otras acciones se manejan en las vistas para que no puedan ser alcanzadas si no corresponde. Las vistas incluyen un mensaje de error cuando un guard se activa.

- Se implementa mensajería por correos. Se utiliza el servicio externo *SendGrid*. Estos poseen un estilo propio.

- Se integran íconos en las vistas desde `Font Awesome`.

- Se implementó el consumo de una API externa. La app en cuestión es: [Cat Facts](https://cat-fact.herokuapp.com/#/). En las vistas aparecera un dato freak aleatorio de los más votados de la aplicación.

- Un usuario no registrado puede:

    - Visitar mascotas, eventos, noticias, productos y reportes.

    - En reportes: crear un reporte anónimo.

    - Crear un nuevo usuario.

- Un usuario registrado puede:

    - Visitar mascotas, eventos, noticias, productos, reportes y perfil.

    - En mascotas: adoptar o apadrinar una mascota.

    - En eventos: inscribir su asistencia en un evento futuro.

    - En noticias: leer el detalle de una noticia.

    - En productos: añadir productos a un carrito y luego comprarlos.

    - En reportes: crear un nuevo reporte.

    - En perfil: editar el perfil y ver sus mascotas adoptadas y/o apadrinadas. Además, se puede hacer un seguimiento de las mascotas adoptadas para que los coordinadores vean que se le está tratando bien.

- Un coordinador:

    - Visitar coordinadores, usuarios, mascotas, eventos, noticias, productos, reportes, animales, cargos y perfil.

    - En su página principal puede ver los últimos 10 recursos agregados a la aplicación y las noticias que ha creado.

    - En coordinadores: crear, editar y borrar otros coordinadores. Además, ver las noticias creadas y los reportes cerrados por un coordinador particular.

    - En usuarios: editar y borrar usuarios.

    - En mascotas: crear, editar y borrar mascotas.

    - En eventos: crear, editar y borrar eventos.

    - En noticias: crear, editar y borrar noticias.

    - En productos: crear, editar y borrar productos.
    
    - En reportes: crear, cerrar y borrar reportes.

    - En animales: crear, editar y borrar animales.

    - En cargos: crear, editar y borrar cargos.

    - En perfil: un coordinador puede ver sus datos. Además, ver su noticias creadas y los reportes cerrados.

<div id='api'/>

### <font size="4">API</font>

- La API permite acceder externamente a distintos recursos de la aplicación. 

- Todos los endpoint tienen el prefijo `/api/`.

- Los endpoints que se ofrecen son:

    <div id='publicas'/>

    ### <font size="4">*Rutas públicas*</font>
    
    ### <font size="3">Sign</font>

    - `sign/up`
        - Método: `POST`
        - Recibe datos de un usuario en formato `JSON` a través del body y lo registra en la base de datos.
        - Input:
        ```
        {
            "name": "Juan",
            "email": "juan1@uc.cl",
            "adress": "Vicuña Mackenna 2323",
            "password": "juan123uc"
        }
        ```
        - Output:
        ```
        {
            "message": "User has been created successfully",
            "success": "true"
        }
        ```

    - `sign/in-user`
        - Método: `POST`
        - Recibe email y contraseña de un usuario y hace login en el contexto.
        - Input:
        ```
        {
            "email": "juan1@uc.cl",
            "password": "juan123uc"
        }
        ```
        - Output:
        ```
        {
            "message": "Bienvenid@ Juan",
            "success": "true"
        }
        ```

    - `sign/in-coord`
        - Método: `POST`
        - Recibe email y contraseña de un coordinador y hace login en el contexto.
        - Input:
        ```
        {
            "email": "elias.sabja@uc.cl",
            "password": "admin"
        }
        ```
        - Output:
        ```
        {
            "message": "Bienvenid@ Elías Sabja",
            "success": "true"
        }   
        ```
    ### <font size="3">Auth</font>

    - `auth`
        - Método: `POST`
        - Recibe los datos de ingreso del usuario (email, contraseña) en formato `JSON` y retorna un token que permite acceder a las rutas protegidas de la api. 
        - Input:
        ```
        {,
            "email": "juan1@uc.cl",
            "password": "juan123uc"
        }
        ```
        - Output:
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJyb2xlIjoidXNlciIsImlhdCI6MTYwNjgzNzczNn0.yf8DundGgJcT75Vys7YO1mqfzdQQ-ao4ifwgO62xJUE"
        }
        ```
    ### <font size="3">Pets</font>
    - `pets`
        - Método: `GET`
        - Retorna una lista de todas las mascotas que hay en PetOrg con sus respectivos dueños (si es que tienen).
        - Output:
        ```
        [
            {
                "name": "Cachupín",
                "age": 3,
                "sex": "h",
                "size": "S",
                "description": "Perrito que le gusta mucho la naturaleza.",
                "user": null,
                "animal": {
                    "animal": "Perro"
                }
            },
            {
                "name": "Cholito",
                "age": 8,
                "sex": "m",
                "size": "L",
                "description": "Cholito fue encontrado en el campus SJ. Es muy amigable y hambriento.",
                "user": {
                    "email": "lucas@uc.cl",
                    "name": "Lucas",
                    "adress": "Pasaje Animales 314",
                    "is_volunteer": false,
                    "money": 150000
                },
                "animal": {
                    "animal": "Perro"
                }
            }
        ]
        ```
    
    <div id='privadas'/>
    
    ### <font size="4">*Rutas privadas*</font>

    - Para ingresar a las rutas privadas se debe utilizar el token obtenido de `auth`. Este se debe agregar al header `Authorization` del request con valor `'Bearer token'`, reemplazando el token correspondiente.
    - Cabe decir también que para utilizar rutas de creación, actualización y eliminación, se requiere el `token` de un coordinador (no basta el del usuario).
    ### <font size="3">Newsitems (noticias)</font>
    - `newsitems`
        - Método: `GET`
        - Retorna las noticias publicadas en PetOrg.
        - Output:
        ```
        {
            "newsitems": [
                {
                    "title": "Cantidad de paseos adecuada para perros",
                    "content": "Segun un estudio de la Pontificia Universidad Catolica de Chile, el numero optimo de paseos para perros es de dos veces al dia",
                    "date": "2020-05-21",
                    "photo": null,
                    "coordinator": {
                        "name": "DEL Labs",
                        "email": "del@uc.cl",
                        "job": {
                            "name": "CEO",
                            "description": "Jefe de la organización"
                        }
                    }
                },
                {
                    "title": "Plastico en oceanos mata a las tortugas",
                    "content": "Hoy nuevamente aparece una tortuga muerta con plastico en los pulmones, ya es la numero cien que aparece este mes",
                    "date": "2020-08-19",
                    "photo": null,
                    "coordinator": {
                        "name": "DEL Labs",
                        "email": "del@uc.cl",
                        "job": {
                            "name": "CEO",
                            "description": "Jefe de la organización"
                        }
                    }
                }
            ]
        }
        ```
    - `newsitems/:id`
        - Método: `GET`
        - Retorna la noticia con id respectivo.
        - Output:
        ```
        {
            "newsitem": {
                "title": "Cantidad de paseos adecuada para perros",
                "content": "Segun un estudio de la Pontificia Universidad Catolica de Chile, el numero optimo de paseos para perros es de dos veces al dia",
                "date": "2020-05-21",
                "photo": null,
                "coordinator": {
                    "name": "DEL Labs",
                    "email": "del@uc.cl",
                    "job": {
                        "name": "CEO",
                        "description": "Jefe de la organización"
                    }
                }
            }
        }
        ```
    - `newsitems`
        - Método: `POST`
        - Recibe los atributos de una noticia en formato `JSON` y la agrega a la base de datos.
        - Input:
        ```
        {
            "title": "Patos en peligro de extinción",
            "content": "Según estudios de terreno la población de patos a nivel mundial va decayendo exponencialmente, llevando a esta especie a estar en peligro de extinción.",
            "date": "2020-02-02"
        }
        ```
        - Output:
        ```
        {
            "message": "Noticia creado exitosamente!",
            "success": "true"
        }
        ```
    - `newsitems/:id`
        - Método: `PATCH`
        - Recibe los atributos que se deseen actualizar de una noticia de id respectivo en formato `JSON` y se lleva el cambio a la base de datos.
        - Input:
        ```
        {
            "title": "Patos en posible peligro",
        }
        ```
        - Output:
        ```
        {
            "message": "Noticia editada exitosamente!",
            "success": "true"
        }
        ```
    - `newsitems/:id`
        - Método: `DELETE`
        - Elimina la noticia del id respectivo.
        - Output:
        ```
        {
            "message": "Noticia eliminada exitosamente",
            "success": "true"
        }
        ```
    ### <font size="3">Newsitems (noticias)</font>
    - `newsitems`
        - Método: `GET`
        - Retorna las noticias publicadas en PetOrg.
        - Output:
        ```
        {
            "newsitems": [
                {
                    "title": "Cantidad de paseos adecuada para perros",
                    "content": "Segun un estudio de la Pontificia Universidad Catolica de Chile, el numero optimo de paseos para perros es de dos veces al dia",
                    "date": "2020-05-21",
                    "photo": null,
                    "coordinator": {
                        "name": "DEL Labs",
                        "email": "del@uc.cl",
                        "job": {
                            "name": "CEO",
                            "description": "Jefe de la organización"
                        }
                    }
                },
                {
                    "title": "Plastico en oceanos mata a las tortugas",
                    "content": "Hoy nuevamente aparece una tortuga muerta con plastico en los pulmones, ya es la numero cien que aparece este mes",
                    "date": "2020-08-19",
                    "photo": null,
                    "coordinator": {
                        "name": "DEL Labs",
                        "email": "del@uc.cl",
                        "job": {
                            "name": "CEO",
                            "description": "Jefe de la organización"
                        }
                    }
                }
            ]
        }
        ```
    - `newsitems/:id`
        - Método: `GET`
        - Retorna la noticia con id respectivo.
        - Output:
        ```
        {
            "newsitem": {
                "title": "Cantidad de paseos adecuada para perros",
                "content": "Segun un estudio de la Pontificia Universidad Catolica de Chile, el numero optimo de paseos para perros es de dos veces al dia",
                "date": "2020-05-21",
                "photo": null,
                "coordinator": {
                    "name": "DEL Labs",
                    "email": "del@uc.cl",
                    "job": {
                        "name": "CEO",
                        "description": "Jefe de la organización"
                    }
                }
            }
        }
        ```
    - `newsitems`
        - Método: `POST`
        - Recibe los atributos de una noticia en formato `JSON` y la agrega a la base de datos.
        - Input:
        ```
        {
            "title": "Patos en peligro de extinción",
            "content": "Según estudios de terreno la población de patos a nivel mundial va decayendo exponencialmente, llevando a esta especie a estar en peligro de extinción.",
            "date": "2020-02-02"
        }
        ```
        - Output:
        ```
        {
            "message": "Noticia creado exitosamente!",
            "success": "true"
        }
        ```
    - `newsitems/:id`
        - Método: `PATCH`
        - Recibe los atributos que se deseen actualizar de una noticia del id respectivo en formato `JSON` y se lleva el cambio a la base de datos.
        - Input:
        ```
        {
            "title": "Patos en posible peligro",
        }
        ```
        - Output:
        ```
        {
            "message": "Noticia editada exitosamente!",
            "success": "true"
        }
        ```
    - `newsitems/:id`
        - Método: `DELETE`
        - Elimina la noticia del id respectivo.
        - Output:
        ```
        {
            "message": "Noticia eliminada exitosamente",
            "success": "true"
        }
        ```
    ### <font size="3">Products</font>
    - `products`
        - Método: `GET`
        - Retorna todos los productos publicados en PetOrg.
        - Output:
        ```
        {
            "products": [
                {
                    "id": 3,
                    "name": "Peine para gatos",
                    "used": false,
                    "price": 3000,
                    "stock": 0,
                    "description": "Peine especial para remover el exceso de pelos de tu gato.",
                    "photo": null,
                    "path": "/api/products/3",
                    "photoPath": null
                },
                {
                    "id": 5,
                    "name": "Destructor Láser",
                    "used": false,
                    "price": 100000,
                    "stock": 4,
                    "description": "Es el increíble destructor láser 3000.",
                    "photo": null,
                    "path": "/api/products/5",
                    "photoPath": null
                }
            ]
        }
        ```
    - `products/:id`
        - Método: `GET`
        - Retorna el producto con id respectivo.
        - Output:
        ```
        {
            "product": {
                "id": 3,
                "name": "Peine para gatos",
                "used": false,
                "price": 3000,
                "stock": 0,
                "description": "Peine especial para remover el exceso de pelos de tu gato.",
                "photo": null
            }
        }
        ```
    - `products`
        - Método: `POST`
        - Recibe los atributos de un producto en formato `JSON` y lo agrega a la base de datos.
        - Input:
        ```
        {
            "name": "Peine para patos",
            "used": "false",
            "price": "2000",
            "stock": "10",
            "description": "Peine especial para remover el exceso de pelos de tu pato."
        }
        ```
        - Output:
        ```
        {
            "message": "Producto creado exitosamente!",
            "success": "true"
        }
        ```
    - `products/:id`
        - Método: `PATCH`
        - Recibe los atributos que se deseen actualizar de un producto del id respectivo en formato `JSON` y se lleva el cambio a la base de datos.
        - Input:
        ```
        {
            "name": "Peine para patitos",
        }
        ```
        - Output:
        ```
        {
            "message": "Producto editado exitosamente",
            "success": "true"
        }
        ```
    - `products/:id`
        - Método: `DELETE`
        - Elimina el producto del id respectivo.
        - Output:
        ```
        {
            "message": "Producto eliminado exitosamente",
            "success": "true"
        }
        ```
    ### <font size="3">Events</font>
    - `events`
        - Método: `GET`
        - Retorna todos los eventos publicados en PetOrg.
        - Output:
        ```
        {
            "events": [
                {
                    "name": "Búsqueda de mascotas heridas",
                    "location": "Cerca de la PUC",
                    "start_hour": "15:00:00",
                    "end_hour": "18:00:00",
                    "description": "Nos reuniremos a buscar mascotas heridas cerca de la universidad para ayudarlas.",
                    "date": "2022-04-10"
                },
                {
                    "name": "Venta de completos",
                    "location": "En la PUC",
                    "start_hour": "12:30:00",
                    "end_hour": "15:00:00",
                    "description": "Estaremos vendiendo completos en la universidad para recaudar fondos.",
                    "date": "2022-04-12"
                }
            ]
        }
        ```
    - `events/:id`
        - Método: `GET`
        - Retorna el evento con id respectivo.
        - Output:
        ```
        {
            "event": {
                "name": "Sesión de adopción uwu",
                "location": "La casa del Diego",
                "start_hour": "14:00:00",
                "end_hour": "17:00:00",
                "description": "Vamos a estar con unos perritos bien bonitos para que los vayan a adoptar uwu.",
                "date": "2022-04-05"
            }
        }
        ```
    - `events`
        - Método: `POST`
        - Recibe los atributos de un evento en formato `JSON` y lo agrega a la base de datos.
        - Input:
        ```
        {
            "name": "Bailatón de mascotas",
            "location": "Vicuña Mackenna 2222",
            "start_hour": "13:00:00",
            "end_hour": "15:00:00",
            "description": "Oportunidad para un baile masivo de mascotas.",
            "date": "2021-04-10" 
        }
        ```
        - Output:
        ```
        {
            "message": "Evento creado exitosamente!",
            "success": "true"
        }
        ```
    - `events/:id`
        - Método: `PATCH`
        - Recibe los atributos que se deseen actualizar de un evento del id respectivo en formato `JSON` y se lleva el cambio a la base de datos.
        - Input:
        ```
        {
            "name": "Bailatón masiva de mascotas"
        }
        ```
        - Output:
        ```
        {
            "message": "Evento editado exitosamente!",
            "success": "true"
        }
        ```
    - `events/:id`
        - Método: `DELETE`
        - Elimina el evento del id respectivo.
        - Output:
        ```
        {
            "message": "Evento eliminado exitosamente",
            "success": "true"
        }
        ```

<div id='entregas'/>

## <font size="5">**Entregas**</font>

<div id='entrega2'/>

### <font size="4">Entrega 2</font>

#### <font size="3">1. Base de datos</font>

- Se hicieron cambios en el [diagrama](https://github.com/IIC2513-2020-2/grupo-dellabs/blob/master/docs/entrega1/DiagramaER.pdf) para mejorar el diseño de la aplicación.


#### <font size="3">2. Desarrollo</font>

- Se implementaron los siguientes *modelos*: ```Coordinator```, ```Event```, ```Newsitem```, ```Pet```, ```Product```, ```Report``` y ```User```. El modelo ```Notificaciones``` no se implementa porque no se cree necesario. ```User``` representa a los usuarios más externos de la aplicación porque comparten muchos atributos. Que el usuario sea o no un voluntario se diferencia mediante un atributo. ```Coordinator``` representa a los usuarios que organizan la aplicación. Con el atributo ```job``` se diferenciará si es un organizador de eventos, un coordinador de la organización, un super admin de la aplicación, etc.

- Se implementaron todas las *validaciones* necesarias. Tanto a nivel de ORM como a nivel de cliente mediante la utilización de tags.

- Se implementaron las siguientes *relaciones* principales: ```adopts_a```, ```publishes_a``` y ```closes_a```. La primera se puede crear (modificar) desde el ```edit.html.ejs``` de una mascota y la segunda desde las vistas ```new.html.ejs``` y ```edit.html.ejs``` de una noticia.

- Se implementaron *seeds* para cada modelo de la aplicación. Algunas aplican relaciones.

- Se implementó CSS básico en la mayoría de las vistas.

- Extra: Se implementó un índice en la página principal para acceder a los CRUD fácilmente.

<div id='entrega3'/>

### <font size="4">Entrega 3</font>

- Se implementaron los siguientes *modelos*: ```Animal```, ```Job``` y ```Sponsorship```. El primero es el tipo de las mascotas y el segundo son los diferentes roles que tendrán los coordinadores de la aplicación. Además, se agregaron algunos atributos extra en algunos modelos.

- Se implementó sesiones de usuario. Esto también considera inicio en múltiples dispositivos.

- Se implementó un flujo inicial que permitía acceder a los recursos.

- Se implementaron clases CSS en todas las vistas para poder tener un layout inicial. Junto con esto se implementó el primer mini framework CSS.

- Se implementaron las funcionalidades: apadrinar una mascota, adoptar una mascota, participar en evento y registro e ingreso de usuario.

- Se implementó una página principal sólo para el coordinador. Ahora, puede acceder fácilmente a los recursos.

- Extra: se implementó un menú de navegación tanto para el coordinador como para los usuarios en el header.

<div id='entrega4'/>

### <font size="4">Entrega 4</font>

- Se avanzó en múltiples funcionalidades. Se arreglaron bugs. En el caso del estado de los eventos se añadio un mensaje lógico en las vistas. El coordinador puede ver los recursos añadidos por él. Esto se encuentra en la segunda sección de su página principal (por ahora sólo quedan registrados los eventos).

- Para lograr lo anterior se implementaron los siguientes *modelos* (relaciones): ```Assistanceitem``` y ```Order```.

- Se implementan fotos persistentes en la aplicación. Se utiliza el servicio externo Cloudinary. Por ahora, la imagen por default es siempre el logo de la aplicación.

- Se implementaron guards en todas las vistas según si la persona ha iniciado sesión como usuario, coordinador o no ha iniciado. Botones, links y otras acciones se manejan en las vistas para que no puedan ser alcanzadas si no corresponde.

-  Mensajería por correos implementada.

- Se implementaron tarjetas para todas las entidades con foto. Esto se aprecia en la página principal del coordinador y en los index de mascotas y productos.

- En la página principal el coordinador puede acceder a los últimos 5 recursos creados en la aplicación. Puede ir directamente a las listas de los recursos o al detalle del recurso si lo desea.

- Extra: se modificó el header para que tenga un menú desplegable con todos los recursos a los que pueden acceder los usuarios. Además, se implementaron algunas prácticas responsive para que se vea mejor en celular y en computador.

<div id='entrega5'/>

### <font size="4">Entrega 5</font>

- Se implementaron las compras con dinero y el stock se actualiza. Esta funcionalidad debe ser probada por usuarios logueados. Para tener más dinero se debe visitar el perfil y presionar el botón `Agregar dinero`. Luego, se puede ir a la sección de productos a comprar. Al añadir un producto al carrito se añade unitarianmente. Para comprar más de una unidad se debe realizar la accion varias veces (el producto se stackea). El carrito está implementado con `React`.

- Se distribuyeron los guards en su propia carpeta. Pero, no se logró incluir un mensaje de error en las vistas.

- Se implementó el Dropdown menu con `React`. Este se puede abrir o cerrar con la tecla `Esc` o cerrar presionando fuera del menú cuando está abierto.

- Se implementó parcialmente los filtros con `React`. El Dropdown que permite elegir entre atributos (nombre, tamaño o edad) ordena las mascotas.

- Se agregó estilo a los mail.

- Se mejoró el footer y la vista principal del coordinador. Sin embargo, no se pudo avanzar notablemente en todas las vistas.

- No se implementó el seguimiento de las mascotas adoptadas.

<div id='entrega6'/>

### <font size="4">Entrega 6</font>

- Se implementaron mensajes de error en los guards.

- La tecla `ESC` ahora sólo cierra el menú desplegable.

- Se implementan tarjetas en más indexes. En particular, los eventos se separan los que ya ocurrieron de los que no.

- Se implementó el consumo de una API externa. La app en cuestión es: [Cat Facts](https://cat-fact.herokuapp.com/#/). En las vistas aparecera un dato freak aleatorio de los más votados de la aplicación.

- Se perfeccionó el carrito:
    - Botón sólo para usuarios.
    - Sacar el botón de comprar en productos.
    - El stock disminuye en vivo.
    - Se muestra un mensaje de éxito al agregar al un producto al carrito y al pagar por el carrito.

- Se implementó una API con las rutas mínimas solicitadas. Más en la [Documentación de la API](#api).

- Se generó una [Documentación](#documentacion) de PetOrg y la API que expone.

- Se implementó el carrito de compras con todo lo solicitado.

- Se implementó el seguimiento de mascotas adoptadas.

- Se arregla la vista de los filtros de mascotas y se arregla el filtro de búsqueda por nombre.

- Se mejoró el diseño y disposición de algunas vistas, pero no se pudo introducir muchos cambios.

- Se implementa una aplicación que consume la API que exponemos. Esta aplicación se llama PetOrg Console y sus detalles se pueden encontrar en [Documentación de PetOrg Console](#documentacion-console).

- Extra: se solucionaron detalles de lógica en las vistas como que el coordinador no pueda crear usuarios, que pueda ir directamente a su perfil y no pueda editar reportes.

- Detalles: durante esta entrega descrubrimos algunos detalles que mejorar a futuro, pero que no están dentro de las funcionalidades que debíamos implementar. Entre ellos están: que el usuario pueda ver los eventos en los que es asistente. Cambiar un atributo del modelo `User` (`adress` por `address`). Actualizar el mailer para que envíe un mail por compra y no por producto. Y que las sesiones sean por token.


<div id='documentacion-console'/>

## <font size="5">**Documentación PetOrg Console**</font>

**IMPORTANTE**: avisar a los estudiantes para correr esta app porque mantener la instancia cuesta dinero.

- La arquitectura de [PetOrg Console](http://54.226.191.233:3000/) consiste en un frontend en [React JS](https://es.reactjs.org/) con deployment en [AWS EC2](https://aws.amazon.com/ec2).

- La aplicación es una vista de PetOrg, pero en consola, que consume de los endpoints que exponemos en PetOrg.

- Para usarla se deben correr comandos en la consola que ofrece la vista.

- Lista de comandos permitidos:

    - `get pets`: este comando consume mediante el método `GET` el endpoint `/api/pets` de PetOrg. Retorna en la vista una lista con las mascotas de la aplicación.


