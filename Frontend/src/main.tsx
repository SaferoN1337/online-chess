import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode >
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)