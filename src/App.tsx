import { FC, useEffect, useState } from 'react'
import Header from './Header'
import Loader from './Loader'
import ImageCard from './ImageCard'
import SearchFilterSidebar from './sidebarFilterSearch'
import { useFetchNASA } from './lib/fetchNASA'

const App: FC = () => {
    const [query, setQuery] = useState('')
    const [time, setTime] = useState<null | time>(null)
    const [sort, setSort] = useState<sort>(null)
    const [images, loading] = useFetchNASA(query, time)
    const [finalImages, setFinalImages] = useState(images)

    useEffect(() => {
        if (sort === 'latest') {
            setFinalImages(images.slice().sort((a, b) => b.date.getTime() - a.date.getTime()))
        } else setFinalImages(images)
    }, [sort, images])

    return (
        <>
            <Header />
            <main className=' bg-stone-200 flex gap-4 p-4 pt-0 flex-col md:flex-row md:gap-8 w-screen'>
                <section className='flex-1'>
                    <Loader loading={loading}>
                        <ul className='flex flex-col gap-4'>
                            {finalImages.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </ul>
                    </Loader>
                </section>
                <section className='basis-1/4 px-10 pt-5'>
                    <SearchFilterSidebar setQuery={setQuery} setTime={setTime} sort={sort} setSort={setSort} />
                </section>
            </main>
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
export interface time {
    start: number
    end: number
}
export type sort = null | 'latest' | 'popular'

export default App
