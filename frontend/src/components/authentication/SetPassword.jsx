







// code will be used when we set passsword flow with link






// import React, { useState, useEffect, useContext } from "react";
// import { Headercontext } from "../Headerdata/HeaderData";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "../layout";
// import Innerlayout from "../layout/Innerlayout";
// import Inputbox from "../common/Inputbox";
// import Button from "../common/Button";
// import { Link } from "react-router-dom";




// const SetPassword = () => {
//   const onSubmit = (e) => {
//     e.preventdefault
//     if (confirmPassword == newPassword) {
//       user.confirmPassword(verificationCode, newPassword, {
//         onSuccess: (data) => {
//           setLoader(false);
//           console.log("onSuccess:", data);
//           setToastMessage({
//             display: true,
//             message: "password updated succesfully",
//           });
//           setLogin(true);
//           setForgetPassword(false);
//         },
//         onFailure: (err) => {
//           setLoader(false);
//           setError({
//             isError: true,
//             message: err.message || JSON.stringify(err),
//           });
//         },
//       });
//     } else {
//       setLoader(false);
//       setError({
//         isError: true,
//         message: "Password and confirmed password are diffferent",
//       });
//     }
//   };

//   return (
//     <Layout>
//       <Innerlayout heading={"Set Password"} onSubmit={(e)=>{onSubmit(e)}}>
//         <Inputbox
//           type="password"
//           placeholder="********"
//           required
//           heading="Password"
//         />
//         <Inputbox
//           type="password"
//           placeholder="********"
//           required
//           heading="Repeat Password"
//         />
//         <Button
//           actiontype={"Set Password"}
//           action={() => {
//             console.log("scdcscsdcs");
//           }}
//         />
//       </Innerlayout>
//     </Layout>
//   );
// };

// export default SetPassword;
