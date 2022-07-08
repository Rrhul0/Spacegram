import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import LikeAndShare from './likeandshare'

const FullScreen: FC = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!state) {
            navigate('/', { replace: true })
        }
    }, [])

    if (!state) return <></>
    return (
        <div>
            <Header />
            <main className='flex mx-52 mt-6 rounded-md overflow-hidden gap-6 border pb-6 h-[calc(100vh-8rem)]'>
                <div className='flex-1'>
                    <div className='bg-stone-800/75  flex items-center justify-center h-[calc(100%-4rem)]'>
                        <img className='max-w-full max-h-full' src={state.url} alt={state.title} />
                    </div>
                    <h1 className='mt-4 font-bold text-lg mx-2'>{state.title}</h1>
                </div>
                <div className='flex-1 pt-2 pr-2'>
                    <p className='leading-7'>{state.description}</p>
                    <p className='mt-4 leading-8 font-bold'>{state.date.toLocaleDateString('en-CA')}</p>
                    <LikeAndShare image={state} />
                </div>
            </main>
        </div>
    )
}
interface LocationState {
    from: {
        pathname: string
    }
}

export default FullScreen
