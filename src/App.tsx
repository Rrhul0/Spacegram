import { FC, useEffect, useState } from 'react'
import Header from './Header'
import Loader, { loading } from './Loader'
import ImageCard from './ImageCard'

const API_NASA_IMAGE = 'https://images-api.nasa.gov'

const App: FC = () => {
    const [images, setImages] = useState<ImageData[]>([])
    const [isLoading, setIsLoading] = useState<loading>(false)
    const [query, setQuery] = useState<string>('')

    useEffect((): void => {
        if (!images.length) {
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
                        console.log(imagesData)
                        setImages(imagesData)
                    }
                    setIsLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setIsLoading('error')
                })
        }
    }, [])
    return (
        <>
            <Header />
            <Loader loading={isLoading}>
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
            </Loader>
        </>
    )
}

export interface ImageData {
    id: string
    date: Date
    url: string
    title: string
    description: string
}

export default App
