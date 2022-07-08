import { FC } from 'react'

const SearchItems: FC<props> = ({ setQuery }) => {
    function onClickItem(e: React.MouseEvent<HTMLLIElement>) {
        if (e.currentTarget.textContent) setQuery(e.currentTarget.textContent)
    }

    return (
        <ul className='flex gap-2 border border-stone-200 p-3 rounded-md flex-nowrap overflow-x-scroll justify-start '>
            <li className='py-1.5 px-4'>Quick Search: </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200'>
                <button>Earth</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-2 rounded-full bg-stone-200'>
                <button>Moon</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-2 rounded-full bg-stone-200'>
                <button>Space</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-2 rounded-full bg-stone-200'>
                <button>Mars</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-2 rounded-full bg-stone-200'>
                <button>Space station</button>
            </li>
        </ul>
    )
}

interface props {
    setQuery: React.Dispatch<string>
}

export default SearchItems
