import { Fragment, useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ItemRow from "../../components/ItemRow";
import { data as MenuData } from "../../data";
import { useNavigate } from "react-router-dom";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import * as database from "../../firebase/firebase.config";
import SectionsTabs from "../../components/SectionsTabs";
import CategoriesTabs from "../../components/CategoriesTabs";
import Logo from "../../assets/logo.png";
const Menu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getSections();
    getImage();
  }, []);

  const getImage = async () => {
    const dataRef = ref(database?.default?.db, "images/");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();

      setImageUrl(data?.main_image?.imageUrl);
    }
  };

  const getSections = async () => {
    const dataRef = ref(database?.default?.db, "sections");
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      let data = snapshot.val();
      let arr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
      getCategories(arr[0].id);
      setSections(arr);
    }
  };

  const getCategories = async (id) => {
    setSelectedSection(id);
    //get categories
    const dataRef = ref(database?.default?.db, "categories");
    const categoriesQuery = query(
      dataRef,
      orderByChild("section"),
      equalTo(id)
    );

    const snapshot = await get(categoriesQuery);
    let categoriesArr = [];
    if (snapshot.exists()) {
      let data = snapshot.val();
      categoriesArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }
    getItems(categoriesArr[0]?.id);
    setCategories(categoriesArr);
  };

  const getItems = async (id) => {
    let itemsArr = [];
    const itemsRef = ref(database?.default?.db, "items");
    const itemsQuery = query(
      itemsRef,
      orderByChild("category_id"),
      equalTo(id)
    );

    const snapshot = await get(itemsQuery);
    if (snapshot.exists()) {
      let data = snapshot.val();
      itemsArr = Object.keys(data).map((id) => {
        return {
          ...data[id],
          id: id,
        };
      });
    }

    setItems(itemsArr);
  };

  useEffect(() => {
    // console.log(selectedSection, "selectedSection");
  }, [sections, categories, items, selectedSection]);
  return (
    <Fragment>
      <div className="p-2 flex flex-row items-center justify-between">
        <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
        <div className="flex flex-col items-end">
          <p className="text-left text-xl font-bold font-indie">Chez Fady</p>
          <p className="text-left text-xl font-bold font-indie">
            Bisabiil main road
          </p>
          <p className="text-left text-xl font-bold font-indie">71/071659</p>
        </div>
        <button
          className="hidden lg:block p-2 bg-slate-300 mb-5 rounded-xl  h-fit items-center "
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Login
        </button>
      </div>
      <div
        className="flex flex-col items-start w-screen bg-cover bg-center p-3 h-72 relative bg-[#FF1C1C]"
        // style={{
        //   backgroundImage: imageUrl ? `url(${imageUrl})` : `url(${RestImage2})`, //imageUrl != "" ? `url(${imageUrl})` : "#43A6C6",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div className="absolute bottom-4">
          <SectionsTabs
            sections={sections ?? []}
            onClick={(section) => {
              getCategories(section?.id);
            }}
          />
          <CategoriesTabs
            categories={categories ?? []}
            onClick={(cat) => {
              getItems(cat?.id);
            }}
            selectedSection={selectedSection}
          />
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-col items-start w-full mt-2 border-2 rounded-lg border-[#8E1C1C] pt-2">
          {items &&
            items?.length > 0 &&
            items.map((item) => {
              return (
                <ItemRow
                  name={item?.title}
                  description={item.description}
                  price={item.price}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
