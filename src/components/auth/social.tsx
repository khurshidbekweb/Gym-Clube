import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import FillLoading from '../shared/fill-loading'
import { auth } from '@/firebase'

const Social = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const onGoogle = () => {
		setIsLoading(true)
		try {
			const googleProvider = new GoogleAuthProvider()
			signInWithPopup(auth, googleProvider) 
			navigate('/')
		} catch (error) {
			console.log(error);
		} finally{
			setIsLoading(false)
		}
	}
	
	const onGitHub = () => {
		setIsLoading(true)
		try {
			const gitHUbProvider = new GithubAuthProvider()
			signInWithPopup(auth, gitHUbProvider) 
			navigate('/')
		} catch (error) {
			console.log(error);
		} finally{
			setIsLoading(false)
		}
	}
 
	return (
		<>
		{isLoading && <FillLoading/>}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-2'>
				<Button className='h-12' variant={'secondary'} onClick={onGitHub}>
					<FaGithub className='mr-2' />
					<span>Sign in with Github</span>
				</Button>
				<Button className='h-12' variant={'destructive'} onClick={onGoogle}>
					<FaGoogle className='mr-2' />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
