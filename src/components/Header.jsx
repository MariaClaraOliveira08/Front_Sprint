import React from "react";

export default function Header() {
  const styles = {
    headerBar: {
      position: "fixed",
      left: 0,
      right: 0,
      height: 45,
      backgroundColor: "#5e758f",
      top: 0,
      zIndex: 10,
    },
  };

  return <div style={styles.headerBar} />;
}
