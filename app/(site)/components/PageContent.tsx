"use client";

import { useEffect, useState } from "react";
import { GetAllPosted, GetPostedSearch } from "@/app/api/post";
import { Post, SearchModel } from "@/types";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Table, Tag, Modal, Spin } from "antd";
import { decode } from "punycode";
import checkTokenExpire from "@/app/utils/checkToken";

let DEFAULT_SKIP = 1;
let DEFAULT_LIMIT = 1000;

function PageContent() {
  const router = useRouter();
  const [auth, setAuth] = useState<string>("");
  const [listPosted, setListPosted] = useState<Post[]>([]);
  const [onShowPostObj, setOnShowPostObj] = useState<any>([]);
  const [openModalPosted, setOpenModalPosted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [widthScreen, setWidthScreen] = useState<number>(0);
  const [objSearch, setObjSearch] = useState<SearchModel>({
    titleSearch: "",
    tagSearch: "",
    skip: 0,
    limit: 0,
  });

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    setWidthScreen(window.innerWidth);
    setObjSearch({
      titleSearch: "",
      tagSearch: "",
      skip: 0,
      limit: 0,
    });

    if (token) {
      setAuth(token);
      setOpenModalPosted(false);
      if (checkTokenExpire(token)) {
        router.push("/login");
      } else {
        setLoading(true);
        return renderMasterData(token);
      }
    } else {
      router.push("/login");
    }
  }, []);

  const renderMasterData = (token: string) => {
    GetAllPosted(token)
      .then(async (item) => {
        let data = await item.json();
        if (data.error) {
          if (data.error === "Forbidden") {
            sessionStorage.clear();
            router.push("/login");
          }
        }
        setLoading(false);
        return setListPosted(data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        router.push("/login");
      });
  };

  const searchPosted = (e: any) => {
    e.preventDefault();
    objSearch.skip = DEFAULT_SKIP;
    objSearch.limit = DEFAULT_LIMIT;

    GetPostedSearch(auth, objSearch)
      .then(async (item) => {
        let data = await item.json();
        if (data.error) {
          if (data.error === "Forbidden") {
            sessionStorage.clear();
            router.push("/login");
          }
        }
        return setListPosted(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListPosted = (list: any) => {
    let tagsAll = list.data.tags.map((tags: string[]) => tags).join(" , ");
    return (
      <>
        <div className="grid grid-cols-1 gap-4 mt-8 postStyle">
          <h1 className="font-bold text-center text-xl">{list.data.title}</h1>
          <div>
            <div dangerouslySetInnerHTML={{ __html: list.data.content }}></div>
          </div>
          <div className="grid grid-rows-1 grid-flow-col gap-0 mt-6">
            <div className="col-end-7 font-bold text-end">
              <h1>
                Tags :{" "}
                <label className="font-medium">
                  {tagsAll !== "" ? tagsAll : " - "}
                </label>
                &nbsp;&nbsp;Posted by :{" "}
                <label className="font-medium"> {list.data.postedBy} </label>
                &nbsp;&nbsp; Posted at :{" "}
                <label className="font-medium">
                  {dayjs(list.data.postedAt).format("DD/MM/YYYY HH:mm:ss a")}{" "}
                </label>
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  };

  const columnsList = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (services: string[]) => {
        let getTags = services.map((service) => service).join(", ");
        return getTags.length > 0 ? (
          <Tag color="green" className="font-semibold">
            {getTags}
          </Tag>
        ) : (
          <>-</>
        );
      },
    },
    {
      title: "Posted by",
      dataIndex: "postedBy",
      key: "postedBy",
      sorter: (a: any, b: any) => a.postedBy.localeCompare(b.postedBy),
    },
    {
      title: "Posted at",
      dataIndex: "postedAt",
      key: "postedAt",
      sorter: {
        compare: (a: any, b: any) => {
          a = a.postedAt.toLowerCase();
          b = b.postedAt.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
  ];

  return (
    <>
      {auth ? (
        <>
          <div className="fle justify-between items-center mt-6">
            <h1 className="text-white text-2xl font-semibold">Posted</h1>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="title"
                id="title"
                className="w-full mt-6 bg-emerald-600 border border-gray-300 text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title..."
                value={objSearch.titleSearch}
                onChange={(e) => {
                  let obj = Object.assign({}, objSearch);
                  obj.titleSearch = e.target.value;
                  setObjSearch(obj);
                }}
              />
              <input
                type="text"
                name="tag"
                id="tag"
                className="w-full mt-6 bg-emerald-600 border border-gray-300 text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="tag..."
                value={objSearch.tagSearch}
                onChange={(e) => {
                  let obj = Object.assign({}, objSearch);
                  obj.tagSearch = e.target.value;
                  setObjSearch(obj);
                }}
              />
              <div className="text-center">
                <button
                  type="button"
                  className="w-6/12 bg-emerald-800 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded mt-6 "
                  onClick={searchPosted}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <Spin spinning={loading} size="large" tip={"loading..."}>
            <div className="mt-12">
              <Table
                rowKey="_id"
                dataSource={listPosted}
                columns={columnsList}
                style={{ backgroundColor: "white", borderRadius: 5 }}
                pagination={{
                  defaultPageSize: 10,
                  total: listPosted.length,
                }}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: () => {
                      setOnShowPostObj(record);
                      setOpenModalPosted(true);
                    },
                  };
                }}
              />
            </div>
          </Spin>
        </>
      ) : null}
      <Modal
        centered
        open={openModalPosted}
        onOk={() => setOpenModalPosted(false)}
        onCancel={() => setOpenModalPosted(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        width={widthScreen / 2}
      >
        <ListPosted data={onShowPostObj} />
      </Modal>
    </>
  );
}

export default PageContent;
