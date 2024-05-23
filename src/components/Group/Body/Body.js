import React from "react";
import style from "./Body.module.css";
import { useMediaQuery } from "react-responsive";

const Body = (props) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isNotMobile = useMediaQuery({ minWidth: 768 });

    return (
        (isDesktopOrLaptop && (
            <div className={style.background}>
                <div className={style.deskbody}>
                    <div className={style.element}>
                        <div className={style.desktext}>
                            <div style={{ marginBottom: '30px' }}>
                                {props.sentence1}<br />
                                {props.sentence2}<br />
                                {props.sentence3}<br />
                            </div>
                        </div>
                        <div className={style.desktitle}>{props.title}</div>
                    </div>
                    <img src={props.imageSrc} alt="이미지" style={{ width: '40%', height: '45%' }} />
                </div>
            </div>
        )) || (isTablet && (
            <div className={style.tabbackground}>
                <div className={style.tabbody}>
                    <div className={style.element}>
                        <div className={style.tabtext}>
                            <div style={{ marginBottom: '30px' }}>
                                {props.sentence1}<br />
                                {props.sentence2}<br />
                                {props.sentence3}<br />
                            </div>
                        </div>
                        <div className={style.tabtitle}>{props.title}</div>
                    </div>
                    <img src={props.imageSrc} alt="이미지" style={{ width: '300px', height: '230px' }} />
                </div>
            </div>
        ))
    );
};

export default Body;
