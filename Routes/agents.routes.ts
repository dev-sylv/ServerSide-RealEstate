import express from "express";
import { AgentsLogin, GetAgents, OneAgent, RegisterAgents } from "../Controller/agents.controller";
import { LoginValidation, RegisterValidation } from "../MiddleWares/Validation/AgentValidation/AgentValidation";

const router = express.Router();

router.route("/getallagents").get(GetAgents);
router.route("/getoneagent/:agentID").get(OneAgent);
router.route("/registeragents").post(RegisterValidation, RegisterAgents)
router.route("/loginagent").post(LoginValidation, AgentsLogin);

export default router