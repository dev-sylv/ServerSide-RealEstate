import express from "express";
import { agentsUpload } from "../Config/Multer";
import { AgentsLogin, DeleteAllAgents, GetAgents, OneAgent, RegisterAgents } from "../Controller/agents.controller";
import { LoginValidation, RegisterValidation } from "../MiddleWares/Validation/AgentValidation/AgentValidation";

const router = express.Router();

router.route("/getallagents").get(GetAgents);
router.route("/getoneagent/:agentID").get(OneAgent);
router.route("/deleteagents").delete(DeleteAllAgents);
router.route("/registeragents").post(agentsUpload,RegisterValidation, RegisterAgents)
router.route("/loginagent").post(LoginValidation, AgentsLogin);

export default router