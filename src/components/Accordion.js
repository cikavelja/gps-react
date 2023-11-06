import React, { useState } from 'react';
import AddUserPopup from './AddUserPopup';
import AddGroupPopup from './AddGroupPopup';
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function Accordion({ groups, setGroups, onAddGroup, onUpdateGroup }) {
    const axiosPrivate = useAxiosPrivate();
    const [openAccordion, setOpenAccordion] = useState(null);
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showAddGroupPopup, setShowAddGroupPopup] = useState(false);
    const controller = new AbortController();

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleConsentChange = async (groupId, userGroupId, event) => {
        try {
            // Define the request payload
            const isChecked = event.target.checked; // This will be true if the checkbox is checked

            debugger;
            // Make the Axios POST request to your GraphQL server
            const response = await axiosPrivate.post("",
                JSON.stringify({ "query": 'mutation UpsertUserGroup { upsertUserToGroup(model: {   id:"' + userGroupId + '", consent: ' + isChecked + ' }) { id, consent, blocked, memberId, member{ id}    }}' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
                {
                    signal: controller.signal
                }

            );

            // Update the state with the new data from the API response
            const updatedUserGroups = groups.map((group) => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        userGroups: group.userGroups.map((userGroup) =>
                            userGroup.id === userGroupId
                                ? {
                                    ...userGroup,
                                    consent: response.data.data.upsertUserToGroup.consent,
                                }
                                : userGroup
                        ),
                    };
                }
                return group;
            });

            setGroups(updatedUserGroups);
        } catch (error) {
            console.error('Error updating consent:', error);
        }
    };

    const handleBlockedChange = async (groupId, userGroupId, event) => {
        // Implement your logic to handle blocked change
        try {
            // Define the request payload
            const isChecked = event.target.checked; // This will be true if the checkbox is checked

            debugger;
            // Make the Axios POST request to your GraphQL server
            const response = await axiosPrivate.post("",
                JSON.stringify({ "query": 'mutation UpsertUserGroup { upsertUserToGroup(model: {   id:"' + userGroupId + '", blocked: ' + isChecked + ' }) { id, consent, blocked, memberId, member{ id}    }}' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
                {
                    signal: controller.signal
                }

            );

            // Update the state with the new data from the API response
            const updatedUserGroups = groups.map((group) => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        userGroups: group.userGroups.map((userGroup) =>
                            userGroup.id === userGroupId
                                ? {
                                    ...userGroup,
                                    blocked: response.data.data.upsertUserToGroup.blocked,
                                }
                                : userGroup
                        ),
                    };
                }
                return group;
            });

            setGroups(updatedUserGroups);
        } catch (error) {
            console.error('Error updating consent:', error);
        }

    };

    const handleDelete = async (groupId, userGroupId, memberId) => {
        // Implement your logic to delete the user group
        const response = await axiosPrivate.post("",
            JSON.stringify({ "query": 'mutation{  deleteUserFromGroup( memberId: "' + memberId + '")  }' }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
            {
                signal: controller.signal
            }
        );
        const updatedGroups = groups.map((group) => {
            if (group.id === groupId) {
                // Filter out the user group that you want to delete
                const updatedUserGroups = group.userGroups.filter(
                    (userGroup) => userGroup.id !== userGroupId
                );

                return {
                    ...group,
                    userGroups: updatedUserGroups,
                };
            }
            return group;
        });

        setGroups(updatedGroups);
    };

    const handleAddUserClick = (group) => {
        setSelectedGroup(group);
        setShowAddUserPopup(true);
    };

    const handleCloseAddUserPopup = () => {
        setSelectedGroup(null);
        setSelectedUser(null);
        setShowAddUserPopup(false);
    };

    const handleAddUser = async (user) => {


        setSelectedUser(user);
        const response = await axiosPrivate.post("",
            JSON.stringify({ "query": 'mutation UpsertUserGroup { upsertUserToGroup(model: {    groupId: "' + selectedGroup.id + '", memberId:"' + user.user.id + '" }) { id, consent, blocked, memberId, member{ id}    }}' }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
            {
                signal: controller.signal
            }
        );
        var newUser = {
            "id": response.data.data.upsertUserToGroup.id,
            "consent": false,
            "blocked": false,
            "member": {
                "id": user.user.id,
                "email": user.user.email
            }
        };
        const updatedGroups = groups.map((group) => {
            if (group.id === selectedGroup.id) {
                // Add the new user to the userGroups array
                const updatedUserGroups = [...group.userGroups, newUser];
                return {
                    ...group,
                    userGroups: updatedUserGroups,
                };
            }
            return group;
        });
        setGroups(updatedGroups);
    };
    const handleAddGroupClick = () => {
        setSelectedGroup(null);
        setShowAddGroupPopup(true);
    };

    const handleUpdateGroupClick = (group) => {
        setSelectedGroup(group);
        setShowAddGroupPopup(true);
    };

    const handleCloseAddGroupPopup = async (groupName, update) => {
        console.log(`Closing Add Group Popup for group: ${groupName}`);
        setShowAddGroupPopup(false);
        let query = "";

        (selectedGroup) ?
            query = `mutation UpsertGroup {  upsertGroup(    model: {      groupName: "${groupName}"      id: "${selectedGroup.id}"      ownerId: "${selectedGroup.owner.id}" }  ) {    id    groupName    ownerId  }}`
            :
            query = `mutation UpsertGroup {  upsertGroup(    model: {      groupName: "${groupName}"  }  ) {    id    groupName    ownerId  }}`
            ;
        if (update) {

            const response = await axiosPrivate.post("",
                JSON.stringify({ "query": query }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                },
                {
                    signal: controller.signal
                }
            );
            if (selectedGroup) {
                const updatedUserGroups = groups.map((group) => {
                    if (group.id === response.data.data.upsertGroup.id) {
                        return {
                            ...group,
                            groupName: groupName, // Replace "NewGroupName" with the desired new name
                        };
                    }
                    return group;
                });

                setGroups(updatedUserGroups);
            } else {
                const newGroup = {
                    id: response.data.data.upsertGroup.id, // Replace with the new group's ID
                    groupName: response.data.data.upsertGroup.groupName, // Replace with the desired group name
                    "owner": {},
                    "userGroups": []
                };

                const updatedUserGroups = [
                    ...groups,
                    newGroup
                ];

                setGroups(updatedUserGroups);;
            };

        }


    };

    const handleDeleteGroup = async (groupId) => {
        // Implement your logic to delete the user group

        if (!window.confirm("Delete?"))
            return;

        const response = await axiosPrivate.post("",
            JSON.stringify({ "query": 'mutation{deleteGroup( groupId: "' + groupId + '"){  }}' }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            },
            {
                signal: controller.signal
            }
        );

        const updatedGroups = groups.filter((group) => group.id !== groupId);

        setGroups(updatedGroups);
    };

    return (
        <div className="accordion" id="accordionExample">
        {groups.map((group, index) => (

            <div className="accordion-item" key={group.id}>
                <h2 className="accordion-header" id={`heading${index}`}>
                    <div
                        className={`accordion-button ${openAccordion === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={openAccordion === index}
                    >
                        <div className='row'>

                            <div className="col-4  ">
                                <label className="btn btn-outline-secondary" >{group.groupName}</label>
                            </div>
                            <div className="col-4  ">
                                <button onClick={() => handleUpdateGroupClick(group)} type="button" className="btn btn-outline-primary">Update</button>
                            </div>
                            <div className="col-4  ">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDeleteGroup(group.id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </h2>
                <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${openAccordion === index ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                >
                    <div className="accordion-body">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Members</h2>
                                {group.userGroups.map((userGroup) => (
                                    <div className="card" key={userGroup.id}>
                                        <div className="card-body">
                                            <div className="row " >
                                                <div className="col-2 "><h4 className="card-title">{userGroup.member.email}</h4></div>
                                                <div className="col-2 ">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`consentSwitch${userGroup.id}`}
                                                            checked={userGroup.consent}
                                                            onChange={(event) => handleConsentChange(group.id, userGroup.id, event)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`consentSwitch${userGroup.member.email}`}>Consent</label>
                                                    </div>
                                                </div>
                                                <div className="col-2 ">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`blockedSwitch${userGroup.id}`}
                                                            checked={userGroup.blocked}
                                                            onChange={(event) => handleBlockedChange(group.id, userGroup.id, event)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`blockedSwitch${userGroup.id}`}>Blocked</label>
                                                    </div>
                                                </div>
                                                <div className="col-6  float-right">
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDelete(group.id, userGroup.id, userGroup.member.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => handleAddUserClick(group)} type="button" className="btn btn-outline-success">Add member</button>

                            </div>
                        </div>

                        {/* <button onClick={() => handleUpdateGroupName(group.id)} type="button" className="btn btn-outline-primary">Update Name</button>
                <button onClick={() => handleDeleteGroup(group.id)} type="button" className="btn btn-outline-danger">Delete</button> */}
                    </div>
                </div>
            </div>
        ))}
        <AddUserPopup
            isOpen={showAddUserPopup}
            onClose={handleCloseAddUserPopup}
            onAddUser={handleAddUser}
        />
        <button onClick={handleAddGroupClick} className="btn btn-success">Add Group</button>

        <AddGroupPopup
            isOpen={showAddGroupPopup}
            onClose={handleCloseAddGroupPopup}
            onAddGroup={onAddGroup} // Implement the logic to add a new group
            onUpdateGroup={onUpdateGroup} // Implement the logic to update an existing group
            group={selectedGroup} // Pass the selected group for updates
        />
    </div>

    );
}

export default Accordion;
