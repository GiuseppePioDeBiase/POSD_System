import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';
import SimpleTable from '../Componenti globali/SimpleTable.jsx';

export default function ReactVirtualizedTable({token, ruolo}) {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
const fetchData = async () => {
    let endpoint;

    switch (ruolo) {
        case 'CISO':
            endpoint = 'storicociso';
            break;
        case 'Amministratore di sistema':
            endpoint = 'allfeedback';
            break;
        case 'Utente':
        default:
            endpoint = 'storicoutente';
            break;
    }

    try {
        const response = await axios.get(`http://localhost:5000/api/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setRows(response.data);
        setLoading(false);
    } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
        setLoading(false);
    }
};


        fetchData();
    }, [token, ruolo]);

    const handleCellClick = (row) => {
        navigate(`/segnalazione/${row._id}`, {state: {messaggio: row.messaggio, oggetto: row.oggetto, token}});
    };

    const columns = [
        {width: 40, label: 'Stato', dataKey: 'stato', clickable: false},
        {width: 50, label: 'Oggetto', dataKey: 'oggetto', clickable: false},
        {width: 90, label: 'Messaggio', dataKey: 'messaggio', clickable: true},
        {width: 90, label: 'Data modifica', dataKey: 'data_ora_modifica', clickable: false}
    ];

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error.message}</div>;

    return (
        <Paper>
            {rows.length > 0 ? (
                <SimpleTable columns={columns} rows={rows} handleCellClick={handleCellClick}/>
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    Nessuna segnalazione
                </div>
            )}
        </Paper>
    );
}

ReactVirtualizedTable.propTypes = {
    token: PropTypes.string.isRequired,
    ruolo: PropTypes.string.isRequired
};
