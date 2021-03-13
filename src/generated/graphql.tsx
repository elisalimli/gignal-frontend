import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  channel?: Maybe<Channel>;
  getMember?: Maybe<User>;
  messages?: Maybe<Array<Message>>;
  teams?: Maybe<Array<Team>>;
  invitedTeams?: Maybe<Array<Team>>;
  team?: Maybe<Team>;
  getTeamMembers: Array<Member>;
  me?: Maybe<User>;
  allUsers?: Maybe<Array<User>>;
  directMessages: Array<DirectMessage>;
};


export type QueryChannelArgs = {
  input: ChannelInput;
};


export type QueryGetMemberArgs = {
  userId: Scalars['Int'];
};


export type QueryMessagesArgs = {
  channelId: Scalars['Int'];
};


export type QueryTeamArgs = {
  teamId: Scalars['Int'];
};


export type QueryGetTeamMembersArgs = {
  teamId: Scalars['Int'];
};


export type QueryDirectMessagesArgs = {
  input: DirectMessagesInput;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  name: Scalars['String'];
  public: Scalars['Boolean'];
  users?: Maybe<Array<User>>;
  messages?: Maybe<Array<Message>>;
  team: Team;
  creator: User;
  creatorId: Scalars['Float'];
  teamId: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  isYou: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  fileType?: Maybe<Scalars['String']>;
  channelId: Scalars['Int'];
  creator: User;
  creatorId: Scalars['Int'];
  channel: Channel;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Int'];
  name: Scalars['String'];
  creatorId: Scalars['Float'];
  channels: Array<Channel>;
  directMessagesMembers: Array<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  admin: Scalars['Boolean'];
};

export type ChannelInput = {
  teamId: Scalars['Int'];
  channelId: Scalars['Int'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  teamId: Scalars['Int'];
  team: Team;
  user: User;
  isYou: Scalars['Boolean'];
  admin: Scalars['Boolean'];
  updatedAt: Scalars['String'];
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  id: Scalars['Int'];
  teamId: Scalars['Int'];
  receiverId: Scalars['Int'];
  senderId: Scalars['Int'];
  creator: User;
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type DirectMessagesInput = {
  teamId: Scalars['Int'];
  otherUserId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: CreateChannelResponse;
  addTeamMember: VoidResponse;
  createMessage: CreateMessageResponse;
  deleteTeam: Scalars['Boolean'];
  createTeam: CreateTeamResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  createDirectMessage: Scalars['Boolean'];
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationAddTeamMemberArgs = {
  input: AddTeamMemberInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['Int'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationCreateDirectMessageArgs = {
  input: CreateDirectMessageInput;
};

export type CreateChannelResponse = {
  __typename?: 'CreateChannelResponse';
  errors?: Maybe<Array<FieldError>>;
  channel?: Maybe<Channel>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CreateChannelInput = {
  teamId: Scalars['Int'];
  name: Scalars['String'];
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type VoidResponse = {
  __typename?: 'VoidResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
};

export type AddTeamMemberInput = {
  teamId: Scalars['Int'];
  email: Scalars['String'];
};

export type CreateMessageResponse = {
  __typename?: 'CreateMessageResponse';
  errors?: Maybe<Array<FieldError>>;
  message?: Maybe<Message>;
};

export type CreateMessageInput = {
  channelId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
};


export type CreateTeamResponse = {
  __typename?: 'CreateTeamResponse';
  errors?: Maybe<Array<FieldError>>;
  team?: Maybe<Team>;
  channelId?: Maybe<Scalars['Int']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateDirectMessageInput = {
  receiverId: Scalars['Int'];
  teamId: Scalars['Int'];
  text: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessageAdded: Message;
  newDirectMessageAdded: DirectMessage;
};


export type SubscriptionNewMessageAddedArgs = {
  channelId: Scalars['Int'];
};


export type SubscriptionNewDirectMessageAddedArgs = {
  input: DirectMessageSubscriptionInput;
};

export type DirectMessageSubscriptionInput = {
  teamId: Scalars['Int'];
  receiverId: Scalars['Int'];
};

export type ChannelsSnippetFragment = (
  { __typename?: 'Channel' }
  & Pick<Channel, 'id' | 'name' | 'teamId'>
);

export type DirectMessageSnippetFragment = (
  { __typename?: 'DirectMessage' }
  & Pick<DirectMessage, 'id' | 'text' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularMemberUserSnippetFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type MessageSnippetFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'text' | 'createdAt' | 'url' | 'fileType'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type MemberSnippetFragment = (
  { __typename?: 'Member' }
  & Pick<Member, 'id'>
  & { user: (
    { __typename?: 'User' }
    & RegularMemberUserSnippetFragment
  ) }
);

export type RegularTeamsSnippetFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name'>
);

export type TeamSnippetFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name' | 'admin'>
  & { channels: Array<(
    { __typename?: 'Channel' }
    & ChannelsSnippetFragment
  )>, directMessagesMembers: Array<(
    { __typename?: 'User' }
    & RegularMemberUserSnippetFragment
  )> }
);

export type MeSnippetFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'createdAt' | 'email'>
);

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = (
  { __typename?: 'Mutation' }
  & { createChannel: (
    { __typename?: 'CreateChannelResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, channel?: Maybe<(
      { __typename?: 'Channel' }
      & Pick<Channel, 'id' | 'name' | 'public' | 'teamId'>
    )> }
  ) }
);

export type CreateDirectMessageMutationVariables = Exact<{
  input: CreateDirectMessageInput;
}>;


export type CreateDirectMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createDirectMessage'>
);

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'CreateMessageResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'text' | 'creatorId'>
    )> }
  ) }
);

