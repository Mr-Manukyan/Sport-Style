import React from "react"
import style from "./ProductCard.module.css"
import { Size } from "./Size/Size"
import { PlusMinus } from "./PlusMinus/PlusMinus"
import { OrderType, ProductType } from "../../../Types/Types"
import { playBtnSound } from "../../../Utils/helpers/helpers"

type PropsType = {
  product: ProductType
  setNewOrder: (order: OrderType) => void
}

export const ProductCard: React.FC<PropsType> = ({ product, setNewOrder }) => {

  const [image, setImage] = React.useState(`https://sport-style.onrender.com/${product.firstType.src}`)
  const [productID, setProductID] = React.useState(product.firstType.id)
  const [quantity, setQuantity] = React.useState(1)
  const [shoesSize, setShoesSize] = React.useState(39)

  const sizes = React.useMemo(() => [39, 40, 41, 42], [shoesSize])

  const addNewOrder = () => {
    playBtnSound()
    setNewOrder({
      id: productID + shoesSize,
      name: product.name,
      photo: image,
      size: shoesSize,
      price: product.price,
      quantity: quantity,
    })
  }

  const onMouseOverHandler = (imageSrc:string, productID:string) => {
    setImage(`https://sport-style.onrender.com/${imageSrc}`)
    setProductID(productID)
  }

  return (
    <div className={style.cardWrapper}>
      <ul className={style.thumb}>
        <li onMouseOver={() => onMouseOverHandler(product.firstType.src, product.firstType.id)}>
          <img src={`https://sport-style.onrender.com/${product.firstType.src}`}alt="product"/>
        </li>
        <li onMouseOver={() => onMouseOverHandler(product.secondType.src, product.secondType.id)}>
          <img src={`https://sport-style.onrender.com/${product.secondType.src}`} alt="product"/>
        </li>
        <li onMouseOver={() => onMouseOverHandler(product.thirdType.src, product.thirdType.id) }>
          <img src={`https://sport-style.onrender.com/${product.thirdType.src}`} alt="product" />
        </li>
      </ul>
      <div className={style.imgBox}>
        <h2>{product.name}</h2>
        <p className={style.price}>
          {product.price}
          <span className={style.currency}>{'AMD'}</span>
        </p>
        <img src={image} alt="product" />
        <Size setShoesSize={setShoesSize} sizes={sizes} />
        <PlusMinus quantity={quantity} setQuantity={setQuantity} />
        <button className={style.btn} onClick={addNewOrder}>
          {"Add to basket"}
        </button>
      </div>
    </div>
  )
}
