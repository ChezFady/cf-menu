import { useEffect, useState } from "react";
const SectionsTabs = ({ sections, onClick, selectedCat }) => {
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (sections) {
      setSelected(sections[0]?.id);
    }
  }, [sections]);
  return (
    <div className="flex items-center flex-nowrap w-full overflow-scroll mb-5 no-scrollbar">
      {sections.map((category) => {
        return (
          <button
            onClick={() => {
              setSelected(category?.id);
              onClick(category);
            }}
            className="w-auto text-nowrap p-2 rounded-xl mr-3 font-indie text-xl font-bold"
            style={{
              backgroundColor:
                selected === category?.id ? "#8E1C1C" : "#C4C4C4",
              color: selected === category?.id ? "#FFF" : "#000",
            }}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default SectionsTabs;