export type AddTeamMemberMutationVariables = Exact<{
  input: AddTeamMemberInput;
}>;


export type AddTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & { addTeamMember: (
    { __typename?: 'VoidResponse' }
    & Pick<VoidResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'CreateTeamResponse' }
    & Pick<CreateTeamResponse, 'channelId'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name' | 'creatorId'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email' | 'createdAt'>
    )> }
  ) }
);

export type ChannelQueryVariables = Exact<{
  input: ChannelInput;
}>;


export type ChannelQuery = (
  { __typename?: 'Query' }
  & { channel?: Maybe<(
    { __typename?: 'Channel' }
    & ChannelsSnippetFragment
  )> }
);

export type DirectMessagesQueryVariables = Exact<{
  input: DirectMessagesInput;
}>;


export type DirectMessagesQuery = (
  { __typename?: 'Query' }
  & { directMessages: Array<(
    { __typename?: 'DirectMessage' }
    & DirectMessageSnippetFragment
  )> }
);

export type GetMemberQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetMemberQuery = (
  { __typename?: 'Query' }
  & { getMember?: Maybe<(
    { __typename?: 'User' }
    & RegularMemberUserSnippetFragment
  )> }
);

export type MessagesQueryVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages?: Maybe<Array<(
    { __typename?: 'Message' }
    & MessageSnippetFragment
  )>> }
);

export type TeamQueryVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type TeamQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & MeSnippetFragment
  )>, team?: Maybe<(
    { __typename?: 'Team' }
    & TeamSnippetFragment
  )> }
);

export type GetTeamMembersQueryVariables = Exact<{
  teamId: Scalars['Int'];
}>;


export type GetTeamMembersQuery = (
  { __typename?: 'Query' }
  & { getTeamMembers: Array<(
    { __typename?: 'Member' }
    & MemberSnippetFragment
  )> }
);

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = (
  { __typename?: 'Query' }
  & { teams?: Maybe<Array<(
    { __typename?: 'Team' }
    & RegularTeamsSnippetFragment
  )>>, invitedTeams?: Maybe<Array<(
    { __typename?: 'Team' }
    & RegularTeamsSnippetFragment
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & MeSnippetFragment
  )> }
);

export type NewDirectMessageAddedSubscriptionVariables = Exact<{
  input: DirectMessageSubscriptionInput;
}>;


export type NewDirectMessageAddedSubscription = (
  { __typename?: 'Subscription' }
  & { newDirectMessageAdded: (
    { __typename?: 'DirectMessage' }
    & DirectMessageSnippetFragment
  ) }
);

export type NewMessageAddedSubscriptionVariables = Exact<{
  channelId: Scalars['Int'];
}>;


export type NewMessageAddedSubscription = (
  { __typename?: 'Subscription' }
  & { newMessageAdded: (
    { __typename?: 'Message' }
    & MessageSnippetFragment
  ) }
);

export const DirectMessageSnippetFragmentDoc = gql`
    fragment DirectMessageSnippet on DirectMessage {
  id
  text
  createdAt
  creator {
    id
    username
  }
}
    `;
export const MessageSnippetFragmentDoc = gql`
    fragment MessageSnippet on Message {
  id
  text
  createdAt
  creator {
    id
    username
  }
  url
  fileType
}
    `;
export const RegularMemberUserSnippetFragmentDoc = gql`
    fragment RegularMemberUserSnippet on User {
  id
  username
}
    `;
