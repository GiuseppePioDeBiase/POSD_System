import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardText } from 'mdb-react-ui-kit';

export default function ProfiloUR({ token }) {
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });

  useEffect(() => {
    const fetchProfilo = async () => {
      try {
        if (!token) {
          throw new Error("Token non disponibile");
        }

        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, [token]);

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

    // Qui inserisci la logica per inviare le modifiche del profilo
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol lg="4" className="mb-4">
          <MDBCard className="h-auto w-auto justify-content-center mx-5">
            <MDBCardBody className="mx-5">
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
              <MDBCardText>
                <strong>Nome:</strong> {profilo.nome}
              </MDBCardText>
              <hr />
              <MDBCardText>
                <strong>Cognome:</strong> {profilo.cognome}
              </MDBCardText>
              <hr />
              <MDBCardText>
                <strong>Email:</strong> {profilo.email}
              </MDBCardText>
              <hr />
              <MDBCardText>
                <strong>Ruolo:</strong> {profilo.ruolo}
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mb-4">
            <MDBCardBody>
              {modificaProfiloVisibile && (
                <div>
                  <label>Password</label>
                  <input type="password" placeholder="Modifica password..." className="form-control mb-3" style={{ maxWidth: '200px' }} onChange={handlePasswordChange} />
                  <label>Conferma Password</label>
                  <input type="password" placeholder="Conferma password..." className="form-control mb-3" style={{ maxWidth: '200px' }} onChange={handleConfermaPasswordChange} />
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
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

ProfiloUR.propTypes = {
  token: PropTypes.string.isRequired
};
