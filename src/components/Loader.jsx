import React from "react";

const Loader = () => {
  return (
    <div style={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="#5452ff"
      >
        <defs>
          <circle
            id="loader"
            r="4"
            cx="50"
            cy="50"
            transform="translate(0 -30)"
          />
        </defs>
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const delay = (i * 0.42).toFixed(2);
          return (
            <use
              key={i}
              xlinkHref="#loader"
              transform={`rotate(${angle} 50 50)`}
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur="5s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </use>
          );
        })}
      </svg>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
};

export default Loader;
