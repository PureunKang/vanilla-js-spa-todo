function TodoFullControls({ data, onClearAll, onCompleteAll }) {
  // 할 일 목록이 있을 때만 '전체 삭제','전체 완료' 버튼 디스플레이
  if (data.length === 0) return null;

  const $divForBtn = document.createElement("div");
  $divForBtn.id = "todo-full-controls";

  const $clearAllBtn = document.createElement("button");
  $clearAllBtn.textContent = "전체 삭제";
  $clearAllBtn.id = "clear-all-btn";

  const $completeAllBtn = document.createElement("button");
  $completeAllBtn.textContent = "전체 완료";
  $completeAllBtn.id = "complete-all-btn";

  $clearAllBtn.addEventListener("click", (e) => {
    const confirmed = confirm("정말 전체 목록을 삭제하시겠습니까?");
    if (confirmed) onClearAll();
  });
  $completeAllBtn.addEventListener("click", (e) => {
    const confirmd = confirm("정말 목록 모두를 전체 완료 처리하시겠습니까?");
    if (confirmd) onCompleteAll();
  });

  $divForBtn.append($completeAllBtn, $clearAllBtn);
  return $divForBtn;
}

export default TodoFullControls;
