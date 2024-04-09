import React from 'react'

const Summery = ({productInfo}) => {
  return (
<div className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-left">
        Summery
      </p>
        <div className="w-full rounded outline-gray-400 flex flex-col gap-5 capitalize">
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Title:</p>
                <p className="text-md ">{productInfo.title}</p>
            </div>
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Description:</p>
                <p className="text-md ">{productInfo.description}</p>
            </div>
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Price:</p>
                <p className="text-md ">${productInfo.price}</p>
            </div>
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Rent:</p>
                <p className="text-md ">${productInfo.rent}</p>
            </div>
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Rent Type:</p>
                <p className="text-md ">{productInfo.rent_type}</p>
            </div>
            <div className="flex justify-start gap-2    ">
                <p className="text-md ">Categories: </p>
                <span className="flex flex-wrap gap-2">
                {
                    productInfo.categories.map((category, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded px-3 py-1 text-sm  text-gray-700 mr-2 capitalize">
                            {category}
                        </span>
                    ))
                }
                </span>
            </div>
        </div>
    </div>

  )
}

export default Summery;