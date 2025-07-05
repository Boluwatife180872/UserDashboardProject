import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "./config";

export default function AddressInfo() {
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState("");
  const navigate = useNavigate();


  const [error, setError] = useState("");

  const handleFinish = async () => {
    if (!street || !city || !state || !postal) {
      setError("Street, City, State, and Postal Code are required");
      return;
    }

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("User not authenticated");

      await setDoc(
        doc(db, "users", uid),
        {
          street,
          apartment,
          city,
          state,
          postal,
        },
        { merge: true }
      );

      navigate("/success");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        Add address <p style={{ color: "green" }}>3 of 3</p>
      </h3>
      <input
        placeholder="Street Address"
        style={styles.input}
        onChange={(e) => setStreet(e.target.value)}
      />
      <input
        placeholder="Apartment (optional)"
        style={styles.input}
        onChange={(e) => setApartment(e.target.value)}
      />
      <input
        placeholder="City"
        style={styles.input}
        onChange={(e) => setCity(e.target.value)}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          placeholder="State"
          style={{ ...styles.input, flex: 1 }}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          placeholder="Postal Code"
          style={{ ...styles.input, flex: 1 }}
          onChange={(e) => setPostal(e.target.value)}
        />
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <button style={styles.button} onClick={handleFinish}>
        Save Information
      </button>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: "sans-serif",
  },

  title: {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  input: {
    padding: "10px 12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#5932EA",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "50px",
    marginBottom: "10px",
  },

  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "left",
  },
};
