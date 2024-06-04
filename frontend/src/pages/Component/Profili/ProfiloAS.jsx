import { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function ProfiloAS(props) {
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [aggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
  const [modificaProfiloForm, setModificaProfiloForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
  });
  const [registrazioneForm, setRegistrazioneForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    ruolo: 'CISO',
  });
  const [registrazioneSuccess, setRegistrazioneSuccess] = useState(false);

  const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
    setAggiungiProfiloVisibile(false);
  };

  const toggleAggiungiProfilo = () => {
    setAggiungiProfiloVisibile(!aggiungiProfiloVisibile);
    setModificaProfiloVisibile(false);
  };

  const registrami = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/registrazione',
      data: registrazioneForm,
    })
      .then(() => {
        setRegistrazioneSuccess(true);
        setRegistrazioneForm({
          nome: '',
          cognome: '',
          email: '',
          password: '',
          ruolo: 'CISO',
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setRegistrazioneForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleModificaProfiloChange = (event) => {
    const { value, name } = event.target;
    setModificaProfiloForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const aggiornaProfilo = (event) => {
    event.preventDefault();
    const token = props.token;
    if (!token) {
      console.error('Token non disponibile');
      return;
    }
    axios({
      method: 'PUT',
      url: 'http://127.0.0.1:5000/api/profilo',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: modificaProfiloForm,
    })
      .then((response) => {
        setProfilo(response.data);
        toggleModificaProfilo();
      })
      .catch((error) => {
        console.error('Errore durante l\'aggiornamento del profilo:', error);
      });
  };

  useEffect(() => {
    const fetchProfilo = async () => {
      const token = props.token;
      if (!token) {
        console.error('Token non disponibile');
        return;
      }
      console.log('Token:', token);
      try {
        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setProfilo(data);
        setModificaProfiloForm({
          nome: data.nome,
          cognome: data.cognome,
          email: data.email,
          password: '',
        });
      } catch (error) {
        console.error('Errore durante il recupero del profilo:', error);
      }
    };

    fetchProfilo();
  }, [props.token]);

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4 h-full justify-content-center mx-5">
            <MDBCardBody className="text-center mx-5">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle mb-4 mx-5"
                style={{ width: '150px' }}
                fluid
              />
              <p className="text-muted mb-2" style={{ fontSize: '2rem' }}>
                Bentornato <strong>{profilo.nome}</strong>
              </p>
              <p className="text-muted mb-1">{profilo.ruolo}</p>

              <div className="d-flex flex flex-col items-center mt-5">
                <button className="btn btn-warning py-2 px-4" onClick={toggleModificaProfilo}>
                  Modifica profilo
                </button>
                <button className="btn btn-warning py-2 px-9 mt-2" onClick={toggleModificaProfilo}>
                  Segnalazioni
                </button>
                <button className="btn btn-warning py-2 px-4 mt-2" onClick={toggleAggiungiProfilo}>
                  Aggiungi utenti
                </button>
              </div>
            </MDBCardBody>
            <MDBCardImage
              src="/logo.png"
              alt="logo"
              className="mb-4"
              style={{ width: '50px', display: 'block', margin: '0 auto' }}
              fluid
            />
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Nome</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{profilo.nome}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Cognome</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{profilo.cognome}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{profilo.email}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Ruolo</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">{profilo.ruolo}</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow>
            <MDBCol>
              <MDBCard className="mb-3 mb-md-0 w-full">
                <MDBCardBody>
                  {modificaProfiloVisibile && (
                    <div>
                      <a>Nome</a>
                      <input
                        onChange={handleModificaProfiloChange}
                        autoComplete="off"
                        type="text"
                        placeholder="Modifica nome..."
                        className="form-control mb-3"
                        name="nome"
                        value={modificaProfiloForm.nome}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Cognome</a>
                      <input
                        onChange={handleModificaProfiloChange}
                        autoComplete="off"
                        type="text"
                        placeholder="Modifica cognome..."
                        className="form-control mb-3"
                        name="cognome"
                        value={modificaProfiloForm.cognome}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Email</a>
                      <input
                        onChange={handleModificaProfiloChange}
                        autoComplete="off"
                        type="email"
                        placeholder="Modifica email..."
                        className="form-control mb-3"
                        name="email"
                        value={modificaProfiloForm.email}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Password</a>
                      <input
                        onChange={handleModificaProfiloChange}
                        autoComplete="off"
                        type="password"
                        placeholder="Modifica password..."
                        className="form-control mb-3"
                        name="password"
                        value={modificaProfiloForm.password}
                        style={{ maxWidth: '200px' }}
                      />
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-2" onClick={toggleModificaProfilo}>
                          Annulla
                        </button>
                        <button className="btn btn-success" onClick={aggiornaProfilo}>
                          Conferma modifiche
                        </button>
                      </div>
                    </div>
                  )}
                </MDBCardBody>

                <MDBCardBody>
                  {aggiungiProfiloVisibile && (
                    <div>
                      <a>Nome</a>
                      <input
                        onChange={handleChange}
                        autoComplete="off"
                        type="text"
                        placeholder="Inserisci nome..."
                        className="form-control mb-3"
                        name="nome"
                        value={registrazioneForm.nome}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Cognome</a>
                      <input
                        onChange={handleChange}
                        autoComplete="off"
                        type="text"
                        placeholder="Inserisci cognome..."
                        className="form-control mb-3"
                        name="cognome"
                        value={registrazioneForm.cognome}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Email</a>
                      <input
                        onChange={handleChange}
                        autoComplete="off"
                        type="email"
                        placeholder="Inserisci email..."
                        className="form-control mb-3"
                        name="email"
                        value={registrazioneForm.email}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Password</a>
                      <input
                        onChange={handleChange}
                        autoComplete="off"
                        type="password"
                        placeholder="Inserisci password..."
                        className="form-control mb-3"
                        name="password"
                        value={registrazioneForm.password}
                        style={{ maxWidth: '200px' }}
                      />
                      <a>Ruolo</a>
                      <select
                        onChange={handleChange}
                        className="form-control mb-3"
                        name="ruolo"
                        value={registrazioneForm.ruolo}
                        style={{ maxWidth: '200px' }}
                      >
                        <option value="CISO">CISO</option>
                        <option value="Amministratore di sistema">Amministratore di sistema</option>
                      </select>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-success" onClick={registrami}>
                          Conferma Registrazione
                        </button>
                      </div>
                      {registrazioneSuccess && (
                        <p className="text-success mt-3">Registrazione completata con successo!</p>
                      )}
                    </div>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

ProfiloAS.propTypes = {
  token: PropTypes.string.isRequired,
};
