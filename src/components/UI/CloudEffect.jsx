import { motion } from "framer-motion"

const clouds = [
  { id: 1, width: 720, height: 200, top: "4%",  left: "-6%", opacity: 0.10, blur: 40, duration: 46, xRange: 70,  yRange: 14 },
  { id: 2, width: 560, height: 160, top: "10%", left: "58%", opacity: 0.08, blur: 36, duration: 58, xRange: -55, yRange: 18 },
  { id: 3, width: 640, height: 180, top: "20%", left: "20%", opacity: 0.07, blur: 44, duration: 50, xRange: 60,  yRange: 12 },
  { id: 4, width: 500, height: 150, top: "32%", left: "72%", opacity: 0.06, blur: 34, duration: 40, xRange: -45, yRange: 16 },
  { id: 5, width: 680, height: 190, top: "2%",  left: "36%", opacity: 0.11, blur: 42, duration: 54, xRange: -50, yRange: 10 },
  { id: 6, width: 600, height: 170, top: "70%", left: "12%", opacity: 0.05, blur: 38, duration: 60, xRange: 55,  yRange: 12 },
  { id: 7, width: 460, height: 140, top: "78%", left: "60%", opacity: 0.05, blur: 30, duration: 48, xRange: -40, yRange: 14 },
]

export default function CloudEffect() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Cinematic vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 65% at 50% 45%, transparent 0%, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Floating cloud shapes */}
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          style={{
            position: "absolute",
            top: c.top,
            left: c.left,
            width: c.width,
            height: c.height,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(200,215,255,0.9) 0%, rgba(200,215,255,0.4) 50%, transparent 100%)",
            opacity: c.opacity,
            filter: `blur(${c.blur}px)`,
          }}
          animate={{
            x: [0, c.xRange, 0],
            y: [0, c.yRange, 0],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
