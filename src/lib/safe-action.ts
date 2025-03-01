import { assertAuthenticated } from "./session";
import { createServerActionProcedure } from "zsa";
import { PublicError } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  const isDev = process.env.NODE_ENV === "development";
  if (isDev && !isAllowedError) {
    console.error(err);
    return {
      code: err.code ?? "Error",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${
        err.message
      }`,
    };
  } else {
    return {
      code: "Error",
      message: "Something went wrong!",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated();
    return { user };
  });

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {});
