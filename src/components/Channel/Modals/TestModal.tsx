// import { ModalFooter } from "@chakra-ui/modal";
// import { Button } from "@chakra-ui/react";
// import { Formik, Form } from "formik";
// import router from "next/router";
// import React, { useEffect, useRef } from "react";
// import { useGetIdFromUrl } from "../../../utils/hooks/useGetIdFromUrl";
// import { toErrorMap } from "../../../utils/toErrorMap";
// import ModalCloseButton from "../../Modal/ModalCloseButton";
// import InputField from "../../utils/InputField";

// const modalKey = "modal";

// const TestModal: React.FC<Props> = ({ open, onClick, header, children }) => {
//   const handleClick = (e) => {
//     //   if(!e.target.classList.)
//     console.log(e.target.classList, e.target.classList.value.indexOf(modalKey));
//     if (e.target.classList.value.indexOf(modalKey) === -1) {
//       onClick();
//     }
//   };
//   useEffect(() => {
//     document.addEventListener("click", handleClick);
//     if (!open) {
//       document.removeEventListener("click", handleClick);
//     }

//     return () => document.removeEventListener("click", handleClick);
//   }, [open]);

//   return (
//     <div>
//       {open ? (
//         <div
//           style={{ background: "rgba(0,0,0,.3)" }}
//           className={` absolute min-w-full min-h-screen overflow-hidden top-0 left-0 z-10 flex justify-center items-center`}
//         >
//           <div
//             style={{ minHeight: "275px", minWidth: "35%" }}
//             className={`${modalKey}   bg-white rounded-md p-2 relative text-gray-900`}
//           >
//             <h3 className={`${modalKey} px-6 py-4 text-gray-900 text-2xl`}>
//               Header
//             </h3>
//             <ModalCloseButton />
//             <Formik
//               initialValues={{ email: "" }}
//               onSubmit={async (values, { setErrors }) => {
//                 const teamId = useGetIdFromUrl(router.query.teamId);
//                 const res = await addMember({
//                   variables: { input: { email: values.email, teamId } },
//                   update: (cache) => {
//                     cache.evict({ fieldName: "getTeamMembers" });
//                   },
//                 });
//                 const { errors, ok } = res?.data?.addTeamMember;
//                 if (errors) setErrors(toErrorMap(errors));
//                 else onClick();
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   <InputField
//                     className="modal"
//                     name="email"
//                     label="User's email"
//                     placeholder="User's email"
//                   />

//                   {/* <ModalFooter> */}
//                   <Button
//                     isLoading={isSubmitting}
//                     type="submit"
//                     mr={3}
//                     loadingText="Submitting"
//                     colorScheme="blue"
//                     variant="solid"
//                     disabled={isSubmitting}
//                   >
//                     Submit
//                   </Button>
//                   <Button
//                     disabled={isSubmitting}
//                     onClick={onClick}
//                     variant="ghost"
//                   >
//                     Close
//                   </Button>
//                   {/* </ModalFooter> */}
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default TestModal;

import Modal from "react-modal";
import React from "react";

interface Props {
  open: boolean;
  onClick: () => void;
  header: string;
}
const TestModal = ({ open, onClick }: Props) => {
  return (
    <Modal
      style={{
        content: {
          width: "35%",
          height: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        },
      }}
      onRequestClose={onClick}
      isOpen={open}
      contentLabel="Example Modal"
    >
      <div className="flex flex-col bg-red-300">
        <h2>Hello</h2>
        <button onClick={onClick}>close</button>
        <div>I am a modal</div>
      </div>
    </Modal>
  );
};

export default TestModal;
