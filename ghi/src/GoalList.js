import React, { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPencil } from "@fortawesome/free-solid-svg-icons";
import GoalForm from './GoalForm';
import UpdateForm from './UpdateForm';
import './Popup.css';

function GoalList() {
  const { token } = useToken();

  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [goalId, setGoalId] = useState(null)

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

  function closeForm () {
    setShowModal(false);
  }

  function closeFormUpdate() {
    setShowModalUpdate(false);
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

    // Update the is_completed field in local storage
    localStorage.setItem(`goal_${id}_isCompleted`, isCompleted.toString());

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

  const handleEdit = async (id) => {
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
    setShowModalUpdate(true);

    // UPDATE goal
    const editUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/goal/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ id: goal.id, goal: goal.goal}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const editResponse = await fetch(editUrl, fetchConfig);

    if (editResponse.ok) {
      const editData = await editResponse.json();
      setGoals(goals.map((goal) => {
        if(goal.id === id) {
          return { ...goal, goal: editData.goal};
        } else {
          return goal;
        }
      }))
    } else {
      console.error("Could not update goal");
    }
  }

  return (
    <>
      <div className="rounded-lg text-center">
        <table className="ml-auto mr-auto mt-3">
          <thead>
            <tr>
              <th className="text-3xl">Daily Goals</th>
            </tr>
          </thead>
          {goals.length === 0 ? (
            <p>No goals for today</p>
          ) : (
          <tbody>
            {goals.map((goal) => {
              const prevIsCompleted = localStorage.getItem(`goal_${goal.id}_isCompleted`) === "true" || false;
              return (
                <tr key={goal.id}>
                  <td>
                    <input
                      type="checkbox"
                      // checked={goal.isCompleted}
                      checked={prevIsCompleted ? true : false}
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
                        onClick={() => [
                          handleEdit(goal.id), setGoalId(goal.id)]}
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
          )}
        </table>

        {/* goal popup */}
        {showModal ? (
            <div className="modal-backdrop-popup">
                <div className="modal-content-popup">
                    <GoalForm onClose={closeForm} />
                </div>
            </div>
        ) : showModalUpdate ? (
          <div className="modal-backdrop-popup">
                <div className="modal-content-popup">
                    <UpdateForm onClose={closeFormUpdate} id={goalId} />
                </div>
            </div>
        ) : null}
        <button className="bg-orange-400 hover:bg-orange-500 text-black py-2 px-4 rounded-full" onClick={() => setShowModal(true)}>Add Goal</button>
      </div>
    </>
  );
}

export default GoalList;
