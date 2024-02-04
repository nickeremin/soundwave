import { motion, type Variants } from "framer-motion"

const crustContainerVariants: Variants = {
  closed: {
    rotate: "0",
    transition: {
      duration: 0.18,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  },
  open: (value) => ({
    rotate: value,
    transition: {
      duration: 0.32,
      delay: 0.1,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  }),
}

const crustVariants: Variants = {
  closed: (value) => ({
    translateY: value,
    transition: {
      duration: 0.16,
      delay: 0.1,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  }),
  open: {
    translateY: 0,
    transition: {
      duration: 0.18,
      ease: [0.04, 0.04, 0.12, 0.96],
    },
  },
}

interface MenuToggleButtonProps {
  isOpen: boolean
  toggleOpen: () => void
}

function MobileMenuToggleButton({ isOpen, toggleOpen }: MenuToggleButtonProps) {
  return (
    <button
      data-shadcnui-button
      onClick={toggleOpen}
      className="relative size-8 outline-none"
    >
      <motion.span
        variants={crustContainerVariants}
        custom={"45deg"}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute inset-0"
      >
        <motion.span
          variants={crustVariants}
          custom={"-4px"}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute inset-x-1.5 top-[15px] h-px bg-primary"
        ></motion.span>
      </motion.span>
      <motion.span
        variants={crustContainerVariants}
        custom={"-45deg"}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="absolute inset-0"
      >
        <motion.span
          variants={crustVariants}
          custom={"4px"}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute inset-x-1.5 top-[15px] h-px bg-primary"
        ></motion.span>
      </motion.span>
    </button>
  )
}

export default MobileMenuToggleButton
