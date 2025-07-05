import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./config";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "./config";
import { useUser } from "../context/UserContext";

export default function PersonalInfo() {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setUserData } = useUser();

  const handleNext = async () => {
    // Reset error before each validation
    setError("");

    // ✅ Field-specific validation
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!gender) {
      setError("Please select a gender");
      return;
    }

    if (!countryCode.trim()) {
      setError("Country code is required");
      return;
    }

    if (!/^[+]?[\d]{1,5}$/.test(countryCode)) {
      setError("Enter a valid country code (e.g. +234)");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!/^\d{7,15}$/.test(phoneNumber)) {
      setError("Enter a valid phone number");
      return;
    }

    // Optional birthday — no validation needed

    // ✅ Save to Firestore
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("User not authenticated");

      await setDoc(
        doc(db, "users", uid),
        {
          fullName,
          gender,
          phone: `${countryCode}${phoneNumber}`,
          birthday,
        },
        { merge: true }
      );

      setUserData({ fullName }); // you can add more fields here like gender, phone, etc.
      navigate("/address");
    } catch (err) {
      setError("Failed to save info: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>
        Personal Information <p style={{ color: "green" }}>2 of 3</p>
      </h3>
      <input
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <div>
        {" "}
        Gender:
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={() => setGender("male")}
          />{" "}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={() => setGender("female")}
          />{" "}
          Female
        </label>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/assets/IconInfo.png" alt="" />
          <div style={{ color: "gray", fontSize: "14px" }}>
            <b>This phone number and birthday are only visible to you</b>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {/* <input
            placeholder="Code (e.g. +234)"
            style={{ ...styles.input, flex: 1 }}
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <input
            placeholder="Phone Number"
            style={{ ...styles.input, flex: 2 }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> */}
          <select
            id="phone-code"
            name="phone-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
          >
            <option value="+1">🇺🇸 +1 (USA)</option>
            <option value="+44">🇬🇧 +44 (UK)</option>
            <option value="+234" selected>
              🇳🇬 +234 (Nigeria)
            </option>
            <option value="+91">🇮🇳 +91 (India)</option>
            <option value="+81">🇯🇵 +81 (Japan)</option>
            <option value="+49">🇩🇪 +49 (Germany)</option>
            <option value="+33">🇫🇷 +33 (France)</option>
            <option value="+61">🇦🇺 +61 (Australia)</option>
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="8097906701"
            style={{ ...styles.input, flex: 2 }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </div>
      </div>
      <input
        type="date"
        placeholder="Birthday (optional)"
        style={styles.input}
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button style={styles.button} onClick={handleNext}>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    padding: "10px 12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },

  genderContainer: {
    display: "flex",
    gap: "20px",
    fontSize: "14px",
    alignItems: "center",
    marginTop: "-5px",
  },

  infoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#666",
  },

  phoneRow: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#5932EA", // Button color from your request
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  buttonHover: {
    backgroundColor: "#4525b2",
  },

  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "left",
  },
};
