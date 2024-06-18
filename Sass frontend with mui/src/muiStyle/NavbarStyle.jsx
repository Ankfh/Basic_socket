import { styled } from "@mui/system";
import { Button , TextField} from "@mui/material";

export const EnterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  backgroundColor: "red",
  // marginTop: "6px",
  fontWeight: "600px",
  fontSize: "16px",
  borderRadius: "4px",
  fontFamily: "Source Sans Pro",

  fontStyle: "normal",
  lineHeight: "24px",
  boxShadow: "none",
  // width: "143px",
  color: "#FFFFFF",
  // width: 'auto',
  "&.MuiButtonBase-root": {
    padding: "10px 80px",
    height: "42px",
  backgroundColor: "black",

  },

  textalign: "center",

  [theme.breakpoints.down("570")]: {
    width: "100%",
  },

  "&:hover": {
    backgroundColor: "red",
    boxShadow: "none",
  },
  "&:focus": {
    backgroundColor: "#266E20",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#266E20",
  },
}));


export const MuiTextfield = styled(TextField)(({ theme }) => ({
 color: 'white',
  fontWeight: "600px",
  fontSize: "16px",
  borderRadius: "4px",
  fontFamily: "Source Sans Pro",
  "& .MuiSvgIcon-root": {
   
  },
  "& .Mui-error": {
    // backgroundColor: "#FFF8F7",
    // borderColor: "#DE3730",
  },
  "& .MuiFormLabel-root":{
    fontWeight: "600px",
    fontSize: "16px",
    borderRadius: "4px",
    fontFamily: "Source Sans Pro",
    "&.Mui-focused ": {

      color: "white",
    },
    color: 'white'
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid white",

    
    },
    "&:hover fieldset": {
      borderRadius: "4px",
      border: "1px solid white",
    color: 'white'

    },
    "&.Mui-focused fieldset": {
      border: "1px solid white",


    },
  },
  "& .MuiInputBase-root": {
    fontWeight: "600px",
    fontSize: "16px",
    borderRadius: "4px",
    fontFamily: "Source Sans Pro",
    color:'white'
  },
  input: {
    '&:-webkit-autofill': {
      '-webkit-text-fill-color': 'white',
      '-webkit-box-shadow': '0 0 0px 1000px rgb(30 41 59 / var(--tw-bg-opacity)) inset',
    },  
    "&::placeholder": {
      fontFamily: "Source Sans Pro",

      FontStyle: "Regular",
      fontWeight: "300",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "6px",
      color: "white",
      opacity: 1,
    },

    // "& .MuiInput-inputTypeSearch": {

  
  },
  [theme.breakpoints.down("sm")]: {
   
  },
}));