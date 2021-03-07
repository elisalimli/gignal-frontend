import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../src/components/utils/InputField";
import MyLink from "../src/components/utils/MyLink";
import ProtectedRoute from "../src/components/utils/ProtectedRoute";
import Wrapper from "../src/components/utils/Wrapper";
import { useCreateTeamMutation } from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";
import { withApollo } from "../src/utils/withApollo";
import { form, formHeader } from "../styles/global";
import Button from "../src/components/Button";

const CreateTeam = () => {
  const [createTeam] = useCreateTeamMutation();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <Wrapper isMobileFull>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createTeam({
              variables: values,
              update: (cache) => {
                cache.evict({ fieldName: "teams" });
              },
            });
            const { errors, team, channelId } = res.data.createTeam;
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (team) router.push(`/team/view/${team.id}/${channelId}`);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={form}>
              <MyLink href="/">
                <h1 className={formHeader}>Login now!</h1>
              </MyLink>

              <InputField
                name="name"
                placeholder="Name of your team"
                label="Name"
              />
              <Button
                width="200px"
                loading={isSubmitting}
                centered
                extraClassName="mt-3"
                type="submit"
                text="Create"
              />
            </Form>
          )}
        </Formik>
      </Wrapper>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: false })(CreateTeam);
