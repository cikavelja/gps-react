import React, { useState } from 'react';
import Modal from 'react-modal';
import '../css/AddUserPopup.css'; // Import the CSS file
import useAxiosPrivate from "../hooks/useAxiosPrivate";

Modal.setAppElement('#root'); // Set the root element for accessibility

function AddUserPopup({ isOpen, onClose, onAddUser }) {
    const axiosPrivate = useAxiosPrivate();
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [showAddButton, setShowAddButton] = useState(false);
    const controller = new AbortController();

    const handleSearch = async () => {
        // Simulate a search result here; replace with your server call


        try {
            // const response = await axiosPrivate.get('/users', {
            //     signal: controller.signal
            // });
            const response = await axiosPrivate.post("",
                JSON.stringify({ "query": 'query {  user( email:"' + searchText + '"){ id, email }}' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
                {
                    signal: controller.signal
                }

            );
            setSearchResult(response.data.data);
            setShowAddButton(true);
            debugger;
            // console.log(response.data.data.groups);
            // isMounted && setGroups(response.data.data.groups);
        } catch (err) {
            console.error(err);
            //navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleAddUser = async () => {
        // Implement your logic to add the selected user to the group
        // You may pass the selected user's information to the parent component


        onAddUser(searchResult);
        setSearchText('');
        setSearchResult(null);
        setShowAddButton(false);
        onClose();
    };

    const handleClosePopup = () => {
        setSearchText('');
        setSearchResult(null);
        setShowAddButton(false);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add User "
            className="small-modal"
        >
            <div className="p-2 x-button">
                <button className="btn btn-danger close-button" onClick={handleClosePopup}>
                    X
                </button>
            </div>

            <h2>Add User to Group</h2>
            <input
                type="text"
                placeholder="Search for a user..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {searchResult ? (
                <div>
                    <p>Search result: {searchResult.user.email}</p>
                    {showAddButton && (
                        <button onClick={handleAddUser}>Add User</button>
                    )}
                </div>
            ) : null}
        </Modal>
    );
}

export default AddUserPopup;
