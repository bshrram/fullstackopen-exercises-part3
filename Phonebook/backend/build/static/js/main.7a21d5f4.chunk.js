(window.webpackJsonppart2=window.webpackJsonppart2||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),u=t(2),i=function(e){var n=e.filter,t=e.handleFilterChange;return a.a.createElement("div",null,"filter shown with",a.a.createElement("input",{value:n,onChange:t}))},l=t(14);function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}var m=function(e){var n=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(t,!0).forEach(function(n){Object(l.a)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}({},e),t=n.addName,r=n.newName,o=n.newNumber,c=n.handleNameChange,u=n.handleNumberChange;return a.a.createElement("form",{onSubmit:t},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:r,onChange:c})),a.a.createElement("div",null,"number: ",a.a.createElement("input",{value:o,onChange:u})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},f=function(e){return a.a.createElement(a.a.Fragment,null,e.shownPersons.map(function(n){return a.a.createElement("div",{key:n.id},n.name," ",n.number+" ",a.a.createElement("button",{onClick:function(){return e.deletePerson(n)}},"delete"))}))},s=function(e){var n=e.message,t=e.errorState,r={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.color=t?"red":"green",null===n?null:a.a.createElement("div",{style:r},n)},b=t(3),h=t.n(b),p="/api/persons",g=function(){return h.a.get(p).then(function(e){return e.data})},v=function(e){return h.a.post(p,e).then(function(e){return e.data})},w=function(e,n){return h.a.put("".concat(p,"/").concat(e),n).then(function(e){return e.data})},O=function(e){return h.a.delete("".concat(p,"/").concat(e)).then(function(e){return e.data})},E=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(""),l=Object(u.a)(c,2),d=l[0],b=l[1],h=Object(r.useState)(""),p=Object(u.a)(h,2),E=p[0],j=p[1],y=Object(r.useState)(""),P=Object(u.a)(y,2),S=P[0],C=P[1],N=Object(r.useState)(null),k=Object(u.a)(N,2),D=k[0],F=k[1],I=Object(r.useState)(0),B=Object(u.a)(I,2),J=B[0],L=B[1];Object(r.useEffect)(function(){g().then(function(e){o(e)})},[]);var x=function(e,n){F(e),L(n),setTimeout(function(){F(null)},5e3)},z=""===S?t:t.filter(function(e){return e.name.toLowerCase().includes(S.toLowerCase())});return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(s,{message:D,errorState:J}),a.a.createElement(i,{filter:S,handleFilterChange:function(e){C(e.target.value)}}),a.a.createElement("h3",null,"add a new"),a.a.createElement(m,{addName:function(e){e.preventDefault();var n={name:d,number:E},r=t.find(function(e){return e.name===d});r?window.confirm("".concat(d," is already added to phonebook, replace the old number with a new one?"))&&w(r.id,n).then(function(e){x("Updated ".concat(e.name,"'s number"),0),o(t.map(function(n){return n.id!==r.id?n:e}))}).catch(function(e){x("Information of ".concat(r.name," has already been removed from server"),1),o(t.filter(function(e){return e.id!==r.id}))}):v(n).then(function(e){x("Added ".concat(e.name),0),o(t.concat(e)),b(""),j("")}).catch(function(e){x(e.response.data.error,1)})},newName:d,newNumber:E,handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){j(e.target.value)}}),a.a.createElement("h3",null,"Numbers"),a.a.createElement(f,{shownPersons:z,deletePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))&&O(e.id).then(function(n){x("deleted ".concat(e.name),0),o(t.filter(function(n){return n.id!==e.id}))}).catch(function(n){x("Information of ".concat(e.name," has already been removed from server"),1),o(t.filter(function(n){return n.id!==e.id}))})}}))};c.a.render(a.a.createElement(E,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.7a21d5f4.chunk.js.map