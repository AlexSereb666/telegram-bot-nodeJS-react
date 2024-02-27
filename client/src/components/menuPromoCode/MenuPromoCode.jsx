import React, { useState, useEffect, useContext } from "react";
import './MenuPromoCode.css'
import btnBack from '../../assets/img/button-back.png'
import CustomInput from "../customInput/CustomInput";
import ButtonItem from '../buttonItem/ButtonItem'
import { Context } from '../../index';
import { getPromoCodeByCode } from '../../http/promoCodeAPI'

const MenuPromoCode = () => {
    const [promoCodeText, setPromoCodeText] = useState("")
    const [listCodes, setListCodes] = useState([])
    const { promoCode } = useContext(Context)

    const addCodeToList = () => {
        if (promoCodeText.trim() !== '') {
            getPromoCodeByCode(promoCodeText).then((item) => {
                setListCodes(prevList => [...prevList, item.promoCode])
            })
        }
        setPromoCodeText("")
    }

    useEffect(() => {
        promoCode.setList(listCodes)



        console.log(promoCode)
    }, [listCodes])

    return (
        <div className="menu-promo-code-container">
            <div className="menu-promo-code-container-menu">
                <div className="menu-promo-code-container-menu-btn-back">
                    <img src={btnBack} alt="Куда пропала кнопка назад? О.О" />
                </div>
                <div className="menu-promo-code-container-menu-input">
                    <CustomInput
                        value={promoCodeText} 
                        setValue={setPromoCodeText} 
                        label={"Введите промокод"}
                        type="text"
                    />
                </div>
                <div className="menu-promo-code-container-menu-button">
                    <ButtonItem
                        name="Активировать"
                        onClick={addCodeToList}
                    />
                </div>
            </div>
            <div className="menu-promo-code-container-list">

            </div>
        </div>
    )
}

export default MenuPromoCode
