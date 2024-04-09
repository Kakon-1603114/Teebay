import React from 'react'

const Description = ({productInfo, setProductInfo}) => {
  return (
    <span className="w-full flex flex-col gap-5">
      <p className="text-2xl font-semibold text-center">
        Provide description of your product
      </p>
        <textarea
            className="w-full border-2 p-2 rounded outline-gray-400 custom-scrollbar h-56"
            onChange={(e) => {
                setProductInfo({ ...productInfo, description: e.target.value });
            }}
            value={productInfo.description}
        />
      
    </span>
  )
}

export default Description