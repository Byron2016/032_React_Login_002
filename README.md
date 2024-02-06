<div>
	<div>
		<img src=https://raw.githubusercontent.com/Byron2016/00_forImages/main/images/Logo_01_00.png align=left alt=MyLogo width=200>
	</div>
	&nbsp;
	<div>
		<h1>032_React_Login_002</h1>
	</div>
</div>

&nbsp;

# Table of contents

---

- [Table of contents](#table-of-contents)
- [Project Description](#project-description)
- [Technologies used](#technologies-used)
- [References](#references)
- [Steps](#steps)

[⏪(Back to top)](#table-of-contents)

# Project Description

**032_React_Login_002** is a practice to build a **Login and register appliction with Mongo DB** React, HTLM, CSS, Nodejs following Youtube Vida MRR - Programacion web's tutorial [CURSO DE LOGIN y REGISTRO COMPLETO CON REACT](https://www.youtube.com/watch?v=q4ywr3eZmk0) and the other help that you can find into **Reference** section.

[⏪(Back to top)](#table-of-contents)
&nbsp;

# Technologies used

---

- [x] ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- [x] ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- [x] ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- [x] ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- [x] ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
- [x] ![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- [ ] ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

[⏪(Back to top)](#table-of-contents)

# References

- Vida MRR - Programacion web tutorial and Github repositories

  - [CURSO DE LOGIN y REGISTRO COMPLETO CON REACT](https://www.youtube.com/watch?v=q4ywr3eZmk0)
  - [ Github: marcosrivasr / auth-react-node](https://github.com/marcosrivasr/auth-react-node)

- Shields.io

  - [Shields.io](https://shields.io/)

  - [Github Ileriayo markdown-badges](https://github.com/Ileriayo/markdown-badges)

  - [Github Ileriayo markdown-badges WebSite](https://ileriayo.github.io/markdown-badges/)

[⏪(Back to top)](#table-of-contents)

# Steps

- **Front End**

  - **Install and Setup Vite React**

    ```bash
      pnpm create vite
    ```

        - Name: auth-front
        - Project: React
        - TypeScript Option: TypeScript + SWC
        - Finish configuration
        	- cd auth-front
        	- pnpm install
        	- pnpm run dev

    - **Add Routes Management**
      ```bash
        pnpm add react-router-dom
      ```
    - **Add eslint standard**

      ```bash
        pnpm add eslint -D
        npm init @eslint/config
      ```

      - How would you like to use ESLint? · style
      - What type of modules does your project use? · esm
      - Which framework does your project use? · react
      - Does your project use TypeScript? · Yes
      - Where does your code run? · browser
      - How would you like to define a style for your project? · guide
      - Which style guide do you want to follow? · standard-with-typescript
      - What format do you want your config file to be in? · JavaScript
      - Would you like to install them now? · Yes
      - Which package manager do you want to use? · pnpm

    - **Add Routes to main.tsx**
      (5.14 - 9.0)

      ```js
        import { createBrowserRouter, RouterProvider } from 'react-router-dom';

        const router = createBrowserRouter([
          {
            path: "/",
            element: <App/>,
          }
        ]);

        ReactDOM.createRoot(document.getElementById('root')   !).render(
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>,
        )
      ```

      - Create a new folder src/routes
        - Create new file Login.tsx
        - Create new file Signup.tsx
        - Create new file Dashboard.tsx
      - Add this new routes to the last routes that we created.

        ```js
          ....
          const router = createBrowserRouter([
            {
              path: "/dashboard",
              element: <Dashboard/>,
            }
          ]);

          ....
        ```

      - **Protected routes**
        (9.0 - 13.20)

        - Create a new folder src/routes

          - Create new file ProtectedRoute.tsx

          ```js
          /* Su única función será validar si el usaurio está autentificado, si no lo   está te     redirigirá */

          import { useState } from "react";
          import { Outlet, Navigate } from "react-router-dom";

          export default function ProtectedRoute() {
            const [isAuth, setIsAuth] = useState(false);

            return isAuth ? <Outlet /> : <Navigate to="/" />;
          }
          ```

        - Add this new routes to the last routes that we created.

          ```js
            ....
            const router = createBrowserRouter([
              ....
              {
                path: "/",
                element: <ProtectedRoute/>,
                children: [
                  {
                    path: "/dashboard",
                    element: <Dashboard/>,
                  }
                ]
              },
            ]);
            ....
          ```

    - **Add a Global State (A Context) for AuthProvider**
      (13.26 - 18.38)

      - Create an AuthProvider and a Context.

        - Create a new file in this route src/auth/AuthProvider.tsx

        ```js
        import { useContext, createContext, useState, useEffect } from "react";

        interface AuthProviderProps {
          children: React.ReactNode;
        }

        const AuthContext = createContext({
          isAuthenticated: false,
        });

        export function AuthProvider({ children }: AuthProviderProps) {
          const [isAuthenticated, setIsAuthenticated] = useState(false);

          return (
            <AuthContext.Provider value={{ isAuthenticated }}>
              {children}
            </AuthContext.Provider>
          );
        }
        /* Hook que nos permite acceder a las funciones de    nuestro useContext.*/
        export const useAuth = () => useContext(AuthContext);
        ```

      - Create a Hook that allow us access to our AuthProvider functions.

        ```js
          import { useContext, createContext, useState,     useEffect } from "react";

          ....

          export function AuthProvider({ children }:    AuthProviderProps) {
          ....
          /* Hook que nos permite acceder a las funciones de    nuestro useContext.*/
          export const useAuth = () => useContext(AuthContext);

        ```

        - Enable AuthProvider to main.tsx

          ```js
            ....
            import { AuthProvider } from './auth/ AuthProvider.  tsx'

            ....

            ReactDOM.createRoot(document.getElementById ('root') !).render(
              <React.StrictMode>
                <AuthProvider>
                  <RouterProvider router={router} />
                </AuthProvider>
              </React.StrictMode>,
            )
          ```

        - Use AuthContext into ProtectedRoute.tsx. We are going to use our Hook useAuth to have access to our AuthProbider's functions.

          ```js
          /* Su única función será validar si el usaurio  está     autentificado, si no lo está te   redirigirá */

          // import { useState } from "react"
          import { Outlet, Navigate } from "react-router-dom";
          import { useAuth } from "../auth/AuthProvider";

          export default function ProtectedRoute() {
            // const [isAuth, setIsAuth] = useState(false)
            const auth = useAuth();

            //return isAuth ? <Outlet /> : <Navigate to="/" / >
            return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
          }
          ```

    - **Add interface**
      (18.38 - 25.0)

      - Create a Default layout

        - Create a new file in this route src/layout/DefaultLayout.tsx

          ```js
          import { Link } from "react-router-dom";

          interface DefaultLayoutProps {
            children?: React.ReactNode;
          }
          export default function DefaultLayout({
            children,
          }: DefaultLayoutProps) {
            return (
              <>
                <header>
                  <nav>
                    <ul>
                      <li>
                        <Link to="/">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup">Signup</Link>
                      </li>
                    </ul>
                  </nav>
                </header>

                <main>{children}</main>
              </>
            );
          }
          ```

      - Update Login and Signup to use a Default layout

        ```js
        import { useState } from "react";
        import DefaultLayout from "../layout/DefaultLayout";

        export default function Login() {
          const [username, setUsername] = useState("");
          const [password, setPassword] = useState("");

          return (
            <DefaultLayout>
              <form className="form">
                <h1>Login</h1>
                <label>UserName</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>
              </form>
            </DefaultLayout>
          );
        }
        ```

    - **Validate protected routes for Login and Signup**
      (25.0 - 27.56)

      - If you are already autenticated, you don´t need to go to login or signup pages, you must be redirect to your principal page.

      - Form 1: With Navigate of React-router-dom

        ```js
          ....
          import { useAuth } from "../auth/AuthProvider";
          import { Navigate } from "react-router-dom";

          export default function Login(){
            ....

            const auth = useAuth()

            if(auth.isAuthenticated){
              /* si ya está autentificado se va directo al        dashboard. */
              return <Navigate to="/dashboard"/>
            }

            ....
          }
        ```

- **Back-End**

  - **Install and Setup Vite React**
    (28.05)

    ```bash
      mkdir auth-back
      cd auth-back
      pnpm init
      echo  "node_modules" > .gitignore
    ```

        - Name: auth-back
        - Project: React
        - TypeScript Option: TypeScript + SWC
        - Finish configuration
        	- cd auth-back
        	- pnpm install
        	- pnpm run dev

    - **Add eslint standard and prettier**

      ```bash
        pnpm add eslint -D
        npm init @eslint/config
        pnpm add eeslint-config-prettier -D
        pnpm add prettier -D
      ```

      - How would you like to use ESLint? · style
      - What type of modules does your project use? · esm
      - Which framework does your project use? · react
      - Does your project use TypeScript? · No
      - Where does your code run? · node
      - How would you like to define a style for your project? · guide
      - Which style guide do you want to follow? · standard
      - What format do you want your config file to be in? · JavaScript
      - Would you like to install them now? · Yes
      - Which package manager do you want to use? · pnpm

    - **Add some modules to out back-end project**

      - Server: expres
      - cors
      - Encriptation: bcrypt
      - Enviroment variables: dotenv
      - Tokens: jsonwebtoken
      - DB: mongoose
      - nodemon

      ```bash
        pnpm add express cors bcrypt dotenv jsonwebtoken  mongoose
        pnpm add nodemon -D
      ```

  - **Add a server**
    (30.10 - 31.33)

    ```js
    const express = require("express");
    const cors = require("cors");
    const app = express();
    const mongoose = require("mongoose");

    require("dotenv").config();

    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello World!!");
    });

    app.listen(port, () => {
      console.log(
        `Server is running on port: $ {port}. http://localhost:${port}/`
      );
    });
    ```

    ```bash
      pnpx nodemon app
    ```

  - **Add new routes**
    (31.33 - 34.50)

    - Create new files for each route

      - src/routes/login.js
      - src/routes/refreshToken.js
      - src/routes/signout.js
      - src/routes/signup.js
      - src/routes/todos.js
      - src/routes/user.js

      ```js
      const router = require("express").Router();

      router.get("/", (req, res) => {
        res.send("login");
      });

      module.exports = router;
      ```

    - Use the new routes in app.js.

      ```js
        ....
        app.use(express.json())

        app.use('/api/signup', require('./routes/signup'))
        app.use('/api/login', require('./routes/login'))
        app.use('/api/user', require('./routes/user'))
        app.use('/api/todos', require('./routes/todos'))
        app.use('/api/refresh-token', require('./routes/refreshToken'))
        app.use('/api/signout', require('./routes/signout'))
        ....
      ```

  - **Users' register flow**
    (34.50 - 55.45)

    - **Unified responses**
      (34.50)

      - Create new file into this path src/lib/ jsonResponse.js
        (35.20 - 36.20)

        ```js
        exports.jsonResponse = function (statuscode, body) {
          return {
            statuscode,
            body,
          };
        };
        ```

      - Use jsonResponse into signup and login (routes) route (Do the same for login route).

        - For: back-end: signup
          (36.20 - 38.50)

          ```js
          // signup
          const { jsonResponse } = require("../lib/jsonResponse");

          const router = require("express").Router();

          router.post("/", (req, res) => {
            const { username, name, password } = req.body;

            if (!username || !name || !password) {
              return res.status(400).json(
                jsonResponse(400, {
                  error: "Fields are required",
                })
              );
            }

            // crear usuario.
            res.status(200).json(
              jsonResponse(200, {
                message: "User created successfully",
              })
            );
          });

          module.exports = router;
          ```

        - For: back-end: Login
          (51.54 - 54.50)

          ```js
          // login
          const router = require("express").Router();

          const { jsonResponse } = require("../lib/jsonResponse");

          router.post("/", (req, res) => {
            const { username, password } = req.body;

            if (!username || !password) {
              return res.status(400).json(
                jsonResponse(400, {
                  error: "Fields are required",
                })
              );
            }

            // autentificar usuario.
            const accessToken = "access_token";
            const refreshToken = "refresh_token";
            const user = {
              id: "1",
              name: "John Doe",
              username: "JohnDoe",
            };

            res.status(200).json(
              jsonResponse(200, {
                user,
                accessToken,
                refreshToken,
              })
            );
          });

          module.exports = router;
          ```

- **Front-End:**

  - **Call and use Back-End**
    (38.50)

    - Create a new constats file: src/auth/authConstants.ts with API URL
      (39.50)

      ```js
      export const API_URL = "http://localhost:5000/api";
      ```

    - Create types: into this path "src/types/types.ts" with API URL
      (44.50 - 46.18)

      ```js
      export interface AuthResponse {
        body: {
          user: User,
          accessToken: string,
          refreshToken: string,
        };
      }

      export interface AuthResponseError {
        body: {
          error: string,
        };
      }

      export interface User {
        _id: string;
        name: string;
        username: string;
      }
      ```

    - Modifyed Signup and Login files to event on form´s submit
      (38.50 - 49.53)

      - front-end: Signup

        ```js
          ....
          import { Navigate, useNavigate } from "react-router-dom";
          import { API_URL } from "../auth/constants";
          import type { AuthResponseError } from "../types/types";

          export default function Signup(){
            ....
            const [errorResponse, setErrorResponse] = useState("")

            const auth = useAuth()

            const goTo = useNavigate()

            if(auth.isAuthenticated){
              /* si ya está autentificado se va directo al dashboard. */
              return <Navigate to="/dashboard"/>
            }

            async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
              e.preventDefault();
              try {
                const response = await fetch(`${API_URL}/signup`,{
                  method:"POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name,
                    username,
                    password,
                  })
                });

                if(response.ok){
                  console.log("User created successfully");
                  setErrorResponse("")
                  goTo("/")
                } else {
                  console.log("Something weng wrong");
                  const json = await response.json() as AuthResponseError
                  setErrorResponse(json.body.error)
                  return
                }
              } catch (error) {
                console.log(error)
              }
            }

            return (
              <DefaultLayout>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    ....
                </form>
              </DefaultLayout>
            )
          }
        ```

      - front-end: Login
        (49.53 - 51.54)

        ```js
          ....
          import { Navigate, useNavigate } from "react-router-dom";
          import { API_URL } from "../auth/constants";
          import type { AuthResponseError } from "../types/types";

          export default function Login(){
            ....
            const [errorResponse, setErrorResponse] = useState("")

            const auth = useAuth()

            const goTo = useNavigate()

            if(auth.isAuthenticated){
              /* si ya está autentificado se va directo al dashboard. */
              return <Navigate to="/dashboard"/>
            }

            async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
              e.preventDefault();
              try {
                const response = await fetch(`${API_URL}/login`,{
                  method:"POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username,
                    password,
                  })
                });

                if(response.ok){
                  console.log("User login successfully");
                  setErrorResponse("")
                  goTo("/")
                } else {
                  console.log("Something weng wrong");
                  const json = await response.json() as AuthResponseError
                  setErrorResponse(json.body.error)
                  return
                }
              } catch (error) {
                console.log(error)
              }
            }

            return (
              <DefaultLayout>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    ....
                </form>
              </DefaultLayout>
            )
          }
        ```

- **MongoDB**

  - **Configuration**
    (55.45 - 59.18)

    - Go to this URL: [MongoDB Atlas](https://www.mongodb.com/es/ cloud/atlas/lp/try4?utm_ad_campaign_id=19647047924& adgroup=148795219147&cq_cmp=19647047924&gad_source=1)
    - Press: Visit MongoDB Atlas
      - Database: Create a Database / Build your Database
      - Free
      - Credentias:
        - Username
        - Password
      - Deploy Database
      - Press Connect button
        - Select connect to Cluster
          - Select your driver and version
            - Driver: Node.js
            - Version: 5.5 or later
          - Install your driver
            - It is recomended to use mongodb, we are using mongose
          - Add your connection string into your application
            - Copy this connection string.

  - **Conect Back-End to MongoDB**
    (59.18 - 1.01.59)

    - In **auth-back** Create a new .env file.
      ```js
      DB_CONNECTION_STRING = myDBConnectionString;
      ACCESS_TOKEN_SECRET = myAccessToken;
      REFRESH_TOKEN_SECRET = myRefreshToken;
      ```
    - To generate secure Tokens (1.02.20), you can go to [Online UUID Generator](https://www.uuidgenerator.net/)

- **Back-End**

  - **Generate a new conection**
    (1.01.59 - 1.03.08)

    - Into App.js create a new function.

      ```js
        ....
        app.use(express.json())

        async function main () {
          await mongoose.connect(process.env.DB_CONNECTION_STRING)
          console.log('Connected to MongoDB')
        }

        main().catch(console.error)

        app.use('/api/signup', require('./routes/signup'))
        ....
      ```

      You will see into **Terminal** a message: Connected to MongoDB
