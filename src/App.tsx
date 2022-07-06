import { FC, useEffect, useState } from 'react'

const API_NASA_IMAGE = 'https://images-api.nasa.gov'

interface ImageData {
    id: string
    date: Date
    url: string
    title: string
    description: string
}

const App: FC = () => {
    const [images, setImages] = useState<ImageData[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect((): void => {
        if (!images) {
            setIsLoading(true)
            fetch(API_NASA_IMAGE + '/asset/?orderby=popular')
                .then((res: Response): any => {
                    if (res.status === 200) {
                        return res.json()
                    } else throw 'error in api'
                })
                .then((json): void => {
                    if (json?.collection?.items) {
                        const imagesData = json.collection.items.map((item: any): ImageData => {
                            const image: ImageData = {
                                id: item?.data[0]?.nasa_id,
                                title: item?.data[0]?.title,
                                url: item?.links[0]?.href,
                                date: new Date(item?.data[0]?.date_created),
                                description: item?.data[0]?.description,
                            }
                            return image
                        })
                        setImages(imagesData)
                    }
                    setIsLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setIsLoading(false)
                })
        }
    }, [])
    return (
        <>
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
            {!images ? (
                isLoading ? (
                    <Loader />
                ) : (
                    <h2 className='flex items-center justify-center h-[calc(100vh-6rem)] bg-stone-200 pb-12'>
                        Something went wrong ( no images to show)
                    </h2>
                )
            ) : (
                <main className=' bg-stone-200 flex gap-4 p-4 pt-0 flex-col md:flex-row md:gap-8 w-screen'>
                    <section className='md:w-[calc(50%-1rem)] w-full'>
                        <ul className='flex flex-col gap-4'>
                            {images.slice(0, images.length / 2).map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </ul>
                    </section>
                    <section className='md:w-[calc(50%-1rem)] w-full'>
                        <ul className='flex flex-col gap-4'>
                            {images.slice(images.length / 2, images.length).map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </ul>
                    </section>
                </main>
            )}
        </>
    )
}

export default App

interface props {
    image: ImageData
}

const ImageCard: FC<props> = ({ image }) => (
    <li className='rounded-md overflow-hidden bg-white hover:scale-[1.03] transition-transform duration-500 drop-shadow-lg'>
        <img src={image.url} className='w-full max-h-screen' alt={image.title} loading='lazy' />
        <div className='p-4'>
            <h2 className='font-bold text-lg my-2'>{image.title}</h2>
            <p className='mb-1'>{image.date.toLocaleDateString('en-CA')}</p>
            <p className='max-h-[4rem] overflow-hidden text-sm'>{image.description}</p>
            <div className='flex justify-between mx-4 my-2'>
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

const Loader: FC = () => {
    return (
        <main className='flex items-center justify-center h-[calc(100vh-6rem)] bg-stone-200'>
            <div className=' animate-spin aspect-square h-24 border-8 border-t-stone-700 rounded-full mb-12'></div>
        </main>
    )
}
