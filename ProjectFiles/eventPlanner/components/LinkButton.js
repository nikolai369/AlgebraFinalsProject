import React from "react";
import { Link } from "@react-navigation/native";

import Button from "./Button";

const LinkButton = (props) => {
  const { title, onPress, to, boxStyle } = props;
  return (
    <Link to={to} style={{ width: "87%" }}>
      <Button title={title} onPress={onPress} boxStyle={boxStyle} />
    </Link>
  );
};

export default LinkButton;
