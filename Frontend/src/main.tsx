import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Game from './pages/Game/GamePage.tsx';
import MainPage from './pages/Main/MainPage.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    { path: "/game/*", element: <Game /> },
    { path: "/", element: <MainPage /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <div>header</div>
            <main id='main'>
                <RouterProvider router={router} />
            </main>
            <div>footer</div>
        </Provider>
    </React.StrictMode>,
)