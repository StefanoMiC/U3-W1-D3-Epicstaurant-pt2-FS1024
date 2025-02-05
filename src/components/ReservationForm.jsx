import { Component } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata (modello):

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    },

    alert: {
      isVisible: false,
      type: "",
      title: "",
      message: ""
    }
  };

  handleInputChange = (propertyName, propertyValue) => {
    this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
  };

  handleSubmit = (e) => {
    // ⚠️Importantissimo, prevenire il refresh della pagina
    e.preventDefault();
    console.log("SUBMIT", this.state.reservation);

    fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
      method: "POST",
      body: JSON.stringify(this.state.reservation),
      headers: { "Content-Type": "application/json" }
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Prenotazione non inviata");
        }
      })
      .then((createdReserv) => {
        this.setState({
          alert: {
            isVisible: true,
            type: "success",
            title: "Prenotazione inviata",
            message: `Hai creato una prenotazione per ${createdReserv.numberOfPeople} a nome di ${createdReserv.name} per il giorno: ${createdReserv.dateTime}`
          },
          reservation: {
            name: "",
            phone: "",
            numberOfPeople: "1",
            smoking: false,
            dateTime: "",
            specialRequests: ""
          }
        });
      })
      .catch((err) => {
        this.setState({
          alert: {
            isVisible: true,
            type: "danger",
            title: "Prenotazione fallita",
            message: err.message
          }
        });
      })
      .finally(() => {
        setTimeout(
          () =>
            this.setState({
              alert: {
                isVisible: false,
                type: "",
                title: "",
                message: ""
              }
            }),
          5000
        );
      });
  };

  render() {
    return (
      <Container fluid>
        <h2 className="text-center mt-5">Prenota Tavolo</h2>
        {this.state.alert.isVisible && (
          <Row className="justify-content-center">
            <Col xs={10} md={6}>
              <Alert
                variant={this.state.alert.type}
                dismissible
                onClose={() =>
                  this.setState({
                    alert: {
                      isVisible: false,
                      type: "",
                      title: "",
                      message: ""
                    }
                  })
                }
              >
                <Alert.Heading>{this.state.alert.title}</Alert.Heading>
                {this.state.alert.message}
              </Alert>
            </Col>
          </Row>
        )}
        <Row className="justify-content-center mb-4">
          <Col xs={10} md={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  required
                  value={this.state.reservation.name}
                  //   onChange={(e) => {
                  //     this.setState({ reservation: { ...this.state.reservation, name: e.target.value } });
                  //   }}

                  onChange={(e) => this.handleInputChange("name", e.target.value)}
                />
                {this.state.reservation.name.toLowerCase() === "astolfo" && <Form.Text className="text-danger">ma che brutto nome!</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+39333000222"
                  required
                  value={this.state.reservation.phone}
                  onChange={(e) => this.handleInputChange("phone", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="numberOfPeople">
                <Form.Label>Coperti</Form.Label>
                <Form.Select
                  aria-label="numero di coperti"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => this.handleInputChange("numberOfPeople", e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="smoking">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => this.handleInputChange("smoking", e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="dateTime">
                <Form.Label>Data e ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={this.state.reservation.dateTime}
                  onChange={(e) => this.handleInputChange("dateTime", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="specialRequests">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Inserisci eventuali allergie, intolleranze, ecc.."
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => this.handleInputChange("specialRequests", e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="success">
                Invia prenotazione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationForm;
