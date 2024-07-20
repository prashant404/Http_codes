import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  InputGroup,
} from "react-bootstrap";

const Search = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const responseCodes = [
        "100", "101", "200", "201", "202", "203", "204", "205", "206", "207",
        "300", "301", "302", "303", "304", "305", "306", "307", "400", "401",
        "402", "403", "404", "405", "406", "407", "408", "409", "410", "411",
        "412", "413", "414", "415", "416", "417", "418", "421", "422", "423",
        "424", "426", "428", "429", "431", "451", "500", "501", "502", "503",
        "504", "505", "506", "507", "508", "510", "511",
      ];

      const regex = new RegExp(`^${query.replace(/x/g, "\\d")}$`);
      const filteredCodes = responseCodes.filter((code) => regex.test(code));
      const imageUrls = filteredCodes.map(
        (code) => `https://http.dog/${code}.jpg`
      );

      setImages(imageUrls);
      setError(null);
    } catch (err) {
      setError("Error fetching images");
      console.error(err);
    }
  };

  const handleSaveList = async () => {
    const listName = prompt("Enter a name for this list");
    if (!listName) return;

    try {
      await axios.post(
        "https://http-codes-api.onrender.com/api/lists",
        {
          name: listName,
          responseCodes: images.map(
            (img) => img.split("/").pop().split(".")[0]
          ),
          imageLinks: images,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      alert("List saved successfully");
    } catch (err) {
      console.error("Error saving list:", err);
      alert("Error saving list");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="mb-4">
        <Card.Body>
          <h2 className="text-center mb-4">Search HTTP Status Dogs</h2>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formQuery">
              <Form.Label>Response Code or Pattern</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter response code or pattern (e.g., 2xx)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </InputGroup>
              <Form.Text className="text-muted">
                Enter multiple codes separated by commas.
              </Form.Text>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {images.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Search Results</h3>
          <Button variant="success" onClick={handleSaveList}>
            Save List
          </Button>
        </div>
      )}

      <Row className="g-4">
        {images.map((img, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={img} />
              <Card.Body>
                <Card.Title className="text-center">
                  {img.split("/").pop().split(".")[0]}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;