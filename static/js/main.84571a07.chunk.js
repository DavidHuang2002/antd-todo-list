(this["webpackJsonpantd-todo-list"]=this["webpackJsonpantd-todo-list"]||[]).push([[0],{224:function(t,e,o){},226:function(t,e,o){"use strict";o.r(e);var n=o(0),r=o(27),a=o.n(r),s=o(5),d=o(14),c=o(15),i=o(18),l=o(17),u=o(230),h=o(232),j=o(229),v=o(141),b=o(231),f=o(29),x=b.a.Title,y=b.a.Paragraph,O=b.a.Text;function p(t,e){for(var o=0;o<t.length;o++)if(t[o].id===e)return o;throw console.error("no todo item with that id!")}function g(t){var e=t.addTodo,o=Object(n.useState)(""),r=Object(s.a)(o,2),a=r[0],d=r[1];return Object(f.jsx)(h.a,{placeholder:"What needs to be done?",value:a,onChange:function(t){d(t.target.value)},onPressEnter:function(t){e(t.target.value),d("")}})}function m(t){var e=t.todo,o=t.onRemove,n=t.onDateChange;return Object(f.jsx)(u.b.Item,{actions:[Object(f.jsx)(j.a,{onChange:function(t,o){return n(t,e.id)},value:e.date}),Object(f.jsx)(v.a,{onClick:function(){o(e.id)}})],children:e.content})}var I=function(t){Object(i.a)(o,t);var e=Object(l.a)(o);function o(t){var n;return Object(d.a)(this,o),(n=e.call(this,t)).undo=function(){var t=n.state,e=t.todos,o=t.nextId,r=n.state.history,a=r.prev,s=r.current;if(a&&0!==s){s?s-=1:(s=a.length-1,a=a.concat({todos:e,nextId:o}));var d={prev:a,current:s};n.setState({history:d}),n.setState(a[s])}else console.log("Undo failed: no history revert back to")},n.redo=function(){var t=n.state.history,e=t.current,o=t.prev;e===o.length-1&&(e=null),null!==e?(e+=1,n.setState({history:{prev:o,current:e}}),n.setState(o[e])):console.log("redo fails: no state to redo to")},n.addInput=function(t){var e=n.state,o=e.todos,r=e.nextId,a=o.concat({id:r,content:t,date:null});n.editTodos(a),n.setState({nextId:r+1})},n.removeItem=function(t){var e=n.state.todos,o=p(e,t),r=e.slice();r.splice(o,1),n.editTodos(r)},n.handleDateChange=function(t,e){var o=n.state.todos,r=p(o,e),a=Object.assign({},o[r]);a.date=t;var s=o.slice();s[r]=a,n.editTodos(s)},n.state={history:{prev:[],current:null},todos:[],nextId:0},n}return Object(c.a)(o,[{key:"editTodos",value:function(t){var e=this.state,o=e.todos,n=e.nextId,r=e.history,a=r.prev,s=r.current;(s||0===s)&&(a=a.slice(0,s),s=null);var d={prev:a.concat({todos:o,nextId:n}),current:s};this.setState({history:d}),this.setState({todos:t})}},{key:"componentDidMount",value:function(){var t=this;window.addEventListener("keydown",(function(e){e.ctrlKey&&e.shiftKey&&"z"===e.key.toLowerCase()?t.redo():e.ctrlKey&&"z"===e.key.toLowerCase()&&t.undo()}))}},{key:"render",value:function(){var t=this;return Object(f.jsxs)("div",{className:"todoContainer",children:[Object(f.jsxs)(b.a,{children:[Object(f.jsx)(x,{children:"ToDo List"}),Object(f.jsxs)(y,{children:["Press ",Object(f.jsx)(O,{keyboard:!0,children:"Enter"})," to input a list item"]}),Object(f.jsxs)(y,{children:["Use ",Object(f.jsx)(O,{keyboard:!0,children:"Ctrl+Z"})," to undo,",Object(f.jsx)(O,{keyboard:!0,children:"Ctrl+Shift+Z"})," to redo"]})]}),Object(f.jsx)(g,{addTodo:this.addInput}),Object(f.jsx)(u.b,{dataSource:this.state.todos,locale:{emptyText:"Nothing todo yet"},renderItem:function(e){return Object(f.jsx)(m,{todo:e,onRemove:t.removeItem,onDateChange:t.handleDateChange})}})]})}}]),o}(n.Component);o(224),o(225);a.a.render(Object(f.jsx)(I,{}),document.getElementById("root"))}},[[226,1,2]]]);
//# sourceMappingURL=main.84571a07.chunk.js.map