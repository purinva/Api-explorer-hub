import axios from 'axios';
import React, {useState, useEffect} from "react";
import TableContact from "./layout/TableContact/TableContact";
import FormContact from "./layout/FormContact/FromContact";

const baseApiUrl = "http://localhost:5128/api/ContactManagement";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const url = `${baseApiUrl}/contacts`;
  useEffect(() => {
    axios.get(url).then(res => setContacts(res.data));
  }, []);

  const addCoontact = (contactName, contactEmail) => {
    const item = {
      name: contactName,
      email: contactEmail
    };

    const url = `${baseApiUrl}/contacts`;
    axios.post(url, item).then(response => setContacts([...contacts, response.data]));
  }

  const deleteContact = (id) => {
    const url = `${baseApiUrl}/contacts/${id}`;
    axios.delete(url, id);
    setContacts(contacts.filter(item => item.id !== id));
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1>Список контактов</h1>
        </div>
        <div className="card-body">
          <TableContact contacts={contacts} deleteContact={deleteContact}/>
          <FormContact addCoontact={addCoontact}/>
        </div>
      </div>
    </div>
  );
}

export default App;