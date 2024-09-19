import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { ThemeProvider } from './components/providers/theme-provider'
import './styles/index.css'
import AuthProvider from './components/providers/auth-provider'
import { Toaster } from './components/ui/sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
		<BrowserRouter>
			<ThemeProvider defaultTheme='dark'>
				<AuthProvider>
					<App/>
					<Toaster position='bottom-right'/>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
)
