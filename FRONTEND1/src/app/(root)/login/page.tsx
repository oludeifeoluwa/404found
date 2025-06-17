'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';

// pages/login.js
import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import { log } from "console";

export default function Login() {const router = useRouter();
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
      email: formData.Email,
      password: formData.password,
    };

    console.log("Sending JSON:", JSON.stringify(payload, null, 2));

    // Example fetch to backend (uncomment and replace URL):
   
    const res = await fetch('http://localhost:5000/api/v1/auth/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
  // maybe show a success toast first
  router.push("/dashboard");
} else {
  alert(data.msg || "Login failed");
}


  };



  return ( <div className={styles.container}>
  <form  onSubmit={handleSubmit}>
    
     
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
        
          
        <button type="submit" className={styles.loginBtn}>Login</button>

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
