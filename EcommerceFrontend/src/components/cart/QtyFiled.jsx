import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QtyField = ({ name, value, onChange }) => {
  const qtyControl = (qty) =>
    onChange({
      target: {
        name,
        type: "radio",
        value: qty < 1 ? 1 : qty,
      },
    });

  return (
    <div className="flex h-11 w-24 mb-4">
      <input
        type="number"
        className="w-2/3 pl-2 text-center border border-black dark:border-slate-600 bg-transparent focus:outline-none rounded-lg overflow-hidden"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(e.target.value)}
      />
      <div className="w-1/3 border border-black dark:border-slate-600 rounded-lg overflow-hidden flex flex-col bg-transparent p-0">
        <button
          className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2"
          type="button"
          onClick={() => qtyControl(parseInt(value) + 1)}
        >
          <i className="fas fa-chevron-up"></i>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2"
          type="button"
          onClick={() => qtyControl(parseInt(value) - 1)}
        >
          <i className="fas fa-chevron-down"></i>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
    </div>
  );
};

export default QtyField;
