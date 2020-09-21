import React from 'react'

const Select = (props) => {

    const handleChange = () => {
        props.onHandleChange();
    }

    return (
        <select>
            {
                props.options.map((value, index) => {
                    return (
                        <option
                            key={value} 
                            value={value} 
                            onChange={() => {
                                handleChange();
                        }}>
                            { value[0].toUpperCase() + value.slice(1) }
                        </option>
                    )
                })
            }
        </select>
    )
}

export default Select