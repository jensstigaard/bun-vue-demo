export const IN_PRODUCTION = import.meta.env.NODE_ENV === "production"

export const ENV_MODE_TEXT = IN_PRODUCTION ? "Production" : "Development"
