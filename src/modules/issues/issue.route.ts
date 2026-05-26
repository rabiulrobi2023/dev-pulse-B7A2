import { Router } from "express";
import { IssueController } from "./issue.controller";
import auth from "../../middleware/auth";
import { Role } from "../../constant";

const router = Router();
router.post(
  "/",
  auth("contributor", "maintainer"),
  IssueController.createIssue,
);

router.get("/", IssueController.getAllIssues);
router.get("/:id", IssueController.getSingleIssue);
router.patch(
  "/:id",
  auth(Role.CONTRIBUTOR, Role.MAINAINER),
  IssueController.updateIssue,
);
router.delete("/:id", auth(Role.MAINAINER), IssueController.deleteIssue);

export const IssueRouter = router;