export const MemberSnippetFragmentDoc = gql`
    fragment MemberSnippet on Member {
  id
  user {
    ...RegularMemberUserSnippet
  }
}
    ${RegularMemberUserSnippetFragmentDoc}`;
export const RegularTeamsSnippetFragmentDoc = gql`
    fragment RegularTeamsSnippet on Team {
  id
  name
}
    `;
export const ChannelsSnippetFragmentDoc = gql`
    fragment ChannelsSnippet on Channel {
  id
  name
  teamId
}
    `;
export const TeamSnippetFragmentDoc = gql`
    fragment TeamSnippet on Team {
  id
  name
  channels {
    ...ChannelsSnippet
  }
  directMessagesMembers {
    ...RegularMemberUserSnippet
  }
  admin
}
    ${ChannelsSnippetFragmentDoc}
${RegularMemberUserSnippetFragmentDoc}`;
export const MeSnippetFragmentDoc = gql`
    fragment MeSnippet on User {
  id
  username
  createdAt
  email
}
    `;
export const CreateChannelDocument = gql`
    mutation CreateChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
    errors {
      field
      message
    }
    channel {
      id
      name
      public
      teamId
    }
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, baseOptions);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const CreateDirectMessageDocument = gql`
    mutation CreateDirectMessage($input: CreateDirectMessageInput!) {
  createDirectMessage(input: $input)
}
    `;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>) {
        return Apollo.useMutation<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>(CreateDirectMessageDocument, baseOptions);
      }
export type CreateDirectMessageMutationHookResult = ReturnType<typeof useCreateDirectMessageMutation>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    errors {
      field
      message
    }
    message {
      id
      text
      creatorId
    }
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, baseOptions);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const AddTeamMemberDocument = gql`
    mutation AddTeamMember($input: AddTeamMemberInput!) {
  addTeamMember(input: $input) {
    errors {
      field
      message
    }
    ok
  }
}
    `;
export type AddTeamMemberMutationFn = Apollo.MutationFunction<AddTeamMemberMutation, AddTeamMemberMutationVariables>;

/**
 * __useAddTeamMemberMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberMutation, { data, loading, error }] = useAddTeamMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>) {
        return Apollo.useMutation<AddTeamMemberMutation, AddTeamMemberMutationVariables>(AddTeamMemberDocument, baseOptions);
      }
export type AddTeamMemberMutationHookResult = ReturnType<typeof useAddTeamMemberMutation>;
export type AddTeamMemberMutationResult = Apollo.MutationResult<AddTeamMemberMutation>;
export type AddTeamMemberMutationOptions = Apollo.BaseMutationOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(name: $name) {
    errors {
      field
      message
    }
    team {
      id
      name
      creatorId
    }
    channelId
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(input: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
      createdAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ChannelDocument = gql`
    query Channel($input: ChannelInput!) {
  channel(input: $input) {
    ...ChannelsSnippet
  }
}
    ${ChannelsSnippetFragmentDoc}`;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, baseOptions);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
export const DirectMessagesDocument = gql`
    query DirectMessages($input: DirectMessagesInput!) {
  directMessages(input: $input) {
    ...DirectMessageSnippet
  }
}
    ${DirectMessageSnippetFragmentDoc}`;

/**
 * __useDirectMessagesQuery__
 *
 * To run a query within a React component, call `useDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDirectMessagesQuery(baseOptions: Apollo.QueryHookOptions<DirectMessagesQuery, DirectMessagesQueryVariables>) {
        return Apollo.useQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(DirectMessagesDocument, baseOptions);
      }
export function useDirectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectMessagesQuery, DirectMessagesQueryVariables>) {
          return Apollo.useLazyQuery<DirectMessagesQuery, DirectMessagesQueryVariables>(DirectMessagesDocument, baseOptions);
        }
export type DirectMessagesQueryHookResult = ReturnType<typeof useDirectMessagesQuery>;
export type DirectMessagesLazyQueryHookResult = ReturnType<typeof useDirectMessagesLazyQuery>;
export type DirectMessagesQueryResult = Apollo.QueryResult<DirectMessagesQuery, DirectMessagesQueryVariables>;
export const GetMemberDocument = gql`
    query GetMember($userId: Int!) {
  getMember(userId: $userId) {
    ...RegularMemberUserSnippet
  }
}
    ${RegularMemberUserSnippetFragmentDoc}`;

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
        return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, baseOptions);
      }
export function useGetMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
          return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, baseOptions);
        }
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>;
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>;
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>;
export const MessagesDocument = gql`
    query Messages($channelId: Int!) {
  messages(channelId: $channelId) {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const TeamDocument = gql`
    query Team($teamId: Int!) {
  me {
    ...MeSnippet
  }
  team(teamId: $teamId) {
    ...TeamSnippet
  }
}
    ${MeSnippetFragmentDoc}
