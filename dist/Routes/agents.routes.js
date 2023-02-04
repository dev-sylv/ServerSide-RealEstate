"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Multer_1 = require("../Config/Multer");
const agents_controller_1 = require("../Controller/agents.controller");
const AgentValidation_1 = require("../MiddleWares/Validation/AgentValidation/AgentValidation");
const router = express_1.default.Router();
router.route("/getallagents").get(agents_controller_1.GetAgents);
router.route("/getoneagent/:agentID").get(agents_controller_1.OneAgent);
router.route("/deleteagents").delete(agents_controller_1.DeleteAllAgents);
router.route("/registeragents").post(Multer_1.agentsUpload, AgentValidation_1.RegisterValidation, agents_controller_1.RegisterAgents);
router.route("/loginagent").post(AgentValidation_1.LoginValidation, agents_controller_1.AgentsLogin);
exports.default = router;
