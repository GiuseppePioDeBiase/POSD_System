import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,

  MDBProgress,
  MDBProgressBar,

} from 'mdb-react-ui-kit';
import Button from "@mui/material/Button";
import axios from "axios";
import { useState} from 'react';
import {Link} from "react-router-dom";

export default function ProfileUR(email) {
  const [DettagliUtente, setDettagliUtente] = useState([]);

        if (email) {
            const fetchPatternDetails = async () => {
                    const response = await axios.get(`http://localhost:5000/api/Utenti=${encodeURIComponent(email)}`);
                    setDettagliUtente(response.data);
            };

            fetchPatternDetails();
        }
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="totti.jpeg"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                 <Link to="/Partecipa">
                  <Button
                    className="ms-1 text-white py-2 px-4 rounded"
                    style={{ backgroundColor: 'black' }}
                  >
                    Partecipa
                  </Button>
                </Link>
              </MDBCardBody>
            </MDBCard>
             <MDBCard className="mb-7 h-auto">
              <MDBCardBody>
                <div className=" p-4">
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted ">{DettagliUtente.nome}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{DettagliUtente.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="4">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{DettagliUtente.indirizzo}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                  </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">


            <MDBRow>
              <MDBCol md="10" className="align-right">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Storico</span> </MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}