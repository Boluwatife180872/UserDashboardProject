import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src="/assets/Frame.png" alt="Success" style={styles.image} />
      <h2 style={styles.message}>You are Successfully Registered!</h2>
      <button style={styles.button} onClick={() => navigate("/login")}>
        Go to Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "sans-serif",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    marginBottom: "20px",
  },
  message: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#5932EA",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
