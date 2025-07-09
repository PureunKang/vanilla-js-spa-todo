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
  this.toggleTodo = function (id) {
    const update = this.data.map((todo) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    this.setState(update);
  };
  // 할일 수정

  // 할일 삭제
  this.deleteTodo = function (id) {
    const updated = this.data.filter((todo) => todo.id !== id);
    this.setState(updated);
  };

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
              <li data-id="${todo.id}">
                <input type="checkbox" ${todo.isCompleted ? "checked" : ""}
                <span>${todo.name}</span>
                <button class="delete-btn">삭제</button>
              </li>
            `;
                })
                .join("")
            : `<li>할 일이 아직 없습니다.</li>`
        }
      </ul>
    `;
    // 이벤트함수들
    const $form = document.querySelector("#todo-form");
    const $list = document.querySelector("#todo-list");

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.querySelector("#task");
      const value = input.value.trim();
      if (!value) return;
      this.addTodo(value);
      input.value = "";
    });

    $list.addEventListener("click", (e) => {
      if (e.target.matches(".delete-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        const confirmed = confirm("정말 삭제하시겠습니까?");
        if (confirmed) this.deleteTodo(id);
      }

      if (e.target.matches('input[type="checkbox"]')) {
        const id = Number(e.target.closest("li").dataset.id);
        this.toggleTodo(id);
      }
    });
  };
  this.init = function () {
    this.data = JSON.parse(localStorage.getItem("todos")) ?? [];
    this.render();
  };

  this.init();
}

export default App;
