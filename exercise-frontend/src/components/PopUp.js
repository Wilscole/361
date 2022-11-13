import React from 'react';

function Popup({ handleDeleteTrue, handleDeleteFalse, onDelete }) {
    return (
        <div className="modal">
            <div className="modal_box">
                <p>You sure you wanna delete?</p>
                <button onClick={handleDeleteFalse} className="modal_buttonCancel">Cancel</button>
                <button onClick={handleDeleteTrue} className="modal_buttoDelete">
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default Popup;