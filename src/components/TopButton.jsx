import React from 'react';

export const TopButton = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            title: 'Ha Noi'
        },
        {
            id: 2,
            title: 'Ho Chi Minh'
        },
        {
            id: 3,
            title: 'Thanh Hoa'
        },
        {
            id: 4,
            title: 'Lao Cai'
        },
        {
            id: 5,
            title: 'Hai Duong'
        }
    ]

    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button key={city.id} className='text-white text-lg font-medium'
                onClick={() => setQuery({q: city.title})}>{city.title}</button>
            ))}
        </div>
    );
}