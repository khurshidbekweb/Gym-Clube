import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Auth from './pages/auth'
import Home from './pages/home'

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
			</Routes>
		</>
	)
}

export default App
