import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {TableVirtuoso} from 'react-virtuoso';

const columns = [
    {
        width: 100,
        label: 'Seleziona',
        dataKey: 'checkbox',
    },
    {
        width: 100,
        label: 'Nome',
        dataKey: 'nome',
    },
    {
        width: 100,
        label: 'Cognome',
        dataKey: 'cognome',
    },
    {
        width: 220,
        label: 'Email',
        dataKey: 'email',
    },
    {
        width: 100,
        label: 'Ruolo',
        dataKey: 'ruolo',
    },
];

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
        <TableContainer
            component={Paper}
            {...props}
            ref={ref}
            sx={{maxHeight: '90%'}}
        />
    )),
    Table: (props) => (
        <Table {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed'}}/>
    ),
    TableHead,
    TableRow: ({...props}) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref}/>),
};

VirtuosoTableComponents.Scroller.displayName = 'Scroller';
VirtuosoTableComponents.Table.displayName = 'Table';
VirtuosoTableComponents.TableHead.displayName = 'TableHead';
VirtuosoTableComponents.TableRow.displayName = 'TableRow';
VirtuosoTableComponents.TableBody.displayName = 'TableBody';

VirtuosoTableComponents.TableRow.propTypes = {
    item: PropTypes.any,
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
            cursor: 'pointer', // Aggiungi il puntatore al passaggio del mouse
          }}

        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}




function rowContent(index, row, handleCheckboxChange, selectedRow) {
    const isSelected = selectedRow === row.id;

    return (
        <React.Fragment>
            <TableCell key="checkbox">
                <Checkbox
                    checked={isSelected}
                    onChange={() => handleCheckboxChange(row.id)}
                />
            </TableCell>
            {columns.slice(1).map((column) => (
                <TableCell
                    key={column.dataKey}
                    align="left"
                    sx={{
                        backgroundColor: isSelected ? 'red' : 'inherit',
                        animation: isSelected ? 'flash 1.5s infinite' : 'none',
                    }}
                >
                    {row[column.dataKey]}
                </TableCell>
            ))}
            <style>
                {`
          @keyframes flash {
            0% { background-color: red; }
            50% { background-color: white; }
            90% { background-color: red; }
          }
        `}
            </style>
        </React.Fragment>
    );
}

export default function ReactVirtualizedTable({token}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [message, setMessage] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [orderBy, setOrderBy] = useState('nome'); // Campo su cui ordinare di default
    const [order, setOrder] = useState('asc'); // Direzione di default


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/allutenti', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data); // Verifica i dati ricevuti
                setUsers(response.data.utenti.map((user, index) => ({...user, id: index}))); // Ensure unique IDs
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);
const sortData = (field, direction) => {
  const sortedData = [...users].sort((a, b) => {
    const fieldA = a[field].toUpperCase(); // Ignora maiuscole/minuscole
    const fieldB = b[field].toUpperCase();

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  setUsers(sortedData);
};
const handleSort = (field) => {
  const isAsc = orderBy === field && order === 'asc';
  const newOrder = isAsc ? 'desc' : 'asc';
  setOrder(newOrder);
  setOrderBy(field);
  sortData(field, newOrder);
};
    const handleCheckboxChange = (id) => {
        setSelectedRow(id === selectedRow ? null : id);
    };

    const handleRoleCheckboxChange = (role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter(r => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const handleRemoveProfile = async () => {
        try {
            const user = users.find((u) => u.id === selectedRow);
            if (!user) {
                setMessage("Utente non trovato."); // Imposta il messaggio di errore
                return;
            }
            const response = await axios.delete(`http://localhost:5000/api/eliminautente=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter((u) => u.id !== selectedRow));
            setSelectedRow(null);
            setMessage(response.data.message); // Imposta il messaggio dal backend
        } catch (error) {
            setMessage(error.response?.data?.message || "Errore durante la rimozione dell'utente."); // Imposta il messaggio di errore dal backend
        }
    };

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div>Errore: {error.message}</div>;

    const filteredUsers = users.filter(user => selectedRoles.length === 0 || selectedRoles.includes(user.ruolo));

   return (
       <Paper style={{height: 500, width: '100%', padding: '16px'}}>

           <Checkbox
               checked={selectedRoles.includes('Amministratore di sistema')}
               onChange={() => handleRoleCheckboxChange('Amministratore di sistema')}
           /> Amministratore di sistema
           <Checkbox
               checked={selectedRoles.includes('CISO')}
               onChange={() => handleRoleCheckboxChange('CISO')}
           /> CISO
           <Checkbox
               checked={selectedRoles.includes('Utente')}
               onChange={() => handleRoleCheckboxChange('Utente')}
           /> Utente
               <Button
                   variant="contained"
                   onClick={() => handleSort(orderBy)}
                   style={{marginLeft: '16px'}}
               >
                   Ordina per {orderBy} {order === 'asc' ? '↓' : '↑'}
               </Button>

           <TableVirtuoso
               data={filteredUsers}
               components={VirtuosoTableComponents}
               fixedHeaderContent={fixedHeaderContent}
               itemContent={(index, row) => rowContent(index, row, handleCheckboxChange, selectedRow, selectedRoles, handleRoleCheckboxChange)}
           />

           {selectedRow !== null && (
               <>
                   <Button
                       variant="contained"
                       color="error"
                       onClick={handleRemoveProfile}
                       sx={{mt: 2, mr: 2}}
                   >
                       Rimuovi Profilo
                   </Button>
                   {message && <div>{message}</div>} {/* Visualizza il messaggio */}
               </>
           )}
       </Paper>
   );

}

ReactVirtualizedTable.propTypes = {
    token: PropTypes.string.isRequired
};
