import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductCard.css'
import { getOne } from '../../http/productAPI'
import btnBack from '../../assets/img/button-back.png'
import imgStart from '../../assets/img/star.png'
import RatingStart from "../../components/ratingStars/RatingStart";

const ProductCard = () => {
    const { idUser, idProduct } = useParams()
    const [ product, setProduct ] = useState(null)

    const [score, setScore] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        getOne(idProduct).then((item) => setProduct(item))
    }, [score])

    return (
        <div className="product-card-container">
            <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
            </div>
            <div className="product-card-container-main-info">
                <div className="product-card-container-main-info-img">
                    <img src={process.env.REACT_APP_API_URL + product?.img} alt="Нет изображения продукта:(" />
                </div>
                <div className="product-card-container-text-info">
                    <div className="product-card-container-text-info-name">
                        {product?.name}
                    </div>
                    <div className="product-card-container-text-info-price">
                        Цена: <span>{product?.price}</span> ₽
                    </div>
                    <div className="product-card-container-text-info-rating">
                        <div className="product-card-container-text-info-rating-star-img">
                            <img src={imgStart} alt="Куда-то делась рейтинговая звезда:(" />
                        </div>
                        <div className="product-card-container-text-info-rating-score">
                            {product?.averageRating.toFixed(1)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-card-container-score">
                <div className="product-card-container-score-title">
                    Ваша оценка продукта:
                </div>
                <div className="product-card-container-score-star">
                    <RatingStart
                        idUser={idUser}
                        idProduct={idProduct}
                        setValue={setScore}
                    />
                </div>
            </div>
            {product?.product_info.length > 0 && (
                <div className="product-card-container-description">
                    <div className="product-card-container-description-title">
                        Описание:
                    </div>
                    <div className="product-card-container-description-list">
                    {product.product_info.map((info, index) => 
                        <div key={index} className={`product-card-bottom-${index % 2 === 0 ? "one" : "two"}`}>
                            <span className="product-card-bottom-title">{info.title}</span>: {info.description};
                        </div>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductCard;
