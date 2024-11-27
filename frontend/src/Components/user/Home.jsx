import { useState } from "react";
import {useUpdateProfileImageMutation } from "./../../redux/api/api"

const Home = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    
    const [uploadImage, {isLoading}] = useUpdateProfileImageMutation()
    const handleProfilePicUpdate = async()=>{
        const formData = new FormData()
        formData.append("image",selectedImage)

        try{
            const response = await uploadImage(formData).unwrap()
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div>
            <button>logout</button>
            <div>
                <img src="" alt="" />
            </div>
            <input type="file" onChange={(e)=> setSelectedImage(e.target.files[0])}/>
            <button onClick={handleProfilePicUpdate}>Update</button>
            <h1>hello user</h1>
        </div>
    );
};

export default Home;
