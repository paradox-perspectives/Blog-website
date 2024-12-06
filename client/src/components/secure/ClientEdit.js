import ClientAdd from "./ClientAdd";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

function ClientEdit() {

    const {id} = useParams()
    const [client, setClient] = useState(null);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await axios.get(`${apiUrl}/client/${id}`);
                setClient(response.data);
            } catch (err) {
                setError(err);
            }
        };

        fetchClient();
    }, [id]);

    if (error) {
        return <div>Error fetching client: {error.message}</div>;
    }

    return (
        <ClientAdd client={client} />
    )

}

export default ClientEdit;