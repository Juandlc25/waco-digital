import React, { useEffect } from "react";
import DescriptionIcon from "@material-ui/icons/Description";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import Input from "../Input";
import PropTypes from "prop-types";
import { db } from "../../firebase";

function ModalBody({ style, className, setOpen, selected, setSelected }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();
  const updateProduct = (e) => {
    e.preventDefault();
    selected.map((product) =>
      db.collection("products").doc(product).set({
        name,
        description,
        price,
        stock,
      })
    );
    setOpen(false);
    setSelected([]);
  };

  useEffect(() => {
    selected.map((product) =>
      db
        .collection("products")
        .doc(product)
        .get()
        .then((doc) => {
          setName(doc.data().name);
          setDescription(doc.data().description);
          setPrice(doc.data().price);
          setStock(doc.data().stock);
        })
    );
  }, []);

  return (
    <div style={style} className={className}>
      <h1>Update product</h1>
      <form>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          Icon={FeaturedPlayListIcon}
          placeholder="New name of the product"
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          Icon={DescriptionIcon}
          placeholder="New description of the product"
        />
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          Icon={MonetizationOnIcon}
          placeholder="new Price of the product"
        />
        <Input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          Icon={ShowChartIcon}
          placeholder="new Stock of the product"
        />
        <button
          onClick={updateProduct}
          type="submit"
          className="login__signInButton"
        >
          Update product
        </button>
      </form>
    </div>
  );
}

ModalBody.propTypes = {
  setOpen: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array,
};

ModalBody.defaultProps = {
  selected: undefined,
};

export default ModalBody;
