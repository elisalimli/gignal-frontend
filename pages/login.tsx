import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../src/components/Button";
import InputField from "../src/components/utils/InputField";
import MyLink from "../src/components/utils/MyLink";
import Wrapper from "../src/components/utils/Wrapper";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withApollo } from "../src/utils/withApollo";
import { form, formHeader } from "../styles/global";

const Login = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { data } = useMeQuery();

  if (data?.me && !router.query.next) {
    router.push("/");
  }

  return (
    <Wrapper isMobileFull>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({
            variables: values,
            update: (cache, { data: _data, context }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: _data.login.user,
                },
              });
            },
          });
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            if (
              // eslint-disable-next-line operator-linebreak
              typeof router.query.next === "string" &&
              !router.query.next.includes("/team/view")
            ) {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={form}>
            <MyLink href="/">
              <h1 className={formHeader}>Login now!</h1>
            </MyLink>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
            <NextLink href="/forgot-password">
              <a className="ml-auto mt-1 text-blue-400 text-sm">
                Forgot password?
              </a>
            </NextLink>
            <Button
              width="200px"
              loading={isSubmitting}
              centered
              variant="solid"
              borderRadius="lg"
              extraClassName="mt-3"
              type="submit"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
