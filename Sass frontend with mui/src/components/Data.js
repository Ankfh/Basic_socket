// import { Button } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { useState } from "react";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import {
//   useCreateUserMutation,
//   useDeleteUserMutation,
//   useGetAllProductsQuery,
//   useUploadPhotoMutation,
// } from "../features/apiSlice";
// import { EnterButton } from "../muiStyle/NavbarStyle";

// export const Data = () => {
//   const [textValue, settextValue] = useState();
//   const [photo, setphoto] = useState();
//   const token = JSON.parse(localStorage.getItem("token"));

//   const {
//     data: allProductsData,
//     error,
//     isError,
//     isLoading,
//   } = useGetAllProductsQuery(token);

//   // const { data: singleProductData } = useGetProductQuery("iphone");

//   const [CreateUser] = useCreateUserMutation();
//   const [DeleteUser] = useDeleteUserMutation();
//   const [UploadPhoto, { data: image }] = useUploadPhotoMutation();

//   console.log(allProductsData, "allllllproo");
//   // console.log(singleProductData);

//   const textChange = (e) => {
//     settextValue(e.target.value);
//     console.log(e.target.value, "targettt");
//   };
//   const buttonClick = () => {
//     CreateUser(textValue)
//       .unwrap()
//       .then((res) => {
//         if (res?.success === true) {
//           localStorage.setItem("token", JSON.stringify(res.token));
//           localStorage.setItem("name", JSON.stringify(res.user.userName));
//         }
//         console.log(res, "ressss");
//       });
//   };

//   const deleteIconClick = (e) => {
//     console.log(e, "iddddd");
//     DeleteUser(e);
//   };

//   const uploadPhoto = (e) => {
//     console.log(e.target.files, "filess");
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file);
//     setphoto(URL.createObjectURL(e.target.files[0]));
//     UploadPhoto(formData)
//       .unwrap()
//       .then((res) => {
//         if (res?.success === true) {
//           console.log(res);
//         }
//         console.log(res, "ressss");
//       });
//   };
//   console.log(image, "imageeeeeee");
//   if (isLoading) return <h1> Loading...</h1>;
//   return (
//     <div className="flex  w-full s justify-around justify-items-center items-center content-center pt-10">
//       <div className="grid gap-2">
//         {" "}
//         <TextField
//           onChange={(e) => textChange(e)}
//           id="outlined-basic"
//           label="Name"
//           variant="outlined"
//         />
//         <EnterButton
//           onClick={buttonClick}
//           color={"secondary"}
//           variant="contained"
//         >
//           Enter
//         </EnterButton>
//       </div>
//       <div>
//         {" "}
//         {allProductsData.transferProduct.map((itm) => (
//           <div className="flex gap-6">
//             <div> Name: {itm.userName}</div>
//             <div
//               onClick={() => deleteIconClick(itm._id)}
//               className="cursor-pointer"
//             >
//               <DeleteForeverIcon />
//             </div>
//           </div>
//         ))}{" "}
//       </div>
//       <div>
//         <input type="file" onChange={(e) => uploadPhoto(e)} />
//       </div>
//       <div>
//         <img width={200} height={200} src={photo} alt="" />
//       </div>
//     </div>
//   );
// };
