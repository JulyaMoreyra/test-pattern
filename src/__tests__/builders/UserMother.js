import { User } from "../../domain/User";

class UserMother {
    static umUsuarioPadrao = () => {
    return new User('1', 'Julia Moreira', 'juliamoreira@gmail.com', 'PADRAO');
    }

    static umUsuarioPremium = () => {
        return new User('2', 'Laura Moreira', 'lauramoreira@gmail.com', 'PREMIUM');
    }
}

export default UserMother;

