/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment/moment";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("name_product");
  const [sort, setSort] = useState("asc");
  const [inputData, setInputData] = useState({
    search: "",
  });
  useEffect(() => {
    console.log("checked", sortBy);
    getDataProduct();
  }, [sortBy, sort, inputData.search]);
  useEffect(() => {
    getDataProduct();
  }, []);
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(products);
  };
  const getDataProduct = async () => {
    axios
      .get(
        `http://localhost:3000/products/get-product?sortby=${sortBy}&sort=${sort}&search=${inputData.search}`
      )
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDataProduct();
  }, []);
  const deleteProduct = async (id_product) => {
    axios
      .delete(`http://localhost:3000/products/delete-product/${id_product}`)
      .then((res) => {
        console.log(res);
        Swal.fire("Success", "Delete product success", "success");
        window.location.reload(false);
      });
  };
  return (
    <>
      <nav className="navbar bg-success text-white">
        <div className="container">
          <h6>Tugas Coding</h6>
          <h6>Ridhwan Muhammad Zaki</h6>
        </div>
      </nav>
      <div className="container">
        <h6 className="mt-5">Data Products</h6>
        <div className="mb-4">
          <div
            className={`btn ${
              sortBy === "name_product" ? "btn-success" : "btn-outline-success"
            } ms-1`}
            onClick={() => setSortBy("name_product")}
            style={{ width: "100px", borderRadius: "10px" }}
          >
            <h6 className=" mt-1">Nama Barang</h6>
          </div>
          <div
            className={`btn ${
              sortBy === "sold_product" ? "btn-success" : "btn-outline-success"
            } ms-3`}
            onClick={() => setSortBy("sold_product")}
            style={{ width: "100px", borderRadius: "10px" }}
          >
            <h6 className=" mt-1">Barang Terjual</h6>
          </div>
          <div
            className={`btn ${
              sortBy === "date_product" ? "btn-success" : "btn-outline-success"
            } ms-3`}
            onClick={() => setSortBy("date_product")}
            style={{ width: "100px", borderRadius: "10px" }}
          >
            <h6 className=" mt-1">Tanggal Transaksi</h6>
          </div>
          <div
            className={`btn ${
              sort === "asc" ? "btn-success" : "btn-outline-success"
            } ms-5`}
            onClick={() => setSort("asc")}
            style={{ width: "100px", borderRadius: "10px" }}
          >
            <h6 className=" mt-1">ASC</h6>
          </div>
          <div
            className={`btn ${
              sort === "desc" ? "btn-success" : "btn-outline-success"
            } ms-3`}
            onClick={() => setSort("desc")}
            style={{ width: "100px", borderRadius: "10px" }}
          >
            <h6 className=" mt-1">DESC</h6>
          </div>
        </div>
        <div>
          <input
            type="text"
            className="form-control  rounded-3 ms-5 mb-5"
            value={inputData.search}
            name="search"
            onChange={handleChange}
            placeholder="Search"
            style={{ width: "530px" }}
          />
        </div>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate(`/create-product`)}
        >
          Tambah Data Barang
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Nama Barang</th>
              <th scope="col">Stok</th>
              <th scope="col">Jumlah Terjual</th>
              <th scope="col">Tanggal Transaksi</th>
              <th scope="col">Jenis Barang</th>
              <th scope="col">Action</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id_product}>
                <td>{item.name_product}</td>
                <td>{item.stock_product}</td>
                <td>{item.sold_product}</td>
                <td>{moment.utc(item.date_product).format("DD/MM/YYYY")}</td>
                <td>{item.type_product}</td>
                <td>
                  <button
                    className="btn btn-warning text-white"
                    key={item.id_product}
                    onClick={() =>
                      navigate(`/update-product/${item.id_product}`)
                    }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    key={item.id_product}
                    onClick={() => deleteProduct(item.id_product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
