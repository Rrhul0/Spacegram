import { useEffect, useState } from 'react'
import { loading } from '../Loader'
import { ImageData } from '../App'

export const API_NASA_IMAGE = 'https://images-api.nasa.gov'

export function useFetchNASA(query: string): [ImageData[], loading] {
    const [images, setImages] = useState<ImageData[]>([])
    const [isLoading, setIsLoading] = useState<loading>(false)

    useEffect(() => {
        setIsLoading(true)

        const controller = new AbortController()
        let endpoint = API_NASA_IMAGE + `/search?q=${query}&media_type=image`
        if (query === '') endpoint = API_NASA_IMAGE + '/asset/?orderby=popular'
        fetch(endpoint, { signal: controller.signal })
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
                if (e instanceof DOMException) return
                setIsLoading('error')
            })
        return (): void => {
            controller.abort()
        }
    }, [query])
    return [images, isLoading]
}
