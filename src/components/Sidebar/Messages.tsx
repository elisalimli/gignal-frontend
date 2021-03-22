// import React, { useEffect, useState } from "react";
// import {
//   ChannelsSnippetFragment,
//   useMeQuery,
//   useMessagesQuery,
//   useNewMessageAddedSubscription,
// } from "../../generated/graphql";
// import { useSubscribeToMessages } from "../../utils/hooks/useSubscribeToMessages";
// import Loading from "../utils/Loading";
// import RegularMessagesWrapper from "./RegularMessagesWrapper";
// import Button from "../Button";

// interface Props {
//   channel: ChannelsSnippetFragment;
// }
// const Messages: React.FC<Props> = ({ channel: { id } }) => {
//   const [limit, setLimit] = useState(10);
//   const { data, loading, subscribeToMore, fetchMore } = useMessagesQuery({
//     variables: {
//       input: { channelId: id, limit: 5, cursor: null },
//     },
//     fetchPolicy: "network-only",
//   });

//   console.log("limit", limit);

//   const { data: meData, loading: meLoading } = useMeQuery();
//   useNewMessageAddedSubscription({
//     variables: { channelId: id },
//     // onSubscriptionData: () => setLimit(limit + 1),
//   });

//   useEffect(() => {
//     const unsub = useSubscribeToMessages(subscribeToMore, id);
//     return () => {
//       unsub();
//     };
//   }, [id]);

//   if ((loading || meLoading) && !data?.messages) return <Loading />;

//   return (
//     <>
//       <RegularMessagesWrapper
//         hasMore={data?.messages?.hasMore}
//         fetchMore={fetchMore}
//         data={data?.messages?.messages || []}
//         channelId={id}
//         me={meData?.me}
//       />
//     </>
//   );
// };

// export default Messages;

import React, { useEffect, useState } from "react";
import {
  ChannelsSnippetFragment,
  useMeQuery,
  useMessagesQuery,
  useNewMessageAddedSubscription,
} from "../../generated/graphql";
import { useSubscribeToMessages } from "../../utils/hooks/useSubscribeToMessages";
import Loading from "../utils/Loading";
import RegularMessagesWrapper from "./RegularMessagesWrapper";
import Button from "../Button";

interface Props {
  channel: ChannelsSnippetFragment;
}
const Messages: React.FC<Props> = ({ channel: { id } }) => {
  const [limit, setLimit] = useState(10);
  const [myData, setMyData] = useState([]);
  const { data, loading, subscribeToMore, fetchMore } = useMessagesQuery({
    variables: {
      input: { channelId: id, limit: 5, cursor: null },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.messages?.messages) {
      console.log("changed,data", data);
      setMyData([...myData, ...data?.messages?.messages]);
    }
  }, [data]);
  console.log("limit", limit);

  const { data: meData, loading: meLoading } = useMeQuery();
  useNewMessageAddedSubscription({
    variables: { channelId: id },
    // onSubscriptionData: () => setLimit(limit + 1),
  });

  useEffect(() => {
    const unsub = useSubscribeToMessages(subscribeToMore, id);
    return () => {
      unsub();
    };
  }, [id]);

  if ((loading || meLoading) && !data?.messages) return <Loading />;

  return (
    <>
      <RegularMessagesWrapper
        hasMore={data?.messages?.hasMore}
        fetchMore={fetchMore}
        data={myData || []}
        channelId={id}
        me={meData?.me}
      />
    </>
  );
};

export default Messages;
