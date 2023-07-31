import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Modal, Form, Input, message, Select, Table, DatePicker } from "antd";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";

import {
  AreaChartOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTrans, setAllTrans] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, SetSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [category, setCategory] = useState("all");
  const [edit, setEdit] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEdit(record);
              setShowModal(true);
            }}
          />
          
            <DeleteOutlined  className="mx-1" onClick={()=>handleDelete(record)}/>
       
        </div>
      ),
    },
  ];

  const handleDelete= async(record) => {
    try {
      setLoading(true);
     await axios.post("/transactions/delete-transactions", {
       transactionid: record._id,
     });
      setLoading(false);
      getAllTrans();
     message.success("Deleted Successfully");
   } catch (error) {
     setLoading(false);
     console.log(error);
     message.error("Something went wrong")
    
   }
  }

  // getalllTransaction
  const getAllTrans = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const trans = await axios.post("/transactions/get-transactions", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
        category,
      });
      setLoading(false);
      setAllTrans(trans.data);
    } catch (error) {
      setLoading(false);
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllTrans();
  }, [frequency, selectedDate, type, category]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (edit) {
        await axios.post("/transactions/edit-transactions", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionid: edit._id,
        });
         setLoading(false);
         setShowModal(false);
         setEdit(null);
         message.success("Expense Updated Successfully");
      } else {
        await axios.post("/transactions/add-transactions", {
          ...values,
          userid: user._id,
        });
      }
      setLoading(false);
      setShowModal(false);
      setEdit(null);
      message.success("Expense Added Successfully");
      getAllTrans();
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transaction");
    }
  };

  return (
    <Layout>
      <>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 week</Select.Option>
              <Select.Option value="31">Last 1 month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(value) => SetSelectedDate(value)}
              />
            )}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(value) => SetSelectedDate(value)}
              />
            )}
          </div>
          <div>
            <h6>Select Category</h6>
            <Select value={category} onChange={(value) => setCategory(value)}>
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="projects">Projects</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(value) => SetSelectedDate(value)}
              />
            )}
          </div>

          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icons" : "inactive-icons"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "chart" ? "active-icons" : "inactive-icons"
              }`}
              onClick={() => setViewData("chart")}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Add new
            </button>
          </div>
        </div>
        <div className="table">
          {viewData === "table" ? (
            <Table
              pagination={false}
              columns={columns}
              dataSource={allTrans}
              className=""
            />
          ) : (
            <Analytics allTrans={allTrans} />
          )}
        </div>

        <Modal
          title={edit ? "Edit Transaction" : "Add Transaction"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit} initialValues={edit}>
            <Form.Item label="Amount" name={"amount"}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Type" name={"type"}>
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name={"category"}>
              <Select>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="projects">Projects</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fee">Fee</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name={"date"}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Reference" name={"reference"}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name={"description"}>
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                SAVE
              </button>
            </div>
          </Form>
        </Modal>
      </>
    </Layout>
  );
};

export default HomePage;
