"use strict";(self.webpackChunk_coreui_coreui_pro_react_admin_template=self.webpackChunk_coreui_coreui_pro_react_admin_template||[]).push([[8076],{68076:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var r=t(65043),a=t(37924),i=t(11674);const n=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:3,name:"Chetan Mohamed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:4,name:"Derick Maximinus",registered:"2018/03/01",role:"Member",status:"Pending"},{id:5,name:"Friderik D\xe1vid",registered:"2018/01/21",role:"Staff",status:"Active"},{id:6,name:"Yiorgos Avraamu",registered:"2018/01/01",role:"Member",status:"Active"},{id:7,name:"Avram Tarasios",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:8,name:"Quintin Ed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:9,name:"En\xe9as Kwadwo",registered:"2018/03/01",role:"Member",status:"Pending"},{id:10,name:"Agapetus Tade\xe1\u0161",registered:"2018/01/21",role:"Staff",status:"Active"},{id:11,name:"Carwyn Fachtna",registered:"2018/01/01",role:"Member",status:"Active"},{id:12,name:"Nehemiah Tatius",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:13,name:"Ebbe Gemariah",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:14,name:"Eustorgios Amulius",registered:"2018/03/01",role:"Member",status:"Pending"},{id:15,name:"Leopold G\xe1sp\xe1r",registered:"2018/01/21",role:"Staff",status:"Active"},{id:16,name:"Pompeius Ren\xe9",registered:"2018/01/01",role:"Member",status:"Active"},{id:17,name:"Pa\u0109jo Jadon",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:18,name:"Micheal Mercurius",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:19,name:"Ganesha Dubhghall",registered:"2018/03/01",role:"Member",status:"Pending"},{id:20,name:"Hiroto \u0160imun",registered:"2018/01/21",role:"Staff",status:"Active"},{id:21,name:"Vishnu Serghei",registered:"2018/01/01",role:"Member",status:"Active"},{id:22,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:23,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:42,name:"Ford Prefect",registered:"2001/05/25",role:"Alien",status:"Don't panic!"}];var d=t(70579);const l=()=>{const[e,s]=(0,r.useState)([]),t=e=>{switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}};return(0,d.jsx)(a.Pd,{sorterValue:{column:"name",state:"asc"},clickableRows:!0,tableProps:{striped:!0,hover:!0},activePage:3,footer:!0,items:n,columns:[{key:"name",_style:{width:"40%"}},"registered",{key:"role",_style:{width:"20%"}},{key:"status",_style:{width:"20%"}},{key:"show_details",label:"",_style:{width:"1%"},filter:!1,sorter:!1}],columnFilter:!0,tableFilter:!0,cleaner:!0,itemsPerPageSelect:!0,itemsPerPage:5,columnSorter:!0,pagination:!0,scopedColumns:{status:e=>(0,d.jsx)("td",{children:(0,d.jsx)(a.$X,{color:t(e.status),children:e.status})}),show_details:t=>(0,d.jsx)("td",{className:"py-2",children:(0,d.jsx)(a.Q_,{color:"primary",variant:"outline",shape:"square",size:"sm",onClick:()=>{(t=>{const r=e.indexOf(t);let a=e.slice();-1!==r?a.splice(r,1):a=[...e,t],s(a)})(t.id)},children:e.includes(t.id)?"Hide":"Show"})}),details:s=>(0,d.jsx)(a.x8,{visible:e.includes(s.id),children:(0,d.jsxs)(a.W6,{children:[(0,d.jsx)("h4",{children:s.username}),(0,d.jsxs)("p",{className:"text-muted",children:["User since: ",s.registered]}),(0,d.jsx)(a.Q_,{size:"sm",color:"info",children:"User Settings"}),(0,d.jsx)(a.Q_,{size:"sm",color:"danger",className:"ml-1",children:"Delete"})]})})}})},c=()=>{const[e,s]=(0,r.useState)(n),t=e.map((e=>Object.values(e).join(","))).join("\n"),i="data:text/csv;charset=utf-8,SEP=,%0A"+encodeURIComponent(t);return(0,d.jsxs)(a.W6,{children:[(0,d.jsx)(a.Q_,{color:"primary",className:"mb-2",href:i,download:"coreui-table-data.csv",target:"_blank",children:"Download current items (.csv)"}),(0,d.jsx)(a.Pd,{columnFilter:!0,columnSorter:!0,items:n,itemsPerPage:5,onFilteredItemsChange:s,pagination:!0})]})},o=()=>{const[e,s]=(0,r.useState)([2,3]),t=n.map(((s,t)=>{const r=e.includes(t);return{...s,id:t,_selected:r,_classes:[s._classes,r&&"table-selected"]}})),i=e=>{switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}};return(0,d.jsxs)(a.W6,{children:["Selected: ",JSON.stringify(e),(0,d.jsx)(a.Pd,{items:t,columns:[{key:"select",label:"",filter:!1,sorter:!1},"name","registered","role","status"],itemsPerPage:5,columnFilter:!0,columnSorter:!0,pagination:!0,scopedColumns:{select:t=>(0,d.jsxs)("td",{children:[(0,d.jsx)(a.CK,{id:"checkbox".concat(t.id),checked:t._selected,onChange:r=>((t,r)=>{t.target.checked?s([...e,r]):s(e.filter((e=>e!==r)))})(r,t.id)}),(0,d.jsx)(a.A6,{variant:"custom-checkbox",htmlFor:"checkbox".concat(t.id)})]}),status:e=>(0,d.jsx)("td",{children:(0,d.jsx)(a.$X,{color:i(e.status),children:e.status})})},tableProps:{hover:!0}})]})},m=()=>(0,d.jsx)(a.sK,{children:(0,d.jsxs)(a.UF,{xs:12,children:[(0,d.jsxs)(a.E$,{className:"mb-4",children:[(0,d.jsxs)(a.V0,{children:[(0,d.jsx)("strong",{children:"CoreUI Smart Table"})," ",(0,d.jsx)("small",{children:"React Table Component"})]}),(0,d.jsx)(a.W6,{children:(0,d.jsx)(i.Eb,{href:"components/smart-table/",children:(0,d.jsx)(l,{})})})]}),(0,d.jsxs)(a.E$,{className:"mb-4",children:[(0,d.jsxs)(a.V0,{children:[(0,d.jsx)("strong",{children:"CoreUI Smart Table"})," ",(0,d.jsx)("small",{children:"Table with selectable rows"})]}),(0,d.jsx)(a.W6,{children:(0,d.jsx)(i.Eb,{href:"components/smart-table/",children:(0,d.jsx)(o,{})})})]}),(0,d.jsxs)(a.E$,{className:"mb-4",children:[(0,d.jsxs)(a.V0,{children:[(0,d.jsx)("strong",{children:"CoreUI Smart Table"})," ",(0,d.jsx)("small",{children:"Table with selectable rows"})]}),(0,d.jsx)(a.W6,{children:(0,d.jsx)(i.Eb,{href:"components/smart-table/",children:(0,d.jsx)(c,{})})})]})]})})}}]);
//# sourceMappingURL=8076.a4966b93.chunk.js.map