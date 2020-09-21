import React from 'react'

const Select = ({options}) => {

    return (
        <select>
            {
                options.map(value => {
                    return <option key={value} value={value}>{ value[0].toUpperCase() + value.slice(1) }</option>
                })
            }
        </select>
    )
}

export default Select