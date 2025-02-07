import React, { Suspense } from "react";
import LoginForm from "../loginForm";

export const generateMetadata = async () => {};

const RegistrationPage = ({ params }: { params: { slug: string } }) => {
  // const result = (async () => Promise.resolve(params))();
  console.log(params);

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default RegistrationPage;
