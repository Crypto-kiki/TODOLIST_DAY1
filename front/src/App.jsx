import axios from "axios";
import { useEffect, useState } from "react";
import ToDoCard from "./components/ToDoCard";
import CreateToDo from "./components/CreateToDo";

function App() {
  const [ToDoList, setToDoList] = useState();

  const getToDoList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo`
      );

      setToDoList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold ">Make Your To Do List📅</h1>
      <div>
        <div className="mt-10 font-semibold italic">
          <div className="mb-4 text-base">
            If I only had an hour to chop down a tree, I would spend the first
            45 minutes sharpening my axe, Abrabam Lincoln
          </div>
          <div className="text-sm">
            나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다,
            에비브러햄 링컨
          </div>
        </div>
      </div>
      <CreateToDo getToDoList={getToDoList} />
      <div className="mt-16 flex flex-col w-1/2">
        {ToDoList
          ? ToDoList.map((v, i) => {
              return (
                <ToDoCard
                  key={i}
                  title={v.title}
                  getToDoList={getToDoList}
                  index={i}
                  isDone={v.isDone}
                />
              );
            })
          : "로딩중 입니다...."}
      </div>
    </div>
  );
}

export default App;
