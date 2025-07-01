import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TheatreModal from "./theatreForm";
import TheatreDelete from "./theatreDelete";
import { getAllTheatresByOwner } from "../../apicalls/theatre";

function TheatreList() {
  const { user } = useSelector((state) => state.user);
  const [theatres, setTheatres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, rowObj) => {
        if (rowObj.isActive) {
          return "Approved";
        } else {
          return "Pending/Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, rowObj) => {
        return (
          <div style={{ display: "flex", gap: "4px" }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheatre(rowObj);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(rowObj);
              }}
            >
              <DeleteOutlined />
            </Button>
            {rowObj.isActive && (
              <Button style={{ marginLeft: "4px" }} onClick={() => {}}>
                Add Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const fetchAllTheatres = async () => {
    dispatch(showLoading());
    const response = await getAllTheatresByOwner(user._id);
    const allTheatres = response.data.map((theatre) => {
      return { ...theatre, key: `theatre_${theatre._id}` };
    });
    setTheatres(allTheatres);
    dispatch(hideLoading());
  };

  useEffect(() => {
    if (user) {
      fetchAllTheatres();
    }
  }, [user]);

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "end", marginBottom: "8px" }}
      >
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
            setSelectedTheatre(null);
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table columns={columns} dataSource={theatres} />
      {isModalOpen && (
        <TheatreModal
          isModalOpen={isModalOpen}
          selectedTheatre={selectedTheatre}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          setSelectedTheatre={setSelectedTheatre}
          getData={fetchAllTheatres}
        />
      )}
      {isDeleteModalOpen && (
        <TheatreDelete
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheatre={setSelectedTheatre}
          getData={fetchAllTheatres}
        />
      )}
    </div>
  );
}

export default TheatreList;
