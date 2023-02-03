import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name: "dev-sylvia",
    api_key: "816323284624162",
    api_secret: "1lOIWeMpkvIEeNxUHJ4I9YOS-GA",
    secure: true
});

export default cloudinary;