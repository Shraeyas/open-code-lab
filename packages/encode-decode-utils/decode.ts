import Hashids from "hashids";
export const decode = (data) => {
    const hashids = new Hashids(process.env.HASHIDS_SALT, 12);
    const salt = hashids.decode(data);
    return salt;
}