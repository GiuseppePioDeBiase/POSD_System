

/*DA COMPLETARE NON TOCCATE */

/*PEPPE DEL FUTURO CONTROLLA DAL FILE ELIMINA.JSX
* RICORDA CHE IL NUOVO PROFILO SI CREA DAL MODIFICA E CONTROLLA SE SI REGISTRA
* AGGIUNGI UNA SCLETA PER AS E CISO*/


import  { useState, useEffect } from 'react';
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
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types'

export default function ProfiloAS(props) {

  const navigate= useNavigate();
  const [modificaProfiloVisibile, setModificaProfiloVisibile] = useState(false);
  const [AggiungiProfiloVisibile, setAggiungiProfiloVisibile] = useState(false);
  const [profilo, setProfilo] = useState({ nome: '', cognome: '', email: '', ruolo: '' });

    const toggleModificaProfilo = () => {
    setModificaProfiloVisibile(!modificaProfiloVisibile);
    setAggiungiProfiloVisibile(false); // Close Aggiungi Utenti if Modifica Profilo is opened
    };

  const toggleAggiungiProfilo = () => {
    setAggiungiProfiloVisibile(!AggiungiProfiloVisibile);
    setModificaProfiloVisibile(false); // Close Modifica Profilo if Aggiungi Utenti is opened
    };

      const [RegistrazioneForm, setRegistrazioneForm] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        ruolo:'',
    });
      function registrami(event) {
        event.preventDefault();
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:5000/api/registrazione', // Endpoint di registrazione
                data: {
                    nome: RegistrazioneForm.nome,
                    cognome: RegistrazioneForm.cognome,
                    email: RegistrazioneForm.email,
                    password: RegistrazioneForm.password,
                    ruolo:RegistrazioneForm.ruolo
            }
        })
        .then(() => {


                navigate('/'); // Reindirizza al profilo
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        setRegistrazioneForm({
            nome: '',
            cognome: '',
            email: '',
            password: '',
            confirmPassword: '',
            ruolo:''
        });
    }


  function handleChange(event) {
        const { value, name } = event.target;
        setRegistrazioneForm((prevNote) => ({
            ...prevNote,
            [name]: value
        }));
    }


  useEffect(() => {

    const fetchProfilo = async () => {
      const token = props.token
      if (!token) {
        console.error("Token non disponibile");
        return;
      }
      console.log("Token:", token)
      try {

        const response = await fetch('http://localhost:5000/api/profilo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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





  const handleSubmit = () => {


    ProfiloAS.propTypes = {
     token: PropTypes.string.isRequired
    };

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
                  style={{width: '150px'}}
                  fluid
              />
              <p className="text-muted mb-2" style={{fontSize: '2rem'}}>
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
                style={{width: '50px', display: 'block', margin: '0 auto'}}
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
                            onChange={handleChange}
                            autoComplete="off"
                            type="text"
                            placeholder="Inserisci nome..."
                            className="form-control mb-3"
                            value={RegistrazioneForm.nome}
                            style={{maxWidth: '200px'}}/>
                        <a>Cognome</a>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            type="text"
                            placeholder="Inserisci cognome..."
                            className="form-control mb-3"
                            value={RegistrazioneForm.cognome}
                            style={{maxWidth: '200px'}}/>
                        <a>Password</a>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            type="text"
                            placeholder="Inserisci email..."
                            className="form-control mb-3"
                            value={RegistrazioneForm.email}
                            style={{maxWidth: '200px'}}
                        />
                        <a>Password</a>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            type="text"
                            placeholder="Inserisci password..."
                            className="form-control mb-3"
                            value={RegistrazioneForm.password}
                            style={{maxWidth: '200px'}}/>
                        <a>Ruolo</a>
                        <input
                            onChange={handleChange}
                            autoComplete="off"
                            type="text"
                            placeholder="Inserisci ruolo..."
                            className="form-control mb-3"
                            value={RegistrazioneForm.ruolo}
                            style={{maxWidth: '200px'}}/>
                        <div className="d-flex justify-content-end">
                          <button className="btn btn-success" onClick={registrami}>
                            Conferma Registrazione
                          </button>
                        </div>
                      </div>
                  )}
                </MDBCardBody>

                <MDBCardBody>
                  {AggiungiProfiloVisibile && (
                      <div>
                        <a>Nome</a>
                        <input type="text" placeholder="Inserisci nome..." className="form-control mb-3"
                               style={{maxWidth: '200px'}}/>
                        <a>Cognome</a>
                        <input type="text" placeholder="Inserisci cognome..." className="form-control mb-3"
                               style={{maxWidth: '200px'}}/>
                        <a>Email</a>
                        <input type="text" placeholder="Inserisci Email..." className="form-control mb-3"
                               style={{maxWidth: '200px'}}/>
                        <a>Password</a>
                        <input type="text" placeholder="Inserisci password..." className="form-control mb-3"
                               style={{maxWidth: '200px'}}/>
                        <a>Ruolo</a>
                        <select >
                          <option value="someOption" >Amministratore di Sistema</option>
                          <option value="otherOption">CISO</option>
                        </select>
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
