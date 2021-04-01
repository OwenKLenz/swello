import React, { useState } from "react";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

const CardDescription = ({cardId, updateCard}) => {
  const description = useSelector(state => state.cards).find(card => card._id === cardId).description || ""
  const [editingDescription, setEditingDescription] = useState(false);
  const descriptionInput = useInput(description);

  const toggleEditing = () => {
    setEditingDescription(!editingDescription);
  }

  return (
    <form className="description">
      <p>Description</p>
      {editingDescription ?
      (<>
        <textarea class="textarea-toggle" rows="1" {...descriptionInput.bind}></textarea>
          <div>
            <div class="button" value="Save" onClick={() => {
              updateCard({ description: descriptionInput.value }, toggleEditing);
            }}
              >Save</div>
            <i class="x-icon icon" onClick={() => {
              descriptionInput.reset();
              toggleEditing();
            }}
              ></i>
          </div>
        </>)
          :
        (<>
          <span id="description-edit" className="link" onClick={toggleEditing}>
            Edit
          </span>
          <p className="textarea-overlay">
            {descriptionInput.value}
          </p>
        </>)
      }
      <p id="description-edit-options" className="hidden">
        You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
}

export default CardDescription