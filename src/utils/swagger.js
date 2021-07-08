const swaggerOptions = {
    definition: 
    {
      "openapi": "3.0.0",
      "info": {
        "title": "Primer SPRINT",
        "description": "Aplicación para que las personas se registren, inicien sesión y pidan los productos que deseen del restaurante",
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": "http://localhost:5000",
          "description": "Servidor local"
        }
      ],
      "tags": [
        {
          "name": "Usuarios",
          "description": "Todos los usuarios del sistema"
        },
        {
          "name": "Productos",
          "description": "Todos los productos del sistema"
        },
        {
          "name": "Pedidos",
          "description": "Todos los pedidos de los usuarios"
        },
        {
          "name": "MediosDePago",
          "description": "Todos los medios de pago del sistema"
        }
      ],
      "paths": {
        "/Usuarios": {
          "get": {
            "tags": [
              "Usuarios"
            ],
            "summary": "Todos los usuarios del sistema",
            "description": "Todos los usuarios registrados en el sistema",
            "responses": {
              "200": {
                "description": "Devuelve los usuarios",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Usuario"
                    }
                  }
                }
              }
            }
          }
        },
        "/registro": {
          "post": {
            "tags": [
              "Usuarios"
            ],
            "summary": "Para crear nuevos usuarios en el sistema",
            "description": "Crear usuarios",
            "security": [],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Usuario"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Usuario creado con exito"
              },
              "204": {
                "description": "Faltan datos"
              },
              "400": {
                "description": "El correo ya esta registrado"
              }
            }
          }
        },
        "/Login": {
          "post": {
            "tags": [
              "Usuarios"
            ],
            "summary": "Para que los usuarios inicien sesión",
            "description": "Iniciar sesión",
            "parameters": [
              {
                "in": "query",
                "name": "correo",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "h@gmail.com"
                }
              },
              {
                "in": "query",
                "name": "contraseña",
                "required": true,
                "schema": {
                  "type": "string",
                  "example": "2222"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Sesión iniciada con exito"
              },
              "204": {
                "description": "Usuario no encontrado, Faltan datos"
              }
            }
          }
        },
        "/Productos": {
          "get": {
            "tags": [
              "Productos"
            ],
            "summary": "Ver todos los productos del sistema",
            "description": "Ver los productos registrados en el sistema",
            "responses": {
              "200": {
                "description": "Devuelve los productos",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Producto"
                    }
                  }
                }
              }
            }
          }
        },
        "/nuevos": {
          "post": {
            "tags": [
              "Productos"
            ],
            "summary": "Para que los administradores creen productos en el sistema",
            "description": "Crear nuevos productos",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Producto"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Producto creado con exito"
              },
              "204": {
                "description": "Faltan datos"
              },
              "400": {
                "description": "El producto ya existe"
              }
            }
          }
        },
        "/{id}": {
          "put": {
            "tags": [
              "Productos"
            ],
            "summary": "Para que los administradores editen productos en el sistema",
            "description": "Para editar propiedades de los productos existentes",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Producto"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Producto editado con exito"
              },
              "204": {
                "description": "No se ha encontrado el producto, Faltan datos por llenar"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        },
        "/Eliminar/{id}": {
          "delete": {
            "tags": [
              "Productos"
            ],
            "summary": "Para que los administradores eliminen productos del sistema",
            "description": "Para eliminar alguno de los productos existentes",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "description": "Identificador del producto",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Producto eliminado"
              },
              "204": {
                "description": "Faltan datos"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        },
        "/Pedidos": {
          "get": {
            "tags": [
              "Pedidos"
            ],
            "summary": "Para que los administradores vean todos los pedidos del sistema",
            "description": "Los administradores podrán ver todos los pedidos registrados en el sistema",
            "responses": {
              "200": {
                "description": "Devuelve los pedidos"
              },
              "204": {
                "description": "No hay pedidos para mostrar"
              },
              "401": {
                "description": "No eres administrador",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pedido"
                    }
                  }
                }
              }
            }
          }
        },
        "/historial/{id}": {
          "get": {
            "tags": [
              "Pedidos"
            ],
            "summary": "Para que los usuarios vean todos los pedidos que han hecho",
            "description": "Los usuarios podrán ver todos los pedidos realizados en el sistema",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "description": "Identificador del producto",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Devuelve los pedidos hechos por los usuarios según su id"
              },
              "204": {
                "description": "No hay pedidos para mostrar"
              }
            }
          }
        },
        "/CrearPedido/{id}": {
          "post": {
            "tags": [
              "Pedidos"
            ],
            "summary": "Para que los usuarios creen sus pedidos en el sistema",
            "description": "Crear pedidos",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "description": "Identificador del usuario",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pedido"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Pedido creado con exito"
              },
              "204": {
                "description": "Faltan datos"
              }
            }
          }
        },
        "/EditarPedido/{id}": {
          "put": {
            "tags": [
              "Pedidos"
            ],
            "summary": "Para que los usuarios editen pedidos mientras no los hayan confirmado",
            "description": "Para editar propiedades de los pedidos existentes",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Pedido"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Pedido editado con exito"
              },
              "204": {
                "description": "No se encontro el pedido, no hay suficientes datos"
              },
              "400": {
                "description": "El estado del pedido es \"cerrado\", no se puede editar el pedido"
              }
            }
          }
        },
        "/EstadoPedido/{id}": {
          "put": {
            "tags": [
              "Pedidos"
            ],
            "summary": "Para que los administradores cambien estados de los pedidos",
            "description": "Para cambiar los estados de los pedidos",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Estado"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Pedido editado con exito"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        },
        "/MediosDePago": {
          "get": {
            "tags": [
              "MediosDePago"
            ],
            "summary": "Para que los administradores vean todos los medios de pago del sistema",
            "description": "Para que los administradores vean los medios de pago registrados en el sistema",
            "responses": {
              "200": {
                "description": "Devuelve los medios de pago"
              },
              "401": {
                "description": "No eres administrador",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/MedioDePago"
                    }
                  }
                }
              }
            }
          },
          "post": {
            "tags": [
              "MediosDePago"
            ],
            "summary": "Para que los administradores creen medios de pago en el sistema",
            "description": "Crear nuevos medios de pago",
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MedioDePago"
                  }
                }
              }
            },
            "responses": {
              "201": {
                "description": "Medio de pago creado con exito"
              },
              "204": {
                "description": "Faltan datos"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        },
        "/EditarMedioDePago/{id}": {
          "put": {
            "tags": [
              "MediosDePago"
            ],
            "summary": "Para que los administradores editen los medios de pago que hay en el sistema",
            "description": "Para editar propiedades de los medios de pago existentes",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MedioDePago"
                  }
                }
              }
            },
            "responses": {
              "200": {
                "description": "Medio de pago editado con exito"
              },
              "204": {
                "description": "Faltan datos"
              },
              "400": {
                "description": "No se encontro el id"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        },
        "/EliminarMedioDePago/{id}": {
          "delete": {
            "tags": [
              "MediosDePago"
            ],
            "summary": "Para que los administradores eliminen productos del sistema",
            "description": "Para eliminar alguno de los medios de pago existentes",
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "description": "Identificador del producto",
                "required": true,
                "schema": {
                  "type": "number",
                  "example": 1
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Medio de pago eliminado"
              },
              "401": {
                "description": "No eres administrador"
              }
            }
          }
        }
      },
      "security": [
        {
          "basicAuth": []
        }
      ],
      "components": {
        "securitySchemes": {
          "basicAuth": {
            "type": "http",
            "scheme": "basic"
          }
        },
        "schemas": {
          "Usuario": {
            "type": "object",
            "required": [
              "user",
              "nombre",
              "apellido",
              "correo",
              "telefono",
              "direccion",
              "contraseña"
            ],
            "properties": {
              "user": {
                "type": "string"
              },
              "nombre": {
                "type": "string"
              },
              "apellido": {
                "type": "string"
              },
              "correo": {
                "type": "string"
              },
              "telefono": {
                "type": "number"
              },
              "direccion": {
                "type": "string"
              },
              "contraseña": {
                "type": "string"
              }
            }
          },
          "Producto": {
            "type": "object",
            "required": [
              "nombre",
              "precio"
            ],
            "properties": {
              "nombre": {
                "type": "string"
              },
              "precio": {
                "type": "number"
              }
            }
          },
          "MedioDePago": {
            "type": "object",
            "required": [
              "nombre"
            ],
            "properties": {
              "nombre": {
                "type": "string",
                "example": "TARJETA"
              }
            }
          },
          "Pedido": {
            "type": "object",
            "required": [
              "nombres",
              "cantidades",
              "medio de pago",
              "estado"
            ],
            "properties": {
              "nombres": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/nombres"
                }
              },
              "cantidades": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/cantidades"
                }
              },
              "medio de pago": {
                "type": "string",
                "example": "Efectivo"
              },
              "estado": {
                "type": "string",
                "example": "Abierto"
              }
            }
          },
          "nombres": {
            "type": "object",
            "required": [
              "nombre"
            ],
            "properties": {
              "nombres": {
                "type": "string",
                "example": [
                  "Hamburguesa",
                  "Coca-cola"
                ]
              }
            }
          },
          "cantidades": {
            "type": "object",
            "required": [
              "cantidad"
            ],
            "properties": {
              "numeros": {
                "type": "number",
                "example": [
                  3,
                  2
                ]
              }
            }
          },
          "Estado": {
            "type": "object",
            "required": [
              "mediodepago"
            ],
            "properties": {
              "nombre": {
                "type": "string",
                "example": "Enviado"
              }
            }
          }
        }
      }
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
