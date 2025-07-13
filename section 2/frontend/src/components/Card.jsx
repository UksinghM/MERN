import React from 'react'

const Card = ({title,description}) => {
  return (
    <div className="p-6 bg-amber-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-2xl">{description}</p>
    </div>
  )
}

export default Card;