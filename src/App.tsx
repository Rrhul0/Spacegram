import { FC, useEffect, useState } from 'react'

const API_NASA_IMAGE = 'https://images-api.nasa.gov'

interface ImageData {
    date: Date
    url: string
    title: string
    collection: string
    description: string
}

const App: FC = () => {
    const [images, setImages] = useState<Array<ImageData> | null>(null)
    useEffect(() => {
        if (!images) {
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
                                title: item.data[0].title,
                                url: item.links[0].href,
                                date: new Date(item.data[0].date_created),
                                collection: item.href,
                                description: item.data[0].description,
                            }
                            return image
                        })
                        setImages(imagesData)
                    }
                })
        }
    })
    if (!images) return <></>
    return (
        <>
            <header className='className= bg-stone-200 p-4'>
                <h1 className='font-bold text-3xl'>Spacegram</h1>
                <h3 className='text-stone-600 '>Brought to you by NASA's image API</h3>
            </header>
            <main className=' bg-stone-200 flex gap-8 p-4 flex-col md:flex-row'>
                <section className='flex flex-col gap-4 flex-1'>
                    {images.slice(0, images.length / 2).map(image => (
                        <ImageDiv image={image} />
                    ))}
                </section>
                <section className='flex flex-col gap-4 flex-1'>
                    {images.slice(images.length / 2, images.length).map(image => (
                        <ImageDiv image={image} />
                    ))}
                </section>
            </main>
        </>
    )
}

export default App

interface props {
    image: ImageData
}

const ImageDiv: FC<props> = ({ image }) => {
    console.log(image.date.toLocaleDateString('en-CA'))
    return (
        <div className='rounded-md overflow-hidden bg-white hover:scale-[1.01] transition-transform'>
            <img src={image.url} className='w-full' />
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
                        }}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            style={{ fill: 'transparent' }}
                            className='h-8 aspect-square hover:scale-125'
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
                        onClick={e => {
                            const link = e.currentTarget.querySelector('input')?.value
                            navigator.clipboard.writeText(link || '')
                        }}>
                        <input type='hidden' value={image.url} />
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-8 w-8 hover:scale-125'
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
                    </button>
                </div>
            </div>
        </div>
    )
}
