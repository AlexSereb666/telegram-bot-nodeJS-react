import React, { useState, useEffect } from "react";
import './RatingStart.css';
import { getUserProductRating, addRating } from '../../http/userAPI'

const RatingStart = ({idUser, idProduct, setValue}) => {
    const [rateNew, setRateNew] = useState(0);

    const handleRatingChange = (event) => {
        const rate = parseInt(event.target.value);
        setRateNew(rate);
        setValue(rate)
        addRating(idUser, idProduct, rate).then((item) => console.log(item.message))
    };

    useEffect(() => {
        getUserProductRating(idUser, idProduct).then((item) => setRateNew(item.rating.rate))
    }, [])

    return (
        <div className="rating-area">
            {[...Array(5)].map((_, index) => {
                const value = 5 - index;
                return (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`star-${value}`}
                            name="rating"
                            value={value}
                            checked={rateNew === value}
                            onChange={handleRatingChange}
                        />
                        <label htmlFor={`star-${value}`} title={`Оценка «${value}»`}></label>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default RatingStart;
