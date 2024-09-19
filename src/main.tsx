import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { ThemeProvider } from './components/providers/theme-provider'
import './styles/index.css'
import AuthProvider from './components/providers/auth-provider'
import { Toaster } from './components/ui/sonner'

import {	QueryClient,
	QueryClientProvider,
  } from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme='dark'>
					<AuthProvider>
						<App/>
						<Toaster position='bottom-right'/>
					</AuthProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
)
