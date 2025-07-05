import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, new FacebookAuthProvider());
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  // Optional: Dummy Apple login or placeholder
  const handleAppleLogin = () => {
    alert(
      "Apple login for web requires advanced setup (usually for iOS/macOS apps)."
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header Tabs */}
        <div style={{ display: "flex" }}>
          <p>
            <a style={{ color: "black", textDecoration: "none" }} href="/">
              Register
            </a>
          </p>
          <p style={{ marginLeft: "9px", marginRight: "9px" }}></p>
          <p>
            <a
              style={{
                color: "black",
                textDecoration: "underline",
                textDecorationColor: "red",
                textDecorationStyle: "solid",
                textDecorationThickness: "2px",
                textUnderlineOffset: "10px",
              }}
              href="/login"
            >
              Login
            </a>
          </p>
        </div>

        {/* Social icons */}
        <div style={styles.leftAlign}>
          <div style={styles.socialRow}>
            <img
              src="/assets/apple.png"
              alt="Apple"
              style={styles.icon}
              onClick={handleAppleLogin}
            />
            <img
              src="/assets/face.png"
              alt="Facebook"
              style={styles.icon}
              onClick={handleFacebookLogin}
            />
            <img
              src="/assets/Google.png"
              alt="Google"
              style={styles.icon}
              onClick={handleGoogleLogin}
            />
          </div>

          <p style={styles.dividerText}>or login with email</p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          style={styles.passwordInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button style={styles.button} onClick={handleLogin}>
          Login to Dashboard
        </button>

        {/* Remember Me */}
        <div style={styles.rememberRow}>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" style={styles.rememberLabel}>
            Remember me
          </label>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  leftAlign: {
    width: "100%",
    textAlign: "left",
  },
  socialRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "8px",
  },
  icon: {
    width: "32px",
    height: "32px",
    cursor: "pointer",
  },
  dividerText: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "10px",
  },
  input: {
    width: "94%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  passwordInput: {
    width: "94%",
    padding: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#5932EA",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  rememberRow: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: "8px",
    fontSize: "14px",
    marginTop: "10px",
  },
  rememberLabel: {
    color: "#666",
  },
};
