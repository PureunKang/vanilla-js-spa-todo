import TodoCount from "./components/TodoCount.js";
import TodoInput from "./components/TodoInput.js";
import TodoList from "./components/TodoList.js";

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

  // 각 컴포넌트에서 사용할 함수 모음
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

    root.innerHTML = "";

    root.append(
      TodoInput({ onAdd: (name) => this.addTodo(name) }),
      TodoCount(this.countTodo()),
      TodoList({
        data: this.data,
        onToggle: (id) => this.toggleTodo(id),
        onEdit: (id) => this.setEditing(id, true),
        onCancel: (id) => this.setEditing(id, false),
        onDelete: (id) => this.deleteTodo(id),
        onSave: (id, newName) => this.editTodo(id, newName),
      })
    );
  };
  this.init = function () {
    this.data = JSON.parse(localStorage.getItem("todos")) ?? [];
    this.render();
  };
  this.init();
}

export default App;
