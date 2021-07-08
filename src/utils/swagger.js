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
                "description": "Ok",
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
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Usuario creado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "El correo ya esta en uso"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Sesión iniciada con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
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
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Producto creado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "El producto ya fue creado"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "La edición fue un exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Producto eliminado correctamente"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pedido"
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pedidoxid"
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
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
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Pedido creado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
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
              "200": {
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Pedido editado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad Request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "El estado de su pedido es cerrado, no puede ser editado"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/estadoPedido/{id}": {
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Estado editado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/MedioDePago"
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
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
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Pedido creado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No Content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Medio de pago editado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "204": {
                "description": "No content",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "Faltan datos"
                        }
                      }
                    }
                  }
                }
              },
              "400": {
                "description": "Bad request",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Pedido editado con exito"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
                "description": "Ok",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "msg": {
                          "type": "string",
                          "example": "Medio de pago eliminado correctamente"
                        }
                      }
                    }
                  }
                }
              },
              "401": {
                "description": "Unauthorized",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "err": {
                          "type": "string",
                          "example": "No eres administrador"
                        }
                      }
                    }
                  }
                }
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
              "usuario",
              "nombre",
              "apellido",
              "correo",
              "telefono",
              "direccion",
              "contraseña"
            ],
            "properties": {
              "usuario": {
                "type": "string",
                "example": "J"
              },
              "nombre": {
                "type": "string",
                "example": "Jaao"
              },
              "apellido": {
                "type": "string",
                "example": "A"
              },
              "correo": {
                "type": "string",
                "example": "j@gmail.com"
              },
              "telefono": {
                "type": "number",
                "example": 311111
              },
              "direccion": {
                "type": "string",
                "example": "Hospital"
              },
              "contraseña": {
                "type": "string",
                "example": "111111"
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
                "type": "string",
                "example": "Cerveza"
              },
              "precio": {
                "type": "number",
                "example": 4000
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
              "identificador",
              "nombres",
              "cantidades",
              "medio de pago",
              "estado"
            ],
            "properties": {
              "identificador": {
                "type": "number",
                "example": 1
              },
              "nombres": {
                "type": "array",
                "items": {},
                "example": [
                  "Hamburguesa",
                  "Coca-cola"
                ]
              },
              "cantidades": {
                "type": "array",
                "items": {},
                "example": [
                  3,
                  2
                ]
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
          "Pedidoxid": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Pedido"
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
