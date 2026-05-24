import { Router } from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { IssueRouter } from "../modules/issues/issue.route";

const router = Router();
router.use("/api/auth", AuthRouter);
router.use("/api/issues",IssueRouter)

export default router;
