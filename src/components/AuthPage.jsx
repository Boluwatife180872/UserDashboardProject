import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  appleProvider,
} from "./config";
import { doc, setDoc } from "firebase/firestore";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;


    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), { email: email });

      navigate("/personal");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          displayName: user.displayName || "",
          provider: provider.providerId,
        },
        { merge: true }
      );
      navigate("/personal");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: "left", width: "100%" }}>
        <div style={{ display: "flex" }}>
          <p
            style={{
              textDecoration: "underline",
              textDecorationColor: "red",
              textDecorationStyle: "solid",
              textDecorationThickness: "2px",
              textUnderlineOffset: "10px",
            }}
          >
            Register
          </p>
          <p style={{ marginLeft: "9px", marginRight: "9px" }}></p>
          <p>
            <a style={{ color: "black", textDecoration: "none" }} href="/login">
              Login
            </a>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          <div>
            {/* <FaApple
              color="#000"
              size={18}
              onClick={() => handleSocialLogin(appleProvider)}
            /> */}
            <img
              src="/assets/apple.png"
              onClick={() => handleSocialLogin(appleProvider)}
              alt=""
            />
          </div>
          <div>
            {/* <FaFacebookF
              color="#3b5998"
              size={18}
              onClick={() => handleSocialLogin(facebookProvider)}
            /> */}
            <img
              src="/assets/face.png"
              onClick={() => handleSocialLogin(facebookProvider)}
              alt=""
            />
          </div>
          <div>
            {/* <FaGoogle
              color="#DB4437"
              size={18}
              onClick={() => handleSocialLogin(googleProvider)}
            /> */}
            <img
              src="/assets/Google.png"
              onClick={() => handleSocialLogin(googleProvider)}
              alt=""
            />
          </div>
        </div>
        <div>
          <p style={{ textAlign: "left", color: "#666" }}>
            or register with your email
          </p>
        </div>
      </div>
      <input
        className="input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ textAlign: "left", width: "100%" }}>
        <p className="passwordAdv">8+ Characters</p>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="btn" onClick={handleRegister}>
        Create Account
      </button>
      <div
        className="checkbox"
        style={{
          textAlign: "left",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <label htmlFor="">
          <input type="checkbox" name="" id="" />
          send me news and promotions
        </label>
      </div>

      <div style={{ textAlign: "center", fontSize: "12px", marginTop: "20px" }}>
        <p style={{ textAlign: "left", color: "#666" }}>
          By continuing i agree with the{" "}
          <a href="" style={{ color: "blue" }}>
            Terms & Conditions
          </a>{" "}
          <br />{" "}
        </p>
        <div style={{ textAlign: "center" }}>
          <a href="" style={{ color: "blue" }}>
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#fff",
  },
};
