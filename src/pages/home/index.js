import React from "react";
import Header from "../../components/Header";
import EnhancedTable from "../../components/Table";
import "./style.css";
import Input from "../../components/Input";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DescriptionIcon from "@material-ui/icons/Description";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import { db } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "15px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Home() {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState();
  const [stock, setStock] = React.useState();

  const addProduct = (e) => {
    e.preventDefault();
    db.collection("products").add({
      name,
      description,
      price,
      stock,
    });
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
  };
  return (
    <div className="home">
      <Header />
      <div className="home__title">
        <h1>Your Products</h1>
        <div className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Add a new product
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  Icon={FeaturedPlayListIcon}
                  placeholder="Name of the product"
                />
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  Icon={DescriptionIcon}
                  placeholder="Description of the product"
                />
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  Icon={MonetizationOnIcon}
                  placeholder="Price of the product"
                />
                <Input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type="number"
                  Icon={ShowChartIcon}
                  placeholder="Stock of the product"
                />
                <button
                  onClick={addProduct}
                  type="submit"
                  className="login__signInButton"
                  disabled={
                    name === "" ||
                    description === "" ||
                    price === undefined ||
                    stock === undefined
                  }
                >
                  Submit
                </button>
              </form>
            </AccordionDetails>
          </Accordion>
        </div>
        <EnhancedTable />
      </div>
    </div>
  );
}

export default Home;
