import React, { useState } from 'react';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

export default function ProfiloCISO() {
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [password, setPassword] = useState('');
  const [confermaPassword, setConfermaPassword] = useState('');

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
                Bentornato <strong>Lorenzo</strong>
              </p>
              <p className="text-muted mb-1">CISO</p>

              <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-warning" onClick={toggleModificaProfilo}>
                  Modifica profilo
                </button>
                <button className="btn btn-warning ms-1">Gestisci Segnalazioni</button>
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
                    <MDBCardText className="text-muted">Lorenzo</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Cognome</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Calabrese</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Lorenzocalabarese@gmail.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Ruolo</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">CISO</MDBCardText>
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
              <MDBCard className="mb-4 mb-md-0 w-full">
                <MDBCardBody>
                  {modificaProfiloVisibile && (
                    <div>
                      <a>Nome</a>
                      <input type="text" placeholder="Modifica nome..." className="form-control mb-3" style={{ maxWidth: '200px' }} />
                      <a>Cognome</a>
                      <input type="text" placeholder="Modifica cognome..." className="form-control mb-3" style={{ maxWidth: '200px' }} />
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
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
