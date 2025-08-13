import React from "react";

export default function Footer() {
  const styles = {
    footerBar: {
      position: "fixed",
      left: 0,
      right: 0,
      height: 45,
      backgroundColor: "#5e758f",
      bottom: 0,
      zIndex: 1000,
    },
  };

  return <div style={styles.footerBar} />;
}
