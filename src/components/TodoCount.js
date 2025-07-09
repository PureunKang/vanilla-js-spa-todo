function TodoCount({ totalTodo, completedTodo }) {
  const $div = document.createElement("div");
  $div.id = "todo-count";

  // 할 일 목록이 있을 경우에만 렌더링
  const hasTodos = totalTodo > 0;
  $div.innerHTML = hasTodos
    ? `총 ${totalTodo}개 / 완료 ${completedTodo}개`
    : "";

  return $div;
}

export default TodoCount;
