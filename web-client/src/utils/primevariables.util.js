export const primeFlexVariables = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  gutter: '0.5rem',
  fieldMargin: '1rem',
  fieldLabelMargin: '0.5rem',
  helperTextMargin: '0.25rem',
  spacer: '1rem',
};

export const devices = {
  over: {
    sm: `(min-width: ${primeFlexVariables.sm}px)`,
    md: `(min-width: ${primeFlexVariables.md}px)`,
    lg: `(min-width: ${primeFlexVariables.lg}px)`,
    xl: `(min-width: ${primeFlexVariables.xl}px)`,
  },
  under: {
    sm: `(max-width: ${primeFlexVariables.sm}px)`,
    md: `(max-width: ${primeFlexVariables.md}px)`,
    lg: `(max-width: ${primeFlexVariables.lg}px)`,
    xl: `(max-width: ${primeFlexVariables.xl}px)`,
  }
}