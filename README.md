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

- **Install and Setup Vite React**

  - **Front End**

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
