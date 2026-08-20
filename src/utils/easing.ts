export const easing = {
  cinematic: [0.16, 1, 0.36, 1],
  expo: [0.87, 0, 0.13, 1],
  smooth: [0.25, 0.1, 0.25, 1],
  elastic: [0.68, -0.55, 0.27, 1.55],
  snap: [0.9, 0, 0.1, 1],
  power3: [0.76, 0, 0.24, 1],
  power4: [0.83, 0, 0.17, 1],
} as const;

export type EasingName = keyof typeof easing;
