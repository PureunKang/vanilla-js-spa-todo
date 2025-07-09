function TodoList({ data, onToggle, onEdit, onCancel, onDelete, onSave }) {
  const $ul = document.createElement("ul");
  $ul.id = "todo-list";

  if (data.length === 0) {
    $ul.innerHTML = `
      <li>할 일이 아직 없습니다.</li>
    `;
    return $ul;
  }

  $ul.innerHTML = data
    .map(function (todo) {
      if (todo.isEditing) {
        return `
        <li data-id="${todo.id}">
            <input type="text" class="edit-input" value="${todo.name}" />
            <div class="button-group">
            <button class="save-btn">저장</button>
            <button class="cancel-btn">취소</button>
            </div>
          </li>
        `;
      } else {
        return `
  <li data-id="${todo.id}">
    <input type="checkbox" ${todo.isCompleted ? "checked" : ""} />
    <input 
      type="text" 
      class="todo-name" 
      value="${todo.name}" 
      ${todo.isCompleted ? "readonly" : ""} 
    />
    <div class="button-group">
      ${!todo.isCompleted ? '<button class="update-btn">수정</button>' : ""}
      <button class="delete-btn">삭제</button>
    </div>
  </li>
`;
      }
    })
    .join("");

  $ul.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const id = Number($li?.dataset.id);
    if (!id) return;

    if (e.target.matches(".delete-btn")) {
      const confirmed = confirm("정말 삭제하시겠습니까?");
      if (confirmed) onDelete(id);
    }

    if (e.target.matches('input[type="checkbox"]')) onToggle(id);

    if (e.target.matches(".update-btn")) onEdit(id);
    if (e.target.matches(".cancel-btn")) onCancel(id);

    if (e.target.matches(".save-btn")) {
      const newName = $li.querySelector(".edit-input").value.trim();
      if (newName) onSave(id, newName);
    }
  });

  return $ul;
}

export default TodoList;
