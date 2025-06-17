'use client'
import Link from "next/link";
// pages/login.js
import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import { log } from "console";

export default function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(formData)
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const payload = {
      username: formData.Email,
      password: formData.password,
    };

    console.log("Sending JSON:", JSON.stringify(payload, null, 2));

    // Example fetch to backend (uncomment and replace URL):
   
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(data);

 
  
  };
  return ( <div className={styles.container}>
  <form action="POST" onSubmit={handleSubmit}>
    
     
      <div className={styles.leftSection}>
        <div className={styles.loginHeader}>
          <Image src="/Vector 1.png" alt="House" width={300} height={300} />
          <h2>Login</h2>
        </div>

        <div className={styles.formGroup}>
          <input type="text" placeholder="Email"
          name="Email"
          value={formData.Email}
              onChange={handleChange}
              required
          />
        </div>

        <div className={styles.formGroup}>
          <input type="password"
        
          placeholder="Password"
          name="password"
           
           value={formData.password}
              onChange={handleChange}
              required
          />
          <a href="#">Forgot Password?</a>
        </div>
        
          <Link href="/dashboard">
        <button  className={styles.loginBtn}>Login</button></Link>

        <div className={styles.signupText}>Don’t have an account yet? <Link href="/" className={styles.signupBtn}>Sign Up</Link></div>

        <div className={styles.divider}>or</div>

        <button className={styles.googleBtn}>
          <Image src="/search.png" alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <div className={styles.terms}>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>

      
  </form><div className={styles.rightSection}></div></div> 
  )
}
