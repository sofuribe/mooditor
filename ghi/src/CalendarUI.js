import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceLaughBeam,
  faFaceTired,
  faSmileBeam,
  faFaceMeh,
  faBookOpen,
  faPersonRunning,
  faDumbbell,
  faPersonWalking,
  faGamepad,
  faPersonSnowboarding,
  faPersonBiking,
  faPersonSwimming,
  faPersonHiking,
  faPersonSkiing,
  faKitchenSet,
  faBed,
} from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const moodIcons = {
  great: faFaceLaughBeam,
  good: faSmileBeam,
  okay: faFaceMeh,
  awful: faFaceTired,
};

const activityIcons = {
  Reading: {
    icon: faBookOpen,
    label: "Reading",
  },
  Running: {
    icon: faPersonRunning,
    label: "Running",
  },
  Gym: {
    icon: faDumbbell,
    label: "Gym",
  },
  Walking: {
    icon: faPersonWalking,
    label: "Walking",
  },
  Snowboarding: {
    icon: faPersonSnowboarding,
    label: "Snowboarding",
  },
  Biking: {
    icon: faPersonBiking,
    label: "Biking",
  },
  Swimming: {
    icon: faPersonSwimming,
    label: "Swimming",
  },
  Hiking: {
    icon: faPersonHiking,
    label: "Hiking",
  },
  Skiing: {
    icon: faPersonSkiing,
    label: "Skiing",
  },
  Cooking: {
    icon: faKitchenSet,
    label: "Cooking",
  },
  Sleeping: {
    icon: faBed,
    label: "Sleeping",
  },
  Games: {
    icon: faGamepad,
    label: "Games",
  },
  Yoga: {
    label: "Yoga",
  },
  Meditate: {
    label: "Meditate",
  },
  Sports: {
    label: "Sports",
  },
};

export default function Calendar() {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/entries`;
        const fetchConfig = {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        }
      }
    };
    fetchData();
  }, [token]);

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayEntries = entries.filter((entry) =>
    isSameDay(parseISO(entry.created), selectedDay)
  );

  return (
    <div className="pt-10">
      <div className="max-w-sm rounded overflow-hidden shadow-lg px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900 text-lg mt-5">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "font-black font-weight:800",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-gray-900",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>
                  <div className="w-3 h-3 mx-auto mt-1">
                    {entries.some((entry) =>
                      isSameDay(parseISO(entry.created), day)
                    ) && (
                      <div
                        className={`w-3 h-3 rounded-full ${
                          entries.find((entry) =>
                            isSameDay(parseISO(entry.created), day)
                          ).mood === "awful"
                            ? "bg-red-500"
                            : entries.find((entry) =>
                                isSameDay(parseISO(entry.created), day)
                              ).mood === "okay"
                            ? "bg-yellow-500"
                            : entries.find((entry) =>
                                isSameDay(parseISO(entry.created), day)
                              ).mood === "good"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-5 md:pl-10 text-lg">
            <h2 className="font-semibold text-gray-900">
              Entries for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
              {selectedDayEntries.length > 0 ? (
                selectedDayEntries.map((entry) => (
                  <EntryData entry={entry} key={entry.id} />
                ))
              ) : (
                <p>No entries for this day.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}

function EntryData({ entry }) {
  const icon = moodIcons[entry.mood];
  return (
    <>
      <div>
        <div className="font-semibold text-gray-900">
          <FontAwesomeIcon icon={icon} size="4x" />
        </div>
      </div>
      <div>
        <p className="font-semibold text-gray-900">
          {" "}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {entry.activity_name.map((activity) => {
              const activityIcon = activityIcons[activity]?.icon;
              return (
                <span key={activity}>
                  <FontAwesomeIcon icon={activityIcon} size="4x" />
                </span>
              );
            })}
          </div>
        </p>
      </div>
      <div className="flex-auto">
        <div className="font-semibold text-gray-900">
          Journal: {entry.journal}
        </div>
      </div>
    </>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
