import { Button, Form, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import FormInput from "../shared/FormInput";
import Link from "antd/es/typography/Link";

const RegisterForm = () => {
  const [form] = useForm();
  const { Text, Title } = Typography;

  const handleOnFinish = async () => {
    console.log("Submitted!!!");
  };
  return (
    <div className="md:mx-auto max-w-3xl lg:w-[80%]">
      <Form
        name="normal_signup"
        onFinish={handleOnFinish}
        layout="vertical"
        requiredMark
        className="space-y-6"
        form={form}
      >
        <div className="mb-10">
          <Title>Sign Up</Title>
          <Text className="text-sm mt-4">
            Sign in to your account and explore a world of possibilities. Your
            journey begins here.
          </Text>
        </div>

        <FormInput
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          prefix={<UserOutlined />}
           rules={[{ required: true, message: "Please input your first name!" }]}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          prefix={<UserOutlined />}
           rules={[{ required: true, message: "Please input your last name!" }]}
        />

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
            className="w-full shadow-xl px-4 text-sm font-semibold rounded py-6 text-white bg-primary hover:bg-green-400 focus:outline-none"
          >
            Create account
          </Button>
        </Form.Item>

        <Text className="text-sm text-center block mt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:underline ml-1 whitespace-nowrap"
          >
            Login here
          </Link>
        </Text>
      </Form>
    </div>
  );
};

export default RegisterForm;
