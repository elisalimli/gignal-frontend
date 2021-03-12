import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../src/components/Button";
import InputField from "../src/components/utils/InputField";
import MyLink from "../src/components/utils/MyLink";
import {
  MeDocument,
  MeQuery,
  useMeQuery,
  useRegisterMutation,
} from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withApollo } from "../src/utils/withApollo";
import { form, formHeader } from "../styles/global";

interface Props {}

const Register: React.FC<Props> = () => {
  const { data } = useMeQuery();
  const router = useRouter();
  const [register] = useRegisterMutation();

  useEffect(() => {
    if (data?.me) router.push("/");
  }, [data]);

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) => {
        const res = await register({
          variables: values,
          update: (cache, { data: _data }) => {
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                __typename: "Query",
                me: _data?.register.user,
              },
            });
          },
        });

        if (res.data?.register.errors) {
          setErrors(toErrorMap(res.data.register.errors));
        } else if (res.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={form}>
          <MyLink href="/">
            <h1 className={formHeader}>Register now!</h1>
          </MyLink>
          <InputField name="username" placeholder="Username" label="Username" />
          <InputField name="email" placeholder="Email" label="Email" />
          <InputField
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
          />
          <NextLink href="/login">
            <a className="ml-auto mt-1 text-blue-400 text-sm">
              Already have an account ? Login here!
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: true })(Register);
