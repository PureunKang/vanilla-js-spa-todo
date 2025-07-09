# Vanilla JS SPA Todo App

## 1. 프로젝트 개요

- 이 프로젝트는, [Vanilla-JS-SPA-Todo-Spec Checklist](https://github.com/PureunKang/vanilla-js-spa-todo/issues/1) 이슈 기반, 명세에 맞게 필수 기능을 구현한 SPA Todo 웹앱입니다.

---

## 2. 주요 기능

- 할 일 목록 조회
- 할 일 추가
- 할 일 삭제
- 완료 여부 토글
- 완료된 할 일 갯수
- 전체 할일 삭제 / 완료 처리

---

## 3. 폴더 구조

```
├── src/
│   ├── components/
│   │   ├── TodoCount.js
│   │   ├── TodoFullControls.js
│   │   ├── TodoInput.js
│   │   └── TodoList.js
│   ├── App.js
│   └── index.js
├── style/
│   └── styles.css
├── index.html
└── README.md
```

---

## 4. 기술 스택

- JavaScript (ES6+)
- HTML5 / CSS3
- Live Server (VS Code Extension)

---

## 5. 학습 사항, 트러블슈팅 등

- 이해 및 접근 방식

React의 주요 개념에 익숙하기 때문에, Vanilla JS 코드를 다음과 같이 React 개념에 대응시켜 해석하고 작업 진행하였습니다.

| Vanilla JS 메서드 | React 개념                 | 이해 및 접근방식                 |
| ----------------- | -------------------------- | -------------------------------- |
| `this.init()`     | `useEffect()`              | 초기 마운트 시 세팅 및 로직 실행 |
| `this.setState()` | `setState()`               | 상태 변경 및 리렌더 트리거       |
| `this.render()`   | `return (...)` 또는 리렌더 | 뷰를 다시 그리는 역할            |

- 트러블슈팅 <br>
  진행 중 에러를 [에러일기](https://titanium-layer-01a.notion.site/_for_vanilla-js-spa-todo-22b6fd95803b80039028c03cf52d3ceb)에 정리하였습니다. <br>
  평소 에러 기록하여 학습하는 방식 그대로 정리했으며, 공유 목적이 아닌 개인 학습 용도임을 참고 바랍니다.

- 추가 학습사항<br>
  [this 바인딩](https://velog.io/@pureunkang/this)

---

## 6. 실행 방법

- VS Code에서 Live Server Extension 설치 후 사용합니다.
