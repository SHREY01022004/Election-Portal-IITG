import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./RegisterScreen.module.css";
import TopNav from "../../components/Home/TopNav/TopNav";
import RegisterForm from "./RegisterForm";
const RegisterScreen = () => {
  const [register, setRegister] = useState(false);
  const myclick = () => {
    setRegister(true);
    if(document.getElementById("name").value.length == 0 || document.getElementById("rollno").value.length == 0){
      alert("Please enter details");
    }
    else{
      alert("You have been successfully registered!");
      window.location.href='/election_portal';
    }
  }
  
  return (
    <div className="">
      <Helmet>
        <title>Registration SGCE</title>
        <style>{"body { background-color: #f8fafe; }"}</style>
      </Helmet>
      {/* <TopNav /> */}
      <div
        className={`${styles.cont} ml-2.5 mr-2.5 sm:ml-auto sm:mr-auto w-fit`}
      >
        <h1 className="text-4xl pb-4 mb-4 "> Complete Your Voter Registration </h1>
        <RegisterForm />
        {/* <br />
        <button className={styles.button} onClick={myclick}>
          {" "}
          Continue{" "}
        </button> */}
      </div>
    </div>
  );
};

export default RegisterScreen;
