(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{61:function(e,t,n){},62:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},75:function(e,t,n){},76:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),o=n(12),r=n.n(o),a=(n(61),n(14)),s=n(28),l=n(9),d=(n(62),n(101)),u=i.a.createContext({token:"",userId:"",login:function(){},logout:function(){}}),j=n(2),b=function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),n=t[0],o=t[1],r=i.a.useRef(null),s=i.a.useRef(null),l=Object(c.useContext)(u);return Object(j.jsxs)("form",{className:"auth-form",onSubmit:function(e){e.preventDefault();var t=r.current.value,c=s.current.value;if(console.log(t,c),console.log(l),0!==t.trim().length&&0!==c.trim().length){var i={query:"\n        query Login($email: String!, $password: String!){\n          login(email: $email, password: $password) {\n            userId\n            token\n            tokenExpiration\n          }\n        }\n      ",variables:{email:t,password:c}};n||(i={query:"\n          mutation CreateUser($email: String!, $password: String!){\n            createUser(userInput: {email: $email, password: $password}) {\n              _id\n              email\n            }\n          }\n        ",variables:{email:t,password:c}}),fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(e){console.log(e),e.data.login.token&&l.login(e.data.login.token,e.data.login.userId,e.data.login.tokenExpiration)})).catch((function(e){console.log(e)}))}},children:[Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"email",children:"Email"}),Object(j.jsx)("input",{type:"email",id:"email",ref:r})]}),Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"password",children:"Password"}),Object(j.jsx)("input",{type:"password",id:"password",ref:s})]}),Object(j.jsxs)("div",{className:"form-action",children:[Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",children:"Submit"}),Object(j.jsxs)(d.a,{variant:"contained",color:"primary",type:"button",onClick:function(){o((function(e){return!e}))},children:["Switch to ",n?"Signup":"Login"]})]})]})},h=n(102),O=(n(67),function(){return Object(j.jsx)("div",{className:"spinner",children:Object(j.jsx)(h.a,{})})}),m=(n(68),function(e){return Object(j.jsx)("ul",{className:"bookings__list",children:e.bookings.map((function(t){return Object(j.jsxs)("li",{className:"bookings__item",children:[Object(j.jsxs)("div",{className:"bookings__item-data",children:[t.event.title," -"," ",new Date(t.createdAt).toLocaleDateString()]}),Object(j.jsx)("div",{className:"bookings__item-actions",children:Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",className:"btn",onClick:function(){return e.onDelete(t._id)},children:"Cancel"})})]},t._id)}))})}),p=n(103),f=n(29),x=n(8),g=function(e){var t=[{priceRange:"low",anz:e.bookings.reduce((function(e,t){return t.event.price<2?e+1:e}),0)},{priceRange:"medium",anz:e.bookings.reduce((function(e,t){return(2<t.event.price&&t.event.price<5)<5?e+1:e}),0)},{priceRange:"high",anz:e.bookings.reduce((function(e,t){return 5<t.event.price&&t.event.price<10?e+1:e}),0)}];return Object(j.jsx)(p.a,{children:Object(j.jsxs)(f.c,{data:t,children:[Object(j.jsx)(f.a,{}),Object(j.jsx)(f.e,{max:7}),Object(j.jsx)(f.b,{valueField:"anz",argumentField:"priceRange",color:"rgba(78, 0, 129, 0.5)"}),Object(j.jsx)(f.d,{text:"Bookings"}),Object(j.jsx)(x.a,{})]})})},v=(n(70),function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),n=t[0],o=t[1],r=Object(c.useState)([]),s=Object(a.a)(r,2),l=s[0],b=s[1],h=Object(c.useState)(!0),p=Object(a.a)(h,2),f=p[0],x=p[1],v=Object(c.useContext)(u);Object(c.useEffect)((function(){k()}),[]);var k=function(){if(v.token){o(!0);fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify({query:"\n        query {\n          bookings {\n            _id\n            createdAt\n            updatedAt\n            event {\n              _id\n              title\n              date\n              price\n            }\n            \n          }\n        }\n      "}),headers:{"Content-Type":"application/json",Authorization:"Bearer "+v.token}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(e){var t=e.data.bookings;b(t),o(!1)})).catch((function(e){console.log(e),o(!1)}))}else b(null)};return Object(j.jsx)(i.a.Fragment,{children:n?Object(j.jsx)(O,{}):Object(j.jsxs)(i.a.Fragment,{children:[Object(j.jsxs)("div",{className:"switchButtons",children:[Object(j.jsx)(d.a,{disabled:f,variant:"contained",color:"primary",type:"submit",className:"switchBtn",onClick:function(){return x(!0)},children:"List"}),Object(j.jsx)(d.a,{disabled:!f,variant:"contained",color:"primary",type:"submit",className:"switchBtn",onClick:function(){return x(!1)},children:"Chart"})]}),f?Object(j.jsx)(m,{bookings:l,onDelete:function(e){if(v.token){o(!0);var t={query:"\n        mutation CancelBooking($bookingId: ID!) {\n          cancelBooking(bookingId: $bookingId) {\n            _id\n            title\n          }\n        }\n      ",variables:{bookingId:e}};fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json",Authorization:"Bearer "+v.token}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(t){b((function(t){return t.filter((function(t){return t._id!==e}))})),o(!1)})).catch((function(e){console.log(e),o(!1)}))}}}):Object(j.jsx)(g,{bookings:l})]})})}),k=n(49),y=(n(71),function(e){return Object(j.jsxs)("div",{className:"modal",children:[Object(j.jsx)("header",{className:"modal__header",children:Object(j.jsx)("h1",{children:e.title})}),Object(j.jsx)("section",{className:"modal__content",children:e.children}),Object(j.jsxs)("section",{className:"modal__actions",children:[e.canCancel&&Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",className:"btn",onClick:function(){e.onCancel()},children:"Cancel"}),e.canConfirm&&Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",className:"btn",onClick:function(){e.onConfirm()},children:e.confirmText})]})]})}),w=(n(72),function(e){return Object(j.jsx)("div",{className:"backdrop"})}),_=(n(73),n(74),n(75),function(e){return Object(j.jsxs)("li",{className:"event__list-item",children:[Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:e.title}),Object(j.jsxs)("h2",{children:[e.price,"$"]}),Object(j.jsx)("h2",{children:new Date(e.date).toLocaleDateString("de")})]}),Object(j.jsx)("div",{children:e.userId!==e.creatorId?Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",className:"btn",onClick:function(){return e.onDetail(e.eventId)},children:"View Details"}):Object(j.jsx)("p",{children:"You are the Owner"})})]},e._id)}),C=function(e){var t=e.events.map((function(t){return Object(j.jsx)(_,{eventId:t._id,title:t.title,price:t.price,date:t.date,userId:e.authUserId,creatorId:t.creator._id,onDetail:e.onViewDetail},t._id)}));return Object(j.jsx)("ul",{className:"event__list",children:t})},N=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),n=Object(c.useRef)(null),o=Object(c.useRef)(null),r=Object(c.useState)(!1),s=Object(a.a)(r,2),l=s[0],b=s[1],h=Object(c.useState)([]),m=Object(a.a)(h,2),p=m[0],f=m[1],x=Object(c.useState)(!1),g=Object(a.a)(x,2),v=g[0],_=g[1],N=Object(c.useState)(null),S=Object(a.a)(N,2),I=S[0],E=S[1],F=Object(c.useContext)(u);Object(c.useEffect)((function(){_(!0);fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify({query:"\n        query {\n          events {\n            _id\n            title\n            description\n            date\n            price\n            creator {\n              _id\n              email\n            }\n          }\n        }\n      "}),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(e){f(e.data.events),_(!1)})).catch((function(e){console.log(e),_(!1)}))}),[]);var $=function(){b(!1),E(null)};return Object(j.jsxs)(i.a.Fragment,{children:[F.token&&Object(j.jsxs)("div",{className:"events-control",children:[Object(j.jsx)("p",{children:"Share your own Events!"}),Object(j.jsx)(d.a,{variant:"contained",color:"primary",type:"submit",onClick:function(){return b(!0)},children:"Create Event"})]}),v?Object(j.jsx)(O,{}):Object(j.jsx)(C,{events:p,authUserId:F.userId,onViewDetail:function(e){E(p.find((function(t){return t._id===e})))}}),(l||I)&&Object(j.jsx)(w,{}),l&&Object(j.jsx)(y,{title:"Add Event",canCancel:!0,canConfirm:!0,onCancel:function(){$()},onConfirm:function(){!function(){var c=e.current.value,i=+t.current.value,r=n.current.value,a=o.current.value;if(!(0===c.trim().length||i<=0||0===r.trim().length||0===a.trim().length)){var s={title:c,price:i,date:r,description:a};console.log(s),b(!1);var l={query:"\n        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){\n          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {\n            _id\n            title\n            description\n            date\n            price\n          }\n        }\n      ",variables:{title:c,description:a,price:i,date:r}};fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json",Authorization:"Bearer "+F.token}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(e){console.log(e),f((function(t){return[].concat(Object(k.a)(t),[{_id:e.data.createEvent._id,title:e.data.createEvent.title,description:e.data.createEvent.description,date:e.data.createEvent.date,price:e.data.createEvent.price,creator:{_id:F.userId}}])}))})).catch((function(e){console.log(e)}))}}()},confirmText:"Confirm",children:Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"title",children:"Title"}),Object(j.jsx)("input",{type:"text",id:"title",ref:e})]}),Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"price",children:"Price"}),Object(j.jsx)("input",{type:"number",id:"price",ref:t})]}),Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"date",children:"Date"}),Object(j.jsx)("input",{type:"datetime-local",id:"date",ref:n})]}),Object(j.jsxs)("div",{className:"form-control",children:[Object(j.jsx)("label",{htmlFor:"description",children:"Description"}),Object(j.jsx)("textarea",{id:"description",row:"4",ref:o})]})]})}),I&&Object(j.jsxs)(y,{title:I.title,canCancel:!0,canConfirm:!0,onCancel:function(){$()},onConfirm:function(){!function(){if(F.token){var e={query:"\n        mutation BookEvent($eventId: ID!){\n          bookEvent(eventId: $eventId) {\n            _id\n            createdAt\n            updatedAt\n          }\n        }\n      ",variables:{eventId:I._id}};fetch("https://bookingbackendlucwag.herokuapp.com/graphql",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:"Bearer "+F.token}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("Fetch Failed");return e.json()})).then((function(e){console.log(e),E(null)})).catch((function(e){console.log(e),E(null)}))}else E(null)}()},confirmText:F.token?"Book":"Sign in to book",children:[Object(j.jsxs)("h1",{children:["Eventname: ",I.title]}),Object(j.jsxs)("h2",{children:[I.price,"$"]}),Object(j.jsx)("h2",{children:new Date(I.date).toLocaleDateString()}),Object(j.jsx)("p",{children:I.description})]})]})},S=(n(76),function(){var e=Object(c.useContext)(u);return Object(j.jsxs)("header",{className:"main-navigation",children:[Object(j.jsx)("div",{className:"main-navigation__logo",children:Object(j.jsx)("h1",{children:"BookingApp"})}),Object(j.jsx)("nav",{className:"main-navigation__items",children:Object(j.jsxs)("ul",{children:[Object(j.jsx)("li",{children:Object(j.jsx)(s.b,{to:"/events",children:"Events"})}),e.token&&Object(j.jsxs)(i.a.Fragment,{children:[Object(j.jsx)("li",{children:Object(j.jsx)(s.b,{to:"/bookings",children:"Bookings"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){return e.logout()},className:"LogOutButton",children:"Logout"})})]}),!e.token&&Object(j.jsx)("li",{children:Object(j.jsx)(s.b,{to:"/auth",children:"Authentication"})})]})})]})});n(78);var I=function(){var e=Object(c.useState)(""),t=Object(a.a)(e,2),n=t[0],i=t[1],o=Object(c.useState)(""),r=Object(a.a)(o,2),d=r[0],h=r[1];return Object(j.jsx)(s.a,{children:Object(j.jsxs)(u.Provider,{value:{token:n,userId:d,login:function(e,t,n){i(e),h(t)},logout:function(){i(""),h("")}},children:[Object(j.jsx)(S,{}),Object(j.jsx)("main",{className:"main-content",children:Object(j.jsxs)(l.d,{children:[n&&Object(j.jsx)(l.a,{from:"/",to:"/events",exact:!0}),n&&Object(j.jsx)(l.a,{from:"/auth",to:"/events",exact:!0}),!n&&Object(j.jsx)(l.b,{path:"/auth",component:b}),Object(j.jsx)(l.b,{path:"/events",component:N}),n&&Object(j.jsx)(l.b,{path:"/bookings",component:v}),!n&&Object(j.jsx)(l.a,{to:"/auth",exact:!0})]})})]})})};r.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(I,{})}),document.getElementById("root"))}},[[79,1,2]]]);
//# sourceMappingURL=main.a34a7711.chunk.js.map