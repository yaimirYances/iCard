import React from "react";
import "./HeaderPage.scss";
import {Button} from "semantic-ui-react"

export const HeaderPage = (props) => {
    const {title, btnTitle, btnClick, btnTitleS, btnClickS} = props;
  return (
    <div className="header-page-admin">
        <h2>{title}</h2>
        <div>
            {btnTitle && (
                <Button positive onClick={btnClick}>
                    {btnTitle}
                </Button>
            )}
            {btnTitleS && (
                <Button negative onClick={btnClickS}>
                    {btnTitleS}
                </Button>
            )}
        </div>
    </div>
  );
};
