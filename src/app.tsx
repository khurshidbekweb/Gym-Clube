import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import Auth from './pages/auth'
import Home from './pages/home'
import Gym from './pages/gym'

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/gym' element={<Gym/>}/>
			</Routes>
		</>
	)
}

export default App
