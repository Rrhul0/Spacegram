import { FC, useEffect, useState } from 'react'
import Header from './Header'
import Loader, { loading } from './Loader'
import ImageCard from './ImageCard'
import SearchFilterSidebar from './sidebarFilterSearch'
import { useFetchNASA } from './lib/fetchNASA'

const App: FC = () => {
    const [query, setQuery] = useState<string>('')
    const [images, loading] = useFetchNASA(query)

    return (
        <>
            <Header />
            <main className=' bg-stone-200 flex gap-4 p-4 pt-0 flex-col md:flex-row md:gap-8 w-screen'>
                <section className='flex-1'>
                    <Loader loading={loading}>
                        <ul className='flex flex-col gap-4'>
                            {images.map(image => (
                                <ImageCard key={image.id} image={image} />
                            ))}
                        </ul>
                    </Loader>
                </section>
                <section className='basis-1/4'>
                    <SearchFilterSidebar setQuery={setQuery} />
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

export default App
