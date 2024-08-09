import React from 'react'

function Table({ items }) {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Brand</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Item Price</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Unit</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {items?.map((item, index) => (
                            <tr key={index} className="odd:bg-gray-50">
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.category}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.brand == '' ? `Not specified` : item.brand}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.itemPrice}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.quantity}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table