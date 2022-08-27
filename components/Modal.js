
import React, { useEffect, useState } from 'react'
import ReactDom from "react-dom"

const Modal = ({ show, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => {
        setIsBrowser(true)
    }, [])
    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <div className="bg-black bg-opacity-50 w-full h-full absolute inset-0 flex flex-col justify-center items-center">
            <div className="bg-white w-96 h-96 flex flex-col justify-around items-center rounded-lg shadow-sm shadow-white">
                <div className="min-w-full h-fit flex justify-center text-lg font-bold">
                    <h1 className='text-lg font-bold'>Create Post</h1>
                </div>
                <div className="mb-6 w-72 h-72">{children}</div></div>
        </div >
    ) : null;
    if (isBrowser) {
        return ReactDom.createPortal(
            modalContent, document.getElementById("modal-root")
        )
    } else return null
}

export default Modal