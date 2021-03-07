import React from "react";

interface Props {
  on: boolean;
}

//   display: inline-block;
//   width: 0.5rem;
//   height: 0.5rem;
//   margin-right: 0.25rem;
//   border-radius: 9999px;
//   background: ${(props: any) => {
//     return props.on === "online"
//       ? theme.colors.green[500]
//       : theme.colors.red[600];
//   }};

const Bubble: React.FC<Props> = ({ on }) => {
  const background = on ? "bg-green-500" : "bg-red-500";
  return <span className={`w-2 h-2 mr-1 rounded-full ${background}`} />;
};

export default Bubble;
