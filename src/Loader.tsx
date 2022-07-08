import { FC, ReactNode } from 'react'

const Loader: FC<loaderProps> = ({ loading, children }) => {
    if (!loading) return <>{children}</>
    else {
        if (loading === 'error') return <h2>Something went wrong</h2>
        else
            return (
                <main className='flex items-center justify-center h-[calc(100vh-2rem)] rounded-md bg-stone-100'>
                    <div className=' animate-spin aspect-square h-24 border-8 border-t-stone-700 rounded-full mb-12'></div>
                </main>
            )
    }
}

interface loaderProps {
    loading: loading
    children: ReactNode
}

export type loading = boolean | 'error'

export default Loader
