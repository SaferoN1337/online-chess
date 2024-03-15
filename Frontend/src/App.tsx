import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Game from './pages/Game/GamePage.tsx';
import MainPage from './pages/Main/MainPage.tsx';

const router = createBrowserRouter([
    { path: "/game/*", element: <Game /> },
    { path: "/", element: <MainPage /> }
]);

export default function App() {

    return (
        <>
            <div>header</div>
            <main id='main'>
                <RouterProvider router={router} />
            </main>
            <div>footer</div>
        </>
    )
}