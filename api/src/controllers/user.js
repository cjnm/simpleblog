import { saveUserInfo } from "../model/Users.js"

const saveUser = async (user) => {
    try {
        await saveUserInfo(user);
    } catch {
        console.log("Error in saving user");
    }
}

export { saveUser };