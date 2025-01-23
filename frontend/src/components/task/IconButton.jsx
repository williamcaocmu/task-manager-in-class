import icon from "../../assets/plus.svg";
const IconButton = () => {
  return (
    <button className="icon-button">
      <img src={icon} alt="Add task" />
    </button>
  );
};
export default IconButton;
