import React from "react";
import { Image } from "./PhotoElements";

const Photo = (props) => {
  return <Image key={props.id} src={props.src} alt={props.alt} />;
};

export default Photo;
