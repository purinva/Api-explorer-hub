import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const baseApiUrl = window.config.apiUrl;

const ContactDetails = (props) => {
    const [contact, setContact] = useState({name:"", email:""});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${baseApiUrl}/contacts/${id}`;
        axios.get(url).then(
            response => setContact(response.data))
                .catch(err => { navigate("/"); })
    }, [id, navigate]);

    const handleRemove = () => {
        const url = `${baseApiUrl}/contacts/${id}`;
        if (window.confirm("Вы уверены?")) {
            axios.delete(url).then( () => {
                props.onUpdate();
                navigate("/");
            }).catch(console.log("Ошибка удаления"));
        }
    }

    const handleUpdate = () => {
        const url = `${baseApiUrl}/contacts/${id}`;
        axios.put(url, contact).then( () => {
            props.onUpdate();
            navigate("/");
        })
        .catch(console.log("Ошибка обновления"));
    }

    return (<div className="container mt-5">
        <h2>Детали контакта</h2>
        <div className="mb-3">
            <label className="form-label">Имя: </label>
            <input
                className="form-control"
                type="text"
                value={contact.name}
                onChange={(e) => { setContact({...contact, name:e.target.value}) }}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Email: </label>
            <input
                className="form-control"
                type="email"
                value={contact.email}
                onChange={(e) => { setContact({...contact, email:e.target.value}); }}/>
        </div>
        <button 
            className="btn btn-prima me-2" onClick={(e) => { handleUpdate(); }}>
            Обновить
        </button>

        <button 
            className="btn btn-danger" onClick={(e) => { handleRemove(); }}>
            Удалить
        </button>

        <button 
            className="btn btn-secondary ms-2" onClick={(e) => { navigate("/") }}>
            Назад
        </button>
    </div>);
}

export default ContactDetails;