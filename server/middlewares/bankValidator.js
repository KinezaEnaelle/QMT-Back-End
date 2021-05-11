import { check } from "express-validator";

const name = check("name")
  .exists()
  .withMessage("name required")
  .trim()
  .isEmail()
  .normalizeEmail();

const location = check("location", "the location field is required")
  .exists()
  .notEmpty()
  .trim()
  .matches(new RegExp("^burundi$|^rwanda$|^kenya$|^uganda$|^tanzania$", "i"))
  .withMessage("field sould either be burundi,rwanda,kenya,uganda or tanzania");

const validateBank = [name, location];
export { validateBank };
