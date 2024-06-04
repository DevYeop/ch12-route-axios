const todoItem = { todo: 'todo', desc: 'desc' };

let { todo } = todoItem;
// let { todo } = { todoItem }; // 객체안의 객체. 잘못된 문법
console.log(todo);

function test({ todo, desc }) {
  console.log(todo);
  todo = '원본의 데이터는 바뀌지 않는다';
  console.log(todo);
}

test(todoItem); // 원본객체의 참조를 전달하지만, 구조분해할당으로 인해 값이 복사되기에 원본이 수정될일이 없다.

console.log('after:', todo);
