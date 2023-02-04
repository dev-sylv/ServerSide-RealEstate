import express from "express";
import { houseUploads } from "../Config/Multer";
import { DeleteAllHouse, GetHouse, OneHouse, PostHouses } from "../Controller/house.controller";

const router = express.Router();

router.route("/posthouse/:agentID").post(houseUploads,PostHouses);
router.route("/getallhouse/:agentID").get(GetHouse);
router.route("/getonehouse").get(OneHouse);
router.route("/deletehouse").delete(DeleteAllHouse)

export default router