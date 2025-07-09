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
    const newTodo = {
      id: Date.now(),
      name,
      isCompleted: false,
      isEditing: false,
    };
    this.setState([...this.data, newTodo]);
  };
  // 할일 완료 여부
  this.toggleTodo = function (id) {
    const updated = this.data.map((todo) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    this.setState(updated);
  };
  // 할일 수정
  this.editTodo = function (id, newName) {
    const updated = this.data.map((todo) => {
      return todo.id === id
        ? { ...todo, name: newName, isEditing: false }
        : todo;
    });
    this.setState(updated);
  };
  // 할일 수정 상태일때 렌더링 제어
  this.setEditing = function (id, editing) {
    const updated = this.data.map((todo) =>
      todo.id === id ? { ...todo, isEditing: editing } : todo
    );
    this.setState(updated);
  };
  // 할일 삭제
  this.deleteTodo = function (id) {
    const updated = this.data.filter((todo) => todo.id !== id);
    this.setState(updated);
  };

  // 완료된 할일, 전체 할일 카운트
  this.countTodo = function () {
    return {
      totalTodo: this.data.length,
      completedTodo: this.data.filter((todo) => todo.isCompleted).length,
    };
  };

  this.render = function () {
    const root = document.querySelector("#root");

    const { totalTodo, completedTodo } = this.countTodo();
    const hasTodos = totalTodo > 0;

    root.innerHTML = `
      <h1>Todo List</h1>
      <form id="todo-form">
        <label for="task" class="sr-only">할 일을 입력하세요</label>
        <input type="text" id="task" placeholder="할 일을 입력하세요" required />
        <button>추가</button>
      </form>

       ${
         hasTodos
           ? `<div id="todo-count">총 ${totalTodo}개 / 완료 ${completedTodo}개</div>`
           : ""
       }

      <ul id="todo-list">
        ${
          this.data.length
            ? this.data
                .map(function (todo) {
                  if (todo.isEditing) {
                    return `
                    <li data-id="${todo.id}">
                        <input type="text" class="edit-input" value="${todo.name}" />
                        <button class="save-btn">저장</button>
                        <button class="cancel-btn">취소</button>
                      </li>
                    `;
                  } else {
                    return `
              <li data-id="${todo.id}">
                <input type="checkbox" ${todo.isCompleted ? "checked" : ""} />
                <span>${todo.name}</span>
                ${
                  !todo.isCompleted
                    ? '<button class="update-btn">수정</button>'
                    : ""
                }
                <button class="delete-btn">삭제</button>
              </li>
            `;
                  }
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

      if (e.target.matches(".update-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        this.setEditing(id, true);
      }

      if (e.target.matches(".cancel-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        this.setEditing(id, false);
      }

      if (e.target.matches(".save-btn")) {
        const id = Number(e.target.closest("li").dataset.id);
        const li = e.target.closest("li");
        const input = li.querySelector(".edit-input");
        const newName = input.value.trim();
        if (newName) {
          this.editTodo(id, newName);
        }
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
