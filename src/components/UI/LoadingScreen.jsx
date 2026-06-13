import { motion } from "framer-motion"
import logo from "../../assets/logo-dark.png"

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(9, 20, 19, 0.94)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Musaedoon Real Estate"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ height: 52, width: "auto" }}
      />

      {/* Company name */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Musaedoon Real Estate
      </motion.p>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: "flex", gap: 7, marginTop: 8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ffffff",
              display: "block",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
