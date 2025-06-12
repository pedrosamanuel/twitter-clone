# Twitter clone

Este proyecto es una API REST construida con TypeScript, Express y Node.js que utiliza Sequelize como ORM para manejar una base de datos PostgreSQL.

---

## Tecnologías utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Descripción

Esta API permite manejar usuarios, posts y likes con funcionalidades de autenticación basada en JWT y manejo de cookies HTTP-only para mayor seguridad.

---

## Funcionalidades y Endpoints

### Autenticación

- `POST /register`  
  Registro de un nuevo usuario.  
  **Request body:** `{ "username": "string", "password": "string" }`  
  **Respuesta:** Usuario creado (id y username).

- `POST /login`  
  Inicio de sesión que retorna un JWT en cookie HTTP-only.  
  **Request body:** `{ "username": "string", "password": "string" }`  
  **Respuesta:** Mensaje de login exitoso y datos del usuario.

- `POST /logout`  
  Cierra sesión borrando la cookie del token JWT.  
  **Respuesta:** Mensaje de logout exitoso.

---

### Posts

- `GET /posts`
-   **Requiere autenticación.**  
  Obtiene todos los posts con sus likes incluidos.

- `GET /posts/:id`
-   **Requiere autenticación.**  
  Obtiene un post específico por ID con sus likes.

- `POST /posts`  
  Crea un nuevo post.  
  **Requiere autenticación.**  
  **Request body:** `{"content": "string" }` 
  **Respuesta:** Post creado.

- `PUT /posts/:id`  
  Actualiza un post existente.  
  **Requiere autenticación y ser dueño del post.**  
  **Request body:** `{"content": "string" }` 
  **Respuesta:** Post actualizado.

- `DELETE /posts/:id`  
  Elimina un post.  
  **Requiere autenticación y ser dueño del post.**  
  **Respuesta:** Post eliminado.

---

### Likes

- `POST /likes`  
  Agrega un like a un post.  
  **Requiere autenticación.**  
  **Request body:** `{ "postId": number }`  
  **Respuesta:** Like creado. No permite dar like más de una vez al mismo post.

- `DELETE /likes/:id`  
  Quita un like.  
  **Requiere autenticación y ser dueño del like.**  
  **Respuesta:** Like eliminado.

---

