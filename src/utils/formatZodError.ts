import { ZodError } from "zod";

export function formatZodError(error: ZodError): string {
  return error.issues.reduce(
    (acc, err) => acc + err.path?.join(",") + " : " + err.message,
    "",
  );
}
