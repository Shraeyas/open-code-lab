import Hashids from "hashids";
export const encode = (data) => {
    const hashids = new Hashids(process.env.HASHIDS_SALT, 12);
    const salt = hashids.encode(data);
    return salt;
}