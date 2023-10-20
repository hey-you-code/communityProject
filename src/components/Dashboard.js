import React, { useRef } from 'react'
import Modal from './Modal'
import CreateProfile from './CreateProfile';

function Dashboard() {
    const modalRef = useRef();
    return (
        <div>
            <button onClick={() => modalRef.current.open()}>Create Profile</button>

            <Modal ref={modalRef}>
                <CreateProfile modalRef={modalRef}/>
            </Modal>
        </div>
    )
}

export default Dashboard
