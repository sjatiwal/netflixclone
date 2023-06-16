import { RootState } from "@store/reducers";
import { useSelector } from "react-redux";
import Row from "@components/row";
import Modal from "@components/modal";
import { useRecoilValue } from "recoil";
import { modalState } from "@atoms/modalAtoms";

const myList = () => {
  const showModal = useRecoilValue(modalState);
  const { myList } = useSelector((state: RootState) => state.list);

  return (
    <div>
      {myList.length > 0 ? (
        <Row title="My List" movies={myList} />
      ) : (
        "No Item Present In My List"
      )}
      {showModal && <Modal />}
    </div>
  );
};

export default myList;
