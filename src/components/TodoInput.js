function TodoInput({ onAdd }) {
  const $form = document.createElement("form");
  $form.id = "todo-form";
  $form.innerHTML = `
    <label for="task" class="sr-only">할 일을 입력하세요</label>
        <input type="text" id="task" placeholder="할 일을 입력하세요" required />
        <button>추가</button>
  `;

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#task");
    const value = input.value.trim();
    if (!value) return;
    this.addTodo(value);
    input.value = "";
  });

  return $form;
}

export default TodoInput;
