import { FC } from 'react'

const SearchItems: FC<props> = ({ setQuery }) => {
    function onClickItem(e: React.MouseEvent<HTMLLIElement>) {
        if (e.currentTarget.textContent) setQuery(e.currentTarget.textContent)
    }

    return (
        <ul className='flex gap-3 border border-stone-200 p-3 rounded-md flex-nowrap overflow-x-scroll justify-start h-16'>
            <li className='py-1.5 px-2 flex-shrink-0'>Quick Search: </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Earth</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Moon</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Space</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Solar System</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Galaxy</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Mars</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Space station</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Sun</button>
            </li>
            <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                <button>Pluto</button>
            </li>
        </ul>
    )
}

interface props {
    setQuery: React.Dispatch<string>
}

export default SearchItems
