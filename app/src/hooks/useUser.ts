import { userState } from "./../state/user.state";
import { useRecoilValue } from "recoil";

interface IProps {}

export default () => {
  const user = useRecoilValue(userState);

  return {
    user,
  };
};
