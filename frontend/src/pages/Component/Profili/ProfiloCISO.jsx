// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

import PropTypes from 'prop-types'
import SegnalazioneCISO from "../Segnalazioni/SegnalazioneCISO.jsx";

export default function ProfiloCISO(props) {

  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });
  const [aggiungiLicenzaVisibile, setAggiungiLicenzaVisibile] = useState(false);
  const [SegnalazioniVisibile, setSegnalazioniVisibile] = useState(false);

  useEffect(() => {
    const fetchProfilo = async () => {

      const token = props.token



      if (!token) {
        console.error("Token non disponibile");
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {

            'Content-Type': 'application/json',//nell'intestazione di una richiesta HTTP indica al server che il corpo della richiesta è formattato come JSON
            'Authorization': `Bearer ${token}`

          }
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setProfilo(data);
      } catch (error) {
        console.error("Errore durante il recupero del profilo:", error);
      }
    };

    fetchProfilo();
  }, []);
  const toggleSegnalazioniVisibile =()=>{
    setSegnalazioniVisibile(!SegnalazioniVisibile)
  }
  const toggleAggiungiLicenza = () =>{
    setAggiungiLicenzaVisibile(!aggiungiLicenzaVisibile )
  }
  const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfermaPasswordChange = (event) => {
    setConfermaPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password !== confermaPassword) {
      alert("Le password non corrispondono!");
      return;
    }

    ProfiloCISO.propTypes = {
      token: PropTypes.func.isRequired
    };

    // Qui inserisci la logica per inviare le modifiche del profilo
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4 h-full w-auto justify-content-center mx-5">
            <MDBCardBody className=" mx-5">
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle my-4 flex-row align-items-center"
                style={{ width: '150px' }}
                fluid
              />
              <p className="text-muted mb-2 my-4" style={{ fontSize: '2rem' }}>
                Bentornato <strong>{profilo.nome}</strong>
              </p>
              <p className="font-bold text-xl text-center">{profilo.ruolo}</p>

              <div className="d-flex flex flex-col items-center mt-5">
                <button className="btn btn-warning py-2 px-4" onClick={toggleModificaProfilo}>
                  Modifica profilo
                </button>
                <button className="btn btn-warning py-2 px-9 mt-2"  onClick={toggleSegnalazioniVisibile}>
                  Segnalazioni
                </button>
                <button className="btn btn-warning py-2 px-4 mt-2" onClick={toggleAggiungiLicenza}>
                 Titolo di licenza
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
              <MDBCard className="mb-4 w-auto">
                <MDBCardBody>
                  {modificaProfiloVisibile && (
                    <div>
                      <a>Password</a>
                      <input type="text" placeholder="Modifica password..." className="form-control mb-3" style={{ maxWidth: '200px' }} onChange={handlePasswordChange} />
                      <a>Conferma Password</a>
                      <input type="text" placeholder="Conferma password..." className="form-control mb-3" style={{ maxWidth: '200px' }} onChange={handleConfermaPasswordChange} />
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-secondary me-2" onClick={toggleModificaProfilo}>
                          Annulla
                        </button>
                        <button className="btn btn-success" onClick={handleSubmit}>
                          Conferma modifiche
                        </button>
                      </div>
                    </div>
                  )}
                </MDBCardBody>
                 <MDBCardBody>
                  {SegnalazioniVisibile && (
                      <div>
                       <SegnalazioneCISO/>
                      </div>
                  )}
                </MDBCardBody>
                <MDBCardBody>
                  {aggiungiLicenzaVisibile && (
                      <div>
                        <a>Licenza</a>
                        <input type="text" placeholder="Modifica nome..." className="form-control mb-3"
                               style={{maxWidth: '200px'}}/>
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
