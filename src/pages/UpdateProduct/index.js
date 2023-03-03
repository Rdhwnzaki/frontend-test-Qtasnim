import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id_product } = useParams();
  const [name_product, setNameProduct] = useState("");
  const [stock_product, setStockProduct] = useState("");
  const [sold_product, setSoldProduct] = useState("");
  const [date_product, setDateProduct] = useState("");
  const [type_product, setTypeProduct] = useState("");
  const handleData = async (e) => {
    e.preventDefault();
    let data = {
      name_product,
      stock_product,
      sold_product,
      date_product,
      type_product,
    };
    axios
      .put(`http://localhost:3000/products/put-product/${id_product}`, data)
      .then((res) => {
        console.log(res);
        Swal.fire("Success", "Update data barang success", "success");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Warning", "Update data barang failed", "error");
      });
  };
  return (
    <div>
      <nav className="navbar bg-success text-white">
        <div className="container">
          <h6>Tugas Coding</h6>
          <h6>Ridhwan Muhammad Zaki</h6>
        </div>
      </nav>
      <div className="container my-5">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Nama Barang
            </label>
            <input
              type="text"
              class="form-control"
              name="name_product"
              onChange={(e) => setNameProduct(e.target.value)}
              value={name_product}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Stok Barang
            </label>
            <input
              type="number"
              class="form-control"
              name="stock_product"
              onChange={(e) => setStockProduct(e.target.value)}
              value={stock_product}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Jumlah Terjual
            </label>
            <input
              type="number"
              class="form-control"
              name="sold_product"
              onChange={(e) => setSoldProduct(e.target.value)}
              value={sold_product}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Tanggal Transaksi
            </label>
            <input
              type="date"
              class="form-control"
              name="date_product"
              onChange={(e) => setDateProduct(e.target.value)}
              value={date_product}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Jenis Barang
            </label>
            <input
              type="text"
              class="form-control"
              name="type_product"
              onChange={(e) => setTypeProduct(e.target.value)}
              value={type_product}
            />
          </div>
          <button type="submit" class="btn btn-success" onClick={handleData}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
