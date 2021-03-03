import { Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../src/components/utils/InputField";
import Wrapper from "../src/components/utils/Wrapper";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
} from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withApollo } from "../src/utils/withApollo";
import { FormWrapper } from "../src/components/styled/FormWrapper";
import { FormHeader } from "../src/components/styled/FormHeader";
import MyLink from "../src/components/utils/MyLink";

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
          console.log("login res", res);
          if (res.data?.login.errors) {
            setErrors(toErrorMap(res.data.login.errors));
          } else if (res.data?.login.user) {
            if (
              // eslint-disable-next-line operator-linebreak
              typeof router.query.next === "string" &&
              !router.query.next.includes("/team/view")
            ) {
              window.location.replace(router.query.next);
            } else {
              window.location.replace("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormWrapper>
              <MyLink href="/">
                <FormHeader>Login now!</FormHeader>
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
                <Link ml="auto" mt="1" color="blue.400" className="text-sm">
                  Forgot password?
                </Link>
              </NextLink>
              <Button
                mx="auto"
                mt="6"
                isLoading={isSubmitting}
                type="submit"
                loadingText="Submitting"
                colorScheme="blue"
                width="200px"
                variant="solid"
              >
                Login
              </Button>
            </FormWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
