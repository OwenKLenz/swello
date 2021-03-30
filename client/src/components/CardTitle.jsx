import React from "react";
import useInput from "../hooks/useInput";

const CardTitle = ({updateCard, card}) => {

  const titleField = useInput(card.title);

  return (
    <>
      <i className="card-icon icon .close-modal"></i>
      <textarea
        className="list-title"
        style={{ height: "45px" }}
        onBlur={() => updateCard({title: titleField.value}, titleField.reset)}
        {...titleField.bind}
        >
      </textarea>
    </>
  )
}

export default CardTitle;