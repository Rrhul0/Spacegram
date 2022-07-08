import { FC } from 'react'
import { ImageData } from './App'

const ImageCard: FC<props> = ({ image }) => (
    <li className='rounded-md overflow-hidden bg-white drop-shadow-lg'>
        <img src={image.url} className='w-full max-h-screen' alt={image.title} loading='lazy' />
        <div className='p-4 border border-stone-300 overflow-hidden'>
            <h2 className='font-bold text-lg my-2'>{image.title}</h2>
            <p className='mb-1'>{image.date.toLocaleDateString('en-CA')}</p>
            <p className='max-h-[4rem] overflow-hidden text-sm'>{image.description}</p>
            <div className='flex justify-between mx-4 my-2 '>
                <button
                    className='text-red-500'
                    onClick={e => {
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) {
                            if (svg.style.fill === 'transparent') svg.style.fill = 'currentColor'
                            else svg.style.fill = 'transparent'
                        }
                    }}
                    data-message='This is from the like button'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        style={{ fill: 'transparent' }}
                        className='h-8 aspect-square hover:scale-125 active:scale-[2] transition-transform duration-200'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                        />
                    </svg>
                </button>
                <button
                    data-message='This is from the share button'
                    className='group relative'
                    onClick={e => {
                        const link = e.currentTarget.querySelector('input')?.value
                        navigator.clipboard.writeText(link || '')
                    }}>
                    <input type='hidden' value={image.url} />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-8 w-8 hover:scale-125 active:scale-[2] transition-transform duration-200'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                        />
                    </svg>
                    <p className='hidden absolute -top-6 -left-4 w-max group-hover:block text-xs bg-stone-300 bg-opacity-50 rounded-md px-1 py-0.5'>
                        Copy Link!
                    </p>
                </button>
            </div>
        </div>
    </li>
)

interface props {
    image: ImageData
}

export default ImageCard
