import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/AddUserPopup.css';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

Modal.setAppElement('#root');

function AddGroupPopup({ isOpen, onClose, group }) {
    const axiosPrivate = useAxiosPrivate();
    const [groupName, setGroupName] = useState(''); // Local state for groupName

    // Use useEffect to set the groupName when the group prop changes
    useEffect(() => {
        debugger;

        if (group) {
            setGroupName(group.groupName);
        } else {
            setGroupName(''); // Clear the input when adding a new group
        }
    }, [group]);

    const handleSave = async () => {
        debugger;
        onClose(groupName, "save");
    };

    const handleClosePopup = () => {
        debugger;
        onClose(groupName, null);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClosePopup}
            contentLabel={group ? 'Update Group' : 'Add Group'}
            className="small-modal"
        >
            <div className="p-2 x-button">
                <button className="btn btn-danger close-button" onClick={handleClosePopup}>
                    X
                </button>
            </div>
            <h2>{group ? 'Update Group' : 'Add Group'}</h2>
            <input
                type="text"
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleSave}>{group ? 'Update' : 'Add'}</button>
        </Modal>
    );
}

export default AddGroupPopup;
