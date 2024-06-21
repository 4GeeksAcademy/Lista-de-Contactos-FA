import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan, faPhoneFlip, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../component/contactContext.js"; 

const Card = ({ id, name, phone, address, email }) => { 
  const { contacts, setContacts } = useContext(ContactContext);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/addcontact/${id}`);
  };

  const handleDeleteClick = () => {
    console.log(`Attempting to delete contact with ID: ${id}`);
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    const deleteUrl = `https://playground.4geeks.com/contact/agendas/GeFernando/contacts/${id}`;
    console.log(`DELETE URL: ${deleteUrl}`);

    fetch(deleteUrl, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(error => {
            console.error("Error response from server:", error);
            throw new Error("Failed to delete contact");
          });
        }
        
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
      });
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="https://img.freepik.com/foto-gratis/concepto-collage-html-css-persona_23-2150062008.jpg?t=st=1718429987~exp=1718433587~hmac=942896b11bbf528b73f88366ec196a875425c78e416005fbf52313a89de698bf&w=740"
              className="img-b"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-title">{name}</p>
              <p className="card-text">{phone}</p>
              <p className="card-text">
                <small className="text-body-secondary">{address}</small>
              </p>
              <p className="card-text">{email}</p>
              <span className="icono">
                <FontAwesomeIcon
                  icon={faPencil}
                  onClick={handleEditClick}
                  style={{ cursor: "pointer" }}
                />
              </span>
              <span className="icon">
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={handleDeleteClick}
                  style={{ cursor: "pointer" }}
                />
              </span>
              <span className="icon-a">
                <FontAwesomeIcon icon={faPhoneFlip} />
              </span>
              <span className="icon-b">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span className="icon-c">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;











