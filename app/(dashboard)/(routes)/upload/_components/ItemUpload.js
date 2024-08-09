import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemUpload({saveItemInfo}) {

    const [formData, setFormData] = useState({
        category: '',
        name: '',
        brand: '',
        itemPrice: '',
        quantity: '',
        unit: '',
        datePurchased: new Date().toISOString().split('T')[0],
        expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
        frequency: 'oneTime',
        notes: ''
    });

    const validateForm = (form) => {
        if (form == null || form.category === '' || form.name === '' || form.quantity == null || form.unit === '') {
            toast.error('Please fill in all required fields.', {
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,
            });
            return false;
        } else {
            toast.success('Your changes have been saved.',{
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,
            });
        }
        return true;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'frequency') {
            setFormData(prevState => ({
                ...prevState,
                frequency: value
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };
    const saveItem = (form) => {
        saveItemInfo(form);
    }

    return (
        <div>
            <section className="">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        <div className="lg:col-span-2 lg:py-12">
                            <p className="max-w-xl text-lg text-center">
                                Say goodbye to forgetting what you have at home or anywhere else! This app helps you keep track of your items, ensuring you never leave the store wondering if you already own something. You can manually log your items or upload a photo of your stock for easy tracking. 
                                
                            </p>

                            <div className="mt-8">
                                <p>
                                Exciting new features are on the way, including smart logging, email reminders, and shopping list preparation. 
                                </p>
                                <br></br>
                                <p className="text-xl font-bold text-primary"> Stay organized and always know what you have on hand! </p>

                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                            <h4 className='mb-5'><strong>Manually enter product details</strong></h4>
                            <form action="#" className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="sr-only" htmlFor="name">Category</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Category *"
                                            type="text"
                                            id="category"
                                            required={true}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="sr-only" htmlFor="name">Item name</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Item name *"
                                            type="text"
                                            id="name"
                                            required={true}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="sr-only" htmlFor="brand">Brand</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Brand"
                                            type="text"
                                            id="brand"
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="sr-only" htmlFor="itemPrice">Item price</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Item price"
                                            type="number"
                                            id="itemPrice"
                                            step="0.01"
                                            min="0.05"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="sr-only" htmlFor="quantity">Quantity</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Quantity *"
                                            type="number"
                                            id="quantity"
                                            required={true}
                                            min="1"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="sr-only" htmlFor="unit">Select a unit *</label>
                                        <select
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            id="unit"
                                            required={true}
                                            value={formData.unit}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select a unit *</option>
                                            <option value="each">Each</option>
                                            <option value="kilogram">Kilogram</option>
                                            <option value="liter">Liter</option>
                                            <option value="gram">Gram</option>
                                            <option value="pound">Pound</option>
                                            <option value="ounce">Ounce</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className='flex items-center'>
                                        <p className='mr-2 text-gray-800 text-[14px]'>Date purchased</p>
                                        <label className="sr-only" htmlFor="datePurchased">Date purchased</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Date purchased"
                                            type="date"
                                            id="datePurchased"
                                            onChange={handleChange}
                                            defaultValue={new Date().toISOString().split('T')[0]}
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className='flex items-center'>
                                        <p className='mr-2 text-gray-800 text-[14px]'>Expiration date</p>
                                        <label className="sr-only" htmlFor="expirationDate">Expiration date</label>
                                        <input
                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                            placeholder="Date purchased"
                                            type="date"
                                            id="expirationDate"
                                            onChange={handleChange}
                                            defaultValue={new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                                <p className=' text-gray-800 text-[14px]'>Is this a frequently bought product?</p>
                                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-4">
                                    <div>
                                        <label
                                            htmlFor="oneTime"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input className="sr-only" id="oneTime" type="radio" tabIndex="-1" name="frequency" value="oneTime" defaultChecked
                                                onChange={handleChange} />

                                            <span className="text-sm">One time</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="weekly"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input className="sr-only" id="weekly" type="radio" tabIndex="-1" name="frequency" value="weekly"
                                                onChange={handleChange} />

                                            <span className="text-sm">Weekly</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="biweekly"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input className="sr-only" id="biweekly" type="radio" tabIndex="-1" name="frequency" value="biweekly"
                                                onChange={handleChange} />

                                            <span className="text-sm">Biweekly</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="monthly"
                                            className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                                            tabIndex="0"
                                        >
                                            <input className="sr-only" id="monthly" type="radio" tabIndex="-1" name="frequency" value="monthly"
                                                onChange={handleChange} />

                                            <span className="text-sm">Monthly</span>
                                        </label>
                                    </div>

                                </div>

                                <div>
                                    <label className="sr-only" htmlFor="notes">Notes about this product</label>

                                    <textarea
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        placeholder="Notes about this product"
                                        rows="3"
                                        id="notes"
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                        onClick={() => {
                                            let save = validateForm(formData);
                                            if (save) {
                                                saveItem(formData);
                                                // Reset form values
                                                setFormData({
                                                    category: '',
                                                    name: '',
                                                    brand: '',
                                                    itemPrice: '',
                                                    quantity: '',
                                                    unit: '',
                                                    datePurchased: new Date().toISOString().split('T')[0],
                                                    expirationDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
                                                    frequency: 'oneTime',
                                                    notes: ''
                                                });
                                                // Clear the input fields
                                                document.getElementById('notes').value = '';
                                                document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
                                                    input.checked = false;
                                                    input.value = '';
                                                });
                                                document.querySelectorAll('input[type="radio"]').forEach(input => {
                                                    input.checked = (input.value === 'oneTime');
                                                });
                                                document.getElementById('datePurchased').value = new Date().toISOString().split('T')[0];
                                                document.getElementById('expirationDate').value = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
                                            }
                                        }}
                                    >
                                        Save item(s)
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    )
}

export default ItemUpload