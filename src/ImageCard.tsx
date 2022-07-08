import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ImageData } from './App'
import LikeAndShare from './likeandshare'

const ImageCard: FC<imageCardProps> = ({ image }) => {
    return (
        <article className='rounded-md overflow-hidden bg-white drop-shadow-lg'>
            <Link to={'/image/' + image.id} state={image}>
                <img src={image.url} className='w-full max-h-screen' alt={image.title} loading='lazy' />
            </Link>
            <div className='p-4 border border-stone-300 overflow-hidden'>
                <h2 className='font-bold text-lg my-2'>{image.title}</h2>
                <p className='mb-1'>{image.date.toLocaleDateString('en-CA')}</p>
                <p className='max-h-[4rem] overflow-hidden text-sm'>{image.description}</p>
                <LikeAndShare image={image} />
            </div>
        </article>
    )
}
export interface imageCardProps {
    image: ImageData
}

export default ImageCard
