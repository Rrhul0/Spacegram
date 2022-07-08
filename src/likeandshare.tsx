import { FC, useRef } from 'react'
import { imageCardProps } from './ImageCard'
import { useLike } from './lib/hooks'
const LikeAndShare: FC<imageCardProps> = ({ image }) => {
    const likeSvgRef = useRef<SVGSVGElement>(null)
    const [onClickLike] = useLike(image, likeSvgRef)
    return (
        <div className='flex justify-between my-2 items-center'>
            <button className='text-red-500' onClick={onClickLike} data-message='This is from the like button'>
                <svg
                    ref={likeSvgRef}
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
                className='group relative flex gap-1 '
                onClick={e => {
                    const link = e.currentTarget.querySelector('input')?.value
                    navigator.clipboard.writeText(link || '')
                    const p = e.currentTarget.querySelector('p')
                    if (p) {
                        p.textContent = 'Copied'
                        setTimeout(() => {
                            p.textContent = 'Copy'
                        }, 2000)
                    }
                }}>
                <input type='hidden' value={image.url} />
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 group-hover:hidden group-active:hidden'
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
                <p className='hidden group-hover:block'>Copy</p>
            </button>
        </div>
    )
}

export default LikeAndShare
