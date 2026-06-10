import { motion } from "framer-motion"

const clouds = [
  { id: 1, width: 700, height: 220, top: "2%",   left: "-5%",  opacity: 0.45, blur: 30, duration: 38, xRange: 80,  yRange: 20 },
  { id: 2, width: 550, height: 180, top: "12%",  left: "60%",  opacity: 0.40, blur: 26, duration: 52, xRange: -60, yRange: 25 },
  { id: 3, width: 750, height: 240, top: "48%",  left: "-8%",  opacity: 0.38, blur: 34, duration: 45, xRange: 90,  yRange: 18 },
  { id: 4, width: 600, height: 200, top: "68%",  left: "55%",  opacity: 0.42, blur: 28, duration: 60, xRange: -70, yRange: 22 },
  { id: 5, width: 460, height: 150, top: "34%",  left: "75%",  opacity: 0.38, blur: 24, duration: 34, xRange: -50, yRange: 20 },
  { id: 6, width: 680, height: 210, top: "78%",  left: "15%",  opacity: 0.40, blur: 32, duration: 48, xRange: 65,  yRange: 15 },
  { id: 7, width: 400, height: 130, top: "24%",  left: "25%",  opacity: 0.35, blur: 22, duration: 42, xRange: 40,  yRange: 28 },
  { id: 8, width: 620, height: 190, top: "0%",   left: "38%",  opacity: 0.40, blur: 30, duration: 56, xRange: -55, yRange: 14 },
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
        background: "rgba(255,0,0,0.15)",
      }}
    >
      {/* Cinematic vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 65% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.72) 100%)",
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
              "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
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
