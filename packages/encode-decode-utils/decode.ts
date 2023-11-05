import Hashids from "hashids";
export const decode = (data: string): number | undefined => {
  const hashids = new Hashids(process.env.HASHIDS_SALT, 12);
  const decodedArray = hashids.decode(data);
  return decodedArray.length > 0 ? (decodedArray[0] as number) : undefined;
};
