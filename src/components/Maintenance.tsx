import { motion } from "framer-motion";

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-neutral-950 text-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold title-gradient"
      >
        🚧 Under Maintenance 🚧
      </motion.h1>
      <p className="mt-4 text-lg text-neutral-300 max-w-xl">
        Our site is getting upgraded with new features ⚡. Please check back
        soon 🙏
      </p>
      <p className="mt-2 text-yellow-400 font-medium">— Divine ✨ Team</p>
    </div>
  );
}
