import { RefObject, useEffect, useRef, useState } from 'react'
import { loading } from '../Loader'
import { ImageData, time } from '../App'

export const API_NASA_IMAGE = 'https://images-api.nasa.gov'

export function useFetchNASA(query: string, time: time | null): [ImageData[], loading] {
    const [images, setImages] = useState<ImageData[]>([])
    const [isLoading, setIsLoading] = useState<loading>(false)

    useEffect(() => {
        setIsLoading(true)

        const controller = new AbortController()
        if (!query) query = 'earth moon space'

        let endpoint = API_NASA_IMAGE + `/search?q=${query}&media_type=image`
        const year_start = time?.start
        const year_end = time?.end
        if (year_start) endpoint += '&year_start=' + year_start
        if (year_end) endpoint += '&year_end=' + year_end

        fetch(endpoint, { signal: controller.signal })
            .then((res: Response): any => {
                if (res.status === 200) {
                    return res.json()
                } else throw 'error in api'
            })
            .then((json): void => {
                if (json?.collection?.items) {
                    const imagesData: ImageData[] = json.collection.items.map((item: any): ImageData => {
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
                if (e instanceof DOMException) return
                setIsLoading('error')
            })
        return (): void => {
            controller.abort()
        }
    }, [query, time])

    return [images, isLoading]
}

export function useLike(image: ImageData, likeSvgRef: RefObject<SVGSVGElement>): [VoidFunction] {
    const [liked, setLiked] = useState(false)
    // const likeSvgRef = useRef<SVGSVGElement>(likeRef)

    useEffect(() => {
        if (!likeSvgRef.current) return
        const value = localStorage.getItem(image.id)
        if (value === '1') {
            setLiked(true)
            likeSvgRef.current.style.fill = 'currentColor'
        }
    }, [])

    function onClickLike() {
        if (!likeSvgRef.current) return
        if (!liked) {
            likeSvgRef.current.style.fill = 'currentColor'
            setLiked(true)
            localStorage.setItem(image.id, '1')
        } else {
            likeSvgRef.current.style.fill = 'transparent'
            setLiked(false)
            localStorage.removeItem(image.id)
        }
    }
    return [onClickLike]
}
