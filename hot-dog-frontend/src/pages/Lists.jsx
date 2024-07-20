import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Alert, Button, Modal, Form } from 'react-bootstrap';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(null);
  const [expandedListId, setExpandedListId] = useState(null);
  const [editingList, setEditingList] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lists', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setLists(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching lists');
        console.error('Error fetching lists:', err);
      }
    };

    if (user) {
      fetchLists();
    }
  }, [user]);

  const handleExpand = (listId) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  const handleDelete = async (listId) => {
    try {
      await axios.delete(`http://localhost:5000/api/lists/${listId}`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setLists(lists.filter(list => list._id !== listId));
    } catch (err) {
      console.error('Error deleting list:', err);  // Added detailed logging
      alert('Error deleting list');
    }
  };

  const handleEdit = (list) => {
    setEditingList({ ...list });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/lists/${editingList._id}`, { name: editingList.name }, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      setLists(lists.map(list => (list._id === editingList._id ? { ...list, name: editingList.name } : list)));
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating list:', err);
      alert('Error updating list');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingList({ ...editingList, [name]: value });
  };

  return (
    <Container className="mt-5">
      <h1>Saved Lists</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {lists.length > 0 ? (
          lists.map((list) => (
            <Col md={4} key={list._id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title onClick={() => handleExpand(list._id)} style={{ cursor: 'pointer' }}>
                    {list.name}
                  </Card.Title>
                  {expandedListId === list._id && (
                    <Card.Text>
                      {list.imageLinks.length > 0 ? (
                        list.imageLinks.map((img, index) => (
                          <img src={img} alt={`Saved image ${index}`} key={index} style={{ width: '100%' }} />
                        ))
                      ) : (
                        <p>No images available</p>
                      )}
                    </Card.Text>
                  )}
                  <Button variant="warning" onClick={() => handleEdit(list)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(list._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No lists found</p>
        )}
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formListName">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editingList?.name || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Lists;
