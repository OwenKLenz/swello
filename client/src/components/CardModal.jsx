import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import { updateCard } from "../../../server/controllers/cardsController";
import {fetchCard, updateCard, deleteCard} from '../actions/CardActions';

import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import CardCommentInput from "./CardCommentInput";
import Comment from "./Comment";
import Action from "./Action";

import DueDatePopover from "./DueDatePopover";

const CardModal = () => {
  const dispatch = useDispatch();
  const {id} = useParams()
  const card = useSelector(state => state.cards).find(card => card._id === id)
  let listTitle;
  let lists = useSelector(state => state.lists)
  let list;
  let activities = useSelector(state => state.comments.concat(state.actions.map(action => {
    return {...action, isAction: true}
  })));
  ;
  const actions = useSelector(state => state.actions)

  const [editingDescription, setEditingDescription] = useState(false);
  const [dueDatePopoverDisplay, setDueDatePopoverDisplay] = useState(false);

  useEffect(() => {
    dispatch(fetchCard(id))
  }, [dispatch, id])

  if (card && lists) {
    list = lists.find(list => list._id === card.listId)

    if (!list) return null;
    activities = activities.filter(activity => {
      return activity.cardId === id;
    })
    activities.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    listTitle = list.title;
  } else {
    return null;
  }
  console.log("actions", actions)

  const handleArchive = (e) => {
    e.preventDefault()
    let newArchive = !card.archived
    updateCardProperty({archived: newArchive , action: newArchive ? "this card was archived" : "this card was returned to the board" })

  }

  const handleDelete = (e) => {
    dispatch(deleteCard(id))
  }

  const updateCardProperty = (properties, callback)  => { // {title: 'newval'}
      dispatch(updateCard({cardId: card._id, updates: properties}, callback))
  }

  const renderArchived = () => {
    if (!card.archived) {
      return (
      <li className="archive-button" onClick={handleArchive}>
        <i className="file-icon sm-icon "></i>Archive
        </li>
      )
    }

    return (<>
      <li class="unarchive-button" onClick={handleArchive}>
        <i class="send-icon sm-icon">
      </i>Send to board</li>
      <Link to={`/boards/${card.boardId}`}>
        <li class="red-button" onClick={handleDelete}>
          <i class="minus-icon sm-icon">
        </i>Delete</li>
      </Link>
    </>)
  }

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        {dueDatePopoverDisplay && <DueDatePopover togglePopover={() => setDueDatePopoverDisplay(!dueDatePopoverDisplay)}/>}
          <Link to={"/boards/" + card.boardId}><i className="x-icon icon close-modal"></i></Link>
          <header>
            <CardTitle updateCard={updateCardProperty} card={card} />
            <p>
              in list <a className="link">{listTitle}</a>
              <i className="sub-icon sm-icon"></i>
            </p>
          </header>
          <section className="modal-main">
            <ul className="modal-outer-list">
              <li className="details-section">
                <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {card.labels && card.labels.map(label => {
                      return (
                        <div className="member-container">
                         <div className={`${label} label colorblindable`}></div>
                      </div>
                      )
                    })}
                    <div className="member-container">
                      <i className="plus-icon sm-icon"></i>
                    </div>
                </li>
                {card.dueDate && (<li className="due-date-section">
                  <h3>Due Date</h3>
                  <div id="dueDateDisplay" className="overdue completed">
                    <input
                      id="dueDateCheckbox"
                      type="checkbox"
                      className="checkbox"
                      checked=""
                    />
                    {card.dueDate} <span>(past due - to be fixed)</span>
                  </div>
                </li>)}
              </ul>
              <CardDescription cardId={card._id} updateCard={updateCardProperty} />
            </li>
            <CardCommentInput />
            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>
              <ul className="modal-activity-list">
                {
                  activities.map(activity => {
                    if (activity.isAction) {
                      return <Action action={activity}/>
                    }
                    return <Comment comment={activity} />
                  })
                }
                <li>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <h3>Taylor Peat</h3>
                  <div className="comment static-comment">
                    <span>The activities are not functional.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        The activities have not been implemented yet.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
                <li>
                  <div className="member-container">
                    <div className="card-member small-size">VR</div>
                  </div>
                  <p>
                    <span className="member-name">Victor Reyes</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li className="activity-comment">
                  <div className="member-container">
                    <div className="card-member">VR</div>
                  </div>
                  <h3>Victor Reyes</h3>
                  <div className="comment static-comment">
                    <span>Example of a comment.</span>
                  </div>
                  <small>
                    22 minutes ago - <span className="link">Edit</span> -{" "}
                    <span className="link">Delete</span>
                  </small>
                  <div className="comment">
                    <label>
                      <textarea required="" rows="1">
                        Example of a comment.
                      </textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                      </div>
                      <div>
                        <p>You haven&apos;t typed anything!</p>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                        <i className="x-icon icon"></i>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button" onClick={() => setDueDatePopoverDisplay(!dueDatePopoverDisplay)}>
              <i className="clock-icon sm-icon" ></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            {renderArchived()}
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CardModal;