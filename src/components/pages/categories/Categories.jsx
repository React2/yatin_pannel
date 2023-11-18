import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEdit, AiFillCamera } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import HOC from "../../layout/HOC";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import BaseUrl from "../../BaseUrl";
import { toast } from "react-toastify";

const catData = [
  {
    id : '1' ,
    image: "https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg",
    name: "First",
  },
  {
    id : '2' ,
    image: "https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg",
    name: "Second",
  },
  {
    id : '3' ,
    image: "https://cdn.pixabay.com/photo/2022/09/15/09/59/water-7456116_960_720.jpg",
    name: "Third",
  },
];

const Categories = () => {
  const [popup, setPopup] = useState(false);
  const [edit, setEdit] = useState([]);
  const [img, setImg] = useState(
    "https://media.istockphoto.com/vectors/real-estate-design-element-vector-id1308743863?b=1&k=20&m=1308743863&s=170667a&w=0&h=QlOIRhpsyxG-PM5EJNiNImCF1cJY07YpMbKGZKLFZF8="
  );
  const [image, setImage] = useState("");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCat, setAddCat] = useState(false);
  const [name, setName] = useState("");

  const fetchCategory = async () => {
    const url = BaseUrl() + "/category/get/category";
    try {
      const res = await axios.get(url);
      console.log("res", res);
      setCategory(res.data.categories);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setAddCat(true);
    try {
      // const res = await axios.post(url, fd, auth);
      // console.log("res", res);
      toast.success("Added Successfully");
      setAddCat(false);
      fetchCategory();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    } 
  };

  const deleteCategory = async (id) => {
    // const url = BaseUrl() + `/category/delete/category/${id}`;

    try {
      // const res = await axios.delete(url, auth);
      toast.success("Deleted Successfully");
      fetchCategory();
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again");
    }
  };

  const editCategory = async (e) => {
    e.preventDefault();
    // const url = BaseUrl() + `/category/edit/category/${edit._id}`;
    // const fd = new FormData();
    // fd.append("myField", image);
    // fd.append("category", name);
    try {
      // const res = await axios.post(url, fd, auth);
      toast.success("Successful");
    } catch (err) {
      console.log("err", err);
      toast.error("Please try again ");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Categories
          </span>
          <button
            onClick={() => {
              setEdit("");
              setPopup(!popup);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[rgb(241,146,46)] text-white tracking-wider"
          >
            Add Categories
          </button>
        </div>
        {/* Add Form */}
        <section
          className={
            popup
              ? "fixed top-0 left-0 wcomp bg-[rgb(0,0,0,0.5)] transition-all duration-150 w-full flex justify-center items-center overflow-y-auto  h-screen "
              : "hidden"
          }
        >
          <div className="bg-slate-100 overflow-y-auto  lg:w-3/6  md:w-4/6 w-5/6 mx-auto  rounded-lg">
            <div className="flex sticky top-0 py-3 px-5 bg-slate-100 justify-between">
              <span className=" font-semibold text-[rgb(241,146,46)] ">
                Add Categories
              </span>
              <div className="text-[rgb(241,146,46)] py-0.5 text-2xl cursor-pointer font-medium tracking-wider">
                <IoMdClose
                  onClick={() => {
                    setEdit("");
                    setPopup(false);
                  }}
                />{" "}
              </div>
            </div>
            {console.log(edit?.name)}
            {/* form */}

            <form
              className="grid  grid-cols-1 gap-x-7 gap-y-4 p-4"
              onSubmit={edit ? editCategory : addCategory}
            >
              {/*  Image */}

              {/*  Name */}
              <div className="inline-flex  w-full flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm"
                >
                  Name*
                </label>
                <input
                  value={edit ? edit.category : name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  required
                  type="text"
                  placeholder=""
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              <div className="inline-flex  w-full flex-col">
                <label className="text-gray-800 mb-1.5 tracking-wider font-semibold text-sm">
                  Category Image
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  type="file"
                  className=" text-gray-800 tracking-wider text-sm rounded-full py-1 px-2 outline-[rgb(241,146,46)]"
                />
              </div>
              {/*  price */}

              <button
                type="submit"
                className="bg-[rgb(241,146,46)] flex items-center justify-center cursor-pointer w-40 hover:bg-[rgb(241,146,46)] py-1 rounded-full"
              >
                {addCat ? (
                  <Oval height={30} color="black" secondaryColor="black" />
                ) : (
                  "Add"
                )}
              </button>
            </form>
          </div>
        </section>
        <div className=" wcomp overflow-y-auto">
          <table className="table-auto  w-full text-left whitespace-no-wrap">
            <thead>
              <tr className=" border-b bg-green-300 shadow-xl text-gray-900">
                <th className="px-4 py-3 title-font tracking-widest font-medium md:text-base text-sm  ">
                  Category Image
                </th>

                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Category
                </th>
                <th className="px-4 py-3 title-font tracking-widest rounded-tr-lg font-medium md:text-base text-sm  ">
                  Actions
                </th>
              </tr>
            </thead>
            {/* {loading ? (
              <Oval />
            ) : ( */}
              <tbody>
                {catData?.map((e, i) => {
                  return (
                    <tr key={i} className="tracking-wider text-gray-900 ">
                      <td className=" py-3 w-36 md:text-base text-sm ">
                        <img
                          src={e.image}
                          alt=""
                          className="xl:w-36 shadow-xl rounded-lg lg:w-32 md:w-28 w-24"
                        />
                      </td>
                      <td className="px-4 py-3 md:text-base text-sm">
                        {e.name}
                      </td>

                      <td className="px-4 py-3  space-x-3">
                        <button
                          onClick={() => {
                            setEdit(e);

                            setPopup(!popup);
                          }}
                          className="font-semibold tracking-widest"
                        >
                          <AiOutlineEdit className="text-lg md:text-2xl" />
                        </button>
                        <button className="font-semibold tracking-widest">
                          <GrFormClose
                            className="text-lg md:text-2xl"
                            onClick={() => deleteCategory(e._id)}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            {/* )} */}
          </table>
        </div>
      </section>
    </>
  );
};

export default HOC(Categories);
