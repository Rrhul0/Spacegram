import React, { FC, useEffect, useState } from 'react'
import { sort, time } from './App'

const SearchFilterSidebar: FC<searchFilterProps> = ({ query, setQuery, setTime, sort, setSort }) => {
    const [input, setInput] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        setInput(query)
    }, [query])

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!input && !startTime && !endTime) return
        setQuery(input)
        setTime({
            start: new Date(startTime).getFullYear(),
            end: new Date(endTime).getFullYear(),
        })
        setSort('popular')
    }

    return (
        <div className='sticky top-24'>
            <form className='relative placeholder:text-lg' onSubmit={onSubmit}>
                <input
                    className='p-2 pl-3 rounded-md w-full border border-stone-300 mb-4'
                    type='text'
                    value={input}
                    onChange={onChangeInput}
                    placeholder='Search'
                />
                <button className='absolute top-0 right-0 bg-stone-200 hover:bg-stone-300 py-1 px-3 m-1 rounded-md'>
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
                <label className='flex justify-between items-center my-1'>
                    Start Date:
                    <input
                        className='text-2xl border rounded-md border-stone-300'
                        type={'date'}
                        name='start_date'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        max='2022-12-31'
                    />
                </label>
                <label className='flex justify-between items-center'>
                    End Date:
                    <input
                        className='text-2xl border rounded-md border-stone-300'
                        type={'date'}
                        name='end_date'
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        min={startTime}
                        max='2022-12-31'
                    />
                </label>
                <button className='border border-stone-300 py-2 px-4 rounded-md mt-2 mb-4 ml-10 bg-stone-200 hover:bg-stone-300'>
                    Filter Date
                </button>
            </form>
            <p className='text-xl mb-2'>Sort By</p>
            <div className='flex flex-col text-lg'>
                <button
                    className={
                        'py-2 border rounded-md border-stone-300 text-left pl-8' +
                        (sort === 'popular' || !sort ? ' border-l-4 !border-l-purple-600' : '')
                    }
                    onClick={() => setSort('popular')}>
                    Popular
                </button>
                <button
                    className={
                        'py-2 border  border-t-0 rounded-md border-stone-300 text-left pl-8' +
                        (sort === 'latest' ? ' border-l-4 !border-l-purple-600 ' : '')
                    }
                    onClick={() => setSort('latest')}>
                    Latest
                </button>
            </div>
        </div>
    )
}

export default SearchFilterSidebar

interface searchFilterProps {
    query: string
    setQuery: React.Dispatch<string>
    setTime: React.Dispatch<time>
    sort: sort
    setSort: React.Dispatch<sort>
}
