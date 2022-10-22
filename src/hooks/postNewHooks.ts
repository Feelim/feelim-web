import { useMutation } from "react-query";
import { postNew } from "../api/post";

export default function postNewHooks(){
    const mutation = useMutation(postNew, {
        onSuccess: (data)=>{
            console.log(data);
        },
        onError: (error) =>{
            console.log(error);
        }
    });
    return mutation;
}