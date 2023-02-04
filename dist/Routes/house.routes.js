"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Multer_1 = require("../Config/Multer");
const house_controller_1 = require("../Controller/house.controller");
const router = express_1.default.Router();
router.route("/posthouse/:agentID").post(Multer_1.houseUploads, house_controller_1.PostHouses);
router.route("/getallhouse/:agentID").get(house_controller_1.GetHouse);
router.route("/getonehouse").get(house_controller_1.OneHouse);
router.route("/deletehouse").delete(house_controller_1.DeleteAllHouse);
exports.default = router;
