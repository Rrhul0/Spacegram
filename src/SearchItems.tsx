import { FC } from 'react'

const SearchItems: FC<props> = ({ setQuery }) => {
    const quickSearchQueries = [
        'Earth',
        'Moon',
        'Space',
        'Solar System',
        'Galaxy',
        'Mars',
        'Space Station',
        'Sun',
        'Pluto',
    ]

    function onClickItem(e: React.MouseEvent<HTMLLIElement>) {
        if (e.currentTarget.textContent) setQuery(e.currentTarget.textContent)
    }

    return (
        <ul className='flex gap-3 border border-stone-200 p-3 rounded-md flex-nowrap overflow-x-scroll justify-start h-16 scw'>
            <li className='py-1.5 px-2 flex-shrink-0'>Quick Search: </li>
            {quickSearchQueries.map(query => (
                <li onClick={onClickItem} className='py-1.5 px-4 rounded-full bg-stone-200 flex-shrink-0'>
                    <button>{query}</button>
                </li>
            ))}
        </ul>
    )
}

interface props {
    setQuery: React.Dispatch<string>
}

export default SearchItems
