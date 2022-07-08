import { FC, useEffect, useState } from 'react'
import Header from './Header'
import Loader from './Loader'
import ImageCard from './ImageCard'
import SearchFilterSidebar from './sidebarFilterSearch'
import { useFetchNASA } from './lib/fetchNASA'
import SearchItems from './SearchItems'

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
            <main className=' flex gap-4 pt-6 flex-col md:flex-row md:gap-8 w-screen px-56 '>
                <section className='w-[70%] flex flex-col gap-8'>
                    <SearchItems setQuery={setQuery} />
                    <Loader loading={loading}>
                        {finalImages.map(image => (
                            <ImageCard key={image.id} image={image} />
                        ))}
                    </Loader>
                </section>
                <section className='w-[30%]'>
                    <SearchFilterSidebar
                        query={query}
                        setQuery={setQuery}
                        setTime={setTime}
                        sort={sort}
                        setSort={setSort}
                    />
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
