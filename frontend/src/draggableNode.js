// draggableNode.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faRobot,
  faFileExport,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NODETYPES } from "./constants/nodes";

const getIcon = (type) => {
  switch (type) {
    case NODETYPES.CUSTOMINPUT:
      return faKeyboard;
    case NODETYPES.LLM:
      return faRobot;
    case NODETYPES.CUSTOMOUTPUT:
      return faFileExport;
    case NODETYPES.TEXT:
      return faAlignLeft;
    default:
      return null;
  }
};

export const DraggableNode = ({ type, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const buttonStyle = {
    cursor: "grab",
    border: "1px solid #658147",
    padding: "10px",
    borderRadius: "4px",
    color: isHovered ? "#fff" : "#658147",
    backgroundColor: isHovered ? "#658147" : "transparent",
    fontSize: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "all 0.3s ease",
  };

  const iconStyle = {
    marginRight: "10px",
    fontSize: "20px",
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle}
      draggable
    >
      <FontAwesomeIcon icon={getIcon(type)} style={iconStyle} />
      <span>{label}</span>
    </div>
  );
};
