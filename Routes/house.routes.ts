import express from "express";
import { DeleteAllHouse, GetHouse, OneHouse, PostHouses } from "../Controller/house.controller";

const router = express.Router();

router.route("/posthouse").post(PostHouses);
router.route("/getallhouse").get(GetHouse);
router.route("/getonehouse").get(OneHouse);
router.route("/deletehouse").delete(DeleteAllHouse)

export default router