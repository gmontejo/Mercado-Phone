import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import { Route, Redirect } from "react-router-dom";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalContactoOpen: true,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
    isLogin: false,
  };

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem("product"));
    this.setState(() => {
      return { detailProduct: product };
    });
  }

  handleLogin = () => {
    this.setState(() => {
      return { isLogin: true };
    });
  };

  setProducts = () => {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState(() => {
      return { products };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (product) => {
    window.scrollTo(0, 0);

    localStorage.setItem("product", JSON.stringify(product));

    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  openModalContacto = () => {
    this.setState(() => {
      return { modalContactoOpen: true };
    });
  };

  increment = (id) => {
    const tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    const tempProduct = tempCart[index];
    tempProduct.count++;
    tempProduct.total = tempProduct.count * tempProduct.price;

    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = (id) => {
    const tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    const tempProduct = tempCart[index];

    if (tempProduct.count !== 1) {
      tempProduct.count--;
      tempProduct.total = tempProduct.count * tempProduct.price;

      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    } else {
      this.removeItem(id);
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          prodcuts: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubtotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  handleMiniImg = (foto) => {
    let displayImage = document.getElementById("displayImage");
    displayImage.setAttribute("src", foto);
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          handleMiniImg: this.handleMiniImg,
          openModalContacto: this.openModalContacto,
          closeModalContacto: this.closeModalContacto,
          handleLogin: this.handleLogin,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
