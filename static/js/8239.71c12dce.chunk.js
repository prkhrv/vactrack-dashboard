"use strict";(self.webpackChunk_coreui_coreui_pro_react_admin_template=self.webpackChunk_coreui_coreui_pro_react_admin_template||[]).push([[8239],{52530:(e,s,a)=>{a.d(s,{A:()=>i});a(65043);var t=a(37924),r=a(70579);const i=function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"danger";return(0,r.jsx)(t.JY,{autohide:!0,visible:!0,color:s,className:"text-white align-items-center",children:(0,r.jsxs)("div",{className:"d-flex",children:[(0,r.jsx)(t.Bw,{children:e}),(0,r.jsx)(t.vo,{className:"me-2 m-auto",white:!0})]})})}},42315:(e,s,a)=>{a.d(s,{LS:()=>o,iF:()=>n});var t=a(77154),r=a(95824);const i="http://54.244.70.182",o=async(e,s)=>{try{return(await t.A.post("".concat(i).concat(e),s)).data}catch(a){return 401===a.response.status?{statusCode:401,message:"You are not authorized to send this request"}:403===a.response.status?{statusCode:403,message:"The credentials you have provided are invalid"}:{statusCode:400,message:a.response.data.message}}},n=async(e,s)=>{try{const a=r.A.getToken();return(await t.A.post("".concat(i).concat(e),s,{headers:{"user-token":a}})).data}catch(a){return 401===a.response.status?{statusCode:401,message:"You are not authorized to send this request"}:403===a.response.status?{statusCode:403,message:"The credentials you have provided are invalid"}:{statusCode:400,message:a.response.data.message}}}},58239:(e,s,a)=>{a.r(s),a.d(s,{default:()=>h});var t=a(65043),r=a(37924),i=a(6145),o=a(3550),n=a(52530),l=a(42315),c=a(95824),d=a(73216),u=a(70579);const h=()=>{const e=(0,d.Zp)(),[s,a]=(0,t.useState)(0),[h,m]=(0,t.useState)(!1),p=(0,t.useRef)(),x=(0,n.A)("Please enter the valid email"),[v,g]=(0,t.useState)("");return(0,u.jsxs)("div",{className:"bg-light min-vh-100 d-flex flex-row align-items-center",children:[(0,u.jsx)(r.Yq,{className:"p-3",placement:"top-end",push:s,ref:p}),(0,u.jsx)(r.T5,{children:(0,u.jsx)(r.sK,{className:"justify-content-center",children:(0,u.jsx)(r.UF,{md:6,children:(0,u.jsx)(r.x$,{children:(0,u.jsx)(r.E$,{className:"p-4",children:(0,u.jsx)(r.W6,{children:(0,u.jsxs)(r.qI,{className:"needs-validation",noValidate:!0,validated:h,onSubmit:async s=>{const t=s.currentTarget;if(!1===t.checkValidity()&&(a(x),s.preventDefault(),s.stopPropagation()),m(!0),!0===t.checkValidity()){s.preventDefault();const t=await(0,l.LS)("/auth/forgot/password",{email:v});console.log("Response : ",t),t&&(a((0,n.A)("OTP Sent to your email Successfully","success")),c.A.verifyPassword(t.token),c.A.setNextPage("/reset-password"),e("/mfa"))}s.preventDefault()},children:[(0,u.jsx)("h1",{children:"Forgot Password"}),(0,u.jsx)("p",{className:"text-medium-emphasis",children:"Please enter your email so that we can verify you"}),(0,u.jsxs)(r.BG,{className:"mb-3",children:[(0,u.jsx)(r.sk,{children:(0,u.jsx)(i.A,{icon:o.o})}),(0,u.jsx)(r.OG,{type:"email",placeholder:"Email",autoComplete:"email",feedbackValid:"Looks good!",feedbackInvalid:"Please enter a Valid Email",id:"email",onChange:e=>g(e.target.value),required:!0})]}),(0,u.jsxs)(r.sK,{children:[(0,u.jsx)(r.UF,{xs:6,children:(0,u.jsx)(r.Q_,{color:"primary",className:"px-4",type:"submit",children:"Verify Me"})}),(0,u.jsx)(r.UF,{xs:6,className:"text-right"})]})]})})})})})})})]})}},3550:(e,s,a)=>{a.d(s,{o:()=>t});var t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z' class='ci-primary'/>"]}}]);
//# sourceMappingURL=8239.71c12dce.chunk.js.map