import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { POSTApiRequest } from './apiRequest.ts';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks.ts';
import { setAccessToken } from './redux/slices/usersSlice.ts';
import { IAccessTokenData } from '../../types.ts';
import Header from './components/Header/Header.tsx';
import Game from './pages/Game/GamePage.tsx';
import MainPage from './pages/Main/MainPage.tsx';
import Footer from './components/Footer/Footer.tsx';

const router = createBrowserRouter([{
    element: (
        <>
            <Header />
            <main id="main">
                <Outlet />
            </main>
            <Footer />
        </>
    ),
    children: [
        { path: "/game/*", element: <Game /> },
        { path: "/", element: <MainPage /> }
    ]
}]);

export default function App() {
    const dispatch = useAppDispatch();
    const timeLeft = useAppSelector(state => state.users.accessTokenExpiration);
    const accessToken = useAppSelector(state => state.users.accessToken);

    async function refreshTokens(signal: AbortSignal) {
        const response = await POSTApiRequest<undefined, IAccessTokenData>("/refresh-session", undefined, signal);

        if (response.result === "success") {
            console.log(response.data);
            dispatch(setAccessToken(response.data));
        } else {
            dispatch(setAccessToken({ accessToken: null, accessTokenExpiration: 0 }));
            console.log(response.message);
        }
    }

    useEffect(() => {
        if (timeLeft <= 0) return;
        const abortController = new AbortController();

        const accessTokenExpirationTimeout = setTimeout(() => {
            refreshTokens(abortController.signal);
        }, timeLeft - 10000);

        return () => {
            abortController.abort();
            clearTimeout(accessTokenExpirationTimeout);
        }
    }, [accessToken, timeLeft]);

    useEffect(() => {
        const abortController = new AbortController();
        refreshTokens(abortController.signal);
        return () => {
            abortController.abort();
        }
    }, []);

    return (<RouterProvider router={router} />)
}