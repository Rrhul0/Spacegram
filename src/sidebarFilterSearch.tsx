import React, { FC, useState } from 'react'
import { sort, time } from './App'

const SearchFilterSidebar: FC<searchFilterProps> = ({ setQuery, setTime, sort, setSort }) => {
    const [input, setInput] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    function onQuerySubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setQuery(input)
        setSort('popular')
    }

    function onDateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setTime({
            start: new Date(startTime).getFullYear(),
            end: new Date(endTime).getFullYear(),
        })
        setSort('latest')
    }

    return (
        <div>
            <form className='relative' onSubmit={onQuerySubmit}>
                <input className='p-2 rounded-md w-full' type='text' value={input} onChange={onChangeInput} />
                <button className='absolute top-0 right-0 bg-stone-200 hover:bg-stone-300 py-1 px-3 m-1 rounded-lg'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                        />
                    </svg>
                </button>
            </form>
            <p>Order By</p>
            <div>
                <button
                    className={sort === 'popular' || !sort ? 'bg-stone-500' : ''}
                    onClick={() => setSort('popular')}>
                    Popular
                </button>
                <button className={sort === 'latest' ? 'bg-stone-500' : ''} onClick={() => setSort('latest')}>
                    Latest
                </button>
            </div>
            <form onSubmit={onDateSubmit}>
                <p>Filter by Date</p>
                <label>
                    Start Date
                    <input
                        type={'date'}
                        name='start_date'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        max='2022-12-31'
                    />
                </label>
                <label>
                    End Date
                    <input
                        type={'date'}
                        name='end_date'
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        min={startTime}
                        max='2022-12-31'
                    />
                </label>
                <button>filter</button>
            </form>
        </div>
    )
}

export default SearchFilterSidebar

interface searchFilterProps {
    setQuery: React.Dispatch<string>
    setTime: React.Dispatch<time>
    sort: sort
    setSort: React.Dispatch<sort>
}
