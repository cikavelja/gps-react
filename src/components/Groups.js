import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Accordion from './Accordion';


const Groups = () => {
    const [groups, setGroups] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGroups = async () => {
            try {
                // const response = await axiosPrivate.get('/users', {
                //     signal: controller.signal
                // });
                const response = await axiosPrivate.post("",
                    JSON.stringify({ "query": "query { groups {  id, groupName owner{ id, email} userGroups{ id, consent, blocked, member{ id, email}}   } } " }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    },
                    {
                        signal: controller.signal
                    }

                );

                console.log(response.data.data.groups);
                isMounted && setGroups(response.data.data.groups);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getGroups();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (


        <article>

            <h2>Groups List</h2>
            {groups?.length
                ? (
                    <Accordion groups={groups} setGroups={setGroups} />
                    // <ul>
                    //     {groups.map((group, i) => <li key={group?.id}>{group?.groupName}</li>)}
                    // </ul>
                ) : (
                    <Accordion groups={groups} setGroups={setGroups} />
                    // <ul>
                    //     {groups.map((group, i) => <li key={group?.id}>{group?.groupName}</li>)}
                    // </ul>
                )
            }
        </article>
    );
};

export default Groups;
