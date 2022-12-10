import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "../../../components/Skeleton";
import ProductCart from "./ProductCart";

const Product = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);
  const page = Math.ceil(products.length / 9);

  // const { data: products, isLoading } = useQuery(["products"], async () => {
  //   const res = await axios.get(`http://localhost:5000/products?page=0&size=9`);
  //   const { products, productsCount } = res.data.data;
  //   setTotalProducts(productsCount);
  //   setAllProducts(products);
  //   return products;
  // });

  const getProducts = async () => {
    fetch(`http://localhost:5000/products?page=${page}&size=9`)
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, ...data.data.products]);
        setTotalProducts(data.data.productsCount);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const fetchMoreData = () => {
    fetch(`http://localhost:5000/products?page=${page}&size=9`)
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, ...data.data.products]);
      });
  };

  return (
    <>
      <h1 className="text-lg font-bold text-center mt-10 dark:text-white">
        Featured <span className="dark:text-cyan-400">Products</span>
      </h1>
      <p className="text-center mb-4 dark:text-white">
        Check & Get Your Desired Product!
      </p>

      <div
        id="scrollableDiv"
        className="h-[900px] scrollableDiv overflow-y-scroll"
      >
        <InfiniteScroll
          style={{ overflowX: "hidden" }}
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={products.length < totalProducts}
          loader={<Skeleton />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                marginTop: "50px",
              }}
            >
              <b>End Result</b>
            </p>
          }
        >
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products?.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {/* 

      <div className="text-center mt-8">
        {[...Array(totalPage).keys()].map((indx) => (
          <button
            key={indx}
            onClick={() => setCurrentPage(indx)}
            className="bg-[#3749BB] dark:bg-white text-white dark:text-slate-700 px-4 py-1 mr-2"
          >
            {indx + 1}
          </button>
        ))}
      </div> */}
    </>
  );
};

export default Product;
