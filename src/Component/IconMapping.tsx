import { BsFillHouseFill } from "react-icons/bs";
import {
  IoPersonOutline,
  IoPersonSharp,
  IoTrashOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiTicket } from "react-icons/pi";
import { LuBook } from "react-icons/lu";

export const iconMapping: { [key: string]: JSX.Element } = {
  "<IoTrashOutline />": <IoTrashOutline />,
  "<BsFillHouseFill />": <BsFillHouseFill />,
  "<IoPeopleOutline />": <IoPeopleOutline />,
  "<IoPersonSharp />": <IoPersonSharp />,
  "<PiTicket />": <PiTicket />,
  "<LuBook />": <LuBook />,
  "<FaMoneyBillTransfer />": <FaMoneyBillTransfer />,
  "<IoPersonOutline />": <IoPersonOutline />,
};
