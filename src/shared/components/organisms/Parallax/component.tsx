import React, { useState, useRef, useLayoutEffect, ReactNode } from 'react';
import { motion, useViewportScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
};

export function Parallax({ children, offset = 50 }: ParallaxProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion();
  const [elementTop, setElementTop] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useViewportScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  useLayoutEffect(() => {
    const element = ref.current;
    const onResize = () => {
      setElementTop((element?.getBoundingClientRect?.()?.top ?? 0) + window.scrollY || window.pageYOffset);
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return window.removeEventListener('resize', onResize);
  }, [ref]);

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return children as JSX.Element;
  }

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
