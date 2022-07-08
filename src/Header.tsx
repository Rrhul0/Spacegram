import { FC } from 'react'

const Header: FC = () => {
    return (
        <header className='bg-stone-200 p-4 flex justify-between'>
            <div>
                <h1 className='font-bold text-3xl'>Spacegram</h1>
                <p className='text-stone-600 text-lg'>Brought to you by NASA's image API</p>
            </div>
            <a
                target='_blank'
                href='https://github.com/Rrhul0/Spacegram'
                className='flex gap-1 items-center hover:text-purple-500 text-lg'>
                GitHub
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    className='text-stone-500'
                    viewBox='0 0 100 100'
                    width='15'
                    height='15'>
                    <path
                        fill='currentColor'
                        d='M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z'></path>
                    <polygon
                        fill='currentColor'
                        points='45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9'></polygon>
                </svg>
            </a>
        </header>
    )
}

export default Header