import React, { FC, useState } from 'react'

const SearchFilterSidebar: FC<searchFilterProps> = ({ setQuery }) => {
    const [input, setInput] = useState('')

    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    function onQuerySubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setQuery(input)
    }

    function onDateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={onQuerySubmit}>
                <input type='text' value={input} onChange={onChangeInput} />
                <button>
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
                <button>Popular</button>
                <button>Latest</button>
            </div>
            <form onSubmit={onDateSubmit}>
                <p>Filter by Date</p>
                <label>
                    Start Date
                    <input type={'date'} name='start_date' />
                </label>
                <label>
                    End Date
                    <input type={'date'} name='end_date' />
                </label>
                <button>filter</button>
            </form>
        </div>
    )
}

export default SearchFilterSidebar

interface searchFilterProps {
    setQuery: React.Dispatch<string>
}
