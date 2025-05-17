import { Button, Form, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import FormInput from "../shared/FormInput";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";


const LoginForm = () => {
  const [form] = useForm();
  const { Text, Title } = Typography;
  const { login , loggingIn} = useAuth();

  const handleKeyDownPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
        event.preventDefault();
        return false;
    }
}
const handleOnFinish = async (values: { email: string; password: string }) => {
    await login(values.email, values.password);
  };
  return (
    <div className="md:mx-auto max-w-3xl lg:w-[80%]">
      <Form
        name="normal_login"
        onFinish={handleOnFinish}
        layout="vertical"
        requiredMark
        className="space-y-6"
        form={form}
      >
        <div className="mb-10">
          <Title>Sign In</Title>
          <Text className="text-sm mt-4">
            Sign in to your account and explore a world of possibilities. Your
            journey begins here.
          </Text>
        </div>

        <FormInput
          name="email"
          label="E-mail"
          placeholder="Enter Your Email"
          type="email"
          prefix={<MailOutlined />}
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          onKeyDown={handleKeyDownPress}
          prefix={<LockOutlined />}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters long!",
            },
            {
              pattern: /^(?=.*[a-z]).{6,}$/,
              message: "Password must contain at least one letter!",
            },
          ]}
        />

          <Form.Item className="!mt-10">
        <Button
          block
          htmlType="submit"
          type="primary"
          disabled={loggingIn}
          className="w-full shadow-xl px-4 text-sm font-semibold rounded py-6 text-white bg-primary hover:bg-green-400 focus:outline-none"
        >
          Log In
        </Button>
      </Form.Item>

      <Text className="text-sm text-center block mt-2">
        Don't have an account?{" "}
        <Link
          to={"/register"}
          className="text-green-600 hover:underline ml-1 whitespace-nowrap"
        >
          Register here
        </Link>
      </Text>
      </Form>

    
    </div>
  );
};

export default LoginForm;
