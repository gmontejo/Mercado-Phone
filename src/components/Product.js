import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";
import PropTypes from "prop-types";

export default class Product extends Component {
  render() {
    const { title, img, price, usd, SegundoPrecio } = this.props.product;

    return (
      <ProductWrapper className="col-6 p-1 col-md-6 col-lg-2 my-1">
        <div className="card">
          <ProductConsumer>
            {(value) => (
              <div
                style={{ maxHeight: "300px" }}
                className="img-container d-flex justify-content-center"
                onClick={() => value.handleDetail(this.props.product)}
                onAuxClick={() => value.handleDetail(this.props.product)}
              >
                <Link to="/details">
                  <img src={img[0]} alt="product" className="card-img p-1" />
                </Link>
              </div>
            )}
          </ProductConsumer>
          {/*card footer*/}

          <div className="card-footer d-flex flex-column pt-0">
            <h5 className=" mb-2">{title}</h5>
            <h4 className="text-blue font-italic mb-0 ">
              {SegundoPrecio == null
                ? usd
                  ? "US$ " + price
                  : "$ " + price
                : `US$ ${price} / $ ${SegundoPrecio}`}
            </h4>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    img: PropTypes.array,
    title: PropTypes.string,
    inCart: PropTypes.bool,
  }).isRequired,
};

const ProductWrapper = styled.div`
  .card-img {
    width: 100% !important;
    height: 100% !important;
    object-fit: scale-down;
    border-radius: 7%;
  }

  .card {
    border-color: transparent;
    transition: all 1s linear;
    border-radius: 5px;
  }
  .card-footer {
    background: transparent;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    transition: all 1s linear;
    padding: 8px 5px;
  }
  &:hover {
    .card {
      border: 0.04rem solid rgba(0, 0, 0, 0.2);
      box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
    }
    .card-footer {
      background: rgba(240, 240, 240);
    }
  }
  .img-container {
    position: relative;
    overflow: hidden;
  }
  .card-img {
    transition: all 0.4s linear;
  }
  .img-container:hover .card-img {
    transform: scale(1.1);
  }
  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%, 100%);
    transition: all 0.6s linear;
  }
  .img-container:hover .cart-btn {
    transform: translate(0, 0);
  }
  .cart-btn:hover {
    color: var(--mainBlue);
    cursor: pointer;
  }
`;
