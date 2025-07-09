function App() {
  this.data = [];

  this.setState = function (newData) {
    this.data = newData;
    this.saveToStorage();
    this.render();
  };

  this.saveToStorage = function () {
    localStorage.setItem("todos", JSON.stringify(this.data));
  };

  // 할일 추가
  this.addTodo = function (name) {
    const newTodo = { id: Date.now(), name, isCompleted: false };
    this.setState([...this.data, newTodo]);
  };
  // 할일 완료 여부

  // 할일 수정

  // 할일 삭제

  this.render = function () {
    const root = document.querySelector("#root");
    root.innerHTML = `
      <h1>Todo List</h1>
      <form id="todo-form">
        <label for="task" class="sr-only">할 일을 입력하세요</label>
        <input type="text" id="task" placeholder="할 일을 입력하세요" required />
        <button>추가</button>
      </form>
      <ul id="todo-list">
        ${
          this.data.length
            ? this.data
                .map(function (todo) {
                  return `
              <li key="${todo.id}">
                <input type="checkbox" ${todo.isCompleted ? "checked" : ""}
                <span>${todo.name}</span>
                <button>삭제</button>
              </li>
            `;
                })
                .join("")
            : `<li>할 일이 아직 없습니다.</li>`
        }
      </ul>
    `;
    // 이벤트함수들
    const form = document.querySelector("#todo-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#task");
      const value = input.value.trim();
      if (!value) return;
      this.addTodo(value);
      console.log(this);
      input.value = "";
    });
  };
  this.init = function () {
    this.data = JSON.parse(localStorage.getItem("todos")) ?? [];
    this.render();
  };

  this.init();
}

export default App;