${TeamSnippetFragmentDoc}`;

/**
 * __useTeamQuery__
 *
 * To run a query within a React component, call `useTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamQuery(baseOptions: Apollo.QueryHookOptions<TeamQuery, TeamQueryVariables>) {
        return Apollo.useQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
      }
export function useTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamQuery, TeamQueryVariables>) {
          return Apollo.useLazyQuery<TeamQuery, TeamQueryVariables>(TeamDocument, baseOptions);
        }
export type TeamQueryHookResult = ReturnType<typeof useTeamQuery>;
export type TeamLazyQueryHookResult = ReturnType<typeof useTeamLazyQuery>;
export type TeamQueryResult = Apollo.QueryResult<TeamQuery, TeamQueryVariables>;
export const GetTeamMembersDocument = gql`
    query GetTeamMembers($teamId: Int!) {
  getTeamMembers(teamId: $teamId) {
    ...MemberSnippet
  }
}
    ${MemberSnippetFragmentDoc}`;

/**
 * __useGetTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamMembersQuery({
 *   variables: {
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useGetTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
        return Apollo.useQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, baseOptions);
      }
export function useGetTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
          return Apollo.useLazyQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, baseOptions);
        }
export type GetTeamMembersQueryHookResult = ReturnType<typeof useGetTeamMembersQuery>;
export type GetTeamMembersLazyQueryHookResult = ReturnType<typeof useGetTeamMembersLazyQuery>;
export type GetTeamMembersQueryResult = Apollo.QueryResult<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const AllTeamsDocument = gql`
    query AllTeams {
  teams {
    ...RegularTeamsSnippet
  }
  invitedTeams {
    ...RegularTeamsSnippet
  }
}
    ${RegularTeamsSnippetFragmentDoc}`;

/**
 * __useAllTeamsQuery__
 *
 * To run a query within a React component, call `useAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTeamsQuery(baseOptions?: Apollo.QueryHookOptions<AllTeamsQuery, AllTeamsQueryVariables>) {
        return Apollo.useQuery<AllTeamsQuery, AllTeamsQueryVariables>(AllTeamsDocument, baseOptions);
      }
export function useAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTeamsQuery, AllTeamsQueryVariables>) {
          return Apollo.useLazyQuery<AllTeamsQuery, AllTeamsQueryVariables>(AllTeamsDocument, baseOptions);
        }
export type AllTeamsQueryHookResult = ReturnType<typeof useAllTeamsQuery>;
export type AllTeamsLazyQueryHookResult = ReturnType<typeof useAllTeamsLazyQuery>;
export type AllTeamsQueryResult = Apollo.QueryResult<AllTeamsQuery, AllTeamsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...MeSnippet
  }
}
    ${MeSnippetFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewDirectMessageAddedDocument = gql`
    subscription NewDirectMessageAdded($input: DirectMessageSubscriptionInput!) {
  newDirectMessageAdded(input: $input) {
    ...DirectMessageSnippet
  }
}
    ${DirectMessageSnippetFragmentDoc}`;

/**
 * __useNewDirectMessageAddedSubscription__
 *
 * To run a query within a React component, call `useNewDirectMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewDirectMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewDirectMessageAddedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNewDirectMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewDirectMessageAddedSubscription, NewDirectMessageAddedSubscriptionVariables>) {
        return Apollo.useSubscription<NewDirectMessageAddedSubscription, NewDirectMessageAddedSubscriptionVariables>(NewDirectMessageAddedDocument, baseOptions);
      }
export type NewDirectMessageAddedSubscriptionHookResult = ReturnType<typeof useNewDirectMessageAddedSubscription>;
export type NewDirectMessageAddedSubscriptionResult = Apollo.SubscriptionResult<NewDirectMessageAddedSubscription>;
export const NewMessageAddedDocument = gql`
    subscription NewMessageAdded($channelId: Int!) {
  newMessageAdded(channelId: $channelId) {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

/**
 * __useNewMessageAddedSubscription__
 *
 * To run a query within a React component, call `useNewMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageAddedSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageAddedSubscription, NewMessageAddedSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageAddedSubscription, NewMessageAddedSubscriptionVariables>(NewMessageAddedDocument, baseOptions);
      }
export type NewMessageAddedSubscriptionHookResult = ReturnType<typeof useNewMessageAddedSubscription>;
export type NewMessageAddedSubscriptionResult = Apollo.SubscriptionResult<NewMessageAddedSubscription>;