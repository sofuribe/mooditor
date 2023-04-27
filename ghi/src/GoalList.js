import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import GoalForm from './GoalForm';
import './Popup.css';

function GoalList() {
  const { token } = useToken();

    const [goals, setGoals] = useState([]);
    const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goals`;
        const fetchConfig = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(goalUrl, fetchConfig);

                if (response.ok) {
                    const data = await response.json();
                    setGoals(data);
                }
            }
        }
        fetchData();
    }, [token]);

  function openForm() {
    setShowModal(true);
  }

  function closeForm () {
    setShowModal(false);
  }


  const handleDelete = async (id) => {
    const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(goalUrl, fetchConfig);

    if (response.ok) {
      setGoals(goals.filter((goal) => goal.id !== id));
      toast("Goal Deleted!");
    } else {
      console.error("Could not delete goal");
    }
  };


  const handleCheckboxChange = async (event, id) => {
    const isCompleted = event.target.checked ? true : false;
    const goalUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;

    // GET the goal with matching id
    const response = await fetch(goalUrl, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Could not retrieve goal");
      return;
    }

    const goal = await response.json();

    // UPDATE the is_completed
    const updateUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ goal: goal.goal, is_completed: isCompleted }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const updateResponse = await fetch(updateUrl, fetchConfig);

        if (updateResponse.ok) {
            const updateData = await updateResponse.json();
            setGoals(goals.map((goal) => {
                if(goal.id === id) {
                    return { ...goal, is_completed: updateData.is_completed};
                } else {
                    return goal;
                }

            }));
            toast("Congrats, Goal Completed!")
        } else {
            console.error("Could not update goal")
        }
    };

    const handleEdit = async () => {
        setShowModal(true);

   }


  return (
    <>
      <div className="rounded-lg">
        <table className="ml-auto mr-auto mt-3">
          <thead>
            <tr>
              <th className="text-3xl">Daily Goals</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => {
              return (
                <tr key={goal.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={goal.isCompleted}
                      onChange={(event) => handleCheckboxChange(event, goal.id)}
                    />
                  </td>
                  <td className={goal.isCompleted ? "completed" : ""}>
                    {goal.goal}
                  </td>
                  <td>
                    <button>
                      <FontAwesomeIcon
                        icon={faPencil}
                        type="button"
                        onClick={() => {
                          handleEdit(goal.id);
                          openForm();
                        }}
                      />
                    </button>
                  </td>
                  <td>
                    <button>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        type="button"
                        onClick={() => handleDelete(goal.id)}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
                {/* goal popup */}
                {showModal ? (
                    <div className="modal-backdrop-popup">
                        <div className="modal-content-popup">
                            <GoalForm onClose={closeForm} />
                        </div>
                    </div>
                ) : null}
                <button className="bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full" onClick={() => setShowModal(true)}>Add Goal</button>
      </div>
    </>
  );
}

export default GoalList;
