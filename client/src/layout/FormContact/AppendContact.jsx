import FormContact from "./FormContact";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppendContact = () => {
    const navigate = useNavigate();
    const baseApiUrl = "http://localhost:5128/api/ContactManagement";

    const addCoontact = (contactName, contactEmail) => {
        const item = {
          name: contactName,
          email: contactEmail };
    
        let url = `${baseApiUrl}/contacts`;
        axios.post(url, item)
            .then(() => {navigate("/");}); 
    }

    return (
        <div className="card">
            <div className="card-header">
                <h1>Добавить контакт</h1>
            </div>
            <div className="card-body">
                <FormContact addCoontact={addCoontact}/>
            </div>
        </div>
    );
}

export default AppendContact;